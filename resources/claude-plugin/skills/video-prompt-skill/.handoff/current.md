# Video Prompt Skill — Action Combat Current Handoff

> 更新时间：2026-08-16 23:38（UTC+8）  
> 仓库：`twj515895394/video-prompt-skill`  
> 分支：`main`  
> 当前阶段：**Action Combat Impact Realization 已 Design Locked 并完成第一阶段 Runtime Integration。IR-01 首次 Prompt-level Regression 已证明 Impact Core 生效，但 Final Serialization / Execution Density 仍 FAIL；已完成最小修复。下一会话不要继续 Grill 架构，直接用同一固定 G01 重跑，分析新的完整对话 + Final Prompt。Prompt-level PASS 后再进入真实视频生成。**

---

## 0. 下一会话接管顺序

优先读取：

1. `.handoff/current.md`
2. `docs/action-combat-impact-realization-spec.md`
3. `references/tasks/action-combat-video/regression-fix-runtime-policy.md`
4. `references/tasks/action-combat-video/choreography-playbook.md`
5. `docs/action-combat-video-generated-video-execution-regression-spec.md`
6. 如需核对完整 Action Combat 主链：`SKILL.md`
7. 如命中 Stage-2 Gap：`references/libraries/combat-choreography-patterns/minimum-validation-set.md`
8. 如命中 Concrete Action Selection Gap：`references/libraries/combat-choreography-patterns/action-reference-catalog.md`

如果用户下一会话直接上传新的测试对话：

> **先分析真实 Read Trace + Final Prompt，不要重新问已经确认的设计问题。**

---

## 1. Impact Realization — Design Locked

正式 Spec：

`docs/action-combat-impact-realization-spec.md`

状态：

> **Design Locked**

核心目标：修复“动作已经具体，但生成出来仍然没有打击重量 / 受力因果”的问题。

长期原则：

```text
Meaningful Force-bearing Contact
→ Concrete Contact
→ Readable Force Response
→ Combat State Consequence
```

Impact 不是：

```text
猛烈 / 沉重 / 强力
+ camera shake
+ slow motion
+ BOOM
```

而是：

```text
Contact
→ Force enters body / structure
→ Local / Whole-body Response
→ Axis / Support / Balance / Range consequence
→ Post-impact Motion Carry-over
→ Immediate Continuation
```

原则：

> **Contact changes motion; it does not default to ending motion.**

> **Impact Semantics Internalized, Force Causality Serialized.**

---

## 2. Impact Core 已确认架构

### 2.1 Universal Core

所有 meaningful Force-bearing Contact 都可进入 Impact Realization，自适应表达，不是仅限重拳 / Finisher。

不包括：

- 纯 Feint；
- 无接触闪避；
- 没有 meaningful force exchange 的 incidental touch。

### 2.2 Minimum Contract

所有 meaningful Contact 最低：

```text
Concrete Contact
+ Readable Force Response
+ Combat State Consequence
```

### 2.3 Salience

使用定性 Heuristic，不使用数值评分：

```text
I1 Minimal
I2 Standard
I3 Emphasized
```

大致逻辑：

```text
Effective Contact?
→ Meaningful State Consequence?
→ Major Force / Tactical / Narrative Salience?
```

I3 不等于“更疼”，而是当前 Force Event 对战斗 / 观看更重要。

### 2.4 Contact Modality

一个统一 Core + 极薄 Modality Contract：

```text
Strike
Block / Parry / Interception
Grapple / Clinch / Body Pressure
Throw / Takedown
Weapon Clash
Body–Environment Collision
```

不建立六套独立 Impact Engine。

### 2.5 Force Model

Impact 使用已有 Combat Context 做局部派生：

```text
Current Motion / Momentum
Support / Balance
Body Axis
Range
Contact Relationship
Movement Direction
Technique
Physical Presentation
Combat State
```

不新增持久：

```text
Force Meter
Momentum Meter
Impact Velocity
Impact Mass
Force Vector
```

目标：

> **让模型看懂力量，不是做物理模拟器。**

### 2.6 Camera / Audio Ownership

Impact 只产生：

```text
Impact Accent Intent
= Concrete Impact Anchor
+ Perceptual Goal
+ optional Channel Eligibility
```

Impact 回答：

> **What should be felt?**

