---
name: inverse-video-prompt
description: "将参考视频、视频片段、时间戳截图或连续帧序列逆向分析为忠实、丰富、专业、可直接用于 AI 视频生成的视频提示词。用于反推视频 Prompt、分析参考视频、复刻镜头语言、主体动作、人物表演与微表情、构图、运镜、场景空间、光影、材质、视觉风格、时间连续性和叙事节奏，并可根据画面为视频模型推荐环境声、动作拟音、电影化音效、音乐与动态留白；适用于 Seedance、MiniMax/Hailuo、Kling、Veo、Wan 等视频模型。"
metadata:
  short-description: "专业反推镜头、动作、表演、微表情、光影与声音参考，生成可直接使用的视频提示词"
---

# 视频提示词反推（Inverse Video Prompt）

> **角色定位：** 从参考视频的时间连续视觉证据中，逆向还原镜头设计、人物与动作、表演、空间、光影、材质、视觉风格与节奏，并编译为丰富、专业、可生成的视频提示词。目标不是简单描述“画面里有什么”，而是解释“画面如何在时间中发生”。

## 核心原则

1. **先理解视频，再写 Prompt。** 先建立 Shot / Visual Event 时间线，再生成最终提示词。
2. **视频优先于单帧。** 描述起点、变化过程、峰值和结束状态，不把视频写成静态图片提示词。
3. **事件驱动切段，不追求逐秒逐帧。** 时间段应由剪辑边界、场景/主体状态变化、动作阶段、声音事件或节奏转折决定；没有实质变化时合并区间。每段的 `场景 / 主体 / 动作` 是核心字段，必须优先写详细，其他维度按证据和重要性补充。
4. **丰富但不虚构。** 提高描述的专业度、细节层次和可视性，但不要为了“高级”而编造剧情、焦段、灯具、速度、角度或不可见细节。
5. **描述“如何发生”。** 不只写“做了什么”“是什么情绪”，还要在证据允许时描述动作质感、表演过程、构图关系、光线作用、空间深度和时间变化。
6. **主体运动与镜头运动分开。** 根据视差、透视、构图变化等判断，不把人物靠近自动写成 dolly in。
7. **稳定信息与变化信息分开。** 身份、服装、场景、美术、色彩等放入 Global Continuity；每个 Shot 重点描述该镜头独有的变化。
8. **专业术语服务画面。** 可以使用摄影、表演、美术术语，但优先说明它在画面中实际呈现出的效果。
9. **声音默认是推荐层。** 根据可见动作、环境、节奏与氛围，为视频模型推荐合理声音参考；除非有可靠音频证据，否则不要声称原片一定存在这些声音。
10. **有可靠音轨时，声音升级为证据层。** 先判断音频是否可听、可分辨、与视频同源且时间轴可信；满足时建立 Audio / Audiovisual Event 时间线，把对白、拟音、环境、BGM、留白、声像与视觉事件配对。无法确认的片段保留不确定性，不用视觉动作反推成“原片一定有声”。
11. **忠实优先。** 默认 faithful；只有用户明确要求改编时才改变人物、场景或镜头结构。structural / style-only 才「只学镜头语法、不抄人物」。
12. **编译要对齐生成交付。** 每个镜头写成对的起始画面与结束画面，动作含入画出画（若发生），运镜能拆成任务/起点/路径/速度/停止；有可靠音频时再加音频起点、同步事件、持续层、峰值和尾音。空槽不填；不把 18 维检查清单或万能负面当完成标准。

## 工作流

### 1. 确认证据类型并默认调用 AnalyzeVideo

判断当前可用内容：

- 完整视频
- 可解码的视频文件
- 带时间戳的截图/关键帧
- 连续帧序列
- 稀疏截图
- Storyboard / Contact Sheet

**在 AIGC CANVAS 中，只要有可解码的完整视频文件或公开 HTTP(S) 视频地址，必须先调用 `AnalyzeVideo`，禁止用单帧截图、均匀抽帧或当前对话模型“看一眼”代替全片音画扫描。** `AnalyzeVideo` 使用设置页已保存的音视频分析后端（Qwen 或 Gemini 反代分析模型），工具入参不变，不要猜测或改打其他模型。

