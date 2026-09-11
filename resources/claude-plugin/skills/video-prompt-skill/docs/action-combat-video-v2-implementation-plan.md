# Action Combat Video V2 Implementation Plan

> 状态：**V2-01～34 初版实施已完成；V2-35～45 已完成 Traceability Re-baseline；Phase 11 Mandatory-path Rewire 已完成；V2-46 / V2-47 已实施；V2-48 / V2-49 Runtime 已实施并完成静态回读，当前等待 Phase 12E 同输入 G01 Prompt 回归。**
>
> 当前设计真源：`docs/action-combat-video-v2-spec.md`
>
> Traceability Audit：`docs/action-combat-video-v2-traceability-audit.md`
>
> 回归真源：`docs/action-combat-video-v2-regression.md`
>
> 核心验收原则：**真实成片质量优先于静态规则覆盖；任何 Runtime 修改必须能从 Spec → Plan → Runtime → Regression 追踪。**
>
> 文档治理约定：当前主 Spec 已较长；本轮继续以其已确认的 V2-48 / V2-49 为设计真源。后续若再出现新一轮较大设计增量，优先新建新的 Spec 文档承载，不继续无限追加当前主 Spec。

---

## 1. 本轮实施目标

本轮不新增 Combat 一级 Engine，不扩建 Fighting Library，不修改 Model Adapter。

目标只解决最新办公室 G01 Prompt 暴露的四类真实问题：

1. **Interactive 单轮问题夹带 downstream 决策**；
2. **Camera Intent 在存在重大导演分叉时仍可能被静默替用户决定**；
3. **关键 Action Phrase 动作颗粒度偏粗，仍大量依赖“连续格挡 / 快速反制 / 不断换位”等抽象描述**；
4. **Initiative Handoff 与 Ending Coverage 虽已有机制，但 Final Prompt 仍可能出现轻微回合感或 Ending 吞掉有效交战时间。**

本轮的设计原则：

> **不靠增加固定询问轮次解决动作执行问题。**
>
> **用户决定导演方向，系统负责把方向展开成具体、连续、可执行的动作。**
>
> **关键因果动作具体，次要过渡动作可以压缩。**
>
> **Camera 创作意图可条件询问，Camera 基础质量仍由系统自动保证。**

---

## 2. 当前阶段与实施顺序

```text
Phase 0–9  V2-01～34 初版设计 / 实现 / 静态回归
→ Phase 10 Spec / Traceability Re-baseline
→ Phase 11 Runtime Mandatory-path Rewire
→ Phase 12A V2-46 Camera Coverage Correction            ✅ 已实施
→ Phase 12B V2-47 Interactive Question Budget           ✅ 已实施
→ Phase 12C V2-48 Interactive Purity + Camera Exposure   ✅ 已实施
→ Phase 12D V2-49 Executable Action Granularity          ✅ 已实施
→ Phase 12E Same-input G01 Prompt Regression              ⏳ 当前下一步
→ Phase 13 Generated Video Re-run + Model Calibration     ⏸ Prompt PASS 后
```

本轮固定顺序：

```text
Spec 已确认
→ Implementation Plan
→ Runtime File Mapping
→ Runtime 修改
→ Regression Contract 更新
→ Static Read / Rule Gate
→ 同一办公室 G01 Prompt 回归
→ Prompt PASS
→ 真实视频生成
```

不得跳过 Plan 直接改 Runtime。

---

## 3. 已完成基线，不在本轮重复开发

以下能力已经存在并继续作为本轮基础：

- Mandatory Combat Prompt Assembly；
- Combat Final Preflight；
- Continuous Action Spine + Soft Time Anchors；
- Temporal Action Packing；
- Motion Handoff；
- Kinetic Scope；
- Visible Advantage；
- Initiative Handoff；
- Character Identity Demographic Guard；
- Action Continuity ≠ Shot Continuity；
- Camera Readability + Mobility + Editorial Coverage；
- Interactive High-value Question Budget + 10-round Safety Cap。

本轮不是重新设计这些机制，而是让其中尚未充分兑现的部分进入更强的执行表达。

---

## 4. 本轮设计增量

### V2-48｜Interactive Decision Purity + Conditional Camera Intent Exposure

核心要求：

