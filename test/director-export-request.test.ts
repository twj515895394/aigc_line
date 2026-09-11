import { describe, expect, it, vi } from 'vitest'
import {
  DIRECTOR_EXPORT_CLOSED_ERROR,
  isDirectorRendererUsable,
  scheduleDirectorDialogUnmountCleanup,
  shouldRemountDirectorRenderer,
} from '../src/features/director/director-export-request'

describe('director agent export unmount cancel', () => {
  it('does not cancel an in-flight Agent export when StrictMode remounts the dialog', async () => {
    const alive = { current: true }
    const onUnmounted = vi.fn()
    alive.current = false
    scheduleDirectorDialogUnmountCleanup(() => alive.current, onUnmounted)
    alive.current = true
    await Promise.resolve()
    expect(onUnmounted).not.toHaveBeenCalled()
  })

  it('cancels the Agent export only after the dialog has really left the tree', async () => {
    const alive = { current: true }
    const onUnmounted = vi.fn()
    alive.current = false
    scheduleDirectorDialogUnmountCleanup(() => alive.current, onUnmounted)
    await Promise.resolve()
    expect(onUnmounted).toHaveBeenCalledOnce()
    expect(DIRECTOR_EXPORT_CLOSED_ERROR).toBe('导演台已关闭，导出已取消')
  })

  it('treats a disconnected or lost WebGL renderer as not ready', () => {
    expect(isDirectorRendererUsable(null)).toBe(false)
    expect(isDirectorRendererUsable({
      domElement: { isConnected: false },
      getContext: () => ({ isContextLost: () => false }),
    })).toBe(false)
    expect(isDirectorRendererUsable({
      domElement: { isConnected: true },
      getContext: () => ({ isContextLost: () => true }),
    })).toBe(false)
    expect(isDirectorRendererUsable({
      domElement: { isConnected: true },
      getContext: () => null,
    })).toBe(false)
    expect(isDirectorRendererUsable({
      domElement: { isConnected: true },
    })).toBe(false)
    expect(isDirectorRendererUsable({
      domElement: { isConnected: true },
      getContext: () => ({ isContextLost: () => false }),
    })).toBe(true)
    expect(shouldRemountDirectorRenderer(null)).toBe(false)
    expect(shouldRemountDirectorRenderer({
      domElement: { isConnected: true },
      getContext: () => null,
    })).toBe(true)
    expect(shouldRemountDirectorRenderer({
      domElement: { isConnected: true },
      getContext: () => ({ isContextLost: () => true }),
    })).toBe(true)
    expect(shouldRemountDirectorRenderer({
      domElement: { isConnected: true },
      getContext: () => ({ isContextLost: () => false }),
    })).toBe(false)
  })
})
