# Action Combat Regression Fix Spec

> 状态：**RF-01～RF-22 Runtime Implemented / 待同一 G01 ×2 Regression 验证**  
> 日期：2026-08-15  
> 来源：G01 办公室职业杀手 15 秒近身格斗真实 Interactive Regression、第二轮真实测试及后续 Grill Me 决策  
> 作用：定义本轮 Action Combat 回归修复的设计真源与验收口径。RF-01～RF-21 首批 Runtime 已落库；第二轮真实 Regression 又暴露 Post-Planning Runtime 的一级接线可靠性问题，新增 RF-22。RF-22 已按确认设计完成 Runtime 实施；下一步只跑同一 G01 双次 Regression，不扩其他设计。

Runtime 实施入口：

- `SKILL.md`
- `references/tasks/action-combat-video/interactive-combat-policy.md`
- `references/tasks/action-combat-video/regression-fix-runtime-policy.md`
- `references/libraries/combat-choreography-patterns/minimum-validation-set.md`

当前原则：

> **Routing First, Knowledge Second.**  
> **Regression → Failure Layer → Minimal Fix → Regression Again.**  
> **Loader reliability must be enforced by the loader upstream, not by the file being loaded.**

---

## 0. 本轮问题定位

第一轮真实 G01 已证明：

- Interactive 上游比旧版本明显改善；
- Hybrid Silent Expansion 基本正确；
- Stage-2 最小 Movement / Technique Pattern 已开始进入动作；
- Camera Handoff 基本正常；
- 但仍存在 Recommendation Breadth、Round 2 Candidate Coverage、Archetype Consumption、Archetype → Stage-2 Weighting、Upper-body Dominance、Ending Signature Drift、Granularity Over-expansion、Exchange Density、Concrete Compression、Serialization Duplication 等问题。

第二轮真实 G01 测试进一步证明：

- Round 1 推荐宽度、Round 2 Expression、Movement Causality、Per-Character Signature、Ending Compatibility 已看到明显改善；
- `regression-fix-runtime-policy.md` 虽然在 `interactive-combat-policy.md` 中被声明为 Mandatory Read，但当前真实执行的 Read List 没有实际读取该文件；
- Stage-2 Trace、Duration-aware Two-pass、Exchange Density、Concrete Compression、Serialization Deduplication 等下游修复因此无法证明真正进入执行链；
- 这不是 Knowledge Coverage Failure，优先定位为 **Post-Planning Runtime Handoff Reliability / Routing Failure**。

因此当前没有证据支持继续扩完整武术知识库；先修一级 Runtime Routing / Handoff，再用完全相同 G01 Regression。

---

# A. Interactive / Recommendation

## RF-01 — Hybrid 合法，但不能把题材身份变成单一路线

确认：

- 不禁止 Chinese Cinematic Kung-fu Hybrid 出现在普通中国角色、现代办公室、职业杀手等题材；
- 角色国籍 / 职业 / 场景可以参与推荐相关性；
- 但不能因为“中国人 / 杀手 / 办公室”把第一问过早收敛成一个默认 Combat System；
- 解决方式是 Recommendation Breadth / Diversity，而不是禁止 Hybrid。

---

## RF-02 — Round 1 动态宽候选

Round 1 是整场 Combat Design Space 的第一处分叉，应比后续节点更宽。

```text
当前用户选题
+ Scene / Range / Environment
+ Character Relation / Physical Conditions
+ Viewing Intent
+ 已确认限制
→ 分析真实 Combat Design Space
→ 动态筛选高价值候选
```

常见情况下约 **6～8 个方向 + 自定义**，但这不是硬配额：

- 只有 4～5 个真正合理方向时，不凑数；
- 有 8～9 个真实高价值分叉时，不机械砍到 6 个；
- 数量由当前选题动态决定。

---

## RF-03 — Recommendation Diversity Gate

候选质量看：

```text
Relevance
+ Meaningful Technique Difference
+ Range / Movement Difference
+ Striking / Grappling / Whole-body / Environment 等解决路径差异
+ User Decision Value
```

