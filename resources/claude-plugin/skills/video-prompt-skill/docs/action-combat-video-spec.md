# Action Combat Video Prompt Spec

> 状态：设计收口，可进入实现
>
> 定位：作为现有 `video-prompt-skill` 的一级专项任务能力，不建立独立 Skill。
>
> 设计原则：**约束错误，不约束创作；规定因果与连续性，不规定唯一动作方案。**

## 1. 目标

建立一套适用于现代动作格斗与电影武侠的视频 Prompt 专项能力，重点解决：

- 动作因果与连续性；
- 攻防关系与主导权；
- Action / Camera / Audio 三线协同；
- Beat / Shot / 空间连续性；
- 打击、受力、收招与下一动作衔接；
- 1v1 / 1vN 主交战对象管理；
- 环境参与战斗与镜头接力；
- 武侠身法、兵器与写实物理之间的尺度控制；
- 最终输出一份详细、完整、专业、可直接复制给视频模型使用的成品 Prompt。

核心哲学：

> **先建立可读的 Battle Beat，再同步设计动作、镜头与声音；空间、受力、环境、节奏和战斗目标共同服务攻防因果；复杂度服从连续性与可执行性，同时保留模型的创作空间。**

## 2. 第一版范围

正式支持：

1. 现代写实 / 电影化近身格斗；
2. 电影武侠 / 武术动作。

枪战暂不进入第一版正式实现，后续复用 Combat Core 扩展。

电影武侠默认不等于仙侠：允许短距离腾跃、踏墙、借力飞身、轻微滞空等电影化动作，但不默认剑气、能量波、御剑、法器和长距离无支撑飞行。

## 3. Task 架构

```text
references/tasks/action-combat-video/
├── index.md
├── core-playbook.md
├── modern-combat-playbook.md
└── cinematic-wuxia-playbook.md
```

Quick Mode 默认只加载：

> `Combat Core + 当前一个专项 Playbook`

不同时加载现代格斗与武侠分支。

Combat Core 负责通用战斗编排；专项 Playbook 负责现代格斗与电影武侠的不同默认节奏和动作语言。

## 4. Battle Beat

Combat 的核心组织单位是 **Battle Beat**，不是招式清单。

通用骨架可参考：

```text
起势 / 观察
→ 首次接触 / 试探
→ 攻防交换
→ 爆发 / 战术转折
→ 缠斗 / 拉开 / 再组织
→ 终结 / 制服 / 收势
```

这只是可选骨架，不是固定模板。具体任务根据时长、人数、场景、Combat Intent 和模型表现空间自由裁剪。

每个 Beat 内部至少考虑：

- Combat Intent；
- 当前主交战关系；
- Combat Range State；
- Combat Advantage State；
- Combat Condition State；
- 主动作 / 反应动作链；
- 镜头目标与镜头路径；
- 景别 / 角度变化；
- 双方空间与站位变化；
- 接触与受力反馈；
- 速度状态；
- 主要环境交互；
- Audio Choreography；
- Beat 结束状态；
- 下一 Beat 的衔接条件。

## 5. Action / Camera / Audio 三线同步

> **Action Choreography + Camera Choreography + Audio Choreography 必须在同一个 Beat 内协同设计。**

每个 Beat 同时回答：战斗目的、攻防关系、动作如何转换、镜头为什么这样拍、声音在哪些节点需要同步、最终落点是什么。

声音服务动作可读性、打击重量、空间真实感和节奏变化；禁止为每个微动作机械堆音效。

## 6. 时间控制：Beat-first + Soft Time Window

> **Beat 优先，时间柔性约束。**

先设计动作和节奏，再根据总时长分配软时间窗口。时间段用于帮助模型理解节奏和高潮位置，不作为逐秒硬卡点。

允许：

- `约 0–2s`；
- `中段`；
- `最后约 2 秒`；
- 对关键爆点 / 速度变化 / 音画同步节点设置更明确时间锚点。

禁止为了固定秒数强塞动作。

## 7. 功能驱动镜头

Combat Camera 使用：

> **镜头目的 → 主体关系 → 机位 → 镜头路径 → 景别变化 → 停止点**

镜头服务动作，不与主体动作同时拉满复杂度。

