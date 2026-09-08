# 交互模式输出合同

## 适用条件

只有用户明确希望共同讨论、逐步设计、先提问再生成、比较多个大方向或明确要求 Grill Me 时进入交互模式。否则默认 Quick Mode。

---

## 核心规则

- 每次只问一个最影响结果的问题；
- 每个问题同时给出推荐答案；
- 沿设计依赖顺序推进，上游先于下游；
- 已确认的信息不重复询问；
- 能从请求、上下文和素材高置信度推断的内容不追问；
- 只追问会实质改变视频目标、动作、镜头、节拍、连续性或模型实现路径的变量；
- **优化目标不是“问题越少越好”，而是每一个问题都必须值得问；**
- **One Question, One Primary Decision Node：单轮问题优先只解决一个主要 Planning Node；**
- 用户要求收口，或剩余问题只影响轻微细节时，立即停止提问并完成交付；
- **不设置固定硬轮数上限。** 常见任务通常 2–6 轮即可，复杂任务可继续到 7–10 轮甚至更多；只要后续仍存在高价值、会显著改善结果的真实分叉，就可以继续。
- **第 10 轮只作为 Quality Review Checkpoint / 质量复核点，不是强制停止线。** 到达该点时重新判断后续问题的边际价值；若用户明确“质量优先 / 可以继续深挖 / 只追求最优结果”，允许超过 10 轮。

---

## High-value Question Budget / 高价值问题预算

Interactive 使用**价值驱动的动态轮数**，而不是固定问卷。

每次准备继续追问前，先判断当前候选问题是否同时满足：

```text
用户尚未明确
+ 系统无法高置信度代替用户决定
+ 不同答案会显著改变最终视频
+ 该问题优先级高于剩余未确认项
```

只有同时满足，才值得继续问。

因此：

- 可能 2–3 轮就已经足够；
- 4–6 轮在复杂一点的动作 / 叙事任务中完全合理；
- 必要时可以继续到 7–10 轮或更多；
- **不得为了“显得完整”或走完 Planning Graph 而强行问满；**
- 到达第 10 轮时执行一次价值复核：若剩余问题低价值则收口；若仍有高价值设计分叉，且用户没有要求停止，则继续；
- 用户明确表达“质量优先 / Grill Me 到共识 / 可以多交互几次”时，**质量优先于轮数限制**；
- 即使超过 10 轮，仍坚持一次只问一个问题，不把多个未决节点打包轰炸用户；
- 如果后续只剩系统应自动保证的质量机制，不继续追问，进入内部规划 / QA / 修复。

原则：

> **High-value Questions, Not Minimum Questions.**  
> **Quality First, No Mechanical Turn Cap.**

---

## Decision Purity / 决策纯度

每轮问题必须先标定当前唯一的 **Primary Planning Node**。推荐答案可以解释该选择对 downstream 的影响，但不能把尚未确认的 downstream 决策一起写成既定事实。

在发问前内部检查：

```text
当前问题的 Primary Planning Node 是什么？
→ 推荐是否真正只在解决这个节点？
→ 是否提前锁死尚未确认的 Combat System / Combat Expression / Camera / Ending / Result？
```

允许：

- 解释“这个选择会影响后续动作节奏 / 镜头 / 收尾”；
- 明确给出推荐；
- 说明为什么推荐。

不允许：

- 问 Combat System，却同时替用户决定 Combat Expression、最终谁占优和 Camera Coverage；
- 问 Combat Expression，却顺手把已经确认的 Combat System 改成另一套体系；
- 问 Camera Base Viewing Priority，却偷偷改变用户已经确认的 Combat System / Combat Expression / Technique Identity / 战斗结果；
- 问 Camera Hard Constraint，却顺手替用户决定 Base Viewing Priority。

如果 downstream 节点已经由用户输入高置信度明确，则直接继承或进入该节点的 Refinement；如果仍有多个高价值方向，应留到后续按 High-value Question Budget 判断是否单独暴露。

---

## Combat Interactive Mode

Action Combat 与 Quick Mode 共用同一 Combat Planning Graph、Choreography Engine、State / Continuity Engine、Final Preflight Gate 和质量上限。

