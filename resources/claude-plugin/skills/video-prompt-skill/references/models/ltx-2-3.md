# LTX-2.3 Model Adapter

## 1. 触发条件

当用户明确使用 LTX-2.3，或希望输出符合 LTX-2.3 官方 Prompt Guide 的自然语言导演式 Prompt 时，读取本页。

本页只处理 LTX-2.3 的表达偏好和能力差异，不复制通用运镜、动作、风格或表演资料。

---

## 2. 官方 Prompt 原则

根据 LTX 官方于 `2026-03-10` 发布的 LTX-2.3 Prompt Guide：

- 更长、更具体的描述通常比短而空泛的 Prompt 更有效；
- Prompt 细节应与视频长度匹配，较长视频需要足够内容支撑全过程；
- 推荐像给摄影师写镜头描述一样，完整描述主体、动作、环境、光影、镜头和音频；
- 使用自然、连续的动作顺序；
- 对白应拆成短句，并在句子之间插入停顿、视线、呼吸和动作指令；
- 用可观察的身体变化表达情绪，不只写“悲伤、紧张、困惑”等抽象标签；
- 在支持同步音频的生成方式中，应明确环境音、声音质感、对白、音乐或歌唱；
- 官方建议最终 Prompt 采用单个流动自然段，并使用现在时动词。

---

## 3. Model Combat Capability Contract

当前官方 Prompt Guide 能确认 LTX-2.3 的自然语言 Prompt 组织偏好，但**不能据此直接推导 Combat Motion / Contact / Multi-character 等专项稳定等级**。

因此在 Golden Combat Benchmark 完成前：

```text
Motion Complexity Capacity: Unverified
Multi-character Stability: Unverified
Contact / Interaction Fidelity: Unverified
Spatial Continuity: Unverified
Camera Complexity Capacity: Unverified
Temporal / Prompt Following: Unverified
```

### 当前 Known Risks / 表达风险

本 Adapter 已明确的高风险写法包括：

- Prompt 太短，无法支撑目标时长；
- 多人物、多动作和复杂物理同时堆叠；
- 图生视频重复静态画面但缺少运动；
- 缺少结束状态；
- 使用大量机械参数破坏自然动作描述。

这些是 Prompt / 执行风险提示，不等于经过 Benchmark 验证的能力等级。

### Combat 适配策略

- 保留用户 Combat Intent / Coverage / 观看目标；
- `Unverified` 只表示不能承诺专项能力上限，不自动删除、泛化或保守化上游已成立的高价值 Action–Camera Handoff；
- 默认保持 Full-fidelity Action–Camera Realization；
- 把内部 Action Phrase 转成自然、连续、现在时的动作段落；
- 用“紧接着、随即、在对方尚未恢复前、顺势”等语言保持 Counter / Re-counter 因果；
- Contact 后直接写身体 / 兵器 / 空间 Consequence；
- 高密度动作时减少不必要 Camera Complexity 和次要独立事件；
- 只有存在 Verified Limitation 或真实 Generated-video Regression Evidence 时，才允许 Intent-preserving Degradation；
- 需要降载时拆成连续 Phrase、降低 Camera 实现复杂度，而不是把高手对决压成少量孤立动作；高价值 Camera Moment 优先保留 Action Anchor、Viewer Intent 与 live-motion continuation；
- 后续由 Golden Benchmark 校准真实 Combat Capability。

---

## 4. 推荐输入结构

在转换为 LTX Prompt 前，通用导演方案应包含：

```text
镜头建立
场景、光线、色彩和材质
人物身份与外观锚点
从开始到结束的主体动作
镜头相对主体的运动
表演节拍、对白和停顿
环境音、声音和音乐
最终画面状态
高风险限制
```

Action Combat 还应在内部已经完成 Coverage、Rhythm、Action Phrase、Character Identity、Contact Solidity、Signature Moment、State / Continuity Validation，以及上游已经通过 Realization Gate 的高价值 Action–Camera Handoff。

---

## 5. 最终 Prompt 组织

LTX-2.3 默认将结构化导演方案压缩成一个连贯自然段：

```text
[镜头如何开始]，[主体、场景、光线和观看距离]。[主体以自然顺序发生动作]，[镜头在明确节点相对主体移动]。[人物通过眼神、呼吸、姿态和小动作呈现表演]。[对白使用引号，并在短句之间插入动作和停顿]。[环境音、声音质感和音乐]。[镜头和动作自然收束到最终状态]。
```

内部可以使用时间轴推理，但最终 Prompt 不必机械保留表格和字段标题，除非用户明确要求结构化版本。

### Action Combat

Combat Final Prompt 遵循：

> **State Machine Internalized, Choreography Externalized.**

不要输出：

```text
Range = Close
Advantage = A
Solidity = Heavy
Exchange Depth = High
```

而应直接写成可见动作：

- 谁压近 / 后撤 / 换轴；
- 对手如何防守和 Counter；
- Contact 在哪里发生；
- 受力 / 兵器偏转 / 重心怎样改变；
- 下一动作怎样在未完全 reset 前继续。

自然语言压缩不能删掉关键 Attack → Response → Contact → Consequence 因果，也不能把已经成立的 Action–Camera Handoff 压回“关键时刻推近 / 冲击处切近”之类泛化描述。

### 5.1 Common Camera Handoff Preservation Contract

LTX 继承 `prompt-assembly/control.md` 的 Common Preservation Contract。

LTX 可以：

- 把结构化 Handoff 改写成单个流动自然段；
- 合并重复 Camera 术语；
- 使用更自然的摄影语言表达同一 Camera Task；
- 在 Hard Constraint 或可靠能力证据需要时，把复杂 Cut 改成连续 Camera Movement / Reframe；
- 合并低价值 Camera Accent。

