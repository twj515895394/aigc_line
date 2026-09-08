# Diagnostics Index

诊断层只在用户反馈生成失败、多个维度同时失效、参考素材冲突或无法从单一控制页定位原因时读取。正常生成流程不加载诊断层。

## 使用规则

- 每次只选择 `1` 份主诊断叶子；
- 先确认最明显、最能解释整体失败的主因；
- 次要问题通过相关 controls / task playbook 修复，不同时加载全部诊断；
- 诊断输出应包含：失败现象、主因、证据、最小修复、重写方向；
- 不以追加大量负向词代替结构修复；
- Combat 中先区分“打得不对”“打得太少”“接触发软”三类主因。

---

## 精确路由

### identity-drift

现象：脸部、发型、服装、年龄感或主体身份跨帧漂移；或开场只有职业 / 身份词，没有每人角色卡。

读取：`identity-drift/diagnostic.md`

### motion-discontinuity

现象：动作跳变、姿态重置、速度突变、重心不连续或相邻阶段无法衔接。

读取：`motion-discontinuity/diagnostic.md`

### camera-chaos

现象：运镜无目的、镜头漂浮、多个运动冲突、焦点丢失或炫技过载。

读取：`camera-chaos/diagnostic.md`

### spatial-teleportation

现象：人物、道具、背景、出入口或镜头位置在空间中瞬移；或场景只有地点名，没有前中后景、周边物件和光来源。

读取：`spatial-teleportation/diagnostic.md`

### anatomy-contact-failure

现象：肢体、手部、接触点、双人互动穿模、抓握位置或人体结构错误。

读取：`anatomy-contact-failure/diagnostic.md`

当 Contact 点结构正确但受力 / 压力 / 兵器线路 / 后果发软时，不使用本页，改用 `combat-contact-solidity-failure`。

### physics-and-weightlessness

现象：人物、服装、头发、物体、环境或镜头普遍缺乏重量、惯性和反馈。

读取：`physics-and-weightlessness/diagnostic.md`

如果整体物理基本成立，只是 Combat Contact 的模态 / 受力链失败，优先 `combat-contact-solidity-failure`。

### lip-sync-and-dialogue-failure

现象：口型、对白长度、呼吸、停顿、情绪和说话人不一致。

读取：`lip-sync-and-dialogue-failure/diagnostic.md`

### audio-visual-mismatch

现象：声音节点与视觉事件错位，BGM、环境声、拟音或声音空间不匹配；或没写 BGM 决定，整条声音空白。

读取：`audio-visual-mismatch/diagnostic.md`

### prompt-overload-and-conflict

现象：指定时长里独立主事件过多，或互斥主目标互相竞争。同一镜头把画面、动作、光色、镜头写细不算本诊断。

读取：`prompt-overload-and-conflict/diagnostic.md`

### reference-role-conflict

现象：多图、多视频或音频在同一维度冲突，或素材职责没有绑定。

读取：`reference-role-conflict/diagnostic.md`

---

## Combat 专项 Diagnostics

### combat-state-continuity-failure

现象：动作本身看似连续，但 Advantage、Condition、Target、Weapon State 或 Beat End / Start State 前后矛盾。

读取：`combat-state-continuity-failure/diagnostic.md`

主问题：**打得不对 / 接不上。**

只在现有 motion / spatial / anatomy / physics / camera / audio 诊断无法解释“Combat 状态链整体断裂”时使用。

### combat-choreography-underfill

现象：状态和连续性大体成立，但真正 Active Combat 太少；Coverage 未兑现；高手 / Mixed / 高速对决只有两三次有效攻防；大量时间被对峙、reset pose、静态抓控或提前 Ending 占用。

读取：`combat-choreography-underfill/diagnostic.md`

主问题：**打得太少 / 不够丰富。**

该页检查 Coverage、Active Exchange Budget、Action Phrase、Exchange Depth 和无价值 Downtime，不用固定动作数量作为判定标准。

### combat-contact-solidity-failure

现象：动作数量足够、空间大体成立，但拳脚 / 抓控 / 摔投 / 兵器 / 环境接触缺乏 Commitment → Transfer → Reaction → Consequence，或使用错误 Contact Modality。

读取：`combat-contact-solidity-failure/diagnostic.md`

主问题：**打到了，但打不实。**

该页不处理手指 / 肢体穿模，也不把 Camera Shake、Boom 或 Slow-mo 当成真实 Contact 修复。

---

## Combat 三分路由

```text
战斗效果差
→ 先问：主要失败是什么？

状态 / 空间 / Target / Weapon 前后无法成立
→ combat-state-continuity-failure

真正交战时间太少、交换太浅、长时间不打
→ combat-choreography-underfill

接触发生了，但受力 / 压力 / 兵器 / 材质后果不可信
→ combat-contact-solidity-failure
```

若主因更基础：

- 人体接触穿模 → anatomy-contact-failure；
- 整体运动漂浮 → physics-and-weightlessness；
- Camera 本身不可读 → camera-chaos；
- Prompt 多维冲突 → prompt-overload-and-conflict。

---

## 诊断流程

```text
确认用户描述的失败现象
→ 选择一个主诊断叶子
→ 定位主因和次因
→ 检查对应 task、input 和 controls
→ 只修改最关键的结构变量
→ 必要时重新进行模型适配
→ 输出可直接使用的修订 Prompt
```

## 常见主因选择

- 角色像换人：优先 identity-drift；
- 开场没有角色卡、只剩身份词：优先 identity-drift；
- 动作断裂但身份稳定：优先 motion-discontinuity；
- 镜头乱导致主体不可读：优先 camera-chaos；
- 人和道具位置跳变：优先 spatial-teleportation；
- 场景只有地点名、没有周边物件或光来源：优先 spatial-teleportation；
- 接触穿模或手部错误：优先 anatomy-contact-failure；
- 所有运动普遍漂浮无重量：优先 physics-and-weightlessness；
- 台词和嘴部错误：优先 lip-sync-and-dialogue-failure；
- 卡点或声音错位：优先 audio-visual-mismatch；
- 没写 BGM 决定或声音层空白：优先 audio-visual-mismatch；
- Prompt 本身互相矛盾：优先 prompt-overload-and-conflict；
- 多素材混合错误：优先 reference-role-conflict；
- Combat Advantage / Condition / Target / Weapon / Beat State 前后无法同时成立：优先 combat-state-continuity-failure；
- Combat Coverage / Exchange Richness 明显不足：优先 combat-choreography-underfill；
- Combat Contact 有动作但无可信受力 / 压力 / 兵器后果：优先 combat-contact-solidity-failure。

## 输出边界

- 诊断页不重新复制完整资料库；
- 术语 / 专业知识从 libraries 获取；
- 通用判断和协调规则从 controls 获取；
- Combat Choreography 问题回到 `action-combat-video/choreography-playbook.md` 修复；
- 模型语法从 models 获取；
- 输出仍遵循当前 quick / interactive contract；
- 每次只选一个主 Diagnostic，不把三类 Combat Diagnostic 同时全量加载。
