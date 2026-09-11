# Image Prompt Skill Reference 资源沉淀实施计划

## 1. 文档定位

本文是 Reference 架构重构完成后的新阶段实施计划，统一规划以下两类资料如何进入当前项目：

1. 仓库维护者在 2026-07-10 提供的 15 份整理资料；
2. 公开资源仓库 `YouMind-OpenLab/awesome-gpt-image-2` 中可复用的高质量知识。

本文不替代以下历史文档：

- `docs/reference-architecture-decisions.md`：已确认的架构决策；
- `docs/reference-architecture-implementation-plan.md`：Reference 架构 Phase 1–6 的实施记录；
- `.handoff/reference-architecture-and-resource-ingestion.md`：架构交接和资源沉淀原则；
- `docs/source-staging/user-curated-2026-07-10/ingestion-map.md`：用户资料的初步摄取映射。

本文负责回答：

> 在不破坏现有 Reference 架构、单一正文真源和最小加载预算的前提下，后续按什么顺序、什么标准、什么产物和什么验收条件持续沉淀新知识。

---

## 2. 当前基线

### 2.1 当前开发状态

```text
仓库：twj515895394/image-prompt-skill
分支：refactor/reference-architecture-v2
PR：#1
架构状态：Phase 1–6 已完成
当前阶段：Reference 内容扩充与外部资源摄取
```

### 2.2 不再调整的架构主干

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

继续遵守：

- 正交控制模块 + 详细资料库 + 轻量任务路由；
- Markdown 分级索引；
- 多入口路由、单文件真源；
- 索引只写读取条件和目标路径；
- 叶子 Reference 承载具体知识；
- 不建设模型适配层；
- 不引入 YAML 路由元数据；
- 默认三级、最多四级读取；
- 不为资料全面而建立空目录或万能大文件。

### 2.3 默认加载预算

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

新增 Reference 必须证明自己能够在上述预算内被明确命中，而不是仅仅“内容有价值”。

---

## 3. 本轮目标与非目标

## 3.1 总目标

建立一套可持续执行的资源摄取流程，使新资料能够被：

```text
来源登记
→ 抽样或精读
→ 知识拆解
→ 查重
→ 职责归属
→ 正式写入
→ 索引接通
→ 路由验证
→ 来源追踪
```

最终让具体生图请求以最小上下文准确加载相关知识。

## 3.2 交付目标

本轮实施完成后应具备：

1. 统一来源登记文件 `references/SOURCES.md`；
2. 两类来源的审计文档和验证文档；
3. 用户整理资料完成正式迁移、去重或明确弃用；
4. `awesome-gpt-image-2` 至少完成前三个高价值批次的沉淀；
5. 每批新增或更新 Reference 均有明确路由和验证记录；
6. 临时摄取目录不被运行时索引引用；
7. 建立 Markdown 链接检查和基础结构审计能力。

## 3.3 非目标

本轮不做：

- 不复制 `awesome-gpt-image-2` 的全部 Prompt；
- 不把外部网站分类原样重建为第二套目录；
- 不为每条 Prompt 建一个文件；
- 不批量保存外部图片；
- 不把 GPT Image 2 的营销能力描述写成通用模型事实；
- 不把模型专属参数写入通用控制层；
- 不新增一级任务类型；
- 不重做当前 Reference 架构；
- 不让正式叶子依赖 `docs/source-staging/` 中的临时文件。

---

## 4. 资料来源与许可策略

## 4.1 用户整理资料

临时位置：

```text
docs/source-staging/user-curated-2026-07-10/
├── README.md
├── ingestion-map.md
└── raw/
```

处理原则：

- `raw/` 保存原始输入，不作为运行时 Reference；
- 正式迁移前逐段查重；
- 原文中的第三方“来源证据”需要继续核实；
- 来源不清晰时，只提炼通用规则，不直接搬运完整案例或高度相似文案；
- 迁移完成后可以删除 `raw/`，长期保留审计和最终映射记录。

## 4.2 awesome-gpt-image-2

```text
来源：https://github.com/YouMind-OpenLab/awesome-gpt-image-2
许可证：CC BY 4.0
资源形态：社区 Prompt、描述、图片、作者与原始来源信息
```

