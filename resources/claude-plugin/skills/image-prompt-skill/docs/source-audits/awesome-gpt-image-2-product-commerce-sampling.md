# awesome-gpt-image-2 产品营销与电商主图抽样审计

## 1. 批次范围

- 对应 Phase：5
- 来源仓库：`YouMind-OpenLab/awesome-gpt-image-2`
- 访问日期：2026-07-10
- 许可证：CC BY 4.0
- 分类范围：Product Marketing、E-commerce Main Image、Product、Food / Drink、Fashion Item、Photography、3D Render、Minimalism

本批只提炼跨案例稳定规律，不复制完整 Prompt 和生成图片。

## 2. 代表案例抽样

| 案例 | 作者 | 原始来源 | 主要分析价值 |
|---|---|---|---|
| VR Headset Exploded View Poster | wory＠ホッピング中 | X / Twitter 原帖 | 爆炸图层级、部件标注、中心结构和说明区 |
| Dramatic Low-Angle Beauty Product Photography | Snow | X / Twitter 原帖 | 低角度 Hero、玻璃台、水滴、果实、深色渐变背景 |
| Dynamic Anime Hero Figure Render | 春永睦月 Harunaga Mutsuki | X / Twitter 原帖 | 手办产品形态、底座、支撑杆、树脂塑料材质和数量限制 |
| Minimal Floating Product Shot | Al-Shamus | X / Twitter 原帖 | 悬浮展示、极简背景、软阴影、反射和主体占比 |
| Japanese Soccer Cheer Cake Ad | 来源仓库登记作者 | 来源仓库原始链接 | 食品主题造型、道具语义和庆祝场景 |
| Floating Almarai Milk Splash Ad | 来源仓库登记作者 | 来源仓库原始链接 | 液体飞溅、配料环绕、黄金乡野光线和动态广告构图 |
| Luxury Dark Chocolate Commercial Photography | Hope Ai | X / Twitter 原帖 | 食品纹理、黑色大理石、融化状态、品牌留白 |
| Professional Product Photography for GPT Image 2 | 小海豚笔记 | X / Twitter 原帖 | 产品主体、3/4 俯视、左侧柔光、轮廓光和极简背景 |
| Neon Energy Drink Product Shot | PromptLab | X / Twitter 原帖 | 对角构图、冰块、果片、液滴、铝罐材质和霓虹轮廓光 |
| Luxury Ribbed Suitcase Product Photo | 来源仓库登记作者 | 来源仓库原始链接 | 旅行箱结构、筋条、轮子、把手和奢侈品棚拍 |
| Branded Food Photo Transformation | 来源仓库登记作者 | 来源仓库原始链接 | 保留菜品结构、餐盘关系和视角，转为品牌海报 |
| Roast Rice Branding Proposal Board | Loriel.AI | X / Twitter 原帖 | 食品摄影与品牌提案、Banner、卡片矩阵和商业展示 |

完整作者、原始来源和案例正文仍以来源仓库对应条目为准。

## 3. 跨案例稳定规律

### 3.1 产品形态保真优先

高质量商业图首先固定：

- 产品轮廓；
- 比例和结构；
- 包装形状；
- 标签区域；
- 材质；
- 配件数量；
- 品牌主色；
- 可动或可拆部件关系。

创意场景、液体和光效不能覆盖产品识别。

### 3.2 Hero 构图存在稳定模式

重复出现的展示方式包括：

- 单品居中；
- 3/4 角度；
- 低角度仰拍；
- 对角线倾斜；
- 悬浮；
- 台座或玻璃基座；
- 组合陈列；
- 爆炸图；
- 包装与内容物同框；
- 主体加配料、碎片或功能部件环绕。

每种模式都需要明确主体占比、底部接触或悬浮依据、留白和第一视觉落点。

### 3.3 灯光围绕材质设计

- 金属：长条高光和清楚边缘；
- 玻璃：透射、反射和边缘控制；
- 塑料 / 树脂：柔和高光与真实表面粗糙度；
- 织物：褶皱、纤维和柔和阴影；
- 食品：湿润度、油光、蒸汽、酥脆和切面；
- 巧克力：高光、融化、断面和深色层次；
- 包装：平整表面、印刷区域和折边。

“棚拍光”不能脱离材质和背景。

### 3.4 动态元素必须服务产品

液体、果片、冰块、火花、碎屑和部件只用于：

- 解释口味；
- 表现能量；
- 展示结构；
- 强化使用场景；
- 建立运动方向。

动态元素不能遮挡品牌区、改变产品形态或变成第一主体。

### 3.5 文字和品牌区需要预留

电商和广告画面常需要：

- 标题区；
- 品牌区；
- 卖点区；
- 价格或按钮区；
- Logo 安全区；
- 负空间。

本批只记录产品画面的留白与避让；具体文字层级和排版进入 Phase 6。

## 4. 候选知识评分

| 候选知识 | 得分 | 结论 |
|---|---:|---|
| 产品展示类型 | 12 | 新增 library |
| 产品 Hero 构图 | 12 | 新增 control |
| 产品棚拍灯光 | 12 | 新增 control |
| 产品摄影实现 | 11 | 新增 photography style |
| 3D 产品可视化 | 10 | 新增 3D style |
| 食品广告独立叶子 | 8 | 暂不单独建立，先放入产品摄影的食品段落 |
| 品牌提案板 | 7 | 等待 Phase 6 图文版式批次 |
| 电商直播 UI | 6 | 不进入本批，属于 UI / graphic design 交叉任务 |

## 5. 正式产物决定

新增：

- `references/libraries/object-product/product-display-types.md`
- `references/controls/composition-camera/product-hero-composition.md`
- `references/controls/lighting-color/product-studio-lighting.md`
- `references/styles/photography/product-photography.md`
- `references/styles/3d-rendering/product-visualization.md`

更新相应分类索引。

暂不更新 `finished-image` Playbook 和模板：产品图仍属于 finished-image，现有任务结构已能承载主体、场景、镜头、光影、材质和限制项。

## 6. 改写说明

正式叶子只使用跨案例抽象出的视觉规律和重新组织后的中文表达：

- 不复制来源完整 Prompt；
- 不复制来源生成图片；
- 不复制具体品牌广告文案；
- 不将单个案例创意声明为通用规则；
- 不保留模型专属参数；
- 来源映射和许可记录保留在审计层与 `references/SOURCES.md`。