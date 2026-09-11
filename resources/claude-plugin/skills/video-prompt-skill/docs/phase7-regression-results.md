# Phase 7 核心场景静态回归结果

## 1. 验证范围与限制

本报告验证 Reference Architecture v2 的静态运行链路：

- 输入路由是否唯一；
- 主任务 Playbook 是否正确；
- controls / libraries / style 是否按需加载；
- Generic、Seedance 2.0、LTX-2.3 是否正确分流；
- 输出合同是否匹配任务形态；
- 是否仍依赖旧运行路径。

本仓库是 Markdown Skill，不包含视频模型推理服务。因此本报告不把“模型实际生成质量”冒充为已验证结果。画面稳定性、口型精度、物理质量和模型遵循率仍需在目标平台进行外部实测。

## 2. 总结果

| 编号 | 场景 | 静态路由 | 输出合同 | 旧路径依赖 | 结果 |
|---|---|---|---|---|---|
| T01 | 纯文字单镜头写实视频 | 唯一 | 正确 | 无 | 通过 |
| T02 | 首帧图生视频 | 唯一 | 正确 | 无 | 通过 |
| T03 | 多图人物/服装/场景绑定 | 唯一 | 正确 | 无 | 通过 |
| T04 | Seedance 图/视频/音频混合参考 | 唯一 | 正确 | 无 | 通过 |
| T05 | Seedance 视频编辑与延长 | 唯一 | 正确 | 无 | 通过 |
| T06 | LTX 连续表演与对白 | 唯一 | 正确 | 无 | 通过 |
| T07 | 故事板到多镜头视频 | 唯一 | 正确 | 无 | 通过 |
| T08 | 动作戏与打击反馈 | 唯一 | 正确 | 无 | 通过 |
| T09 | AI 漫剧角色一致性 | 唯一 | 正确 | 无 | 通过 |
| T10 | 失败 Prompt 诊断与重写 | 唯一主诊断 | 正确 | 无 | 通过 |
| T11 | 15 秒图生一镜到底动作密度 | 唯一 | 正确 | 无 | 结构通过，外部成片待实测 |
| T12 | 导演台预演视频与代理替换 | 唯一 | 正确 | 无 | 通过 |
| T13 | 导演台关键帧 | 唯一 | 正确 | 无 | 通过 |

## 3. 场景结果

### T01 纯文字单镜头写实视频

实际路线：

```text
inputs/text-input.md
→ tasks/text-to-video/playbook.md
→ controls/timeline-rhythm/control.md
→ controls/realism-quality/control.md
→ styles/realistic-short-drama/style.md 或 documentary-ugc/style.md
→ models/generic.md
→ mode-quick-output-contract.md
→ single-shot-video-template.md
```

验证：Generic 默认生效；只需要一份最终 Prompt；没有 Seedance/LTX 专属语法；包含开始、推进和落点。

结果：通过。

### T02 首帧图生视频

实际路线：

```text
inputs/single-image-input.md
→ tasks/image-to-video/playbook.md
→ controls/continuity-consistency/control.md
→ controls/subject-motion/control.md
→ models/generic.md
→ single-shot-video-template.md
```

验证：重点描述从当前首帧如何运动，不长篇复述静态信息；人物、服装、场景、光源和动作阶段有连续性。

结果：通过。

### T03 多图人物、服装和场景绑定

实际路线：

```text
inputs/multi-image-input.md
→ tasks/multimodal-reference-video/playbook.md
→ controls/reference-binding/control.md
→ controls/continuity-consistency/control.md
→ models/generic.md
→ multimodal-reference-template.md
→ single-shot 或 multi-shot template
```

验证：人物、服装、场景各自有唯一主真源；辅助图有禁止继承项；禁止平均融合。

结果：通过。

### T04 Seedance 图片、视频、音频混合参考

实际路线：

```text
inputs/mixed-multimodal-input.md
→ tasks/multimodal-reference-video/playbook.md
→ controls/reference-binding/control.md
→ controls/audio-visual-sync/control.md
→ controls/prompt-assembly/control.md
→ models/seedance-2.md
→ multimodal-reference-template.md
→ model-adapted-output-template.md
```

验证：输出转换为 `@图片N / @视频N / @音频N`；每份素材职责明确；动作视频不继承原人物和背景；没有“综合参考所有素材”。

结果：通过。

### T05 Seedance 视频编辑与延长

编辑路线：

```text
inputs/video-input.md
→ tasks/video-editing/playbook.md
→ controls/reference-binding/control.md
→ controls/continuity-consistency/control.md
→ models/seedance-2.md
→ model-adapted-output-template.md
```

延长路线：

```text
inputs/video-input.md
→ tasks/video-extension/playbook.md
→ controls/continuity-consistency/control.md
→ controls/timeline-rhythm/control.md
→ models/seedance-2.md
→ model-adapted-output-template.md
```

验证：编辑区分必须保留、必须修改、允许变化和禁止变化；延长包含方向、接点状态、新增发展与新落点。

结果：通过。

### T06 LTX 连续表演与对白

实际路线：

```text
inputs/text-input.md
→ tasks/text-to-video/playbook.md
→ controls/performance-expression/control.md
→ controls/audio-visual-sync/control.md
→ controls/timeline-rhythm/control.md
→ styles/cinematic-live-action/style.md 或 realistic-short-drama/style.md
→ models/ltx-2-3.md
→ single-shot-video-template.md
→ model-adapted-output-template.md
```