- `One Question, One Primary Decision Node`；
- 当前问题可以说明 downstream 影响，但不得提前锁死未确认的 downstream 选择；
- Camera 不固定必问，但进入高价值候选节点；
- 当固定 / 克制机位、one-take、完整动作可读、电影冲击型 Coverage、贴身沉浸等多个方向都合理且显著改变成片时，应条件暴露 Camera Intent；
- Camera 问的是用户可理解的导演观看策略，不问内部 Camera 参数。

### V2-49｜Executable Action Granularity

核心要求：

承担主要战斗因果的 Action Phrase 应尽量具备：

```text
Current Body / Range State
→ Specific Physical / Weapon Action
→ Contact / Evasion / Interception
→ Opponent Immediate Response
→ Footwork / Axis / Range / Position Consequence
→ Immediate Continuation Entry
```

这不是固定六步模板；重点是模型能够理解“当前身体状态下具体发生什么，以及下一动作为什么立刻能发生”。

禁止关键数秒主要依赖：

- 连续格挡；
- 快速反制；
- 贴身缠斗；
- 持续压迫；
- 不断换位；
- 高频攻防；
- 双方互有来回。

同时禁止走向逐拳逐脚机械枚举。

---

## 5. Runtime File Mapping

### 5.1 `assets/templates/mode-interactive-output-contract.md` — ✅ 已实施

对应：V2-48。

已实现：

1. 在 V2-47 High-value Question Filter 基础上增加 **Decision Purity Check**；
2. 推荐答案允许解释 downstream 影响，但不允许把 downstream 选择直接写成既定事实；
3. Camera Intent 正式加入 **Conditional High-value Node Pool**；
4. Camera 问题使用导演观看策略语言，不使用内部参数；
5. 不新增固定 Camera 询问轮次，不改变 10-round Safety Cap。

### 5.2 `references/tasks/action-combat-video/choreography-playbook.md` — ✅ 已实施

对应：V2-49；同时强化已有 V2-43 / V2-08。

已实现：

1. Action Phrase 构造阶段加入 **Executable Granularity Contract**；
2. 关键 Phrase 必须把主要因果外显为具体身体 / 武器动作事实；
3. Initiative Handoff 强化为动作尚未结束时的 Contact / Footwork / Axis / Range / Recovery Window 交接；
4. Action Execution Budget 明确“细化关键因果动作，压缩次要过渡”；
5. Ending Coverage Protection 已接入；
6. `Abstract Action Block` 已进入 Preflight。

### 5.3 `references/controls/prompt-assembly/control.md` — ✅ 已实施

对应：V2-49 的最终外显；同时保持 V2-46。

已实现：

1. **Concrete Choreography In → Concrete Choreography Out**；
2. 关键 Active Exchange 保留具体动作、Contact / Evasion / Interception、即时响应、Footwork / Axis / Range / Position 后果和下一动作入口；
3. 抽象词只能承担摘要 / 次要过渡；
4. Initiative Handoff 序列化保留动作重叠 / 状态继承；
5. Ending 描述与 Ending Budget 对齐，过长时优先内部压缩；
6. 保持 V2-46 Camera Coverage，不让动作细化导致镜头回退。

### 5.4 `references/tasks/action-combat-video/index.md` — ✅ Review 后最小强化

已确认原 Mandatory Path 主体正确，但 Stage-2 后仍写成泛化 `Action Phrase`，因此按 Plan 做最小强化：

```text
Planning
→ Stage-2 Execution Knowledge
→ Concrete Action Phrase
→ Prompt Assembly
→ Final Preflight
```

未新增新 Runtime 节点。

### 5.5 `references/libraries/combat-fighting-profiles/library.md` — 本轮未改

保持冻结。

只有相同 G01 在本轮 Runtime 正确执行后仍持续输出泛化动作，才进入 **Concrete Choreography Knowledge Audit**。

### 5.6 `references/controls/camera-direction/control.md` — 本轮未改

V2-46 已经实现 Camera Coverage。本轮只增加 Camera Intent 的交互暴露策略，没有新增 Camera 能力。

### 5.7 `assets/templates/single-shot-video-template.md` — 本轮未改

V2-46 已解决 `single-shot-video ≠ one-take`。本轮回归只确认该规则没有被 V2-49 破坏。

---

## 6. Final Preflight 增量 — ✅ 已实施

本轮没有新建 Gate 系统，只扩展现有 Combat Final Preflight。

### A. Executable Action Granularity

FAIL 条件：

