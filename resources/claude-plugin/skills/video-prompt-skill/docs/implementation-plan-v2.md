# Video Prompt Skill Reference Architecture v2 实施计划

## 1. 文档目的

本文是 `refactor/reference-architecture-v2` 分支的实施基线，用于约束目录重构、Reference 迁移、资料沉淀、模型适配、输出模板和 `SKILL.md` 改造。

后续开发按本文阶段顺序推进。发生设计调整时，先更新本计划或架构决策文档，再修改运行期文件，避免边做边改变整体方向。

---

## 2. 已锁定范围

### 2.1 总体架构

采用：

> 模型无关核心 + 轻量模型适配层 + 原始资料研究区。

### 2.2 正式模型范围

只建设以下三层：

1. `Generic`：默认通用输出层，负责模型无关的视频导演逻辑和 Prompt 组织。
2. `Seedance 2.0`：负责多模态 `@素材` 绑定、视频参考、音频、编辑、延长和卡点等能力适配。
3. `LTX-2.3`：负责自然语言导演描述、表演节拍、图生视频运动描述和音画同步建议。

本轮不建设 Kling、Veo、Sora、Runway 等其他平台目录，也不创建空占位适配器。

### 2.3 核心任务范围

正式任务层按执行差异组织，不按题材复制：

- 文生视频
- 图生视频
- 多模态参考视频
- 视频参考复刻 / 视频转视频
- 视频局部编辑
- 视频向前或向后延长
- 音频驱动与音乐卡点
- 故事板 / 多镜头 / 多片段到视频

题材差异进入 `styles/`、`libraries/genre-patterns/` 或专项控制页，不新增重复任务 Playbook。

---

## 3. 目标目录

```text
video-prompt-skill/
├── SKILL.md
├── docs/
│   ├── reference-architecture-v2.md
│   ├── implementation-plan-v2.md
│   ├── migration-inventory.md
│   └── validation-report.md
├── references/
│   ├── index.md
│   ├── inputs/
│   ├── tasks/
│   ├── controls/
│   ├── libraries/
│   ├── styles/
│   ├── models/
│   └── diagnostics/
├── assets/
│   └── templates/
└── research/
    ├── README.md
    ├── source-manifest.md
    ├── incoming/
    └── extraction-notes/
```

Git 不保留空目录，因此每个目录通过 `index.md`、`README.md` 或正式叶子文件落地。

---

## 4. 实施原则

### 4.1 单一真源

同一知识只保留一份正文真源。多个任务可以通过索引引用同一叶子文件，但不得复制正文。

### 4.2 先并行建设，后切换入口

在以下条件同时满足前，不删除旧结构：

- 新 `references/index.md` 路由完整；
- 新任务 Playbook 覆盖现有能力；
- `SKILL.md` 已切换到新结构；
- 关键测试场景通过；
- 旧文件已完成迁移映射。

### 4.3 原始资料不直接进入运行期

所有用户资料、外部文章和社区案例先进入 `research/incoming/`，经过来源登记、内容审计、去重、抽象和拆分后，才进入正式 Reference。

### 4.4 通用核心优先

先形成跨模型稳定成立的任务、时间轴、运动、连续性、表演、音画和 Prompt 组装逻辑，再增加 Seedance 与 LTX 的薄适配。

### 4.5 控制加载预算

默认运行期读取预算：

```text
固定：
- 1 份 input Reference
- 1 份 task Playbook

按需：
- 0-3 份 controls
- 0-2 份 libraries
- 0-1 份 style
- 0-1 份 model adapter
- 失败诊断时 0-1 份 diagnostic
- 1 份输出合同
```

索引文件只负责导航，不计入业务 Reference 数量。

---

## 5. 阶段计划

## Phase 0：范围冻结与迁移盘点

### 目标

锁定本轮范围，建立可追踪的迁移清单，避免遗漏或重复建设。

### 工作项

- [x] 创建重构分支 `refactor/reference-architecture-v2`
- [x] 建立架构决策文档
- [x] 建立原始资料研究区
- [x] 导入用户提供的原始文档
- [x] 锁定模型范围：Generic + Seedance 2.0 + LTX-2.3
- [ ] 建立旧文件到新文件的迁移清单
- [ ] 标记每份原始资料的候选沉淀位置

### 验收标准

- 所有旧 Reference 均有明确的“保留、迁移、合并、拆分、删除”状态。
- 所有原始资料均在 `source-manifest.md` 中登记。
- 不存在未说明用途的新增目录。

---

## Phase 1：新架构骨架与总路由

### 目标

