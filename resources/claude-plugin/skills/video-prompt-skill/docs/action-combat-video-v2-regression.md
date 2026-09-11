# Action Combat Video V2 Regression & Quality Benchmark

> 状态：**Phase 11 Mandatory-path Rewire 已完成；V2-46～V2-49 Runtime 已实施；Concrete Choreography Knowledge CK-1 Runtime 已完成并通过 Static Read；固定 G01 已完成一次真实 Interactive → Final Prompt → Generated Video Regression，结果 FAIL。当前进入 Stage-2 Routing + Action–Camera + Model Execution Realizability 修复后的同场景 rerun。**
>
> 设计依据：`docs/action-combat-video-v2-spec.md`
>
> Concrete Choreography Knowledge Spec：`docs/action-combat-video-concrete-choreography-knowledge-spec.md`
>
> Concrete Choreography Implementation Plan：`docs/action-combat-video-concrete-choreography-implementation-plan.md`
>
> Action–Camera Handoff Spec：`docs/action-combat-video-action-camera-handoff-spec.md`
>
> Generated-video Execution Regression Spec：`docs/action-combat-video-generated-video-execution-regression-spec.md`
>
> 上游历史实施计划：`docs/action-combat-video-v2-implementation-plan.md`
>
> Traceability Audit：`docs/action-combat-video-v2-traceability-audit.md`

## 1. 验证原则

```text
Level 0｜Prompt-level Regression
→ Final Prompt 是否真的执行了当前 Spec，而不是只“读过规则”

Level 1｜Static / Structural Regression
→ 规则、路由、序列化、Gate 是否真正接线

Level 2｜Generated Video Quality Regression
→ 成片是否真正连续打起来，同时具有电影化 Camera Coverage
→ 新版成片不得明显劣于同一 Golden Scenario 的既有较好基线
```

> **静态规则正确只是必要条件；Prompt 本身不合格时禁止直接进入真实视频；真实成片质量是最终验收。**

> **Prompt 更具体、Static Gate 更多，不构成质量提升证据。如果真实成片的动作连续性、Whole-body Movement 或 Camera Mobility 明显下降，直接判 Generated Video Regression。**

本轮特别避免：

1. 成片不好就继续增加抽象机制；
2. 为了动作可读性，把 Combat Camera 固化成全程中全景 / 中景连续跟拍；
3. 为了 Prompt 简洁，把已经具体的 Choreography 重新压缩成“连续反制 / 持续缠斗 / 不断换位”；
4. 为了少问，把真正会显著改变成片的 Camera Intent 静默替用户决定；
5. 为了自动化而替用户猜“怎么打”，忽略可直接询问的高价值 Fighting Direction；
6. 为了动作丰富而建立固定动作数 / 固定字数 / 固定秒数配额；
7. 在最小 Pattern 验证集尚未证明有效前直接扩建完整武术知识库；
8. 把“更细的 Prompt”误判成“更容易执行的 Prompt”；
9. 成片退化时继续增加更多肢体术语、Camera 术语或 Negative，进一步制造 Instruction Saturation。

---

## 2. 已暴露的核心失败

原 G01 办公室高手 1v1 的真实测试暴露：

- 真实有效交战仍偏少；
- 动作主要锁在上半身；
- Camera 的“稳定”被执行成近似固定；
- 3–4 秒时间块只承载一个宏动作；
- 每 1–2 秒一个动作，动作完成后归位；
- Hard Timeline Blocks 强化动作分段；
- 双方容易轮流出招；
- Advantage / Reversal 可能只存在于文字描述；
- 连续动作若简单加速，又可能退化成全程同速、同压力。

后续办公室 Prompt 进一步暴露：

