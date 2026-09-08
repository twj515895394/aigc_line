# Combat Weapon Profiles Library

本库提供刀、剑、枪、棍等兵器的 **Technique / Execution Knowledge**。它不负责 Combat 状态机、Coverage、Action Phrase、Character Identity 或固定招式套路。

所有 Weapon Profile 都必须服从：

- 持握连续；
- Range 连续；
- 轨迹 / 威胁线路可读；
- Contact Modality 匹配；
- 接触产生兵器 / 身体 / Initiative 后果；
- Beat 结束 Weapon State 可继承。

> **Weapon Profile 是专业知识，不是 Signature Moment，也不是固定动作答案。**

---

## 刀 / Saber

- 典型距离：中距离到近距离；
- 动作倾向：劈、斩、扫、压、格挡，轨迹更直接、有明显身体参与；
- 发力：肩背、腰胯和步法共同参与；
- 防守：格挡、压制、偏开对方兵器；
- 节奏：方向感明确，适合较强 Attack / Counter Payoff；
- Contact Modality：Blade / Weapon Clash；
- Solidity 重点：接触角度、刀身 / 手臂 / 身体反馈、线路与主动权变化，不把所有刀剑碰撞写成钝器重击；
- 镜头重点：刀路弧线、全身重心、接触点和接触后落位。

## 剑 / Jian

- 典型距离：中距离；
- 动作倾向：刺、点、挑、削、格、引、偏转；
- 发力：更强调腕、臂、身法与精确轨迹协同；
- 防守：偏转、引开、借角度化解；
- 节奏：更轻快、精确，适合高 Exchange Depth 拆招；
- Contact Modality：Blade / Weapon Clash / Parry；
- Solidity 重点：危险线路、偏转角度、剑尖方向和下一拍窗口，不追求每次接触都“大力震开”；
- 镜头重点：剑尖方向、交锋角度、短暂反击窗口和身法换位。

## 枪 / Spear

- 典型距离：长兵器距离；
- 优势：长度、直线压迫、区域控制；
- 动作倾向：刺、拦、拿、扫、挑、回枪；
- 发力：双手、腰胯、步法和枪身整体协同；
- 防守：枪杆格、压、拨、封线；
- 节奏：通过距离控制迫使对方绕行、偏转或冒险贴身；
- Contact Modality：Thrust / Weapon Clash / Staff-like Blunt Contact（按具体部位）；
- Solidity 重点：枪尖 / 枪杆线路、长杆惯性、回收空间和贴身后 Initiative 变化；
- 镜头重点：枪尖路径、枪杆方向、双方距离与贴身换距 Turning Event。

## 棍 / Staff

- 典型距离：中长距离；
- 动作倾向：扫、劈、点、拨、架、撑；
- 发力：双手杠杆、腰胯旋转、步法配合；
- 防守：大范围格挡和空间封锁；
- 节奏：适合连续变向和环境空间互动；
- Contact Modality：Blunt Weapon / Weapon Clash；
- Solidity 重点：棍身惯性、接触负载、双手 / 身体反应和线路改变；
- 镜头重点：棍身整体轨迹、双手位置和扫击影响范围。

---

## 不同兵器对抗

不同兵器重点不是“谁数值更高”，而是：

- Range；
- 威胁线路；
- 回收空间；
- 身体与兵器惯性；
- Contact 后 Initiative；
- 贴身 / 脱离所需动作。

通用关系：

- 长兵器通常先拥有距离优势；
- 短兵器需要通过偏转、绕位、环境遮挡、时机或身法压缩安全线路；
- 一旦进入近距离，长兵器可能需要回收、横架、转杆、改握或重新拉开；
- 缴械 / 掉落 / 被夺必须成为明确 Turning Event；
- 兵器改变后，Range 与动作语言必须同步改变。

这类关系特别适合 `weapon-distance-transition` Signature Pattern，但是否使用 Pattern 由 Choreography 决定。

---

## Contact Modality

### Blade / Edge / Thrust

重点：

- 危险线路；
- Range；
- 躲避 / 偏转 / 格挡；
- 接触后的线路与身体后果。

Blade 质量不等于“更重”。不要使用统一大幅飞退表现刀剑 Contact。

### Weapon Clash / Parry

重点：

- 接触点；
- 接触角度；
- deflection / bind / slide；
- 手臂 / 身体随兵器反馈；
- Initiative 改变。

### Blunt Weapon

重点：

- 挥动弧线；
- 惯性；
- 接触负载；
- 兵器 / Guard / 身体位移；
- Recovery。

---

## Weapon Distance Transition

兵器距离变化必须通过动作完成：

```text
Current Weapon Range
→ Line Disruption / Step / Parry / Cover / Entry
→ New Range
→ New Weapon Use
```

示例机制：

- 长枪通过长度压制；
- 短兵器偏转枪头并贴身；
- 枪手改握 / 横架防守；
- 退步或转向重新建立枪尖线路。

不固定具体招式，但必须让观众看懂“为什么距离优势改变了”。

---

## Weapon State Continuity

每个关键 Beat 内部至少跟踪当前真正有用的：

- 谁持有兵器；
- 左 / 右 / 双手持握（只有影响动作时）；
- 兵器大致朝向；
- 是否正在接触、格挡、被压制；
- 是否发生换手、脱手、掉落、拾取；
- 结束时兵器落位。

只有发生明确动作时才能改变这些状态。

---

## 与 Choreography 的关系

本库不决定：

- Coverage；
- Rhythm；
- Exchange Depth；
- Character Identity；
- Signature Moment；
- Camera Readability；
- Action Execution Budget。

Choreography 先决定当前角色怎么打、当前 Phrase 的目的与执行预算，再调用本库填充专业兵器语言。

---

## 使用边界

- 不列固定套路和招式百科；
- 不把兵器名当作视觉 Style 标签；
- 不默认加入火花、能量、剑气等视觉特效；
- 用户已有明确兵器动作时优先保留，只补 Range、轨迹、Contact 与连续性；
- 兵器与空手切换必须有明确过渡动作；
- 不用“重击感”统一解释所有兵器接触；
- Weapon Profile 不占用 Character Identity 的动态推导职责。
