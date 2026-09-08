# Models Index

模型层只处理平台之间真实存在的能力、输入和 Prompt 组织差异，不复制通用导演知识。

本项目正式维护三种输出层：

- `generic.md`
- `seedance-2.md`
- `ltx-2-3.md`

不建设其他平台适配页，也不创建空占位文件。

---

## 默认路由

### 用户未指定模型

读取：`generic.md`

输出模型无关的完整导演 Prompt、时间轴、连续性和声音约束，不伪造平台参数、素材语法或模型能力。

### 用户明确使用 Seedance 2.0

读取：`seedance-2.md`

适用：

- 图片、视频、音频多模态输入；
- `@图片 / @视频 / @音频` 素材职责绑定；
- 运镜、动作、特效或节奏参考；
- 视频编辑；
- 视频延长；
- 音频驱动和音乐卡点。

### 用户明确使用 LTX-2.3

读取：`ltx-2-3.md`

适用：

- 自然语言导演式 Prompt；
- 文生视频和图生视频；
- 连续表演、动作节拍和镜头行为；
- 对白、环境音和音画同步；
- 强调从参考帧自然继续运动。

---

## 统一适配输入

模型页接收的是已经完成的通用导演方案，至少包括：

```text
任务目标
素材职责
全局视觉与声音约束
镜头 / 片段时间轴
主体运动
镜头运动
空间与连续性
表演与音频
失败限制
```

Action Combat 还可能接收：

```text
Combat Intent / 观看目标
Active Combat Coverage
Action Exchange Rhythm
Action Phrase / Exchange Depth
Character Identity
Contact Modality / Solidity
Environment / Signature Moment
Action Execution / Camera Readability Budget
```

这些 Combat 字段主要用于 Adapter 决定**如何执行和序列化**，不要求直接输出成状态表。

---

## Model Combat Capability Contract

Action Combat 使用统一轻量能力合同，把模型侧能力与 Known Risks 提供给 Combat Choreography Engine。

### 维度

- **Motion Complexity Capacity**：连续、高速、多层动作因果承载；
- **Multi-character Stability**：多人运动、身份保持、Target Handoff；
- **Contact / Interaction Fidelity**：拳脚、抓控、武器、环境接触；
- **Spatial Continuity**：Position、Range、方向与环境关系；
- **Camera Complexity Capacity**：复杂动作 + 复杂 Camera 同时存在时的承载；
- **Temporal / Prompt Following**：时长、事件顺序、关键要求与时间分配。

### 表达格式

有可靠依据时：

```text
Motion Complexity: High / Medium / Low
Notes: ...
Known Risks: ...
Evidence: official / benchmark / internal test
Last calibrated: YYYY-MM-DD
```

没有可靠依据时必须明确写：

```text
Status: Unverified
```

不能为了满足格式强行猜 High / Medium / Low。

### 作用边界

Capability Contract 只允许影响：

- 单个 Action Phrase 的同时复杂度；
- Exchange Depth 的具体实现；
- Camera Complexity；
- 多人同窗口独立动作数量；
- Contact / Environment 次要分支；
- 时间编码和 Prompt 序列化。

不得擅自改变：

- 用户 Combat Intent；
- Active Combat Coverage 目标；
- 观看目标；
- 人物关系；
- 指定武器；
- 战斗结果。

模型执行能力较弱时优先：

```text
保留核心 Intent / Coverage
→ 降低无必要 Camera Complexity
→ 降低单 Phrase 同时复杂度
→ 拆成多个无缝连续 Phrase
→ 简化次要 Environment / Tactical 分支
→ 最后才缩减次要动作细节
```

禁止把“高手持续对决”自动降级成“两三次简单交换”。

---

## Benchmark Calibration

Combat Capability Contract 的长期真源应优先来自 **Golden Combat Benchmark 实测**。

每次校准至少记录：

- Model / Version；
- Golden Scenario；
- 生成参数；
- Prompt / Skill Version；
- Generated Result；
- Failure Signature；
- Prompt Intent → Generated Result Gap。

只有持续观察到的稳定表现才升级为 Model Adapter 的 Known Capability / Known Risk。

---

## 信息可信度

- 模型能力、限制和语法必须标明来源与更新时间；
- 官方资料优先于社区资料；
- 社区资料只能作为实践补充，不能覆盖官方边界；
- Golden Benchmark 可以校准 Combat 执行表现，但必须记录模型版本和测试条件；
- 无法确认的参数 / Combat 能力不写成硬性事实；
- 模型规格发生变化时，只更新对应适配页，不修改通用 Combat Core / Choreography。
