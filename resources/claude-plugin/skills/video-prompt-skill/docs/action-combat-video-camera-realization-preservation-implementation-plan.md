# Action Combat Camera Realization × Preservation Implementation Plan

> 日期：2026-08-15
>
> 对应 Spec：`docs/action-combat-video-action-camera-handoff-spec.md` V2
>
> 范围：仅 Action Combat。
>
> 原则：不新建平行 Camera Runtime；在既有 Action–Camera / Prompt Assembly / Model Adapter 链路中补强 Realization 与 Preservation。

---

## 1. 实施目标

解决真实 G01 Final Prompt 中出现的 Regression：

```text
用户选择“电影冲击优先”
→ Runtime 知道关键接触可切近
→ Final Prompt 只写“第一次真实接触时，镜头短暂切近”
→ 没有把 Camera Moment 锚到某一段具体动作
→ 后文又引用“冲击近景”等未可靠建立的 Camera State
```

实施后应满足：

```text
Concrete Action Phrase
→ Action–Camera Handoff Planning
→ Realization Gate
→ Prompt Assembly
→ Model Adapter
→ Preservation Gate
→ Combat Final Preflight
→ Delivery
```

---

## 2. 实施原则

### 2.1 语义合同，不是模板合同

不增加固定字段、固定句式、固定 Shot 数量或关键词计数。

Realization / Preservation 都以语义成立为 PASS。

### 2.2 默认 Full-fidelity

`Model Capability = Unverified` 不触发自动 Camera 降级。

只有 Verified Limitation 或 Generated-video Regression Evidence 才允许 `Intent-preserving Degradation`。

### 2.3 Failure Taxonomy 最小化

复用现有：

- `Action–Camera Decoupling`
- `Perceptual Impact Underuse`
- `Camera Strategy Overconstraint / Camera Mobility Underfill`
- `Dead-motion Cut / Post-action Cut`
- `Kinetic Handoff Loss`
- `Camera Hard Constraint Violation`

只新增：

`Camera Handoff Serialization Loss`

---

## 3. 修改文件与责任

### Step 1｜`references/tasks/action-combat-video/action-camera-handoff-playbook.md`

目标：建立 Realization Gate 正文真源。

修改：

- 明确 Gate = semantic validation，不是字段表；
- 对被选中的高价值 Camera Moment 检查：
  - Concrete Action Anchor；
  - Camera Response / Viewer Task；
  - Live Motion / State Continuation；
  - Camera Hard Constraint Compliance；
- 明确泛化“关键接触时切近”不能单独判 Realized；
- 明确普通连接动作不要求 Camera Accent；
- 明确 Full-fidelity 为默认；
- Realization FAIL 复用现有 Failure Signatures。

### Step 2｜`references/controls/prompt-assembly/control.md`

目标：建立 Common Preservation Contract 正文真源。

修改：

- 明确 Key Camera Handoff 在 Assembly 中必须 Semantic Preservation；
- Assembly 可改写但不得把具体 Anchor / Intent / Live Motion 压成泛化 Camera 段；
- 新增 `Camera Handoff Serialization Loss`；
- 明确 Serialization Loss 只回 Assembly / Adapter，不回 Choreography；
- 增加 Camera State 建立/引用连续性检查；
- 区分 assembly-stage validation 与最终 Preflight。

### Step 3｜`SKILL.md`

目标：修正 Action Combat Mandatory Path 和最终交付顺序。

修改：

- `action-camera-handoff-playbook.md` 后增加 Realization Gate 语义；
- `prompt-assembly/control.md` 后必须经过 Model Adapter；
- Adapter 后执行 Preservation Gate；
- Preservation 后才执行真正 Combat Final Preflight；
- 明确 Final Preflight 检查最终用户可复制 Prompt，而不是 Adapter 前导演草案；
- 更新 Combat 专项自查与 Model Adapter 约束。

### Step 4｜`references/models/generic.md`

目标：Generic 不再把 Combat Action 与关键 Camera Handoff重新拆散。

