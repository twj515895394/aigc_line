# 用户整理资料 Phase 4 风格迁移决策

## 1. 批次范围

本文件记录以下资料在当前 Reference 架构中的最终处理结论：

- `女友感场景写真Prompt框架.md`
- `人物外貌与写真Prompt结构.md` 中尚未处理的写真部分
- `生图风格选择器.md`

## 2. 女友感写真

### 结论

不新增 `girlfriend-style-photography.md` 或其他同义独立叶子。

### 原因

“女友感”与现有生活化纪实摄影共享相同实现机制：

- 熟悉关系中的合理拍摄位置；
- 正在发生的日常事件；
- 轻动作和克制微表情；
- 现场光；
- 手机或普通相机视角；
- 合理构图偏差与真实环境证据。

它的主要增量是关系距离、互动类型和平台画幅，不足以形成新的独立摄影媒介或实现体系。

### 正式处理

已增补：

- `references/styles/photography/lifestyle-candid-photography.md`
- `references/styles/photography/index.md`

新增内容包括：

- 同事、朋友和伴侣视角的区别；
- 亲近关系观看方式；
- 日常事件选择；
- 轻动作和微表情；
- 现场光和真实环境；
- 3:4、4:5、9:16、16:9 和 1:1 画幅使用；
- 防止漂成偷拍、商业写真或强制性感摆拍。

## 3. 人物外貌与写真结构

### 结论

不新增人物写真万能 Prompt 结构页。

### 已有归属

- 妆容：`libraries/human/female-makeup-selector.md`
- 发型：`libraries/human/hairstyle-selector.md`
- 表情：`libraries/human/expression-selector.md`
- 微表情：`controls/pose-action/lifestyle-micro-expression.md`
- 镜头：`controls/composition-camera/shot-angle-lens-selection.md`
- 电影光影：`controls/lighting-color/cinematic-lighting-patterns.md`
- 生活化写真：`styles/photography/lifestyle-candid-photography.md`
- 电影剧照：`styles/cinematic/film-still-language.md`
- 最终任务结构：对应 task Playbook 和模板。

### 原因

完整写真结构横跨人物选择、镜头控制、光影控制、摄影风格和任务输出。将其重新集中为一个叶子会形成第二套真源并增加加载负担。

## 4. 综合生图风格选择器

### 结论

`生图风格选择器.md` 只作为迁移来源，不原样进入运行时 Reference。

### 原因

该资料同时覆盖摄影、电影、动漫、漫画、插画、概念艺术、3D、平面设计、传统媒介和题材风格，无法形成单一清晰读取条件。

原样入库会导致：

- 一个叶子承担多个一级目录职责；
- 用户只需要一种风格时加载大量无关内容；
- 与 `styles/*` 形成重复真源；
- 风格名称多于可执行实现规则；
- 后续难以与外部多案例交叉验证。

### 后续分流原则

只有满足以下条件的风格方向才正式沉淀：

1. 多个不同案例支持；
2. 能拆成线条、笔触、材质、色彩、光影、透视或渲染规则；
3. 与现有叶子存在明确增量；
4. 有独立、可说明的读取条件；
5. 不依赖单一模型参数或一次性创意。

候选分流：

- 摄影 → `styles/photography/`
- 电影 → `styles/cinematic/`
- 动漫 → `styles/anime/`
- 漫画 / 韩漫 → `styles/comic-manhwa/`
- 插画与传统媒介 → `styles/illustration/`
- 概念设计 → `styles/concept-art/`
- 3D 与产品可视化 → `styles/3d-rendering/`
- 海报与信息图 → `styles/graphic-design/`

外部 `awesome-gpt-image-2` 的 Phase 5–9 将用于交叉验证这些候选方向。

## 5. 本阶段新增文件判断

```text
新增正式叶子：0
更新正式叶子：1
更新索引：1
新增审计 / 决策文档：本文件与验证文档
```

不以新增文件数量衡量 Phase 4 成果；本阶段重点是完成边界收敛和重复知识清理。

## 6. 最终结论

- “女友感”归入生活化纪实摄影唯一真源；
- 人物写真结构继续由正交 Reference 组合，不建立万能页；
- 综合风格选择器保留为迁移来源；
- 细分风格等待 `awesome-gpt-image-2` 多案例验证后再决定是否形成叶子。