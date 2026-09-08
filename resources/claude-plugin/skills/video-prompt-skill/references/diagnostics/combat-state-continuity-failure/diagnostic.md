# Combat State Continuity Failure Diagnostic

## 1. 何时使用

只有当动作本身看似连续，但**战斗内部状态前后矛盾**，且现有 motion / spatial / anatomy / physics diagnostics 无法完整解释时，读取本页。

典型现象：

- Advantage 无 Turning Event 突然翻转；
- Condition 在下一 Beat 无理由恢复或消失；
- 1vN 主目标无 Target Handoff 突然切换；
- Weapon State 前后矛盾，例如无动作换手、消失、重新出现；
- Beat N 的结束姿态 / 方向 / momentum 没有成为 Beat N+1 的起点；
- Range / Target / Advantage / Condition 分别看似合理，但组合起来无法成立。

如果主问题只是人物瞬移、动作断裂、接触穿模、无重量或镜头混乱，应优先使用现有对应诊断，而不是本页。

## 2. 常见根因

- 每个 Beat 被当成独立小片段重新生成；
- 没有维护 Beat State Contract；
- 为制造高潮强行翻转主导权；
- Condition 被描述成装饰性文字，没有改变后续动作；
- 1vN 切换目标时没有空间重新建图；
- 武器状态只写在单个动作里，没有继承；
- Prompt 过载导致状态因果被大量镜头 / 风格词覆盖。

## 3. 检查顺序

### Step 1｜找断点

定位最早出现矛盾的两个相邻 Beat，不先重写整场战斗。

### Step 2｜重建上一 Beat End State

只记录真正影响下一 Beat 的：

```text
Actor：位置 / 朝向 / 姿态 / 武器 / 当前目标
Combat：Range / Advantage / Condition / momentum
Camera：Axis / 屏幕方向 / 镜头运动趋势
Environment：当前锚点 / 障碍关系
Continuity：Visual / Target Handoff
```

### Step 3｜检查下一 Beat 是否继承

逐项判断：

- 位置是否可达；
- 距离变化是否有动作；
- 优势变化是否有 Turning Event；
- 受伤 / 疲劳是否继续影响动作；
- 目标切换是否有 Handoff；
- 武器状态是否有合法改变动作；
- 镜头轴线和屏幕方向是否可解释。

### Step 4｜找最小缺失事件

优先补一个最小因果事件，而不是添加更多限制词，例如：

- 一个后撤 / 推开动作解释 Range；
- 一次格挡 / 失衡解释 Advantage；
- 一个转身 / 新威胁入画解释 Target；
- 一个明确换手 / 掉落 / 拾取解释 Weapon；
- 一个喘息 / 保护伤肢动作延续 Condition。

## 4. 最小修复原则

> **修状态转换，不重写全部动作。**

优先级：

1. Actor / Spatial continuity；
2. Target 与 Range；
3. Advantage / Turning Event；
4. Condition；
5. Weapon State；
6. Camera / Audio 衔接。

如果矛盾来自 Prompt 信息过载，减少低优先级动作、镜头或风格修饰。

## 5. 重写骨架

```text
上一 Beat 结束：A 位于___，面向___，与 B 保持___距离；A/B 当前主导关系为___，原因是___；A/B 当前受伤 / 疲劳为___；兵器位于___；镜头从___方向结束。

过渡事件：通过___动作 / Turning Event / Target Handoff，使___发生变化。

下一 Beat 开始：继承上述位置、朝向、Range、Condition 与 Weapon State，从___动作继续，而不是重新建立一套初始状态。
```

最终给用户时应改写成自然的动作 / 镜头 / 声音描述，不必暴露这些字段标签。

## 6. 与其他 Diagnostics 的边界

- 人物 / 道具空间瞬移：`spatial-teleportation`；
- 姿态、速度或动作本身断裂：`motion-discontinuity`；
- 肢体 / 双人接触错误：`anatomy-contact-failure`；
- 无重量 / 无惯性：`physics-and-weightlessness`；
- 镜头目的和运动混乱：`camera-chaos`；
- 音效与视觉事件错位：`audio-visual-mismatch`；
- Prompt 本身过载冲突：`prompt-overload-and-conflict`。

只有“Combat 状态链整体前后不成立”时才使用本页。

## 7. 完成标准

修订后应满足：

- 相邻 Beat 的 End / Start State 可直接衔接；
- Range 变化有动作因果；
- Advantage 变化有 Turning Event；
- Condition 持续影响后续行为；
- Target 切换有 Handoff；
- Weapon State 变化有动作解释；
- Camera 关系不会让已修复的空间状态再次失真；
- 最终 Prompt 仍然自然、可复制，不变成状态表。
