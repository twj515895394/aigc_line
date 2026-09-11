# Phase 6 输出合同与 SKILL.md 切换验收报告

## 1. 验收范围

- 六份 v2 输出合同和交付模板；
- `SKILL.md` v2 运行入口；
- `references/index.md` 正式总路由；
- `assets/README.md` 模板索引；
- Generic、Seedance 2.0、LTX-2.3 输出分流；
- 旧运行路径停止默认读取；
- 迁移台账和实施进度同步。

## 2. 输出合同验收

| 文件 | 职责 | 结果 |
|---|---|---|
| `mode-quick-output-contract.md` | 零追问、直接交付、最小必要输出 | 通过 |
| `mode-interactive-output-contract.md` | 明确共创时一次一个问题并给推荐 | 通过 |
| `single-shot-video-template.md` | 单一主动作 / 情绪 / 镜头任务 | 通过 |
| `multi-shot-video-template.md` | 多镜头、故事板、跨镜和跨包承接 | 通过 |
| `multimodal-reference-template.md` | 图片、视频、音频职责与冲突处理 | 通过 |
| `model-adapted-output-template.md` | Generic、Seedance、LTX 最终转换 | 通过 |

## 3. 快速模式验收

已满足：

- 默认零追问；
- 不要求用户确认中间方向；
- 不输出无价值 A / B / C 方案；
- 简单任务只输出一份最终 Prompt；
- 多镜头只展开必要全局项与 Prompt Pack；
- 多模态只保留执行必要的素材职责；
- 不默认展示备选版本、自动补全项和内部分析；
- 非必要信息缺失由最小风险默认值补全。

结果：通过。

## 4. 交互模式验收

已满足：

- 只有用户明确要求讨论、脑暴、逐步设计、比较方向或 Grill Me 时进入；
- 每次只问一个最关键的问题；
- 每个问题给出推荐答案；
- 沿设计依赖顺序推进；
- 已确认内容不重复询问；
- 用户要求收口或剩余问题只影响轻微细节时立即生成最终结果。

结果：通过。

## 5. SKILL.md 路由验收

`SKILL.md` 已覆盖：

- 六类输入路由；
- 八类任务路由；
- 快速 / 交互模式判断；
- 十类控制路由；
- 七类资料库路由；
- 七种风格路由；
- Generic / Seedance / LTX 模型适配；
- 单镜头、多镜头、多模态和模型输出模板；
- Reference 加载预算；
- 信息优先级和冲突裁决；
- Prompt 组装和输出前自查；
- 失败诊断入口；
- 严禁事项。

旧 `mode-*`、`input-*`、`task-*`、`timeline/`、`continuity/`、`style-control/`、`appendix/` 和旧 output 目录不再是 `SKILL.md` 的默认读取路径。

结果：通过。

## 6. 模型适配验收

### Generic

- 用户未指定模型时默认使用；
- 使用语义化参考名称；
- 不伪造平台参数和专属语法。

结果：通过。

### Seedance 2.0

- 仅在用户指定或任务依赖其能力时加载；
- 使用 `@图片N / @视频N / @音频N` 明确绑定职责；
- 视频编辑、延长和卡点拥有独立输出结构；
- 不用“综合参考所有素材”代替职责分配。

结果：通过。

### LTX-2.3

- 仅在用户指定时加载；
- 最终默认输出具体、流动、现在时的自然语言导演段落；
- 图生视频强调接下来如何运动；
- 表演和对白包含眼神、呼吸、动作与停顿。

结果：通过。

## 7. 加载预算验收

固定：

- 1 input；
- 1 task；
- 1 mode contract；
- 1 main delivery template。

按需：

- 0-3 controls；
- 0-2 libraries；
- 0-1 style；
- 0-1 model adapter；
- 0-1 multimodal template；
- 失败时 0-1 diagnostic。

结果：典型任务可在预算内完成，通过。

## 8. 迁移安全验收

- v2 已成为重构分支默认入口；
- 旧文件尚未删除；
- 旧文件可用于 Phase 7 回滚和对照；
- 主分支未改变；
- 迁移台账已标记旧文件为 `legacy-delete-after-validation`；
- 原始资料仍保留在 `research/incoming/`。

结果：通过。

## 9. 当前未完成事项

以下内容属于 Phase 7，不作为 Phase 6 阻塞项：

- 十类真实任务回归测试；
- 诊断层叶子文件建设；
- 仓库级旧路径残留搜索；
- 交叉链接和断链检查；
- 重复真源检查；
- 删除旧目录和旧模板；
- 最终验证报告。

## 10. 最终结论

Phase 6 满足实施计划验收标准：

- 快速模式默认零追问；
- 交互模式仅在明确共创时启用；
- 默认不强制输出备选版本；
- 未指定模型时正确使用 Generic；
- 指定 Seedance 或 LTX 时正确进入对应适配；
- `SKILL.md` 已切换到 v2；
- 旧结构已停止默认读取但尚可回滚。

当前可以进入 Phase 7。