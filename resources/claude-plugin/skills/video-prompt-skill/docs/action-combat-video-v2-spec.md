# Action Combat Video Prompt Spec V2

> 状态：设计中（Grill Me 持续收敛）  
> 基线：`docs/action-combat-video-spec.md`  
> V1 状态：已完成设计、实现与静态回归

## 1. V2 背景

V1 已较完整解决 Combat Intent、Spatial Map、Range / Advantage / Condition、Turning Event、Action–Reaction Pair、Battle Beat、Target Handoff、Beat State Contract、Action / Camera / Audio 协同，以及受力、空间和环境状态连续性。

真实生成测试暴露的新问题是：15 秒时间轴虽然完整，但真正持续交战只有约 2–3 秒，有效攻防交换也只有两三次；同时存在开场对峙过长、控制 / 僵持占时、双方打法同质、环境只做装饰、动作预算通缩、接触软绵绵等问题。

因此 V2 不推翻 V1，而是在其上增强正式的 **Combat Choreography Engine（动作编排引擎 / 动作导演层）**。

核心分工：

> **Combat Choreography Engine 负责“打得好不好看、够不够、实不实”。**  
> **Combat State / Continuity Engine 负责“打得对不对、接不接得上”。**  
> **约束错误，不约束创作。**

## 2. V2 总运行链

```text
Combat Choreography Intent
→ Cinematic Choreography Profile
→ Active Combat Coverage
→ Action Exchange Rhythm
→ Combat Character Identity
→ Environment Action Affordance
→ Action Phrase Design
→ Tactical Interaction（按需）
→ Combat Contact Solidity
→ Signature Moment Planning
→ Battle Beat
→ V1 State / Continuity Validation
→ Camera Readability Budget / Camera Coordination
→ Combat Audio Choreography / Audio Coordination
→ Final Prompt Action Externalization
→ Combat Final Preflight Gate
```

---

## 3. V2-01：Combat Choreography Engine

正式新增动作编排引擎，负责有效交战时间、单位时间攻防交换丰富度、角色打法差异、电影动作观感、Action Phrase、节奏、环境机会、Tactical Interaction、Combat Contact Solidity、Signature Moment，以及可读性与模型可执行性的动态平衡。

## 4. V2-02：Active Combat Coverage

新增 **Active Combat Coverage / 有效交战覆盖率**：Low 约 40–55%，Medium 约 60–75%，High 约 75–90%。

Timeline Coverage ≠ Combat Coverage。High 不等于全程同速高速动作；只要受击、失衡、闪避、恢复、快速重新切入等反馈直接推动下一次攻防，仍属于 Active Combat。

## 5. V2-03：Action Exchange Rhythm

Coverage 决定“有多少时间在打”；Rhythm 决定“持续交战期间怎么交换”。基础方向：重击型、均衡型、高手高速交换型、混合型。

## 6. V2-04：Action Phrase

```text
Action–Reaction Pair
→ Action Phrase
→ Battle Beat
→ Combat Sequence
```

Action Phrase 的核心是：**前一个动作自然制造下一个动作的机会。** 可参考 `Setup / Entry → Attack → Defensive Answer → Counter → Re-counter / Continuation → Phrase Payoff`，但禁止固定六步模板。

## 7. V2-05：Combat Character Identity

Character Identity 回答“当前这个角色怎么打”，动态关注 Combat Preference、Movement Signature、Attack Character、Defense / Counter Character 等维度。

```text
人物设定 / 体型能力 / 性格
+ Combat Intent
+ 环境 / 对手关系
+ Cinematic Choreography Profile
→ Combat Character Identity
→ 选择 / 混合 Fighting / Martial / Weapon Profile
→ Action Phrase
```

## 8. V2-06：Cinematic Choreography Profile

新增 **Cinematic Choreography Profile / 电影动作编排风格**，第一版基础方向可包含：写实战术型、凌厉电影动作型、高手连续攻防型、重型硬派型、环境技巧型。

它不进入一级视觉 `styles/`；由 Combat Playbook 协调，由小型 `combat-choreography-profiles` Library 提供稳定基础原型。

## 9. V2-07：Combat Interactive Mode 专属决策链

```text
核心战斗目的 / 观看目标
→ Cinematic Choreography Profile
→ Active Combat Coverage
→ Action Exchange Rhythm
→ Combat Character Identity
→ 环境参与程度
→ Camera Mode
→ 战斗结果 / 收尾
```

高置信度低风险项自动补全；只询问真正改变成片的变量；一次只问一个问题。

## 10. V2-08：Coverage 四类时间预算

Coverage 映射为 Setup Budget、Active Exchange Budget、Combat Downtime Budget、Ending Budget。

对于约 15 秒 High Coverage 高手 1v1，可参考：Setup 0.5–1.5s、Active Exchange 11–13s、累计 Downtime 尽量 ≤1–2s、纯 Ending Pose 0.5–1s。均为软预算。

## 11. V2-09：Exchange Depth

新增 **Exchange Depth / 攻防交换深度**，衡量 Defense → Counter → Re-counter → Continuation 的因果深度，而不是动作词数量。

主要由 Rhythm、Phrase 时长、Profile、Character Identity、Range / Advantage / Condition、环境、Camera Complexity、模型可执行性共同决定。

## 12. V2-10：Battle Beat 与 Action Phrase 动态一对多

Battle Beat : Action Phrase 动态一对多。Phrase 服务局部连续攻防组织；Beat 只在战术目标、Advantage、关键 Condition、主交战对象、战斗阶段或 Turning Event 实质变化时切换。

Phrase 之间可以无缝衔接，不要求 Downtime。

## 13. V2-11：Combat 中文术语统一

中文统一使用“动作编排 / 动作导演”；Action Phrase 使用“动作句 / 连续攻防段”。不再以“编舞”作为主要中文翻译。

## 14. V2-12：Combat Character Identity 动态推导，不建角色画像库

不建立“杀手 / 军人 / 警察 / 拳手”等职业到固定打法的模板映射。Character Identity 是当前 Combat Sequence 的动态推导结果。

Library 只保存相对稳定、可复用的 Fighting / Martial / Weapon 专业动作知识。

## 15. V2-13：小型 `combat-choreography-profiles` Library

第一版维护约 5–7 个稳定基础原型，描述 Coverage 倾向、Rhythm、Exchange Depth、动作重量与受力、Range 变化、环境利用、Phrase 节奏、Camera Complexity、冲突 / 不适用条件。

## 16. V2-14：Environment Action Affordance

```text
场景对象 / 空间结构 / 障碍
→ Environment Action Affordance
→ Intent / Identity / Range / Advantage 过滤
→ Action Phrase
→ 更新 Position / Range / Advantage / Condition / Environment State
```

只有环境利用真正改变攻击路线、移动路线、Range、Advantage、战术选择或 Phrase Payoff 时才值得使用，禁止装饰性随机破坏。

## 17. V2-15：Signature Moment / 标志性动作时刻

Signature Moment 是 Combat Sequence 级显式动作设计目标；Phrase Payoff 是局部结果，Signature Moment 是整场少数真正有记忆度的动作高潮 / 设计节点。

约 15 秒短动作片默认追求 1 个主要 Signature Moment，必要时可有 1 个辅助记忆点。Signature Moment 不等于慢动作，也不作为 Interactive Mode 固定追问项。

## 18. V2-16：经典影视 Signature Moment 参考体系按 Pattern 组织

经典影视打斗作为知识来源，但一级组织方式是 **可复用动作设计模式（Signature Moment Pattern）**，不是作品目录。作品名场面只是来源案例 / metadata。

运行时只吸收设计机制，再重新生成当前 Sequence 独有的 Signature Moment，不复刻完整影视动作段落。

## 19. V2-17：Signature Moment Pattern 单条知识结构

Pattern 采用 **抽象动作因果骨架 + 适用条件 + 可变化参数 + 案例证据**，核心字段包括 Pattern Intent、Trigger Conditions、Character Relationship、Core Mechanism、Action Causality Skeleton、Environment Role、Payoff Type、Rhythm / Exchange Fit、Camera Readability Hint、Adaptation Variables、Do Not Copy、Source Case IDs。

Source Case Facts 应核实；Pattern Abstraction 属于动作设计分析与归纳，不冒充影视官方定义。

## 20. V2-18：Signature Moment Pattern 轻量索引与按需加载

```text
references/libraries/signature-moment-patterns/
├─ index.md
├─ patterns/<pattern-id>.md
└─ source-cases/<case-id>.md
```

`index.md` 只存轻量路由信息；Agent 根据索引只加载最相关的 1–3 个 Pattern；正常生成默认不加载 `source-cases/`。

> **运行时加载设计知识，不加载研究档案。**

## 21. V2-19：`patterns/` 与 `source-cases/` 正式职责分离

- `patterns/`：存可迁移、可执行的动作设计生产知识；
- `source-cases/`：存作品 / 场景事实、核实来源、案例分析、可信度、关联 Pattern IDs。

> **Pattern 是生产知识；Source Case 是研究证据。**

## 22. V2-20：Tactical Interaction / 攻防博弈机制

新增 Tactical Interaction 作为 Action Phrase 内部可选战术因果层。

Exchange Depth 回答“有多深”；Tactical Interaction 回答“为什么进入下一层”。第一版 Playbook 维护少量稳定机制：Feint、Probe & Read、Bait、Anticipation、Counter-to-Counter、Pattern Break、Forced Response。

是否使用由 Character Identity、双方能力关系、Profile、Depth、Rhythm、当前状态、Phrase 时长、模型可执行性动态判断。

## 23. V2-21：Camera Readability Budget / 镜头可读性预算

```text
Action Complexity
+ Spatial Complexity
+ Camera Complexity
≈ 有限 Perceptual / Execution Budget
```

高 Coverage、高 Exchange Depth、高 Tactical Interaction、多人 / 高速换位、环境与空间复杂时，默认降低无必要 Camera Complexity，优先保持双方身体关系和动作因果可见。

重型 Payoff、环境换位、Signature Moment 等时机可以有目的释放镜头表现力。

> **镜头为动作服务；复杂动作先保证看清，简单爆点再释放镜头表现力。**

## 24. V2-22：Action Execution Budget / 动作执行复杂度预算

正式废除 V1 `1 个主攻防目标 + 2–4 个连续攻防交互节点 + 1 个结束状态` 作为 Battle Beat 全局默认动作数量锚点。

> **限制的是同一时间窗口内模型需要理解和执行的复杂信息量，不是整个 Battle Beat 最多允许多少动作。**

Battle Beat 不设置统一动作数量上限；一个 Beat 可以包含 1～多个无缝连续 Action Phrase。

同时增加 **Action Sufficiency Check** 防止取消上限后反而过少：检查 Coverage、Rhythm、Exchange Depth、Active Exchange Budget、无价值 Downtime 是否兑现。过载时优先删无价值动作 → 降低单 Phrase Depth / Tactical Complexity → 降低 Camera Complexity → 拆为无缝连续 Phrase → 最后才削减次要有效攻防。

## 25. V2-23：Combat Contact Solidity / 战斗接触实感

作为所有 Combat Contact Event 的通用动作质量维度，覆盖 Strike、Grapple / Control、Takedown / Throw、Blunt Weapon、Blade / Edge / Thrust、Weapon Clash / Parry、Environment Impact 等。

通用实感链：

```text
Commitment
→ Contact Event
→ Force / Energy / Pressure Transfer
→ Reaction Propagation
→ State Consequence
→ Recovery / Continuation
```

不同 Contact Modality 使用不同实感证据，不能把“重拳反馈”机械套到刀剑、摔控或兵器交击。

内部可动态区分 Light / Solid / Heavy，表示当前 Contact Event 的感知强度与战术后果等级。有效接触必须产生可见、可继承的身体 / 兵器 / 空间 / 状态后果；Camera / Audio 只能强化，不能替代真实受力。

## 26. V2-24：Clarity Through Structure, Not Action Reduction

正式替换 V1 “宁少而清晰”。

> **Clarity Through Structure, Not Action Reduction.**  
> **通过结构获得清晰，而不是通过动作通缩获得清晰。**

优秀动作戏天然是高信息密度内容；问题不在元素多，而在能否组织成清楚因果层级并被模型稳定执行。

> **高信息密度，但低混乱度。**  
> **清晰优先，但不以削减有效攻防换取清晰。**  
> **宁可少冗余，不可少有效攻防。**

复杂度风险优先通过去冗余、Phrase 结构化、降低 Camera Complexity、连续 Phrase 切分解决。

## 27. V2-25：State Machine Internalized, Choreography Externalized

Final Prompt 正式采用：

> **State Machine Internalized, Choreography Externalized.**  
> **状态机内化，动作编排外显。**

内部完整运行 Range、Advantage、Condition、Exchange Depth、Tactical Interaction、Combat Contact Solidity、Environment Affordance、Camera Readability Budget 等机制；Final Prompt 则把这些状态转译成视频模型可执行、观众可见的动作事实。

信息优先级：正向可见动作 → 空间与环境动作 → 动作质感 → Camera / Audio → 少量必要连续性 / Negative Constraints。

Final Prompt 应由 Action Language 主导；不得默认追加通用禁止清单或无根据限制。

## 28. V2-26：Combat Quality Benchmark / 打斗成片质量基准集

建立 **静态结构回归 + 实际生成视频质量回归** 双层验证体系。

> **最终生成视频动作质量是第一验收目标；静态规则正确只是必要条件，不是充分条件。**

第一版维护约 6–10 个 Golden Combat Scenarios，覆盖高手近身、力量差、受限空间、硬派拳脚、短兵器、长兵器、抓控摔投、多人战等。

成片至少评价 Active Combat Coverage Realization、Exchange / Choreography Richness、Character Distinction、Tactical Interaction Realization、Combat Contact Solidity、Environment Integration、Signature Moment、Camera Readability、Spatial / Physical Continuity、Rhythm Variation。

显式记录 **Prompt Intent → Generated Result Gap**；“Prompt 写了某条规则”不等于“成片兑现了该规则”。

## 29. V2-27：Golden Combat Scenario 使用质量合同，不锁固定动作答案

Golden Scenario 采用：

```text
Fixed Input
+ Quality Contract
+ Failure Contract
+ Optional Test Anchor
```

Fixed Input 保证可比性；Quality Contract 定义必须兑现的质量；Failure Contract 定义禁止退化模式；Optional Test Anchor 只在专门测试某能力时要求该抽象能力必须出现。

> **Benchmark 锁质量，不锁创意。**

## 30. V2-28：Combat Core 与专项实现层解耦

