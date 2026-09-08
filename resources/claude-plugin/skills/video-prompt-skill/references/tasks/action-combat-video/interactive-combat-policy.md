# Action Combat Interactive Policy

## 1. 作用

本文件是 Action Combat Interactive 中角色级打斗决策的运行期叶子规则，负责把用户可理解的交互问题映射到：

- Per-Character Combat System / Technique Backbone；
- System Refinement / Hybrid Refinement；
- Character Combat Expression；
- optional Per-Character Cinematic Combat Archetype；
- optional Combat Rhythm / Macro Tempo Strategy；
- conditional Physical Presentation Domain / Scale Resolution；
- Derived Choreography Direction 输入。

它只负责 Interactive 决策暴露与推荐策略，不替代 `core-playbook.md`、`choreography-playbook.md`、Stage-2 Pattern Selection、Camera 或 Final Preflight。

本轮 G01 Regression 已确认的下游修复规则正文仍由：

`references/tasks/action-combat-video/regression-fix-runtime-policy.md`

负责。

**RF-22 边界：本文件不再承担该 Runtime Policy 的真正 Loader。所有高价值 Interactive Combat 决策完成后，不得从本 Policy 直接进入 Derived Choreography / Stage-2 / Final Assembly；必须移交 `SKILL.md` 的 Action Combat Post-Planning Mandatory Path，由主路由一级 Direct READ Runtime Policy、验证本次执行的真实 Read Evidence，再进入下游。**

---

## 2. 固定两个核心 Planning Node

Action Combat Interactive 的角色打斗设计保持两个核心节点：

```text
Round 1：Combat System / Technique Backbone
Round 2：Combat Expression / Performance Identity
```

采用：

```text
Unknown → Select
Known → Refine
```

不新增固定 Round 3。

1v1 时同一轮同时覆盖双方；多人战按主角 / 关键对手 / 次要功能组组织，不按角色数量机械拆轮。

---

## 3. Round 1 — Combat System / Technique Backbone

Round 1 回答：

> 每个关键角色主要依靠什么格斗 / 武术技术体系解决战斗？

Round 1 是整场 Combat Design Space 的第一处分叉，默认应比后续节点更宽；目标不是“问题越少越好”，而是让用户能看到真正会改变成片的技术路线。

### 3.1 Character Identity 不得替代 Combat System

禁止：

```text
职业杀手 → Tactical Close Combat / MMA
特工 → MMA
年轻女性 → 速度型
年长男性 → 力量抱控
现代办公室 → MMA
中国角色 → 必然使用中国传统武术
```

职业、年龄、性别、外貌、体型、国籍、时代和场景可以影响候选相关性、表现与物理条件，但不能直接锁定 Technique Backbone。

### 3.2 Dynamic Recommendation Breadth / 动态推荐宽度

Round 1 不使用固定四选一，也不固定展示全部拳种。

运行逻辑：

```text
当前用户选题
+ Scene / Range / Environment
+ Character Relation / Physical Conditions
+ User Viewing Intent
+ 已确认限制
→ 分析真实 Combat Design Space
→ 选择高价值、差异明显的候选方向
→ 常见情况下约 6～8 个
→ + 自定义
```

“约 6～8 个”只是常见目标，不是硬配额：

- 如果只有 4～5 个真正合理的方向，不为凑数加入低价值候选；
- 如果存在 8～9 个明显不同且都有高决策价值的方向，不机械砍到 6 个；
- 候选数量必须由当前选题动态决定。

### 3.3 Recommendation Diversity Gate

Round 1 的质量指标不是 Candidate Count，而是：

```text
Relevance
+ Meaningful Technique Difference
+ Range / Movement Difference
+ Striking / Grappling / Whole-body / Environment 等解决路径差异
+ User Decision Value
```

禁止：

- 表面列出 6～8 个选项，实际只是相近拳种换名字；
- 多个候选最终产生近似同一套站立拳腿交换；
- 推荐理由只围绕职业身份，而不解释不同 Pairing 会怎样改变 Combat。

### 3.4 1v1 默认展示完整 Pairing 方案

对于 1v1，Interactive 默认展示：

> **角色 A Combat System vs 角色 B Combat System 的完整对战组合方案。**

例如：

```text
1. Chinese Cinematic Kung-fu Hybrid vs 散打
2. 咏春 vs Wrestling / Grappling
3. 八极 vs 散打
4. 太极 vs 散打
5. JKD vs MMA
6. 散打 vs MMA
7. Hybrid vs Hybrid
8. 其他当前场景高价值 Pairing
9. 自定义双方体系
```

以上只是示意，禁止固化成固定候选表。

其中 **八极与太极不能因为同属中国传统武术而互相替代**。它们承担不同的高价值 Combat Design Slot：