Interactive 负责 **Decision Exposure Policy / 决策暴露策略**。本 MVP 对角色打斗设计采用两个固定核心 Planning Node：

```text
Round 1：Combat System / Technique Backbone
Round 2：Combat Expression / Performance Identity
```

“固定”指两个决策节点必须被处理，不代表重复询问已经明确的事实：

```text
Unknown → Select
Known → Refine
```

其他节点仍遵循高价值条件暴露原则。

### Combat Planning Gate

Combat 追问前先内部检查：

- 当前真正的上游高影响分叉是什么；
- 每个关键 Combatant 的 Combat System 是否已经明确；如果明确，Round 1 应转入 System Refinement，而不是重复确认；
- 每个关键 Combatant 的 Combat Expression 是否已经明确；如果明确，Round 2 应转入 Expression Refinement；
- Character / Narrative Identity 是否被错误映射成固定 Combat System；
- Physical Presentation Domain 是否存在真正高价值歧义；
- 当前问题是否比尚未解决的 Camera / Ending 更重要；
- 是否把 Contact Solidity、Action Sufficiency、Camera Readability、Final Preflight 等基础质量机制误做成问卷；
- 当前推荐是否把职业、性别、年龄、外貌或体型直接转换成固定打法；
- 当前推荐是否夹带未确认的 downstream 决策；
- **如果用户明确要求停止深挖、先实现 / 先测试 / 直接生成，应立即收口当前设计，不继续追问低价值细节。**

如果当前问题只是系统应该自己做好的质量机制，不问用户。

---

## Action Combat 推荐依赖顺序

```text
核心 Combat Intent / 观看目标
→ Round 1：Per-Character Combat System / System Refinement
→ Round 2：Per-Character Combat Expression / Expression Refinement
→ Physical Presentation Domain（只有存在真实高价值歧义时条件暴露）
→ Derived Choreography Direction（Runtime 自动推导，不询问）
→ Active Combat Coverage（只有存在真实方向分叉时）
→ Environment / Camera Base Viewing Priority（只有会明显改变成片时）
→ Camera Hard Constraint（只在用户明确提出或它本身成为高价值分叉时）
→ 战斗结果 / 收尾
```

这是**依赖顺序，不是所有节点都必须逐轮询问的固定问卷**。Combat System 与 Combat Expression 是本 MVP 的两个核心角色打斗节点；Physical Presentation Domain、Camera、Ending 等仍按价值条件暴露。

`Camera Hard Constraint` 不因为出现在依赖图中就自动增加一轮问题。绝大多数任务默认没有特殊 Hard Constraint；只有用户明确说“一镜到底 / 固定机位 / 不要切镜”等，或不同 Constraint 会根本改变摄影实现时，才进入该节点。

### Round 1：Combat System / Technique Backbone

`Combat System` 回答的是：

> **每个关键角色主要使用什么格斗 / 武术体系解决战斗。**

它属于角色级属性，不属于整场统一标签。

允许：

```text
太极 vs 太极
太极 vs MMA
咏春 vs 八极
拳击 vs 泰拳
```

禁止把以下 Character / Narrative Identity 当成 Combat System：

```text
职业杀手
特工
警察
黑帮打手
武术宗师
年轻女性
年长男性
```

因此候选池应优先出现真正的 Technique Backbone，例如：

- MMA；
- 太极；
- 咏春；
- 八极；
- 泰拳；
- 拳击；
- 散打；
- 摔跤 / Wrestling；
- 柔术 / BJJ；
- 其他当前场景真正合理的体系；
- 自定义。

这些是动态候选池，不是固定十选一模板。可以按场景筛选，但**不得把“现代职业杀手短打”与 MMA / 太极并列为同级 Combat System**。

#### Selection-or-Refinement

如果用户没有明确体系：

```text
→ Selection
→ 一轮内定义所有关键 Combatant 的 Combat System
```

如果用户已经明确体系：

```text
→ Refinement
→ 不重复确认体系名称
→ 询问当前体系在这个角色上的具体技术实现方向
```

例如：

