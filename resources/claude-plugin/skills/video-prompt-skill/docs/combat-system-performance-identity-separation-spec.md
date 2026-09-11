# Combat System × Performance Identity Separation Spec

> 状态：MVP 测试版已收口
> 日期：2026-08-15
> 背景：G01 最新真实 Interactive 回归暴露出 `职业杀手` 与 `Fighting Direction / Combat System` 混层问题。本批只解决“角色身份 × 打斗方式”的交互与规划语义，不继续扩具体拳种 / 流派知识。

## 1. 已确认问题

当前 Interactive 候选曾把：

- `现代职业杀手近身格斗`
- `综合格斗 / MMA`
- `中国武术电影化近身格斗`

放在同一 Fighting Direction 层级。

这会把人物身份 / 题材语义错误地当成技法体系。真实运行中因此出现：用户输入“两名职业杀手”后，系统推荐“现代职业杀手短打”，从而让固定 G01 的 MMA 基线发生漂移。

本批目标不是继续细化“每一种拳具体怎么打”，而是先修正上游概念和交互结构，再用真实 G01 回归验证方向。

---

## 2. 已确认原则：身份与技法体系分离

正式拆分为不同维度：

```text
Character / Narrative Identity
职业杀手、特工、警察、街头人物、竞技选手、武术宗师……
        ↓ 不直接决定
Combat System / Technique Backbone
MMA、太极、咏春、八极、泰拳、拳击、柔术、散打……
        ↓
System Refinement
同一体系在当前角色上的具体技术偏向 / 使用方式
        ↓
Combat Expression / Performance Identity
气质 + 战斗决策倾向
        ↓
Derived Choreography Direction
Runtime 自动综合出的整场动作方向
        ↓
Final Choreography
```

核心约束：

> Character / Narrative Identity ≠ Combat System / Technique Backbone。

职业、身份、年龄、性别、外貌、体型都不能直接映射成固定技法体系。

例如以下组合全部合法：

- 职业杀手 + MMA
- 职业杀手 + 太极
- 职业杀手 + 咏春
- 职业杀手 + 八极
- 职业杀手 + 柔术

“职业杀手”可以影响动作表现气质、决策效率、杀意、冗余程度和战术意图，但不能自动变成 Tactical Close Combat / 短打 / 抱控。

---

## 3. 已确认 Interactive 策略：固定两个核心角色打斗节点

用户明确选择：**固定拆成两轮核心交互，以更准确理解需求。**

```text
Round 1：Combat System / Technique Backbone
→ 每个关键角色使用什么格斗 / 武术体系；已明确时改为 Refinement

Round 2：Combat Expression / Performance Identity
→ 每个关键角色以什么人物气质和战斗决策倾向使用该体系；已明确时继续 Refinement
```

这两轮属于不同 Primary Planning Node，不允许重新混成一个组合候选轴。

### Interaction 原则

- 每轮仍然只解决一个 Primary Planning Node；
- 一轮可以同时覆盖 1v1 双方，不等于一次只能描述一个角色；
- Round 1 不提前替用户决定 Combat Expression；
- Round 2 不允许反向偷改已确认 Combat System；
- 系统把两轮结果在 Runtime 内组合，而不是在候选层提前捆绑；
- 用户明确要求停止深挖 / 先实现测试时，本批立即收口，不继续钻具体流派细节。

---

## 4. 已确认：Combat System 属于角色级属性

用户明确选择：**每个角色独立定义 Combat System / Technique Backbone。**

```text
Combatant A → Combat System A
Combatant B → Combat System B
...
```

允许：

- 双方使用相同体系：`太极 vs 太极`；
- 双方使用不同体系：`太极 vs MMA`；
- 多人场景中不同角色拥有不同体系；
- 用户只指定其中一方时，另一方继续保持未决，按 Interactive / Quick 规则处理。

因此 `Technique Backbone` 与后续 `Persistent Combat Signature` 应优先按角色维护，而不是整场共享一个固定 Fighting Profile。

---

## 5. 已确认：Combat Expression 也属于角色级属性

用户明确选择：**每个角色独立定义 Performance Identity / Combat Expression。**

```text
Combatant A
→ Character / Narrative Identity A
→ Combat System A
→ System Refinement A
→ Combat Expression A

Combatant B
→ Character / Narrative Identity B
→ Combat System B
→ System Refinement B
→ Combat Expression B
```

双方即使身份、体系完全相同，也允许拥有不同的战斗表达。

例如：

```text
A：职业杀手 + 太极 + 偏听劲 / 粘随 / 换轴 + 冷静诱导 / 后发反制
B：职业杀手 + 太极 + 偏实战发劲 / 贴身 + 主动压迫 / 连续抢先手
```

---

## 6. 已确认：固定轮次采用 Selection-or-Refinement

