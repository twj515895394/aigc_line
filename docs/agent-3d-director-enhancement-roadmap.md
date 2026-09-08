# AIGC CANVAS：Agent 驱动 3D 导演台增强路线图

> 目标：把当前“Agent 能操作画布、部分操作 3D 导演台”的能力，进一步升级为“Agent 能完成导演规划、执行、预演检查、自动修正，并把 3D 结果作为 AI 视频控制信号”的完整导演闭环。

## 1. 当前能力基线

AIGC CANVAS 已经具备较好的底层基础：

- Agent 可通过 Canvas MCP 读取和修改画布节点。
- `director` 节点已经持有可序列化的 `DirectorProject`。
- Agent 已能通过节点 Action 操作部分导演台能力，例如：
  - 添加场景元素；
  - 新建 Shot；
  - 设置人物路径；
  - 设置相机关键帧；
  - 设置相机跟随 / 注视约束；
  - 根据参考图生成基础 3D Blocking 草案。
- 3D 导演台已具备：
  - 场景搭建；
  - 演员 / 群演 / 道具；
  - XYZ 人物路径；
  - 多 Shot；
  - Camera Keyframe；
  - Camera Follow / Look At；
  - 24fps 时间线；
  - PNG 构图输出；
  - WebM 预演视频输出。

当前最大的提升空间，不是再增加更多 3D 编辑 UI，而是让 Agent 真正具备“导演能力”，形成：

```text
用户需求 / 剧本
      ↓
Director Agent
      ↓
人物调度 / Shot Planning / Camera Blocking
      ↓
3D 导演台
      ↓
Render Preview
      ↓
Agent / Reviewer 检查
      ↓
自动修正
      ↓
输出 RGB / Depth / Pose / Mask / Camera / Motion
      ↓
AI Video Model
```

---

# 2. 总体设计原则

## 2.1 Agent 操作数据模型，不操作 GUI

不要让 Agent 通过鼠标、键盘或 UI 自动化去“点击 Three.js 编辑器”。

推荐路径：

```text
Agent
  ↓
Director MCP / Director Actions
  ↓
DirectorProject
  ↓
Three.js Renderer
```

Agent 负责语义与导演决策，程序负责：

- 几何计算；
- 碰撞检测；
- 距离计算；
- 可见性；
- 相机求解；
- 时间线采样；
- Schema 校验。

## 2.2 避免 Agent 高频整体覆盖 DirectorProject

`directorProject` 整体读写可以保留，但只建议用于：

- 导入；
- 迁移；
- 备份恢复；
- 大批量结构替换。

日常 Agent 操作应尽量走细粒度、可校验的 Director Actions，避免修改相机时误覆盖人物路径或 Shot 数据。

## 2.3 所有 Agent 修改必须可追踪、可回滚、可保护

需要同时支持：

- 用户手工编辑；
- Agent 编辑；
- Reviewer 建议；
- 自动修正。

因此必须保留明确的 revision / diff / lock 机制。

---

# 3. P0：先把“Agent 可控 3D 导演台”做扎实

## 3.1 Director 专用细粒度 Actions

建议新增或统一以下能力。

### 读取类

- [ ] `GetDirectorOverview`
- [ ] `GetSceneElements`
- [ ] `GetActor`
- [ ] `GetShot`
- [ ] `GetCameraState`
- [ ] `GetDirectorCapabilities`

### 场景类

- [ ] `CreateElement`
- [ ] `UpdateElement`
- [ ] `DeleteElement`
- [ ] `DuplicateElement`
- [ ] `SetElementTransform`
- [ ] `SetElementVisible`
- [ ] `SetElementLock`

### 人物类

- [ ] `CreateActor`
- [ ] `UpdateActor`
- [ ] `SetActorPose`
- [ ] `SetActorPath`
- [ ] `SetActorFacing`

### Shot / Camera 类

- [ ] `CreateShot`
- [ ] `UpdateShot`
- [ ] `DeleteShot`
- [ ] `SetCameraKeyframe`
- [ ] `DeleteCameraKeyframe`
- [ ] `SetCameraConstraint`
- [ ] `SetShotDuration`
- [ ] `SetShotAspectRatio`

### 输出与校验类

- [ ] `RenderFrame`
- [ ] `RenderShotPreview`
- [ ] `ValidateDirectorProject`
- [ ] `ValidateShot`

## 3.2 批量事务操作

建议增加：

```text
ApplyDirectorOperations([
  MoveActor,
  SetActorPose,
  CreateShot,
  SetCameraKeyframe
])
```

要求：

- 同一批操作按事务执行；
- 中间任一步失败时整体拒绝提交；
- 提交前统一做 schema + semantic validation；
- 返回每个 operation 的结果；
- 支持 dry-run。

