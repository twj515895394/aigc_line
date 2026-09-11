# Video Prompt Skill Reference Architecture v2 最终验证报告

## 1. 验证对象

分支：`refactor/reference-architecture-v2`

本报告验证以下内容：

- v2 `SKILL.md` 运行入口；
- inputs、tasks、controls、libraries、styles、models、diagnostics 分层；
- 快速模式、交互模式和任务输出合同；
- Generic、Seedance 2.0、LTX-2.3 分流；
- 十类静态回归场景；
- 旧路径替换和清理；
- 原始资料追溯和单一真源原则。

## 2. 验证方法

### 2.1 已执行

- 逐项检查 `SKILL.md` 的输入、任务、控制、风格、模型和模板路由；
- 检查各分类索引是否指向唯一叶子真源；
- 对十类核心场景执行静态路由模拟；
- 核对快速和交互模式输出合同；
- 核对 Generic、Seedance、LTX 输出转换；
- 建设十份失败诊断叶子并验证唯一主诊断路由；
- 对旧文件逐份读取、确认新真源覆盖关系后删除；
- 使用分支对比确认新增、修改和删除结果。

### 2.2 验证边界

本仓库是 Markdown Skill，不包含视频模型推理服务。以下项目未被虚报为已完成：

- 视频画面真实生成质量；
- 人脸、服装和角色在目标模型中的实际稳定率；
- 手部、接触和复杂物理的实际成功率；
- Seedance 产品界面和能力限制的实时变化；
- LTX 实际口型和同步音频质量。

这些属于外部模型运行验证，而不是仓库结构验证。

## 3. 架构验收

| 层 | 数量 | 结果 |
|---|---:|---|
| 输入 Reference | 6 | 通过 |
| 任务 Playbook | 8 | 通过 |
| 核心 Control | 10 | 通过 |
| Library | 7 | 通过 |
| Style | 7 | 通过 |
| Model Adapter | 3 | 通过 |
| Diagnostic Leaf | 10 | 通过 |
| 输出合同 / 模板 | 6 | 通过 |

### 3.1 分层边界

- inputs 只理解输入和素材职责；
- tasks 只决定当前执行任务和交付流程；
- controls 负责判断、协调和限制；
- libraries 提供详细选项；
- styles 说明风格如何被执行；
- models 只处理模型能力和表达差异；
- diagnostics 只在失败后定位主因；
- templates 只规定对外交付结构。

结果：通过。

### 3.2 单一真源

- 时间轴与自然收尾统一在 `controls/timeline-rhythm/control.md`；
- 镜头决策统一在 `controls/camera-direction/control.md`；
- 角色与状态连续性统一在 `controls/continuity-consistency/control.md`；
- 详细镜头术语统一在 `libraries/camera-shot/library.md`；
- 动作结构统一在 `libraries/action-motion/library.md`；
- 风格实现统一在 `styles/`；
- 模型差异统一在 `models/`。

结果：通过。

## 4. 运行入口验收

`SKILL.md` 已覆盖：

- 纯文字、单图、多图、视频、音频、混合多模态输入；
- 文生、图生、多模态参考、视频复刻、编辑、延长、音频驱动、故事板多镜头；
- 快速 / 交互模式；
- Reference 加载预算；
- 信息优先级和冲突裁决；
- Generic / Seedance / LTX 模型选择；
- 单镜头、多镜头、多模态和模型转换模板；
- 失败诊断入口；
- 输出前检查与严禁事项。

结果：通过。

## 5. 输出合同验收

### 快速模式

- 默认零追问；
- 简单任务只输出一份可复制 Prompt；
- 不默认输出备选版本；
- 不默认展示自动补全项和内部分析；
- 多镜头和多模态仅展开执行所需结构。

结果：通过。

### 交互模式

- 只有用户明确共创时启用；
- 每次只问一个关键问题；
- 每次给出推荐答案和理由；
- 已确认信息不重复询问；
- 只剩轻微细节时自动收口。

结果：通过。

## 6. 模型适配验收

### Generic

- 未指定模型时默认使用；
- 不伪造平台参数和素材语法；
- 保留清楚的模型无关导演方案。

结果：通过。

### Seedance 2.0

- 支持显式 `@图片N / @视频N / @音频N` 职责绑定；
- 多模态参考、编辑、延长和卡点任务拥有明确结构；
- 不允许用“综合参考所有素材”替代职责分配。

结果：通过。

### LTX-2.3

