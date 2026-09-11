# awesome-gpt-image-2 插画、3D、游戏资产与长尾分类抽样审计

## 1. 批次范围

- 对应 Phase：9
- 来源仓库：`YouMind-OpenLab/awesome-gpt-image-2`
- 来源画廊：`https://youmind.com/gpt-image-2-prompts`
- 访问日期：2026-07-10
- 许可证：CC BY 4.0

本阶段是条件启动阶段，只处理具备真实需求、多案例支持、独立路由价值和非重复性的方向。

## 2. 分类规模与代表方向

来源画廊当前单列了 Game Asset、Anime / Manga、Illustration、3D Render、Chibi / Q-Style、Isometric、Pixel Art、Watercolor、Oil Painting、Ink / Chinese Style 等分类。

本批重点深读：

- Game Asset；
- Anime / Manga；
- Pixel Art；
- Isometric；
- Chibi / Q-Style；
- 3D Render。

辅助观察但暂不正式沉淀：

- Watercolor；
- Oil Painting；
- Sketch / Line Art；
- Ink / Chinese Style；
- Cyberpunk / Sci-Fi；
- Retro / Vintage。

## 3. 代表案例

| 案例 | 主要分析价值 |
|---|---|
| Game Asset - GTA VI Motorcycle Character Poster | 游戏宣传主视觉、低角度英雄构图、角色与载具共同识别 |
| Game Asset - Annoyed Chibi Sticker Sheet | 精确数量、规则网格、统一比例、表情与贴纸资产交付 |
| Game Asset - Cyberpunk Anime Heroine Megacity | 动画主视觉、角色一致性、环境尺度、发光效果和海报构图 |
| Game Asset - BIWA Fashion Character Sheet | 角色设定板、主图、剪影、表情、转面、姿态和细节研究 |
| Pixel Fighter to 3D Asset Sheet | 2D 像素参考与 3D 转换预览、资产对照表 |
| Retro Game Pixel Art Battle | 游戏截图式像素场景、战斗效果与角色可读性 |
| Moonlit Sierra-Style Castle Pixel Art | 像素环境场景、有限色板、夜景层次与建筑轮廓 |
| Voxel Chibi Cat-Ear Girl | 像素、体素和低多边形边界 |
| Luxury Miniature Dubai City Model | 等距城市模型、中心地标、道路水体和尺度模型感 |
| Isometric Micro-World Cross-Section Archive | 多层剖面、功能分区、连接结构、高信息密度和游戏场景可读性 |
| Latin American Tech Festival Poster | 等距多区域活动场景、微型人物行为和阅读路径 |
| Landscape Archive Model Template | 2D 地图与 3D 地形模型结合、档案板和地理层级 |

## 4. 跨案例稳定规律

### 4.1 游戏资产首先是交付类型，不是单一画风

Game Asset 案例同时包含：

- 宣传 Key Visual；
- 角色设定板；
- 表情 / 贴纸表；
- 像素战斗画面；
- 场景概念图；
- 2D / 3D 转换对照；
- 等距地图和微缩世界。

因此不新增万能 `game-style.md`，而是建立游戏资产交付类型选择器，再按实际媒介加载 anime、pixel art、3D 或其他 style。

### 4.2 动画主视觉有独立实现规律

稳定规律包括：

- 角色身份与服装细节优先；
- 一个明确英雄姿态或事件节点；
- 强烈前中后景；
- 场景通过小人物、建筑或载具建立尺度；
- 线稿、赛璐璐或厚涂动画渲染保持统一；
- 发光、雨水、粒子和镜头光效必须服务主体；
- 与漫画页不同，不需要分格和对白；
- 与电影剧照不同，可以更理想化、更海报化。

### 4.3 像素艺术需要真实像素结构

稳定规律包括：

- 统一逻辑分辨率；
- 禁止局部高分辨率与低分辨率混合；
- 清楚像素簇、阶梯边缘和有限色板；
- 不使用模糊抗锯齿；
- 角色、道具和特效在小尺寸下仍可辨认；
- 场景截图、精灵图、图标和像素插画需要不同构图。

### 4.4 等距微缩世界依赖空间功能

稳定规律包括：

- 30–45 度斜俯视或正交感等距视角；
- 统一建筑和道具尺度；
- 多层功能区；
- 楼梯、平台、道路、管线等连接结构；
- 道具服务功能，而不是随机堆叠；
- 主体清楚、背景退让；
- 高信息密度仍保持可读路径。

## 5. 候选知识评分

| 候选知识 | 得分 | 结论 |
|---|---:|---|
| 游戏资产交付类型 | 12 | 新增 composition-shot library |
| 动画电影级 Key Visual | 12 | 新增 anime style |
| 像素艺术视觉语言 | 12 | 新增 illustration style |
| 等距微缩世界 | 12 | 新增 3D rendering style |
| Chibi 独立 style | 8 | 暂不新增，角色比例可由人物 / 角色资产和 anime 组合承担 |
| Cyberpunk 独立 style | 7 | 暂不新增，属于题材、色彩和材质组合，不是单一媒介 |
| Watercolor 独立 style | 8 | 保留审计层，案例用途跨度较大，需后续真实请求证明 |
| Oil Painting 独立 style | 7 | 保留审计层，当前需求弱且容易成为风格名长名单 |
| Ink / Chinese Style | 8 | 保留审计层，需更细分水墨、工笔、版画等实现差异 |
| App / Web Design | 5 | 不启动，当前任务架构不是 UI 产品设计系统 |

## 6. 正式产物决定

新增：

- `references/libraries/composition-shot/game-asset-presentation-types.md`
- `references/styles/anime/cinematic-anime-key-visual.md`
- `references/styles/illustration/pixel-art-visual-language.md`
- `references/styles/3d-rendering/isometric-miniature-world.md`

更新：

- `references/libraries/composition-shot/index.md`
- `references/styles/anime/index.md`
- `references/styles/illustration/index.md`
- `references/styles/3d-rendering/index.md`
- `references/tasks/character-assets/playbook.md`
- `references/tasks/scene-assets/playbook.md`

## 7. 来源处理

- 不复制完整 Prompt、图片、品牌文字或具体 IP；
- 不使用 GTA、Pokémon、Sierra 等名称作为正式视觉规则；
- 不把游戏资产分类原样复制成第二套任务体系；
- 不把特定模型支持能力写成通用事实；
- 正式叶子均为多案例抽象、查重和中文重写。