使用要求：

- 在 `references/SOURCES.md` 和来源审计中记录仓库、许可证、访问日期和使用方式；
- 对直接引用或高度接近原文的内容保留作者和原始来源；
- 对规则提炼注明“已改写 / 已结构化 / 已抽象”；
- 不批量复制来源图片；
- 单个案例缺少作者或原始来源时，不沉淀完整 Prompt；
- 最终 Reference 以模型无关的视觉规律为主；
- 许可证允许改编，但仍需履行署名、许可链接和修改说明义务。

## 4.3 来源登记产物

Phase 0 必须先建立：

```text
references/SOURCES.md
docs/source-audits/user-curated-2026-07-10.md
docs/source-audits/awesome-gpt-image-2.md
```

后续每批验证分别记录：

```text
docs/source-audits/user-curated-2026-07-10-validation.md
docs/source-audits/awesome-gpt-image-2-<batch>-validation.md
```

---

## 5. 统一知识摄取流水线

每一批资料必须完整经过以下 Gate，不允许从原始资料直接跳到正式 Reference。

## Gate 1：定义真实问题

每个候选知识单元先回答：

1. 它解决什么真实生图问题？
2. 用户在什么请求条件下会需要它？
3. 不加载它会产生什么具体失败？

无法回答时，不进入正式 Reference。

## Gate 2：来源和版权检查

记录：

- 来源名称和 URL；
- 原作者与原始来源；
- 许可证或可用范围；
- 是否包含直接引用；
- 是否进行了结构提炼或改写；
- 是否涉及图片、品牌、人物肖像或其他附加权利。

## Gate 3：抽样或精读

### 用户资料

15 份文件全部精读，但不默认全部形成新叶子。

### 大型外部资源

每个分类采用两级抽样：

```text
初筛：20–30 个案例
→ 深读：8–12 个代表案例
→ 提炼：3–7 个稳定共性知识单元
→ 正式产出：通常 1–5 个叶子或现有叶子增补
```

抽样优先覆盖：

- 不同主体；
- 不同构图和镜头；
- 不同材质和光线；
- 有文字与无文字；
- 写实与风格化；
- 成功机制不同的案例；
- 具有失败修复价值的案例。

## Gate 4：案例拆解

每个代表案例拆为：

```text
任务目标
主体结构
空间与构图
镜头关系
光影与色彩
材质与风格
文字与排版
限制项
可替换槽位
适用范围
失败风险
```

不把完整案例 Prompt 直接作为 Reference 正文。

## Gate 5：查重与职责归属

先查：

- 当前任务 Playbook 是否已经解决；
- controls 是否已有相同判断方法；
- libraries 是否已有相同选择器；
- styles 是否已有相同实现方法；
- diagnostics 是否已有相同故障说明；
- 是否只需更新现有叶子；
- 是否会形成第二份正文真源。

职责判定：

```text
如何判断、选择、协调、控制
→ controls/

有哪些具体选项、模板、类型和资料
→ libraries/

某种视觉风格如何实现
→ styles/

任务目标、执行顺序和输出结构
→ tasks/

只保存交付字段和版式
→ assets/templates/

跨领域综合故障
→ diagnostics/
```

## Gate 6：正式 Reference 设计

叶子至少包含：

- 解决什么问题；
- 什么时候读取；
- 核心内容；
- 联动关系或限制；
- 必要时的失败与修复。

文件名使用英文小写 kebab-case，正文中文为主，保留必要英文 Prompt 术语。

## Gate 7：路由接通

索引只新增：

- 什么时候读取；
- 读取哪个文件。

禁止把叶子正文复制到索引。

## Gate 8：验证与验收

每批至少设计：

1. 正常命中；
2. 相邻任务不应误加载；
3. 与已有 Reference 联动但不重复加载；
4. 加载数量仍在默认预算内；
5. 正式叶子不依赖临时目录；
6. Markdown 相对链接有效；
7. 新增内容没有第二正文真源。

---

## 6. 候选知识评分规则