Camera / Audio / Timing 回答：

> **How should it be perceived?**

当前 Camera Runtime 冻结，不主动重构。

---

## 3. Runtime Integration 已完成

当前强制链：

```text
Concrete Technique Resolution Gate
→ Impact Realization Gate
→ Impact Aftermath / Damage Continuity Gate
→ Granularity / Exchange Density
→ Concrete Compression
→ Action–Camera Handoff
→ Prompt Assembly
→ Serialization Deduplication
→ Adapter-output Concrete Technique + Impact Final Scan
→ Final Preflight
```

### 3.1 Impact / Aftermath Ownership

Impact owns：

```text
Contact
→ Immediate Force Response
→ Force Transmission / Deflection
→ Axis / Support / Balance / Range change
→ Recovery Burden
→ Post-impact Motion Carry-over
→ Immediate Continuation
```

Aftermath owns：

```text
Validated Impact Event
→ Visible / Material / Environment Delta
→ Lifetime
→ Transient / Persistent / Progressive
```

Aftermath 不再重新规划“身体如何被打动”。

Damage 仍使用：

```text
Initial Injury Baseline
+ Event-caused Delta
```

不得强行 clean start，也不得把未来新伤提前加载。

---

## 4. Choreography Playbook 已下沉长期原则

`choreography-playbook.md` 已增加薄的：

> **Force / Impact Realization Contract**

其他章节只消费 / 引用，不复制另一套真源。

长期动作句目标：

```text
Concrete Technique
+ Contact
+ Force Response
+ State Consequence
+ Follow-through
+ Motion Carry-over
+ Immediate Continuation
```

这是自适应密度，不是固定模板。

---

## 5. Impact Regression Track

记录在：

`docs/action-combat-video-generated-video-execution-regression-spec.md`

Impact 与 RF-22 独立验收：

```text
RF-22
= Runtime Routing / Handoff Reliability

IR
= Impact Realization Prompt + Generated-video Validation
```

Completion：

```text
IR-01 Prompt-level PASS
+ IR-01 Video-level PASS
+ IR-02 Prompt-level PASS
+ IR-02 Video-level PASS
→ Impact Realization Initial Validation PASS
```

Prompt-level PASS 不能抵消 Video-level FAIL。

---

## 6. 固定测试 Case

### IR-01 — G01 Strike / Block / Continuation

直接复用当前固定办公室 G01：

```text
15 秒
现代开放办公室
中国男女职业杀手
女 22 岁，长发高马尾，正常职场服装
男 55 岁，秃顶偏胖领导感，正常职场服装
不隔办公桌
Level 2 电影化现代动作
```

本次固定选择：

```text
女 = 太极（实战化：引化 / 借势 / 黏随 / 转轴 / 破重心）
男 = 散打

Expression = A
女冷静诱导 / 后发反制 / 夺主动
男主动压迫 / 被化后立刻再进入

Archetype:
女 = 李连杰型
男 = 吴京型

Rhythm = H Asymmetric Tempo
Advantage = B 拉锯后女方占优，男方仍有威胁
Camera = A 完整动作可读优先
Physical = Level 2
```

IR-01 必须覆盖：

```text
Strike
→ Block / Interception
→ Effective Contact / Counter-contact
→ Force Response
→ Motion Carry-over
→ Continuation
```

### IR-02 — Non-strike Force Exchange

固定方向：

```text
Incoming Motion / Pressure
→ Contact Establishment
→ Force / Momentum Redirection
→ Support / Axis Disruption
→ Throw / Takedown / Control Consequence
→ Continuation
```

推荐使用太极式借力改向 / 换轴 / 破支撑验证：

> **Impact 不是“把拳打得更重”的 Strike 专用增强。**

IR-02 先不跑，当前先关闭 IR-01 Prompt-level。

---

## 7. IR-01 Trial 1 — 真实 Prompt-level Regression（2026-08-16）

用户上传最新完整 Interactive 对话与 Final Prompt。

### 7.1 已证明生效

Impact Core 明显进入 Final Prompt。

典型 Major Reversal：

```text
男方大幅前压
→ 女方顺势把力导向斜侧
→ 男方重心越过前脚
→ 女方横扫承重小腿
→ 被迫跨步换支撑 / 膝线变软
→ 掌根继续推肩胸
→ 肩线被拧向隔断
→ 后脚找平衡
→ 呼吸被打乱
```