这样可明显降低 Agent 多次写入造成的中间状态损坏。

---

# 4. P0：让 Agent 能“看见”自己的导演结果

这是最关键的一项。

仅仅让 Agent 修改 `DirectorProject` 还不够，必须形成视觉闭环：

```text
Agent 修改
    ↓
3D Renderer
    ↓
Frame / Preview
    ↓
Agent 多模态分析
    ↓
发现问题
    ↓
自动修正
```

## 4.1 建议新增

- [ ] `RenderFrame(shotId, frame)`
- [ ] `RenderShotPreview(shotId)`
- [ ] 输出 Camera View 截图
- [ ] 输出 Director View 截图
- [ ] 支持指定分辨率和画幅
- [ ] 支持返回项目内稳定路径
- [ ] 支持 Agent 直接读取预览结果

## 4.2 Agent 需要检查的基础问题

- [ ] 人物是否出框；
- [ ] 人物头顶是否被裁切；
- [ ] 主体是否被道具严重遮挡；
- [ ] 景别是否符合 Shot 设计；
- [ ] 双人镜头是否完整；
- [ ] OTS 是否具备正确肩部关系；
- [ ] 画面是否出现明显穿模；
- [ ] 构图重心是否偏离；
- [ ] Camera 是否被墙体 / 模型遮挡。

---

# 5. P0：Spatial Query 空间查询能力

不要让 LLM 自己进行精确三维几何计算。

程序应提供明确的空间查询 API，让 Agent 只负责导演判断。

建议新增：

- [ ] `GetDistance(A, B)`
- [ ] `GetRelativePosition(A, B)`
- [ ] `CheckVisibility(target, camera)`
- [ ] `CheckOcclusion(target, camera)`
- [ ] `CheckCollision(path)`
- [ ] `CheckActorFacing(actor, target)`
- [ ] `CheckPathIntersection(pathA, pathB)`
- [ ] `FindFreePosition(region)`
- [ ] `GetSceneBounds()`
- [ ] `GetCameraFraming(actorIds)`

示例输出：

```text
Actor A
- 位于 Actor B 左前方 2.4m
- 面向 Actor B 偏差 12°
- Camera 可见
- 下半身被桌面遮挡 36%
- 当前 Shot 中位于画面右侧 0.63 位置
```

这类能力会大幅提高 Agent 的稳定性。

---

# 6. P1：建立真正的 Director Agent

当前目标应从“Agent 会操作导演台”升级为：

> Director Agent 会根据剧本和导演意图自动完成 Blocking、Shot、Camera 和运动设计。

建议新增 `director-planning` Skill。

## 6.1 Director Agent 应负责

- [ ] 剧本 → Scene Blocking
- [ ] Scene → Actor Position
- [ ] Actor Position → Actor Path
- [ ] 戏剧节拍 → Shot List
- [ ] Shot → Camera Layout
- [ ] Camera Layout → Camera Keyframes
- [ ] 自动景别选择
- [ ] 自动镜头时长
- [ ] 自动安排推 / 拉 / 摇 / 移 / 跟
- [ ] 自动处理人物视线
- [ ] 自动处理进出画方向
- [ ] 自动处理人物左右关系

---

# 7. P1：Shot Planning 系统

Shot 不应只有 Camera 数据，还应具备导演语义。

## 7.1 Shot 类型

- [ ] Establishing
- [ ] Wide
- [ ] Medium
- [ ] Medium Close-Up
- [ ] Close-Up
- [ ] Extreme Close-Up
- [ ] Insert
- [ ] POV
- [ ] OTS
- [ ] Tracking

## 7.2 Shot Narrative Intent

建议在 Shot 数据中增加：

```yaml
intent:
  narrativePurpose: reveal
  emotion: pressure
  primarySubject: actorA
  secondarySubject: actorB
  composition: asymmetric
  cameraEnergy: slow
```

这样 Agent 后续修改时，理解的不只是 Camera XYZ，而是知道：

> 这个镜头为什么这样拍。

## 7.3 Shot Continuity

- [ ] previousShot
- [ ] nextShot
- [ ] screenDirection
- [ ] eyeline
- [ ] actionContinuity
- [ ] propContinuity
- [ ] entranceDirection
- [ ] exitDirection

---

# 8. P1：导演规则校验器

导演规则中有大量内容适合程序化校验，而不是完全依赖 LLM。

建议支持：