### Combat Camera Mode

支持三种模式：

- **Continuous / Long-take**：连续镜头优先，依赖走位、环境和镜头绕位，动作复杂度更克制；
- **Hybrid（默认）**：连续运动为主，爆点、空间重建、攻守反转时允许功能性切镜；
- **Cut-driven**：允许更高频功能性切镜，但仍必须遵守 Visual Handoff、轴线和空间连续性。

## 8. Beat 与 Shot 解耦

Battle Beat 与 Camera Shot 不强制 1:1。

允许：

- 一个 Beat 一个连续镜头；
- 一个 Beat 多个短镜头；
- 多个 Beat 共享一个连续镜头。

切镜必须有功能理由，例如空间重建、爆点、攻守反转、关键受力或位置变化。

## 9. Visual Handoff 与 Axis Crossing

> **连续运动优先，必要时才切镜。**

相邻 Beat 优先继承：屏幕运动方向、人物朝向、镜头轴线、环境锚点、上一 Beat 结束姿态和未完成动作趋势。

切镜必须存在 Visual Handoff，可来自攻击方向、受击运动、兵器轨迹、转身 / 腾跃方向、衣摆 / 发丝、前景遮挡或主体出入画方向。

允许跨轴，但必须有可解释事件：

> **Old Axis → Axis-Crossing Event → Spatial Re-establish → New Axis**

禁止 Cut 后人物左右位置、朝向和攻击方向无解释翻转。

## 10. 打击反馈链

关键打击节点统一参考：

> **Preparation → Delivery → Contact → Reaction → Recovery → Continuation**
>
> **预备 → 发力 → 接触 → 受力反馈 → 收招 → 衔接**

现代格斗强调重量、惯性、失衡、疼痛感与恢复；电影武侠强调借力、身法、兵器轨迹与优雅但明确的受力因果。

该链路是质量检查框架，不要求最终 Prompt 每次机械写出六个标签。

## 11. Action–Reaction Pair

关键攻防节点优先使用：

> **Initiator Action → Defender Response → Contact / Outcome → State Change**

Combat 不生成彼此独立的招式列表，而生成连续交互式战斗链。

State Change 可更新 Range、Position、Advantage、Condition、Camera / Continuity State。

## 12. 动作复杂度预算

默认建议：

> **1 个主攻防目标 + 2～4 个连续攻防交互节点 + 1 个明确结束状态**

这是可读性预算，不是死框架。模型可根据时长、动作类型和镜头方式动态增减；核心要求是不能为了“动作多”牺牲因果和可读性。

> **宁可少而清晰，也不要多而混乱。**

## 13. Combat Spatial Map

每场打斗在生成 Beat 前，内部先建立轻量级 **Combat Spatial Map**，作为空间真源。

至少关注：

- 环境锚点；
- 障碍物和高低差；
- 可移动区域；
- 出口 / 死角；
- 角色初始位置与朝向；
- 初始 Range；
- 可利用环境；
- 主要移动通道；
- Camera Axis。

Beat 在该 Map 上增量更新：

> **Position State → Movement / Interaction → New Position State**

禁止人物和环境锚点在 Beat 之间无因果漂移。

## 14. Beat State Contract

每个 Beat 必须产生内部 End State，下一 Beat 从该状态继续：

> **Beat N End State → Beat State Contract → Beat N+1 Start State**

至少维护：

- **Actor State**：位置、朝向、姿态 / 重心、肢体状态、武器状态、当前主目标；
- **Combat State**：Range、Advantage、Condition、当前攻防趋势、未结束 momentum；
- **Camera State**：机位关系、Camera Axis、屏幕运动方向、镜头运动趋势；
- **Environment State**：环境锚点、障碍物关系、可继续利用空间；
- **Continuity State**：Visual Handoff、Target Handoff、未完成动作趋势。

Camera State 与 Actor State 同级维护。

## 15. 1v1 与 1vN

第一版支持 `1v1 + 1vN`。

多人战采用主交战对象机制：每个 Beat 只有一个主要攻防关系，其他对手必须处于逼近、包抄、被阻挡、被击退、倒地恢复、等待切入等可解释状态。

### Target Handoff

