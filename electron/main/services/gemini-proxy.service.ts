import fs from 'node:fs/promises'
import path from 'node:path'
import type {
  ConnectionTestResult,
  GenerateImageRequest,
  GenerateImageResult,
  ImageAspectRatio,
  ListReverseProxyModelsRequest,
  ListReverseProxyModelsResult,
  ReverseProxyModel,
  TestReverseProxyConnectionRequest,
} from '../../../src/shared/ipc.types'
import { parseOpenAiModelList } from '../../../src/shared/reverse-proxy-models'
import { normalizeOpenAiCompatibleBaseUrl } from '../../../src/shared/reverse-proxy-url'
import { GEMINI_PROXY_IMAGE_PREFIX, imageWorkflowReferenceLimit, parsePrefixedWorkflowId } from '../../../src/shared/reverse-proxy-workflows'
import { reverseProxyImageCall } from '../../../src/shared/reverse-proxy-image'
import { extractOpenAiImageBase64 } from '../../../src/shared/gpt-image-call'
import { buildReverseProxyImageRequest, loadOpenAiReferenceImages } from './reverse-proxy-image'
import { loadProject } from './project.store'
import { runLocalGeneration, TerminalGenerationError } from './generation-task.service'
import { getRuntimeSettings } from './settings.service'
const REQUEST_TIMEOUT_MS = 20_000

function httpErrorMessage(status: number, body: string): string {
  const detail = body.slice(0, 500)
  return `连接失败：HTTP ${status}${detail ? ` · ${detail}` : ''}`
}

function networkErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error)
  return message.startsWith('连接失败') || message.startsWith('请先') || message.startsWith('反代地址')
    ? message
    : `连接失败：${message}`
}

async function fetchGeminiModelCatalog(baseUrl: string, apiKey: string): Promise<ReverseProxyModel[]> {
  const normalized = normalizeOpenAiCompatibleBaseUrl(baseUrl)
  if (!normalized) throw new Error('请先填写 Gemini 反代地址')

  // 连接测试和获取模型都只打 GET /models，避免误触生图或 chat 计费。
  const response = await fetch(`${normalized}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  const text = await response.text()
  if (!response.ok) throw new Error(httpErrorMessage(response.status, text))

  let payload: unknown = {}
  if (text.trim()) {
    try {
      payload = JSON.parse(text) as unknown
    } catch {
      throw new Error('连接失败：模型目录响应不是有效 JSON')
    }
  }
  return parseOpenAiModelList(payload)
}

async function resolveGeminiCredentials(
  request: ListReverseProxyModelsRequest | TestReverseProxyConnectionRequest,
): Promise<{ baseUrl: string; apiKey: string } | ListReverseProxyModelsResult> {
  const runtime = await getRuntimeSettings()
  const apiKey = request.apiKey?.trim() || runtime.geminiApiKey
  if (!apiKey) {
    return { success: false, message: '请先输入 Gemini API Key', models: [] }
  }
  return {
    baseUrl: request.baseUrl.trim() || runtime.geminiBaseUrl,
    apiKey,
  }
}

export async function listGeminiModels(
  request: ListReverseProxyModelsRequest,
): Promise<ListReverseProxyModelsResult> {
  const credentials = await resolveGeminiCredentials(request)
  if ('success' in credentials) return credentials
  try {
    const models = await fetchGeminiModelCatalog(credentials.baseUrl, credentials.apiKey)
    return { success: true, message: `已获取 ${models.length} 个模型`, models }
  } catch (error) {
    return { success: false, message: networkErrorMessage(error), models: [] }
  }
}

export async function testGeminiConnection(
  request: TestReverseProxyConnectionRequest,
): Promise<ConnectionTestResult> {
  const result = await listGeminiModels(request)
  if (!result.success) return { success: false, message: result.message }
  return { success: true, message: `连接成功 · ${result.models.length} 个模型` }
}

function openAiImageSize(aspectRatio: ImageAspectRatio): string {
  if (aspectRatio === '9:16') return '1024x1536'
  if (aspectRatio === '4:3') return '1536x1152'
  if (aspectRatio === '1:1') return '1024x1024'
  return '1536x1024'
}

export async function generateImageWithGeminiProxy(request: GenerateImageRequest): Promise<GenerateImageResult> {
  const project = await loadProject(request.projectId)
  if (!project) throw new Error('项目不存在或已被删除')
  const prompt = request.prompt.trim()
  if (!prompt) throw new Error('请先输入图片生成提示词')
  const modelId = parsePrefixedWorkflowId(request.workflowId, GEMINI_PROXY_IMAGE_PREFIX)
  if (!modelId) throw new Error('未选择有效的 Gemini 反代图片模型')
  const settings = await getRuntimeSettings()
  if (!settings.geminiApiKey) throw new Error('请先在设置页配置 Gemini 反代 API Key')
  if (!settings.geminiBaseUrl) throw new Error('请先在设置页配置 Gemini 反代地址')
  if (!settings.geminiEnabledImageModelIds.includes(modelId)) {
    throw new Error(`未启用 Gemini 图片模型：${modelId}`)
  }

  return runLocalGeneration({ project, provider: 'gemini-proxy', request }, async (markSubmitting) => {
    const baseUrl = normalizeOpenAiCompatibleBaseUrl(settings.geminiBaseUrl)
    const references = await loadOpenAiReferenceImages(project.folderPath, request, {
      maxCount: imageWorkflowReferenceLimit(request.workflowId),
      maxBytes: 20 * 1024 * 1024,
      label: 'Gemini 反代',
    })
    const call = reverseProxyImageCall({
      model: modelId,
      prompt,
      size: openAiImageSize(request.aspectRatio),
      references,
    })
    markSubmitting()
    const { headers, body } = buildReverseProxyImageRequest(call, settings.geminiApiKey)
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
      throw new TerminalGenerationError(`Gemini 反代生图失败（HTTP ${response.status}）：${typeof err === 'string' ? err : JSON.stringify(err).slice(0, 500)}`)
    }
    if (!text.trim() || (payload && typeof payload === 'object' && !('data' in payload))) {
      throw new TerminalGenerationError(`Gemini 反代生图返回了无效响应（HTTP ${response.status}）`)
    }
    const b64 = extractOpenAiImageBase64(payload)
    if (!b64) throw new TerminalGenerationError('Gemini 反代未返回图片数据')
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
