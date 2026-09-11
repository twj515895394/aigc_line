# Image Prompt Skill Reference 架构决策记录

## 1. 文档目的

本文记录 `image-prompt-skill` 关于 Reference 体系重构与扩展的已确认设计决策，作为后续目录调整、内容迁移、Reference 补充和 `SKILL.md` 优化的统一依据。

本文只记录已经确认的内容，不继续展开过细的未决设计。

---

## 2. 总体设计原则

### 2.1 采用方案 C

Reference 体系采用：

> 正交控制模块 + 详细资料库 + 轻量任务路由。

不按题材复制多套完整知识，也不把所有资料塞进一个大文件。

### 2.2 不建设模型适配层

当前不区分 GPT Image、Flux、Midjourney、SDXL、Qwen Image 等模型专属 Prompt 语法。

统一目标是：

- Prompt 足够完整
- 描述足够清晰
- 视觉关系明确
- 限制项具体
- 尽量保持模型无关

### 2.3 统一使用 Markdown

这是 Skill，不是程序化知识库。

因此：

- 所有 Reference、索引、路由和决策说明统一使用 Markdown
- 不引入 YAML 路由元数据
- 不维护 token 数值、依赖图、冲突图等工程字段
- 不并行维护多套路由机制

### 2.4 分级按需读取

默认读取结构：

```text
总索引
→ 分类索引
→ 叶子 Reference
```

复杂分类最多允许：

```text
总索引
→ 一级分类索引
→ 二级分类索引
→ 叶子 Reference
```

规则：

- 默认三级
- 最多四级
- 禁止继续无限嵌套
- 总索引不直接罗列全部叶子文件
- 叶子 Reference 才承载具体知识

---

## 3. 当前一级目录结构

最终一级 Reference 结构确定为：

```text
references/
├── index.md
├── inputs/
├── tasks/
├── controls/
├── libraries/
├── styles/
└── diagnostics/
```

已确认取消：

- `subjects/`
- `appendix/`
- 独立 `recipes/`
- 独立快速模式与交互模式 Reference

取消目录不代表删除其中有效内容，必须先审计、迁移和去重。

---

## 4. 各目录职责

### 4.1 `inputs/`

负责理解用户输入形态，不负责具体任务执行。

固定为三条互斥路线：

```text
inputs/
├── index.md
├── text-input-expansion.md
├── single-image-reference.md
└── multi-image-reference.md
```

执行时只读取其中一份：

- 纯文字请求 → `text-input-expansion.md`
- 单张参考图 → `single-image-reference.md`
- 多张参考图 → `multi-image-reference.md`

多图 Reference 需要重点覆盖：

- 主参考图识别
- 每张辅助图的职责分配
- 人物 A / 人物 B / 场景 / 服装 / 风格参考绑定
- 同一维度冲突处理
- 局部参考区域
- 保留强度
- 禁止平均融合
- 文字要求与图片参考的优先级

### 4.2 `tasks/`

负责任务目标、执行流程和输出结构。

当前任务类型确定为：

```text
tasks/
├── finished-image/
├── image-to-image/
├── image-editing/
├── prompt-reverse-engineering/
├── character-assets/
├── scene-assets/
├── storyboard-assets/
└── video-reference-frames/
```

任务边界：

#### `finished-image`

生成高完成度单张成片。

产品图、海报、封面、写真、概念图等作为其输出形态，不单独升为任务类型。

#### `image-to-image`

用于整体画面改写：

- 整体换风格
- 更换场景
- 更换服装、光影或色调
- 在保留主体基础上重新创作
- 构图、镜头和画面气质允许整体变化

核心是：

```text
保留项 + 改写项 + 允许变化项 + 整体目标
```

#### `image-editing`

用于局部精确修改：

- 替换单个物体
- 删除或增加元素
- 修改文字
- 修改某只手或某个局部动作
- 指定区域修复
- 其他内容保持不变

