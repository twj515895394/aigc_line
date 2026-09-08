# Combat Choreography Underfill Diagnostic

## 1. 何时使用

当 Combat Prompt / 成片的状态与连续性大体成立，但观看结果仍然表现为“没真正打起来”“一招一停”“原地上半身互打”“镜头不跟”“文字说高速但实际很慢”时使用本页。

本页把这类问题统一归入 **Combat Under-realization / 战斗兑现不足**，不为每一种现象建立独立大型 Diagnostic。

如果主问题是人物瞬移、Advantage / Condition / Weapon / Target State 矛盾，优先 `combat-state-continuity-failure`；如果动作数量足够但接触发软，优先 `combat-contact-solidity-failure`。

---

## 2. 核心判断

不要只检查“Prompt 有没有写动作”。同时检查：

```text
Coverage
+ Exchange Depth
+ Kinetic Scope
+ Temporal Packing
+ Motion Handoff
+ Camera Mobility
+ Visible Advantage / Initiative
+ Intensity Variation
```

这些是观察维度，不要求逐项输出给用户。

---

## 3. 高频 Failure Signatures

### A. Combat Coverage Underfill

典型：15 秒只打 2–3 秒；大量对视、重新起势、静态控制、提前 Ending。

修复：减少无价值 Downtime，增加真正连续 Action Phrase。

### B. Upper-body Combat Lock / Kinetic Underfill

典型：大量前臂、抓腕、肩部控制；脚步、膝髋、躯干、重心、Position / Range / Axis 长时间不变；环境把双方锁在一个点。

修复：根据当前 Fighting / Martial / Weapon 语言增加全身协同、换角、Range / Position / Axis 变化和 Contact-driven Displacement；不使用固定动作配额。

### C. Temporal Combat Stretch / Action Underpacking

典型：Prompt 写“高速”，但 3–4 秒只描述一个抓、推、转身或撞击；模型慢慢演完一个宏事件。

修复：把 Active Exchange 写成连续因果动作流，让前一动作的后果立即启动下一动作。

### D. Action Segmentation / Excessive Neutral Reset

典型：每 1–2 秒一个独立动作；挡完收手、站稳、重新起架，再做下一招。

修复：强化 Contact / Reaction / Momentum / Footwork / Body Axis / Range / Position 的 Motion Handoff；High Coverage 高手战中 Neutral Reset 应稀缺。

### E. Timeline-induced Action Segmentation

典型：`0–1.5 / 1.5–4.5 / 4.5–7.5...` 每个时间盒内部有动作，但块与块之间自动 Reset。

修复：优先改为 Continuous Action Spine + Soft Time Anchors；严格时间块仅在模型 / 同步 / 多镜头确有需要时使用，并明确跨块 Handoff。

### F. Camera Mobility Underfill

典型：人物明明换位、压进、侧切、改变 Range，Camera 却长期近似 fixed；“稳定”被误实现成“不动”。

修复：降低无必要 Camera Complexity，但保留与 Kinetic Scope 匹配的简单连续 tracking / dolly / small arc / reframe。

> **Stable ≠ Static。**

### G. Turn-taking Combat / Initiative Segmentation

典型：A 连续打一段 → B 连续打一段；看似双方都有动作，实质仍在轮流表演。

修复：让 Initiative 在 Counter / Re-counter 执行过程中通过 Interception、Forced Response、Line / Range / Axis Control、Contact Handoff 等发生转移。

### H. Invisible Advantage / Nominal Reversal

典型：文字写“男方占优 / 女方逆转”，但谁在逼迫、谁被迫防守、谁控制 Range / Route / Position 并没有改变。

修复：把 Advantage 转成可见控制关系，并让 Reversal 后的 Phrase 继承新状态。

### I. Homogeneous Initiative Style

典型：双方 Character Identity 虽然描述不同，但抢主动权都只靠同一种“格挡后反击”。

修复：让 Initiative Acquisition / Retention 服从 Character Identity，例如侧切截断、封线压迫、距离控制、接触控制、节奏破坏等按当前角色动态选择。

### J. Flat Combat Intensity

