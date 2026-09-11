# Combat Advantage × Counterplay Spec

> 状态：已确认，进入 Runtime 实现 / G01 回归阶段  
> 日期：2026-08-15  
> 批次：Advantage × Counterplay / 战斗优势与还手方式  
> 触发证据：G01 新版真实生成视频中，男方虽被定义为“拳击＋摔跤、沉稳防守反击”，但成片几乎全程只防守，缺少可见还击。回看 Final Prompt 后确认：男方的大部分反击被写成“等待 / 准备 / 即将反扑”，而不是已经发生的有效 Counterplay。

---

## 1. 本批要解决的问题

旧规划把以下语义压得过粗：

```text
谁占优 / 谁赢
→ Runtime 自行推导双方攻击与防守份额
```

这会产生错误快捷推导：

```text
女方占优
→ 男方长期防守
→ 男方很少真正攻击
```

但用户确认：

> **被压制不等于一直防守。劣势方可以还手很多次，只是攻击不断被化解、截断或反击，因此总体仍处于下风。**

因此必须拆开：

```text
Advantage / 优势归属
≠
Attack Share / 攻击份额
```

以及：

```text
Outcome / 最终结果
≠
Advantage Trajectory / 整段优势流动
```

---

## 2. 已确认：三类基础 Counterplay Shape

当一方总体占优时，至少允许三种不同的“怎么占优”：

### A. 持续压制型

```text
优势方持续控制节奏 / Range / Route
→ 劣势方主要被迫防守、闪避、退让
→ 真正反攻机会较少
```

适用于用户明确要“碾压 / 全程压制 / 对方几乎还不了手”。

### B. 高频还手但持续被化解型

```text
优势方总体占优
→ 劣势方多次真正发动攻击 / Counter / Re-entry
→ 这些攻击形成真实威胁
→ 但不断被优势方截断、化解、躲开、借势反制
→ 因而整体优势仍属于优势方
```

这是本批确认的**通用推荐默认**，因为它能让劣势方仍然“参与战斗”，同时不破坏优势归属。

### C. 多次拉锯后最终占优型

```text
双方都阶段性取得主动
→ Advantage 多次转移
→ 最终由一方在关键交换后取得明显优势
```

适用于双方水平接近、但最终仍需要明确谁占上风的场景。

### 核心原则

> **Advantage ≠ Attack Share。**  
> “A 占优”只说明整体控制关系，不自动说明 B 必须长期只防守。

---

## 3. 已确认：Advantage Structure 是一个 Planning Node

“谁占优”不再单独作为一个过粗字段。

正式定义：

```text
Advantage Structure
├─ Outcome / Advantage
│  → 最终谁占优、是否分胜负
├─ Counterplay Shape
│  → 劣势方如何还手 / 被压制 / 丢失主动
└─ Advantage Trajectory
   → 整段战斗中主动权如何流动
```

三者属于同一个 **Primary Planning Node**，候选答案应尽量把“结果 + 怎么形成这个结果”一起说清楚。

不把它拆成三个机械问题。

---

## 4. 已确认：Advantage Trajectory 只描述优势流动，不写 Hard Timeline

用户确认选择：

> 同时明确 Advantage Trajectory，但只描述控制权变化，不规定具体招式和秒点。

例如：

```text
开场女方先抢主动
→ 男方通过 Counter 短暂夺回主动
→ 女方化解并再次反压
→ 结尾女方总体占优
```

合法。

但不应自动写成：

```text
0–4 秒女方压制
4–7 秒男方反击
7–11 秒女方再压制
11–15 秒结尾
```

除非用户或模型适配确实需要严格时间边界。

原则：

> **Trajectory 描述战术状态变化，不是逐秒分镜脚本。**

---

## 5. 已确认：Advantage Structure 条件暴露，不固定增加一轮

Advantage Structure 是高价值条件节点。

### 直接继承

如果用户已经明确：

```text
Outcome
+ Counterplay Shape
+ 大致 Advantage Trajectory
```

则直接继承，不追问。

### 条件询问

如果用户只说：

- “女方占优”；
- “男方赢”；
- “势均力敌”；
- “A 压制 B”；

而至少存在两个合理过程，并且不同过程会明显改变成片，则询问：

> **具体是怎么占优 / 对方怎么还手 / 主动权怎么流动？**

### 静默推导

如果当前语境只存在一个明显合理结构，可由 Runtime 静默补全。

因此：

> **拆分概念不等于机械增加交互轮次。**

---

## 6. 已确认：势均力敌也存在不同 Advantage Trajectory

`Outcome = 势均力敌 / 未分胜负` 不能自动推导成全程 50/50。

至少允许：

### 持续胶着型

双方持续互相破解，很少有人形成持续优势。

### 交替占优型

```text
A 抢到一段主动
→ B 夺回
→ 再次反转
→ 最终仍未分胜负
```

### 一方长期占优但无法终结型

一方大部分时间保持压迫或控制，但另一方始终能化解关键威胁，因此没有真正输掉。