修改：

- 继承 Common Preservation Contract；
- “主体运动 / 镜头运动分别判断”不等于 Final Prompt 必须分段；
- 对 Action Combat，高价值 Camera Accent 保持 inline anchor；
- `Unverified` 不自动降级；
- Adapter 不重新决定 Camera Moment 是否值得存在。

### Step 5｜`references/models/seedance-2.md`

目标：Seedance 转换保持 Handoff 语义。

修改：

- 继承 Common Preservation Contract；
- 分时段 / 分镜组织不能拆掉具体 Action–Camera Anchor；
- `Unverified` 不自动降级高价值 Camera Moment；
- 有 Verified / Regression Evidence 时才做 Intent-preserving Degradation。

### Step 6｜`references/models/ltx-2-3.md`

目标：LTX 单自然段压缩保持 Handoff 语义。

修改：

- 继承 Common Preservation Contract；
- 自然语言压缩不能把 Camera Handoff 压成“关键时刻推近”等泛化描述；
- 允许自然改写，但保留 Action Anchor / Camera Intent / Live Motion；
- `Unverified` 不自动触发 Camera 简化。

### Step 7｜`.handoff/current.md`

目标：记录真实已实施状态与下一步回归。

更新：

- V2 Spec 已记录；
- 6 个 Runtime / Adapter 文件已修改；
- 下一步仅做真实 Regression：G01 + 1 个不同 Camera Priority 最小对照；
- 不宣称 Generated Video PASS。

---

## 4. 实施顺序

```text
Spec V2
→ Action–Camera Realization Gate
→ Prompt Assembly Preservation Contract
→ SKILL Mandatory Path
→ Generic Adapter
→ Seedance Adapter
→ LTX Adapter
→ Static consistency check
→ Handoff update
→ G01 + minimal contrast regression
```

不在本批：

- 扩具体拳种 / 武术知识；
- 重构 Modern / Wuxia Specialist；
- 给所有非 Combat 视频接入双层 Gate；
- 建完整 Model Camera Benchmark；
- 增加固定 Shot 配额。

---

## 5. Static Acceptance Criteria

实施完成后，静态规则层必须能回答：

1. 高价值 Camera Moment 怎样判 Realized？
2. 为什么“第一次接触时短暂切近”本身不能 PASS？
3. Assembly / Adapter 可以怎样自由改写？
4. 哪些核心 Action–Camera 语义不能被压掉？
5. `Unverified` 为什么不能自动触发降级？
6. `Camera Handoff Serialization Loss` 在哪里判、回哪层重写？
7. Final Preflight 是否明确位于 Adapter 后？
8. 是否仍然禁止 Camera-per-Action / 固定 Close-up 数量？

任一问题无明确答案，Static Implementation FAIL。

---

## 6. Runtime Regression Plan

### G01 主回归

复用办公室职业杀手 15 秒 Interactive 路径。

重点检查：

- Camera Priority = 电影冲击优先；
- Final Prompt 至少有真正绑定具体 Action Moment 的高价值 Camera Accent；
- 不再以泛化“第一次真实接触时切近”替代 Handoff；
- Camera Change 后继承 live motion；
- Final Prompt 不引用未建立 Camera State；
- 不因 Camera 增强导致动作密度明显退化。

### 最小对照

选一个已有 Action Combat 场景，Camera Priority 使用：

- 完整动作可读；或
- 贴身沉浸。

重点检查：

- 没有机械复用 G01 的 Near-lens / Close-up Pattern；
- 普通动作继续当前 Shot；
- Camera Accent 仍由动作信息 / Viewer Experience Value 触发。

---

## 7. 完成定义

本批“实施完成”只代表：

- Spec 已落；
- Runtime / Assembly / Adapter 静态规则已接通；
- Mandatory Path 已修正；
- Handoff 已更新。

只有真实 G01 + 最小对照重新生成并通过后，才能把状态升级为 Runtime Regression PASS；只有真实 Generated Video 通过后，才能宣称成片层 PASS。
