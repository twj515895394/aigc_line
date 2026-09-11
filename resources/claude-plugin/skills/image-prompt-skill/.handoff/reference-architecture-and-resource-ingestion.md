# Image Prompt Skill Handoff

## 1. 当前状态

仓库：`twj515895394/image-prompt-skill`

当前开发分支：

```text
refactor/reference-architecture-v2
```

当前 PR：

```text
https://github.com/twj515895394/image-prompt-skill/pull/1
```

PR 状态：

- Open
- Ready for review
- 尚未合并到 `main`

本轮 Reference 架构重构的 6 个 Phase 已全部完成。

---

## 2. 已完成的核心改造

### 2.1 运行层

`SKILL.md` 已重构为运行控制器，负责：

- Skill 触发范围
- 8 类任务判断
- 文字、单图、多图输入判断
- 快速模式和交互模式规则
- Reference 路由和加载预算
- 信息优先级与冲突处理
- Prompt 组装原则
- 最低输出要求

默认加载预算：

```text
固定：
- 1 份 input
- 1 份 task

按需：
- 0–2 份 controls
- 0–2 份 libraries
- 0–1 份 style
- 0–1 份 diagnostic
```

### 2.2 当前一级 Reference 结构

```text
references/
├── index.md
├── inputs/
├── tasks/
├── controls/
├── libraries/
├── styles/
└── diagnostics/
```

职责：

- `inputs/`：理解纯文字、单图和多图输入
- `tasks/`：当前任务目标、执行流程和输出结构
- `controls/`：判断方法、控制方法、协调关系
- `libraries/`：具体选择器和详细资料
- `styles/`：视觉风格如何实现
- `diagnostics/`：跨领域失败诊断

### 2.3 输入层

```text
references/inputs/
├── text-input-expansion.md
├── single-image-reference.md
└── multi-image-reference.md
```

三条输入路线互斥。

多图路线已支持：

- 每张图职责分配
- 人物 A / B 对象绑定
- 身份、服装、场景、构图、光影、风格分离
- 参考强度
- 同维度冲突处理
- 禁止平均融合

### 2.4 任务层

```text
references/tasks/
├── finished-image/
├── image-to-image/
├── image-editing/
├── prompt-reverse-engineering/
├── character-assets/
├── scene-assets/
├── storyboard-assets/
└── video-reference-frames/
```

重要边界：

- `image-to-image`：允许整张画面多个维度共同改写
- `image-editing`：只改指定区域或对象，其他内容保持不变
- `prompt-reverse-engineering`：分为复现型、结构型、改造型
- 产品图、海报、封面等是成片输出形态，不再增加任务根目录

### 2.5 控制、资料库、风格和诊断

#### Controls

```text
composition-camera
lighting-color
pose-action
spatial-blocking
identity-consistency
reference-handling
prompt-assembly
realism-quality
```

#### Libraries

```text
human
environment
object-product
animal-creature
composition-shot
lighting-color
material-effect
```

#### Styles

```text
photography
cinematic
anime
comic-manhwa
illustration
concept-art
3d-rendering
graphic-design
```

#### Diagnostics

已建立：

- 身份一致性失败
- 人体与接触失败
- 构图可读性失败
- 风格与材质冲突
- 参考图冲突
- Prompt 过载与矛盾
- 常见图像失败模式

### 2.6 已迁移和沉淀的资料

已完成：

- 去 AI 感与照片真实感
- 抓拍构图与合理不完美
- 办公室环境资料
- 办公室纪实机位
- 办公室混合光
- 生活化纪实摄影风格
- 侧颜与自然体态
- 通勤服装与面料
- 生活化微表情
- 常见失败模式与负向约束
- 女主妆容选择器
- 发型选择器
- 表情选择器

原混合文件 `office-candid-photography.md` 已按职责拆为：

```text
libraries/environment/office-workplace-environment.md
controls/composition-camera/office-candid-camera.md
controls/lighting-color/office-mixed-light.md
styles/photography/lifestyle-candid-photography.md
```

### 2.7 输出模板

模板已经改为按任务划分：

```text
assets/templates/
├── finished-image-template.md
├── image-to-image-template.md
├── image-editing-template.md
├── prompt-reverse-engineering-template.md
├── character-assets-template.md
├── scene-assets-template.md
├── storyboard-assets-template.md
└── video-reference-frames-template.md
```

普通短任务不强制读取模板。

---

## 3. 已完成的验证

已完成 10 类人工路由验证：

1. 纯文字真人成片
2. 单图整体改写
3. 多图人物与服装组合
4. 局部物体替换
5. 角色资产
6. 场景资产
7. 分镜资产
8. 视频首尾帧
9. Prompt 反推
10. 综合失败诊断

验证文档：

```text
docs/reference-architecture-validation.md
```

当前限制：