```text
八极
→ 贴身爆发 / 崩靠 / 短劲 / 重接触 / Whole-body Drive
→ 更偏 Pressure / Entry / Hard Contact

太极
→ 引化 / 借势 / 黏随 / 转轴 / 破重心 / 顺势反制
→ 更偏 Defense / Counter / Reversal / Initiative Theft
```

当当前场景同时适合“硬碰硬重爆发”和“借力化劲反制”两种观看方向时，Recommendation Diversity Gate 应把它们视为两个不同的高价值候选，而不是只保留其中一种。

每个 Pairing 的说明应回答：

> **这两套体系碰在一起，会形成什么不同的 Range、Movement、Counterplay、压迫 / 反制和观看体验？**

底层仍分别保存：

```text
Character A Primary Combat System
Character B Primary Combat System
```

Pairing 只是 Interactive Presentation，不是新的 Combat System 类型。

### 3.5 通用候选池

按场景动态筛选真正的 Combat System，例如：

- 散打；
- 八极；
- 咏春；
- 长拳 / 传统武术全身线路；
- 太极；
- 截拳道 / JKD；
- Chinese Cinematic Kung-fu Hybrid；
- MMA；
- 泰拳；
- Boxing；
- Wrestling / Grappling；
- BJJ；
- 其他当前任务合理体系；
- 自定义。

候选池是知识来源，不是固定问卷。

太极进入 Combat 候选时，不得退化成“慢动作 / 养生 / 只推手”的刻板表达。用于电影化实战时，应优先理解为：

```text
Incoming Force / Pressure
→ 引化或让线
→ 黏随 / 借势维持 Contact
→ 转轴 / 改变 Route / Support / Balance
→ 破重心或制造对手过伸
→ 顺势 Counter / Reversal
```

这不是固定套路；具体动作仍由当前 Range / Contact / Opponent Action / State 与 Stage-2 Knowledge 实例化。

### 3.6 Chinese Cinematic Kung-fu Intent 推荐排序

当用户明确表达以下任一目标：

- 中国功夫电影 / 华语武打片；
- 李连杰 / 吴京 / 甄子丹 / 成龙 / 李小龙式电影武打；
- 不要站桩；
- 希望身法、步法、腿法、高低位、转身、路线、空间移动更丰富；

则 Round 1 必须响应这个动作观感目标：

```text
Chinese cinematic kung-fu intent
→ 提高 Whole-body Movement / Footwork / Body Method / Kick Integration / Route Change 更丰富的合理体系排序
→ 可以优先推荐 Chinese Cinematic Kung-fu Hybrid
→ MMA 可以保留，但不得因为“现代 / 杀手 / 办公室 / 警匪”机械放在首位
```

边界：

- 不是全局降低 MMA；
- 用户明确要 MMA、笼斗、竞技综合格斗或写实 MMA 时，MMA 仍可优先；
- 即使用户没有显式 Chinese cinematic intent，Hybrid 仍可以作为当前题材下的合法高价值候选；
- 不得因为角色是中国人就让 Hybrid 成为唯一或事实默认答案；应由 Recommendation Diversity 保留真实设计空间。

### 3.7 Chinese Cinematic Kung-fu Hybrid

合法宽泛 Backbone：

> **中国功夫电影混合体系 / Chinese Cinematic Kung-fu Hybrid**

适用于：用户想要中国武打电影的完整动作语言，但不想被单一真实拳种 / 门派锁死。

它允许合理组合：

- 拳 / 掌；
- 腿法；
- 身法 / 步法；
- 转身 / 绕位；
- 高低位；
- 摔控 / 破平衡；
- Range / Route / Axis / Support 变化。

但它不是随机动作大杂烩。具体动作仍必须由当前 State / Range / Contact 与 Stage-2 Movement / Technique / Transition Knowledge 实例化。

### 3.8 Hybrid 默认不追加门派问卷

用户选择 Hybrid 后：

```text
默认
→ 不再固定问“具体混哪些拳种 / 门派？”
→ Runtime 根据：
   Cinematic Archetype
   + Character Combat Expression
   + Scene
   + Range
   + Environment
   + 当前 Movement / Technique / Transition Gap
→ 静默选择合理 Execution Knowledge
```

只有用户主动给出主 / 辅偏好时才进入 Hybrid Refinement，例如：

```text
以八极为主，混散打腿法
长拳身法为主，近身加入咏春
截拳道式进退 + 中国武术电影腿法
```

用户已明确的 Hybrid Refinement 不得被 Runtime 偷换。

---

## 4. Round 2 — Combat Expression / Performance Identity

Round 2 仍然只占一个 Primary Planning Node，但内部包含两个**分开展示、分开选择、同轮回答**的子维度。

### 4.0 Round 2 Atomic Interaction Contract

