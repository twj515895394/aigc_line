# Action Combat Video Regression

> 类型：Markdown Skill 静态回归
>
> 分支：`feat/action-combat-v1`
>
> 设计依据：`docs/action-combat-video-spec.md`
>
> 重要：本页的场景只是**能力覆盖样例**，不是生成模板，也不限制实际 Battle Beat、招式、镜头或节奏。

## 1. 验证目标

检查 Action Combat V1 是否已经具备：

- 唯一任务路由；
- 现代 / 武侠专项分支；
- Battle Beat 与状态连续性；
- Action / Camera / Audio 三线同步；
- 1vN Target Handoff；
- Weapon State；
- Combat Libraries；
- 现有 Controls / Styles / Output Contracts 复用；
- 失败诊断路由；
- Quick / Interactive 最终完整 Prompt 约束；
- “约束错误，不约束创作”的自由度边界。

## 2. 结构验证

| 检查项 | 结果 | 说明 |
|---|---|---|
| Combat Task Router 存在 | PASS | `references/tasks/action-combat-video/index.md` |
| Combat Core 存在 | PASS | 维护 Intent / Spatial Map / Range / Advantage / Condition / State Contract |
| Modern Playbook 存在 | PASS | 现代近身格斗、1vN、站立到缠斗等专项差异 |
| Wuxia Playbook 存在 | PASS | 空手武术 + 刀剑枪棍 + Level 1–3 尺度 |
| Tasks Index 已接线 | PASS | 复杂战斗可唯一命中 Combat Task |
| SKILL.md 已接线 | PASS | 运行入口新增 Action Combat 路由与自查 |
| 4 个 Combat Libraries 存在 | PASS | fighting / martial / weapon / environment |
| Libraries Index 已接线 | PASS | 遵守 0–2 Library 预算 |
| Combat Diagnostic 存在 | PASS | 只诊断 Combat State Continuity Failure |
| Diagnostics Index 已接线 | PASS | 与 motion / spatial / anatomy / physics 等明确分工 |
| References 总索引已接线 | PASS | Task / Library / Style / Model / Output / Diagnostic 边界明确 |
| 不新增 Combat Controls | PASS | 继续复用 v2 Controls |
| 不新增 Combat Styles | PASS | 继续复用现有视觉 Styles |
| 不新增独立输出模板 | PASS | 继续复用 single-shot / multi-shot |

## 3. 能力回归矩阵

### R01｜现代 1v1 狭窄走廊

覆盖：

- Combat Spatial Map；
- Range transition；
- Impact chain；
- 走廊环境锚点；
- Hybrid Camera。

通过条件：动作不瞬移，逼近 / 后撤有距离因果，撞墙等命中有 Reaction / Recovery，镜头方向可继承。

结果：PASS（规则覆盖）。

### R02｜现代 1v3

覆盖：

- Primary Target；
- Secondary opponent state；
- Target Handoff；
- Environment positioning。

通过条件：每 Beat 只有一个主交战关系，换目标有入画 / 击退 / 转身 / 遮挡等 Handoff，其他对手不会无序同时攻击。

结果：PASS（规则覆盖）。

### R03｜Boxing → Wrestling / Grappling

覆盖：

- 主 Profile + 辅助 Profile；
- punching range → clinch / grappling；
- Range transition；
- posture / center-of-mass continuity。

通过条件：必须经过逼近、抓握、失衡或换层等动作后才能进入摔跤 / 地面关系。

结果：PASS（规则覆盖）。

### R04｜现代连续长镜头

覆盖：

- Continuous Camera Mode；
- Beat / Shot 解耦；
- Camera Axis；
- Spatial continuity。

通过条件：允许多个 Beat 共用一个 Shot；动作复杂度服从可读性；跨轴必须通过可见绕位 / 重建完成。

结果：PASS（规则覆盖）。

### R05｜武侠空手 1v1

覆盖：

- Cinematic Wuxia Level 2；
- martial profile；
- 试招 / 拆招 / 借力；
- 短距离身法。

通过条件：身法改变真实位置或角度；腾跃有起跳、路径和落地；不默认仙侠能量。

结果：PASS（规则覆盖）。

### R06｜剑 vs 剑

覆盖：

- Weapon State；
- 剑的轨迹与偏转；
- Contact / Outcome；
- Beat End weapon position。

