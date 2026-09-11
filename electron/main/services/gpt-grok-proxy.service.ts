import fs from 'node:fs/promises'
import path from 'node:path'
import type {
  ConnectionTestResult,
  GenerateImageRequest,
  GenerateImageResult,
  GenerateVideoRequest,
  GenerateVideoResult,
  ImageAspectRatio,
  VideoAspectRatio,
} from '../../../src/shared/ipc.types'
import { parseOpenAiModelList, type ReverseProxyModel } from '../../../src/shared/reverse-proxy-models'
import { normalizeOpenAiCompatibleBaseUrl } from '../../../src/shared/reverse-proxy-url'
import { GPT_GROK_IMAGE_PREFIX, GPT_GROK_VIDEO_PREFIX, imageWorkflowReferenceLimit, parsePrefixedWorkflowId } from '../../../src/shared/reverse-proxy-workflows'
import { reverseProxyImageCall } from '../../../src/shared/reverse-proxy-image'
import { extractOpenAiImageBase64 } from '../../../src/shared/gpt-image-call'
import { buildReverseProxyImageRequest, loadOpenAiReferenceImages } from './reverse-proxy-image'
import { downloadMediaToFile } from './media-io'
import { loadProject } from './project.store'
import { retryGenerationRead, runGenerationTask, runLocalGeneration, TerminalGenerationError } from './generation-task.service'
import { getRuntimeSettings } from './settings.service'

export interface GptGrokProxyRequest {
  baseUrl: string
  apiKey?: string
}

export interface GptGrokModelListResult {
  success: boolean
  message: string
  models: ReverseProxyModel[]
}

const REQUEST_TIMEOUT_MS = 20_000
const VIDEO_POLL_MS = 3_000
const VIDEO_WAIT_MS = 8 * 60_000

export async function listGptGrokModels(request: GptGrokProxyRequest): Promise<GptGrokModelListResult> {
  const baseUrlInput = request.baseUrl?.trim() ?? ''
  if (!baseUrlInput) {
    return { success: false, message: '请先输入 GPT / Grok 反代地址', models: [] }
  }
  const apiKey = request.apiKey?.trim() ?? ''
  if (!apiKey) {
    return { success: false, message: '请先输入 GPT / Grok API Key', models: [] }
  }

  let baseUrl: string
  try {
    baseUrl = normalizeOpenAiCompatibleBaseUrl(baseUrlInput)
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : '反代地址格式无效',
      models: [],
    }
  }

  // 连接测试与获取模型都只打 GET /models，避免误触发计费生图/生视频。
  try {
    const response = await fetch(`${baseUrl}/models`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    if (!response.ok) {
      const detail = (await response.text()).trim().slice(0, 500)
      return {
        success: false,
        message: `获取模型失败：HTTP ${response.status}${detail ? ` · ${detail}` : ''}`,
        models: [],
      }
    }
    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      return { success: false, message: '获取模型失败：响应不是 JSON', models: [] }
    }
    const models = parseOpenAiModelList(payload)
    return {
      success: true,
      message: `已获取 ${models.length} 个模型`,
      models,
    }
  } catch (error) {
    return {
      success: false,
      message: `获取模型失败：${error instanceof Error ? error.message : String(error)}`,
      models: [],
    }
  }
}

export async function testGptGrokConnection(request: GptGrokProxyRequest): Promise<ConnectionTestResult> {
  const result = await listGptGrokModels(request)
  if (!result.success) return { success: false, message: result.message }
  return { success: true, message: `连接成功 · ${result.models.length} 个模型` }
}

function openAiImageSize(aspectRatio: ImageAspectRatio): string {
  if (aspectRatio === '9:16') return '1024x1536'
  if (aspectRatio === '4:3') return '1536x1152'
  if (aspectRatio === '1:1') return '1024x1024'
  return '1536x1024'
}

function grokVideoSize(aspectRatio: ImageAspectRatio | VideoAspectRatio): string {
  if (aspectRatio === '9:16') return '720x1280'
  if (aspectRatio === '4:3') return '960x720'
  if (aspectRatio === '3:4') return '720x960'
  if (aspectRatio === '1:1') return '720x720'
  return '1280x720'
}
function readString(value: object, key: string): string {
  if (!(key in value)) return ''
  const field = Reflect.get(value, key)
  return typeof field === 'string' ? field : ''
}

function videoTaskId(payload: unknown): string {
  if (!payload || typeof payload !== 'object') throw new Error('Grok 视频未返回任务 ID')
  const id = readString(payload, 'id')
  if (!id) throw new Error('Grok 视频未返回任务 ID')
  return id
}

