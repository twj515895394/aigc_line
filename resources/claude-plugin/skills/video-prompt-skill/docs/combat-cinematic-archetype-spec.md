# Combat Cinematic Archetype Spec

> 状态：已确认，CA-01～CA-08 已收口
> 日期：2026-08-15
> 作用：定义少量华语电影武打明星参考型、中国功夫电影混合体系，以及它们在 Action Combat Interactive / Runtime 中的职责边界。

## 1. 核心目标

本设计解决三个问题：

1. 不再把 `MMA / 太极 / 咏春 / 八极 / 截拳道` 等真实技法体系，与“李连杰式 / 吴京式 / 甄子丹式 / 成龙式 / 李小龙式”电影动作表达混在同一层；
2. 用户明确追求中国功夫电影观感时，不再因为“现代 / 办公室 / 杀手 / 警匪”机械优先推荐 MMA；
3. 用户只想要“中国武打电影动作”，又不关心严格门派时，允许使用宽泛但受控的 `Chinese Cinematic Kung-fu Hybrid`，而不是被迫选择单一拳种。

---

## 2. 正式分层

```text
Character / Narrative Identity
→ 职业、年龄、性别、关系、题材身份
→ 不直接决定 Combat System

Combat System / Technique Backbone
→ 角色真正使用什么技法体系
→ 太极 / 咏春 / 八极 / 散打 / MMA / 泰拳 / 拳击 / 截拳道 / JKD
→ 中国功夫电影混合体系 / Chinese Cinematic Kung-fu Hybrid

System Refinement
→ 当前体系具体偏什么技术逻辑

Combat Expression / Performance Identity
├─ 子维度 A：Character Combat Expression
│  → 冷静 / 凶狠 / 克制 / 从容
│  → 主动压迫 / 后发反制 / 诱导 / 节奏破坏
│  → 风险偏好 / 杀意 / 留手 / 再进入倾向
└─ 子维度 B：Cinematic Combat Archetype（optional）
   → 李连杰型 / 吴京型 / 甄子丹型 / 成龙型 / 李小龙型

Physical Presentation Domain
→ Modern Grounded / Modern Cinematic / Cinematic Wuxia 等物理表现尺度

以上信息
→ Derived Choreography Direction
→ Stage-2 Movement / Technique / Transition
→ Concrete Action Phrase
→ Prompt Assembly / Final Preflight
```

核心边界：

> **Combat System = 会什么。**
>
> **Character Combat Expression = 以什么人物气质和决策方式使用。**
>
> **Cinematic Combat Archetype = 在电影里希望呈现成什么动作表达。**

---

## 3. Interactive 结构

Action Combat 继续保持两个核心角色打斗节点：

```text
Round 1：Combat System / System Refinement
Round 2：Combat Expression / Performance Identity
```

### Round 2：同轮双子维度

Round 2 内部采用两个**分别选择、分别表达、同轮完成**的子维度：

```text
子维度 A：人物战斗表达
→ 冷静 / 凶狠 / 克制 / 主动压迫 / 后发反制 / 节奏破坏 ...

子维度 B：电影武打参考（optional）
→ 李连杰型 / 吴京型 / 甄子丹型 / 成龙型 / 李小龙型 / 不指定 / 自定义
```

规则：

- 不新增固定 `Round 3：明星武打风格`；
- 两个子维度分开展示，不提前组合成套餐；
- 用户可以自由组合任意 Expression 与任意 Archetype；
- 不得默认绑定“李连杰型 = 冷静”“吴京型 = 凶狠”等人物性格；
- 用户不需要明星参考时，Archetype 可以为空；
- 用户已明确 Archetype 时直接继承，不重复确认；
- 仍然属于同一个 Primary Planning Node，因此不违反 `One Question, One Primary Decision Node`。

示例：

```text
Round 2｜Combat Expression / Performance Identity

人物战斗表达：
女方 = 冷静诱导 / 后发反制
男方 = 凶狠主动 / 持续压迫

电影武打参考（可选）：
女方 = 李连杰型
男方 = 吴京型
```

---

## 4. 五种 Cinematic Combat Archetype

执行语义真源：

`references/libraries/combat-cinematic-archetypes/library.md`

### 4.1 李连杰型｜轻灵流畅 / 武术线条

- 身法、步法、腿法、转身、高低位明显参与；
- 全身动作线条清楚；
- 快而不乱，强调连续流动与技术可读性；
- 避免长期原地站桩交换。

### 4.2 吴京型｜硬朗爆发 / 全身压迫

- 爆发进入、重接触、逼退、破平衡、再进入；
- 短打、腿法、摔控可以快速串联；
- 重量感、压迫感更强；
- 仍必须保持 Position / Range / Balance 的动态变化。

### 4.3 甄子丹型｜极速现代融合 / 近身连锁

