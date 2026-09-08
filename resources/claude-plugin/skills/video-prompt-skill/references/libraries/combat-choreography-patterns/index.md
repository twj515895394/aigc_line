# Combat Choreography Patterns Index

> Runtime status: **ACTIVE — Abstract Pattern + Concrete Action Reference 双层知识已接入**

本索引负责 Action Combat Stage-2 的动作生产知识路由，不定义 Battle Beat、Exchange Spine、Camera、Advantage 或最终胜负。

---

## 1. 双层知识结构

```text
Abstract Choreography Pattern
→ 回答当前 Movement / Technique / Transition 缺口可以怎样解决

Concrete Action Reference
→ 回答当前 State 下具体可以选什么动作、该动作怎样成立、会造成什么状态变化
```

两层互补，不复制正文，也不要求每次同时加载。

---

## 2. `minimum-validation-set.md`

职责：

- Movement / Technique / Transition 抽象 Pattern；
- Pattern Hit Evidence；
- Pattern-to-Action Resolution 基础约束；
- **Concrete Action Selection Gap 检测与 Catalog Read 触发；**
- **Single Concrete Action Gate：阻止 `/`、`或`、A/B 等同层动作候选泄漏进 Final Prompt；**
- CK / RF 系列当前 G01 Regression 的 Stage-2 抽象知识证据。

适用：

```text
Planning / Phrase Gap 仍停留在“需要什么类型的 Movement / Technique / Transition”
→ READ minimum-validation-set.md
→ select Pattern
→ resolve Pattern toward a concrete action
```

如果 Pattern Resolution 后仍存在两个以上互斥的具体动作 Head，必须继续触发 Concrete Action Selection Gap，而不是把选择交给模型。

---

## 3. `action-reference-catalog.md`

职责：

- 17 个来源动作知识化后的 Concrete Action Reference；
- 8 个 Combat Role；
- Response Compatibility；
- 稀疏 State Transition；
- Min / Default / Max Physical Level；
- Tempo / Risk / Commitment / Initiative；
- Prerequisites；
- Environment Impact；
- 前后动作衔接参考。

适用：

```text
Stage-2 已知道当前需要的战斗功能
但 Concrete Action 仍未确定
→ Concrete Action Selection Gap
→ READ action-reference-catalog.md
→ filter by Prerequisites / Physical Level / Role / Response / Required Resulting State
→ select ONE concrete action
→ realize into current Action Phrase
```

也允许：

```text
当前 Gap 已经足够具体到单动作级
→ 直接读取 Catalog 进行 Concrete Action Resolution
```

禁止：

- 因为 Catalog 存在就每个 Phrase 都强塞一个 Catalog 动作；
- 机械轮换 17 个动作；
- 用 Action Name 代替完整可执行动作句；
- 把 Combat Role / Initiative / Commitment 等内部标签直接输出给视频模型；
- 为了适配较低 Physical Level 改写动作核；
- Catalog 已读取后仍把 `侧踹/前蹬`、`短拳或掌缘` 之类互斥候选留在 Final Prompt。

---

## 4. Stage-2 推荐路由

```text
Combat Planning Context / Exchange Spine
→ detect Execution Gap

如果缺抽象解决策略：
→ minimum-validation-set.md
→ Pattern Selection

如果缺具体动作：
→ Concrete Action Selection Gap
→ action-reference-catalog.md
→ Concrete Action Selection

必要时：
Pattern → Catalog Action

也可在 Gap 已明确时：
Catalog Action directly

→ ONE Concrete Action Head
→ Concrete Action Phrase
→ State / Continuity Validation
→ Single Concrete Action Gate
→ Final Prompt Serialization
```

Catalog 是按需 leaf knowledge，不新增“所有 Combat 必须多读一份 Library”的固定配额。

---

## 5. 选择顺序

选择 Catalog 动作时按以下顺序过滤：

```text
1. Prerequisites 是否成立
2. Selected Physical Level 是否在 Min / Max 内
3. 当前需要的 Combat Role 是否匹配
4. Incoming Action / Current State 是否符合 Response Compatibility
5. State Transition 是否能产生 Exchange Spine 需要的下一状态
6. Tempo / Risk / Initiative 是否符合当前局部节奏
```

如果没有合适动作：

> **不强用 Catalog。回到现有 Fighting / Martial / Weapon / Pattern 知识生成其他动作，但仍必须由 Runtime 选定一个具体动作 Head。**

Catalog 是新增候选知识，不是封闭动作全集。

### Single Concrete Action Gate

关键攻防 Phrase 在 Final Prompt 中不得保留未决的同层动作选择：

```text
A / B
A 或 B
A、B、C 任选其一
```

如果多个动作是真实同时发生，必须写清并发或先后关系，例如：

```text
左前臂拨开直拳，同时右掌根推击胸口
```

这种是复合动作，不是候选泄漏。

---

## 6. 单一真源边界

```text
Combat System / Technique Backbone
→ combat-fighting-profiles / combat-martial-profiles / combat-weapon-profiles

Abstract Stage-2 Gap Pattern + Concrete Selection Trigger
→ minimum-validation-set.md

Concrete reusable single action
→ action-reference-catalog.md

Environment Affordance
→ combat-environment-patterns/library.md

Visual Style
→ references/styles/*

Battle State / Exchange Spine / Advantage / Coverage
→ Action Combat Task Playbooks / Contracts
```

---

## 7. 验证

`action-reference-validation.md` 用于知识与接入验证，不是正常生成时必读 Reference。

后续 RF-22 固定 G01 / Integrated Regression 同时检查：

- RF-22 Planning Completion / Runtime Read Timing；
- 原有 RF-14～RF-20；
- Concrete Action Selection Gap 是否真的触发；
- `action-reference-catalog.md` 是否出现真实 Read Evidence；
- 是否留下 Selected Action ID / Canonical Name → Realized Phrase Trace；
- Final Prompt 是否消除 `侧踹/前蹬`、`短拳或掌缘`、`掌根或拳面` 一类候选泄漏；
- 是否遵守 Physical Level / Prerequisites / Response / State Transition；
- 是否没有导致 Prompt 冗余和动作过载。