因此本轮：

```text
Impact Realization Core        PASS
Force Causality               PASS
Motion Carry-over             PASS
Strike / Block Modality       PASS
I3 Major Impact Realization   PASS
```

这是重要正向证据：

> **“有具体动作但没有受力重量”这一核心问题，在 Prompt 语义层已经明显改善。**

### 7.2 Trial 1 FAIL

IR-01 Prompt-level Overall 仍 FAIL，原因集中在 Final Serialization。

#### FAIL A — Unresolved Action Choice Leakage

Final Prompt 仍出现：

```text
右肘/短拳
掌缘/掌根
面门/上胸
大腿外侧/髋前
墙/隔断
```

Runtime 把最终 Technique / Target 选择再次交给视频模型。

#### FAIL B — Hypothetical Aftermath Trigger

Final Prompt 出现类似：

```text
若脸侧擦到前臂/拳锋 → 再出现红痕
如果某次短拳命中 → 再产生后果
若办公椅被蹭到 → 再移位
```

问题：Aftermath 在主 Action Spine 没有明确 Trigger 时自己创建“可能发生”的 Contact 分支。

正确：

```text
Validated Impact Event
→ Aftermath Delta
```

不是：

```text
Aftermath
→ 猜一个可能 Contact
```

#### FAIL C — Effective High Granularity Everywhere

15 秒 Final Prompt 中大量普通 I1 / I2 Exchange 也被展开为：

```text
脚步
+ 支撑
+ 髋
+ 肩
+ Contact
+ Axis
+ 呼吸
+ 衣料
+ Camera / Audio
```

并出现：

```text
后撤半寸
```

风险：

> **Instruction Saturation / Micro-biomechanics Serialization Leakage**

本轮判定：

```text
Concrete Final Serialization  FAIL
Aftermath Trigger Ownership   FAIL
Model Execution Realizability FAIL / High Risk

IR-01 Prompt-level Overall    FAIL
```

因此本版 Prompt **不进入真实视频测试**。

---

## 8. Trial 1 后已完成的最小修复

仅修改：

`references/tasks/action-combat-video/regression-fix-runtime-policy.md`

Commit：

`b71da12200f01a2c53499a8f5a9bd37250bd7619`

本次没有修改 Impact Core、Camera Runtime 或知识库。

新增 / 强化三类 Final Scan：

### 8.1 No Unresolved Choice Leakage

Final Active Action / Contact Clause 禁止留下会改变机制的：

```text
A/B
A 或 B
```

例如：

```text
右肘/短拳
掌缘/掌根
面门/上胸
```

必须收敛为 ONE resolved execution。

Failure：

> **Unresolved Action Choice Leakage**

### 8.2 No Hypothetical Aftermath Trigger

Aftermath 只能消费主 Action Flow 已经发生的 Validated Impact Event。

禁止：

```text
若命中……
如果擦到……
若办公椅被碰到……
```

若没有明确 Trigger：

> **删除该假设性 Aftermath，不为保留 Aftermath 反向新增 Contact。**

Failure：

> **Hypothetical Aftermath Trigger**

### 8.3 Final Execution Density Compression

最终序列化：

```text
I1
→ Contact + minimum Force Response / State Change

I2
→ Contact + clear Force Response + one highest-value State Consequence + Continuation

I3
→ 可保留额外 1–2 个高价值 Force Transmission / Recovery / Perceptual Anchor
+ Motion Carry-over
```

禁止普通 I1 / I2 全部写成完整 Force Chain。

默认禁止无必要的：

```text
半寸
几厘米
精确角度
关节角度
厘米级位移
```

Failure：

```text
Effective High Granularity Everywhere / Instruction Saturation
Micro-biomechanics Serialization Leakage
```

压缩原则：

> **压描述，不压真实 Exchange；压普通 Impact，不压 I3 关键因果。**

---

## 9. 下一会话唯一高价值动作

不要继续 Grill Impact Architecture。

直接重跑**完全相同的 IR-01 / G01**，保持本节第 6 项选择不变。

用户会在下一会话提供：

> **新的完整对话 + Final Prompt（之后再反馈真实视频）。**

收到后按顺序检查：