正式确立一级架构边界：**Combat Core 保持 Combat-agnostic / 战斗形式无关；Modern Combat、Cinematic Wuxia、Weapon / Fighting / Martial 等专项层只负责把 Core 机制实例化为不同动作语言、物理尺度、默认节奏和 Contact Modality 表现。**

推荐结构：

```text
Combat Core
├─ Coverage
├─ Rhythm
├─ Action Phrase
├─ Exchange Depth
├─ Combat Character Identity
├─ Tactical Interaction
├─ Environment Action Affordance
├─ Signature Moment
├─ Combat Contact Solidity
├─ Action Execution Budget
├─ Camera Readability Budget
└─ State / Continuity Contract
        ↓
专项实现层
├─ Modern Combat
├─ Cinematic Wuxia
├─ Fighting / Martial Profiles
└─ Weapon Profiles / Weapon-specific execution
```

Core 规定的是 **机制与质量合同**，例如：接触必须有 Commitment → Contact → Transfer → Reaction → Consequence；Phrase 必须有因果连续性；Coverage / Rhythm / Exchange Depth 必须兑现；环境利用必须改变战术或空间关系；Signature Moment 必须由前后动作因果支撑；Camera 必须服务动作可读性。

专项层规定的是 **这种战斗形式如何表现上述机制**。Modern Combat 更强调重心、身体发力、直接压迫、真实失衡与短距离 Contact；Cinematic Wuxia 可采用借力、身法、兵器轨迹、电影化腾跃、节奏留白等不同物理尺度；Grapple / Takedown 用杠杆、压迫、夺重心与挣脱代价体现 Solidity；Blade / Weapon 用危险线路、距离约束、格挡偏转、兵器震荡、主动权与 Weapon State 变化体现 Solidity。

> **Core 规定“必须成立什么”；专项层规定“在这种战斗里它具体长什么样”。**  
> **专项可以覆盖默认表现，但不能反向重定义 Combat Core。**

## 31. V2-29：Two-stage On-demand Loading / 两阶段按需加载

Combat V2 正式采用 **Plan First, Load Detail Second / 先规划、再加载详情** 的运行时 Reference 策略，避免随着能力和 Library 扩展而全量加载上下文。

### Stage 1：Planning / 路由阶段

先加载轻量、稳定的运行骨架：

```text
action-combat-video/index
+ Combat Core
+ 当前专项 Playbook（Modern / Wuxia 等）
+ 必要 Library 轻量 index
+ 可选 Model Adapter 索引 / 能力摘要
        ↓
形成 Combat Planning Context
```

`Combat Planning Context` 只记录当前任务真正需要的规划变量，例如：Combat Branch、Coverage、Rhythm、Character Identity 倾向、主要 Contact Modality、环境参与程度、是否需要 Signature Moment、是否存在武器 / 多人 / 特殊 Camera 风险等。

Planning 阶段**不展开大量叶子知识正文**。Coverage、Rhythm、Exchange Depth、Tactical Interaction、Combat Contact Solidity、Action Execution Budget、Camera Readability Budget 等属于 Core / Playbook 的判断机制，不因为存在这些能力就分别占用 Library Detail Slot。

### Stage 2：Execution Knowledge / 叶子知识阶段

根据 `Combat Planning Context` 再按需展开少量真正需要的专业叶子知识。正常运行原则上只允许约 **2 个主要 Library Detail Slot**：

```text
Slot A：Technique / Execution Knowledge
→ 最相关的 Fighting / Martial / Weapon Profile

Slot B：Choreography Enhancement Knowledge
→ 最相关的 Signature Moment Pattern 或其他确有必要的增强知识
```

`2 个 Slot` 是默认 Reference 预算，不是不可突破的硬限制；只有当用户明确要求、任务确实存在多个不可合并的专业知识依赖，且额外加载能显著提升正确性时，才允许有理由地增加。

### Slot 竞争优先级

当叶子知识竞争有限预算时，优先级为：

```text
用户明确指定的专业动作 / 武器知识
        ↓
保证动作正确执行所必需的专业知识
        ↓
Character Identity 差异化所需知识
        ↓
Signature Moment / 创意增强知识
```

因此刀战、长兵器、特殊摔控等任务中，Weapon / Fighting / Martial Profile 优先于 Signature Moment Pattern。上下文预算紧张时，可以暂不加载创意增强 Pattern，但不能为了保留创意素材而牺牲动作专业性和基本执行正确性。

### Index 与叶子文件职责

> **Indexes are cheap routing knowledge; leaf files are expensive execution knowledge.**  
> **索引用于选择，正文用于执行。**

所有可扩展 Library 都应尽量采用轻量 index → 少量候选 → 只加载命中叶子的方式。`source-cases/`、研究档案、未命中 Profile、未命中 Pattern 默认不进入正常生成上下文。

Environment Action Affordance 默认由当前场景动态推导，不建设“桌子动作库 / 椅子动作库”并默认加载；只有特殊环境确实需要独立专业知识时才占用叶子知识预算。

### 与 Reference Architecture 的关系

V2-29 服从全局 Reference Architecture 的 `1 task + 少量 controls + 少量 libraries + 可选 model adapter` 原则。Combat V2 能力数量可以持续增长，但**单次生成的实际 Reference 读取量应保持小而有针对性**。

> **能力很多，不等于每次加载很多。**  
> **先用索引和 Core 做判断，再为当前动作计划购买少量高价值知识上下文。**

## 32. V2-30：Model Combat Capability Contract / 模型战斗能力合同

正式新增轻量 **Model Combat Capability Contract**，作为 Model Adapter 与 Combat Choreography Engine 之间的标准能力接口。

它不复制 Combat Core 规则，也不把模型特有知识写进 Core；Model Adapter 只负责提供“该模型在 Combat 场景下当前能稳定承载什么、哪些组合存在高风险”的能力摘要。

```text
Model Adapter
        ↓
Model Combat Capability Contract
        ↓
Combat Planning Context
        ↓
Exchange Depth / Phrase Complexity
Action Execution Budget
Camera Readability Budget
Multi-character / Contact / Spatial Complexity
```

### 第一版能力维度

第一版只维护真正会改变动作执行方案的少量维度，避免伪精确：

- **Motion Complexity Capacity**：连续、高速、多层动作因果的承载能力；
- **Multi-character Stability**：多人同时运动、身份保持、Target Handoff 的稳定性；
- **Contact / Interaction Fidelity**：拳脚、抓控、武器交击、环境接触等真实互动的执行可信度；
- **Spatial Continuity**：人物位置、方向、Range、环境关系的保持能力；
- **Camera Complexity Capacity**：复杂动作与复杂运镜同时存在时的承载能力；
- **Temporal / Prompt Following**：时长、事件顺序、关键动作要求与时间分配的兑现能力。

第一版优先使用 `High / Medium / Low + capability notes + known risks`，不使用 7.8 / 6.4 等缺乏可靠测量依据的伪精确评分。

### 能力来源与校准

Contract 的初始判断可以来自模型官方能力说明、已知限制与内部测试，但后续应优先由 **Golden Combat Benchmark 实测结果持续校准**。

例如若模型在静态能力上看似很强，但 Golden Benchmark 持续发现“高 Exchange Depth + aggressive camera movement 导致动作大量丢失”，Adapter 应记录类似：

```text
Motion Complexity: High
Camera Complexity under dense combat: Medium
Known Risk:
dense action + aggressive camera movement causes execution loss
```

Choreography Engine 应据此优先降低 Camera Complexity、拆分 Phrase 或减少同一时间窗口的独立复杂信息，而不是直接把整场有效交战压缩掉。

### Intent Preservation / 导演意图保护

Model Capability Contract 只回答“**如何稳定实现已经确定的导演目标**”，不能成为偷偷修改用户意图的上位决策器。

当用户已明确 High Coverage、高手高速连续对决、特定武器风格或观看目标时，模型能力不足应优先通过以下方式降载：

```text
保留核心 Combat Intent / Coverage / 观看目标
        ↓
降低无必要 Camera Complexity
        ↓
降低单个 Phrase 的同时复杂度
        ↓
拆成多个连续但不停战的 Phrase
        ↓
简化次要 Environment / Tactical 分支
        ↓
只在仍无法稳定执行时缩减次要动作细节
```

禁止因为模型能力偏弱就把“高手持续对决”自动改成“两三次简单交换”，也禁止用模型适配器覆盖用户明确指定的 Combat 结果或核心动作观感。

### 与 V2-22 / V2-21 的关系

- `Action Execution Budget` 决定当前时间窗口能承载多少执行复杂度；
- `Camera Readability Budget` 决定动作与镜头如何共享有限感知 / 执行预算；
- `Model Combat Capability Contract` 提供上述预算所需的**模型侧能力输入**。

因此它是执行层反馈接口，不是新的创作风格系统，也不占 Fighting / Signature Moment 等 Library Detail Slot。

> **模型能力影响实现路径，不偷偷改写导演意图。**  
> **能力合同应由真实成片 Benchmark 持续校准，而不是依赖一次性主观印象。**

## 33. V2-31：Shared Combat Planning Graph / Quick 与 Interactive 共享同一规划图

Quick Mode 与 Interactive Mode 正式共享**同一套 Combat Planning Graph、同一套 Combat Choreography Engine、同一套质量标准和同一套最终验证逻辑**。两者唯一的本质区别，是哪些决策由系统静默完成、哪些高影响分叉暴露给用户。

统一规划图：

```text
理解 Combat Intent / 观看目标
→ 判断 Combat Branch
→ Cinematic Choreography Profile
→ Active Combat Coverage
→ Action Exchange Rhythm
→ Combat Character Identity
→ Contact Modality / Environment Affordance
→ Camera Intent
→ Model Combat Capability Contract
→ Action Execution / Camera Readability Budget
→ Signature Moment
→ Action Phrase / Battle Beat
→ V1 State / Continuity Validation
→ Final Prompt Action Externalization
```

### Quick Mode：完整规划，静默决策

Quick Mode 不是简化版 Combat Engine。用户即使只给一句简短需求，系统仍完整推导 Coverage、Rhythm、Character Identity、Environment、Contact Solidity、Signature Moment、Camera、Model Capability 与执行预算；只是对高置信度、低风险决策自动完成，不逐项询问。

> **Quick = Full Planning + Silent Resolution.**

Quick Mode 不能因为输入简短而默认降低动作丰富度、Contact Solidity、Signature Moment 设计或质量检查标准。

### Interactive Mode：同一规划图，选择性暴露决策

Interactive Mode 不建立另一套更复杂的动作生成逻辑，而是在同一 Planning Graph 上执行 **Decision Exposure Policy / 决策暴露策略**：

```text
用户已经明确
→ 直接继承

高置信度 + 低风险
→ 自动补全

存在多个明显不同、都会显著改变成片的方向
+ 当前置信度不足
→ 向用户暴露一个最关键分叉
```

典型应暴露的决策包括：Modern vs Wuxia 等一级动作方向、明显不同的观看目标 / Choreography Profile、用户未明确但会彻底改变成片的武器 / 战斗结果等。

不应暴露为固定问题的内容包括 Contact Solidity、连续性检查、Action Sufficiency Check 等基本质量机制。

### 模式切换与增量修改

用户可从 Quick 结果直接进入更深控制，例如“男方更凶狠”“改成刀战”“镜头更稳定”。系统只更新对应 Planning Node 及其 downstream 节点，不需要切换到另一套 Combat 系统或从零重做全部逻辑。

因此模式区别是**控制权与交互深度**，不是质量等级：

> **Quick 与 Interactive 应有相同的成片质量上限；Interactive 只是让用户在重要分叉上拥有更多显式控制权。**

这也意味着 V2 的 Static Regression、Golden Combat Benchmark 与 Failure Contract 默认评价同一套核心动作规划能力；若需比较两种模式，测试重点是决策暴露与用户控制行为，不是两套动作引擎的质量差异。

## 34. V2-32：Combat Audio Choreography / 战斗声音编排

在继承 V1 `Action Choreography + Camera Choreography + Audio Choreography` 三线同步原则的基础上，V2 正式增加轻量 **Combat Audio Choreography / 战斗声音编排**，补齐 Action 与 Camera 已增强、Audio 相对滞后的问题。

Combat Audio Choreography 不是新的庞大独立系统，也不是“给每个动作加一个音效”。它的职责是：**让声音成为动作因果、接触实感、节奏、身体状态和空间变化的可听证据，并把有限的强调预算集中在真正重要的节点上。**

### 核心参与维度

Combat Audio 至少参与以下动作质量：

- **Action Phrase Rhythm**：通过脚步、衣料、呼吸、连续接触、停顿与再切入帮助观众感知 Phrase 节奏；
- **Combat Contact Solidity**：为拳脚、摔控、钝器、刀剑 / 兵器交击、环境撞击等提供与 Contact Modality 匹配的声音证据；
- **Body State / Breath**：呼吸、短促吐气、受压、恢复等声音反映身体状态变化，但不机械给每个动作配喘息；
- **Weapon / Material Feedback**：根据兵器与材质关系体现切线、碰撞、偏转、摩擦、震动或落点，而不是统一使用夸张金属声；
- **Environment / Spatial Feedback**：脚步、地面、桌椅、墙体、狭窄空间或空旷空间的反馈帮助建立空间真实性；
- **Phrase Payoff / Signature Moment**：重要 Payoff 与 Signature Moment 可以获得更强的声音组织与落点，但声音不能代替动作本身的设计质量。

### Audio Accent Density ≠ Action Density

正式增加：

> **Audio Accent Density ≠ Action Density.**  
> **动作密集，不代表每一个微动作都需要独立强化音效。**

高密度战斗中应建立声音层级：

```text
基础动作 / 环境声音
→ 维持连续空间与身体存在感

关键 Contact Accent
→ 强化真正改变状态或节奏的接触

Phrase Payoff Accent
→ 标记局部动作句落点

Signature Moment Accent
→ 获得整段最高优先级的声音关注之一
```

必要时可以通过短暂声音收缩、呼吸突出、环境底噪下降或瞬时留白制造对比，使下一次关键 Contact 更有冲击；但不把“静音后重击”做成固定套路。

### 不同 Contact Modality 的声音证据不同

Audio 继续服从 V2-23 的 Contact Modality：

- Strike：脚下发力、衣料、呼气、身体接触、失衡脚步等共同形成实感；
- Grapple / Takedown：身体摩擦、鞋底抓地、压迫呼吸、落地 / 环境反馈更重要；
- Blade / Edge / Thrust：空气切线、兵器路线、材质接触、偏转与距离危险感优先，不用“重拳式”闷响；
- Weapon Clash / Parry：接触点、材质、偏转 / 摩擦、握持与脚步调整共同体现线路变化；
- Environment Impact：身体 / 武器与具体材质的碰撞、反弹与空间共振应与画面一致。

