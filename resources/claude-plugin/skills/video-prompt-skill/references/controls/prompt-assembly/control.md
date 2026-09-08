# Prompt Assembly Control

## 目标

把任务目标、素材职责、时间 / 动作、镜头、连续性、音画、风格和限制组织成一份清楚、无重复、可直接执行的导演方案。

本页负责信息优先级、组装顺序、去重、冲突裁决和输出完整性；具体模型语法由 Model Adapter 完成。不负责把已经写清的画面维度自动压短。

对于 Action Combat，必须贯彻：

> **State Machine Internalized, Choreography Externalized.**  
> **状态机内化，动作编排外显。**

并追加四条强制原则：

> **Concrete Choreography In, Concrete Choreography Out.**  
> **前面已经设计具体的动作，组装阶段不能重新压缩成抽象战斗摘要。**

> **Action Drives Camera; Camera Preserves Live Motion.**  
> **关键镜头变化必须由正在发生的动作信息触发，跨镜不能只保位置而丢掉仍在发生的运动。**

> **Selective Camera Accent, Not Camera-per-Action.**  
> **普通连接动作继承当前 Shot；只有高价值动作信息或观看体验变化才把 Camera Accent 嵌入对应 Action Phrase。**

> **Semantic Camera Handoff Preservation, Not Textual Copy.**  
> **Assembly / Adapter 可以自由改写表达，但不能把已经成立的 Action–Camera Handoff 泛化、拆散或删除。**

---

## 1. 信息优先级

```text
用户当前明确要求
→ 当前 Task / Playbook 的核心质量合同
→ 输入素材职责
→ 动作 / 时间 / 镜头关键决策
→ 风格与细节
→ 自动补全
```

### Combat 语义优先级

```text
1. 正向可见 Action Flow / Reaction / Contact / Consequence
2. Position / Range / Environment 的可见变化
3. Fighting Direction / Character Identity / Rhythm / Intensity / Signature 的可见表现
4. Action-triggered Camera Handoff / Perceptual Impact / Camera / Audio 支持
5. 少量真正必要的 Continuity / Negative Constraints
```

> **动作语言是主体，状态解释是内部工具。**

---

## 2. 通用组装顺序

1. 任务核心与输出目标；
2. 素材职责 / 强保留边界；
3. 开场角色卡（人数 + 每人外貌 / 穿着 / 当前状态）；
4. 空间最小模型（地点、前中后景、光来源；简单场景至少 2–4 个有位置物件；首帧或复杂场面继承可见场景骨架，不压成两三个名词）；
5. 全局稳定项（身份 / 服饰饰品 / 媒介 / 摄影机纪律只写一次）；
6. 动作 / 时间流（默认 15 秒生产单元）；
7. Camera Coverage（任务 + 起始 + 主运动 + 路线 + 速度 + 停止，不是只写景别）；
8. 表演链（峰值人物：起始 → 触发 → 可见信号 → 停顿 → 结束）；

用户锁了可见范围时，Camera Coverage 必须写成 locked frame / micro-reframe only，并带上下边界。主动作在画外时，表演链先写一句原因，再写画内身体后果，不把裁掉的部位写进画面。
9. Audio（环境 / 拟音 / 对白 + 显式 BGM 决定）；
10. 风格与质感；
11. 少量高价值限制；
12. Model Adapter 交接。

同一信息只写一次；动态变化不要误写成全局固定项。重复解释、内部状态表和空泛质量词可以删；**已经成立的画面、动作、光色、镜头、材质、声音描述不得因为“太细”被自动压缩。**

### 2.0 画面维度密度 vs 主事件过载（通用）

本规则对所有任务生效，不只对打斗。

**画面维度密度不是过载。** 同一个镜头 / 同一段主内容里，把下列维度写细，默认都可以承载：

- 人物外貌、服装、饰品、当前姿态；
- 场景骨架、物件、材质；
- 动作过程、接触、受力、身体反馈；
- 光线、色彩、阴影；
- 镜头任务、机位、路线、速度、停止；
- 表演、声音、连续性。

禁止把“这段 Prompt 很长 / 光影和镜头写得很具体”判成无法执行，也禁止为此静默删细节。

**只有指定时长里独立主事件过多，才算过载。** 主事件指需要单独起承转合的主体内容，例如：

- 另一套完整主动作；
- 换场 / 换主体 / 新剧情单元；
- 与当前动作链无关的新高潮；
- 15 秒里再塞进显然完不成的第二场戏。

