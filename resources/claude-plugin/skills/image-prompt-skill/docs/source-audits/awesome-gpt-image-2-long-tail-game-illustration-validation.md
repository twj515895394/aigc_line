# awesome-gpt-image-2 插画、3D、游戏资产与长尾分类批次验证

## 1. 批次信息

- 对应 Phase：9
- 来源：`YouMind-OpenLab/awesome-gpt-image-2`
- 实施日期：2026-07-10
- 抽样审计：`awesome-gpt-image-2-long-tail-game-illustration-sampling.md`

## 2. 正式产物

### 新增叶子

- `references/libraries/composition-shot/game-asset-presentation-types.md`
- `references/styles/anime/cinematic-anime-key-visual.md`
- `references/styles/illustration/pixel-art-visual-language.md`
- `references/styles/3d-rendering/isometric-miniature-world.md`

### 更新

- `references/libraries/composition-shot/index.md`
- `references/styles/anime/index.md`
- `references/styles/illustration/index.md`
- `references/styles/3d-rendering/index.md`
- `references/tasks/character-assets/playbook.md`
- `references/tasks/scene-assets/playbook.md`

## 3. 职责边界验证

- 游戏资产选择器只回答交付类型和下游用途；
- 动画主视觉只回答单幅动画 Key Visual 的视觉实现；
- 像素艺术只回答像素网格、色板、像素簇和低分辨率可读性；
- 等距微缩世界只回答等距视角、功能区、连接结构、尺度和微缩空间表现；
- 角色与场景 Playbook 负责执行顺序和输出结构。

没有建立万能 `game-style.md`。

结论：通过。

## 4. 路由验证

### 4.1 游戏角色设定板

请求：为游戏角色制作主图、三视图、表情、姿态和服装细节板。

预期：

```text
task：character-assets
library：game-asset-presentation-types / 角色设定板
control：character-identity-anchors
style：按用户要求选择，非必需
```

结果：通过。

### 4.2 动画游戏 Key Visual

请求：生成一张赛博都市中的动画女主登场主视觉，低角度、全身、宏大城市尺度。

预期：

```text
task：finished-image 或 character-assets 中的场景化主视觉
library：按需 game-asset-presentation-types / Key Visual
style：cinematic-anime-key-visual
```

不应加载漫画分格和对白规则。

结果：通过。

### 4.3 Sprite Sheet

请求：生成 8 帧像素角色跑步循环，固定脚底基线和角色尺寸。

预期：

```text
task：character-assets
library：game-asset-presentation-types / Sprite Sheet
style：pixel-art-visual-language
control：按需 multi-panel-continuity
```

结果：通过。

### 4.4 像素战斗截图

请求：复古像素战斗场景，角色、敌人和技能效果清楚。

预期：

- 统一逻辑分辨率；
- 有限色板；
- 无抗锯齿和照片纹理；
- 特效不遮挡角色轮廓；
- 不需要等距微缩世界。

结果：通过。

### 4.5 等距经营场景

请求：生成多层植物工厂微缩世界，包含生产、仓储、能源和休息区。

预期：

```text
task：scene-assets
library：game-asset-presentation-types / 等距地图或剖面
style：isometric-miniature-world
control：按需 staging-and-direction-control
```

每个区域需要功能和连接结构。

结果：通过。

### 4.6 写实城市微缩模型

请求：高端建筑模型风格的等距城市，总地标位于中心，周围道路、水体和建筑保持统一尺度。

预期：读取等距微缩世界，而不是普通产品 3D 可视化。

结果：通过。

### 4.7 普通动漫人物单图

请求：生成一张简单动漫人物头像，没有游戏、宏大环境或 Key Visual 需求。

预期：

- 可按用户要求进入 anime 分类；
- 不默认加载 game-asset-presentation-types；
- 不默认加载 cinematic-anime-key-visual；
- 不加载像素或等距风格。

结果：通过。

### 4.8 普通场景资产

请求：为真人短片设计普通办公室场景资产。

预期：使用 scene-assets、空间和办公室相关 Reference，不加载像素、等距和游戏资产类型。

结果：通过。

## 5. 加载预算检查

典型动画游戏主视觉：

```text
1 input
1 task
0–1 control
0–1 game asset library
1 anime style
```

典型像素 Sprite：

```text
1 input
1 character-assets task
1 continuity control
1 game asset library
1 pixel style
```

典型等距场景：

```text
1 input
1 scene-assets task
0–1 spatial control
1 game asset library
1 isometric style
```

均在默认加载预算内；anime、pixel 和 isometric style 互斥选择，不同时加载。

## 6. 暂不采用方向验证

以下方向保持在审计层，不进入运行时：

- Watercolor；
- Oil Painting；
- Sketch / Line Art；
- Ink / Chinese Style；
- Chibi / Q-Style；
- Cyberpunk / Sci-Fi；
- App / Web Design。

原因：需求强度不足、媒介内部差异尚未拆清、与现有叶子重复，或不属于当前图像任务体系。

## 7. 来源与结构检查

- [x] 已记录来源仓库、画廊、日期和 CC BY 4.0
- [x] 已抽样多类游戏、动画、像素和等距案例
- [x] 未复制完整 Prompt、图片、品牌文案和具体 IP
- [x] 未新增一级任务
- [x] 未建立万能游戏风格页
- [x] 四个叶子均有明确读取条件
- [x] 索引只负责路由
- [x] 正式叶子未引用临时摄取目录
- [x] 默认加载预算未突破

## 8. 验收结论

```text
状态：通过
结论：Phase 9 已按条件启动并完成。只沉淀游戏资产交付、动画主视觉、像素艺术和等距微缩世界四项高价值能力，其余长尾方向保持在审计层。
后续动作：进入 Phase 10，建立自动链接与结构检查、行为回归，并清理临时摄取区。
```
