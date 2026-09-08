import fs from 'node:fs/promises'
import path from 'node:path'
import { afterAll, describe, expect, it, vi } from 'vitest'

const fixture = vi.hoisted(() => ({
  directory: `${process.cwd()}/test-results/gpt-grok-settings-persistence-${process.pid}`,
}))

vi.mock('electron', () => ({
  safeStorage: {
    isEncryptionAvailable: () => true,
    encryptString: (value: string) => Buffer.from(`encrypted:${value}`),
    decryptString: (value: Buffer) => value.toString().replace(/^encrypted:/, ''),
  },
}))

vi.mock('../electron/main/services/project.store', () => ({
  getAppDataDir: () => fixture.directory,
}))

vi.mock('../electron/main/services/google-network.service', () => ({
  fetchGoogleApi: vi.fn(),
  normalizeGoogleProxyUrl: (value: string) => value.trim().replace(/\/+$/, ''),
}))

import { getAppSettingsView, saveAppSettings } from '../electron/main/services/settings.service'

const baseRequest = {
  comfyuiBaseUrl: 'http://127.0.0.1:8188',
  agentBaseUrl: '',
  qwenBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  defaultImageWorkflowId: 'krea2-turbo-t2i',
  googleAiProxyUrl: '',
  seedreamBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
}

