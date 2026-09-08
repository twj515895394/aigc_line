# Reference 来源登记

## 用途

本文件登记正式 Reference 所使用的外部或维护者提供资料，记录来源、许可、使用方式和对应正式文件。

它不参与运行时路由，不承载具体生图知识。

## 登记规则

每条来源至少记录来源名称、URL 或审计路径、日期、许可证或使用边界、使用方式、对应正式 Reference、直接引用情况和修改说明。

新增正式 Reference 或大幅更新现有叶子时，应同步更新本文件。

---

## 用户整理资料（2026-07-10）

- 来源名称：仓库维护者整理的生图知识资料，共 15 份 Markdown
- 来源审计：`../docs/source-audits/user-curated-2026-07-10.md`
- 最终迁移映射：`../docs/source-audits/user-curated-2026-07-10-final-mapping.md`
- 接收日期：2026-07-10
- 使用边界：由仓库维护者直接提供；第三方来源证据仍需逐项核实
- 使用方式：查重、结构提炼、规则改写、现有叶子增补和必要新叶子提炼
- 清理状态：15 份原始资料已完成迁移或明确不采用；临时 `source-staging` 已在 Phase 10 删除，原始内容继续由 Git 历史追踪
- 当前状态：Phase 1–4 已完成并最终收口

### Phase 1

- `controls/composition-camera/shot-angle-lens-selection.md`
- `controls/lighting-color/cinematic-lighting-patterns.md`
- `libraries/lighting-color/cinematic-color-palettes.md`
- `styles/cinematic/film-still-language.md`

验证：`../docs/source-audits/user-curated-2026-07-10-phase-1-validation.md`

### Phase 2

- `libraries/human/hairstyle-selector.md`
- `libraries/human/expression-selector.md`
- `controls/pose-action/lifestyle-micro-expression.md`
- `inputs/single-image-reference.md`
- `tasks/prompt-reverse-engineering/playbook.md`

验证：`../docs/source-audits/user-curated-2026-07-10-phase-2-validation.md`

### Phase 3

- `controls/identity-consistency/character-identity-anchors.md`
- `controls/spatial-blocking/staging-and-direction-control.md`
- `libraries/composition-shot/storyboard-board-types.md`
- `tasks/character-assets/playbook.md`
- `tasks/scene-assets/playbook.md`
- `tasks/storyboard-assets/playbook.md`

验证：`../docs/source-audits/user-curated-2026-07-10-phase-3-validation.md`

### Phase 4

- `styles/photography/lifestyle-candid-photography.md`
- `styles/photography/index.md`

决策记录：`../docs/source-audits/user-curated-2026-07-10-phase-4-style-migration-decisions.md`

验证：`../docs/source-audits/user-curated-2026-07-10-phase-4-validation.md`

### 未形成新叶子的资料

- 妆容资料：现有正式叶子已覆盖；
- 基础 Prompt：由运行层、输入层、任务层和组装控制承担；
- 人物写真：由正交人物、镜头、光影和摄影风格组合承担；
- 综合生图风格选择器：只作为迁移来源。

## awesome-gpt-image-2

- 来源名称：Awesome GPT Image 2 Prompts
- 来源 URL：`https://github.com/YouMind-OpenLab/awesome-gpt-image-2`
- 来源画廊：`https://youmind.com/gpt-image-2-prompts`
- 来源审计：`../docs/source-audits/awesome-gpt-image-2.md`
- 访问日期：2026-07-10
- 许可证：CC BY 4.0
- 使用方式：分类抽样、案例拆解、结构提炼和规则抽象
- 直接引用策略：正式叶子不复制完整 Prompt、图片、具体品牌文案、对白或 IP 风格
- 当前状态：Phase 5–9 已完成

### Phase 5：产品营销与电商主图

抽样：`../docs/source-audits/awesome-gpt-image-2-product-commerce-sampling.md`

正式 Reference：

- `libraries/object-product/product-display-types.md`
- `controls/composition-camera/product-hero-composition.md`
- `controls/lighting-color/product-studio-lighting.md`
- `styles/photography/product-photography.md`
- `styles/3d-rendering/product-visualization.md`

验证：`../docs/source-audits/awesome-gpt-image-2-product-commerce-validation.md`

### Phase 6：海报、文字与信息图

抽样：`../docs/source-audits/awesome-gpt-image-2-poster-typography-infographic-sampling.md`

正式 Reference：

- `libraries/composition-shot/poster-layout-types.md`
- `styles/graphic-design/text-image-hierarchy.md`
- `styles/graphic-design/infographic-visual-language.md`

验证：`../docs/source-audits/awesome-gpt-image-2-poster-typography-infographic-validation.md`

### Phase 7：漫画、故事板与多格连续性

抽样：`../docs/source-audits/awesome-gpt-image-2-comic-storyboard-sampling.md`

正式 Reference：

- `libraries/composition-shot/comic-panel-layouts.md`
- `styles/comic-manhwa/sequential-comic-language.md`
- `controls/identity-consistency/multi-panel-continuity.md`
- `tasks/storyboard-assets/playbook.md`（边界增补）

验证：`../docs/source-audits/awesome-gpt-image-2-comic-storyboard-validation.md`

### Phase 8：摄影、电影、人物与场景交叉验证

交叉审计：`../docs/source-audits/awesome-gpt-image-2-photography-cinematic-human-environment-cross-validation.md`

新增正式 Reference：

- `styles/photography/environmental-editorial-portrait.md`

更新：

