# awesome-gpt-image-2 漫画、故事板与多格连续性抽样审计

## 1. 批次范围

- 对应 Phase：7
- 来源仓库：`YouMind-OpenLab/awesome-gpt-image-2`
- 访问日期：2026-07-10
- 许可证：CC BY 4.0
- 分类范围：Comic、Manga、Manhwa、Storyboard、Multi-panel、Sequential Art、Character Sheet

本批只提炼跨案例稳定规律，不复制完整 Prompt、图片和具体对白。

## 2. 抽样类型

抽样覆盖：

- 黑白日漫页；
- 彩色韩漫与竖向条漫；
- 美式漫画动作页；
- 四格和六格短篇；
- 对话型漫画页；
- 动作拆解和追逐场景；
- 情绪特写与反应镜头；
- 多格角色连续性；
- 故事板式草稿；
- 成品漫画与制作分镜对照；
- 对白框、旁白框和拟声词；
- 跨页或跨段落连续叙事。

## 3. 跨案例稳定规律

### 3.1 漫画页与故事板不是同一资产

- 故事板服务镜头、动作、站位和视频制作；
- 漫画页服务读者阅读、格间节奏、对白和视觉冲击；
- 成品漫画允许不规则分格、跨格主体和拟声词；
- 制作型故事板需要镜号、时段和技术标注。

### 3.2 分格承担节奏

重复出现的结构：

- 等宽规则格：稳定、清楚；
- 大格 + 小反应格：突出高潮；
- 纵向长格：下落、追逐、空间纵深；
- 横向宽格：环境、群像、对峙；
- 窄格连续切片：快速动作或细微反应；
- 无边框或出血格：记忆、冲击、高潮；
- 条漫长滚动：留白控制停顿和揭示。

### 3.3 多格连续性需要状态表

稳定检查项：

- 角色身份、发型和服装；
- 左右与前后位置；
- 道具持有者、数量和损坏状态；
- 动作输入与输出；
- 对白说话者；
- 场景时间、天气和光向；
- 伤痕、表情和服装褶皱的累计变化。

### 3.4 对白区必须参与构图

- 对白框应靠近说话者但不遮挡脸和动作；
- 阅读顺序要与分格顺序一致；
- 尾巴指向明确；
- 旁白框与对白框视觉区分；
- 拟声词沿动作方向组织；
- 精确长对白不宜一次生图完成。

### 3.5 漫画视觉语言由媒介实现

稳定变量包括：

- 线稿粗细和清洁度；
- 黑白网点或彩色赛璐璐上色；
- 阴影形状；
- 速度线、集中线和冲击线；
- 面部与动作夸张程度；
- 背景简化程度；
- 格框、留白和纸面质感。

## 4. 候选知识评分

| 候选知识 | 得分 | 结论 |
|---|---:|---|
| 漫画页版式类型 | 12 | 新增 composition-shot library |
| 漫画视觉语言 | 12 | 新增 comic-manhwa style |
| 多格连续性控制 | 12 | 新增 identity-consistency control |
| 对白与拟声词独立叶子 | 8 | 并入漫画视觉语言与图文层级 |
| 故事板新任务 | 5 | 不新增，现有 storyboard-assets 已覆盖 |
| 四格漫画独立叶子 | 6 | 并入漫画版式类型 |

## 5. 正式产物决定

新增：

- `references/libraries/composition-shot/comic-panel-layouts.md`
- `references/styles/comic-manhwa/sequential-comic-language.md`
- `references/controls/identity-consistency/multi-panel-continuity.md`

更新：

- `references/libraries/composition-shot/index.md`
- `references/styles/comic-manhwa/index.md`
- `references/controls/identity-consistency/index.md`
- `references/tasks/storyboard-assets/playbook.md`

## 6. 来源处理

- 不复制完整 Prompt、图片或对白；
- 不复制特定漫画 IP、角色和作者风格；
- 不用单一作品名代替视觉规律；
- 正式叶子只保留跨案例抽象后的版式、媒介和连续性规则。