# Action Combat Impact Realization Spec

> 状态：Design Locked  
> 适用：Action Combat 的所有 meaningful force-bearing contact  
> 目标：解决“动作具体、连续、可执行，但命中仍缺少重量与打击感”的 Runtime 设计缺口。  
> 文档约束：长期 Compact Spec；单文件硬上限 1500 行，不演化成第二套 Combat Playbook。

---

## 1. Problem

当前 Action Combat 已具备 Concrete Technique、Action → Response → State Change → Next Action、Movement / Support / Range / Position 连续性、Impact Aftermath、Action–Camera Handoff 等能力。

仍存在独立缺口：Runtime 能说明“打中了什么”与“打中后留下什么”，但不一定能让视频模型理解“这一击为什么在接触瞬间有重量”。

典型失败：

- 攻击像碰到目标，而不是把力量送入目标；
- 受击者像主动配合后退 / 后仰；
- 攻击方命中点突然停住，缺少 follow-through / deceleration；
- 局部受击与全身轴线、重心、支撑变化脱节；
- Camera / Audio 只有装饰性强调，没有真实 Contact 锚点。

因此引入轻量 **Impact Realization** 语义层。

---

## 2. Confirmed Architecture Decisions

### Decision 01 — Core Mechanism

Impact Realization 是 Action Combat 通用核心机制，不是电影化 / 动漫 / 强冲击风格才启用的可选增强。

> Impact Realization ≠ 夸张化。

### Decision 02 — Semantic Ownership Only

Impact Realization 负责判断“这一击应该被感知成什么样”，产出 Impact Salience、Force / Contact Semantics、Immediate Force Response、Combat State Consequence，以及必要的 Perceptual Accent Intent。

它不直接控制 Camera / Audio，也不写死 camera shake、slow motion、hit-stop、具体音效等实现。现有 Action–Camera Handoff / Audio Runtime 保留执行权。

### Decision 03 — Trigger Scope

所有 meaningful force-bearing contact 都经过 Impact Realization Check，但展开深度自适应。

典型适用：Strike、Block / Parry / Interception、Grapple / Clinch / Body Pressure、Throw / Takedown / Slam、Weapon Clash / Bind / Deflection、Body–Environment Collision。

通常不展开：纯佯攻、未接触闪避、无明显 Force Exchange 的轻触 / 探手。

### Decision 04 — Minimum Contract + Selective Expansion

所有有效 Force-bearing Contact 共用最小合同：

```text
Concrete Contact
+ Readable Force Response
+ Combat State Consequence
```

关键 Impact 才按需展开：

```text
Force Delivery / Commitment
→ Pre-contact Acceleration
→ Contact
→ Local Reaction
→ Whole-body Force Transmission
→ Attacker Follow-through / Recoil / Deceleration
→ Displacement / Recovery Burden
→ New Combat State
```

这些是可选维度，不是固定八步模板。

### Decision 05 — Three-level Dynamic Salience

```text
I1 — Minimal
I2 — Standard
I3 — Emphasized
```

- **I1**：真实受力，但主要是局部 deflection / pressure、小 State Change、连接性 Contact。
- **I2**：普通有效 Contact，并产生清晰 Axis / Support / Balance / Range / Pressure / Opening 等状态后果。
- **I3**：I2 基础上具有更高 Force / Tactical / Narrative Salience，例如高动量、明显 whole-body displacement / support loss、强 Recovery Burden、Initiative Reversal、Signature / Finisher、Environment Collision 或 major payoff。

Salience 不按动作名称硬编码。

### Decision 06 — One Core + Modality Branches

```text
Impact Core
+ lightweight Modality-specific Realization
```

不建立 Strike / Grapple / Weapon 等多套独立 Impact Engine。

### Decision 07 — Responsibility Boundary

```text
Impact Realization
→ Immediate Dynamics

Core Combat State / Condition
→ Medium-term Functional State

Impact Aftermath / Damage Continuity
→ Persistent / Progressive Visible State
```

Impact 负责即时受力与下一拍 Combat State Consequence；Condition 维护跨多个 Exchange 的功能性状态；Aftermath 维护可见损伤、环境后果与 Baseline / Onset / Lifetime / Continuity。

### Decision 08 — Independent Compact Spec

本文件是长期设计 Spec，不是 G01 Regression 的临时章节。

只保存 Problem、Confirmed Decisions、Semantic Contracts、Runtime Integration Map；不复制完整 Camera / Audio / Damage / Modality 教程。

> **每个 Spec / Playbook / Runtime 单文件不超过 1500 行。**

1500 行是硬上限，不是目标长度。

### Decision 09 — Local Derived Force Model

Impact Force Model 复用现有 Combat State 与当前 Concrete Action，只做一次性局部派生，不新增持久 Force State，也不引入牛顿数、精确速度等伪精确参数。

局部读取 / 推导：

