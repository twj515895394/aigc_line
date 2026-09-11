# awesome-gpt-image-2 海报、文字与信息图批次验证

## 1. 批次信息

- 对应 Phase：6
- 来源：`YouMind-OpenLab/awesome-gpt-image-2`
- 实施日期：2026-07-10
- 抽样审计：`awesome-gpt-image-2-poster-typography-infographic-sampling.md`

## 2. 正式产物

### 新增叶子

- `references/libraries/composition-shot/poster-layout-types.md`
- `references/styles/graphic-design/text-image-hierarchy.md`
- `references/styles/graphic-design/infographic-visual-language.md`

### 更新索引

- `references/libraries/composition-shot/index.md`
- `references/styles/graphic-design/index.md`

## 3. 职责边界验证

- `poster-layout-types.md` 只保存海报、封面、Banner 和缩略图的可选版式；
- `text-image-hierarchy.md` 只保存文字角色、图文主次、可读性和阅读顺序；
- `infographic-visual-language.md` 只保存信息关系、模块、图标、数据和视觉结构。

缩略图被视为高压缩海报版式，不建立独立重复叶子。

结论：通过。

## 4. 路由验证

### 4.1 人物活动海报

请求：制作一张竖版活动海报，人物偏右，左侧放主标题、时间和地点。

预期：

```text
task：finished-image
library：poster-layout-types
style：text-image-hierarchy
```

结果：通过。

### 4.2 产品发布海报

请求：产品居中，顶部标题，右下角卖点和 Logo，背景保持简洁。

预期：

- 海报版式负责图文区域；
- 文字层级负责标题、卖点和品牌信息；
- 产品构图和灯光按需加载 Phase 5 叶子。

结果：通过。

### 4.3 YouTube 缩略图

请求：16:9 视频封面，一个惊讶人物和一个核心标题，手机缩小后仍清楚。

预期：

```text
library：poster-layout-types / 缩略图高压缩
style：text-image-hierarchy
不新增：thumbnail 独立 style
```

结果：通过。

### 4.4 教育流程信息图

请求：用五步流程解释模型部署，从左到右，步骤有图标和短说明。

预期：

```text
style：infographic-visual-language
style：按需加载 text-image-hierarchy
```

信息关系先确定为流程，再决定箭头、节点和模块。

结果：通过。

### 4.5 方案对比图

请求：左右对比两个方案，包括成本、周期、风险和适用场景。

预期：选择双栏或比较矩阵，不使用无意义流程箭头。

结果：通过。

### 4.6 数据来源约束

请求：生成一张市场增长数据图，但没有提供具体数据。

预期：

- 不虚构准确数字；
- 使用占位字段或要求用户数据；
- 明确示意值不能作为事实。

结果：通过。

### 4.7 精确长文本

请求：在一张信息图中准确放入几百字正文。

预期：

- 说明一次生图不适合精确长文本；
- 优先生成无字结构图；
- 使用后期排版或 image-editing 文字修改。

结果：通过。

### 4.8 相邻任务不误加载

请求：生成一张无文字的电影剧照。

不应默认加载：

- poster-layout-types；
- text-image-hierarchy；
- infographic-visual-language。

结果：读取条件均要求明确图文或信息设计任务，结论通过。

## 5. 加载预算检查

典型海报：

```text
1 input
1 task
0–1 control
1 layout library
1 graphic-design style
```

典型信息图：

```text
1 input
1 task
0–1 composition library
1 graphic-design style
```

复杂产品海报最多按需使用 2 controls、1 product library 和 1 graphic style，仍可保持预算；不应同时加载无关摄影或电影 style。

## 6. 来源与许可检查

- [x] 已记录来源仓库、访问日期和 CC BY 4.0
- [x] 已建立分类与类型抽样审计
- [x] 未复制完整 Prompt
- [x] 未复制生成图片
- [x] 未复制具体品牌、活动或视频标题
- [x] 未声明来源字体可商用
- [x] 正式内容为跨案例抽象和中文改写

## 7. 结构检查

- [x] 两个分类索引只写读取条件和路径
- [x] 未新增一级任务
- [x] 未新增缩略图重复叶子
- [x] 未新增 UI 任务体系
- [x] 正式叶子未引用临时摄取目录
- [x] 未形成第二份正文真源

## 8. 验收结论

```text
状态：通过
结论：Phase 6 已完成。海报版式、图文层级和信息图视觉结构形成三项正交能力，并明确文字准确性和数据真实性边界。
后续动作：进入 Phase 7，抽样漫画、故事板与多格连续性案例。
```
