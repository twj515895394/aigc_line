# Action Combat Video — Concrete Choreography Implementation Plan

> 状态：**CK-Step 1～6 已完成；Runtime Minimal Validation 已通过 Static Read；下一步进入固定 G01 Prompt Regression。**
>
> 设计真源：`docs/action-combat-video-concrete-choreography-knowledge-spec.md`
>
> 上游 V2 Spec：`docs/action-combat-video-v2-spec.md`
>
> 回归真源：`docs/action-combat-video-v2-regression.md`
>
> 上游历史实施计划：`docs/action-combat-video-v2-implementation-plan.md`
>
> 本计划职责：把 CK-13～CK-19 以及与其直接相关的 CK-01～CK-12，映射为最小 Runtime 修改、最小 Pattern 验证集、固定 G01 Prompt Regression 与 Knowledge Expansion Gate。本文不重写 V2-46～V2-49 已完成实施历史。

---

## 1. 实施目标

本轮只解决两个已经由固定 G01 暴露并确认的问题：

1. **颗粒度越细，动作链数量反而下降**；
2. **动作长期偏上肢控制 / Static Standing Combat，Movement 没有真正成为 Choreography Source。**

本轮不追求建设完整武术知识库，也不新增一级 Combat Engine。

目标链：

```text
Fighting Direction / 怎么打
→ Stage-2 按方向和当前 Gap 读取最小 Pattern Knowledge
→ Movement / Technique / Transition 参与 Concrete Action Phrase
→ Lightweight Granularity Budget 保留更多 Exchange
→ Final Preflight 拦截 Static Standing Combat / Upper-body Dominance
→ 固定 G01 Prompt Regression
→ PASS 后才允许 Knowledge Expansion
```

核心原则：

> **能通过一次高价值交互明确创作方向，就不堆复杂自动推断；Runtime 复杂度只用于把用户选择执行好。**

> **先用最小知识证明结构有效，再决定知识库要扩多大。**

---

## 2. 实施范围与明确不做

### 本轮实施

- Fighting Direction Interactive；
- 与旧“核心动作风格 / Choreography Profile”交互合并；
- Fighting Direction 候选答案动态生成规则；
- Stage-2 Gap-driven Routing；
- 最小 Movement / Technique / Transition Pattern 验证集；
- Lightweight Action Phrase Budget；
- Static Standing Combat / Upper-body Technique Dominance Preflight；
- 固定 G01 Prompt Regression；
- Regression Gate 与 Knowledge Expansion Gate。

### 本轮不做

- 不新增 Lower-body Engine；
- 不新增 Body Method State Machine；
- 不建立门派 / 拳种 Runtime 招式树；
- 不建立大型固定招式序列库；
- 不为 Modern / Traditional / Wuxia 各复制完整知识库；
- 不扩大型 Fighting / Martial / Weapon Library；
- 不修改 Model Adapter；
- 不新增固定动作数、字数、秒数或 Granularity 比例；
- 不固定每次 Stage-2 必须加载 Movement / Technique / Transition 三槽；
- 不修改已经验证有效的 V2-46 Camera Coverage 架构。

---

## 3. 两阶段实施门禁

```text
Phase CK-1｜Runtime Minimal Validation                 ✅ Static PASS
→ Interactive Fighting Direction
→ Stage-2 Routing
→ Minimum Pattern Set
→ Lightweight Granularity Budget
→ Static Standing Combat Preflight
→ Static Read / Structural Gate

Phase CK-2｜Fixed G01 Prompt Regression               ⏳ 下一步
→ 同输入 Interactive
→ Fighting Direction Realization
→ Pattern Hit Evidence
→ Choreography Richness Preservation
→ Upper-body Dominance Improvement
→ Prompt PASS / FAIL

PASS
→ 才允许进入 Knowledge Expansion

FAIL
→ 先判断 Routing / Realization / Granularity / Preflight 哪一层失败
→ 不直接扩建知识库
```

只有 CK-2 PASS 后，才进入后续 Generated Video Re-run 与更大 Knowledge Coverage Audit。

---

## 4. Runtime File Mapping

### 4.1 `assets/templates/mode-interactive-output-contract.md` — ✅ 已实施

**对应：CK-13 / CK-14 / CK-16。**

已实现：

1. `Fighting Direction / 怎么打` 加入 Conditional High-value Question Pool；
2. 用户已明确打法时直接继承；未明确且不同打法显著改变动作内容时直接询问；
3. 原“核心动作风格 / Choreography Profile”不再作为另一轮高度重叠问题；
4. Fighting Direction 同时承载必要的 Rhythm / Realism / Impact / Physical Scale 执行属性；
5. 候选答案至少 5 个，正常 6～8 个，复杂可到 10 个，并始终支持自定义；
6. 候选必须有 Movement / Technique / Range / Physical Scale / 节奏等真实动作差异；
7. 继续遵守 One Question / One Primary Decision Node 与 10-round Safety Cap。

静态回读：✅ PASS。

---

### 4.2 `references/tasks/action-combat-video/choreography-playbook.md` — ✅ 已实施

