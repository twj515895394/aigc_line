# Action Combat V2 Traceability Audit

> 状态：第一次真实成片反馈后 / 第二次 Prompt 生成失败后的正式一致性审计
>
> 目标：重新建立 `Spec → Implementation Plan → Runtime Files → Regression / Real Run` 的可追踪链，避免“Spec 有规则、Runtime 未必执行”以及“Runtime 先改、Plan 没跟”的漂移。

## 1. 审计范围

本轮新增设计从 **V2-35** 开始：

- V2-35 Combat Planning / Final Preflight Gate
- V2-36 Combat Kinetic Scope
- V2-37 Camera Mobility Coupling
- V2-38 Temporal Action Packing
- V2-39 Combat Action Interlock / Motion Handoff
- V2-40 Continuous Action Spine + Soft Time Anchors
- V2-41 Combat Intensity Curve
- V2-42 Visible Advantage Dynamics
- V2-43 Initiative Handoff

此外，对话中还已经确认但此前尚未正式写回 Spec 的两项治理结论：

- Initiative Handoff 的实现受 Combat Character Identity 约束，不把所有角色写成同一种抢主动方式；
- 暂停继续纵向增加细粒度 Combat 概念，转为横向 Design Tree Audit；动作本体一级机制暂时冻结，优先审计 Concrete Choreography Knowledge，并以“少建运行时概念、多做高价值检查”防止模型因规则膨胀而变笨。

## 2. 第二次 Prompt 失败样本

输入：15 秒办公室，中国男女，两人都是职业杀手，普通职场服装，要求贴身搏斗、不要隔着办公桌。

实际运行读取：

- SKILL.md
- input / task indexes
- action-combat-video index / core / choreography / modern
- interactive output contract
- single-shot-video-template
- choreography profiles / fighting profiles
- subject-motion / camera-direction / spatial-blocking
- cinematic-live-action
- generic model

**未读取 `references/controls/prompt-assembly/control.md`。**

最终 Prompt 仍使用：

```text
0–1.5s
1.5–4s
4–7s
7–10s
10–13.5s
13.5–15s
```

并出现明显的宏动作分段、角色打法体型化推断、上半身动作占比过高、长 Negative 清单等问题。

## 3. 首要架构根因

### A01｜Final Prompt Assembly 不是 Combat 必经路径

`SKILL.md` 当前把 `prompt-assembly/control.md` 放在 `0–3` 个按需 Controls 中。

结果：Combat 可以完整读取 Choreography Playbook，却在最终组装阶段完全不读取 Prompt Assembly，因此 V2-40、Kinetic Scope Externalization、Negative Discipline 等“最终输出规则”没有真正成为强制出口。

**结论：FAIL / 必须修复。**

### A02｜通用 Single-shot Template 与 V2-40 冲突

`single-shot-video-template.md` 当前规定：

> 时长较长且有三个以上清晰动作阶段时，可使用绝对时间轴。

15 秒 Combat 天然容易满足这一条件，导致通用模板把高密度战斗重新切回多个 Hard Time Blocks。

**结论：FAIL / Combat 专项覆盖规则缺失。**

### A03｜Final Preflight 虽存在于 Choreography，但没有强制调用链

V2-35 要求 Final Preflight 失败必须内部重写后再输出。但当前 Runtime 没有明确：

```text
Choreography Plan
→ Final Prompt Assembly
→ Combat Final Preflight
→ 失败则重写
→ 再 Preflight
→ Delivery
```

因此“规则在文件里存在”仍不等于“Agent 在输出前必须执行”。

**结论：PARTIAL / Gate 仍缺运行时接线。**

## 4. V2-35～V2-43 Traceability Matrix

