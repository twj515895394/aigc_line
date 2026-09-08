# Action Combat Regression Fix Runtime Policy

> 状态：Runtime Active  
> 来源：`docs/action-combat-video-regression-fix-spec.md`  
> 适用：Action Combat Interactive 在 Round 1 / Round 2 完成后、进入 Derived Choreography Direction / Stage-2 / Final Assembly 之前必须读取。

本文件是本轮 G01 Regression 的轻量运行期修复层。它不建立第二套 Combat Engine，不替代 `core-playbook.md`、`choreography-playbook.md`、`advantage-structure-contract.md`、`action-camera-handoff-playbook.md` 或 `prompt-assembly/control.md`；它负责把已经确认但此前容易在 Runtime 中丢失的消费 / 验收链固定下来。

核心原则：

> **Routing First, Knowledge Second.**
>
> **Plan the whole exchange spine before expanding local detail.**
>
> **Concrete and dimensionally detailed; overload is too many independent main events, not fine writing.**

---

## 1. 强制运行顺序

Interactive Round 1 / Round 2 完成后，按以下顺序执行：

```text
Confirmed Per-Character Planning Context
→ Archetype Mandatory Consumption
→ Derived Choreography Direction
→ Duration-aware Choreography Budget
→ Pass 1: Exchange Spine / Battle Beat Skeleton
→ Per-Character Signature + Advantage / Ending Compatibility Check
→ Stage-2 Gap Detection
→ Archetype-weighted Pattern Selection
→ Stage-2 Pattern Trace
→ Pass 2: Selective Concrete Expansion
→ Movement Causality Check
→ Concrete Technique Resolution Gate
→ Impact Realization Gate
→ Impact Aftermath / Damage Continuity Gate
→ Granularity / Exchange Density Check
→ Concrete Resolution（动作必须具体，不自动压缩画面维度）
→ Action–Camera Handoff（沿用现有 Runtime，不修改）
→ Prompt Assembly
→ Serialization Deduplication
→ Adapter-output Concrete Technique + Impact Final Scan
→ Final Preflight
```

Camera Runtime 本轮冻结：本文件不得创建第二套 Camera 逻辑，也不得改变现有 Action–Camera Handoff 规则。

---

## 2. Archetype Mandatory Consumption Gate

当任一关键角色满足：

```text
Cinematic Combat Archetype != none
```

必须在 Derived Choreography Direction / Stage-2 前实际读取：

`references/libraries/combat-cinematic-archetypes/library.md`

并提取该角色对应 Archetype 的 Runtime Bias。

禁止：

```text
Planning Context 里保存“李连杰型”
→ 不读 Library
→ 只在 Final Prompt 写“轻灵流畅 / 李连杰式”
```

如果 Archetype 已确认但对应执行知识没有实际读取：

> **Archetype Consumption Missing**

此时不得进入 Final PASS；必须回到 Library Read → Bias Extraction。

### 2.1 Archetype 名称不是最终动作

明星名称只是用户层创作参考。Runtime 应将其转换成中性动作偏置，例如：

```text
李连杰型
→ Footwork / Route / Axis / Level / Kick Integration / Whole-body Linkage ↑

吴京型
→ Explosive Entry / Whole-body Drive / Hard Contact / Base Disruption / Re-entry ↑

甄子丹型
→ Rapid Interception / Burst Footwork / Range Transition / Close-range Chain ↑

成龙型
→ Environment Affordance / Route / Recovery / Obstacle Traversal ↑

李小龙型
→ Stop-hit / Broken Rhythm / Explosive Entry / Exit / Range Control ↑
```

具体真源以 Archetype Library 当前内容为准，不在本文件重复建立明星动作库。

---

## 3. Archetype-to-Stage-2 Weighting Gate

Archetype 必须真实改变 Stage-2 Pattern Selection 的选择权重，而不是只改变形容词。

执行：

```text
Per-Character Combat System
+ System / Hybrid Refinement
+ Combat Expression
+ Archetype Runtime Bias
+ Current State / Range / Contact / Environment
+ 当前 Gap
→ Pattern Selection Priority
```

Archetype 只改变：

- Movement Pattern 的优先级；
- Technique 类型与连接方式的优先级；
- Transition / Re-entry 的优先级；
- Rhythm / Range / Environment / Impact 的偏置。

禁止：

- 固定 Combo；
- 每 3 招必须 1 脚；
- 固定转身次数；
- 固定换位次数；
- 固定 High / Medium / Low 比例；
- 为了“像某明星”无视 Combat System 或当前 State。

### 3.1 Archetype Realization Gate

Library Read Evidence 只是必要条件，不是 PASS 条件。

Final Preflight 必须问：

> **删除明星名称后，仅看最终动作本身，能否读出该 Archetype 对 Movement / Rhythm / Range / Transition / Impact 的真实偏置？**

如果 Library 已读取，但最后仍落成通用的：

```text
前臂偏转
→ 肩线封堵
→ 抓腕
→ 顶肩 / 压墙
```

且所选 Archetype 明显要求更强 Footwork / Range / Route / Whole-body 变化，则判：

> **Archetype Realization Failure**

回到 Stage-2 Weighting + Pattern Selection 重写，不在旧动作上补几个风格词。

---

## 4. Per-Character Signature Separation Gate

只要关键角色之间的：

```text
Combat System
+ Combat Expression
+ Cinematic Combat Archetype
```

存在已确认差异，该差异必须贯穿 Combat Spine，而不是只在开头出现一次。

持续检查：

- Entry 方式；
- Movement 偏好；
- Technique 选择；
- Range Transition；
- Rhythm；
- Initiative Theft；
- 失去主动后的 Re-entry；
- 对 Contact / Pressure 的处理方式。

测试问题：

> **删除角色姓名，只看动作逻辑，是否仍能大致判断哪一方是哪一种打法？**

如果双方后半段同质化成同一动作骨架，只是轮流执行：

> **Per-Character Signature Collapse**

必须回到 Exchange Spine / Stage-2 Selection 修复，而不是靠角色形容词区分。

---

## 5. Ending Signature Compatibility Gate

Ending / Advantage Recommendation 必须消费：