核心约束结构：

```text
必须保留
+ 必须修改
+ 必须删除
+ 必须增加
+ 禁止变化
+ 空间位置与数量约束
```

`image-to-image` 与 `image-editing` 按修改范围和约束精度区分，而不是按是否有参考图区分。

#### `prompt-reverse-engineering`

根据用户意图选择以下三条互斥路线：

- 复现型：尽量还原原图
- 结构型：提炼可复用视觉结构和 Prompt 模板
- 改造型：继承原图部分内容，并生成新目标 Prompt

用户意图明确时直接判断，不机械追问。

#### 资产任务

- 角色三视图、表情板、换装板 → `character-assets`
- 场景总览、站位图、空间控制板 → `scene-assets`
- 故事板总板、动作拆解板 → `storyboard-assets`
- 首帧、尾帧、关键帧 → `video-reference-frames`

### 4.3 `controls/`

负责“怎么判断、怎么选择、怎么协调和怎么控制”。

首批采用以下 8 个核心分类：

```text
controls/
├── composition-camera/
├── lighting-color/
├── pose-action/
├── spatial-blocking/
├── identity-consistency/
├── reference-handling/
├── prompt-assembly/
└── realism-quality/
```

含义：

- `composition-camera/`：构图、景别、机位、焦段、景深
- `lighting-color/`：光源、阴影、色温、配色、明度、饱和度
- `pose-action/`：姿态、重心、动作阶段、接触和互动
- `spatial-blocking/`：站位、动线、视线、空间和道具位置
- `identity-consistency/`：人物、服装、道具、场景跨图一致性
- `reference-handling/`：主辅参考、局部参考、强度和冲突处理
- `prompt-assembly/`：信息优先级、语义组织、限制项和最终组装
- `realism-quality/`：真实感、自然感、去 AI 感和整体完成度

原则：

- 先建立稳定主干
- 后续资料无法自然归类或某方向明显膨胀时再新增或拆分
- 不为“看起来全面”提前创建空目录

### 4.4 `libraries/`

负责“有哪些具体选项、选择器和详细资料”。

按服务对象或知识领域归档，当前建议结构为：

```text
libraries/
├── human/
├── environment/
├── object-product/
├── animal-creature/
├── composition-shot/
├── lighting-color/
└── material-effect/
```

目录只负责归档和路由，不预设叶子资料必须按年龄、职业、人设或技法拆分。

重要规则：

> 每份新增资料先分析其实际用途、内部结构和主要检索轴，再决定整份保留还是拆分。

例如《女主妆容选择器》：

- 主要检索轴是人设气质、角色目标、职业题材和发型联动
- 当前内容结构完整
- 不应机械按年龄、职业或妆容技法重拆
- 适合作为 `libraries/human/` 下的单个叶子 Reference

只有在文件明显过大，或存在明确高频局部读取需求时，才沿资料自身分类方式拆分。

### 4.5 `styles/`

负责“某种视觉风格如何实现”，不负责罗列该风格体系下的所有人物、服装和场景选项。

首批分类为：

```text
styles/
├── photography/
├── cinematic/
├── anime/
├── comic-manhwa/
├── illustration/
├── concept-art/
├── 3d-rendering/
└── graphic-design/
```

水彩、油画、素描、像素艺术、黏土、国画等暂时作为对应分类下的叶子 Reference；资料量足够后再考虑升级为独立目录。

边界：

- “韩漫怎么画” → `styles/comic-manhwa/`
- “韩漫里有哪些女主、服装、表情、场景可选” → `libraries/`

混合资料允许按职责拆分迁移，但不为了目录整齐破坏小而完整资料的使用价值。

### 4.6 `diagnostics/`

只负责跨任务、跨领域的综合故障诊断。

正常生成流程默认不读取。

建议保留的综合诊断方向：