同一动作链里的身体反馈、衣发响应、尘土、光线变化、摄影机走位，都不是新的主事件。

主事件过载时：

- 不要静默删用户要的主内容；
- 不要靠把各维度写糊来“省容量”；
- 按 `timeline-rhythm/control.md` **主动提醒用户**：当前时长装不下这些独立主事件，请加时长、拆成多段，或指定保留哪几件主内容。

快速模式也适用这条提醒，它是少数允许开口的情况。

### 2.1 15 秒生产密度合同

当前正式生产单元默认 **15 秒**。用户未指定更短时长时，复杂动作 / 图生 / 一镜到底用满 15 秒写细，不把方案写成 20–30 秒。

密度来自结构，不是来自更长片长：

```text
开头全局锁一次
→ 3–4 个 Beat 只写本段变化
→ 每 Beat 同时有动作任务、镜头任务、环境或身体反馈
→ 最后 1–2 秒从最后状态收束
```

全局锁包括当前任务真正需要的项：

- 人数与角色卡（Combat 时每人加一句可见打法特长）；
- 首帧或开场继承：服装、饰品、场景骨架、光色、构图透视、媒介；
- 摄影机纪律：机位高度、是否一镜到底、水平线、不穿人穿景；
- 稳定项与禁止项。

每个 15 秒 Beat 至少写清：

1. 本段可见动作集合（具体招式或具体行动，不是“连续攻防”）；
2. 至少一个接触点 / 受力方向，或一个清楚的空间变化；
3. 镜头从哪到哪、为什么动、停在哪；
4. 头发、饰品、布料、尘土、摊位或人群等反馈；
5. 本段最危险的一种不可读失败（乱拳、瞬移、换侧、穿模）。

Beat 与 Beat 之间必须继承姿态、动量、接触和环境状态。禁止：

- 用 6–8 个硬时间盒把 15 秒切碎；
- 每段重新起架；
- 把同一动作拆成互不相关的新主事件；
- 每个连接动作都另起一条新的主镜头事件。

同一镜头里的光影、材质、身体反馈、摄影机走位可以写细。允许写后撤约一米、降到膝部、短弧换位这类走位尺度。

---

## 3. Combat Final Prompt Assembly

### 3.1 Internal State → Visible Action

内部可以是：

```text
Range: Close
Advantage: A slight advantage
Contact: Solid
Tactical: Counter-to-Counter
```

最终不要 Dump 状态表，应写成：

> A 压进短距离；B 在偏开攻击线的同时已经侧切，A 沿她的新路线立刻封入；B 不重新站稳，借刚形成的角度反击，接触让 A 肩线偏转，这个偏转又直接成为下一次进入窗口。

重点：谁移动 / 攻击、对手如何在动作过程中响应、接触如何改变身体 / 空间、下一动作怎样直接启动。

### 3.2 Executable Granularity Preservation

如果 Choreography Plan / Stage-2 Execution Knowledge 已经提供具体动作链，Assembly 必须优先保留以下信息中的必要组合：

```text
Current Body / Range State
→ Specific Physical / Weapon Action
→ Contact / Evasion / Interception
→ Opponent Immediate Response
→ Footwork / Axis / Range / Position Consequence
→ Immediate Continuation Entry
```

不能为了“简洁”把它压回：

- 连续格挡；
- 快速反制；
- 贴身缠斗；
- 持续压迫；
- 不断换位；
- 高频攻防；
- 双方持续互有来回。

这些词可以做风格摘要或次要过渡，但不能代替关键 Active Exchange。

一个简单检查：

> **如果删除“高速 / 连续 / 专业 / 高密度 / 反制 / 缠斗”等抽象词后，仍无法清楚知道人物具体做了什么，则 Assembly 过度压缩。**

原则是：**动作必须具体可执行；同一动作的身体、光影、镜头、材质可以写细。** 不要把“写细”当成新的独立主事件，也不要为了字数把已有维度压糊。

### 3.3 Granularity 不是压缩开关

High / Medium / Low 只标记哪些是主转折事件，**不授权 Assembly 删除普通动作上的画面维度。**

普通 Exchange 和连接动作同样可以写清接触、身体反馈、光线和镜头。禁止：

- 因为标了 Medium / Low 就删身体、光影、镜头细节；
- 因为 Prompt 变长就自动压短；
- 把已经具体的动作压回“连续攻防 / 快速反制”。

