# Combat Action Reference Catalog — Validation

> Scope：`action-reference-catalog.md` 知识质量 + Runtime Wiring 静态验证。  
> Runtime status：**WIRED / pending integrated RF-22 regression**。  
> 本文件不证明视频模型真实生成效果，也不单独构成 RF-22 PASS-NATIVE。

---

# 1. Validation Goals

验证：

1. 17 个来源动作是否完整且无虚构第 18 项；
2. 单动作是否具体可执行，而不是只有招式名；
3. Core Action Mechanic 是否与视觉特效解耦；
4. Physical Level Range 是否不会偷偷改变动作身份；
5. Combat Role 是否只使用 8 个确认枚举；
6. Response Compatibility 是否能改善攻防匹配；
7. State Transition 是否使用稀疏 Before → After；
8. Risk / Commitment 是否形成合理 Recovery / Counter Window；
9. Prerequisites 是否阻止无武器、无空间、无前序状态的错误动作；
10. Environment Impact 是否服务动作因果；
11. Catalog 是否只在 Concrete Action Selection Gap 时按需读取；
12. Catalog 是否不会替代 Fighting / Martial / Weapon Profile 或 Abstract Pattern；
13. Final Prompt 是否只外显具体动作，不泄漏内部 Schema 标签；
14. 新 Wiring 是否可以与 RF-22 一起执行集成回归。

---

# 2. Source Inventory Check

来源图片可见动作严格为 17 个：

```text
01 极速瞬身突袭
02 凌空飞踢
03 反手格挡防御
04 蓄力重拳冲击
05 侧身闪避走位
06 腾空旋转斩击
07 低空滑步突袭
08 双臂交叉防御
09 后仰规避反击
10 蓄力霸体冲击
11 灵活跳跃突袭
12 空中滞空连击
13 横扫腿击
14 贴身缠斗快打
15 侧身拔刀斩
16 抬手震气击退
17 落地震地重击
```

Validation：

```text
Catalog mappings = 17
Missing source action = 0
Invented source action = 0
```

此前草稿中的“后撤蓄力重击”不是来源图片动作，已删除。

---

# 3. Schema Check

Catalog 允许按动作实际需要省略字段，但核心执行信息必须能回答：

```text
What action?
From what Range / Body State?
Against what current action/state?
What prerequisites must hold?
What Physical Level is legal?
What visible result occurs?
What State changes?
What initiative / recovery consequence matters?
What can logically follow?
```

结果：**PASS — schema is execution-oriented, not encyclopedia-oriented.**

---

# 4. Combat Role Check

合法枚举仅：

```text
Entry
Pressure
Defense
Counter
Re-entry
Reversal
Signature
Finisher
```

Range Change / Route Change / Base Disruption 等不再重复建 Role，而进入 State Transition。

结果：**PASS — no role over-expansion.**

---

# 5. Response Compatibility Check

固定轻量结构：

```text
Best Against
Poor Against
Best State
```

示例：

```text
侧移离线
Best Against: 直线突进 / 直拳 / 抓抱入口
Poor Against: 已建立贴身控制
Best State: 攻击路线清楚且侧向落脚点存在
```

这足够支持：

```text
Incoming State
→ Response Need
→ Candidate Filtering
```

结果：**PASS — useful without building a second attack taxonomy.**

---

# 6. State Transition Check

只写发生变化的状态：

```text
横扫腿击
Support: Stable → Disrupted
Balance: Stable → Forced Step/Fall Risk
Initiative: Opponent → Steal
```

不要求无变化字段填 `unchanged`。

结果：**PASS — sparse Before → After.**

---

# 7. Physical Level Check

关键边界：

```text
普通闪避 / 拨挡 / 扫腿
→ P1 可成立

爆发瞬身 / 霸体冲击 / 震地
→ 主要 P2，可强化到 P3

空中滞空连击
→ Min P3

非接触掌劲震退
→ Min P3
```

必须保证：

> **降级只能削弱表现，不能改变动作核。**

例如：

```text
A16 掌劲震退 P3
-X- 为了 P2 改成接触推掌
```

结果：**PASS — identity-preserving level ranges.**

---

# 8. Prerequisite Check

必须阻止典型非法动作：

