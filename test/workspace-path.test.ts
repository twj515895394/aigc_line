import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { isPathInsideFolder } from '../electron/main/services/workspace-path'

describe('isPathInsideFolder', () => {
  it('accepts the folder itself and nested files', () => {
    const root = path.resolve('R:/test/project')
    expect(isPathInsideFolder(root, root)).toBe(true)
    expect(isPathInsideFolder(path.join(root, 'notes.md'), root)).toBe(true)
    expect(isPathInsideFolder(path.join(root, 'generated', 'drama-reports', 'a.md'), root)).toBe(true)
  })

  it('rejects siblings and empty paths', () => {
    const root = path.resolve('R:/test/project')
    expect(isPathInsideFolder(path.resolve('R:/test/project-other/notes.md'), root)).toBe(false)
    expect(isPathInsideFolder(path.resolve('R:/test/notes.md'), root)).toBe(false)
    expect(isPathInsideFolder('', root)).toBe(false)
  })
})
