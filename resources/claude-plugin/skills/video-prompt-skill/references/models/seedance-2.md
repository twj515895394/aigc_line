# Seedance 2.0 Model Adapter

## 1. 触发条件

当用户明确使用 Seedance 2.0、即梦 Seedance 2.0，或任务依赖其图片 / 视频 / 音频多模态参考能力时，读取本页。

本页只处理 Seedance 特有能力和表达，不复制通用时间轴、运镜、动作、表演和风格知识。

---

## 2. 能力边界

根据 Seedance 2.0 官方技术报告，截至 `2026-07-10`：

- 支持文本、图片、视频、音频四种输入模态；
- 支持音视频联合生成；
- 生成时长范围为 4–15 秒；
- 原生输出分辨率包括 480p 和 720p；
- 当前开放平台的多模态参考上限包括最多 3 个视频、9 张图片和 3 个音频。

平台界面、地区版本和产品策略可能调整具体限制。输出 Prompt 时不要把这些规格重复写进正文，只有在规划素材数量或时长时使用。

---

## 3. Model Combat Capability Contract

目前官方能力资料支持确认 Seedance 2.0 的多模态、时长和音视频联合生成能力，但**不足以直接给出 Combat 专项 Motion / Contact / Spatial 等 High / Medium / Low 稳定评级**。

因此在 Golden Combat Benchmark 完成前：

```text
Motion Complexity Capacity: Unverified
Multi-character Stability: Unverified
Contact / Interaction Fidelity: Unverified
Spatial Continuity: Unverified
Camera Complexity Capacity: Unverified
Temporal / Prompt Following: Unverified
```

### 当前 Known Risks / 实践约束

基于本 Adapter 已整理的实践经验，高风险写法包括：

- 单段塞入过多人物和连续复杂事件；
- 主体运动和镜头运动同时持续满强度；
- 对白、口型和动作缺乏时间关系；
- 多素材在同一维度发生冲突。

这些只能作为 Prompt 规划风险提示，**不能直接推导某一 Combat Capability 等级**。

### Combat 适配策略

在评级未验证前：

- 保留用户 Combat Intent / Coverage / 观看目标；
- `Unverified` 只表示不能承诺专项能力上限，不自动删除或泛化上游已经成立的高价值 Action–Camera Handoff；
- 默认保持 Full-fidelity Action–Camera Realization；
- 高密度 Combat 优先使用清楚的 Action Phrase 分段；
- 同一时间窗口避免同时加入多个人物独立复杂动作 + 复杂 Camera + 多个环境事件；
- 只有存在 Verified Limitation 或真实 Generated-video Regression Evidence 时，才允许 Intent-preserving Degradation；
- 需要降载时先降低 Camera 实现复杂度、拆 Phrase，再减少次要分支；高价值 Camera Moment 优先保留 Action Anchor、Viewer Intent 与 live-motion continuation；
- 不把 High Coverage 自动改成极少交换；
- 后续由 Golden Benchmark 按模型版本持续校准本 Contract。

---

## 4. 素材职责绑定

Seedance 实践中使用 `@图片N`、`@视频N`、`@音频N` 指定素材。

必须为每份素材说明职责，不能只罗列引用：

```text
@图片1：人物身份和面部外观
@图片2：服装与配色
@图片3：场景空间和主要道具
@视频1：动作编排和身体节奏
@视频2：镜头运动和转场
@音频1：对白、音色和时间节拍
```

推荐合并成自然语言：

```text
以 @图片1 的人物作为唯一主角，穿着 @图片2 的服装，处于 @图片3 的场景；动作节奏参考 @视频1，镜头运动参考 @视频2，对白和节拍参考 @音频1。
```

禁止写成“综合参考所有素材”或让多份素材在同一维度平均融合。

---

## 5. 推荐 Prompt 结构

```text
[时长、任务和整体目标]
[素材引用与职责绑定]
[全局固定项和连续性]
[分时段 / 分镜动作与运镜]
[表演、对白和声音]
[光影、风格和特效延续]
[高风险限制]
```

### 时间轴

10 秒以上、存在多步动作、对话、特效或多个镜头时，可使用绝对时间帮助组织：

```text
0–3 秒：
3–7 秒：
7–10 秒：
```

但 Action Combat 中，时间段应尽量与 Action Phrase / Battle Beat 的自然边界对齐，不因为机械秒点切断连续 Counter / Re-counter。

简单单镜头可写成连续自然段，不必强行切碎。

---

## 6. Action Combat 转换规则

进入本 Adapter 前，Combat Task 已经完成：

- Combat Intent；
- Coverage / Rhythm；
- Action Phrase；
- Character Identity；
- Contact Solidity；
- Environment / Signature Moment；
- State / Continuity Validation；
- 上游已经通过 Realization Gate 的高价值 Action–Camera Handoff。

Seedance 输出时：

- 把内部状态转译成可见动作，不输出状态表；
- 用清楚分时段 / 分镜承载复杂 Phrase，但保持动作因果连续；
- **分时段 / 分镜只是承载结构，不能把具体 Action Anchor 与对应 Camera Response 拆成互不关联的两个泛化段落；**
- 多模态动作参考要明确只继承动作 / 节奏 / Camera 中指定维度；
- Contact 后描述 Reaction / Position / Advantage 后果；
- 高动作复杂度时优先 Camera Readability；
- Negative 只保留当前明确高风险项。

