# Generic Video Prompt Adapter

## 1. 定位

Generic 是默认的模型无关输出协议。

当用户没有指定 Seedance 2.0 或 LTX-2.3，或希望得到可迁移到不同视频模型的通用 Prompt 时，读取本页。

本页不假设任何平台的素材引用语法、参数名称、分辨率、时长上限、音频能力或 Combat 执行能力。规划时长时仍遵守技能默认：单段 15 秒生产单元，不写 20–30 秒时间轴。

---

## 2. 接收的通用导演方案

在进入本页前，任务层和控制层应已经确定：

- 视频目标；
- 输入素材及职责；
- 时长或片段范围；
- 主体初始状态；
- 主体运动；
- 镜头位置和运动；
- 时间轴或自然动作顺序；
- 空间与连续性；
- 表演、对白和声音；
- 光影、色彩和风格；
- 当前最危险的失败模式。

Action Combat 还应已经在内部完成 Choreography / State Planning，以及上游已经选中的高价值 Action–Camera Handoff。

Generic 不重新设计这些内容，只负责组装成稳定、清晰、无平台绑定的输出。

---

## 3. Model Combat Capability Contract

Generic 不知道最终目标模型，因此所有模型侧 Combat 能力均为：

```text
Motion Complexity Capacity: Unverified
Multi-character Stability: Unverified
Contact / Interaction Fidelity: Unverified
Spatial Continuity: Unverified
Camera Complexity Capacity: Unverified
Temporal / Prompt Following: Unverified
```

执行原则：

- 不凭空假设模型“很强”或“很弱”；
- 不因为未知就自动把 Combat 压成极少动作；
- `Unverified` 只代表不能承诺能力上限，**不自动触发高价值 Action–Camera Moment 的删除、泛化或保守中景回退**；
- 默认保持 Full-fidelity Action–Camera Realization；
- 只有存在 Verified Limitation 或真实 Generated-video Regression Evidence 时，才允许 Intent-preserving Degradation；
- 使用 `choreography-playbook.md` 的通用 Action Execution Budget；
- 优先让动作因果、Contact、空间与 Camera Readability 清楚；
- 如果用户后续指定模型，再由对应 Adapter 使用其 Verified / Benchmark 能力进行调整。

---

## 4. 推荐输出结构

```text
视频目标：
输入与参考职责：
全局固定项：
镜头 / 时间轴：
主体运动：
镜头运动：
表演与声音：
光影与风格延续：
连续性限制：
失败限制：
最终可复制 Prompt：
```

用户只需要最终 Prompt 时，可以隐藏前面的结构化分析，将信息整合为一份可复制文本。

Action Combat 内部 State / Planning Context 不默认展示。

> `主体运动` 与 `镜头运动` 在规划上分别判断，不等于 Action Combat 的最终 Prompt 必须把两者拆成两个独立段落。已经成立的关键 Action–Camera Handoff 应保持 inline 语义绑定。

---

## 5. Prompt 组装顺序

```text
任务与持续时间
→ 初始画面 / 参考关系
→ 主体和空间
→ 动作或表演顺序
→ 镜头行为
→ 光影、色彩和材质
→ 对白、音效和音乐
→ 连续性与失败限制
```

上述是信息组织顺序，不得在 Action Combat 中把上游已经耦合的 Key Camera Moment 再拆成“动作段 + 泛化镜头段”。

### 单镜头

优先写成一个自然连续的动作段落，避免为了显得专业而机械切成过多时间段。

Action Combat 中使用连续 Action Phrase 语言，明确：

- 谁发起；
- 对手如何响应；
- Contact / Outcome；
- Reaction / Consequence；
- Position / Range 如何变化；
- 下一动作如何从当前结果继续；
- 上游已确认的高价值 Camera Accent 在对应具体 Action Moment 中怎样观察，并怎样继续 live motion。

### 多镜头 / 多片段

先写全局固定项，再按绝对时间或镜号写每镜：

```text
[时间 / 镜号]
景别与机位：
主体状态和动作：
镜头状态：
声音：
承接与落点：
```

结构化输出仍必须保持 Action Anchor、Camera Intent 与跨镜 Motion Continuation，不因字段拆分而丢失因果关系。

---

## 5.5 Action Combat Camera Handoff Preservation

Generic 继承 `prompt-assembly/control.md` 的 Common Camera Handoff Preservation Contract。

Generic 可以：

- 改写句式；
- 合并动作与摄影说明；
- 使用更通用的自然语言替换平台特定摄影术语；
- 在有可靠证据时降低 Camera 实现复杂度。

Generic 不可以：

- 重新决定上游已经确认的高价值 Camera Moment 是否值得存在；
- 把具体 Action Anchor 改成“第一次接触 / 关键时刻 / 高潮处”；
- 把具体 Camera Task 改成“使用电影化近景增强冲击力”；
- 删除维持该 Handoff 所必需的 live-motion continuation；
- 用独立 Global Camera Baseline 代替 inline Camera Moment。

若转换后出现上述退化，判：

`Camera Handoff Serialization Loss`

并回 Prompt Assembly / Generic Adapter 重写，不回 Choreography 重新设计动作。

---

## 6. 素材表达

Generic 使用语义化占位，不伪造平台语法：

- `参考图 A：人物身份与服装`
- `参考图 B：场景结构`
- `参考视频 A：动作和运镜节奏`
- `参考音频 A：对白和时间节拍`
- `首帧参考`
- `尾帧目标`

平台转换时，再由 Seedance 或 LTX 适配页改写。

---

## 7. 通用规则

- 先解决谁在动、如何动、镜头为何动，再补风格；
- 主体运动与镜头运动分别判断，但 Action Combat 的关键 Handoff 在最终 Prompt 中保持语义耦合；
- 一段视频只保留一个主镜头任务；
- 使用可观察的身体和环境变化表达情绪；
- 光影、声音和环境变化必须有来源；
- 连续性限制只保留当前任务高风险项，不堆无关负向词；
- 不使用未知平台参数，不承诺平台未确认的能力；
- Combat 遵循 State Machine Internalized, Choreography Externalized；
- Combat 不因模型未知而使用“宁少而清晰”的动作通缩策略；
- Combat 不因 Camera 能力未验证而主动丢失已成立的高价值 Action–Camera Handoff。

---

## 8. 输出检查

- 未指定平台时，是否完全不依赖 `@图片` 等专属语法；
- 是否包含清晰的开始、推进和结束状态；
- 是否区分主体运动、镜头运动和环境变化；
- 是否能被人工轻松转换到 Seedance 或 LTX；
- 是否避免互斥镜头、互斥光影和同窗口动作过载；
- Combat Final Prompt 是否由可见 Action / Reaction / Contact / Consequence 主导；
- 上游存在高价值 Action–Camera Handoff 时，最终 Generic Prompt 是否仍保留具体 Action Anchor、Camera Intent 与 live-motion continuation；
- 是否出现 `Camera Handoff Serialization Loss`；
- 是否留下自然收尾，而不是在动作中途硬截断。