当 `Character Combat Expression` 与 `optional Cinematic Combat Archetype` 都需要向用户暴露时，必须在**同一条 assistant 消息、同一个 Round 2 问题**中分成两个子区块展示，并明确要求用户一次回复两项。

正确：

```text
Round 2
1. Character Combat Expression：A / B / C / 自定义
2. optional Cinematic Combat Archetype：李连杰型 / 吴京型 / 甄子丹型 / 成龙型 / 李小龙型 / 不指定 / 自定义

请一次回复两项，例如：
A；女方李连杰型，男方吴京型
```

禁止：

```text
先问 Expression
→ 用户回答
→ 下一轮再单独问“电影动作表达 / 动作风格 / 明星型”
```

也禁止在 Expression 与 Cinematic Archetype 之间发明第三个新的用户决策节点，例如：

- `电影动作表达参考 A/B/C/D`；
- `轻灵清晰 / 利落爆发 / 流畅身法 / 写实表达`；
- 任何本质上只是重新包装 Expression 或 Archetype 的额外“动作表达”问卷。

如果当前没有足够高价值理由暴露 Cinematic Archetype：

```text
Archetype = inherited / none
→ Round 2 只问 Expression
→ 后续不得为了“补电影感”再新增一轮 Archetype / 动作表达问题
```

如果用户在已经同时展示两个子维度的 Round 2 中只回答 Expression，而没有回答 optional Archetype：

- 用户明显不关心明星参考或上下文支持合法 `none` 时，直接解析 `Archetype = none`，不机械追加一轮；
- 已存在高置信度继承时直接继承；
- 只有遗漏项仍存在真实高价值歧义、无法合法解析时，才允许做一次最小精炼；不得把它常态化成固定 Round 3。

本合同只约束 UX 原子性，不把两个子维度预绑定成套餐；Expression 与 Archetype 仍分别保存、分别消费。

### 4.1 子维度 A：Character Combat Expression

回答：

> 这个角色以什么气质和战斗决策倾向使用已确认的 Combat System？

可以涉及：

- 冷静 / 凶狠 / 克制 / 从容；
- 主动压迫 / 后发反制 / 诱导 / 节奏破坏；
- 风险偏好；
- 杀意 / 留手 / 竞技感；
- 抢到主动后的延续方式；
- 失去主动后的再进入倾向。

不能直接变成固定 Combo / 具体招式。

#### Expression Candidate Coverage

如果用户尚未明确 Expression，不能只提供一个“推荐 A”让用户事实上没有选择。

应根据当前角色和已确认 Combat System 动态生成：

```text
2～3 个真正不同的 Character Combat Expression 组合
+ 自定义
```

例如：

```text
A. 推荐：女方冷静诱导 / 后发反制；男方主动压迫 / 持续再进入
B. 女方主动快速抢先；男方沉稳等待反击
C. 双方克制试探，利用节奏变化突然爆发
D. 自定义
```

这只是结构示例，不是固定套餐库。

候选差异必须真实改变：

- Initiative；
- Risk；
- Counter / Pressure 逻辑；
- Re-entry；
- Rhythm。

### 4.2 子维度 B：Cinematic Combat Archetype（optional）

回答：

> 如果希望有明确的华语功夫电影动作表达参考，每个关键角色更接近哪一型？

当需要暴露 Archetype Selection 时，默认完整展示五种基础 Archetype：

1. **李连杰型｜轻灵流畅・武术线条**
   - 身法、步法、腿法、转身、高低位与全身线路清晰；
   - 快但不乱，强调连续流动与技术可读性。

2. **吴京型｜硬朗爆发・全身压迫**
   - 爆发进入、重接触、逼退、破平衡、再进入；
   - 强重量与压迫，但仍持续换位。

3. **甄子丹型｜极速现代融合・近身连锁**
   - 快速截击、拳腿肘膝、短控与快速换距连续衔接；
   - 允许现代格斗元素，但不得退化成 MMA 站桩互殴。

4. **成龙型｜环境互动・空间即武器**
   - 跑、绕、翻、钻、跌扑恢复、障碍穿越；
   - Environment Affordance 成为动作链原因；喜剧感可关闭。

5. **李小龙型｜爆发截击・节奏破坏・极简直接**
   - Stop-hit / Interception / Broken Rhythm / Explosive Entry & Exit / Range Control；
   - 短促爆发后立即换距 / 换线，不原地持续挥拳。

6. **不指定明星参考 / 自定义**

Runtime 可以：

- 根据当前场景动态排序；
- 标注当前推荐；
- 解释不同适配度。

Runtime 不可以：

- 无明确高价值原因静默删掉任何一种基础 Archetype；
- 再出现 Policy / Library 中存在李小龙型，但实际候选没有李小龙型的情况。

如果基础候选被无理由丢失，判：

> **Archetype Candidate Coverage Failure**

执行语义读取：

`references/libraries/combat-cinematic-archetypes/library.md`

