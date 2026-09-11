# 用户整理资料 Phase 3 验证

## 1. 批次信息

- 批次名称：角色、场景和分镜任务能力增补
- 对应 Phase：3
- 来源：用户整理资料（2026-07-10）
- 实施日期：2026-07-10

## 2. 正式产物

### 新增叶子

- `references/controls/identity-consistency/character-identity-anchors.md`
- `references/controls/spatial-blocking/staging-and-direction-control.md`
- `references/libraries/composition-shot/storyboard-board-types.md`

### 更新 Playbook

- `references/tasks/character-assets/playbook.md`
- `references/tasks/scene-assets/playbook.md`
- `references/tasks/storyboard-assets/playbook.md`

### 更新索引

- `references/controls/identity-consistency/index.md`
- `references/controls/spatial-blocking/index.md`
- `references/libraries/composition-shot/index.md`

## 3. 职责边界验证

### 角色身份锚点

`character-identity-anchors.md` 只保存身份稳定区、固定项与允许变化项的控制方法；妆容、发型和表情的具体选项仍留在 `libraries/human/`。

结论：通过。

### 站位与方向

`staging-and-direction-control.md` 只保存空间原点、人物相对位置、三角站位、视线、动线和跨镜方向控制；具体场景资料仍留在 `libraries/environment/`。

结论：通过。

### 故事板类型

`storyboard-board-types.md` 只保存可选择的故事板类型、版式和信息密度；单镜头设计、动作流程和输出结构仍由 storyboard Playbook 与 controls 负责。

结论：通过。

## 4. 路由验证

### 4.1 角色三视图与表情板

请求示例：

> 设计一个角色资产包，要有三视图、多角度头像和基础表情，换表情不能变脸。

预期：

```text
task：character-assets
control：character-identity-anchors
library：按需加载 hairstyle / expression
```

结果：角色 Playbook 明确先锁定脸部、身体和发型锚点，再扩展表情与换装。

结论：通过。

### 4.2 换装板

请求示例：

> 同一个角色做三套职业换装，脸、发型和体型保持不变。

预期：

```text
task：character-assets
control：character-identity-anchors
```

身份与服装变量已明确分离。

结论：通过。

### 4.3 场景资产与人物调度

请求示例：

> 为一间办公室做场景总览、俯视站位图和四个稳定镜头入口。

预期：

```text
task：scene-assets
control：staging-and-direction-control
control：按需加载 composition-camera
library：environment
```

结果：场景 Playbook 明确空间原点、门窗、主道具、活动区和镜头入口。

结论：通过。

### 4.4 双人对峙与三角站位

请求示例：

> 两人隔桌对峙，第三视觉点是桌上的证据，后续要连续切三个镜头。

预期：

```text
control：staging-and-direction-control
```

结果：空间控制页能够建立人物 A、B 与关键道具的三角关系、视线和轴线。

结论：通过。

### 4.5 控制型故事板

请求示例：

> 做 8 镜控制型故事板，重点展示镜头、站位、动作方向和跨镜连续性。

预期：

```text
task：storyboard-assets
library：storyboard-board-types
controls：camera + spatial blocking
```

结果：8 镜可选择 3×3 或主次混排；控制板保留最低角色与场景识别。

结论：通过。

### 4.6 风格型故事板

请求示例：

> 做 6 镜风格型故事板，最终画风和光影优先，但每格仍要能看出镜号和动作。

预期：

```text
task：storyboard-assets
library：storyboard-board-types
style：用户指定风格
```

结果：风格板保留最低控制信息，不会退化为六张无关联插画。

结论：通过。

### 4.7 超过 12 镜

请求示例：

> 把 20 个镜头做成一张总板。

预期：建议拆分多个 Pack，并写清跨 Pack 输入与输出状态。

结果：Playbook 和 board types 均明确超过 12 镜优先拆包。

结论：通过。

### 4.8 相邻任务不误加载

请求示例：

> 只生成一张电影感人物成片。

不应默认加载：

- character identity anchors；
- storyboard board types；
- staging and direction control。

结果：只有多资产、多人物空间或分镜任务满足这些叶子的读取条件。

结论：通过。

## 5. 加载预算检查

### 角色资产

```text
1 input
1 task
1 identity control
0–2 human libraries
0–1 style
```

### 场景资产

```text
1 input
1 task
1 spatial control
0–1 camera control
0–1 environment library
0–1 style
```

### 分镜资产

```text
1 input
1 task
1–2 controls
0–1 storyboard type library
0–1 style
```

均可保持在默认预算内。

## 6. 单一真源与结构检查

- [x] 身份控制与人物选项分离
- [x] 空间控制与场景资料分离
- [x] 故事板类型选择与任务流程分离
- [x] 三个索引只保存读取条件和路径
- [x] 三个 Playbook 通过相对链接下钻，不复制完整叶子正文
- [x] 未新增一级任务
- [x] 未引用临时摄取目录

## 7. 来源处理说明

本批从以下附件提炼、重组和改写：

- `角色资产生成结构.md`
- `场景资产与空间规划.md`
- `分镜资产与image2故事版.md`

没有把三份原始资料原样复制为新任务；任务流程进入 Playbook，控制方法进入 controls，故事板类型与版式进入 library。

## 8. 验收结论

```text
状态：通过
结论：Phase 3 已完成。角色、场景和分镜任务获得了可执行的身份、空间和版式能力，职责边界与加载预算保持稳定。
后续动作：进入 Phase 4，处理人物写真、女友感与综合生图风格资料。
```