- Mandatory Prompt Assembly 已生效；
- Continuous Action Spine 与 Temporal Packing 已改善；
- V2-46 修正后 Camera Coverage 在 Prompt-level 已明显改善；
- V2-49 Executable Granularity 在 Prompt-level 已明显改善；
- 但颗粒度变细后，15 秒主要仍只有约 3 组较大的 Exchange；
- 动作内容长期偏 `前臂 / 肩线 / 抓腕 / 上臂控制 / 顶肩`；
- 脚步、转髋、重心常只是服务上肢控制，并未成为独立 Choreography Source；
- 最新 G01 Runtime 没有真正命中 `minimum-validation-set.md`，Stage-2 Pattern Hit 失败。

### 2.1 2026-08-15 G01 真实 Generated-video Regression

用户对本轮最初贴出的 Final Prompt 进行了真实视频生成，并明确反馈：

> 相比上一版，当前这版视频效果 **差很多很多**。

实际观察：

- 动作明显不连贯；
- 镜头明显不灵活；
- 几乎全部是上肢动作；
- 整体动作电影感下降。

该 Prompt 就是本轮修改 Action–Camera / Stage-2 Runtime **之前**生成的版本，因此不能与后续修复版混淆。

正式判定：

```text
Prompt-level textual specificity ↑
Generated Action Continuity ↓
Generated Camera Mobility ↓
Generated Whole-body Choreography ↓
```

说明当前不仅有 `Stage-2 Pattern Non-realization`，还存在：

- `Prompt–Video Execution Divergence`；
- `Instruction Saturation / Micro-choreography Overconstraint`；
- `Upper-body Semantic Dominance`；
- `Effective Granularity Flattening`；
- `Camera Strategy Overconstraint`。

当前重点 Failure Signatures：

```text
Upper-body Combat Lock / Kinetic Underfill
Static Standing Combat
Upper-body Technique Dominance
Upper-body Semantic Dominance
Temporal Combat Stretch / Action Underpacking
Action Segmentation / Excessive Neutral Reset
Timeline-induced Action Segmentation
Abstract Action Block / Non-executable Choreography Summary
Instruction Saturation / Micro-choreography Overconstraint
Effective Granularity Flattening
Prompt–Video Execution Divergence
Turn-taking Combat / Initiative Segmentation
Invisible Advantage / Nominal Reversal
Homogeneous Initiative Style / Identity-by-Demographic Shortcut
Camera Mobility Underfill
Camera Strategy Overconstraint
Combat Camera Coverage Lock / Medium-wide Overconstraint
Cut-induced Action Reset
Action–Camera Decoupling
Dead-motion Cut / Post-action Cut
Kinetic Handoff Loss
Coverage Patterning / Symmetric Shot Cycling
Flat Combat Intensity
Fighting Direction Non-realization
Granularity Over-expansion / Exchange Count Collapse
Stage-2 Pattern Non-realization
Stage-2 Routing Evidence Missing
```

这些属于统一 Gate 下的 Failure Signatures，不建立同等数量独立模块。

---

## 3. Static Regression Gate

### 3.1 Mandatory Runtime Path

- [x] `SKILL.md` 明确 Action Combat 最终固定读取 `prompt-assembly/control.md`；
- [x] Combat Prompt Assembly 不再占普通 `0-3 Controls` 可选预算；
- [x] `action-combat-video/index.md` 明确 `Final Assembly → Final Preflight → FAIL rewrite → PASS template` 必经链；
- [x] Quick / Interactive 均不能跳过 Final Assembly / Preflight；
- [x] Stage-2 Execution Knowledge 后必须进入 Concrete Action Phrase Construction；
- [x] Stage-2 Pattern Hit Evidence Gate 已接入 Router；
- [x] `action-camera-handoff-playbook.md` 已进入 Combat Mandatory Path；
- [x] Model Execution Realizability / Feet-fixed / Instruction Saturation Gate 已进入 Action–Camera bridge。

### 3.2 Interactive Runtime — V2-47 / V2-48