```text
diagnostics/
├── index.md
├── identity-consistency-failure.md
├── anatomy-and-contact-failure.md
├── composition-readability-failure.md
├── style-and-material-conflict.md
├── reference-conflict.md
└── prompt-overload-and-contradiction.md
```

规则：

- 单一领域小问题优先使用对应叶子 Reference 的“避坑”和“修复”
- 只有跨维度失败、参考冲突、原因不明确或用户明确要求诊断时才读取
- 不复制各 Reference 已有的局部失败规则

---

## 5. `controls` 与 `libraries` 的对应关系

允许两个目录存在同领域名称，但职责必须不同。

例如：

```text
controls/composition-camera/
libraries/composition-shot/
```

- `controls/composition-camera/`：镜头和构图怎么选、为什么这样选、怎样与主体和空间协调
- `libraries/composition-shot/`：有哪些镜头和构图模板、方案、选择器可以使用

同理：

```text
controls/lighting-color/
libraries/lighting-color/

controls/realism-quality/
libraries/material-effect/
```

不为了避免目录同名而强行把方法和大型资料混在一起。

---

## 6. Reference 路由与加载预算

执行顺序：

```text
1. SKILL.md 判断用户意图、模式和任务
2. 读取 references/index.md
3. 读取 1 份 input Reference
4. 读取 1 份 task Reference
5. 按需读取 controls
6. 按需读取 libraries
7. 风格真正影响结果时读取 style
8. 只有失败分析时读取 diagnostic
```

默认业务 Reference 上限：

```text
固定：
- 1 份 input
- 1 份 task

按需：
- 0–2 份 controls
- 0–2 份 libraries
- 0–1 份 style
- 0–1 份 diagnostic
```

补充规则：

- 总索引和中间分类索引只负责导航，不计入业务 Reference 数量
- 不为凑满额度读取资料
- 一个方向足够解决问题时，不额外加载相邻文件
- 复杂任务确需突破上限时可以增加，但必须因为任务跨越多个独立维度

---

## 7. 索引规则

所有 `index.md` 只负责：

- 何时读取
- 读取哪个文件

不在索引中重复：

- 具体选项列表
- 完整关键词
- 详细搭配表
- Prompt 片段
- 大段避坑内容

原则：

> 索引只解决“何时读哪份文件”，叶子 Reference 才解决“文件里具体有什么”。

### 多入口路由

允许多个索引指向同一个叶子 Reference，但物理文件只保留一份。

规则：

- 一个叶子 Reference 只有一个实际存放位置
- 多个任务索引和分类索引可以引用它
- 其他目录不得复制正文
- 同一轮命中同一文件时只加载一次
- 修改只维护唯一真源

---

## 8. 叶子 Reference 规范

采用：

> 最低结构统一，正文结构按资料自身特点自适应。

所有叶子 Reference 至少需要说明：

- 解决什么问题
- 什么时候读取
- 核心内容
- 联动关系或限制
- 必要时的常见失败与修复

但正文不强制统一模板，可以根据资料特点使用：

- 表格
- 选择器
- 矩阵
- 条目
- 示例
- Prompt 片段
- 对照关系

### 控制规则类 Reference 建议结构

```text
标题
用途
何时读取
核心规则
组合关系
Prompt 写法
常见失败与修复
```

### 资料库类 Reference 建议结构

```text
标题
定位
选择入口
资料主体
联动关系
避坑
```

不为了套模板破坏原始资料结构。

---

## 9. 新资料的分析和拆分原则

新增详细资料时，不预先规定必须按哪个维度拆分。

先判断：

```text
1. 这份资料解决什么问题
2. 用户通常通过什么条件找到它
3. 资料自身按什么维度组织
4. 它是否小而完整
5. 是否存在高频局部读取需求
6. 再决定整份保留还是拆分
```

规则：

- 小而完整 → 作为单个叶子 Reference
- 内容混合多种职责 → 允许拆分迁移
- 文件过大且大部分内容与单次任务无关 → 根据资料自身检索轴拆分
- 不按固定行数、条目数或想象中的职业、年龄等轴机械拆分

