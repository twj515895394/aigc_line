import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { resolveChatFileHref } from '../shared/chat-file-href'

function RevealMenu({ x, y, onReveal, onClose }: { x: number; y: number; onReveal: () => void; onClose: () => void }) {
  useEffect(() => {
    const close = () => onClose()
    window.addEventListener('pointerdown', close)
    window.addEventListener('keydown', close)
    return () => {
      window.removeEventListener('pointerdown', close)
      window.removeEventListener('keydown', close)
    }
  }, [onClose])

  return createPortal(
    <div
      role="menu"
      className="fixed z-[300] min-w-[160px] rounded-lg border border-white/15 bg-[#16161e] py-1 shadow-xl"
      style={{ left: x, top: y }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        role="menuitem"
        className="block w-full px-3 py-1.5 text-left text-xs text-[#e8e6df] hover:bg-white/10"
        onClick={() => {
          onReveal()
          onClose()
        }}
      >
        打开所在目录
      </button>
    </div>,
    document.body,
  )
}

export function workspaceFilePath(folderPath: string | undefined, relOrAbs?: string): string | null {
  return relOrAbs ? resolveChatFileHref(folderPath, relOrAbs) : null
}

async function revealWorkspaceFile(filePath: string | null, source: string): Promise<void> {
  console.info('[reveal-in-folder]', source, filePath)
  if (!filePath) {
    console.warn('[reveal-in-folder] skipped: empty path', source)
    return
  }
  if (!window.electronAPI?.showItemInFolder) {
    console.error('[reveal-in-folder] electronAPI.showItemInFolder missing')
    return
  }
  try {
    const result = await window.electronAPI.showItemInFolder(filePath)
    console.info('[reveal-in-folder] ipc result', result)
    if (!result?.success) console.warn('[reveal-in-folder] failed', result?.error)
  } catch (error) {
    console.error('[reveal-in-folder] ipc threw', error)
  }
}

export function RevealInFolder({
  filePath,
  className,
  children,
  title = '在资源管理器中显示该文件',
}: {
  filePath: string | null
  className?: string
  children: ReactNode
  title?: string
}) {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const reveal = () => { void revealWorkspaceFile(filePath, 'card') }
  if (!filePath) return <div className={className}>{children}</div>
  return (
    <>
      <button
        type="button"
        className={['cursor-pointer', className].filter(Boolean).join(' ')}
        title={title}
        onClick={reveal}
        onContextMenu={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setMenu({ x: event.clientX, y: event.clientY })
        }}
      >
        {children}
      </button>
      {menu && <RevealMenu x={menu.x} y={menu.y} onReveal={reveal} onClose={() => setMenu(null)} />}
    </>
  )
}

export function RevealInFolderLink({
  href,
  filePath,
  className,
  children,
}: {
  href?: string
  filePath: string
  className?: string
  children: ReactNode
}) {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const reveal = () => { void revealWorkspaceFile(filePath, 'link') }
  return (
    <>
      <a
        href={href}
        className={['cursor-pointer', className].filter(Boolean).join(' ')}
        title="在资源管理器中显示该文件"
        onClick={(event) => {
          event.preventDefault()
          reveal()
        }}
        onContextMenu={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setMenu({ x: event.clientX, y: event.clientY })
        }}
      >
        {children}
      </a>
      {menu && <RevealMenu x={menu.x} y={menu.y} onReveal={reveal} onClose={() => setMenu(null)} />}
    </>
  )
}