若用户要在 15 秒里再塞入过多独立主转折，按 2.0 提醒，不靠削描述解决。

### 3.4 Fighting Direction Realization

开场角色卡在 Combat 中每人追加 **一句可见打法特长**，例如擅长闪避短肘扫腿，或擅长直拳摆拳持续压迫。这是角色卡的一部分，不能替代后文具体 Action Phrase。

如果用户已经明确或 Interactive 已确认 `Fighting Direction / 怎么打`，Final Prompt 必须通过**可观察的动作语言**兑现，而不是只在标题或风格段写一个标签。

至少应能从以下一项或多项看出区别：

- Movement：侧切 / 绕位 / Level Change / Ground↔Air / 直线压迫等；
- Technique：Strike / Kick / Grapple / Throw / Weapon 的实际选择；
- Range / Level：主要距离与高低位变化；
- Physical Scale：realistic / martial-grounded / wuxia cinematic；
- Rhythm / Impact / Contact 气质；
- Environment / Signature 的使用方式。

如果不同 Fighting Direction 最终仍被组装成近似同一套“前臂偏转 → 肩线封堵 → 抓腕 / 顶肩”的骨架，应判定 Assembly / Pattern Realization 失败，而不是继续堆风格形容词。

### 3.5 Continuous Action Spine

高密度 Combat 默认使用 **Continuous Action Spine + Soft Time Anchors**，并且锁在 **15 秒** 内写满，不扩成 20–30 秒。

不要默认写成每 1–2 秒一个独立动作盒：

```text
0–1.5s：动作 A
1.5–4.5s：动作 B
4.5–7.5s：动作 C
7.5–11.5s：动作 D
```

这种硬时间盒容易诱导“完成一个动作 → Reset → 下一动作”。

优先写成：

```text
First Contact（软时间锚点，约 0–3s）
→ 一条不中断的连续攻防主链
→ Major Advantage Reversal（软时间锚点，约 3–8s）
→ Signature Moment（约 8–13s）
→ Ending（约 13–15s）
```

时间锚点只定位重要阶段，不要求锚点前完整收势，也不要求锚点后重新起架。

当任务同时是图生首帧、一镜到底或 15 秒高手对决时，可以把上述锚点写成 **3–4 个 Beat 标题**，每个 Beat 内部仍是连续动作链，并写本段可见招式集合。这是生产密度，不是把战斗切成互不相关的小视频。

严格时间戳只在以下情况使用：

- 用户明确要求逐秒；
- 需要精确 Shot 边界；
- Audio / Dialogue / 外部事件精确同步；
- Model Adapter 有实测证据表明严格时间轴更稳定。

即使使用 Hard Time Blocks / Beat 标题，也必须写清跨块 Motion Handoff。

### 3.6 Action Continuity ≠ Shot Continuity

> **Continuous Action Spine 约束战斗动作与状态，不约束摄影必须一镜到底。**

Combat Final Prompt 可以动态使用：

- Master / Relationship Shot；
- Medium / Medium-wide；
- Contact / Weapon / Footwork Close-up；
- Extreme Close-up / Insert；
- Reaction / Impact Shot；
- POV / Near-subjective / Near-lens；
- Re-establish。

关键不是 Cut 数量，而是 Cut 的信息价值、观看体验价值和动作继承。

跨镜必须尽量继承：

```text
Position / Left-Right
+ Action Direction
+ Contact
+ Momentum
+ Body / Weapon Axis
+ Range
+ 当前动作后果
```

局部特写之后，如果观众可能丢失双方位置 / Range，应安排 Re-establish；禁止 Cut 后人物回到默认站位、默认距离或重新起架。

不要把“动作可读”组装成全程中全景 / 中景 + 轻微 tracking，也不要反向规定固定数量的特写 / POV / Insert。

### 3.7 Temporal Packing + Motion Handoff

不要用“高速”代替动作密度。

较长 Active Exchange 窗口应包含连续因果动作流；动作之间优先表达：

- 同时；
- 顺势；
- 接触后立即；
- 尚未站稳时；
- 在对方收势之前；
- 沿前一动作形成的新角度 / 动量 / Range；

而不是主要依赖“然后 / 随后 / 再次”。

去重时必须保留至少一类 Motion Handoff：Contact、Reaction、Momentum、Footwork、Body Axis、Range / Position。