用户明确选择：**对应层已明确时不重复确认，而把该轮升级为精炼。**

### Round 1：Combat System

```text
用户未明确 Combat System
→ Selection：选择每个关键角色的格斗 / 武术体系

用户已明确 Combat System
→ Refinement：精炼该体系在当前角色上的具体实现方向
```

例如用户已写：

```text
女方：太极
男方：MMA
```

不再问“是否确认太极 / MMA”，而精炼为：

```text
女方太极：偏听劲 / 借力 / 实战发劲 / 粘随换轴……
男方 MMA：偏拳腿 / 拳摔 / Clinch / Counter……
```

精炼结果仍属于原体系的子方向，不允许偷偷换体系。

### Round 2：Combat Expression

```text
用户未明确 Combat Expression
→ Selection：选择每个角色的战斗气质 / 意图 / 主动权策略

用户已明确 Combat Expression
→ Refinement：继续精炼节奏、杀意、克制程度、主动 / 反制倾向等表现
```

最终规则：

> **Known → Refine；Unknown → Select。**

---

## 7. 已确认：1v1 合并问，多人战动态拆分

用户明确选择：**1v1 同一轮同时定义双方；多人战按角色重要性拆分。**

### 1v1

```text
Round 1 → 同时定义双方 Combat System / System Refinement
Round 2 → 同时定义双方 Combat Expression
```

这仍满足 `One Question, One Primary Decision Node`，因为同一轮只解决一个字段维度。

### 1vN / 多人战

- 主角：独立定义；
- 关键对手：独立定义；
- 次要敌人：允许按战斗功能 / 群组共享 System / Expression；
- 禁止让角色数量机械变成交互轮数。

---

## 8. 已确认：Combat Expression 的职责边界

用户明确选择：**Combat Expression = 人物气质 + 战斗决策倾向，但不直接定义具体招式。**

它可以表达：

- 冷静 / 凶狠 / 克制 / 从容；
- 主动压迫 / 后发反制 / 诱导 / 节奏破坏；
- 风险偏好；
- 抢主动、丢主动后的再进入倾向；
- 杀意 / 留手 / 竞技感等。

它不能直接承担：

- “低扫接直拳”；
- “肘击后抱摔”；
- 具体 Combo；
- 具体 Technique Pattern。

职责划分：

```text
Combat System
→ 会什么体系

System Refinement
→ 这套体系主要怎么用 / 偏哪些技术逻辑

Combat Expression
→ 这个人以什么气质和决策方式去使用这些技术
```

---

## 9. 已确认：Primary + Optional Secondary Combat System

用户明确选择：**每个角色允许主体系 + 可选辅助体系。**

MVP 数据结构：

```text
Primary Combat System：1 个
Secondary Combat System：0~1 个
```

原则：

- Primary 决定大多数 Entry / Movement / Technique / Continuation；
- Secondary 只在 Range / Contact / Tactical State 合适时介入；
- 禁止为了“丰富”频繁随机切换体系；
- 特殊复杂任务后续可以扩展，但本次 MVP 不继续深挖。

### 混合体系处理

用户确认：**像 MMA 这种完整混合体系仍可作为一个 Primary System。**

例如：

```text
Primary：MMA
Refinement：拳摔结合 / 偏 Wrestling Entry
Secondary：无
```

而：

```text
Primary：MMA
Refinement：站立拳腿主导
Secondary：八极
```

才属于真正跨体系叠加。

因此：

> **体系内部偏科 → System Refinement；真正跨体系 → Secondary System。**

本批不继续针对每一种体系建立细粒度规则，先验证结构是否有效。

---

## 10. 已确认：Combat Branch 与 Combat System 正交

用户明确选择：**Combat System 与 Combat Branch 完全独立。**

`Combat System / Technique Backbone` 回答：

> 角色具体会什么、主要依靠什么技法体系解决战斗。

`Combat Branch` 重新解释为：

> **Combat World / Physical Presentation Domain：当前世界允许什么物理尺度，以及动作以什么电影表现尺度呈现。**

```text
Combat System
→ Technique Backbone

Combat World / Physical Presentation Domain
→ 物理尺度 / 电影化尺度 / 世界表现规则
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

当前 `modern-combat-playbook.md` 与 `cinematic-wuxia-playbook.md` 暂不重构；MVP 先只修正 Interactive 语义，并保留后续兼容执行路径。

---

## 11. 已确认：Physical Presentation Domain 条件暴露

用户明确选择：**Physical Presentation Domain 不固定增加一轮，只在高价值歧义存在时询问。**

```text
用户描述足够明确
→ 静默推导