调用前：用户指向 video 节点时，先 `GetCanvasNode` 取项目内 `sourcePath`；项目外文件必须先导入到项目目录。然后：

```text
AnalyzeVideo
  videoUrl: 项目内相对路径或公开 http(s) URL
  analysisRequest: 必须同时覆盖画面与音轨，至少要求：
    - 时长、画幅、剪辑点、单镜还是多镜
    - 逐段场景 / 主体 / 动作（起点→过程→结束），事件驱动切段
    - 表演与可见微表情（看不清则标明）
    - 构图、运镜可见效果（主体运动与镜头运动分开）
    - 光影、材质、空间锚点
    - 对白/拟音/环境/BGM/留白及与画面的同步关系
    - 音频证据分级：AUDIO_VERIFIED / AUDIO_PARTIAL / AUDIO_UNAVAILABLE
    - 不确定项与采样盲区
    区分观察、转写与推断；关键结论带近似时间戳。
```

将返回的分析正文作为后续 Shot 时间线与 Prompt 编译的主证据。报告路径只作存档，不要用空报告继续反推。

如果有完整且可听的音视频，额外确认：音轨是否与画面同源、是否有剪辑/跳音/后配、能否分辨对白与说话人、明显拟音/环境/BGM/留白，以及可定位的音频事件。把音频证据分级为：`AUDIO_VERIFIED`（能听清并能定位）、`AUDIO_PARTIAL`（只能确认层次或大致位置）、`AUDIO_UNAVAILABLE`（无音轨、不可听或未提供）。不要把“模型可能生成的推荐声音”混入前两级。AnalyzeVideo 已给出分级时沿用，不要用可见动作把 UNAVAILABLE 升格为 VERIFIED。

如果必须抽帧，不要只依赖均匀采样。对于有剪辑或快速动作的视频，读取 [references/shot-analysis-and-sampling.md](references/shot-analysis-and-sampling.md)。抽帧只补充 AnalyzeVideo 的时间证据，不能替代它。

### 2. 建立 Shot / Visual Event 时间线

优先识别：

- hard cut / dissolve / wipe / flash 等编辑边界
- 机位与视点明显跳变
- 场景或空间变化
- 主体状态发生不连续变化

连续 push / pan / orbit / tracking / long take 不要因为构图逐渐变化就误拆成多个镜头。

若存在 `AUDIO_VERIFIED` 或 `AUDIO_PARTIAL`，并行建立 **Audio / Audiovisual Event 时间线**，至少记录：时间点或区间、声音层（对白/拟音/环境/BGM/留白）、可听内容、声源方位/距离/空间感、与哪个视觉事件配对、同步关系（同刻 / 先于 / 滞后 / 持续 / 跨切延续）和置信度。视觉与声音没有明确因果时写“仅时间重合”，不要强行写成拟音同步。

动作型长镜头内部可使用：

`anticipation → initiation → execution → peak/impact → follow-through → recovery`

只保留实际可见阶段。

### 3. 逐镜头反推

基础分析维度：

1. **Subject** — 人物/物体身份特征、姿态、服装、道具、相对位置
2. **Action** — 动作路径、速度、力度、交互、因果和动作阶段
3. **Performance** — 人物表演、视线、面部变化、身体张力与情绪过程
4. **Environment** — 场景、前中后景、空间锚点、天气、空气、尺度
5. **Composition** — 构图关系、画面权重、视觉中心、遮挡、空间层次
6. **Camera** — 景别、角度、机位、运动、稳定性、焦点、景深、透视变化
7. **Lighting** — 光源方向、软硬、明暗关系、色温、动态光影与曝光表现
8. **Material / Style** — 材质、纹理、表面状态、色彩、颗粒、扩散、调色和影像质感
9. **Temporal Continuity** — 哪些保持稳定，哪些随时间变化
10. **Narrative Rhythm** — setup、hold、acceleration、reveal、impact、pause、recovery、transition

有字幕、标题、价格、Logo、水印、分屏或小窗时，另记 **Graphics** 层；没有则整层缺省。

