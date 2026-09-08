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
