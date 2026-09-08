# 视频声音推荐设计

本参考用于在反推视频提示词时，为视频模型或后期制作提供**声音参考与推荐**。声音层默认不是“准确还原原片声音”，而是根据画面中的动作、环境、材质、空间、剪辑节奏和氛围，推荐合理、可信、不过度的声音设计。

核心原则：**声音是参考建议，不是假装准确的原声反推。**

## 0. 音频证据模式

先标注当前模式：

- `AUDIO_VERIFIED`：有可听音轨，声音事件能在时间轴定位，且未发现明显不同步。
- `AUDIO_PARTIAL`：只能确认部分层次、粗略位置或存在声画偏移；精确内容保持不确定。
- `AUDIO_UNAVAILABLE`：没有音轨、无法听清、只给了画面，或音视频对应关系不可信。

`AUDIO_VERIFIED` / `AUDIO_PARTIAL` 允许写“听到/可确认”的内容；`AUDIO_UNAVAILABLE` 只能写推荐。不要用文件格式、响度或模型常识替代实际听感证据。

## 1. 推荐声音的六个层次

### A. Dialogue / Vocal

仅在画面或用户信息明确支持时考虑：

- 对白
- 旁白
- 喊叫、耳语、笑声、哭声
- 呼吸、喘息、用力声
- lip sync 需求

如果只能看到人物张嘴，不要杜撰具体台词。可以推荐“短促对白/喊声/呼吸变化”，但不要编写原片并不存在的具体句子。

### B. Foley / Action SFX

根据可见动作和材质推荐同步拟音：

- 脚步
- 衣料摩擦
- 抓取、推门、放置物体
- 金属接触、机械卡扣
- 碰撞、跌落、碎裂
- 水花、沙土、树叶、火焰等材质反馈

声音应与材质、重量、速度、距离和动作力度匹配。

### C. Environmental Ambience

根据空间推荐环境底噪：

- 室内 room tone、通风、电流、机器低鸣
- 城市交通、人群、远处警笛
- 森林虫鸣、风吹树叶
- 海浪、风声
- 雨、雷
- 地下空间低频回响、大空间混响

Ambience 用于建立空间，不应淹没主体动作。

### D. Cinematic / Designed SFX

根据镜头节奏和视觉事件选择性推荐：

- whoosh / swish
- riser
- sub-bass hit
- impact accent
- reverse swell
- transition sweep
- low-frequency rumble
- glitch / digital pulse
- energy charge
- tonal drone

不要给每个推镜、甩镜或剪辑都机械地加 whoosh / impact。

### E. Music

推荐音乐时重点描述：

- 音乐类型和质感
- 节奏密度
- 音色/乐器族群
- 情绪功能
- 强弱变化
- 是否跟剪辑或动作同步
- 是否在关键时刻抽空、骤停或进入高潮

优先使用生成导向描述，例如：

```text
低沉电子脉冲 + 稀薄氛围合成器，节奏克制，随着追逐压力逐渐增强，但不覆盖动作声。
```

不要默认指定具体歌曲。

### F. Silence / Dynamic Contrast

留白也是声音设计的一部分。

可推荐：

- 动作前短暂安静
- 冲击前削弱环境声
- reveal 后短暂停顿
- 音乐突然抽空
- ambience 暂时退出后重新回来

不要为了“丰富”让每一秒都有声音事件。

## 2. 从视觉到声音推荐

### 视觉证据强，可以直接推荐

- 脚明显落地 → 对应地面材质脚步
- 门明显关闭 → 门体/锁舌声
- 物体碰撞 → contact / impact
- 雨水明显存在 → rain ambience
- 玻璃碎裂 → glass break
- 车辆高速行驶 → 发动机、轮胎、风噪、车身震动相关声音

### 可考虑，但应保持克制

- 快速挥臂/挥剑 → subtle whoosh
- 快速甩镜 → directional whoosh
- 能量积聚 → tonal rise / energy charge
- 大型物体高速经过 → low-frequency pass-by
- 紧张特写 → restrained low drone