因此 Audio 与 Combat Contact Solidity 共用同一原则：**不同战斗形式共享因果要求，但不共享同一种表现模板。**

### 与 Action / Camera 的关系

```text
Action Phrase / Contact / Movement
        ↓
Combat Audio Choreography
        ↓
Rhythm + Solidity + Spatial Readability + Signature Moment
```

Camera 与 Audio 都是动作质量的放大器和可读性工具，不能替代 Choreography 本身。禁止用大音效、持续轰鸣、统一低频冲击或过度声音设计掩盖动作接触不成立的问题。

### 模型适配边界

Combat Audio Choreography 是 Combat Core 的协同质量规则；目标模型是否支持原生音频、音效 / 对白 / BGM 的控制能力，以及具体应如何表达，由 Model Adapter 处理。模型不支持音频时，不应让 Audio 规则反向挤占核心动作 Prompt，也不因此降低 Action Choreography 质量。

原则：

> **声音要证明动作、组织节奏、强化关键节点，而不是替动作表演。**  
> **高动作密度需要声音层级，不需要音效堆砌。**

## 35. V2-33：Combat Choreography Engine 归属于 `action-combat-video` Task

正式确认：**Combat Choreography Engine 属于 `references/tasks/action-combat-video/` Task 自身的核心编排能力，不新增一级 `references/controls/combat-choreography/`。**

职责边界：

```text
Task = 动作导演 / 编排者
Controls = 跨任务通用控制能力
Libraries = 专业动作知识
Model Adapter = 模型能力边界与表达适配
Diagnostics = 失败识别 / 退化诊断
Output Contract / Prompt Assembly = 最终交付与表达约束
```

### Task 内部职责

`action-combat-video` Task 负责统筹完整 Combat Planning Graph，包括：

```text
Combat Intent / 观看目标
→ Combat Branch
→ Cinematic Choreography Profile
→ Active Combat Coverage
→ Action Exchange Rhythm
→ Combat Character Identity
→ Environment Action Affordance
→ Action Phrase / Exchange Depth
→ Tactical Interaction
→ Combat Contact Solidity
→ Signature Moment
→ Action Execution Budget
→ Battle Beat
→ V1 State / Continuity Validation
→ Camera / Audio 协同
→ Final Prompt Action Externalization
```

Task 可以在现有 `core-playbook.md` 基础上新增独立 `choreography-playbook.md` 以承载 V2 动作导演逻辑，具体文件拆分在实现映射阶段决定；但无论是否拆文件，**职责仍属于 Task，而不是新的全局 Control**。

### Controls 保持跨任务通用

Combat Task 调用并协调现有通用 Controls，例如：

- `timeline-rhythm`：通用时间 / 节奏控制；
- `subject-motion`：通用运动、重心、物理与主体动作表达；
- `camera-direction`：通用镜头语言；
- `spatial-blocking`：通用空间调度；
- `continuity-consistency`：通用连续性与一致性；
- `audio-visual-sync`：通用音画同步；
- `prompt-assembly`：最终 Prompt 组装与表达控制。

这些 Controls 可以被 Combat Task 以更严格或更专项的方式调用，但不吸收 Combat 专属的 Phrase、Exchange Depth、Signature Moment、Contact Solidity、Combat Character Identity 等领域逻辑。

### Libraries 只保存具体知识

Libraries 保存可复用专业知识，不承担导演流程本身，包括现有 Fighting / Martial / Weapon / Environment 知识，以及 V2 已确认新增的：

- `combat-choreography-profiles`；
- `signature-moment-patterns`。

Combat Character Identity 继续动态推导，不建设角色 / 职业画像库。

### 为什么不新增 Combat Control

不新增 `combat-choreography` Control 的主要原因：

1. Combat Choreography 高度依赖 Battle Beat、Combat State、Fighting / Martial / Weapon Profile、Signature Moment 等 Combat Task 内部语义；
2. 若拆成独立 Control，会造成 Task 与 Control 双方各自保存一半 Combat 领域逻辑，职责边界模糊；
3. 会增加运行时 Reference 加载层级，与 V2-29 的两阶段小上下文策略冲突；
4. 全局 Control 应优先保存可被不同 Task 复用的控制能力，而不是某一个 Task 的领域导演流程。

原则：

> **Combat Task 负责“怎么把这一场战斗导演出来”；Controls 提供跨任务工具；Libraries 提供专业知识。**  
> **不要为了模块化而把同一个领域引擎切成两半。**

## 36. V2-34：Task 内拆分 `core-playbook.md` 与 `choreography-playbook.md`

正式确认在 `references/tasks/action-combat-video/` 内新增 **`choreography-playbook.md`**，让 V1 的状态 / 连续性骨架与 V2 的动作导演逻辑在文件职责上真正解耦，但仍属于同一个 Combat Task。

推荐 Task 结构：

```text
references/tasks/action-combat-video/
├─ index.md
├─ core-playbook.md
├─ choreography-playbook.md
├─ modern-combat-playbook.md
└─ cinematic-wuxia-playbook.md
```

### `core-playbook.md` 的职责

`core-playbook.md` 回归 **Combat State / Continuity / Battle Runtime Skeleton**，主要保留和强化：

- Combat Intent；
- Combat Spatial Map；
- Range / Advantage / Condition；
- Turning Event；
- Action–Reaction 的基础因果合同；
- 1vN / Target Handoff；
- Battle Beat 与 Beat State Contract；
- Position / Environment / Weapon State 的状态继承；
- Spatial / Physical / Continuity Validation；
- Task 如何调用通用 Controls、专业 Libraries 与专项 Playbook 的总协调关系。

`core-playbook.md` 不再承担 V2 的完整动作导演细节，也必须移除 V1 `1 个主攻防目标 + 2–4 个连续攻防交互节点 + 1 个结束状态` 的全局动作数量锚点。

### `choreography-playbook.md` 的职责

`choreography-playbook.md` 作为 **Combat Choreography Engine 的主运行 Playbook**，集中承载：

- Cinematic Choreography Profile；
- Active Combat Coverage 与四类时间预算；
- Action Exchange Rhythm；
- Action Phrase 与 Battle Beat 的动态关系；
- Exchange Depth；
- Combat Character Identity；
- Tactical Interaction；
- Environment Action Affordance；
- Signature Moment；
- Combat Contact Solidity；
- Action Execution Budget + Action Sufficiency Check；
- Camera Readability Budget；
- Combat Audio Choreography；
- Clarity Through Structure, Not Action Reduction；
- State Machine Internalized, Choreography Externalized；
- Shared Combat Planning Graph；
- Model Combat Capability Contract 对执行复杂度的反馈方式；
- 两阶段 Reference 按需加载与 Library Detail Slot 协调。

### 专项 Playbook 的职责

`modern-combat-playbook.md` 与 `cinematic-wuxia-playbook.md` 不复制 Core 或 Choreography 的通用机制，只负责把它们实例化为对应战斗形式的：

- 动作语言；
- 物理尺度；
- 默认节奏与 Range 倾向；
- Contact Modality 表现；
- Fighting / Martial / Weapon Profile 使用方式；
- Camera / Audio 的专项表达倾向。

原则：

> **Core 负责“打得对、接得上”；Choreography 负责“打得够、丰富、好看、有实感”；专项 Playbook 负责“这种战斗具体怎么表现”。**  
> **拆文件是为了稳定职责边界，不是把同一个 Combat Task 拆成多个互相竞争的引擎。**

## 37. V2-35：Combat Planning / Final Preflight Gate

真实交互测试暴露出：V2 的 Coverage、Character Identity、Tactical Interaction、Action Sufficiency、Prompt Assembly 等规则已经存在，但如果没有输出前的强制 Gate，Agent 仍可能在“规则被读取”后直接交付不合格 Prompt。

因此正式增加 **Combat Planning / Final Preflight Gate**。它不是新的用户参数，也不新增一级 Control，而是 Combat Task 在规划与最终组装两个关键出口上的强制质量否决机制。

### 37.1 Planning Preflight

交互或 Quick 内部 Combat Planning 进入动作编排前，必须检查：

- 是否按依赖关系先解决上游高影响决策，而不是过早锁定战斗结局；
- 当前 Choreography Profile 候选是否真的覆盖该场景最相关方向，例如高手对决不能因为选项设计而漏掉“高手连续攻防型”；
- Character Identity 是否来自人物设定、Combat Intent、双方关系、环境与 Profile 的动态推导，而不是仅凭职业、性别、年龄、外貌或体型直接映射打法；
- Coverage / Rhythm / Character Identity / Environment / Camera 等是否存在真正需要暴露给用户的高影响分叉；
- Camera、Contact Solidity、Action Sufficiency 等可高置信度自动推导的质量机制是否被错误浪费为固定问卷。

Planning Preflight 不通过时，优先内部重排决策链；只有确实存在用户必须决定的高影响歧义时，才在 Interactive Mode 暴露当前唯一问题。

### 37.2 Final Preflight

Final Prompt 输出前必须至少检查：

```text
Action Sufficiency
+ Combat Character Identity Visibility
+ Tactical Interaction Externalization
+ Combat Contact Solidity
+ Combat Kinetic Scope
+ Camera Readability
+ Action Language Dominance
+ Negative Constraint Discipline
+ State / Continuity Validation
```

关键判定：

- Medium / High Coverage 是否真正转成足够连续的有效 Action Phrase；
- 高手 / 势均力敌场景是否存在与设定相符的 Counter / Re-counter / Tactical Interaction；
- Character Identity 是否能从 Movement / Attack / Defense / Rhythm 看出来，而不是靠旁白解释；
- `提前读到、判断、预判` 等内部战术概念是否已转成可见动作与时机；
- Contact 是否有与模态匹配的 Commitment → Transfer / Pressure → Reaction → Consequence；
- Final Prompt 是否由动作 / 反应 / 接触 / 位移语义主导；
- Negative Constraints 是否只保留真实高风险，禁止自动追加“无武器”等用户未指定限制或长通用 Avoid 清单；
- 内部 State / Meta 说明是否挤占有效动作语言。

### 37.3 Gate Failure 行为

Final Preflight 失败时：

```text
定位失败维度
→ 优先重写当前 Action Phrase / Character Identity / Prompt Assembly
→ 必要时重新分配 Action / Camera Execution Budget
→ 再次执行 Preflight
→ 通过后才允许交付
```

不得因为用户已经完成 Interactive 选择就跳过 Gate，也不得把 Gate 失败直接变成继续追问用户的理由。

> **规则存在不等于规则生效；Preflight Gate 让已有质量规则真正拥有否决权。**

## 38. V2-36：Combat Kinetic Scope / 战斗运动尺度

真实成片进一步暴露出新的失败类型：即使 Coverage 较高、时间线上一直处于交战、甚至存在 Counter / Reversal，战斗仍可能主要锁在上半身与原地，表现为大量抬臂、格挡、抓腕、控制上臂等动作，而脚步、膝髋、躯干轴线、重心、Position、Range 与空间路线变化不足，最终观感仍然是“没真正打起来”。

因此正式新增 **Combat Kinetic Scope / 战斗运动尺度**，作为区别于 Coverage 与 Exchange Depth 的第三个动作充分性维度：

```text
Coverage
→ 这段时间有多少真正处于有效交战

Exchange Depth
→ 单次连续攻防的因果层有多深

Kinetic Scope
→ 身体和空间实际动了多大、多丰富
```

三者互不替代。

### 38.1 核心观察维度

Kinetic Scope 动态检查：

- **Whole-body Engagement**：脚步、膝髋、躯干、上肢、重心是否按当前 Fighting / Martial / Weapon 语言协同；
- **Spatial Mobility**：Position、Angle、Range、攻防线路是否产生有意义变化；
- **Level / Axis Variation**：是否存在与当前战斗形式相符的高低位、身体轴线、方向关系变化；
- **Contact-driven Displacement**：Contact 是否推动身体、重心、站位、距离或姿态变化，而不是只发生手臂碰撞；
- **Environment Flow**：环境是在推动追击、绕位、逼压、脱离、重新切入，还是把双方永久锁死在一个点；
- **Camera Mobility Coupling**：Camera 是否能跟随真实空间运动，而不是因为“稳定可读”退化成近似固定；Camera 的完整规则继续由后续 Camera 设计决定；
- **Temporal Action Packing**：较长时间窗口是否包含足够连续因果动作，避免 3–4 秒只被一个宏事件慢慢占满。

### 38.2 Upper-body Combat Lock / Kinetic Underfill

新增正式 Failure Signature：

> **Upper-body Combat Lock / Kinetic Underfill**

典型表现：

- 大量前臂、手腕、肩部交互，但脚步 / 膝髋 / 躯干参与弱；
- 双方长时间停在原地或单一小区域；
- Range、Angle、Position 长时间不变化；
- 所谓环境利用只是把人按在桌边 / 墙边继续上半身对抗；
- Camera 看似稳定，实质近似静止；
- 时间轴标记“高速”，但一个 3–4 秒窗口只承载一个宏动作；
- 成片虽然“每秒都有人动”，但没有持续的全身与空间动力学。

一旦触发，Action Sufficiency 不能因 Coverage 已经达到目标而判 PASS；必须重新设计 Action Phrase，使动作在当前战斗形式允许的范围内增加全身协同、空间 / 角度 / 距离变化或身体轴线变化。

### 38.3 动态而非配额

Kinetic Scope 不建立固定动作配额：

- 不要求每场必须踢腿、摔投、跑动、绕桌或改变高度；
- Grapple 可以空间位移较小，但应有重心、支撑点、杠杆、高低位、身体轴线和 Position 的丰富变化；
- Boxing / Striking 可以不频繁摔投，但应通过脚步、压进 / 撤出、侧切、Pivot、Slip、角度变化和 Contact 后位移体现全身参与；
- Blade / Weapon Combat 重点可落在 Threat Line、Range、进退、角度、兵器线路与身体协调；
- Wuxia 可采用更大身法 / 腾跃尺度，但仍必须服从当前专项物理合同。

实际 Kinetic Scope 由 Choreography Profile、Character Identity、Fighting / Martial / Weapon Profile、Environment、Duration、Model Capability 与 Camera Readability 共同决定。

> **运动尺度的目标不是“动作越大越好”，而是避免战斗长期退化成原地上半身互相操作。**

### 38.4 与 Final Preflight / Benchmark 的关系

Final Preflight 增加 Kinetic Scope 检查：