- [ ] 180° 轴线检查
- [ ] 30° 镜头角度检查
- [ ] Eyeline Match
- [ ] 进出画方向
- [ ] 人物左右关系
- [ ] 主体可见性
- [ ] Head Room
- [ ] Look Room
- [ ] Camera 穿模
- [ ] Actor 路径穿模
- [ ] Camera 运动速度异常
- [ ] Shot 时长与动作不匹配
- [ ] 人物路径结束帧越界
- [ ] Camera Keyframe 越界

建议返回：

```text
ValidateShot: WARNING

- Camera crossed 180-degree axis
- Actor B occluded by table: 42%
- Close-up head room too small
- Actor A path ends 18 frames after shot duration
```

---

# 9. P1：Cinematography Reviewer Agent

不要让 Director Agent 完全自审。

建议引入独立 Reviewer：

```text
Director Agent
      ↓
3D Previs
      ↓
Cinematography Reviewer
      ↓
问题列表
      ↓
Director Agent 修正
```

## Reviewer 负责

- [ ] 构图；
- [ ] 景别；
- [ ] 摄影机运动；
- [ ] 镜头连续性；
- [ ] 人物视线；
- [ ] 轴线；
- [ ] 节奏；
- [ ] 动作连续性；
- [ ] 道具连续性；
- [ ] Shot 之间的视觉重复。

---

# 10. P1：Director Revision / Diff / Lock

Agent 自动修改 3D 后必须可追踪。

## 10.1 Revision

- [ ] `DirectorProjectRevision`
- [ ] Shot Revision
- [ ] Operation Log
- [ ] 修改前后 Diff
- [ ] 一键回滚
- [ ] 记录修改来源

示例：

```text
v12  Director Agent  修改 Actor A 路径
v13  User            修改 Shot 03 Camera FOV
v14  Reviewer        请求修正 OTS 构图
v15  Director Agent  自动修正 Camera Position
```

## 10.2 Lock

除了现有 Element Lock，建议增加：

- [ ] Actor Lock
- [ ] Actor Path Lock
- [ ] Camera Lock
- [ ] Shot Lock
- [ ] Composition Lock
- [ ] Scene Geometry Lock
- [ ] User Override Lock

规则：

> 用户明确锁定的对象，Agent 只能提出建议，不允许直接覆盖。

---

# 11. P2：把 3D 导演台升级为 AI Video Control Layer

当前 PNG / WebM 只是第一步。

未来建议从 DirectorProject 输出多种控制信号。

## 11.1 建议输出

- [ ] RGB Reference
- [ ] Depth
- [ ] Normal
- [ ] OpenPose
- [ ] Segmentation Mask
- [ ] Actor Mask
- [ ] Object Mask
- [ ] Optical Flow
- [ ] Camera Trajectory
- [ ] Actor Trajectory
- [ ] Camera Intrinsics
- [ ] Camera Extrinsics

最终：

```text
DirectorProject
   ├─ RGB
   ├─ Depth
   ├─ Pose
   ├─ Mask
   ├─ Camera
   └─ Motion
        ↓
AI Video Model
```

这一步完成后，3D 导演台就不只是 Previs 工具，而会成为 AI 视频生成的控制层。

---

# 12. P2：角色动作系统增强

当前姿势与路径已经能完成基础 Blocking，后续可扩展：

- [ ] 单关节骨骼控制
- [ ] IK
- [ ] Foot IK
- [ ] Hand IK
- [ ] Look At
- [ ] Head Tracking
- [ ] Body Facing
- [ ] Pose Blend
- [ ] Animation Blend
- [ ] Animation Clip
- [ ] 动作时间线

目标示例：

```text
张三走到桌边
→ 右手拿起照片
→ 看一眼
→ 转身
→ 把照片扔给李四
```

Agent 能把自然语言拆成多个动作阶段并写入时间线。

---

# 13. P2：NavMesh 与自动路径规划

当前 XYZ Path 适合精确控制，但 Agent 不应每次手工计算路径点。

建议增加：

- [ ] NavMesh
- [ ] Floor Detection
- [ ] 自动绕障
- [ ] Stair Navigation
- [ ] Path Planning
- [ ] 多演员避让
- [ ] Crowd Path

这样 Agent 可以直接执行：

> 让 Actor A 从门口走到桌子右侧。

由程序求出可行路径。

---

# 14. P2：Camera Solver

同理，不建议让 LLM 自己猜标准机位坐标。

建议增加 Camera Solver：

- [ ] Frame Single Actor
- [ ] Frame Two Actors
- [ ] Close-Up Solver
- [ ] OTS Solver
- [ ] Wide Shot Solver
- [ ] Maintain Subject Size
- [ ] Maintain Screen Position
- [ ] Dolly Path Solver
- [ ] Follow Camera Solver

Agent 给出导演意图：

