# Controls Index

控制层负责“怎么判断、怎么协调、怎么限制”，不负责罗列大量术语，也不替代任务 Playbook。

普通有人对白 / 反应 / 环境的视频，先固定读取下面 4 份最低控制页，不计入后面的按缺口名额：

- `camera-direction/control.md`
- `performance-expression/control.md`
- `audio-visual-sync/control.md`
- `spatial-blocking/control.md`

然后再按当前最大缺口读取 `0-3` 份控制页，不为了增加细节默认加载整个控制层。纯物体展示、无人物、无对白、无环境叙事时，可不读表演页，但仍须写运镜或固定机位声明、声音决定和环境来源。

## timeline-rhythm

读取：

- `timeline-rhythm/control.md`

处理：

- 绝对时间轴；
- 开场、推进、高潮、反馈和收束；
- 动作与情绪节拍；
- 镜头密度；
- 多镜头承接；
- 自然停顿和结尾落点。

## subject-motion

读取：

- `subject-motion/control.md`

处理：

- 主体动作目标；
- 起势、推进、接触、反馈、恢复；
- 重心、惯性、速度和受力；
- 人物、动物、物体和环境运动；
- 主体运动与镜头运动的强度协调。

## camera-direction

读取：

- `camera-direction/control.md`

处理：

- 景别和机位如何选择；
- 镜头为什么移动；
- 主运镜、速度和运动路线；
- 焦点转移；
- 轴线和运动方向；
- 镜头失控、漂移和炫技过载。

## spatial-blocking

读取：

- `spatial-blocking/control.md`

处理：

- 人物站位；
- 视线和朝向；
- 前中后景；
- 出入口和行动路线；
- 道具状态；
- 角色、道具和镜头之间的空间关系。

## continuity-consistency

读取：

- `continuity-consistency/control.md`

处理：

- 人物身份、脸部、发型、服装；
- 场景结构和道具状态；
- 动作阶段和体态重心；
- 光影和方向连续性；
- 跨镜、跨段和跨参考素材的一致性。

## performance-expression

读取：

- `performance-expression/control.md`

处理：

- 表演目标；
- 眼神、眉眼、嘴角、呼吸和小动作；
- 对白前后停顿；
- 情绪变化过程；
- 口型和面部一致性风险。

## audio-visual-sync

读取：

- `audio-visual-sync/control.md`

处理：

- 对白、旁白、环境音、拟音、BGM；
- 节拍点和视觉事件绑定；
- 声音进入、持续、退出；
- 口型同步；
- 音画同步和声音空间。

## reference-binding

读取：

- `reference-binding/control.md`

处理：

- 主参考与辅助参考；
- 素材职责分配；
- 局部参考；
- 多图、多视频、多音频冲突；
- 禁止平均融合；
- 参考强度和保留边界。

## prompt-assembly

读取：

- `prompt-assembly/control.md`

处理：

- 信息优先级；
- 通用导演方案的组织顺序；
- 时间轴与全局约束如何组合；
- 正向描述和负向限制的比例；
- 画面维度密度与主事件过载的分界；
- 去重和冲突裁决，不自动压缩细节；
- 与模型适配层的交接边界。

## realism-quality

读取：

- `realism-quality/control.md`

处理：

- 去 AI 漂浮感和动态海报感；
- 真实设备记录感；
- 物理可信；
- 自然表演和微小不完美；
- 光影、材质和环境反馈的一致性。

## 常用组合

### 文生视频基础

先读最低 4 份（镜头 / 表演 / 音画 / 空间），不占 `0-3` 名额；再按需：

- `timeline-rhythm/control.md`
- `prompt-assembly/control.md`

按缺口再补主体运动或连续性。不得只读时间轴和组装页，就把景别当成运镜、把身份词当成表演。

### 图生视频基础

- `reference-binding/control.md`
- `continuity-consistency/control.md`

动作复杂时补 `subject-motion/control.md`，镜头易漂或一镜到底时补 `camera-direction/control.md`。首帧任务必须锁继承清单和媒介，从动作中点接续，不把 15 秒写成 30 秒。

### 写实人物短片

先读最低 4 份（已含表演、镜头、空间、音画），不占 `0-3` 名额；再按需：

- `realism-quality/control.md`
- `timeline-rhythm/control.md`

按缺口再补连续性或主体运动。人物短片缺角色卡、空间物件、运镜公式、表演链或 BGM 决定 = 组装 FAIL，不是靠压词数修。

### 动作与体育

- `subject-motion/control.md`
- `camera-direction/control.md`
- `spatial-blocking/control.md`

### 短时高强度 Action Combat

当任务同时满足以下条件时，`subject-motion/control.md` 从“优先读取”升级为**条件必读**：

- 约 `10–20s` 的短时 Combat；
- 以持续近身攻防 / High Kinetic Scope 为主体；
- 成败明显依赖 Whole-body、Footwork、Support / Balance、Range / Position / Axis / Route 变化；
- 或当前已出现动作断裂、上肢锁死、脚步 / 支撑只作修饰语等风险。

命中后必须读取：

- `subject-motion/control.md`

它占用普通 `0-3 Controls` 中的 `1` 个名额；剩余名额继续按缺口竞争。不得因为已经读取 Choreography / Combat Core / Continuity，就假定主体运动控制已经覆盖。

在上述条件下，其余 Controls 的默认竞争优先级为：

1. `camera-direction/control.md`
2. `spatial-blocking/control.md`
3. 其他当前真实 Gap

这不是所有 Combat 的固定三件套。若 Camera 或 Blocking 当前并非主要风险，剩余名额仍按实际 Gap 选择。

`continuity-consistency/control.md` 不作为纯文字、单段、短时高强度 Combat 的默认第三项。只有出现以下一类或多类明显风险时，它才提高优先级并可替换剩余某个 Control：

- 多参考素材需要锁定人物 / 服装 / 场景主真源；
- 多镜头 / 多片段需要跨 Shot / Segment 维持身份、道具或场景状态；
- 已知模型 / 既有测试存在明显变脸、服装跳变、场景结构漂移；
- 当前任务的主要失败已经是 Identity / Prop / Scene Continuity，而不是 Motion / Camera / Blocking。

对于单段纯文字高强度 Combat，如果 `continuity-consistency` 只是重复“人物、服装、场景保持一致”并带来大量 Negative，而 `subject-motion` 命中了上述条件却未读取，则直接判 Control Routing FAIL，必须让出配额并补读 `subject-motion`。

该规则只影响 Control Loading，不替代 Combat Task 内部的 State / Continuity Engine；人物、位置、Range、Contact、Momentum 与 Action State 的连续性仍由 Action Combat Core / Choreography / Action–Camera Runtime 必须保证。

### 多模态与音频

- `reference-binding/control.md`
- `audio-visual-sync/control.md`
- `prompt-assembly/control.md`

## 选择规则

- 任务页已经能解决的问题，不额外读取控制页。
- **短时高强度 Action Combat 命中上面的 subject-motion 条件必读时，不得用本条“任务页已能解决”跳过。**
- 需要具体术语或选项时读取 `libraries/`，而不是继续扩写控制页。
- 用户明确指定风格时读取 `styles/`。
- 用户反馈生成失败且原因跨多个维度时，读取 `diagnostics/`。
- 模型能力、参数和素材引用语法统一读取 `models/`。
- 同一轮命中同一个控制页时只读取一次。
- 已经读取三份控制页仍无法解决时，优先检查任务是否过载，而不是继续堆控制页。
