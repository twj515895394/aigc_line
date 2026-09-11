import type { ComfyWorkflowInfo } from './ipc.types'

export const GEMINI_PROXY_IMAGE_PREFIX = 'gemini-proxy-image:'
export const GPT_GROK_IMAGE_PREFIX = 'gpt-grok-image:'
export const GPT_GROK_VIDEO_PREFIX = 'gpt-grok-video:'

export function geminiProxyImageWorkflowId(modelId: string): string {
  return `${GEMINI_PROXY_IMAGE_PREFIX}${modelId}`
}

export function gptGrokImageWorkflowId(modelId: string): string {
  return `${GPT_GROK_IMAGE_PREFIX}${modelId}`
}

export function gptGrokVideoWorkflowId(modelId: string): string {
  return `${GPT_GROK_VIDEO_PREFIX}${modelId}`
}

export function parsePrefixedWorkflowId(workflowId: string | undefined, prefix: string): string | null {
  if (!workflowId?.startsWith(prefix)) return null
  const modelId = workflowId.slice(prefix.length).trim()
  return modelId || null
}

export function isGeminiProxyImageWorkflow(workflowId?: string): boolean {
  return parsePrefixedWorkflowId(workflowId, GEMINI_PROXY_IMAGE_PREFIX) !== null
}

export function isGptGrokImageWorkflow(workflowId?: string): boolean {
  return parsePrefixedWorkflowId(workflowId, GPT_GROK_IMAGE_PREFIX) !== null
}

export function isGptGrokVideoWorkflow(workflowId?: string): boolean {
  return parsePrefixedWorkflowId(workflowId, GPT_GROK_VIDEO_PREFIX) !== null
}

export function imageWorkflowReferenceLimit(workflowId?: string): number {
  if (!workflowId) return 0
  if (workflowId.startsWith('google-')) return 14
  if (workflowId.startsWith('seedream-')) return 10
  if (isGeminiProxyImageWorkflow(workflowId) || isGptGrokImageWorkflow(workflowId)) return 10
  return 0
}

export function isCloudImageWorkflow(workflowId?: string): boolean {
  return imageWorkflowReferenceLimit(workflowId) > 0
}

export function workflowTypeLabel(workflow: { id: string; kind: string }): string {
  if (workflow.id.startsWith('google-')) return 'Google · 在线 · 多图'
  if (workflow.id.startsWith('seedream-')) return '方舟 · 在线 · 多图'
  if (isGeminiProxyImageWorkflow(workflow.id)) return 'Gemini 反代 · 在线 · 多图'
  if (isGptGrokImageWorkflow(workflow.id)) return 'GPT / Grok · 在线 · 多图'
  if (workflow.id.startsWith('seedance-')) return '方舟 · 全模态'
  if (isGptGrokVideoWorkflow(workflow.id)) return 'GPT / Grok · 在线 · 视频'
  if (workflow.id === 'minimax-h3-easy') return 'ComfyUI · 一采 · 文生/图生/参考'
  if (workflow.id === 'minimax-h3-easy-2pass') return 'ComfyUI · 二采 · 高质量更慢'
  if (workflow.id.startsWith('minimax-h3-r2v')) return workflow.id.endsWith('-turbo') ? 'ComfyUI · 全模态 · 加速' : 'ComfyUI · 全模态'
  if (workflow.kind === 'image-to-video') return 'ComfyUI · 视频'
  if (workflow.kind === 'image-to-image') return 'ComfyUI · 图生图'
  return 'ComfyUI · 文生图'
}

export function listEnabledReverseProxyWorkflows(settings: {
  geminiEnabledImageModelIds: string[]
  gptGrokEnabledImageModelIds: string[]
  gptGrokEnabledVideoModelIds: string[]
}): ComfyWorkflowInfo[] {
  const image = (ids: string[], prefix: string, label: string): ComfyWorkflowInfo[] => (
    ids.filter((id) => id.trim()).map((id) => ({
      id: `${prefix}${id.trim()}`,
      name: `${label} · ${id.trim()}`,
      kind: 'text-to-image',
    }))
  )
  const videos = settings.gptGrokEnabledVideoModelIds.filter((id) => id.trim()).map((id) => ({
    id: gptGrokVideoWorkflowId(id.trim()),
    name: `GPT / Grok · ${id.trim()}`,
    kind: 'image-to-video' as const,
  }))
  return [
    ...image(settings.geminiEnabledImageModelIds, GEMINI_PROXY_IMAGE_PREFIX, 'Gemini 反代'),
    ...image(settings.gptGrokEnabledImageModelIds, GPT_GROK_IMAGE_PREFIX, 'GPT / Grok'),
    ...videos,
  ]
}
