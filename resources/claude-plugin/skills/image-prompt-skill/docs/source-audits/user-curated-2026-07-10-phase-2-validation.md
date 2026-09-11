# 用户整理资料 Phase 2 验证

## 1. 批次信息

- 批次名称：人物选择器、微表情、单图输入和 Prompt 反推能力增补
- 对应 Phase：2
- 来源：用户整理资料（2026-07-10）
- 实施日期：2026-07-10

## 2. 更新文件

- `references/libraries/human/hairstyle-selector.md`
- `references/libraries/human/expression-selector.md`
- `references/controls/pose-action/lifestyle-micro-expression.md`
- `references/inputs/single-image-reference.md`
- `references/tasks/prompt-reverse-engineering/playbook.md`

## 3. 明确未新增的文件

### 妆容选择器

附件内容与现有 `female-makeup-selector.md` 已高度一致，现有叶子已覆盖妆容结构、气质分类、角色映射、发型联动、协同规则和失败风险。

处理结果：不修改，避免无增量重写。

### 基础 Prompt 结构

主体、场景、动作、镜头、光线、风格、比例和限制的通用顺序，已经分别存在于：

- `SKILL.md` 的 Prompt 组装原则；
- `inputs/text-input-expansion.md`；
- `tasks/finished-image/playbook.md`；
- `controls/prompt-assembly/index.md`。

处理结果：不新增万能 Prompt 叶子，避免第二套输出真源。

### 人物外貌与写真 Prompt 结构

其人物、妆容、发型、表情、镜头和光影内容已由现有选择器与控制页承担；写真风格部分留待 Phase 4 与外部摄影案例共同验证。

处理结果：本阶段不新建人物外貌万能页。

## 4. 职责边界验证

### 发型

- 具体发型、长度、形态、气质和配饰留在 library；
- 跨图身份稳定仍由 identity control 负责；
- 动态发丝只作为发型选择与镜头联动，不代替动作控制。

结论：通过。

### 表情与微表情

- 表情类型、强度和可选方向留在 `expression-selector.md`；
- 表情如何自然发生、如何分阶段变化留在 `lifestyle-micro-expression.md`；
- 静态终态与视频过程已明确分开。

结论：通过。

### 单图输入与反推任务

- `single-image-reference.md` 只负责识别参考图职责、锚点、风格与内容分离；
- `prompt-reverse-engineering/playbook.md` 负责选择复现型、结构型或改造型路线，并决定最终输出结构。

结论：通过。

## 5. 路由验证

### 5.1 只细化发型

请求示例：

> 都市女律师，不要只写黑长直，帮我确定更具体的发型。

预期：

```text
library：hairstyle-selector
不默认加载：makeup、expression、film still
```

结果：通过。

### 5.2 角色表情板

请求示例：

> 为同一个角色设计克制、愤怒、惊讶和告别四种表情终态。

预期：

```text
task：character-assets
library：expression-selector
control：只有要求自然变化过程时才加载 lifestyle-micro-expression
```

结果：通过。

### 5.3 视频情绪变化

请求示例：

> 首帧假装镇定，三秒内逐渐意识到谎言被识破。

预期：

```text
task：video-reference-frames
library：expression-selector
control：lifestyle-micro-expression
```

微表情控制页允许按两个短阶段描述，但每阶段只保留一个主要变化。

结果：通过。

### 5.4 单图风格提取

请求示例：

> 只借用这张图的风格和光影，人物、服装、场景都换掉。

预期：

```text
input：single-image-reference
必须分离：可迁移风格 / 不自动迁移内容
任务：根据用户目标进入 prompt reverse engineering 或 image-to-image
```

结果：通过。

### 5.5 结构型反推

请求示例：

> 分析这张海报为什么有效，给我一个能换人物和场景的通用模板。

预期：

```text
input：single-image-reference
task：prompt-reverse-engineering / 结构型
输出：视觉机制、替换槽位、镜头、光影、材质与模板
```

结果：通过。

### 5.6 相邻任务不误加载

请求示例：

> 把图里的杯子换成玻璃瓶，其他保持不变。

预期：

```text
input：single-image-reference
task：image-editing
不加载：prompt-reverse-engineering
```

输入页明确继续读取唯一任务 Playbook，不会因分析图片而自动进入反推任务。

结果：通过。

## 6. 加载预算检查

典型人物成片：

```text
1 input
1 task
0–1 pose control
0–2 human libraries
0–1 style
```

典型结构型反推：

```text
1 input
1 task
0–2 controls
0–1 style
```

均在默认预算内。

## 7. 来源处理说明

本批主要从以下附件提炼、查重和改写：

- `角色发型选择器.md`
- `表情与微表情选择器.md`
- `图像风格提取流程.md`
- `基础Prompt结构.md`
- `人物外貌与写真Prompt结构.md`

没有直接复制原始万能结构；只把存在明确增量的内容更新到唯一正式真源。

## 8. 验收结论

```text
状态：通过
结论：Phase 2 已完成。人物选择器、微表情过程、风格与内容分离和反推输出能力得到增补，未新增重复万能叶子。
后续动作：进入 Phase 3，增强角色、场景和分镜任务 Playbook 与必要 controls。
```