- [x] Interactive 使用 High-value Question Budget；
- [x] 默认最多 10 轮，轮数不是 PASS / FAIL 标准；
- [x] One Question, One Primary Decision Node 已接入；
- [x] 推荐答案可解释 downstream 影响，但不能提前锁死 Character Identity / Camera / Ending / Result；
- [x] Camera Intent 已进入 Conditional High-value Node Pool；
- [x] Camera 不固定必问；
- [x] Camera 问题使用导演观看策略，不直接问内部 Camera 参数。

### 3.3 Choreography Runtime — V2-49

- [x] Coverage / Exchange Depth / Kinetic Scope 并列；
- [x] Temporal Packing / Motion Handoff / Continuous Action Spine 已接线；
- [x] Executable Action Granularity Contract 已接入 Action Phrase；
- [x] 关键 Phrase 要求具体身体 / 武器动作、Contact / Evasion、即时响应、Footwork / Axis / Range / Position 后果与下一动作入口；
- [x] 抽象动作词只能做摘要 / 次要过渡，不能替代关键 Active Exchange；
- [x] Initiative Handoff 必须进入具体动作句法；
- [x] Ending Coverage Protection 已接入；
- [x] `Abstract Action Block` 已进入 Final Preflight。

### 3.4 Camera Runtime — V2-46 + Action–Camera Handoff

- [x] Camera Complexity 与 Camera Mobility 分离；
- [x] Action Continuity 与 Shot Continuity 分离；
- [x] Camera Coverage 可使用 Master / Medium / Close-up / Insert / Reaction / Impact / Re-establish；
- [x] Cut 后必须继承 Position / Direction / Contact / Momentum / Axis / Range；
- [x] Final Preflight 可拦截 Camera Coverage Lock；
- [x] Action-triggered Cut / Reframe 已接入；
- [x] Live-motion Cut / Motion Energy Carry-over 已接入；
- [x] Camera Preference 不得机械序列化成 `Medium → Close → Medium`；
- [x] `Camera Strategy Overconstraint` 已进入 Action–Camera Preflight。

### 3.5 Prompt Assembly / Template

- [x] High-density Combat 默认 Continuous Action Spine + Soft Time Anchors；
- [x] `single-shot-video` 不再等于 one-take；
- [x] Concrete Choreography In → Concrete Choreography Out 已接入 Prompt Assembly；
- [x] Assembly 不允许把具体 Phrase 压回“连续攻防 / 快速反制”等摘要；
- [x] Initiative Handoff 在序列化时保留动作重叠 / 状态继承；
- [x] Ending 文本过长时优先压缩 Ending；
- [x] Camera Mobility 与 Editorial Coverage 分开；
- [x] 不设置镜头数量 / 特写数量配额；
- [x] Negative Constraints 少而有针对性；
- [x] Action–Camera Handoff Preservation 已接入 Assembly；
- [x] Motion / Energy Carry-over 不得压回泛化“随后继续攻击”。

### 3.6 Concrete Choreography Knowledge — CK-13～CK-19（CK-1 Static PASS）

- [x] Fighting Direction / “怎么打”进入 Conditional High-value Question Pool；
- [x] 若用户已明确拳种 / 格斗体系 / 打法，不重复询问；
- [x] Fighting Direction 与旧“核心动作风格 / Choreography Profile”合并，不连续问两个同义问题；
- [x] Fighting Direction 候选至少 5 个，正常 6–8 个，复杂场景最多 10 个，并支持自定义；
- [x] 候选之间必须在 Movement / Technique / Range / Physical Scale / 节奏等维度存在实质差异；
- [x] Stage-2 使用 `Planning Gap → Pattern Slot → 1 主 + 可选 1 辅`，不固定三槽全读；
- [x] 最小 Pattern 验证集先于完整 Knowledge Expansion；
- [x] Lightweight Action Phrase Budget 接入：关键转折 High、普通 Exchange Medium、连接 Low；
- [x] 连续两个 High Granularity 后，普通 Exchange 应优先压缩，不继续堆第三个同等长度大段；
- [x] Final Preflight 能识别 `Static Standing Combat / Upper-body Technique Dominance`；
- [x] CK-2 未通过核心 Gate 时，禁止进入大规模 Knowledge Expansion。

