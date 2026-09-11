import { VIDEO_DURATIONS } from '../shared/video-duration';
/**
 * Capability declarations for the built-in canvas node kinds.
 *
 * This is the single place that teaches the agent what each node can do.
 * When a new node kind is added, register it here (or in its own module that
 * is imported for side effects) and it immediately becomes visible to the
 * GetCanvasCapabilities / UpdateCanvasNodes / InvokeNodeAction tools.
 */
import type { ComfyWorkflowInfo } from '../shared/ipc.types'
import type { NodeFieldDescriptor } from '../shared/node-capabilities'
import { listCachedComfyWorkflows } from '../shared/comfy-workflows'
import { DIRECTOR_ELEMENT_CATALOG, DIRECTOR_PRIMITIVE_KINDS } from '../shared/director-element-catalog'
import { workflowRoleLabel } from '../shared/generation-fallback'
import {
  registerNodeCapabilities,
  registerOptionProvider,
  SHARED_FIELDS_KIND,
} from '../shared/node-capabilities'

const workflowOptions = async (kinds: ComfyWorkflowInfo['kind'][]) => {
  const workflows: ComfyWorkflowInfo[] = await listCachedComfyWorkflows()
  return workflows
    .filter((workflow) => kinds.includes(workflow.kind))
    .map((workflow) => ({
      value: workflow.id,
      label: workflowRoleLabel(workflow.name, workflow.role, workflow.fallbackNote),
      recommended: workflow.recommended,
      role: workflow.role,
    }))
}

registerOptionProvider('comfy-image-workflows', () =>
  workflowOptions(['text-to-image']))
registerOptionProvider('comfy-video-workflows', () =>
  workflowOptions(['image-to-video']))

/** Read-only generation lifecycle fields shared by generative nodes. */
const generationStatusFields: NodeFieldDescriptor[] = [
  {
    key: 'generationStatus',
    type: 'enum',
    values: ['idle', 'generating', 'error'],
    description: '生成状态（只读）。generating=进行中，含自动重试和切换备用，必须继续轮询；idle 且 sourcePath 非空=该节点成功；error=该节点最终失败。只停止该节点及其下游并报告 generationError，不要打断仍在 generating 的无关并行节点；重做只针对失败节点',
  },
  { key: 'generationError', type: 'string', readonly: true, description: '最近一次生成的错误信息（只读）' },
  { key: 'preview', type: 'string', readonly: true, description: '预览地址（只读，由 sourcePath 自动派生）' },
  { key: 'sourceHistory', type: 'string-array', readonly: true, description: '历史生成结果路径（只读）' },
]

registerNodeCapabilities({
  kind: SHARED_FIELDS_KIND,
  label: '通用字段',
  fields: [
    { key: 'title', type: 'string', description: '节点标题' },
  ],
  actions: [],
})

registerNodeCapabilities({
  kind: 'image',
  label: '图片节点',
  fields: [
    { key: 'prompt', type: 'string', description: '图片生成提示词' },
    { key: 'aspectRatio', type: 'enum', values: ['16:9', '9:16', '1:1', '4:3'], description: '画幅比例' },
    {
      key: 'workflowId',
      type: 'enum',
      dynamicOptions: 'comfy-image-workflows',
      description: '图片生成模型或工作流。创建节点时必须写入设置默认项（options 中 recommended=true / 标注“设置默认”的那一项）；未指定时画布也会填入该默认。标注备用1/备用2 的模型只给生成动作自动切换，Agent 不要自己改 workflowId 去选备用或豆包',
    },
    { key: 'sourcePath', type: 'string', description: '生成结果的 workspace 相对路径' },
    { key: 'referenceImageNodeIds', type: 'string-array', description: '云端/反代图片模型的有序参考图片节点 id（Google 最多 14 张，Seedream/Gemini 反代/GPT-Grok 反代最多 10 张；ComfyUI 文生图不使用）' },
    { key: 'readOnly', type: 'boolean', readonly: true, description: '是否为工具输出的只读图片节点（只读）' },
    ...generationStatusFields,
  ],
  actions: [
    {
      id: 'generate',
      label: '生成',
      async: true,
      statusField: 'generationStatus',
      description: '使用所选图片模型或工作流生成图片；Google/Seedream/Gemini 反代/GPT-Grok 反代可按 referenceImageNodeIds 使用多张参考图，ComfyUI 当前仅文生图。节点若在设置默认链上，本动作会自动：同一模型最多 3 次，再切备用1/备用2 各最多 3 次，期间 generationStatus 保持 generating。成功后 sourcePath 写入结果。若连入的参考图 generationStatus=error 或没有 sourcePath，动作会被拒绝。轮询到本节点 error 时只停本节点及其下游，不要打断无关并行生成',
    },
  ],
})