禁止“数量很多但其实是相近拳种换名字”。

---

## RF-04 — 1v1 默认展示完整 Pairing

1v1 的 Round 1 默认展示：

> **角色 A Combat System vs 角色 B Combat System 的完整对战方向。**

每个候选解释两套体系碰撞后会怎样改变：

- Range；
- Movement；
- Counterplay；
- Pressure / Counter；
- 整体观看体验。

底层仍分别保存：

```text
Character A Combat System
Character B Combat System
```

Pairing 只是 Interactive Presentation，不是新的 System 类型。

---

# B. Round 2 / Expression / Archetype

## RF-05 — Expression 必须有真实候选

Round 2 仍是一个 Primary Planning Node，但内部两个子维度分开展示、分开选择、同轮完成。

Character Combat Expression 不能只给一个“推荐 A”。

如果用户未明确 Expression：

```text
动态生成 2～3 个真正不同的 Expression 组合
+ 自定义
```

差异必须真实改变：

- Initiative；
- Risk；
- Counter / Pressure；
- Re-entry；
- Rhythm。

不新增固定 Round 3。

---

## RF-06 — 五种基础 Archetype 默认完整展示

当 Round 2 暴露 Archetype Selection 时，默认覆盖：

1. 李连杰型；
2. 吴京型；
3. 甄子丹型；
4. 成龙型；
5. 李小龙型；
6. 不指定 / 自定义。

Runtime 可以动态排序和标记推荐，但不能无理由静默删除某一种。

上一轮“李小龙型在 Policy / Library 中存在但实际候选消失”定义为：

> **Archetype Candidate Coverage Failure**

---

## RF-07 — Archetype 是 Character-level 属性

底层按角色保存：

```text
Character A
- Combat System
- Combat Expression
- Cinematic Combat Archetype

Character B
- Combat System
- Combat Expression
- Cinematic Combat Archetype
```

允许：

```text
女方：Hybrid + 冷静后发 + 李连杰型
男方：散打 + 主动压迫 + 吴京型
```

也允许：

```text
双方统一李连杰型
```

不新增固定轮次；Round 2 内完成。

---

# C. Archetype Runtime Consumption

## RF-08 — Archetype Mandatory Consumption Gate

当任一关键角色：

```text
Cinematic Combat Archetype != none
```

进入 Derived Choreography Direction / Stage-2 前必须实际读取：

`references/libraries/combat-cinematic-archetypes/library.md`

链路：

```text
Archetype confirmed
→ Library Read
→ Runtime Bias Extraction
→ Derived Choreography Direction
→ Stage-2
```

如果 Archetype 已确认但对应 Library 没有实际读取：

> **Archetype Consumption Missing**

Final Preflight 不得 PASS。

---

## RF-09 — Archetype-to-Stage-2 Weighting

Archetype 不是只读标签，必须真实改变 Stage-2 Pattern Selection 权重。

例如李连杰型提高：

```text
Footwork
Route Change
Axis Change
Level Change
Kick Integration
Whole-body Linkage
```

并降低长期：

```text
Wrist Control
Forearm / Shoulder-line Dominance
Static Clinch
Static Trading
```

其他 Archetype 按其 Library Runtime Bias 执行。

明确禁止：

- 固定 Combo；
- 固定腿法次数；
- 固定转身 / 换位次数；
- 固定 High / Medium / Low 比例。

Archetype 只改变选择权重，不建立动作配额。

---

## RF-10 — Archetype Realization Gate

Library Read 只是必要条件，不是 PASS。

Final Preflight 必须问：

> **删除明星名称后，只看动作本身，能否读出对应 Archetype 的 Movement / Rhythm / Range / Transition / Impact 偏置？**

如果 Library 已读，但动作仍退化成通用同质骨架：

> **Archetype Realization Failure**

回到 Stage-2 Weighting / Pattern Selection 重写。

---

# D. Character Signature / Ending / Movement

## RF-11 — Per-Character Signature Separation Gate