主交战对象切换必须经过：

> **Current Target → Target Handoff → Spatial Re-map → New Primary Target**

切换后重新建立：当前主目标、其他人位置、Range、Camera Axis、人物朝向和动作 momentum。

## 16. 环境作为一级战斗变量

环境可参与：

> **移动 → 遮挡 → 借力 → 碰撞 → 改变站位 → 镜头接力**

每个 Beat 原则上只突出一个主要环境交互，避免动作、镜头和环境同时过载。

## 17. 速度变化

允许有限、功能驱动的速度变化：

- 正常速度承担主要攻防推进；
- 重击、兵器交错、极限闪避、腾跃转折可短暂减速；
- 减速后尽快回归正常速度；
- 慢动作必须明确“为了看清什么”。

是否使用、使用几次由场景决定，不作为固定模板。

## 18. 默认 Beat 节奏画像

### 现代格斗默认倾向

> **快速观察 → 首次接触 → 连续压迫 → 攻守反转 → 近身缠斗 / 控制 → 终结**

强调短停顿、直接交换、接触密度、压迫、失衡和恢复。

### 电影武侠默认倾向

> **对峙 / 留白 → 试招 → 拆招往复 → 身法 / 兵器转折 → 高潮交换 → 收势**

强调读招、接招、化解、呼吸空间、身法 / 兵器轨迹和节奏美感。

以上全部是默认策略，不是模板；Combat Intent、时长、人数、强度、环境和用户要求可以完全覆盖。

## 19. Combat Range State

显式维护攻防距离。基础状态可包含：远距离、长兵器距离、中距离、近距离、缠斗距离、脱离 / 重置距离。

距离变化必须有动作因果：

> **Current Range State → Range Transition Action → New Range State**

禁止无因果从远距直接跳入贴身状态。

## 20. Combat Advantage State 与 Turning Event

显式维护双方 Combat Advantage State，例如：均势、轻度占优、明显压制、暂时脱离 / 重置。

采用：

> **优势状态 + 优势来源 + 转折原因**

优势来源可来自距离、速度、力量、技术、兵器长度、地形、人数、失衡、受伤、死角等。

明显主导权变化必须经过：

> **原优势状态 → Turning Event → 优势来源改变 → 新优势状态**

一个 Beat 原则上最多一个主要主导权反转，避免机械来回翻盘。

## 21. Combat Condition State

角色的受伤、疲劳和呼吸跨 Beat 累积维护，但不做 RPG 数值模拟。

采用：

> **状态标签 + 对后续动作的可见影响**

Condition 应影响后续速度、站姿、防守、动作选择、Range、Advantage、表演和镜头表现。

## 22. Combat Intent

Combat Intent 是核心变量，至少支持：

- 制服；
- 脱身；
- 压制；
- 保护；
- 拖延；
- 试探；
- 击败 / 终结；
- 展示实力。

直接影响：

> **Beat 顺序 → 攻防策略 → 动作选择 → 镜头重点 → 最终落点**

Quick Mode 用户未指定时自动推断，不追问。

## 23. 强度等级

### 现代格斗

- Level 1｜写实近身格斗；
- Level 2｜电影化现代动作（默认）；
- Level 3｜强化动作片，但不进入超级英雄式无重量感战斗。

### 电影武侠

- Level 1｜写实武术；
- Level 2｜电影武侠（默认）；
- Level 3｜高武武侠，但不进入仙侠能量体系。

强度是默认控制变量，不限制模型在同等级内自由设计动作。

## 24. 流派与兵器

支持流派动作画像，但不建设招式百科。

### 现代候选

Boxing、Muay Thai、Sanda、MMA、摔跤 / 柔术倾向、电影化战术近身动作语言。

### 武侠候选

咏春、八极、太极式借力、长拳、南拳，以及刀 / 剑 / 枪 / 棍动作画像。

每个画像重点描述：交战距离、重心与站姿、发力方式、攻防节奏、动作类别、攻防倾向、空间移动方式、镜头重点。

支持：

> **主流派 + 辅助流派**

一个 Beat 只有一个主动作语言；辅助流派在明确转换节点介入。

第一版正式支持兵器：刀、剑、枪、棍。