```text
Per-Character Combat System
+ Combat Expression
+ Cinematic Combat Archetype
+ Advantage Trajectory / Current Active State
```

Ending 负责定义：

- 最终谁取得什么程度优势；
- 对手是否仍能反抗；
- 末拍处于什么战术 / 空间状态。

Ending 不得为了表达“谁占优”而偷偷引入新的 dominant technique。

典型失败：

```text
上游：轻灵 Footwork / Route / Level / Kick Integration
→ Ending 推荐：默认抓腕 + 锁臂 + 压墙
→ 下游全部被腕肘 / 肩线控制吸走
```

如果 Ending 的 dominant technique 明显破坏已确认 Signature：

> **Ending Signature Compatibility Failure**

重新生成 Ending candidate 或让最后一个 Active State 自然收束。

Grappling / Wrestling / Control-oriented System 在符合自身 Signature 时仍可合法使用墙边身体控制；本 Gate 不禁止 Grappling，只禁止 Ending 偷换打法。

---

## 6. Duration-aware Choreography Budget

Duration 必须在具体 Action Phrase 展开之前参与规划，不能到 Final Assembly 才考虑。

运行输入：

```text
Duration
+ Combat Density Intent
+ Active Combat Coverage
+ Dialogue / Story Event 占用
+ Camera Complexity
+ Model Capability（如有）
→ Choreography Information Budget
```

它影响：

- Exchange Spine 能承载多少阶段变化；
- 哪些节点值得 High Granularity；
- 普通 Exchange 应保持多深；
- 给 Re-counter / Re-entry / Initiative Handoff 留多少执行空间。

它不产生：

- 固定动作数；
- 固定 Exchange 数；
- 固定腿法次数；
- 固定转身 / 换位次数。

例如 15 秒 High Coverage Combat 的意义是：

> **先规划这段时间能装下几件连续主事件；每件主事件的身体、光影、镜头都可以写细。**

而不是：

> “15 秒必须 8 招 / 6 个 Exchange”，也不是“写细了就要自动压缩”。

---

## 7. Two-pass Choreography Planning

### Pass 1 — Exchange Spine / Battle Beat Skeleton

在读取大量局部 Pattern 并展开细节之前，先形成一条轻量完整的 Combat Spine。

结构可以包含：

```text
Entry
→ Exchange
→ Re-counter
→ Initiative Shift
→ Exchange
→ Signature / Reversal
→ Ending
```

但这不是固定模板，也不要求固定节点数量。

Pass 1 只需要清楚：

```text
谁发起
→ 对方怎样回应
→ 产生什么新的 Contact / Range / Axis / Position / Support / Advantage State
→ 下一 Exchange 为什么可以从这里开始
```

Pass 1 必须先检查：

- Duration / Active Combat Coverage；
- Exchange Depth；
- Advantage / Counterplay；
- Per-Character Signature Separation；
- Route / Range / Position / Level / Support 是否有真实变化；
- 是否已经在骨架阶段就压成少数几个大动作盒。

原则：

> **先确定整段战斗需要发生什么变化，再决定调用什么 Pattern。**

禁止：

```text
先读到 M01 / T02
→ 为了“用上知识库”硬塞斜切 / 低线动作
```

### Pass 2 — Selective Stage-2 Expansion

Exchange Spine 成立后，再逐个检查真正需要专业具体化的 Gap：

```text
Gap
→ Movement / Technique / Transition Slot
→ Pattern Selection
→ Concrete Action Phrase
→ Granularity Level
```

优先：

```text
Major Reversal / Initiative Theft / Signature Moment
→ High Granularity

Ordinary Exchange / Re-counter / meaningful Range Change
→ Medium Granularity

Connector / Recovery / Re-entry Transition
→ Low Granularity
```

High 不是“越长越好”；只是承担更完整的关键因果。

---

## 8. Stage-2 Pattern Traceability Gate

Regression / Debug 时，每个被 Stage-2 实例化的关键 Exchange 必须可追踪：

```text
Planning / Choreography Gap
→ Slot
→ Main Pattern
→ optional Auxiliary Pattern
→ 实际读取的 leaf knowledge
→ Pattern 提供的关键 Detail
→ Concrete Action Phrase
```

示意：

```text
Gap:
正面对线过于静态，需要创造 Route / Axis 变化

Slot:
Movement

Main Pattern:
M01 Outside Angle Cut

Auxiliary:
T02 Low-line Base Disruption

Realized Phrase:
女方向男方外侧斜切……
```

普通最终 Prompt 不输出 Trace；Trace 是 Runtime / Regression Evidence。

Failure 分流：

```text
没有 Pattern Hit
→ Routing Failure

Pattern Hit 不符合 Archetype / System / Gap
→ Selection / Weighting Failure

Pattern 正确但 Phrase 写坏
→ Realization Failure

Choreography 正确但最终 Prompt 被压坏
→ Assembly / Serialization Failure

Prompt 正确但生成视频不执行
→ Model / Adapter Failure
```

如果只读了 `minimum-validation-set.md`，但无法指出具体 Pattern Hit 与 Realized Phrase，不得判 Stage-2 已成功执行。

---

## 9. Movement Causality Gate