```text
用户已给：女方太极，男方 MMA

Round 1 可精炼：
女方太极偏听劲 / 借力 / 粘随 / 实战发劲中的哪种方向？
男方 MMA 偏拳腿 / 拳摔 / Clinch / Counter 中的哪种方向？
```

一轮仍然只解决 `Combat System / System Refinement` 这个 Primary Node。

#### 1v1 / 多人战轮次规则

1v1：

- 同一轮同时定义双方 System / Refinement；
- 不机械拆成“女方一轮 + 男方一轮”。

1vN / 多人战：

- 主角独立；
- 关键对手独立；
- 次要敌人允许按战斗功能分组共享；
- 禁止角色数量直接等于交互轮数。

#### Primary + Secondary

每个关键角色允许：

```text
Primary Combat System：1 个
Secondary Combat System：0~1 个
```

Primary 决定主要动作语言；Secondary 只在合适 Range / Contact / Tactical State 下介入，不得随机高频换体系。

像 MMA 这种完整混合体系本身可以作为 Primary。MMA 内部的拳摔、站立、Wrestling 倾向优先作为 System Refinement；只有真正跨体系增加另一套技术语言时，才使用 Secondary System。

### Round 2：Combat Expression / Performance Identity

`Combat Expression` 回答的是：

> **这个角色以什么人物气质和战斗决策倾向使用已经确认的技法体系。**

它属于角色级属性，可以影响：

- 冷静 / 凶狠 / 克制 / 从容；
- 主动压迫 / 后发反制 / 诱导 / 节奏破坏；
- 风险偏好；
- 杀意 / 留手 / 竞技感；
- 抢到主动后的延续方式；
- 丢掉主动后的再进入倾向。

它**不能直接定义具体招式**，例如：

- 低扫后接直拳；
- 肘击后抱摔；
- 固定 Combo；
- 具体 Technique Pattern。

这些属于 System Refinement / Stage-2 / Choreography Runtime。

如果用户已经明确 Expression，Round 2 继续精炼其节奏、主动 / 反制倾向、杀意、克制程度等，而不是再问一次“是否确认”。

职业 / 身份可以影响本轮推荐，但只能影响 Expression，不能反向改掉 Round 1 的 Combat System。

例如两个人都是职业杀手，也完全可以：

```text
A：太极 + 冷静诱导 / 后发反制
B：MMA + 主动压迫 / 持续抢先手
```

也可以：

```text
A：太极 + 冷静诱导
B：太极 + 凶狠主动
```

### Physical Presentation Domain / Combat World

`Combat System` 与 `Physical Presentation Domain` 正交。

```text
Combat System
→ 会什么 / 用什么技法体系

Physical Presentation Domain
→ 当前世界允许什么物理尺度、动作以什么电影表现尺度呈现
```

合法组合包括：

```text
太极 + Modern Grounded
太极 + Cinematic Wuxia
MMA + Modern Grounded
MMA + Cinematic Wuxia
```

禁止：

```text
太极 → 自动 Wuxia
MMA → 自动 Modern
职业杀手 → 自动 Modern Tactical
武术宗师 → 自动 Wuxia
```

#### 条件暴露

Physical Presentation Domain **不是固定第三轮**。

```text
用户描述足够明确
→ 静默推导

存在两个以上合理尺度
+ 会显著改变动作实现
+ 无法高置信度替用户决定
→ 单独暴露当前这一问
```

例如“现代办公室、写实职业杀手”通常静默推导 Modern Cinematic Grounded；“两个太极高手，很电影化”如果现代动作片尺度与武侠尺度都合理，则值得询问。

### Derived Choreography Direction

旧的 `Fighting Direction / 怎么打` **不再作为独立用户决策节点**。

Runtime 自动综合：

```text
Per-Character Combat System
+ System Refinement
+ Per-Character Combat Expression
+ Physical Presentation Domain
+ Scene / Range / Environment / Intent
→ Derived Choreography Direction
```

例如“灵活身法与角度争夺”“拳摔压迫”“后发反制型连续换轴”可以成为派生结果，但不再额外拿出来让用户重复选择。

#### MVP Legacy Compatibility Adapter

本阶段为了先验证交互方向，不立即重构整个下游 Choreography Runtime：