当上游 `action-camera-handoff-playbook.md` 已形成 Motion / Energy Carry-over，Assembly 不能把它压缩成“随后继续攻击”。至少保留决定下一动作入口的 Momentum / Rotation / Support / Pressure / Recovery 之一。

### 3.8 Initiative Handoff Externalization

不要只写：

- “双方不断反制”；
- “主动权来回切换”；
- “女方迅速抢回主动”。

关键 Initiative Handoff 应在具体动作中表现：

```text
A 的攻击尚未完成
→ B 利用仍存在的 Contact / Footwork / Axis / Range / Recovery Window 改变 A 的动作
→ A 被迫立即响应
→ B 从同一运动链里接管下一次动作入口
```

可用语义包括：尚未收势、接触后立即、脚步尚未落稳、肩轴未回正、顺被偏开的线路、借仍未断开的抓控点等；这些不是固定关键词。

避免反复出现：

```text
A 完成一组攻击
→ B 开始反击
```

### 3.9 Kinetic Scope Externalization

如果内部规划存在明显 Whole-body / Position / Range / Axis 变化，Final Prompt 必须把它们写出来。

禁止把完整战斗压缩成大量：

- 抬臂格挡；
- 抓手腕；
- 压上臂；
- 原地短打；

却遗漏脚步、膝髋、躯干、重心、绕位、逼退、侧切、Range / Axis 改变。

不要求固定动作配额；只要求最终动作语言真实兑现当前 Kinetic Scope。

### 3.10 Visible Advantage

不要写“男方占优 / 女方逆转”作为主要表达。

把优势转成可见控制：

- 谁迫使对手持续 Defense；
- 谁控制 Range / Angle / Route；
- 谁逼对手退位或恢复；
- 谁通过具体动作改变对方 Axis / Position；
- 谁在 Counter 尚未结束时抢走 Initiative。

角色抢主动方式应符合 Character Identity，不把双方都写成同一种 Counter 模板。

### 3.11 Combat Intensity

Continuous 不等于全程同速。

通过 Exchange Frequency、Contact Weight / Pressure、Advantage Pressure、Kinetic Scope、Environment、Camera / Audio Accent 形成有层次的强度变化。

局部降速可以仍然很强，只要 Combat Pressure 没有消失。

### 3.12 Camera Mobility + Editorial Coverage

> **Stable ≠ Static；Mobile ≠ One-take；Camera Coupling ≠ Camera-per-Action。**

Camera Mobility 描述单个 Shot 内如何跟随 Position / Range / Axis / Route；Shot Scale / Editorial Coverage 描述整段 Combat 如何选择观察距离和 Cut。

高动作复杂度可以降低无必要 Camera Complexity，但不能自动变成：

- 全程一个机位；
- 全程中全景；
- 只允许 tracking / dolly；
- 禁止 Close-up / Insert / Impact / Reaction / POV。

默认序列化逻辑：

```text
普通连接动作
→ 继承当前 Shot / Camera Path

动作信息或观看体验出现高价值变化
→ 才考虑 Reframe / Cut / Camera Accent
```

根据当前动作信息动态组织：

```text
空间关系清楚时用 Master / Relationship
→ Route / Level / Support 变化时做有动机的跟随 / 降位 / Reframe
→ 关键 Contact / Weapon / Footwork 用局部 Shot 强化
→ Threat Approach 可短暂 POV / Near-lens
→ Impact Consequence 可使用受击侧 Close-up / Reaction
→ Range Compression 可靠近或改变关系角度
→ Advantage / Initiative Reversal 可改变 Relationship Angle / Distance
→ 空间关系可能丢失时 Re-establish
```

不设置 Shot、Close-up、POV、Insert 数量或景别配额。

如果当前 Shot 已经能同时清楚表达动作和足够冲击，不为了“更灵活”强制改变镜头。

### 3.13 Action–Camera Handoff + Perceptual Impact Preservation

如果上游已经设计 Action–Camera Handoff / Perceptual Impact Trigger，Assembly 必须保留“为什么此时 Camera Change”“观众此刻需要体验什么”与“下一镜继续什么 Motion State”，不能压缩成泛化 Camera 摘要。

优先保留的 Trigger 包括：

- Cut on Motion；
- Contact / Consequence；
- Direction / Axis Change；
- Initiative Reversal；
- Range / Level / Support Change；
- Occlusion / Match Motion；
- Environment Boundary；
- Perceptual Impact：Threat POV / Near-lens、Impact Consequence、Near-miss / Whip-by、Body-mechanics Detail、Range Compression、Initiative / Reaction Experience。

