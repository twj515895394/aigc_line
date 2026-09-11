# awesome-gpt-image-2 产品营销与电商主图批次验证

## 1. 批次信息

- 对应 Phase：5
- 来源：`YouMind-OpenLab/awesome-gpt-image-2`
- 实施日期：2026-07-10
- 抽样审计：`awesome-gpt-image-2-product-commerce-sampling.md`

## 2. 正式产物

### 新增叶子

- `references/libraries/object-product/product-display-types.md`
- `references/controls/composition-camera/product-hero-composition.md`
- `references/controls/lighting-color/product-studio-lighting.md`
- `references/styles/photography/product-photography.md`
- `references/styles/3d-rendering/product-visualization.md`

### 更新索引

- `references/libraries/object-product/index.md`
- `references/controls/composition-camera/index.md`
- `references/controls/lighting-color/index.md`
- `references/styles/photography/index.md`
- `references/styles/3d-rendering/index.md`

## 3. 职责边界验证

- 展示类型只回答有哪些产品展示方式；
- Hero 构图只回答主体占比、角度、动线和文案安全区如何控制；
- 产品灯光只回答材质、高光、反射、轮廓和阴影如何控制；
- 产品摄影只回答真实商业摄影如何呈现；
- 3D 产品可视化只回答 CGI、爆炸图、剖面和手办如何实现。

结论：五个叶子边界清楚，没有复制同一正文。

## 4. 路由验证

### 4.1 白底电商主图

请求：为一只哑光黑陶瓷杯生成白底电商主图，准确展示杯口、把手和釉面。

预期：

```text
task：finished-image
library：product-display-types
control：product-hero-composition + product-studio-lighting
style：product-photography
```

结果：通过。

### 4.2 奢侈品美妆主视觉

请求：深酒红背景，低角度拍一瓶护手霜，玻璃台座和少量水滴，保留标题区。

预期：

- 低角度 Hero；
- 产品材质和标签区域受控；
- 台座接触和反射可信；
- 文案区不被水滴与高光干扰。

结果：通过。

### 4.3 动态饮料广告

请求：能量饮料罐斜向悬浮，果片、冰块和液滴沿同一方向爆发。

预期：

- 产品保持第一视觉中心；
- 动态元素不遮挡标签；
- 金属罐有受控高光和轮廓光；
- 悬浮存在软阴影或空间依据。

结果：通过。

### 4.4 食品广告

请求：高端黑巧克力广告，表现断面、融化质感和大理石台面，并留品牌区。

预期：

```text
style：product-photography
control：product-studio-lighting
不必加载：3d product visualization
```

结果：通过。

### 4.5 爆炸图

请求：展示耳机内部结构，部件沿垂直轴线展开，保持真实比例和顺序。

预期：

```text
library：product-display-types
style：product-visualization
control：按需加载 product hero / studio lighting
```

结果：通过。

### 4.6 手办展示

请求：动漫手办与黑色底座、透明支撑杆和夹具同框，严格保持三个支撑元素。

预期：

- 进入 3D 产品可视化；
- 明确数量、位置和连接关系；
- 不将手办当真人摄影。

结果：通过。

### 4.7 产品摄影与 3D 边界

请求：真实相机拍摄的行李箱电商图。

预期：`product-photography`，不加载 `product-visualization`。

请求：透明剖面显示行李箱内部结构。

预期：`product-visualization`。

结果：通过。

### 4.8 相邻人物任务不误加载

请求：普通生活化人物写真。

不应加载五个产品叶子。

结果：读取条件均要求明确产品、电商、广告或结构展示目标，结论通过。

## 5. 加载预算检查

典型产品广告：

```text
1 input
1 task
1–2 controls
1 library
1 style
0 diagnostic
```

仍在默认预算内。

产品展示类型和产品 style 不要求同时加载 3D 与 photography；两条风格路线通常互斥。

## 6. 来源与许可检查

- [x] 已记录来源仓库、访问日期和 CC BY 4.0
- [x] 已建立代表案例抽样审计
- [x] 未复制完整 Prompt
- [x] 未复制生成图片
- [x] 未复制具体品牌广告文案
- [x] 正式内容均为跨案例抽象和中文改写
- [x] 未将 GPT Image 2 专属能力描述写入通用叶子

## 7. 结构检查

- [x] 五个分类索引只写读取条件和路径
- [x] 新叶子未引用临时摄取目录
- [x] 未新增一级任务
- [x] 未修改 finished-image Playbook 和模板
- [x] 未形成第二份正文真源

## 8. 验收结论

```text
状态：通过
结论：Phase 5 已完成。产品营销与电商主图获得展示、构图、灯光、摄影和 3D 可视化五个正交能力。
后续动作：进入 Phase 6，抽样海报、文字、缩略图和信息图案例。
```