为了避免“案例看起来漂亮就入库”，外部案例和候选知识单元按以下维度评分，每项 0–2 分：

| 维度 | 0 分 | 1 分 | 2 分 |
|---|---|---|---|
| 可复用性 | 仅单案例有效 | 可迁移到相近任务 | 可跨主体或跨题材使用 |
| 视觉因果清晰度 | 只有形容词 | 部分变量明确 | 能说明构图、光影、材质等如何影响结果 |
| 跨案例稳定性 | 仅出现一次 | 两三个案例支持 | 多个不同案例重复出现 |
| 模型无关性 | 依赖单模型参数 | 少量模型术语可剥离 | 可直接抽象为通用视觉规则 |
| 与现有库增量 | 完全重复 | 补充细节 | 填补明确缺口 |
| 来源完整度 | 来源不明 | 仓库来源明确 | 作者、原始来源和许可证完整 |

处理建议：

```text
10–12 分：优先正式沉淀
7–9 分：作为补充或等待更多案例验证
0–6 分：保留在审计记录，不进入正式 Reference
```

评分只用于筛选，不写入运行时 Reference。

---

## 7. 实施阶段总览

```text
Phase 0  来源治理与执行基线
Phase 1  用户资料：通用镜头、电影光影和电影画面语言
Phase 2  用户资料：人物选择器和 Prompt / 参考图能力增补
Phase 3  用户资料：角色、场景、分镜任务能力增补
Phase 4  用户资料：写真、女友感和综合风格拆分
Phase 5  awesome：产品营销与电商主图
Phase 6  awesome：海报、文字和信息图
Phase 7  awesome：漫画、故事板与多格连续性
Phase 8  awesome：摄影、电影、人物与场景交叉验证
Phase 9  awesome：插画、3D、游戏资产及长尾类别
Phase 10 自动检查、回归验证与临时区清理
```

每个 Phase 都是独立可审阅批次。前一阶段验收通过后再进入后一阶段；不要求一次覆盖所有外部分类。

---

## 8. Phase 0：来源治理与执行基线

## 8.1 目标

先建立来源、审计、验证和进度记录机制，不立即大规模写入 Reference。

## 8.2 实施项

1. 新建 `references/SOURCES.md`；
2. 新建两份来源审计文档；
3. 在审计文档中记录当前访问日期、许可证、作者署名要求和处理方式；
4. 建立批次状态表；
5. 核对正式目录与临时摄取区之间没有运行时链接；
6. 为后续批次定义统一验证记录结构；
7. 明确每批使用 Git Tree / Commit API 进行单个逻辑提交，避免每文件一个提交。

## 8.3 验收

- 来源登记完整；
- 许可证策略明确；
- 两类来源均有审计入口；
- 所有临时文件保持非运行时状态；
- 后续批次可以单独追踪。

---

## 9. Phase 1：用户资料——通用视觉基础能力

## 9.1 输入资料

- `视角机位与景别选择器.md`
- `电影光影与色调选择器.md`
- `电影感Prompt拆解公式.md`
- `影视风格选择器.md`

## 9.2 目标产物

优先候选：

```text
references/controls/composition-camera/shot-angle-lens-selection.md
references/controls/lighting-color/cinematic-lighting-patterns.md
references/libraries/lighting-color/cinematic-color-palettes.md
references/styles/cinematic/film-still-language.md
```

文件名是计划候选，正式写入前仍需逐段查重。

## 9.3 职责边界

### `shot-angle-lens-selection.md`

回答：景别、机位、焦段、景深如何根据任务和主体关系选择。

不承载：大量成片风格词和题材案例。

### `cinematic-lighting-patterns.md`

回答：光源方向、阴影、色温、高光与主体分离如何控制。

不承载：18 种色调长名单。

### `cinematic-color-palettes.md`

回答：有哪些稳定的电影色调方案、适用场景和风险。

不重复：光源判断方法。

### `film-still-language.md`

回答：电影剧照或影视叙事画面如何通过事件瞬间、摄影语言、光影、色彩和氛围实现。

不承载：具体镜头参数选择器和色调大全。

## 9.4 索引更新