- 尚未建立自动 Markdown 链接检查
- 尚未建立 Skill 端到端行为测试
- 当前验证主要是路径、职责、相对引用和重复真源的人工审计

---

## 4. 后续阶段的主目标

后续不再进行大规模架构调整，主任务变为：

> 持续从高质量公开资源中提炼可复用的生图知识，并按当前 Reference 架构沉淀。

外部资源不应整包复制进入仓库。

应优先提炼：

- 可复用的视觉控制规则
- 稳定的 Prompt 结构
- 高价值选择器
- 构图、镜头、光线、材质和风格实现方法
- 特定任务的执行模板
- 高频失败模式与修复方式

避免沉淀：

- 只有一次性创意价值的完整 Prompt
- 与现有知识高度重复的条目
- 只适用于单一模型、单一案例的偶然写法
- 缺少来源或版权状态不清晰的内容
- 大量图片本体

---

## 5. 第一批外部资源：awesome-gpt-image-2

目标资源：

```text
https://github.com/YouMind-OpenLab/awesome-gpt-image-2
```

截至本 handoff 编写时，该仓库 README 显示：

- 收录 GPT Image 2 社区 Prompt
- 总量约 12,269 条
- 分类覆盖用途、风格和主体
- 使用 CC BY 4.0
- 投稿要求保留作者和原始来源

主要分类可映射到当前架构：

### 用途类

- Profile / Avatar
- Social Media Post
- Infographic / Edu Visual
- YouTube Thumbnail
- Comic / Storyboard
- Product Marketing
- E-commerce Main Image
- Game Asset
- Poster / Flyer
- App / Web Design

优先映射：

```text
references/tasks/
assets/templates/
references/libraries/object-product/
references/styles/graphic-design/
```

### 风格类

- Photography
- Cinematic / Film Still
- Anime / Manga
- Illustration
- Sketch / Line Art
- Comic / Graphic Novel
- 3D Render
- Chibi / Q-Style
- Isometric
- Pixel Art
- Oil Painting
- Watercolor
- Ink / Chinese Style
- Retro / Vintage
- Cyberpunk / Sci-Fi
- Minimalism

优先映射：

```text
references/styles/
```

### 主体类

- Portrait / Selfie
- Influencer / Model
- Character
- Group / Couple
- Product
- Food / Drink
- Fashion Item
- Animal / Creature
- Vehicle
- Architecture / Interior
- Landscape / Nature
- Cityscape / Street
- Diagram / Chart
- Text / Typography
- Abstract / Background

优先映射：

```text
references/libraries/human/
references/libraries/object-product/
references/libraries/animal-creature/
references/libraries/environment/
references/libraries/composition-shot/
```

---

## 6. 外部资源沉淀流程

每一批资源必须按以下流程处理。

### Step 1：建立来源记录

建议为每个来源建立一份审计文档：

```text
docs/source-audits/<source-name>.md
```

至少记录：

```text
来源名称：
来源 URL：
访问日期：
许可证：
作者署名要求：
资源规模：
主要分类：
适合沉淀的知识类型：
不适合直接搬运的内容：
```

### Step 2：抽样，不直接全量搬运

对于大型 Prompt 仓库：

- 先按分类抽样
- 每类挑选代表性高质量案例
- 分析共性结构
- 识别哪些写法真正影响画面结果
- 不从 12,000 多条 Prompt 逐条复制

推荐首批抽样顺序：

1. Product Marketing / E-commerce Main Image
2. Poster / Flyer / Typography
3. Comic / Storyboard
4. Photography / Cinematic
5. Anime / Comic / Illustration
6. Infographic / Diagram
7. App / Web Design
8. Character / Group / Animal / Environment

### Step 3：把案例还原为知识单元

一个高质量案例需要拆成：

```text
任务目标
主体结构
空间和构图
镜头关系
光影与色彩
材质与风格
文字和排版
限制项
可替换槽位
适用范围
失败风险
```

不要把完整案例 Prompt 原封不动地当 Reference 正文。

### Step 4：判断归属

```text
如何选择、如何控制
→ controls/

有哪些可选对象、方案和资料
→ libraries/

某种视觉表现如何实现
→ styles/

具体任务流程和输出结构
→ tasks/

只保存交付字段和版式
→ assets/templates/

跨领域失败原因
→ diagnostics/
```

### Step 5：查重

新增文件前检查：

- 是否已有相同主题叶子
- 是否只需补充现有文件
- 是否会形成第二份正文真源
- 是否能由多个索引引用同一文件

默认优先更新现有叶子，不优先新建目录。

### Step 6：提炼成中文 Reference

路径和文件名：

```text
英文小写 kebab-case
```

正文：

```text
中文为主，保留必要英文 Prompt 术语
```

叶子至少说明：

- 解决什么问题
- 什么时候读取
- 核心内容
- 联动关系或限制
- 必要时的失败与修复

### Step 7：补索引路由

索引只写：

