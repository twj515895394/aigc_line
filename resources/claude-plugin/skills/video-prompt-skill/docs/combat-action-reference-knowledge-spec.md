# Combat Action Reference Knowledge Spec

> 状态：**Implemented + Runtime-Wired / Pending Integrated Regression**  
> 日期：2026-08-16  
> 来源：用户提供的 6 张《AI漫剧打斗动作提示词大全》图片，共 **17 个**可见动作模板（1–17） + 本轮 Grill Me 已确认决策。  
> 目的：定义 Action Combat 可按需消费的“单动作级 Concrete Action Reference”知识结构与运行边界。

---

# 0. 当前状态

设计已经收敛，知识本体已经实施，并已按用户明确要求**直接接入 Runtime**。

当前正式叶子：

```text
references/libraries/combat-choreography-patterns/action-reference-catalog.md
```

当前路由入口：

```text
references/libraries/index.md
→ references/libraries/combat-choreography-patterns/index.md
→ Concrete Action Selection Gap
→ action-reference-catalog.md
```

后续不再单独等待 RF-22 关闭；下一轮固定 G01 将同时验证：

```text
RF-22 Runtime Handoff
+ RF-14～RF-20 existing regression checks
+ Concrete Action Catalog Routing / Realization
```

---

# 1. 设计目标

本知识库不是固定连招大全，也不是新的 Combat Engine。

它回答：

> **在当前 Combat State / Combat Role / Response Need 下，有哪些具体单动作可以成立，它们需要什么前提，会造成什么状态变化，并能以什么物理尺度表现。**

原则：

> **动作是积木；Exchange / 连招仍由现有 Runtime 编排。**

---

# 2. 最小颗粒度

最小知识颗粒度固定为：

> **Single Action Template / 单动作模板**

不继续拆手、脚、肩胯、重心等独立节点。

连招只由：

- 当前 Combat State；
- 前后 Transition Compatibility；
- Exchange Spine；

动态形成。

---

# 3. Combat Role

正式收敛为 8 个：

```text
Entry
Pressure
Defense
Counter
Re-entry
Reversal
Signature
Finisher
```

`Range Change / Route Change / Base Disruption / Recovery` 不继续扩张 Role，分别交由 State Transition、Tempo、Risk / Commitment 表达。

---

# 4. Response Compatibility

采用轻量半结构化：

```text
Best Against
Poor Against
Best State
```

不继续拆攻击方向、攻击轨迹、速度等级、接触类型等复杂 taxonomy。

用途：

```text
Incoming State
→ Response Need
→ compatible candidate
```

---

# 5. State Transition

采用稀疏 Before → After，只写发生变化的维度，例如：

```text
Route: Frontal → Outside Angle
Support: Stable → Disrupted
Initiative: Opponent → Steal
```

没有变化的状态不写，不建立完整战斗状态矩阵。

---

# 6. Visual Medium × Physical Realization

两轴完全解耦：

```text
Visual Medium
= 真人写实影视 / 国风漫剧 / 2D / 3D / 其他

Physical Realization
= P1 Grounded
  P2 Cinematic Exaggerated
  P3 Hyper-Cinematic / Supernatural
```

因此以下组合都合法：

```text
真人写实 + P1
真人写实 + P2
真人写实 + P3
漫剧 + P1
漫剧 + P3
```

真人画面不等于现实物理。

---

# 7. Min / Default / Max Physical Level

每个动作记录：

```text
Min Physical Level
Default Physical Level
Max Physical Level
```

Runtime 只能在合法区间选择。

核心约束：

> **降低 Physical Level 只能削弱速度、击飞、破坏和特效，不能改变 Core Action Mechanic。**

例如：

```text
非接触掌劲震退
Min = P3
```

不能为了 P2 把它偷偷改成接触推掌。

---

# 8. Tempo Profile

使用相对节奏，不绑定固定秒数：

```text
Instant
Quick Reactive
Burst
Sustained Rapid
Heavy
Build-up → Impact
Pause-and-Explode
Acceleration → Impact → Recovery
Recovery
```

Tempo 用于支持 Dynamic Wave，而不是建立每招时长表。

---

# 9. Risk / Commitment Profile

保留高价值战术成本：

```text
Commitment: Low / Medium / High / Very High
Miss / Block Risk
Recovery Exposure
Payoff
```

不记录固定成功率。

高 Commitment 动作在 Miss / Block / Evade 后可以自然提高 Counter / Initiative Theft 候选权重。