不能仅检查最终 Prompt 是否出现：

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
→ 对手被迫重新响应
→ 新 State 成为下一 Technique / Defense / Re-entry 原因
```

FAIL：

```text
上肢先完成主要格挡 / 抓控
→ 旁边补一句“同时移动一步”
→ 主链仍然是挡拳 → 抓腕 → 压肩
```

即使 Movement Pattern 已命中，如果 Movement 只是给上肢 Technique 配脚步，仍判：

> **Upper-body Technique Dominance / Movement Causality Failure**

必须重写因果链，而不是增加 Movement 关键词。

### 9.1 Concrete Technique Resolution Gate

Stage-2 的 Pattern / Technique 名称是**动作生成知识**，不是可直接交给视频模型的最终招式。Pattern 命中后，承担 Active Combat 的 Technique 必须继续实例化成一个当前 Exchange 中真实发生的具体身体动作。

特别禁止把下列类别词直接当作动作 Head：

```text
全身连动短击
全身连动反击
短促身体控制
低线腿法 / 低线动作
破平衡动作
近身反制
用身体改变朝向
用全身力量截入
```

这些词可以作为内部 intent / mechanic / modifier，但不能替代“人物到底做了什么”。

#### Head-action Test

对每个承担关键攻防的 Phrase，临时删除以下类型的修饰 / 结果词：

```text
快速 / 短促 / 连续 / 全身连动 / 低线 / 强力
反制 / 控制 / 破平衡 / 改变路线 / 改变朝向 / 借动量
```

然后问：

> **剩下的文字能否回答：哪个身体部位 / 接触面，对哪个可见目标或身体关系，执行了什么具体动作？**

如果不能，判：

> **Technique Category Leakage / Abstract Action Head**

必须回到当前 System + State + Range + Pattern Detail，选定一个具体动作，不得靠增加更多形容词修复。

#### Category-disguised Action / Mechanic Ambiguity Scan

只检查**真正承担 Active Combat 因果的动作句**，不误伤角色风格摘要。例如人物总述里写“偏好低线腿法 / 贴身控制”可以合法存在；但一旦进入具体 Exchange，就不能再把这种类别词当成已经发生的动作。

下列表达即使已经带有目标或结果，仍然属于未完成 Technique Resolution：

```text
低线干扰他的承重小腿
用腿部绊阻破坏她的支撑
用身体压迫改变他的朝向
近身控制他的上身
用下肢破坏平衡
以全身力量截入他的路线
```

原因是它们只给出了：

```text
身体区域 / 高层类别
+ 意图 / 结果
```

但没有收敛为一个可唯一执行的 Contact Mechanic。

执行 **Mechanic Ambiguity Test**：

> 如果同一句文字仍可以在不改变其表面语义的前提下，被实现成两个或更多明显不同的动作机制（例如踢、扫、勾、踩、外绊、内绊等），则该 Technique 仍未 resolved。

对主动改变对手支撑 / 路线 / 身体关系的 Contact Action，至少应能读出当前必要组合：

```text
具体接触部位 / 接触面
+ 一个明确动作动词 / 接触机制
+ 明确目标部位或身体关系
+ 可见即时结果
```

注意：

- `腿部`、`身体`、`低线` 是区域 / 类别，不等于具体接触面；
- `干扰`、`控制`、`破坏支撑`、`改变朝向` 是意图 / 结果，不足以单独作为动作 Head；
- `绊阻` 如果仍未说明是哪个接触部位以什么方向建立阻挡 / 勾带关系，也可能继续过于宽泛。

示例：

```text
FAIL：女方低线干扰男方的承重小腿，迫使他换支撑。
PASS：女方用前脚内侧横扫男方承重小腿外侧，迫使他跨步换支撑。

FAIL：男方用腿部绊阻破坏女方支撑，使她短暂失衡。
PASS：男方用外侧脚勾住女方承重脚踝向内带，迫使她单脚补步稳住身体。

FAIL：男方用身体压迫改变女方朝向。
PASS：男方肩胸贴住女方上臂与肩侧向前斜推，迫使她肩线转向玻璃隔断。
```

这里的 PASS 只是“具体程度”示例，不建立固定 Combo 或动作字典；Runtime 仍必须根据已确认 Combat System、Current State、Range、Contact 与 Pattern Detail 选择当前真正合理的动作。

#### 最小可执行语义

普通 Active Technique 至少应形成：

```text
一个具体动作
+ 一个明确接触面 / 身体关系（上下文已极清楚时可自然省略）
+ 一个明确目标 / 接触对象
+ 一个立即可见的对手响应或状态后果
```

例如：

```text
FAIL：女方用低线腿法扰乱男方支撑脚。
PASS：女方用前脚内侧勾扫男方承重脚外侧，迫使他跨步补位。

FAIL：女方以短促的全身连动截入改变他的路线。
PASS：女方斜切半步后用掌根推击男方上胸，男方肩线被推偏并跨步转向。

FAIL：女方用短促身体控制改变男方朝向。
PASS：女方以前臂横架男方胸口，外侧跨步带转，使他的肩线转向门框。
```

这里不要求使用专业招式名。**清楚的普通身体语言优先于含糊的武术术语。**

#### 具体不等于过载

先把“做什么”说具体。同一动作上的身体、光影、镜头、材质写细，不构成本 Gate 失败。

只有把互不相关的新主事件硬塞进指定时长，才按 `prompt-assembly/control.md` 2.0 提醒用户。

### 9.2 Impact Realization Gate

当 Concrete Technique 已形成 meaningful force-bearing contact 时，Runtime 必须在进入 Aftermath 前先完成即时受力语义。Impact 负责**当前 Force Event 的立即动力学与下一拍状态后果**；Aftermath 不再重新规划这一层。

最低 PASS：

```text
Concrete Contact
+ Readable Force Response
+ Combat State Consequence
```

先做定性 Salience 判断，不做数值评分：

```text
Effective Contact?
→ Meaningful Force / Combat State Consequence?
→ Major Force / Tactical / Narrative Salience?
→ I1 Minimal / I2 Standard / I3 Emphasized
```

展开深度自适应：

- **I1**：保留接触 + 最必要 Force Response / State Change；
- **I2**：清晰保留 Force Response + Continuation；
- **I3**：在 I2 基础上可额外保留 1–2 个最高价值 Force Transmission / Recovery / Perceptual Anchor。

不按 Technique 名称硬编码 Salience，也不建立 Force Meter / Momentum Meter / 物理数值模拟。

六类 Contact 只做极薄的 Modality PASS：

```text
Strike
→ concrete contact point / body relationship
+ local reaction
+ axis / support / balance / range / opening 中至少一种后果

Block / Parry / Interception
→ force meets defensive structure
+ force 被截停 / 改向 / 吸收中的真实一种
+ structure / attack line / support / opening 后果

Grapple / Clinch / Body Pressure
→ pressure / body relationship established
+ force 持续进入对方结构
+ forced step / rotation / range compression / support change 中至少一种

Throw / Takedown
→ balance / support 失效原因
+ body redirection / acceleration
+ landing / ground-state / recovery 即时后果