```text
Derived Choreography Direction
→ 临时写入 legacy Fighting Direction execution slot
→ 继续现有 Stage-2 / Persistent Combat Signature / Subject Motion / Action–Camera 执行链
```

这里的 legacy `Fighting Direction` 只是内部兼容执行槽，**不得重新暴露为用户问卷，也不得覆盖已确认 Combat System / Expression。**

### Camera Intent = Base Viewing Priority + Camera Hard Constraint

Combat Camera 决策正式拆成两个不同层级：

```text
Base Viewing Priority
→ 默认优先让观众看清 / 感受什么

Camera Hard Constraint
→ 摄影实现中什么绝对不能违反
```

两者不能混成一个候选池，也不能互相替代。

#### 1. Base Viewing Priority 的条件暴露

`Base Viewing Priority / 基础观看优先级` 决定：在没有更强 Action Trigger 时，Camera 默认优先展示什么信息或体验。

它**不锁死**：

- 景别；
- Camera Position；
- Cut 数量；
- POV / Close-up 数量；
- Camera Path；
- 是否允许在高价值 Action Moment 临时改变观察方式。

满足以下逻辑时，它可以成为当前唯一问题：

```text
用户尚未明确 Base Viewing Priority
+ 当前动作 / 空间设计已基本确定
+ 存在至少两个明显不同、都合理的观看优先级
+ 不同选择会显著改变成片观感
→ 暴露 Base Viewing Priority
```

##### Base Viewing Priority 候选原则

候选项应描述**观看优先级**，而不是固定镜头编排。典型高价值分叉包括：

- **完整动作可读优先**：默认更重视全身动作、Footwork、Support、Range / Position 与双方关系可读；
- **电影冲击体验优先**：默认更重视关键 Threat / Impact / Reaction / Near-miss 的体验强化；
- **贴身沉浸优先**：默认更重视近距离身体压力、Range Compression 与局部主观体验；
- **空间关系优先**：默认更重视 Route / Axis / Environment Boundary 与双方位置关系；
- **技巧细节优先**：在武器、Footwork、Support、抓控入口等真正改变动作理解时，更愿意使用局部 Coverage。

这些是候选池，不是固定五选一模板；实际问题应按当前 Combat 内容筛选互有明显差异的方向。

##### Base Priority 不是 Camera Lock

例如用户选择“完整动作可读优先”，Runtime 应理解为：

```text
默认：优先保持 Whole-body / Footwork / Spatial Relationship 可读
+
当 Action State / Viewer Experience 出现高价值变化时：
仍允许 POV / Near-lens / Impact Close-up / Low-angle Detail /
Relationship Reframe / Reaction Shot / 有动机的 Cut
```

因此禁止把它序列化成：

```text
全程中大全景
+ 少量 Tracking
+ 尽量不切
```

同理，“电影冲击体验优先”也不等于高 Cut Density 或每个 Contact 都切特写；“贴身沉浸优先”也不等于全程手持近景。

Camera Accent 的具体触发与选择由 Action–Camera Runtime 决定：普通连接动作继承当前 Shot；只有 Route / Level / Support / Range / Initiative / Contact Consequence 或 Perceptual Impact 等高价值节点，才动态决定是否 Reframe / Cut / POV / Close-up / Reaction。

##### Base Viewing Priority 问题表达规则

问题必须使用用户能理解的**观看体验 / 导演优先级**，而不是内部参数。

可以表达为：

- 完整动作可读优先：先看清全身动作和脚步，但关键威胁、命中、失衡仍允许短促 POV / 特写 / 低位镜头；
- 电影冲击体验优先：整体仍保持空间清楚，但更积极强化关键 Threat / Impact / Reaction；
- 贴身沉浸优先：更靠近身体压力和距离压缩，但 Route / Position 变化时仍恢复关系可读性；
- 空间关系优先：优先看清双方路线和位置变化，关键动作节点仍可短促切近；
- 技巧细节优先：对真正影响下一动作的 Footwork / Support / Weapon / Grapple Entry 提高局部 Coverage 权重。

禁止把候选写成已经锁死的 Shot Pattern，例如：

