# Action Combat Video — Concrete Choreography Knowledge Spec

> 状态：**Grill Me 设计进行中；已记录当前确认决策，尚未进入 Implementation Plan / Runtime 开发。**
>
> 上游设计真源：`docs/action-combat-video-v2-spec.md`
>
> 上游实施计划：`docs/action-combat-video-v2-implementation-plan.md`
>
> 回归真源：`docs/action-combat-video-v2-regression.md`
>
> 本文职责：承接 V2-49 之后暴露的 **Choreography Richness / Concrete Knowledge / Stage-2 Execution Knowledge / Fighting Direction** 新一轮设计，不再继续追加旧的超长 V2 Spec。

---

## 1. 背景与触发证据

固定 G01（15 秒办公室两名职业杀手近身对决）最新回归表明：

- V2-48 Camera Intent 条件询问已经明显生效；
- V2-49 Executable Action Granularity 已生效，关键 Action Phrase 已能表达具体身体动作、Contact、即时响应、Footwork / Axis / Range / Position 后果与下一动作入口；
- 但 15 秒内仍主要只有约 3 组较大的 Exchange；
- 颗粒度变细后，单 Phrase 占用更多 Prompt / Execution Budget，导致“动作更具体但动作链数量没有同步增加”；
- Concrete Action 长期偏向 `前臂 / 肩线 / 抓腕 / 上臂控制 / 顶肩` 等站立上肢交互；
- 脚步、转髋、重心虽然出现，但常常只是服务上肢控制，没有成为独立 Choreography Source；
- 最新 G01 Read List 没有真正命中 Fighting / Technique Detail，Stage-2 Execution Knowledge 的实际加载仍需验证。

当前问题因此分为两条：

1. **Granularity Distribution**：如何保持动作可执行，同时让 15 秒容纳更多 Exchange；
2. **Combat Diversity / Static Standing Combat**：如何避免长期上肢控制与“站着打”。

当前设计重点主要在第 2 条；第 1 条已经收敛为轻量颗粒度预算规则，不再继续扩展。

---

## 2. Granularity Distribution

不再要求所有 Action Phrase 同等高颗粒度：

```text
High Granularity
→ Major Reversal / Initiative Theft / Signature Moment / 关键状态转折

Medium Granularity
→ 普通 Counter / Re-counter / Range Change / Continuous Exchange

Low Granularity
→ 不承担关键因果的连接 / 过渡动作
```

原则：

> **关键因果动作具体，普通交换适度压缩，连接动作允许摘要。**

该规则并入现有 `Action Execution Budget + Executable Granularity + Temporal Packing`，不新建 Granularity Engine。

### 2.1 Lightweight Action Phrase Budget / 轻量动作短语预算

确认：CK-01 的落地只定义 **什么时候该详细、什么时候该压缩**，不建立固定动作数量、固定字数、固定秒数或固定 Exchange 配额。

运行时使用以下轻量判断：

```text
关键 Reversal / Initiative Theft / Signature Moment
→ High Granularity
→ 保留身体状态、具体动作、Contact、即时响应、位置 / 轴线 / Range 后果与下一入口

普通 Exchange / Re-counter / Range Change
→ Medium Granularity
→ 保留动作因果与关键状态变化，但压缩次要身体细节

纯连接 / 非关键过渡
→ Low Granularity
→ 只保留连续性所需信息，不展开成新的大段动作描写
```

额外规则：

- 如果连续两个 Phrase 已经使用 High Granularity，后续普通 Exchange 应主动优先压缩为 Medium / Low，而不是继续堆第三个同等长度的大段；
- High Granularity 不是“写得越长越好”，只对承担重大转折价值的信息展开；
- Medium / Low 也不能退回“连续格挡 / 快速反制 / 持续缠斗”等不可执行抽象词，仍需保留基本动作因果；
- Runtime 目标是给更多真实 Exchange 留执行空间，而不是追求更长 Prompt。

明确禁止：

```text
15 秒必须 N 个动作
每个 Phrase 必须 N 字
每个 Exchange 必须 N 秒
High / Medium / Low 固定数量占比
```

原则：

> **颗粒度预算只控制“信息展开深度”，不控制“动作数量配额”。**

至此，“颗粒度越细导致动作链越少”作为独立设计问题完成收口；后续只通过 Regression 验证实际 15 秒 Choreography Richness 是否改善。

---

