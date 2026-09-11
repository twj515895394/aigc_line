# Phase 7 核心测试场景

## 1. 测试目标

验证 v2 运行入口能正确选择输入、任务、控制、风格、模型和输出合同，并确认旧结构可安全删除。

每个场景均记录：

- 输入与任务；
- 预期路由；
- 必须出现的输出能力；
- 不应出现的内容；
- 结果和问题。

## 2. 场景一：纯文字单镜头写实视频

### 输入

纯文字描述一个人在办公室完成一个轻动作，未指定模型。

### 预期路由

- `inputs/text-input.md`
- `tasks/text-to-video/playbook.md`
- timeline-rhythm + realism-quality
- realistic-short-drama 或 documentary-ugc（按请求）
- `models/generic.md`
- quick contract + single-shot template

### 验收

- 只输出一份最终 Prompt；
- 有初始状态、动作、镜头和自然落点；
- 不出现 Seedance 或 LTX 语法；
- 不默认输出备选和自动补全项。

## 3. 场景二：首帧图生视频

### 输入

一张首帧图，要求人物从当前姿态自然起身并离开画面。

### 预期路由

- `inputs/single-image-input.md`
- `tasks/image-to-video/playbook.md`
- continuity-consistency + subject-motion
- Generic
- single-shot template

### 验收

- 首帧继承清单只写一次，不把静态画面当小说重写；
- 重点描述从当前状态如何运动；若图是动作中点则直接接续；
- 人物、服装、场景、媒介和光源连续；
- 动作有起始、中段和完成状态；
- 默认锁在 15 秒内。

## 4. 场景三：多图人物、服装和场景绑定

### 输入

图 1 提供人物，图 2 提供服装，图 3 提供场景。

### 预期路由

- `inputs/multi-image-input.md`
- image-to-video 或 multimodal-reference-video
- reference-binding + continuity-consistency
- multimodal-reference template
- Generic

### 验收

- 每张图职责明确；
- 人物、服装和场景各有唯一主真源；
- 不平均融合；
- 明确禁止继承冲突背景和姿势。

## 5. 场景四：Seedance 图片、视频、音频混合参考

### 输入

图片提供人物和场景，视频提供动作和运镜，音频提供对白与节拍。

### 预期路由

- `inputs/mixed-multimodal-input.md`
- `tasks/multimodal-reference-video/playbook.md`
- reference-binding + audio-visual-sync + prompt-assembly
- `models/seedance-2.md`
- multimodal template + model adapted template

### 验收

- 使用 `@图片N / @视频N / @音频N`；
- 每份素材有明确职责；
- 动作视频不带入原人物和场景；
- 对白和动作绑定时间节点；
- 不写“综合参考所有素材”。

## 6. 场景五：Seedance 视频编辑与延长

### 输入 A：局部编辑

保留原视频镜头和动作，只替换服装与某个物体。

### 输入 B：向后延长

从原视频最后状态继续五秒并形成新落点。

### 预期路由

- video-input
- video-editing 或 video-extension
- continuity-consistency + reference-binding
- Seedance

### 验收

编辑输出包含：

- 必须保留；
- 必须修改；
- 允许变化；
- 禁止变化。

延长输出包含：

- 延长方向；
- 接点姿态、镜头速度、空间、光影和声音；
- 新增发展；
- 最终落点。

## 7. 场景六：LTX 连续表演与对白

### 输入

两个人物进行克制对话，包含停顿、视线和呼吸变化。

### 预期路由

- text-input
- text-to-video
- performance-expression + audio-visual-sync + timeline-rhythm
- cinematic-live-action 或 realistic-short-drama
- `models/ltx-2-3.md`
- single-shot template + model adapted template

### 验收

- 最终为连贯自然语言段落；
- 使用现在时；
- 抽象情绪转成身体表演；
- 长对白拆成短句并穿插动作和停顿；
- 镜头运动完成后描述新构图状态。

## 8. 场景七：故事板转多镜头视频

### 输入

包含多个镜号、动作阶段和跨包要求的故事板。

### 预期路由

- single-image / multi-image / mixed input（按素材）
- storyboard-and-multi-shot-video
- timeline-rhythm + spatial-blocking + continuity-consistency
- multi-shot template
- Generic 或指定模型

### 验收

- 有全片固定项；
- 每镜有任务、动作、镜头和结束状态；
- 相邻镜头承接姿态、视线、道具或空间；
- 跨包明确交接帧状态；
- 不把故事板关键帧直接误当成连续运动。

## 9. 场景八：动作戏与打击反馈

### 输入

篮球过人、追逐或打斗动作，要求动作清楚且镜头有冲击力。

### 预期路由

- text-input 或 image input
- text-to-video / image-to-video
- subject-motion + camera-direction + spatial-blocking
- action-motion + camera-shot
- 对应 style

### 验收