不同角色已经确认不同：

```text
Combat System
+ Combat Expression
+ Cinematic Combat Archetype
```

则这种差异必须贯穿整场 Combat Spine。

持续检查：

- Entry；
- Movement；
- Technique；
- Range Transition；
- Rhythm；
- Initiative Theft；
- Re-entry。

测试：

> 删除角色姓名，只看动作逻辑，是否仍能大致判断谁是哪种打法？

如果双方后半段同质化，只是轮流使用同一动作骨架：

> **Per-Character Signature Collapse**

---

## RF-12 — Ending Signature Compatibility Gate

Ending / Advantage Recommendation 必须消费：

```text
Combat System
+ Combat Expression
+ Cinematic Combat Archetype
+ Advantage Trajectory / Last Active State
```

Ending 负责定义：

- 谁占优；
- 对方是否仍能反抗；
- 末拍的战术 / 空间状态。

Ending 不得偷偷引入新的 dominant technique。

典型失败：

```text
上游：李连杰型 Footwork / Route / Level / Kick Integration
→ Ending 默认抓腕 + 锁臂 + 压墙
→ 下游全部被腕肘 / 肩线控制吸走
```

失败：

> **Ending Signature Compatibility Failure**

Grappling / Wrestling 角色在符合自身 Signature 时仍可合法使用墙边控制。本 Gate 不禁止 Grappling，只禁止 Ending 偷换打法。

---

## RF-13 — Movement Causality Gate

不能只检查有没有：

- 侧切；
- 转轴；
- 沉身；
- 高低位；
- 步法；
- 支撑转换。

必须检查：

> **Movement 是否改变了战斗问题？**

PASS：

```text
Movement
→ 改变 Route / Axis / Range / Position / Support / Balance / Level
→ 对手被迫产生新的即时响应
→ 新 State 成为下一 Technique / Defense / Re-entry 原因
```

FAIL：

```text
上肢先完成格挡 / 抓控
→ 同时移动一步
→ 再抓腕
```

如果 Movement 只是给上肢动作配脚步，仍判：

> **Movement Causality Failure / Upper-body Technique Dominance**

---

# E. Stage-2 Traceability

## RF-14 — Stage-2 Pattern Traceability Gate

Regression / Debug 必须能追踪：

```text
Planning / Choreography Gap
→ Slot
→ Main Pattern
→ optional Auxiliary Pattern
→ 实际读取的 leaf knowledge
→ Pattern Detail
→ Concrete Action Phrase
```

普通 Final Prompt 不展示 Trace。

Failure 分流：

```text
无 Pattern Hit
→ Routing Failure

Pattern 不符合 Gap / System / Archetype
→ Selection / Weighting Failure

Pattern 正确但 Phrase 写坏
→ Realization Failure

Choreography 正确但 Prompt 被压坏
→ Assembly / Serialization Failure

Prompt 正确但视频不执行
→ Model / Adapter Failure
```

只出现 `Read: minimum-validation-set.md` 不能证明 Stage-2 成功。

---

# F. Granularity / Exchange Density / Duration

## RF-15 — Granularity Over-expansion

正式识别此前反复出现的问题：

```text
动作具体化增强
→ 普通 Exchange 也被展开成 High-detail
→ 单个 Phrase 吃掉过多信息 / 时间预算
→ 15 秒只剩少量大 Exchange
```

Failure：

> **Granularity Over-expansion**

它与 Granularity Under-specification 是两个相反失败端。

---

## RF-16 — Exchange Density / Granularity Distribution Gate

Final Preflight 检查：

- Active Exchange 是否明显过少；
- 是否大量普通 Exchange 被错误展开成 High；
- High / Medium / Low 是否有真实展开深度差异；
- 是否因为文字细节牺牲 Re-counter / Re-entry / Initiative Handoff；
- 是否再次出现 `High → High → High → Ending`。

语义：

```text
Major Reversal / Initiative Theft / Signature
→ High

Ordinary Exchange / Re-counter / meaningful Range Change
→ Medium

Connector / Recovery / Re-entry
→ Low
```

