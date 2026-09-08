# Assets

本目录存放运行期可直接复用的输出合同和交付模板。

模板负责“最终如何呈现”，不承载任务知识、控制方法、风格资料或模型能力说明。

## 模式输出合同

- `templates/mode-quick-output-contract.md`
  - 默认模式；零追问、直接交付、只展示实际需要的最终内容。
- `templates/mode-interactive-output-contract.md`
  - 仅在用户明确共创时使用；每次只问一个关键问题并给出推荐答案。

## 任务交付模板

- `templates/single-shot-video-template.md`
  - 单一主动作、单一情绪变化或单一镜头主任务。
- `templates/multi-shot-video-template.md`
  - 多镜头、多片段、故事板和跨包视频。
- `templates/multimodal-reference-template.md`
  - 图片、视频、音频和文字素材职责绑定。
- `templates/model-adapted-output-template.md`
  - Generic、Seedance 2.0 和 LTX-2.3 的最终表达转换。

## 读取规则

执行时读取：

```text
1 份模式输出合同
+ 1 份与任务形态最匹配的交付模板
+ 需要模型转换时读取 model-adapted-output-template.md
```

多模态任务可以在主交付模板之外补读 `multimodal-reference-template.md`，但只保留对最终执行必要的职责信息。

## 默认输出原则

- 简单任务只输出一份可直接复制 Prompt；
- 多镜头任务输出必要的全局固定项和镜头 Prompt Pack；
- 多模态任务保留简洁素材职责；
- 不默认输出备选版本、自动补全项和内部分析；
- 用户明确要求完整文档时，才展开结构化字段。

## 迁移期旧模板

以下文件在 Phase 7 验证完成前暂时保留，但不再作为 v2 默认输出合同：

- `templates/single-unit-output-template.md`
- `templates/multi-unit-output-template.md`
- `templates/interactive-output-template.md`

旧模板的迁移状态见 `docs/migration-inventory.md`。