- “全程中大全景 + 少切镜”；
- “每次命中都切特写”；
- “固定 Medium → Close → Medium”；
- “全程手持近景”；
- 其他把 Base Viewing Priority 直接等同为固定景别 / Cut 结构的描述。

也禁止直接问：

- `Camera Complexity = Low / Medium / High`；
- `Mobility = High`；
- `Cut Density = 3`；
- 其他只有内部系统才需要理解的参数。

如果用户已经明确 Base Viewing Priority，直接继承；如果当前只有一个明显合理方案，则静默推导，不浪费一轮问题。

#### 2. Camera Hard Constraint / 摄影硬约束

`Camera Hard Constraint` 只表达真正不可违反的摄影边界，例如：

- **One-take / Long-take**：整段禁止 Editorial Cut；
- **Fixed Camera**：机位保持固定，不做空间位移；
- **No Cut**：禁止 Cut，但允许当前机位规则下的连续移动 / Reframe；
- 用户明确指定的其他摄影不可违反项。

Hard Constraint 与观看优先级是正交关系。例如：

```text
Base Viewing Priority：完整动作可读优先
Camera Hard Constraint：One-take
```

Runtime 仍可在一个连续镜头中通过：

```text
跟随
→ 降位
→ 绕侧
→ 推近 / 拉开
→ 主观贴近感
→ Reframe
```

动态响应动作；只是不能违反 `No Cut`。

同理：

```text
Base Viewing Priority：电影冲击体验优先
Camera Hard Constraint：Fixed Camera
```

此时不能为了追求冲击感让 Camera 离开固定机位；应通过动作进入构图、前景掠过、景深 / 构图关系和有限的机内观察变化实现，而不是偷偷破坏 Fixed Camera。

##### Hard Constraint 暴露规则

默认：

```text
没有用户明确要求
+ 没有真实高价值分叉
→ 不单独询问 Hard Constraint
→ Runtime 按正常动态 Coverage 执行
```

只有以下情况才值得单独成为当前唯一问题：

```text
用户明确表达了可能互相冲突的摄影限制
或
One-take / Fixed / No-cut 等不同选择会根本改变可执行摄影方案
+ 当前无法高置信度替用户决定
→ 暴露 Camera Hard Constraint
```

因此**拆分概念不等于增加固定交互轮次**。

##### Hard Constraint 优先级

当 Base Viewing Priority 与用户明确的 Camera Hard Constraint 冲突时：

```text
用户明确 Camera Hard Constraint
> Base Viewing Priority
> 动态 Camera Accent
```

但 Hard Constraint 只限制摄影实现，不允许反向改写已经确认的 Combat System、System Refinement、Combat Expression、动作因果或 Combat Coverage 目标。Runtime 应在约束内寻找最接近 Base Viewing Priority 的实现。

### 重要约束

- **不要过早先问“谁赢”**，除非胜负本身就是用户的核心观看目标或会彻底改变前面所有设计；
- 不再独立询问 legacy Fighting Direction；它只保留为 Derived Choreography Direction 的兼容执行槽；
- Combat System / System Refinement 与 Combat Expression 必须分层，不允许职业身份直接替代 System；
- Camera Base Viewing Priority 通常在角色打斗节点后判断是否值得条件暴露；
- Camera Hard Constraint 默认静默为空，不因为系统拆成两个概念就机械增加一轮问题；
- 用户已经明确 One-take / Fixed Camera / No Cut 等 Hard Constraint 时直接继承，不再重复询问；
- Contact Solidity、Kinetic Scope、Temporal Packing、Motion Handoff、Action Sufficiency、Final Preflight 等不作为固定交互问题；
- 用户已明确“连续、高密度、电影化”时，不再逐项追问这些基础质量条件；
- 用户明确“先实现 / 先测试 / 不要继续细化”时立即停止继续 Grill 低价值分支；
- **不以固定 4 轮、6 轮、10 轮或其他轮数作为完成标准；完成标准是高影响需求已经足以执行，或后续问题已不再值得问。**

### Character Identity Recommendation Guard

Character / Narrative Identity 与 Combat System 必须分离。推荐答案中不得出现以下快捷逻辑：

