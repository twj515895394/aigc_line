---
name: video-prompt-skill
description: 当用户需要根据文字、图片、视频或音频生成文生视频、图生视频、多模态参考视频、视频复刻、编辑、延长、音频驱动、故事板、多镜头视频或复杂动作格斗/电影武侠 Prompt 时，应使用此技能。
---

# Video Prompt Skill

## 使用目标

把用户的创作意图和参考素材转成可直接投喂视频模型的完整 Prompt、镜头级时间轴或 Prompt Pack。

结果必须同时解决：

- 开场有几个人、每人什么样子、穿着和当前状态（角色卡，不是形容词标签）；
- 从什么画面和状态开始；
- 空间、周边物件和光从哪里来；
- 谁或什么在运动；
- 动作如何按时间发展；
- 镜头为什么动、怎样动、停在哪里（景别不是运镜）；
- 人物、场景、道具和运动如何保持连续；
- 表演、对白、环境音、音效和音乐怎样与画面同步；BGM 是明确决定，不是默认省略；
- 最后一拍怎样自然收束；
- Generic、Seedance 2.0 或 LTX-2.3 应采用什么表达方式。

默认目标是直接交付可复制使用的最终结果，而不是只提供灵感词、术语列表或概念讲解。

## 适用范围

支持以下任务：

- 文生视频；
- 图生视频；
- 多图、多视频、多音频参考视频；
- 视频参考复刻和视频转视频；
- 视频局部编辑；
- 视频向前或向后延长；
- 音频驱动、对白驱动和音乐卡点；
- 故事板、分镜、多镜头和多片段视频；
- 复杂现代格斗、1vN 动作戏、电影武侠和常见冷兵器战斗；
- Generic、Seedance 2.0、LTX-2.3 视频 Prompt 适配；
- 视频 Prompt 失败诊断和重写。

不负责：

- 角色立绘、场景设定图和静态海报本身的生图 Prompt；
- 视频文件下载、抽帧、转码或剪辑执行；
- 未正式支持模型的专属参数和伪造语法；
- 用导演名、风格名或质量词替代可执行的视频设计。

## 核心原则

- 除非用户明确要求讨论、脑暴、逐步设计或先提问，否则默认进入快速模式。
- 快速模式零追问、零人工确认、零过程说明，直接输出可用结果。
- 交互模式遵循 `grill-me`：每次只问一个最关键的问题，并给出推荐答案。
- 先解决开场角色卡、空间物件、初始状态、主体运动、镜头任务、表演链、声音设计和结束落点，再补风格。
- 同一镜头的画面、动作、光色、镜头、材质、声音写细，不是过载，不得自动压缩。只有指定时长里独立主事件过多时，才主动提醒用户加时长、拆段或取舍主内容。
- 主体运动、镜头运动、环境变化和声音事件必须分别判断。景别不是运镜；情绪标签不是表演；不写 BGM 不等于无 BGM，必须显式决定加或不加。
- 多模态素材必须分配职责；每个关键维度只能有一个主真源，禁止平均融合。
- 导演台是可选的段落级参考层，不是新任务或风格：根据上下文识别预演视频/关键帧；预演视频提供动态镜头与空间证据，关键帧提供静态锚点；代理模型的颜色、材质和渲染风格默认不继承。
- 同一知识只保留一个正文真源；索引可以多处引用，但禁止复制正文。
- Reference 可以很多，但每次只读取当前任务真正需要的一条或几条路线。
- 复杂战斗遵循“约束错误，不约束创作”：固定因果、连续性和物理底线，不固定招式、Beat 数量或镜头模板。
- 复杂战斗同时遵循 **Clarity Through Structure, Not Action Reduction**：高信息密度允许存在，但必须用 Action Phrase、状态连续性、镜头可读性和执行预算组织清楚。
- Combat Final Prompt 遵循 **State Machine Internalized, Choreography Externalized**：状态机制在内部运行，最终由可见动作、接触、受力和空间变化主导。
- **Action Combat Interactive 的角色打斗决策必须把 Character / Narrative Identity、Combat System / Technique Backbone、System Refinement、Combat Expression 分开；职业 / 性别 / 年龄 / 外貌 / 体型不能直接替代 Combat System。**
- **Action Combat Interactive 还必须执行 `references/tasks/action-combat-video/interactive-combat-policy.md`：中国功夫电影观感不得机械默认 MMA；Round 1 可使用 `Chinese Cinematic Kung-fu Hybrid`；Round 2 在同一 Primary Node 下分别处理 Character Combat Expression 与 optional Cinematic Combat Archetype；Hybrid 默认静默展开，不固定追问门派混合。**
- **Interactive 不再把 legacy `Fighting Direction` 作为独立用户问卷；它由角色级 System / Refinement / Expression / optional Archetype 与 Physical Presentation Domain 自动合成为 `Derived Choreography Direction`，MVP 阶段仅映射进旧 execution slot 兼容下游。**
- **RF-22：Interactive Action Combat 必须先通过 Interactive Planning Completion Gate，确认所有当前高价值 Interactive 决策均已 resolved，之后才允许本 `SKILL.md` 在 Post-Planning Mandatory Path 入口一级直接读取 `references/tasks/action-combat-video/regression-fix-runtime-policy.md`；不得提前读取，也不得依赖下游 Policy 的 transitive MUST READ。进入任何 Post-Planning 派生前必须存在本次执行中的真实 Read Evidence。**
- Action Combat 的 `Stage-2 Pattern Hit Evidence + action-camera-handoff-playbook.md + Camera Handoff Realization Gate + prompt-assembly/control.md + Model Adapter + Camera Handoff Preservation Gate + Combat Final Preflight` 是最终交付必经路径；其中真正命中条件的 leaf execution knowledge 不能被“按需”预算跳过。
- Action Combat 的 Camera Gate 是语义合同，不是固定字段 / 固定镜头数量；普通连接动作不因为 Gate 存在而强制增加 Camera Accent。
- 不向用户暴露内部目录、维护路径、资料迁移和加载过程。

## 第一步：判断输入

读取 `references/inputs/index.md`，只选择一份主输入 Reference。

### 1. 纯文字输入

读取：`references/inputs/text-input.md`

用于从文字建立初始画面、动作顺序、镜头和时间结构。

### 2. 单张图片

读取：`references/inputs/single-image-input.md`

先判断图片职责：首帧、尾帧、人物、场景、风格、构图、动作或表情终态。

### 3. 多张图片

读取：`references/inputs/multi-image-input.md`

必须为每张图片分配明确职责，并确定人物、服装、场景、首帧、尾帧、构图、光影和动作各自的主参考。

### 4. 一个或多个视频

读取：`references/inputs/video-input.md`

先判断视频提供动作、表演、运镜、节奏、转场、特效、声音，还是待编辑 / 延长主体；若上下文称其为导演台/预演/代理动画，则按导演台参考层解析，不自动复刻代理外观或声音。

### 5. 音频输入

读取：`references/inputs/audio-input.md`

判断音频承担对白、音色与语气、时间节拍、BGM、环境音、拟音或关键音效。

