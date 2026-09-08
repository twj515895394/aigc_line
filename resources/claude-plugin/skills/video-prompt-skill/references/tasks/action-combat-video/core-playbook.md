# Action Combat Core Playbook

## 1. 职责

本文件是 `action-combat-video` Task 的 **Combat State / Continuity / Battle Runtime Skeleton**。

它负责：

- 战斗目的与阶段关系；
- 人物 / 环境 / 兵器的空间真源；
- Range / Advantage / Condition；
- Turning Event；
- Action–Reaction 的基础因果合同；
- 1vN / Target Handoff；
- Battle Beat 与 Beat State Contract；
- Position / Environment / Weapon State 的跨 Beat 继承；
- Spatial / Physical / Continuity Validation；
- Task 与 Choreography / 专项 Playbook / Controls / Libraries 的运行协调。

它**不负责**完整动作导演策略。Coverage、Rhythm、Action Phrase、Exchange Depth、Combat Character Identity、Tactical Interaction、Signature Moment、Combat Contact Solidity、Action Execution Budget、Camera Readability Budget、Combat Audio Choreography 等由 `choreography-playbook.md` 负责。

核心分工：

> **Core 负责“打得对、接得上”。**  
> **Choreography 负责“打得够、丰富、好看、有实感”。**

最终 Prompt 不直接 Dump 内部状态表；状态通过可见动作、空间变化和因果结果体现。

---

## 2. 总运行链

```text
Combat Intent
→ Combat Spatial Map
→ Beat Start State
→ Choreography Planning / Action Phrase
→ Action–Reaction / Contact / Transition
→ Turning Event / Target Handoff（如有）
→ Beat End State
→ Beat State Contract
→ Continuity Validation
→ Next Beat
```

Core 不规定每个 Battle Beat 必须包含固定数量动作。

---

## 3. Combat Intent

优先识别战斗目的，例如：

- 制服；
- 脱身；
- 压制；
- 保护；
- 拖延；
- 试探；
- 击败 / 终结；
- 展示实力。

Intent 影响：

- Battle Beat 的战术目标；
- 主导权变化；
- Range 选择；
- Target Handoff；
- Condition 后果；
- 最终战斗结果。

Quick Mode 未明确时从剧情和观看目标自动推断；Interactive Mode 只有在存在高影响分叉且无法可靠推断时才向用户暴露。

---

## 4. Battle Beat

Battle Beat 是 Combat 的**战术 / 状态阶段单位**，不是固定动作数量容器。

Beat 只有在以下内容实质变化时才应切换：

- 战术目标；
- 主要 Advantage；
- 关键 Condition；
- Primary Target；
- 战斗阶段；
- Turning Event 后形成新的状态关系。

一个 Beat 可以包含一个或多个无缝连续 Action Phrase。Phrase 的数量与复杂度由 `choreography-playbook.md` 动态决定。

Beat 之间不要求停战，也不要求重新起势。

---

## 5. Combat Spatial Map

战斗开始前内部建立轻量空间真源，只维护真正影响动作、状态与镜头的变量：

- 人物初始位置与朝向；
- 主要环境锚点；
- 障碍、出口、死角、高低差；
- 可移动区域与通道；
- 关键可交互边界；
- 当前 Camera Axis；
- 初始 Combat Range State；
- 兵器 / 关键道具位置（如适用）。

每次位置变化必须满足：

> **Position State → Movement / Interaction → New Position State**

禁止人物、兵器、道具、环境与镜头关系无因果漂移。

Environment Action Affordance 由 Choreography 规划；一旦环境动作发生，其结果必须回写 Spatial / Environment State。

---

## 6. Combat Range State

内部可按场景使用：

- 远距离；
- 长兵器距离；
- 中距离；
- 近距离；
- 缠斗 / 控制距离；
- 脱离 / 重置距离。

距离变化必须由动作产生：

> **Current Range → Range Transition Action → New Range**

例如：逼近、侧移、格挡后压入、推开、摔脱、追击、兵器偏转后贴身、撤步重建距离。

Range 是状态真源，不是 Final Prompt 的标签模板。最终应直接描述人物如何改变距离。

---

## 7. Combat Advantage State 与 Turning Event

内部维护当前主导关系，例如：

- 均势；
- 轻度占优；
- 明显压制；
- 暂时失衡；
- 脱离 / 重置。

Advantage 必须记录来源，例如：

- Range；
- 速度；
- 力量；
- 技术；
- 兵器长度 / 线路；
- 地形；
- 人数；
- 失衡；
- 受伤 / 功能受限；
- 死角；
- 环境位置。

明显主导权变化必须有 Turning Event：