CK-1 Static Read 曾确认运行闭环：

```text
Fighting Direction
→ Stage-2 Gap Detection
→ Minimum Pattern Hit
→ Concrete Action Phrase
→ High / Medium / Low Granularity
→ Prompt Assembly Preservation
→ Static Standing / Upper-body Dominance / Richness Preflight
```

但真实 G01 证明当时 **Pattern Hit 并未在实际运行中发生**，因此后续已经增加 `Stage-2 Pattern Hit Evidence Gate`，不能再用旧 Static PASS 替代真实 Runtime Evidence。

---

## 4. Golden Scenario Contract

```text
Fixed Input
+ Quality Contract
+ Failure Contract
+ Optional Test Anchor
```

> **Benchmark 锁质量，不锁固定动作答案，也不锁固定镜头答案。**

> **同一 Golden Scenario 的新版真实成片不得明显劣于已有较好基线；否则即使 Prompt-level / Static PASS，也判 Generated Video Regression。**

---

## 5. G01｜15 秒办公室高手近身对决

### Fixed Input

- 时长：约 15 秒；
- 场景：普通办公室开放区域；
- 人物：中国女性 + 中国男性，普通职场服装；
- 隐藏身份：敌对组织的专业杀手；
- 用户约束：贴身搏斗，不隔着办公桌；
- 目标：高手连续攻防，而不是两三次孤立动作；
- 模式：Interactive；
- 模型：Generic，除非用户另行指定。

### Interactive Quality Contract

- 每轮只解决一个主要 Planning Node；
- 推荐答案不提前夹带未确认 downstream 决策；
- 问题轮数按需求完整度动态决定；
- Fighting Direction 未明确且不同打法会显著改变成片时，应询问“怎么打”；
- Fighting Direction 已明确时不重复问；
- Fighting Direction 与旧核心动作风格不得拆成两轮重复问题；
- Fighting Direction 候选答案必须有实质动作差异，至少 5 个，并支持自定义；
- Camera Intent 若存在多个高价值观看策略且用户未明确，应有机会成为一轮问题；
- Camera 若已经明确或只有一个明显合理方向，不强行询问；
- 不把 Contact Solidity / Kinetic Scope / Granularity / Preflight 等内部质量机制变成问卷。

### Interactive Failure Contract

出现任一明显模式即 FAIL / REWRITE：

- 已经问“怎么打”后，又以“核心动作风格”重新问同一决策；
- Fighting Direction 候选少于 5 个且场景明显存在更多合理方向；
- 候选只是“更刺激 / 更电影感 / 更帅”等同义视觉形容，而没有动作内容差异；
- 用户已经明确 MMA / 咏春 / 轻功剑战等仍重复询问；
- 为了少问直接跳过一个明显会改变成片的 Camera Intent 分叉；
- 已经确认 Camera Intent 后重复询问；
- 把 Camera Complexity / Mobility / Cut Density 等内部参数直接问用户；
- 需求已经完整仍为了走完 Planning Graph 继续发问。

### Prompt-level Quality Contract

Final Prompt 必须满足：