### 4.3 Archetype 是 Character-level 属性

Planning Context 按角色分别保存：

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
双方统一：李连杰型
```

Interactive 不新增固定轮次：

- Round 2 可以动态推荐双方不同 Archetype；
- 用户明确说“双方统一某一型”时直接继承；
- 用户只回复一个 Archetype 且上下文明显指整场统一电影动作表达时，可高置信度理解为双方共享，不机械追问；
- 存在真实高价值歧义时才精炼，不把角色级存储变成新增问卷。

### 4.4 两个子维度不得预绑定

禁止做成固定套餐：

```text
冷静后发 + 李连杰型
凶狠压迫 + 吴京型
高速抢先 + 甄子丹型
```

Expression Candidate 与 Archetype Candidate 必须分别展示、分别选择；当前场景可以给推荐组合，但推荐不是强绑定规则。

用户可以一次回复：

```text
A + 李连杰型
A + 女李连杰型 / 男吴京型
B + 双方统一甄子丹型
```

### 4.5 Archetype 继承

如果用户已经明确：

- “像李连杰那种”；
- “甄子丹式”；
- “成龙那种环境武打”；
- “李小龙式截击节奏”；

直接继承，不重复询问。

如果用户不关心明星参考，则 Archetype = none，不强行多问。

---

## 4A. Combat Rhythm / Tempo Gate（conditional）

Combat Rhythm 回答的是：

> **正在交战的过程中，速度与压力如何组织、何时自然升降。**

它与以下概念正交：

```text
Active Combat Coverage = 有多少时间真的在交战
Combat Rhythm / Tempo = 交战过程中速度怎样变化
Camera Editing Pace = 镜头切换有多快
```

因此：

- High Coverage 不等于全程高速；
- 高速 Combat 不等于高频快切；
- 慢速 Clinch / Grappling 可以保持很高 Pressure / Intensity。

### 4A.1 Conditional Exposure / High-value Trigger

本 Gate 不固定增加一轮问题，但 **Round 2 完成、双方 Combat System / Expression 已知后，必须执行一次 Rhythm Exposure Check**。只有检查结果为低决策价值时，才允许静默使用默认值。

#### MUST expose

以下任一情况成立，且用户尚未明确指定 Macro Rhythm 时，`Combat Rhythm / Macro Tempo Strategy` 必须暴露给用户，不能直接静默默认：

1. **用户显式关心节奏**：提到快 / 慢 / 快慢变化 / 爆发 / 缠斗降速 / 喘息 / 疼痛恢复 / 疲劳 / 越打越快 / 越打越慢 / 节奏反差等；
2. **双方体系天然形成不同 Tempo Regime**：例如 Striking / 高机动体系 vs Wrestling / Grappling / Clinch-heavy Control，或一个角色依赖高速切入退出、另一个依赖慢速高压贴身控制；
3. **当前设计很可能出现明显 Combat State Transition**：例如 Striking → Clinch / Grappling、重击 / 踢飞 / 摔倒 / 撞墙 → Recovery → Re-entry、持续伤势 / 体能消耗 → Fatigue、Separation / Tactical Reassessment → 再爆发；
4. **至少两种 Macro Strategy 会明显改变 Action Spine**：例如 `Dynamic Wave`、`Burst → Pressure → Burst`、`Impact Drop → Recovery → Rebuild`、`Asymmetric Tempo` 中至少两种都合理，而且会改变阶段顺序、主动权交换或 Recovery Window 的位置；
5. **用户追求明显电影化高手对决，而当前角色 Expression / Archetype 本身存在节奏对比空间**：例如轻灵流畅 / 截击型角色面对硬朗爆发 / 持续压迫型角色。

特别地，以下组合属于高价值典型，不得因为“15 秒很短”而自动跳过 Rhythm：

```text
Chinese Cinematic Kung-fu Hybrid / Striker
vs
Wrestling / Grappling / Clinch-heavy Control
```

因为它至少天然存在：

```text
Dynamic Wave
vs
Burst → Pressure → Burst
vs
Asymmetric Tempo
```

这些选择会明显改变成片，不属于可无损自动推导的小参数。

当 MUST expose 命中时：

```text
Macro Rhythm Strategy = unresolved
→ 向用户暴露 Rhythm Gate
→ 等待用户选择 / 自定义 / 授权自动决定
→ resolved 后才能继续后续高价值 Planning
```

不得在已经识别到高价值 Rhythm 分叉后，又用 `Dynamic Wave` 把该字段静默标记 resolved。

#### MAY default silently

只有同时满足以下条件时，才允许：

```text
Macro Rhythm Strategy = Dynamic Wave
Tempo Adaptation = Adaptive by Combat State
```

静默进入 Runtime：

- 用户没有任何节奏意图；
- 当前 Combat System / Expression 不产生明显不同的速度制度；
- 没有预期的 Clinch / Knockdown / Heavy-impact Recovery / Fatigue 等阶段性 Tempo Transition；
- 合理候选之间只会造成轻微表现差异，不会改变 Action Spine；
- 额外询问只是在让用户选择可被 Runtime 高置信度自动完成的低价值细节。

> **Conditional 不等于“默认不问”。Conditional 的意思是：先判断是否存在真实节奏分叉；存在就问，不存在才默认。**

如果暴露，候选使用以下**语义曲线**，不是硬时间表：

A. **推荐：动态波浪型 / Dynamic Wave**
- 中速进入 → 高速第一次交锋 → 短暂降速但保持战斗压力 → 再次高速爆发 → 收束；
- 适合大多数电影化高手对决。

B. **持续高压型 / Sustained High Pressure**
- 开打后大部分时间维持高速连续攻防；
- 仍允许极短的受击恢复、失衡补步、抱控转换与呼吸窗口。

C. **渐进升级型 / Escalation**
- 前段克制 / 中速 → 中段加速 → 后段最高密度爆发；
- 适合双方逐渐确认对手实力、越打越认真。

D. **爆发—压迫—再爆发 / Burst → Pressure → Burst**
- 高速碰撞 → 较慢但沉重的贴身控制 / Clinch / Grappling 压力 → 脱控后再次高速爆发；
- 特别适合 Striker vs Grappler、轻灵 vs 重型等速度差异明显的组合。

E. **重击跌落—恢复再起 / Impact Drop → Recovery → Rebuild**
- 高速交换 → 重击 / 踢飞 / 摔倒 / 撞墙 → 局部明显降速 → 撑地 / 调整呼吸 / 恢复支撑 → 再次加速进入；
- 强调“受击有恢复成本”，避免角色像不会疼。

F. **消耗衰减型 / Attrition / Fatigue Curve**
- 前段速度较高，随后因体能、伤势和呼吸负担逐渐下降；
- 后段以短促爆发替代持续高速，更适合写实、重型或较长战斗。

G. **战术脉冲型 / Tactical Pulse**
- 高速 Exchange → 很短的判断 / 绕位 / 呼吸 / 重建威胁 → 再高速进入；
- Micro-recovery 仍处于战术威胁中，不是双方停战休息。

H. **控制权交替型 / Asymmetric Tempo**
- Local Tempo 跟随 Initiative / Advantage / Range 改变；
- 例如女方抢主动时 High，男方抱控时 Slow-but-heavy，女方脱控后 High，男方受重击后 Low Recovery，再重新压入。

I. **自定义**
- 用户可以直接描述阶段顺序；
- 也可以提供 High / Medium / Low 百分比，但百分比只作为软分布偏好，不自动映射成固定秒数或固定时间段。

### 4A.2 Adaptive by Combat State（默认开启）

无论用户选择哪一种 Macro Rhythm，默认都允许 Runtime 根据真实 Combat State 动态改变局部速度：

```text
Macro Rhythm Strategy
+ Current Range / Contact
+ Initiative / Advantage
+ Heavy Impact / Pain Reaction
+ Knockdown / Throw / Wall Impact
+ Clinch / Grappling Compression
+ Loss of Balance / Recovery Burden
+ Breath / Fatigue Accumulation
+ Separation / Reassessment
→ Local Tempo
```

常见合法变化：

```text
高速 Striking
→ 进入 Clinch / Grappling
→ Tempo ↓，Pressure 可以保持 HIGH