## 3. Concrete Choreography Knowledge Audit

严格按依赖顺序：

```text
Step 1｜Stage-2 Routing Audit
→ 知识有没有真正被加载？

Step 2｜Knowledge Realization Test
→ 加载后动作种类是否显著扩展？

Step 3｜Knowledge Coverage Audit
→ 正确加载后仍长期退化，才判断 Knowledge 本身不足。
```

原则：

> **先证明知识被用上，再判断知识够不够。**

---

## 4. 核心知识模型：Movement + Technique + Transition

解决“站着打 / 偏上肢控制”不能只增加腿法。

```text
Movement Pattern
+ Technique Pattern
+ Transition Pattern
+ Opponent Response
+ Current Combat State
→ Concrete Action Phrase
```

三类 Pattern 职责分离、共享小核心 Schema、允许互相引用；不建立万能“大招式 Pattern”。

### 4.1 Movement Pattern

回答：身体怎么移动、换位、换轴、换高度、改变路线。

覆盖至少包括：

- 身法 / Body Method；
- 步法 / Footwork；
- 步型 / Stance Transition；
- 重心转换 / Weight Transfer；
- 高低位变化 / Level Change；
- Body Axis / 肩胯腰身协同；
- Angle / Route Change；
- 转身 / 绕位 / 穿越；
- 跌扑 / 滚转 / 起身 / 姿态转换。

Movement 不是给上肢动作补“脚步说明”，而是独立创造 Range、Angle、Level、Axis、Position 和新的 Entry。

> **身体本身就在“打”，而不是上肢在打、下肢负责搬运。**

### 4.2 Technique Pattern

回答：具体用什么攻击、防守、控制、摔投或兵器技术。

覆盖至少包括：

- Upper-body Techniques；
- Lower-body Techniques；
- Grapple / Control；
- Throw / Takedown；
- Weapon Techniques。

Lower-body 不能退化为“站着打手 → 偶尔踢一下 → 继续站着打手”；腿法必须能够改变 Support Base、Balance、Range、Route、Level、Axis 或下一次 Entry。

### 4.3 Transition Pattern

回答：前一个身体 / Contact / Range / Axis / Momentum 状态为什么能合法进入下一动作。

典型覆盖：

- Technique → Movement；
- Movement → Technique；
- Technique → Technique；
- Range / Level / Position / Angle Transition；
- Standing → Low Level → Standing；
- Strike → Control / Takedown；
- Control → Strike；
- Failed Takedown → Re-entry；
- Ground / Roll / Recovery → Re-entry；
- Front → Outside → Rear Angle。

Transition 提供更具体的生产知识，与现有 Motion Handoff / Initiative Handoff 对齐，但不新增状态机制。

---

## 5. Pattern-first，而不是门派树

Runtime 一级生产知识是 **Pattern**；南拳、长拳、八极、咏春、太极等作为：

- 来源标签；
- 风格倾向；
- 动作气质；
- Pattern 证据；
- 用户明确指定拳种时的优先检索条件。

不建设：

```text
人物属性 → 猜门派 → 固定招式树
```

而是让不同来源提供可组合 Movement / Technique / Transition Pattern。

---

## 6. Shared Knowledge + Specialist Expansion

采用共享基础知识 + Specialist 扩展，不为 Modern / Traditional Martial / Wuxia 复制三套完整库。

概念结构：

```text
combat-choreography-knowledge/
├─ movement-patterns/
│  ├─ shared/
│  ├─ modern/
│  ├─ traditional-martial/
│  └─ wuxia/
├─ technique-patterns/
│  ├─ striking/
│  ├─ kicking/
│  ├─ grapple-control/
│  ├─ throw-takedown/
│  └─ weapon/
└─ transition-patterns/
   ├─ movement-to-technique/
   ├─ technique-to-movement/
   ├─ range-transition/
   ├─ level-transition/
   ├─ position-transition/
   └─ ground-air-transition/
```

这是概念结构，实施时可根据索引大小和加载成本调整物理文件结构。

### 6.1 运动尺度

```text
Modern Combat
→ 现实人体运动尺度与现实物理边界

Traditional / Martial-grounded Combat
→ 更丰富身法、步法、腿法、高低位与传统武术动作语言
→ 仍接近现实或电影化现实

Wuxia
→ 允许轻功、腾空、空中换向、借物位移、空中攻防等电影化运动
```