- Coverage 达标但 Kinetic Scope 明显不足，仍判不通过；
- Exchange Depth 不低但主要发生在手臂层级，仍可判 Kinetic Underfill；
- 如果模型能力限制需要降低同时复杂度，优先拆 Phrase、降低 Camera Complexity 或减少次要分支，不默认把全身 / 空间运动全部压掉。

Golden Combat Benchmark 增加 **Kinetic Scope Realization** 观察项，重点比较计划中的 Whole-body / Spatial / Range / Axis 变化是否在真实成片中兑现。

## 39. V2 设计原则汇总

1. 时间轴写满不代表动作写满，必须检查 Coverage；
2. 持续交战不代表动作丰富，必须检查 Rhythm / Phrase / Exchange Depth；
3. 动作合理不代表好看，动作导演层负责视觉动作设计；
4. 高手身份必须通过打法表现；Character Identity 动态推导；
5. Phrase 负责连续动作，State Contract 负责连续性；Phrase 与 Beat 不绑定 1:1；
6. High Coverage 不等于全程同速，Active Combat Feedback 与 Downtime 必须区分；
7. Exchange Depth 衡量因果深度，不衡量动作词数量；Tactical Interaction 回答攻防为何进入下一层；
8. 环境先作为动作机会参与设计，再由 V1 继承状态；
9. Choreography Profile 只维护少量稳定原型；
10. Signature Moment 是少量 Sequence 级记忆点；影视参考用于抽象机制，不复制完整动作；
11. Pattern Library 轻量索引、按需加载；Pattern 与 Source Case 分层；
12. Camera Complexity 与动作 / 空间复杂度共享有限执行预算；高动作复杂度优先可读性；
13. Battle Beat 不使用固定 `2–4` 节点动作锚点；Action Sufficiency Check 防止动作不足；
14. Combat Contact Solidity 适用于所有主要接触形式，不同 Contact Modality 使用不同实感证据；
15. 优秀动作戏追求高信息密度而非少元素；清晰来自层级、因果、Phrase 结构和镜头组织；
16. State Machine Internalized, Choreography Externalized；Final Prompt 由正向动作语言主导；
17. Combat 回归同时包含静态结构与真实成片质量回归，并评价 Prompt Intent → Generated Result Gap；
18. Golden Scenario 采用 Fixed Input + Quality Contract + Failure Contract + Optional Test Anchor，锁质量不锁创意；
19. Combat Core 只定义跨战斗形式稳定成立的机制 / 质量合同；Modern / Wuxia / Weapon 等专项层负责具体表现，不允许专项反向污染 Core；
20. Combat Reference 采用两阶段按需加载：先形成 Planning Context，再只展开少量高价值叶子知识；索引用于选择，正文用于执行；
21. Model Combat Capability Contract 为动作 / 镜头 / 多人 / 接触复杂度预算提供模型侧输入；模型能力只能改变实现路径，不能擅自降低已确定的 Combat Intent / Coverage / 观看目标，并由 Golden Benchmark 持续校准；
22. Quick 与 Interactive 共享同一 Combat Planning Graph、质量标准与验证链；Quick 完整规划但静默解决低风险决策，Interactive 只暴露高影响、低置信度的真实分叉；
23. Combat Audio Choreography 作为轻量协同质量层参与 Phrase 节奏、Contact Solidity、身体 / 呼吸、武器材质、环境空间与 Signature Moment；Audio Accent Density 不等于 Action Density，声音强调必须有层级且不能替代动作设计；
24. Combat Choreography Engine 归属于 `action-combat-video` Task；Task 负责领域导演流程，Controls 只提供跨任务通用能力，Libraries 只提供专业知识，不新增独立 Combat Choreography Control；
25. Task 内新增 `choreography-playbook.md`：`core-playbook.md` 回归 State / Continuity / Battle Runtime Skeleton，`choreography-playbook.md` 承载 V2 动作导演逻辑，Modern / Wuxia 只做专项实例化；
26. Combat Planning / Final Preflight Gate 让已有质量规则拥有输出否决权；规划顺序、Action Sufficiency、Character Identity、Tactical Externalization、Contact、Kinetic Scope、Action Language 与 Negative Discipline 不通过时必须内部重写；
27. Combat Kinetic Scope 与 Coverage / Exchange Depth 并列检查动作充分性；高 Coverage 不能掩盖 Upper-body Combat Lock，运动尺度强调全身协同、空间 / Range / Axis 变化和 Contact-driven Displacement，而不是固定动作配额。

## 40. 已确认决策记录

| # | 决策 | 当前结论 |
|---|---|---|
| V2-01 | 核心升级 | 新增 Combat Choreography Engine，保留 V1 State / Continuity |
| V2-02 | 有效交战 | Active Combat Coverage：Low / Medium / High |
| V2-03 | 攻防节奏 | 重击 / 均衡 / 高速交换 / 混合型 |
| V2-04 | 动作单位 | 新增 Action Phrase |
| V2-05 | 角色打法 | 新增 Combat Character Identity |
| V2-06 | 整场动作观感 | Cinematic Choreography Profile，不进入视觉 Styles |
| V2-07 | Interactive | Combat 专属决策链，上游驱动下游推荐 |
| V2-08 | 时间预算 | Setup / Active Exchange / Downtime / Ending |
| V2-09 | Phrase 复杂度 | Exchange Depth 动态控制 |
| V2-10 | Beat / Phrase | 动态一对多 |
| V2-11 | 中文术语 | 中文统一“动作编排 / 动作导演” |
| V2-12 | Identity 来源 | 不建角色 / 职业画像库，动态推导 |
| V2-13 | Choreography Library | 少量稳定基础 Profile |
| V2-14 | Environment | Environment Action Affordance |
| V2-15 | Signature Moment | Sequence 级显式记忆点；15 秒默认 1 个主记忆点 |
| V2-16 | 影视参考组织 | Pattern 为一级，影视作品是来源案例 |
| V2-17 | Pattern 数据结构 | 抽象因果骨架 + 适用条件 + 可变化参数 + 案例证据 |
| V2-18 | Pattern 加载架构 | 轻量 `index.md` → 按需加载 1–3 个 Pattern → source-cases 默认不加载 |
| V2-19 | Pattern / Source Case 分层 | `patterns/` 存生产知识；`source-cases/` 存研究证据 |
| V2-20 | Tactical Interaction | 假动作、试探、诱导、预判、Counter-to-Counter 等作为 Phrase 可选战术因果层 |
| V2-21 | Camera Readability Budget | Camera Complexity 与动作 / 空间复杂度共享执行预算 |
| V2-22 | Action Execution Budget | 废除 Battle Beat 全局 `2–4` 交互节点锚点；改为 Phrase 级动态执行预算，并增加 Action Sufficiency Check |
| V2-23 | Combat Contact Solidity | 全战斗接触共享 Contact 实感链，并按 Contact Modality 适配 |
| V2-24 | Clarity Through Structure | 正式替换“宁少而清晰”；高信息密度通过结构保证清晰 |
| V2-25 | Final Prompt 输出原则 | 状态机内化、动作编排外显；最小化状态术语与无根据 Negative Constraints |
| V2-26 | Combat Quality Benchmark | 静态结构回归 + 真实成片质量回归；评价 Prompt→成片执行差距 |
| V2-27 | Golden Scenario Contract | Fixed Input + Quality Contract + Failure Contract + Optional Test Anchor；锁质量不锁创意 |
| V2-28 | Core / 专项边界 | Combat Core 定义通用机制与质量合同；Modern / Wuxia / Weapon 等专项层实例化动作语言、物理尺度、节奏和 Contact 表现，禁止专项反向污染 Core |
| V2-29 | Runtime Reference Loading | 两阶段按需加载：Core / 专项 Playbook / 轻量索引先形成 Combat Planning Context，再按默认约 2 个主要 Library Detail Slot 展开最需要的叶子知识；专业执行知识优先于创意增强知识 |
| V2-30 | Model Combat Capability Contract | Model Adapter 用统一轻量能力合同向 Choreography Engine 提供 Motion / Multi-character / Contact / Spatial / Camera / Temporal 能力与 Known Risks；用于调整执行复杂度而不偷改用户导演意图，并由 Golden Benchmark 实测持续校准 |
| V2-31 | Quick / Interactive 统一规划 | Quick 与 Interactive 共享同一 Combat Planning Graph、动作引擎、质量标准与验证链；Quick 完整规划并静默解决低风险决策，Interactive 只把高影响、低置信度分叉暴露给用户，模式不同不代表质量等级不同 |
| V2-32 | Combat Audio Choreography | 在 V1 三线同步基础上增加轻量战斗声音编排；声音参与 Phrase 节奏、Contact 实感、身体 / 呼吸、武器材质、环境空间和 Signature Moment，强调密度不等于动作密度，不机械堆音效，也不替代动作本身 |
| V2-33 | Combat Engine 实现归属 | Combat Choreography Engine 归属于 `action-combat-video` Task，不新增一级 Combat Choreography Control；Task 统筹领域导演流程，现有 Controls 继续提供跨任务通用能力，Libraries 只承载专业知识 |
| V2-34 | Task 内 Playbook 拆分 | 新增 `choreography-playbook.md` 承载 V2 动作导演逻辑；`core-playbook.md` 回归 State / Continuity / Battle 骨架；Modern / Wuxia Playbook 只负责专项实例化 |
| V2-35 | Combat Planning / Final Preflight Gate | 规划阶段与最终输出阶段增加强制 Gate；已有质量机制不通过时内部重排 / 重写，不允许直接交付，也不默认把失败转成用户追问 |
| V2-36 | Combat Kinetic Scope | 新增战斗运动尺度；与 Coverage / Exchange Depth 并列检查 Whole-body Engagement、Spatial Mobility、Level / Axis、Contact-driven Displacement、Environment Flow、Camera Mobility Coupling 与 Temporal Action Packing；识别 Upper-body Combat Lock / Kinetic Underfill |

## 41. 实测反馈后的待继续 Grill Me 设计树

1. **Camera Mobility Coupling**：明确 `Camera Complexity` 与 `Camera Mobility` 的区别，解决“为了稳定可读把稳定镜头误实现成近似固定镜头”的问题；
2. 上述问题确认后，再把 V2-35 / V2-36 映射进 Choreography Playbook、Prompt Assembly、Interactive Contract、Diagnostics 与 Regression / Golden Benchmark，并重新执行静态 Gate 与真实成片测试。

## 42. 当前阶段结论

V2 在第一次真实交互与成片测试后进入“基于成片反馈继续校准”的阶段。现有 Coverage / Exchange Depth / Contact / Camera Readability 等机制仍然成立，但新增两条重要结论：

- **质量规则必须有 Preflight 否决权，不能只存在于 Reference 中；**
- **战斗是否真正“打起来”不能只看时间占比和攻防层数，还必须看全身与空间运动尺度。**

当前最需要继续确认的是 Camera Mobility Coupling：如何保持复杂动作的可读性，同时让镜头真正跟随人物的空间战斗，而不是退化成静态观察。

本文件继续作为 V2 Grill Me 的单一设计记录。

## 43. V2-37：Camera Mobility Coupling / 镜头运动耦合

真实成片确认了一个此前被 `Camera Readability Budget` 掩盖的实现风险：为了避免高密度动作中的 Camera Chaos，系统会主动降低 Camera Complexity，但运行时很容易把“降低复杂度”错误执行成“镜头尽量不动”。当人物本身又存在 Kinetic Underfill 时，最终会形成“人物原地上半身交手 + Camera 近似固定”的双重锁死。

因此正式把 **Camera Complexity** 与 **Camera Mobility** 拆成两个独立维度：

```text
Camera Complexity
→ 镜头方案有多少并行变化：切镜、环绕、焦段变化、机位重建、复杂组合运动

Camera Mobility
→ 摄影机是否随着人物真实 Position / Range / Axis / Route 变化持续移动与重构构图
```

两者不等价。

### 43.1 Stable ≠ Static

正式原则：

> **Stable Camera ≠ Static Camera.**  
> **稳定镜头不等于固定镜头。**

高 Coverage / 高 Exchange Depth / 高 Kinetic Scope 场景可以使用 **Low Camera Complexity + Medium / High Camera Mobility**：镜头运动方式保持简单、连续、可预测，但摄影机仍要主动跟随战斗空间变化。

典型可用行为包括：

- lateral tracking：双方沿空间横向切位时平稳侧跟；
- dolly back / forward：人物持续压进或拉开 Range 时随动；
- small arc：双方换角 / 改变身体轴线时小幅弧线移动；
- reframe：Position / Level / Primary Interaction 改变后及时重构画面；
- controlled push-in：Phrase Payoff / Signature Moment 需要时短促靠近；
- recovery to readable medium-wide：复杂交换恢复后重新建立双方完整身体关系。

这些不意味着必须全部使用；Camera Mobility 由当前战斗空间与动作因果触发。

### 43.2 Camera Mobility Coupling

Camera 不独立炫技，而与 Combat Kinetic Scope 耦合：

```text
Whole-body / Spatial / Range / Axis Change
        ↓
产生新的观察关系
        ↓
Camera 以简单连续路径 Track / Dolly / Arc / Reframe
        ↓
保持 Contact、脚步、重心与双方空间关系可读
```

当战斗真实发生明显 Position / Range / Axis 变化时，Camera 长时间停留在近似同一机位，不应因为“镜头稳定”而自动判为可读性优先。

反过来，如果当前 Phrase 本身是局部、重型、短时 Contact，人物空间变化很小，则 Camera 也不需要为了“有运镜”强行移动。

### 43.3 Camera Mobility Underfill

新增 Failure Signature：

> **Camera Mobility Underfill**

典型触发：

- Kinetic Scope 已规划明显换位，但 Camera 长时间近似固定；
- Prompt 使用“稳定 / 平稳 / 清楚”为由，把原本应发生的 tracking / reframe 全部压掉；
- 人物从桌侧打向通道、改变 Range 或绕位，但镜头只小幅摇摄甚至完全不跟；
- Camera 为维持固定构图，反向促使人物长期停在画面中央小区域；
- 高动作场景最终只有静态中景观察，没有真实电影摄影跟随感。

Preflight 中若发现上述情况，应优先调整 Camera Mobility，而不是先增加切镜、Shake 或复杂环绕。

### 43.4 与 Camera Readability Budget 的关系

Camera Readability Budget 继续成立，但需要修改理解方式：

```text
高动作 / 空间复杂度
→ 降低无必要 Camera Complexity
≠ 降低 Camera Mobility

高 Kinetic Scope
→ 需要相匹配的 Camera Mobility
→ 但运动方式尽量简单、连续、可读
```