registerNodeCapabilities({
  kind: 'video',
  label: '视频节点',
  fields: [
    { key: 'prompt', type: 'string', description: '视频生成提示词' },
    { key: 'aspectRatio', type: 'enum', values: ['16:9', '9:16', '1:1', '4:3', '3:4'], description: '画幅比例' },
    {
      key: 'workflowId',
      type: 'enum',
      dynamicOptions: 'comfy-video-workflows',
      description: '视频生成工作流。创建节点时必须写入设置默认项（options 中 recommended=true / 标注“设置默认”的那一项）；未指定时画布也会填入该默认。标注备用1/备用2 的模型只给生成动作自动切换，Agent 不要自己改 workflowId 去选备用或 Seedance',
    },
    { key: 'sourcePath', type: 'string', description: '生成结果的 workspace 相对路径' },
    { key: 'duration', type: 'number', numberValues: VIDEO_DURATIONS, description: '视频时长（整数秒），MiniMax H3 支持 1–15；Seedance 当前限制为 4–15'  },
    { key: 'firstFrameNodeId', type: 'string', description: '首帧图片节点 id（首尾帧工作流）' },
    { key: 'lastFrameNodeId', type: 'string', description: '尾帧图片节点 id（首尾帧工作流）' },
    { key: 'referenceImageNodeIds', type: 'string-array', description: '全模态参考图片节点 id（最多 9 个）' },
    { key: 'referenceVideoNodeIds', type: 'string-array', description: '全模态参考视频节点 id（最多 3 个；MiniMax H3 会同时使用视频画面与其内嵌音轨）' },
    { key: 'referenceAudioNodeIds', type: 'string-array', description: '全模态参考音频节点 id（最多 3 个）' },
    { key: 'readOnly', type: 'boolean', readonly: true, description: '是否为导演台导出的只读预演视频节点（只读）' },
    ...generationStatusFields,
  ],
  actions: [
    {
      id: 'generate',
      label: '生成',
      async: true,
      statusField: 'generationStatus',
      description: '使用所选工作流生成视频。节点若在设置默认链上，本动作会自动：同一模型最多 3 次，再切备用1/备用2 各最多 3 次，期间 generationStatus 保持 generating。成功后 sourcePath 写入结果。若连入的 image/video/audio 生成失败、仍在生成或没有 sourcePath，动作会被拒绝。轮询到本节点 error 时只停本节点及其下游，不要打断无关并行生成',
    },
  ],
})

registerNodeCapabilities({
  kind: 'audio',
  label: '音频节点',
  fields: [
    { key: 'sourcePath', type: 'string', description: '音频文件的 workspace 相对路径' },
    { key: 'preview', type: 'string', readonly: true, description: '预览地址（只读，由 sourcePath 自动派生）' },
    { key: 'readOnly', type: 'boolean', readonly: true, description: '是否为视频提取产生的只读音频节点（只读）' },
  ],
  actions: [],
})

registerNodeCapabilities({
  kind: 'upscale',
  label: '视频放大节点',
  fields: [
    { key: 'scale', type: 'number', numberValues: [2, 3, 4], description: '放大倍数，仅支持 2/3/4' },
    {
      key: 'quality',
      type: 'enum',
      values: ['FAST', 'MEDIUM', 'HIGH', 'ULTRA'],
      description: '放大质量（RTX Video Super Resolution）',
    },
    { key: 'sourcePath', type: 'string', description: '放大结果的 workspace 相对路径' },
    { key: 'inputNodeId', type: 'string', description: '输入视频节点 id（连入多个视频时用于指定其中一个）' },
    ...generationStatusFields,
  ],
  actions: [
    {
      id: 'generate',
      label: '放大',
      async: true,
      statusField: 'generationStatus',
      description: '对连入的视频节点执行 RTX 视频放大。成功后 sourcePath 写入结果。若连入视频生成失败、仍在生成或没有 sourcePath，动作会被拒绝',
    },
  ],
})

