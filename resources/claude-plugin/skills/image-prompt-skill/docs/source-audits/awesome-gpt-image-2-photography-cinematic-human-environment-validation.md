# awesome-gpt-image-2 摄影、电影、人物与场景交叉验证报告

## 1. 批次信息

- 对应 Phase：8
- 来源：`YouMind-OpenLab/awesome-gpt-image-2`
- 实施日期：2026-07-10
- 交叉审计：`awesome-gpt-image-2-photography-cinematic-human-environment-cross-validation.md`

## 2. 正式产物

### 新增叶子

- `references/styles/photography/environmental-editorial-portrait.md`

### 更新

- `references/styles/photography/index.md`
- `references/styles/photography/lifestyle-candid-photography.md`
- `references/styles/cinematic/film-still-language.md`

### 验证后保持不变

- `controls/identity-consistency/character-identity-anchors.md`
- `controls/spatial-blocking/staging-and-direction-control.md`
- `tasks/character-assets/playbook.md`
- `tasks/scene-assets/playbook.md`
- `controls/composition-camera/shot-angle-lens-selection.md`
- `controls/lighting-color/cinematic-lighting-patterns.md`
- `libraries/lighting-color/cinematic-color-palettes.md`

## 3. 三条人物摄影路线

### 生活化纪实

```text
真实关系视角
+ 正在发生的日常事件
+ 非配合或弱配合状态
+ 现场光
+ 合理不完美
```

### 环境人像 / 编辑写真

```text
人物身份与气质
+ 有意义的环境
+ 适度引导姿态
+ 统一现场光
+ 杂志编辑完成度
```

### 电影剧照

```text
可信场景
+ 具体事件瞬间
+ 人物关系或冲突
+ 有动机摄影位置
+ 类型光影和情绪落点
```

三条路线不再用“是否高级”区分，而是用人物是否配合、环境承担什么功能、是否存在剧情事件来区分。

## 4. 路由验证

### 4.1 伴侣视角生活照

请求：伴侣在咖啡店顺手拍到她低头看菜单，没有刻意摆姿。

预期：`lifestyle-candid-photography`。

结果：通过。

### 4.2 旅行环境人像

请求：在海边旧城拍一组旅行杂志人像，人物配合镜头，建筑和海风共同表达主题。

预期：`environmental-editorial-portrait`。

结果：通过。

### 4.3 职业环境肖像

请求：工匠站在工作室里，手扶工作台，表现职业身份，像人物专题报道。

预期：

```text
style：environmental-editorial-portrait
control：按需加载 pose / composition
library：按需加载 environment / clothing
```

结果：通过。

### 4.4 电影剧情瞬间

请求：雨夜争吵后，一人正准备离开，另一人握着门把没有说话。

预期：`film-still-language`，因为核心是关系变化和事件节点。

结果：通过。

### 4.5 漂移边界

请求：人物站在城市天台摆姿，服装和城市建筑共同表达都市职业气质，但没有剧情事件。

预期：环境人像，不应因为夜景和高级光线自动路由为电影剧照。

结果：通过。

### 4.6 角色资产

请求：为同一角色生成三视图、表情板和换装板。

预期：继续使用 character-assets + character identity anchors，不加载环境人像。

结果：通过。

### 4.7 场景资产

请求：设计一间可用于多镜头拍摄的咖啡店，包含空景、俯视图、动线和镜头入口。

预期：继续使用 scene-assets + spatial blocking，不加载摄影 style。

结果：通过。

## 5. 加载预算检查

典型环境人像：

```text
1 input
1 task
0–2 controls
0–2 libraries
1 environmental portrait style
```

不会同时默认加载 lifestyle、editorial 和 cinematic 三种 style。

## 6. 单一真源检查

- [x] 生活抓拍继续由 lifestyle candid 唯一维护
- [x] 环境人像新增独立且清晰的读取条件
- [x] 电影事件叙事继续由 film still 唯一维护
- [x] 人物身份和场景规划未复制到摄影 style
- [x] 旅行、职业、城市街拍没有各自建立题材叶子
- [x] 正式叶子未引用临时摄取目录

## 7. 来源与许可检查

- [x] 已记录来源仓库、日期和 CC BY 4.0
- [x] 未复制完整 Prompt、图片、摄影师或杂志风格
- [x] 未使用相机型号和空泛质量词替代视觉规则
- [x] 正式内容为多案例交叉抽象和中文改写

## 8. 验收结论

```text
状态：通过
结论：Phase 8 已完成。摄影路线补齐环境人像这一真实空档，并完成生活纪实、编辑写真和电影剧照三条路线的边界收敛；人物身份和场景规划通过外部案例验证，无需新增重复叶子。
后续动作：评估是否启动 Phase 9 的插画、3D、游戏和长尾类别。
```