### 6. 图片 / 视频 / 音频混合输入

读取：`references/inputs/mixed-multimodal-input.md`

混合输入只读取这一份主输入页，不同时加载多份单模态输入页。

导演台素材是可选职责：可以只有预演视频、只有关键帧、与其他素材共同出现，或完全不存在。明确用户职责优先；普通参考素材不因白模/彩模外观自动升级为导演台；歧义时按普通素材处理。

## 第二步：判断任务

读取 `references/tasks/index.md`，只选择一份主任务路线。

### 1. 文生视频

读取：`references/tasks/text-to-video/playbook.md`

### 2. 图生视频

读取：`references/tasks/image-to-video/playbook.md`

### 3. 多模态参考视频

读取：`references/tasks/multimodal-reference-video/playbook.md`

### 4. 视频参考复刻 / 视频转视频

读取：`references/tasks/video-reference-and-video-to-video/playbook.md`

### 5. 视频局部编辑

读取：`references/tasks/video-editing/playbook.md`

### 6. 视频向前 / 向后延长

读取：`references/tasks/video-extension/playbook.md`

### 7. 音频驱动与音乐卡点

读取：`references/tasks/audio-driven-and-beat-sync/playbook.md`

### 8. 故事板 / 多镜头 / 多片段到视频

读取：`references/tasks/storyboard-and-multi-shot-video/playbook.md`

### 9. 复杂动作格斗 / 电影武侠

当核心难点是持续攻防、动作编排、Battle Beat、Range / Advantage / Condition、1vN Target Handoff、兵器连续性、接触实感或 Action / Camera / Audio 三线同步时，固定读取：

- `references/tasks/action-combat-video/index.md`
- `references/tasks/action-combat-video/core-playbook.md`
- `references/tasks/action-combat-video/choreography-playbook.md`

如果当前是 **Interactive Action Combat**，额外固定读取：

- `references/tasks/action-combat-video/interactive-combat-policy.md`

它负责 Round 1/2 的角色级交互语义、Chinese Cinematic Kung-fu Intent 推荐排序、`Chinese Cinematic Kung-fu Hybrid`、Hybrid Refinement 边界与 optional Cinematic Combat Archetype；不占普通 Controls / Libraries 预算。

然后只选择一个专项分支：

- 现代格斗：`references/tasks/action-combat-video/modern-combat-playbook.md`
- 电影武侠：`references/tasks/action-combat-video/cinematic-wuxia-playbook.md`

> MVP 说明：上述 Modern / Wuxia 分支当前继续作为 legacy specialist 路由使用；Interactive 中 `Physical Presentation Domain` 与角色 `Combat System` 已正交。太极不自动等于 Wuxia，MMA 不自动等于 Modern。更深的 specialist 重构等本轮真实回归通过后再做。

### Action Combat Post-Planning Mandatory Path

**RF-22 适用范围：仅 Interactive Action Combat；本轮不改变 Quick Mode。**

Interactive 中所有高价值 Combat 决策完成后，包括已经需要暴露并确认、继承或按当前 Policy 合法解析为默认/none 的 Combat System / System Refinement、Character Combat Expression / optional Cinematic Combat Archetype、Advantage / Ending、Camera Base Viewing Priority / Camera Hard Constraint、Physical Presentation Domain 等，进入任何 Derived Choreography / Stage-2 派生之前，由本主路由执行以下 Completion Gate。

#### RF-22 Interactive Planning Completion Gate

##### Pending User Decision Guard

在任何 Completion Gate 判定、Runtime Direct READ 或 Post-Planning 派生之前，先检查当前是否存在**已经向用户提出、但尚未收到用户答复的高价值 Interactive 决策**。

只要 assistant 已经明确向用户发出类似：

```text
请选择 A / B / C / D
你选哪一项？
请确认 Ending / Camera / Physical Scale / Combat System / Expression / Archetype
```

且用户尚未对该问题作答、取消该问题或明确授权 Runtime 自动决定，则该项必须保持：

```text
Pending User Decision = PRESENT
→ corresponding Planning Field = unresolved
→ Interactive Planning Completion Gate = FAIL
```

此时禁止：

```text
READ regression-fix-runtime-policy.md
READ / 预加载任何仅服务 Post-Planning execution 的 Stage-2 / Camera Handoff / Prompt Assembly Reference
Derived Choreography
Duration Budget / Exchange Spine
Stage-2 Gap / Pattern Selection
Concrete Action Phrase
Final Assembly
```

**已经把问题问给用户后，不允许在等待回复期间把该问题重新解释成“可默认 / 可继承 / none”，也不允许为了节省下一步时间预读下游 Runtime。** 只有用户实际回复、明确跳过，或明确授权“你帮我选 / 直接决定”后，才重新解析该字段并再次执行 Completion Gate。

该 Guard 高于普通 `resolved by default / inherited / none` 推断：是否可以默认必须在**向用户提问之前**决定；一旦已向用户暴露为高价值选择，就必须等待这次选择闭合。

在 Direct READ `regression-fix-runtime-policy.md` 之前，必须先检查当前 Interactive Planning Context 是否已经完成。至少逐项判断：

```text
Pending high-value user decision = none?
Combat System / required Refinement resolved?
Character Combat Expression resolved?
optional Cinematic Combat Archetype resolved as selected / inherited / none?
Advantage / Ending resolved?
Camera Base Viewing Priority resolved?
Camera Hard Constraint resolved when user-specified or high-value ambiguous?
Physical Presentation Domain resolved?
```

`resolved` 不等于“每一项都必须新增一轮问卷”。允许沿用当前 Interactive Policy 的 `Known → Refine`、高置信度继承、合法默认值、`none` 与条件暴露逻辑；本 Gate 只负责阻止**尚未 resolved 的高价值决策**被误判成 Planning Complete，不改变既有 UX 轮次设计。

如果任一当前高价值项仍是 unresolved，或存在 Pending User Decision：

```text
Interactive Planning NOT Complete
→ DO NOT READ regression-fix-runtime-policy.md
→ 不得产生 Derived Choreography / Duration Budget / Exchange Spine / Stage-2 / Assembly
→ 返回 Interactive，继续解决当前最上游的 unresolved 高价值决策
```

只有全部当前高价值项 resolved、且 `Pending User Decision = NONE` 后：

```text
Interactive Planning Completion Gate PASS
→ Interactive Planning Complete
→ READ references/tasks/action-combat-video/regression-fix-runtime-policy.md
→ RF-22 Runtime Handoff Read Evidence Gate
→ Confirmed Per-Character Combat Context
→ Derived Choreography Direction
→ legacy Fighting Direction execution slot（MVP compatibility only）
→ Duration-aware Choreography Budget / Exchange Spine（按 Runtime Policy）
→ Stage-2 Gap Detection
→ Stage-2 Pattern Hit Evidence Gate
→ 必要 leaf execution knowledge Read
→ Concrete Action Phrase
→ State / Continuity Validation
→ Model Execution Realizability
→ Motion / Energy Carry-over
→ action-camera-handoff-playbook.md
→ Camera Handoff Realization Gate
→ Camera / Spatial Coordination
→ prompt-assembly/control.md
→ 当前 Model Adapter
→ Camera Handoff Preservation Gate
→ Combat Final Preflight（检查 Adapter 后实际 Final Prompt）
→ Output Template / Delivery
```