存在两个以上合理物理 / 电影尺度
+ 选择会显著改变动作实现
+ 无法高置信度代替用户决定
→ 单独条件暴露
```

例如“现代办公室、写实职业杀手”通常可静默落到 Modern Grounded / Modern Cinematic Grounded；而“两个太极高手，要很电影化”可能同时支持现代动作电影与 Cinematic Wuxia，应条件询问。

---

## 12. 已确认：Fighting Direction 降级为 Derived Choreography Direction

用户明确选择：**旧 `Fighting Direction / 怎么打` 不再作为独立用户决策节点。**

Runtime 内仍保留一个综合结果，但重命名为：

> **Derived Choreography Direction**

它由以下信息自动综合：

```text
Per-Character Combat System
+ System Refinement
+ Per-Character Combat Expression
+ Combat World / Physical Presentation Domain
+ Scene / Range / Environment / Intent
→ Derived Choreography Direction
```

例如“灵活身法与角度争夺”“拳摔压迫”“后发反制型连续换轴”等可以成为派生结果，而不再作为用户额外选择一次的标签。

### MVP 兼容策略

为了先测试方向、避免立即重构整个 Stage-2 / Choreography Runtime：

```text
新交互层
→ Combat System / Refinement / Expression / Domain
→ Derived Choreography Direction
→ 临时映射到 legacy Fighting Direction execution slot
→ 继续使用现有 Stage-2 / Persistent Signature / Subject Motion / Action–Camera 执行链
```

注意：legacy `Fighting Direction` 在这个兼容层里只是执行槽，不再代表用户直接选择。

---

## 13. 本批 MVP 实现范围

### 本次实现

只优先修改：

- `assets/templates/mode-interactive-output-contract.md`

目的：验证真实 Interactive 是否完成概念分层，尤其验证 G01 不再发生：

```text
职业杀手
→ 推荐“现代职业杀手短打”
→ 从而替换掉真正的 Combat System 决策
```

### 本次暂不实现

先不动：

- 具体拳种 / 武术流派知识扩展；
- Modern / Wuxia Playbook 大重构；
- Stage-2 Pattern Library 扩展；
- Choreography 全字段重命名；
- Quick Mode 全量迁移；
- Model Adapter 新逻辑。

原则：

> **先验证上游交互方向，再决定是否继续下游大改。**

---

## 14. G01 MVP 回归预期

原请求仍使用办公室职业杀手场景。

### 旧错误行为

第一问把“职业杀手”直接变成 Fighting Direction，候选出现：

```text
现代职业杀手短打（推荐）
MMA
中国武术电影化……
```

这是身份与体系混层，FAIL。

### 新预期行为

#### Round 1：Combat System / Refinement

应该只围绕双方的 Technique Backbone / System 展开，不把“职业杀手”作为体系选项。

例如可以推荐：

```text
女方：MMA，拳腿组合倾向
男方：MMA，拳肘 + 抱摔倾向
```

也允许用户改成：

```text
女方：太极
男方：MMA
```

#### Round 2：Combat Expression

在保持 Round 1 体系不变的前提下，再询问双方战斗气质与决策倾向，例如：

```text
女方：冷静、诱导、反制后快速夺主动
男方：主动压迫、持续抢先手、失去控制后快速再进入
```

“职业杀手”可以影响推荐气质，但不能改掉 Combat System。

#### Physical Presentation Domain

办公室场景如没有额外歧义，默认不需要再问，可静默推导 Modern Cinematic Grounded。

#### Derived Choreography Direction

系统随后自动综合，而不是再让用户选择“现代杀手短打 / 灵活身法 / MMA”等重复标签。

---

## 15. MVP PASS / FAIL

### PASS

- 职业 / 身份不再作为 Combat System 候选；
- 1v1 第一轮能同时定义双方 System；
- 第二轮独立定义双方 Expression；
- 已明确体系时 Round 1 进入 Refinement，而不是重复确认；
- Combat Expression 不偷改体系；
- Physical Presentation Domain 只在高价值歧义时暴露；
- 不再出现独立 Fighting Direction 用户问卷；
- Runtime 能得到 Derived Choreography Direction 并继续旧执行链。

### FAIL

- 仍推荐“职业杀手短打”作为与 MMA / 太极同级体系；
- 因职业、年龄、性别、体型自动给角色分配技法；
- Round 2 把太极换成咏春、把 MMA 换成泰拳；
- 又额外追问一次旧 Fighting Direction；
- 为每个角色机械拆成多轮导致 1v1 固定四轮；
- 为了新结构立即扩大量流派细节，导致测试变量失控。

---

## 16. 下一步

本批 Spec 在 MVP 层面已经足够闭环。

下一步顺序固定为：

```text
更新 Interactive Runtime
→ 固定 G01 真实交互回归
→ 检查 Round 1 / Round 2 / Domain / Derived Direction
→ 如果交互方向 PASS，再继续 Prompt Runtime / Choreography 迁移
→ 如果交互方向 FAIL，优先修上游，不扩下游知识
```
