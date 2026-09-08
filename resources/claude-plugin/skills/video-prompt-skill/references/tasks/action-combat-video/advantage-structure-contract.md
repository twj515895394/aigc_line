# Action Combat Advantage Structure Contract

## 1. 职责

本文件是 Action Combat 的 **Advantage / Counterplay / Ending 运行期正文真源**。

它只解决：

- 最终谁占优 / 是否分胜负；
- 劣势方怎么还手；
- 主动权在整段战斗中怎么流动；
- Ending 是否需要单独询问；
- 这些创作决策怎样映射到现有 Core Advantage / Turning Event、Choreography Initiative 与 Final Prompt。

它不替代：

- `core-playbook.md` 的 Advantage State / Turning Event / Continuity；
- `choreography-playbook.md` 的 Action Phrase / Coverage / Initiative / Kinetic / Contact；
- `prompt-assembly/control.md` 的最终序列化；
- Combat System / System Refinement / Combat Expression；
- Camera / Audio / Model Adapter。

本文件是**扩展合同**，把用户级 Advantage 语义映射到现有状态机，不新建第二套 Battle State。

核心原则：

> **Advantage ≠ Attack Share。**  
> **Outcome ≠ Advantage Trajectory。**  
> **Disadvantaged ≠ Passive。**

---

## 2. Advantage Structure

正式 Planning 结构：

```text
Advantage Structure
├─ Outcome / Advantage
│  → 最终谁占优、是否分胜负
├─ Counterplay Shape
│  → 劣势方如何还手 / 被压制 / 丢失主动
└─ Advantage Trajectory
   → 整段战斗中主动权如何流动
```

三者属于同一个 Primary Planning Node。

不要机械拆成三个连续问题。

---

## 3. Counterplay Shape 基础模型

当一方总体占优时，至少区分三类：

### A. Sustained Suppression / 持续压制型

```text
优势方持续控制 Range / Route / Initiative
→ 劣势方主要防守、闪避、退让
→ 真正反攻机会较少
```

只有用户明确想要“碾压 / 基本还不了手 / 全程压制”或上下文高度支持时，才优先使用。

### B. High Counterplay, Repeatedly Neutralized / 高频还手但持续被化解型

```text
优势方总体占优
→ 劣势方多次真实发动 Attack / Counter / Re-entry
→ 这些动作形成真实威胁或状态变化
→ 优势方不断截断、化解、躲开、借势反制
→ 整体优势仍属于优势方
```

这是没有其他强约束时的**推荐默认**，因为它能同时保留双方 Combat Identity 与整体优势关系。

### C. Back-and-forth Then Advantage / 拉锯后占优型

```text
双方都阶段性取得主动
→ Advantage 多次经过 Turning Event 转移
→ 最终一方在关键交换后占优
```

不要把 C 实现成机械“你一下我一下”。每次 Advantage Transfer 必须有动作因果。

---

## 4. Interactive Exposure Policy

Advantage Structure 是**高价值条件节点**，不是固定 Round 3 / Round 4。

### 4.1 直接继承

如果用户已经明确：

```text
Outcome
+ Counterplay Shape
+ 大致 Advantage Trajectory
```

直接继承，不再确认。

### 4.2 条件询问

如果用户只说：

- 谁赢；
- 谁占优；
- 势均力敌；
- 谁压制谁；

并且存在两个以上合理过程，且不同过程会显著改变成片，则把 **Advantage Structure** 作为当前唯一 Primary Planning Node。

问题应让用户一次理解：

> **谁总体占优 + 对方怎么还手 + 主动权大致怎么流动。**

推荐候选可按场景动态生成，例如：

```text
A. 女方持续压制，男方主要被迫防守，真正反攻很少
B. 女方总体占优，但男方频繁拳击反击 / 进入摔控，女方不断化解并反制（推荐）
C. 双方多次拉锯，男方中段短暂占优，女方最终重新夺回主动
```

候选必须与已确认 Combat System / Expression 相容，不提前写死具体 Combo。

### 4.3 静默推导

只有一个明显合理结构时可静默推导。

禁止为了“完整”机械增加 Advantage 问题。

---

## 5. Outcome = 势均力敌时的 Trajectory

`Outcome = 势均力敌 / 未分胜负` 不能自动等于全程 50/50。

允许：

### Continuous Deadlock / 持续胶着

双方持续互相破解，很少形成持续 Advantage。

### Alternating Advantage / 交替占优

```text
A 先拿主动
→ B 通过 Turning Event 夺回
→ 再次转移
→ 最终仍未分胜负
```

### One-sided Pressure Without Finish / 一方长期占优但无法终结

一方大部分时间保持压迫，但另一方始终能化解关键威胁，因此最终没有输掉。

Runtime 必须同时满足 Outcome 与 Trajectory，不能用一个字段吞掉另一个。

