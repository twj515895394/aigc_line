# Action Combat Choreography Playbook

## 1. 职责

本文件是 `action-combat-video` Task 内的 **Combat Choreography Engine / 动作编排引擎**。

它负责把 Combat Intent 转成真正可执行、连续、全身化、有空间运动、有接触实感、有角色差异的战斗动作，并在输出前执行强制质量 Gate。

它不替代：

- `core-playbook.md` 的 Range / Advantage / Condition / Position / Continuity 真源；
- Modern / Wuxia 等专项 Playbook 的具体动作语言；
- Fighting / Martial / Weapon Libraries 与 Combat Choreography Pattern 的专业执行知识；
- 通用 Camera / Audio / Spatial Controls。

核心分工：

> **Core 负责“打得对、接得上”。**  
> **Choreography 负责“打得够、连续、丰富、好看、有实感，而且具体到能执行”。**  
> **专项 Playbook / Library / Pattern 负责“这种战斗具体怎么打”。**

实现原则：**少建运行时概念，多做高价值质量检查。** 本文件把真实成片反馈合并到少数执行合同中，不把每个 Failure Signature 都实现成独立子系统。

---

## 2. Combat Planning Graph + Planning Gate

Quick 与 Interactive 共用同一个下游 Choreography Engine；本 MVP 只改 Interactive 上游决策来源。

### Interactive MVP Planning Graph

```text
Combat Intent / 观看目标
→ Per-Character Combat System / System Refinement
→ Per-Character Combat Expression
→ Physical Presentation Domain（必要时条件暴露）
→ Combat Rhythm / Macro Tempo Strategy（必要时条件暴露；默认 Dynamic Wave）
→ Derived Choreography Direction（Runtime 自动派生）
→ legacy Fighting Direction execution slot（兼容下游，不再询问用户）
→ Active Combat Coverage
→ Contact Modality / Environment Affordance
→ Camera Intent
→ Model Combat Capability Input（如有）
→ Action / Camera Execution Budget
→ Signature Moment
→ Stage-2 Knowledge Gap Detection
→ Relevant Movement / Technique / Transition Pattern
→ Concrete Action Phrase / Battle Beat
→ Core State / Continuity Validation
→ Final Prompt Externalization
```

Quick Mode 暂保留 legacy Planning，等待本轮 Interactive 回归通过后再迁移。

### Planning Gate

进入具体 Phrase 设计前必须检查：

- Interactive Round 1 是否完成关键 Combatant 的 Combat System Selection 或 System Refinement；
- Interactive Round 2 是否完成关键 Combatant 的 Combat Expression Selection 或 Refinement；
- Character / Narrative Identity 是否被职业、性别、年龄、体型、外貌错误映射成 Combat System；
- Physical Presentation Domain 是否存在真正必须询问的高价值歧义；
- Combat Rhythm 若已作为高价值分叉暴露，是否已经 resolved；未暴露时是否使用 `Dynamic Wave + Adaptive by Combat State` 默认；
- Derived Choreography Direction 是否从角色级 System / Refinement / Expression、Rhythm 与场景状态派生，而不是重新覆盖用户确认；
- Coverage 等上游高影响决策是否已经足够执行；
- Interactive 是否把真正改变成片的分叉暴露给用户，而不是浪费问题在可自动推导的 Contact / Sufficiency / Camera 基础质量上；
- 目标战斗结果是否没有过早锁死整个编排路径；
- Stage-2 是否按当前 Planning / Phrase Gap 读取真正需要的 Movement / Technique / Transition Knowledge，而不是只形成高层风格标签。

Planning Gate 失败时先内部重排规划，不默认继续追问用户。用户明确要求“先实现 / 先测试 / 停止细化”时，不继续扩低价值流派细节。

---

## 3. Derived Choreography Direction / Choreography Execution Direction

Interactive 中旧 `Fighting Direction / 怎么打` 不再作为独立用户决策节点。

Runtime 自动综合：

```text
Per-Character Combat System
+ System Refinement
+ Per-Character Combat Expression
+ Physical Presentation Domain
+ Combat Rhythm / Macro Tempo Strategy
+ Scene / Range / Environment / Intent
→ Derived Choreography Direction
```

MVP 阶段把 `Derived Choreography Direction` 临时写入 legacy `Fighting Direction` execution slot，以继续使用现有 Stage-2 / Prompt Assembly / Camera 等下游规则。

Derived Choreography Direction 应至少影响：