## 25. Audio Choreography

音频与 Battle Beat 同步编排，可包含：

- 环境底噪；
- 脚步 / 急停摩擦；
- 衣料 / 衣袂；
- 呼吸；
- 拳脚破风；
- 身体 / 环境碰撞；
- 兵器挥动、接触、偏转；
- 音乐；
- 必要的静默或音乐让位。

音乐不是强制项；如果无 BGM 或极弱配乐更适合压迫感，应主动采用。

## 26. Final Prompt 输出原则

无论 Quick Mode 还是 Interactive Mode，最终用户都必须拿到：

> **一份详细、完整、专业、可直接复制给视频模型使用的成品 Prompt。**

两种模式差异只在生成过程和是否展示中间设计，不在最终 Prompt 完成度。

### Quick Mode

- 零追问；
- 自动推断 Intent；
- 自动建立 Spatial Map；
- 自动拆 Beat；
- 自动维护 Range / Advantage / Condition；
- 自动识别 Turning / Handoff；
- 自动协调 Action / Camera / Audio；
- 不默认 Dump 内部状态；
- 直接输出详细完整成品 Prompt。

### Interactive Mode

- 用户明确要求讨论 / Grill Me 时启用；
- 可按需展示 Combat Blueprint / Beat Sheet；
- 最终仍必须汇总为完整、可复制成品 Prompt。

## 27. Combat Final Prompt Contract

最终 Combat Prompt 使用统一专业结构，可按任务删去不适用区块，但不得遗漏关键执行信息。

```text
【场景与视觉锁定】
【战斗总体设定】
【动作 / 镜头 / 声音时间线】
【声音总体设计】
【连续性与物理约束】
【专项禁止项】
【画质与输出约束】
```

Action / Camera / Audio 应按时间线协同表达，不应变成彼此割裂的三份说明。

内部 Range / Advantage / Condition / State Contract 等状态必须转译成视频模型能执行的自然语言，不直接 Dump 字段表。

## 28. 模型 / 平台适配原则

Combat Prompt 以 **模型无关、平台通用** 为第一目标。

> **Generic Professional Combat Prompt 是最终产品本身；Model Adapter 不是必经步骤。**

只在目标模型确实存在明确输入特性、参考素材语法、长度限制、音频能力或特殊控制格式时，才进行轻量适配。

## 29. Combat Negative Constraints

根据场景动态附带高风险禁止项，不机械堆满全部禁止项。

通用风险包括：

- 人物瞬移；
- 无缘由左右换位；
- 拳脚 / 身体穿模；
- 肢体粘连或异常扭曲；
- 动作无重量感；
- 命中后缺少受力反馈；
- Condition 无理由恢复；
- 镜头无动机跳轴；
- 切镜后空间关系失真；
- 多人同时无序成为主目标；
- 背景人物消失、复制或漂移。

武侠 / 兵器可追加：兵器变形、长度变化、凭空换手、无起跳悬空、无落地过程、无因果长距离飞行、非高武场景出现仙侠能量等。

## 30. 与现有 Output Contract 的组合

Combat 是专项编排层，不建立第二套平行输出模板。

```text
Combat Blueprint / Combat Final Prompt Contract
→ 判断单镜头或多镜头表达
→ 挂接现有 single-shot / multi-shot Output Contract
→ 注入 Combat 专项动作、镜头、声音、连续性、物理反馈和 Negative Constraints
→ 输出最终可复制 Prompt
```

Combat Final Prompt Contract 定义“战斗必须提供哪些专业信息”；现有 Output Contract 定义“这些信息如何组织输出”。

## 31. v2 架构落位原则

### Task / Playbook

Combat 专项知识优先留在 Task / Playbook。

包括：Battle Beat、Range / Advantage / Condition、Target Handoff、Combat Spatial Map、Beat State Contract、Action–Reaction Pair、Combat Camera Mode、三线同步编排等。

### Controls

**第一版不大量新增 Combat 专属 Controls。**

优先复用现有：

- `subject-motion`；
- `camera-direction`；
- `spatial-blocking`；
- `continuity-consistency`；
- `timeline-rhythm`；
- `realism-quality`；
- `audio-visual-sync`。