核心规则：

> **Outcome ≠ Advantage Trajectory。**

---

## 7. 已确认：Ending 降级为条件节点

旧 Interactive 常固定询问“最后一拍怎么收”。

本批确认：

> **Ending / Final Visual Ending 不再作为固定 Planning Node。**

`Advantage Structure` 已经负责：

- 战斗如何发展；
- 主动权如何流动；
- 最终谁处于什么优势状态；
- 是否真正分胜负。

因此默认由 Runtime 从最后一个有效 Action / Contact / Position / Momentum / Advantage State 自然收束。

只有以下情况再单独暴露 Ending：

- 用户明确要求击倒 / 制服 / 死亡 / 撤离；
- 用户明确要求互相架剑 / 特定定格；
- 用户要求某个剧情动作作为最后一拍；
- 当前存在多个真正高价值、会显著改变剧情意义的 Final Visual 分叉。

禁止为了“悬念”自动把已经确认需要发生的 Counterplay 延迟成：

```text
准备反击
即将反扑
反击刚刚开始
在真正反击发生前结束
```

如果这会导致某角色整段都没有真实还手。

---

## 8. 已确认：Combat Expression 与 Advantage Structure 的冲突策略

用户最终确认：**不要设计过细的自动协调矩阵。**

正常情况下：

```text
Combat Expression
+ Advantage Structure
→ Runtime 合理组合
```

例如：

```text
男方 Combat Expression：沉稳、防守反击
Advantage Trajectory：中段短暂夺回主动
```

没有真实冲突，Runtime 直接实现为“先接住攻势 → 捕捉窗口 → Counter 成功 → 短暂夺回主动”。

只有出现**真实语义冲突**、且存在两种以上明显不同的高价值解释时，才询问用户。

例如：

```text
Combat Expression：始终避免主动交锋
Advantage Structure：全程持续主动压迫
```

此时不能静默偷改任一已确认创作决策，应询问用户取舍。

原则：

> **有真实冲突才问，不预先为所有可能组合建立复杂规则。**

---

## 9. Runtime 实现合同：Counterplay 必须是真实动作，不是意图词

这是 G01 失败后新增的最重要执行约束。

当 Advantage Structure 明确要求 `Counterplay = 中 / 高` 时，Final Choreography 中不能只写：

- 等待反击；
- 寻找机会；
- 保持防守；
- 准备抱摔；
- 即将反扑；
- 手臂开始发力；

这些只能作为局部 Setup，不能算作已经实现 Counterplay。

至少要出现**真实发动且产生战斗状态后果的 Counter / Attack / Re-entry**。

状态后果可以是：

- 迫使对方改变 Defense；
- 迫使对方退步 / 改线；
- 改变 Range；
- 抢到短暂 Angle / Route；
- 改变对方 Guard；
- 让对方失衡 / 重新支撑；
- 成功进入 Clinch / Grapple；
- 短暂夺回 Initiative；

然后再被优势方化解 / 截断 / 反制。

不使用“每人必须攻击 N 次”的固定配额。

---

## 10. Runtime 实现合同：高 Counterplay 的可见结构

对于：

```text
A 总体占优
+ B 高频还手但持续被化解
```

合理的 Choreography Spine 应更接近：

```text
A 取得主动
→ B 真正发动 Counter / Re-entry
→ A 化解并反制
→ B 再次从新的窗口发动真实攻击
→ A 再次改变其攻击结果
→ A 最终保持 / 重获总体优势
```

而不是：

```text
A 攻击
→ B 防守
→ A 攻击
→ B 防守
→ B 最后准备反击
→ Ending
```

这不是规定动作顺序模板，而是用于识别：

`Counterplay Starvation / Initiative Starvation`

---

## 11. 失败签名

### Counterplay Starvation

用户或 Planning 明确劣势方应积极还手，但 Final Choreography / Final Prompt 中该角色主要只防守、退让、等待。

### Deferred Counterplay Collapse

本应发生的真实反击大量被推迟到 Ending，并被写成“即将 / 准备 / 开始”，最终成片没有发生。

### Advantage-to-Passivity Shortcut

Runtime 把“处于劣势”自动翻译成“攻击份额接近零”。

### Outcome-Trajectory Collapse

把“最终平局 / 最终 A 占优”错误扩展成整段始终保持同一 Advantage State，没有合理状态流动。

---

## 12. G01 真实失败证据

已确认的新 G01 规划：

```text
女方：散打
Combat Expression：主动切线、强势抢节奏

男方：拳击＋摔跤
Combat Expression：沉稳防守、等待反击
```

Final Prompt 实际结构约为：

```text
0–5s：女方持续主动攻击，男方主要防守
5–8s：男方一次短反击 + 进入抱摔距离
→ 很快被女方反制
10–13s：女方继续压制
13–15s：男方准备反扑
→ 在真正反击发生前结束
```

真实生成视频反馈：

> **男方几乎没有可见还击，一直防守，女方一直攻击。**