- Movement 倾向：正面对线 / 侧切 / 绕位 / Level Change / Ground↔Air 等；
- Technique 倾向：Strike / Kick / Grapple / Throw / Weapon 等；
- Range / Level 倾向；
- Physical Scale：由独立 Physical Presentation Domain 约束；
- Rhythm / Realism / Impact / Contact 气质；
- Environment / Signature Moment 的合理方向。

例如“灵活身法与角度争夺”“拳摔压迫”“后发反制型连续换轴”可以成为派生执行方向，但不能重新包装成用户问卷。

职业身份不能直接生成“现代职业杀手短打”并覆盖真实 Combat System；太极、MMA、咏春、八极等 System 也不能自动决定 Modern / Wuxia Physical Domain。

具体稳定来源知识仍可由 `combat-choreography-profiles`、Fighting / Martial / Weapon Library 提供，但最终必须落实到动作构造，而不是只写标签。

---

## 4. 三个动作充分性维度

### 4.1 Active Combat Coverage

Coverage 回答“有多少时间真的在打”：

- Low：约 40–55%；
- Medium：约 60–75%；
- High：约 75–90%。

约 15 秒 High Coverage 高手 1v1 可参考：Setup 0.5–1.5s、Active Exchange 11–13s、真实 Downtime 累计尽量 ≤1–2s、纯 Ending Pose 约 0.5–1s。

受击、失衡、闪避、恢复、快速重新切入，只要仍推动下一次攻防，就属于 Active Combat。

### 4.2 Exchange Depth

Exchange Depth 回答“单次连续攻防有多深”：

```text
Defense → Counter → Re-counter → Continuation
```

衡量因果深度，不衡量动作词数量。高手高速交换通常更深；重型硬派可较浅但 Contact / Pressure 更重。

### 4.3 Combat Kinetic Scope

Kinetic Scope 回答“身体和空间到底动了多大、多丰富”。重点检查：

- Whole-body Engagement：脚步、膝髋、躯干、上肢、重心是否协同；
- Spatial Mobility：Position / Angle / Range / Route 是否有意义变化；
- Level / Axis Variation：高低位、身体轴线、方向关系是否按战斗形式合理变化；
- Contact-driven Displacement：接触是否推动身体、重心、站位或距离改变；
- Environment Flow：环境是在推动路线变化，还是把双方锁死在一点。

不设置“必须踢几次、跑几米、绕桌几圈”等固定配额。

> **Coverage 解决“打多久”；Depth 解决“攻防有多深”；Kinetic Scope 解决“身体和空间动多大”。三者互不替代。**

另外：

> **Combat Tempo 解决“正在打的时候多快、什么时候自然升降”。Tempo 也不等于 Coverage。**

---

## 5. Action Phrase：连续、具体、可执行的动作主单元

层级：

```text
Action–Reaction Pair → Action Phrase → Battle Beat → Combat Sequence
```

Phrase 可参考：

```text
Entry / Setup → Attack → Defensive Answer → Counter → Re-counter / Continuation → Payoff
```

但禁止固定六步模板。

核心判断：

> **后一个动作必须从前一个动作造成的身体、接触或空间状态里自然长出来。**

Phrase 结束不等于停战。多个 Phrase 可以无缝连接在一个 Battle Beat 内；Beat 只在战术目标、Advantage、关键 Condition、主目标或阶段真正变化时切换。

### 5.1 Executable Action Granularity Contract

承担主要战斗因果的 Action Phrase，必须尽量外显当前场景真正需要的可执行信息：

```text
Current Body / Range State
→ Specific Physical / Weapon Action
→ Contact / Evasion / Interception
→ Opponent Immediate Response
→ Footwork / Body Axis / Range / Position Consequence
→ Immediate Continuation Entry
```

这是**信息要求，不是固定六步模板**。Strike、Grapple、Weapon、Wuxia、多人战可以使用完全不同的动作结构。

关键问题是：视频模型是否能从文字中理解当前身体 / Range、具体动作、Contact / Evasion、即时响应、空间 / 轴线后果，以及下一动作为什么可以立刻继续。

### 5.2 Force / Impact Realization Contract

所有 **meaningful force-bearing contact** 必须至少满足：

```text
Concrete Contact
→ Readable Force Response
→ Combat State Consequence
```

关键 Impact 可按需外显 Force Delivery / Transfer、Local / Whole-body Reaction、Follow-through / Recoil / Deceleration、Recovery Burden 与 Post-impact Motion Carry-over；这些是可选信息维度，不是固定步骤，也不建立独立 Physics State。