这里 `regression-fix-runtime-policy.md` 的 Direct READ 是 **一级 Routing Truth**：

- 不能只因为 `interactive-combat-policy.md` 提到它就假定已经加载；
- 不能只因为 Final Prompt 看起来符合其中规则就假定已经加载；
- 不能使用历史任务的 Read 作为当前任务 Evidence；
- 不能在 Interactive Planning Completion Gate PASS 之前提前读取；
- 不能在 Pending User Decision 存在时预读；
- 只有当前这一次执行中、Completion Gate PASS 之后真实发生的文件 READ 才有效。

#### RF-22 Runtime Handoff Read Evidence Gate

在任何 Post-Planning 派生开始前检查：

```text
Pending User Decision = NONE ?
Interactive Planning Completion Gate = PASS ?
Current Execution
→ actual READ regression-fix-runtime-policy.md after Completion Gate PASS ?
```

如果三项 Evidence 都存在：

```text
→ PASS-NATIVE
→ 正常继续 Post-Planning Runtime
```

如果 Completion Gate 已 PASS、但不存在有效 Runtime Read Evidence：

```text
→ 立即 READ regression-fix-runtime-policy.md
→ 作废当前已经产生的全部 Post-Planning 派生结果
→ 只保留 Confirmed Interactive Planning Context
→ 从本 Post-Planning Mandatory Path 入口重新执行
```

如果 Runtime Policy 在 Completion Gate PASS 前、或 Pending User Decision 尚未闭合时已经被提前读取：

```text
→ Early Direct Read
→ RF-22 FAIL
→ 该提前 Read 不得作为有效 Evidence
→ 不得把该执行计入 PASS-NATIVE 连续关闭计数
```

必须作废的派生结果包括已经产生的：

- Derived Choreography Direction；
- legacy Fighting Direction execution-slot 派生结果；
- Duration / Choreography Budget；
- Exchange Spine；
- Stage-2 Gap / Pattern Selection；
- Concrete Action Phrase；
- Assembly 草稿。

允许保留的只有用户 / Interactive 已确认的上游 Planning Context 与原始输入约束。

禁止：

```text
旧 Runtime 下已经生成骨架
→ 后补 READ
→ 在旧骨架上继续打补丁
```

Recovery 必须发生在 Stage-2 / Final Assembly 之前，并从 Confirmed Interactive Planning Context 重新接管。

普通 Production UX 中该 Recovery 静默执行，不向用户暴露内部文件 / 路由细节。Regression / Debug 时保留内部 Evidence，用于区分：

```text
Pending User Decision: NONE / PRESENT
Planning Completion Gate: PASS / FAIL
Runtime Policy Read Timing: after-complete / early / missing

PASS-NATIVE
= Pending User Decision NONE + Completion Gate PASS 后 Direct READ 首次正常命中，未触发 Recovery

PASS-RECOVERED
= Completion Gate PASS 后 Direct READ 漏掉，但 Handoff Gate 捕获并完整重置后恢复

FAIL
= Pending User Decision 存在时提前 Read / Early Direct Read / 没有真实 READ / 未捕获 / 未作废旧派生 / 太晚补救 / 未从正确入口重启
```

`PASS-RECOVERED` 可以继续检查同一轮下游 RF-14～RF-20，但不能视为 Direct Routing 已关闭；RF-22 的关闭标准由 Regression Spec 管理。

固定读取：

- Interactive Post-Planning：`references/tasks/action-combat-video/regression-fix-runtime-policy.md`；
- `references/tasks/action-combat-video/action-camera-handoff-playbook.md`；
- `references/controls/prompt-assembly/control.md`。

其中：

- `regression-fix-runtime-policy.md` 负责 RF-08～RF-20 的 Runtime 顺序、消费与验收，不负责 Loader 自检；
- `action-camera-handoff-playbook.md` 负责 Stage-2 Evidence、Model Execution Realizability、Motion / Energy Carry-over、Base Viewing Priority / Hard Constraint 协调、Action ↔ Camera Handoff 与 Realization Gate；
- `prompt-assembly/control.md` 负责最终保真序列化与 Common Camera Handoff Preservation Contract。

三者在相应 Action Combat 路径中均不占普通 `0-3` Controls / `0-2` Libraries 可选预算。

Realization / Preservation 都是语义 Gate：不要求固定字段、固定句式、固定 Camera Accent 数量。只有上游真正选中的高价值 Camera Moment 才要求 Realize / Preserve，普通连接动作继续当前 Shot。

#### Stage-2 leaf knowledge 条件必读

出现以下任一条件时，不得以“已经读过 Choreography / Modern / Wuxia”为由跳过 leaf execution knowledge：

- High / Expert Combat 且目标是连续高手对决；
- Derived Choreography Direction / legacy execution slot 明确要求拳腿摔控混合、Movement / Level / Axis / Route / Support 显著变化；
- 用户确认了明确 Technique Identity，例如“拳腿组合 vs 拳肘抱摔”；
- 草拟动作仍主要由前臂 / 肩线 / 抓腕 / 顶肩等 Upper-body Contact 驱动；
- Transition 缺少 Contact / Momentum / Axis / Range / Recovery Handoff；
- Final Preflight 出现 `Static Standing Combat / Upper-body Technique Dominance`。

当前 CK 最小验证阶段，如果没有其他**已经实际读取**且足以覆盖当前 Gap 的专业 leaf knowledge，必须读取：

- `references/libraries/combat-choreography-patterns/minimum-validation-set.md`

该条件必读属于 Combat Stage-2 Execution Knowledge，**不占普通 `0-2 libraries detail` 可选预算**。必须能内部回答：`Gap → Slot → 实际 leaf Read → Pattern/Detail → Concrete Action`；没有真实 Read Evidence 不能假定 Stage-2 已完成。

真正的 Combat Final Preflight 在 Model Adapter + Preservation Gate 之后执行。`prompt-assembly/control.md` 在 Action Combat 中属于必经 Final Assembly，不占普通 `0-3` Controls 的可选预算。

简单挥拳、跑跳、追逐、体育动作不进入 Combat 专项，继续使用原主任务 + `action-motion`。

Combat 内部职责：

