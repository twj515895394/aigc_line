import fs from 'node:fs/promises'
import path from 'node:path'
import { readBoundedMedia } from './media-io'
import { listedImageReferencePaths } from '../../../src/shared/reverse-proxy-image'
import type { ReverseProxyImageCall } from '../../../src/shared/reverse-proxy-image'
import type { GptImageReference } from '../../../src/shared/gpt-image-call'

const MIME_BY_EXTENSION: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
}

export interface LoadReferenceImagesOptions {
  maxCount: number
  maxBytes: number
  label: string
}

/** Resolve project-relative reference paths into raw image bytes with MIME types. */
export async function loadOpenAiReferenceImages(
  projectRoot: string,
  request: { referenceImagePaths?: string[]; referenceImagePath?: string },
  options: LoadReferenceImagesOptions,
): Promise<GptImageReference[]> {
  const referencePaths = listedImageReferencePaths(request)
  if (referencePaths.length > options.maxCount) {
    throw new Error(`${options.label}最多支持 ${options.maxCount} 张参考图`)
  }
  const references: GptImageReference[] = []
  for (const referencePath of referencePaths) {
    // The renderer passes project-relative sourcePath values (uploads/images/... or
    // generated/images/...), so resolve against the project root, not a fixed subdirectory.
    const resolvedRoot = await fs.realpath(projectRoot)
    const fillPath = await fs.realpath(path.resolve(resolvedRoot, referencePath))
    const relative = path.relative(resolvedRoot, fillPath)
    if (relative.startsWith('..') || path.isAbsolute(relative)) {
      throw new Error('参考图片路径不在当前项目目录内')
    }
    const extension = path.extname(fillPath).toLowerCase().slice(1)
    const mimeType = MIME_BY_EXTENSION[extension]
    if (!mimeType) throw new Error(`${options.label}只支持 PNG、JPEG 或 WebP 参考图`)
    const data = await readBoundedMedia(fillPath, options.maxBytes, options.label)
    references.push({ filename: path.basename(fillPath), contentType: mimeType, content: data })
  }
  return references
}

/** Assemble the final request body/headers for a routed reverse-proxy image call. */
export function buildReverseProxyImageRequest(
  call: ReverseProxyImageCall,
  apiKey: string,
): { headers: Record<string, string>; body: string | FormData } {
  const headers: Record<string, string> = { Authorization: `Bearer ${apiKey}` }
  if (call.fields && call.files) {
    const form = new FormData()
    for (const [key, value] of Object.entries(call.fields ?? {})) form.append(key, value)
    for (const file of call.files ?? []) form.append('image[]', new Blob([file.content], { type: file.contentType }), file.filename)
    return { headers, body: form }
  }
  headers['Content-Type'] = 'application/json'
  return { headers, body: JSON.stringify(call.body) }
}