禁止固定动作数、Phrase 数或比例。

---

## RF-17 — Concrete Compression Gate

Medium / Low 可以更短，但必须仍然具体。

承担 Active Combat 的压缩 Phrase 至少保留足够的：

```text
明确动作
+ 明确对手响应或可见状态后果
+ 必要 Continuation
```

禁止：

```text
掌根或前臂……
某种低线动作……
快速反制……
持续换位……
```

Runtime 必须先决策一个明确动作，不能把 A/B 选择留给视频模型。

原则：

> **更短的动作句，不等于更模糊的动作句。**

---

## RF-18 — Duration-aware Choreography Budget

Duration 在具体 Phrase 展开之前参与 Planning。

```text
Duration
+ Combat Density Intent
+ Active Combat Coverage
+ Dialogue / Story Event 占用
+ Camera Complexity
+ Model Capability（如有）
→ Choreography Information Budget
```

它影响展开深度，但不产生固定动作数量。

对于 15 秒 High Coverage Combat：

> 不能把所有普通 Exchange 都展开为 High；必须给更多真实攻防来回留执行空间。

不是：

> “15 秒必须 8 招 / 6 个 Exchange”。

---

## RF-19 — Two-pass Choreography Planning

### Pass 1 — Exchange Spine / Battle Beat Skeleton

先形成整段轻量 Combat Spine。

只要求清楚：

```text
谁发起
→ 对方如何回应
→ 产生什么新 Contact / Range / Axis / Position / Support / Advantage State
→ 下一 Exchange 为什么可以开始
```

先检查：

- Duration / Coverage；
- Exchange Depth；
- Advantage / Counterplay；
- Per-Character Signature；
- Movement / Range / Position；
- 是否已经只剩少量大动作盒。

### Pass 2 — Selective Stage-2 Expansion

Exchange Spine 成立后，再：

```text
Gap
→ Movement / Technique / Transition Slot
→ Pattern Selection
→ Concrete Action Phrase
→ High / Medium / Low
```

核心原则：

> **先知道这里需要发生什么战斗变化，再选择 Pattern；不能先看到 Pattern，再为了使用它硬塞动作。**

Skeleton 不是新的复杂 Engine，也不是固定模板。

---

# G. Prompt Assembly / Camera

## RF-20 — Serialization Deduplication Gate

Final Prompt 同一个控制意图只保留一次最强表达。

优先级：

```text
具体正向动作
>
必要全局正向规则
>
少量高价值 Negative
```

如果具体动作已经表达：

- 不 Reset；
- Motion Handoff；
- Position / Axis；
- Contact / Weight；

不要在 Continuity / Style / Avoid 中重复解释。

目标：

```text
具体 Action Flow 承担主要语义
+ 少量真正全局 Camera / Physics / Continuity
+ 极少数模型高风险 Avoid
```

目的不是单纯缩短，而是把 Prompt Information Budget 还给真实 Exchange。

---

## RF-21 — Camera Runtime Freeze

本轮 Camera Handoff 没有足够 Failure Evidence，因此：

- 不修改 `action-camera-handoff-playbook.md`；
- 不新增第二套 Camera Runtime；
- Camera 只作为 Regression Preservation 对照层；
- 只有未来视频明确出现 Camera 抢动作、Cut Reset、Viewer Task 丢失或 Adapter / Assembly 丢失 Handoff，才重新开启 Camera 专项修复。

---

# H. Post-Planning Runtime Routing

## RF-22 — Post-Planning Runtime Handoff Reliability

### 22.1 Failure Evidence

第二轮真实 G01 中：

```text
SKILL.md
→ READ interactive-combat-policy.md
→ Policy 文本声明 MUST READ regression-fix-runtime-policy.md
→ 实际 Read List 没有 regression-fix-runtime-policy.md
→ 直接进入下游 Choreography / Stage-2 / Assembly
```

因此原有“二级文档中的 Mandatory Read”只能证明静态 Wiring 意图，不能证明真实 Runtime Consumption。