- 最终默认转换为流动、具体、现在时的自然语言导演段落；
- 图生视频强调接下来如何运动；
- 对白、眼神、呼吸、动作和停顿处于同一表演过程。

结果：通过。

## 7. 回归测试

十类静态路由测试全部通过：

1. 纯文字单镜头写实视频；
2. 首帧图生视频；
3. 多图人物、服装和场景绑定；
4. Seedance 图片、视频、音频混合参考；
5. Seedance 视频编辑与延长；
6. LTX 连续表演与对白；
7. 故事板到多镜头视频；
8. 动作戏与打击反馈；
9. AI 漫剧角色一致性；
10. 失败 Prompt 诊断与重写。

详细结果：`docs/phase7-regression-results.md`。

## 8. 诊断层验收

新增诊断：

- identity-drift；
- motion-discontinuity；
- camera-chaos；
- spatial-teleportation；
- anatomy-contact-failure；
- physics-and-weightlessness；
- lip-sync-and-dialogue-failure；
- audio-visual-mismatch；
- prompt-overload-and-conflict；
- reference-role-conflict。

每份叶子均包含现象、根因、检查顺序、最小修复、重写骨架和完成标准。一次只读取一份主诊断。

结果：通过。

## 9. 旧结构清理结果

已删除 21 个旧运行文件：

- 3 个旧输出模板；
- 2 个旧模式 Reference；
- 2 个旧输入 Reference；
- 2 个旧任务 Playbook；
- 2 个旧输出规格；
- 2 个旧时间轴文件；
- 2 个旧连续性文件；
- 2 个旧 style-control 文件；
- 4 个旧 appendix 文件。

Git 在文件删除后自动移除空目录。正式入口不再依赖这些路径。

结果：通过。

## 10. 资料治理

- 17 份用户原始资料保留在 `research/incoming/user/`；
- `research/source-manifest.md` 记录来源和处理状态；
- 原始资料经过拆分、去重和抽象后才进入运行期 Reference；
- 社区长 Prompt 未原样复制为运行规则；
- `awesome-seedance-2-prompts` 仍保留 reviewing 状态，没有虚报为全量审计完成。

结果：通过。

## 11. 分支状态

最终结构核对时：

- 重构分支相对 `main` 单向领先；
- 不落后主分支；
- 主分支未被修改；
- 新结构、诊断、文档和删除记录均存在于重构分支。

## 12. 最终结论

Reference Architecture v2 的仓库设计、运行入口、输出合同、模型分流、失败诊断、静态回归和旧结构清理均已完成。

当前分支已经达到提交评审或合并主分支的条件。

合并后建议继续以真实 Seedance、LTX 和 Generic 工作流采集实际生成反馈，并只通过 diagnostics 与现有真源增量修正，不重新建立重复目录。

## 13. 2026-08-27 增量：15 秒生产密度

本轮只扩展现有真源，不新增平行 task / control / style。

已并入：

- 默认生产单元 15 秒，不写 20–30 秒时间轴；
- 首帧继承清单 + 动作中点接续；
- 媒介锁定与动作冲击预算；
- 长镜头场内摄影师纪律；
- 饰品 / 服装覆盖 / 液体 / 围观者连续性；
- 复杂场面继承场景骨架；
- 15 秒 3–4 个连续 Beat 的招式可读性合同。
- 2026-08-27 续：过载只判定独立主事件是否超出指定时长；画面各维度写细不得自动压缩。结构已写入 `prompt-assembly` 2.0 与 `timeline-rhythm`。

结构场景 T11 已记录。外部模型成片效果待实测，不得虚报 Generated Video PASS。

## 14. 2026-09-08 增量：导演台参考层

本轮扩展现有 `reference-binding`、输入路由、混合参考任务和多模态输出模板，没有新增平行 task / control / style / model adapter。

已并入：

- 上下文识别的导演台预演视频与导演台关键帧职责；
- 段落级导演台，默认一个连续镜头；
- 预演视频负责动态镜头、空间、宏观动作、节奏和片尾；
- 关键帧负责构图、机位状态、代理物位置和目标状态，运动由剧本与最终 Prompt 设计；
- 代理颜色、材质、身份、声音和预演渲染风格默认不继承；
- 代理替换映射、动作细化边界、片尾锁定和连续段落自动承接；
- 快速模式自动生成“导演台参考约束”，无导演台素材时不增加该区块；
- T12/T13 静态回归场景。

结果：结构验证通过，路径与职责分层待静态回归命令复核；外部模型对预演镜头遵循、代理替换和跨段接续的实际效果待实测。
