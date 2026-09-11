export type DirectorAgentHudTone = 'idle' | 'active' | 'error'

export type DirectorAgentHud = {
  tone: DirectorAgentHudTone
  title: string
  detail: string
}

const DIRECTOR_ACTION_LABELS: Record<string, string> = {
  'add-element': '添加场景元素',
  'add-shot': '添加 Shot',
  'set-actor-path': '设置人物路径',
  'set-camera-constraint': '设置相机约束',
  'set-camera-keyframe': '设置相机关键帧',
  'apply-scene-draft': '应用场景草案',
  'review-scene': '自检并修复场景',
  'capture-still': '拍摄关键帧',
  'export-video': '导出预演视频',
}

const TOOL_LABELS: Record<string, string> = {
  InvokeNodeAction: '调用节点动作',
  GetCanvasNode: '读取画布节点',
  GetCanvasOverview: '查看画布概览',
  GetCanvasCapabilities: '读取节点能力',
  UpdateCanvasNodes: '更新画布节点',
  CreateCanvasNodes: '创建画布节点',
  ConnectCanvasNodes: '连接画布节点',
  DeleteCanvasNodes: '删除画布节点',
}

function canvasToolName(toolName: string): string {
  const parts = toolName.split('__')
  return parts[parts.length - 1] || toolName
}

function readJsonObject(value: string): Record<string, unknown> | null {
  try {
    const parsed: unknown = JSON.parse(value)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : null
  } catch {
    return null
  }
}

export function directorActionLabel(action: string): string {
  return DIRECTOR_ACTION_LABELS[action] ?? action
}

export type DirectorRunningTool = { toolName: string; toolInput: string }

export function readDirectorRunningTool(
  messages: Array<{ toolCall?: { toolName: string; toolInput: string; status: string } }>,
): DirectorRunningTool | null {
  for (let index = messages.length - 1; index >= 0; index--) {
    const tool = messages[index].toolCall
    if (tool?.status === 'running') return { toolName: tool.toolName, toolInput: tool.toolInput }
  }
  return null
}

/** Zustand/React getSnapshot must reuse the last object when the live tool did not change. */
export function retainDirectorRunningTool(
  previous: DirectorRunningTool | null,
  next: DirectorRunningTool | null,
): DirectorRunningTool | null {
  if (previous && next && previous.toolName === next.toolName && previous.toolInput === next.toolInput) return previous
  return next
}

export function describeDirectorAgentHud(input: {
  agentBusy: boolean
  request?: { type: 'capture-still' | 'export-video' } | null
  capturing?: boolean
  exporting?: boolean
  exportProgress?: { completed: number; total: number }
  generationStatus?: 'idle' | 'generating' | 'error'
  generationError?: string
  runningTool?: { toolName: string; toolInput: string } | null
}): DirectorAgentHud {
  const progress = input.exportProgress
  if (input.exporting || input.request?.type === 'export-video') {
    const total = progress?.total ?? 0
    const completed = progress?.completed ?? 0
    return {
      tone: 'active',
      title: input.exporting ? '正在导出预演视频' : '正在准备导出预演视频',
      detail: total > 0 ? `${completed}/${total} 帧` : '等待 3D 渲染器',
    }
  }
  if (input.capturing || input.request?.type === 'capture-still') {
    return { tone: 'active', title: '正在拍摄关键帧', detail: '打开导演台并渲染当前构图' }
  }
  if (input.generationStatus === 'generating') {
    return { tone: 'active', title: '导演台导出中', detail: '产物写入画布前请不要关闭' }
  }

  const tool = input.runningTool
  if (tool) {
    const name = canvasToolName(tool.toolName)
    const payload = readJsonObject(tool.toolInput)
    const action = typeof payload?.action === 'string' ? payload.action : ''
    if (name === 'InvokeNodeAction' && action) {
      return { tone: 'active', title: `Agent 正在${directorActionLabel(action)}`, detail: action }
    }
    return {
      tone: 'active',
      title: `Agent 正在${TOOL_LABELS[name] ?? name}`,
      detail: name,
    }
  }

  if (input.agentBusy) {
    return { tone: 'active', title: 'Agent 正在操作导演台', detail: '思考或调度中，尚未结束本回合' }
  }
  if (input.generationStatus === 'error') {
    return { tone: 'error', title: '导演台上次操作失败', detail: input.generationError?.trim() || '查看节点错误后重试' }
  }
  return { tone: 'idle', title: 'Agent 空闲', detail: '当前没有正在进行的导演台操作' }
}