因此动作越复杂，不代表镜头越静止；真正目标是：

> **减少不必要的镜头语言变化，同时保留跟随真实战斗空间所必需的摄影机运动。**

### 43.5 与 Final Preflight / Benchmark 的关系

Final Preflight 新增 Camera Mobility 检查：

- Kinetic Scope 明显较高但 Camera Mobility 明显不足，判不通过；
- `stable / readable` 不得作为长期 static framing 的充分理由；
- 优先通过一条简单连续 Camera Path 保持可读，而不是通过固定机位迫使动作缩小；
- 若目标模型对复杂运镜承载较弱，优先减少 Camera Complexity，而不是默认把 Mobility 降到 Low。

Golden Combat Benchmark 增加 **Camera Mobility Realization** 观察项，记录计划的空间换位与成片 Camera 跟随是否匹配。

### 43.6 已确认决策增量

| # | 决策 | 当前结论 |
|---|---|---|
| V2-37 | Camera Mobility Coupling | Camera Complexity 与 Camera Mobility 正式分离；Stable ≠ Static；高 Kinetic Scope 可采用低复杂度但中高 Mobility 的简单连续 Track / Dolly / Arc / Reframe，并用 Camera Mobility Underfill 拦截“人物换位但镜头长期不跟” |

本节确认后，§41 / §42 中“Camera Mobility Coupling 待确认”的旧状态由 V2-37 正式取代。下一项优先验证 **Temporal Action Packing**：是否需要把长时间窗的宏动作叙述改为更连续、更具因果密度的动作时间编码。

## 44. V2-38：Temporal Action Packing / 动作时间压缩密度

真实成片与 Prompt 复盘进一步确认：即使 Active Combat Coverage 较高，如果 Final Prompt 用 3–4 秒时间窗只描述一个宏动作，视频模型仍可能把这个宏事件慢慢铺满整个时间窗，形成“文字说高速，成片却是一两秒一个动作”的 **Temporal Combat Stretch / Action Underpacking**。

因此正式增加 **Temporal Action Packing / 动作时间压缩密度**，作为 Action Phrase 到 Final Prompt 时间编码之间的质量机制。它不规定每秒必须几拳、几脚，也不把动作拆成机械帧级清单；它检查的是：**一个 Active Exchange 时间窗里是否真正承载了一串前后因果连续的动作，而不是只有一个需要慢慢完成的宏事件。**

### 44.1 时间窗服务 Phrase，而不是把 Phrase 摊薄

Active Exchange 时间窗应优先组织为：

```text
当前动作产生后果
→ 对手立即响应
→ 响应改变 Position / Range / Axis / Contact
→ 下一动作从这个后果直接启动
→ 在同一连续窗口内形成局部 Payoff
```

例如“3 秒高速攻防”不能只写成“女方连续两次反制”；应明确为一段连续事件流，使前一个动作尚在产生后果时，下一个动作已经由该后果启动。

Final Prompt 可继续使用 `0–3s / 3–6s` 等时间锚点，但时间锚点只负责控制阶段与关键事件顺序，不应暗示“每个时间块只有一个独立动作”。

### 44.2 因果时间语言

高密度连续攻防应优先使用能够表达衔接关系的时间语言，例如：

- `同时 / 顺势 / 刚被偏开便 / 尚未站稳时 / 接触后立即 / 沿着前一动作的方向 / 在对手收势之前`；
- 动作 B 应明确由动作 A 的 Contact、Reaction、失衡、换位、开放线路或 Range 变化触发；
- 不鼓励大量“然后 / 随后 / 再做一个”式彼此独立的动作枚举。

这些词不是固定模板，核心是让动作时间关系可见、可执行。

### 44.3 Temporal Combat Stretch / Action Underpacking

新增 Failure Signature：

> **Temporal Combat Stretch / Action Underpacking**

典型触发：

- Prompt 标记“高速”，但 3–4 秒只承载一个主要动作事件；
- 一个抓、推、转身、撞击分别被拉成长时间独立事件；
- Action Phrase 逻辑上有多个步骤，但时间轴让每一步都拥有过长独立表演时间；
- High Coverage 只表现为“角色一直在动”，而单位时间真正发生的有效攻防交换很低；
- 模型频繁出现明显等待、停顿或动作完成后的缓冲，再进入下一动作。

一旦触发，Final Preflight 不允许仅因为 Coverage 达标而通过；应重新压缩时间组织、增加 Phrase 内因果衔接，必要时拆成多个连续但不停止交战的短 Phrase。

### 44.4 动态而非动作频率配额

Temporal Action Packing 由 Choreography Profile、Action Exchange Rhythm、Exchange Depth、Kinetic Scope、Contact Modality、Camera Readability 与 Model Capability 动态决定。

- 高手高速交换通常需要更高 Packing；
- 重型硬派型可以动作频率低一些，但接触、失衡、恢复与下一次进入必须仍然形成有效连续动作链；
- Grapple / Control 可以出现持续压力，但持续控制期间必须有杠杆、重心、支撑点或挣脱 / 再控制变化，而不是长时间静止抱住；
- 模型 Temporal / Prompt Following 较弱时，优先减少单 Phrase 同时复杂度并增加清楚的短 Phrase 衔接，不直接把整场动作稀释。

### 44.5 与 Preflight / Benchmark 的关系

Final Preflight 增加 **Temporal Action Packing** 检查；Golden Combat Benchmark 增加 **Temporal Packing Realization** 观察项，用于比较计划的连续动作密度与成片实际交换频率之间的落差。

原则：

> **时间轴用于组织连续动作，不用于给每一个动作分配独立表演槽。**

## 45. V2-39：Combat Action Interlock / Motion Handoff

真实成片继续暴露出比“动作太稀”更进一步的失败：即使同一时间窗已经包含多个动作，模型仍可能把它们执行成彼此隔离的片段——完成一个动作、回到近似中性姿态、再重新起手做下一个动作。最终呈现为约 1–2 秒一个独立动作，缺乏真正连续搏斗的运动感。

因此正式新增 **Combat Action Interlock / Motion Handoff / 战斗动作咬合与运动交接**。它把 Action Phrase 原有的“逻辑因果”提升为“运动状态继承”：**下一个动作应尽量从上一个动作正在形成的 Contact、Reaction、Momentum、Footwork、Body Axis、Range、Position 或 Environment State 中直接启动，而不是先归零再重新开始。**

### 45.1 Motion Handoff

连续动作至少应存在一种真实可见的状态继承，例如：

- **Contact Handoff**：格挡、抓控、碰撞形成的接触继续成为下一动作的支点或线路；
- **Momentum Handoff**：前冲、偏转、失衡、旋转或回收的动量被下一动作利用或反制；
- **Footwork Handoff**：前一步形成的新角度、支撑脚或追击路线直接启动后续动作；
- **Body Axis Handoff**：肩线、髋线、躯干旋转或重心偏移成为下一次进入 / 防守条件；
- **Range / Position Handoff**：前一动作造成的距离与站位变化直接决定下一动作，而不是重新拉回默认距离；
- **Reaction Handoff**：对手的防守、受击、失衡或恢复动作本身立即成为下一次 Counter / Re-counter 的窗口。

不要求每一步同时满足所有 Handoff；要求的是**下一动作真实继承当前身体与空间状态**。

### 45.2 限制不必要的 Neutral Reset

High Coverage、高手连续攻防、追击 / 反追击等场景中，**Neutral Reset / 中性归位应是稀缺且有意图的节奏事件**，而不是默认动作间隔。

允许的 Reset 示例：双方有意拉开、重新判断、剧情节奏需要短暂冷却、武器 / 空间条件发生真正重建。

不允许的默认模式：

```text
攻击
→ 完整收势
→ 双方站稳
→ 短暂停顿
→ 重新起架
→ 下一攻击
```

如果用户要求高速连续对决，这种模式反复出现即属于失败。

### 45.3 Phrase-to-Phrase Motion Handoff

Action Interlock 不只作用于 Phrase 内，也作用于 Phrase 之间。

前一个 Phrase 的 Payoff 应优先成为下一 Phrase 的 Entry Condition，例如：

```text
Phrase A Payoff
→ 对手被逼到桌角、右脚路线受限、身体轴线偏转
→ 不 Reset
→ Phrase B 直接利用该限制继续压入 / 反制
```

因此“多个 Phrase 无缝衔接”正式从抽象原则升级为可检查的 Motion Handoff 合同。

### 45.4 Action Segmentation / Excessive Neutral Reset

新增 Failure Signature：

> **Action Segmentation / Excessive Neutral Reset**

典型触发：

- 每 1–2 秒完成一个独立动作后明显停顿或重新起手；
- 格挡完成后先收手归位，再开始 Counter；
- 位移完成后先站稳，再重新发起攻击，而不是在位移形成的新角度中连续进入；
- Phrase 之间反复回到默认站位 / 默认 Range；
- Contact、Momentum、Footwork、Axis、Range 等前一状态没有被后续动作继承；
- Prompt 虽然写有多个动作，却主要依赖“然后 / 随后 / 再次”串联，缺乏同时、顺势、接触后直接转换等可见交接。

Final Preflight 发现该模式时，应优先重写动作衔接与 Phrase-to-Phrase Handoff，而不是只继续增加动作数量。

### 45.5 与 Temporal Packing / Kinetic Scope / State Engine 的关系

```text
Temporal Action Packing
→ 同一时间窗里不能太稀

Combat Action Interlock
→ 动作之间不能彼此隔离

Combat Kinetic Scope
→ 身体与空间运动不能长期锁死

State / Continuity Engine
→ 所有继承后的 Position / Range / Advantage / Condition 必须正确
```

四者分别解决不同问题，不能互相替代。

### 45.6 Preflight / Benchmark 增量

Final Preflight 正式增加：

```text
Temporal Action Packing
+ Combat Action Interlock / Motion Handoff
+ Neutral Reset Discipline
```

Golden Combat Benchmark 增加：

- **Temporal Packing Realization**；
- **Action Interlock / Motion Continuity Realization**；
- **Excessive Neutral Reset** Failure Contract。

对于 High Coverage + Expert Exchange 场景，成片若持续出现“一招一停、归位再打”，即使动作数量、Coverage 与 Contact Solidity 表面达标，也不能判为通过。

原则：

> **连续打斗不是把动作排得更近，而是让后一个动作从前一个动作的身体与空间状态里长出来。**

## 46. 实测反馈增量决策记录

| # | 决策 | 当前结论 |
|---|---|---|
| V2-38 | Temporal Action Packing | Active Exchange 时间窗必须承载连续因果动作流，禁止用长时间块只描述一个宏动作来假装高速；用 Temporal Combat Stretch / Action Underpacking 拦截动作被时间轴摊薄 |
| V2-39 | Combat Action Interlock / Motion Handoff | 动作与 Phrase 必须优先继承 Contact / Reaction / Momentum / Footwork / Body Axis / Range / Position 等当前运动状态；High Coverage / Expert Exchange 中 Neutral Reset 应稀缺，用 Action Segmentation / Excessive Neutral Reset 拦截“一招一停、归位再打” |

V2-38 / V2-39 确认后，下一步需要继续验证 **Final Prompt 的时间序列化方式本身是否会制造动作分段**：即高密度 Combat 是否仍应以多个彼此硬边界的时间块表达，还是改用“连续动作主链 + 少量软时间锚点”，让时间控制保留但不诱导模型把每个时间段当成独立动作场。

## 47. V2-40：Continuous Action Spine + Soft Time Anchors / 连续动作主链 + 软时间锚点

真实成片与 Prompt 序列化复盘进一步确认：高密度 Combat 即使已经满足 Temporal Action Packing 与 Motion Handoff，如果 Final Prompt 仍默认被切成多个 `0–1.5s / 1.5–4.5s / 4.5–7.5s ...` 的硬时间块，模型仍可能把每个块理解成独立动作单元，在时间边界处自动完成、停顿、归位，再进入下一组动作。

因此正式增加 **Continuous Action Spine + Soft Time Anchors / 连续动作主链 + 软时间锚点**，作为高密度 Combat 的默认 Final Prompt 时间序列化策略。

### 47.1 Continuous Action Spine

大部分 Active Exchange 不再默认拆成多个互相独立的硬时间盒，而应优先序列化为一条连续动作主链：

```text
首次接触
→ 连续 Counter / Re-counter
→ Position / Range / Axis 不断变化
→ Advantage Reversal
→ 不 Reset 地继续下一组 Phrase
→ Signature Moment / Major Payoff
→ Ending Transition
```

Action Spine 内必须保持 V2-39 的 Motion Handoff；前一个 Phrase 的 Payoff 优先直接成为下一 Phrase 的 Entry Condition。

### 47.2 Soft Time Anchors

时间仍然保留，但主要用于锁定少量真正重要的阶段 / 事件：

- Setup / First Contact；
- Major Advantage Reversal；
- Signature Moment / Major Payoff；
- Ending / Final Control；
- 用户明确要求的同步事件或模型必须严格遵守的关键时点。

这些时间锚点是**软边界**：它们用于约束“大约什么时候发生什么”，不意味着锚点前的动作必须完整收势，也不意味着锚点后的动作需要重新起手。

### 47.3 Hard Time Blocks 何时才值得使用

严格时间块不是全面废除。以下情况可以继续使用：

- 目标模型 / Model Adapter 明确证明严格时间轴执行更稳定；
- 多镜头任务需要精确 Shot 边界；
- 音乐 / 音频 / 对白 / 外部事件需要精确同步；
- 用户明确要求逐秒动作时间表；
- Benchmark 正在专门测试 Temporal Following。

即使使用 Hard Time Blocks，也必须额外声明跨块 Motion Handoff，禁止块边界自动成为 Neutral Reset。

### 47.4 Timeline-induced Action Segmentation

新增序列化级 Failure Signature：

> **Timeline-induced Action Segmentation / 时间轴诱导动作分段**

典型触发：

- 每个时间块内部有动作，但块与块之间明显归位 / 停顿；
- Prompt 的时间标题比动作因果更强，导致模型逐段“完成任务”；
- 同一 High Coverage Sequence 被切成多个独立小场景；
- Action Spine、Camera Path、Momentum 在时间块边界处反复中断；
- 删除硬时间标签后，动作连续性反而明显改善。

Final Preflight 如果识别到高密度 Combat 被时间序列化格式本身切碎，应优先改为 Continuous Action Spine + Soft Time Anchors，而不是继续在每个硬时间块内部增加动作。

### 47.5 与 Camera / Audio 的统一连续主链

Continuous Action Spine 不只约束 Action。高密度 Combat 中应尽量让：