```text
无刀剑
-X- 侧身拔刀斩

无前序腾空 / 下落
-X- 落地震地重击

P1 / P2 Grounded
-X- 空中滞空连击
-X- 非接触掌劲震退

无侧向落脚空间
-X- 侧移离线
```

结果：**PASS.**

---

# 9. Risk / Commitment Check

动作承诺度必须影响反击窗口，但不建立概率模型。

```text
Low Commitment
→ 不自动制造巨大暴露

High / Very High Commitment
→ Miss / Evade / Block 后允许明显 Recovery Exposure
→ Counter / Initiative Theft 候选权重提高
```

典型：

- 侧移离线：Low；
- 蓄势重拳：High；
- 腾空旋转斩：Very High；
- 落地震地重击：Very High。

结果：**PASS.**

---

# 10. Environment Impact Check

环境反馈属于动作结果，不是独立破坏系统。

合法：

```text
P2 重拳命中
→ 对手撞翻椅子 / 撞墙

P3 震地
→ 地裂 / 碎石 / 冲击波
```

非法：

```text
动作没有触碰或冲击来源
→ 环境突然大范围爆炸
```

结果：**PASS.**

---

# 11. Runtime Wiring Check

正式入口：

```text
references/libraries/index.md
→ combat-choreography-patterns/index.md
→ Concrete Action Selection Gap
→ action-reference-catalog.md
```

推荐 Stage-2 链：

```text
Combat Planning Context / Exchange Spine
→ detect gap

需要抽象 Movement / Technique / Transition 策略
→ minimum-validation-set.md

需要具体动作
→ action-reference-catalog.md

必要时
→ Pattern → Catalog Action

→ Concrete Action Phrase
```

Catalog 不是默认全量读取，不新增机械 Library 配额。

结果：**PASS — statically routed.**

---

# 12. Minimal Selection Cases

## Case A｜直线压迫 → 侧移 → Counter Window

```text
Incoming: 直线突进
Need: Defense / Counter
Selected: A05 侧移离线
Result: Route → Outside Angle
Initiative: Open Counter Window
```

PASS。

## Case B｜前压承重明显 → 破支撑

```text
Incoming: 对手前压，承重脚暴露
Need: Counter / Reversal
Selected: A13 横扫腿击
Result: Support disrupted + Initiative Steal
```

PASS。

## Case C｜正面重压但仍需保住结构

```text
Incoming: 正面重击
Need: Defense
Selected: A08 交叉架挡
Result: Contact absorbed; opponent may retain Pressure
```

PASS。防守成功不被错误等同主动权反转。

## Case D｜P3 真人武侠式非接触震退

```text
Visual Medium: live-action
Physical Level: P3
Need: Range Reset / Reversal
Selected: A16 掌劲震退
```

PASS。真人画面与 P3 不冲突。

## Case E｜P2 请求但动作核依赖 P3

```text
Physical Level: P2
Candidate: A16 掌劲震退
```

Result：Reject candidate，而不是改成普通推掌。

PASS。

---

# 13. Final Prompt Boundary

Final Prompt 不应输出：

```text
Combat Role = Counter
Commitment = Medium
Best Against = ...
Initiative Effect = Steal
```

应转换为可见动作：

```text
男方直线压上来时，女方短侧步切到他的外侧让冲势落空；他肩线尚未回正，她立刻从这个外侧角度接入下一次反击。
```

结果：**PASS — state machine internalized, choreography externalized.**

---

# 14. Integrated Regression Plan

用户已明确要求：**不再等待 RF-22 单独关闭，Catalog 直接接入，后续与 RF-22 一起验证。**

因此下一轮固定 G01 仍保持原输入和固定选择，但测试解释升级为：

```text
Integrated Regression
= RF-22 Runtime Handoff
+ RF-14～RF-20 existing checks
+ Concrete Action Catalog Routing / Realization
```

必须额外观察：

```text
Catalog Read Timing
Concrete Action Selection Gap
Selected Action ID / Source
Why candidate is compatible
Physical Level legality
Prerequisite legality
Realized Action Phrase
Prompt density / dedup impact
```

只有真实 Interactive 执行才能证明 PASS-NATIVE；本静态文件不替代真实测试。