- `core-playbook.md`：State / Continuity / Battle Runtime Skeleton；
- `choreography-playbook.md`：Coverage / Rhythm / Action Phrase / Character Identity / Tactical Interaction / Contact Solidity / Signature Moment / Execution Budget / Kinetic / Temporal / Camera Mobility / Final Preflight Criteria；
- `interactive-combat-policy.md`：Interactive Round 1/2 的 Combat System / Hybrid / Character Combat Expression / Cinematic Combat Archetype / Recommendation Ordering，以及 Post-Planning 必须移交主路由的边界声明；
- `regression-fix-runtime-policy.md`：Interactive Post-Planning 的 RF-08～RF-20 Runtime Truth；
- 专项 Playbook：Modern / Wuxia 的具体动作语言与物理尺度；
- `action-camera-handoff-playbook.md`：Stage-2 Evidence / Model Execution Realizability / Motion-Energy Carry-over / Base Viewing Priority / Camera Hard Constraint / Action-triggered Camera Handoff / Perceptual Impact / Camera Handoff Realization Gate；
- `prompt-assembly/control.md`：把内部动作设计转成连续、Action-first、可执行的 Prompt，并维护 Common Camera Handoff Preservation Contract；
- `references/models/*.md`：只负责 Adapter-specific Expression，不重新决定上游高价值 Camera Moment 是否值得存在。

Combat 不新增独立 `combat-choreography` 全局 Control。

## 第三步：判断模式

### 快速模式

除非用户明确要求交互共创，否则默认使用快速模式。

读取：`assets/templates/mode-quick-output-contract.md`

快速模式：

- 不追问；
- 不要求确认；
- 不输出多个近似方案让用户选择；
- 不展示分析、方向决策或自动补全项；
- 信息不足时自动使用最小风险默认值；
- 冲突时自行裁决，只保留最符合主目标的路线；
- 直接输出一份可复制 Prompt 或必要的 Prompt Pack。

Combat Quick Mode 必须执行 **Full Planning + Silent Resolution**：内部仍推导 Combat Intent、Branch、Fighting Direction、Coverage、Rhythm、Character Identity、Environment、Contact Solidity、Signature Moment、Camera Base Viewing Priority、用户明确的 Camera Hard Constraint、Action / Camera Execution Budget、Battle Beat 与 State Contract；这些内部状态不默认展示。

> MVP 范围：本轮优先验证 Interactive。Quick 的 legacy `Fighting Direction` 规划结构暂不全量迁移，避免一次引入过多变量。

Quick 不得因为输入简短而降低 Combat Coverage、Exchange Richness、Contact Solidity 或 Signature Moment 质量标准；也不得跳过 Stage-2 Evidence / Action–Camera Realization / Combat Final Assembly / Model Adapter / Preservation Gate / Final Preflight。

只有以下情况可以在快速模式中提出一个必要问题：

- 无法判断用户要求处理哪份输入素材；
- 同一关键维度存在两个互斥且同等强度的用户指定主参考；
- 用户要求的平台能力与任务本身确定不兼容，且不存在合理降级方案；
- 指定时长明显装不下用户要求的多件独立主事件（换场、换主体、另一套完整主动作等）。此时提醒加时长、拆段或取舍，不静默删主内容，也不把画面维度压糊。

能做合理推断时仍然不追问。

### 交互模式

只有用户明确要求共同讨论、脑暴、逐步设计、比较方向、先提问或 Grill Me 时才进入。

读取：`assets/templates/mode-interactive-output-contract.md`

如果当前任务是 Action Combat，同时读取：

- `references/tasks/action-combat-video/interactive-combat-policy.md`

其中 **Action Combat 的 Round 1/2 角色打斗语义以 `interactive-combat-policy.md` 为专项真源**；通用单轮提问、高价值问题预算、Decision Purity、Camera / Ending 条件暴露继续遵守 `mode-interactive-output-contract.md`。

规则：

- 每次只问一个问题；
- 只问当前最影响结果的变量；
- 每个问题给出推荐答案；
- 沿设计依赖顺序推进；
- 已确认的信息不重复询问；
- 能从输入和上下文推断的内容不重复确认；角色打斗两个核心节点采用 `Unknown → Select / Known → Refine`；
- 用户要求收口、先实现或先测试，或剩余问题只影响轻微细节时立即停止继续 Grill。

Combat Interactive Mode 与 Quick Mode 共用同一动作引擎和质量标准。

#### Combat Interactive Decision Purity 强制检查

每轮候选项必须只回答当前 Primary Planning Node。特别是：

- **Round 1 = Per-Character Combat System / System Refinement / explicit Hybrid Refinement**：候选必须是真正的格斗 / 武术体系、`Chinese Cinematic Kung-fu Hybrid`，或已确认体系内部的技术偏向；不得把“职业杀手 / 特工 / 警察 / 年轻女性 / 年长男性”等身份作为 Combat System；当用户明确追求中国功夫电影 / 不站桩 / 明星型华语武打观感时，优先 whole-body-capable Chinese systems / Hybrid，MMA 保留但不机械首位；
- **Round 2 = Per-Character Combat Expression / Performance Identity**：同一轮分开处理 `Character Combat Expression` 与 `optional Cinematic Combat Archetype`；不得预绑定“气质 + 明星型”套餐，不得偷换 Combat System，也不得直接塞固定 Combo / 具体 Technique Pattern；**当两个子维度都需要暴露时，必须遵守 `interactive-combat-policy.md` 的 Round 2 Atomic Interaction Contract，在同一条 assistant 消息中一次展示并要求一次回复；不得拆成下一轮，也不得新增 generic“电影动作表达参考”问卷。**
- 用户选择 `Chinese Cinematic Kung-fu Hybrid` 后默认静默展开，不固定追加“具体混哪些门派”问卷；只有用户主动指定主 / 辅倾向时才记录为 Hybrid Refinement；
- Cinematic Combat Archetype 当前可按需使用李连杰型、吴京型、甄子丹型、成龙型、李小龙型；执行语义读取 `references/libraries/combat-cinematic-archetypes/library.md`，Final Prompt 优先使用中性动作语义而不是只写明星姓名；
- 1v1 同一轮同时处理双方，不机械拆成四轮；1vN 只对主角 / 关键对手独立，次要敌人允许分组；
- Physical Presentation Domain 与 Combat System 正交，只在真正存在高价值物理 / 电影尺度歧义时条件暴露；
- legacy `Fighting Direction` 不再对用户询问，只由前述角色级决策自动形成 `Derived Choreography Direction` 后写入兼容执行槽；
- **`完整动作可读 / 电影冲击体验 / 贴身沉浸 / 空间关系 / 技巧细节` 属于 Camera Base Viewing Priority，禁止混入 Combat System / Combat Expression；**
- **`一镜到底 / No Cut / 固定机位` 属于 Camera Hard Constraint，也禁止混入角色打斗候选池；**
- Base Viewing Priority 候选不得偷偷锁死 One-take / Fixed / No Cut 等 Hard Constraint；
- Camera Hard Constraint 只限制摄影实现，不得反向改变已经确认的 Combat System / System Refinement / Combat Expression / Technique Identity / Combat Coverage；
- Camera Base Viewing Priority 与 Camera Hard Constraint 不因为概念拆分而固定增加两轮问题；Hard Constraint 只有用户明确提出或本身成为高价值分叉时才暴露。