```text
Action Motion Handoff
+ Camera Mobility Path
+ Audio Rhythm / Contact Evidence
```

共享同一连续事件流。

Camera 不应在每个软锚点自动停稳再重新启动；Audio 也不应把每个动作段机械做成独立“起—落”音效单元。只有真正的 Turning Event / Signature Moment / Ending 才值得获得更明显的节奏标点。

### 47.6 Model Adapter 边界

默认策略是 **连续性优先，时间精度次之**。但若目标模型已被 Golden Benchmark 证明更依赖明确时间戳，Model Adapter 可以选择更严格的时间表达；前提是不得因此重新引入 Action Segmentation / Excessive Neutral Reset。

原则：

> **时间码服从动作连续性，而不是动作服从时间码。**  
> **高密度 Combat 默认是一条连续事件流，时间锚点只负责定位关键转折。**

### 47.7 Preflight / Benchmark 增量

Final Preflight 增加：

- Continuous Action Spine 是否成立；
- Soft Time Anchors 是否被错误实现成 Hard Reset；
- Action / Camera / Audio 是否在时间边界保持连续；
- 是否触发 Timeline-induced Action Segmentation。

Golden Combat Benchmark 增加 **Continuous Action Spine Realization** 与 **Timeline-induced Segmentation** Failure Contract。

## 48. 实测反馈增量决策记录（二）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-40 | Continuous Action Spine + Soft Time Anchors | 高密度 Combat 默认用一条连续 Active Exchange 主链 + 少量 Setup / Advantage Reversal / Signature Moment / Ending 软时间锚点；严格时间块仅在模型、同步、多镜头、用户明确要求等场景使用，并不得让块边界成为 Neutral Reset |

V2-40 确认后，下一项优先验证 **Combat Intensity Curve / 节奏强度波形**：连续动作不能再被时间块切碎，但也不能因为追求“全程连续”而从头到尾保持同一速度、同一压力和同一视觉强度。

## 49. V2-41：Combat Intensity Curve / 战斗强度波形

真实成片校准进入下一层后，需要避免另一个极端：Combat 已经通过 Continuous Action Spine、Temporal Action Packing 与 Motion Handoff 实现“不断线”，但如果从首次接触到最终控制始终保持同一速度、同一交换密度、同一接触重量和同一空间压力，成片仍会显得机械、疲劳、没有电影动作戏的层次。

因此正式新增 **Combat Intensity Curve / 战斗强度波形**。它不等于 Active Combat Coverage，也不等于 Action Exchange Rhythm：

```text
Coverage
→ 有多少时间真正处于交战

Rhythm
→ 交战期间主要采用什么交换节奏 / 结构

Intensity Curve
→ 连续交战内部的压力、速度、重量、空间危险和表现强度如何动态起伏
```

### 49.1 强度不是“速度”单变量

Combat Intensity 由多个可组合维度共同形成：

- **Exchange Frequency**：单位时间有效攻防交换频率；
- **Contact Weight / Pressure**：接触重量、持续压力与身体负荷；
- **Advantage Pressure**：一方是否持续逼迫、封线、压缩空间或迫使对手被动应对；
- **Kinetic Scope**：空间移动、Range / Axis / Level 变化规模；
- **Exchange Depth / Tactical Complexity**：Counter / Re-counter 与战术博弈深度；
- **Environment Stakes**：环境是否提高限制、危险或路线压力；
- **Camera Proximity / Mobility Accent**：镜头是否在关键节点适度靠近、追随或重构观察关系；
- **Audio Accent / Body State**：关键 Contact、呼吸、环境反馈是否形成强弱层次。

因此“局部降速”不等于“强度下降”。例如重型压制、摔控僵持、刀尖威胁或狭窄空间封锁可以降低 Exchange Frequency，却同时显著提高 Contact Pressure / Advantage Pressure / Danger。

### 49.2 连续 Combat 中允许波峰波谷，但不允许无价值停战

Intensity Curve 的目标不是制造新的 Downtime，而是在 Active Combat 内部形成层次：

```text
连续快速交换
→ 压力增加 / Range 被压缩
→ 局部重型或高危险阶段
→ 通过 Counter / Reversal 改变优势
→ 再加速或扩大 Kinetic Scope
→ Signature Moment / Major Payoff 达到主要峰值
→ 短促 Ending Transition
```

以上只是结构示意，不是固定曲线模板。不同 Choreography Profile、Character Identity、Combat Branch、Duration 与结局可以采用不同波形；禁止把所有 15 秒战斗都套成相同“低→中→高”三段式。

### 49.3 Intensity Turning Point

约 15 秒电影化高手 1v1 默认应至少出现一个清楚的 **Intensity Turning Point**，它通常与以下事件之一发生耦合：

- Major Advantage Reversal；
- Contact Modality / Range 明显变化；
- Environment 开始真正限制或打开路线；
- Character Identity 的打法差异第一次产生明显后果；
- Signature Moment 前的压力重组。

Turning Point 不要求停顿；它应该主要通过动作压力、空间关系、Contact、节奏与 Camera / Audio Accent 的变化被观众感知。

### 49.4 Flat Combat Intensity

新增 Failure Signature：

> **Flat Combat Intensity / 战斗强度扁平化**

典型触发：

- 全程以近似相同速度、动作长度与交换频率推进；
- 所有 Contact 的感知重量几乎一样，没有轻重与压力层次；
- Advantage 虽然在文字状态里变化，但成片压力关系看不出来；
- Signature Moment 只是“又一个动作”，没有建立在前面强度变化之上；
- Camera / Audio 从头到尾同一强调级别，没有真正的层级；
- 为了保持 Continuous Action Spine，把所有局部压力变化错误压平成“全程高速”。

Final Preflight 发现上述问题时，应优先调整 Phrase 之间的速度 / 压力 / Range / Contact / Advantage / Camera-Audio Accent 组合，而不是通过增加停顿解决。

### 49.5 与 Continuous Action Spine / Coverage 的关系

```text
Continuous Action Spine
→ 保证战斗不断线

Temporal Action Packing
→ 保证单位时间不被摊薄

Action Interlock
→ 保证动作真正咬合

Combat Intensity Curve
→ 保证连续战斗内部仍有层次和高潮
```

因此“有波谷”不代表必须离开 Active Combat；波谷可以是更沉、更危险、更受限、更近身的压力阶段。

### 49.6 Preflight / Benchmark 增量

Final Preflight 增加：

- 是否存在可感知但不模板化的 Intensity Variation；
- 主要 Advantage Reversal / Signature Moment 是否拥有相应强度变化；
- 局部降速是否仍保持有效 Combat Pressure；
- 是否触发 Flat Combat Intensity。

Golden Combat Benchmark 增加 **Combat Intensity Curve Realization** 与 **Flat Combat Intensity** Failure Contract。

原则：

> **连续不等于匀速；高密度不等于全程同强度。**  
> **好的动作高潮来自压力的组织，而不是只把动作越堆越快。**

## 50. 实测反馈增量决策记录（三）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-41 | Combat Intensity Curve | 连续 Combat 内必须存在动态但非模板化的强度波形；强度由交换频率、Contact Weight、Advantage Pressure、Kinetic Scope、战术复杂度、环境、Camera / Audio 等共同形成；约 15 秒电影化高手战默认至少形成一次明确 Intensity Turning Point，并用 Flat Combat Intensity 拦截“全程同速、同密度、同压力” |

V2-41 确认后，下一项优先验证 **Advantage 是否应成为 Intensity Curve 的主要驱动之一**：不能只在内部 State 标记“男方占优 / 女方翻转”，而应让优势变化通过谁在逼迫、谁被迫换位、谁控制 Range / Axis / Environment 等可见压力变化真实表现出来。

## 51. V2-42：Visible Advantage Dynamics / 可见优势动态

真实成片与 Prompt 复盘进一步确认：Combat State / Continuity Engine 即使正确维护了 `Advantage`，如果最终动作只表现成“这一轮男方出招、下一轮女方出招”，观众仍然看不到谁真正控制了局势。优势不能只存在于内部 State 标签里，也不能只靠“男方占据上风 / 女方完成逆转”这样的叙述说明。

因此正式新增 **Visible Advantage Dynamics / 可见优势动态**。`Advantage` 继续由 State Engine 维护，但主要优势变化必须通过可见的动作压力与空间控制外显。

### 51.1 Advantage 的可见证据

可见优势至少可以通过以下一种或多种方式表现：

- **Attack Initiative**：谁更持续地主动发起、迫使对手响应，而不是轮流各打一招；
- **Forced Defense**：谁让对方连续进入格挡、闪避、撤步、恢复或被迫重新构形；
- **Range Control**：谁决定当前距离，是压入、拉开、卡在危险距离还是迫使对方无法进入理想 Range；
- **Angle / Axis Control**：谁通过脚步、身体轴线、Threat Line、兵器路线等控制更有利角度；
- **Route / Position Control**：谁迫使对方沿特定路线移动、压缩退路、封住出口或控制核心空间；
- **Environment Control**：谁更有效利用桌边、墙体、通道、家具、地形等限制 / 打开动作路线；
- **Recovery Burden**：谁迫使对方花更多动作去恢复重心、重新站位、解除控制或重新获得攻击窗口。

这些不是固定打分项；不同 Combat Branch / Profile / Weapon / Grapple 场景可以用不同组合体现优势。

### 51.2 Advantage Reversal 必须改变主动关系

Major Advantage Reversal 不能只写成“女方扭转局势”。它至少应使一种可见控制关系发生真实变化，例如：

```text
男方持续压缩 Range / Route
→ 女方制造 Forced Response
→ 男方身体轴线或位置被迫改变
→ 女方第一次重新获得主动攻击窗口
→ 男方从连续逼迫转为被迫防守 / 后退 / 重新抢位
```

逆转后的下一组 Action Phrase 应继承新的 Advantage State，而不是双方马上回到对称中性站位。

### 51.3 Advantage 与 Combat Intensity Curve

`Advantage Pressure` 是 Combat Intensity Curve 的主要驱动之一，但不是唯一驱动。

- 一方持续控制 Initiative / Range / Route 时，即使动作速度下降，强度仍可因为压力上升而提高；
- Advantage Reversal 往往适合作为 Intensity Turning Point；
- Signature Moment 可以建立在优势长期积累后的突然翻转，也可以建立在优势方进一步扩大控制后的高峰；
- 禁止把每次 Advantage 变化都做成相同的强度峰值，避免模板化。

### 51.4 Invisible Advantage / Nominal Reversal

新增 Failure Signature：

> **Invisible Advantage / Nominal Reversal / 不可见优势 / 名义逆转**

典型触发：

- Prompt 写“男方占优 / 女方逆转”，但 Attack Initiative、Range、Position、Route、Environment 等关系没有明显改变；
- 双方只是轮流出招，谁都没有真正迫使对方做出被动响应；
- Advantage State 在内部频繁变化，但成片看起来始终势均力敌或始终无压力差；
- 所谓 Reversal 只是一方终于打中一次，并没有改变后续主动权；
- 逆转后双方立即回到默认距离 / 默认站位，前面的状态变化没有继承；
- Camera / Audio 通过强调“假装逆转”，但动作本身没有控制权变化。

Final Preflight 发现上述问题时，应重写 Advantage 前后的 Action Phrase 与 Motion Handoff，优先让主动权、Range / Route / Position / Environment Control 的变化真实可见，而不是增加“局势逆转”说明文字。

### 51.5 与 Preflight / Benchmark 的关系

Final Preflight 增加：

- 主要 Advantage State 是否拥有至少一种可见控制证据；
- Major Reversal 是否真实改变主动关系；
- Advantage 变化是否通过后续 Motion Handoff 被继承；
- 是否触发 Invisible Advantage / Nominal Reversal。

Golden Combat Benchmark 增加 **Visible Advantage Dynamics Realization** 与 **Nominal Reversal** Failure Contract。

原则：

> **优势不是“谁下一招轮到攻击”，而是谁正在迫使对方按自己的节奏、距离和路线作战。**  
> **Reversal 不是一句“局势翻转”，而是控制权发生了观众能看见的转移。**

## 52. 实测反馈增量决策记录（四）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-42 | Visible Advantage Dynamics | Advantage 必须通过 Attack Initiative、Forced Defense、Range / Angle / Route / Position / Environment Control、Recovery Burden 等动作事实外显；Major Advantage Reversal 必须真实改变至少一类战斗控制权，并用 Invisible Advantage / Nominal Reversal 拦截“文字说逆转、动作压力没变化” |

V2-42 确认后，下一项优先验证 **Initiative Handoff / 主动权交接**：避免 Visible Advantage 最后仍被实现成“轮流各出一招”，需要进一步明确主动权如何在 Counter / Re-counter / Forced Response 中被抢夺、维持和转移。

## 53. V2-43：Initiative Handoff / 主动权交接

Visible Advantage 进一步校准后，需要解决一个更细但直接影响连续打斗观感的问题：即使系统已经知道谁整体占优，Action Phrase 仍可能被执行成“甲完整打一段 → 停 → 乙完整打一段 → 停”的轮流表演。这样的成片表面上有 Counter / Re-counter，实际上没有真正发生主动权争夺。

因此正式新增 **Initiative Handoff / 主动权交接**。它描述的是当前瞬间“谁正在迫使对方响应”，与持续一段时间的 `Advantage` 区分：

```text
Advantage
→ 一段时间里谁更持续地控制局势、Range、Route、Pressure

Initiative
→ 当前这一瞬间谁在驱动动作因果、迫使对手做出响应
```

一个角色可以总体处于劣势，但短暂抢到 Initiative；也可以总体占优，却在某次 Counter 中瞬间失去主动权。

### 53.1 主动权应在动作过程中被抢走

高手连续攻防、Counter / Re-counter、Forced Response 场景中，Initiative Handoff 优先发生在动作尚未完全结束时，例如：

- **Interception**：防守方在攻击线路尚未完成时截断、偏转或占住线路，使原进攻方被迫改动作；
- **Forced Response**：原防守方通过 Contact / Threat / Position 变化迫使进攻方立刻转入防守或恢复；
- **Line / Axis Control**：通过身体轴线、Threat Line、Weapon Line、角度或脚步抢先占据后续动作通道；
- **Range Capture**：在对手进入或退出 Range 的过程中直接接管理想距离；
- **Contact Handoff**：格挡 / 抓控 / 碰撞本身不结束，而直接转为下一次控制、反击或 Re-counter 的支点；
- **Recovery Attack Window**：对手尚在失衡、收势、重新站位时，另一方直接接管主动权。