Failure 定义：

> **Post-Planning Runtime Handoff Reliability Failure**

### 22.2 Scope

RF-22 本轮只作用于：

> **Interactive Action Combat**

明确不修改：

- Quick Mode；
- Archetype UX；
- Combat Knowledge；
- Camera Runtime；
- RF-14～RF-20 的规则正文。

### 22.3 Routing Truth / Runtime Truth 职责

职责固定为：

```text
SKILL.md
= Routing Truth
= 真正执行 Direct READ / Read Evidence Gate / Recovery

interactive-combat-policy.md
= Upstream Boundary
= 只声明 Interactive Planning 完成后不得直接跳 Stage-2 / Final Assembly
= 不再承担真正的 transitive READ 路由

regression-fix-runtime-policy.md
= Runtime Truth
= RF-08～RF-20 的 Runtime 正文
= 不负责证明“自己有没有被读取”

docs/action-combat-video-regression-fix-spec.md
= Design / Acceptance Truth
```

原则：

> **被加载文件不能负责证明自己已经被加载；Loader Reliability 必须由上游 Loader 负责。**

### 22.4 Direct Read Timing

所有高价值 Interactive Combat 决策完成后，在 **Action Combat Post-Planning Mandatory Path 入口第一步**执行：

```text
Interactive Planning Complete
→ READ references/tasks/action-combat-video/regression-fix-runtime-policy.md
→ Runtime Handoff Gate
→ Confirmed Per-Character Planning Context
→ Derived Choreography Direction
→ Duration-aware Choreography Budget
→ Exchange Spine / Stage-2 / Assembly...
```

不在 Round 2 刚完成但 Ending / Camera / Physical Scale 等高价值决策尚未完成时提前加载；也不重复加载两次。

### 22.5 Read Evidence Gate

进入任何 Post-Planning 派生执行前必须验证：

> 当前这一次任务执行中，是否发生过对 `regression-fix-runtime-policy.md` 的真实文件 READ。

唯一有效 Evidence：

```text
Current Execution
→ actual READ regression-fix-runtime-policy.md
→ READ 发生在 Post-Planning derived work 之前
```

以下都不算：

- `SKILL.md` 提到了文件；
- `interactive-combat-policy.md` 写了 MUST READ；
- 模型声称“已遵循”；
- Final Prompt 看起来像用了规则；
- 以前某次任务读过。

### 22.6 Missing Read Recovery

如果 Handoff Gate 没找到有效 Read Evidence：

```text
Missing Read detected
→ 立即 READ regression-fix-runtime-policy.md
→ invalidate 已产生的全部 Post-Planning 派生结果
→ 只继承已确认 Interactive Planning Context
→ 从 Post-Planning Runtime 入口重新执行
```

必须作废的派生结果至少包括：

- Derived Choreography Direction；
- legacy Fighting Direction execution-slot 派生结果；
- Duration-aware Budget；
- Exchange Spine；
- Stage-2 Gap / Pattern Selection；
- Concrete Action Phrase；
- 下游 Assembly 草稿。

允许继承的只有用户已确认或 Interactive 已确认的上游 Planning Context，例如：

- Combat System / Refinement；
- Expression；
- optional Archetype；
- Ending / Advantage 决策；
- Camera Base Viewing Priority / Hard Constraint；
- Physical Presentation Domain；
- 用户原始场景 / 时长 /限制。

禁止：

```text
旧 Runtime 下生成骨架
→ 补读 Policy
→ 在旧骨架上打补丁
```

### 22.7 Production / Regression Visibility

普通 Production UX：

> **Silent Recovery**

内部漏读属于 Skill Runtime 故障，不向普通用户暴露目录 / Recovery 细节。

Regression / Debug：

必须能观察：

```text
RF-22 Handoff Check: PASS-NATIVE / PASS-RECOVERED / FAIL
Runtime Policy Read: native / repaired / missing
Post-Planning partial results invalidated: yes/no
Restart point: Confirmed Interactive Planning Context（when recovered）
```