- `references/controls/composition-camera/index.md`
- `references/controls/lighting-color/index.md`
- `references/libraries/lighting-color/index.md`
- `references/styles/cinematic/index.md`

## 9.5 验证场景

- 普通人物写真只需要镜头选择，不误加载电影风格；
- 明确电影剧照任务命中 film still + 必要 controls；
- 用户只问色调方案时命中 palette，不额外读取灯光控制；
- 办公室普通混合光仍优先命中现有 office leaf。

---

## 10. Phase 2：用户资料——人物、Prompt 与参考图能力

## 10.1 输入资料

- `女主妆容选择器.md`
- `角色发型选择器.md`
- `表情与微表情选择器.md`
- `人物外貌与写真Prompt结构.md`
- `基础Prompt结构.md`
- `图像风格提取流程.md`

## 10.2 主要处理

### 更新现有叶子

```text
references/libraries/human/female-makeup-selector.md
references/libraries/human/hairstyle-selector.md
references/libraries/human/expression-selector.md
references/controls/pose-action/lifestyle-micro-expression.md
references/inputs/single-image-reference.md
references/tasks/prompt-reverse-engineering/playbook.md
```

### 候选新增或增补

人物外貌资料先拆为：

- 人物外貌可选择的具体变量 → `libraries/human/`；
- 写真 Prompt 的组装顺序 → `controls/prompt-assembly/`；
- 写真视觉表现 → `styles/photography/`。

只有存在清晰、独立、高频路由条件时才新建叶子；否则补充现有文件。

## 10.3 重点去重

- 表情类型留在 `libraries/human/expression-selector.md`；
- 表情如何自然发生留在 `controls/pose-action/lifestyle-micro-expression.md`；
- 最终输出字段仍由任务 Playbook 决定；
- 单图输入只负责识别参考职责，不代替 Prompt 反推任务；
- 基础 Prompt 结构不建立第二套万能输出模板。

## 10.4 验证场景

- 只需要发型细化时不加载妆容和表情；
- 角色表情板命中表情选择器，生活化瞬间再按需联动微表情控制；
- 单图风格提取根据用户意图进入复现型、结构型或改造型路线；
- 成片任务仍由 finished-image Playbook 决定输出结构。

---

## 11. Phase 3：用户资料——角色、场景和分镜任务能力

## 11.1 输入资料

- `角色资产生成结构.md`
- `场景资产与空间规划.md`
- `分镜资产与image2故事版.md`

## 11.2 更新目标

```text
references/tasks/character-assets/playbook.md
references/tasks/scene-assets/playbook.md
references/tasks/storyboard-assets/playbook.md
references/controls/identity-consistency/
references/controls/spatial-blocking/
references/libraries/composition-shot/
```

## 11.3 迁移规则

### 角色资产

补充：

- 发际线、眼距、鼻梁、唇形、下巴、耳位等固定锚点；
- 推荐出图顺序；
- 鞋履、手部、配饰、道具等细节资产；
- 表情变化区域与身份稳定区域。

### 场景资产

任务流程进入 scene Playbook；三角站位、动线、视线和空间原点进入 spatial controls。

### 分镜资产

7 类 image2 故事板作为故事板任务内部选择；如版式选择资料足够独立，再补 `libraries/composition-shot/`，不新增一级任务类型。

## 11.4 验证场景

- 角色资产不会因为换装或表情变化而变脸；
- 场景图能支持后续人物调度，而不是只生成漂亮空景；
- 故事板类型选择不与视频参考帧任务混淆；
- 空间、镜头和风格控制保持按需联动。

---

## 12. Phase 4：用户资料——写真、女友感和综合风格

## 12.1 输入资料

- `女友感场景写真Prompt框架.md`
- `生图风格选择器.md`
- Phase 2 中尚未完成的 `人物外貌与写真Prompt结构.md`

## 12.2 处理策略

### 女友感写真

先补：

```text
references/styles/photography/lifestyle-candid-photography.md
```

重点增加：

- 亲近关系视角；
- 日常事件；
- 道具参与；
- 轻动作；
- 真实光线；
- 轻微不完美；
- 平台画幅适配。