---

## 6. Advantage Trajectory Contract

Trajectory 描述**主动权 / 控制关系变化**，不写 Hard Timeline。

推荐内部表达：

```text
Opening Initiative
→ First Counterplay Window
→ Turning Event / Temporary Advantage Shift
→ Reversal / Re-entry
→ Final Advantage State
```

这些是语义位置，不是固定五段结构。

禁止默认：

```text
0–4s A
4–7s B
7–11s A
11–15s Ending
```

除非用户、外部同步或 Model Adapter 明确需要严格时间块。

---

## 7. Mapping to Existing Core State

本文件不新建第二套 Advantage State。

映射：

```text
Advantage Structure.Outcome
→ Core Final / Global Advantage Intent

Advantage Structure.Advantage Trajectory
→ Core Battle Beat Advantage State + Turning Event sequence

Advantage Structure.Counterplay Shape
→ Choreography Initiative / Attack / Counter / Re-entry realization density and form
```

Core 仍维护：

- Current Advantage；
- Advantage Source；
- Turning Event；
- Range / Position / Condition；
- Beat State Contract。

每次明显 Advantage Shift 仍必须满足：

```text
旧 Advantage
→ 可见 Turning Event
→ Advantage Source 改变
→ 新 Advantage
```

---

## 8. Counterplay Realization Contract

### 8.1 Counterplay 必须真实发生

当 Counterplay Shape = 中 / 高时，以下内容**不能单独算作 Counterplay 已实现**：

- 等待反击；
- 寻找机会；
- 保持防守；
- 准备抱摔；
- 即将反扑；
- 反击刚刚开始；
- 手臂开始发力；
- 在真正反击发生前结束。

这些只能是 Setup。

必须出现真实发动的：

- Attack；
- Counter；
- Re-counter；
- Re-entry；
- Grapple Entry；
- Weapon Counter；
- 其他符合当前 System / Refinement 的主动战斗行为。

### 8.2 必须形成状态后果

Counterplay 不要求一定命中或最终成功，但必须至少形成一种可见后果：

- 迫使对方 Defense；
- 迫使对方退步 / 改线；
- 改变 Range；
- 改变 Angle / Route；
- 改变 Guard；
- 让对方失衡 / 重新支撑；
- 成功进入 / 短暂进入 Clinch / Grapple；
- 抢到短暂 Initiative；
- 迫使优势方必须主动化解。

之后优势方可以通过 Intercept / Evade / Counter / Reversal 重新保持总体优势。

### 8.3 不使用动作配额

禁止：

- 每人必须攻击 N 次；
- 每 3 秒必须反击一次；
- 劣势方必须至少命中一次；

只检查 Counterplay 是否在 Combat Spine 中真实存在、是否足以匹配用户选择的 Shape。

---

## 9. High Counterplay 结构判断

对于：

```text
A 总体占优
+ B 高频还手但持续被化解
```

应能从主要 Action Spine 看出类似：

```text
A 取得主动
→ B 真正发动 Counter / Re-entry
→ A 被迫响应并化解
→ B 在新的窗口再次发动真实攻击
→ A 再次通过自己的 System / Expression 反制
→ A 最终保持或重获总体优势
```

它不是固定动作模板；只用于识别 Counterplay 是否被饿死。

以下结构判 FAIL：

```text
A 攻击
→ B 防守
→ A 攻击
→ B 防守
→ B 准备反击
→ Ending
```

失败签名：

- `Counterplay Starvation`；
- `Initiative Starvation`；
- `Deferred Counterplay Collapse`；
- `Advantage-to-Passivity Shortcut`。

---

## 10. Combat Expression × Advantage Structure

两者保留独立语义：

```text
Combat Expression
→ 角色以什么气质 / 决策倾向争夺主动

Advantage Structure
→ 整场主动权如何分配、转移、最终落在哪一方
```

正常组合直接执行。

例如：

```text
男方 Expression：沉稳、防守反击
Trajectory：中段男方短暂夺回主动
```

合理实现：

```text
先接住 / 避开一轮攻势
→ 捕捉 Recovery / Range / Axis Window
→ 真正 Counter
→ 迫使对方响应
→ 短暂夺回主动
```

不要把“防守反击”翻译成“长期只防守”。

### 真实冲突才询问

如果二者存在明显语义冲突，且至少有两种高价值解释会改变成片，则询问用户。

例如：

```text
Expression：始终避免主动交锋
Advantage Structure：全程持续主动压迫
```

此时不能静默覆盖任何已确认决策。

禁止为了避免所有潜在冲突建立复杂自动协调矩阵。

---

## 11. Ending Exposure Policy

Ending / Final Visual Ending **不是固定 Planning Node**。

默认：

```text
Final Advantage State
+ Last Active Contact / Motion / Position / Momentum
→ Runtime 自然收束 Final Visual
```

