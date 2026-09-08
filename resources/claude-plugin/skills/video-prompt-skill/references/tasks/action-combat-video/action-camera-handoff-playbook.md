# Action–Camera Handoff Playbook

## 1. 职责

本文件是 Action Combat 的轻量桥接 Runtime。

它不替代：

- `core-playbook.md` 的 Combat State / Continuity；
- `choreography-playbook.md` 的动作编排；
- 专项 Combat Playbook 的具体动作语言；
- `camera-direction/control.md` 的通用摄影术语与镜头规则；
- `prompt-assembly/control.md` 的最终序列化与 Preservation。

它负责：

1. Stage-2 Execution Knowledge 是否真的命中；
2. Concrete Choreography 是否具有 Model Execution Realizability；
3. 动作之间是否存在 Motion / Energy Carry-over；
4. Base Viewing Priority 与 Camera Hard Constraint 是否正确区分；
5. Camera 是否由正在发生的 Action State Change 触发；
6. 是否存在值得改变观看方式的 Viewer Experience Opportunity；
7. Cut / Reframe 后是否继承仍然活着的 Motion State；
8. 被选中的高价值 Camera Moment 是否真正 Realize 到具体 Action Phrase。

核心原则：

> **Action 决定 Camera 为什么变化；Camera 不能把连续动作切成重新开始的动作块。**

> **Base Viewing Priority 决定默认怎么看；Camera Hard Constraint 决定什么绝对不能违反。**

> **Camera Accent 不是逐动作配镜头；普通连接动作继续当前 Shot。**

> **Camera Handoff Gate 是语义合同，不是字段模板；约束错误，不约束摄影创作。**

---

## 2. Stage-2 Pattern Hit Evidence Gate

在 Concrete Action Phrase 进入最终编排前，先检查当前 Planning / Draft Phrase 是否存在 Execution Gap。

优先检查：

- Movement：Route / Angle / Level / Axis / Range / Position / Support / Balance；
- Technique：具体攻击、防守、腿法、摔控、兵器动作；
- Transition：Contact / Momentum / Axis / Range / Recovery 如何进入下一动作。

出现以下情况之一，不能无 leaf execution knowledge 直接交付：

- High / Expert Combat 且目标是连续高手对决；
- Derived Choreography Direction 要求明显 Movement / Level / Axis / Route / Support 差异；
- 多个关键 Phrase 仍主要由 Upper-body Contact 驱动；
- Movement 只是上肢动作的修饰语；
- Transition 主要依赖“然后 / 随后 / 再次”，没有可见 Handoff State；
- Preflight 已触发 `Static Standing Combat / Upper-body Technique Dominance`。

当前 CK 最小验证阶段，如果没有更具体且已经读取的专业 leaf knowledge 能覆盖对应 Gap：

> **必须读取 `references/libraries/combat-choreography-patterns/minimum-validation-set.md`。**

内部至少要能回答：

```text
Gap
→ Slot
→ 实际 leaf Read
→ Pattern / Detail
→ Concrete Action
```

没有真实 Read / Hit Evidence 时不得假定 Stage-2 已执行。

失败：`Stage-2 Routing Evidence Missing`。

---

## 3. Model Execution Realizability Gate

Prompt-level specificity 上升不保证 Generated-video quality 上升。

### Motor Driver First

Whole-body / Movement-driven Combat 优先让模型理解：

```text
Whole-body / Support / Route Driver
→ 关键 Technique
→ Opponent Response
→ Position / Balance Consequence
→ Continuation
```

### Feet-fixed Test

内部检查：

> 删除脚步、支撑、Route、Level、Axis、Position 变化后，这段主要攻防是否仍几乎可以原地完成？

若 yes，且当前方向明确要求 Whole-body / Movement-driven Combat，则 FAIL：

`Upper-body Semantic Dominance / Static Standing Combat`

### 主事件过载，不是细节过载

同一镜头同时写清身体、接触、光影、镜头和声音，不算无法执行。

只有指定时长里又叠加了过多**独立主事件**（换场、另一套完整攻防、新主体）时，才按 `prompt-assembly/control.md` 2.0 提醒用户。

不要为了“指令更少”删除已写清的画面维度。仍须保留：