不要求把 Trigger 名写给用户，而要锚定到具体 Action Moment。

#### Global Camera Baseline 要短

Combat Final Prompt 可以保留一个简短 Camera 总体基线，用于说明：

- 动作可读；
- 空间关系清楚；
- Camera 随真实 Route / Range / Level / Fight-space 变化；
- 不无意义碎切。

但不能再把完整摄影设计集中成一个独立大段，然后让动作正文完全没有关键 Camera Moment。

#### Key Camera Accent Inline

只有真正高价值的 Camera Handoff / Perceptual Accent 才直接嵌入对应 Action Phrase；普通动作不需要附镜头说明。

避免：

> 关键接触时短暂切近，然后立刻回到中景。

优先：

> 她开始沉身从高线下穿时，镜头随身体短暂降低；脚步跨过对方支撑线、迫使他重新踩稳的一瞬切到低位近景，下一镜继续同一失衡反应，并从新的斜侧关系接住她的再进入。

Threat 体验可写成：

> 男方突然压近挥拳，拳锋快速逼近她的视线，镜头短暂贴近她的主观观看位置；她在拳头几乎占满画面前侧头闪开，镜头顺着拳势从她肩侧切出，继续同一记挥空动作。

Impact 体验可写成：

> 她趁他回收不及一拳击中侧脸，接触瞬间切到受击侧近景，看到他的头部和肩轴被冲击带偏；下一镜不重演出拳，而是直接从这股偏转继续她的外侧切入。

跨镜不仅保留 Position / Direction，还要尽量保留一类 Active Motion：Momentum、Contact、Pressure、Rotation、Support Transfer、Forced Step 或 Recovery。

如果 Cut 总发生在动作完整结束、双方站稳之后，判 `Dead-motion Cut / Post-action Cut`；如果 Camera 只在动作段后作为独立说明出现，判 `Action–Camera Decoupling`。

如果几乎每一个动作后都附 Camera 指令，判 `Camera Accent Overmapping / Perceptual Accent Overuse`。

不要机械生成 `Medium → Close → Medium → Close`。Re-establish 只在局部镜头后 Position / Range / Axis / Fight-space 可能丢失时使用。

### 3.13.5 Common Camera Handoff Preservation Contract

本节是 Action Combat 的跨模型 Preservation 正文真源。

它约束的是**必须存活的导演语义**，不是要求 Assembly / Model Adapter 原文复制。

当上游已经通过 Realization Gate 形成一个高价值 Camera Handoff 时，Assembly 与后续 Adapter 可以自由：

- 改写语言；
- 合并句子；
- 将结构化描述压成自然段；
- 使用目标模型更合适的 Camera 术语；
- 在有可靠证据时降低 Camera 实现复杂度。

但改写后仍必须保留足以恢复原导演意图的核心语义：

```text
Concrete Action Anchor
+
Action ↔ Camera 因果绑定
+
主要 Camera Task / Viewer Experience Intent
+
必要 Live Motion / State Continuation
```

### 语义保真，不是原文保真

允许：

```text
Cut → 连续 Reframe
Near-lens 术语 → 自然语言距离压缩
结构化 Handoff → 单段自然语言
```

只要核心 Action–Camera Intent 仍然成立。

不允许：

```text
具体 Action Moment
→ “第一次接触时”

具体 Viewer Experience
→ “使用更电影化的近景”

具体 live-motion continuation
→ 删除，只剩镜头变化
```

发生这类下游退化时，正式判：

`Camera Handoff Serialization Loss`

该 Failure 的前提是：**上游 Handoff 已经存在且 Realization PASS。**

Rewrite 路径：

```text
Camera Handoff Serialization Loss
→ 回 Prompt Assembly / 当前 Model Adapter
→ 恢复已有 Handoff 的核心语义
→ 不回 Choreography 重新设计动作
```

### Camera State Establishment / Reference

Assembly / Adapter 还必须检查 Camera State 的建立与引用：

- 后文写“从近景拉回 / 从主观位退出 / 恢复关系景别”时，前文是否真正建立过对应 Camera State；
- Camera State 是否能沿当前动作连续性成立；
- 不把未建立的 Camera State 当作既成事实。

这属于 Preservation / Continuity 检查维度，暂不新增独立 Failure Signature。

### Full-fidelity Default