- Setup 很短，贴身 Combat 很快开始；
- 不默认使用多个 1–3 秒 Hard Time Blocks；
- Active Exchange 主要是一条 Continuous Action Spine；
- 较长动作窗口包含连续因果动作流；
- 动作链存在 Motion Handoff / Energy Carry-over；
- 关键 Active Exchange 不是抽象“连续攻防”，而是具体可执行动作链；
- 关键 Phrase 能看出具体身体 / 武器动作、Contact / Evasion、即时响应、Footwork / Axis / Range / Position 后果与下一动作入口；
- 删除“高速 / 连续 / 专业 / 高密度 / 反制 / 缠斗”等抽象词后，仍能理解主要动作因果；
- Fighting Direction 必须真正改变主要动作内容，而不是只在开头写一个风格标签；
- Movement 必须主动创造 Level / Route / Angle / Axis / Range / Position / Support / Balance 中至少一种有意义变化；
- Whole-body / Footwork / Hip / Torso / Position / Range / Axis 合理外显；
- Whole-body / Movement-driven Fighting Direction 的关键 Phrase 有清楚 Motor Driver；
- 关键 Phrase 通过 Feet-fixed Test：删掉 Movement 后不能仍几乎原地完成同一套主攻防；
- Character Identity 不由人口属性快捷映射；
- Counter / Re-counter 在对手动作尚未完全结束时通过 Contact / Footwork / Axis / Range / Recovery Window 抢 Initiative；
- Granularity 分布有层级：重大 Reversal / Signature 可 High，普通 Exchange 应适度压缩；
- 不能出现 Effective High Granularity Everywhere；
- 不能因为具体化而把 15 秒重新压缩成仅 2–3 个大型 Exchange；
- 单一短窗口不能同时塞入过多独立肢体 / Contact / State / Camera / Negative，避免 Instruction Saturation；
- Camera 跟随真实 fight-space；
- 用户 Camera Intent 是观看偏好，不得固化成机械 Shot Pattern；
- 动作连续不等于 Camera one-take；
- Cut / Reframe 由 Action State Change 触发；
- Cut 后 Position / Direction / Contact / Momentum / Axis / Range 连续，且尽量保留 Active Motion；
- Ending 只做短收束，不提前吞掉 Active Exchange。

### Prompt-level Failure Contract

出现任一明显持续模式即 FAIL / REWRITE：

- 多个默认硬时间盒；
- 每段只有一个宏动作；
- 关键数秒主要写“连续格挡 / 快速反制 / 贴身缠斗 / 不断换位 / 双方互有来回”；
- Fighting Direction 选项已确认，但最终动作仍与默认上肢控制模板几乎相同；
- Character Identity 只有打法标签，没有具体动作证据；
- Initiative / Advantage 只有 Meta 说明，没有身体、Contact、Footwork、Axis、Range 后果；
- 连续多个关键 Phrase 主要由前臂、肩线、抓腕、顶肩等上肢 Contact 主导；
- Prompt 虽写“转髋 / 脚步 / 降低重心”，但这些没有改变 Level / Route / Axis / Range / Position；
- 删除 Footwork / Support / Route 后主要动作骨架几乎不变；
- 连续多个 Phrase 实际都要求多个独立肢体 + Contact + State，形成 Effective High Granularity Everywhere；
- 局部动作、状态、Camera、Audio、Negative 同时过载，形成 Instruction Saturation；
- 连续多个 High Granularity 大段导致普通 Exchange 数量明显下降；
- A 做完一段才轮到 B；
- Camera 因“稳定”几乎不移动；
- Camera Intent 被机械序列化成 `Medium → Close → Medium → Close`；
- 全程几乎只有中全景 / 中景；
- 特写 / Insert 后人物空间关系无故重置；
- Camera / Audio 比主要身体动作写得更具体；
- 最后数秒主要是对视 / 呼吸 / Pose，实际有效交战被提前终止。

### Generated-video Quality Contract

必须观察：

- High Active Combat Coverage；
- 多个连续且可读的 Action Phrase；
- Fighting Direction Realization；
- Concrete Choreography Realization；
- Model Execution Realizability；
- Temporal Packing / Motion Handoff / Energy Carry-over；
- Whole-body / Position / Range / Angle / Axis；
- Movement 真实改变空间 / 高低位 / 重心关系；
- Upper-body Dominance 明显降低；
- Static Standing Combat 明显降低；
- Environment Integration；
- Character Distinction；
- Initiative / Advantage 可见；
- Contact Solidity；
- Intensity Variation；
- Camera Mobility；
- Shot Scale / Editorial Coverage；
- Action-triggered Camera Handoff；
- Action Continuity Across Cuts；
- Signature Moment；
- Ending 短收束；
- 与上一较好版本相比，核心质量维度不得明显回退。