```text
Motor Driver
+ 关键 Technique
+ Opponent Response
+ Balance / Position / Range 后果
+ Continuation Entry
```

失败可使用：

- `Main Event Overload`（独立主事件超出指定时长）；
- `Upper-body Semantic Dominance`；
- `Prompt–Video Execution Divergence / Generated Video Regression`。

---

## 4. Motion / Energy Carry-over

Action Transition 不只检查“逻辑上接得上”，还要检查前一动作留下的动力是否真正进入下一动作。

可继承：

- linear / angular momentum；
- contact pressure；
- support transfer；
- forced step；
- recovery burden；
- body axis deviation；
- range compression / expansion；
- environment post；
- unfinished attack / defense motion。

避免：

```text
动作完成
→ 站稳
→ 回默认姿态
→ 下一动作重新启动
```

只有位置连续而运动死掉，判：`Kinetic Handoff Loss`。

---

## 5. Action–Camera Handoff Planning

当 Camera 需要移动、Reframe、改变景别或 Cut 时，内部可以使用：

```text
Current Action State
→ Camera Hard Constraint Check
→ Base Viewing Priority
→ Viewer Experience Opportunity（可选）
→ Camera Task
→ Shot Entry Trigger
→ Inherited Motion State
→ Observation
→ Shot Exit / Handoff
```

这是导演规划结构，不默认作为字段表输出。

`Viewer Experience Opportunity` 不是每个 Action 都必须填写；普通连接动作默认继续当前 Shot / Camera Path。

### Camera Decision Hierarchy

```text
用户明确 Camera Hard Constraint
> Base Viewing Priority
> Action-triggered Camera Handoff
> Perceptual Impact Accent
> 装饰性 Camera Variation
```

Hard Constraint 只限制摄影实现，不改变 Combat 动作目标。

---

## 6. Camera Handoff Realization Gate

Action–Camera Planning 形成 Camera Opportunity 后，只有**被实际选择为高价值 Camera Moment** 的节点需要通过本 Gate。

本 Gate 检查语义完整性，不检查固定字段、固定句式、固定顺序、固定 Shot 数量或关键词。

### Realization 最小语义合同

一个高价值 Camera Moment 判定为 Realized 时，语义上至少应同时成立：

1. **Concrete Action Anchor**：Camera Change 依附正在发生的具体动作 / 状态变化；
2. **Camera Response / Viewer Task**：能理解此时 Camera 为什么介入、主要观察或让观众体验什么；
3. **Live Motion / State Continuation**：Camera Change 后继续至少一类仍活着的 Momentum / Contact / Pressure / Rotation / Support Transfer / Forced Step / Recovery / unfinished motion；
4. **Camera Hard Constraint Compliance**：实现方式不违反 One-take / No-cut / Fixed Camera 等明确边界。

以上四项可以自然融合，不要求输出成字段表。

### 不能单独判 PASS

以下语义如果没有具体 Action Anchor、Camera Task 与 live-motion continuation，仍属于未 Realize：

- “第一次接触时短暂切近”；
- “关键时刻使用冲击近景”；
- “高潮处快速切换镜头”。

### Full-fidelity Default

在没有 Verified Model Limitation 或真实 Generated-video Regression Evidence 时，默认：

```text
Full-fidelity Action–Camera Realization
```

`Camera Complexity Capacity = Unverified` 只代表不能承诺上限，不代表主动删除或泛化高价值 Camera Moment。

只有存在可靠限制 / 回归证据时，才允许 `Intent-preserving Degradation`：优先降低 Camera 实现复杂度，同时尽量保留 Action Anchor、Viewer Intent 与 Motion Continuation。

低价值 / 装饰性 Accent 只有在它本身变成新的独立主事件、且时长装不下时才合并；不要因为画面写细就删。

### Realization FAIL

不新增大量 Failure Signature；按真实症状复用：

- `Action–Camera Decoupling`；
- `Perceptual Impact Underuse`；
- `Camera Strategy Overconstraint / Camera Mobility Underfill`；
- `Dead-motion Cut / Post-action Cut`；
- `Kinetic Handoff Loss`；
- `Camera Hard Constraint Violation`。

失败时回 Action Trigger / Camera Task / Inherited Motion State 对应层重写，不通过堆更多 Camera 术语修复。

