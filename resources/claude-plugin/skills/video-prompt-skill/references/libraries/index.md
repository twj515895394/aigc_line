# Libraries Index

资料库负责提供“有哪些具体选项、术语、结构和题材模板”，不决定任务流程，也不代替控制规则。

每次按当前任务缺口读取少量主要资料库叶子。分类索引只负责导航，不计入业务 Reference 数量。

Combat V2 额外遵循：

> **Indexes are cheap routing knowledge; leaf files are expensive execution knowledge.**  
> **索引用于选择，正文用于执行。**

---

## 1. 通用 Libraries

### camera-shot

读取：`camera-shot/library.md`

包含景别、视角、机位、焦段、景深、运镜以及叙事 / 动作镜头组合。

### action-motion

读取：`action-motion/library.md`

包含准备、执行、接触、反馈、恢复；日常动作、追逐、打斗、体育、动物、车辆、机械和环境反馈。

### performance-expression

读取：`performance-expression/library.md`

包含表情、微表情、眼神、呼吸、小动作、对白表演及与镜头的常用搭配。

### transition-effects

读取：`transition-effects/library.md`

包含直接切、匹配剪辑、遮挡 / 甩镜 / 反射等转场以及粒子、破碎、形态变化等视觉效果。

### lighting-color

读取：`lighting-color/library.md`

包含基础光影、真实光源、阴影 / 高光、电影色调、时间天气和动态光影。

### audio-sound

读取：`audio-sound/library.md`

包含对白、环境音、拟音、动作音效、BGM、卡点、静默和空间声音。

### genre-patterns

读取：`genre-patterns/library.md`

包含短剧、漫剧、动作体育、悬疑、广告、纪录、奇幻、恐怖、喜剧等题材级节拍、镜头、声音和收尾组合。

---

## 2. Combat 专业 Libraries

Combat Libraries 只提供专业知识，不定义 Combat Planning Graph、Battle Beat、Coverage、Exchange Depth、Action Execution Budget 或 State Contract。

### combat-choreography-profiles

读取：`combat-choreography-profiles/library.md`

提供少量稳定电影动作编排 Profile，回答“整场动作戏通常怎么组织”，不等于视觉 Style、职业、Character Identity 或 Technique Profile。

### combat-cinematic-archetypes

读取：`combat-cinematic-archetypes/library.md`

提供 Cinematic Combat Archetype，用于已经确认的 Combat System 的电影化表达参考；Archetype 不等于 Combat System。只有用户明确需要电影武打参考时按需读取。

### combat-fighting-profiles

读取：`combat-fighting-profiles/library.md`

提供 Boxing、Muay Thai、Sanda、MMA、Wrestling / Grappling、Tactical Close Combat 等现代格斗 Technique / Execution Knowledge。

### combat-martial-profiles

读取：`combat-martial-profiles/library.md`

提供咏春、八极、太极借力、长拳、南拳以及电影武侠身法等空手武术执行知识。

### combat-weapon-profiles

读取：`combat-weapon-profiles/library.md`

提供刀、剑、枪、棍的 Range、轨迹、持握、Contact Modality、换距和 Weapon State 连续性。

### combat-environment-patterns

读取：`combat-environment-patterns/library.md`

提供走廊、墙面 / 门框、桌椅、柱体、楼梯、栏杆、车辆、竹林、屋顶和高低差空间等 Environment Affordance 知识。

### signature-moment-patterns

先读取：`signature-moment-patterns/index.md`

再只读取命中的 `patterns/<pattern-id>.md`。`source-cases/` 只用于研究证据，不是默认运行时 Reference。

### combat-choreography-patterns

先读取轻量目录索引：

- `combat-choreography-patterns/index.md`

该目录现在包含两层 Stage-2 动作生产知识：

```text
Abstract Pattern
→ combat-choreography-patterns/minimum-validation-set.md

Concrete Action Reference
→ combat-choreography-patterns/action-reference-catalog.md
```

#### Abstract Pattern

`minimum-validation-set.md` 用于 Movement / Technique / Transition Gap 仍需要抽象解决策略时的 Pattern Selection，并保留既有 RF / CK Regression 的 Pattern Hit Evidence 基线。

#### Concrete Action Reference

`action-reference-catalog.md` 是已接入的按需 Concrete Action Leaf，当前包含用户来源图片知识化后的 **17 个单动作模板**。