禁止 Wuxia 能力反向污染 Modern Combat 默认物理合同。

---

## 7. Wuxia Movement / 轻功与空中战斗

Wuxia 不另建 Combat Engine，而是在同一 Pattern 架构上扩展更高 Movement Scale。

可覆盖：

- 轻功：踏墙、借物腾跃、连续点地 / 点物、高低落差穿越、长距离空中位移；
- 腾空：起跳进入、空中转体、空中换向、空中攻防、落地衔接；
- 空中战斗：追击、格挡 / Counter、兵器交锋、高低位交错、落点争夺；
- 环境借力：墙面、屋檐、栏杆、树木、场景物件 / 武器。

Ground ↔ Air 必须显式连续：

```text
Ground Entry
→ Takeoff Cause
→ Airborne Axis / Momentum
→ Mid-air Attack / Defense
→ Opponent Airborne Response
→ Relative Height / Distance Change
→ Landing Target
→ Landing Handoff
```

避免漂浮、空中静止挥打、起跳落地无因果、落地后状态 Reset。

---

## 8. Pattern Schema：共享小核心 + 专项扩展

统一的是索引与路由语言，不是强迫三类 Pattern 长成同一种形状。

### Shared Core

建议至少包含：

```text
id
name
type
intent / function
entry_conditions
resulting_state
applicable_range
applicable_level
physical_scale
compatible_patterns
incompatible_conditions
source_tags
```

### Movement Extension

```text
route
axis
weight_transfer
level_change
support_base
spatial_effect
```

### Technique Extension

```text
contact_modality
target_area
attacking_surface_or_weapon
defensive_answer
force_or_control_effect
```

### Transition Extension

```text
from_state
trigger
handoff_basis
to_state
failure_or_fallback_path
```

---

## 9. Stage-2 Routing：Planning Gap → Pattern Slot

Stage-2 不固定把 Movement / Technique / Transition 三类全部加载，也不按目录机械读取。

```text
Planning / Phrase Gap
├─ 缺路线、身法、高低位、重心、轴线、空间变化
│  → Movement Slot
├─ 缺具体攻击、防守、腿法、摔控、兵器动作
│  → Technique Slot
└─ 缺前后动作如何从当前 Contact / Range / Axis / Momentum 连续接上
   → Transition Slot
```

每个被命中的 Slot：

```text
1 个主 Pattern
+ 必要时 1 个辅助 Pattern
```

不是必须填满的配额。

对于 High / Expert Combat，如果连续多个关键 Phrase 都由 Upper-body Technique 主导，而 Movement 长期只是附属脚步说明，应视为 `Movement Knowledge Gap / Static Standing Combat Risk`，提高 Movement Slot 路由优先级。

这一机制是 **内部执行与兜底机制**，不是 Interactive 模式下替用户决定创作方向的第一选择。

---

## 10. Interactive：Fighting Direction / “怎么打”

确认增加一个 **条件暴露的高价值 Interactive Question**：

> **你希望这场战斗具体怎么打？**

### 10.1 与原“核心动作风格 / Choreography Profile”的关系

确认：**不再把“核心动作风格”与 Fighting Direction 作为两个独立 Interactive 节点。**

原先类似：

- 高手连续攻防型；
- 写实战术型；
- 重型硬派型；
- 凌厉电影动作型；

这些内容不再单独先问一轮，再继续问“怎么打”。其中真正影响动作内容的部分并入 Fighting Direction；其余如节奏、重量感、写实度、电影化程度，作为该 Fighting Direction 的执行属性或 Runtime 推导结果。

新的上游关系：

```text
Fighting Direction / 怎么打
→ 决定主要 Movement / Technique / Range / Physical Scale 倾向
→ 同时携带必要的 Rhythm / Realism / Impact 等执行属性
→ Character Identity 再解决双方如何在同一方向中形成差异
→ Camera Intent 决定观众如何观看这场打斗
```

避免 Interactive 连续询问：

```text
你要什么核心动作风格？
→ 你想怎么打？
```

这种语义高度重叠的问题。

### 10.2 暴露条件

```text
Fighting Direction already clear?
├─ yes → inherit, don't ask
└─ no
   └─ 不同打法会显著改变成片动作表现？
      ├─ no → silently infer baseline
      └─ yes → ask Fighting Direction
```

如果用户已经明确指定“咏春”“MMA”“现代杀手近身格斗”“轻功剑战”等，不重复询问。

