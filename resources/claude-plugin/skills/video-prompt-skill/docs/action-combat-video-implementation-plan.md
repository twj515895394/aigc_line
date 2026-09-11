# Action Combat Video Implementation Plan

> 状态：V1 实施完成，静态回归通过
>
> 设计依据：`docs/action-combat-video-spec.md`
>
> 实施分支：`feat/action-combat-v1`
>
> 回归记录：`docs/action-combat-video-regression.md`

## 1. 实施目标

把 Action Combat 从设计 Spec 落地为 `video-prompt-skill` 的一级专项任务能力，第一版覆盖：

- 现代写实 / 电影化近身格斗；
- 电影武侠 / 武术动作；
- 1v1 与 1vN；
- 刀 / 剑 / 枪 / 棍；
- Action / Camera / Audio 三线同步；
- Combat Spatial Map、Range / Advantage / Condition、Target Handoff、Beat State Contract；
- Generic Professional Prompt 作为默认最终产品；
- 与现有 single-shot / multi-shot 输出合同衔接。

实施原则：

> **约束错误，不约束创作。**
>
> 固定的是因果、连续性、状态继承、物理反馈和输出完整度；动作编排、Beat 数量、镜头选择、环境利用和节奏只提供策略，不做死模板。

## 2. 架构边界

### Task / Playbook

已新增一级专项任务：

```text
references/tasks/action-combat-video/
├── index.md
├── core-playbook.md
├── modern-combat-playbook.md
└── cinematic-wuxia-playbook.md
```

职责：路由、Combat 工作流、Battle Beat、状态链、三线编排和最终 Prompt 组装要求。

### Controls

第一版未新增 Combat 专属 Control，继续复用：

- `timeline-rhythm`
- `subject-motion`
- `camera-direction`
- `spatial-blocking`
- `continuity-consistency`
- `audio-visual-sync`
- `prompt-assembly`
- `realism-quality`

### Libraries

已按职责聚合：

- `combat-fighting-profiles`
- `combat-martial-profiles`
- `combat-weapon-profiles`
- `combat-environment-patterns`

### Styles

未新增 Combat Style，继续复用现有视觉 Styles。

### Diagnostics

优先复用现有 diagnostics；已新增一个综合型：

- `combat-state-continuity-failure`

只处理现有诊断覆盖不好的 Advantage / Condition / Target / Weapon / Beat State Contract 状态断裂。

## 3. 实施阶段

### Phase 1｜Task 能力落地

- [x] 新建 Action Combat 路由页；
- [x] 新建 Combat Core Playbook；
- [x] 新建 Modern Combat Playbook；
- [x] 新建 Cinematic Wuxia Playbook；
- [x] 接入 `references/tasks/index.md`；
- [x] 接入 `SKILL.md` 任务路由。

完成结果：复杂动作格斗 / 武侠动作戏可命中 Action Combat Task；Quick Mode 不增加问卷式追问。

### Phase 2｜Combat Libraries

- [x] 现代格斗动作画像库；
- [x] 武术 / 武侠动作画像库；
- [x] 兵器动作画像库；
- [x] 环境战斗交互模式库；
- [x] 更新 `references/libraries/index.md`。

完成结果：Playbook 负责“怎么编排”，Library 负责“有哪些动作语言 / 兵器语言 / 环境模式”。

### Phase 3｜Diagnostic

- [x] 新建 `combat-state-continuity-failure`；
- [x] 更新 diagnostics index；
- [x] 明确与现有 motion / spatial / anatomy / physics / audio diagnostics 的路由边界。

完成结果：普通失败继续走现有诊断，只有 Combat 状态链整体断裂才走新增页。

### Phase 4｜运行入口与索引整合

- [x] 更新 `references/index.md`；
- [x] 更新 `SKILL.md` 的任务范围和路由；
- [x] 确保模型适配仍为可选层；
- [x] 确保 Combat 不复制 single-shot / multi-shot 模板正文；
- [x] 检查加载预算。

完成结果：Combat 继续遵守 v2 加载预算；Modern 与 Wuxia 专项分支不会同时加载；Generic Professional Prompt 是默认完整产品。

### Phase 5｜静态回归与验证

- [x] 建立覆盖性测试样例；
- [x] 明确“测试样例不是生成模板”；
- [x] 验证现代 1v1 / 1vN；
- [x] 验证站立打击到缠斗 / 控制的距离变化；
- [x] 验证连续长镜头；
- [x] 验证武侠空手与兵器；
- [x] 验证长 / 短兵器距离差；
- [x] 验证环境强交互；
- [x] 验证 Condition 与 Advantage 状态链；
- [x] 验证 Action / Camera / Audio 三线同步；
- [x] 验证自由度边界。

详细结果见：`docs/action-combat-video-regression.md`。

### Phase 6｜文档收口

- [x] 更新本实施计划状态；
- [x] 保持 `docs/action-combat-video-spec.md` 作为完整设计真源；
- [x] 新增回归记录；
- [x] 记录最终文件清单与架构边界；
- [x] 做分支结构核对。

## 4. 不实施内容

第一版暂不实施：

- 枪战 Playbook；
- 仙侠能量战斗体系；
- 每个流派一个独立文件；
- Combat 专属视觉 Style；
- 大量 Combat 专属 Controls；
- 一套与现有输出合同平行的 Combat 模板系统；
- 固定 Beat 数量、固定动作组合或固定镜头模板。

枪战后续复用 Combat Core，新增专项 Playbook / Library 扩展即可。

## 5. 最终交付物

### 设计与实施文档

```text
docs/action-combat-video-spec.md
docs/action-combat-video-implementation-plan.md
docs/action-combat-video-regression.md
```

### Task

```text
references/tasks/action-combat-video/index.md
references/tasks/action-combat-video/core-playbook.md
references/tasks/action-combat-video/modern-combat-playbook.md
references/tasks/action-combat-video/cinematic-wuxia-playbook.md
references/tasks/index.md
```

### Libraries

```text
references/libraries/combat-fighting-profiles/library.md
references/libraries/combat-martial-profiles/library.md
references/libraries/combat-weapon-profiles/library.md
references/libraries/combat-environment-patterns/library.md
references/libraries/index.md
```

### Diagnostic

```text
references/diagnostics/combat-state-continuity-failure/diagnostic.md
references/diagnostics/index.md
```

### Runtime Entry

```text
references/index.md
SKILL.md
```

## 6. 验收结论

Action Combat V1 已完成第一版运行期落地，并通过静态结构与能力回归。

验收重点：

- 不复制现有通用 Controls；
- 不新增 Combat Style；
- 不复制输出模板；
- 不把测试案例和默认 Beat 实现为死框架；
- Quick / Interactive 最终都要求完整可复制 Prompt；
- 场景需要时 Audio Choreography 与 Action / Camera 同步；
- Combat 内部状态用于保证因果和连续性，最终转译为自然语言。

下一步如继续扩展，优先做真实 Prompt 样例评测和后续枪战专项，而不是继续增加更多抽象状态或固定模板。
