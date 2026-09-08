# 单镜头视频模板

## 适用范围

用于单一主动作、单一情绪变化或单一主要观看任务的视频生成单元。

**本模板中的 `single-shot-video` 表示单一视频生成单元 / 单一主要观看任务，不自动等于电影剪辑术语中的“一镜到底 / one-take”。**

除非用户明确要求一镜到底、长镜头，或目标模型 / 输入形式确实要求严格连续摄影，否则一个 15 秒视频单元内部可以存在有目的的 Cut、Insert、Reaction、Impact Shot 和 Re-establish。

## 内部组装字段

```text
任务与时长：
输入 / 参考职责：
开场角色卡（人数 + 每人外貌 / 穿着 / 当前状态；Combat 含打法特长）：
空间最小模型（地点、前中后景、光来源；简单场景 2–4 物件，复杂场面继承场景骨架）：
首帧继承清单 / 媒介锁定（若图生）：
初始画面与主体状态：
主体动作或表演链（峰值人物：起始 → 触发 → 可见信号 → 停顿 → 结束）：
Camera Coverage / Shot 关系（任务 + 起始 + 主运动 + 路线 + 速度 + 停止；只有景别 = FAIL）：
画框锁定（若用户锁了可见范围：上沿 / 下沿 / locked frame 或 micro-reframe only）：
画外驱动（主动作在画外时：一句原因 + 画内身体后果）：
环境、周边物件、光影和材质变化：
对白、环境音、拟音和 BGM 决定（加或不加都要写）：
最终落点：
连续性与高风险限制：
模型适配：
```

只保留当前任务实际需要的字段。

## 默认最终输出

快速模式默认将字段合并成一份可直接复制 Prompt：

```text
生成一段 [默认 15 秒] 的 [任务 / 风格] 视频。[输入参考及职责，如有]。开场 [N] 人：[每人一行角色卡]。空间：[地点 + 前中后景 + 有位置的物件或场景骨架 + 光来源]。[图生则先锁首帧继承清单和媒介，再从当前姿态或动作中点接续]。从 [起始景别、机位] 建立 [主体 / 空间关系]，镜头 [主运动 + 路线 + 速度 + 停止]。[主体按 15 秒内 3–4 个 Beat 完成动作，每段写可见动作、接触点和镜头任务]；表演峰值人物 [起始 → 触发 → 可见信号 → 停顿 → 结束]。[头发、服装、饰品、道具和环境的响应]。声音：[环境层来源] + [拟音/事件] + [对白或身体声] + [BGM：无/有，原因与进出]。最终 [动作、视线、重心、镜头和声音的落点，不默认淡出/定格/黑屏]。全程保持 [身份、服装、饰品、场景、媒介和运动方向] 连续，避免 [当前最危险的 3-6 项失败]。
```

## 时间轴使用条件

普通视频单元满足以下任一条件时，可在 Prompt 内使用绝对时间：

- 时长较长且有三个以上清晰动作阶段；
- 存在对白与动作同步；
- 存在音乐重拍或特效节点；
- 镜头在明确节点改变状态；
- 用户明确要求分秒控制。

结构：

```text
0.0-Xs：初始状态与第一动作；镜头状态；声音。
X-Ys：推进或变化；镜头响应；环境反馈。
Y-结束：动作完成；表演停顿；镜头与声音落点。
```

不要为了显得专业把一个简单动作机械拆成过多小段。

### Action Combat Override

当当前主任务是 `action-combat-video`，且属于 High / Medium-high Coverage、高手连续攻防、追击 / 反追击或其他高密度 Combat 时，上面的“时长较长 + 3 个以上阶段”**不能自动触发 Hard Timeline**。

Combat 默认继承 Task / Prompt Assembly 已确定的：

> **Continuous Action Spine + Soft Time Anchors**

也就是大部分 Active Exchange 作为一条连续动作主链书写，只在以下位置使用少量软时间锚点：

- Setup / First Contact；
- Major Advantage Reversal；
- Signature Moment / Major Payoff；
- Ending；
- 用户明确要求或模型 / 音画同步真正需要的关键时点。

禁止为了套模板自动生成：

```text
0–1.5s：动作 A
1.5–4s：动作 B
4–7s：动作 C
7–10s：动作 D
...
```

如果这些块把同一场连续搏斗切成“完成一组 → 停 / 归位 → 下一组”，则模板使用失败。