核心不是动作速度，而是：**主动权转移发生在同一连续运动链里，而不是等前一个人的动作完整结束。**

### 53.2 Initiative Handoff 与 Action Interlock

`Combat Action Interlock / Motion Handoff` 回答“后一个动作是否继承前一个身体与空间状态”；`Initiative Handoff` 回答“在这条继承链里，谁正在迫使谁响应”。

```text
Motion Handoff
→ 保证动作不断线

Initiative Handoff
→ 保证控制动作因果的人可以在链内动态切换
```

因此一次高质量 Counter 不只是“B 在 A 之后攻击”，而应体现：A 的攻击仍在形成 → B 截断 / 改变它 → A 被迫应对 → Initiative 已转到 B。

### 53.3 Turn-taking Combat / Initiative Segmentation

新增 Failure Signature：

> **Turn-taking Combat / Initiative Segmentation / 轮流式战斗 / 主动权分段**

典型触发：

- 甲完整完成一组攻击，停下后才轮到乙攻击；
- Counter 只表现为“对方打完以后我再打”，没有在对方动作过程中夺取 Initiative；
- 双方拥有整齐、对称、互不打断的独立攻击回合；
- Re-counter 实际上只是第二轮独立攻击，没有 Contact / Range / Axis / Recovery Window 的继承；
- Final Prompt 频繁使用“男方完成攻击后，女方开始反击”这类轮次式序列；
- 成片像动作排练轮番展示，而不是双方实时争夺主动权。

Final Preflight 触发该模式时，应优先重写 Counter / Re-counter / Forced Response 的衔接，使 Initiative 在动作尚未完成时发生真实转移，而不是简单增加更多攻击回合。

### 53.4 与 Visible Advantage / Intensity Curve 的关系

- `Initiative` 是瞬时控制权；`Advantage` 是更持续的局势控制；
- 连续获得 Initiative 往往会积累成 Visible Advantage，但不要求每次短暂 Initiative Handoff 都改变整体 Advantage；
- 重要 Initiative Handoff 可以构成 Intensity Turning Point 或 Advantage Reversal 的微观机制；
- Signature Moment 可以建立在一次非常清楚的 Initiative Theft / Initiative Recovery 上，但禁止机械化固定套路。

### 53.5 Preflight / Benchmark 增量

Final Preflight 增加：

- 高手连续攻防中是否存在真正的 Initiative Handoff；
- Counter / Re-counter 是否在对手动作过程中发生，而不是轮流回合；
- Initiative 转移是否通过 Contact / Range / Axis / Position / Recovery Window 等可见动作成立；
- 是否触发 Turn-taking Combat / Initiative Segmentation。

Golden Combat Benchmark 增加 **Initiative Handoff Realization** 与 **Turn-taking Combat** Failure Contract。

原则：

> **高手交手不是轮流出招，而是在同一条连续动作链里不断抢走对方的行动权。**  
> **Counter 的关键不是“我接下来攻击”，而是“你的攻击还没结束，我已经迫使你开始应对我”。**

## 54. 实测反馈增量决策记录（五）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-43 | Initiative Handoff | Initiative 与 Advantage 分离；高手连续攻防中的主动权优先在动作尚未结束时通过 Interception、Forced Response、Line / Axis Control、Range Capture、Contact Handoff、Recovery Window 等方式转移；用 Turn-taking Combat / Initiative Segmentation 拦截“你打一段、我打一段”的轮流式战斗 |

## 55. V2-44：Initiative Handoff 受 Combat Character Identity 约束

确认：Initiative Handoff 不应让所有高手都使用同一种“格挡后反击 / 截断后抢攻”逻辑。角色抢夺、维持或夺回主动权的方式，应受当前 Combat Character Identity 约束。

可见差异可以来自：

- 侧切 / 角度截断；
- 封线 / 路线压迫；
- Range Capture；
- Contact Control；
- Forced Response；
- 节奏破坏；
- 诱导反应；
- Recovery Window 利用。

这些只是动态动作倾向，不建立封闭字段或职业模板。

特别禁止：仅凭性别、年龄、外貌或体型直接映射打法。例如“年轻女性 = 速度 / 闪避”“矮胖年长男性 = 力量 / 抓控”都不能作为默认 Character Identity 结论。体型与年龄可以作为能力 / 运动约束输入，但必须与 Combat Intent、经验、对手、环境和 Profile 一起推导，且应允许完全不同但仍合理的打法。

V2-44 不新增独立 Initiative State Machine，也不新增 Interactive 固定问题；它是 V2-05 Character Identity 与 V2-43 Initiative Handoff 的连接规则。

Failure Signature 可使用：

> **Homogeneous Initiative Style / Identity-by-Demographic Shortcut**

当双方长期使用同一种抢主动方式，或角色打法主要由性别 / 年龄 / 体型快捷映射时，Final Preflight 应重写具体动作选择。

## 56. V2-45：Runtime Consolidation / Anti-overdesign Policy

真实交互与成片反馈同时暴露另一类风险：持续为每一种局部失败新增一级机制、状态字段、问卷或独立模块，会显著增加 Runtime 认知负担，并可能让模型把更多注意力花在 Meta 规则而不是具体动作构造上。

因此正式确认 **Runtime Consolidation / Anti-overdesign Policy**：

- 暂停继续纵向增加 Combat 一级抽象机制；
- V2-35～V2-44 在 Runtime 中优先合并成少数高杠杆执行合同，而不是一项设计对应一个子系统；
- Failure Signature 主要服务 Preflight / Diagnostic / Benchmark，不等于每个 Failure 都创建独立 Diagnostic / Control / State；
- Action Combat 的 A. 动作本体机制层暂时冻结；
- 下一阶段若接线已经正确但动作仍贫乏，优先审计 **Concrete Choreography Knowledge**：Fighting / Martial / Weapon 是否能提供丰富、可组合、全身化、跨 Range / Transition 的具体动作知识；
- 新术语只有在它能改变 Planning、Action Phrase 或 Final Prompt 行为时才进入 Runtime 真源；
- 如果一个新增规则只能产生更多解释文字而不能改善实际 Prompt / 成片，应合并、降级为检查项或删除。

推荐的 Runtime 合并方向：

```text
Temporal / Continuity Flow Contract
→ Temporal Packing + Motion Handoff + Continuous Action Spine

Pressure / Control Choreography Check
→ Intensity + Visible Advantage + Initiative

Action Sufficiency
→ Coverage + Exchange Depth + Kinetic Scope
```

这些是实现组织建议，不重新定义各设计概念的语义边界。

原则：

> **机制可以在 Spec 中细分，运行时概念必须保持少而高杠杆。**  
> **设计服务动作生成，不让模型为设计术语服务。**

## 57. 实测反馈增量决策记录（六）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-44 | Initiative × Character Identity | Initiative 抢夺 / 维持方式受 Character Identity 约束；禁止按性别 / 年龄 / 体型快捷映射固定打法；作为连接规则，不新增大型状态机或固定问卷 |
| V2-45 | Runtime Consolidation / Anti-overdesign | 暂停纵向扩展一级机制；Failure Signature 不等于独立模块；动作本体机制层暂时冻结，后续优先做 Concrete Choreography Knowledge 与强制运行链审计 |

当前阶段正式从“继续 Grill 新机制”切换为：

> **Spec → Implementation Plan → File Mapping → Prompt-level Regression → Generated Video Benchmark**

在该链条重新打通前，不继续新增 Combat 一级抽象设计。

## 58. V2-46：Action Continuity ≠ Shot Continuity / 动作连续性与镜头连续性解耦

第二轮 Prompt-level 回归暴露出 Camera 侧新的横向问题：为修复“高密度动作看不清、Camera 近似静止”，Runtime 逐渐形成了“中全景 / 中景 + 简单连续 tracking”为默认安全方案。该方向能提升空间可读性，但如果进一步把 `Continuous Action Spine` 误解为“摄影镜头也必须连续”，会让真正动作电影常见的近景、特写、脚步 / 手部 / 武器 Insert、Impact Shot、Reaction Shot 与快速连续剪辑被压掉，最终形成 Camera 风格固化。

因此正式确认：

> **Action Continuity ≠ Shot Continuity.**  
> **动作连续不等于摄影镜头必须连续。**

`Continuous Action Spine` 只保证战斗动作、状态、Contact、Momentum、Position / Range / Axis 与因果不断线；它不要求整段使用一条物理连续 Camera Path，也不要求 15 秒 Combat 必须一镜到底。

### 58.1 Combat Camera Coverage 是动态观察策略

电影化 Combat 可以根据当前动作信息动态使用：

- Master / Establishing Shot：交代双方位置、Range、空间与动作方向；
- Medium / Medium-wide Relationship Shot：展示主要攻防关系与身体动作；
- Close-up / Extreme Close-up：拳脚、武器、接触点、眼神、受击 / 反应等关键局部；
- Insert Shot：脚步、支撑脚、手部、握持、刀锋、枪械、环境物件等动作信息；
- Reaction Shot：角色对关键 Contact、Threat、Advantage Reversal 的即时反应；
- Impact Shot：关键 Contact / Phrase Payoff / Signature Moment 的短促冲击视角；
- Re-establish Shot：局部特写或复杂 Cut 后重新确认 Position / Range / Axis。

以上不是固定镜头清单，更不建立“每场必须几个特写 / 几个全景”的配额。实际 Coverage 由动作内容、空间复杂度、Contact Modality、Weapon / Environment 信息、情绪重点与模型能力动态决定。

### 58.2 Cut 可以存在，Action State 不能 Reset

跨镜剪辑时，必须继承动作状态：

```text
Position / Left-Right Relationship
+ Action Direction
+ Contact State
+ Momentum
+ Body / Weapon Axis
+ Range
+ Initiative / Advantage Consequence
```

例如：

```text
中全景：A 侧切，B 封线
→ CUT：前臂 Contact 特写
→ CUT：低机位脚步 Insert，B 前脚封住出口
→ CUT：中近景，A 肩轴被迫转开
→ CUT：双人中景，A 顺转轴完成 Counter
```

摄影发生 Cut，但战斗仍是一条连续 Action Spine；禁止 Cut 后双方回到默认距离、默认站姿或重新起手。

### 58.3 Camera Readability 不等于少用特写

Camera Readability 的目标是：**观众始终能理解动作因果与空间关系**，而不是强制完整身体全程可见。

局部特写本身不是问题；失败发生在：

- 长时间只拍局部，观众失去双方位置 / Range；
- Cut 前后 Action Direction / Axis 不连续；
- 特写把 Contact 与真实身体发力拆开，形成“假打”；
- 过度 Insert / Reaction 使 Active Combat 被剪碎；
- 为了防止上述问题反向禁止特写与镜头切换。

因此正确策略是：

> **允许局部强化，但用 Master / Relationship / Re-establish 保持空间锚点。**

### 58.4 与 Camera Complexity / Camera Mobility 的关系

V2-37 继续成立，但不再把 Combat Camera 默认收敛为单一连续跟拍：

```text
Camera Mobility
→ 单个 Shot 内摄影机如何跟随真实战斗空间

Shot Scale / Editorial Coverage
→ 整段 Combat 用哪些观察距离与 Cut 来强调动作信息
```

高动作复杂度时仍应限制无必要 Camera Chaos，但“降低 Camera Complexity”不能等价为：

- 全程中全景；
- 全程一个机位；
- 全程只有 tracking / dolly；
- 禁止 Close-up / Insert / Cut。

可以出现 **低到中等 Camera Complexity + 有目的的 Shot Scale Variation / Editorial Coverage**。

### 58.5 `single-shot-video` 的语义边界

`single-shot-video-template` 在本 Skill 中表示“单一视频生成单元 / 单一主要观看任务”，不自动表示电影剪辑术语中的“一镜到底”。

除非用户明确要求 long take / one-take / 一镜到底，或目标模型 / 输入形式要求严格单镜头连续摄影，否则单段 15 秒 Combat 可以包含内部 Cut / Insert / Reaction / Impact Coverage。

### 58.6 Failure Signature

新增 Camera 侧 Failure Signature：

> **Combat Camera Coverage Lock / Medium-wide Overconstraint**

典型触发：

- 高密度 Combat 全程几乎只有中全景 / 中景；
- 为保证动作可读性，系统性排斥 Contact / Weapon / Footwork / Reaction 特写；
- 所有镜头变化只剩轻微 push / track / arc，没有真正的 Shot Scale Variation；
- `Continuous Action Spine` 被错误解释成“不能 Cut”；
- Prompt 明显具有动作电影目标，却仍采用近似观察纪录式的单一景别覆盖。

Preflight 发现该问题时，应优先重新设计 **Camera Coverage**，而不是增加无意义镜头数量。

### 58.7 Benchmark / 实施边界

Prompt-level Regression 增加：

- Action Continuity 与 Shot Continuity 是否被正确区分；
- Camera 是否根据动作信息允许适量 Shot Scale Variation；
- Close-up / Insert / Reaction / Impact Shot 是否有明确动作信息价值；
- Cut 后 Position / Direction / Contact / Momentum / Axis 是否连续；
- 是否触发 Combat Camera Coverage Lock。

该决策属于 Camera 横向缺口修正，不推翻 V2-45 的 Anti-overdesign：Runtime 应优先把它并入既有 Camera Readability / Mobility / Prompt Assembly 合同，而不是建立新的 Combat Camera 引擎。

原则：

> **动作必须连续，镜头可以剪。**  
> **可读性来自空间锚点和剪辑连续性，不来自全程中全景。**  
> **真正的电影动作摄影可以在 Master、Relationship、Close-up、Insert、Impact、Reaction 与 Re-establish 之间动态切换。**

## 59. 实测反馈增量决策记录（七）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-46 | Action Continuity ≠ Shot Continuity | Continuous Action Spine 只约束战斗动作 / 状态 / 因果不断线，不要求摄影机物理路径或单镜头连续；Combat 可动态使用 Master / Medium / Close-up / Extreme Close-up / Insert / Reaction / Impact / Re-establish 与 Cut，跨镜必须继承 Position / Direction / Contact / Momentum / Axis / Range；取消高密度 Combat 默认“中全景连续跟拍”为唯一安全解法 |

## 60. V2-47：Interactive High-value Question Budget / 高价值问题预算

最新 Interactive 回归确认：**问答轮数本身不是质量问题。** 对复杂动作视频，4 轮、5 轮、6 轮甚至更多都可以是合理的，只要每一轮都在减少真正会改变成片的高影响不确定性。反过来，如果为了“效率”机械追求最少问题，也可能让系统静默猜掉用户真正关心的导演分叉。

因此正式确认：