- 动作按准备、推进、接触 / 爆点、反馈、恢复组织；
- 重心、速度和受力可信；
- 主体强动作时镜头不过度竞争；
- 爆点后有恢复或新平衡；
- 不堆多个主运镜。

## 10. 场景九：AI 漫剧角色一致性

### 输入

多镜头漫剧角色，要求表情变化、有限动画和跨镜一致性。

### 预期路由

- image / multimodal input
- storyboard-and-multi-shot-video
- continuity-consistency + performance-expression
- performance-expression library
- comic-motion-drama style

### 验收

- 角色脸型、发型、服装主轮廓和配色稳定；
- 使用有限动画而非全元素持续运动；
- 表情有眼神、呼吸和嘴角过程；
- 镜间动作和画格承接清楚。

## 11. 场景十：失败 Prompt 诊断与重写

### 输入

用户提供一个效果失败的 Prompt，并描述变脸、镜头乱、动作漂浮或音画不同步。

### 预期路由

- 当前 input + task
- `diagnostics/index.md`
- 最相关 diagnostic leaf
- 必要 controls

### 验收

- 先识别主因和次因；
- 不只追加负向词；
- 重写后恢复初始状态、主体运动、镜头任务、连续性和落点；
- 只加载一个主诊断页；
- 最终提供可直接使用的修订 Prompt。

## 12. 场景十一：15 秒图生一镜到底动作密度

### 输入

一张双人格斗首帧图，要求 15 秒一镜到底，保持画风和人物，从当前接触姿态继续打。

### 预期路由

- `inputs/single-image-input.md`
- `tasks/action-combat-video/` 或 `tasks/image-to-video/playbook.md`（以持续攻防为主时进 Combat）
- continuity-consistency + camera-direction + spatial-blocking + subject-motion（按缺口）
- anime-animation 或 cinematic-live-action（按首帧媒介）
- prompt-assembly
- single-shot template

### 验收

- 时长为 15 秒，没有 20–30 秒时间轴；
- 开头有首帧继承清单和媒介锁定；
- 从动作中点接续，不重新起架；
- 3–4 个 Beat，每段有可见招式、接触点、镜头任务和环境反馈；
- 一镜到底写成场内摄影师纪律，不是穿人翻滚；
- 饰品 / 服装覆盖 / 血迹或汗水有连续性；
- 围观者不得无故加入；
- 结尾不默认淡出、定格、黑屏；
- 快速模式不追问。

## 12. 场景十二：导演台预演视频与代理替换

### 输入

其他素材加一段被上下文明确称为导演台/预演的段落视频；视频包含白色或彩色代理模型，用户要求替换成文字或视觉参考中定义的角色、场景和道具。

### 预期路由

- `inputs/mixed-multimodal-input.md` 或 `inputs/video-input.md`；
- 原任务 Playbook，不新增导演台任务；
- `controls/reference-binding/control.md`；
- 按缺口读取 camera-direction、spatial-blocking、continuity-consistency；
- 现有模板与当前模型适配页。

### 验收

- 根据上下文识别为导演台预演视频；
- 镜头、空间、宏观动作和片尾状态强保留；
- 代理颜色、材质、身份、风格和原声音不继承；
- 最终资产由视觉参考、文字和剧本确定；
- 最终视频提示词可细化动作，但不得改变宏观路径和接点；
- 输出包含“导演台参考约束”，不展示内部映射表；
- 单段默认对应连续镜头，连续段落自动继承片尾锁定；
- 快速模式不追问。

## 12.1 场景十三：导演台关键帧

### 输入

其他素材加一张被上下文明确称为导演台关键帧的白模或彩模画面，没有导演台预演视频。

### 预期路由

- `inputs/single-image-input.md` 或 `inputs/mixed-multimodal-input.md`；
- 原任务 Playbook，不新增导演台任务；
- `controls/reference-binding/control.md`；
- 存在混合素材时读取 `assets/templates/multimodal-reference-template.md`。

### 验收

- 关键帧锁定构图、机位状态、主体/代理物位置、朝向、比例和场景关系；
- 不从静态关键帧虚构完整运动；
- 运动根据剧本、上下文和最终 Prompt 设计；
- 代理颜色和预演渲染风格不继承；
- 输出包含代理替换、禁止继承和片尾锁定说明。

## 13. 仓库结构验证

测试内容之外还需检查：

- `SKILL.md` 和所有索引中的路径均存在；
- 新叶子没有循环引用；
- 旧路径不再被运行入口引用；
- 同一知识没有多个正文真源；
- 删除旧文件后没有断链；
- 不存在空占位目录；
- Source Manifest 和迁移台账状态一致。

## 14. 结果记录格式

```text
测试编号：
输入摘要：
实际路由：
目标模型：
输出结果：
通过 / 不通过：
发现问题：
修复提交：
复测结果：
```

核心场景静态回归通过后，记录结果；外部模型成片效果不得虚报为已实测。
