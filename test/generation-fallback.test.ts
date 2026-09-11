import { describe, expect, it, vi } from 'vitest'
import {
  isRetryableGenerationError,
  normalizeWorkflowFallbackSlots,
  runGenerationFallbackChain,
  workflowFallbackChain,
  workflowRoleLabel,
} from '../src/shared/generation-fallback'

const imageWorkflows = [
  { id: 'krea2-turbo-t2i', kind: 'text-to-image', role: 'default' as const, recommended: true },
  { id: 'gemini-proxy-image:gemini-3.1-flash-image', kind: 'text-to-image', role: 'fallback-1' as const },
  { id: 'z-image-turbo-t2i', kind: 'text-to-image', role: 'fallback-2' as const },
  { id: 'seedream-5.0-pro', kind: 'text-to-image' },
]

describe('generation fallback chain', () => {
  it('drops duplicate and default ids from backup slots', () => {
    expect(normalizeWorkflowFallbackSlots('krea2-turbo-t2i', [
      { id: 'krea2-turbo-t2i', note: 'same' },
      { id: 'gemini-proxy-image:gemini-3.1-flash-image', note: '额度更稳' },
      { id: 'gemini-proxy-image:gemini-3.1-flash-image', note: 'dup' },
      { id: 'z-image-turbo-t2i', note: 'local' },
    ])).toEqual([
      { id: 'gemini-proxy-image:gemini-3.1-flash-image', note: '额度更稳' },
      { id: 'z-image-turbo-t2i', note: 'local' },
    ])
  })

  it('starts from the current default-chain model and keeps a hand-picked model alone', () => {
    expect(workflowFallbackChain('text-to-image', imageWorkflows, 'krea2-turbo-t2i')).toEqual([
      'krea2-turbo-t2i',
      'gemini-proxy-image:gemini-3.1-flash-image',
      'z-image-turbo-t2i',
    ])
    expect(workflowFallbackChain('text-to-image', imageWorkflows, 'gemini-proxy-image:gemini-3.1-flash-image')).toEqual([
      'gemini-proxy-image:gemini-3.1-flash-image',
      'z-image-turbo-t2i',
    ])
    expect(workflowFallbackChain('text-to-image', imageWorkflows, 'seedream-5.0-pro')).toEqual(['seedream-5.0-pro'])
  })

  it('retries the same model three times then switches backup', async () => {
    const attempted: string[] = []
    await runGenerationFallbackChain({
      chain: ['krea2-turbo-t2i', 'gemini-proxy-image:gemini-3.1-flash-image'],
      run: async (workflowId) => {
        attempted.push(workflowId)
        if (workflowId === 'krea2-turbo-t2i') throw new Error('GPT / Grok 反代生图失败（HTTP 503）：auth_unavailable')
      },
    })
    expect(attempted).toEqual([
      'krea2-turbo-t2i', 'krea2-turbo-t2i', 'krea2-turbo-t2i',
      'gemini-proxy-image:gemini-3.1-flash-image',
    ])
    expect(isRetryableGenerationError('上次生成提交结果未知，为避免重复扣费不会自动重提')).toBe(false)
    expect(isRetryableGenerationError('请先输入文生图提示词')).toBe(false)
  })

  it('retries Comfy validation failures three times then switches backup', async () => {
    const attempted: string[] = []
    await runGenerationFallbackChain({
      chain: ['z-image-turbo-t2i', 'krea2-turbo-t2i'],
      run: async (workflowId) => {
        attempted.push(workflowId)
        if (workflowId === 'z-image-turbo-t2i') throw new Error('prompt_outputs_failed_validation')
      },
    })
    expect(attempted).toEqual([
      'z-image-turbo-t2i', 'z-image-turbo-t2i', 'z-image-turbo-t2i',
      'krea2-turbo-t2i',
    ])
  })

  it('does not switch after a hard-stop failure', async () => {
    const run = vi.fn(async () => {
      throw new Error('提示词包含不允许的内容')
    })
    await expect(runGenerationFallbackChain({
      chain: ['krea2-turbo-t2i', 'z-image-turbo-t2i'],
      run,
    })).rejects.toThrow('提示词包含不允许的内容')
    expect(run).toHaveBeenCalledOnce()
  })

  it('labels backups with optional notes for Agent options', () => {
    expect(workflowRoleLabel('Krea 2 Turbo', 'default')).toBe('Krea 2 Turbo（设置默认）')
    expect(workflowRoleLabel('Nano Banana 2', 'fallback-1', '额度更稳')).toBe('Nano Banana 2（备用1：额度更稳）')
  })
})
