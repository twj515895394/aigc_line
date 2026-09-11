# 用户整理资料 Phase 1 验证

## 1. 批次信息

- 批次名称：通用镜头、电影光影、电影色调和电影画面语言
- 对应 Phase：1
- 来源：用户整理资料（2026-07-10）
- 实施日期：2026-07-10

## 2. 正式产物

### 新增叶子

- `references/controls/composition-camera/shot-angle-lens-selection.md`
- `references/controls/lighting-color/cinematic-lighting-patterns.md`
- `references/libraries/lighting-color/cinematic-color-palettes.md`
- `references/styles/cinematic/film-still-language.md`

### 更新索引

- `references/controls/composition-camera/index.md`
- `references/controls/lighting-color/index.md`
- `references/libraries/lighting-color/index.md`
- `references/styles/cinematic/index.md`

## 3. 职责边界验证

### 镜头控制

`shot-angle-lens-selection.md` 只回答景别、机位、焦段感、透视和景深如何选择，不保存大量题材风格或固定构图模板。

结论：通过。

### 光影控制

`cinematic-lighting-patterns.md` 只回答光源动机、方向、阴影、高光、色温和主体分离如何控制，不复制 18 种色调长名单。

结论：通过。

### 色调资料库

`cinematic-color-palettes.md` 保存可选择的色调方案、适用题材和风险，不代替灯光控制方法。

结论：通过。

### 电影风格

`film-still-language.md` 回答电影剧照和影视叙事画面如何实现，并把具体镜头、灯光和色调下钻到唯一真源。

结论：通过。

## 4. 路由验证

### 4.1 正常命中：普通人物写真需要镜头补全

请求示例：

> 一个都市女性站在咖啡店窗边，帮我补充合适的镜头参数，不需要电影风格。

预期：

```text
input：text-input-expansion
task：finished-image
control：shot-angle-lens-selection
style：不加载 film-still-language
```

结果：索引条件支持该路由。

结论：通过。

### 4.2 正常命中：电影剧照

请求示例：

> 做一张雨夜都市电影剧照，人物隔着玻璃看见旧爱。

预期：

```text
input：text-input-expansion
task：finished-image
style：film-still-language
controls：按需加载镜头与电影灯光
library：需要明确色调方案时加载 cinematic-color-palettes
```

结果：电影风格页负责叙事画面，具体镜头、灯光和色调均有独立下钻路径。

结论：通过。

### 4.3 独立命中：只选择色调

请求示例：

> 这张图适合什么电影色调？给我几种方向，不分析灯位。

预期：

```text
library：cinematic-color-palettes
control：不强制加载 cinematic-lighting-patterns
```

结果：lighting-color library 索引明确允许独立读取色调选择器。

结论：通过。

### 4.4 专用叶子优先：办公室普通混合光

请求示例：

> 普通办公室随手拍，窗边自然光和冷白顶灯混合，不要电影布光。

预期：

```text
control：office-mixed-light
不加载：cinematic-lighting-patterns
```

结果：lighting-color 索引和电影灯光叶子均明确规定专用办公室现场光优先。

结论：通过。

### 4.5 相邻任务不误加载

请求示例：

> 生成一个白底角色三视图，重点保持比例和服装一致。

不应默认加载：

- `film-still-language.md`
- `cinematic-color-palettes.md`

结果：角色资产任务没有明确电影风格或色调需要，不满足两个叶子的读取条件。

结论：通过。

## 5. 加载预算检查

典型电影剧照复杂请求：

```text
1 input
1 task
1–2 controls
0–1 library
1 style
0 diagnostic
```

仍在默认预算内。

普通人物写真和单纯色调选择不会为凑额度加载相邻叶子。

结论：通过。

## 6. 单一真源与链接检查

- [x] 通用镜头控制只有一个正式叶子
- [x] 灯光方法和色调选项已拆分
- [x] 电影风格页通过相对链接下钻，不复制完整控制正文
- [x] 四个索引只写读取条件和目标路径
- [x] 新叶子未引用 `docs/source-staging/`
- [x] 办公室专用叶子保持原有优先级

## 7. 来源处理说明

本批内容由以下用户资料提炼、重组和改写：

- `视角机位与景别选择器.md`
- `电影光影与色调选择器.md`
- `电影感Prompt拆解公式.md`
- `影视风格选择器.md`

没有把原始文件整份复制为正式叶子；混合职责已拆分为 control、library 和 style。

## 8. 验收结论

```text
状态：通过
结论：Phase 1 已完成，四个基础叶子职责清楚、路由可区分、加载预算未变化。
后续动作：进入 Phase 2，更新人物选择器、Prompt 组装和参考图反推能力。
```