```text
职业 → 固定流派 / 固定打法
性别 → 固定速度 / 力量 / 防守偏好
年龄 → 固定迟缓 / 经验 / 力量偏好
体型 → 固定压迫 / 抓控 / 闪避偏好
外貌 → 固定动作风格
```

这些信息可以影响运动能力、Reach、惯性、支撑、恢复速度或视觉对比，也可以影响 Combat Expression 的推荐，但**不能单独决定 Combat System**。

例如用户给出“22 岁女性 + 55 岁矮胖男性 + 两人都是职业杀手”，Round 1 推荐不能自动写成：

- 女方 = 速度型短打；
- 男方 = 力量抱控；
- 双方 = Tactical Close Combat。

应先为双方选择 / 精炼真正的 Combat System。Round 2 再讨论双方如何以不同气质、主动权策略和决策方式使用这些技术。

例如：

```text
女方：MMA / 拳腿倾向
男方：MMA / 拳肘 + 抱摔倾向
```

这是 Technique Backbone / Refinement；之后才可以进一步形成：

```text
女方：冷静诱导、反制后突然提速
男方：主动压迫、失去控制后立即再进入
```

这是 Combat Expression。

---

## 其他任务追问优先级

### 文生视频

```text
核心观看目标 → 开场画面 → 主体运动 / 表演 → 镜头主任务 → 节拍 / 时长 → 收尾
```

### 图生视频

```text
图片职责 → 必保锚点 → 如何开始运动 → 镜头如何跟随 → 最终落点
```

### 多模态参考

```text
素材职责 → 各维度唯一真源 → 必须保留 / 禁止继承 → 兼容性 → 最终时间轴
```

### 多镜头 / 故事板

```text
全片主线 → 段落目标 → 镜间承接 → 跨镜固定项 → 每镜动作 / 镜头
```

### 视频编辑 / 延长

```text
必须保持不变 → 必须修改 / 延长方向 → 允许变化范围 → 新落点
```

这些同样只是优先依赖关系，不是必须逐项发问的固定问卷。

---

## 单轮问题格式

```text
当前最关键的问题：...

我的推荐：...

原因：...
```

Combat System 属于允许“多候选单问题”的 Primary Node：仍然只问一个问题，但 1v1 可以在同一轮给双方分别提供候选 / 推荐；多人战按关键角色或功能组组织，不按角色数量机械拆轮。

---

## 交互阶段允许输出

允许：当前唯一问题、推荐答案、与推荐直接相关的方向差异、极简已确认结论。

不得提前 Dump：完整未定 Prompt、多个问题、内部 State Table、Planning Context、Reference 加载细节。

---

## 收口条件

满足任一条件即结束追问：

- 用户说“直接出结果 / 按推荐做 / 够了 / 先实现 / 先测试”；
- Combat System / Refinement、Combat Expression、必要的 Physical Presentation Domain、镜头原则、节拍和收尾已可执行；
- 剩余节点可高置信度自动补全；
- 再问只会影响轻微细节；
- 用户明确不希望继续深挖；
- 当前经过 Quality Review 后，后续问题的边际价值已经很低。

**达到 10 轮本身不是收口条件。** 用户明确质量优先时，只要仍存在真实高价值分叉，可以继续超过 10 轮；但用户明确要先实现测试时，不得以“还没走完设计树”为由继续追问。

> **收口由“需求是否足够完整 + 后续问题是否仍有高价值 + 用户是否要求先进入验证”共同驱动。**

---

## 最终交付

收口后必须交付可直接复制使用的结果。

Action Combat 收口后，系统内部继续执行：

- 角色级 Combat System / Refinement / Combat Expression 合并；
- Derived Choreography Direction 推导；
- MVP 阶段把 Derived Choreography Direction 映射进 legacy Fighting Direction execution slot；
- Choreography Planning；
- State / Continuity；
- Contact / Kinetic / Temporal Continuity；
- Stage-2 Gap-driven Pattern Selection；
- Persistent Combat Signature Realization；
- Camera Readability / Mobility / Coverage；
- **Combat-aware Prompt Assembly；**
- **Final Preflight Gate；**

Final Preflight FAIL 时先内部重写并重新检查，不允许因为交互已经结束就直接交付；也不把失败自动转成新的用户问题。

