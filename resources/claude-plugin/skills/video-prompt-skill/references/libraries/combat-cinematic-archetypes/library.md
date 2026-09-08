# Combat Cinematic Archetypes Library

## 1. 作用

本资料库提供少量、具有明确电影动作语言差异的 **Cinematic Combat Archetype / 电影武打表达原型**。

它回答：

> **已经确认的 Combat System，在电影里希望呈现成什么样的动作表达。**

它不回答角色真正“会什么体系”。

因此必须与 `Combat System / Technique Backbone` 分离：

```text
Combat System
→ 太极 / 咏春 / 八极 / 散打 / MMA / 泰拳 / 拳击 / 截拳道 / 其他体系

Cinematic Combat Archetype
→ 李连杰型 / 吴京型 / 甄子丹型 / 成龙型 / 李小龙型

Combat Expression
→ 冷静 / 凶狠 / 克制 / 主动压迫 / 后发反制 / 节奏破坏等人物决策气质
```

最终由 Runtime 综合：

```text
Combat System
+ System Refinement
+ Cinematic Combat Archetype（如用户选择）
+ Combat Expression
+ Physical Presentation Domain
+ Scene / Range / Environment
→ Derived Choreography Direction
```

明星名称只作为用户容易理解的导演参考标签。最终 Prompt 应优先转换成下面的中性动作语义，而不是只写“像某某明星”。

---

## 2. 使用规则

- Archetype 是 **电影动作表达参考**，不是拳种 / 门派 / Combat System；
- 允许用户直接选择明星参考，也允许只使用中性标签；
- 不要求每场 Combat 必须选择明星 Archetype；
- 不把 Archetype 当固定 Combo 或固定招式表；
- Archetype 只能影响动作选择权重、Movement、Range Transition、Rhythm、Environment Use、Impact 与 Continuation 方式；
- 具体动作仍必须由当前 Combat System、Stage-2 Knowledge、Range / Contact / Axis / Position / Opponent Response 生成；
- 两个角色可以使用不同 Archetype，也可以共享同一 Archetype；
- 如果用户明确说“截拳道”，优先理解为 Combat System；如果说“李小龙那种电影打法”，优先理解为 Cinematic Combat Archetype。

---

## 3. 李连杰型｜轻灵流畅 / 武术线条

### 核心观感

- 轻灵、干净、快速但不杂乱；
- 全身动作线条清楚；
- 身法、步法、腿法、转身和高低位变化自然进入连续攻防；
- 技术可读性强，动作完成度高，但不能因此变成逐招停顿展示。

### Runtime 偏置

- 提高：`Footwork / Route Change / Axis Change / Level Change / Kick Integration / Whole-body Linkage`；
- 偏好连续的转身、绕位、穿线、侧切和全身动力链；
- 普通 Exchange 仍保持流动，不让上肢控制长期占主导；
- Impact 清晰但不过分追求笨重碰撞。

### 中性 Prompt 语义

`fluid Chinese cinematic kung-fu choreography, elegant whole-body footwork, clear body lines, fast directional changes, integrated kicks and turns, continuous high-low transitions, clean readable motion without static trading`

---

## 4. 吴京型｜硬朗爆发 / 全身压迫

### 核心观感

- 更硬、更猛、更有冲击和压迫；
- 仍保留明显武术身法、腿法和路线移动；
- 短打、冲入、腿法、失衡、摔控可以快速串联；
- 重量感高于李连杰型，但不退化成原地互殴。

### Runtime 偏置

- 提高：`Explosive Entry / Whole-body Drive / Hard Contact / Forced Step / Base Disruption / Re-entry`；
- Movement 需要真实推动 Position / Balance / Range 改变；
- 接触后优先产生逼退、偏轴、失衡或路线变化；
- 保持攻击链短促强硬，但避免连续静态 Clinch。

### 中性 Prompt 语义

`hard-edged Chinese cinematic combat, explosive whole-body entries, aggressive footwork, heavy contact, integrated kicks and short strikes, forced steps and balance disruption, continuous pressure with active repositioning`

---

## 5. 甄子丹型｜极速现代融合 / 近身连锁

### 核心观感

- 现代、快速、融合度高；
- 拳、腿、肘、膝、截击、短距离控制和快速 Range Transition 可连续进入；
- 节奏密度高，但动作仍有电影化路线变化和全身驱动；
- 不等于 MMA，也不能因为混合技术而退化成笼斗式站桩交换。

### Runtime 偏置

- 提高：`Rapid Interception / Close-range Chain / Burst Footwork / Range Transition / Counter-to-counter / Short Control Handoff`；
- Contact 应快速转成下一次攻击、换位、破平衡或 Range Change；
- 上肢动作密度高时，必须由 Footwork / Axis / Level / Position 变化打断静态模式；
- 允许现代格斗元素，但表达目标是电影动作流动，不是竞技规则还原。

### 中性 Prompt 语义

`rapid modern cinematic kung-fu fusion, explosive footwork, fast interception and counter chains, fluid transitions between strikes, kicks and short-range control, frequent range changes, full-body motion instead of stationary trading`

---

## 6. 成龙型｜环境互动 / 空间即武器