### 10.3 职责边界

该问题只让用户决定 **打法方向 / Combat Execution Direction**，不要求用户设计具体动作链。

```text
Interactive
→ 用户决定“怎么打”

Runtime
→ 自动展开为 Movement + Technique + Transition
→ 保证连续性、动作可执行性、颗粒度分配和身体运动丰富度
```

用户选择某方向后，Stage-2 Gap Routing 仍负责内部选择和补齐具体 Pattern。

### 10.4 候选答案数量与质量

候选答案不能太少，也不能只是同义改写。

确认原则：

- **至少提供 5 个有实质差异的候选方向；**
- 正常推荐 **6–8 个**，复杂场景可到 **10 个**；
- 始终允许“自定义 / 直接描述打法”；
- 选项数量不是固定必须 8 个或 10 个，关键是覆盖当前场景中真正合理且能显著改变成片的打法空间；
- 每个选项必须说明其核心动作语言，例如 Range、Movement、Technique、Physical Scale、节奏或攻防特征；
- 不允许用“电影感强 / 更刺激 / 更帅”之类视觉形容词冒充 Fighting Direction；
- 推荐项必须基于用户已给场景、人物设定和 Combat Profile，而不是人口属性刻板映射。

例如现代办公室两名职业杀手，在用户未指定打法时，候选池可以动态覆盖：

1. **现代职业杀手近身格斗**：短打、截击、低线攻击、摔控、快速换位，现实高效；
2. **中国武术电影化近身格斗**：身法、步法、腿法、高低位、转身绕位更丰富，不以站立上肢控制为默认；
3. **综合格斗 / MMA 型**：拳肘膝腿与抱摔、笼边式压迫、站立和低位转换；
4. **硬派实战短打型**：动作短、重、直接，强调打断、失衡和环境碰撞；
5. **灵活身法与角度争夺型**：切线、绕侧、换轴、Level Change、进退路线变化占更高比重；
6. **摔控与反摔型**：进入、破平衡、摔投、失败反摔、重新起身与再进入；
7. **腿法与全身攻防型**：低线腿法、踢蹬扫与步法、上肢攻击相互串联；
8. **电影化混合动作型**：允许更强烈的 Movement、环境借力和 Signature Moment，但保持当前物理尺度；
9. **明确武术 / 格斗体系型**：用户可指定咏春、八极、泰拳、拳击、柔术等作为风格来源；
10. **自定义**：用户直接描述希望看到的打法。

实际询问时不应机械显示全部 10 个；应从当前场景筛出最合理的一组，保证 **5–10 个之间且互有明显差异**。

---

## 11. Regression：Upper-body Dominance / Static Standing Combat

确认新增明确质量判断。

对于 High / Expert Combat，如果连续多个关键 Phrase 都主要由上肢 Contact 主导，而 Movement 没有主动创造以下至少一种有意义变化：

- Level；
- Route / Angle；
- Axis；
- Range；
- Position；
- Support / Balance；
- Ground / Standing 或 Ground / Air 状态；

则应判定存在：

```text
Static Standing Combat
and/or
Upper-body Technique Dominance
```

这不是“每段必须踢腿 / 换位”的固定配额，而是检测 Movement 是否真正成为 Choreography Source。

Regression 关注结果：

> **人物是否还在原地主要依靠前臂、肩线、抓腕等上肢结构完成绝大多数关键交换。**

如果答案是“是”，即使 Prompt 中出现了“转髋、脚步、降低重心”等词，也不能自动判定通过。

---

## 12. Minimum Pattern Validation Set / 最小 Pattern 验证集

确认：实施前只建立一个**很小的验证集**，目的不是建设完整武术知识库，而是证明 Stage-2 + Pattern 结构是否真的能改变 G01 的动作分布。

### 12.1 验证集职责

最小验证集只回答三个问题：

1. Stage-2 是否真的能读取并使用 Pattern；
2. Fighting Direction 选定后，Runtime 是否能把它展开成不同的 Movement / Technique / Transition 组合；
3. 在不扩大完整 Library 的情况下，G01 是否已经明显减少 `前臂 / 肩线 / 抓腕` 主导和 Static Standing Combat。

### 12.2 规模原则

不预先做大型武术知识工程。每一类只准备**少量、互有明显差异、足以覆盖当前 G01 验证目标**的样例。