> **旧优势 → 转折事件 → 优势来源变化 → 新优势**

Turning Event 可来自：

- 落空；
- 格挡 / 拆招；
- Counter / Re-counter；
- 失衡；
- Range 改变；
- 缴械；
- 环境换位；
- 受伤；
- 新目标介入。

避免机械“你一下我一下”的无因果轮流反转。

---

## 8. Combat Condition State

Condition 只维护会真实影响后续动作的状态，不做 RPG 数值化。

可包括：

- 疲劳；
- 呼吸压力；
- 局部受伤 / 功能受限；
- 握持 / 兵器状态；
- 平衡受损；
- 防守结构被破坏；
- 暂时眩晕或恢复中的状态。

Condition 必须改变后续至少一项：

- 速度；
- 动作选择；
- 站姿 / 重心；
- 防守方式；
- Range；
- Advantage；
- 兵器使用；
- 表演 / 呼吸。

状态不应在下一 Beat 无理由重置。

---

## 9. Action–Reaction 基础因果合同

Core 对所有重要战斗交互要求：

> **Initiator Action → Defender Response → Contact / Outcome → State Change**

双方必须互相影响，不能各自完成独立招式列表。

这是状态因果最低合同；Action Phrase 的完整连续编排由 `choreography-playbook.md` 负责。

重要接触至少要让 Core 能判断：

- 是否真实发生 Contact；
- Contact 后 Range / Advantage / Condition / Position / Weapon State 是否变化；
- 下一动作是否从当前结果继续。

Combat Contact Solidity 的细化链由 Choreography 负责，但其结果必须回写 Core State。

---

## 10. 1vN 与 Target Handoff

多人战中，每个当前战术窗口保留一个清楚的主交战关系；其他对手必须处于可解释的次级状态，例如：

- 逼近；
- 被阻挡；
- 被击退；
- 倒地恢复；
- 等待切入；
- 重新包抄；
- 被环境隔开。

主目标切换必须经过：

> **Current Target → Target Handoff → Spatial Re-map → New Primary Target**

Handoff 可以由：

- 新威胁入画；
- 旧目标被击退；
- 转身；
- 环境遮挡；
- 兵器轨迹；
- 连续动作动线；
- 新对手主动切入。

切换后重新确认：

- 人物朝向；
- Range；
- Camera Axis；
- 其他角色位置 / 状态；
- 当前 Advantage 来源。

多人战不允许多个角色在同一时间窗口内无主次地独立表演复杂动作。

---

## 11. Weapon / Prop State

兵器与关键道具必须有连续状态：

- 当前持有人；
- 左 / 右手或双手关系（只有确实影响动作时维护）；
- 是否完整；
- 是否脱手；
- 落点；
- 是否被夺取；
- 当前与人物 / 环境的位置关系。

状态变化必须由可见事件产生：

> **Weapon State → Contact / Disarm / Drop / Transfer → New Weapon State**

禁止兵器变形、消失、凭空换手或没有过渡地重置。

具体兵器距离、线路与动作语言由 Weapon Profile / 专项 Playbook 决定。

---

## 12. Environment State

环境不是动作清单，而是 Spatial State 的一部分。

当角色使用环境后，必须更新相关状态，例如：

- 某障碍被移动；
- 某通路被打开 / 封住；
- 某人被压到边界；
- 桌椅位置变化；
- 可用空间缩小；
- 新高低差 / 支撑点产生；
- 环境物损坏后不再保持原状态。

Environment Action 是否值得发生由 Choreography 负责；一旦发生，Core 负责继承结果。

---

## 13. Beat State Contract

每个 Beat 结束时，内部至少继承当前相关的：

### Actor

- 位置；
- 朝向；
- 姿态 / 重心；
- 关键肢体状态；
- 兵器 / 道具；
- 当前目标。

### Combat

- Range；
- Advantage；
- Condition；
- 当前攻防趋势；
- 未结束 momentum；
- 重要 Contact Consequence。

### Camera

- 机位关系；
- Axis；
- 屏幕运动方向；
- 未完成镜头运动趋势。

### Environment

- 主要锚点；
- 障碍 / 通路状态；
- 可用空间；
- 被移动 / 损坏的关键物体。

### Continuity

- Visual Handoff；
- Target Handoff；
- 未完成动作趋势；
- Weapon / Prop State。

下一 Beat 必须从该状态继续，不重新解释一套初始状态。

---

## 14. Camera Continuity Contract

具体 Camera Choreography 与 Readability Budget 由 `choreography-playbook.md` + `camera-direction` Control 负责。

Core 只维护连续性最低合同：