只有后续发现某项能力确实跨任务复用，才升级成新的 Control。

### Libraries

Playbook 管“怎么编排”，Library 管“可以选择什么动作语言 / 兵器语言 / 环境模式”。

建议按职责聚合，而不是一个流派一个文件：

- `combat-fighting-profiles`：Boxing、Muay Thai、Sanda、MMA、Wrestling / Grappling、Tactical Close Combat；
- `combat-martial-profiles`：咏春、八极、太极借力、长拳、南拳等；
- `combat-weapon-profiles`：刀、剑、枪、棍；
- `combat-environment-patterns`：走廊、楼梯、墙面、柱体、桌椅、屋顶、竹林、高低差空间等。

这些内容是可选知识库，不是强制模板。

### Styles

Combat 不新增一级 Style。

继续复用现有视觉 Styles；Style 回答“画面长什么样”，Combat Playbook + fighting / weapon profile 回答“怎么打”。

### Diagnostics

优先扩展现有 Diagnostics，不为 Combat 复制一套同义错误分类。

映射示例：

- Range 突变 → `spatial-teleportation`；
- 镜头乱跳 / 无动机跨轴 → `camera-chaos`；
- 接触错误 / 穿模 → `anatomy-contact-failure`；
- 打击无重量 → `physics-and-weightlessness`；
- 音画不同步 → `audio-visual-mismatch`；
- 动作过载 → `prompt-overload-and-conflict`。

如现有诊断无法覆盖，可新增一个综合型 **Combat State Continuity Failure**，诊断 Advantage / Condition / Target / Weapon / Beat State Contract 的前后状态断裂。

## 32. 回归测试原则

第一版建立 Combat Regression Matrix，但**测试场景只是能力覆盖样例，不是生成模板**。

可选测试样例包括：现代 1v1、现代 1vN、长镜头、流派切换、武侠空手、剑战、长兵器 vs 短兵器、环境交互、受伤累积、主导权变化、音画同步等。

测试真正检查的是能力 Contract，例如：

- 是否出现无因果 Range 跳变；
- Target 切换是否有 Handoff；
- Beat End State 是否被下一 Beat 继承；
- Condition 是否持续影响动作；
- 镜头跨轴是否有解释；
- 打击是否有可读受力反馈；
- 场景需要时 Audio 是否参与 Beat；
- 最终 Prompt 是否详细、完整、可直接复制。

> **Regression Matrix 用来验证能力，不用来规定创作。**

## 33. 创作自由度上位原则

为避免 Skill 过度模板化，所有实现必须遵循：

1. **约束错误，不约束创作。**
2. **规定动作因果、空间连续、状态继承和镜头逻辑，不规定唯一动作方案。**
3. **默认 Beat 节奏、动作复杂度、速度变化、环境互动等均为策略建议，不是硬模板。**
4. **示例、回归场景、Library 条目只提供启发和能力覆盖，不允许成为强制生成路径。**
5. **当用户给出明确创意或编排时，优先尊重用户设计，只修正明显冲突、不可执行或连续性问题。**
6. **Quick Mode 应让模型自主补全低风险细节，而不是把每个 Combat State 显式机械输出。**
7. **最终目标是让模型发挥得更好，而不是让模型照表填空。**

## 34. Grill Me 收口与实现阶段原则

当前 Combat V1 设计已完成主要架构决策，Grill Me 在此收口。

后续：

- 直接进入实现；
- Library 内部条目、测试样例、Diagnostic 映射等执行细节由实现阶段按现有仓库真源合理决策；
- 只有遇到会改变一级架构、破坏单一真源或改变最终用户交付契约的重大冲突，才重新进入 Grill Me。

## 35. 后续枪战扩展

枪战不进入 V1，但应复用 Combat Core：Combat Intent、Spatial Map、Range、Advantage、Condition、Target Handoff、Beat State Contract、Camera / Audio 协同仍成立。

后续只新增枪战特有专业层，例如：掩体、火力方向、弹药 / 换弹、枪口方向、射线安全、压制、暴露窗口等，不重新复制 Combat Core。

## 36. 已确认决策记录

