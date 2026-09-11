/**
 * GPT family image generation requests follow the official OpenAI multipart contract:
 * text-to-image POSTs JSON to /images/generations, while image-to-image POSTs
 * multipart/form-data to /images/edits with `image[]` file parts.
 * Grok and Gemini keep their own wire formats on the same gateway (see reverse-proxy-image.ts).
 */

export interface GptImageReference {
  filename: string
  contentType: string
  content: Uint8Array<ArrayBuffer>
}

export type GptImageCall =
  | { kind: 'json'; path: '/images/generations'; body: Record<string, unknown> }
  | { kind: 'multipart'; path: '/images/edits'; fields: Record<string, string>; files: GptImageReference[] }

export function buildGptImageCall(
  model: string,
  prompt: string,
  size: string,
  references: GptImageReference[],
): GptImageCall {
  if (references.length === 0) {
    return {
      kind: 'json',
      path: '/images/generations',
      body: { model, prompt, n: 1, size },
    }
  }
  const fields: Record<string, string> = {}
  for (const [key, value] of Object.entries({ model, prompt, size })) fields[key] = value
  return { kind: 'multipart', path: '/images/edits', fields, files: references }
}

/** Extract the first b64_json image from an OpenAI-compatible `data[]` response. */
export function extractOpenAiImageBase64(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object' || !('data' in payload) || !Array.isArray(payload.data)) return null
  const first = payload.data[0]
  if (!first || typeof first !== 'object') return null
  const b64 = 'b64_json' in first && typeof first.b64_json === 'string' ? first.b64_json : ''
  return b64 || null
}

export function uint8ToBase64(bytes: Uint8Array): string {
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

export function dataUriToBase64(dataUri: string): string | null {
  const marker = 'base64,'
  const index = dataUri.indexOf(marker)
  if (index < 0) return null
  return dataUri.slice(index + marker.length) || null
}