- 什么时候读取
- 读取哪个文件

不要在索引重复叶子正文。

### Step 8：验证

每批新增资料至少设计 3 类验证请求：

1. 正常命中该 Reference
2. 相邻任务不应误加载
3. 与已有 Reference 联动但不重复加载

验证结果记录到：

```text
docs/source-audits/<source-name>-validation.md
```

---

## 7. 许可证与来源要求

`awesome-gpt-image-2` 标注为 CC BY 4.0，贡献指南要求保留原作者和原始来源。

因此后续处理必须遵守：

- 记录来源仓库
- 对直接引用或高度接近原文的内容保留署名
- 尽量提炼规则，不大段复制原 Prompt
- 不把来源图片批量复制进本仓库
- 不删除原作者和来源信息后重新包装为自有内容
- 若单个案例的原始来源不明确，则不直接沉淀完整案例正文

建议新增来源登记：

```text
references/SOURCES.md
```

每条记录可包含：

```text
- 来源名称
- 来源 URL
- 许可证
- 访问日期
- 使用方式：规则提炼 / 结构提炼 / 少量引用
- 对应 Reference 文件
```

在真正开始首批外部资源迁移前，先建立该文件。

---

## 8. 推荐的首批沉淀主题

不建议一开始覆盖所有分类。

推荐优先补当前仓库较薄弱但价值较高的方向：

### A. 产品与电商视觉

建议新增或补充：

```text
libraries/object-product/product-display-types.md
controls/composition-camera/product-hero-composition.md
controls/lighting-color/product-studio-lighting.md
styles/photography/product-photography.md
styles/3d-rendering/product-visualization.md
```

### B. 海报、文字和信息图

建议新增或补充：

```text
styles/graphic-design/poster-layout-systems.md
styles/graphic-design/typography-in-image.md
styles/graphic-design/infographic-visual-language.md
controls/composition-camera/text-image-hierarchy.md
libraries/composition-shot/poster-layout-selector.md
```

### C. 漫画与故事板

建议新增或补充：

```text
styles/comic-manhwa/comic-panel-language.md
styles/comic-manhwa/korean-manhwa-rendering.md
libraries/composition-shot/storyboard-panel-layouts.md
controls/spatial-blocking/multi-panel-continuity.md
```

### D. 摄影与电影画面

建议新增或补充：

```text
styles/photography/portrait-photography.md
styles/cinematic/film-still-language.md
controls/composition-camera/lens-perspective.md
controls/lighting-color/cinematic-lighting-patterns.md
libraries/lighting-color/cinematic-color-palettes.md
```

### E. 插画与细分媒介

当前 `styles/illustration/` 只有分类入口，可优先增加：

```text
watercolor-rendering.md
oil-painting-rendering.md
sketch-line-art.md
ink-chinese-style.md
pixel-art.md
```

但应先从多个案例提炼稳定共性，再建立叶子。

---

## 9. 不建议的做法

- 不要把外部 README 复制到仓库
- 不要按外部网站分类原样重建第二套目录
- 不要为每条 Prompt 建一个 Reference
- 不要把模型营销描述当作稳定能力事实写进 Skill
- 不要把模型专属参数写入通用控制层
- 不要新增空目录或只有标题的叶子
- 不要一次读取整个外部 Prompt 集合
- 不要因为案例数量大就省略人工归类和去重
- 不要在没有来源记录时删除署名信息

---

## 10. 下一位执行者的建议起点

建议从以下步骤继续：

1. 保持当前分支，不立即调整架构
2. 新建 `references/SOURCES.md`
3. 新建 `docs/source-audits/awesome-gpt-image-2.md`
4. 从 Product Marketing / E-commerce Main Image 抽样
5. 提炼产品展示、构图、灯光、材质和文字层级规则
6. 对照现有 `tasks/finished-image` 和 `libraries/object-product`
7. 先形成 3–5 个高价值叶子 Reference
8. 补对应索引
9. 做 3 类路由验证
10. 再决定是否继续下一个分类

不要直接开始全量搬运。

---

## 11. 关键项目文档

```text
docs/reference-architecture-decisions.md
docs/reference-architecture-implementation-plan.md
docs/reference-migration-map-phase4.md
docs/reference-architecture-validation.md
.handoff/reference-architecture-and-resource-ingestion.md
```

继续开发前，先阅读上述文件。

---

## 12. 最终提醒

当前架构的重点不是“Reference 越多越好”，而是：

> 用户提出一个具体生图任务时，Skill 能以最小上下文准确加载最相关的输入、任务、控制、资料和风格知识。

后续每次资源沉淀都应回答：

1. 它解决了哪个真实问题？
2. 现有文件是否已经解决？
3. 用户在什么条件下会加载它？
4. 它应该是控制规则、资料库、风格实现还是任务流程？
5. 加入后是否增加了重复和上下文负担？

只有答案明确，才应进入正式 Reference。