重击 / 踢飞 / 撞墙
→ 疼痛、呼吸被打断、撑地或重新找支撑
→ Tempo 明显下降
→ 恢复威胁与支撑后再逐步带回速度
```

`Recovery Burden` 不是 Neutral Reset。受创后的短暂恢复应继续保留：

- 疼痛反应；
- 呼吸变化；
- 视线重新锁定；
- 撑地 / 扶墙 / 补步 / 调整支撑；
- 对手仍然逼近、观察或控制空间。

禁止写成：

```text
双方停下来休息
→ 完全恢复默认姿态
→ 再重新开打
```

除非剧情明确要求真正停战。

### 4A.3 Macro Strategy 不是硬曲线

用户选择 Macro Rhythm 只决定导演层节奏倾向，不锁死局部执行：

```text
Macro Strategy = directing intent
Combat State = local tempo authority
```

只有用户明确要求“严格按指定节奏 / 时间比例执行”时，才提高固定曲线约束；正常情况下不得为了遵守曲线而无视受击、抱控、失衡、疼痛、喘息或疲劳。

### 4A.4 Aftermath / Destruction 非阻塞提示

当 Interactive 暴露 Physical Presentation / Aftermath 相关决策，或正在提出最后一个高价值 Combat 问题时，可以附带一条**非阻塞提示**：

> 默认使用轻到中度电影化写实受创反馈；如果希望明显血腥、严重开放性伤口、大面积破衣、玻璃大规模碎裂或墙体 / 家具显著破坏，请主动说明。

该提示：

- 不新增一个必答问题；
- 不产生新的 Pending User Decision；
- 用户不回复时继续使用轻到中度写实默认；
- 用户主动提出更高 Damage / Destruction Scale 时，再把它作为 Physical Presentation / Aftermath 的显式约束交给 Runtime。

---

## 4B. Physical Presentation Resolution Gate（conditional）

Physical Presentation 回答的是：

> **这场战斗遵循什么物理 / 电影表现尺度？**

它与 Combat System 正交：同一套太极、散打、MMA、Hybrid 或兵器体系，都可以在不同 Physical Presentation Domain 下呈现；不得由“现代 / 中国 / 杀手 / 武术门派”等身份或体系名称自动锁定物理尺度。

### 4B.1 Resolution Timing

Physical Presentation **不新增固定 Round 3 / Round 4**。在当前 Interactive 高价值链路中：

```text
Combat System / Expression / optional Archetype
→ conditional Rhythm
→ conditional Advantage / Ending
→ Camera Base Viewing Priority
→ Camera Hard Constraint（仅在用户指定或高价值歧义时）
→ Physical Presentation Resolution Check
→ RF-22 Interactive Planning Completion Gate
→ Runtime Direct READ
```

也就是说，Physical Presentation Resolver 必须发生在 **Camera Base Viewing Priority 已 resolved 之后、Completion Gate 之前**。不得在 Camera 后直接以“规划已齐”为由跳过本 Check。

### 4B.2 Resolution Paths

Physical Presentation 只能通过以下三种合法来源进入 `resolved`：

```text
explicit
= 用户当前明确选择 / 指定物理尺度