Contact 之后必须能读出原有运动趋势如何被保留、传递、改向、截停、吸收或反弹，并让下一动作从新的 Body / Range / Support / Motion State 继续。除非真实动作或节奏明确要求停顿，否则不得默认 Neutral Reset。

Final Prompt 默认把必要 Force Causality 融合进现有 Action Phrase，不新增固定 Impact 段；Camera / Audio / Timing 只能强化真实 Contact，不得替代它。

> **Impact Semantics Internalized, Force Causality Serialized.**  
> **Contact changes motion; it does not automatically terminate motion.**

### 5.3 Movement + Technique + Transition 构造

当 Stage-2 需要具体执行知识时，优先使用三类互补 Pattern：

```text
Movement Pattern
→ 身体怎样换位、换轴、换高度、换支撑、改变 Route / Range / Position

Technique Pattern
→ 具体攻击、防守、腿法、摔控、兵器动作

Transition Pattern
→ 前一个 Contact / Range / Axis / Momentum 状态为什么能合法进入下一动作
```

不是每个 Phrase 必须三类全有，也不允许把三类机械拼接成固定 Combo。最终仍要结合当前 State 与 Opponent Response 重写成一个连续 Phrase。

Movement 不能退化为“给上肢动作补一句脚步”；如果它真正参与 Choreography，应该主动改变至少一类 Level / Route / Axis / Range / Position / Support / Balance / Ground-State。

### 5.4 Beat 可读招式集合

15 秒高密度 Combat 把 Active Exchange 收成 **3–4 个 Beat**，每个 Beat 内部仍是连续动作链。

每个主 Beat 必须能回答：

```text
本段只允许哪些可见招式 / 行动
→ 至少一个具体接触点与受力方向
→ 对手如何立即响应
→ 本段禁止哪种不可读失败
```

例如：本段只出现低扫、胫骨格挡、摆拳闪避、身体拳和膝击封挡；禁止无法辨认的连续乱拳。最后高潮可以锁成三连击，每击都可读。

这是可读性合同，不是固定套路库。不要求每场使用同一套招，也不把 15 秒扩成 30 秒六段。

角色卡里的打法特长必须在多个 Beat 里反复以可见动作出现，不能只在开头写一次。

### 5.5 抽象动作词只能做摘要，不能替代关键动作

以下表达可以用于 Derived Choreography Direction / Rhythm 摘要、次要过渡或局部压缩，但不能单独承担关键 Active Exchange：

- 连续攻击；
- 连续格挡；
- 快速反制；
- 贴身缠斗；
- 持续压迫；
- 不断换位；
- 连续拆招；
- 高频攻防；
- 双方持续互有来回。

如果删除“高速 / 连续 / 专业 / 高密度 / 反制 / 缠斗”等抽象词后，仍无法说清人物具体做了什么，这个 Phrase 颗粒度不足。

### 5.6 细化不等于新增大主事件

禁止把“写细”误实现成：

- 把同一动作拆成互不相关的新主事件；
- 在 15 秒里再塞入另一场完整戏。

同一招的接触点、头发、光影、镜头、尘土可以写细。通用过载判定见 `prompt-assembly/control.md` 2.0：画面维度写细不是过载。

### 5.7 Lightweight Granularity Distribution

High / Medium / Low 只标记哪些是主转折，**不授权压缩普通动作的画面维度。**

普通 Exchange 和连接动作同样可以写清身体、光影和镜头。若独立主转折多到指定时长装不下，提醒用户，不靠削描述过关。

---

## 6. Temporal Flow Contract：解决“一招一停”

### 6.1 Temporal Action Packing

Active Exchange 时间窗不能用 3–4 秒只承载一个宏动作来假装高速。

优先组织为：

```text
当前动作产生后果
→ 对手立即响应
→ 响应改变 Contact / Position / Range / Axis
→ 下一动作从这个后果直接启动
→ 局部 Payoff
```

使用“同时、顺势、刚被偏开便、尚未站稳时、接触后立即、沿前一动作方向”等因果时间关系；不要主要靠“然后、随后、再做一个”串独立动作。

### 6.2 Combat Action Interlock / Motion Handoff

连续动作至少应继承一类当前状态：Contact、Reaction、Momentum、Footwork、Body Axis、Range / Position、Environment State。

若前一动作形成 meaningful force-bearing contact，下一动作必须继承其 Post-impact Motion / Body / Range / Support consequence；不得把 Contact 默认解释成 Neutral Reset。Force / Impact 的长期语义真源见 `5.2 Force / Impact Realization Contract`。

High Coverage / Expert Exchange 中，Neutral Reset 应是稀缺、有意图的节奏事件；禁止默认模式：

