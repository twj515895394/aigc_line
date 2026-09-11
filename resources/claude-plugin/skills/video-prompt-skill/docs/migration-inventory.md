# Video Prompt Skill v2 最终迁移清单

## 1. 状态定义

- `active-v2`：v2 正式运行入口或正文真源；
- `removed-after-validation`：有效内容已迁移并通过验证，旧文件已删除；
- `research-only`：仅保留在研究区用于追溯，不参与运行。

## 2. 根文件与输出合同

| 路径 | 状态 |
|---|---|
| `SKILL.md` | active-v2 |
| `references/index.md` | active-v2 |
| `assets/README.md` | active-v2 |
| `assets/templates/mode-quick-output-contract.md` | active-v2 |
| `assets/templates/mode-interactive-output-contract.md` | active-v2 |
| `assets/templates/single-shot-video-template.md` | active-v2 |
| `assets/templates/multi-shot-video-template.md` | active-v2 |
| `assets/templates/multimodal-reference-template.md` | active-v2 |
| `assets/templates/model-adapted-output-template.md` | active-v2 |

## 3. 已删除旧输出与模式

| 旧路径 | 新真源 | 状态 |
|---|---|---|
| `assets/templates/single-unit-output-template.md` | `single-shot-video-template.md` | removed-after-validation |
| `assets/templates/multi-unit-output-template.md` | `multi-shot-video-template.md` | removed-after-validation |
| `assets/templates/interactive-output-template.md` | `mode-interactive-output-contract.md` | removed-after-validation |
| `references/mode-quick/quick-mode.md` | `SKILL.md` + quick contract | removed-after-validation |
| `references/mode-interactive/interactive-mode.md` | `SKILL.md` + interactive contract | removed-after-validation |

## 4. 输入迁移

| 旧路径 | 新真源 | 状态 |
|---|---|---|
| `references/input-text-only/text-expansion.md` | `references/inputs/text-input.md` | removed-after-validation |
| `references/input-image-ref/image-reference-analysis.md` | `references/inputs/single-image-input.md` + `multi-image-input.md` | removed-after-validation |

新增正式输入：

- `video-input.md`；
- `audio-input.md`；
- `mixed-multimodal-input.md`。

## 5. 任务迁移

| 旧路径 | 新真源 | 状态 |
|---|---|---|
| `references/task-text-to-video/playbook.md` | `references/tasks/text-to-video/playbook.md` | removed-after-validation |
| `references/task-image-to-video/image-to-video-playbook.md` | `references/tasks/image-to-video/playbook.md` | removed-after-validation |
| `references/output-single-unit/output-spec.md` | single-shot template + quick contract | removed-after-validation |
| `references/output-multi-unit/output-spec.md` | multi-shot template + quick contract | removed-after-validation |

新增正式任务：

- multimodal-reference-video；
- video-reference-and-video-to-video；
- video-editing；
- video-extension；
- audio-driven-and-beat-sync；
- storyboard-and-multi-shot-video。

## 6. 控制层迁移

| 旧路径 | 新真源 | 状态 |
|---|---|---|
| `references/timeline/timeline-assembly.md` | `controls/timeline-rhythm/control.md` | removed-after-validation |
| `references/timeline/lifestyle-beat-and-landing.md` | `controls/timeline-rhythm/control.md` | removed-after-validation |
| `references/continuity/continuity-guardrails.md` | `controls/continuity-consistency/control.md` | removed-after-validation |
| `references/continuity/human-motion-consistency.md` | continuity + subject-motion | removed-after-validation |
| `references/style-control/anti-ai-video-realism.md` | `controls/realism-quality/control.md` | removed-after-validation |
| `references/style-control/camera-failure-patterns-negative.md` | `controls/camera-direction/control.md` | removed-after-validation |

新增正式控制：

- spatial-blocking；
- performance-expression；
- audio-visual-sync；
- reference-binding；
- prompt-assembly。

## 7. 附录迁移

| 旧路径 | 新真源 | 状态 |
|---|---|---|
| `references/appendix/camera-movement-appendix.md` | camera-shot library + camera-direction control | removed-after-validation |
| `references/appendix/action-beat-appendix.md` | action-motion library + subject-motion control | removed-after-validation |
| `references/appendix/visual-style-appendix.md` | genre-patterns + styles + lighting-color | removed-after-validation |
| `references/appendix/index.md` | v2 不再保留 appendix 分类 | removed-after-validation |

## 8. v2 正文真源

### Inputs

- 6 类，位于 `references/inputs/`。

### Tasks

- 8 类，位于 `references/tasks/`。

### Controls

- 10 类，位于 `references/controls/`。

### Libraries

- 7 类，位于 `references/libraries/`。

### Styles

- 7 类，位于 `references/styles/`。

### Models

- `generic.md`；
- `seedance-2.md`；
- `ltx-2-3.md`。

### Diagnostics

- 10 类，位于 `references/diagnostics/`。

## 9. 用户资料处理结果

17 份用户上传资料已完成审计和正式沉淀：

- Prompt 结构进入 tasks 与 prompt-assembly；
- 运镜、动作、表演、光影进入 libraries 与 controls；
- 视频和影视风格拆成 genre patterns 与 styles；
- 写实短剧和 AI 漫剧进入专属 style；
- 发型资料只提炼视频动态和一致性部分。

原始文件继续保留在 `research/incoming/user/`，状态为 `research-only`。

## 10. 验证结果

- [x] 新真源存在且内容完整；
- [x] 分类索引引用唯一真源；
- [x] `SKILL.md` 不再引用旧运行路径；
- [x] 十类核心场景静态回归通过；
- [x] Generic、Seedance、LTX 输出对照通过；
- [x] 旧运行文件已逐份核对并删除；
- [x] 删除结果在分支对比中显示为 removed；
- [x] v2 不存在正式 appendix 分类；
- [x] 原始资料可追溯；
- [x] 最终验证报告已建立。

详细报告：

- `docs/phase7-regression-results.md`；
- `docs/validation-report.md`。

## 11. 最终结论

迁移与清理已经完成。旧结构不再承担运行职责，也不再保留重复正文。当前仓库以 Reference Architecture v2 作为唯一正式架构。