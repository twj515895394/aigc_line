import fs from 'node:fs/promises'
import path from 'node:path'
import {
  buildVideoAnalysisPrompts,
  resolveAnalysisVideoInput,
  type AnalyzeVideoResult,
} from './qwen-video-analysis.service'
import { getRuntimeSettings } from './settings.service'
import { normalizeOpenAiCompatibleBaseUrl } from '../../../src/shared/reverse-proxy-url'

const ANALYSIS_TIMEOUT_MS = 5 * 60_000
const INLINE_RAW_FILE_LIMIT = 7 * 1024 * 1024

const VIDEO_MIME_TYPES: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.mkv': 'video/x-matroska',
  '.avi': 'video/x-msvideo',
}

function extractCompletionText(body: string): string {
  const trimmed = body.trim()
  if (trimmed.startsWith('{')) {
    try {
      const payload = JSON.parse(trimmed) as {
        choices?: Array<{ message?: { content?: unknown }; delta?: { content?: unknown } }>
        error?: { message?: string }
      }
      if (payload.error?.message) throw new Error(payload.error.message)
      const content = payload.choices?.[0]?.message?.content ?? payload.choices?.[0]?.delta?.content
      if (typeof content === 'string') return content
      if (Array.isArray(content)) {
        return content
          .map((item) => (item && typeof item === 'object' && 'text' in item ? String(item.text) : ''))
          .join('')
      }
    } catch (error) {
      if (error instanceof Error && !error.message.startsWith('Unexpected')) throw error
    }
  }

  const chunks: string[] = []
  let streamError: string | undefined
  for (const line of body.split(/\r?\n/)) {
    const dataLine = line.trim()
    if (!dataLine.startsWith('data:')) continue
    const data = dataLine.slice(5).trim()
    if (!data || data === '[DONE]') continue
    try {
      const payload = JSON.parse(data) as {
        choices?: Array<{ delta?: { content?: unknown }; message?: { content?: unknown } }>
        error?: { message?: string }
      }
      if (payload.error?.message) streamError = payload.error.message
      const content = payload.choices?.[0]?.delta?.content ?? payload.choices?.[0]?.message?.content
      if (typeof content === 'string') chunks.push(content)
      else if (Array.isArray(content)) {
        for (const item of content) if (item && typeof item === 'object' && 'text' in item) chunks.push(String(item.text))
      }
    } catch {
      // Ignore keep-alives; empty-result check stays strict.
    }
  }
  if (streamError) throw new Error(`Gemini 流式响应失败：${streamError}`)
  return chunks.join('')
}

async function encodeLocalVideo(filePath: string): Promise<string> {
  const stat = await fs.stat(filePath)
  if (!stat.isFile()) throw new Error(`视频路径不是文件：${filePath}`)
  const extension = path.extname(filePath).toLowerCase()
  const mime = VIDEO_MIME_TYPES[extension]
  if (!mime) throw new Error(`不支持的视频格式：${extension || '无扩展名'}`)
  if (stat.size > INLINE_RAW_FILE_LIMIT) {
    throw new Error(`视频为 ${(stat.size / 1024 / 1024).toFixed(1)} MB，Gemini 反代分析仅支持不超过 7 MB 的项目内文件或公开 HTTP(S) URL`)
  }
  const bytes = await fs.readFile(filePath)
  return `data:${mime};base64,${bytes.toString('base64')}`
}

export async function analyzeVideoWithGemini(
  folderPath: string,
  videoInput: string,
  analysisRequest: string,
): Promise<AnalyzeVideoResult> {
  const prompts = buildVideoAnalysisPrompts(analysisRequest)
  const settings = await getRuntimeSettings()
  if (!settings.geminiApiKey) throw new Error('请先在设置页配置 Gemini 反代 API Key')
  if (!settings.geminiBaseUrl) throw new Error('请先在设置页配置 Gemini 反代地址')
  const modelId = settings.geminiAnalysisModelId.trim()
  if (!modelId) throw new Error('请先在设置页选择 Gemini 分析模型')

  const input = resolveAnalysisVideoInput(folderPath, videoInput)
  const videoUrl = input.kind === 'remote' ? input.url : await encodeLocalVideo(input.filePath)
  const baseUrl = normalizeOpenAiCompatibleBaseUrl(settings.geminiBaseUrl)
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${settings.geminiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'system', content: prompts.system },
        {
          role: 'user',
          content: [
            { type: 'video_url', video_url: { url: videoUrl } },
            { type: 'text', text: prompts.user },
          ],
        },
      ],
      temperature: 0,
      max_tokens: 8_000,
    }),
    signal: AbortSignal.timeout(ANALYSIS_TIMEOUT_MS),
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`Gemini 视频分析失败：HTTP ${response.status} · ${text.slice(0, 1_000)}`)
  const analysisText = extractCompletionText(text).trim()
  if (!analysisText) throw new Error('Gemini 分析模型返回了空分析结果')

  const reportDir = path.join(folderPath, 'generated', 'analyses')
  await fs.mkdir(reportDir, { recursive: true })
  const stem = path.basename(videoInput, path.extname(videoInput)).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80) || 'video'
  const reportFile = path.join(reportDir, `${stem}-${Date.now()}-video-analysis.md`)
  const header = `<!--\nvideoInput: ${videoInput}\nprovider: gemini\nmodel: ${modelId}\nanalyzedAt: ${new Date().toISOString()}\n-->\n\n`
  await fs.writeFile(reportFile, `${header}${analysisText}\n`, 'utf8')
  return {
    model: modelId,
    analysisText,
    reportPath: path.relative(folderPath, reportFile).split(path.sep).join('/'),
  }
}