```text
攻击 → 完整收势 → 双方站稳 → 重新起架 → 下一攻击
```

Phrase-to-Phrase 同样优先使用前一 Payoff 直接启动下一 Phrase。

### 6.3 Continuous Action Spine + Soft Time Anchors

高密度 Combat 的默认 Final Prompt 时间表达：**一条 Continuous Action Spine + 少量 Soft Time Anchors**，锁在 **15 秒** 内。

大部分 Active Exchange 连续书写；时间主要定位 Setup / First Contact、Major Advantage Reversal、Signature Moment、Ending。图生 / 一镜到底时允许把这四个锚点写成 Beat 标题，但 Beat 内部不中断，Beat 之间不 Reset。

默认不把 15 秒拆成每 1–2 秒一个硬动作盒，也不把方案写成 20–30 秒。若模型明确更依赖严格时间戳，也必须保持跨块 Motion Handoff。

> **时间码服从动作连续性，而不是动作服从时间码。**
> **15 秒写细，不靠加长片长装细节。**

---

## 7. Combat Character Identity / System / Expression

Interactive MVP 中角色层至少区分：

```text
Character / Narrative Identity
+ Combat System / Technique Backbone
+ System Refinement
+ Combat Expression
+ Current State
→ 可见角色打法
```

- Character / Narrative Identity 回答“这个人是谁”；
- Combat System 回答“主要会什么体系”；
- System Refinement 回答“这套体系主要怎么用”；
- Combat Expression 回答“这个人以什么气质和战斗决策倾向使用它”。

Combat Expression 可以影响主动压迫、诱导、后发反制、风险偏好、抢主动与再进入倾向，但不能直接定义固定 Combo。

> **职业 ≠ Combat System ≠ Combat Expression ≠ Fighting Profile。**

角色差异不应只写成“女方快、男方重”这类形容词，而应进入具体动作选择、状态改变与主动权获取方式。

每个关键角色允许 `1 Primary System + 0~1 Secondary System`。像 MMA 这种完整混合体系可作为 Primary；体系内部拳摔 / Wrestling / 站立偏向属于 Refinement，真正跨体系才进入 Secondary。

---

## 8. Tactical Interaction + Visible Advantage + Initiative

Tactical Interaction 是 Phrase 内可选战术因果，可使用 Feint、Probe & Read、Bait、Anticipation、Counter-to-Counter、Pattern Break、Forced Response 等机制。

最终 Prompt 必须外显为可见动作与时机，禁止只写“她提前预判”。

### 8.1 Visible Advantage Dynamics

`Advantage` 由 Core State Engine 维护，但主要 Advantage 变化必须通过可见控制事实表现，例如 Attack Initiative、Forced Defense、Range / Angle / Axis Control、Route / Position Control、Environment Control、Recovery Burden。

Major Advantage Reversal 必须真实改变至少一类控制关系，并由后续 Phrase 继承，而不是一句“局势逆转”。

### 8.2 Initiative Handoff 必须进入动作句法

在高手 Counter / Re-counter 中，主动权应优先在动作执行过程中转移，而不是一方做完整段动作后“轮到”另一方。

可通过 Interception、Forced Response、Line / Range / Axis Control、Contact Handoff、Recovery Window 等发生转移。

优先发生在：对方攻击尚未收势、前一个 Contact 仍未断开、脚步尚未落稳、肩 / 髋轴线尚未回正、偏转打开新线路、失衡 / 恢复尚未完成等窗口。

不要只写“双方不断反制 / 主动权来回切换”。

---

## 9. Combat Rhythm / Intensity Curve

Continuous Spine 不等于全程同速，也不等于全程同强度。

### 9.1 两层 Rhythm Model

Combat Rhythm 使用两层结构：

```text
Macro Rhythm Strategy
→ 决定整场导演层节奏倾向

Adaptive by Combat State
→ 决定当前 Exchange 的 Local Tempo
```

默认：

```text
Macro Rhythm Strategy = Dynamic Wave
Tempo Adaptation = Adaptive by Combat State
```

除非用户明确要求固定节拍 / 严格时间比例，否则 **Macro Strategy 不是硬曲线**，不能为了“按曲线走”而覆盖正在发生的身体状态。

### 9.2 Macro Rhythm Strategy

Interactive 可使用以下高价值 Macro Strategy：