- 关键数秒主要靠抽象动作词承担；
- Character Identity 有打法标签但没有具体动作证据；
- Initiative / Advantage 只有 Meta 说明；
- Camera / Audio 比身体动作描述更具体。

Failure Signature：

> `Abstract Action Block / Non-executable Choreography Summary`

### B. Initiative Handoff Externalization

FAIL 条件：

- `A 完成攻击 → B 开始反击` 反复出现；
- Counter 没有继承 Contact / Axis / Footwork / Range / Recovery；
- 双方各自拥有完整独立回合。

继续复用：

> `Turn-taking Combat / Initiative Segmentation`

### C. Ending Coverage Protection

FAIL 条件：

- High Coverage 15s Combat 过早进入长时间对视 / Pose；
- Ending 的文字与事件预算明显吞掉 Active Exchange；
- Ending 未继承最后一次战斗状态，而是重新摆姿势。

继续归入 Action Sufficiency / Coverage Budget / Motion Handoff，不新建 Ending Engine。

### D. Interactive Decision Purity

Interactive Regression FAIL 条件：

- 当前问 Profile，却在推荐里提前决定 Character Identity + Ending + Camera；
- Camera 已存在明显高价值导演分叉，却因“Camera 通常自动推导”完全不允许用户选择；
- Camera 已明确仍重复询问。

---

## 7. Regression Plan

### 7.1 Fixed G01 Input

继续使用完全相同办公室输入，不换场景：

> 使用交互模式，帮我做一段一个女生和男生在办公室打架的15秒电影片段，实际两个人穿着正常的职场服装但其实是2个杀手组织的职业杀手。中国男女，女的22岁长发高马尾漂亮身材完美，男性是一个秃顶又矮又胖的55岁领导，贴身搏斗，不要隔着什么办公桌。

保持 Interactive、15s、Generic 模型、同一人物与场景输入。

### 7.2 Interactive Gate

记录：

- 实际问题轮数；
- 每轮 Primary Decision Node；
- 推荐答案是否夹带 downstream 决策；
- Camera 是否满足条件暴露逻辑；
- 需求完整后是否及时收口。

轮数多少不是 PASS / FAIL。

### 7.3 Prompt Gate

最终 Prompt 至少满足：

- Setup 短；
- Active Combat 快速开始；
- Continuous Action Spine；
- 无默认 Hard Timeline Blocks；
- 关键 Action Phrase 有具体身体动作；
- Contact / Evasion / Immediate Response 可见；
- Footwork / Axis / Range / Position 后果可见；
- 下一动作从前一状态直接进入；
- Counter / Re-counter 不呈现回合制；
- Whole-body / Spatial / Kinetic Scope 可见；
- Character Identity 通过具体动作体现；
- Camera Coverage 不固化中全景；
- Camera Intent 若被用户明确选择，最终 Prompt 必须兑现；
- Cut 后 Action State 连续；
- Ending 不提前吞掉 Active Exchange；
- Negative Constraints 少而有依据；
- 不出现明显脏文本 / 中英文残片。

### 7.4 Abstract Action Block 专项检查

```text
删掉“连续 / 快速 / 专业 / 高密度 / 反制 / 缠斗”等概括词后，
是否仍然能看清人物具体在做什么、对方怎么立即响应、双方位置 / 轴线 / 距离如何变化？
```

如果答案是否定的，该段不通过 V2-49。

### 7.5 Prompt PASS 后才进入视频

只有 Prompt-level Gate 通过，才进入 Phase 13。

---

## 8. 开发执行顺序 — ✅ Step 1～6 已完成

### Step 1｜Interactive Contract — ✅

`assets/templates/mode-interactive-output-contract.md`

- Decision Purity；
- Conditional Camera Intent Exposure。

### Step 2｜Choreography Playbook — ✅

`references/tasks/action-combat-video/choreography-playbook.md`

- Executable Granularity Contract；
- Initiative Handoff 具体化；
- Ending Coverage Protection；
- Abstract Action Block Preflight。

### Step 3｜Prompt Assembly — ✅

`references/controls/prompt-assembly/control.md`

- Concrete Phrase 保真；
- 动作因果细节保留；
- Initiative Handoff 序列化；
- Ending 文本 / Budget 控制。

### Step 4｜Combat Router / Index Review — ✅

`references/tasks/action-combat-video/index.md`

已做必要的轻量强化，明确 `Stage-2 Knowledge → Concrete Action Phrase → Assembly → Preflight`。