主体在镜内出现或离开时，Action 要写清入镜 / 停留 / 出镜，不要只写结果姿态。

时间粒度以内容变化为准：如果 00:00–00:04.8 内场景、主体和动作连续且没有新的事件，不要机械拆成每秒一行；如果 00:02.1 发生动作峰值、接触声或镜头任务变化，则在该处切开。每个时间段至少优先回答“在哪里、谁/什么在做什么、从什么状态到什么状态”，再补景别、机位、灯光和声音。

片种可识别时，读取 [references/genre-overlays.md](references/genre-overlays.md)，只加有证据的一层补丁。识别不出则不加载、不追问。

详细视觉拆解读取 [references/video-analysis-framework.md](references/video-analysis-framework.md)。

### 4. 进行“描述增强”

完成基础事实反推后，再判断哪些维度值得写得更细。

优先增强：

- **表演**：把“警觉、悲伤、犹豫”等抽象情绪落到眼神、嘴角、下颌、呼吸、姿态等可见表现。
- **动作质感**：描述动作路径、速度、力度、停顿、惯性、身体参与程度。
- **构图**：描述前中后景、主体占比、视觉中心、遮挡和叙事性构图关系。
- **运镜效果**：不只写 dolly / handheld，还写主体比例、视差、透视、稳定性和运动感如何变化。
- **光线作用**：写光从哪里进入、落在什么表面、如何形成高光/阴影、是否随时间变化。
- **材质**：旧化、磨损、折痕、反射、湿润、颗粒、烟雾、灰尘等可见表面特征。
- **空间与空气**：开阔/封闭、地平线、深度、热浪、雾、尘、环境运动和尺度感。
- **时间变化**：把“逐渐接近、逐渐变暗、逐渐哭泣”等写成清晰的变化过程。
- **氛围来源**：可以总结“紧张/暧昧/压抑”，但尽量说明哪些构图、动作、光影或空间因素共同形成这种氛围。

不要要求每个 Shot 都写满所有维度。根据视频重点选择性增强。

详细规则与示例读取 [references/description-enrichment.md](references/description-enrichment.md)。

### 5. 人物表演与微表情

当视频核心是人物近景、脸部特写、情绪递进或克制表演时，把 Performance 提升为重点分析层。

重点观察：

- gaze / 视线方向、移动路径和 gaze hold
- blink / 眨眼变化
- eyes / 眼周张力、眼眶湿润、泪意变化
- brows / 眉间与内外眉变化
- mouth / 嘴角、嘴唇、笑意维持或消失
- jaw / 下颌、下巴和面部肌肉张力
- breath / 呼吸、屏息、吸气、吞咽
- head / 头部幅度、静止、下巴变化
- shoulders / 肩颈姿态
- hands / 手部自我调节动作
- restraint / release / 强忍与释放

对于有明显情绪变化的连续特写，建立 **Performance Timeline**：

`initial state → subtle shift → reaction → restraint/escalation → threshold → release/end state`

例如“高兴逐渐要哭”，不要只写“从开心变悲伤”，而应描述笑意何时停顿、眼神何时变化、是否试图维持笑容、眼眶如何湿润、嘴角/下颌如何逐渐失去支撑，以及最后是否真正落泪。

只有在面部细节可见时才写微表情；墨镜、遮挡、低清、运动模糊等情况下主动降低确定性。

详细规则与 10 秒“高兴→想哭”示例读取 [references/performance-and-microexpression.md](references/performance-and-microexpression.md)。

### 6. 推断运镜

利用：

- background parallax
- subject scale change
- perspective change
- horizon / vanishing-point movement
- occlusion change
- foreground movement
- framing stability

区分 pan、tilt、track/truck、dolly、orbit、crane、handheld、zoom、roll、POV 和 compound move。

当技术类型不确定时，优先描述可见效果，而不是强行给运镜命名。

详细规则读取 [references/camera-motion-and-language.md](references/camera-motion-and-language.md)。

### 7. 建立 Global Continuity

提取跨镜头稳定属性，写成**生成连续性卡**，只写一次：