### 核心观感

- Environment 与 Route 是动作编排核心；
- 跑、绕、翻、钻、跨、跌扑、失衡恢复、借物位移不断改变空间；
- 桌椅、门框、栏杆、楼梯、墙面、道具等不是装饰，而是下一动作原因；
- Comedy Tone 是可选属性，不是强制绑定。

### Runtime 偏置

- 大幅提高：`Environment Affordance / Route Change / Recovery / Improvised Object Interaction / Obstacle Traversal`；
- 被压迫、失衡、脱离、重新进入之间保持连续运动；
- Environment 使用必须改变 Position / Range / Axis / Advantage，而不是随机砸东西；
- 严肃动作场景可完全关闭喜剧节奏，只保留环境编排逻辑。

### 中性 Prompt 语义

`environment-driven cinematic martial choreography, constant route changes, obstacle traversal, improvised use of furniture and architecture, dynamic falls and recoveries, continuous re-entry through space, physical comedy optional rather than mandatory`

---

## 7. 李小龙型｜爆发截击 / 节奏破坏 / 极简直接

### 核心观感

- 极强的速度爆发和突然进入；
- 核心不是招式繁复，而是 **截击、抢先、节奏破坏、距离控制和极端直接性**；
- 动作通常短、锐、突然，中间可通过假动作、停顿、变节奏制造阅读差；
- Footwork 轻快敏捷，随时改变前后距离和攻击线；
- 高速连击存在，但不应写成站在原地持续挥拳。

### Runtime 偏置

- 提高：`Interception / Stop-hit / Broken Rhythm / Explosive Entry / Exit / Range Control / Feint / Sudden Tempo Shift`；
- Footwork 应承担进入、退出、诱导和重新定距，而不是仅服务上肢；
- 优先短促爆发 → 对手响应 → 立刻换距 / 换线，而非长时间固定距离交换；
- 可提高低线踢击、快速前踢 / 侧踢、直线截击和突然 Burst 的出现权重，但不能形成固定动作套餐；
- 表达应直接、经济、有威胁感，减少无意义装饰动作。

### 与截拳道 / JKD 的边界

```text
“使用截拳道 / JKD”
→ Combat System / Technique Backbone

“像李小龙电影里那样打”
→ Cinematic Combat Archetype
```

两者可以同时存在：

```text
Primary Combat System：截拳道 / JKD
Cinematic Combat Archetype：李小龙型
```

也可以跨体系组合，例如：

```text
Primary Combat System：散打
Cinematic Combat Archetype：李小龙型
```

此时保留散打的 Technique Backbone，但动作表达偏爆发截击、Broken Rhythm、快速进退和直接性。

### 中性 Prompt 语义

`explosive interception-driven cinematic combat, broken rhythm, sudden stop-hits, rapid in-and-out footwork, sharp range control, feints and abrupt tempo changes, economical direct attacks, short violent bursts followed by immediate repositioning rather than stationary exchanges`

---

## 8. 五种 Archetype 的核心区别

| Archetype | 主要区别 | Movement 核心 | Technique 表达 | Environment |
|---|---|---|---|---|
| 李连杰型 | 轻灵、流畅、武术线条 | 转身、绕位、高低位、轻快步法 | 清晰快速的全身武术组合 | 中等 |
| 吴京型 | 硬朗、爆发、压迫 | 冲入、逼退、破支撑、再进入 | 重接触短打 + 腿法 + 摔控 | 中等 |
| 甄子丹型 | 极速现代融合、近身连锁 | Burst Footwork、快速换距 | 截击 + 拳腿肘膝 + 短控连续转换 | 中等 |
| 成龙型 | 环境互动、空间穿越 | 跑绕翻钻、跌扑恢复、障碍穿越 | 技法与环境 / 道具不断互相触发 | 极高 |
| 李小龙型 | 爆发截击、节奏破坏、极简直接 | 快速进退、定距、突然 Burst | Stop-hit、截击、假动作、短促爆发 | 低～中 |

---

## 9. 候选展示建议

当用户明显希望“中国功夫电影式动作”而没有指定细分方向时，可以把以下作为同一 Primary Node 下的导演参考候选：

- 李连杰型｜轻灵流畅・武术线条；
- 吴京型｜硬朗爆发・全身压迫；
- 甄子丹型｜极速现代融合・近身连锁；
- 成龙型｜环境互动・空间即武器；
- 李小龙型｜爆发截击・节奏破坏・极简直接；
- 不使用明星参考 / 自定义。

不要因为用户选择某明星参考，就自动改变已经确认的 Combat System。

---

## 10. 使用边界

- 该 Library 是动作表达参考，不是明星模仿模板；
- Runtime 最终应使用中性动作描述外显其特征；
- 不模仿人物外貌、声音、台词习惯或角色身份；
- 不把明星电影作品当固定动作库；
- 不建立“每个明星一套 Combo”；
- 后续只有出现真正具有独立、稳定动作语言且对生成结果有明显价值的参考型时再扩展；
- 当前五种已经覆盖：轻灵武术、硬朗爆发、现代融合、环境动作、爆发截击五条明显不同的电影武打表达轴。
