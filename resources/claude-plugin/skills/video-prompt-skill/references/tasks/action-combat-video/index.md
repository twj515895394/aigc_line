# Action Combat Video Task Router

## 1. 何时进入本任务

当用户的主要目标是生成或设计**动作格斗 / 武术 / 武侠战斗视频 Prompt**，且成败高度依赖持续攻防、动作因果、距离变化、空间站位、受力反馈、多人目标切换、兵器连续性或动作导演质量时，读取本任务。

典型信号：

- 近身格斗、拳脚、摔投、缠斗、制服；
- 1v1 / 1vN 动作戏；
- 武术、武侠、刀剑枪棍交锋；
- 用户明确要求动作连续、高手对决、拳拳到肉、兵器轨迹、长镜头打斗；
- 普通 `text-to-video` / `image-to-video` 已不足以表达 Combat State + Choreography 双重要求。

本任务是执行差异明显的专项工作流，不只是题材标签。

---

## 2. 不进入本任务的情况

- 只有一个简单挥拳、跑动或体育动作：继续使用原主任务 + `action-motion`；
- 用户主要提供故事板并要求管理整部多镜头片段：主任务仍可为 `storyboard-and-multi-shot-video`，Combat 作为专项编排知识按需引用；
- 用户主要要求视频局部编辑 / 延长：主任务仍由对应编辑 / 延长 Playbook 决定；
- 枪战：当前没有正式 Gunfight 专项 Playbook，除非后续扩展，否则只复用可迁移的 Combat Core / Choreography 原则，不伪装成已完整支持分支。

---

## 3. Combat 运行结构

进入本任务后，运行时骨架固定为：

```text
core-playbook.md
+ choreography-playbook.md
+ advantage-structure-contract.md
+ 1 个当前专项 Playbook
+ Planning Gate
+ Stage-2 Pattern Hit Evidence Gate
+ Persistent Combat Signature Contract（存在明确 Character / Technique Identity 时必经）
+ subject-motion/control.md（短时 High Kinetic / Whole-body 条件命中时必经）
+ 按缺口选择的其余少量 Controls
+ 按需展开的少量 Library Detail
+ action-camera-handoff-playbook.md（Camera 允许 Cut / Reframe / 景别变化时必经；one-take 仍用于 Movement/Reframe Handoff）
+ 可选 Model Adapter
+ prompt-assembly/control.md（Combat 必经）
+ Combat Final Preflight（必经）
+ Prompt QA / Self-Repair Gate（必经）
+ 当前输出模板 / Model Serialization
```

`advantage-structure-contract.md` 属于 Action Combat 主 Task 固定 Reference，不占普通 Controls / Libraries 预算。它是 `Outcome / Counterplay Shape / Advantage Trajectory / Ending Exposure` 的运行期正文真源。

其中 `prompt-assembly/control.md` 在普通任务中仍可按需读取；**一旦进入 Action Combat，则不占普通 `0-3 Controls` 可选预算，必须在最终交付前读取并执行。**

当 Combat Camera 允许 Cut、明显景别变化、Impact / Insert / Re-establish 或动态 Reframe 时，必须读取并执行：

`action-camera-handoff-playbook.md`

如果用户明确要求严格 one-take，也不需要 Editorial Cut，但仍应使用该文件的 Motion / Energy Carry-over 与 Action-triggered Camera Movement / Reframe 规则。

### `core-playbook.md`

负责 Combat State / Continuity / Battle Runtime Skeleton：Combat Intent、Spatial Map、Range / Advantage / Condition、Turning Event、Target Handoff、Beat State Contract、Position / Environment / Weapon State 与连续性验证。

### `choreography-playbook.md`

负责 Combat Choreography Engine：Derived Choreography Direction / legacy Fighting Direction 执行槽、Active Combat Coverage、Rhythm、Action Phrase、Executable Granularity、Exchange Depth、Character Identity、Tactical Interaction、Environment Affordance、Contact Solidity、Signature Moment、Action Sufficiency / Execution Budget、Kinetic / Temporal / Motion Continuity、Camera Readability / Mobility / Coverage、Combat Audio、Ending Coverage Protection 与 Final Preflight Criteria。