用户完成最后一个高价值 Combat 选择后，必须先通过上面的 **RF-22 Pending User Decision Guard + Interactive Planning Completion Gate**；只有 `Pending User Decision = NONE` 且 Gate PASS 后才允许执行 **Action Combat Post-Planning Mandatory Path** 的 Runtime Direct READ / Handoff Gate。不能从 Interactive 直接跳到 Runtime Read、Derived Choreography、Stage-2 或 Final Assembly。

## 第四步：按缺口读取控制页

读取 `references/controls/index.md`。普通有人对白 / 反应 / 环境的视频，最低先读这 4 份，不计入后面的按缺口名额：

- `camera-direction/control.md`
- `performance-expression/control.md`
- `audio-visual-sync/control.md`
- `spatial-blocking/control.md`

再按当前最大缺口加载 `0-3` 份控制页。纯物体展示、无人物、无对白、无环境叙事时，可不读表演页，但仍须写运镜或固定机位声明、声音决定和环境来源。

可选方向：

- `timeline-rhythm/control.md`：时间轴、节拍和自然落点；
- `subject-motion/control.md`：主体动作、重心、惯性和反馈；
- `camera-direction/control.md`：景别、机位、主运镜和镜头失控约束；
- `spatial-blocking/control.md`：站位、朝向、视线、动线和空间关系；
- `continuity-consistency/control.md`：人物、服装、场景、道具和动作状态连续性；
- `performance-expression/control.md`：表演、微表情、呼吸、停顿和口型；
- `audio-visual-sync/control.md`：对白、音效、BGM、节拍和音画同步；
- `reference-binding/control.md`：多模态素材职责、主真源和冲突处理；
- `reference-binding/control.md`：识别到导演台上下文时，补充预演视频/关键帧分工、代理替换、片尾锁定和跨段承接；
- `prompt-assembly/control.md`：普通任务按需用于信息优先级、去重和最终组装；**Action Combat 固定读取，不计入本节 `0-3` 可选预算**；
- `realism-quality/control.md`：真实设备感、物理可信和去 AI 漂浮感。

Combat Choreography Engine 属于 Task；通用 Controls 继续只提供跨任务能力。

## 第五步：按需读取资料库

读取 `references/libraries/index.md`，正常按需加载约 `0-2` 份主要 Detail。

### 通用 Libraries

- `camera-shot/library.md`
- `action-motion/library.md`
- `performance-expression/library.md`
- `transition-effects/library.md`
- `lighting-color/library.md`
- `audio-sound/library.md`
- `genre-patterns/library.md`

### Combat Libraries

- `combat-choreography-profiles/library.md`：少量稳定 Cinematic Choreography Profile；
- `combat-cinematic-archetypes/library.md`：李连杰 / 吴京 / 甄子丹 / 成龙 / 李小龙型电影武打表达语义；只在 Interactive 选中 / 明确相关 Archetype 或确有功夫电影表达缺口时读取；
- `combat-fighting-profiles/library.md`：现代格斗 Technique / Execution Knowledge；
- `combat-martial-profiles/library.md`：武术 / 武侠空手知识；
- `combat-weapon-profiles/library.md`：刀 / 剑 / 枪 / 棍 Range、Contact、Weapon State；
- `combat-environment-patterns/library.md`：Environment Affordance 专业模式；
- `signature-moment-patterns/index.md`：轻量 Pattern 路由，再只加载命中的 `patterns/<id>.md`。

Combat V2 采用 Two-stage On-demand Loading：

```text
Task Core / Choreography / 当前专项 / 轻量索引
→ Combat Planning Context
→ Stage-2 Pattern Hit Evidence Gate
→ 条件命中的 leaf execution knowledge
→ Concrete Action Phrase
```

Detail Slot 竞争优先级：专业动作 / 兵器正确性 → Character Identity 差异化 → Signature Moment / 创意增强。

Stage-2 Gate 真正命中的 leaf execution knowledge 属于 Mandatory Execution Reference，不因普通 `0-2` Detail 预算而被跳过。

不建设 Combat Character Identity / occupation portrait Library；`source-cases/` 研究档案不进入正常运行。

## 第六步：按需读取风格

读取 `references/styles/index.md`，最多加载一份主 style Reference：

- `cinematic-live-action/style.md`
- `realistic-short-drama/style.md`
- `anime-animation/style.md`
- `comic-motion-drama/style.md`
- `commercial-advertising/style.md`
- `documentary-ugc/style.md`
- `experimental-visual/style.md`

Combat 不新增一级 Style；“角色具体会什么”由 Combat System / specialist / Profile 决定，“画面长什么样”继续由现有 Style 决定。

## 第七步：模型适配

读取 `references/models/index.md`，最多加载一份模型适配页。

### Generic

用户未指定模型时读取：`references/models/generic.md`

使用模型无关、语义清楚的自然语言，不伪造平台语法或参数。

### Seedance 2.0

用户明确使用 Seedance 2.0 时读取：`references/models/seedance-2.md`

将已确定素材职责转换为明确的 `@图片N / @视频N / @音频N` 绑定。

### LTX-2.3

用户明确使用 LTX-2.3 时读取：`references/models/ltx-2-3.md`

默认把结构化导演方案转换为具体、流动、现在时的自然语言段落。

### Combat Capability + Camera Preservation Contract

Combat Model Adapter 可提供：

- Motion Complexity Capacity；
- Multi-character Stability；
- Contact / Interaction Fidelity；
- Spatial Continuity；
- Camera Complexity Capacity；
- Temporal / Prompt Following。

没有可靠资料 / Benchmark 时标记 `Unverified`，不得伪造 High / Medium / Low。

`Unverified` 只表示未知上限，不代表模型做不到，也不得作为自动删除 / 泛化高价值 Action–Camera Handoff 的理由。

Model Capability 只改变实现路径，不偷改 Combat Intent / Coverage / 观看目标。模型若有 Verified Limitation 或真实 Generated-video Regression Evidence 需要降载，使用 Intent-preserving Degradation：优先降低 Camera 实现复杂度 / 单窗口并行复杂度，同时保留高价值 Handoff 的 Action Anchor、Viewer Intent 与 live-motion continuation。

每个 Action Combat Model Adapter 都必须继承 `prompt-assembly/control.md` 的 Common Camera Handoff Preservation Contract。Adapter 可以自由改写表达，但不得造成 `Camera Handoff Serialization Loss`。

Model Adapter 完成后，必须对**实际 Final Prompt**执行 Preservation Gate，再进入真正 Combat Final Preflight。

## 第八步：选择输出模板

所有任务固定读取一份模式输出合同，并按任务形态读取交付模板。

### 单镜头

读取：`assets/templates/single-shot-video-template.md`

### 多镜头 / 多片段 / 故事板

读取：`assets/templates/multi-shot-video-template.md`

### 多模态参考

按需补读：`assets/templates/multimodal-reference-template.md`

若识别到导演台素材，仍使用当前任务路线和模板，并在“素材职责”后加入“导演台参考约束”：预演视频锁动态镜头/空间/宏观动作，关键帧锁静态状态；声音、代理外观和渲染风格默认不继承；片尾锁定默认跨连续段落继承。

### 模型转换

按需读取：`assets/templates/model-adapted-output-template.md`

