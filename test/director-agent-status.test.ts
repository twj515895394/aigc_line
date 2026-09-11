import { describe, expect, it } from 'vitest'
import { describeDirectorAgentHud, directorActionLabel, readDirectorRunningTool, retainDirectorRunningTool } from '../src/features/director/director-agent-status'

describe('director agent status HUD', () => {
  it('keeps idle distinct from in-progress so the stage is not mistaken for finished work', () => {
    expect(describeDirectorAgentHud({ agentBusy: false })).toMatchObject({
      tone: 'idle',
      title: 'Agent 空闲',
    })
  })

  it('shows export frame progress while Codex is writing a preview', () => {
    expect(describeDirectorAgentHud({
      agentBusy: true,
      request: { type: 'export-video' },
      exporting: true,
      exportProgress: { completed: 12, total: 240 },
    })).toEqual({
      tone: 'active',
      title: '正在导出预演视频',
      detail: '12/240 帧',
    })
  })

  it('shows capture as in-progress before the still lands on the canvas', () => {
    expect(describeDirectorAgentHud({
      agentBusy: true,
      request: { type: 'capture-still' },
    }).title).toBe('正在拍摄关键帧')
  })

  it('names the live InvokeNodeAction instead of a generic busy flag', () => {
    expect(describeDirectorAgentHud({
      agentBusy: true,
      runningTool: {
        toolName: 'mcp__aigc_canvas__InvokeNodeAction',
        toolInput: JSON.stringify({ action: 'add-element', nodeId: 'director-1' }),
      },
    })).toMatchObject({
      tone: 'active',
      title: 'Agent 正在添加场景元素',
      detail: 'add-element',
    })
    expect(directorActionLabel('review-scene')).toBe('自检并修复场景')
  })

  it('keeps a failed export visible after the Agent turn ends', () => {
    expect(describeDirectorAgentHud({
      agentBusy: false,
      generationStatus: 'error',
      generationError: '导演台 3D 渲染器未就绪',
    })).toEqual({
      tone: 'error',
      title: '导演台上次操作失败',
      detail: '导演台 3D 渲染器未就绪',
    })
  })
})

describe('director running-tool snapshot identity', () => {
  const running = {
    toolCall: {
      toolName: 'mcp__aigc_canvas__InvokeNodeAction',
      toolInput: '{"action":"add-element"}',
      status: 'running',
    },
  }

  it('reuses the previous object while the live tool is unchanged', () => {
    const first = readDirectorRunningTool([running])
    const second = retainDirectorRunningTool(first, readDirectorRunningTool([running, { toolCall: { ...running.toolCall, status: 'complete' } }, running]))
    expect(second).toBe(first)
  })

  it('returns a new object only when the live tool changes', () => {
    const first = readDirectorRunningTool([running])
    const next = retainDirectorRunningTool(first, readDirectorRunningTool([{
      toolCall: { ...running.toolCall, toolInput: '{"action":"export-video"}' },
    }]))
    expect(next).not.toBe(first)
    expect(next).toEqual({ toolName: running.toolCall.toolName, toolInput: '{"action":"export-video"}' })
  })
})
