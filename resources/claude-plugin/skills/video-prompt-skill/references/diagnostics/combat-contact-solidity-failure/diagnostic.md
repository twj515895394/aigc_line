# Combat Contact Solidity Failure Diagnostic

## 1. 何时使用

当 Combat 的动作数量、空间关系和大体连续性存在，但**接触看起来发软、假、没有材质 / 压力 / 战术后果**时使用本页。

典型现象：

- 拳脚看似命中，但身体没有任何受力传播；
- 被打者表情有反应，重心 / Guard / Position 却完全不变；
- Grapple 只是两人把手放在一起，没有压力方向、杠杆或逃脱代价；
- Takedown / Throw 没有先破坏平衡，人物像被动画直接放倒；
- 刀剑 / 兵器交击只发出声音和火花，线路 / 主动权没有变化；
- Weapon Clash 后兵器和身体立即回到原位置；
- 环境撞击只有 Camera Shake / 大音效，没有材质反作用和空间后果；
- 每一个 Contact 都用同一种“重击飞退”反馈；
- Contact 后下一拍完全忽略刚才结果。

如果主问题是肢体穿模、手部抓握错位，优先 `anatomy-contact-failure`；如果所有物体普遍漂浮、惯性异常，优先 `physics-and-weightlessness`。

---

## 2. 核心判断

通用 Contact Solidity 链：

```text
Commitment
→ Contact Event
→ Force / Energy / Pressure Transfer
→ Reaction Propagation
→ State Consequence
→ Recovery / Continuation
```

失败通常来自链条中至少一段缺失，或使用了错误 Contact Modality 的反馈方式。

---

## 3. 先判断 Contact Modality

### Strike

需要检查：

- 发力 / 身体驱动是否成立；
- Contact 点是否清楚；
- Guard、头部 / 躯干、呼吸、重心或脚步是否响应；
- 重要命中是否影响下一拍。

### Grapple / Control

需要检查：

- 是否持续连接；
- 压力方向 / 控制点是否明确；
- leverage / frame / grip 是否改变对方可用动作；
- 逃脱是否需要代价。

### Takedown / Throw

需要检查：

- 是否先发生 Balance Break；
- 进入角度 / 身体轨迹是否连续；
- 落地是否改变 Position / Range / Advantage；
- 是否存在合理 Recovery。

### Blunt Weapon

需要检查：

- 挥动弧线 / 惯性；
- Contact 负载；
- Guard / Weapon / Body 位移；
- Recovery / Recoil。

### Blade / Edge / Thrust

重点不是“重量”，而是：

- 威胁线路；
- Range；
- 躲避 / 偏转 / 格挡；
- Contact 后线路 / 身体 / 战术后果。

禁止把刀剑 Contact 全写成钝器重击。

### Weapon Clash / Parry

需要检查：

- 接触点与角度；
- deflection / bind / slide；
- 兵器和身体的响应；
- Initiative / Range 是否变化。

### Environment Impact

需要检查：

- 具体材质；
- 接触速度 / 方向；
- 反作用 / 吸收 / 支撑；
- Position / Condition / Environment State 后果。

---

## 4. 常见根因

### 4.1 只写“命中”，没写 Transfer

例如：

> A 一拳重重打中 B。

但没有发力、接触部位、Guard / 重心 / 脚步反馈。

### 4.2 只写表情反应

人物皱眉、痛叫，但身体与空间关系不改变。

### 4.3 Camera / Audio 替代物理

依赖：

- Camera Shake；
- slow motion；
- 巨大 Boom；
- motion blur；
- 火花；

来“证明”接触，而实际身体 / 兵器链没成立。

### 4.4 所有 Contact 同一个强度

Light Probe、Solid Counter、Heavy Payoff 全部写成大幅飞退，导致节奏与可信度下降。

### 4.5 Contact 后状态重置

刚刚失衡 / 被压 / 兵器偏转，下一动作又从完美中立姿态开始。

### 4.6 Modality 错配

例如：

- Grapple 用拳击式“震飞”；
- Blade 用钝器式撞击；
- Weapon Parry 只写金属声，没有线路变化；
- Environment Contact 不区分墙 / 软家具 / 台阶。

---

