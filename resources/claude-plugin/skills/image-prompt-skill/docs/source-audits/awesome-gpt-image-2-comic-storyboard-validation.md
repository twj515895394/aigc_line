# awesome-gpt-image-2 漫画、故事板与多格连续性批次验证

## 1. 批次信息

- 对应 Phase：7
- 来源：`YouMind-OpenLab/awesome-gpt-image-2`
- 实施日期：2026-07-10
- 抽样审计：`awesome-gpt-image-2-comic-storyboard-sampling.md`

## 2. 正式产物

### 新增叶子

- `references/libraries/composition-shot/comic-panel-layouts.md`
- `references/styles/comic-manhwa/sequential-comic-language.md`
- `references/controls/identity-consistency/multi-panel-continuity.md`

### 更新

- `references/libraries/composition-shot/index.md`
- `references/styles/comic-manhwa/index.md`
- `references/controls/identity-consistency/index.md`
- `references/tasks/storyboard-assets/playbook.md`

## 3. 职责边界验证

- 漫画版式只回答如何分格和控制阅读节奏；
- 漫画视觉语言只回答线稿、上色、阴影、速度线、对白和拟声词如何呈现；
- 多格连续性只回答角色、位置、动作、道具、对白和累计状态如何继承；
- 故事板 Playbook 继续服务制作型分镜，并明确与成品漫画页的区别。

结论：通过。

## 4. 路由验证

### 黑白漫画动作页

请求：生成一页黑白日漫，6 格，最后一格为大幅冲击画面。

预期：

```text
library：comic-panel-layouts
style：sequential-comic-language
control：multi-panel-continuity
```

结果：通过。

### 彩色韩漫条漫

请求：竖向条漫，两人对话后发生情绪揭示，留白控制停顿。

预期：

- 条漫版式；
- 彩色韩漫视觉语言；
- 角色、场景、对白说话者连续；
- 不自动加入故事板镜号和技术标注。

结果：通过。

### 四格短篇

请求：四格轻喜剧，最后一格反转。

预期：四格归入漫画版式，不新增独立叶子；每格承担起、承、转、合。

结果：通过。

### 制作型故事板

请求：做 8 镜控制型视频故事板，标注镜号、机位、动作和运镜。

预期：

```text
task：storyboard-assets
library：storyboard-board-types
不默认加载：sequential-comic-language
```

结果：通过。

### 道具累计状态

请求：角色第一格拿完整雨伞，第三格雨伞被折断，后续格保持折断。

预期：多格连续性把损坏状态设为累计项，不自动恢复。

结果：通过。

### 对白与气泡

请求：两人交替说话，气泡不能指错人，也不能遮挡五官。

预期：视觉语言控制气泡表现，多格连续性绑定说话者和阅读顺序。

结果：通过。

### 相邻单图任务

请求：生成一张单幅韩漫风人物插画。

预期：可加载 comic style，但不需要 comic panel layouts 与 multi-panel continuity。

结果：通过。

## 5. 加载预算检查

典型成品漫画页：

```text
1 input
1 task
1 continuity control
1 panel-layout library
1 comic style
```

典型制作型故事板：

```text
1 input
1 storyboard task
1–2 controls
1 storyboard layout library
0–1 style
```

两条路线不会默认同时加载漫画版式和故事板版式。

## 6. 来源与结构检查

- [x] 已记录来源仓库、日期和 CC BY 4.0
- [x] 未复制完整 Prompt、图片和对白
- [x] 未复制具体 IP 或作者风格
- [x] 未新增故事板一级任务
- [x] 未新增四格和对白重复叶子
- [x] 索引只负责读取条件与路径
- [x] 正式叶子未引用临时摄取目录

## 7. 验收结论

```text
状态：通过
结论：Phase 7 已完成。漫画分格、漫画媒介表现和多格状态连续性形成三项正交能力，成品漫画与制作型故事板边界清楚。
后续动作：进入 Phase 8，对摄影、电影、人物和场景能力进行外部案例交叉验证。
```