---

## 7. Action-triggered Camera Change

Camera Change 优先由 Action State Change 触发，而不是为了“更电影”随机变化。

可用 Trigger 包括：

- Cut on Motion；
- Contact / Consequence；
- Direction / Axis Change；
- Initiative Reversal；
- Range / Level / Support Change；
- Occlusion / Match Motion；
- Environment Boundary；
- Threat / Near-lens；
- Impact Consequence；
- Near-miss / Whip-by；
- Body-mechanics Detail；
- Range Compression；
- Initiative / Reaction Experience。

Camera 应优先看到**状态后果**，不是只重复“发生了接触”。

### Perceptual Trigger 约束

- 不是每个动作都配 Camera Accent；
- 不设置 POV / Close-up / Insert 数量配额；
- 当前 Shot 已经能清楚表达动作与冲击时，不为变化而变化；
- Perceptual Accent 必须依附真实 Action State；
- 体验型镜头后不默认立刻回中景；
- 所有 Accent 服从 Camera Hard Constraint。

触发滥用时判：

`Perceptual Accent Overuse / Camera Accent Overmapping`

### Body-part Detail Activity Gate

当 Camera Accent / Reframe / Cut 把画面明显收窄到脚、手、武器或其他局部身体区域时，被框住的局部必须在该镜头持续期间**真实承担当前 Combat Cause / Response / Consequence**，而不是只作为静态说明素材。

脚部 / 下肢 Detail 只有在当前瞬间确实存在例如以下高价值信息时才值得孤立近拍：

- 斜切 / 跨步 / 追步等直接改变 Route / Angle；
- 支撑脚被踢、扫、踩位、绊阻或被迫移步；
- 明确的 pivot / support transfer 正在制造转轴、失衡或反转；
- kick / sweep / trip / forced step 本身就是当前攻防关键动作。

如果 Viewer Task 只是“看清脚步、支撑或重心”，但主要 Combat Cause 仍发生在双方躯干接触、抱控、推压、旋转或整体换位关系中，则优先使用：

> **低机位双人中景 / 中广景或保持双方髋部—脚步—接触关系同时可见的 Reframe**

不要把它自动翻译成只剩鞋子 / 双脚的孤立 Close-up / Insert。

以下情况判 `Action–Camera Decoupling / Perceptual Accent Overuse`：

```text
镜头切到局部
→ 被框住的脚 / 手 / 武器没有承担当前动作因果
→ 真正攻防在画外继续
→ 局部镜头只剩静态或弱相关运动
```

失败时优先扩大到能同时保留该局部机制与双方战斗关系的景别，或直接继续当前 Shot；不要为了保留近景而额外发明一个动作。

### Framing Capacity / Viewer Task Capacity Gate

Camera 先确定当前真正需要观众读取的 **Viewer Task**，再选择能够容纳这些信息的景别；不能先决定“来一个近景”，再把多个互相分离的身体区域和空间关系硬塞进这个近景。

运行时先问：

> **这个 Camera Moment 要成立，观众必须同时看清哪些信息？当前景别是否真的装得下？**

如果 Viewer Task 只需要一个局部因果，例如：

- 手掌撞上玻璃后肩线被带偏；
- 拳击接触瞬间的面部 / 上身反应；
- 一次明确低线踢击命中支撑脚；
- 武器接触或脱手的局部结果；

则 Close-up / Detail Shot 可以成立，只要局部仍在承担当前 Action Cause / Response / Consequence。

如果 Viewer Task 需要同时理解两个或更多相距较远的区域 / 关系，例如：

```text
手掌 / 肩轴
+ 脚步 / 支撑
+ 对手接触
+ 双方朝向 / 距离
```

则不得仍然序列化成一个狭窄 Close-up，并同时要求所有元素都清晰可读。优先：

1. 保留最重要的 Viewer Task，删除该镜头不需要的观察要求；或
2. 扩大到 Medium-close / Medium / 低机位双人中景等足以同时容纳必要因果链的景别；或
3. 当前 Shot 已能读清时直接继续，不为了信息覆盖新增 Cut。