只有出现：

> **Concrete Action Selection Gap**

时读取。

典型链路：

```text
Current State
+ Combat Role Need
+ Opponent Action / Response Need
+ Physical Presentation Domain
→ Concrete Action Selection Gap
→ READ action-reference-catalog.md
→ filter by Prerequisites / Physical Level / Role / Response / State Transition
→ choose one concrete action
→ realize into Action Phrase
```

如果没有匹配动作，不强用 Catalog，继续使用 Fighting / Martial / Weapon / Pattern 知识生成其他动作。

Catalog 是新增候选知识，不是封闭动作全集，也不增加“所有 Combat 默认必须再读一份 Library”的固定配额。

`action-reference-validation.md` 是维护 / 验证资料，不参与正常生成。

---

## 3. Combat Two-stage On-demand Loading

### Stage 1：Planning

使用 Task Core / Choreography / 当前专项与必要轻量 Index 形成 `Combat Planning Context`。

### Stage 2：Detail / Execution Knowledge

按真正缺口路由，而不是机械填满固定 Slot：

```text
缺专业 Technique System 细节
→ Fighting / Martial / Weapon Profile

缺 Movement / Technique / Transition 抽象构造
→ combat-choreography-patterns/minimum-validation-set.md

缺一个符合当前 State 的具体动作
→ combat-choreography-patterns/action-reference-catalog.md

缺 Signature / Creative Enhancement
→ signature-moment-patterns

缺复杂 Environment Affordance
→ combat-environment-patterns
```

每个 Leaf 都必须真正实例化进动作；只出现 Read Evidence 而没有 Action Realization 不算命中成功。

优先级：

```text
用户明确指定的专业动作 / 武器知识
→ 保证专业正确性所需知识
→ 当前 Exchange Spine 所需的具体动作解决
→ Character Expression / Archetype 差异化
→ Signature / 环境创意增强
```

正常任务仍保持少量主要 Library Detail；Catalog 是对现有 Detail Slot 的一种候选，不机械增加预算。

---

## 4. 常用组合

### 写实短剧

- `genre-patterns/library.md`
- `performance-expression/library.md`

### 普通动作或体育

- `action-motion/library.md`
- `camera-shot/library.md`

### 复杂现代格斗

先由 Action Combat Choreography 确定 System / Expression / State，再按缺口选择：

- Technique：`combat-fighting-profiles/library.md`
- Concrete Action Selection：`combat-choreography-patterns/action-reference-catalog.md`
- Abstract Movement / Technique / Transition：`combat-choreography-patterns/minimum-validation-set.md`
- 用户明确电影武打参考：`combat-cinematic-archetypes/library.md`
- 创意增强：命中的 `signature-moment-patterns/patterns/<id>.md`

### 电影武侠

- 空手 Technique：`combat-martial-profiles/library.md`
- 兵器 Technique：`combat-weapon-profiles/library.md`
- Concrete Action Selection：按需 `combat-choreography-patterns/action-reference-catalog.md`
- 用户明确电影动作表达时：`combat-cinematic-archetypes/library.md`

### 产品广告

- `lighting-color/library.md`
- `transition-effects/library.md`

### 音频驱动

- `audio-sound/library.md`
- 按需再选表演或动作库

### 漫剧 / 动画

- `performance-expression/library.md`
- `action-motion/library.md` 或 `camera-shot/library.md`
- 如果核心是复杂武打，仍进入 Action Combat 路线，再由 Physical Level 决定动作夸张尺度

---

## 5. 使用边界

- Library 回答“可以选什么”，Control 回答“为什么选、如何协调”，Task Playbook 回答“怎么运行和编排”。
- Combat Libraries 不定义 Battle Beat、状态机、Coverage、Action Sufficiency 或任务流程。
- 一次不要读取整个资料库；当前任务已有明确动作时不额外读取。
- 同一知识只有一个正文真源。
- 不建设 Combat Character Identity / 职业画像 Library。
- 不把 Pattern、Profile、Archetype 或 Catalog Action 当固定 Combo。
- `source-cases/` 属于研究证据，不是默认运行时 Reference。
- 社区长 Prompt 不作为资料库正文，只保留结构、变量、适用条件和失败边界。
- Visual Style 读取 `references/styles/`。
- 模型专属语法和能力读取 `references/models/`。
