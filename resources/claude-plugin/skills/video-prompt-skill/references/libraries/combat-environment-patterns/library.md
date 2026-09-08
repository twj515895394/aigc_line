# Combat Environment Patterns Library

本库提供“**环境在什么条件下可以怎样参与战斗**”的稳定专业知识，不规定 Battle Beat 顺序，也不承担 Environment Action Affordance 的动态导演决策。

`choreography-playbook.md` 先根据当前人物、Combat Intent、Range、Advantage、Character Identity 和场景判断 Affordance；只有确实需要环境专业知识时再读取本库。

核心原则：

> **环境互动必须改变攻击路线、移动路线、Position、Range、Advantage、Condition、Target、Phrase Payoff 或 Camera Handoff，而不是纯装饰。**

不要建立“桌子一定要踢 / 椅子一定要扔”的固定动作映射。

---

## 狭窄走廊 / Corridor

### Affordance

- 限制横向移动；
- 强化前后距离关系；
- 让攻击 / 追击线路更可预测；
- 让门框 / 墙面成为压力边界；
- 帮助 1vN 制造单线接触；
- 通过击退、转身、出入口完成 Target Handoff。

### 可产生的状态变化

- Range 被迫缩短 / 拉长；
- Advantage 来自空间压迫；
- Position 反转；
- Target Handoff；
- Camera Axis 更容易沿走廊建立。

### 风险

人物无原因左右换位、多人堵在同一点、镜头穿墙、走廊突然变宽。

---

## 墙面 / Doorframe

### Affordance

- 阻止后撤；
- 限制身体 / 兵器动作幅度；
- 提供短时支点；
- 迫使攻击线路更固定；
- 改变 clinch / grapple / weapon positioning。

### 可产生的状态变化

- Pressure Advantage；
- Balance / Condition；
- Position Swap；
- Range Collapse；
- Escape Window。

### 风险

人物穿墙、撞击没有反作用、墙面位置跨 Beat 漂移、墙只作为“撞一下”的装饰。

---

## 桌椅 / Furniture

### Affordance

- 改变绕位路线；
- 限制直线追击；
- 形成身体支撑 / 转轴；
- 迫使攻击改线；
- 跨越 / 绕行改变 Range；
- 短暂制造视觉 / Target Handoff。

### 可产生的状态变化

- Attack Line；
- Position；
- Range；
- Advantage；
- Balance；
- Environment State。

### 风险

桌椅凭空移动、不断出现新物件、随机破坏只为视觉噪音、使用后下一 Beat 环境又恢复原位。

---

## 柱体 / Pillar

### Affordance

- 切断多人同时接触；
- 强迫绕位；
- 改变兵器线路；
- 提供 Camera Axis 重建锚点；
- 完成 Target Handoff。

### 风险

绕柱后人物方向不一致、柱体位置变化、角色无因果穿过遮挡。

---

## 楼梯 / Steps

### Affordance

- 高低位改变攻击角度；
- 上下移动影响速度和重心；
- 限制步法与摔控方向；
- 跌落 / 后退形成 Condition 或 Advantage 变化；
- Camera 可利用层级重建空间。

### 风险

台阶数量 / 高度关系跳变、无过渡瞬移到另一层、人物在台阶上使用与空间不匹配的大幅脚步。

---

## 栏杆 / Rail

### Affordance

- 阻止继续后撤；
- 提供短暂支点；
- 形成边缘风险；
- 改变 Grapple / Throw / Wuxia 身法路线；
- 可作为 Position / Phrase Payoff 边界。

### 风险

无支撑长时间悬空、栏杆高度 / 位置不稳定、纯为惊险而反复靠边。

---

## 车辆 / Vehicle

### Affordance

- 车身成为空间锚点和遮挡；
- 限制移动路线；
- 绕车完成 Target Handoff；
- 车门 / 引擎盖 / 车侧可改变支撑与碰撞材质；
- 迫使追击者改变攻击线。

### 风险

车辆尺寸 / 位置漂移、人物穿车体、无因果切到车另一侧、所有碰撞都写成夸张破坏。

---

## 竹林 / Trees

### Affordance

- 树干 / 竹子作为绕位锚点；
- 限制兵器挥扫线路；
- 通过遮挡 / 绕行完成 Position / Target 变化；
- 作为短暂借力 / 身法支点；
- 叶片 / 竹枝反馈空气与 Contact。

### 风险

把竹林变成无物理约束的长期飞行舞台、竹子不断随机爆裂、空间密度忽略兵器长度。

---

## 屋顶 / Roof

### Affordance

- 高低落差；
- 屋脊形成移动通道与边界；
- 短距离跃跨改变 Position；
- 坡度影响重心 / 脚步；
- 瓦片 / 落点提供 Material / Audio Feedback。

### 风险

无起跳 / 无落地、屋顶结构不断变化、无支撑远距离飞行、坡度完全不影响动作。

---

## 高低差 / Elevated Terrain

### Affordance

- 高位 / 低位攻防差；
- 改变 Weapon / Strike Angle；
- 跳下、跨上、后退跌落形成 Turning Event；
- 影响 Range 与追击速度；
- Camera 通过高度变化自然重建空间。

### 风险

高度不连续、人物瞬间出现在新层级、落地后无重心反馈。

---

## Environment Contact Solidity

环境 Contact 必须匹配具体材质与动作：

```text
Approach / Momentum
→ Material Contact
→ Body / Weapon Reaction
→ Displacement / Rebound / Support
→ Position / Condition / Environment State Consequence
```

不同材质不应统一成一个“大撞击音效 + Camera Shake”。

例如：

- 墙：限制 / 反作用明显；
- 桌边：局部支撑 / 撞击 / 绕位；
- 软家具：吸收更多冲击；
- 栏杆：边界与支点更重要；
- 台阶：高低差与落点更重要。

---

## 与 Signature Moment Pattern 的关系

环境知识可以支持：

- `constrained-space-reversal`；
- `environment-assisted-counter`；
- `momentum-redirection`；
- 其他由 Planning Context 命中的 Pattern。

但本库不负责决定某场战斗必须出现哪一个 Signature Moment。

---

## 使用方法

1. 先从用户已有场景中识别 Environment Affordance；
2. 如果常识已足以编排，不必读取本库；
3. 只有环境空间关系复杂或需要专业模式时才占用 Library Detail Slot；
4. 从当前已有环境中选择最自然的 1 个主要作用，必要时再有次级作用；
5. 环境动作发生后，把结果回写 Core 的 Environment / Position / Range / Advantage / Condition / Target State。

> **Environment Action Affordance 是动态判断；本 Library 只是可复用知识，不是物体 → 固定动作字典。**