inherited
= 用户在更早输入中已经明确给出兼容且无冲突的物理尺度约束

silent-default
= 已执行本 Gate 的低歧义检查，且满足允许静默默认的条件
```

任何其他“根据题材感觉应该是……”的推断，不算 resolved。

### 4B.3 MUST expose / High-value Ambiguity

当用户尚未明确 Physical Presentation，且以下任一情况成立时，必须暴露给用户，不能静默默认：

1. 当前 Specialist 内至少两个合理尺度都会明显改变人物的 **腾跃 / 支撑 / 惯性 / 受力 / 恢复成本 / Range / Environment Impact / Model Execution Realizability**；
2. 用户明确要“电影片段 / 电影感 / 功夫电影 / 动作片”，但没有说明是严格写实、常规电影化还是强化动作尺度，而这些路线都会合理改变最终 Action Spine；
3. 当前 Combat System / Archetype / Scene 同时支持 grounded 与明显更 cinematic 的两种高价值实现，例如 Hybrid / whole-body martial movement、环境动作、武侠身法等；
4. 用户明确了 `无威亚 / 无超自然 / 写实` 等限制，但当前 Specialist 仍存在两个以上兼容且成片差异明显的尺度，需要用户决定更严格还是更电影化；
5. 任何 Level 3 / 强化动作片 / 高武武侠方向是当前真实合理候选，而用户没有明确授权这种明显改变人体物理与身法上限的尺度。

命中 MUST expose 时：

```text
Physical Presentation Resolution Evidence
source = pending-user-selection
specialist = current specialist
level = unresolved
status = unresolved

→ 向用户提出当前一个 Physical Presentation 问题
→ 等待用户选择 / 自定义 / 明确授权自动决定
→ 未回复前 Pending User Decision = PRESENT
→ RF-22 Completion Gate 必须 FAIL
```

### 4B.4 MAY resolve silently / Conservative Intent-driven Default

只有不存在 4B.3 的高价值歧义时才允许静默 resolved。

优先顺序：

1. **用户明确写实 / 无威亚 / 无超自然 / 现实人体合理范围**
   - 当前为 Modern Specialist：继承为 Modern Level 1；
   - 当前为 Wuxia Specialist：继承为 Wuxia Level 1；
   - `source = explicit` 或 `inherited`，不是 silent guess。

2. **用户明确“电影化现代动作 / 现代动作片”且没有要求夸张人体物理**
   - 可静默落到 Modern Level 2；
   - `source = inherited` 或 `silent-default`，取决于是否已经形成明确可继承意图。

3. **用户明确“电影武侠 / 武侠片”且没有要求高武 / 超自然**
   - 可静默落到 Wuxia Level 2；
   - `source = inherited` 或 `silent-default`。

4. **普通现实题材，没有电影化尺度意图，也不存在其他高价值物理分叉**
   - 默认 Modern Level 1；
   - `source = silent-default`。

5. **Level 3 永远不得仅凭题材静默推导**
   - Modern Level 3 / Wuxia Level 3 必须由用户明确要求、明确选择，或用户明确授权 Runtime 在已经暴露的高价值分叉中代为决定；
   - “电影 / 功夫 / 杀手 / 高手”本身都不足以自动升级到 Level 3。

如果两个兼容 Level 会明显改变腾跃、受力、恢复、环境破坏、动作可执行性或整体 Action Spine，则不得使用 silent-default，必须回到 4B.3 暴露。

### 4B.5 Candidate Source / Single Source of Truth

当 Physical Presentation 必须暴露时，**不在本 Policy 复制一套固定 Level 文案**。

候选必须从当前已经命中的 Specialist 真源动态生成：

```text
Modern Specialist
→ references/tasks/action-combat-video/modern-combat-playbook.md
→ 使用其当前 Level 1 / 2 / 3 电影化尺度定义

