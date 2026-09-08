# Assets

当前目录保存可直接复用的输出合同和交付模板。它们只定义输出内容、顺序和排版，不承载任务知识。

## 模式输出合同

- `templates/mode-quick-output-contract.md`
- `templates/mode-interactive-output-contract.md`

模式合同决定是否追问、是否展示设计过程，以及最终结果如何呈现。

### 快速模式

- 默认模式；
- 零追问、零人工确认；
- 不读取结构化任务模板；
- 只输出合并后的最终 Prompt 正文或必要的 Prompt Pack；
- 不显示标题、画面概述、限制项说明、补全说明和方向摘要。

### 交互模式

- 只有用户明确要求讨论、脑暴、逐步设计或先提问时进入；
- 每次只问一个关键问题并给出推荐答案；
- 最终需要完整结构化交付时，可以读取任务模板。

## 任务模板

- `templates/finished-image-template.md`
- `templates/image-to-image-template.md`
- `templates/image-editing-template.md`
- `templates/prompt-reverse-engineering-template.md`
- `templates/character-assets-template.md`
- `templates/scene-assets-template.md`
- `templates/storyboard-assets-template.md`
- `templates/video-reference-frames-template.md`

## 使用规则

- 每轮必须根据当前模式读取一份 mode output contract；
- 快速模式通常不读取任务模板；
- 交互模式完成讨论后，或用户明确要求完整文档式交付时，才读取当前任务对应的一份模板；
- 不同时读取多份任务模板；
- 模式合同只控制呈现方式，任务知识仍由对应 Playbook 提供。