---

## 10. 内容迁移原则

所有目录取消、文件合并和结构调整，都必须先做内容审计。

处理流程：

```text
原文件
├── 方法规则 → controls/
├── 选择器和详细资料 → libraries/
├── 风格实现说明 → styles/
├── 综合失败诊断 → diagnostics/
├── 任务执行和输出要求 → tasks/
└── 重复正文 → 删除，只保留唯一版本
```

混合职责文件允许拆分迁移。

例如原 `office-candid-photography.md` 可能拆为：

- 办公室空间、道具和环境特征 → `libraries/environment/`
- 抓拍站位、遮挡和构图偏差 → `controls/composition-camera/`
- 窗光、顶灯和混合光规则 → `controls/lighting-color/`
- 纪实摄影视觉表现 → `styles/photography/`

原文件在新内容迁移并验证路由可用后再删除。

---

## 11. `SKILL.md` 优化原则

当前 `SKILL.md` 不算特别重，不要求为了缩短而大幅删减。

定位为运行控制器，主要保留：

- Skill 定位和触发范围
- 快速模式与交互模式规则
- 用户意图、输入类型和任务类型判断
- Reference 路由与加载上限
- 信息优先级和冲突处理
- 最终输出最低要求
- 禁止事项

专项知识迁移到对应 Reference。

### 模式 Reference 处理

取消独立：

- `mode-quick/quick-mode.md`
- `mode-interactive/interactive-mode.md`

有价值内容先提炼合并进 `SKILL.md`，验证后再删除旧目录。

---

## 12. 输出模板

保留 `assets/templates/`，但改为按任务划分：

```text
assets/templates/
├── finished-image-template.md
├── image-to-image-template.md
├── image-editing-template.md
├── prompt-reverse-engineering-template.md
├── character-assets-template.md
├── scene-assets-template.md
├── storyboard-assets-template.md
└── video-reference-frames-template.md
```

规则：

- 普通短任务不强制读取模板
- 用户要求完整、结构化交付时才读取
- 每次只读取当前任务对应的一份
- 模板只负责输出字段、顺序和排版
- 模板不存专业知识
- 快速模式与交互模式共用同一任务模板

---

## 13. 文件命名与正文语言

统一采用：

- 路径和文件名：英文小写 `kebab-case`
- 正文内容：中文为主
- 必要行业术语和 Prompt 关键词可保留英文
- 不为同一内容维护中英文两份 Reference

示例：

```text
libraries/human/female-makeup-selector.md
controls/composition-camera/lens-perspective.md
styles/comic-manhwa/korean-manhwa-style.md
```

---

## 14. 当前不继续细化的事项

以下内容暂不继续做过细约束，留到实际改造或新增资料时再判断：

- 叶子 Reference 的硬性字数、行数或条目数阈值
- 未来新增控制分类的完整清单
- 所有 libraries 子目录的最终完备分类
- 每个索引的固定文案模板
- 自动化 lint、测试和程序化路由

原则仍然是：

> 以实际资料和真实使用需求驱动补充，不为了预设完整性增加上下文负担。

---

## 15. 后续实施顺序建议

后续正式改造仓库时，建议按以下顺序推进：

1. 建立新目录骨架和各级精简 `index.md`
2. 优化 `SKILL.md` 的运行流程和加载规则
3. 拆分单图与多图输入 Reference
4. 新增 `image-editing` 与 `prompt-reverse-engineering` 任务页
5. 建立 8 个 controls 主干目录
6. 建立 libraries 和 styles 主干目录
7. 对现有文件制作迁移表
8. 迁移、拆分和去重现有 Reference
9. 重构按任务划分的输出模板
10. 最后删除已经完成迁移的旧目录和旧入口

在任何删除动作之前，必须先确认有效内容已迁移且新路由可用。