仅当“女友感写真”存在独立、高频、不会与普通生活化纪实混淆的路由条件时，才新增细分叶子。

### 生图风格选择器

不原样迁移为万能页。按媒介和实现方法拆分到：

```text
styles/photography/
styles/cinematic/
styles/anime/
styles/comic-manhwa/
styles/illustration/
styles/concept-art/
styles/3d-rendering/
styles/graphic-design/
```

未获得多个案例支持的风格只保留在迁移审计，不建立正式叶子。

## 12.3 验收

- 不出现新的万能风格选择器；
- 写真、纪实、电影和插画风格边界清楚；
- 风格名均落实为构图、线条、材质、光线、色彩或渲染变量；
- 综合资料完成拆分或明确暂不采用。

---

## 13. Phase 5：awesome——产品营销与电商主图

## 13.1 抽样范围

优先组合：

```text
Use Cases：Product Marketing、E-commerce Main Image
Subjects：Product、Food / Drink、Fashion Item
Styles：Photography、3D Render、Minimalism
```

## 13.2 重点分析

- 产品展示角度与主体占比；
- Hero composition；
- 白底、场景化、悬浮、爆炸图、剖面图和组合陈列；
- 棚拍光、轮廓光、渐变背景和材质高光；
- 金属、玻璃、塑料、织物、食品等材质表现；
- 商品与文案区的视觉层级；
- 电商主图的准确性、干净度和可读性；
- 产品系列图的一致性；
- 常见失败：形态漂移、标签乱码、反光失控、背景抢主体。

## 13.3 候选产物

正式审计后从以下候选中选择 3–5 个高价值叶子：

```text
references/libraries/object-product/product-display-types.md
references/controls/composition-camera/product-hero-composition.md
references/controls/lighting-color/product-studio-lighting.md
references/styles/photography/product-photography.md
references/styles/3d-rendering/product-visualization.md
```

必要时更新：

```text
references/tasks/finished-image/playbook.md
assets/templates/finished-image-template.md
```

只有通用流程或交付字段存在明确缺口时才更新 task 或 template。

## 13.4 验证场景

- 纯白底电商主图；
- 奢侈品或科技产品主视觉；
- 食品饮料场景化广告；
- 产品爆炸图或结构展示；
- 普通人物成片不误加载产品 Reference。

---

## 14. Phase 6：awesome——海报、文字和信息图

## 14.1 抽样范围

```text
Use Cases：Poster / Flyer、Infographic / Edu Visual、YouTube Thumbnail、Social Media Post
Subjects：Text / Typography、Diagram / Chart、Abstract / Background
Styles：Graphic Design、Minimalism、3D Render、Illustration
```

## 14.2 重点分析

- 标题、副标题、正文和品牌区的层级；
- 文字区留白和主体避让；
- 网格、分栏、中心式、对角线和卡片式版式；
- 图文层级与第一视觉落点；
- 信息图中的分组、流程、标注和图例；
- 中文、英文和多语言排版风险；
- 缩略图的高对比和小尺寸可读性；
- 文字准确性与不可控内容的限制方式。

## 14.3 候选产物

```text
references/styles/graphic-design/poster-layout-systems.md
references/styles/graphic-design/typography-in-image.md
references/styles/graphic-design/infographic-visual-language.md
references/controls/composition-camera/text-image-hierarchy.md
references/libraries/composition-shot/poster-layout-selector.md
```

根据抽样结果选择必要文件，不要求全部建立。

## 14.4 验收

- 海报、信息图和缩略图共享规律只保留一份真源；
- 文字与图像控制不与普通产品构图重复；
- 正常无文字成片不会误加载 typography；
- 多语言文本的风险和修复写清楚。

---

## 15. Phase 7：awesome——漫画、故事板与多格连续性

## 15.1 抽样范围

```text
Use Cases：Comic / Storyboard
Styles：Comic / Graphic Novel、Anime / Manga、Sketch / Line Art
Subjects：Character、Group / Couple、Cityscape / Street
```

## 15.2 重点分析