- `Dynamic Wave`：中速 → 高速 → 压力型降速 → 再爆发；默认推荐；
- `Sustained High Pressure`：大部分时间高密度，但仍允许极短 Recovery Window；
- `Escalation`：克制 / 中速 → 加速 → 高密度 Peak；
- `Burst → Pressure → Burst`：高速碰撞 → 慢速高压贴身控制 → 再爆发；
- `Impact Drop → Recovery → Rebuild`：高速 → 重击 / 摔倒 / 撞墙 → 明显降速恢复 → 再带起节奏；
- `Attrition / Fatigue Curve`：前段更快，伤势 / 体能 / 呼吸负担累积后整体下降，只保留短促爆发；
- `Tactical Pulse`：高速 Exchange 与很短的判断 / 绕位 / 呼吸 / 再进入交替；
- `Asymmetric Tempo`：Local Tempo 跟随谁掌握 Initiative / Advantage / Range 而变化；
- `Custom`：用户自定义阶段顺序或 High / Medium / Low 软比例。

百分比只作为分布偏好，不自动换算成固定秒数、固定动作数或固定阶段长度。

### 9.3 Adaptive by Combat State（默认开启）

Local Tempo 由当前真实战斗状态决定：

```text
Macro Rhythm Strategy
+ Current Range / Contact
+ Initiative / Advantage
+ Heavy Impact / Pain Reaction
+ Knockdown / Throw / Wall Impact
+ Loss of Balance / Recovery Burden
+ Clinch / Grappling Compression
+ Breath / Fatigue Accumulation
+ Separation / Reassessment
+ Environment Shock
→ Local Tempo
```

典型合法变化：

```text
高速 Striking
→ 进入 Clinch / Grappling
→ Tempo ↓
→ Pressure / Intensity 可以继续 HIGH
```

```text
高速交换
→ 一方被重击 / 踢飞 / 摔倒 / 撞墙
→ 呼吸被打断、疼痛反应、撑地 / 扶墙、重新找支撑
→ Tempo 明显下降
→ 恢复威胁与支撑后逐步 Rebuild
→ 再次加速进入
```

这类降速不是失败，而是把 Contact 的真实代价变成节奏。

### 9.4 Recovery Burden ≠ Neutral Reset

角色不能像不会疼、不会喘、不会累一样，在每次重击后立刻满速恢复；但也不能把恢复写成双方停战。

受创后的 Recovery Window 优先外显：

- 疼痛 / 保护性身体反应；
- 呼吸被打乱、短促换气；
- 眨眼、咬牙、短暂视线恢复；
- 撑地 / 扶墙 / 补步 / 调整支撑；
- 对手仍在逼近、封路、观察、控制空间或准备再进入。

只要这些状态仍直接推动下一次攻防，就继续计入 Active Combat Coverage。

禁止默认：

```text
重击
→ 双方一起停下休息
→ 完全恢复默认姿态
→ 再重新起架开打
```

### 9.5 Tempo ≠ Intensity ≠ Camera Pace

Combat Intensity 由 Exchange Frequency、Contact Weight / Pressure、Advantage Pressure、Kinetic Scope、Exchange Depth / Tactical Complexity、Environment Stakes、Camera / Audio Accent 等共同形成。

因此：

```text
Tempo ↓
不代表
Intensity ↓
```

Clinch / Grappling / Wall Pressure 可以是：

```text
Tempo = LOW / MID
Pressure = HIGH
Intensity = HIGH
```

同时：

```text
Combat Tempo
≠ Camera Cut Frequency
```

人物高速对打可以由连续 Tracking / Medium Shot 承担；人物重击后局部降速也可以出现快速 Reaction Cut。Camera 只服从自己的 Viewer Task / Handoff 规则，不机械同步人物速度。

### 9.6 Intensity Turning Point

约 15 秒电影化高手 1v1 默认至少应有一次清楚的 Intensity / Tempo Turning Point，但禁止固定“低→中→高”。Turning Point 应由真实 Action State、Advantage、Impact、Range 或 Recovery 产生，而不是为了曲线好看硬插停顿。

---

## 10. Environment Action Affordance

环境必须先作为战术 / 空间机会参与：

```text
对象 / 空间结构 / 障碍
→ Affordance
→ Intent / Identity / State 过滤
→ Action Phrase
→ 更新 Position / Range / Advantage / Environment State
```

只有当环境真正改变攻击路线、移动路线、Range、Advantage、战术选择或 Payoff 时才使用。禁止为“丰富”随机破坏多个物件。

Environment 应尽量推动 fight-space 流动，而不是把人物永久锁在桌边 / 墙边做上半身交互。

---

## 11. Combat Contact Solidity