但自然语言压缩后仍应保留：

```text
具体 Action Anchor
+
Camera 为什么此刻介入 / Viewer Experience Intent
+
动作与摄影的因果绑定
+
必要 live-motion continuation
```

禁止无证据地：

- 把具体动作触发改成“关键时刻 / 第一次接触”；
- 把 Camera Task 改成“使用电影化镜头增强冲击”；
- 删除 Handoff 所依赖的 Momentum / Contact / Pressure / Recovery 等活跃状态；
- 用一个总 Camera 句子替代正文中的关键 inline Camera Moment。

若发生上述退化，判：

`Camera Handoff Serialization Loss`

并只回 Prompt Assembly / LTX Adapter 重写，不回 Choreography 重新设计动作。

---

## 6. 任务转换规则

### 6.1 文生视频

LTX 需要从零建立完整视觉起点。

至少描述：

- 谁或什么在画面中；
- 所处环境；
- 光线、色彩、材质和气氛；
- 初始姿态；
- 动作如何顺序发展；
- 镜头怎样观察和跟随；
- 声音如何出现；
- 最后停在哪里。

不要用很短的 Prompt 支撑较长视频，也不要先堆大量风格词再补动作。

### 6.2 图生视频

参考图已经定义了静态视觉起点。开头用自然语言锁一次必须继承的人、服装、场景、光线和媒介，然后把重点放在“接下来发生什么”。默认按 15 秒写满运动，不写更长片长。

优先描述：

- 画面若已是接触或失衡中点，立即接续，不重新起架；
- 否则静止如何转为运动；
- 主体动作、表情和呼吸如何变化；
- 头发、服装、饰品、道具和环境怎样响应；
- 镜头如何相对主体移动；
- 什么声音开始出现；
- 动作和镜头如何结束。

避免把图片当小说重写。上游若写了约一米后撤、膝部高度等走位尺度，LTX 转成自然语言（后撤一步、降到膝部），不要堆机械参数。

### 6.3 音频驱动

当音频提供时间结构时：

- 音频决定节奏和时间节点；
- Prompt 负责说明这些声音对应什么视觉事件；
- 明确主体、场景、镜头和表演如何响应音乐、对白或声音；
- 不要再设计与音频节奏冲突的独立视觉时间轴。

---

## 7. 表演与对白

### 抽象情绪改写

不要只写：

```text
他很悲伤地说话。
```

改写为：

```text
他的肩膀微微下沉，视线短暂移向一旁，开口前吸了一口气，声音放慢并在句尾轻微发颤。
```

### 对白拆分

长句拆成短句，并在中间插入动作：

```text
他低声说：“我一直记得那一天。”他停住，视线从桌面移向窗外，手指无意识地收紧，然后继续说：“只是我从没告诉过你。”
```

需要明确：

- 说话人；
- 语言或口音（确有需要时）；
- 音量和声音质感；
- 句间停顿；
- 说话时的身体动作；
- 镜头何时靠近、停留或转移。

---

## 8. 镜头描述

使用自然的电影语言，并说明镜头相对主体如何运动：

- `the camera slowly dollies toward her`；
- `a handheld camera follows behind him`；
- `the camera pans right to reveal...`；
- `the lens holds on his face for a beat`。

镜头移动后，应描述主体在新构图中的状态，帮助运动完成。

Action Combat 中，高 Exchange Depth / 高 Coverage 时优先保持可读的稳定跟随；如果复杂 Camera 会与动作争夺执行预算，优先简化**有证据表明需要简化的实现手段**，而不是先删有效攻防或把高价值 Handoff 泛化掉。

避免过度数值化的控制，例如精确角度、每秒移动距离或大量机械参数。官方指南更推荐自然语言描述。

---

## 9. 音频描述

根据任务按需写：

- 环境底噪和空间混响；
- 风、雨、脚步、衣料、机械等拟音；
- 人声的音量、速度、音色和情绪变化；
- BGM 的进入、强弱和退出；
- 声音与视觉事件的同步关系。

Combat 中 Audio Accent Density 不等于 Action Density；重点 Contact / Phrase Payoff / Signature Moment 获得更明显声音组织，普通微动作保持基础声层即可。

不要为画面中不存在来源的声音堆砌音效。

---

## 10. 高风险写法

- Prompt 太短，无法填满目标时长；
- 只写抽象情绪，不写可观察表演；
- 图生视频重复静态画面，几乎不写运动；
- 对白是一整段长句，没有表演和停顿；
- 多人物、多动作和复杂物理同时堆叠；
- 光源和色彩逻辑互相冲突；
- 使用大量精确数值约束自然表演和镜头；
- 依赖可读文字、Logo 或复杂排版作为核心结果；
- 缺少结束状态，导致视频在动作中途被截断；
- Combat 自然语言压缩后只剩少量动作，Coverage / Exchange Richness 未兑现；
- Combat 用 Camera Shake / 大音效代替 Contact Solidity；
- Combat 把上游已经成立的 Key Camera Handoff 压成泛化 Camera 摘要。

---

## 11. 来源

- LTX 官方博客：`LTX-2.3 Prompt Guide: Tips For Prompting LTX-2.3`，2026-03-10。
- 官方指南用于确认 Prompt 长度、自然语言组织、表演、对白、图生视频和音频描述原则。

Combat Capability 当前状态：**未完成 Golden Benchmark 校准，不给出伪精确等级；但 Unverified 不等于默认降级 Action–Camera Handoff。**

资料复核日期：`2026-08-15`。