建立新的一级目录、分类索引、加载预算和路由顺序，但暂不切换 `SKILL.md`。

### 工作项

- [ ] 重写 `references/index.md`
- [ ] 建立 `inputs/index.md`
- [ ] 建立 `tasks/index.md`
- [ ] 建立 `controls/index.md`
- [ ] 建立 `libraries/index.md`
- [ ] 建立 `styles/index.md`
- [ ] 建立 `models/index.md`
- [ ] 建立 `diagnostics/index.md`
- [ ] 建立 Generic、Seedance、LTX 的适配页骨架

### 验收标准

- 总索引不直接复制叶子正文。
- 每个分类的职责和边界清楚。
- 从任意核心任务都能路由到唯一 input、唯一 task 和必要控制页。
- 模型适配页不复制通用知识。

---

## Phase 2：输入层与任务层

### 目标

建立完整的输入理解与任务 Playbook，使“输入是什么”和“要做什么”相互独立。

### 2.1 输入层

计划文件：

```text
references/inputs/
├── index.md
├── text-input.md
├── single-image-input.md
├── multi-image-input.md
├── video-input.md
├── audio-input.md
└── mixed-multimodal-input.md
```

重点覆盖：

- 首帧、尾帧、关键帧、角色、场景、服装、道具；
- 动作、运镜、节奏、特效参考；
- 对白、音色、BGM、环境音；
- 主参考与辅助参考职责；
- 多模态冲突裁决；
- 禁止平均融合。

### 2.2 任务层

计划文件：

```text
references/tasks/
├── index.md
├── text-to-video/
├── image-to-video/
├── multimodal-reference-video/
├── video-reference-and-video-to-video/
├── video-editing/
├── video-extension/
├── audio-driven-and-beat-sync/
└── storyboard-and-multi-shot-video/
```

每个任务 Playbook 统一包含：

1. 适用范围；
2. 输入要求；
3. 执行流程；
4. 必须锁定的变量；
5. 推荐加载的控制页；
6. 输出结构；
7. 常见失败；
8. 模型适配触发条件。

### 验收标准

- 文生视频与图生视频不共用同一任务模板。
- 多参考任务先绑定素材职责，再写 Prompt。
- 视频编辑与整体视频重做边界清楚。
- 多镜头任务明确镜间承接和跨段稳定项。

---

## Phase 3：核心控制层

### 目标

把视频特有的时序、运动、连续性、表演和音画关系建设为一等控制模块。

计划分类：

```text
references/controls/
├── timeline-rhythm/
├── subject-motion/
├── camera-direction/
├── spatial-blocking/
├── continuity-consistency/
├── performance-expression/
├── audio-visual-sync/
├── reference-binding/
├── prompt-assembly/
└── realism-quality/
```

优先迁移：

- 时间轴组装与自然收尾；
- 主体运动和镜头运动分离；
- 人物运动一致性；
- 运镜失败负向约束；
- 去 AI 视频感；
- 多模态参考职责绑定；
- Prompt 信息优先级与压缩。

### 验收标准

- 每个控制页回答“如何判断和控制”，而非只列术语。
- 同一规则不同时存在于多个控制页。
- 通用控制页不包含 Seedance 或 LTX 专属语法。

---

## Phase 4：资料库与风格层

### 目标

沉淀可选择的详细知识，同时避免把资料库当成任务流程。

### 4.1 资料库

```text
references/libraries/
├── camera-shot/
├── action-motion/
├── performance-expression/
├── transition-effects/
├── lighting-color/
├── audio-sound/
└── genre-patterns/
```

首批资料来源：

- 导演级运镜术语；
- 视角、机位、景别和焦段；
- 打击帧和动作戏结构；
- 表情与微表情；
- 电影光影与色调；
- AI 视频风格和影视风格；
- 写实电影短剧与 AI 漫剧；
- 外部高质量 Prompt 案例的结构化抽象。

### 4.2 风格层

```text
references/styles/
├── cinematic-live-action/
├── realistic-short-drama/
├── anime-animation/
├── comic-motion-drama/
├── commercial-advertising/
├── documentary-ugc/
└── experimental-visual/
```

### 验收标准

- `libraries/` 回答“有哪些可选项”。
- `styles/` 回答“某种风格如何拍出来”。
- 不以导演姓名替代可执行变量。
- 社区案例只提炼结构，不复制长 Prompt。

---

## Phase 5：模型适配层

### 目标

把通用导演方案转换成 Generic、Seedance 2.0 和 LTX-2.3 可执行输出。

计划文件：