> 给两个人一个标准 OTS。

程序负责计算稳定的 Camera Transform / Target / FOV。

---

# 15. P2：参考图 → 3D Blocking 增强

当前已经支持参考图 Agent 搭景，可以进一步增加：

- [ ] 地面检测
- [ ] 墙体检测
- [ ] 门窗识别
- [ ] 家具识别
- [ ] 空间尺寸估算
- [ ] 深度估计
- [ ] FOV 推断
- [ ] 参考图 Camera Pose 估算
- [ ] 多图空间融合

目标：

```text
场景参考图
    ↓
Scene Understanding
    ↓
3D Blocking Draft
    ↓
Agent 修正
```

---

# 16. P3：Multi-Agent Director Harness

这一层应在 P0 / P1 稳定之后再做。

可演进为：

```text
Script Agent
    ↓
Director Agent
    ↓
Blocking Agent
    ↓
Camera Agent
    ↓
Cinematography Reviewer
    ↓
Continuity Reviewer
    ↓
AI Video Generation
    ↓
Video QA Agent
    ↓
修正 / 重生成
```

注意：

> 不建议过早拆出大量 Agent。前期应优先保证工具、状态模型、校验器和反馈闭环稳定，否则 Multi-Agent 只会增加复杂度。

---

# 17. 推荐开发阶段

## Phase 1：Agent 真正可控 3D

- [ ] Director 细粒度 Actions
- [ ] Director Overview / Detail
- [ ] Batch Transaction
- [ ] RenderFrame
- [ ] RenderShotPreview
- [ ] Director Validator

### 验收标准

用户说：

> 把男主移动到桌子右侧，女主坐在椅子上，新建一个 6 秒 Shot，镜头从双人中景推到女主近景。

Agent 可以不操作 UI，直接通过 Director Actions 完成，并在 3D 导演台正确显示。

---

## Phase 2：Agent 能自己检查

- [ ] Spatial Query
- [ ] Visibility
- [ ] Occlusion
- [ ] Collision
- [ ] Camera Framing
- [ ] Director Rule Validator
- [ ] Render → Vision → Fix 闭环

### 验收标准

Agent 修改 Camera 后，能够自动发现：

- 人物被裁切；
- 主体被遮挡；
- Camera 穿墙；
- 人物出框；

并自动调整后再次验证。

---

## Phase 3：自动导演

- [ ] `director-planning` Skill
- [ ] Shot Planning
- [ ] Actor Blocking
- [ ] Camera Blocking
- [ ] Cinematography Reviewer
- [ ] 自动修订闭环

### 验收标准

输入一段简短剧本后，Agent 可以自动生成：

- Scene Blocking；
- 人物位置和路径；
- Shot List；
- Camera Keyframes；
- 预演结果；
- Reviewer 报告；
- 修订后的最终预演。

---

## Phase 4：AI Video Control Layer

- [ ] Depth
- [ ] Pose
- [ ] Mask
- [ ] Camera Data
- [ ] Motion Data
- [ ] 对接支持控制信号的视频模型

### 验收标准

Director Project 可以作为 AI 视频生成任务的结构化控制输入，而不仅是普通 PNG / WebM 参考。

---

## Phase 5：高级虚拟制作

- [ ] IK
- [ ] NavMesh
- [ ] 高级动作系统
- [ ] Camera Solver
- [ ] 场景重建
- [ ] Multi-Agent Director Harness

---

# 18. 最值得优先实现的 5 项

如果只选择最具价值、最能拉开产品差异的五项：

1. **Director MCP / Action 细粒度化**
2. **RenderFrame / RenderShotPreview，让 Agent 能看到自己导演的结果**
3. **Spatial Query + Visibility + Collision**
4. **Director Agent + Shot Planning Skill**
5. **Director → Depth / Pose / Mask / Camera / Motion 控制输出**

其中第 2 项优先级最高。

因为只有形成：

```text
操作
 ↓
看结果
 ↓
判断
 ↓
修正
```

Agent 才真正从“能编辑 3D 数据”升级成“会使用 3D 导演台”。

---

# 19. 最终产品形态

如果以上能力逐步完成，AIGC CANVAS 的定位将不再只是：

> AI Canvas / AI 视频生成画布

而更接近：

> **Agentic AI Director Studio / AI Virtual Production System**

真正形成差异化的地方，不是接入多少个生图、生视频模型，而是：

> **让 Agent 理解剧本 → 规划人物空间关系 → 设计 Shot → 控制 Camera → 生成 3D Previs → 自动检查 → 自动修正 → 输出可用于 AI Video 的结构化控制信号。**

这将是整个项目最值得长期投入的核心能力之一。
