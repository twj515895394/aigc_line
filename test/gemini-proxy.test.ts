import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('electron', () => ({
  safeStorage: {
    isEncryptionAvailable: () => true,
    encryptString: (value: string) => Buffer.from(`encrypted:${value}`),
    decryptString: (value: Buffer) => value.toString().replace(/^encrypted:/, ''),
  },
}))

vi.mock('../electron/main/services/project.store', () => ({
  getAppDataDir: () => `${process.cwd()}/test-results/gemini-proxy-${process.pid}`,
}))

vi.mock('../electron/main/services/google-network.service', () => ({
  fetchGoogleApi: vi.fn(),
  normalizeGoogleProxyUrl: (value: string) => value.trim().replace(/\/+$/, ''),
}))

vi.mock('../electron/main/services/settings.service', () => ({
  getRuntimeSettings: vi.fn(async () => ({
    geminiBaseUrl: '',
    geminiApiKey: '',
  })),
}))

import { listGeminiModels, testGeminiConnection } from '../electron/main/services/gemini-proxy.service'
import { isImageModelId, parseOpenAiModelList } from '../src/shared/reverse-proxy-models'
import { normalizeOpenAiCompatibleBaseUrl } from '../src/shared/reverse-proxy-url'

describe('Gemini reverse-proxy URL normalization', () => {
  it('appends /v1 when the path is empty', () => {
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8045')).toBe('http://127.0.0.1:8045/v1')
  })

  it('keeps a single /v1 and strips trailing slashes', () => {
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8045/v1')).toBe('http://127.0.0.1:8045/v1')
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8045/v1/')).toBe('http://127.0.0.1:8045/v1')
  })

  it('does not produce /v1/v1', () => {
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8045/v1/v1')).toBe('http://127.0.0.1:8045/v1')
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8045/v1/v1/')).toBe('http://127.0.0.1:8045/v1')
  })
})

describe('Gemini reverse-proxy model parsing', () => {
  it('treats ids containing image as image models and does not default-enable them', () => {
    expect(isImageModelId('gemini-3.1-flash-image')).toBe(true)
    expect(isImageModelId('GEMINI-3-PRO-IMAGE')).toBe(true)
    expect(isImageModelId('gemini-3.7-flash-medium')).toBe(false)
  })

  it('parses OpenAI-compatible lists and v1beta models payloads', () => {
    expect(parseOpenAiModelList({
      data: [
        { id: 'gemini-3.1-flash-image', owned_by: 'google' },
        { id: 'gemini-3.7-flash-medium' },
      ],
    })).toEqual([
      { id: 'gemini-3.1-flash-image', name: 'gemini-3.1-flash-image' },
      { id: 'gemini-3.7-flash-medium', name: 'gemini-3.7-flash-medium' },
    ])
    expect(parseOpenAiModelList({
      models: [
        { name: 'models/gemini-3.7-flash-medium', displayName: 'Gemini Flash' },
        { name: 'models/gemini-3.1-flash-image' },
      ],
    })).toEqual([
      { id: 'gemini-3.7-flash-medium', name: 'Gemini Flash' },
      { id: 'gemini-3.1-flash-image', name: 'gemini-3.1-flash-image' },
    ])
  })
})

describe('Gemini reverse-proxy HTTP catalog', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('lists models with GET /models and bearer auth', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({
      data: [
        { id: 'gemini-3.7-flash-medium' },
        { id: 'gemini-3.1-flash-image' },
      ],
    }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await listGeminiModels({
      baseUrl: 'http://127.0.0.1:8045',
      apiKey: 'gemini-secret',
    })

    expect(result.success).toBe(true)
    expect(result.message).toContain('2')
    expect(result.models.map((model) => model.id)).toEqual([
      'gemini-3.7-flash-medium',
      'gemini-3.1-flash-image',
    ])
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('http://127.0.0.1:8045/v1/models')
    expect(init.method ?? 'GET').toBe('GET')
    expect(init.body).toBeUndefined()
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer gemini-secret')
  })

  it('reports model count on a successful connection test without posting media', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({
      data: [{ id: 'gemini-3.7-flash-medium' }],
    }), { status: 200 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await testGeminiConnection({
      baseUrl: 'http://127.0.0.1:8045/v1',
      apiKey: 'gemini-secret',
    })

    expect(result.success).toBe(true)
    expect(result.message).toContain('1')
    expect(result.message).toContain('连接成功')
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('http://127.0.0.1:8045/v1/models')
    expect(init.method ?? 'GET').toBe('GET')
    expect(init.body).toBeUndefined()
  })

  it('keeps an empty catalog on HTTP failure so callers can retain previous checkboxes', async () => {
    const previous = [{ id: 'gemini-3.1-flash-image', name: 'gemini-3.1-flash-image' }]
    const fetchMock = vi.fn(async () => new Response('quota exceeded', { status: 403 }))
    vi.stubGlobal('fetch', fetchMock)

    const result = await listGeminiModels({
      baseUrl: 'http://127.0.0.1:8045/v1/',
      apiKey: 'gemini-secret',
    })

    expect(result.success).toBe(false)
    expect(result.message).toContain('403')
    expect(result.message).toContain('quota exceeded')
    expect(result.models).toEqual([])
    expect(result.success ? result.models : previous).toEqual(previous)
  })
})