通过条件：持握和兵器方向连续，格挡后的剑路改变下一反击窗口，兵器不会凭空换手或消失。

结果：PASS（规则覆盖）。

### R07｜枪 vs 剑

覆盖：

- 长 / 短兵器距离差；
- Range advantage；
- Turning Event；
- 贴身换距。

通过条件：枪的长度优势必须通过动作表现；剑手需要偏转 / 绕位 / 身法贴身才能消除距离优势。

结果：PASS（规则覆盖）。

### R08｜武侠 1vN

覆盖：

- Target Handoff；
- 身法与空间移动；
- 兵器轨迹接力；
- 环境遮挡。

通过条件：多人关系可读，兵器 / 腾跃 / 柱体等可以成为 Handoff，但不会让所有敌人同时变主目标。

结果：PASS（规则覆盖）。

### R09｜强环境互动

覆盖：

- wall / pillar / furniture / stairs / roof；
- Position / Range / Advantage / Camera handoff。

通过条件：环境互动至少改变一个有效状态，不为“华丽”连续添加无关道具。

结果：PASS（规则覆盖）。

### R10｜Condition 跨 Beat 累积

覆盖：

- injury；
- fatigue；
- breathing；
- localized function。

通过条件：上一 Beat 的伤腿 / 握持下降 / 明显疲劳必须影响后续速度、动作选择、Range 或 Advantage，不能自动恢复。

结果：PASS（规则覆盖）。

### R11｜Advantage Turning Event

覆盖：

- advantage source；
- explicit turning event；
- new advantage state。

通过条件：主导权不能为了节奏需要突然翻转；必须由落空、格挡、失衡、换距、受伤、环境或第三人等事件触发。

结果：PASS（规则覆盖）。

### R12｜Action / Camera / Audio 三线同步

覆盖：

- action event；
- camera purpose；
- foley / ambience / music strategy。

通过条件：声音绑定可见事件；关键命中可让音乐让位；镜头和动作不会同时拉满复杂度；最终 Prompt 仍融合成一个可执行时间线。

结果：PASS（规则覆盖）。

## 4. 自由度回归

必须确认以下内容**没有被实现成死规则**：

| 项目 | 结果 |
|---|---|
| Battle Beat 数量固定 | PASS：未固定 |
| 所有战斗必须走完整“起势→终结”阶段 | PASS：明确为可选阶段 |
| 每 Beat 必须严格 2–4 微动作 | PASS：定义为默认复杂度预算，可灵活增减 |
| 每 Beat 必须有慢动作 | PASS：只在功能需要时使用 |
| 每 Beat 必须使用环境 | PASS：只在有价值时使用 |
| 现代格斗必须固定 Boxing / MMA | PASS：Profile 可选，用户创意优先 |
| 武侠必须固定某门派套路 | PASS：只定义动作语言，不复刻套路 |
| 回归场景成为生成模板 | PASS：文档与运行规则明确禁止 |
| 最终 Prompt 必须显示内部状态字段 | PASS：内部状态必须转译成自然语言 |

## 5. 加载预算检查

Combat 正常路径：

```text
1 input
+ 1 Combat 主 Task 路线（router + core + 1 specialist）
+ 0–3 existing controls
+ 0–2 libraries
+ 0–1 style
+ 0–1 model adapter
+ 1 mode contract
+ 1 output template
```

结果：PASS。

Modern 与 Wuxia specialist 不同时加载；Combat Diagnostic 仅失败时加载。

## 6. 单一真源检查

- 通用动作物理仍由现有 controls / action-motion 提供基础真源；PASS。
- Combat Core 只维护战斗专项编排，不复制完整 camera / audio / style 百科；PASS。
- Profiles 只提供选项，不决定工作流；PASS。
- Styles 未复制为 Combat Style；PASS。
- single-shot / multi-shot 未复制为 Combat 模板；PASS。
- 模型专属语法未进入 Combat Playbook；PASS。

## 7. 已知边界

本轮是 Markdown Skill 的静态架构与规则回归，不代表对每个外部视频模型做了在线生成质量基准测试。

第一版暂不覆盖：

- 枪战专项 Playbook；
- 仙侠能量战斗；
- 特定平台专属 Combat 参数；
- 每个传统门派的招式百科。

## 8. 结论

Action Combat V1 的结构、路由、知识分层、加载预算、核心连续性规则和自由度边界均通过静态回归，可以进入合并阶段。