| Spec | 设计要求 | 当前主要落点 | 第二次 Prompt 表现 | 审计状态 | 后续实施动作 |
|---|---|---|---|---|---|
| V2-35 | Planning + Final Preflight 强制 Gate | choreography / interactive | Planning 部分有改善；Final Prompt 仍出现硬时间块、无依据 Negative，说明 Final Gate 未真正否决 | PARTIAL | 在 Task/SKILL 明确 Final Assembly + Preflight 为 Combat 必经出口 |
| V2-36 | Coverage / Depth / Kinetic Scope 三维充分性 | choreography / prompt assembly | 仍以肩、前臂、抓手臂、手腕、肩线为主，脚步/髋/重心虽有但弱，空间路线变化有限 | PARTIAL | 保留机制；加强具体动作知识与最终外显检查，不新增新概念 |
| V2-37 | Stable ≠ Static；Camera Mobility 跟随 Kinetic Scope | choreography / prompt assembly | Camera 只有“低幅度稳定侧跟”，人物开放区→门框→墙面的路线没有形成明显摄影机运动主链 | PARTIAL | 检查 camera-direction / template 是否需要 Combat override；不直接增加复杂运镜 |
| V2-38 | Active Exchange 内避免宏动作被 3–4 秒摊薄 | choreography / prompt assembly | 1.5–4、4–7、7–10、10–13.5 均主要承载一个宏事件 | FAIL | 必须通过 Final Assembly/Preflight 拦截，而不是只在 Choreography 描述 |
| V2-39 | Motion Handoff；限制 Neutral Reset | choreography / prompt assembly | 文本声称“连续”，但宏段结构仍是男攻→女解→男抓→女解→男攻→女解，交接弱 | PARTIAL/FAIL | 在 Action Phrase 生成和 Final Prompt 序列化同时检查，不新增独立模块 |
| V2-40 | Continuous Action Spine + Soft Time Anchors | choreography / prompt assembly | 最终直接回到 6 个 Hard Time Blocks | FAIL | 修改输出模板覆盖关系；Combat 默认禁止通用模板因“3+阶段”自动转绝对时间轴 |
| V2-41 | 连续但非全程同速/同压力 | choreography | 有重压/反转变化，但被硬块切割后更像逐段事件，不是真正连续强度波形 | PARTIAL | 保留为 Choreography 子规则，不独立扩展 |
| V2-42 | Advantage 必须通过动作控制事实可见 | choreography | 男方逼向门框、女方借惯性反转等有可见证据 | PARTIAL/PASS | 保留，避免继续细化 |
| V2-43 | Initiative 在动作过程中转移，避免轮流式战斗 | choreography | 主要仍是“一方完成一组宏动作后另一方接管” | FAIL | 合并到 Motion Handoff / Character Identity 的动作检查，不发展独立状态机 |

## 5. 已确认但此前漏写 Spec 的结论

### D44｜Initiative × Character Identity

确认：不同角色可使用不同的 Initiative Acquisition / Retention 方式，但这只作为 Character Identity 的动作设计约束，不新增新的大型状态机或问卷。

第二次 Prompt 恰好暴露了反例：系统直接根据“22 岁漂亮女性 vs 55 岁矮胖男性”推成：

- 女方 = 速度、角度、闪避、短促反击
- 男方 = 体重、力量、压迫、抓控

这属于**从性别 / 年龄 / 体型过度映射 Character Identity**，与 V2-35 的动态推导要求冲突。

### D45｜Runtime Consolidation / Anti-overdesign

确认：

- 暂停继续纵向增加 Combat 一级机制；
- V2-35～43 在 Runtime 中应尽量合并成少数高杠杆执行合同；
- Failure Signature 主要用于 Preflight / Diagnostic / Benchmark，不等于每个都建独立模块；
- A. 动作本体机制层暂时冻结；
- 下一阶段优先审计 Concrete Choreography Knowledge（Fighting / Martial / Weapon 是否足够提供丰富、可组合、全身化的 Action Phrase）；
- 新增规则必须证明能改变生成行为，否则不进入 Runtime 真源。

## 6. 第二次 Prompt 的额外违规点

### P01｜Character Identity 体型模板化

第一轮回答直接把“年轻女性”映射成速度/角度，把“矮胖年长男性”映射成体重/力量/抓控。

这不是用户明确指定的打法，属于 V2-35 / V2-05 / V2-12 的反例。

### P02｜无依据 Negative Constraint

最终 Prompt 加入：

- `武器或枪械`
- `超能力动作`
- 长串避免项

其中“武器或枪械”用户并未指定需要禁止，违反 Positive-first / Negative Discipline。

### P03｜Setup 仍偏长且与“贴身搏斗”不一致

用户明确要求贴身搏斗，Prompt 却设定两人相距约 2.5 米，并用前 1.5 秒对峙再进入攻击。

对于 15 秒高密度近身 Combat，这会直接侵蚀 Active Exchange Budget。

### P04｜动作知识仍偏上半身 / 控制型

