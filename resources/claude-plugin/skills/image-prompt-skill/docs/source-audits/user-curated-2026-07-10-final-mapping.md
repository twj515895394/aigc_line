# 用户整理资料最终迁移映射（2026-07-10）

## 1. 文档用途

本文件是 15 份用户整理资料的长期迁移记录，替代临时目录中的 `ingestion-map.md`。

全部原始资料已经完成以下至少一种处理：

- 合并到现有正式叶子；
- 拆分后进入多个正交 Reference；
- 提炼为新的正式叶子；
- 明确仅作为迁移来源，不进入运行时。

临时 `docs/source-staging/user-curated-2026-07-10/` 在 Phase 10 删除；原始输入仍可通过 Git 历史追踪。

## 2. 最终映射

| 原始资料 | 最终状态 | 正式归属或处理结论 |
|---|---|---|
| 人物外貌与写真Prompt结构.md | `split-and-merged` | 人物外貌选项进入 `libraries/human/`；镜头、表情和摄影实现分别由 controls 与 photography styles 承担；不建立人物写真万能页 |
| 女友感场景写真Prompt框架.md | `merged-existing` | 融入 `styles/photography/lifestyle-candid-photography.md`；“女友感 / 男友视角”定义为亲近关系观看方式，不建立独立风格叶子 |
| 女主妆容选择器.md | `covered-existing` | `libraries/human/female-makeup-selector.md` 已覆盖；审计后不重复改写正文真源 |
| 角色资产生成结构.md | `split-and-merged` | 更新 `tasks/character-assets/playbook.md`；身份稳定方法进入 `controls/identity-consistency/character-identity-anchors.md` |
| 场景资产与空间规划.md | `split-and-merged` | 更新 `tasks/scene-assets/playbook.md`；站位、动线和方向进入 `controls/spatial-blocking/staging-and-direction-control.md` |
| 分镜资产与image2故事版.md | `split-and-merged` | 更新 `tasks/storyboard-assets/playbook.md`；故事板类型进入 `libraries/composition-shot/storyboard-board-types.md` |
| 角色发型选择器.md | `merged-existing` | 更新 `libraries/human/hairstyle-selector.md` |
| 表情与微表情选择器.md | `split-and-merged` | 表情选项进入 `libraries/human/expression-selector.md`；自然发生机制进入 `controls/pose-action/lifestyle-micro-expression.md` |
| 视角机位与景别选择器.md | `new-leaf` | 提炼为 `controls/composition-camera/shot-angle-lens-selection.md` |
| 电影光影与色调选择器.md | `split-and-merged` | 光影控制进入 `controls/lighting-color/cinematic-lighting-patterns.md`；色调方案进入 `libraries/lighting-color/cinematic-color-palettes.md` |
| 生图风格选择器.md | `migration-source-only` | 不原样进入运行时；按摄影、电影、动漫、漫画、插画、3D 和平面设计分类，由 Phase 4–9 分批验证和沉淀 |
| 影视风格选择器.md | `split-and-merged` | 稳定影视画面规律进入 `styles/cinematic/film-still-language.md`；镜头、灯光和色调继续由对应 controls / libraries 承担 |
| 基础Prompt结构.md | `covered-by-architecture` | 由 `SKILL.md`、输入 Reference、任务 Playbook、`controls/prompt-assembly/` 和任务模板共同承担；不建立第二套最终 Prompt 结构 |
| 电影感Prompt拆解公式.md | `new-leaf` | 与影视风格稳定共性整合为 `styles/cinematic/film-still-language.md` |
| 图像风格提取流程.md | `split-and-merged` | 输入识别进入 `inputs/single-image-reference.md`；复现、结构和改造路线进入 `tasks/prompt-reverse-engineering/playbook.md` |

## 3. 分阶段验证对应关系

- Phase 1：`user-curated-2026-07-10-phase-1-validation.md`
- Phase 2：`user-curated-2026-07-10-phase-2-validation.md`
- Phase 3：`user-curated-2026-07-10-phase-3-validation.md`
- Phase 4 决策：`user-curated-2026-07-10-phase-4-style-migration-decisions.md`
- Phase 4 验证：`user-curated-2026-07-10-phase-4-validation.md`

## 4. 未形成正式叶子的原因

以下三类资料没有形成同名运行时叶子：

1. **已由现有叶子覆盖**：例如妆容；
2. **跨越多个职责层**：例如人物写真、基础 Prompt 和综合风格选择器；
3. **会形成第二份正文真源**：相同知识已经存在于 task、control、library 或 style 中。

这不是资料被遗漏，而是经过查重后的明确架构决策。

## 5. 清理结论

```text
15 / 15 原始资料已完成最终映射
正式 Reference 不依赖 source-staging
长期保留来源审计与最终映射
临时 raw 与临时说明文件可删除
原始输入继续由 Git 历史追踪
```