> **Model Adapter 只改变实现与表达，不改变 Combat Intent / Coverage，也不重新决定上游已经确认的高价值 Camera Moment 是否值得存在。**

### 6.1 Common Camera Handoff Preservation Contract

Seedance 继承 `prompt-assembly/control.md` 的 Common Preservation Contract。

允许：

- 把同一 Handoff 改写成 Seedance 更容易理解的分时段 / 分镜自然语言；
- 在 Hard Constraint 或可靠能力证据需要时，把 Cut 改成连续 Reframe / Push / Near-lens 等实现；
- 合并低价值 Camera Accent。

禁止无证据地：

- 把具体动作触发改成“关键时刻 / 第一次接触”；
- 把具体 Viewer Experience 改成“使用电影化近景增强冲击”；
- 删除维持 Handoff 所需的 Momentum / Contact / Pressure / Recovery 等 live state；
- 用独立 Camera 总结段替代已经存在的 inline Camera Moment。

转换后发生上述退化，判：

`Camera Handoff Serialization Loss`

并只回 Prompt Assembly / Seedance Adapter 重写，不回 Choreography 重新设计动作。

---

## 7. 任务转换规则

### 7.1 文生视频

建立完整初始画面，再写动作、运镜、声音和收尾。

### 7.2 图生视频

明确图片是首帧、尾帧、人物、场景还是其他参考。

图片已经提供的静态细节不要当小说重写，但必须在开头锁一次继承清单。默认 4–15 秒，复杂动作用满 15 秒写细，不写 20–30 秒。

重点写：

- 首帧继承：人、服装饰品、场景骨架、光色构图、媒介；
- 画面若是动作中点，第 0 秒直接接续；
- 从当前状态如何运动；
- 人物、服装、头发、饰品和道具如何变化；
- 镜头如何跟随；
- 光影和场景如何延续；
- 15 秒内最终停在哪里。

### 7.3 视频参考复刻

不要只写“完全参考 @视频1”。需要拆开说明复用维度：

- 动作；
- 表演；
- 运镜；
- 节奏；
- 特效；
- 转场；
- 声音。

只复用用户需要的维度，避免把原视频人物和场景一并错误继承。

### 7.4 视频编辑

结构：

```text
以 @视频1 为待编辑主体。
必须保留：...
必须修改：...
允许变化：...
禁止变化：...
```

局部编辑时，原视频的镜头、时长、主体动作和背景不应被无关改写。

### 7.5 视频延长

明确：

- 向前还是向后延长；
- 新增时长；
- 原视频接点的主体姿态、镜头速度、空间、光影和声音；
- 延长部分的发展和新落点。

不要让延长段从全新场景突然开始。

### 7.6 音频驱动和音乐卡点

将音频分为：

- 时间骨架；
- 对白或歌词；
- 音色和表演；
- BGM 节拍；
- 环境音或关键音效。

视觉事件必须绑定明确的节拍点或对白节点，不写笼统的“跟随音乐变化”。

---

## 8. 通用导演方案转换示例

通用素材职责：

```text
人物参考 A
场景参考 B
动作参考 C
音乐参考 D
```

Seedance 转换：

```text
以 @图片1 的人物身份和服装作为唯一主角，场景严格参考 @图片2；主体动作阶段和身体节奏参考 @视频1，但不继承其中的人物与背景；整体剪辑和动作爆点跟随 @音频1 的节拍。
```

---

## 9. 高风险写法

- 只写多个 `@素材`，不说明用途；
- 同一个维度同时绑定多个互相冲突的素材；
- 把动作、运镜、节奏、特效全部写成“完全复刻”但不拆职责；
- 单段塞入过多人物和连续复杂事件；
- 主体运动和镜头运动同时持续满强度；
- 对白、口型和动作没有时间关系；
- 延长视频时忽略原视频最后一帧的动作和镜头速度；
- 视频编辑没有声明必须保留的内容；
- Combat 因为时间轴分段而让每段重新起势 / 摆 Pose；
- Combat 用大量 Negative 代替实际 Action Phrase；
- Combat 将上游已成立的 Action–Camera Handoff 压回泛化 Camera 摘要。

---

## 10. 来源与可信度

### 官方 / 一手来源

- `Seedance 2.0: Advancing Video Generation for World Complexity`，Team Seedance，2026-04-15。
  - 用于确认四模态、时长、分辨率和开放平台素材数量等能力边界。

### 实践参考

- `dexhunter/seedance2-skill` 的中文 Skill 指南。
  - 用于整理 `@图片 / @视频 / @音频` 的职责绑定写法、视频编辑、延长和卡点实践。
- `YouMind-OpenLab/awesome-seedance-2-prompts`。
  - 只用于分析高质量案例结构，不将社区长 Prompt 原样复制为规则。

Combat Capability 当前状态：**未完成 Golden Benchmark 校准，不给出伪精确等级；但 Unverified 不等于默认降级 Action–Camera Handoff。**

规格更新时间：`2026-08-15`。