### `advantage-structure-contract.md`

负责把用户级优势语义映射到现有 Core / Choreography，而不另建第二套状态机：

```text
Outcome / Advantage
+ Counterplay Shape
+ Advantage Trajectory
→ Core Advantage State / Turning Event
→ Choreography Initiative / Counterplay Realization
→ Final Prompt Visible Advantage
```

其核心约束：

> **Advantage ≠ Attack Share。**  
> **Outcome ≠ Advantage Trajectory。**  
> **Disadvantaged ≠ Passive。**

当用户选择中 / 高 Counterplay 时，不能用“等待 / 准备 / 即将反扑”替代真实 Attack / Counter / Re-entry。

### `action-camera-handoff-playbook.md`

负责 Stage-2 Pattern Hit Evidence、Motion / Energy Carry-over 与 Action ↔ Camera Bridge：关键 Cut / Reframe 为什么发生、Shot 如何从仍在发生的 Motion / Contact / Pressure / Recovery 中进入，以及 Camera 如何随 Fight-space / Initiative / Level / Support 的真实变化组织 Coverage。

> **Core 负责“打得对、接得上”；Choreography 负责“打得够、连续、丰富、具体、好看、有实感”；Advantage Structure 负责“谁占优不等于谁独占攻击权，以及主动权怎样流动”；角色级 Combat System / Refinement / Expression 负责上游角色差异；Persistent Combat Signature 负责“已确认打法差异不能打一半就消失”；Subject Motion 负责在 High Kinetic 条件下把重心、支撑、惯性、受力与 Whole-body Driver 真正落实；Action–Camera Handoff 负责“动作怎样自然交给镜头、镜头怎样继续同一个动作”；Prompt Assembly 负责“把内部具体设计原样保真地序列化成模型可执行的最终 Prompt”。**

---

## 4. 专项分支路由

Core + Choreography + Advantage Structure 之后只选择一个主要专项 Playbook。

### 现代格斗

读取：`modern-combat-playbook.md`

### 电影武侠

读取：`cinematic-wuxia-playbook.md`

MVP 期间这两个分支继续作为 legacy specialist 路由使用，但必须遵守：

> **Physical Presentation Domain 与 Combat System 正交。太极不自动等于 Wuxia，MMA 不自动等于 Modern。**

专项 Playbook 提供当前物理 / 电影表现域下的动作语言与尺度知识，不得把人物职业或单一体系名称反向当作 Branch 的唯一决定因素。

---

## 5. Two-stage On-demand Loading

Combat V2 使用：

> **Plan First, Load Detail Second / 先规划，再加载详情。**

### Stage 1：Planning

使用：

```text
Task Router
+ Core
+ Choreography
+ Advantage Structure Contract
+ 当前专项 Playbook
+ 必要轻量 Index
+ 可选 Model Capability 摘要
→ Combat Planning Context
→ Planning Gate
```

Interactive MVP 的 Planning Context 优先保留：

- Per-Character Primary Combat System；
- Optional Secondary Combat System；
- Per-Character System Refinement；
- Per-Character Combat Expression；
- Physical Presentation Domain；
- **Advantage Structure：Outcome / Counterplay Shape / Advantage Trajectory；**
- **Derived Choreography Direction**；
- Coverage；
- Rhythm / Realism / Impact 等执行属性；
- **用户已确认的 Technique Identity / Persistent Combat Signature；**
- Contact Modality；
- Environment Importance；
- Signature Moment Need；
- Camera / Model 风险。

`Fighting Direction` 在 Interactive MVP 中只保留为 legacy execution slot，由 `Derived Choreography Direction` 写入，不再是用户独立决策。

Planning Gate 必须先检查：