**对应：CK-01 / CK-05 / CK-12 / CK-15 / CK-17。**

已实现：

- Planning Graph 改为 `Combat Branch → Fighting Direction → ... → Stage-2 Gap Detection`；
- 原独立 Cinematic Choreography Profile 降为 Fighting Direction 的执行属性 / evidence；
- Fighting Direction 映射 Movement / Technique / Range / Level / Physical Scale / Rhythm / Realism / Impact；
- Movement + Technique + Transition 成为 Concrete Action Phrase 的执行知识来源；
- Stage-2 使用 Gap-driven Routing；
- High / Medium / Low Granularity Distribution 接入 Action Phrase；
- 连续两个 High 后普通 Exchange 优先压缩；
- Static Standing Combat Risk 可提高 Movement Slot 优先级；
- Final Preflight 加入 Fighting Direction Realization、Static Standing Combat / Upper-body Dominance、Choreography Richness Preservation。

静态回读：✅ PASS。

---

### 4.3 `references/tasks/action-combat-video/index.md` — ✅ 已实施

**对应：CK-12 / CK-18 / CK-19。**

Mandatory Path 已强化为：

```text
Combat Planning Context
→ Fighting Direction resolved / inherited
→ Stage-2 Knowledge Gap Detection
→ Relevant Pattern Detail
→ Concrete Action Phrase Construction
→ Core State Validation
→ Camera / Audio / Spatial Coordination
→ Prompt Assembly
→ Final Preflight
```

当前最小验证知识源已显式指向：

`references/libraries/combat-choreography-patterns/minimum-validation-set.md`

Static Standing Combat Risk 与 High / Medium / Low Granularity 也在 Router / Preflight 中形成明确闭环。

静态回读：✅ PASS。

---

### 4.4 `references/libraries/combat-choreography-patterns/minimum-validation-set.md` — ✅ 已新增

**对应：CK-03～CK-12 / CK-18。**

实施时没有预先拆成四个物理文件，而是按 Anti-overdesign 原则先使用**单一最小验证叶子文件**，统一承载：

- Shared Core Schema；
- 4 个 Movement Pattern；
- 4 个 Technique Pattern；
- 4 个 Transition Pattern；
- Routing 使用规则；
- G01 验证要求。

当前样例覆盖：

```text
Movement
→ 外侧斜切 / 沉身换位 / 轴线旋转脱离 / 支撑转换

Technique
→ 短打截入 / 低线破支撑 / 破平衡摔控入口 / 全身连动反击

Transition
→ Contact→Movement Re-entry
→ High→Low→High
→ Strike→Off-balance/Takedown
→ Failed Control→Angle Exit→Re-entry
```

这是**验证期物理结构**。如果后续 Pattern 数量增长到单文件不利于按需读取，再拆为 index + 三类叶子文件；本阶段不为了形式完整提前拆文件。

静态回读：✅ PASS。

---

### 4.5 `references/controls/prompt-assembly/control.md` — ✅ 已实施

**对应：CK-15 / CK-17。**

已实现：

1. 保留 V2-49 Concrete Choreography In → Out；
2. 新增 Granularity Distribution Preservation：High / Medium / Low 保持不同信息展开深度；
3. 连续两个 High 后，普通 Exchange 在 Assembly 中不得重新膨胀；
4. Fighting Direction 必须在最终 Movement / Technique / Range / Physical Scale 等动作语言中兑现；
5. Pattern 具体化动作不能重新总结成抽象战斗词；
6. Serialization Preflight 增加 Static Standing Combat / Upper-body Dominance 检查；
7. 不因 Movement 细节增加而破坏 Camera Coverage / Action Continuity。

静态回读：✅ PASS。

---

### 4.6 Combat Final Preflight — ✅ 已实施

沿现有 Choreography / Router / Prompt Assembly Gate 落地，没有新建 Gate Engine。

新增 / 强化：

#### Static Standing Combat / Upper-body Technique Dominance

FAIL / REWRITE：High / Expert Combat 连续多个关键 Phrase 主要由上肢 Contact 主导，Movement 没有主动创造 Level / Route / Axis / Range / Position / Support / Balance 等变化。

即使出现“转髋 / 脚步 / 降低重心”等词，如果只服务上肢控制，没有改变战斗空间或动作入口，也不能 PASS。

#### Choreography Richness Preservation

FAIL / REWRITE：高颗粒度展开再次把约 15 秒压成少量巨大 Exchange；或为了增加数量又退回抽象动作块。

修正通过 High / Medium / Low 信息深度和连续 Phrase 重写完成，不使用固定动作数量配额。

---

### 4.7 本轮冻结文件

未主动修改：

- `references/tasks/action-combat-video/core-playbook.md`；
- `references/tasks/action-combat-video/modern-combat-playbook.md`；
- `references/tasks/action-combat-video/cinematic-wuxia-playbook.md`；
- `references/libraries/combat-fighting-profiles/library.md`；
- `references/controls/camera-direction/control.md`；
- `assets/templates/single-shot-video-template.md`；
- Model Adapters。

特别说明：当前先通过新的最小 Pattern Routing 证明 Stage-2 调用链有效，不顺手扩原大库。

