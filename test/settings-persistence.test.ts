import fs from 'node:fs/promises'
import path from 'node:path'
import { afterAll, describe, expect, it, vi } from 'vitest'

const fixture = vi.hoisted(() => ({
  directory: `${process.cwd()}/test-results/settings-persistence-${process.pid}`,
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

import { getAppSettingsView, normalizeSeedreamBaseUrl, saveAppSettings } from '../electron/main/services/settings.service'

describe('settings secret persistence', () => {
  afterAll(async () => {
    await fs.rm(fixture.directory, { recursive: true, force: true })
  })

  it('persists and reloads the Seedream API key as local plaintext', async () => {
    const request = {
      comfyuiBaseUrl: 'http://127.0.0.1:8188',
      agentBaseUrl: '',
      qwenBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      defaultImageWorkflowId: 'seedream-5.0-pro',
      googleAiProxyUrl: '',
      seedreamBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
      seedreamApiKey: 'ark-test-secret',
    }

    const saved = await saveAppSettings(request)
    expect(saved.seedreamApiKeyConfigured).toBe(true)
    expect(saved.seedreamApiKey).toBe('ark-test-secret')

    const reloaded = await getAppSettingsView()
    expect(reloaded.seedreamApiKeyConfigured).toBe(true)
    expect(reloaded.seedreamApiKey).toBe('ark-test-secret')

    const stored = await fs.readFile(path.join(fixture.directory, 'settings.json'), 'utf8')
    expect(stored).toContain('"seedreamApiKey": "ark-test-secret"')
    expect(stored).not.toContain('encryptedSeedreamApiKey')
  })

  it('normalizes Seedream image endpoints to their API base URL', () => {
    expect(normalizeSeedreamBaseUrl('https://ark.cn-beijing.volces.com/api/v3/images/generations'))
      .toBe('https://ark.cn-beijing.volces.com/api/v3')
    expect(normalizeSeedreamBaseUrl('https://ark.cn-beijing.volces.com/api/plan/v3/images/generations/'))
      .toBe('https://ark.cn-beijing.volces.com/api/plan/v3')
    expect(normalizeSeedreamBaseUrl('https://ark.cn-beijing.volces.com/api/plan/v3/images/generations/images/generations'))
      .toBe('https://ark.cn-beijing.volces.com/api/plan/v3')
  })

  it('persists Gemini reverse-proxy settings and can clear the encrypted key', async () => {
    const request = {
      comfyuiBaseUrl: 'http://127.0.0.1:8188',
      agentBaseUrl: '',
      qwenBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      defaultImageWorkflowId: 'krea2-turbo-t2i',
      googleAiProxyUrl: '',
      seedreamBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
      videoAnalysisProvider: 'gemini' as const,
      geminiBaseUrl: 'http://127.0.0.1:8045',
      geminiApiKey: 'gemini-secret',
      geminiAnalysisModelId: 'gemini-3.7-flash-medium',
      geminiEnabledImageModelIds: ['gemini-3.1-flash-image'],
    }

    const saved = await saveAppSettings(request)
    expect(saved.videoAnalysisProvider).toBe('gemini')
    expect(saved.geminiBaseUrl).toBe('http://127.0.0.1:8045/v1')
    expect(saved.geminiApiKeyConfigured).toBe(true)
    expect(saved.geminiApiKey).toBe('gemini-secret')
    expect(saved.geminiAnalysisModelId).toBe('gemini-3.7-flash-medium')
    expect(saved.geminiEnabledImageModelIds).toEqual(['gemini-3.1-flash-image'])

    const stored = await fs.readFile(path.join(fixture.directory, 'settings.json'), 'utf8')
    expect(stored).toContain('encryptedGeminiApiKey')
    expect(stored).not.toContain('gemini-secret')

    const cleared = await saveAppSettings({
      ...request,
      geminiApiKey: undefined,
      clearGeminiApiKey: true,
    })
    expect(cleared.geminiApiKeyConfigured).toBe(false)
    expect(cleared.geminiEnabledImageModelIds).toEqual(['gemini-3.1-flash-image'])
  })

  it('persists GPT/Grok reverse-proxy settings without overwriting Gemini fields', async () => {
    await saveAppSettings({
      comfyuiBaseUrl: 'http://127.0.0.1:8188',
      agentBaseUrl: '',
      qwenBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      defaultImageWorkflowId: 'krea2-turbo-t2i',
      googleAiProxyUrl: '',
      seedreamBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
      geminiBaseUrl: 'http://127.0.0.1:8045/v1',
      geminiApiKey: 'gemini-keep',
      geminiEnabledImageModelIds: ['gemini-3.1-flash-image'],
    })

    const saved = await saveAppSettings({
      comfyuiBaseUrl: 'http://127.0.0.1:8188',
      agentBaseUrl: '',
      qwenBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      defaultImageWorkflowId: 'krea2-turbo-t2i',
      googleAiProxyUrl: '',
      seedreamBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
      gptGrokBaseUrl: 'http://127.0.0.1:8317',
      gptGrokApiKey: 'twj-secret',
      gptGrokEnabledImageModelIds: ['gpt-image-2'],
      gptGrokEnabledVideoModelIds: ['grok-imagine-video'],
    })

    expect(saved.gptGrokBaseUrl).toBe('http://127.0.0.1:8317/v1')
    expect(saved.gptGrokApiKeyConfigured).toBe(true)
    expect(saved.gptGrokApiKey).toBe('twj-secret')
    expect(saved.gptGrokEnabledImageModelIds).toEqual(['gpt-image-2'])
    expect(saved.gptGrokEnabledVideoModelIds).toEqual(['grok-imagine-video'])
    expect(saved.geminiBaseUrl).toBe('http://127.0.0.1:8045/v1')
    expect(saved.geminiApiKey).toBe('gemini-keep')
    expect(saved.geminiEnabledImageModelIds).toEqual(['gemini-3.1-flash-image'])

    const stored = await fs.readFile(path.join(fixture.directory, 'settings.json'), 'utf8')
    expect(stored).toContain('encryptedGptGrokApiKey')
    expect(stored).not.toContain('twj-secret')
  })
})