```text
references/models/
├── index.md
├── generic.md
├── seedance-2.md
└── ltx-2-3.md
```

每个适配页统一包含：

1. 触发条件；
2. 输入模态与能力边界；
3. 支持任务；
4. 素材引用或输入表达；
5. 推荐 Prompt 结构；
6. 通用核心转换规则；
7. 高风险写法；
8. 来源与更新时间。

### 特别约束

- Generic 是默认输出协议，不伪造任何平台参数。
- Seedance 负责 `@图片 / @视频 / @音频` 的职责绑定和模型特有任务能力。
- LTX 负责自然语言导演描述、连续表演、运动延续和音画表达。
- 不创建其他模型的占位页。

### 验收标准

- 三个适配页可以接收同一份内部导演方案并输出不同组织方式。
- 模型页不复制通用运镜、动作、风格正文。
- 所有不稳定规格均带来源和更新时间。

---

## Phase 6：输出合同与 SKILL.md 切换

### 目标

统一快速模式、交互模式和不同任务的最终交付结构，并把运行入口切换到新架构。

计划模板：

```text
assets/templates/
├── mode-quick-output-contract.md
├── mode-interactive-output-contract.md
├── single-shot-video-template.md
├── multi-shot-video-template.md
├── multimodal-reference-template.md
└── model-adapted-output-template.md
```

`SKILL.md` 需要完成：

- 新任务路由；
- 新输入路由；
- 快速模式和交互模式规则；
- Reference 加载预算；
- 模型适配触发逻辑；
- 信息优先级；
- 输出前自查；
- 严禁事项。

### 验收标准

- 快速模式默认零追问并直接交付。
- 交互模式只在用户明确共创时启用，且每次只问一个关键问题。
- 默认不强制输出无价值的“备选版本”。
- 用户指定 Seedance 或 LTX 时正确加载对应适配页。
- 用户未指定模型时走 Generic。

---

## Phase 7：诊断、验证与旧结构清理

### 目标

验证新链路完整性，在有迁移证据的前提下删除旧结构。

### 7.1 诊断层

首批诊断：

- identity-drift
- motion-discontinuity
- camera-chaos
- spatial-teleportation
- anatomy-contact-failure
- physics-and-weightlessness
- lip-sync-and-dialogue-failure
- audio-visual-mismatch
- prompt-overload-and-conflict
- reference-role-conflict

### 7.2 测试场景

至少覆盖：

1. 纯文字单镜头写实视频；
2. 首帧图生视频；
3. 多图角色 + 场景 + 服装绑定；
4. Seedance 图片、视频、音频混合参考；
5. Seedance 视频编辑与延长；
6. LTX 连续表演与对白镜头；
7. 故事板转多镜头视频；
8. 动作戏与打击反馈；
9. AI 漫剧角色一致性；
10. 失败 Prompt 诊断与重写。

### 7.3 删除条件

旧文件只有同时满足以下条件才可删除：

- 已在 `migration-inventory.md` 标记新真源；
- 新真源内容覆盖旧文件有效知识；
- 新索引不再引用旧路径；
- 测试场景验证通过；
- 删除后不存在断链。

### 验收标准

- 形成 `docs/validation-report.md`。
- 所有旧文件均有迁移结果。
- 仓库内无重复真源、无失效路径、无空占位目录。

---

## 6. 进度总览

| 阶段 | 状态 | 说明 |
|---|---|---|
| Phase 0 范围冻结与迁移盘点 | 进行中 | 范围已锁定，待建立完整迁移清单 |
| Phase 1 新架构骨架与总路由 | 未开始 | 下一步执行 |
| Phase 2 输入层与任务层 | 未开始 | 依赖 Phase 1 |
| Phase 3 核心控制层 | 未开始 | 可与 Phase 2 后半并行 |
| Phase 4 资料库与风格层 | 未开始 | 依赖资料审计 |
| Phase 5 模型适配层 | 未开始 | 依赖通用核心稳定 |
| Phase 6 输出合同与 SKILL.md | 未开始 | 依赖主链路完整 |
| Phase 7 验证与清理 | 未开始 | 最终阶段 |

---

## 7. 当前执行顺序

接下来严格按以下顺序推进：

1. 建立 `docs/migration-inventory.md`；
2. 完成 Phase 0 资料与旧文件映射；
3. 建立 Phase 1 的八个分类索引；
4. 建立 Generic、Seedance、LTX 适配页骨架；
5. 再进入输入层和任务层正文迁移。

在 Phase 6 前，不切换或大幅改写现有 `SKILL.md`；在 Phase 7 验证前，不删除旧 Reference。