图生首帧、一镜到底或 15 秒高手对决时，可以把 Soft Time Anchors 写成 **3–4 个 Beat 标题**（约 0–3 / 3–8 / 8–13 / 13–15 秒）。这仍是连续动作链，不是每 1–2 秒一个 Reset 盒，也不是 20–30 秒计划。

只有以下情况可以在高密度 Combat 中恢复更碎的 Hard Time Blocks：

- 用户明确要求逐秒动作；
- 需要精确 Shot 边界；
- 对白 / 音乐 / 外部事件精确同步；
- Model Adapter 有真实 Benchmark 证据表明严格时间轴更稳定。

即使恢复 Hard Time Blocks / Beat 标题，块与块之间仍必须继承 Contact / Momentum / Footwork / Axis / Range / Position 等 Motion Handoff；**时间块边界不能成为 Neutral Reset。**

> **Combat 专项时间序列化规则优先于通用模板默认时间轴规则。**

### Action Combat Camera Override

> **Action Continuity ≠ Shot Continuity。**

Combat 的 Continuous Action Spine 只约束战斗动作与状态连续，不要求整个视频单元使用一条连续 Camera Path。

如果用户没有明确要求一镜到底，Combat 可以根据动作信息动态使用：

- Master / Relationship Shot；
- Medium / Medium-wide；
- Contact / Weapon / Footwork Close-up；
- Insert；
- Reaction / Impact Shot；
- Re-establish。

Cut 前后必须继承 Position / Direction / Contact / Momentum / Axis / Range；局部镜头之后如果空间关系可能丢失，应通过 Re-establish 恢复可读性。

禁止把“动作可读”机械实现为全程中全景 / 中景 + 轻微 tracking，也禁止为了“电影感”固定加入若干特写配额。

## 图生视频补充

图生视频应优先写“从当前画面接下来如何运动”：

```text
基于参考图，先锁首帧继承清单，再从当前姿态或动作中点接续。[主体动作]，[头发、服装、饰品、道具和背景响应]；Camera [移动 / Cut / 聚焦]，保持原图身份、构图逻辑、光源和媒介，最终停在 [状态]。
```

继承清单只写一次，不要把静态画面当小说重写；也不要完全不锁人、场、光、媒介。

## 表演镜头补充

人物表演优先写：

```text
眼神落点 → 呼吸 / 停顿 → 眉眼与嘴角变化 → 小动作 → 台词或反应 → 情绪落点
```

抽象情绪必须转成可观察表演。

## 动作镜头补充

普通动作镜头优先写：

```text
准备 / 蓄力 → 推进 → 接触或爆点 → 受力反馈 → 恢复或新平衡
```

对于 Action Combat，不把这条普通动作骨架机械重复到每一个 Phrase；应优先服从 Combat Task 的 Action Phrase、Motion Handoff、Kinetic Scope 和 Continuous Action Spine，使新的平衡 / 受力状态直接成为后续动作入口。

主体动作强时通常降低无必要 Camera Complexity；**不等于让 Camera 静止，也不等于禁止 Cut / Close-up / Insert。** 如果人物发生明显 Position / Range / Axis / Route 变化，单个 Shot 内应继承 Camera Mobility；整段 Coverage 则按动作信息动态选择景别与 Cut。

## 输出检查

- 是否只有一个主观看任务；
- 是否写清人数和开场角色卡；
- 是否写清初始状态；
- 空间是否有前中后景和有位置的周边物件；
- 主体运动和 Camera 观察策略是否分开；
- 单个 Shot 的镜头是否有任务、起点、主运动、路线、速度和停止点，而不是只写景别；
- Cut 后动作方向 / Position / Contact / Momentum / Axis 是否连续；
- 环境反馈是否有物理来源；
- 表演是否写成可见信号链；
- 声音是否分层，BGM 是否显式决定；
- 最后一拍是否自然停住；
- 是否删除了无关备选和自动补全说明；
- 是否已经按 Generic、Seedance 或 LTX 正确转换；
- 如果是高密度 Action Combat，是否锁在 15 秒、用 3–4 个连续 Beat 写细，而没有扩成 30 秒或切成 Reset 盒；
- 是否误把 `single-shot-video` 理解成 one-take；
- 是否误把动作可读性实现成全程中全景 / 中景；
- 如果 Combat Task 已提供 Continuous Action Spine / Camera Coverage，模板是否完整继承而没有覆盖。
