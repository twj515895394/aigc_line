export const DIRECTOR_EXPORT_CLOSED_ERROR = '导演台已关闭，导出已取消'

/** True once the WebGL renderer is still attached and has not lost its context. */
export function isDirectorRendererUsable(
  gl: {
    domElement?: { isConnected?: boolean }
    getContext?: () => { isContextLost?: () => boolean } | null
  } | null | undefined,
): boolean {
  if (!gl) return false
  if (gl.domElement?.isConnected === false) return false
  const context = gl.getContext?.()
  if (!context) return false
  if (typeof context.isContextLost === 'function' && context.isContextLost()) return false
  return true
}

/** Existing renderer that is disconnected, missing, or context-lost must be thrown away. */
export function shouldRemountDirectorRenderer(
  gl: {
    domElement?: { isConnected?: boolean }
    getContext?: () => { isContextLost?: () => boolean } | null
  } | null | undefined,
): boolean {
  return !!gl && !isDirectorRendererUsable(gl)
}

/**
 * React StrictMode replays mount effects. Defer unmount cancellation until the
 * dialog has actually left the tree, otherwise Agent capture-still/export-video
 * is rejected with "导演台已关闭" while the stage is still open.
 */
export function scheduleDirectorDialogUnmountCleanup(isAlive: () => boolean, onUnmounted: () => void): void {
  queueMicrotask(() => {
    if (isAlive()) return
    onUnmounted()
  })
}