主要动作：肩膀压迫、直拳、前臂偏开、抓手臂、肩颈 frame、摆拳、抱控、手腕 / 肩线控制。

虽然有侧切、转髋、后撤、失衡，但具体动作构造仍明显偏上肢 / 抓控，说明 **Concrete Choreography Knowledge / Selection** 仍是一级待审计问题。

## 7. File Mapping 审计

### 必须调整 / 重新评估

- `docs/action-combat-video-v2-spec.md`：补齐已确认但漏写的 D44 / D45；
- `docs/action-combat-video-v2-implementation-plan.md`：增加本轮真实反馈增量实施阶段，不能继续停在 V2-01～34；
- `SKILL.md`：Combat Final Assembly / Preflight 必经路径；
- `references/tasks/action-combat-video/index.md`：明确 Final Assembly / Preflight 的强制出口；
- `references/tasks/action-combat-video/choreography-playbook.md`：保留上一轮合并实现，但需按 Traceability 重新验收；
- `references/controls/prompt-assembly/control.md`：保留 V2-40 等 Final Prompt 规则，并要求 Combat 挂接；
- `assets/templates/single-shot-video-template.md`：增加 Combat override，避免通用绝对时间轴规则覆盖 V2-40；
- `assets/templates/mode-interactive-output-contract.md`：检查 Character Identity 推导不能被一个“动作质感问题”偷偷模板化；
- `references/tasks/action-combat-video/modern-combat-playbook.md`：检查 Kinetic Scope / Camera Mobility / Continuous Phrase 的专项表达；
- `references/libraries/combat-fighting-profiles/library.md`：重点审计 Concrete Choreography Knowledge 是否过于 Profile 概述、缺少可组合动作构造信息；
- `references/controls/camera-direction/control.md`：评估是否需要通用层补 `Stable ≠ Static`，若仅 Combat 使用则由 Task 注入，不复制正文；
- `references/controls/timeline-rhythm/control.md`：评估是否与 Combat Soft Time Anchor 冲突；
- `references/controls/subject-motion/control.md` / `spatial-blocking/control.md`：评估 Kinetic Scope 是否需要通用能力配合；
- `references/models/*.md`：确认 Temporal / Camera fallback 不会重新引入 Hard Timeline / Static Camera；
- `references/diagnostics/combat-choreography-underfill/diagnostic.md`：上一轮集中式扩展方向可保留，但需与正式 Traceability 对齐；
- `docs/action-combat-video-v2-regression.md`：把第二次 Prompt 作为 Prompt-level G01 Regression，真实视频仍需后续生成。

### 暂无证据需要修改

- `core-playbook.md`：目前没有证据表明 Range / Advantage / Condition / Continuity 真源本身是本次主要问题；只有在映射审计发现状态边界缺失时再改。
- Wuxia 专项：本次失败样本是 Modern Combat，不因本次样本直接修改 Wuxia。

## 8. 上一轮 5 个 Runtime 提交初步处置

| 文件 | 处置建议 | 原因 |
|---|---|---|
| choreography-playbook.md | **保留但重审** | 收敛方向正确，但 Gate 还没有变成强制调用路径 |
| prompt-assembly/control.md | **保留** | 规则本身与 Spec 一致；真正问题是运行时没读它 |
| mode-interactive-output-contract.md | **保留但重审** | “不先问谁赢”修复有效，但 Character Identity 仍被推荐答案体型模板化 |
| combat-choreography-underfill/diagnostic.md | **保留但收敛** | 集中 Failure Signature 比建九个模块更合理 |
| action-combat-video-v2-regression.md | **保留并补本次样本** | 已把旧 PASS 撤回是正确的，但需要加入这次 Prompt-level 失败证据 |

结论：上一轮不需要整体回滚，但不能称为完整实施；应进入正式增量实施阶段重新接线。

## 9. 下一阶段正确顺序

```text
Spec 收口（补 D44 / D45）
→ 更新 Implementation Plan
→ 按本 Audit 建 File Mapping
→ 逐文件保留 / 调整 / 回退
→ Static Traceability Regression
→ 同一 G01 重新跑 Interactive → Final Prompt
→ Prompt-level PASS 后再生成真实视频
→ Generated Video Benchmark
```

在 Prompt-level G01 仍明显违反 V2-40 / V2-35 / Negative Discipline 时，不应直接进入视频生成，也不应继续增加新抽象机制。