验证：最终转换为连贯、现在时的自然语言导演段落；抽象情绪转为眼神、呼吸、姿态和小动作；对白拆句并插入停顿。

结果：通过。

### T07 故事板转多镜头视频

实际路线：

```text
对应 input Reference
→ tasks/storyboard-and-multi-shot-video/playbook.md
→ controls/timeline-rhythm/control.md
→ controls/spatial-blocking/control.md
→ controls/continuity-consistency/control.md
→ models/generic.md 或指定模型
→ multi-shot-video-template.md
```

验证：全片固定项、每镜主任务、动作、镜头、结束状态、镜间承接和跨包交接均有正式字段。

结果：通过。

### T08 动作戏与打击反馈

实际路线：

```text
对应 input Reference
→ text-to-video 或 image-to-video Playbook
→ controls/subject-motion/control.md
→ controls/camera-direction/control.md
→ controls/spatial-blocking/control.md
→ libraries/action-motion/library.md
→ libraries/camera-shot/library.md
→ 对应 style
```

验证：动作按准备、推进、爆点/接触、反馈、恢复组织；主体强动作时镜头降级；爆点后有新平衡。

结果：通过。

### T09 AI 漫剧角色一致性

实际路线：

```text
image / mixed input
→ tasks/storyboard-and-multi-shot-video/playbook.md
→ controls/continuity-consistency/control.md
→ controls/performance-expression/control.md
→ libraries/performance-expression/library.md
→ styles/comic-motion-drama/style.md
→ multi-shot-video-template.md
```

验证：角色身份、发型、服装主轮廓和配色稳定；采用有限动画；表情有过程；镜间有画格承接。

结果：通过。

### T10 失败 Prompt 诊断与重写

实际路线：

```text
当前 input + task
→ references/diagnostics/index.md
→ 1 份主 diagnostic leaf
→ 相关 controls
→ 当前 model adapter
→ 当前输出合同
```

验证：诊断层已有十份可执行叶子；一次只选一个主诊断；先修结构主因，不仅追加负向词；最终仍输出可用修订 Prompt。

结果：通过。

### T11 15 秒图生一镜到底动作密度

实际路线：

```text
inputs/single-image-input.md
→ tasks/action-combat-video/（持续攻防）或 image-to-video
→ continuity-consistency + camera-direction + spatial-blocking + subject-motion
→ styles/anime-animation 或 cinematic-live-action
→ prompt-assembly/control.md
→ single-shot-video-template.md
```

结构验证：15 秒生产单元；首帧继承清单与媒介锁；动作中点接续；3–4 个连续 Beat；场内摄影师纪律；饰品 / 液体 / 围观者连续。不把社区 30 秒原文写入运行期。

结果：结构通过。外部模型成片效果待实测。

### T12 导演台预演视频与代理替换

实际路线：

```text
mixed-multimodal-input.md 或 video-input.md
→ 当前任务 Playbook
→ controls/reference-binding/control.md 的导演台参考层
→ camera-direction / spatial-blocking / continuity-consistency（按缺口）
→ 当前输出模板与模型适配
```

验证：上下文识别导演台职责；预演视频负责镜头、空间、宏观动作、节奏和片尾；代理颜色、材质、风格与声音不继承；最终资产来自视觉参考、文字和剧本；输出含“导演台参考约束”；连续段落自动继承片尾锁定。

结果：通过。外部模型遵循率待实测。

### T13 导演台关键帧

实际路线：

```text
single-image-input.md 或 mixed-multimodal-input.md
→ 当前任务 Playbook
→ controls/reference-binding/control.md 的导演台参考层
→ 当前输出模板与模型适配
```

验证：关键帧只锁构图、机位状态、主体/代理物位置、朝向、比例和场景关系；运动由剧本和最终 Prompt 设计；不继承代理颜色、材质和预演渲染风格；输出含片尾锁定和代理替换说明。

结果：通过。外部模型遵循率待实测。

## 4. 模型分流检查

| 条件 | 适配结果 | 结果 |
|---|---|---|
| 未指定模型 | Generic | 通过 |
| 明确 Seedance 2.0 | Seedance adapter | 通过 |
| 任务依赖 Seedance 多模态编辑/延长 | Seedance adapter | 通过 |
| 明确 LTX-2.3 | LTX adapter | 通过 |
| 其他模型名称 | 不伪造专属适配，保持 Generic | 通过 |

## 5. 输出合同检查

- 快速模式默认零追问：通过；
- 交互模式只在明确共创时启用：通过；
- 简单任务不默认输出备选版本：通过；
- 多镜头使用全局固定项 + Prompt Pack：通过；
- 多模态输出保留必要职责：通过；
- 模型转换不改变通用剧情和空间逻辑：通过。

## 6. 旧路径依赖检查

已检查正式运行入口：

- `SKILL.md`；
- `references/index.md`；
- `assets/README.md`；
- inputs / tasks / controls / libraries / styles / models / diagnostics 分类索引。

正式入口均路由到 v2 路径。旧模式、旧输入、旧任务、旧时间轴、旧连续性、旧 style-control、旧 appendix 和旧输出规格不再参与默认运行。

## 7. 外部实测待办

以下项目必须在真实视频模型平台验证，不能由静态仓库检查替代：

- 人脸与服装真实稳定率；
- 动作和物理遵循率；
- Seedance 多模态引用和平台限制变化；
- Seedance 编辑/延长的实际保留效果；
- LTX 对白、口型和同步音频表现；
- 复杂动作、多人互动和手部接触质量。

这些项目不阻塞架构清理，但应在合并主分支后的实际使用中持续记录。