Combat 不建立平行输出模板：先用 Combat Blueprint 判断单镜头 / 多镜头，再执行 Combat-aware Prompt Assembly → Model Adapter → Camera Handoff Preservation Gate → Combat Final Preflight，**通过后**才把最终动作、镜头、声音、连续性和少量高风险约束注入现有模板 / Delivery。

输出模板只负责承载，不得覆盖 Combat Task 已确定的时间序列化、动作连续性和已经 Preserve 的 Key Camera Handoff。高密度 Combat 默认 `Continuous Action Spine + Soft Time Anchors`；通用模板不能仅因为“15 秒 / 3+ 阶段”自动改回 Hard Timeline。

## Reference 加载预算

固定读取：

- `1` 份 input Reference；
- `1` 条 task 主路线；
- `1` 份模式输出合同；
- `1` 份主交付模板。

按需读取：

- 普通人物 / 对白 / 环境视频先固定读取镜头、表演、音画、空间 4 份最低控制页，不占名额；再按缺口读取 `0-3` 份 controls；
- `0-2` 份主要 libraries detail；
- `0-1` 份 style；
- `0-1` 份 model adapter；
- `0-1` 份多模态模板；
- 失败诊断时 `0-1` 份 diagnostic。

Action Combat 额外固定读取：

- Interactive Action Combat 时的 `interactive-combat-policy.md`，负责角色级交互与推荐策略；
- Interactive Action Combat 在 Interactive Planning Completion Gate PASS 后的 `regression-fix-runtime-policy.md`，由 `SKILL.md` 一级 Direct READ，作为 RF-08～RF-20 Post-Planning Runtime Truth；
- `action-camera-handoff-playbook.md`，作为 Stage-2 Evidence / Realizability / Action–Camera Bridge / Realization Gate；
- `prompt-assembly/control.md`，作为 Final Assembly / Common Preservation Contract 必经 Reference；
- 条件命中的 Stage-2 leaf execution knowledge（当前最小验证阶段通常为 `minimum-validation-set.md`）。

这些 Action Combat Mandatory References 不占普通 `0-3 controls` / `0-2 libraries detail` 可选预算；真正由 Stage-2 Gate 命中的 leaf execution knowledge也不占普通可选预算。

Combat 的 `index + core + choreography + 一个专项分支` 视为同一主 Task 路线，不同时加载现代与武侠两个分支。

规则：

- 不为了凑满预算读取资料；
- 同一文件被多个入口命中时只读取一次；
- 不一次性读取整个目录；
- 正常生成不读取 diagnostics；
- 原始研究资料 / `source-cases/` 不作为默认运行期 Reference。

## 信息优先级

发生冲突时按以下顺序处理：

```text
用户当前明确要求
→ 必须保留 / 必须修改 / 必须禁止
→ 当前任务 Playbook / Action Combat Interactive Policy
→ 当前输入 Reference 和素材职责
→ Interactive Post-Planning Regression Runtime Policy（当前为 Interactive Action Combat 时）
→ Combat Stage-2 Evidence / Realizability / Action–Camera / Realization / Final Assembly / Preservation（当前为 Combat 时）
→ 已加载 controls
→ 已加载 libraries 与 style
→ model adapter 的能力边界和表达方式
→ 自动补全
```

模型适配可以限制能力和改变表达方式，但不能擅自改变用户的剧情目标、人物关系、Combat Intent、Coverage、核心动作或已经成立的高价值 Action–Camera Intent。

## 自动补全与冲突裁决

- 缺少时长时，默认 15 秒生产单元：简单任务可更短，复杂动作 / 图生 / 一镜到底用满 15 秒写细；不写 20–30 秒时间轴，更长叙事拆成多个 15 秒单元；
- 缺少镜头时，普通任务优先使用固定机位、轻微推进或短距离跟拍；**Action Combat 则先看 Kinetic Scope：人物发生明显 Position / Range / Axis / Route 变化时，优先简单连续跟随，不把“稳定”自动解释为固定镜头**；
- 缺少收尾时，为动作、视线、重心、镜头和声音补自然落点；
- 缺少声音时，只补有明确画面来源的环境音或拟音；
- 多素材冲突时，为每个关键维度选择唯一主真源；
- 主体动作强时通常降低无必要 Camera Complexity；**Action Combat 不因此自动降低 Camera Mobility，也不因 `Unverified` 主动删掉高价值 Camera Moment**；
- 用户选择“完整动作可读优先”时，默认优先 Whole-body / Footwork / Spatial Relationship 可读，但**不得序列化成全程固定中大全景**；在 Camera Hard Constraint 允许范围内，仍应随 Route / Level / Support / Initiative / Fight-space 与高价值 Perceptual Impact 做有动机的跟随、降位、Reframe、POV / Close-up 或必要 Cut；
- 用户明确 One-take / No Cut / Fixed Camera 时视为 Camera Hard Constraint；Hard Constraint 优先于 Base Viewing Priority 与 Camera Accent，但只限制摄影实现，不反向削减 Combat Coverage / Derived Choreography Direction；
- 互斥风格只保留最符合核心观看目标的一种；
- Combat Interactive 缺少体系时必须由 Round 1 选择 / 精炼；当用户明确中国功夫电影 / 不站桩 / 明星型华语武打观感时，使用 `interactive-combat-policy.md` 调整推荐排序，不按现代身份强推 MMA；Quick 暂按 legacy 静默规划，后续再迁移；
- 用户选择 `Chinese Cinematic Kung-fu Hybrid` 后默认由 Runtime 静默选择合理 Movement / Technique / Transition Knowledge；除非用户主动指定，否则不追加“混哪些门派”问卷；
- Combat Character Identity 不根据性别、年龄、外貌、体型直接套打法；这些只能作为能力 / 物理约束输入之一；
- Combat 缺少音乐时按场景决定弱 BGM、无 BGM 或节奏音乐，不为了“完整”机械加音乐；
- 不擅自增加新角色、新剧情线、大世界观或强情绪反转。

## Prompt 组装原则