- 屏幕方向；
- 人物朝向；
- Camera Axis；
- 关键环境锚点；
- Shot 结束时人物 / 镜头运动趋势。

允许跨轴，但必须通过连续绕位、中性重建、动作驱动换位或其他可理解方式完成。

Battle Beat 与 Shot 不强制 1:1。

---

## 15. Physical Continuity Validation

每个 Battle Beat / 重要 Action Phrase 结束后，检查：

- 人物是否瞬移；
- Range 是否无动作因果跳变；
- Advantage 是否无 Turning Event 翻转；
- Condition 是否无理由消失；
- Weapon State 是否无过渡改变；
- Environment State 是否重置；
- Target 是否无 Handoff 瞬间切换；
- Contact 结果是否在下一动作完全失效；
- Camera Axis / 屏幕方向是否无解释翻转。

Core Validation 只负责识别状态 / 连续性错误，不通过删减大量有效攻防来“修复”复杂动作。

如复杂度过载，交给 Choreography 的 Action Execution Budget / Camera Readability Budget 处理。

---

## 16. Controls 协调

按当前任务缺口选择，禁止全量加载。常用：

- `timeline-rhythm`：通用时间 / 节奏控制；
- `subject-motion`：通用主体运动、重心与动作表达；
- `camera-direction`：通用镜头语言；
- `spatial-blocking`：通用空间调度；
- `continuity-consistency`：通用连续性；
- `audio-visual-sync`：通用音画同步；
- `prompt-assembly`：Final Prompt 组装；
- `realism-quality`：写实表现需要时使用。

Combat 专属 Phrase、Exchange Depth、Contact Solidity、Signature Moment 等逻辑不能迁入这些全局 Controls。

---

## 17. Libraries 协调

Core 不直接要求“每次必须读取哪些库”。

Library 选择由 `choreography-playbook.md` 的 Two-stage On-demand Loading 根据 `Combat Planning Context` 决定。

现有专业知识可能包括：

- `combat-fighting-profiles`；
- `combat-martial-profiles`；
- `combat-weapon-profiles`；
- `combat-environment-patterns`；
- `combat-choreography-profiles`（V2）；
- `signature-moment-patterns`（V2）。

Core 只要求：Library 不能覆盖 State / Continuity 真源，也不能把职业画像当成状态或打法真源。

---

## 18. 专项 Playbook 协调

在 Core + Choreography 之后只选择一个主专项分支：

- Modern Combat；
- Cinematic Wuxia；
- 后续其他显著不同的 Combat Branch。

专项 Playbook 可以覆盖：

- 动作语言；
- 物理尺度；
- 默认 Range / Rhythm 倾向；
- Contact Modality 表现；
- Fighting / Martial / Weapon Profile 使用方式；
- Camera / Audio 专项表达。

专项 Playbook 不能：

- 重定义 Range / Advantage / Condition 的状态连续性规则；
- 引入固定 Battle Beat 动作数量；
- 把职业直接映射固定打法；
- 覆盖 Choreography 的 Coverage / Sufficiency / Contact Quality 合同。

---

## 19. Final Prompt 边界

Core 只向 Final Prompt 提供**必要的连续性事实**，例如：

- 谁位于哪里；
- 如何换位；
- Contact 后谁失衡 / 被迫后退 / 被控制；
- 兵器如何转移；
- 下一动作从哪个状态继续。

不要把：

- Range = Close；
- Advantage = A；
- Condition = B injured；
- State Contract = ...

等内部标签直接大量输出。

最终动作化表达遵循 `choreography-playbook.md` 与 `prompt-assembly`。

---

## 20. 核心失败边界

Core 优先防止：

- 人物瞬移 / 无理由换位；
- Range 无因果跳变；
- Advantage 无 Turning Event 翻转；
- Condition 无理由重置；
- Target 无 Handoff 切换；
- Weapon / Prop State 不连续；
- Environment State 重置；
- Camera Axis 无解释翻转；
- 接触结果不被后续继承。

动作不足、Choreography 平、Contact 实感差、Camera 抢动作等问题应由 V2 Choreography / Diagnostics 处理，不应全部归为状态连续性错误。

---

## 21. 创作自由原则

> **约束错误，不约束创作。**

Core 固定的是因果、状态继承、空间与物理底线，不固定：

- Battle Beat 数量；
- Action Phrase 数量；
- 攻防交换次数；
- 固定招式；
- 固定镜头；
- 固定环境互动。

尤其禁止重新引入“为了清晰默认写更少动作”的隐含策略。

复杂战斗的清晰度应通过 Choreography 的结构化组织、Camera Readability 与模型执行预算获得，而不是通过动作通缩获得。