- 高速截击、拳腿肘膝、短控、快速换距与 Counter Chain；
- 现代融合，但不等于 MMA；
- 上肢动作密集时必须由 Footwork / Axis / Level / Position 变化打断静态模式；
- 禁止退化成笼斗式站桩互殴。

### 4.4 成龙型｜环境互动 / 空间即武器

- 跑、绕、翻、钻、跌扑恢复、障碍穿越；
- 桌椅、门框、栏杆、楼梯、墙面、道具等成为动作链原因；
- Environment 必须改变 Position / Range / Axis / Advantage；
- Comedy Tone 可选，不强制绑定。

### 4.5 李小龙型｜爆发截击 / 节奏破坏 / 极简直接

- Interception / Stop-hit / Broken Rhythm；
- Explosive Entry / Exit / Range Control；
- 假动作、突然提速、短促爆发、立即换距 / 换线；
- Footwork 承担进入、退出、诱导和重新定距；
- 禁止写成长时间原地高速挥拳。

---

## 5. Combat System 与 Archetype 的边界

禁止混层：

```text
李小龙型 ≠ 截拳道 / JKD
甄子丹型 ≠ MMA
李连杰型 ≠ 某一固定传统拳种
成龙型 ≠ 喜剧格斗体系
吴京型 ≠ 军警 / 杀手职业体系
```

合法组合：

```text
截拳道 + 李小龙型
散打 + 李小龙型
咏春 + 甄子丹型
八极 + 吴京型
太极 + 李连杰型
Chinese Cinematic Kung-fu Hybrid + 任意合理 Archetype
任意合理 Combat System + 成龙型环境编排
```

Archetype 只改变电影动作表达权重，不覆盖已确认 Technique Backbone。

最终 Prompt 优先外显为中性动作语义，而不是仅写明星姓名。

---

## 6. Round 1 推荐联动

当用户明确表达以下任一目标：

- 中国功夫电影 / 华语武打片观感；
- 李连杰 / 吴京 / 甄子丹 / 成龙 / 李小龙式电影武打；
- 不要站桩；
- 希望更丰富的身法、步法、腿法、转身、高低位、路线和空间移动；

Round 1 推荐策略必须响应这个观看目标：

```text
Chinese cinematic kung-fu intent
→ 优先展示 Whole-body Movement / Footwork / Body Method / Kick Integration / Route Change 更丰富的合理体系
→ 散打 / 八极 / 长拳 / 咏春 / 截拳道 / JKD / Chinese Cinematic Kung-fu Hybrid ...
→ MMA 仍可作为候选，但不机械占首位
```

边界：

- 不是全局贬低 MMA；
- 用户明确要竞技综合格斗、笼斗或真实 MMA 时，MMA 仍优先；
- Modern 场景不等于 MMA 默认；
- 某个 Archetype 不得自动锁定某个 Combat System；
- 最终避免 Static Standing Combat 仍由 Movement / Stage-2 / Choreography / Final Preflight 保证。

原则：

> **题材身份不能决定 Combat System，但用户明确的动作观感目标可以影响 Round 1 推荐排序。**

---

## 7. 中国功夫电影混合体系 / Chinese Cinematic Kung-fu Hybrid

### 7.1 定位

当用户想要“中国武打电影动作”，但不关心角色严格属于某一真实拳种 / 门派时，Round 1 允许提供：

> **中国功夫电影混合体系 / Chinese Cinematic Kung-fu Hybrid**

它属于合法宽泛 `Combat System / Technique Backbone`：

- 以中国武术电影动作语言为主；
- 允许合理组合拳法、掌法、腿法、身法、步法、摔控、转身、高低位与路线变化；
- 目标是完整 Whole-body Choreography，而不是严格门派还原。

### 7.2 不是万能动作池

Hybrid 不是：

- “什么招都可以随便混”的标签；
- 无视 State / Range / Contact / Axis / Position 的动作大杂烩；
- 跳过专业动作知识的捷径；
- 任一明星 Archetype 的同义词。

Runtime 仍必须执行：

```text
Current State / Range / Contact
→ Movement / Technique / Transition Gap
→ 合理 Pattern / Technique Knowledge
→ Concrete Action Phrase
→ Opponent Response
→ Position / Axis / Range / Balance Consequence
→ Immediate Continuation
```

### 7.3 Hybrid × Archetype

```text
Hybrid + 李连杰型
→ 更轻灵、流畅、全身线条清楚

Hybrid + 吴京型
→ 更硬朗、爆发、重接触和压迫

Hybrid + 甄子丹型
→ 更高速现代融合、近身连锁和快速换距

Hybrid + 成龙型
→ 更强环境互动、空间穿越和失衡恢复

Hybrid + 李小龙型
→ 更强截击、Broken Rhythm、爆发进退和距离控制
```

> **Hybrid 决定“不被单一门派锁死的 Technique Backbone”；Archetype 决定“这套动作在电影里怎么呈现”。**

### 7.4 CA-08：Hybrid 默认自动编排，不固定追问混哪些门派