---

## 6. 其余 Golden Scenarios

- G02｜力量型 vs 灵活反制型；
- G03｜狭窄走廊；
- G04｜硬派拳脚；
- G05｜短兵器刀战；
- G06｜长兵器 vs 短兵器；
- G07｜Grapple / Takedown；
- G08｜1vN。

不得为了优化 G01 把所有场景模板化成同一种动作链或 Shot Coverage。

---

## 7. Generated Video Quality Metrics

### M01｜Active Combat Coverage Realization
真正有效交战时间。

### M02｜Exchange / Choreography Richness
有效 Phrase / Counter / Continuation 丰富度。

### M03｜Executable Granularity Realization
关键动作是否具体执行，同时避免颗粒度过度展开挤压 Exchange 数量。

### M04｜Kinetic Scope Realization
Whole-body / Position / Range / Axis / Contact-driven displacement。

### M05｜Motion Continuity / Temporal Packing
是否一招一停、Neutral Reset、时间轴切碎。

### M06｜Character Distinction
双方动作与抢主动方式是否不同。

### M07｜Visible Advantage / Initiative
控制权与主动权变化是否可见，Counter 是否发生在动作链内。

### M08｜Combat Contact Solidity
Commitment / Transfer / Reaction / Consequence。

### M09｜Environment Integration
是否真正改变线路 / Position / Range / Advantage。

### M10｜Camera Readability + Mobility
动作是否看清，Camera 是否跟随空间变化。

### M11｜Shot Scale / Editorial Coverage
是否动态使用不同 Shot Scale，而不是全程中景或无意义乱切。

### M12｜Action Continuity Across Cuts
Cut 前后 Position / Direction / Contact / Momentum / Axis / Range 是否连续。

### M13｜Intensity / Signature
连续战斗是否有层次；Signature 是否形成真实峰值。

### M14｜Ending Coverage Discipline
Ending 是否在不吞掉主要 Active Exchange 的前提下完成收束。

### M15｜Spatial / Physical Continuity
Position / Range / Condition / Weapon / Environment State 连续性。

### M16｜Fighting Direction Realization
用户选择的“怎么打”是否真实改变 Movement / Technique / Range / Physical Scale / Rhythm，而不是只改变标签。

### M17｜Movement Contribution
Movement 是否作为独立 Choreography Source 创造 Level / Route / Axis / Range / Position / Balance 变化。

### M18｜Upper-body Dominance / Static Standing Combat
关键交换是否仍长期被前臂 / 肩线 / 抓腕等上肢结构主导；人物是否仍主要在原地完成战斗。

### M19｜Model Execution Realizability
Prompt 的具体信息是否被成片稳定执行，而不是因为 Instruction Saturation 退化成动作碎片、上肢优先或 Camera 保守化。

### M20｜Prompt–Video Execution Divergence
Prompt-level 指标提高时，Generated-video 的 Continuity / Whole-body / Camera Mobility 是否反而下降。

### M21｜Action-triggered Camera Handoff
Camera Change 是否由 Motion / Contact / Consequence / Initiative / Level / Support / Fight-space 变化触发，并继续同一 Active Motion。

---

## 8. Prompt Intent → Generated Result Gap

每次必须记录计划与成片差距，例如：

```text
Planned Fighting Direction: Chinese cinematic martial close combat
Observed Fighting Direction: generic upper-body clinch / forearm control

Planned Coverage: High
Observed Coverage: Low / Medium

Planned Granularity: mixed High / Medium / Low
Observed Granularity: effective high-detail micro-choreography, fragmented execution

Planned Movement: route + level + axis changes
Observed Movement: mostly stationary, footwork only decorative

Planned Flow: continuous counter / re-counter
Observed Flow: discontinuous / fragmented actions

Planned Initiative: stolen during opponent motion
Observed Initiative: turn-taking / reset-prone attacks

Planned Camera: mobile + varied coverage
Observed Camera: conservative medium / inflexible coverage

Planned Whole-body Driver: movement creates attack entry
Observed Driver: forearm / shoulder / arm-control dominant
```