- Interactive Round 1 是否完成每个关键 Combatant 的 Combat System Selection 或 System Refinement；
- Interactive Round 2 是否完成每个关键 Combatant 的 Combat Expression Selection 或 Refinement；
- Character / Narrative Identity 是否被职业、性别、年龄、外貌或体型错误映射成 Combat System；
- Physical Presentation Domain 是否存在必须条件暴露的高价值歧义；
- **Advantage Structure 是否已由用户明确、条件询问或高置信度静默推导；是否错误把“谁占优”直接推导成“另一方长期不攻击”；**
- **如果用户只给 Outcome，而 Counterplay / Trajectory 存在两个以上会显著改变成片的合理方向，是否按 `advantage-structure-contract.md` 暴露当前唯一问题；**
- **Combat Expression 与 Advantage Structure 是否存在真实语义冲突；只有真实高价值冲突才问，不建立机械协调矩阵；**
- Derived Choreography Direction 是否由上述角色级信息与场景 / Range / Environment / Intent 派生，而不是重新覆盖用户决策；
- 是否过早锁定结局；
- **Ending 是否被错误当作固定 Planning Node；没有真实高价值 Final Visual 分叉时应由最后 Active State 自然收束；**
- 用户已经明确的角色打法 / Technique Identity 是否被保留为后续 Persistent Combat Signature，而不是一次性标签；
- 是否把系统应自动保证的质量条件错误变成用户问卷。

### Stage 2：Execution Knowledge — Gap-driven Routing

Stage-2 不再固定使用“Technique Slot + Enhancement Slot”的机械结构；先检查当前 Phrase / Planning Context 真正缺什么，再选择 Pattern Slot。

```text
Planning / Phrase Gap
├─ 缺路线、身法、高低位、重心、轴线、空间变化
│  → Movement Pattern Slot
├─ 缺具体攻击、防守、腿法、摔控、兵器动作
│  → Technique Pattern Slot
└─ 缺前后动作如何从 Contact / Range / Axis / Momentum 连续接上
   → Transition Pattern Slot
```

每个被命中的 Slot 默认：

```text
1 个主 Pattern
+ 必要时 1 个辅助 Pattern
```

不是必须填满的配额，也不要求三槽全部读取。

当前最小验证知识源：

`references/libraries/combat-choreography-patterns/minimum-validation-set.md`

只有当前 Gap 与 Derived Choreography Direction / legacy execution slot 真正需要时才读取。现有 Fighting / Martial / Weapon Profile 仍可作为 Technique Detail 或 source/style evidence 按需使用，但不能只增加打法标签。

#### Stage-2 Pattern Hit Evidence Gate

进入最终 Concrete Action Phrase 前，内部必须能回答：

```text
当前 Execution Gap 是什么
→ 命中哪个 Pattern Slot
→ 实际读取哪个 leaf knowledge
→ 哪个 Pattern / Detail 被实例化进动作
```

出现以下任一情况时，不能在没有 leaf execution knowledge 的状态下直接进入最终 Phrase：

- High / Expert Combat 且目标是连续高手对决；
- Derived Choreography Direction 明确要求 Movement / Level / Axis / Route / Support 发生显著变化；
- 当前 System / Refinement 要求拳腿摔控混合或明确武术动作构造差异；
- 连续多个关键 Phrase 主要由 Upper-body Contact 驱动；
- Movement 只是“给上肢动作补脚步”；
- Transition 缺少 Contact / Momentum / Axis / Range / Recovery Handoff；
- Final Preflight 已触发 `Static Standing Combat / Upper-body Technique Dominance`。

当前 CK 最小验证阶段，如果没有更具体且已经读取的专业 leaf knowledge 能完整覆盖对应 Gap：

> **必须读取 `references/libraries/combat-choreography-patterns/minimum-validation-set.md`。**

如果 Phrase 已经生成后才发现 Pattern Hit Evidence 缺失，判 `Stage-2 Routing Evidence Missing`，必须回到 Stage-2 Read + Pattern Selection + Phrase Rewrite；不能只在旧动作上追加“侧切 / 转髋 / 重心变化”等词。

#### Movement 缺席风险

对于 High / Expert Combat，如果连续多个关键 Phrase 都由 Upper-body Technique 主导，而 Movement 只剩附属脚步说明，应将其视为：

`Movement Knowledge Gap / Static Standing Combat Risk`

此时提高 Movement Pattern Slot 的路由优先级，但**不使用“每段必须几次换位 / 踢腿”的固定配额**。

#### Persistent Combat Signature Gate

只要用户、Interactive 或高置信度 Planning 已经明确某个角色的 Combat System / System Refinement / Technique Identity / 打法差异，就必须把它升级为：