默认优先使用**一个足够宽、仍有冲击力的有效构图**，而不是为了分别解释手、脚、表情再拆出多个额外 Insert。只有 Action State 本身确实提供多个高价值 Camera Moment，且每次切换都满足 Live-motion Handoff 时，才允许拆开观察。

以下情况判：

`Framing Information Overload / Viewer Task–Framing Mismatch`

```text
景别明显收窄
→ Prompt 同时要求读取多个不在同一局部范围内的身体 / 空间信息
→ Camera 无法在保持该景别的同时完成 Viewer Task
→ 模型被迫丢信息、上下找信息或产生无意义局部镜头
```

失败时只重选 Viewer Task / Framing：**不修改 Combat Choreography，不额外发明动作，也不为了补信息机械增加 Shot。**

---

## 8. Live-motion Cut Contract

仅当 Hard Constraint 允许 Cut 时：

```text
Shot A：动作已经开始 / 压力建立
→ CUT while motion is alive
→ Shot B：继续同一动作 / Contact / Reaction
→ 下一动作继承仍活着的状态
```

跨镜至少继承：

```text
一类 Active Motion State
+
必要 Spatial State
```

Active Motion 可为 Momentum / Contact / Pressure / Recovery / Rotation / Support Transfer / Forced Step。

Spatial State 包括 Position / Left-Right / Direction / Axis / Range。

动作全部完成、人物站稳后才切，判：`Dead-motion Cut / Post-action Cut`。

---

## 9. Camera Coverage / Strategy

禁止机械：

```text
Medium → Close-up → Medium → Close-up
```

普通连接动作继承当前 Shot；只有动作信息或观看体验出现高价值变化时才产生 Accent / Reframe / Cut 候选。

Re-establish 只在局部镜头后 Position / Range / Axis / Fight-space 可能丢失时使用。

Base Viewing Priority 只能解释为观看偏好，不能序列化成固定 Shot Pattern。

如果被执行成长期稳定中景、只有 Contact 才短暂切近，判：

`Camera Strategy Overconstraint / Camera Mobility Underfill`

---

## 10. Action Spine 与 Camera Handoff 外显

Final Prompt 的关键 Camera Handoff / Perceptual Accent 必须锚在具体 Action Moment 上。

### Global Camera Baseline

独立 Camera 段只承担：

- Base Viewing Priority；
- 真正 Hard Constraint；
- 简短全局 Camera 行为基线；
- 不无意义碎切。

禁止用总体 Camera 说明替代真正的 Action-triggered Camera Moment。

### Key Camera Moment Inline

真正高价值的 Camera Accent 直接写进对应 Action Phrase；普通动作不需要嵌镜头。

如果当前 Hard Constraint 为 No-cut / One-take，Cut 必须转换为连续摄影内的 Reframe / Near-lens / Height / Distance / Relationship Change。

---

## 11. Camera Hard Constraint

### One-take / Long-take

- 禁止 Editorial Cut；
- Camera Movement / Reframe 仍由 Action State Change 触发；
- 遵守 `camera-direction/control.md` 的场内摄影师纪律：水平线稳定、不穿人穿景、人物快于摄影机、命中才短促冲击；
- 可使用 Near-lens、距离压缩、短促绕位、Camera Height / Relationship Angle Change；
- 按动作需要选用后撤揭示、横移展示接触、短弧换位、擦镜跨步、贴地跟随、升降同步腾空落地、侧移在命中前露出接触点、结尾拉远；不是每场全用；
- 擦镜换位必须通过可见移动完成，遮挡结束后双方仍同时可见；
- Fight-space 改变时重新组织关系，不做无摩擦漂浮跟随。
- 15 秒一镜到底把运镜预算花在 3–4 个动作驱动的路线变化上，不要用 30 秒才写得完的镜头清单。

### No Cut

- 禁止 Editorial Cut；
- 可使用连续 Tracking / Orbit / Push / Pull / Height Change / Reframe；
- Action-triggered Camera Moment 转换为同一 Shot 内连续观察变化。

### Fixed Camera

- Camera Position 不做空间位移；
- 是否允许 Pan / Tilt / Zoom 取决于用户具体描述；
- 动作路线、前景、主体距离、构图内 Level / Position 变化承担主要动态表达。

Hard Constraint 不能反向削弱 Combat Coverage / Derived Choreography Direction。