示意：

```text
Movement Samples
→ 外侧切入 / 绕侧换位
→ Level Change / 沉身进入
→ 轴线旋转 / 转身换侧
→ 支撑与重心改变

Technique Samples
→ 上肢短打
→ 低线腿法 / 踢蹬扫
→ 摔控 / 破平衡入口
→ 全身连接式攻击

Transition Samples
→ Contact → Movement Re-entry
→ High → Low → High
→ Strike → Control / Takedown
→ Failed Control → Angle Exit → Re-entry
```

这些只是验证类型，不是最终固定 Pattern 名单。

### 12.3 通过条件

在相同 G01、相同 High / Expert Combat 前提下，至少应观察到：

- Movement 不再只是“补一句脚步”，而会主动改变 Level / Route / Axis / Range / Position；
- Lower-body / Balance / Takedown 等身体手段至少能在合适 Fighting Direction 下真实进入动作链；
- Concrete Action 不再反复依赖 `前臂偏转 → 肩线封堵 → 抓腕 / 顶肩` 作为主要交换骨架；
- Action Phrase 仍保持 V2-49 的可执行因果，而不是为了多样化退化成“各种腿法 / 身法连续变化”；
- CK-17 的轻量颗粒度预算仍能给多个 Exchange 留空间。

如果最小集已经能显著改善，则证明架构方向有效，再按实际失败扩 Knowledge；如果最小集正确加载后仍失败，再进入 Knowledge Coverage Audit。

原则：

> **先用最小知识证明结构能工作，再决定知识库要扩多大。**

### 12.4 Two-Stage Implementation Gate / 两阶段实施门禁

确认实施与知识扩展分成两个阶段，不边开发边无限扩库：

```text
Phase 1｜Minimum Runtime Change
→ Interactive：Fighting Direction
→ 合并原“核心动作风格”重复交互
→ Stage-2 Gap-driven Routing
→ Minimum Pattern Validation Set
→ Lightweight Action Phrase Budget
→ Static Standing Combat / Upper-body Dominance Preflight

Phase 2｜Fixed G01 Prompt Regression
→ 验证 Fighting Direction 是否真实改变动作内容
→ 验证动作链数量没有因 Concrete Granularity 再次下降
→ 验证 Upper-body Dominance / Static Standing Combat 是否明显改善
```

只有 Phase 2 的核心 Gate 通过，才允许进入更大规模的 Knowledge Expansion。

核心 Gate：

1. **Fighting Direction Effective**：用户选择的“怎么打”必须真实映射到 Movement / Technique / Transition，而不是只换几个风格词；
2. **Choreography Richness Non-regression**：Concrete Granularity 提升后，15 秒动作链不能再次被 2–3 个超长 Phrase 吃满；
3. **Upper-body Dominance Improved**：关键 Exchange 不能仍主要依赖前臂 / 肩线 / 抓腕 / 顶肩等站立上肢结构，Movement 必须主动创造可见的 Level / Route / Axis / Range / Position 变化。

Gate 失败时优先定位失败层：

```text
Interactive 没给对方向
→ 修 Fighting Direction 候选 / 映射

方向正确但 Pattern 没被用到
→ 修 Stage-2 Routing / Selection

Pattern 正确加载但动作仍单一
→ 再进入 Knowledge Coverage Audit

动作丰富但 Phrase 过长、Exchange 变少
→ 修 CK-17 Granularity Distribution / Prompt Assembly
```

禁止在 Gate 尚未通过时直接扩大型武术知识库来掩盖 Routing / Prompt Assembly 问题。

原则：

> **先让最小 Runtime 改动在固定 G01 上证明有效，再扩知识覆盖。**

---

## 13. 当前已确认决策