> **Persistent Combat Signature / 持续打法特征**

它不是动作次数配额，也不是要求重复同一 Combo；它回答的是：

> **这个角色持续通过什么动作逻辑创造下一状态、抢 Initiative、改变 Range / Support / Position？**

Combat Expression 可以影响主动 / 反制、节奏、风险和再进入倾向，但不能代替具体 Technique。

例如：

```text
女方：MMA / 拳腿 Refinement
男方：MMA / 拳肘 + 抱摔 Refinement
```

不能只实现一次低踢和一次 body lock 后双方塌成同一种前臂短打；应让已确认 System / Refinement 在 Combat Spine 不同阶段持续形成可见状态后果。

失败判定：

`Technique Identity Evaporation / Persistent Signature Collapse`

#### Advantage / Counterplay Realization Gate

在 Concrete Action Phrase 定稿前必须执行 `advantage-structure-contract.md`：

- `Advantage ≠ Attack Share`；
- `Outcome ≠ Advantage Trajectory`；
- 中 / 高 Counterplay 必须被真实 Attack / Counter / Re-entry 外显；
- 劣势方攻击可以失败，但必须迫使优势方真实响应或改变 Range / Guard / Position / Balance / Initiative；
- 不允许用“等待 / 准备 / 即将反扑”替代应发生的 Counterplay；
- Advantage Shift 必须经过真实 Turning Event；
- Ending 不得把主要 Counterplay 推到视频之外。

失败判定：

- `Counterplay Starvation`；
- `Initiative Starvation`；
- `Deferred Counterplay Collapse`；
- `Advantage-to-Passivity Shortcut`；
- `Outcome-Trajectory Collapse`。

#### Subject Motion 条件必读 Gate

当任务同时满足以下条件时，必须在 Concrete Action Phrase 定稿前读取：

`references/controls/subject-motion/control.md`

条件：

- 约 `10–20s` 的短时 Combat；
- 以持续近身攻防 / High Kinetic Scope 为主体；
- Derived Choreography Direction / System Refinement / Character Identity 明确依赖 Whole-body、Footwork、Support / Balance、Range / Position / Axis / Route；
- 或已有上肢锁死、动作断裂、脚步 / 重心只作为上肢动作修饰语的风险。

命中后 `subject-motion/control.md` 占普通 `0-3 Controls` 中 `1` 个名额；不能因为 Core / Choreography 已经描述了 Motion / Continuity 就跳过。

如果命中条件但 Runtime Read List 没有它，判：

`Subject Motion Routing Missing`

Stage-2 读取之后必须进入：

```text
Execution Knowledge
→ Persistent Combat Signature Realization（如存在明确角色打法差异）
→ Advantage / Counterplay Realization
→ 必要时读取 subject-motion/control.md
→ Movement / Technique / Transition 按当前状态组合
→ Concrete Action Phrase Construction
→ State / Continuity Validation
→ Motion / Energy Carry-over Check
→ Action–Camera Handoff Planning
→ Prompt Assembly
```

---

## 6. Quick / Interactive 共享动作引擎

Quick 与 Interactive 使用同一套下游质量标准，但本轮 MVP **只迁移 Interactive 上游角色打斗决策**。

### Quick Mode

> **Quick = Full Planning + Silent Resolution.**

Quick 暂保留 legacy Fighting Direction 静默规划，避免本次测试一次引入过多变量；仍不得按职业强行套固定 Profile。Advantage Structure 可按 `advantage-structure-contract.md` 静默推导，但本批不做 Quick 交互架构扩展。

### Interactive Mode

Interactive 角色打斗两个核心节点固定为：

```text
Round 1：Per-Character Combat System / System Refinement
Round 2：Per-Character Combat Expression / Expression Refinement
```

规则：