## 5. 检查步骤

### Step 1｜找最重要的 Contact Event

不要先逐帧修所有接触，优先检查：

- Phrase Payoff；
- Signature Moment；
- Turning Event；
- 影响 Advantage / Condition 的关键 Contact。

### Step 2｜补 Commitment

明确动作为什么能产生当前 Contact：

- 身体驱动；
- momentum；
- grip / pressure；
- weapon arc / line；
- environment approach。

### Step 3｜补 Transfer

描述力 / 压力 / 兵器线路怎样传递，而不是只写“碰到了”。

### Step 4｜补 Reaction Propagation

Reaction 从 Contact 点扩展到：

- Guard；
- torso；
- hips / balance；
- feet；
- weapon；
- environment support。

只写必要链条，不需要解剖学论文。

### Step 5｜补 Persistent Consequence

至少让后续一拍继承：

- Position；
- Range；
- Advantage；
- Condition；
- Weapon Line / State；
- Guard / Balance；
- 可用动作选项。

### Step 6｜最后才加 Camera / Audio Accent

Camera / Audio 只强化已经成立的 Contact。

---

## 6. Light / Solid / Heavy

内部可以用三档作为设计检查，不要求 Final Prompt 输出标签。

### Light

- Probe；
- parry；
- short intercept；
- establishing grip；
- quick block。

结果通常是线路 / timing / Guard 的小变化。

### Solid

- 清楚有效 Contact；
- 明显 Body / Weapon / Position 反馈；
- 能制造下一攻击机会。

### Heavy

- Phrase Payoff；
- 强制失衡；
- 明显状态变化；
- 重型 Environment / Throw / Blunt Impact。

Heavy 是稀缺强调，不是默认每一下。

---

## 7. 修复顺序

1. 先修 Contact Modality；
2. 补 Commitment；
3. 补 Transfer / Pressure Direction；
4. 补 Reaction；
5. 补 Persistent Consequence；
6. 让下一动作继承 Consequence；
7. 再按需补 Camera / Audio Accent；
8. 删除用来伪造重量的过量 Shake / Boom / Slow-mo。

如果模型执行压力过高，优先简化同一 Phrase 的次要动作 / Camera，而不是删除 Contact → Reaction → Consequence 主链。

---

## 8. 重写示例

### 失败

> A 连续重拳击中 B，镜头猛烈震动，伴随巨大的撞击声，B 痛苦后退。

问题：只有“重拳 + Shake + Boom + 后退”，缺少身体与空间因果。

### 修复

> A 用前脚压进距离，髋肩一起送出一记短直拳，拳面清楚撞上 B 抬起但尚未封紧的前臂与上胸交界；接触把 B 的上身推偏，后脚急忙向侧后方补一步才没有失去平衡，原本的防守中线因此打开。A 不等 B 完全站稳就继续压住这个空隙，B 被迫先重建 Guard 再反击。接触瞬间只有短促身体闷响和鞋底急擦地面的声音，镜头保持中景看清双方重心变化。

重量来自 Action → Contact → Reaction → Consequence，不来自特效。

---

## 9. 与其他 Diagnostics 的边界

- 手 / 肢体穿模、接触点错位：`anatomy-contact-failure`；
- 整体运动无惯性、漂浮：`physics-and-weightlessness`；
- Contact 数量本身太少 / Coverage 低：`combat-choreography-underfill`；
- Contact 后 Advantage / Condition / Weapon State 跨 Beat 矛盾：`combat-state-continuity-failure`；
- Camera Shake / 运镜本身失控：`camera-chaos`；
- Audio 与画面时间错位：`audio-visual-mismatch`。

本页只处理：**Contact 发生了，但物理 / 材质 / 战术实感链不成立或模态错配。**

---

## 10. 完成标准

修订后：

- 重要 Contact 有清楚 Commitment；
- Contact 点与模态匹配；
- Force / Pressure / Weapon Line Transfer 可理解；
- Reaction 从接触自然传播；
- Consequence 至少影响下一拍；
- Light / Solid / Heavy 有层级；
- Grapple / Blade / Weapon Clash / Environment 不再套同一种重击反馈；
- Camera / Audio 只是强化，而不是物理成立的唯一证据。
