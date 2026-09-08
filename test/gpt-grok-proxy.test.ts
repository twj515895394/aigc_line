import { afterEach, describe, expect, it, vi } from 'vitest'
import { isImageModelId, isVideoModelId } from '../src/shared/reverse-proxy-models'
import { normalizeOpenAiCompatibleBaseUrl } from '../src/shared/reverse-proxy-url'
import { grokVideoDownloadUrl, grokVideoReady, grokVideoStatus, listGptGrokModels, testGptGrokConnection } from '../electron/main/services/gpt-grok-proxy.service'

describe('GPT/Grok model id filters', () => {
  it('treats ids containing image as image models and video as video models', () => {
    expect(isImageModelId('gpt-image-2')).toBe(true)
    expect(isImageModelId('grok-imagine-image')).toBe(true)
    expect(isImageModelId('grok-imagine-image-quality')).toBe(true)
    expect(isImageModelId('gpt-4o')).toBe(false)
    expect(isVideoModelId('grok-imagine-video')).toBe(true)
    expect(isVideoModelId('Grok-Imagine-VIDEO-preview')).toBe(true)
    expect(isVideoModelId('gpt-image-2')).toBe(false)
    expect(isVideoModelId('gpt-4o')).toBe(false)
  })
})

describe('GPT/Grok reverse-proxy client', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('normalizes base URLs so /v1 appears once', () => {
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8317')).toBe('http://127.0.0.1:8317/v1')
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8317/v1/')).toBe('http://127.0.0.1:8317/v1')
    expect(normalizeOpenAiCompatibleBaseUrl('http://127.0.0.1:8317/v1/v1')).toBe('http://127.0.0.1:8317/v1')
  })

  it('lists models with GET /models and never generates media', async () => {
    const fetch = vi.fn(async () => Response.json({
      data: [
        { id: 'gpt-image-2' },
        { id: 'grok-imagine-video', owned_by: 'xai' },
        { id: 'gpt-4o' },
      ],
    }))
    vi.stubGlobal('fetch', fetch)

    const result = await listGptGrokModels({
      baseUrl: 'http://127.0.0.1:8317',
      apiKey: 'proxy-key',
    })

    expect(result.success).toBe(true)
    expect(result.models.map((model) => model.id)).toEqual([
      'gpt-image-2',
      'grok-imagine-video',
      'gpt-4o',
    ])
    expect(result.models.filter((model) => isImageModelId(model.id)).map((model) => model.id)).toEqual(['gpt-image-2'])
    expect(result.models.filter((model) => isVideoModelId(model.id)).map((model) => model.id)).toEqual(['grok-imagine-video'])
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch.mock.calls[0]?.[0]).toBe('http://127.0.0.1:8317/v1/models')
    expect(fetch.mock.calls[0]?.[1]).toMatchObject({
      method: 'GET',
      headers: { Authorization: 'Bearer proxy-key' },
    })
  })

  it('tests connection by listing models and reports the count', async () => {
    const fetch = vi.fn(async () => Response.json({
      data: [{ id: 'grok-imagine-image' }, { id: 'grok-imagine-video' }],
    }))
    vi.stubGlobal('fetch', fetch)

    const result = await testGptGrokConnection({
      baseUrl: 'http://127.0.0.1:8317/v1',
      apiKey: 'proxy-key',
    })

    expect(result).toEqual({ success: true, message: '连接成功 · 2 个模型' })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(String(fetch.mock.calls[0]?.[0])).toBe('http://127.0.0.1:8317/v1/models')
    expect(fetch.mock.calls[0]?.[1]).toMatchObject({ method: 'GET' })
  })

  it('returns a short HTTP error and does not POST generate endpoints', async () => {
    const fetch = vi.fn(async () => new Response('no quota', { status: 403 }))
    vi.stubGlobal('fetch', fetch)

    const listed = await listGptGrokModels({
      baseUrl: 'http://127.0.0.1:8317/v1',
      apiKey: 'proxy-key',
    })
    const tested = await testGptGrokConnection({
      baseUrl: 'http://127.0.0.1:8317/v1',
      apiKey: 'proxy-key',
    })

    expect(listed.success).toBe(false)
    expect(listed.models).toEqual([])
    expect(listed.message).toContain('HTTP 403')
    expect(listed.message).toContain('no quota')
    expect(tested.success).toBe(false)
    expect(tested.message).toContain('HTTP 403')
    expect(fetch.mock.calls.every((call) => String(call[0]).endsWith('/models'))).toBe(true)
    expect(fetch.mock.calls.every((call) => call[1]?.method === 'GET')).toBe(true)
  })

  it('keeps enabled selections independent from a failed list payload', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('gateway down', { status: 502 })))
    const enabledImage = ['grok-imagine-image']
    const enabledVideo = ['grok-imagine-video']
    const result = await listGptGrokModels({
      baseUrl: 'http://127.0.0.1:8317/v1',
      apiKey: 'proxy-key',
    })
    expect(result.success).toBe(false)
    expect(result.models).toEqual([])
    expect(enabledImage).toEqual(['grok-imagine-image'])
    expect(enabledVideo).toEqual(['grok-imagine-video'])
  })
})

describe('Grok reverse-proxy video payload', () => {
  it('reads done + video.url from the 8317 poll shape', () => {
    const payload = {
      status: 'done',
      video: { url: 'https://vidgen.x.ai/xai-vidgen-bucket/example.mp4', duration: 10 },
      progress: 100,
    }
    expect(grokVideoStatus(payload)).toBe('done')
    expect(grokVideoReady(payload)).toBe(true)
    expect(grokVideoDownloadUrl(payload)).toBe('https://vidgen.x.ai/xai-vidgen-bucket/example.mp4')
  })

  it('does not treat OpenAI /videos/{id}/content as the Grok download path', () => {
    expect(grokVideoReady({ status: 'in_progress', progress: 40 })).toBe(false)
    expect(grokVideoDownloadUrl({ status: 'in_progress' })).toBe('')
    expect(grokVideoDownloadUrl({ status: 'completed', output: { url: 'https://cdn.example/video.mp4' } })).toBe('https://cdn.example/video.mp4')
  })
})