- `Unknown → Select`；
- `Known → Refine`；
- 1v1 同一轮同时处理双方；
- 1vN 主角 / 关键对手独立，次要角色允许分组；
- Character / Narrative Identity 不得替代 Combat System；
- Physical Presentation Domain 仅在高价值歧义时条件暴露；
- **Advantage Structure 是后续高价值条件节点，不是固定第三轮 / 第四轮；**
- **Advantage Structure 一次处理 `Outcome + Counterplay Shape + Advantage Trajectory`，不机械拆成三个问题；**
- **只给“谁赢 / 谁占优 / 势均力敌”且不同过程会明显改变成片时，才条件询问“怎么占优 / 对方怎么还手 / 主动权怎么流动”；**
- **势均力敌不自动等于全程 50/50；可以持续胶着、交替占优或一方长期占优但无法终结；**
- **Ending 不再固定询问；默认从 Final Active State 自然收束，只有真正高价值剧情分叉才单独暴露；**
- **Combat Expression 与 Advantage Structure 正常直接组合；只有真实语义冲突、存在多个高价值解释时才询问用户；**
- legacy Fighting Direction 不再作为用户问题；
- 系统自动形成 Derived Choreography Direction，再写入 legacy execution slot；
- 不把 Contact Solidity、Kinetic Scope、Temporal Packing、Motion Handoff、Action Sufficiency、Stage-2 Evidence、Subject Motion Gate、Action–Camera Handoff、Camera Readability、Final Preflight 等基础质量机制变成固定问卷。

Action Combat 中 `advantage-structure-contract.md` 对“战斗结果 / 收尾”语义具有专项优先级：通用 Interactive Contract 中的“战斗结果 / 收尾”不得重新解释成固定 Ending 问题。

用户明确“先实现 / 先测试 / 停止细化”时立即停止继续 Grill 低价值细节。

---

## 7. Combat 必经 Final Assembly / Preflight / QA

Action Combat 的最终运行链必须是：

```text
Per-Character Combat Context
→ Advantage Structure（用户明确 / 条件询问 / 静默推导）
→ Derived Choreography Direction
→ legacy Fighting Direction execution slot（MVP）
→ Stage-2 Gap-driven Execution Knowledge
→ Stage-2 Pattern Hit Evidence Gate
→ Persistent Combat Signature Realization（如命中）
→ Advantage / Counterplay / Trajectory Realization
→ 条件命中时读取 subject-motion/control.md
→ Concrete Action Phrase / Battle Beat
→ Core State Validation
→ Motion / Energy Carry-over Check
→ 读取并执行 action-camera-handoff-playbook.md
→ Action–Camera Handoff Planning
→ Camera / Audio / Spatial Coordination
→ 读取并执行 prompt-assembly/control.md
→ Combat-aware Final Prompt Assembly
→ Advantage / Counterplay Externalization Check
→ Combat Final Preflight
→ Prompt QA / Self-Repair Gate
→ Delivery
```

### Final Preflight 最小合并 Gate

最终至少检查：

1. 角色 Identity / Combat System / Refinement / Expression 是否分层且没有互相吞并；
2. **Advantage Structure 是否保存 Outcome / Counterplay Shape / Advantage Trajectory，且没有把占优错误变成对方不攻击；**
3. **中 / 高 Counterplay 是否真的出现可见 Attack / Counter / Re-entry，并形成 Defense / Range / Guard / Position / Balance / Initiative 中至少一种状态后果；**
4. **是否存在 `Counterplay Starvation / Deferred Counterplay Collapse`，尤其是否把主要反击写成“准备 / 即将”并推迟到 Ending 之外；**
5. **Advantage Trajectory 是否经过真实 Turning Event / Initiative Handoff，Outcome 是否没有吞掉整段状态流动；**
6. Derived Choreography Direction 是否忠实派生，没有重新覆盖用户确认；
7. Stage-2 是否真实命中需要的 leaf knowledge；
8. Subject Motion 是否按条件真实读取；
9. Coverage / Exchange Depth / Kinetic Scope 是否与观看目标匹配；
10. 动作是否具体且连续，没有 Neutral Reset / Turn-taking；
11. Persistent Combat Signature 是否持续；
12. Movement 是否真正参与编排，而不是上肢动作修饰语；
13. Contact / Range / Position / Environment 是否真实改变下一拍；
14. Action–Camera Handoff 是否继承 Active Motion；
15. Camera 决策层级与 Hard Constraint 是否正确；
16. **Ending 是否来自最后 Active State，而不是为了悬念吞掉本应发生的有效攻防；**
17. Final Prompt 是否保持 Continuous Action Spine、Action-first、低冗余 Negative；
18. Model Execution Realizability 是否通过。

