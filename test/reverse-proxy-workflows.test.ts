import { describe, expect, it } from 'vitest'
import {
  gptGrokImageWorkflowId,
  gptGrokVideoWorkflowId,
  geminiProxyImageWorkflowId,
  imageWorkflowReferenceLimit,
  isCloudImageWorkflow,
  isGeminiProxyImageWorkflow,
  isGptGrokImageWorkflow,
  isGptGrokVideoWorkflow,
  listEnabledReverseProxyWorkflows,
  workflowTypeLabel,
} from '../src/shared/reverse-proxy-workflows'

describe('reverse-proxy workflow ids', () => {
  it('lists only enabled models with stable prefixes', () => {
    const workflows = listEnabledReverseProxyWorkflows({
      geminiEnabledImageModelIds: ['gemini-3.1-flash-image'],
      gptGrokEnabledImageModelIds: ['gpt-image-2', 'grok-imagine-image'],
      gptGrokEnabledVideoModelIds: ['grok-imagine-video'],
    })
    expect(workflows.map((item) => item.id)).toEqual([
      geminiProxyImageWorkflowId('gemini-3.1-flash-image'),
      gptGrokImageWorkflowId('gpt-image-2'),
      gptGrokImageWorkflowId('grok-imagine-image'),
      gptGrokVideoWorkflowId('grok-imagine-video'),
    ])
    expect(workflows.filter((item) => item.kind === 'text-to-image')).toHaveLength(3)
    expect(workflows.filter((item) => item.kind === 'image-to-video')).toHaveLength(1)
    expect(isGeminiProxyImageWorkflow(workflows[0]?.id)).toBe(true)
    expect(isGptGrokImageWorkflow(workflows[1]?.id)).toBe(true)
    expect(isGptGrokVideoWorkflow(workflows[3]?.id)).toBe(true)
    expect(isGptGrokVideoWorkflow('minimax-h3-r2v')).toBe(false)
  })

  it('omits reverse-proxy options when nothing is enabled', () => {
    expect(listEnabledReverseProxyWorkflows({
      geminiEnabledImageModelIds: [],
      gptGrokEnabledImageModelIds: [],
      gptGrokEnabledVideoModelIds: [],
    })).toEqual([])
  })

  it('labels reverse-proxy image models as online, not ComfyUI', () => {
    expect(workflowTypeLabel({ id: gptGrokImageWorkflowId('gpt-image'), kind: 'text-to-image' })).toBe('GPT / Grok · 在线 · 多图')
    expect(workflowTypeLabel({ id: geminiProxyImageWorkflowId('gemini-3.1-flash-image'), kind: 'text-to-image' })).toBe('Gemini 反代 · 在线 · 多图')
    expect(workflowTypeLabel({ id: 'krea2-turbo-t2i', kind: 'text-to-image' })).toBe('ComfyUI · 文生图')
    expect(isCloudImageWorkflow(gptGrokImageWorkflowId('gpt-image'))).toBe(true)
    expect(imageWorkflowReferenceLimit(gptGrokImageWorkflowId('gpt-image'))).toBe(10)
    expect(imageWorkflowReferenceLimit('krea2-turbo-t2i')).toBe(0)
  })
})
