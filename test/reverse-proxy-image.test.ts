import { describe, expect, it } from 'vitest'
import {
  dataUriToBase64,
  extractOpenAiImageBase64,
} from '../src/shared/gpt-image-call'
import {
  listedImageReferencePaths,
  reverseProxyImageCall,
  reverseProxyImageFamily,
} from '../src/shared/reverse-proxy-image'

const pngBytes = new TextEncoder().encode('png-bytes')
const reference = { filename: 'ref.png', contentType: 'image/png', content: pngBytes }

describe('reverse-proxy image families', () => {
  it('classifies model ids into gpt, grok or gemini', () => {
    expect(reverseProxyImageFamily('gpt-image')).toBe('gpt')
    expect(reverseProxyImageFamily('gpt-image-2')).toBe('gpt')
    expect(reverseProxyImageFamily('grok-imagine-image')).toBe('grok')
    expect(reverseProxyImageFamily('grok-imagine-image-quality')).toBe('grok')
    expect(reverseProxyImageFamily('gemini-3.1-flash-image')).toBe('gemini')
  })

  it('sends GPT text-to-image as JSON on /images/generations', () => {
    expect(reverseProxyImageCall({
      model: 'gpt-image',
      prompt: 'a cat',
      size: '1536x1024',
      references: [],
    })).toEqual({
      family: 'gpt',
      path: '/images/generations',
      body: { model: 'gpt-image', prompt: 'a cat', n: 1, size: '1536x1024' },
    })
  })

  it('sends GPT image-to-image as multipart on /images/edits with raw file parts', () => {
    const call = reverseProxyImageCall({
      model: 'gpt-image',
      prompt: 'edit the cat',
      size: '1024x1024',
      references: [reference],
    })
    expect(call).toEqual({
      family: 'gpt',
      path: '/images/edits',
      fields: { model: 'gpt-image', prompt: 'edit the cat', size: '1024x1024' },
      files: [reference],
    })
    expect(call).not.toHaveProperty('body')
  })

  it('sends Grok and Gemini image-to-image JSON with data URI references', () => {
    for (const family of ['grok', 'gemini'] as const) {
      const model = family === 'grok' ? 'grok-imagine-image' : 'gemini-3.1-flash-image'
      expect(reverseProxyImageCall({
        model,
        prompt: 'edit the cat',
        size: '1024x1024',
        references: [reference],
      })).toMatchObject({
        family,
        path: '/images/generations',
        body: { image: ['data:image/png;base64,cG5nLWJ5dGVz'] },
      })
    }
  })

  it('omits the image field for Grok and Gemini text-to-image', () => {
    expect(reverseProxyImageCall({
      model: 'grok-imagine-image',
      prompt: 'a cat',
      size: '1024x1024',
      references: [],
    }).body).not.toHaveProperty('image')
  })

  it('dedupes listed reference paths and keeps the deprecated single path', () => {
    expect(listedImageReferencePaths({
      referenceImagePaths: ['a.png', 'b.png', 'a.png'],
      referenceImagePath: 'legacy.png',
    })).toEqual(['a.png', 'b.png'])
    expect(listedImageReferencePaths({ referenceImagePath: 'legacy.png' })).toEqual(['legacy.png'])
  })

  it('extracts the first b64_json image from OpenAI-style responses', () => {
    expect(extractOpenAiImageBase64({ data: [{ b64_json: 'QUJD' }] })).toBe('QUJD')
    expect(extractOpenAiImageBase64({ data: [] })).toBeNull()
    expect(extractOpenAiImageBase64({ data: [{}] })).toBeNull()
    expect(extractOpenAiImageBase64({})).toBeNull()
  })

  it('decodes base64 data URIs and rejects plain URLs', () => {
    expect(dataUriToBase64('data:image/png;base64,QUJD')).toBe('QUJD')
    expect(dataUriToBase64('https://example.com/a.png')).toBeNull()
  })
})