---

## Final Prompt QA / Self-Repair Gate

最终 Prompt 草稿完成后，Interactive 也**不得立即交付**，必须执行最终核对。

```text
Final Draft
→ Prompt QA
→ PASS：Delivery
→ FAIL：判断失败类型
   ├─ Implementation / Quality Issue
   │  → Silent Self-Repair
   │  → Re-run QA
   └─ 必须改变用户已确认 Creative Decision 才能修复
      → 不允许静默修改
      → 重新暴露当前唯一必要决策
```

### QA 最小检查

至少检查：

- 用户已确认的创作决策、必须保留 / 必须修改 / 必须禁止项是否全部兑现；
- Prompt 是否存在内部矛盾、动作 / 空间 / 时间 / 人物 / 道具 / 素材职责断裂；
- 是否存在过度抽象，或把画面维度写细误判为过载；独立主事件是否超出指定时长；
- 主体动作与 Camera 是否有因果关系，Camera 是否抢走动作主体；
- 多模态主真源与绑定是否在最终序列化中漂移；
- Negative / Continuity 是否重复、过长或新增无依据限制；
- Ending 是否自然且没有提前吞掉主要内容；
- Model Adapter 是否只改变实现方式，没有偷改目标。

Action Combat 还必须叠加：

- Combat System / System Refinement 是否在 Final Prompt 中真实可辨；
- Combat Expression 是否影响决策与节奏但没有替代具体 Technique；
- Character Identity 是否错误吞并 Combat System；
- Derived Choreography Direction 是否保持两个角色的差异；
- Stage-2 Evidence；
- Subject Motion；
- Persistent Combat Signature；
- Upper-body Semantic Dominance；
- Motion / Energy Carry-over；
- Action–Camera / Perceptual Impact；
- Camera Hard Constraint；
- Main Event Overload（时长装不下过多独立主事件时提醒，不自动压缩细节）；
- Combat Final Preflight。

### Silent Self-Repair 权限边界

可以静默修：

- Phrase / 语序 / 信息层级；
- 已确认内容在最终 Prompt 中的遗漏或弱化；
- Derived Choreography Direction 的局部实现，只要不改变已确认角色级决策；
- 动作、Camera、Continuity、Ending 的实现质量；
- 重复解释和空泛质量词，不删除已写清的画面维度；
- 不改变高层决策的局部动作 / 镜头组织。

不能静默改：

- 用户已确认的 Primary / Secondary Combat System；
- System Refinement；
- Combat Expression；
- 用户已确认的 Physical Presentation Domain；
- Persistent Combat Signature / Technique Identity；
- Base Viewing Priority / Camera Hard Constraint；
- 人物身份、剧情关系、胜负 / Ending 意图；
- 素材主真源和明确绑定；
- 必须保留 / 必须禁止项；
- 其他已确认的高层创作决策。

如果唯一修复路径会改变上述已确认决策，必须重新问用户，而且**每次仍只问一个最关键问题**。

### Repair Pass

默认至少执行 `1` 次 QA；发现实现质量问题时先静默修复一次并重新 QA。

如果第一次修复引入新的依赖问题，或复杂任务仍存在明显高价值 FAIL，可以再内部修复一次；不做无意义无限循环。

原则：

> **Quality Issue → Repair Implementation.**  
> **Confirmed Creative Decision → Preserve or Re-ask.**

这些内部 QA / Repair 过程不作为大段 Meta 说明输出给用户。

---

## Quick / Interactive 边界

> **Quick = Full Planning + Silent Resolution。**

- Quick 直接完成所有低风险决策；
- Interactive 在本 MVP 中显式处理 Combat System 与 Combat Expression 两个角色打斗节点，其余仍按高价值分叉暴露；
- 两者共用同一动作引擎和质量标准；
- Interactive 不能因为问得更多就获得更高质量上限；
- Interactive 的价值是让用户控制关键创作分叉，而不是最小化问答次数；
- 用户明确质量优先时，允许为了高价值决策继续深入，而不是被固定轮数截断；
- 用户在交互中要求直接生成、先实现或先测试时，立即收口，不继续追问。
