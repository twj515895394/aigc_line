# Image Prompt Skill

一个面向 AI Agent 的生图提示词技能项目。

它把用户的文字描述、单张参考图或多张参考图，转换成可直接用于生图模型的完整 Prompt，并通过分级索引按需加载镜头、光影、人物、场景、产品、漫画、游戏资产等知识。

项目重点不是堆积大量风格词，而是建立一套可维护、可扩展、可验证的 Prompt 生成体系：

```text
输入理解
→ 任务识别
→ 按需读取控制规则、选择器和风格资料
→ 组装完整 Prompt
→ 输出前自查
```

## 当前状态

- Reference 架构重构：完成
- 用户资料迁移与去重：完成
- 外部案例分批沉淀：完成
- 快速模式与交互模式：完成
- 自动完整性检查：完成
- 仓库级行为回归：通过
- 当前交付分支：`refactor/reference-architecture-v2`
- 当前 PR：[PR #1](https://github.com/twj515895394/image-prompt-skill/pull/1)

## 主要能力

### 输入类型

项目支持三种互斥输入路线：

- 纯文字描述
- 单张参考图
- 多张参考图

多图输入不会进行平均融合，而是先判断每张图片的职责，例如人物、服装、场景、构图、光影和风格分别由哪张图提供。

### 任务类型

当前支持 8 类任务：

| 任务 | 用途 |
|---|---|
| `finished-image` | 生成一张高完成度成片，如写真、产品图、海报、封面和概念图 |
| `image-to-image` | 在保留部分参考锚点的基础上整体改写画面 |
| `image-editing` | 精确替换、删除、增加、修复指定区域，或对已有成片做保真细节增强 |
| `prompt-reverse-engineering` | 从参考图中提取复现型、结构型或改造型 Prompt |
| `character-assets` | 生成三视图、表情板、换装板、角色主视觉等角色资产 |
| `scene-assets` | 生成场景总览、空景、站位图、道具关系和空间动线 |
| `storyboard-assets` | 生成关键帧、动作拆解、故事板总板和控制型分镜 |
| `video-reference-frames` | 生成图生视频使用的首帧、尾帧和关键过渡帧 |

### 已沉淀的知识方向

项目当前包含但不限于以下能力：

- 景别、机位、焦段、透视和构图选择
- 电影光影、色温、配色和电影剧照语言
- 妆容、发型、表情、微表情和通勤服装
- 人物身份、服装、道具和多格连续性
- 场景站位、动线、视线和方向控制
- 生活化纪实摄影、环境人像和产品摄影
- 产品展示、Product Hero 构图、棚拍灯光和 3D 产品可视化
- 海报版式、图文层级和信息图视觉语言
- 漫画分格、漫画视觉语言和对白区域控制
- 游戏资产交付、动画主视觉、像素艺术和等距微缩世界
- 参考图冲突、结构可读性、解剖接触和 Prompt 过载诊断
- 已有成片的保真细节增强，只补皮肤微观纹理而不重新设计人物
- 从零生成近景人像时，把皮肤拆成纹理、高光位置、半哑光基调和轻微不完美

## 两种运行模式

### 快速模式

用户没有明确要求讨论时，默认进入快速模式。

快速模式的行为是：

- 零追问
- 零人工确认
- 自动补全非关键细节
- 自动处理多图职责和信息冲突
- 单图任务只输出最终 Prompt 正文
- 不显示标题、画面概述、补全说明、限制项说明或方向摘要
- 资产任务只输出必要的 Prompt Pack

快速模式的输出合同见 [mode-quick-output-contract.md](assets/templates/mode-quick-output-contract.md)。

### 交互模式

只有用户明确要求讨论、脑暴、逐步设计或先提问时才进入交互模式。

交互模式遵循：

- 每次只问一个最关键的问题
- 每个问题同时提供推荐答案
- 沿设计树逐项确认
- 用户要求直接出最终版时立即停止追问
- 最终可输出方向摘要、完整 Prompt、备选方向和结构化资产包

交互模式的输出合同见 [mode-interactive-output-contract.md](assets/templates/mode-interactive-output-contract.md)。

## Reference 架构

项目采用“正交控制模块 + 详细资料库 + 轻量任务路由”的结构：

```text
references/
├── index.md
├── SOURCES.md
├── inputs/
├── tasks/
├── controls/
├── libraries/
├── styles/
└── diagnostics/
```

### 目录职责

| 目录 | 职责 |
|---|---|
| `inputs/` | 理解纯文字、单图和多图输入 |
| `tasks/` | 定义任务目标、执行流程和交付结构 |
| `controls/` | 定义如何判断、选择、协调和控制 |
| `libraries/` | 提供具体选项、选择器和详细知识 |
| `styles/` | 说明某种视觉风格如何实现 |
| `diagnostics/` | 处理跨任务、跨维度的综合失败诊断 |

### 默认加载预算

每次任务固定读取：

```text
1 份 input Reference
1 份 task Reference
```

按需读取：

```text
0–2 份 controls
0–2 份 libraries
0–1 份 style
0–1 份 diagnostic
```

分类索引只负责导航，不计入业务 Reference 数量。同一个叶子即使被多个入口命中，也只读取一次。

## 项目结构

```text
image-prompt-skill/
├── README.md
├── AGENTS.md
├── SKILL.md
├── references/
│   ├── index.md
│   ├── SOURCES.md
│   ├── inputs/
│   ├── tasks/
│   ├── controls/
│   ├── libraries/
│   ├── styles/
│   └── diagnostics/
├── assets/
│   ├── README.md
│   └── templates/
├── docs/
│   ├── source-audits/
│   ├── reference-architecture-validation.md
│   ├── reference-behavior-regression-final.md
│   └── quick-interactive-mode-contract-validation.md
├── scripts/
│   └── check_reference_integrity.py
├── .github/
│   └── workflows/reference-integrity.yml
└── .handoff/
    └── reference-architecture-and-resource-ingestion.md
```

## 如何使用

将整个目录作为一个 Skill 提供给支持 Markdown Skill / Agent 指令目录的运行环境，并确保入口文件为 [SKILL.md](SKILL.md)。

具体安装位置由宿主 Agent 或工具决定，本项目不绑定某一种模型或 Prompt 方言。

### 快速模式示例

用户输入：

```text
生成一张雨夜便利店门口的电影感人物照片，女孩刚从店里走出来，手里拿着透明雨伞。
```

Skill 应直接输出一份可复制的完整 Prompt，不先追问镜头、服装、灯光或颜色，也不附加解释标题。

### 交互模式示例

用户输入：

```text
我想做一组雨夜便利店人物写真，先和我讨论方向，不要直接生成。
```

Skill 会进入交互模式，每次只确认一个高影响变量，并同时给出推荐答案。

## 输出模板

结构化任务模板位于 [assets/templates](assets/templates/)。

它们只在交互模式或用户明确要求完整结构化交付时使用。快速模式不会读取这些结构化任务模板，而是直接输出最终 Prompt 或 Prompt Pack。

## 新资料如何进入项目

所有新资料必须遵循：

```text
来源登记
→ 临时隔离
→ 精读与查重
→ 职责拆分
→ 更新现有叶子或创建必要新叶子
→ 更新索引与来源登记
→ 编写验证用例
→ 运行完整性检查
→ 清理临时资料
```

详细规则、判断树和 Agent 操作流程见 [AGENTS.md](AGENTS.md)。

## 自动检查

运行：

```bash
python scripts/check_reference_integrity.py
```

检查内容包括：

- 必需架构入口
- Markdown 相对链接和索引目标
- 旧目录与临时目录残留
- 运行时对旧路径的违规引用
- 空叶子和标题缺失
- 明显重复文件名和 H1 标题
- 快速模式与交互模式输出合同是否存在

GitHub Actions 工作流位于 [reference-integrity.yml](.github/workflows/reference-integrity.yml)。

## 验证与审计

- [架构验证](docs/reference-architecture-validation.md)
- [最终行为回归](docs/reference-behavior-regression-final.md)
- [快速与交互模式合同验证](docs/quick-interactive-mode-contract-validation.md)
- [资源沉淀进度](docs/reference-resource-ingestion-progress.md)
- [Phase 10 最终验收](docs/source-audits/phase-10-final-validation.md)
- [来源登记](references/SOURCES.md)
- [维护交接说明](.handoff/reference-architecture-and-resource-ingestion.md)

## 维护原则

- 同一知识只保留一个正文真源
- 索引只负责判断何时读取哪个文件
- 优先更新现有叶子，不为目录整齐创建重复文件
- 不按题材复制整套镜头、光影和 Prompt 规则
- 不批量复制外部完整 Prompt、图片、品牌文案或 IP 风格
- 不突破默认加载预算
- 不破坏快速模式的零追问和纯 Prompt 输出合同
- 新增能力必须同时提供读取条件、相邻能力边界和回归用例

## 来源与许可

外部资料的来源、访问日期、许可和使用方式统一登记在 [references/SOURCES.md](references/SOURCES.md)。

仓库目前没有单独的项目级 `LICENSE` 文件。引入或分发新的外部资料前，应先确认其授权边界，并保留必要的来源与署名记录。