/** Normalize an OpenAI-compatible reverse-proxy base so `/v1` appears once. */
export function normalizeOpenAiCompatibleBaseUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '')
  if (!trimmed) return ''

  let parsed: URL
  try {
    parsed = new URL(trimmed)
  } catch {
    throw new Error('反代地址格式无效，请填写例如 http://127.0.0.1:8045/v1')
  }
  if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname) {
    throw new Error('反代地址仅支持 http 或 https')
  }

  const segments = parsed.pathname.split('/').filter(Boolean)
  while (segments[segments.length - 1] === 'v1') segments.pop()
  segments.push('v1')
  parsed.pathname = `/${segments.join('/')}`
  parsed.search = ''
  parsed.hash = ''
  return parsed.toString().replace(/\/+$/, '')
}
