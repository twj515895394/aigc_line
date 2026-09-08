# Video Prompt References Index v2

## 1. 路由目标

用最少量 Reference 支撑当前任务，避免把视频 Skill 变成大而散的资料堆。

当前正式运行链路：

```text
输入理解
→ 任务 Playbook
→ 按需控制
→ 按需资料库与风格
→ 模型适配
→ 输出合同
→ 失败时诊断
```

索引只负责导航，不复制叶子正文。

---

## 2. 默认加载预算

固定读取：

- `1` 份 input Reference；
- `1` 份 task 主路线；
- `1` 份模式输出合同；
- `1` 份主交付模板。

按需读取：

- `0-3` 份 controls；
- `0-2` 份主要 libraries detail；
- `0-1` 份 style；
- `0-1` 份 model adapter；
- `0-1` 份多模态参考模板；
- 失败诊断时 `0-1` 份 diagnostic。

分类索引只用于导航，不计入业务 Reference 数量。

Action Combat 的 `router + core + choreography + 一个 specialist` 视为一条复合主 Task 路线，不与普通任务的“单文件 Playbook”机械比较文件数量。

---

## 3. 信息优先级

冲突时按以下顺序执行：

```text
用户当前明确要求
→ 必须保留 / 必须修改 / 必须禁止
→ 当前任务 Playbook
→ 当前输入 Reference 与素材职责
→ 已加载 controls
→ 已加载 libraries 与 style
→ model adapter 的能力边界和表达方式
→ 自动补全
```

模型适配页可以限制表达方式和执行路径，但不能擅自改变用户剧情、人物关系、Combat Intent、Coverage 和核心动作目标。

---

## 4. 输入路由

读取：`inputs/index.md`

继续路由到唯一主输入路线：

- 纯文字：`inputs/text-input.md`；
- 单张图片：`inputs/single-image-input.md`；
- 多张图片：`inputs/multi-image-input.md`；
- 一个或多个视频：`inputs/video-input.md`；
- 音频：`inputs/audio-input.md`；
- 图片 / 视频 / 音频混合输入：`inputs/mixed-multimodal-input.md`。

混合输入只读取 `mixed-multimodal-input.md`，不同时加载多份单模态输入页。

---

## 5. 任务路由

读取：`tasks/index.md`

继续路由到唯一主任务路线：

- 文生视频：`tasks/text-to-video/playbook.md`；
- 图生视频：`tasks/image-to-video/playbook.md`；
- 多模态参考视频：`tasks/multimodal-reference-video/playbook.md`；
- 视频参考复刻 / 视频转视频：`tasks/video-reference-and-video-to-video/playbook.md`；
- 视频局部编辑：`tasks/video-editing/playbook.md`；
- 视频向前 / 向后延长：`tasks/video-extension/playbook.md`；
- 音频驱动与音乐卡点：`tasks/audio-driven-and-beat-sync/playbook.md`；
- 故事板 / 多镜头 / 多片段到视频：`tasks/storyboard-and-multi-shot-video/playbook.md`；
- 复杂动作格斗 / 电影武侠：`tasks/action-combat-video/index.md` + `core-playbook.md` + `choreography-playbook.md` + 一个专项分支。

### Action Combat 职责

```text
Core
→ State / Continuity / Battle Runtime Skeleton

Choreography
→ Coverage / Rhythm / Phrase / Identity / Contact / Signature / Execution Budget

Modern / Wuxia specialist
→ 具体动作语言、物理尺度、Range / Contact 表现
```

Action Combat 只因存在明显独立执行流程而作为一级专项任务；简单动作仍留在原主任务 + `action-motion`。

---

## 6. 控制路由

读取：`controls/index.md`

按当前最大缺口加载 `0-3` 份：

- `controls/timeline-rhythm/control.md`；
- `controls/subject-motion/control.md`；
- `controls/camera-direction/control.md`；
- `controls/spatial-blocking/control.md`；
- `controls/continuity-consistency/control.md`；
- `controls/performance-expression/control.md`；
- `controls/audio-visual-sync/control.md`；
- `controls/reference-binding/control.md`；
- `controls/prompt-assembly/control.md`；
- `controls/realism-quality/control.md`。

Combat 不新增专属 `combat-choreography` Control。Task 已能解决的领域导演问题不迁入全局 Controls。

---

## 7. 资料库路由

读取：`libraries/index.md`

### 通用 Libraries

按需：

- `libraries/camera-shot/library.md`；
- `libraries/action-motion/library.md`；
- `libraries/performance-expression/library.md`；
- `libraries/transition-effects/library.md`；
- `libraries/lighting-color/library.md`；
- `libraries/audio-sound/library.md`；
- `libraries/genre-patterns/library.md`。

### Combat Libraries

- `libraries/combat-choreography-profiles/library.md`：少量稳定电影动作编排 Profile；
- `libraries/combat-fighting-profiles/library.md`：现代 Fighting Technique / Execution；
- `libraries/combat-martial-profiles/library.md`：武术 / 武侠空手知识；
- `libraries/combat-weapon-profiles/library.md`：Weapon Range / Contact / State；
- `libraries/combat-environment-patterns/library.md`：Environment Affordance 专业知识；
- `libraries/signature-moment-patterns/index.md`：轻量 Signature Pattern 路由，随后只加载命中的 `patterns/<id>.md`。

Combat V2 使用 Two-stage On-demand Loading：

```text
Task Core / Choreography / specialist / lightweight indexes
→ Combat Planning Context
→ 默认约 2 个主要 Library Detail Slot
```