---

# 10. Initiative Effect

保持轻量枚举：

```text
Retain
Gain
Steal
Lose
Open Counter Window
Neutral
```

只有明显必要时才补一句条件说明，不要求每个动作拆 On Hit / On Miss / On Block / On Evade。

---

# 11. Prerequisites

只用一个统一字段回答：

> **动作成立前必须具备什么条件。**

例如：

- 拔刀斩需要可拔出的刀剑和出鞘空间；
- 飞踢需要起跳 / 落地区域；
- 贴身快打需要已进入 close range；
- 震地需要真实前序腾空 / 下落；
- P3 滞空 / 掌劲需要 Selected Physical Level = P3。

不拆成体型、柔韧、武器、环境多个复杂子系统。

---

# 12. Environment Impact

环境反馈只是动作结果的视觉延伸，不建立 Environment Destruction Engine。

典型：

```text
P1
→ 轻微摩擦 / 扬尘 / 小幅物体反应

P2
→ 撞翻家具 / 撞墙 / 局部裂纹 / 明显位移

P3
→ 地裂 / 碎石 / 冲击波 / 强气流
```

必须与当前动作方向、Contact 和力度存在因果关系。

---

# 13. 正式单动作 Schema

```text
id
source_id
canonical_name
aliases
functional_category
applicable_range
core_action_mechanic
body_contact_relation
immediate_visible_result
physical_level_range
combat_role
response_compatibility
state_transition
initiative_effect
tempo_profile
risk_commitment
prerequisites
transition_compatibility
environment_impact
risks_failure_modes
metadata
```

字段可稀疏填写，不要求机械补满。

---

# 14. 来源动作清单（17 / 17）

```text
01 极速瞬身突袭
02 凌空飞踢
03 反手格挡防御
04 蓄力重拳冲击
05 侧身闪避走位
06 腾空旋转斩击
07 低空滑步突袭
08 双臂交叉防御
09 后仰规避反击
10 蓄力霸体冲击
11 灵活跳跃突袭
12 空中滞空连击
13 横扫腿击
14 贴身缠斗快打
15 侧身拔刀斩
16 抬手震气击退
17 落地震地重击
```

此前草稿误写为 18 个，并多出“后撤蓄力重击”；重新逐张核对后确认来源只有 1–17，该错误项已从 Runtime Catalog 删除。

---

# 15. Runtime Selection Policy

Catalog 只在：

> **Concrete Action Selection Gap**

出现时按需读取。

选择顺序：

```text
Prerequisites
→ Physical Level legality
→ Combat Role
→ Response Compatibility
→ required State Transition
→ Tempo / Risk / Initiative
```

没有匹配动作时，不强用 Catalog，继续由现有 Fighting / Martial / Weapon / Pattern Knowledge 生成其他动作。

Catalog 是开放候选库，不是动作全集。

---

# 16. 与现有知识的职责边界

```text
Combat System / Technique Backbone
→ combat-fighting-profiles / combat-martial-profiles / combat-weapon-profiles

Abstract Movement / Technique / Transition Pattern
→ combat-choreography-patterns/minimum-validation-set.md

Concrete reusable single action
→ combat-choreography-patterns/action-reference-catalog.md

Battle State / Exchange Spine / Advantage / Coverage
→ Action Combat Task Playbooks / Contracts

Environment Affordance
→ combat-environment-patterns/library.md

Visual Style
→ references/styles/*
```

---

# 17. Final Prompt Boundary

内部字段不能整表序列化给视频模型。

最终只外显：

```text
具体动作
+ 起始身体 / Range 状态
+ Contact / Evasion / Interception
+ 对手即时反馈
+ 必要的 Range / Axis / Position / Balance 后果
+ 下一动作入口
+ 当前 Physical Level 下必要环境反馈
```

继续遵守：

> **State Machine Internalized, Choreography Externalized.**

---

# 18. Integrated Regression

下一轮固定 G01 继续保持原始固定输入与选择，不再增加新的交互变量。

除原 RF-22 / RF-14～RF-20 外，新增观察项：

```text
Concrete Action Selection Gap
Catalog Read Evidence
Selected Action ID
Response Compatibility
Physical Level legality
Prerequisite legality
State Transition realization
Concrete Action Phrase
Prompt density / dedup impact
```

真实 Interactive Run 才能证明 Runtime 集成有效；静态文档和路由检查只证明 Wiring 存在。