- 先写任务和时长，再写开场角色卡：几个人，每人一行外貌 / 穿着 / 当前状态，不用 perfect / beautiful 一类空词；Combat 时每人再加一句可见打法特长；
- 再写空间最小模型：地点、前中后景、光的来源；简单场景至少 2–4 个有位置物件；首帧或复杂场面继承可见场景骨架，不压成两三个名词；
- 图生首帧把继承清单（人、服装饰品、场景、光色构图、媒介）只写一次；画面已是动作中点则第 0 秒直接接续，不重新起架；
- 15 秒高密度任务用 3–4 个 Beat 写细：每段有可见动作集合、接触点、镜头任务和环境反馈；Beat 之间不 Reset；
- 先建立初始状态，再写运动；
- 普通任务需要时间轴时分别写主体状态、镜头状态、表演 / 声音和结束状态；
- 每镜运镜必须能拆成任务 + 起始 + 主运动 + 路线 + 速度 + 停止；只有景别 = FAIL；固定机位须写明无主动推拉；一镜到底时按场内摄影师写：水平线稳定、不穿人穿景、人物快于镜头、命中才短促冲击；
- 用户锁了可见范围时，运镜写成 locked frame / micro-reframe only，并写 `frame never drops below [lock line]`；
- 表演峰值人物必须写成可见信号链；情绪标签不是表演；
- 主动作在画外时，先写一句画外原因，再写画内身体后果；禁止只写情绪，也禁止把裁掉的部位写进画面；
- 声音必须显式写环境层、事件/拟音层、身体或对白层，以及 BGM 决定（加或不加都要写原因；若加，写进入 / 让位 / 退出，不能盖过对白和关键拟音）；
- 全局固定项只写一次，本段只写变化；
- 抽象情绪改写成眼神、呼吸、眉眼、嘴角、姿态和小动作；
- 光影和声音必须有场景来源；
- 每段视频只保留一个主镜头任务；
- 多镜头必须写镜间承接和跨镜稳定项；
- 图生视频把继承清单只写一次，重点写从当前状态如何运动；画面已是动作中点则直接接续；
- Combat 先由 Core 保证 Action–Reaction、Range / Advantage / Condition / Target / Weapon / Environment 状态连续，再由 Choreography 保证 Coverage、Action Phrase、角色打法、Contact Solidity、Kinetic Scope、Temporal / Motion Continuity 与 Camera Mobility；
- Combat Stage-2 Gate 命中的 Movement / Technique / Transition Detail 必须真正进入 Concrete Action Phrase；没有 leaf Read Evidence 时不得在 Prompt Assembly 阶段用语言润色伪装 Pattern Realization；
- 用户明确确认的 Combat System / System Refinement / Hybrid Refinement / Technique Identity 必须通过**改变动作状态的可见行为**兑现；Character Combat Expression 应影响节奏、主动权与决策倾向；Cinematic Combat Archetype 应影响 Movement / Rhythm / Range / Environment / Transition 权重，但不能替代 Technique；
- 被选中的 Cinematic Combat Archetype 在 Final Prompt 中优先转换为 `combat-cinematic-archetypes/library.md` 的中性动作语义，不只写明星姓名；
- 高密度 Combat 默认使用 `Continuous Action Spine + Soft Time Anchors`，不把 Active Exchange 机械拆成每 1–3 秒一个独立动作盒；
- Combat Final Prompt 由正向动作语言主导，状态术语尽量转译为可见动作、受力和空间后果；
- Combat 的具体化必须通过 Model Execution Realizability：优先 `Whole-body Motor Driver → 关键 Technique → Opponent Response → Balance / Position Consequence → Continuation`；动作、光影、镜头可以写细，不得为了“清晰”自动压缩；主事件过多时提醒用户；
- Combat Camera 序列化必须区分 `Base Viewing Priority` 与 `Camera Hard Constraint`：全局 Camera Baseline 只保留简短观看基线和真正硬约束，高价值 Action-triggered / Perceptual Camera Accent 直接锚在对应 Action Phrase；普通连接动作继续当前 Shot，不逐动作配镜头；
- 被选中的高价值 Camera Moment 在 Action–Camera Runtime 必须通过 Realization Gate；Assembly / Adapter 可以自由改写语言，但必须 Semantic Preservation，不得把具体 Handoff 压成“关键接触时切近”等泛化 Camera 摘要；
- Combat Audio 与 Action / Camera 同一连续事件流设计，但 Audio Accent Density 不等于 Action Density；
- Negative 只针对当前最危险失败模式，不默认追加通用禁止清单，也不添加用户未要求的剧情限制；
- 最后一拍必须可自然停住。

## 输出前自查

### 输入与任务

- 是否选择唯一主输入路线；
- 是否选择唯一主任务路线；
- 多模态素材是否分配明确职责；
- 每个关键维度是否只有一个主真源。
- 若存在导演台素材，是否根据上下文正确识别其类型和职责；
- 是否区分预演视频的动态约束与关键帧的静态锚点；
- 是否明确代理替换、禁止继承代理颜色/材质/风格、导演台原声音不继承；
- 是否生成片尾锁定并让连续片段自动承接；

### 画面与运动

- 开场是否写清人数和每人角色卡（外貌 / 穿着 / 当前状态），而不是身份形容词；Combat 是否有打法特长；
- 初始画面是否清楚；图生是否从动作中点接续而不是重新起架；
- 空间是否有前中后景和有位置的周边物件 / 场景骨架，光是否有来源；
- 是否锁在 15 秒内写细，而不是扩成 20–30 秒；
- 画面、动作、光色、镜头是否写细，且没有被当成过载自动压短；
- 独立主事件是否超出指定时长；若是，是否已提醒用户而不是静默删内容；
- 主体运动和镜头运动是否分开；
- 动作阶段、重心、接触和反馈是否成立；
- 镜头是否有任务、起点、主运动、路线、速度和停止点，而不是只写景别；
- 用户锁了可见范围时，是否写了上下边界、禁止下探、无主动推拉出锁；
- 空间、站位、朝向和道具状态是否连续。

### Combat 专项

如果当前是 Action Combat，**Model Adapter 完成后、最终交付前**必须对实际 Final Prompt 完成一个合并 Gate，而不是只确认文件“读过”：

1. **角色决策是否分层**：Character / Narrative Identity 是否没有吞并 Combat System；Interactive 的 System / Refinement / optional Hybrid Refinement / Character Combat Expression / optional Cinematic Combat Archetype 是否真实保留；Derived Choreography Direction 是否由这些信息派生而非重新覆盖用户决策；
2. **Stage-2 是否真的命中**：当前 Derived Choreography Direction / Technique Identity / Movement Gap 是否需要 leaf execution knowledge；若需要，是否有真实 `Gap → Slot → leaf Read → Pattern/Detail → Concrete Action` Evidence；
3. **动作是否够**：Coverage / Exchange Depth / Kinetic Scope 是否与观看目标相符，是否仍有长对峙、上半身锁死、动作被时间摊薄；
4. **动作是否连续**：Action Phrase 是否通过 Contact / Momentum / Footwork / Axis / Range / Position 等继承，是否仍是一招一停、轮流出招；
5. **角色是否合理且真实区分**：Combat System / Refinement / Expression / Archetype 是否能从改变状态的 Movement / Technique / Initiative / Rhythm / Environment Use 看出差异；用户已确认的技术差异是否真实兑现，而不是标签化或只出现一次未形成后果的尝试；
6. **Model Execution Realizability 是否通过**：动作是否具体可执行；是否把画面维度写细误判为过载；Feet-fixed Test 是否失败；指定时长里独立主事件是否过多却未提醒；
7. **接触与状态是否成立**：Contact 是否有 Commitment、受力 / 压力、Reaction 与 Persistent Consequence；Range / Position / Advantage / Environment 是否影响下一拍；
8. **Camera Realization 是否成立**：被选中的高价值 Camera Moment 是否有具体 Action Anchor、匹配的 Camera Response / Viewer Task、Live Motion / State Continuation，并服从 Camera Hard Constraint；是否仍只是“第一次接触 / 关键时刻切近”；
9. **Camera Preservation 是否成立**：Assembly / Model Adapter 后，关键 Handoff 是否仍保留 Action Anchor、Action↔Camera 因果、主要 Viewer Intent 与必要 live motion；Camera State 是否先建立后引用；是否出现 `Camera Handoff Serialization Loss`；
10. **镜头是否跟得上且尊重 Camera 决策层级**：Base Viewing Priority 是否仍允许高价值 Route / Level / Support / Initiative / Perceptual Accent；关键 Cut / Reframe 是否继承 Active Motion；用户明确 One-take / No Cut / Fixed Camera 时是否存在 `Camera Hard Constraint Violation`；
11. **最终序列化是否正确**：高密度 Combat 是否保持 Continuous Action Spine + Soft Time Anchors；Hard Timeline 若存在是否有明确理由且跨块无 Reset；Global Camera Baseline 是否短，关键 Camera Accent 是否锚在具体 Action Moment；
12. **Prompt 是否 Action-first**：是否由可见动作主导，Negative 是否少而有依据。