`Camera Complexity Capacity = Unverified` 不等于“模型做不到”。

在没有 Verified Limitation 或真实 Generated-video Regression Evidence 时，不因为能力未评级就主动删掉 / 泛化高价值 Camera Handoff。

只有有证据需要降载时，才使用 `Intent-preserving Degradation`；优先降低实现复杂度，保留 Action Anchor、Viewer Intent 与 live motion。

### Validation 层级

Prompt Assembly 在交给 Model Adapter 前执行 **assembly-stage preservation validation**。

真正的最终 Preservation Gate / Combat Final Preflight 必须检查 **Model Adapter 之后、实际要交付给用户的 Final Prompt**。

因此：

```text
Assembly PASS
≠ Final PASS
```

如果 Adapter 重新造成 Serialization Loss，必须在 Delivery 前重写。

### 3.14 Ending Coverage Protection

Ending 的结果可以来自用户已确认的导演意图，但 Assembly 必须保护 Active Exchange Budget。

High Coverage 短 Combat 中：

- Ending 应继承最后一次 Contact / Position / Momentum / Advantage；
- 不把人物重新摆成静态 Pose 后再长时间对视；
- 不让呼吸、眼神、慢推镜等自动占用最后数秒；
- 默认不淡出、不定格、不突然黑屏；保持动态张力，除非用户明确要求；
- Ending 的光影、尘土、呼吸和镜头可以写细，但不能再新增大段独立主事件去吞掉 Active Exchange；
- 用户明确要求长悬停 / 情绪收尾时除外。

Assembly 不新增“最后停几秒”的用户问题；这是内部 Coverage / Serialization 责任。

---

## 4. Action Language Dominance

Combat Prompt 不设置机械字数比例，但语义上必须满足：

- 具体 Action / Reaction / Contact / Consequence 是主体；
- State / Continuity / Negative 只做支撑；
- Camera / Audio / 光色可以和动作写得同样细，但不能代替动作本身；
- Meta 解释不能比真正动作更长。

如果一段 Prompt 大部分在写“保持连续、不要瞬移、状态正确、符合物理”，而真正动作只剩几句概括，应判组装失败。镜头和光色写细、动作也写清，不算失败。

---

## 5. 去重，不自动压缩画面维度

只删除重复和空话，不删除已经成立的画面维度：

1. 重复状态解释；
2. 重复连续性提醒；
3. 空泛质量词；
4. 重复 Negative；
5. 内部状态表 / Meta。

禁止为了“更短 / 更清晰”删掉动作、光影、镜头、材质或声音细节。主事件过多时提醒用户，不静默砍内容。

必须优先保留：

- Specific Action → Immediate Response → Counter / Continuation；
- Contact → Reaction → Consequence；
- Motion / Initiative Handoff；
- Motion / Energy Carry-over；
- 关键 Footwork / Range / Position / Axis 变化；
- Major Reversal / Signature 前后的因果；
- Fighting Direction 在 Movement / Technique / Range / Physical Scale 上的真实差异；
- 高价值 Action-triggered Camera Handoff / Perceptual Impact；
- 跨 Shot 的 Action Direction / Contact / Momentum / Active Motion 继承；
- Camera Handoff 的 Concrete Action Anchor / Viewer Intent / live-motion continuation；
- Ending 的真实收束状态。

> **Clarity Through Structure, Not Action Reduction。**

---

## 6. Positive-first Constraint Strategy

优先写正向可执行事实，而不是通用 Avoid List。

例如：

> “撞到桌边后身体轴线被迫偏转，下一动作直接借桌沿恢复并侧切。”

优于：

> “不要无视物理、不要瞬移、不要动作不连贯。”

Negative 只保留当前明确高风险项。

禁止自行加入用户没有要求、剧情没有依据的限制，例如无来源的 `no visible weapons`。

---

## 7. Combat Assembly-stage Serialization Check

本节是在 Prompt Assembly 交给 Model Adapter **之前**的检查，不是最终 Delivery Preflight。

至少检查：