Wuxia Specialist
→ references/tasks/action-combat-video/cinematic-wuxia-playbook.md
→ 使用其当前 Level 1 / 2 / 3 电影化物理尺度定义
```

本 Policy 只负责：

- 决定是否暴露；
- 过滤与用户硬限制冲突的候选；
- 根据已确认 Intent 标注推荐；
- 收集用户选择；
- 生成 Resolution Evidence。

例如用户明确 `无威亚 / 无超自然` 时，不得继续把与该硬限制冲突的高尺度实现作为合法候选；但也不能把“无超自然”错误解释成必须全程无电影化动作。

### 4B.6 Physical Presentation Resolution Evidence

`Physical Presentation Domain resolved?` 不能只靠模型主观判断。进入 RF-22 Completion Gate 前，内部必须存在本次执行的轻量 Evidence：

```text
Physical Presentation Resolution Evidence
source: explicit | inherited | silent-default
specialist: modern | wuxia
level: 1 | 2 | 3
constraints: 当前用户明确的相关硬限制（没有则 none）
status: resolved
```

如果该 Evidence 不存在、`level = unresolved`、`status != resolved`，或 source 无法落在三种合法来源中：

```text
Physical Presentation Domain = unresolved
→ Interactive Planning Completion Gate = FAIL
→ DO NOT READ regression-fix-runtime-policy.md
→ 返回 Interactive 解决该字段
```

特别禁止：

```text
Camera 已选择
→ “规划已齐”
→ 没有 Physical Presentation Resolution Evidence
→ 直接 READ Runtime Policy
```

这仍属于：

> **RF-22 Early Direct Read / Planning Completion Gate Failure**

Resolution Evidence 是轻量 Gate Evidence，不要求对普通用户展示，也不建立完整状态机。

---

## 5. Combat System 与 Cinematic Archetype 必须分层

```text
Combat System
→ 角色真正会什么 / 技术骨架是什么

Cinematic Combat Archetype
→ 这套技术在电影里如何呈现
```

特别区分：

```text
截拳道 / JKD → Combat System
李小龙型 → Cinematic Combat Archetype

MMA → Combat System
甄子丹型 → Cinematic Combat Archetype
```

选择 Archetype 不得自动修改已经确认的 Combat System。

---

## 6. Planning Context 输出 + Post-Planning Boundary

Round 1 / 2 完成后，Planning Context 至少保留：

```text
Per-Character Primary Combat System
Optional Secondary Combat System
System Refinement / Hybrid Refinement（if explicit）
Per-Character Combat Expression
Per-Character Cinematic Combat Archetype（optional）
Physical Presentation Domain
Physical Presentation Resolution Evidence
  - source: explicit | inherited | silent-default
  - specialist: modern | wuxia
  - level: 1 | 2 | 3
  - constraints
  - status: resolved
