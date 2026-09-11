import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { loadOpenAiReferenceImages } from '../electron/main/services/reverse-proxy-image'

let root: string
const options = { maxCount: 10, maxBytes: 1024 * 1024, label: '参考图' }

beforeEach(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'aigc-reverse-proxy-ref-'))
  await fs.mkdir(path.join(root, 'generated', 'images'), { recursive: true })
  await fs.mkdir(path.join(root, 'uploads', 'images'), { recursive: true })
  await fs.writeFile(path.join(root, 'generated', 'images', 'base.png'), Buffer.from('gen-png'))
  await fs.writeFile(path.join(root, 'uploads', 'images', 'upload.png'), Buffer.from('upl-png'))
})

afterEach(async () => { await fs.rm(root, { recursive: true, force: true }) })

describe('loadOpenAiReferenceImages', () => {
  it('resolves project-relative generated and uploads paths against the project root', async () => {
    const refs = await loadOpenAiReferenceImages(root, {
      referenceImagePaths: ['generated/images/base.png', 'uploads/images/upload.png'],
    }, options)
    expect(refs.map((ref) => ref.filename)).toEqual(['base.png', 'upload.png'])
    expect(refs.every((ref) => ref.contentType === 'image/png')).toBe(true)
    expect(Buffer.from(refs[0].content).toString()).toBe('gen-png')
    expect(Buffer.from(refs[1].content).toString()).toBe('upl-png')
  })

  it('rejects absolute paths outside the project directory', async () => {
    const outside = path.join(os.tmpdir(), `aigc-reverse-proxy-outside-${Date.now()}.png`)
    await fs.writeFile(outside, Buffer.from('outside'))
    try {
      await expect(loadOpenAiReferenceImages(root, { referenceImagePaths: [outside] }, options))
        .rejects.toThrow('参考图片路径不在当前项目目录内')
    } finally {
      await fs.rm(outside, { force: true })
    }
  })

  it('rejects unsupported extensions and enforces the count limit', async () => {
    await fs.writeFile(path.join(root, 'notes.txt'), 'x')
    await expect(loadOpenAiReferenceImages(root, { referenceImagePaths: ['notes.txt'] }, options))
      .rejects.toThrow('只支持 PNG、JPEG 或 WebP 参考图')
    await expect(loadOpenAiReferenceImages(root, {
      referenceImagePaths: ['generated/images/base.png', 'uploads/images/upload.png'],
    }, { ...options, maxCount: 1 })).rejects.toThrow('最多支持 1 张参考图')
  })
})