---

## 12. Action–Camera Runtime Preflight

本 Preflight 在交给 Prompt Assembly 前执行，属于 Runtime-stage validation；不替代 Model Adapter 后的最终 Combat Preflight。

检查：

### A. Stage-2 Evidence

是否存在该读未读的 leaf knowledge，Pattern / Detail 是否真实进入 Concrete Action。

### B. Model Execution Realizability

是否通过 Motor Driver / Feet-fixed 检查；是否把画面维度写细误判为过载。

### C. Kinetic Handoff

下一动作是否利用前一动作仍存在的 Momentum / Contact / Support / Recovery / Axis。

### D. Camera Handoff Realization

对被选中的高价值 Camera Moment：

- 是否有具体 Action Anchor；
- Camera Response 是否匹配当前 Action / Viewer Experience；
- Camera Change 后是否继续活跃状态；
- 如果是局部身体 / 脚步 / 武器 Detail，画面中的局部是否正在承担当前 Combat Cause / Response / Consequence；
- 下肢机制若必须依赖双方躯干接触 / 整体受力才能读懂，是否保留了足够的双人关系而不是孤立脚部；
- 所选景别是否足以同时呈现该 Camera Moment 真正需要读取的信息；
- 是否存在 Close-up / Detail 却同时要求手、肩 / 髋、脚步和双人空间关系全部可读的 Framing Information Overload；
- 是否服从 Hard Constraint；
- 是否退化成“第一次接触 / 关键时刻短暂切近”。

### E. Camera Motivation

关键 Cut / Reframe 是否有 Action Trigger。

### F. Live Motion Across Cut

关键 Cut 是否发生在 motion alive 状态，下一 Shot 是否继续上一 Shot 的 Action / Contact / Reaction / Pressure。

### G. Coverage / Strategy

是否机械景别循环，Base Viewing Priority 是否被错误固化成保守 Shot Pattern。

### H. Perceptual Impact / Accent Density

是否存在明显高价值体验节点却全部被保守 Coverage 吞掉；是否反过来给几乎每个动作都加 Accent。

### I. Hard Constraint

所有 Camera 实现是否在用户明确边界内。

---

## 13. Failure Rewrite Priority

```text
Stage-2 Evidence FAIL
→ 补 Read / Pattern Realization

Execution Realizability FAIL
→ 重写 Motor Driver，使动作具体可执行
→ 不压缩已写清的画面维度

Kinetic Handoff FAIL
→ 重写 Transition / Phrase

Camera Handoff Realization FAIL
→ 回具体 Action Trigger / Camera Task / Inherited Motion State
→ 不用泛化 Camera 摘要补洞

Framing Capacity FAIL
→ 保留现有 Combat Action
→ 精简 Viewer Task 或扩大到足以容纳必要信息的景别
→ 不额外发明动作或机械增加 Shot

Camera Hard Constraint Violation
→ 在同一 Constraint 内重选 Camera 实现

Perceptual Impact Underuse
→ 从已有动作寻找高价值体验节点，再决定观察方式

Perceptual Accent Overuse
→ 删除低价值 Accent，让普通连接动作回当前 Shot

Coverage Patterning / Strategy Overconstraint
→ 按动作信息与 Viewer Experience Value 重新分配 Shot Task
```

不要通过增加更多 Pattern、更多动作术语、更多 Shot 或更多 Camera 术语修复。

---

## 14. 边界

- Fighting Direction / Coverage / Granularity：`choreography-playbook.md`；
- Range / Advantage / Position：`core-playbook.md`；
- 具体动作知识：当前专项 Playbook + Stage-2 leaf knowledge；
- Camera Base Viewing Priority / Hard Constraint 的交互暴露：`assets/templates/mode-interactive-output-contract.md`；
- Camera Realization × Preservation Spec：`docs/action-combat-video-action-camera-handoff-spec.md`；
- 通用 Camera 术语与轴线：`references/controls/camera-direction/control.md`；
- 最终序列化与 Common Preservation Contract：`references/controls/prompt-assembly/control.md`。

本文件只做 Stage-2 Evidence、Model Execution Realizability、Motion-Energy Carry-over 与 Action ↔ Camera Realization，不扩成新的 Camera 系统。