### 不应自动推断

- 张嘴 → 不等于一定有具体对白
- 远处车辆 → 不一定需要清晰引擎声
- 静态霓虹灯 → 不一定需要明显电流噪声
- 慢动作 → 不代表必须使用低频拉伸音效

## 3. 声音与时间线绑定

声音推荐应跟随视觉时间线，而不是输出一个孤立的音效清单。

有音频证据时，每个关键事件同时记录：`时间`、`声音层`、`可听内容`、`视觉事件`、`关系`（同刻/略早/略晚/持续/跨切延续/仅时间重合）、`空间`（声像/距离/混响）和`置信度`。对白还记录说话人、是否能辨认台词及口型可见性；音乐还记录进入、段落、重拍或剪辑点（仅在确有听感/分析依据时）。

例如：

```text
0.0-1.8s  环境：低沉车内发动机/风噪，轻微车身震动声
1.8-2.4s  动作：人物转头 | 可加入轻微衣料摩擦
2.4s      事件：金属物体碰撞 | 同步短促 contact hit
2.4-3.0s  尾音：短空间混响，环境声继续
3.0-4.5s  音乐：紧张脉冲轻微增强，在 reveal 前稍微抽空
```

动作型镜头可参考：

```text
anticipation → breath / cloth movement
execution → restrained motion whoosh
impact → contact hit + optional low-end accent
recovery → debris / room tail + ambience return
```

## 4. 声音与运镜联动

声音可以强化镜头，但不要绑死镜头。

可考虑：

- whip pan → 短促 directional whoosh
- fast push-in → restrained tonal rise
- crash zoom → sharp transient accent
- reveal/orbit completion → tonal resolve / subtle accent
- montage cut → beat-synced click / impact / Foley

很多镜头完全可以不需要运镜音效。

## 5. 空间与声学属性

推荐声音时考虑：

- 距离：near / mid / far
- 方位：left / center / right / off-screen
- 空间：dry / small room / hall / exterior
- 混响长度
- 高频衰减
- 遮挡感
- 前后景层次

例如：

```text
近处脚步保持清晰偏干，远处人群环境声低而扩散；金属撞击带有与仓库空间匹配的短混响。
```

## 6. 推荐输出结构

默认输出为：

```text
### 推荐声音设计
- 环境底噪：...
- 动作拟音：...
- 人声/呼吸：...
- 电影化音效：...
- 音乐：...
- 留白/动态：...

### 声音时间线（需要时）
- 0.0-2.0s: ...
- 2.0-3.5s: ...
- 3.5-5.0s: ...
```

如果用户提供了可靠音频并明确要求分析原声，可以额外说明“听到的声音”，但不要让这成为默认职责。

可靠音频且同步重要时，增加：

```text
### 音画同步时间线
- 0.0–1.2s：环境持续；人物抬手与衣料声约同刻；BGM 继续，不让位
- 1.2s：物体接触声略晚于可见接触；短尾音跨过剪辑
```

## 7. 原生音频模型与独立声音 Prompt

如果目标视频模型支持原生音频，可把必要声音参考融入主视频 Prompt。

如果模型不支持、支持情况不明确，或用户希望单独控制声音，则输出：

```text
VIDEO PROMPT
...

RECOMMENDED AUDIO / SOUND DESIGN PROMPT
...
```

## 8. 质量检查

确认：

- 声音是否明确作为“推荐参考”而不是“准确原声事实”。
- 是否与动作、材质、空间和剪辑节奏对应。
- 是否避免过度 whoosh / impact 堆叠。
- 是否考虑留白和动态对比。
- 是否避免杜撰具体对白。
- 是否足够具体，让支持音频的视频模型能够参考。
- 是否区分了原声证据与创作推荐，并记录了先声/后声、跨切延续、口型/说话人和声像等真正影响音画同步的关系。