| # | 决策 | 结论 |
|---|---|---|
| 1 | 第一版打斗类型 | 现代格斗 + 电影武侠并行 |
| 2 | 武侠尺度 | 电影武侠，不默认仙侠 |
| 3 | 集成形式 | 现有 Skill 一级专项任务 |
| 4 | Playbook 架构 | Combat Core + 两个专项 Playbook |
| 5 | 核心粒度 | Battle Beat |
| 6 | 三线编排 | Action / Camera / Audio 同 Beat 协同 |
| 7 | 时间控制 | Beat-first + Soft Time Window |
| 8 | 镜头 | 功能驱动；Continuous / Hybrid / Cut-driven |
| 9 | Beat / Shot | 解耦 |
| 10 | 跨 Beat | Visual Handoff + Axis 可解释迁移 |
| 11 | 打击反馈 | Preparation → Delivery → Contact → Reaction → Recovery → Continuation |
| 12 | 动作链 | Action–Reaction Pair |
| 13 | 动作复杂度 | 默认建议，不作为死框架 |
| 14 | Spatial Map | 每场战斗内部建立轻量空间真源 |
| 15 | State Contract | Beat End State 强制传递 |
| 16 | 多人战 | 1v1 + 1vN；Primary Target + Target Handoff |
| 17 | 环境 | 一级战斗变量 |
| 18 | 速度变化 | 功能驱动、有限使用 |
| 19 | 默认节奏 | 现代 / 武侠不同，但仅为默认策略 |
| 20 | Range | 显式维护；变化必须有动作因果 |
| 21 | Advantage | 显式维护；主要反转需 Turning Event |
| 22 | Condition | 受伤 / 疲劳 / 呼吸跨 Beat 累积 |
| 23 | Combat Intent | 显式核心变量，Quick Mode 自动推断 |
| 24 | 强度 | 现代 / 武侠各三级，Level 2 默认 |
| 25 | 流派 | 动作画像，不做招式百科 |
| 26 | 混合流派 | 主流派 + 辅助流派 |
| 27 | 兵器 | 刀 / 剑 / 枪 / 棍 |
| 28 | 最终输出 | Quick / Interactive 都给详细完整可复制 Prompt |
| 29 | Final Prompt Contract | 统一专业结构，不 Dump 内部状态表 |
| 30 | 平台适配 | 通用专业 Prompt 为主，模型适配仅轻量可选 |
| 31 | Negative Constraints | 按场景动态附带 |
| 32 | Output Contract | 挂接现有 single-shot / multi-shot，不建平行模板 |
| 33 | Controls | 优先复用现有通用 Controls |
| 34 | Libraries | 流派 / 兵器 / 环境作为可选知识库，按职责聚合 |
| 35 | Styles | 不新增 Combat 一级 Style |
| 36 | Diagnostics | 优先复用现有；必要时最多补综合状态连续性诊断 |
| 37 | Regression Matrix | 建立覆盖样例，但样例绝不成为固定框架 |
| 38 | 创作自由度 | 约束错误，不约束创作 |
| 39 | Grill Me | 当前设计收口，进入实现 |

## 37. 禁止倾向

- 不把打斗写成招式名词堆砌；
- 不把默认 Beat 节奏当固定模板；
- 不把回归测试样例当生成框架；
- 不默认一个 Beat 塞大量动作；
- 不让镜头与主体同时高复杂度运动；
- 不无理由频繁切镜；
- 不允许切镜后方向和站位无接力；
- 不把“命中”当作完整打击反馈；
- 不让多人同时无序成为主交战对象；
- 不让环境同时承担过多交互；
- 不滥用慢动作；
- 不让流派名成为装饰标签；
- 不默认把电影武侠扩成仙侠；
- 不允许 Advantage 无原因翻转；
- 不允许 Range 无动作因果跳变；
- 不允许 Condition 无理由重置；
- 不允许 Target 无 Handoff 瞬间切换；
- 不允许 Camera Axis 无解释翻转；
- 不把内部状态机原样 Dump 给视频模型；
- 不因 Quick Mode 而降低最终 Prompt 的专业度和完整度；
- 不复制现有 v2 通用真源；
- 不建立独立 Combat single-shot / multi-shot 模板副本；
- 不为了“规则完整”牺牲模型的合理创作空间。