```text
1. Runtime Policy Read Timing
2. Final Prompt 是否仍有 / 或 未决 Action Choice
3. Aftermath 是否仍出现假设性 Trigger
4. I1 / I2 是否明显压缩
5. 是否仍有半寸 / 厘米 / 精确角度等微观量化
6. Impact Minimum Contract 是否仍保持
7. I3 Major Reversal 的 Force Chain + Motion Carry-over 是否没有被压丢
8. Whole-body / Movement Causality 是否仍然成立
9. Camera 是否只是被保持，而没有为 Impact 新造第二套逻辑
```

### 如果 Prompt-level PASS

立即进入：

```text
生成真实视频
→ IR-01 Video-level Regression
```

Video-level 检查：

```text
Contact Legibility
Force Causality
Whole-body Coherence
Follow-through / Motion Carry-over
Impact Differentiation
Accent Anchoring
```

### 如果 Prompt-level FAIL

只针对真实 Failure Layer 做最小修复；不要：

- 重开 Impact Spec；
- 扩武术知识库；
- 重构 Camera；
- 新增 Force / Momentum Meter；
- 新建更多 Runtime Gate，除非现有 Gate 无法承载真实证据。

---

## 10. RF-22 / RF-17 / Damage 等旧状态仍保持

### RF-22

Completion Gate 已有强正向 supporting evidence，但固定 G01 ×2 close criteria **尚未正式关闭**。

不要因为 IR 测试自动改写 RF-22 Close Gate。

### RF-17 / Concrete Action Catalog

`action-reference-catalog.md` 已接入。

只有出现：

```text
Concrete Action Selection Gap
```

才必须 READ Catalog。

如果 Runtime 已唯一解析合法 Concrete Action，则不读 Catalog 可以 PASS。

### Damage Onset

正式语义：

```text
Initial Injury Baseline
+ Event-caused Delta
```

不得把“新伤不能提前出现”错误实现为“首帧必须无旧伤”。

### Tai Chi Pairing

Round 1 已补齐独立：

```text
太极 vs 散打
```

与：

```text
八极 vs 散打
```

是不同设计槽位，不互相替代。

---

## 11. Impact 相关关键 Commits

```text
06e763321a36a4b7bf542c046e5b65b371c1bb04
create compact impact realization spec

4033670a2b5f248a5342772c74a555e6d1cda643
confirm local derived force evaluation

e4654622e36fe7be7e1844e4a2c0c886692582b1
confirm qualitative salience + modality contracts

19d4034be32bde89eed51d3121f9a78ec20d6948
confirm channel-agnostic impact accent intent

a2df32c5c11add534e44cbc44401a54141381160
confirm post-impact motion carry-over

3b8c2c31e530079187f94e8483c316e7e84294b3
confirm impact semantics fused into action phrase

0fe92605d277480deb83cc0367deda37f8f8ce12
confirm preservation via existing final scan / preflight

8e57675a6850e5b7d04e820c595dc613aace518c
confirm spec / playbook / runtime / preflight ownership

8ab370929faa7884bc3a9ec5ea10304d035b583b
confirm dual-layer impact regression closure

5a6e0f4251920918242d5b532e0bc569d7e2e326
confirm staged runtime migration

87caa8adf0bd8469c1fc75080226e26e93979eaa
lock impact spec design

bf9b093d354716b35389cfb661b680f82df52b40
add thin long-term force / impact contract to choreography playbook

f1158b4f98024050a6074bfebb894daad38c5f0c
insert impact realization gate and transfer immediate-response ownership from aftermath

5c9c1d75980743101c2aba322f1eecd175a7cae0
merge concrete technique + impact adapter final scan

1b03b343d2d8d4870128be98779724255831fb28
add independent impact regression track

10b2e857ae003ada17994ef509e9c3287258d07b
freeze IR-01 / IR-02 representative cases

b71da12200f01a2c53499a8f5a9bd37250bd7619
fix IR-01 final serialization / aftermath trigger / execution density guards
```

---

## 12. 当前一句话状态

> **Impact Core 已经证明能把“打中”写成可读 Force Causality；当前正在验证的是：Final Prompt 能否在不丢失 Impact 的前提下，把 15 秒动作压缩到视频模型真正可执行的密度。下一步不是继续设计，而是同一 G01 重跑。**