- `styles/photography/index.md`
- `styles/photography/lifestyle-candid-photography.md`
- `styles/cinematic/film-still-language.md`

验证：`../docs/source-audits/awesome-gpt-image-2-photography-cinematic-human-environment-validation.md`

### Phase 9：插画、3D、游戏资产与长尾分类

抽样：`../docs/source-audits/awesome-gpt-image-2-long-tail-game-illustration-sampling.md`

新增正式 Reference：

- `libraries/composition-shot/game-asset-presentation-types.md`
- `styles/anime/cinematic-anime-key-visual.md`
- `styles/illustration/pixel-art-visual-language.md`
- `styles/3d-rendering/isometric-miniature-world.md`

更新：

- `libraries/composition-shot/index.md`
- `styles/anime/index.md`
- `styles/illustration/index.md`
- `styles/3d-rendering/index.md`
- `tasks/character-assets/playbook.md`
- `tasks/scene-assets/playbook.md`

验证：`../docs/source-audits/awesome-gpt-image-2-long-tail-game-illustration-validation.md`

处理说明：Phase 9 按条件启动，只沉淀游戏资产交付、动画主视觉、像素艺术和等距微缩世界。Watercolor、Oil Painting、Sketch / Line Art、Ink / Chinese Style、Chibi、Cyberpunk 和 App / Web Design 继续保留在审计层。

## Phase 10：完整性检查与清理

- 自动检查脚本：`../scripts/check_reference_integrity.py`
- GitHub Actions：`../.github/workflows/reference-integrity.yml`
- 最终行为回归：`../docs/reference-behavior-regression-final.md`
- 最终验收：`../docs/source-audits/phase-10-final-validation.md`

## 四区角色身份参考板（2026-08-19）

- 来源名称：Higgsfield AI 公开角色参考图方法示例 + 用户在对话中确认的四区版式修订
- 来源方式：用户提供公开帖子截图与文字摘录；原始帖子 URL 本次未提供
- 来源审计：`../docs/source-audits/2026-08-four-panel-character-sheet.md`
- 验证：`../docs/source-audits/2026-08-four-panel-character-sheet-validation.md`
- 接收日期：2026-08-19
- 许可证：未知
- 使用方式：只进行结构抽象、规则重写和用户确认后的版式设计；不复制第三方图片与完整 Prompt
- 正式 Reference：`tasks/character-assets/playbook.md`
- 核心修订：默认 1920×1080、22% + 22% + 56%；只有第一列正面 Body Panel 去头，第二列必须保留完整后脑与背面全身但严格不露脸；右侧为中性 / 微笑两个等高 Close-up

## 保真细节增强（2026-08-30）

- 来源名称：南鸢 nuyoah 公开长文《MJ 人像磨皮感太重？这段 Prompt 能把真实纹理补回来》
- 来源 URL：`https://x.com/nanyuan0412/status/2093512541108601334`
- 长文 URL：`https://x.com/i/article/2093511468407050240`
- 来源审计：`../docs/source-audits/2026-08-fidelity-detail-enhancement.md`
- 验证：`../docs/source-audits/2026-08-fidelity-detail-enhancement-validation.md`
- 最终映射：`../docs/source-audits/2026-08-fidelity-detail-enhancement-final-mapping.md`
- 访问日期：2026-08-30
- 许可证：未知
- 使用方式：只进行结构抽象和规则重写；不复制完整 Prompt、图片或模型排名
- 正式 Reference：`controls/realism-quality/fidelity-detail-enhancement.md`
- 同步更新：`tasks/image-editing/playbook.md`、`tasks/image-to-image/playbook.md`
- 核心修订：已有成片只补皮肤微观细节时走局部编辑；Prompt 必须同时写清允许增加、严格锁定和明确排除

## 从零生成皮肤控制（2026-08-30）

- 来源名称：南鸢 nuyoah 公开长文《为什么你加了「真实皮肤」，脸还是塑料感？》
- 来源 URL：`https://x.com/nanyuan0412/status/2084451298016202976`
- 长文 URL：`https://x.com/i/article/2083987738546888704`
- 辅助来源：近远景皮肤密度帖、皮肤纹理与胶片颗粒分层帖
- 来源审计：`../docs/source-audits/2026-08-generated-skin-control.md`
- 验证：`../docs/source-audits/2026-08-generated-skin-control-validation.md`
- 最终映射：`../docs/source-audits/2026-08-generated-skin-control-final-mapping.md`
- 访问日期：2026-08-30
- 许可证：未知
- 使用方式：只进行结构抽象和规则重写；不复制完整 Prompt 和图片
- 正式 Reference：`controls/realism-quality/anti-ai-realism.md`
- 核心修订：从零生成时把皮肤拆成纹理、高光位置、质感基调、轻微不完美和光线；不新建第三份皮肤叶子

---

## 变更记录

- 2026-07-10：建立来源登记基线。
- 2026-07-10：完成用户资料 Phase 1–4 登记。
- 2026-07-10：完成 awesome Phase 5–9 外部知识登记。
- 2026-07-10：Phase 10 建立自动检查和 CI，固化最终映射并删除临时摄取目录。
- 2026-08-19：将四区角色身份参考板沉淀到 `character-assets`，并固定“仅第一列去头、第二列完整后脑”的默认规则。
- 2026-08-30：将南鸢保真细节增强长文沉淀为 `image-editing` 的按需 control，并收窄整体图生图的质感优化边界。
- 2026-08-30：将从零生成的皮肤五变量并入 `anti-ai-realism`，与保真编辑保持正交。