因此该案例是本批 Golden Regression。

---

## 13. 本批实现范围

本批只解决 Advantage / Counterplay / Ending 这一条链，不扩具体流派知识。

### 实现

1. 新增 Action Combat 专项正文真源：
   - `references/tasks/action-combat-video/advantage-structure-contract.md`
2. Action Combat Router 固定加载该合同，并把 Advantage Structure 纳入 Planning Context / Final Preflight；
3. Tasks Index 把该合同加入 Combat 复合主 Task 路线；
4. Runtime 明确：
   - Advantage ≠ Attack Share；
   - Advantage Structure = Outcome + Counterplay Shape + Advantage Trajectory；
   - 条件暴露；
   - Ending 条件暴露；
   - High Counterplay 必须被真实动作外显；
   - Expression 与 Advantage 出现真实语义冲突时才询问用户。
5. 更新 `.handoff/current.md`，把下一步切换为 G01 Advantage Regression。

### 暂不实现

- 不扩散打 / 拳击 / 摔跤 / MMA 细节库；
- 不新增动作次数配额；
- 不建立复杂 Expression × Advantage 自动协调矩阵；
- 不大改 Modern / Wuxia Specialist；
- 不进行 Quick Mode 全量架构迁移；
- 不因为一个失败签名建立多个新的 Runtime 子系统。

---

## 14. 实施计划

### Phase 1 — Spec / Contract

- 将本批全部确认结论固化为本 Spec；
- 新建 `advantage-structure-contract.md` 作为唯一运行期正文真源。

### Phase 2 — Routing

- Action Combat Router 强制读取 Advantage Contract；
- Planning Context 新增 `Advantage Structure`；
- Interactive 保持原两个固定核心节点：System / Expression；
- Advantage Structure 作为后续**条件节点**，不是固定第三轮 / 第四轮。

### Phase 3 — Choreography Realization

Advantage Contract 映射到现有 Core / Choreography：

```text
Advantage Structure
→ Core Advantage State / Turning Event
→ Battle Beat Advantage Flow
→ Choreography Initiative / Counterplay Realization
→ Final Prompt Visible Advantage
```

不新建第二套 State Machine。

### Phase 4 — Final Assembly / QA

最终至少检查：

```text
Advantage 是否可见
Counterplay Shape 是否可见
Trajectory 是否通过 Turning Event / Initiative Handoff 被兑现
High Counterplay 是否出现真实 Attack / Counter / Re-entry
是否把 Counterplay 全部延迟到 Ending
Ending 是否吞掉最后一段有效攻防
```

### Phase 5 — Regression

重新跑原始 G01。

先检查交互：

- 是否在结果存在高价值歧义时询问 Advantage Structure；
- 是否能区分“持续压制”与“高频还手但持续被化解”；
- 是否没有机械增加 Ending 轮。

再检查 Final Prompt：

- 男方是否至少存在多个真实 Counter / Re-entry，而不是大部分时间防守；
- 男方攻击可以失败，但必须真实发生；
- 女方仍可保持总体优势；
- Final Ending 不再把男方主要反击推迟到片段之外。

最后再看真实生成视频。

---

## 15. G01 下一轮推荐测试方向

为了验证本批，不要求固定选择，但推荐测试一个最容易暴露差异的结构：

```text
Outcome：女方总体占优，但不完全制服
Counterplay Shape：男方高频还手但持续被化解
Advantage Trajectory：
女方先抢主动
→ 男方通过拳击反击 / 拳摔进入短暂夺回主动
→ 女方通过散打切线与反制重新取得优势
→ 男方后续仍有真实还击，但无法持续控制局面
→ 女方最终保持总体优势
```

注意：这只是回归推荐，不写死进 Runtime，也不规定具体秒点 / 动作次数。

---

## 16. PASS / FAIL

### Interactive PASS

- Advantage Structure 只在高价值歧义时条件暴露；
- 问的是 `Outcome + Counterplay + Trajectory`，而不只是“谁赢”；
- “女方占优”不再自动等于“男方一直防守”；
- 势均力敌可区分不同 Trajectory；
- Ending 默认不再固定增加一轮；
- Expression 与 Advantage 无真实冲突时不继续追问。

### Prompt-level PASS

- 劣势方 High Counterplay 被写成真实 Attack / Counter / Re-entry；
- Counterplay 产生可见 Range / Guard / Position / Balance / Initiative 后果；
- 优势方通过化解 / 截断 / 反制继续保持总体优势；
- 不以“准备反击 / 即将反扑”替代主要 Counterplay；
- Advantage Trajectory 与 Final Outcome 同时成立；
- Ending 不吞掉 Active Exchange。

### Generated-video PASS

- 男方真实可见地多次还击；
- 仍能看出女方总体占优；
- 不再出现“男方几乎全程只防守”的 Counterplay Starvation；
- 动作连续性、Whole-body、Persistent Signature 等旧 Gate 没有回退。

只有真实生成视频满足以上条件，才算本批最终 PASS。
