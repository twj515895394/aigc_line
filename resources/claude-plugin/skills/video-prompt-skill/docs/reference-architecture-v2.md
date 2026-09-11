# Video Prompt Skill Reference 架构决策记录 v2

## 1. 文档目的

本文记录 `video-prompt-skill` 第二版 Reference 架构的已确认设计方向，作为目录整改、资料迁移、知识去重、模型适配和 `SKILL.md` 重构的统一依据。

本轮整改参考 `image-prompt-skill` 的 `refactor/reference-architecture-v2` 分支，但不会机械复制图片 Skill。视频 Skill 必须额外处理时间、运动、连续性、音画关系和模型能力差异。

---

## 2. 已确认的总方向

采用：

> 模型无关核心 + 轻量模型适配层 + 原始资料研究区。

### 2.1 模型无关核心

负责跨模型稳定成立的导演与视频生成知识：

- 输入资产理解
- 任务路由
- 时间轴与节拍
- 主体运动
- 镜头运动
- 空间调度
- 人物与场景连续性
- 表演与微表情
- 音画设计
- 风格实现
- 失败诊断
- 最终 Prompt 组装

### 2.2 轻量模型适配层

只处理模型之间确实不同的能力和语法，不复制通用知识：

- 支持的输入模态与数量限制
- 素材引用语法
- 时长与分辨率边界
- 音频、对白、口型能力
- 视频编辑、延长、参考复刻能力
- 模型特有的 Prompt 组织建议
- 不支持或高风险能力

### 2.3 原始资料研究区

用户上传文档、外部文章和社区 Prompt 不直接成为运行期 Reference。

统一经过：

```text
research/incoming
→ 来源登记
→ 内容审计
→ 去重与拆分
→ 候选沉淀
→ 正式 Reference 真源
```

---

## 3. 目标目录结构

```text
video-prompt-skill/
├── SKILL.md
├── docs/
│   └── reference-architecture-v2.md
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

Git 不保留空目录，因此整改过程中各目录以 `index.md`、`README.md` 或正式叶子文件落地。

---

## 4. 各层职责

### 4.1 `inputs/`

只负责理解输入资产，不负责具体任务执行。

预期路线：

- 纯文字输入
- 单张图片
- 多张图片
- 单个视频
- 多个视频
- 音频
- 图片 / 视频 / 音频混合输入

输入层重点解决素材职责绑定，而不是平均融合：

- 首帧、尾帧、关键帧
- 人物、服装、场景、道具
- 动作、运镜、节奏、特效
- 音色、对白、BGM、环境音

### 4.2 `tasks/`

负责“当前要完成什么”和“最终应如何交付”。每次只读取一份主任务 Playbook。

首批候选任务：

- 文生视频
- 图生视频
- 多参考图生视频
- 视频参考复刻
- 视频转视频
- 视频局部编辑
- 视频向前 / 向后延长
- 音频驱动视频
- 音乐卡点视频
- 多镜头 / 多片段视频
- 故事板到视频

最终任务数量应以执行差异为准，不因题材不同复制任务。

### 4.3 `controls/`

负责“怎么判断、怎么协调、怎么控制”。

首批核心方向：

- timeline-rhythm：时间轴、节拍、起承转合、收尾
- subject-motion：主体运动、重心、物理反馈
- camera-direction：景别、机位、运镜、焦点变化
- spatial-blocking：站位、动线、视线、空间关系
- continuity-consistency：身份、服装、场景、道具、动作连续性
- performance-expression：表演、微表情、呼吸、口型
- audio-visual-sync：对白、音效、BGM、卡点、音画同步
- reference-binding：多模态素材职责和冲突处理
- prompt-assembly：信息优先级、压缩、输出组装
- realism-quality：去 AI 感、物理可信、自然设备感

### 4.4 `libraries/`

负责“有哪些具体选项和详细资料”，不代替控制规则。

首批候选领域：

- camera-shot：景别、机位、运镜术语
- action-motion：动作节拍、打击帧、追逐、运动
- performance-expression：表情、微表情、对白表演
- transition-effects：转场、视觉特效、变形、匹配剪辑
- lighting-color：光影、色调、天气、时间变化
- audio-sound：对白、环境音、拟音、BGM 结构
- genre-patterns：短剧、漫剧、广告、纪录、动作等题材方案

### 4.5 `styles/`

负责某种视频风格如何被执行，不只罗列风格名。

候选分类：

- cinematic-live-action
- realistic-short-drama
- anime-animation
- comic-motion-drama
- commercial-advertising
- documentary-ugc
- experimental-visual

### 4.6 `models/`

只放模型特有差异。

每个模型适配页统一回答：

1. 何时使用该适配页
2. 输入模态与限制
3. 支持的任务能力
4. 素材引用语法
5. 推荐 Prompt 结构
6. 通用核心如何转换
7. 已知限制与高风险项
8. 信息来源与更新时间

禁止把通用运镜、动作、风格知识复制到多个模型目录。

### 4.7 `diagnostics/`

只在用户反馈失败或多个维度同时失效时读取。

候选方向：

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

---

## 5. Reference 加载原则

默认流程：

```text
SKILL.md 判断模式与任务
→ references/index.md
→ 1 份 input
→ 1 份 task
→ 0-3 份 controls
→ 0-2 份 libraries
→ 0-1 份 style
→ 0-1 份 model adapter
→ 失败时 0-1 份 diagnostic
→ 1 份输出合同
```

规则：

- 分类索引只负责路由，不复制叶子正文。
- 同一知识只有一个正文真源。
- 同一文件被多个入口命中时只读取一次。
- 模型适配页不默认读取；用户指定模型或模型能力影响结果时才读取。
- 不为了“全面”把整个资料库塞入上下文。

---

## 6. 与旧结构的迁移关系

旧结构中的有效内容不直接删除，先审计后迁移：

- `mode-quick/`、`mode-interactive/`：核心规则回收进 `SKILL.md` 和模式输出合同
- `input-text-only/`、`input-image-ref/`：迁移到 `inputs/`
- `task-text-to-video/`、`task-image-to-video/`：迁移到 `tasks/`
- `timeline/`、`continuity/`、`style-control/`：按职责迁移到 `controls/`
- `appendix/`：拆入 `libraries/`、`styles/` 或 `controls/`
- `output-*`：统一收敛到 `assets/templates/`

在新索引和新任务链路验证前，不删除旧文件。

---

## 7. 资料沉淀规则

每份原始资料必须先登记：

- 来源
- 获取日期
- 类型
- 可信度
- 许可证或使用注意
- 可沉淀主题
- 与现有 Reference 的重叠关系
- 处理状态

处理状态统一使用：

- `incoming`
- `reviewing`
- `extracted`
- `merged`
- `rejected`
- `archived`

不得将社区案例的具体人物、剧情和长 Prompt 原样复制为通用规则。应提炼结构、变量、适用条件和失败边界。

---

## 8. 当前已确认与待确认

### 已确认

- 采用模型无关核心 + 轻量模型适配层
- 保留原始资料研究区
- 参考图片 Skill 的正交分层和单一真源原则
- 视频特有的时间、运动、连续性、音画层必须成为一等结构

### 待确认

- 第一批正式支持的模型适配范围
- 第一批任务 Playbook 的最终边界
- 是否保留“默认主版本 + 备选版本”的输出规则

本文只记录大方向。细节在实际迁移中按“能推断不追问、只有重大分叉才确认”的方式推进。