用户选择 `Chinese Cinematic Kung-fu Hybrid` 后：

```text
默认
→ 不再追加“具体混哪些拳种 / 门派？”的固定问题
→ Runtime 根据 Archetype + Character Combat Expression + Scene + Range + 当前动作缺口
→ 静默选择合理 Movement / Technique / Transition Knowledge
→ 生成具体可执行 Choreography
```

原因：Hybrid 本身就是为了避免用户被迫先锁定具体门派。如果选择 Hybrid 后又固定追问“到底混八极还是散打”，会抵消这个选项的价值并增加低收益交互。

只有用户**主动明确具体混合偏好**时才进入 `Hybrid Refinement`，例如：

```text
“以八极为主，混一些散打腿法”
“主要想要长拳身法，但近身加入咏春”
“截拳道式进退，再混中国武术电影腿法”
```

此时：

```text
用户明确的主 / 辅倾向
→ 作为 Hybrid Refinement 继承
→ Runtime 不再自行改成另一套主要体系
```

如果用户没有明确：

> **Do not ask by default. Resolve silently.**

这不是取消专业性，而是把专业选择从用户问卷下沉到 Stage-2 Runtime。

---

## 8. Runtime 合成

```text
Per-Character Combat System
+ System Refinement / Hybrid Refinement（if explicit）
+ Character Combat Expression
+ Cinematic Combat Archetype（optional）
+ Physical Presentation Domain
+ Scene / Range / Environment / Intent
→ Derived Choreography Direction
→ Stage-2 Gap Detection
→ Pattern / Technique Knowledge
→ Concrete Action Phrase
→ Subject Motion / Motion Carry-over
→ Action–Camera
→ Prompt Assembly
→ Final Preflight
```

---

## 9. Anti-overdesign

明确不做：

- 不新增固定 Round 3；
- 不给每位明星建立独立 Combat Engine；
- 不为每位明星建立固定 Combo；
- 不把电影作品逐片做招式库；
- 不因为存在明星 Archetype 就跳过 Combat System；
- 不把五种 Archetype 固定展示给所有 Combat 用户；
- 不把人物战斗表达和明星 Archetype 预组合成套餐；
- 不把 Hybrid 做成无约束万能动作池；
- **不在用户选择 Hybrid 后固定追问具体混哪些门派；**
- 不无限收录知名动作演员；只有动作语言足够独立、稳定、可执行且能显著改变生成结果时才扩展。

---

## 10. 当前已确认决策

### CA-01
李连杰 / 吴京 / 甄子丹 / 成龙 / 李小龙作为少量稳定 `Cinematic Combat Archetype`；明星名称用于用户易理解的导演参考，Runtime / Final Prompt 转换成中性动作语义。

### CA-02
`Cinematic Combat Archetype ≠ Combat System`；例如 `截拳道 / JKD` 是 Combat System，`李小龙型` 是电影动作表达。

### CA-03
Cinematic Combat Archetype 挂在 Round 2 `Combat Expression / Performance Identity` 下作为可选子维度，不新增固定 Round 3。

### CA-04
Round 2 可以同时决定人物气质 / 决策倾向与可选 Archetype，仍属于同一 Primary Planning Node。

### CA-05
Round 2 采用同轮双子维度分别选择：`Character Combat Expression` 与 `Cinematic Combat Archetype` 分开展示，不预组合套餐。

### CA-06
用户明确追求中国功夫电影 / 华语武打 / 不站桩 / 明星型功夫电影观感时，Round 1 不默认优先 MMA；优先给 Whole-body Movement 更丰富的合理中国武术体系。MMA 保留合法候选。

### CA-07
Round 1 允许提供 `Chinese Cinematic Kung-fu Hybrid` 作为宽泛 Technique Backbone；它必须由 Stage-2 Movement / Technique / Transition Knowledge 具体化，不能退化成无约束大杂烩。

### CA-08
选择 `Chinese Cinematic Kung-fu Hybrid` 后，**默认不再追问具体混哪些拳种 / 门派**；Runtime 根据 Archetype、Character Combat Expression、Scene、Range 与当前动作缺口静默完成具体编排。只有用户主动给出主 / 辅体系倾向时才进入 `Hybrid Refinement`。

---

## 11. 下一实施批

Interactive Runtime 下一批一次性落实 CA-05～CA-08：

1. **Round 2 双子维度**：Character Combat Expression + optional Cinematic Combat Archetype；
2. **Round 1 推荐排序**：Chinese cinematic intent 下 whole-body-capable systems first，MMA 不机械首位；
3. **Hybrid 合法候选**：不要求严格门派时可选 Chinese Cinematic Kung-fu Hybrid；
4. **Hybrid 默认静默展开**：不固定追加门派混合问卷；只有用户主动指定时做 Hybrid Refinement；
5. Archetype / Hybrid 最终都必须进入 Derived Choreography Direction 与 Stage-2 具体化，不允许停留在标签层。