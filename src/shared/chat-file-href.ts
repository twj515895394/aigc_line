const WINDOWS_ABS = /^[A-Za-z]:[\\/]/

function normalizeSlashes(value: string): string {
  return value.replace(/\\/g, '/')
}

function normalizePath(value: string): string {
  const windowsAbs = WINDOWS_ABS.test(value)
  const parts = normalizeSlashes(value).split('/')
  const out: string[] = []
  for (const part of parts) {
    if (part === '' || part === '.') continue
    if (part === '..') {
      if (out.length > 0 && out[out.length - 1] !== '..') out.pop()
      continue
    }
    out.push(part)
  }
  if (windowsAbs) return out.join('/')
  return value.startsWith('/') ? `/${out.join('/')}` : out.join('/')
}

export function resolveChatFileHref(folderPath: string | undefined, href: string): string | null {
  const link = href.trim()
  if (!folderPath || !link || /^(https?:|mailto:|#)/i.test(link)) return null
  let candidate = link
  if (/^file:/i.test(candidate)) {
    try { candidate = decodeURIComponent(candidate.replace(/^file:\/\//i, '')) }
    catch { return null }
    candidate = candidate.replace(/^\/([A-Za-z]:)/, '$1')
  }
  const folder = folderPath.replace(/[\\/]+$/, '')
  const absolute = WINDOWS_ABS.test(candidate) || candidate.startsWith('/')
    ? candidate
    : `${folder}/${candidate.replace(/^[\\/]+/, '')}`
  const normalized = normalizePath(absolute)
  const root = normalizePath(folder)
  const windows = WINDOWS_ABS.test(folder)
  const comparable = (value: string) => windows ? value.toLowerCase() : value
  if (comparable(normalized) !== comparable(root) && !comparable(normalized).startsWith(`${comparable(root)}/`)) return null
  return normalized.replace(/\//g, windows ? '\\' : '/')
}

export function chatLinkLabel(children: unknown): string {
  if (children == null || typeof children === 'boolean') return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(chatLinkLabel).join('')
  if (typeof children === 'object' && children && 'props' in children) {
    const props = children.props
    if (props && typeof props === 'object' && 'children' in props) return chatLinkLabel(props.children)
  }
  return ''
}

function fileName(value: string): string {
  return value.replace(/\\/g, '/').split('/').pop()?.trim() ?? ''
}

/** Empty markdown hrefs still carry the filename in link text; match a known project file. */
export function resolveChatFileLink(
  folderPath: string | undefined,
  href: string | undefined,
  label: string,
  knownRelativePaths: string[] = [],
): string | null {
  const fromHref = href ? resolveChatFileHref(folderPath, href) : null
  if (fromHref) return fromHref
  const name = label.trim()
  if (name.includes('/') || name.includes('\\')) {
    const fromLabel = resolveChatFileHref(folderPath, name)
    if (fromLabel) return fromLabel
  }
  const needle = fileName(name || href || '').toLowerCase()
  if (!needle) return null
  const match = [...knownRelativePaths].reverse().find((path) => fileName(path).toLowerCase() === needle)
  return match ? resolveChatFileHref(folderPath, match) : null
}