- Action Language 是否占主体；
- High / Medium Coverage 是否真的被 Action Flow 写满；
- Fighting Direction 是否在动作语言而非标签中兑现；
- **存在明显 Movement / Technique / Transition Gap 时，是否有真实 Stage-2 leaf knowledge hit / Pattern Realization Evidence；**
- 是否把画面维度写细误判为过载并自动压短；
- 是否存在指定时长装不下的过多独立主事件，却没有提醒用户；
- **关键 Active Exchange 是否仍主要由“连续格挡 / 快速反制 / 贴身缠斗 / 不断换位”等摘要承担；**
- **删除抽象动作形容词后，是否仍能清楚理解关键身体动作因果；**
- 是否出现 3–4 秒只有一个宏动作的 Temporal Underpacking；
- 是否出现每 1–2 秒归位再起手的 Action Segmentation；
- Counter / Re-counter 是否在对方动作尚未完成时具体抢走 Initiative；
- 关键 Transition 是否利用前一动作残余 Momentum / Contact / Support / Recovery / Axis，而不是只在逻辑上“接得上”；
- 是否把 15 秒任务写成 20–30 秒，或把高密度战斗切成多个会 Reset 的硬时间盒；
- 图生首帧是否只在开头锁继承清单，动态段是否只写变化；
- 每个主 Beat 是否有可见招式集合，而不是“连续乱拳”；
- 同一动作的身体、光影、镜头细节是否被保留；
- Kinetic Scope 是否在最终文字中可见；
- High / Expert Combat 是否仍主要由上肢 Contact 主导，而 Movement 没有创造 Level / Route / Axis / Range / Position / Support / Balance 变化；
- Character Identity / Advantage / Initiative 是否通过动作外显；
- Ending 是否过早进入静止 Pose / 对视并吞掉 Active Exchange；
- Camera 是否 Stable 但不是 Static；
- 是否把 Continuous Action Spine 错写成 one-take / 单一 Camera Path；
- 是否长期只有中全景 / 中景，缺少有信息价值或体验价值的 Shot Scale Variation；
- **关键 Cut / Reframe 是否由具体 Action State Change / Viewer Experience Opportunity 触发，而不是泛化“关键接触切近”；**
- **上游已通过 Realization Gate 的 Camera Moment，在 Assembly 后是否仍保留具体 Action Anchor / Camera Intent / live-motion continuation；**
- **Camera State 是否先建立后引用；**
- **存在明显 Threat / Impact / Near-miss / Support / Range Compression / Initiative Moment 时，是否全部被保守 Coverage 吞掉；**
- **是否反过来给几乎每个动作都附 Camera Accent / POV / Close-up；**
- **Cut 是否至少在关键位置保留 Active Motion / Contact / Pressure / Recovery，而不是动作死掉后再切；**
- **是否机械形成 `Medium → Close → Medium → Close`，而没有信息变化动机；**
- Cut 后 Position / Direction / Contact / Momentum / Axis / Range 是否连续；
- Contact → Reaction → Consequence 是否可见；
- 动作是否具体，光影 / 镜头是否被误当成必须压短的对象；
- Negative 是否少而有针对性。

触发 `Stage-2 Routing Evidence Missing` 时，先回到 Stage-2 真实读取 leaf knowledge 并重写 Phrase，不允许只润色已有动作。

触发 `Abstract Action Block / Non-executable Choreography Summary` 时，优先重写具体 Action Phrase，而不是追加“高速、连续、专业、电影化”等形容词。

触发 `Static Standing Combat / Upper-body Technique Dominance` 时，优先回到 Movement Pattern / Concrete Phrase，改变真实空间与身体状态，而不是机械补一句“多用腿法”。

触发 `Action–Camera Decoupling / Dead-motion Cut / Kinetic Handoff Loss / Coverage Patterning` 时，优先重写 Action Trigger、Inherited Motion State 与 Camera Handoff；不要通过增加更多 Shot / 特写 / Camera 术语修复。

触发 `Camera Handoff Serialization Loss` 时，只回 Prompt Assembly / 当前 Model Adapter 恢复上游已经存在的 Handoff，不重新设计 Choreography。

触发 `Perceptual Impact Underuse` 时，从已有动作中寻找真正的 Threat / Impact / Support / Range / Initiative 高价值节点，再决定观察方式；不是机械追加特写。

触发 `Camera Accent Overmapping / Perceptual Accent Overuse` 时，删除低价值 Camera 指令，让普通连接动作重新继承当前 Shot。

Assembly-stage 不通过时先内部重写 Pattern Selection / Action Spine / Concrete Phrase / Action–Camera Handoff / Camera Coverage，再进入 Model Adapter。主事件过载时提醒用户，不靠压描述过关。

Model Adapter 完成后仍必须再次执行 Preservation Gate + Combat Final Preflight，才能交付。