任一关键项 FAIL：内部回到 Stage-2 Read / Pattern Selection / Action Phrase / Character System / Expression / Archetype Realization / Action–Camera Handoff / Prompt Assembly / 当前 Model Adapter 的对应层重写，重新执行 Gate，通过后才允许交付。

其中：

```text
Action–Camera Decoupling / Realization FAIL
→ 回 Action–Camera Runtime

Camera Handoff Serialization Loss
→ 只回 Prompt Assembly / 当前 Model Adapter
→ 不重新设计 Choreography
```

### 表演与音画

- 情绪是否转成可观察表演链，表演峰值人物是否明确；
- 主动作在画外时，是否写成画外原因 → 最先泄露的局部 → 呼吸/肩线 → 锁线内浮动 → 短峰值 → 余波；
- 对白是否有说话人、停顿和身体动作；
- 环境音、拟音、对白是否分层，并绑定画面节点；
- BGM 是否显式决定：无 BGM 要写原因；有 BGM 要写进入 / 让位 / 退出，且不盖过对白和关键拟音；
- 声音是否有来源和空间关系。

### 结构与模型

- 是否有清楚开始、推进和结束状态；
- 多镜头是否有承接与跨包交接；
- 用户未指定模型时是否使用 Generic；
- Seedance 是否正确绑定素材职责；
- LTX 是否使用连贯自然语言并强调运动；
- Model Combat Capability 未验证时是否诚实标记 Unverified，但没有把 Unverified 当作自动降级依据；
- Model Adapter 后是否执行 Camera Handoff Preservation Gate；
- 是否删除无价值备选、自动补全说明和重复内容。

## 失败诊断

只有用户明确反馈生成效果不好、多个维度同时失效或 Prompt 存在复杂冲突时，读取：`references/diagnostics/index.md`

Combat 主诊断：

- Advantage / Condition / Target / Weapon / Beat State 前后无法同时成立 → `combat-state-continuity-failure`；
- Active Combat Coverage / Exchange Richness / Kinetic / Temporal / Motion Continuity 明显不足 → `combat-choreography-underfill`；
- Contact 已发生但受力 / 压力 / 兵器 / 材质后果不可信 → `combat-contact-solidity-failure`。

手 / 肢体穿模、整体失重、Camera Chaos、音画错位继续使用对应通用 Diagnostic。

正常生成任务不提前加载诊断层；每次只选一个主 Diagnostic。

## 严禁事项

- 不只写风格，不写时间和运动；
- 不把主体运动和镜头运动混成一句空话；
- 不让多张图片、多个视频或音频平均融合；
- 不用大量导演名、品牌名或质量词代替执行变量；
- 不同时堆叠多个主运镜；
- 不把多个互斥的独立主事件硬塞进同一秒；同一镜头的动作、光影、镜头、声音可以同时写细；
- 不把画面维度写细误判为过载，也不自动压缩已写清的细节；
- 不默认输出主版本、备选 A、备选 B；
- 不默认展示“已自动补全项”；
- 不伪造未支持模型的参数和语法；
- 不把研究区原始资料 / source-cases 直接作为默认最终知识；
- Combat 不把招式示例、Beat 数量、回归场景、Profile、Pattern 或默认节奏写成死框架；
- Combat 不使用固定 `2-4` / `2–4` 交互节点作为 Battle Beat 全局动作数量上限；
- Combat 不为了“清晰”默认减少有效攻防；
- Combat 不把职业、性别、年龄、外貌或体型直接映射固定 Combat System / 固定打法；
- Combat Interactive 不因“现代 / 杀手 / 警匪 / 办公室”机械默认 MMA；
- Combat Interactive 不再暴露 legacy Fighting Direction 候选；
- Combat Round 2 不把 Character Combat Expression 与 Cinematic Combat Archetype 预绑定成套餐；
- Combat Round 2 在需要暴露 Expression + Archetype 时不得拆成两轮，也不得新增 generic“电影动作表达参考”独立问卷；
- Combat 选择 `Chinese Cinematic Kung-fu Hybrid` 后不固定追问混哪些门派；
- Combat 不把李连杰 / 吴京 / 甄子丹 / 成龙 / 李小龙型当成 Combat System；
- Combat System / Combat Expression 候选不混入 Camera Base Viewing Priority 或 Camera Hard Constraint；
- Combat 不把 Base Viewing Priority 写成固定 Shot Template；
- Combat 不把 One-take / No Cut / Fixed Camera 当成“完整动作可读 / 电影冲击”等观看优先级；
- Combat 不违反用户明确 Camera Hard Constraint；
- Combat 不用 Camera Shake / 大音效代替真实 Contact；
- Combat 不因“完整动作可读优先”自动锁成全程固定中大全景；
- Combat 不因通用单镜头模板自动把高密度连续战斗切成多个 Hard Time Blocks；
- Combat 不因 `Model Capability = Unverified` 自动删除 / 泛化高价值 Camera Handoff；
- Combat Model Adapter 不得造成 `Camera Handoff Serialization Loss`；
- Combat Interactive 不允许在 Pending User Decision 存在时读取 `regression-fix-runtime-policy.md` 或预加载仅服务 Post-Planning execution 的 Stage-2 / Camera Handoff / Prompt Assembly Reference；
- Combat Interactive 不允许在 RF-22 Interactive Planning Completion Gate PASS 之前提前读取 `regression-fix-runtime-policy.md`；Early Direct Read 直接判 RF-22 FAIL；
- Combat Interactive 不允许从最后一个高价值选择直接跳过 RF-22 Direct READ / Read Evidence Gate 进入 Derived Choreography、Stage-2 或 Final Assembly；
- Combat Interactive 触发 RF-22 Recovery 后，不允许复用漏读状态下的 Post-Planning 派生骨架；
- Combat 不建立独立 single-shot / multi-shot 模板副本；
- 不把单段 15 秒任务写成 20–30 秒时间轴；
- 不暴露内部 Reference、目录、迁移和维护说明。