---

## 5. 开发执行顺序

### CK-Step 1｜Interactive Fighting Direction — ✅

完成 `mode-interactive-output-contract.md` 修改并回读。

### CK-Step 2｜Minimum Pattern Knowledge — ✅

完成单文件最小验证集 `minimum-validation-set.md`；没有过早建设大知识库。

### CK-Step 3｜Stage-2 Routing / Choreography Consumption — ✅

完成 `choreography-playbook.md` + `index.md` 修改并回读。

### CK-Step 4｜Granularity Distribution / Assembly — ✅

完成 High / Medium / Low 在 Choreography 与 Prompt Assembly 的贯穿。

### CK-Step 5｜Final Preflight — ✅

完成 Static Standing Combat / Upper-body Dominance / Richness Preservation Gate。

### CK-Step 6｜Static Read / Structural Gate — ✅ PASS

已逐项回读：

- Interactive Contract；
- Combat Index；
- Choreography Playbook；
- Minimum Pattern Validation Set；
- Prompt Assembly；
- Regression。

确认真实闭环：

```text
Fighting Direction
→ Stage-2 Gap
→ Pattern Hit
→ Concrete Phrase
→ Granularity Distribution
→ Assembly
→ Static Standing / Richness Preflight
```

### CK-Step 7｜Fixed G01 Prompt Regression — ⏳ 当前下一步

固定输入、Interactive、15s、Generic，不换场景。

必须记录：

- Read List；
- Interactive Questions / Answers；
- Fighting Direction 选项与用户选择；
- Stage-2 Pattern Hit Evidence；
- Final Prompt；
- High / Medium / Low Granularity Evidence；
- Exchange / Action Chain 变化；
- Static Standing / Upper-body Dominance 证据；
- Camera 是否保持 V2-46 能力；
- PASS / PARTIAL / FAIL。

---

## 6. CK-2 Fixed G01 三个核心 Gate

### Gate A｜Fighting Direction Realization

PASS：询问在需要时出现；候选 5～10 个且有真实动作差异；用户选择被 Final Prompt 具体兑现；不只是标签。

### Gate B｜Choreography Richness Preservation

PASS：V2-49 具体因果保留；普通 Exchange 使用 Medium / Low 压缩后，15 秒动作链不因“写得更细”继续减少；不靠抽象词伪造数量。

### Gate C｜Upper-body Dominance Improvement

PASS：Movement 真实创造 Level / Route / Angle / Axis / Range / Position / Support / Balance / Ground-State 中的适用变化，动作骨架不再主要反复 `前臂偏转 → 肩线封堵 → 抓腕 / 顶肩`。

---

## 7. Knowledge Expansion Gate

只有 Gate A + B + C 全部 PASS，才允许扩更大 Knowledge Coverage。

如果失败，先定位：

```text
A FAIL → Interactive / Fighting Direction Consumption
B FAIL → Granularity Distribution / Prompt Assembly / Temporal Packing
C FAIL → Stage-2 Routing / Pattern Realization
```

只有 Routing、Pattern Hit、Fighting Direction、Granularity、Assembly、Preflight 都正确而 G01 仍持续动作贫乏 / 上肢主导时，才进入 Knowledge Coverage Audit。

---

## 8. Regression 文件映射

正式验收真源继续使用：

`docs/action-combat-video-v2-regression.md`

不另建第二套同级 Regression 真源。

---

## 9. Traceability Matrix

| CK | Runtime / Artifact | 主要验收 |
|---|---|---|
| CK-01 / CK-17 | choreography-playbook + prompt-assembly | High / Medium / Low；动作链不因细化继续减少 |
| CK-03～CK-11 | minimum Pattern set | Movement / Technique / Transition 可组合；小核心 Schema |
| CK-12 | choreography-playbook + index + minimum Pattern set | Planning Gap → Slot → Pattern Hit |
| CK-13 | interactive contract | 条件询问“怎么打” |
| CK-14 | interactive contract | 5～10 个有实质差异候选 |
| CK-15 | choreography + Final Preflight + Regression | Static Standing / Upper-body Dominance Gate |
| CK-16 | interactive contract | 合并旧核心动作风格，不重复问 |
| CK-18 | minimum Pattern set + G01 | 最小知识验证架构，不扩大库 |
| CK-19 | 本 Plan + Regression | CK-1 → CK-2 → Knowledge Expansion Gate |

---

## 10. 当前状态

| 项目 | 状态 |
|---|---|
| Concrete Choreography Spec | ✅ 已确认 |
| CK-13～CK-19 Regression Gate | ✅ 已写入回归真源 |
| 本 Implementation Plan | ✅ 已建立并回写实施状态 |
| Runtime CK-Step 1～5 | ✅ 已实施 |
| Static Read Gate | ✅ PASS |
| Fixed G01 Prompt Regression | ⏳ 当前下一步 |
| Knowledge Expansion | 🔒 Gate 未开放 |

当前准确状态：

> **CK-1 Runtime Minimal Validation 已完成并通过 Static Read；下一步固定 G01 Prompt Regression。**