只有以下情况单独询问 Ending：

- 用户明确要击倒 / 制服 / 死亡 / 撤离；
- 用户明确要互相架剑 / 特定定格 / 特定剧情动作；
- 当前存在多个高价值 Final Visual 分叉，且无法高置信度替用户决定。

### Ending 不得吞掉 Counterplay

如果 Advantage Structure 需要某角色在后段真实还手，Ending 不能把它改写成：

```text
准备反扑
→ 片段结束
```

Final Visual 可以保留“下一轮威胁”，但前面必须已经真实兑现该角色应有的 Counterplay。

---

## 12. Choreography Realization Gate

在 Concrete Action Phrase / Battle Beat 定稿前检查：

1. Outcome 是否与用户确认一致；
2. Counterplay Shape 是否可从真实 Attack / Counter / Re-entry 看出；
3. Trajectory 是否经过真实 Turning Event / Initiative Handoff，而不是状态标签跳变；
4. 劣势方如果是 High Counterplay，是否仍有足够真实主动动作；
5. 优势方是否通过具体动作保持 / 重获优势，而不是因为对方“停止攻击”自动占优；
6. Counterplay 是否符合该角色 Combat System / Refinement；
7. Combat Expression 是否被错误翻译成攻击份额；
8. Ending 是否吞掉最后一段有效 Combat。

任一关键项 FAIL，回到 Action Phrase / Battle Beat 重写，不允许只在文末加一句“双方互有来回”。

---

## 13. Final Prompt Externalization Gate

Final Prompt 不 Dump：

```text
Counterplay = High
Trajectory = A>B>A
```

而要外显为动作。

对于 High Counterplay，必须能在正向 Action Flow 中看到：

```text
劣势方真实发动
→ 优势方被迫响应
→ Counterplay 形成状态后果
→ 优势方通过自己的技术 / 决策重新化解或夺回优势
```

### 禁止 Deferred Counterplay

如果 Final Prompt 主要写：

- “他一直等待机会”；
- “他准备反击”；
- “最后开始发力”；
- “镜头在真正反击前停住”；

且前面没有足够真实 Counterplay，判：

`Deferred Counterplay Collapse`

必须重写 Active Exchange，而不是继续润色 Ending。

---

## 14. Prompt Assembly Priority

当本合同与通用 Prompt Assembly 发生冲突时：

```text
用户明确 Advantage Structure
> 本合同的 Counterplay / Trajectory Realization
> 去重与 Ending 收束
```

只删除重复状态说明和重复 Negative。Ending 的光影 / 尘土 / 镜头可以写细。禁止为了“更短”删掉用于兑现 Counterplay / Trajectory 的真实 Exchange，也禁止把画面维度压糊。

---

## 15. Final Preflight

Action Combat 最终交付前，在原 Final Preflight 之外增加：

### Advantage Structure

- 是否保存用户明确 Outcome；
- 是否保存 Counterplay Shape；
- 是否保存 Advantage Trajectory；
- 是否把 `Outcome` 错当成全程 Advantage；
- 是否把 `占优` 错当成 `对方不攻击`。

### Counterplay

- High / Medium Counterplay 是否真实发生；
- 是否至少产生 Defense / Range / Position / Guard / Balance / Initiative 中一种真实后果；
- 是否全部是“准备 / 等待 / 即将”；
- 劣势方的 Technique Identity 是否在 Counterplay 中真实出现。

### Ending

- Ending 是否来自最后一个 Active State；
- Ending 是否过早截断本应发生的 Counterplay；
- 是否为了悬念把主要反击推到视频之外。

任一关键项 FAIL，不允许交付。

---

## 16. G01 Regression Target

原 G01 中，如果用户选择类似：

```text
女方总体占优
+ 男方高频还手但持续被化解
+ 女方先主动 → 男方中段短暂夺回 → 女方重新压制
```

则 Final Choreography 必须明显不同于旧失败：

旧失败：

```text
女方连续攻击
→ 男方主要防守
→ 男方一次短暂进入
→ 女方继续压制
→ 男方准备反扑
→ 结束
```

新目标：

```text
女方先抢主动
→ 男方真实 Counter，迫使女方调整防守 / 路线
→ 男方通过拳摔或当前 System 短暂形成控制
→ 女方真实化解并夺回主动
→ 男方后续仍真实还击，但被再次化解
→ 最终女方保持优势或按用户指定 Outcome 收束
```

不规定具体动作次数，不规定固定秒点。

---

## 17. 上位原则

> **被压制不等于没有还手。**  
> **还手很多也完全可以仍然处于下风。**  
> **优势必须通过动作和状态后果体现，不通过剥夺对手行动体现。**  
> **只在真实高价值歧义时询问用户，不为理论完整度增加问卷。**