### Step 5｜Regression Contract — ✅

`docs/action-combat-video-v2-regression.md`

已加入：Interactive Decision Purity、Conditional Camera Intent Exposure、Executable Action Granularity、Abstract Action Block、Ending Coverage Protection、Initiative Handoff Action-language realization。

### Step 6｜Static Review — ✅

确认没有：

- 新建不必要 Engine；
- 新增固定 Interactive 问题；
- Camera 特写数量配额；
- Action 数量配额；
- Fighting Library 无证据扩建；
- Generic Model Adapter 变化。

### Step 7｜Same-input G01 Regression — ⏳ 当前下一步

用户本地运行同一办公室 G01。

收集：

- Read 列表；
- Interactive 全过程；
- Final Prompt。

逐项判定 V2-48 / V2-49。

---

## 9. 本轮明确未改

本轮冻结：

- `references/tasks/action-combat-video/core-playbook.md`；
- `references/tasks/action-combat-video/modern-combat-playbook.md`；
- `references/tasks/action-combat-video/cinematic-wuxia-playbook.md`；
- `references/libraries/combat-fighting-profiles/library.md`；
- Fighting / Martial / Weapon 大规模 Library；
- `references/controls/camera-direction/control.md`；
- `assets/templates/single-shot-video-template.md`；
- Model Adapters；
- 新 Combat State Machine；
- 新 Combat Camera Engine；
- 固定动作数量 / 特写数量 / Interactive 轮数配额。

---

## 10. Concrete Choreography Knowledge Audit 进入条件

只有同时满足以下条件才进入下一阶段：

1. Mandatory Path 正确；
2. Stage-2 Knowledge 实际读取 / 可用；
3. Choreography 已要求 Executable Granularity；
4. Prompt Assembly 没有重新压缩动作；
5. Final Preflight 已能拦 Abstract Action Block；
6. 相同 G01 Final Prompt 仍持续缺乏具体动作构造。

满足后才审计 Fighting / Martial / Weapon 是否缺少可组合 Action Chain / Transition / Whole-body / Range / Axis / Footwork 知识。

---

## 11. Anti-overdesign / Consolidation

本轮最终 Runtime 合并保持：

```text
Interactive Exposure Contract
→ High-value Question Filter
+ Decision Purity
+ Conditional Camera Intent Exposure
+ Dynamic Stop
+ 10-round Safety Cap

Action Construction Contract
→ Action Phrase
+ Executable Granularity
+ Motion Handoff
+ Initiative Handoff
+ Action Execution Budget

Coverage / Ending Protection
→ Active Combat Coverage
+ Ending Budget
+ Motion Handoff

Camera Contract
→ Readability
+ Mobility
+ Editorial Coverage
```

V2-48 / V2-49 在 Spec 中独立追踪，但 Runtime 不分别建设新 Engine。

---

## 12. 当前实施状态

| Phase | 状态 | 说明 |
|---|---|---|
| 0–9 | ✅ 基线完成 | V2-01～34 |
| 10 | ✅ 完成 | Spec / Plan / Mapping 对齐 |
| 11 | ✅ Static PASS | Mandatory Assembly / Preflight |
| 12A | ✅ 已实施 | V2-46 Camera Coverage |
| 12B | ✅ 已实施 | V2-47 Interactive Question Budget |
| 12C | ✅ 已实施 | V2-48 Decision Purity + Conditional Camera Intent |
| 12D | ✅ 已实施 | V2-49 Executable Action Granularity |
| 12E | ⏳ 当前下一步 | Same-input G01 Prompt Regression |
| 13 | ⏸ 待 Prompt PASS | Generated Video Re-run / Model Calibration |

当前准确状态：

> **Spec / Plan / Runtime / Regression 已对齐；V2-48 / V2-49 Runtime Static Review PASS；Same-input G01 Prompt Re-test Pending。**

---

## 13. 当前下一步

不扩 Library，也不换测试场景。

继续使用同一办公室 G01 输入，检查：

1. Interactive 问题是否更纯；
2. Camera 在存在真实导演分叉时是否会被条件询问；
3. Final Prompt 是否从“动作概括”提升成“可执行连续动作链”；
4. Initiative 是否真正发生在动作过程中；
5. Ending 是否仍保持短促、不吞掉有效交战；
6. Camera Coverage 是否维持 V2-46 的改善而不回退。

只有这一轮 Prompt PASS，才进入真实视频生成。