任一关键项 FAIL，不允许直接交付。

### Prompt QA / Self-Repair Gate

Combat Final Preflight PASS 后仍执行成品级 QA。实现质量问题可以静默修；不能静默改：

- Primary / Secondary Combat System；
- System Refinement；
- Combat Expression；
- 用户明确的 Physical Presentation Domain；
- **用户明确的 Outcome / Counterplay Shape / Advantage Trajectory；**
- Persistent Combat Signature / Technique Identity；
- Base Viewing Priority / Camera Hard Constraint；
- 人物身份、剧情关系、特定 Ending 意图、Must Keep / Must Avoid。

> **质量问题修实现；创作决策要么保留，要么重新问。**

---

## 8. Lightweight Action Phrase Budget

Granularity 只控制信息展开深度，不控制动作数量配额：

```text
Major Reversal / Initiative Theft / Signature Moment
→ High Granularity

普通 Exchange / Re-counter / Range Change
→ Medium Granularity

纯连接 / 非关键过渡
→ Low Granularity
```

如果连续两个 Phrase 已经使用 High Granularity，后续普通 Exchange 优先压缩为 Medium / Low，给更多真实 Exchange 留执行空间。

Medium / Low 仍必须保留基本动作因果，不能退回“连续格挡 / 快速反制 / 持续缠斗”。

明确禁止：固定动作数、固定字数、固定秒数、固定 High/Medium/Low 占比。

Advantage / Counterplay 同样不使用次数配额；只要求用户确认的 Counterplay Shape 与 Trajectory 在 Action Spine 中真实可见。

---

## 9. 输出模板覆盖关系

Combat 不建立独立 single-shot / multi-shot 模板副本，但**专项 Task 规则优先于通用模板默认规则**。

高密度 Combat 默认继承 `Continuous Action Spine + Soft Time Anchors`，锁在 **15 秒** 内写细。图生 / 一镜到底可把软锚点写成 3–4 个 Beat 标题，但 Beat 内连续、Beat 间不 Reset。只有用户明确逐秒、外部同步、多镜头边界或 Model Adapter 有实测依据时才使用更碎的 Hard Time Blocks。即使使用 Hard Time Blocks，也必须跨块保持 Motion Handoff。不把单段写成 20–30 秒。

如果 Final Prompt 包含关键 Cut / 景别变化 / Reframe，Camera 不能只在动作段后写一句“关键接触切近”；关键 Handoff 应锚定到具体 Action Moment，并保持 Action State / Active Motion 连续。

如果 Advantage Structure 要求 High Counterplay，Prompt Assembly 的压缩不得优先删除用于兑现 Counter / Re-entry / Advantage Shift 的真实 Exchange。Ending 美化、重复 Camera / Audio、重复状态说明应先压缩。

最终 Prompt 遵循：

> **State Machine Internalized, Choreography Externalized.**  
> **Concrete Choreography In, Concrete Choreography Out.**  
> **Persistent Combat Signature Across the Spine.**  
> **Advantage Does Not Mean Opponent Passivity.**  
> **Action Drives Camera; Camera Preserves Live Motion.**  
> **时间码服从动作连续性，而不是动作服从时间码。**

---

## 10. 上位原则

> **约束错误，不约束创作。**  
> **Clarity Through Structure, Not Action Reduction.**  
> **高信息密度，但低混乱度。**  
> **被压制不等于没有还手；还手很多也完全可以仍然处于下风。**  
> **质量问题自动修实现，已确认创作决策不偷改。**  
> **少建运行时概念，多做高价值质量检查。**

Battle Beat、Action Phrase、Pattern、Persistent Combat Signature、Advantage Trajectory、Action–Camera Handoff、Golden Scenario 都不是固定动作 / 镜头模板。

禁止为了“清晰”默认削减有效攻防；复杂度优先通过结构、Phrase 切分、Camera Readability、Action-triggered Handoff、Persistent Signature、Advantage / Counterplay Realization 与模型执行预算处理。新增 Failure Signature 不自动意味着新增 Runtime 模块。