这些 Evidence 不进入普通 Final Video Prompt。

### 22.8 RF-22 Result States

#### PASS-NATIVE

```text
一级 Direct READ 正常命中
→ Runtime Policy 在任何 Post-Planning 派生之前真实读取
→ 未触发 Recovery
```

这是理想状态。

#### PASS-RECOVERED

```text
一级 Direct READ 漏掉
→ Handoff Gate 捕获
→ 自动补读
→ 污染派生结果全部作废
→ 从 Confirmed Planning Context 重新执行
```

语义：最终执行可靠性 PASS，但 Direct Routing 仍有缺陷。

#### FAIL

任一成立：

- 没有真实 READ；
- 漏读后未被 Gate 捕获；
- 补读但未作废旧派生结果；
- 已进入 Final Assembly 后才补救；
- Recovery 没有从正确入口重新执行。

### 22.9 Close Criteria

RF-22 只有满足：

> **同一 G01、完全相同输入与选择，连续 2 次 `PASS-NATIVE`**

才允许关闭。

如果：

```text
Run 1 = PASS-NATIVE
Run 2 = PASS-RECOVERED
```

则：

```text
RF-22 = OPEN
连续 Native 计数重新开始
```

`PASS-RECOVERED` 仍允许继续检查同一轮 RF-14～RF-20，因为 Recovery 在 Stage-2 前完整重置并重新执行；但它不能替代 Direct Routing 的关闭条件。

### 22.10 Confirmed Grill Decisions / 17 项确认记录

1. `regression-fix-runtime-policy.md` 升级为 `SKILL.md` 一级 Direct Mandatory Read；
2. Direct Read 时点固定在所有高价值 Interactive 决策完成后、Post-Planning Mandatory Path 入口第一步；
3. `SKILL.md` 是真正 Routing Truth；`interactive-combat-policy.md` 只保留下游边界声明；
4. 增加轻量 Runtime Handoff Read Evidence Gate，不建立完整状态机；
5. Missing Read 时自动补读并从 Post-Planning 入口重新接管，不向用户报错终止；
6. 本轮只修 Routing / Handoff，其他已发现问题不顺手修改；
7. 新增正式编号 `RF-22 — Post-Planning Runtime Handoff Reliability`；
8. 只有当前执行中的真实文件 READ 才算有效 Read Evidence；
9. RF-22 本轮只适用于 Interactive Action Combat，不迁移 Quick；
10. RF-22 执行逻辑落 `SKILL.md`，Spec 记录合同，Interactive Policy 只保留边界，Runtime Policy 不承担 Loader 检查；
11. 漏读后所有 Post-Planning 派生结果作废，只继承 Confirmed Interactive Planning Context；
12. Production 静默自愈，Regression / Debug 保留 Recovery Evidence；
13. 正式区分 `PASS-NATIVE / PASS-RECOVERED / FAIL`；
14. 只有 `PASS-NATIVE` 才具有 RF-22 关闭资格；
15. 连续 2 次同一 G01 `PASS-NATIVE` 才关闭 RF-22；
16. 下一轮完全复用当前 G01 输入与选择，不额外加入 Archetype；Archetype Variant 后测；
17. Regression 顺序固定为 `RF-22 → RF-14～RF-20 → G01-Archetype Variant RF-08～RF-10 → Generated-video Regression`。

---

# I. Runtime 实施状态

### Interactive Policy

`references/tasks/action-combat-video/interactive-combat-policy.md`

负责：

- RF-01～RF-07；
- 只声明完成 Interactive Planning 后必须移交 Post-Planning Mandatory Path；
- RF-22 实施后不再把自身作为 `regression-fix-runtime-policy.md` 的真正 Loader。

当前实现 commits：

- `9bf31595e0fb53bce4b0b19374729ca176c9d705` — 移除 transitive Loader 职责，改为上游边界；
- `03158470401906bae2201ce25827337845daae10` — 恢复原有 Anti-overdesign 原则，保持最小改动。

### Regression Runtime Policy