```text
Current Momentum / Motion
Support / Balance
Body Axis
Range / Contact Relationship
Movement Direction
Concrete Technique
Physical Presentation Domain
Narrative Salience
```

形成：

```text
Contact Effectiveness
+ Incoming Momentum / Acceleration
+ Body Commitment
+ Contact Geometry
+ Receiver Support State
+ Narrative Salience
→ I1 / I2 / I3
→ Immediate Force Response
```

只把 Axis deviation、Forced Step、Support Transfer / Loss、Balance、Range / Position、Recovery Burden、Opening / Pressure 等真实结果写回既有 Combat State。

> 目标是让模型看懂力量，不是把 Combat Engine 变成物理模拟器。

### Decision 10 — Qualitative Salience Heuristics

I1 / I2 / I3 使用定性、结果导向 Heuristic Gate，不做数值评分：

```text
Effective Contact?
↓
Meaningful Force / Combat State Consequence?
↓
Major Force / Tactical / Narrative Salience?
↓
I1 / I2 / I3
```

I3 不等于“伤害更大”。

### Decision 11 — Modality Minimum Realization Contracts

六类 Modality 各自有极薄的 Minimum Realization Contract；它们是 Runtime PASS 条件，不是固定 Prompt 模板。

```text
Strike
= Concrete Contact Point / Body Relationship
+ Local Reaction
+ 至少一种 Axis / Support / Balance / Range / Opening 后果

Block / Parry / Interception
= Force meets defensive structure
+ Force 被截停 / 改向 / 吸收中的真实一种
+ Structure / Attack Line / Support / Opening 后果

Grapple / Clinch / Body Pressure
= Pressure / Body Relationship Established
+ Force 持续进入对方结构
+ Forced Step / Rotation / Range Compression / Support Change 中至少一种

Throw / Takedown
= Balance / Support 失效原因
+ Body Redirection / Acceleration
+ Landing / Ground-state / Recovery 即时后果

Weapon Clash
= Concrete Weapon Contact
+ Deflection / Bind / Rebound / Vibration 中真实一种
+ Weapon Line / Opening / Hand–Arm–Body Structure 后果

Body–Environment Collision
= Body 与具体 Material / Object 的方向性碰撞
+ Deceleration / Rebound / Compression 中真实一种
+ Position / Recovery Consequence
```

统一验收：删除“猛烈 / 强力 / 震撼 / 沉重”等形容词后，仍应读得出该 Modality 特有的受力机制。

### Decision 12 — Channel-agnostic Impact Accent Intent

```text
Impact Accent Intent
= Concrete Impact Anchor
+ Perceptual Goal
+ optional Channel Eligibility
```

Impact 回答 **What should be felt?**；Action–Camera Handoff / Audio / Timing 回答 **How should it be perceived?**。

Accent Intent 不直接指定 Camera / Audio / Timing 实现，也不与 I1 / I2 / I3 做机械映射。

### Decision 13 — Impact as Motion Carry-over Conversion Node

Impact Realization 是 Motion Carry-over 的转换节点，不是动作结束点：

```text
Incoming Motion
→ Contact / Force Exchange
→ Motion 被保留 / 传递 / 改向 / 截停 / 吸收 / 反弹中的真实一种
→ Post-impact Motion Carry-over
→ Immediate Continuation Entry
```

`Post-impact Motion Carry-over` 只是局部运动趋势语义，不是新的持久 State / Meter。

默认禁止 Contact 后自动 Neutral Reset。

> **Contact 应当改变运动，而不是默认终止运动。**

### Decision 14 — Fuse Impact Into Existing Action Phrase

Impact Realization 保持内部 Gate；Final Prompt 默认把必要 Force Causality 融合进现有 Concrete Action Phrase，不新增固定 `Impact / Force` 独立段落。

```text
Concrete Technique
+ Contact
+ Readable Force Response
+ State Consequence
+ 必要 Follow-through / Motion Carry-over
+ Immediate Continuation Entry
```

Salience 只控制保留密度：

```text
I1 → Contact + 最必要 Force Response / State Change
I2 → 清晰 Force Response + Continuation
I3 → 可额外保留 1–2 个最高价值 Force Transmission / Recovery / Perceptual Anchor
```

> **Impact Semantics Internalized, Force Causality Serialized.**

### Decision 15 — Preserve Through Existing Assembly / Scan / Preflight

不新增独立 `Impact Preservation Gate`。

```text
Prompt Assembly
→ Minimum Contract 不得在压缩时丢失

Adapter-output Final Scan
→ 不得把 Force Causality 压扁成抽象形容词

Final Preflight
→ 检查 Observable Impact Failure Signatures
```

至少检查：

- Adjective-only Impact；
- Self-propelled Reaction；
- Contact Freeze；
- Neutral Reset；
- State-disconnected Reaction；
- Impact / Aftermath Duplication；
- Accent Without Anchor。

I3 额外确认 `Concrete Impact Anchor + highest-value Force Response + Motion Carry-over` 未被压缩掉。

