# Phase 4：Reference 迁移完成记录

## 迁移原则

- 先建立新真源和新路由
- 验证内容完整后再删除旧文件
- 混合职责文件按内容拆分
- 同一知识只保留一个正文版本

## 高频控制与资料迁移

| 原文件 | 新归属 | 结果 |
|---|---|---|
| `style-control/anti-ai-realism.md` | `controls/realism-quality/anti-ai-realism.md` | 已迁移并删除旧文件 |
| `style-control/candid-composition-imperfections.md` | `controls/composition-camera/candid-composition-imperfections.md` | 已迁移并删除旧文件 |
| `style-control/failure-patterns-negative.md` | `diagnostics/common-image-failure-patterns.md` | 已迁移并删除旧文件 |
| `portrait/side-profile-bodyline.md` | `controls/pose-action/side-profile-body-line.md` | 已迁移并删除旧文件 |
| `portrait/commuter-outfit-bodyline.md` | `libraries/human/commuter-outfit-materials.md` | 已迁移并删除旧文件 |
| `portrait/lifestyle-micro-expression.md` | `controls/pose-action/lifestyle-micro-expression.md` | 已迁移并删除旧文件 |

## 办公室混合文件拆分

原文件：

```text
references/scene-office/office-candid-photography.md
```

拆分结果：

| 原内容职责 | 新文件 |
|---|---|
| 办公空间类型、道具和环境锚点 | `libraries/environment/office-workplace-environment.md` |
| 同事视角、侧后方、通路机位和构图关系 | `controls/composition-camera/office-candid-camera.md` |
| 顶灯、窗光、环境反射和普通阴影 | `controls/lighting-color/office-mixed-light.md` |
| 生活化纪实摄影表现 | `styles/photography/lifestyle-candid-photography.md` |

新索引接通后，原混合文件已删除。

## Appendix 迁移

| 原文件 | 新归属 | 结果 |
|---|---|---|
| `appendix/makeup-appendix.md` | `libraries/human/female-makeup-selector.md` | 被用户提供的完整选择器替代，旧文件已删除 |
| `appendix/hairstyle-appendix.md` | `libraries/human/hairstyle-selector.md` | 已迁移扩展并删除旧文件 |
| `appendix/expression-appendix.md` | `libraries/human/expression-selector.md` | 已迁移扩展并删除旧文件 |

微表情执行方法与表情选项已分开：

```text
选择什么表情
→ libraries/human/expression-selector.md

如何让表情自然发生
→ controls/pose-action/lifestyle-micro-expression.md
```

## 输入、模式与任务迁移

| 旧内容 | 新归属 | 结果 |
|---|---|---|
| `mode-quick/quick-mode.md` | `SKILL.md` | 有效规则合并后删除 |
| `mode-interactive/interactive-mode.md` | `SKILL.md` | 追问规则和任务优先级合并后删除 |
| `input-text-only/text-expansion.md` | `inputs/text-input-expansion.md` | 已迁移并删除 |
| `input-image-ref/image-reference-analysis.md` | `inputs/single-image-reference.md` 与 `inputs/multi-image-reference.md` | 拆分增强后删除 |
| 旧 6 类任务目录 | `tasks/` 下统一 8 类任务 | 已迁移并删除旧文件 |

## 模板迁移

旧模板：

- `quick-output-template.md`
- `interactive-output-template.md`
- `character-asset-pack-template.md`

已由 8 份按任务划分的模板替代，旧模板均已删除。

## 最终结果

- 已迁移内容均存在唯一正文真源
- 新分类索引已经接通
- 旧正文已经删除
- 空目录不会被 Git 跟踪，因此旧目录随叶子删除自然消失
- 后续新增资料继续执行“先分析职责和检索轴，再决定整份保留或拆分”的规则