Combat Rhythm / Macro Tempo Strategy（if exposed; otherwise Dynamic Wave）
Tempo Adaptation = Adaptive by Combat State（default）
Scene / Range / Environment / Intent
Duration / Coverage Context
```

本文件只负责把这些确认结果交给上游主路由继续收集 / 继承仍有必要的高价值 Combat 决策；**当所有高价值 Interactive Combat 决策完成后，必须移交 `SKILL.md` 的 `Action Combat Post-Planning Mandatory Path`。**

边界：

```text
Interactive Planning Context complete
→ hand off to SKILL.md Post-Planning Mandatory Path
→ SKILL.md Direct READ regression-fix-runtime-policy.md
→ RF-22 Read Evidence Gate
→ Runtime Policy 接管 Derived Choreography / Duration / Exchange Spine / Stage-2 / Assembly
```

本 Policy 不再通过“这里写了一句 READ”来承担真实 Loader；这可以避免静态声明存在但当前执行没有实际 Read Evidence 的情况。

Archetype 名称不得只作为标签丢给 Final Prompt；最终 Prompt 应优先外显其中性的动作语义。

---

## 7. G01 / Regression 验收重点

真实 Interactive 回归至少检查：

1. **Recommendation Breadth / Diversity**
   - Round 1 是否根据选题动态生成足够宽的高价值 Pairing；
   - 常见约 6～8 个，但没有机械凑数；
   - 现代办公室 / 职业杀手不自动 MMA；中国角色也不自动只剩 Hybrid；
   - 当场景同时适合重爆发与借力反制时，八极与太极是否被视为两个不同设计槽位，而不是互相替代；太极是否没有退化成“慢动作 / 养生 / 只推手”。

2. **1v1 Pairing Presentation**
   - 是否用完整双方 Combat System 对战方向帮助用户选择；
   - 底层仍保持 Per-Character System。

3. **Hybrid UX**
   - 用户选择 Hybrid 后，不应紧接着固定追问“具体混哪些门派”。

4. **Round 2 Expression Candidate Coverage**
   - Expression 是否存在真实可选分叉，而不是只有一个推荐 A。

5. **Round 2 Atomic UX / Archetype Candidate Coverage**
   - 当 Expression 与 Archetype 都需要暴露时，是否在同一条 Round 2 消息中一次展示、一次回复；
   - 是否没有把 Archetype 拆成下一轮，也没有发明额外 generic“电影动作表达”问卷；
   - 暴露 Archetype 时五种基础 Archetype 是否完整出现；
   - 李小龙型不得无理由静默消失。

6. **Character-level Archetype**
   - 双方是否可以不同，也允许共享。

7. **Combat Rhythm Gate**
   - Round 2 后是否真实执行 Rhythm Exposure Check；
   - 命中 Striker / High-mobility vs Grappler / Clinch-heavy、明显 State Transition 或多种 Macro Strategy 都合理时，是否实际暴露，而不是静默默认；
   - 只有低决策价值时才允许默认 `Dynamic Wave + Adaptive by Combat State`；
   - 用户选择 Macro Strategy 后，受击、疼痛、抱控、摔倒、喘息、疲劳是否仍能合法改变 Local Tempo；
   - 是否没有把 Combat Tempo 与 Camera Cut Frequency / Active Coverage 混为一谈。

8. **Physical Presentation Resolution Gate**
   - Camera Base Viewing Priority resolved 后、RF-22 Completion Gate 前是否真实执行 Physical Presentation Resolution Check；
   - 高价值物理 / 电影尺度歧义是否实际暴露，而不是凭“电影 / 杀手 / 功夫”静默默认；
   - 低歧义静默默认是否遵守 Conservative Intent-driven Default；
   - Level 3 是否从不因题材被静默升级；
   - 暴露候选时是否使用当前 Specialist 的 Level 定义，而没有在本 Policy 复制第二套正文；
   - Completion Gate 前是否存在合法 `Physical Presentation Resolution Evidence`；没有 Evidence 时不得判 Planning Complete。

9. **Post-Planning Handoff Boundary**
   - 本 Policy 完成 Interactive 角色级决策后是否没有直接进入 Stage-2 / Final Assembly；
   - 是否交回 `SKILL.md` 主路由，由 RF-22 负责真实 Direct READ / Read Evidence Gate。

10. **Archetype Consumption / Realization**
   - 选中 Archetype 后必须在 Post-Planning Runtime 中进入对应 Runtime Bias；
   - 不能只在 Prompt 写明星名字。

11. **No Static Standing Shortcut**
   - 选择 Hybrid 或任何 Archetype 不等于自动 PASS；
   - Final Preflight 仍必须检查 Static Standing Combat / Upper-body Technique Dominance / Movement Causality。

---

## 8. Anti-overdesign

不新增：

- Round 3；
- 固定 Physical Presentation 问卷；
- 本 Policy 内复制 Modern / Wuxia Level 1 / 2 / 3 详细定义；
- 因“电影 / 功夫 / 杀手 / 高手”静默升级到 Level 3；
- generic `电影动作表达参考` 独立问卷；
- 固定 Rhythm 百分比问卷；
- 把 Macro Rhythm 曲线写成逐秒硬时间表；
- 把 Combat Tempo 自动绑定 Camera 快切频率；
- 明星独立 Combat Engine；
- 每明星固定 Combo；
- Hybrid 门派强制问卷；
- MMA 全局降级；
- 明星 Archetype → 固定 Combat System 映射；
- 固定 6～8 候选硬配额；
- 本 Policy 内第二套 RF-22 Loader / Recovery Runtime。

核心原则：

> **用户决定高价值动作方向；Runtime 负责把专业动作知识补完整。**

> **Macro Rhythm defines intent; Combat State controls local tempo.**

> **Physical Presentation must be explicitly resolved, not assumed complete.**

> **Dynamic recommendation breadth, not a fixed questionnaire.**

> **Modern identity does not imply MMA; Chinese identity does not imply one mandatory kung-fu answer.**