> **少建新 Gate，多强化现有质量检查。**

### Decision 16 — Layered Runtime Integration + Promotion Lifecycle

```text
Impact Spec
= design semantics / Why + confirmed contracts

Choreography Playbook
= long-term generative principles

Regression Runtime
= execution order + gates + PASS logic

Adapter Scan / Final Preflight
= serialized-output preservation + observable failure signatures
```

原则：

> **Spec owns design semantics.  
> Playbook owns generative principles.  
> Runtime owns execution order and gates.  
> Preflight owns observable failure signatures.**

生命周期：

```text
Design in Spec
→ Validate through Regression Runtime
→ Regression Pass
→ Promote stable thin Gate into long-term Action Combat Runtime
→ Regression file retains only regression-specific logic / test history
```

### Decision 17 — Independent Two-layer Impact Regression

Impact Regression 独立于 RF-22，不并入现有 G01 Completion Gate。

```text
Layer 1 — Prompt / Semantic Regression
+
Layer 2 — Generated Video / Perceptual Regression
→ Impact Regression PASS
```

Prompt-level 至少验证 Minimum Contract、Modality Contract、I3 Preservation，以及不存在主要 Impact Failure Signatures。

Video-level 至少验证：

- Contact Legibility；
- Force Causality；
- Whole-body Coherence；
- Follow-through / Motion Carry-over；
- Impact Differentiation；
- Accent Anchoring。

初始只做少量代表场景：

```text
IR-01 — realistic strike / block / continuation
IR-02 — force redirection / throw / non-strike contact
```

最小完成条件：

```text
Prompt-level PASS
+ Actual Video-level PASS
+ 至少覆盖 Strike 与 Non-strike Force Exchange
→ Impact Realization validated
```

后续仅在出现专项失败时扩展对应 Modality Regression。

### Decision 18 — Minimal First Integration; Camera / Audio Frozen by Default

第一版采用最小闭环迁移，不一次性重构所有下游 Runtime。

迁移顺序：

```text
1. Compact Spec
   → Design Locked

2. choreography-playbook.md
   → 只下沉长期稳定生成原则

3. regression-fix-runtime-policy.md
   → 插入 Impact Realization Gate
   → I1 / I2 / I3 heuristic
   → Minimum Contract PASS
   → Modality Contract PASS
   → Motion Carry-over
   → Assembly / Adapter / Preflight checks

4. IR-01 / IR-02 Regression Track
   → Prompt-level
   → Video-level

5. Regression Pass
   → 将稳定薄 Gate 晋升为长期 Action Combat Runtime
```

执行链最小变化：

```text
Concrete Technique Resolution Gate
→ Impact Realization Gate
→ Impact Aftermath / Damage Continuity Gate
```

本阶段 **Camera / Audio Runtime 默认冻结**。Impact Accent Intent 只作为现有 Action–Camera Handoff / Audio 机制的语义输入；只有 IR-01 / IR-02 实际结果证明“Force Causality 已正确，但下游没有正确消费 Accent Intent”时，才打开相应 Camera / Audio 修改分支。

原则：

> **先验证 Impact 本身，再根据证据修改下游。一次只改变尽可能少的变量。**

---

## 3. External Research Takeaways

GitHub 调研只作为设计启发，不成为 Runtime 真源。

可借鉴：精确 Contact Moment、pre-contact acceleration / commitment、极短 timing emphasis、attacker follow-through / deceleration、receiver recoil / whole-body displacement、force transmission、environment / material reaction，以及 Camera / Audio 与真实 Contact State 同步。

禁止直接照搬成通用规则：每次 slow motion、每次 camera shake、每次 shockwave、每次把人打飞、用夸张特效替代真实 Force Response。

> **吸收“Impact 如何被组织”的结构，不照搬某一种视觉媒介的夸张尺度。**

---

## 4. Runtime Integration Target

第一阶段目标链：

```text
Movement Causality Check
→ Concrete Technique Resolution Gate
→ Impact Realization Gate
→ Impact Aftermath / Damage Continuity Gate
→ Granularity / Exchange Density Check
→ Concrete Compression
→ Action–Camera Handoff（沿用现有 Runtime）
→ Prompt Assembly
→ Serialization Deduplication
→ Adapter-output Final Scan
→ Final Preflight
```

Impact Realization 不替代 Movement Causality、Concrete Technique Resolution、Core Combat State / Continuity、Impact Aftermath、Action–Camera Handoff、Audio Runtime、Prompt Assembly / Serialization。

---

## 5. Design Lock

本 Spec 已完成 Grill 共识并正式锁定。

后续默认规则：

- 不继续扩展新的 Impact 架构概念；
- 实际落地问题优先归类为 implementation gap / regression evidence；
- 只有证据证明本 Spec 的既有合同本身不成立或相互冲突时，才重新打开设计讨论；
- Runtime Integration 按 Decision 18 的最小迁移顺序推进。