- 分格数量与阅读顺序；
- 建立镜头、动作和情绪节拍；
- 对话框、旁白框、拟声字和画面避让；
- 同一角色跨格一致性；
- 道具状态与左右方向连续性；
- 动作拆解和转折帧；
- 控制型故事板与风格型故事板的差异；
- 韩漫、日漫、美漫和电影分镜的实现差异。

## 15.3 候选产物

```text
references/styles/comic-manhwa/comic-panel-language.md
references/styles/comic-manhwa/korean-manhwa-rendering.md
references/libraries/composition-shot/storyboard-panel-layouts.md
references/controls/spatial-blocking/multi-panel-continuity.md
```

并按需更新：

```text
references/tasks/storyboard-assets/playbook.md
```

## 15.4 验收

- 版式选择与跨格连续性分属 library 和 control；
- 故事板 Playbook 不重复保存所有漫画风格知识；
- 单张漫画成片与多格故事板路由可区分；
- 不把视频完整时序执行混入单张故事板 Prompt。

---

## 16. Phase 8：awesome——摄影、电影、人物与场景交叉验证

## 16.1 目的

该阶段不以快速新增文件为目标，而是用外部多样案例验证和补强 Phase 1–4 的用户资料沉淀。

## 16.2 抽样范围

```text
Styles：Photography、Cinematic / Film Still、Retro / Vintage
Subjects：Portrait / Selfie、Influencer / Model、Group / Couple、Architecture / Interior、Landscape / Nature、Cityscape / Street
```

## 16.3 重点任务

- 验证镜头、光影、色调和 film still 叶子的跨题材稳定性；
- 补充 portrait photography 的稳定规律；
- 验证女友感、生活化纪实和商业写真边界；
- 补环境人像、双人关系、室内建筑和街景摄影规律；
- 删除仅由单一来源支持、无法跨案例成立的规则；
- 只有明确缺口才新增叶子。

## 16.4 候选产物

```text
references/styles/photography/portrait-photography.md
```

其余优先更新 Phase 1–4 已有文件，不追求新增数量。

---

## 17. Phase 9：awesome——插画、3D、游戏资产和长尾分类

## 17.1 启动条件

只有 Phase 5–8 已验证稳定，且真实用户请求证明相关方向存在高频需求时才启动。

## 17.2 候选方向

- Watercolor；
- Oil Painting；
- Sketch / Line Art；
- Ink / Chinese Style；
- Pixel Art；
- Isometric；
- Chibi / Q-Style；
- Cyberpunk / Sci-Fi；
- Game Asset；
- Animal / Creature；
- Vehicle；
- App / Web Design。

## 17.3 处理原则

- 每个媒介至少由多个不同案例支持；
- 优先沉淀可执行的线条、笔触、材质、色彩、透视和渲染规则；
- 不把风格名称单独当作知识；
- 需求弱、重复高或模型依赖强的方向保持在审计层；
- 不一次性建立所有候选叶子。

---

## 18. Phase 10：自动检查、回归验证与临时区清理

## 18.1 自动检查

最低建立：

1. Markdown 相对链接存在性检查；
2. 索引目标路径检查；
3. 重复文件名和明显重复标题检查；
4. 正式 Reference 指向 `docs/source-staging/` 的违规检查；
5. 空叶子和只有标题文件检查；
6. 旧路径残留检查。

## 18.2 行为回归

在现有 10 类人工路由验证基础上增加：

- 产品电商；
- 海报文字；
- 信息图；
- 漫画多格；
- 电影剧照；
- 普通人物写真；
- 女友感生活照；
- 产品与人物混合广告；
- 多图风格与主体分离；
- 外部知识不应命中的反例。

## 18.3 临时区清理

用户资料全部完成以下状态之一后，方可删除 `raw/`：

- 已合并现有叶子；
- 已拆分并正式迁移；
- 已明确不采用并记录原因；
- 已保留为仅审计资料。

删除前必须确保：

- 来源审计已长期保存；
- 最终映射已更新；
- 正式叶子无临时路径依赖；
- Git 历史仍可追踪原始输入。

---

## 19. 批次产物规范

每个正式批次至少包含：