describe('GPT/Grok reverse-proxy settings persistence', () => {
  afterAll(async () => {
    await fs.rm(fixture.directory, { recursive: true, force: true })
  })

  it('persists GPT/Grok URL, encrypted key and enabled lists without Gemini defaults', async () => {
    const saved = await saveAppSettings({
      ...baseRequest,
      gptGrokBaseUrl: 'http://127.0.0.1:8317/v1/',
      gptGrokApiKey: 'gpt-grok-secret',
      gptGrokEnabledImageModelIds: ['grok-imagine-image'],
      gptGrokEnabledVideoModelIds: ['grok-imagine-video'],
    })

    expect(saved.gptGrokBaseUrl).toBe('http://127.0.0.1:8317/v1')
    expect(saved.gptGrokApiKey).toBe('gpt-grok-secret')
    expect(saved.gptGrokApiKeyConfigured).toBe(true)
    expect(saved.gptGrokEnabledImageModelIds).toEqual(['grok-imagine-image'])
    expect(saved.gptGrokEnabledVideoModelIds).toEqual(['grok-imagine-video'])
    expect(saved.gptGrokEnabledImageModelIds).not.toContain('gpt-image-2')

    const reloaded = await getAppSettingsView()
    expect(reloaded.gptGrokBaseUrl).toBe('http://127.0.0.1:8317/v1')
    expect(reloaded.gptGrokApiKey).toBe('gpt-grok-secret')
    expect(reloaded.gptGrokApiKeyConfigured).toBe(true)
    expect(reloaded.gptGrokEnabledImageModelIds).toEqual(['grok-imagine-image'])
    expect(reloaded.gptGrokEnabledVideoModelIds).toEqual(['grok-imagine-video'])

    const stored = JSON.parse(await fs.readFile(path.join(fixture.directory, 'settings.json'), 'utf8')) as Record<string, unknown>
    expect(stored.gptGrokBaseUrl).toBe('http://127.0.0.1:8317/v1')
    expect(stored.encryptedGptGrokApiKey).toBe(Buffer.from('encrypted:gpt-grok-secret').toString('base64'))
    expect(stored).not.toHaveProperty('gptGrokApiKey')
    expect(stored.gptGrokEnabledImageModelIds).toEqual(['grok-imagine-image'])
    expect(stored.gptGrokEnabledVideoModelIds).toEqual(['grok-imagine-video'])
    expect(JSON.stringify(stored)).not.toContain('gpt-image-2')
  })

  it('does not overwrite Gemini fields when saving GPT/Grok settings', async () => {
    await saveAppSettings({
      ...baseRequest,
      geminiBaseUrl: 'http://127.0.0.1:8045/v1',
      geminiApiKey: 'gemini-secret',
      geminiAnalysisModelId: 'gemini-3.7-flash-medium',
      geminiEnabledImageModelIds: ['gemini-3.1-flash-image'],
      gptGrokBaseUrl: 'http://127.0.0.1:8317/v1',
      gptGrokApiKey: 'first-gpt-key',
      gptGrokEnabledImageModelIds: ['grok-imagine-image'],
      gptGrokEnabledVideoModelIds: ['grok-imagine-video'],
    })

    const afterGptGrok = await saveAppSettings({
      ...baseRequest,
      geminiBaseUrl: 'http://127.0.0.1:8045/v1',
      geminiAnalysisModelId: 'gemini-3.7-flash-medium',
      geminiEnabledImageModelIds: ['gemini-3.1-flash-image'],
      gptGrokBaseUrl: 'http://127.0.0.1:9000/v1',
      gptGrokApiKey: 'second-gpt-key',
      gptGrokEnabledImageModelIds: ['gpt-image-custom'],
      gptGrokEnabledVideoModelIds: [],
    })

    expect(afterGptGrok.geminiBaseUrl).toBe('http://127.0.0.1:8045/v1')
    expect(afterGptGrok.geminiApiKey).toBe('gemini-secret')
    expect(afterGptGrok.geminiApiKeyConfigured).toBe(true)
    expect(afterGptGrok.geminiAnalysisModelId).toBe('gemini-3.7-flash-medium')
    expect(afterGptGrok.geminiEnabledImageModelIds).toEqual(['gemini-3.1-flash-image'])
    expect(afterGptGrok.gptGrokBaseUrl).toBe('http://127.0.0.1:9000/v1')
    expect(afterGptGrok.gptGrokApiKey).toBe('second-gpt-key')
    expect(afterGptGrok.gptGrokEnabledImageModelIds).toEqual(['gpt-image-custom'])
    expect(afterGptGrok.gptGrokEnabledVideoModelIds).toEqual([])

    const stored = JSON.parse(await fs.readFile(path.join(fixture.directory, 'settings.json'), 'utf8')) as Record<string, unknown>
    expect(stored.encryptedGeminiApiKey).toBe(Buffer.from('encrypted:gemini-secret').toString('base64'))
    expect(stored.encryptedGptGrokApiKey).toBe(Buffer.from('encrypted:second-gpt-key').toString('base64'))
    expect(stored.geminiBaseUrl).toBe('http://127.0.0.1:8045/v1')
    expect(stored.gptGrokBaseUrl).toBe('http://127.0.0.1:9000/v1')
  })

  it('defaults enabled GPT/Grok model lists to empty arrays', async () => {
    const saved = await saveAppSettings({
      ...baseRequest,
      gptGrokBaseUrl: 'http://127.0.0.1:8317/v1',
      gptGrokApiKey: 'empty-lists-key',
    })
    expect(saved.gptGrokEnabledImageModelIds).toEqual([])
    expect(saved.gptGrokEnabledVideoModelIds).toEqual([])
    expect(saved.gptGrokEnabledImageModelIds).not.toEqual(expect.arrayContaining(['gpt-image-2']))
  })

  it('clears the encrypted GPT/Grok key without touching Gemini', async () => {
    await saveAppSettings({
      ...baseRequest,
      geminiBaseUrl: 'http://127.0.0.1:8045/v1',
      geminiApiKey: 'keep-gemini',
      gptGrokBaseUrl: 'http://127.0.0.1:8317/v1',
      gptGrokApiKey: 'drop-me',
    })

    const cleared = await saveAppSettings({
      ...baseRequest,
      geminiBaseUrl: 'http://127.0.0.1:8045/v1',
      gptGrokBaseUrl: 'http://127.0.0.1:8317/v1',
      clearGptGrokApiKey: true,
    })

    expect(cleared.gptGrokApiKey).toBe('')
    expect(cleared.gptGrokApiKeyConfigured).toBe(false)
    expect(cleared.geminiApiKey).toBe('keep-gemini')
    expect(cleared.geminiApiKeyConfigured).toBe(true)

    const stored = JSON.parse(await fs.readFile(path.join(fixture.directory, 'settings.json'), 'utf8')) as Record<string, unknown>
    expect(stored).not.toHaveProperty('encryptedGptGrokApiKey')
    expect(stored.encryptedGeminiApiKey).toBe(Buffer.from('encrypted:keep-gemini').toString('base64'))
  })
})