优先级：专业正确性 > Character Identity 差异化 > Signature / 创意增强。

`signature-moment-patterns/source-cases/` 属于研究证据，不是默认运行时 Reference。

不建设 Combat Character Identity / occupation portrait Library。

---

## 8. 风格路由

读取：`styles/index.md`

最多加载一份主 style Reference：

- `styles/cinematic-live-action/style.md`；
- `styles/realistic-short-drama/style.md`；
- `styles/anime-animation/style.md`；
- `styles/comic-motion-drama/style.md`；
- `styles/commercial-advertising/style.md`；
- `styles/documentary-ugc/style.md`；
- `styles/experimental-visual/style.md`。

Combat 不新增一级 Style；“怎么打”由 Combat Choreography + specialist + Profile 决定，“画面长什么样”继续由现有 Style 决定。

---

## 9. 模型适配路由

读取：`models/index.md`

正式模型范围：

- 用户未指定模型：`models/generic.md`；
- 用户明确使用 Seedance 2.0：`models/seedance-2.md`；
- 用户明确使用 LTX-2.3：`models/ltx-2-3.md`。

不创建或加载其他模型适配页。

### Combat Capability Contract

模型页可向 Choreography 提供：

- Motion Complexity Capacity；
- Multi-character Stability；
- Contact / Interaction Fidelity；
- Spatial Continuity；
- Camera Complexity Capacity；
- Temporal / Prompt Following。

没有可靠证据时标记 `Unverified`，禁止伪造等级。

Model Adapter 只改变执行路径 / 表达，不偷改 Combat Intent / Coverage / 观看目标。

---

## 10. 输出合同路由

模式合同二选一：

- 默认快速模式：`../assets/templates/mode-quick-output-contract.md`；
- 用户明确共创：`../assets/templates/mode-interactive-output-contract.md`。

主交付模板：

- 单镜头：`../assets/templates/single-shot-video-template.md`；
- 多镜头 / 多片段 / 故事板：`../assets/templates/multi-shot-video-template.md`。

按需补读：

- 多模态职责：`../assets/templates/multimodal-reference-template.md`；
- 模型转换：`../assets/templates/model-adapted-output-template.md`。

Combat 不建立独立 single-shot / multi-shot 模板。

Quick / Interactive 共用同一 Combat Planning Graph 和质量标准：

- Quick = Full Planning + Silent Resolution；
- Interactive = 同一 Planning Graph + Decision Exposure Policy。

Final Combat Prompt 遵循：

> **State Machine Internalized, Choreography Externalized.**

动作语言、Contact / Reaction / Consequence 和空间变化占主体；状态术语和 Negative 只做必要支撑。

---

## 11. 失败诊断

读取：`diagnostics/index.md`

只有用户反馈失败、多个维度同时失效或难以定位根因时进入。

### Combat 三类专项路由

- `diagnostics/combat-state-continuity-failure/diagnostic.md`：打得不对 / 状态链接不上；
- `diagnostics/combat-choreography-underfill/diagnostic.md`：Coverage / Exchange 明显不足、打得太少；
- `diagnostics/combat-contact-solidity-failure/diagnostic.md`：Contact 发生但受力 / 压力 / 兵器 / 材质后果不可信。

人体穿模、普遍失重、Camera Chaos、音画错位等继续使用对应通用 Diagnostic。

每次只选择一份主 Diagnostic，正常生成不提前加载诊断层。

---

## 12. 运行规则

- 同一轮只选择一份主 input 和一条主 task 路线；
- 同一叶子文件被多个入口命中时只读取一次；
- 主体运动、镜头运动、环境变化和声音事件分别判断；
- Combat 内部 Action / Camera / Audio 协同，但 Camera / Audio 不能替代 Choreography；
- Combat 遵循 `Clarity Through Structure, Not Action Reduction`；
- 多模态素材必须分配职责，禁止平均融合；
- 一段视频必须有开始、推进和落点；默认生产单元 15 秒，细节靠结构密度而不是加长片长；
- 全局固定项只写一次，动态部分只写变化；
- 负向限制只针对当前最危险失败模式；
- 同一镜头的画面、动作、光色、镜头写细不是过载；只有指定时长里独立主事件过多才提醒用户，不得自动压缩细节；
- 不一次性读取整个目录；
- 不把研究区 / source-cases 原始资料作为默认运行期 Reference。

---

## 13. 创作自由与约束边界

尤其在 Combat 中遵守：

> **约束错误，不约束创作。**  
> **Clarity Through Structure, Not Action Reduction.**

固定的是：

- 因果；
- 连续性；
- 状态继承；
- Contact 质量合同；
- Coverage / Sufficiency 兑现；
- Output 完整度。

不固定：

- Battle Beat 数量；
- Action Phrase 数量；
- 具体招式；
- Signature Moment 具体答案；
- 镜头模板；
- Golden Scenario 动作答案。

用户已有明确创意时，优先保留用户设计，只修正不可执行、无因果、空间断裂、物理矛盾、Choreography Underfill 与 Prompt 过载部分。

---

## 14. 回归与研究边界

V2 静态与成片回归：`../docs/action-combat-video-v2-regression.md`。

Golden Scenario 锁 Quality / Failure Contract，不锁固定动作答案。

Model Combat Capability 长期由真实 Golden Benchmark 校准；没有实测时不得写成已验证能力。

旧 V1 文档可作为历史基线保留，但现行运行期真源以 V2 Task / Controls / Libraries / Models / Diagnostics 为准。