function nestedObject(value: object, key: string): object | null {
  if (!(key in value)) return null
  const field = Reflect.get(value, key)
  return field && typeof field === 'object' ? field : null
}

export function grokVideoStatus(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''
  return readString(payload, 'status').toLowerCase()
}

export function grokVideoDownloadUrl(payload: unknown): string {
  if (!payload || typeof payload !== 'object') return ''
  const direct = readString(payload, 'url') || readString(payload, 'video_url')
  if (direct) return direct
  const video = nestedObject(payload, 'video')
  if (video) {
    const nested = readString(video, 'url') || readString(video, 'video_url')
    if (nested) return nested
  }
  const output = nestedObject(payload, 'output')
  if (output) {
    const nested = readString(output, 'url') || readString(output, 'video_url')
    if (nested) return nested
  }
  return ''
}

export function grokVideoReady(payload: unknown): boolean {
  const status = grokVideoStatus(payload)
  if (['failed', 'error', 'cancelled', 'canceled'].includes(status)) return false
  if (['done', 'completed', 'succeeded', 'success', 'ready'].includes(status)) return true
  return Boolean(grokVideoDownloadUrl(payload))
}

export async function generateImageWithGptGrok(request: GenerateImageRequest): Promise<GenerateImageResult> {
  const project = await loadProject(request.projectId)
  if (!project) throw new Error('项目不存在或已被删除')
  const prompt = request.prompt.trim()
  if (!prompt) throw new Error('请先输入图片生成提示词')
  const modelId = parsePrefixedWorkflowId(request.workflowId, GPT_GROK_IMAGE_PREFIX)
  if (!modelId) throw new Error('未选择有效的 GPT / Grok 图片模型')
  const settings = await getRuntimeSettings()
  if (!settings.gptGrokApiKey) throw new Error('请先在设置页配置 GPT / Grok 反代 API Key')
  if (!settings.gptGrokBaseUrl) throw new Error('请先在设置页配置 GPT / Grok 反代地址')
  if (!settings.gptGrokEnabledImageModelIds.includes(modelId)) {
    throw new Error(`未启用 GPT / Grok 图片模型：${modelId}`)
  }

  return runLocalGeneration({ project, provider: 'gpt-grok', request }, async (markSubmitting) => {
    const baseUrl = normalizeOpenAiCompatibleBaseUrl(settings.gptGrokBaseUrl)
    const references = await loadOpenAiReferenceImages(project.folderPath, request, {
      maxCount: imageWorkflowReferenceLimit(request.workflowId),
      maxBytes: 20 * 1024 * 1024,
      label: 'GPT / Grok 反代',
    })
    const call = reverseProxyImageCall({
      model: modelId,
      prompt,
      size: openAiImageSize(request.aspectRatio),
      references,
    })
    markSubmitting()
    const { headers, body } = buildReverseProxyImageRequest(call, settings.gptGrokApiKey)
    const response = await fetch(`${baseUrl}${call.path}`, {
      method: 'POST',
      headers,
      body,
      signal: AbortSignal.timeout(5 * 60_000),
    })
    const text = await response.text()
    let payload: unknown = {}
    try {
      payload = text.trim() ? JSON.parse(text) as unknown : {}
    } catch {
      payload = {}
    }
    if (!response.ok) {
      const err = payload && typeof payload === 'object' && 'error' in payload ? payload.error : text.slice(0, 500)
      throw new TerminalGenerationError(`GPT / Grok 反代生图失败（HTTP ${response.status}）：${typeof err === 'string' ? err : JSON.stringify(err).slice(0, 500)}`)
    }
    if (!text.trim() || (payload && typeof payload === 'object' && !('data' in payload))) {
      throw new TerminalGenerationError(`GPT / Grok 反代生图返回了无效响应（HTTP ${response.status}）`)
    }
    const b64 = extractOpenAiImageBase64(payload)
    if (!b64) throw new TerminalGenerationError('GPT / Grok 反代未返回图片数据')
    const bytes = Buffer.from(b64, 'base64')
    const safeNodeId = request.nodeId.replace(/[^a-zA-Z0-9_-]/g, '-').slice(-48)
    const outputDir = path.join(project.folderPath, 'generated', 'images')
    await fs.mkdir(outputDir, { recursive: true })
    const outputPath = path.join(outputDir, `${safeNodeId}-${Date.now()}.png`)
    await fs.writeFile(outputPath, bytes)
    return {
      success: true,
      relativePath: path.relative(project.folderPath, outputPath).split(path.sep).join('/'),
    }
  })
}