- 时长、画幅、单镜或镜数、机位是否固定
- 开场人数；每人一行角色卡（外貌、发型、服装面料/合身、配饰、当前状态）
- 道具与车辆/物体设计
- 场景几何和持续出现的空间锚点
- 时间、天气、整体光线逻辑
- 美术方向、色彩系统
- 材质、颗粒、镜头/影像质感和调色

看不清的外观降级或不写。镜头正文只写本镜变化，不重复整卡。固定机位必须写死「无推拉摇移变焦」。

### 8. 音频证据、音画同步与推荐声音参考

先输出音频证据状态：`AUDIO_VERIFIED` / `AUDIO_PARTIAL` / `AUDIO_UNAVAILABLE`。只有前两者才可以写“听到/可确认”的原声事实；`AUDIO_UNAVAILABLE` 时，声音仍是**给视频模型或后期的推荐参考**，不是原声忠实反推。

“音画同步”不只等于对齐一声撞击：还要记录先声/后声、声画错位、声音跨剪辑延续、BGM 重拍与剪辑点关系、对白与口型/视线关系、声像是否随主体或镜头移动。无法测出精确毫秒时使用“约同刻/略早/略晚”，不要编造数值。

根据画面合理推荐：

- Dialogue / Vocal（仅在内容明确时）
- Foley / Action SFX
- Environmental Ambience
- Cinematic / Designed SFX
- Music character
- Silence / Dynamic Contrast

声音要与动作、材质、空间和剪辑节奏对应，例如脚步与地面材质、门体碰撞、车内低频、风噪、雨声、远处环境声、冲击点前后的留白等。

如果无法可靠听见原声，使用“推荐/可考虑/适合加入”等表达，不要写成“原视频存在”。

详细参考读取 [references/audio-inference-and-design.md](references/audio-inference-and-design.md)。

### 9. 编译最终视频 Prompt

先写视频概览头，再按**镜头交付合同**编译每个 Shot，不要只堆静态属性。

概览头：时长 / 画幅 / 单镜或镜数 / 机位是否固定 / 主类型 / 目标模型（未指定则写未指定）。

每个镜头五段：

```text
SHOT 01 — [time]
起始画面：第一帧的完整可见状态
主体动作：如何从起始动到结束；若发生，写出入镜 / 停留 / 出镜
摄影机运动：任务 + 起点 + 路径 + 速度 + 停止；固定则写死不动
结束画面：最后一帧的完整可见状态
镜头衔接：HARD CUT / DISSOLVE / MATCH CUT / 连续长镜无切 等
```

当音频证据为 `AUDIO_VERIFIED` 或 `AUDIO_PARTIAL`，在五段之后按需增加一行：

```text
音画同步：视觉事件与可确认声音的时间关系；持续环境/BGM、声源方位、先声/后声、让位/留白和跨切延续。
```

`AUDIO_UNAVAILABLE` 时不要伪造同步事实；可另列“推荐声音设计”，并明确它是生成建议。

多镜头在五段之前只出现一次 GLOBAL CONTINUITY。不要把真实剪辑错误改写为一个连续运镜。

成品词末尾加**当前风险负面** 3–8 条，只写本片最容易翻车的项。

详细编译规则读取 [references/prompt-compilation.md](references/prompt-compilation.md)。

如果用户指定生成模型，读取 [references/model-adapters.md](references/model-adapters.md)。

### 10. 输出前检查

确认：

- 重要 Shot 和动作顺序正确。
- 每个镜头有成对的起始画面与结束画面。
- 入画/出画若发生已写路径；未发生未编造。
- 运镜能拆成任务/起点/路径/速度/停止，或已写死固定机位。
- 视频描述包含时间变化，而不是静态属性堆叠。
- 人物情绪尽量落到可见表演上。
- 动作写清“如何发生”，而不只是结果。
- 光线、材质、空间有足够专业的可视描述。
- 新增细节没有超出证据。
- 角色卡与全局连续性只写一次，镜头间没有漂移。
- 无图形证据时没有空的字幕/小窗字段。
- 微表情在可见时足够细，在不可见时不虚构。
- 没有 8K / 帧率 / 抗锯齿 / 无噪点 等无证据画质开关。
- 负面是本片 3–8 条当前风险，不是万能清单。
- 声音使用“推荐”逻辑，不冒充准确原声。
- 已区分音频证据状态；有可靠音频时，关键声音事件已与视觉事件配对，并保留先声/后声/跨切/留白等关系；无可靠音频时没有伪造原声同步。
- 最终 Prompt 丰富但开放，不因为规则过多而变成僵硬的生成脚本。

