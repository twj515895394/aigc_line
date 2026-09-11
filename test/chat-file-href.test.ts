import { describe, expect, it } from 'vitest'
import { chatLinkLabel, resolveChatFileHref, resolveChatFileLink } from '../src/shared/chat-file-href'

describe('resolveChatFileHref', () => {
  const folder = 'R:/test/test-chat'

  it('resolves project-relative markdown paths for Explorer', () => {
    expect(resolveChatFileHref(folder, '2026-09-09-rural-tea-couplet-video-design.md'))
      .toBe('R:\\test\\test-chat\\2026-09-09-rural-tea-couplet-video-design.md')
    expect(resolveChatFileHref(folder, 'generated/drama-reports/note.md'))
      .toBe('R:\\test\\test-chat\\generated\\drama-reports\\note.md')
  })

  it('keeps http links and rejects paths outside the project', () => {
    expect(resolveChatFileHref(folder, 'https://example.com/a.md')).toBeNull()
    expect(resolveChatFileHref(folder, '../secret.md')).toBeNull()
    expect(resolveChatFileHref(folder, 'C:/Windows/notepad.exe')).toBeNull()
  })

  it('keeps posix separators for unix project folders', () => {
    expect(resolveChatFileHref('/tmp/project', 'notes/design.md')).toBe('/tmp/project/notes/design.md')
    expect(resolveChatFileHref('/tmp/project', '../secret.md')).toBeNull()
  })

  it('matches empty markdown hrefs to a known artifact basename', () => {
    const known = ['generated/drama-reports/tea-couple-20s/空间分镜检查报告.md']
    expect(resolveChatFileLink(folder, '', '空间分镜检查报告.md', known))
      .toBe('R:\\test\\test-chat\\generated\\drama-reports\\tea-couple-20s\\空间分镜检查报告.md')
    expect(resolveChatFileLink(folder, '', '空间分镜检查报告.md', [])).toBeNull()
    expect(chatLinkLabel(['空间分镜检查报告', '.md'])).toBe('空间分镜检查报告.md')
  })
})