registerNodeCapabilities({
  kind: 'director',
  label: '3D 导演台',
  fields: [
    { key: 'directorProject', type: 'object', description: '完整的可序列化 3D 预演工程 v2：可替换角色模型、标准/壮硕/纤瘦/矮小/高大体型、人物动作、道具、Shot、人物路径、相机关键帧以及注视/跟随人物约束；Agent 可通过更新此字段编排导演台' },
    { key: 'sourcePath', type: 'string', readonly: true, description: '最近一次构图截图或预演视频的项目相对路径（只读）' },
    { key: 'preview', type: 'string', readonly: true, description: '最近一次构图截图或预演视频预览（只读）' },
    ...generationStatusFields.filter((field) => field.key === 'generationStatus' || field.key === 'generationError'),
  ],
  actions: [
    { id: 'add-element', label: '添加场景元素', description: `原子添加 ${DIRECTOR_ELEMENT_CATALOG.map((entry) => `${entry.kind}（${entry.label}）`).join('/')}；params: { kind, name?, position?: {x,y,z}, actorModelId?: director-rig-v1|lightweight-v1, bodyType?: standard|heavy|slim|short|tall, poseId?, heightM? }。人物动作支持 stand/walk/sit/arms-crossed/point/kneel/hands-on-hips/wave/hands-up/crouch/lean/look-back。建筑、家具和基础几何的 position 是底面锚点，贴地时 y=0；门窗框有真实开口，窗框默认落地，可通过 position.y 指定窗台高度。` },
    { id: 'add-shot', label: '添加 Shot', description: '原子添加机位 Shot；params: { name?, durationSec?, aspectRatio? }' },
    { id: 'set-actor-path', label: '设置人物路径', description: '原子设置某 Shot 的人物三维空间运动；params: { shotId, elementId, points:[{x,y,z},...], startFrame?, endFrame?, motion?, interpolation?, orientToPath? }。路径点保留真实 Y 高度，可用于台阶、坡道和不同高度的平台，不要把所有 y 强制写成 0。' },
    { id: 'set-camera-constraint', label: '设置相机约束', description: '原子设置自由/注视/跟随；params: { shotId, mode, targetElementId?, targetOffset?, followOffset? }' },
    { id: 'set-camera-keyframe', label: '设置相机关键帧', description: '原子设置相机轨迹关键帧；params: { shotId, frame, position, target, fov?, interpolation? }' },
    { id: 'apply-scene-draft', label: '应用场景草案', description: `把 Agent 多模态分析得到的建筑、家具和基础几何写入导演台；params: { referenceNodeId, draft: { summary, groundColor?, backgroundColor?, elements:[{kind,name,color,placement,transform}] } }。kind 支持 ${DIRECTOR_PRIMITIVE_KINDS.join('/')}，最多 40 个；优先用专用类型表达地面、高台、楼梯、斜坡、门窗、桌椅、沙发、床、柜子和栏杆。placement 必须为 ground 或 elevated。transform.scale 是完整宽/高/深（米）；transform.position 是底面锚点。地面、道路、建筑主体、落地家具等使用 ground，写入时强制底面落在 y=0（草案里的 position.y 会被忽略）；窗框、屋顶、横梁、招牌等确实离地的结构使用 elevated，并用 position.y 指定底面离地高度。门窗框有真实开口，避免在开口处叠加实心墙体。` },
    { id: 'review-scene', label: '自检并自动修复导演台', description: '导出前必跑。读取当前 directorProject，自动修复可贴地、人物沉地、缺少第 0 帧相机关键帧、相机仍看向原点但人物远离原点的问题；返回 remaining issues。params: { applyFixes?: boolean }，默认 true。ok=true 且 issues 无 error 才允许 capture-still / export-video。error 必须用原子动作修好后再调用本动作，最多 3 轮。warning（人物重叠、没有演员等）也要修，修不掉须向用户说明后再导出。' },
    { id: 'capture-still', label: '拍摄构图到画布', async: true, statusField: 'generationStatus', description: '打开导演台 3D 视图，拍摄当前或指定 Shot 的构图 PNG，保存到 generated/director-stills/，并创建相连的只读 image 节点。params: { shotId?, frame? }；省略 shotId 时使用当前 activeShot。自己搭建的导演台必须先成功调用 review-scene 且 ok=true，禁止搭完立刻拍摄。这是异步动作：先 ack，再轮询本节点 generationStatus。idle 且 sourcePath 非空才算成功；error 时停止并报告 generationError。' },
    { id: 'export-video', label: '导出预演视频到画布', async: true, statusField: 'generationStatus', description: '打开导演台 3D 视图，按 24fps 导出当前或指定 Shot 的 WebM 预演（最长 60 秒），保存到 generated/director-videos/，并创建相连的只读 video 节点。params: { shotId? }。自己搭建的导演台必须先成功调用 review-scene 且 ok=true，禁止搭完立刻导出。这是预演素材，不替代正式视频生成。异步动作：先 ack，再轮询 generationStatus。idle 且 sourcePath 非空才算成功；error 时停止并报告 generationError。' },
  ],
})

registerNodeCapabilities({
  kind: 'image-editor',
  label: '画板节点',
  fields: [
    { key: 'boardState', type: 'object', readonly: true, description: '画板自动保存的 Excalidraw 场景状态（只读，不包含图片 data URL）' },
    { key: 'boardPreviewPath', type: 'string', readonly: true, description: '画板当前可视区域中心截图的项目相对路径（只读）' },
    { key: 'boardPreviewUpdatedAt', type: 'number', readonly: true, description: '画板中心截图更新时间（只读）' },
  ],
  actions: [],
})
