# Combat Martial Profiles Library

本库提供武术 / 武侠空手 **Technique / Execution Knowledge**，不定义 Combat 工作流、Coverage、Action Phrase、Character Identity 或固定套路。

> **Martial Profile 是专业动作语言，不是角色身份。**

每个 Profile 只提供距离、重心、发力、攻防节奏、动作倾向、Contact 表现和镜头观察重点。Character Identity 仍由当前 Combat Sequence 动态推导。

---

## Wing Chun / 咏春倾向

- 典型距离：近距离；
- 重心：稳定、中心线控制明显；
- 发力：短桥、短劲、连续压迫；
- 进攻倾向：直线短打、连续手法、贴身压迫；
- 防守倾向：格挡 / 化解后快速进入反击；
- Tactical 倾向：适合短窗口 Counter-to-Counter；
- Contact Solidity：短距离接触强调手臂线路、身体结构、Guard / Position 改变，不靠大幅飞退；
- 空间移动：小步推进、角度微调；
- 镜头重点：双手攻防关系、中心线和连续反应。

## Baji / 八极倾向

- 典型距离：中近距离到贴身爆发；
- 重心：扎实、整体性强；
- 发力：脚、胯、肩背整体爆发；
- 进攻倾向：短距离突进、靠打、肘肩等强冲击动作语言；
- 防守倾向：硬接与快速抢位并存；
- Contact Solidity：更适合 Solid / Heavy Payoff，但仍需发力、接触、失衡 / 位移和恢复链；
- 空间移动：短步强进、撞开空间；
- 镜头重点：整体发力、重心冲撞和环境受力反馈。

## Tai Chi Borrowing Force / 太极借力倾向

- 典型距离：接触距离到近距离；
- 重心：稳定、转换细腻；
- 发力：引化、转移、借对方 momentum；
- 进攻倾向：不直接硬碰，利用来力完成偏转、失衡、推离或反击；
- 防守倾向：接触后改变方向和重心；
- Tactical 倾向：适合 Momentum Redirection、Bait、Counter；
- Contact Solidity：质量来自压力 / 动量方向被改变和对方平衡后果，不要求重型撞击；
- 空间移动：圆转、换位、侧移；
- 镜头重点：来力方向、接触点、重心转移和 Turning Event。

## Changquan / 长拳倾向

- 典型距离：中远距离；
- 重心：开合较大，伸展明显；
- 发力：长线条、步法与躯干协同；
- 进攻倾向：较长距离拳腿、舒展组合、明显起落；
- 防守倾向：移动、架挡、拉开空间；
- Contact Solidity：Contact 不宜被近距重拳模板覆盖，重点是线路、全身动作路径与落点后的重心恢复；
- 空间移动：跨度更大；
- 镜头重点：全身线条、动作路径和空间位移。

## Nanquan / 南拳倾向

- 典型距离：中近距离；
- 重心：稳、低、强支撑；
- 发力：短促、刚劲、躯干与下盘稳定；
- 进攻倾向：紧凑拳法、桥手、短距离爆发；
- 防守倾向：扎实格挡和抢位；
- Contact Solidity：强调下盘支撑、短劲、Guard / Body Reaction 与近距空间后果；
- 空间移动：小范围强控制；
- 镜头重点：下盘稳定、短劲、身体反馈。

---

## 电影武侠通用身法

这些不是独立流派，只是可选动作语言：

- 短距离腾跃；
- 踏墙 / 借柱换位；
- 低位滑步；
- 借桌案、栏杆或高低差改变路线；
- 短暂滞空用于展示关键转折；
- 落地后立即继承前一动作 momentum。

身法必须改变 Position / Range / Angle / Advantage / Height / Attack Line 中至少一项。

默认电影武侠尺度下必须有：

> **起点 → 发力 / 借力 → 空间路径 → 目标 / 作用 → 落地状态**

禁止无原因悬浮或长距离飞行。

---

## 与 Choreography 的关系

本库不决定：

- Active Combat Coverage；
- Rhythm；
- Exchange Depth；
- Action Phrase 数量；
- Signature Moment；
- Camera Readability Budget。

`choreography-playbook.md` 先确定 Character Identity 与当前动作导演需求，再按需选择本库中的主 / 辅 Profile。

同一 Martial Profile 可以被不同角色以完全不同的：

- 压迫 / 反制倾向；
- Rhythm；
- Range 使用；
- Environment 使用；
- Tactical Interaction；

来表现。

---

## 使用边界

- 不要求复刻真实门派完整套路；
- 不把门派 / 身份名作为空洞质量词；
- 不把门派名直接等同 Character Identity；
- 用户明确动作设计优先；
- 可用主 Profile + 辅助 Profile，但切换需要 Range / Tactical / Turning Event 触发；
- 兵器动作读取 `combat-weapon-profiles`，不要在本库复制兵器正文；
- 武侠 Contact Solidity 按具体模态处理，不机械套现代重拳反馈。
