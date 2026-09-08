export interface ReverseProxyModel {
  id: string
  name: string
}

/** Stable domain predicates used by settings filters and workflow lists. */
export function isImageModelId(id: string): boolean {
  return /image/i.test(id)
}

export function isVideoModelId(id: string): boolean {
  return /video/i.test(id)
}

function stripModelsPrefix(id: string): string {
  return id.replace(/^models\//, '')
}

function readStringField(value: object, key: string): string {
  if (!(key in value)) return ''
  const field = Reflect.get(value, key)
  return typeof field === 'string' ? field.trim() : ''
}

function modelFromUnknown(item: unknown): ReverseProxyModel | null {
  if (!item || typeof item !== 'object') return null
  const id = stripModelsPrefix(readStringField(item, 'id') || readStringField(item, 'name'))
  if (!id) return null
  const name = readStringField(item, 'displayName') || readStringField(item, 'name') || id
  return { id, name: stripModelsPrefix(name) }
}

export function parseOpenAiModelList(payload: unknown): ReverseProxyModel[] {
  if (!payload || typeof payload !== 'object') return []
  const data = 'data' in payload ? payload.data : undefined
  const models = 'models' in payload ? payload.models : undefined
  const rows = Array.isArray(data) ? data : Array.isArray(models) ? models : []
  return rows.flatMap((item) => {
    const model = modelFromUnknown(item)
    return model ? [model] : []
  })
}