Weapon Clash
→ concrete weapon contact
+ deflection / bind / rebound / vibration 中真实一种
+ weapon line / opening / hand–arm–body structure 后果

Body–Environment Collision
→ body 与具体 material / object 的方向性碰撞
+ deceleration / rebound / compression 中真实一种
+ position / recovery consequence
```

统一验收：删除“猛烈 / 强力 / 沉重 / 震撼”等形容词后，仍应读得出该 Contact 的真实受力机制。

#### Motion Carry-over

Impact 是 Motion Handoff 的转换节点，不是动作结束点：

```text
Incoming Motion
→ Contact / Force Exchange
→ Motion 被保留 / 传递 / 改向 / 截停 / 吸收 / 反弹中的真实一种
→ Post-impact Motion Carry-over
→ Immediate Continuation Entry
```

默认禁止 Contact 后自动 Neutral Reset。下一拍必须消费仍然成立的 Body / Range / Support State 与 Motion Carry-over；只有真实 recovery、战术停顿或用户 / 风格明确要求时才允许运动趋势结束。

#### Impact Accent Intent

只有需要额外感知强调时才生成：

```text
Concrete Impact Anchor
+ Perceptual Goal
+ optional Channel Eligibility
```

Impact 只回答 **What should be felt?**，不直接指定 camera shake、slow motion、hit-stop、具体音效等实现；Camera / Audio Runtime 保留执行权。

Impact Gate 不新增固定 Final Prompt Section。必要 Force Causality 应融合进现有 Concrete Action Phrase。

Failure 可判：

- `Adjective-only Impact`；
- `Self-propelled Reaction`；
- `Contact Freeze`；
- `Neutral Reset`；
- `State-disconnected Reaction`；
- `Impact / Aftermath Duplication`；
- `Accent Without Anchor`。

对于 I3，最终至少保住：

```text
Concrete Impact Anchor
+ highest-value Force Response
+ Motion Carry-over
```

### 9.3 Impact Aftermath / Damage Continuity Gate

当 Impact Realization 已确认有效 Contact / Force Event 后，本 Gate 只判断该事件是否形成**需要当前或后续镜头记住的可见 / 材质 / 环境 Delta State**。它消费 Impact 已经成立的 Contact、Immediate Force Response 与 Combat State Consequence，不再重新规划“身体如何被打动 / 改向 / 失衡”。

本 Gate 覆盖三类可见对象：

```text
Human / Body
+ Clothing / Wearables
+ Environment / Objects / Materials
```

核心链路：

```text
Initial Baseline State
+ Validated Impact / Force Event
→ Event-caused Visible Delta State is born here
→ Aftermath Lifetime Classification
→ Transient Decay / Persistent Continuity / Progressive Accumulation
```

#### A. Human / Body Aftermath

当明确受击部位、力度与写实尺度足以产生可见痕迹时，应选择**一个与当前 Physical Presentation Domain 相匹配的最小合理后果**，例如：

- 嘴角 / 唇部受到有效拳掌擦击 → 发红、轻微破皮或少量血迹；
- 额头 / 眉骨 / 脸颊受到明确撞击 → 局部泛红、擦伤或逐渐显现的轻度紫红淤痕；
- 前臂 / 手背 / 膝部与墙面、地面发生明显摩擦或撞击 → 局部红印、擦痕或轻微磨伤。

不是每次触碰都必须留下伤痕。轻微封挡、擦碰、无明显承伤的 Contact 可以只有 Impact 层的运动 / 受力反馈；**只有已验证 Force Event 足以产生可见后果时，才在本 Gate 创建 Aftermath Delta。**

#### Damage Onset Timing / Injury Birth Contract

所有由本段 Combat 新产生的可见伤势，必须有**明确出生时刻**。Runtime 必须区分：

```text
Initial Injury Baseline
→ Triggering Contact
→ Delta Injury Onset
→ Updated Injury State
→ Post-impact Continuity
```

默认规则：

- 首帧继承已经由用户设定、参考图片 / 视频、上游剧情或前置片段明确成立的伤势状态；这些属于 `Pre-existing Injury / Initial Injury Baseline`，不得为了“打斗开始”而自动清除或重置；
- 对于**尚未发生的后续 Combat 新伤**，首帧与 Trigger 之前不得提前出现对应的新血迹、淤青、擦伤、红肿、破皮；
- 新伤必须绑定到一个具体可见的 `Triggering Contact / Force Event`，例如某次拳掌命中、撞墙、摔地或摩擦；
- 新伤只能从该 Trigger 发生后作为 `Delta Injury` 加入当前状态，不能因为 Final Prompt 后文写了“持续保持血迹 / 淤青”，就在首帧或受击前提前加载；
- `Persistent / Progressive` 只表示**该状态已经存在之后**继续保持 / 累积，绝不反向推导它在更早时间已经存在；
- 对渐进显现的伤势，例如轻度淤青，可以写成“命中后先泛红，随后在后续数拍逐渐转为轻度紫红”，但新增部分仍不得提前到命中之前；
- 如果已有旧伤和本段新伤发生在同一区域，必须维护为 `Baseline + Delta`：已有痕迹继续保留，新变化只从新 Trigger 后叠加，不允许把后续加深程度提前加载到首帧。

推荐 Final Prompt 序列化方式：

```text
初始 Baseline：继承参考素材 / 上游剧情已经存在的伤势状态；不预加载本段后续攻击才会产生的新伤。
→ 某次具体攻击命中右侧嘴角 / 颧骨。
→ 从这次命中后，在已有 Baseline 之上新增轻微破皮与少量血迹。
→ 后续镜头保持这道已经形成的新伤；更早镜头只保持当时已经成立的 Baseline，不得提前出现这个 Delta，也不得无因消失。
```

对于额头 / 眉骨 / 脸颊等明显面部状态尤其要优先执行本 Contract，因为模型容易把这些高显著度外观特征误当成角色全程固定造型。

`Pre-existing Injury` 不要求只能来自用户文字明说；只要参考素材、上游剧情、已有 Continuity State 或前置片段已经可靠表明该伤势存在，就应进入 `Initial Injury Baseline`。Runtime 不得擅自把它洗掉，也不得把尚未发生的后续 Delta 提前补上。

#### B. Clothing / Wearable Aftermath

抓袖、扯领、抱控、拖拽、墙压或摔撞如果明显作用到服装 / 穿戴物，后果应服从力度与材质：

```text
轻度
→ 褶皱 / 拉紧 / 歪斜 / 衣摆移位 / 领带松动