### 2026-08-15 G01 Regression Record Summary

```text
Prompt Version: pre Action–Camera / Pattern Evidence repair
Fighting Direction: 中国武术电影化近身
Camera Intent: 中景跟随、关键接触短暂切近
Stage-2 Pattern Read: minimum-validation-set.md NOT READ
Prompt-level: more concrete than prior version
Generated-video: substantially worse than prior version
Observed Action: discontinuous
Observed Camera: inflexible
Observed Kinetic Scope: upper-body dominant
Pass / Partial / Fail: FAIL
```

---

## 9. Benchmark Run Record

```text
Benchmark Run ID:
Date:
Golden Scenario ID:
Skill / Commit:
Prompt Version:
Previous Baseline Version:
Model / Version:
Generation Parameters:
Seed (if supported):
Input Assets:
Final Prompt:

Interactive Questions / Answers:
Fighting Direction Choice:
Stage-2 Pattern Read / Hit Evidence:
Granularity Distribution Evidence:
Model Execution Realizability Evidence:
Feet-fixed Test:
Movement Contribution Evidence:
Action–Camera Handoff Evidence:
Observed Exchange Richness:
Upper-body Dominance / Static Standing Combat:
Camera Mobility / Strategy Overconstraint:
Instruction Saturation:
Planned Quality Contract:
Observed Result:
Metric Notes:
Prompt Intent → Generated Result Gap:
Comparison vs Previous Baseline:
Failure Signature:
Pass / Partial / Fail:
Next Adjustment:
```

---

## 10. Concrete Choreography Knowledge Two-Stage Gate

### Phase CK-1｜Runtime + Minimum Pattern Validation — ✅ Static PASS（历史）

已实施：

```text
Fighting Direction Interactive
+ Stage-2 Gap-driven Routing
+ Minimum Movement / Technique / Transition Pattern Set
+ Lightweight Action Phrase Budget
+ Static Standing Combat / Upper-body Dominance Preflight
+ Prompt Assembly Granularity / Fighting Direction Preservation
```

历史 Static Read 确认：

- Fighting Direction 可被正确询问 / 继承；
- 候选答案数量与质量规则已接入；
- Stage-2 规则上可命中最小 Pattern；
- Pattern 之后强制进入 Concrete Action Phrase；
- Movement 缺席会触发 `Static Standing Combat Risk`；
- High / Medium / Low Granularity 已贯穿 Choreography → Assembly；
- Knowledge Expansion 仍被 Gate 锁定。

但实际 G01 Read List 证明：**Stage-2 在真实运行中未命中 minimum-validation-set.md。**

因此已新增 `Stage-2 Pattern Hit Evidence Gate`，后续必须以真实 Read / Hit 为准。

### Phase CK-2｜固定 G01 Prompt + Generated-video Regression — ❌ FAIL

本轮已经真实执行 Interactive → Final Prompt → Generated Video。

失败：

```text
Gate A｜Fighting Direction Realization
→ PARTIAL：Prompt 有武术电影化语言，但成片仍高度上肢化

Gate B｜Choreography Richness Preservation
→ FAIL：Prompt 具体化没有转成更好的连续成片，反而出现动作碎片化

Gate C｜Upper-body Dominance Improvement
→ FAIL：真实成片几乎全是上肢动作

Gate D｜Stage-2 Pattern Hit Evidence
→ FAIL：minimum-validation-set.md 未读取

Gate E｜Camera Mobility / Action–Camera
→ FAIL：真实镜头明显不灵活

Gate F｜Model Execution Realizability
→ FAIL：Prompt-level specificity 提高但 Generated-video 明显退化
```

因此 Knowledge Expansion Gate 继续关闭。

修复优先级：