Force / Impact 的长期生成语义真源见 `5.2 Force / Impact Realization Contract`。本节只补充不同 Contact Modality 的证据差异：Strike、Grapple / Control、Takedown / Throw、Blunt Weapon、Blade、Weapon Clash、Environment Impact 必须使用与自身机制一致的 Contact / Response / Consequence，而不能全部退化成同一种“受到强烈冲击 → 后退”。

Camera / Audio 只能强化，不能替代真实接触、受力与后果。

---

## 12. Signature Moment

约 15 秒短片默认追求 1 个主要 Signature Moment；必要时可有 1 个辅助记忆点。

来源可以是 Counter/Re-counter 高潮、环境反制、力量差异 Payoff、Weapon Distance Transition、假破绽、动量重定向、优势翻转、明显空间 / 身体轴线变化。

Signature Moment 必须由前后 Phrase 因果“挣来”，不是随机炫技，也不等于慢动作。

---

## 13. Combat Camera：Readability + Mobility + Coverage

必须区分 Camera Complexity、Camera Mobility、Shot Scale / Editorial Coverage。

> **Stable Camera ≠ Static Camera.**  
> **Action Continuity ≠ Shot Continuity.**

高动作 / 空间复杂度时可以降低无必要 Camera Complexity，但不能把它错误执行成 Camera 长时间不动、全程中全景 / 中景、只能 tracking / dolly、禁止 Close-up / Insert / Reaction / Impact Shot，或 Continuous Action Spine = one-take。

跨镜 Cut 必须尽量继承 Position / Left-Right、Action Direction、Contact、Momentum、Body / Weapon Axis、Range、Initiative / Advantage Consequence。

Camera 具体镜头语言继续由通用 `camera-direction` Control 提供。

---

## 14. Combat Audio Choreography

Audio 作为动作因果、Contact、身体状态和空间变化的可听证据。

> **Audio Accent Density ≠ Action Density。**

基础动作 / 环境声音维持连续存在感；关键 Contact、Phrase Payoff、Signature Moment 再获得更高 Accent。Audio 不能替动作表演。

---

## 15. Action Execution Budget

不设置 Battle Beat 全局固定动作数量上限，也不因为 Prompt 变长就自动压缩画面维度。

真正要管的是**指定时长里有多少件独立主事件**。同一动作链的身体、光影、镜头、声音写细，不算超预算。

独立主事件过多时，按通用规则提醒用户加时长或拆段，不静默删攻防，也不把细节压糊。

禁止用“15 秒必须 N 个动作 / 每 Phrase N 字 / 每 Exchange N 秒”等固定配额解决 Richness。

---

## 16. Two-stage On-demand Loading

### Stage 1：Planning

```text
action-combat-video/index
+ core-playbook
+ choreography-playbook
+ 当前一个专项 Playbook
+ 必要轻量 indexes
+ 可选 Model Capability 摘要
→ Combat Planning Context
```

Interactive Planning Context 至少保留：角色级 Combat System / Refinement / Expression、Physical Presentation Domain、Combat Rhythm / Macro Tempo Strategy、`Adaptive by Combat State` 默认与 Derived Choreography Direction。legacy Fighting Direction 只作为兼容执行槽。

不要在正常运行加载维护文档、研究档案或未命中的叶子知识。

### Stage 2：Execution Knowledge — Gap-driven

Stage-2 不再固定使用 Technique / Enhancement 两个 Slot。先判断当前 Planning / Phrase 真正缺什么：

```text
Movement Gap
→ 路线 / 身法 / 高低位 / 重心 / Axis / Position / Support / Balance

Technique Gap
→ 具体攻击 / 防守 / 腿法 / 摔控 / 兵器动作

Transition Gap
→ Contact / Range / Axis / Momentum 如何进入下一动作
```

每个命中 Slot 使用：

```text
1 个主 Pattern
+ 必要时 1 个辅助 Pattern
```

不是固定配额，不要求三槽全读。

当前最小验证知识源：

`references/libraries/combat-choreography-patterns/minimum-validation-set.md`

现有 Fighting / Martial / Weapon Profile 仍可作为 Technique Detail、source/style evidence 或用户明确体系的专业知识来源。

#### Movement 缺席风险

High / Expert Combat 如果连续多个关键 Phrase 主要由 Upper-body Technique 主导，而 Movement 只剩附属脚步说明，则视为：

`Movement Knowledge Gap / Static Standing Combat Risk`

此时提高 Movement Slot 路由优先级，但不使用固定腿法 / 换位配额。

Stage-2 读取之后必须进入：

```text
Relevant Pattern Detail
→ Movement / Technique / Transition 按当前状态组合
→ Concrete Action Phrase
→ State / Continuity Validation
→ Prompt Assembly
```