> **High-value Questions, Not Minimum Questions.**  
> **追求高价值问题覆盖，不追求最少问题。**

### 60.1 动态轮数，不设固定完成轮数

Interactive 不设置“必须问 4 轮 / 6 轮”等固定完成模板。

每次准备继续追问前，当前候选问题必须同时满足：

```text
用户尚未明确
+ 系统无法高置信度代替用户决定
+ 不同答案会显著改变最终视频
+ 该问题优先级高于剩余未确认项
```

只有同时满足，才值得继续问。

因此：

- 可能 2–3 轮已经足够；
- 4–6 轮在复杂动作 / 叙事任务中完全合理；
- 必要时可以继续到更深轮次；
- 只要当前需求已经形成完整可执行导演方案，就应立即收口；
- 不得为了走完整个 Planning Graph 或“显得专业”而继续机械追问。

### 60.2 10 轮 Safety Cap

Interactive 默认设置 **最多 10 轮追问** 作为上限保护。

这不是目标轮数，也不是必须问满：

- 前 4–6 轮甚至更少已经足够时，立即提前收口；
- 到达第 10 轮后，不再新增用户问题；
- 剩余低风险 / 次要不确定项按当前上下文与系统推荐静默补全；
- 如果仍有会导致方案无法执行的核心冲突，原则上应在更早的高价值问题中暴露，而不是拖到第 10 轮之后。

### 60.3 收口由需求完整度驱动

Interactive 的真正完成条件是：

> **当前已确认信息是否足以形成完整、可执行、符合用户意图的导演方案。**

不是：

- 问到了某个固定轮数；
- Planning Graph 每个节点都问过；
- Camera / Contact / Kinetic / Preflight 等内部质量机制都让用户回答过。

如果剩余节点可以高置信度静默补全，或者继续追问只影响轻微细节，应立即收口并进入完整内部 Planning / Prompt Assembly / Final Preflight。

### 60.4 与 Quick / Interactive 的关系

Quick 与 Interactive 继续共享同一 Planning Graph 与质量上限：

```text
Quick
→ Full Planning + Silent Resolution

Interactive
→ Full Planning + Selective High-value Decision Exposure
```

Interactive 的价值是让用户参与真正重要的创作分叉，不是通过更多问题提高质量等级，也不是通过更少问题提高效率指标。

### 60.5 Regression 观察

Interactive Regression 不以“问题轮数多少”直接判 PASS / FAIL，而观察：

- 每一轮是否对应真实高影响分叉；
- 是否存在重复询问；
- 是否把基础质量机制误做成用户问卷；
- 需求已经完整后是否仍继续追问；
- 是否为了减少问题而跳过用户必须决定的重要分叉；
- 是否在 10 轮 Safety Cap 内自然收口。

原则：

> **问题可以多，但不能低价值。**  
> **需求一旦完整，就停止追问。**  
> **10 轮是防止无限追问的护栏，不是交互目标。**

## 61. 实测反馈增量决策记录（八）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-47 | Interactive High-value Question Budget | Interactive 不追求最少问题、不设固定完成轮数；每轮必须是真正高影响、当前低置信度的用户决策；默认最多 10 轮作为 Safety Cap，若前 4–6 轮或更少已形成完整可执行需求则立即收口，达到上限后剩余低风险项静默补全 |

## 62. V2-48：Interactive Decision Purity + Conditional Camera Intent Exposure / 交互决策纯度与镜头意图条件暴露

最新办公室 G01 回归显示，Interactive 的轮数本身已经合理，但单个问题的推荐答案仍可能提前夹带下游决策。例如在询问 Choreography Profile 时，同时提前决定 Character Identity、Camera 或 Ending，导致后续问题看似仍在讨论，实际选择空间已被上游推荐偷偷收窄。

同时，Camera 不能仅被视为系统自动完成的基础质量机制。固定机位、一镜到底、完整动作可读、冲击型特写覆盖、贴身沉浸等属于真正的导演观看策略；当多个方向都合理且会明显改变成片时，用户应有机会显式参与决定。

因此正式确认：

> **One Question, One Primary Decision Node.**  
> **单轮问题优先只解决当前一个主要决策节点。**

以及：

> **Camera Quality is automatic; Camera Intent is conditionally exposable.**  
> **镜头基础质量自动完成；镜头创作意图在高价值分叉存在时条件暴露。**

### 62.1 Interactive Decision Purity

每一轮 Interactive 问题必须明确当前主要决策节点。推荐答案可以解释该选择对下游的影响，但不得把尚未确认的 downstream 选择一起锁死。

例如询问 `Cinematic Choreography Profile` 时，可以说明不同 Profile 会影响节奏、动作重量和镜头倾向，但不应同时默认确定：

- 双方具体 Character Identity；
- 谁最终占优；
- 固定镜头 / 一镜到底 / 特写密度等 Camera Intent；
- 未经用户确认的战斗结果。

如果这些 downstream 节点已经能由用户输入高置信度推导，可以静默补全；如果存在多个高价值方向，应在后续根据 V2-47 的 Question Budget 决定是否单独暴露，而不是塞进当前问题。

### 62.2 Camera Intent 进入条件高价值节点池

Camera 不作为固定必问项，但正式进入 Interactive 的高价值候选节点。

当以下任一情况成立且用户尚未明确时，可以把 Camera Intent 暴露为当前唯一问题：

- 固定 / 克制机位 与主动跟随会显著改变成片；
- one-take / long-take 与内部 Cut Coverage 都合理；
- 完整动作可读型与 Impact Close-up / Insert 强调型都合理；
- 贴身沉浸、商业冲击、观察式宽景等观看策略存在明显不同方向；
- 武器、关键 Contact、Reaction、Footwork 等是否获得更强局部 Coverage 会显著改变动作观感；
- 用户已经明确动作设计，但 Camera 仍是剩余最主要的导演意图不确定性。

如果 Camera Intent 已经明确，直接继承，不再询问；如果当前场景只有一个明显合理方案，仍可静默推导。

### 62.3 Camera 问导演意图，不问内部参数

Interactive Camera 问题应使用用户可理解的观看策略语言，例如：

- 电影冲击型 Coverage：中景保持关系，在关键 Contact / Footwork / Weapon / Reaction 上短促切近，再 Re-establish；
- 完整动作可读型：更宽景、更少 Cut，重点看全身动作、步法与空间；
- 贴身沉浸型：Camera 更靠近人物，适度手持与近景，强化身体压力；
- 固定 / 克制机位型：少移动、少切换，让动作在构图内完成；
- 一镜到底型：连续摄影调度覆盖整段 Combat。

这些只是候选方向示例，不建立固定五选一模板。禁止把 `Camera Complexity = Medium`、`Mobility = High`、`Cut Density = 3` 等内部参数直接作为用户问卷。

### 62.4 与 V2-46 / V2-47 的关系

- V2-46 定义 Camera 能做什么，以及 Cut 后动作状态如何连续；
- V2-47 决定一个高影响 Camera 分叉是否值得占用一轮交互；
- V2-48 约束这一轮 Camera 问题必须保持决策纯度，并以导演观看意图而非内部参数表达。

因此 Camera 不是“必问”，也不是“永远自动”。

原则：

> **交互不是把 Planning Graph 每个节点都问一遍，而是在真正高价值的节点把控制权交给用户。**  
> **Camera 可以自动推导，但不能在存在重大导演分叉时被系统静默替用户决定。**

## 63. V2-49：Executable Action Granularity / 可执行动作颗粒度规范

最新 G01 Prompt 已经解决了大量时间块、镜头固化和明显 Neutral Reset 问题，但仍暴露出更接近执行层的缺口：Final Prompt 中大量出现“连续格挡”“快速反制”“贴身缠斗”“持续压迫”“不断换位”“连续拆招”等概括性动作语言。这些词对人类导演有意义，却可能不足以让视频模型稳定生成丰富、连续、具体的身体动作。

因此正式增加 **Executable Action Granularity / 可执行动作颗粒度** 作为现有 `Choreography → Stage-2 Execution Knowledge → Prompt Assembly → Final Preflight` 的详细度规范。

它不是新的 Combat Engine、不是新的用户参数，也不新增固定 Interactive 问题。

### 63.1 关键 Action Phrase 必须外显可执行身体事实

承担主要战斗因果的 Action Phrase，应尽量让模型看见以下信息中的必要组合：

```text
Current Body / Range State
→ Specific Physical or Weapon Action
→ Contact / Evasion / Interception
→ Opponent Immediate Response
→ Footwork / Body Axis / Range / Position Consequence
→ Immediate Continuation Entry
```

这是一组信息要求，不是固定六步模板；不同 Strike、Grapple、Weapon、Wuxia、多人战可以使用不同表达。

重点是：下一个动作为什么能从当前身体与空间状态中立即发生，必须通过可见动作事实表达，而不是只用“继续反制”“不断拆招”说明。

### 63.2 抽象动作词不能替代关键动作设计

以下语言可以作为摘要、节奏说明或次要过渡，但如果它们承担关键 Action Phrase 主体，就必须继续实例化：

- 连续攻击；
- 连续格挡；
- 快速反制；
- 贴身缠斗；
- 持续压迫；
- 不断换位；
- 连续拆招；
- 高频攻防；
- 双方持续互有来回。

例如：

```text
过粗：
双方在移动中连续格挡、压迫、脱离和再进入。

更可执行：
男方前臂压住女方进入线时，女方不抽手归位，顺接触点旋开前臂并把前脚切到他外侧；男方尚在转髋封线，女方已利用他肩轴未回正的窗口短击迫使其缩肘，随后从缩肘留下的路线继续进入。
```

示例只说明颗粒度，不构成固定动作模板。

### 63.3 细化不等于逐招机械枚举

Executable Granularity 的目标是让关键因果链可执行，不是把所有动作拆成帧级清单。

禁止走向另一极端：

- 给每一拳、每一脚机械编号；
- 描述厘米级位移、角度数值或过细关节轨迹；
- 为了“具体”把一个 Phrase 塞入大量彼此独立动作；
- 让动作说明长度超过模型对当前时间窗口的 Execution Budget。

正确策略是：

> **关键因果动作具体，次要过渡动作可以压缩；细节服务连续执行，不服务文字复杂度。**

### 63.4 Initiative Handoff 必须落到动作句法

V2-43 已定义 Initiative Handoff，但 Final Prompt 不能只写：

- 双方不断反制；
- 主动权来回切换；
- 在对方动作中抢回主动。

关键 Initiative Handoff 应优先使用能够体现动作重叠和状态继承的句法，例如：

- `尚未收势时`；
- `接触后立即`；
- `在对方脚步尚未落稳时`；
- `顺着被偏开的线路`；
- `借抓控仍未断开的接触点`；
- `对方肩轴尚未回正便`；
- `沿前一步形成的新角度直接进入`。

这些不是固定关键词清单；核心是让 Counter / Re-counter 发生在同一运动链内，而不是“甲完成一段 → 乙开始一段”。

### 63.5 Ending 详细度与 Active Exchange 保护

用户可以决定战斗结果与 Ending Intent，例如均势、短暂占优、击倒、外部打断；但 Ending 占用多少时间、是否吞掉主要 Active Exchange 属于系统内部 Coverage / Assembly / Preflight 职责，不新增“最后停几秒”之类的固定用户问题。

对于 High Coverage 短 Combat：

- Ending 应继承最后一次 Contact / Position / Momentum / Advantage 后果；
- 不得过早进入长时间静止对视、呼吸或 Pose；
- 如果 Final Prompt 的 Ending 描述长度或事件量明显挤压 Active Exchange，应在 Preflight 内部压缩 Ending，而不是要求用户重新选择结局；
- 用户明确要求长时间悬停、慢镜或情绪 Ending 时除外。

### 63.6 Stage-2 Execution Knowledge 的责任

Executable Granularity 优先要求现有 Stage-2 加载真正提供当前场景需要的 Technique / Execution Knowledge。

正常顺序：

```text
Choreography Plan
→ Stage-2 Technique / Execution Knowledge
→ Concrete Action Phrase Construction
→ Prompt Assembly Externalization
→ Granularity / Interlock / Coverage Preflight
```

如果 Runtime 已正确执行该链，但相同 Golden Scenario 的 Prompt 仍持续只能生成泛化的“连续格挡 / 快速反制 / 不断换位”，才进入 Fighting / Martial / Weapon Concrete Knowledge Audit，判断 Library 是否真的缺乏可组合、全身化、跨 Range / Transition 的具体动作知识。

不得在证据不足时直接扩建大型 Fighting Library。

### 63.7 Failure Signature 与 Preflight

新增实现级 Failure Signature：

> **Abstract Action Block / Non-executable Choreography Summary**

典型触发：

- 关键数秒主要由“连续攻防 / 快速反制 / 贴身缠斗”等概括词承担；
- Character Identity 只写成打法标签，没有具体动作表现；
- Initiative / Advantage 有 Meta 说明，但缺少身体、Contact、Footwork、Axis、Range 后果；
- Action Phrase 看似丰富，实际没有足够具体的动作入口、响应和继续条件；
- Camera / Audio 描述比具体身体动作更详细。

Final Preflight 触发时，应优先重写 Choreography / Prompt Assembly 的关键 Action Phrase；不能只追加“高速、连续、专业、电影化”等形容词。

原则：

> **模型需要的不是“这是一场高手连续攻防”的说明，而是足够具体、能从当前身体状态继续执行的动作事实。**  
> **动作颗粒度解决的是可执行性，不是文字越细越好。**

## 64. 实测反馈增量决策记录（九）

| # | 决策 | 当前结论 |
|---|---|---|
| V2-48 | Interactive Decision Purity + Conditional Camera Intent Exposure | 单轮问题优先只解决一个主要 Planning Node，不提前锁死 downstream；Camera 基础质量自动处理，但固定机位 / one-take / 完整动作可读 / Impact Close-up / 贴身沉浸等真正导演观看策略在存在多个高价值方向时可条件暴露，不作为固定必问项，也不直接询问内部 Camera 参数 |
| V2-49 | Executable Action Granularity | 作为现有 Choreography / Stage-2 Execution Knowledge / Prompt Assembly / Final Preflight 的详细度规范；关键 Action Phrase 必须外显具体身体或武器动作、Contact / Evasion、即时响应、Footwork / Axis / Range / Position 后果与下一动作入口，禁止用“连续格挡 / 快速反制 / 贴身缠斗”等抽象概括替代关键动作，同时避免逐招机械枚举；Initiative Handoff 必须落实到动作句法，Ending 时长由内部 Coverage / Preflight 保护，不新增固定询问轮次 |