---

## 8. 单视频单元组装骨架

```text
视频目标 / 15 秒：
参考与稳定锚点 / 首帧继承清单：
开场角色卡（Combat 含打法特长）：
空间 / 场景骨架 / 光：
媒介与摄影机纪律：
场景 / 人物初始关系：
连续且具体的动作主链（Combat 时为主体；3–4 个 Beat 只写变化；关键 Camera Accent 直接嵌入对应 Action Phrase）：
关键软时间锚点 / Turning Point：
Camera：任务 + 起始 + 主运动 + 路线 + 速度 + 停止：
表演链：
Audio：环境 / 拟音 / 对白 / BGM 决定：
必要连续性与高风险限制：
```

Combat 不要求机械拆成每 1–2 秒一个独立小段，也不要求整段摄影一镜到底；也不要求每个动作都有对应镜头指令。

---

## 9. 多镜头 / 多片段骨架

```text
全片目标与统一锚点：
开场角色卡：
空间 / 周边物件 / 光：
素材职责：

Segment 1：
- 目标
- Action / Camera Flow
- 结尾 Handoff State

Segment 2：
- 继承上一段状态
- Action / Camera Flow
- 结尾 Handoff State

全片 Audio（环境 / 拟音 / 对白 / BGM 决定） / Style / Continuity：
Model Adapter 入口：
```

多镜头 Shot 边界可以精确，但 Combat Action State 与 Active Motion 必须跨镜继承。

---

## 10. 冲突与适配边界

重点识别：

- fixed camera 与大幅空间追打冲突；
- High Coverage 与大段站立 / Ending Pose 冲突；
- 指定时长里独立主事件过多，却把画面维度写细误判为无法承载；
- “稳定镜头”被误实现为“静态镜头”；
- “动作连续”被误实现为“不能 Cut”；
- “Action–Camera Coupling”被误实现为“每个动作必须配一个镜头”；
- 高密度 Combat 被锁成全程中全景 / 中景；
- 15 秒高密度任务被写成 20–30 秒，或反过来把细节压没；
- 用户要求连续高手战，但时间结构是多个独立动作槽；
- Choreography 已经具体，但 Assembly 为了缩短 Prompt 又退回抽象动作块；
- 画面、光影、镜头已经写细，Assembly 却为了字数压糊；
- Fighting Direction 已确认，但 Final Prompt 只保留标签、没有动作差异；
- Action–Camera Handoff / Perceptual Impact 已规划，但 Assembly 又压回“关键接触切近 / 随后回中景”；
- 上游 Handoff 已 Realize，但 Model Adapter 又造成 `Camera Handoff Serialization Loss`；
- Camera Accent / POV / Close-up 过密，反而挤压动作执行；
- Cut 只保持 Position，却丢失上一 Shot 仍然存在的 Motion / Pressure / Recovery。

Model Adapter 允许改变素材引用、语言组织、同窗口复杂度、Camera Complexity、Shot Coverage 和 Phrase 序列化；不得改写剧情、人物身份、Combat Intent、Coverage 目标、Fighting Direction、核心动作因果、战斗结果，也不得把关键 Action–Camera Handoff / Perceptual Impact 改成动作完成后的随机 Coverage或泛化 Camera 摘要。

`Unverified` 不构成自动 Camera 降级证据。只有 Verified Limitation / Benchmark / Generated-video Regression Evidence 才允许 Intent-preserving Degradation。

模型确需降载时，先判断是不是**独立主事件过多**：是则提醒用户加时长或拆段，不静默删用户要的主内容，也不把光影 / 镜头 / 动作细节压糊。不能直接把高手持续对决改成两三次简单交换，也不能把具体动作重新压成“连续攻防”。

---

## 11. 边界

- 素材职责：`reference-binding/control.md`；
- 时间 / 节奏：`timeline-rhythm/control.md`；
- Camera：`camera-direction/control.md`；
- Motion：`subject-motion/control.md`；
- Spatial：`spatial-blocking/control.md`；
- Combat Choreography：`references/tasks/action-combat-video/choreography-playbook.md`；
- Combat Action–Camera Bridge / Realization：`references/tasks/action-combat-video/action-camera-handoff-playbook.md`；
- Action–Camera Realization × Preservation Spec：`docs/action-combat-video-action-camera-handoff-spec.md`；
- 输出模板：`assets/templates/`；
- Model 语法 / 能力：`references/models/`。
