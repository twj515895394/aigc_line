import { buildGptImageCall, dataUriToBase64, uint8ToBase64, type GptImageCall, type GptImageReference } from './gpt-image-call'

export function listedImageReferencePaths(request: {
  referenceImagePaths?: string[]
  referenceImagePath?: string
}): string[] {
  return [...new Set(request.referenceImagePaths ?? (request.referenceImagePath ? [request.referenceImagePath] : []))]
}

export type ReverseProxyImageFamily = 'gpt' | 'grok' | 'gemini'

export function reverseProxyImageFamily(modelId: string): ReverseProxyImageFamily {
  const id = modelId.trim().toLowerCase()
  if (id.includes('gemini')) return 'gemini'
  if (id.includes('grok')) return 'grok'
  return 'gpt'
}

export interface ReverseProxyImageCallInput {
  model: string
  prompt: string
  size: string
  /** Loaded reference images; GPT sends multipart files, Grok/Gemini convert them to data URIs. */
  references: GptImageReference[]
}

export interface ReverseProxyImageCall {
  family: ReverseProxyImageFamily
  path: string
  body?: Record<string, unknown>
  /** Multipart-only: form fields plus raw file parts (GPT image-to-image). */
  fields?: Record<string, string>
  files?: GptImageReference[]
}

function openAiStyleImageCall(family: 'grok' | 'gemini', input: ReverseProxyImageCallInput): ReverseProxyImageCall {
  return {
    family,
    path: '/images/generations',
    body: {
      model: input.model,
      prompt: input.prompt,
      n: 1,
      size: input.size,
      ...(input.references.length > 0 ? { image: input.references.map((reference) => `data:${reference.contentType};base64,${uint8ToBase64(reference.content)}`) } : {}),
    },
  }
}

/** Route by model id. GPT, Grok and Gemini keep separate payload shapes even on the same gateway. */
export function reverseProxyImageCall(input: ReverseProxyImageCallInput): ReverseProxyImageCall {
  const family = reverseProxyImageFamily(input.model)
  if (family === 'gemini') return openAiStyleImageCall('gemini', input)
  if (family === 'grok') return openAiStyleImageCall('grok', input)
  const call: GptImageCall = buildGptImageCall(input.model, input.prompt, input.size, input.references)
  if (call.kind === 'json') return { family, path: call.path, body: call.body }
  return { family, path: call.path, fields: call.fields, files: call.files }
}

export { dataUriToBase64 }