中度持续或强力抓扯
→ 明显拉伸 / 局部开线 / 小裂口 / 纽扣松脱或崩开（上下文合理时）
```

禁止：

```text
一次普通抓袖
→ 衣服立刻大面积撕烂
```

也禁止：

```text
衣袖已经被强力扯裂
→ 下一镜头自动恢复完整
```

#### C. Environment / Object / Material Aftermath

人物撞击、推压、甩碰环境物体时，必须按对象真实材质决定反馈，而不是统一“破坏”：

- 玻璃隔断：可先出现振动、轻响、手印 / 擦痕或轻微形变感；只有足够强且剧情 / Physical Scale 允许时才升级到裂纹 / 破裂；
- 墙面 / 门框：可出现擦痕、轻微掉灰、局部撞痕；普通人体撞击不自动形成夸张大坑；
- 办公椅 / 小型家具：可滑移、偏转、翻倒并保持新位置；不应无重量飞出；
- 文件 / 纸张 / 小物：可散落、掉地、位置改变，并在后续镜头保留；
- 衣物、玻璃、墙面、家具等的反馈必须符合当前材质和受力方向。

#### Default Aftermath Intensity

用户没有另外指定时，默认：

> **轻到中度电影化写实后果。**

这只是默认生成强度，不是题材审查 Negative。Runtime 不主动把普通受击升级成极端后果；如果用户明确要求更重、更血腥、更成人化或更破坏性的表现，则按用户目标调整到上层平台 / 模型规则允许的范围，Skill 本身不额外添加题材级禁止词。

#### Aftermath Lifetime Contract

每个 Aftermath 在进入 Final Prompt 前必须先归类生命周期，禁止把所有反馈都当成“必须一直保持到结尾”。

**1. Transient Aftermath / 瞬态后果**

典型包括：

- 玻璃 / 柜门 / 椅子的短暂振动、晃动；
- 金属回响、玻璃余响、碰撞尾音；
- 一次冲击带起的灰尘、衣料回弹；
- 呼吸被瞬间打断、短暂痛缩 / 眨眼 / 咬牙；
- 失衡后的短促摆动，只要随后已重新稳定。

规则：

```text
发生
→ 在当前或紧邻镜头可见 / 可听
→ 按真实物理自然衰减
→ 不要求无理由持续到 Ending
```

例如玻璃在前段被撞后可以振动并有短促余响，但如果中间已经过去多个 Exchange，Final Ending 不应还机械保留“玻璃持续余振”。

**2. Persistent Aftermath / 持久后果**

典型包括：

- 嘴角 / 鼻侧已经出现的血迹；
- 淤青、擦伤、明显红印；
- 衣袖裂口、纽扣脱落、领带松开、衣物明显拉坏；
- 玻璃裂纹、墙面擦痕 / 掉灰、家具凹痕；
- 已经翻倒 / 移位的椅子、散落纸张和小物。

规则：

```text
Baseline 中已存在
或
由明确 Trigger 新产生
→ 从当前成立时刻进入 Continuity State
→ 后续保持
→ 只有画面内明确清理 / 修复 / 移动 / 遮挡等行为才能改变
```

**3. Progressive / Accumulative Aftermath / 渐进累积后果**

典型包括：

- 淤青随时间或再次受击逐渐加深；
- 少量血迹在后续同部位再次受创后合理增加；
- 呼吸负担、疲劳、动作恢复速度随战斗累积而改变；
- 已有裂纹 / 开线在后续同方向受力后进一步扩大。

规则：

```text
已有基础状态
+ 时间 / 再次受力 / 体能消耗等明确原因
→ 合理加深
```

禁止无因升级：没有新的 Contact / 时间 / 体能依据，轻微红印不能突然变成重伤，轻微裂纹不能突然大面积破碎。

#### Continuity / Reset Contract

只有 `Persistent` 与仍在累积中的 `Progressive` Aftermath 必须进入后续 Continuity State；`Transient` 必须允许自然衰减。

禁止：

> **Damage / Material / Environment Reset**

即：没有画面内原因，持久伤痕、衣物破损、物体位移或环境损伤在下一镜头自动消失 / 恢复初始状态。

也禁止：

> **Premature Injury / Damage Preload**

即：由本段 Combat 某次后续 Contact 才产生的**新增 Delta** 血迹、淤青、擦伤、红肿、破皮或其他持久伤势，在该 Trigger 发生前就已经出现在首帧 / 开场人物外观 / 更早镜头中。已有 Baseline 伤势不属于此 Failure。

也禁止：

> **Baseline Injury Reset**

即：参考素材、用户设定、上游剧情或已有 Continuity State 已经存在的旧伤 / 血迹 / 淤青，在开场或后续无因被“清洁化”、消失或恢复。

也禁止：

> **Transient Aftermath Over-persistence**

即：一次本应衰减的振动、回响、尘土或短暂身体反应，被机械保持到多个后续阶段甚至 Ending。

#### Aftermath Information Budget

本 Gate 不要求每个 Exchange 都追加一串伤痕说明。只把**当前具有持续价值或当前镜头明显可感知**的后果写入最接近的 Action Phrase 或必要 Continuity 描述：

- Transient 只写发生与必要衰减，不在后续重复；
- Persistent / Progressive 对后续画面有持续价值时简洁保留；
- 同一伤痕 / 破损 / 环境变化后续只需保持，不在每个段落重新解释来源；
- 不为了“更真实”给每次击打机械添加一种新伤痕；
- 面部 / 身体新伤若容易被模型当成初始造型，优先在最靠近 Trigger 的 Action Phrase 里写“从这次命中后才新增”，而不是只在人物总述或全局 Continuity 段声明最终伤势；
- Baseline 伤势只需作为初始 Continuity 状态保持，不要把它误写成由本段某次攻击新产生。

本 Gate 与 `Serialization Deduplication` 同时生效：

> **后果要真实存在，也要有正确 Baseline、出生时刻和寿命。可见痕迹可以写细，但不要重复解释同一件事。**

Failure 可判：

- `Impact Aftermath Missing`：明显有效受创 / 抓扯 / 撞击却完全没有合理可见反馈；
- `Premature Injury / Damage Preload`：后续攻击才产生的新增伤势在 Trigger 前提前存在；
- `Baseline Injury Reset`：已有伤势被无因清除 / 重置；
- `Damage Continuity Reset`：Persistent / Progressive 伤痕或衣物损伤在后续无因消失；
- `Environment State Reset`：Persistent 环境位移 / 损伤无因恢复；
- `Transient Aftermath Over-persistence`：振动、余响、尘土、短暂痛缩等瞬态反馈无理由持续过久；
- `Material Response Mismatch`：反馈与材质 / 力度明显不符；
- `Aftermath Overstatement`：轻度接触被无因自动升级成重伤 / 大破坏。

---

## 10. Exchange Density / Granularity Distribution Gate

正式识别两个相反 Failure：

### 10.1 Granularity Under-specification

```text
快速反制
连续攻击
低线动作
持续换位
全身连动短击
短促身体控制
低线干扰
腿部绊阻
```

如果删除抽象形容词后仍不知道人物具体做了什么，Phrase 不可执行。

### 10.2 Main Event Overload

过载只看**指定时长里独立主事件是否过多**，例如 15 秒再加换场、换主体、另一套完整高潮。

同一 Exchange 写清脚步、接触、光影、镜头、尘土，不判过载，也不自动压缩。

若独立主事件明显装不下：

> **Main Event Overload**

提醒用户加时长、拆段或取舍，不静默删攻防，不把画面维度压糊。禁止用固定动作数 / 固定字数解决。

---

## 11. Concrete Resolution Gate

动作必须具体可执行，但不为了更短而压糊。

承担 Active Combat 的 Phrase 至少保留当前必要组合：

```text
明确动作
+ 明确对手响应或可见状态后果
+ 必要 Continuation Entry
```

禁止给视频模型未决选择：

```text
掌根或前臂……
踢 / 扫 / 蹬其中一种……
某种低线动作……
```

也禁止把已经收敛的 Technique 再压回动作类别或“类别 + 结果”伪具体表达：

```text
全身连动短击……
短促身体控制……
低线腿法扰乱……
低线干扰承重小腿……
腿部绊阻破坏支撑……
身体压迫改变朝向……
破平衡反制……
用身体改变朝向……
```

应由 Runtime 先决策成一个明确可执行动作；不能删掉动作 Head、目标和关键状态后果，也不能把已写清的光影 / 镜头 / 身体反馈当成必须删掉的“次要 Mechanics”。

原则：

> **动作句必须具体；画面维度写细不是错误。**

---

## 12. Serialization Deduplication Gate

Prompt Assembly 后执行一次语义去重。

同一个控制意图优先只保留一次最强表达：

```text
具体正向动作
>
必要全局正向规则
>
少量高价值 Negative
```

如果具体动作已经自然表达：

- 不 Reset；
- Motion Handoff；
- Position / Axis 变化；
- 接触受力；
- 已形成的 Injury / Clothing / Environment Aftermath；

不要在后面的 Continuity / Style / Avoid 段再重复解释同一件事。

对于本段新产生的伤势，去重时必须保留**至少一个明确 Trigger 附近的 Onset 表达**。禁止为了压缩只剩：

```text
人物设定 / Continuity：嘴角有血、脸颊淤青并持续保持
```

而把“哪次命中后才新增”删掉。若只能保留一处，优先保留：

```text
具体 Contact Phrase 中的 Injury Onset
```

而不是全局人物外观中的最终 Delta 状态。

已有 `Initial Injury Baseline` 则相反：它应作为开场已成立的 Continuity State 保留，不得为了套用 Injury Onset 规则而伪造一个本段 Trigger。

目标：

```text
具体 Action Flow 承担主要语义
+ 少量真正全局 Camera / Physics / Continuity
+ 极少数模型高风险 Avoid
```

禁止：

```text
动作写一遍
+ 全局规则再解释
+ Style 再解释
+ Avoid 反向再解释
```

Dedup 的目的是去掉重复解释，不是把画面维度压短。

### 12.1 Final Negative Content-Neutral Contract

Action Combat 的 Final Negative 默认只承担**生成稳定性 / 连续性 / 当前明确失败风险**，不承担题材分级或内容审查职责。

默认可保留的基础 Negative 只应来自当前任务真实风险，例如：

- 不新增用户没有要求的额外人物 / 额外主体；
- 不出现身份、服装、发型、场景无因漂移；
- 不出现人物瞬移、位置 / Range / Contact Reset；
- 不出现与当前 Physical Scale 冲突的无重量运动、超能力或无因飞行（仅当当前任务要求写实 / grounded 时）；
- 不出现用户已经明确排除的武器、道具、场景切换或剧情元素；
- 不重复堆叠已经由正向 Action Flow 明确表达的 Avoid。

**禁止 Skill 自行追加题材级 blanket Negative**，例如：

```text
不要血腥 / no blood
不要 gore
不要成人内容 / no adult themes
不要性内容 / no sexual content
不要裸体 / no nudity
不要暴力 / no violence
不要粗口 / no profanity
```

这些内容类别在用户没有要求排除时，不应被 Final Negative 自动封死。

特别是 Action Combat 默认 `轻到中度电影化写实 Aftermath` 时：

```text
嘴角少量血迹
轻微破皮
红肿 / 淤青
衣物拉扯 / 小裂口
```

都属于合法写实后果，Final Prompt 不得再用笼统的“不要血腥”把它们反向压掉。

同时明确：

> **删除题材级 Negative ≠ 自动要求加入对应内容。**

用户没有要求成人 / 性 / 裸体 / 重度血腥等内容时，Runtime 不需要主动添加；只是不能为了“安全感”额外写一个 blanket ban。用户主动要求这些题材或更高 Damage / Destruction Scale 时，Skill 按用户创作目标处理到**上层平台 / 模型安全规则、年龄 / 同意等适用约束允许的范围**；本 Skill 不试图绕过上层安全规则。

如果用户明确说“不要血 / 不要裸露 / 不要性内容 / PG-13 / 家庭友好”等，则该限制重新成为合法的用户显式约束，可以进入 Final Negative。

Final Preflight 必须扫描 Adapter 后的实际 Final Prompt：如果发现无来源的题材级禁止词，应删除或改写成当前真正需要的具体稳定性限制。

Failure：

> **Unrequested Content-category Negative Injection**

### 12.2 Adapter-output Concrete Technique + Impact Final Scan

`Concrete Technique Resolution PASS` 与 `Impact Realization PASS` 都不能只看 Stage-2 / Choreography 中间态。Prompt Assembly 或 Model Adapter 可能把已经具体的动作重新泛化，也可能把已经成立的 Force Causality 压扁成“猛烈击中 / 强力击退”这类抽象结果，所以在**实际要交付给用户的 Final Prompt**上只执行这一处合并 Final Scan，不新增第二个 Impact Scan Gate。

扫描范围：

- 扫描真正承担攻击、防守、抱控、摔控、支撑破坏、路线改变、主动权转移的 Action Clause；
- 对其中形成 meaningful force-bearing contact 的 Clause，同时检查 Technique 与 Impact Preservation；
- 不把人物总述里的“偏好低线腿法 / 擅长贴身控制 / 强调全身连动”等风格摘要误判为失败；
- Camera / Audio / Aftermath 描述不做 Technique Head Test；Accent 只检查是否有真实 Impact Anchor。

#### A. Concrete Technique Preservation

对每个 Active Technique Clause 依次问：

```text
1. 是否有明确动作 Head？
2. 是否有实际接触面 / 身体关系，而不只是“腿部 / 身体 / 低线 / 近身”？
3. 是否有明确目标 / 接触对象？
4. 是否有即时可见响应 / 状态后果？
5. 该句是否仍需要视频模型自己在多个不同 Mechanic 中任选一个，才能知道角色到底怎么做？
```

第 5 项只要为 `YES`，即使前四项出现了一部分信息，也不得 PASS。

重点拦截：

```text
低线干扰 + 目标
腿部绊阻 + 结果
身体压迫 + 方向变化
近身控制 + 身体部位
全身连动 + 反制结果
```

如果这些句子仍没有具体 Contact Mechanic，判：

> **Concrete Technique Serialization Leakage**

#### B. Impact Force Causality Preservation

对每个 meaningful Force-bearing Contact，再问：

```text
1. Concrete Contact Anchor 是否仍明确？
2. Readable Force Response 是否仍存在？
3. 最重要的 Combat State Consequence 是否仍存在？
4. Reaction 是否仍可读为由当前 Contact 导致，而不是受击者自主后退 / 后仰 / 飞出？
5. 是否只剩“猛烈 / 沉重 / 强力 / 震撼”等 adjective-only impact？
6. 若上游为 I3，Concrete Impact Anchor + highest-value Force Response + Motion Carry-over 是否仍保留？
```

此处**不重新计算 I1 / I2 / I3，不重新做 Modality Selection，也不重新规划 Impact**。Final Scan 只验证上游已经成立的 Impact Semantics 有没有在 Assembly / Adapter 最后一公里丢失。

若 Force Causality 被压坏，判：

> **Impact Force Causality Serialization Leakage**

典型 FAIL：

```text
上游：掌根推中上胸 → 肩轴被推偏 → 承重脚跨步 → 前冲趋势继续压入
Adapter：她猛烈击中他，他被强力击退
```

#### C. Local Repair Only

Technique 或 Impact 任一失败时，修复必须是**局部恢复，不是扩动作量**：

```text
定位漏网 Action Clause
→ 回看已确认 Combat System / Current State / Stage-2 Pattern Detail
→ 对 Technique：恢复一个已经合法的具体 Contact Mechanic
→ 对 Impact：恢复上游已经验证的 Contact / Force Response / State Consequence / 必要 Motion Carry-over
→ 保留原有 Result / Continuation / Camera Handoff
→ 不新增 Exchange
→ 不改变 Advantage / Ending
→ 不重新计算 Impact Salience
→ 不为了“打击感”自动添加 shake / slow motion / hit-stop / 音效
→ 不机械增加生物力学细节
```

例如：

```text
“低线干扰他的承重小腿，迫使他换支撑”
→ 只把“低线干扰”恢复为已经合法的具体动作，不改后面的换支撑结果与 Action Spine。

