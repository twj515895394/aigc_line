# 提炼笔记：15 秒图生 / 动作片生产密度

来源：社区成片 Prompt 结构（X / 澜森，2026-08-26），只提炼合同，不复制具体人物、剧情或原文。

状态：`extracted` → 并入现有真源，不新增平行运行文件。

## 学什么

高质量 15 秒 Prompt 不是把 30 秒时间轴缩短，而是：

1. 全局锁一次：首帧继承、身份/服饰/饰品、场景骨架、媒介、摄影机纪律。
2. 动态段只写变化：每个 3–5 秒 Beat 同时有动作任务、镜头任务、环境反馈。
3. 每段给出可读招式集合，并禁止不可读乱拳。
4. 命中才给短冲击；液体、污渍、饰品、布景破坏要持续。
5. 片长停在 15 秒；不写 20–30 秒计划。

## 不学什么

- 不把社区长 Prompt 原文写入运行期。
- 不把 30 秒六段硬时间盒做成默认。
- 不解禁关节角 / 厘米级生物力学。
- 不把一镜到底运镜菜单写成每场必跑的固定镜头模板。

## 并入位置

- 首帧继承 / 动作中点：`references/inputs/single-image-input.md`，`references/tasks/image-to-video/playbook.md`
- 15 秒序列化：`references/controls/prompt-assembly/control.md`，`references/controls/timeline-rhythm/control.md`
- 场内摄影机：`references/controls/camera-direction/control.md`，`references/tasks/action-combat-video/action-camera-handoff-playbook.md`
- 饰品 / 覆盖 / 液体：`references/controls/continuity-consistency/control.md`
- 布景骨架：`references/controls/spatial-blocking/control.md`
- 媒介锁定：`references/styles/anime-animation/style.md`，`references/styles/cinematic-live-action/style.md`
- Beat 招式可读性：`references/tasks/action-combat-video/choreography-playbook.md`