| # | 决策 | 当前结论 |
|---|---|---|
| CK-01 | Granularity Distribution | 关键转折高颗粒度、普通交换中颗粒度、连接动作低颗粒度，避免细节吃掉动作链数量 |
| CK-02 | Knowledge Audit 顺序 | 先 Stage-2 Routing，再验证 Realization；正确加载后仍退化才扩 Knowledge |
| CK-03 | 下肢问题范围 | 不只补腿法；腿法需与 Range / Balance / Route / Axis / Entry 组合 |
| CK-04 | Movement Vocabulary | 身法、步法、步型、重心、高低位、Axis、路线、滚转起身等作为独立 Choreography Source |
| CK-05 | Knowledge 三分法 | Movement + Technique + Transition 构造 Concrete Action Phrase |
| CK-06 | Pattern vs 门派 | Pattern 是生产知识一级结构；门派 / 拳种作为来源、风格和检索标签 |
| CK-07 | Shared + Specialist | 共享基础 Pattern；Modern / Traditional Martial / Wuxia 做专项扩展 |
| CK-08 | Wuxia 扩展 | 同一架构支持轻功、腾空、空中攻防、环境借力与更高运动尺度 |
| CK-09 | Ground↔Air | Wuxia 显式支持 Ground → Air → Ground Transition |
| CK-10 | Pattern 职责 | Movement / Technique / Transition 分离、可组合，不建立万能大 Pattern |
| CK-11 | Schema | 共享小核心 Schema + 三类 Pattern 专项扩展字段 |
| CK-12 | Stage-2 Routing | `Planning Gap → Pattern Slot → 1 主 + 可选 1 辅`，作为内部执行与兜底机制 |
| CK-13 | Fighting Direction Interactive | 用户未明确且不同打法显著影响结果时，直接询问“怎么打”；用户决定方向，Runtime 负责具体展开 |
| CK-14 | Fighting Direction Options | 至少 5 个，正常 6–8 个、复杂可到 10 个；必须有实质动作差异并支持自定义 |
| CK-15 | Static Standing Combat Gate | High / Expert Combat 连续关键 Phrase 上肢主导且 Movement 未创造有效状态 / 空间变化时判定失败 |
| CK-16 | Fighting Direction 合并旧风格问法 | 原“核心动作风格 / Choreography Profile”不再作为独立 Interactive 问题；与“怎么打”合并为一个上游 Fighting Direction 节点，节奏 / 写实度 / 重量感等作为执行属性 |
| CK-17 | Lightweight Action Phrase Budget | 只定义何时详细、何时压缩；连续高颗粒度后普通 Exchange 主动降为中 / 低颗粒度；不使用固定动作数、字数、秒数或占比配额 |
| CK-18 | Minimum Pattern Validation Set | 实施前只准备少量 Movement / Technique / Transition 样例验证 Stage-2 是否真正打破 Upper-body Dominance；验证有效后才按失败扩 Knowledge |
| CK-19 | Two-Stage Implementation Gate | Phase 1 只做 Interactive + Stage-2 Routing + 最小 Pattern + 轻量颗粒度 / Preflight；Phase 2 固定 G01 回归，只有 Fighting Direction 生效、动作链数量不下降、Upper-body Dominance 明显改善后才允许更大 Knowledge Expansion |

---

## 14. Anti-overdesign 边界

当前明确禁止：

- 新增 Lower-body Engine；
- 新增 Body Method State Machine；
- 为每个拳种建立独立 Runtime 招式树；
- 建大型固定招式序列库；
- 把 Wuxia 另做平行 Combat Engine；
- 固定每段必须几次踢腿 / 换位 / 腾空；
- 固定 Stage-2 每次必须加载三槽；
- 在 Interactive 已经可以直接获得高价值 Fighting Direction 时，用复杂自动推断替代一句清晰用户问题；
- 把“候选答案 5–10 个”误解成固定凑数，产生同义选项；
- 将“核心动作风格”和“Fighting Direction”拆成两轮高度重复交互；
- 用固定动作数、字数、秒数或 Granularity 占比实现所谓“动作丰富度”；
- 在最小 Pattern 验证集尚未证明架构有效前，直接建设大型完整武术知识库；
- 在两阶段 Gate 未通过时，通过扩大 Knowledge 覆盖掩盖 Routing / Prompt Assembly / Granularity 问题。

原则：

> **能用一次高价值交互解决创作方向，就不要为同一件事堆自动推断；Runtime 复杂度应该用于把用户选择真正执行好。先用最小知识验证结构，再扩知识覆盖。**

---

## 15. 当前未决设计树

当前知识、交互和实施门禁设计已经基本收口。剩余需要 Grill Me 的关键问题主要是：

1. Regression 是否需要把本轮三个核心 Gate 直接写进现有 `docs/action-combat-video-v2-regression.md`，作为后续实现的正式验收真源；
2. 然后再形成对应 Implementation Plan 的具体文件级修改清单。

不再继续横向扩展新的武术知识分类，下一步优先完成验收真源与实施计划。