典型：全程同速、同密度、同重量、同压力；Signature Moment 只是“又一个动作”。

修复：在 Continuous Spine 内组织 Exchange Frequency、Contact Weight、Advantage Pressure、Kinetic Scope、Environment、Camera / Audio Accent 的动态变化；局部降速不等于停止战斗。

---

## 4. 检查顺序

### Step 1｜先看 Coverage

确认 Active Exchange 是否占据目标主体时间；纯站立、无进展控制、重复观察、提前 Ending 不算。

### Step 2｜再看 Kinetic Scope

即使每秒都有人动，也要检查是否只是手臂层级运动。观察脚步、重心、身体轴线、Position / Range / Route 是否真正变化。

### Step 3｜再看 Temporal Continuity

检查：

- 较长窗口是否只承载一个宏动作；
- 动作之间是否频繁 Reset；
- 时间标签是否把连续 Combat 切成独立事件块。

### Step 4｜再看 Advantage / Initiative / Character

检查双方是否只是轮流出招；优势是否真正可见；角色差异是否进入“如何抢主动权”。

### Step 5｜最后看 Camera / Intensity / Contact

Camera 是否跟随 fight-space；强度是否有层次；Contact 是否有可信 Transfer / Reaction / Consequence。

---

## 5. 统一修复顺序

1. 删除 / 压缩无价值 Downtime 与提前 Ending；
2. 恢复 Whole-body / Spatial / Range / Axis 运动；
3. 把孤立动作改成连续因果 Phrase；
4. 建立 Motion Handoff，减少 Neutral Reset；
5. 高密度 Combat 改用 Continuous Action Spine + Soft Time Anchors；
6. 让 Advantage / Initiative 通过可见动作控制关系表现；
7. 让 Camera Mobility 跟随 Kinetic Scope，而不是增加无意义切镜；
8. 组织 Intensity Variation；
9. 删除 Final Prompt 中 Meta / 重复 Negative，把语义预算还给动作；
10. 如果仍过载，再降低单 Phrase 同时复杂度，而不是把整场动作通缩。

> **修复 Underfill 的目标是让战斗真正连续发生，不是增加动作名词数量。**

---

## 6. 重写示意

### 失败结构

```text
男方出拳
→ 女方格挡
→ 双方重新站稳
→ 女方反击
→ 男方抓腕
→ 两人停在桌边控制
→ 女方转身反制
```

### 更合理的连续结构

```text
男方压入首击；女方偏开线路的同时已向外侧切步，男方沿她的新路线立刻封入；她不重新站稳，借新角度短击迫使他收肘，他顺着接触用身体压力继续压进；她后脚刚落地便沿桌角侧切，他追着转身封线，转身造成的肩线偏移又成为她下一次进入窗口。双方始终在交换主动权，Position / Range / Axis 与 Camera Path 同步变化，中段出现一次明显压力翻转，最后才短促收束。
```

重点不是固定招式，而是连续状态继承。

---

## 7. 与其他 Diagnostics 的边界

- State / Target / Weapon / Position 真源矛盾：`combat-state-continuity-failure`；
- 肢体接触穿模：`anatomy-contact-failure`；
- 漂浮 / 无重量：`physics-and-weightlessness`；
- Contact 缺乏正确受力链：`combat-contact-solidity-failure`；
- Camera 自身混乱：`camera-chaos`；
- 多维要求互相矛盾：`prompt-overload-and-conflict`。

本页负责：**战斗时间、身体 / 空间运动、动作连续性、主动关系和镜头跟随等综合兑现不足。**

---

## 8. 完成标准

修订后应看到：

- Coverage 与观看目标一致；
- Whole-body / Spatial / Range / Axis 运动符合当前战斗形式；
- 动作与 Phrase 通过 Motion Handoff 连续衔接；
- 高密度 Combat 不再被硬时间块切碎；
- Advantage / Initiative 能从动作看出来；
- Character Identity 不只是标签；
- Camera 跟随 fight-space 但不过度炫技；
- Intensity 有层次；
- Final Prompt 明显由具体动作语言主导；
- 没有为了修复 Underfill 反而制造 State / Contact / Camera Chaos。