```text
1. 来源审计或审计增量
2. 新增或更新的正式 Reference
3. 对应 index.md 路由更新
4. SOURCES.md 来源映射更新
5. 批次验证文档
6. 必要的迁移映射状态更新
```

推荐一个批次形成一个逻辑提交：

```text
feat(reference): ingest <batch-name> knowledge
```

不要再次使用每个文件一个提交的方式；批量文件通过 Git blob / tree / commit API 一次提交。

---

## 20. 每批 Definition of Done

一个批次只有同时满足以下条件才算完成：

- [ ] 来源、许可证和使用方式已记录；
- [ ] 原始案例完成抽样或精读；
- [ ] 候选知识完成评分和查重；
- [ ] 每条新知识有明确真实问题和读取条件；
- [ ] 优先更新现有叶子，新增叶子有充分理由；
- [ ] controls、libraries、styles 和 tasks 职责没有混淆；
- [ ] 索引只写触发条件和路径；
- [ ] 正常命中、误加载和联动三类验证通过；
- [ ] 默认加载预算未被无理由突破；
- [ ] Markdown 路径检查通过；
- [ ] 未形成第二份正文真源；
- [ ] 正式 Reference 不依赖临时目录；
- [ ] 直接引用已保留署名，改写已说明；
- [ ] 审计文档和进度状态已更新。

---

## 21. 进度跟踪表

| Phase | 内容 | 状态 | 主要产物 |
|---|---|---|---|
| 0 | 来源治理与执行基线 | 待执行 | SOURCES、两类来源审计 |
| 1 | 通用镜头、电影光影、电影画面语言 | 待执行 | 3–4 个基础叶子 |
| 2 | 人物选择器、Prompt、参考图能力 | 待执行 | 现有叶子增补为主 |
| 3 | 角色、场景、分镜任务能力 | 待执行 | Playbook 与 controls 增补 |
| 4 | 写真、女友感、综合风格拆分 | 待执行 | 摄影风格增补与迁移结论 |
| 5 | 产品营销与电商主图 | 待执行 | 产品视觉 3–5 个高价值叶子 |
| 6 | 海报、文字和信息图 | 待执行 | 平面视觉和文字层级叶子 |
| 7 | 漫画、故事板、多格连续性 | 待执行 | 漫画风格、版式与连续性叶子 |
| 8 | 摄影、电影、人物与场景验证 | 待执行 | 现有基础叶子补强 |
| 9 | 插画、3D、游戏和长尾类别 | 条件启动 | 按真实需求沉淀 |
| 10 | 自动检查、回归和清理 | 待执行 | 检查脚本、验证报告、临时区清理 |

状态统一使用：

```text
待执行 / 进行中 / 已完成 / 阻塞 / 暂不采用
```

---

## 22. 推荐执行顺序

当前直接从以下顺序开始：

```text
1. Phase 0：建立 SOURCES 和两份来源审计
2. Phase 1：迁移通用镜头、电影光影和 film still
3. Phase 2：补现有人物与参考图叶子
4. Phase 3：补角色、场景和分镜 Playbook
5. Phase 5：开始 awesome 产品 / 电商批次
6. Phase 4：结合外部摄影案例处理写真与女友感边界
7. Phase 6–8：按批次继续
8. Phase 9：只在真实需求出现时启动
9. Phase 10：持续执行检查，最终清理临时区
```

Phase 4 与 Phase 5 的编号代表资料域，不要求机械按编号执行；产品电商批次可在人物基础迁移完成后优先开始。

---

## 23. 最终实施原则

后续所有资源沉淀都必须坚持：

> Reference 的价值不由资料数量决定，而由它是否能在正确任务、正确时机、有限上下文中解决一个明确问题决定。

每次准备新增文件前必须再次回答：

1. 现有文件是否已经解决？
2. 它到底是控制方法、具体资料、风格实现还是任务流程？
3. 用户在什么条件下会加载它？
4. 它与相邻叶子的边界是否清楚？
5. 加入后是否增加重复、错误路由或上下文负担？
6. 来源和许可是否允许当前使用方式？

只有答案明确，才进入正式 Reference。