“掌根命中后他被猛烈击退”
→ 只恢复已在 Impact Gate 成立的肩轴 / 支撑 / Motion Carry-over 因果，不新增第二次攻击或额外特效。
```

#### D. No Unresolved Choice Leakage

Final Prompt 的 Active Action / Contact Clause 必须是**已决执行句**，不能把 Runtime 已经应该做完的 Technique、Contact Surface、Target、Direction 或 Environment Target 再交给视频模型二选一。

重点扫描：

```text
右肘/短拳
掌缘/掌根
面门/上胸
大腿外侧/髋前
墙/隔断
踢或扫
A 或 B
```

只有真正表示**同一连续身体区域**、不会改变动作机制或受力结果的自然范围描述才可保留；只要不同选项会改变 Contact Mechanic、Target Geometry、Force Response 或后续 State，就必须在 Final Scan 中收敛成一个。

Failure：

> **Unresolved Action Choice Leakage**

修复：只解析当前 Clause 的未决选择，不新增动作、不改变 Combat Spine。

#### E. No Hypothetical Aftermath Trigger

Final Prompt 中新增 Injury / Clothing / Environment Delta 必须消费主 Action Flow 中**已经明确发生的 Validated Impact / Force Event**。

禁止：

```text
若脸侧擦到……则出现红痕
如果短拳命中……则衣物褶皱加重
若办公椅被蹭到……则移位
```

如果主 Action Spine 没有明确建立该 Trigger，则：

```text
删除这条假设性 Aftermath
```

而不是为了保留 Aftermath 去反向新增一次 Contact。

Failure：

> **Hypothetical Aftermath Trigger**

Aftermath 可以描述已发生 Trigger 的 Delta 与 Lifetime，但不能自己创造“可能发生”的 Contact 分支。

#### F. Final Execution Density

Adapter Final Scan 检查的是：具体 Technique 与 Force Causality 有没有在最后一公里重新变抽象；以及指定时长里独立主事件是否过多。

同一 Contact 上同时写清接触、受力、呼吸、衣料、镜头和声音，不判失败，也不自动压缩。

只有 15 秒里又叠加换场、换主体或另一套完整高潮时，才判：

> **Main Event Overload**

并提醒用户，不靠删细节过关。不得通过删除有效 Exchange 或退回“双方高速连续攻防”来降密度。

---

## 13. Camera Runtime Freeze

本轮真实 Regression 暂未出现足够证据要求重构 Camera。

因此：

- 不修改 `action-camera-handoff-playbook.md`；
- 不新增 Camera Engine；
- 保持现有 Action-triggered Camera Handoff；
- 只在最终 Regression 检查其他修复是否破坏 Camera。

未来只有在 Generated-video Regression 明确出现：

- Camera 抢动作；
- Cut 造成 Motion Reset；
- Viewer Task 丢失；
- Adapter / Assembly 丢失 Camera Handoff；

才重新开启 Camera 专项修复。

---

## 14. Combat Final Preflight Additions

在现有 Final Preflight 基础上追加检查：

1. **Archetype Consumption**：有 Archetype 的角色是否真的读取了 Library？
2. **Archetype Realization**：动作本身是否能读出其 Runtime Bias？
3. **Per-Character Signature Separation**：双方打法是否持续可辨识？
4. **Ending Signature Compatibility**：Ending 是否偷换 dominant technique？
5. **Movement Causality**：Movement 是否真的制造下一战斗状态？
6. **Stage-2 Traceability**：Regression / Debug 是否存在 Gap → Slot → Pattern → Phrase 证据？
7. **Duration-aware Planning**：是否先考虑时长与 Active Coverage，再展开细节？
8. **Exchange Spine**：是否先有完整轻量 Combat Spine，再做局部 High-detail？
9. **Concrete Technique + Impact Final Scan**：关键 Technique 是否已经从 Pattern / 类别词实例化成具体动作；Adapter 后是否仍要求模型在多个不同 Mechanic / Target 中自行任选，是否存在 `/`、`或` 等未决 Action Choice；meaningful Force-bearing Contact 的 Concrete Contact Anchor、Readable Force Response、关键 Combat State Consequence 是否仍在；是否出现 `Concrete Technique Serialization Leakage`、`Unresolved Action Choice Leakage` 或 `Impact Force Causality Serialization Leakage`；I3 的 Concrete Impact Anchor、highest-value Force Response、Motion Carry-over 是否仍保留？
10. **Impact Realization + Motion Carry-over**：meaningful Force-bearing Contact 是否满足 `Concrete Contact + Readable Force Response + Combat State Consequence`；是否通过对应 Modality PASS；是否出现 Adjective-only Impact、Self-propelled Reaction、Contact Freeze、Neutral Reset、State-disconnected Reaction、Impact / Aftermath Duplication、Accent Without Anchor；I3 的 Concrete Impact Anchor、highest-value Force Response、Motion Carry-over 是否仍存在？
11. **Initial Injury Baseline + Delta Injury Onset + Aftermath Lifetime / Continuity**：首帧是否正确继承用户设定 / 参考素材 / 上游剧情已经存在的伤势，而没有无因清除；对于本段后续攻击才产生的新伤，Trigger 前是否保持“无该 Delta”，每个新增血迹 / 淤青 / 擦伤 / 红肿 / 破皮是否绑定明确 Trigger，并只从 Trigger 后叠加到 Baseline；是否出现 `Hypothetical Aftermath Trigger`，即 Aftermath 自己用“若 / 如果命中”创造主 Action Flow 中并未发生的 Contact；Persistent / Progressive 是否仅在状态成立后持续 / 累积；是否存在 Premature Injury / Damage Preload 或 Baseline Injury Reset；其他 Aftermath 是否仍正确区分 Transient / Persistent / Progressive，并避免 Reset / Over-persistence？
12. **Final Negative Content Neutrality**：是否只保留当前真实生成风险；是否出现无来源的 `不要血腥 / no blood / no gore / no adult / no sexual content / no nudity` 等题材级 blanket Negative？如果有，且不是用户显式要求或上层规则要求，必须删除。
13. **Exchange Density / Final Execution Density**：是否把画面维度写细误判为过载；指定时长里独立主事件是否过多却未提醒；是否为了“更短”把具体动作压回摘要？
14. **Concrete Resolution**：动作 Head / 接触 / 后果是否仍明确可执行；已写清的光影 / 镜头 / 身体反馈是否被自动删掉？
15. **Serialization Deduplication**：同一控制语义是否被多段重复？尤其不能在去重时删掉唯一的新伤 Injury Trigger / Onset 表达，只留下全局最终伤势结果；也不能把 Baseline 旧伤误删或误改成新伤。
16. **Camera Preservation**：现有 Action–Camera Handoff 是否未被破坏？

如果任何关键 Gate 失败，优先回到对应 Failure Layer 修复；不要第一反应扩知识库。

---

## 15. Anti-overdesign

本文件禁止演化为：

- 新 Combat State Machine；
- Lower-body Engine；
- Body Method Engine；
- 明星独立 Combat Engine；
- 固定 Combo Library；
- 固定 Technique 动词白名单 / 固定招式字典；
- 固定动作数 / Exchange 数；
- 固定腿法 / 换位次数；
- 固定 Force / Impact 数值模型或持久 Meter；
- 固定受伤数量 / 固定流血次数 / 每击必留伤；
- 固定衣物破损或环境破坏配额；
- 第二套 Camera Runtime；
- 固定 Skeleton 模板。

本轮目标是修复消费顺序、选择权重、动作密度、Concrete Technique 最终序列化、Impact Force Causality / Motion Carry-over、Aftermath Baseline / Delta 出生时刻与生命周期、Final Negative 边界与序列化，不是增加系统层数。