如果 Routing 正确、Pattern 实际读取、Derived Choreography Direction 已兑现、Granularity 正确、Assembly 保真、Preflight 有效，但相同 Golden Scenario 仍持续动作贫乏 / 上肢主导，才进入更大的 Concrete Choreography Knowledge Coverage Audit。

> **Indexes are routing knowledge; leaf files are execution knowledge.**  
> **按缺口补知识，而不是按目录读知识。**

---

## 17. State Machine Internalized, Choreography Externalized

内部可以完整运行 Range、Advantage、Condition、Tactical、Contact、Kinetic / Camera / Execution Budget 等结构。

Final Prompt 必须转成：

```text
当前身体 / Range 状态
→ 谁用哪个身体部位 / 武器线路移动或攻击
→ 对手如何在动作过程中响应
→ Contact / Evasion / Interception 如何发生
→ Footwork / Axis / Range / Position 如何改变
→ 下一动作怎样从当前状态直接启动
```

优先级：正向可见 Action Flow → 空间 / 环境变化 → 速度 / 重量 / Character Identity / Intensity / Signature → Camera / Audio → 少量真正必要的 Continuity / Negative Constraints。

禁止默认长 Avoid List；禁止自行添加用户没有要求、剧情没有依据的限制。

---

## 18. Ending Coverage Protection

Ending 的**结果意图**可以由用户决定；Ending 占用多少时间、是否吞掉 Active Exchange 属于系统内部 Coverage / Assembly / Preflight 职责。

High Coverage 短 Combat 默认继承最后一次 Contact / Position / Momentum / Advantage 后果；不提前让双方回到新 Pose 再长时间对视；不让呼吸、眼神、静止构图自动占用最后数秒；默认不淡出、不定格、不突然黑屏。

纯 Ending Pose 参考约 0.5–1s，属于软预算，不是硬配额。用户明确要求长悬停、慢镜、情绪 Ending 时可以扩大。

---

## 19. Combat Final Preflight Gate

Final Prompt 输出前必须过 Gate；失败时内部重写，再检查，不能直接交付。

### A. Action Sufficiency

- Coverage 是否兑现；
- Exchange Depth 是否符合目标；
- 是否存在大量无价值 Downtime / Pose / Control Hold；
- Ending 是否过早吞掉 Active Exchange。

### B. Executable Action Granularity

- 关键数秒是否主要由抽象动作词承担；
- 角色 System / Refinement / Expression 是否只有标签，没有具体动作 / Initiative 证据；
- Action Phrase 是否能看出具体动作入口、即时响应、Footwork / Axis / Range / Position 后果和下一动作入口；
- 是否把光影 / 镜头写细误判为失败。

触发失败：**Abstract Action Block / Non-executable Choreography Summary**。

### C. Kinetic Scope + Static Standing Combat

检查两层：

1. 是否主要锁在前臂 / 手腕 / 肩部，Whole-body / Position / Range / Axis 不足；
2. High / Expert Combat 中，是否连续多个关键 Phrase 主要由上肢 Contact 主导，而 Movement 没有主动创造 Level / Route / Axis / Range / Position / Support / Balance / Ground-State 变化。

即使 Prompt 出现“转髋 / 脚步 / 降低重心”等词，如果这些只服务上肢控制、没有改变战斗空间或下一动作入口，也不能判通过。

### D. Temporal Continuity + Choreography Richness Preservation

- 长时间窗是否只有一个宏动作；
- 动作是否通过 Motion Handoff 咬合；
- Neutral Reset 是否过多；
- 是否使用 Continuous Action Spine，而不是硬时间盒把战斗切碎，或把 15 秒写成 30 秒计划；
- 每个主 Beat 是否有可见招式集合，而不是不可读乱拳；
- 是否为了增加数量又退回抽象动作块。
- 独立主事件是否多到 15 秒装不下，却没有提醒用户。

失败时优先检查是主事件过载还是动作不具体；不使用固定动作数量配额，也不靠压缩画面维度过关。

### E. Character Decision Realization / Derived Direction

检查：

- 用户确认的 Primary / Secondary Combat System 是否真实可见；
- System Refinement 是否真实改变 Technique / Entry / Range / State-change 逻辑；
- Combat Expression 是否影响主动 / 反制、节奏和再进入方式，但没有取代 Technique；
- Character / Narrative Identity 是否没有偷偷重写 Combat System；
- Combat Rhythm / Macro Tempo Strategy 是否真实影响节奏组织，但没有覆盖当前 Combat State 的合理局部调速；
- Derived Choreography Direction 是否真实体现角色级输入，而不是只写顶部标签；
- legacy Fighting Direction execution slot 是否只承担兼容执行，没有重新成为用户创作真源。

