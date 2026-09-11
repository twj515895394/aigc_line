# awesome-gpt-image-2 摄影、电影、人物与场景交叉验证

## 1. 批次范围

- 对应 Phase：8
- 来源仓库：`YouMind-OpenLab/awesome-gpt-image-2`
- 访问日期：2026-07-10
- 许可证：CC BY 4.0
- 交叉范围：Photography、Portrait、Lifestyle、Cinematic、Environment、Character、Travel、Fashion Editorial

目标不是继续堆类别，而是反向验证 Phase 1–4 的既有能力是否覆盖外部案例中的稳定规律。

## 2. 被验证的现有能力

- `styles/photography/lifestyle-candid-photography.md`
- `styles/cinematic/film-still-language.md`
- `controls/composition-camera/shot-angle-lens-selection.md`
- `controls/lighting-color/cinematic-lighting-patterns.md`
- `libraries/lighting-color/cinematic-color-palettes.md`
- `controls/identity-consistency/character-identity-anchors.md`
- `controls/spatial-blocking/staging-and-direction-control.md`
- `tasks/character-assets/playbook.md`
- `tasks/scene-assets/playbook.md`

## 3. 外部案例重复规律

### 摄影人物案例

重复出现：

- 人物与真实地点共同构成身份；
- 允许轻度引导摆姿，而非完全抓拍；
- 服装、姿态、环境材质和色彩形成统一主题；
- 背景信息可读，但低于人物视觉权重；
- 光线可能经过控制，但仍像来自窗户、阴天、街灯或现场反射；
- 画面服务杂志、旅行、职业或生活方式叙事。

### 电影案例

重复规律已被现有 `film-still-language.md` 覆盖：

- 事件瞬间；
- 有动机摄影位置；
- 人物关系和空间压力；
- 有来源光线；
- 统一类型色彩；
- 具体叙事道具。

### 人物一致性案例

外部多角度、换装、角色表和连续画面案例反复要求：

- 脸部比例和发型主轮廓；
- 身体比例；
- 固定服装与道具；
- 可变表情、姿态、环境和光线。

现有身份锚点已覆盖，无需新增第二个角色一致性叶子。

### 场景案例

旅行、室内、街景和概念环境案例反复要求：

- 地点用途；
- 空间分区；
- 出入口和动线；
- 主道具；
- 镜头入口；
- 时间天气变体。

现有场景资产 Playbook 与空间调度控制已覆盖。

## 4. 发现的唯一结构空档

### 环境人像 / 编辑写真

现有两条摄影路线：

1. 生活化纪实：强调随手记录、非摆拍和合理不完美；
2. 电影剧照：强调事件、关系和叙事瞬间。

外部案例中还稳定存在第三种路线：

- 人物是明确主角；
- 允许适度引导姿态与服装；
- 环境用于说明职业、旅行、文化、生活方式或气质；
- 画面具有杂志编辑完成度；
- 不必有电影剧情事件；
- 也不要求像朋友随手抓拍。

因此新增 `environmental-editorial-portrait.md`。

## 5. 不新增的候选

| 候选 | 结论 | 原因 |
|---|---|---|
| 电影人像独立叶子 | 不新增 | 由 film still + portrait style 组合即可 |
| 旅行摄影独立叶子 | 不新增 | 旅行是题材和环境，不是统一视觉实现 |
| 城市街拍独立叶子 | 不新增 | candid 或 editorial portrait 已覆盖 |
| 人物与场景融合 control | 不新增 | scene-assets、spatial blocking 和 portrait style 已有分工 |
| 新的身份一致性叶子 | 不新增 | character identity anchors 已完整覆盖 |
| 新的场景规划叶子 | 不新增 | scene-assets playbook 已完整覆盖 |

## 6. 正式产物

新增：

- `references/styles/photography/environmental-editorial-portrait.md`

更新：

- `references/styles/photography/index.md`
- `references/styles/photography/lifestyle-candid-photography.md`
- `references/styles/cinematic/film-still-language.md`

## 7. 来源处理说明

- 未复制完整 Prompt 和图片；
- 未复制具体摄影师、杂志或品牌风格；
- 未用相机型号和空泛质量词代替视觉规律；
- 正式内容是跨案例结构抽象和中文改写。