## 默认输出

内部始终先建时间线再编译。对外按密度返回。

### 快速交付（默认，用户未指定格式）

1. **视频概览头** — 时长、画幅、单镜或镜数、机位是否固定、主类型、目标模型。
2. **全局连续性** — 生成连续性卡，短，只写一次。
3. **最终反推视频提示词** — 按镜头交付合同编译，可直接复制。
4. **当前风险负面** — 本片 3–8 条。
5. **关键不确定项** — 只列会显著改变生成结果的内容。

### 只要 Prompt

用户说只要 Prompt / prompt-only：只返回最终反推视频提示词 + 当前风险负面。

### 完整拆解

用户要求分析、分镜、时间线或完整版时，在快速交付之外再给：

1. **反推摘要** — 视频整体视觉策略、表演/动作、镜头与节奏。
2. **镜头时间线** — Shot / 时间段、构图、动作/表演、运镜、关键变化、转场。
3. **Performance Timeline** — 仅当人物表演或微表情是核心时输出。
4. **推荐声音设计** — 根据画面为视频模型提供可选参考。
5. **音画同步时间线** — 仅当音频证据为 `AUDIO_VERIFIED` 或 `AUDIO_PARTIAL` 且同步关系会影响复刻时输出。
6. **片种补丁字段** — 仅当已加载且有证据。

## Fidelity Modes

- **faithful** — 尽量忠实复刻镜头、表演、动作、空间、光影、材质、风格与节奏。
- **structural** — 保留镜头结构、动作和节奏，允许更换人物/场景。
- **style-only** — 只提取摄影、美术、光影、材质与风格语言。
- **prompt-only** — 内部分析，最终只输出视频提示词。

## Reference Loading

按任务加载，不要一次读取全部：

- 视频整体分析：[references/video-analysis-framework.md](references/video-analysis-framework.md)
- Shot 与采样：[references/shot-analysis-and-sampling.md](references/shot-analysis-and-sampling.md)
- 描述丰富度与专业表达：[references/description-enrichment.md](references/description-enrichment.md)
- 人物表演与微表情：[references/performance-and-microexpression.md](references/performance-and-microexpression.md)
- 运镜判断：[references/camera-motion-and-language.md](references/camera-motion-and-language.md)
- 声音推荐：[references/audio-inference-and-design.md](references/audio-inference-and-design.md)
- Prompt 编译：[references/prompt-compilation.md](references/prompt-compilation.md)
- 片种补丁（可识别类型时）：[references/genre-overlays.md](references/genre-overlays.md)
- 模型适配：[references/model-adapters.md](references/model-adapters.md)
- 校准示例：[references/examples.md](references/examples.md)

## 避免低质量反推

不要：

- 把均匀截图等同于完整视频理解。
- 只描述漂亮的一帧而忽略变化过程。
- 用“开心/悲伤/紧张”替代表演细节。
- 用“cinematic / epic / high quality”替代真实摄影、美术和材质特征。
- 只写动作结果，不写运动方式。
- 只写运镜名称，不写画面运动效果。
- 为了专业感虚构焦段、速度、灯具和精确参数。
- 在看不清脸部时编造微表情。
- 把声音推荐描述成准确原声。
- 把 Shot 剪辑错误合并成不可能的连续镜头。
- 输出一段漂亮散文，却缺乏时间线、动作、表演、运镜和可生成结构。
- 每镜必填 18 维、三分法/黄金螺旋/伦勃朗光等无证据术语。
- 把 8K / 帧率 / 抗锯齿 / 无噪点写成反推字段。
- 粘贴万能负面百科，或给风景镜机械写手指融合。
- 把「只学镜头、不抄人物」当成默认；那是 structural / style-only。
- 无字幕、无小窗时仍输出空的图形填空。