未兑现时 FAIL，并回到角色上下文合成 / Pattern Selection / Concrete Phrase 重写；不重新向用户询问已经确认的同一决策。

### F. Character / Tactical / Advantage / Initiative

- Character Identity 是否能从动作看出来；
- Tactical Interaction 是否外显；
- 是否只是双方轮流完成独立攻击段；
- Counter / Re-counter 是否在对手动作尚未完成时抢走 Initiative；
- Major Advantage Reversal 是否有可见控制权变化；
- 双方抢主动方式是否长期同质化。

### G. Contact / Rhythm / Intensity

- 重要 Contact 是否有 Transfer → Reaction → Consequence；
- 连续 Combat 是否存在可感知的速度 / 强度变化，而不是全程同速 / 同重量 / 同压力；
- 重击、踢飞、摔倒、撞墙后是否存在合理 Recovery Burden，而不是立刻满速恢复；
- Clinch / Grappling 是否允许 `Tempo ↓ but Pressure / Intensity remains HIGH`；
- 疼痛、喘息、疲劳是否作为局部节奏状态参与下一动作，而不是被完全忽略；
- Recovery 是否保持威胁与 Continuation，没有退化成 Neutral Reset；
- Camera Cut Frequency 是否没有被错误绑定到 Combat Tempo。

### H. Camera Coverage

- Kinetic Scope 明显变化时，Camera 是否有足够 Mobility / Reframe；
- `stable / readable` 是否被错误写成长期近似 fixed framing；
- 是否把 Continuous Action Spine 误解为 one-take / 不能 Cut；
- 是否全程几乎只有中全景 / 中景；
- Cut 后 Position / Direction / Contact / Momentum / Axis / Range 是否连续；
- 局部 Shot 后是否在需要时 Re-establish。

### I. Prompt Externalization

- Final Prompt 是否由具体 Action Language 主导；
- Pattern 具体化与 Concrete Choreography 是否被重新压缩成 Meta 摘要；
- 是否 Dump 内部 State / Meta；
- Negative Constraints 是否少而有针对性。

### Gate Failure 行为

```text
定位失败维度
→ 优先重写角色上下文合成 / Pattern Selection / Concrete Action Phrase / Action Spine / Camera Coverage / Prompt Assembly
→ 必要时重新分配执行预算
→ 再次 Preflight
→ 通过后才交付
```

> **规则存在不等于规则生效；Final Preflight 拥有否决权。**

---

## 20. 边界与最终原则

- Core 是 State / Continuity 真源；
- Character / Narrative Identity、Combat System / Refinement、Combat Expression 必须分层；
- Combat Rhythm / Macro Tempo Strategy 是导演层意图；Local Tempo 默认由 `Adaptive by Combat State` 决定；
- Derived Choreography Direction 是 Runtime 派生结果，不是 Interactive 独立用户问题；
- legacy Fighting Direction 只作为 MVP 兼容执行槽；
- Modern / Wuxia 当前继续提供具体表现与物理尺度知识，但不得由单一 Combat System 或职业身份自动决定；
- Fighting / Martial / Weapon Libraries 与 Pattern Set 提供专业可组合执行知识；
- Controls 提供通用 Camera / Motion / Spatial / Audio / Prompt Assembly；
- Model Adapter 只改变执行路径与序列化，不改导演意图。

最终原则：

> **动作要足够多，但不是独立动词堆叠。**  
> **关键因果动作要具体；同一镜头的光影、镜头、材质可以写细。**  
> **过载只看独立主事件是否超出指定时长，不看描述细不细。**  
> **身体本身就在打，Movement 不是给上肢动作补脚步说明。**  
> **连续打斗不是动作排得更近，而是后一个动作从前一个动作的身体与空间状态里长出来。**  
> **Initiative 要在动作链里被抢走，不是在“你的回合结束后”轮到下一方。**  
> **Macro Rhythm 决定整场倾向，Combat State 决定局部快慢；疼痛、抱控、摔倒、喘息、疲劳都可以真实改变节奏。**  
> **镜头可以稳定，也可以切；Action Continuity ≠ Shot Continuity。**  
> **Ending 服从 Coverage，不让静止收尾吞掉有效交战。**  
> **状态机留在内部，最终 Prompt 交付一条真正连续、具体、可见、可执行的动作主链。**