export async function generateVideoWithGptGrok(request: GenerateVideoRequest): Promise<GenerateVideoResult> {
  const project = await loadProject(request.projectId)
  if (!project) throw new Error('项目不存在或已被删除')
  const prompt = request.prompt.trim()
  if (!prompt) throw new Error('请先输入视频生成提示词')
  const modelId = parsePrefixedWorkflowId(request.workflowId, GPT_GROK_VIDEO_PREFIX)
  if (!modelId) throw new Error('未选择有效的 GPT / Grok 视频模型')
  const settings = await getRuntimeSettings()
  if (!settings.gptGrokApiKey) throw new Error('请先在设置页配置 GPT / Grok 反代 API Key')
  if (!settings.gptGrokBaseUrl) throw new Error('请先在设置页配置 GPT / Grok 反代地址')
  if (!settings.gptGrokEnabledVideoModelIds.includes(modelId)) {
    throw new Error(`未启用 GPT / Grok 视频模型：${modelId}`)
  }

  const duration = Number(request.duration)
  const seconds = Number.isFinite(duration) ? Math.max(4, Math.min(15, Math.round(duration))) : 4
  const baseUrl = normalizeOpenAiCompatibleBaseUrl(settings.gptGrokBaseUrl)

  return runGenerationTask({ project, provider: 'gpt-grok', operation: 'video', request }, {
    submit: async (markSubmitting) => {
      markSubmitting()
      const response = await fetch(`${baseUrl}/videos`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${settings.gptGrokApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelId,
          prompt,
          seconds: String(seconds),
          size: grokVideoSize(request.aspectRatio),
        }),
        signal: AbortSignal.timeout(2 * 60_000),
      })
      const text = await response.text()
      let payload: unknown = {}
      try {
        payload = text.trim() ? JSON.parse(text) as unknown : {}
      } catch {
        throw new Error(`Grok 视频提交返回了无效响应（HTTP ${response.status}）`)
      }
      if (!response.ok) {
        throw new TerminalGenerationError(`Grok 视频提交失败（HTTP ${response.status}）：${text.slice(0, 500)}`)
      }
      return videoTaskId(payload)
    },
    complete: async (taskId) => {
      const deadline = Date.now() + VIDEO_WAIT_MS
      let snapshot: unknown = null
      while (Date.now() < deadline) {
        const response = await fetch(`${baseUrl}/videos/${taskId}`, {
          headers: { Authorization: `Bearer ${settings.gptGrokApiKey}` },
          signal: AbortSignal.timeout(20_000),
        })
        const text = await response.text()
        try {
          snapshot = text.trim() ? JSON.parse(text) as unknown : {}
        } catch {
          throw new Error(`Grok 视频查询返回了无效响应（HTTP ${response.status}）`)
        }
        if (!response.ok) {
          throw new TerminalGenerationError(`Grok 视频查询失败（HTTP ${response.status}）：${text.slice(0, 500)}`)
        }
        const status = grokVideoStatus(snapshot)
        if (['failed', 'error', 'cancelled', 'canceled'].includes(status)) {
          throw new TerminalGenerationError(`Grok 视频生成失败：${status}`)
        }
        if (grokVideoReady(snapshot)) break
        const wait = Promise.withResolvers<void>()
        setTimeout(wait.resolve, VIDEO_POLL_MS)
        await wait.promise
      }
      const url = grokVideoDownloadUrl(snapshot)
      if (!url) {
        throw new TerminalGenerationError(grokVideoReady(snapshot)
          ? 'Grok 视频已完成但未返回下载地址'
          : 'Grok 视频等待超时，任务仍未完成')
      }
      const safeNodeId = request.nodeId.replace(/[^a-zA-Z0-9_-]/g, '-').slice(-48)
      const outputDir = path.join(project.folderPath, 'generated', 'videos')
      await fs.mkdir(outputDir, { recursive: true })
      const outputPath = path.join(outputDir, `${safeNodeId}-grok-${Date.now()}.mp4`)
      await retryGenerationRead(async () => {
        const download = await fetch(url, { signal: AbortSignal.timeout(5 * 60_000) })
        await downloadMediaToFile(download, outputPath, 2 * 1024 * 1024 * 1024)
      })
      return {
        success: true,
        relativePath: path.relative(project.folderPath, outputPath).split(path.sep).join('/'),
        promptId: taskId,
      }
    },
  })
}