1. Stage-2 Pattern Hit Evidence；
2. Motor Driver / Feet-fixed / Upper-body Semantic Dominance；
3. High / Medium / Low 的真实执行层级；
4. Instruction Saturation；
5. Motion / Energy Carry-over；
6. Action-triggered Camera Handoff；
7. Camera Strategy Overconstraint；
8. 只有上述正确仍失败，才进入 Knowledge Coverage Audit。

禁止直接用“大量新增武术知识”绕过 Gate。

### Phase CK-2R｜修复后同 G01 Rerun — ⏳ NEXT

继续使用完全相同 G01 输入，不换案例。

必须重新验证：

```text
Pattern Hit
+ Prompt-level Execution Realizability
+ Whole-body Motor Driver
+ Action Continuity
+ Camera Mobility / Handoff
+ Generated-video Baseline Comparison
```

---

## 11. Generated Video 验收口径

Prompt-level Gate PASS 后重新生成 G01。

至少需要看到：

- 真实交战时间增加；
- 不再主要锁在上半身；
- Fighting Direction 在画面中可辨；
- 具体 Action Phrase 真正在画面中被执行；
- Movement 真实改变路线、角度、高低位、轴线或支撑关系；
- 动作不再每 1–2 秒归零或碎片化；
- Initiative 不再明显回合制；
- Camera 既能稳定跟随空间，也有电影化动态 Coverage；
- Camera Preference 不再退化为长期稳定中景；
- Cut / Reframe 与 Action State Change 有明显耦合；
- Cut 不破坏 Action Continuity；
- 优势 / 主动权变化可见；
- Contact 与 Intensity 不因动作增加而崩坏；
- Ending 不吞掉有效动作时间；
- **相比既有较好 G01 基线，不得出现明显质量回退。**

如果仍失败，优先回溯：

1. Stage-2 Routing / Pattern Realization；
2. Upper-body Semantic Dominance / Feet-fixed；
3. Effective Granularity / Instruction Saturation；
4. Motion / Energy Carry-over；
5. Action–Camera Handoff / Camera Strategy Overconstraint；
6. Model Temporal / Motion Capability；
7. Model-specific Serialization；
8. 最后才检查 Concrete Choreography Knowledge Coverage。

不回到“继续增加抽象机制 / 更多动作术语”的路径。

---

## 12. 当前状态

- V2-35～V2-49 Spec：✅ 已记录；
- Phase 11 Mandatory Final Assembly / Preflight：✅ Static PASS；
- V2-46 Camera Coverage：✅ 已实施；
- V2-47 High-value Question Budget：✅ 已实施；
- V2-48 Decision Purity + Conditional Camera Intent：✅ Runtime 已实施；
- V2-49 Executable Action Granularity：✅ Runtime 已实施；
- Concrete Choreography Knowledge Spec CK-01～CK-19：✅ 已记录；
- Fighting Direction Interactive：✅ 已实施并真实命中；
- Stage-2 Gap-driven Pattern Routing：⚠️ 规则已实施，但真实 G01 曾未命中；已增加 Pattern Hit Evidence Gate；
- Minimum Pattern Validation Set：✅ 已建立；
- Lightweight Action Phrase Budget：✅ 已贯穿 Choreography / Router / Assembly；
- Static Standing Combat / Upper-body Dominance Gate：✅ 已实施；
- Action–Camera Handoff Spec / Runtime：✅ 已新增；
- Model Execution Realizability / Feet-fixed / Instruction Saturation Gate：✅ 已新增；
- CK-1 Runtime / Minimum Pattern Validation：✅ **历史 Static PASS，但不足以代表真实运行 Hit**；
- CK-2 Fixed G01 Prompt + Generated-video Regression：❌ **FAIL**；
- 本次 G01 Actual Generated Video：❌ **相较上一版明显退化**；
- CK-2R 修复后同 G01 Rerun：⏳ **NEXT**；
- Knowledge Expansion Gate：🔒 **继续关闭**。