`references/tasks/action-combat-video/regression-fix-runtime-policy.md`

负责：

- RF-08～RF-20 的运行顺序、消费门禁和 Final Preflight additions；
- RF-21 Camera Freeze 的 Runtime 边界；
- 不承担 RF-22 Loader Reliability。

本轮未修改该文件正文。

### Stage-2 Minimum Validation Set

`references/libraries/combat-choreography-patterns/minimum-validation-set.md`

已补：

- Pattern Traceability；
- Archetype / Signature Weighting 边界；
- Movement Causality；
- G01 新验收。

本轮未修改该文件。

### Main Wiring / RF-22

`SKILL.md` 现在是一级 Routing Truth：

```text
Interactive Planning Complete
→ Direct READ regression-fix-runtime-policy.md
→ Runtime Handoff Read Evidence Gate
→ Missing 时 Recovery + Invalidate + Restart
→ Post-Planning Runtime
```

实现 Commit：

`b06f57061394f59b36ffdae49b1e94c448db2bac`

RF-22 当前状态：

> **Implemented / Pending same-G01 ×2 Regression**

---

# J. 下一次 Regression 计划

## J.1 G01-Routing Regression

完全复用第二轮当前 G01：

- 相同原始输入；
- 相同 Round 1 / Round 2 / Ending / Camera / Physical Scale 选择；
- 不额外选择 Archetype；
- 不改变测试 Prompt 目标。

先跑同一 G01，优先检查 RF-22：

```text
Run 1 → RF-22 Result
Run 2 → RF-22 Result
```

目标：

> **连续 2 次 PASS-NATIVE。**

## J.2 同一 G01 的 RF-14～RF-20 检查

只要某次执行是 `PASS-NATIVE` 或完整 `PASS-RECOVERED`，即可继续检查：

1. RF-14 Stage-2 Traceability；
2. RF-15 Granularity Over-expansion；
3. RF-16 Exchange Density / Granularity Distribution；
4. RF-17 Concrete Compression；
5. RF-18 Duration-aware Planning；
6. RF-19 Two-pass Choreography；
7. RF-20 Serialization Deduplication。

同时保留：

- RF-13 Movement Causality；
- RF-11 Signature Separation；
- RF-12 Ending Compatibility；
- RF-21 Camera Preservation。

## J.3 Archetype Variant

只有普通 G01 Prompt-level Runtime 路径明确通过后，再单独运行：

> **G01-Archetype Variant**

用于验证：

- RF-08 Archetype Mandatory Consumption；
- RF-09 Archetype-to-Stage-2 Weighting；
- RF-10 Archetype Realization。

不把 Archetype Variant 混入 RF-22 第一轮 Routing Regression。

## J.4 Generated-video Regression

当：

```text
RF-22 关闭
+ RF-14～RF-20 Prompt-level PASS
+ G01-Archetype Variant RF-08～RF-10 PASS
```

再进入真实视频生成验证。

如果 Prompt-level 全部 PASS，但成片仍明显失败：

> **进入 Generated-video Regression / Model Capability / Prompt Saturation / Adapter 分析，而不是继续扩 Prompt 架构。**

---

# K. 当前禁止继续做的事情

在 RF-22 + 新 G01 证据出现前，不要：

- 顺手修 Round 2 Archetype Selection Affordance；
- 顺手改 Concrete Compression / Dedup 规则正文；
- 扩完整中国武术百科；
- 建明星独立 Combat Engine；
- 建明星固定 Combo；
- 建 Lower-body Engine；
- 建 Body Method State Machine；
- 建每拳种独立 Runtime Tree；
- 建第二套 Camera Runtime；
- 修改 `action-camera-handoff-playbook.md`；
- 将 RF-22 扩到 Quick Mode；
- 使用固定腿法 / 换位 / 动作次数；
- 把“常见 6～8 个候选”实现成硬配额；
- 把 Exchange Spine 做成固定模板。

下一步固定为：

> **完全相同 G01 × 2 → 先看 RF-22 Routing，再看 RF-14～RF-20。**
