# 模型适配输出模板

## 目标

把同一份通用导演方案转换为 Generic、Seedance 2.0 或 LTX-2.3 的最终可复制输出。

模型适配只改变：

- 表达方式；
- 素材引用；
- 模型明确能力边界；
- 同一时间窗口的执行复杂度；
- Camera / Phrase 的序列化方式。

模型适配**不重新设计**剧情、人物关系、核心动作导演意图和空间逻辑。

Action Combat 额外遵循：

> **模型能力影响实现路径，不偷偷改写导演意图。**

---

## 适配前提

进入本模板前应已确定：

- 任务类型；
- 输入和素材职责；
- 时长或镜头规模；
- 初始状态；
- 主体动作；
- 镜头状态；
- 表演与声音；
- 光影与风格；
- 最终落点；
- 连续性和高风险限制。

Action Combat 还应已经完成内部：

- Combat Intent / Branch；
- Active Combat Coverage；
- Rhythm / Action Phrase；
- Character Identity；
- Contact Solidity；
- Signature Moment；
- State / Continuity Validation；
- Action Execution / Camera Readability Budget。

这些内部字段不要求原样输出。

---

## Generic

### 触发

用户未指定 Seedance 或 LTX，或要求通用、可迁移的视频 Prompt。

### 输出形式

简单单镜头优先输出一段清楚自然语言；复杂多镜头使用绝对时间或镜号。

```text
[任务、时长和参考职责]。[初始画面]。[主体动作或表演顺序]。[镜头运动]。[环境、光影和声音]。[最终落点]。[必要连续性和失败限制]。
```

多模态素材使用语义化名称，不伪造任何平台语法：

```text
人物参考 A、场景参考 B、动作参考视频 A、节奏参考音频 A
```

Action Combat 的 Generic Final Prompt 必须：

- 由正向 Action Phrase / Reaction / Contact / Spatial Change 主导；
- 不大量 Dump Range / Advantage / Condition 标签；
- 不默认追加通用 Negative Boilerplate；
- 不因 Generic 不知道具体模型能力就自动把动作缩成极少交换。

### 禁止

- 未知平台参数；
- `@图片` 等特定平台语法；
- 未确认的分辨率、时长和能力承诺。

---

## Seedance 2.0

### 触发

用户明确使用 Seedance 2.0，或任务需要其图片、视频、音频多模态职责绑定、视频编辑、延长或卡点能力。

### 输出顺序

```text
[时长、任务和整体目标]
[以 @图片N / @视频N / @音频N 明确绑定每份素材职责]
[全局固定项和连续性]
[分时段 / 分镜动作与运镜]
[表演、对白和声音]
[光影、风格和特效延续]
[高风险限制]
```

简单单镜头可以自然段表达；复杂动作、对白、特效或多镜头可使用绝对时间，但时间段不能机械切断一条自然 Action Phrase。

### Action Combat

如果 Seedance Model Adapter 提供 Combat Capability Contract：

- 保留已确定 Combat Intent / Coverage / 观看目标；
- 根据 Motion / Contact / Camera / Temporal 等能力调整同窗口复杂度；
- 动作密度高时优先减少无必要 Camera Complexity；
- 需要降载时优先拆为多个无缝连续 Phrase，而不是直接减少整场有效攻防；
- Final Prompt 仍以具体动作因果为主体。

### 编辑任务

```text
以 @视频1 为待编辑主体。
必须保留：...
必须修改：...
允许变化：...
禁止变化：...
```

### 延长任务

```text
将 @视频1 向前 / 向后延长 [时长]。
接点状态：...
新增发展：...
最终落点：...
```

### 禁止

- 只罗列 `@素材` 而不说明职责；
- 同一维度绑定多个冲突素材；
- 用“完全参考”代替动作、运镜、节奏和特效职责拆分；
- 编辑或延长时忽略原视频接点状态；
- 为了平台适配擅自改变已锁定 Combat Intent / Coverage。

---

## LTX-2.3

### 触发

用户明确使用 LTX-2.3，或要求符合其官方 Prompt Guide 的自然语言导演式输出。

### 输出形式

默认压缩成一个具体、流动、现在时的自然语言段落：

```text
[镜头如何开始，主体、场景、光线和观看距离]。[主体按自然顺序发生动作，镜头在明确节点相对主体移动]。[眼神、呼吸、姿态和小动作构成表演；短对白穿插动作和停顿]。[环境音、拟音、声音质感或音乐]。[动作、镜头和声音自然收束到最终状态]。
```

图生视频重点描述“接下来如何运动”，只保留必要静态锚点，不长篇复述参考图。

内部可以使用时间轴 / Combat Planning Context 推理，但最终不默认保留机械状态表和字段标题。

### Action Combat

- 把 Action Phrase 写成连续动作语言；
- 使用“紧接着、在对方尚未恢复前、顺势、随即”等自然连接保留 Counter / Re-counter 因果；
- Contact 后直接描述身体 / 兵器 / 空间后果；
- 不用一串 Range / Advantage / Solidity 标签替代画面；
- 如果 Adapter 的实测 Capability 表明复杂 Camera 会导致动作丢失，优先简化 Camera，而不是把高手对决改成几次孤立动作。

### 对白写法

```text
他说：“第一句。”他停住，视线移动并完成一个小动作，然后继续：“第二句。”
```

### 禁止

- Prompt 过短而无法支撑目标时长；
- 只写抽象情绪；
- 图生视频重复静态画面却缺少运动；
- 长对白没有停顿和表演；
- 过度数值化自然表演和镜头；
- 为了自然语言压缩丢掉 Combat 的关键 Action / Reaction / Consequence。

---

## 同一方案的输出差异

```text
Generic：语义化、模型无关、结构清楚。
Seedance：显式素材引用、任务能力和分时段组织。
LTX：连贯自然语言、表演细节和音画连续性。
```

差异只在序列化和模型能力边界，不在核心导演目标。

---

## Combat Intent Preservation

Model Adapter 允许：

- 降低无必要 Camera Complexity；
- 降低单 Phrase 的同时复杂度；
- 把过载 Phrase 拆成多个无缝 Phrase；
- 简化次要 Environment / Tactical 分支；
- 调整时间编码和语言结构。

Model Adapter 不允许擅自：

- 把 High Coverage 改成 Low Coverage；
- 把高手高速交换改成两三次简单动作；
- 改变用户指定战斗结果；
- 改变人物关系 / 武器 / 核心观看目标；
- 用大量 Negative 代替动作设计。

---

## 默认展示规则

- 用户只要求最终 Prompt：只展示目标模型最终版；
- 用户要求通用版和平台版对照：可同时展示 Generic + 一个模型适配版；
- 不默认输出三个版本；
- 不提供与目标模型无关的参数说明；
- 不在最终结果后解释转换过程。

## 输出检查

- 是否只加载和输出一个目标适配层；
- 用户未指定模型时是否正确使用 Generic；
- Seedance 素材职责是否显式且无冲突；
- LTX 是否为连续、具体、现在时表达；
- Combat 是否保持 Action Language 主导；
- 模型适配是否没有改变已锁定导演方案 / Combat Intent / Coverage；
- 是否删除了无价值备选和重复结构。
