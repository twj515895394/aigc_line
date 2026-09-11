# Phase 4 资料库与风格层验收报告

## 1. 验收范围

- 七类 `libraries/` 叶子真源；
- 七类 `styles/` 叶子真源；
- 两份分类索引；
- Phase 4 来源提炼记录；
- Source Manifest 与迁移台账同步。

## 2. 资料库验收

| 分类 | 真源 | 回答的问题 | 结果 |
|---|---|---|---|
| camera-shot | `camera-shot/library.md` | 有哪些景别、机位、焦段、设备与运镜 | 通过 |
| action-motion | `action-motion/library.md` | 动作、打击、体育和物理反馈有哪些结构 | 通过 |
| performance-expression | `performance-expression/library.md` | 有哪些表情、微表情、对白和小动作 | 通过 |
| transition-effects | `transition-effects/library.md` | 有哪些剪辑、转场、材质变化和特效 | 通过 |
| lighting-color | `lighting-color/library.md` | 有哪些光源、光影、色调和动态光 | 通过 |
| audio-sound | `audio-sound/library.md` | 有哪些对白、环境音、拟音、BGM 和声音空间 | 通过 |
| genre-patterns | `genre-patterns/library.md` | 不同题材常用什么节拍与组合 | 通过 |

验收结论：资料库只提供选项和结构，没有重复任务流程，也没有写模型专属语法。

## 3. 风格层验收

| 风格 | 核心差异 | 结果 |
|---|---|---|
| cinematic-live-action | 摄影、空间、表演、光影和声音共同建立电影化写实 | 通过 |
| realistic-short-drama | 信息、人物关系和短时长可读性优先 | 通过 |
| anime-animation | 角色渲染、关键姿态和分层运动 | 通过 |
| comic-motion-drama | 画格、有限动画、表情与镜间承接 | 通过 |
| commercial-advertising | 产品锚点、卖点证据、材质与品牌落点 | 通过 |
| documentary-ugc | 真实设备来源、拍摄者位置和自然不完美 | 通过 |
| experimental-visual | 单一视觉规则、分阶段升级和新稳定状态 | 通过 |

验收结论：每个 style 回答“如何拍出来”，大型术语表通过链接复用 libraries，没有复制正文。

## 4. 单一真源检查

- 景别、机位和运镜详细选项只在 camera-shot library。
- 动作节拍和类型选项只在 action-motion library。
- 表情选项只在 performance-expression library。
- 光影和色调选项只在 lighting-color library。
- 声音选项只在 audio-sound library。
- 题材模板只在 genre-patterns library。
- style 只组合执行，不重新维护完整选项库。
- control 继续负责判断方法和协调规则。

结果：通过。

## 5. 来源治理检查

- 17 份用户资料均已标记为 `merged`。
- 发型资料仅提炼视频动态与一致性部分。
- 社区长 Prompt 未原样进入运行期 Reference。
- `awesome-seedance-2-prompts` 仍保持 `reviewing`，未虚报全量审计完成。
- LTX 和 Seedance 专属能力仍留在模型适配层。

结果：通过。

## 6. 加载预算检查

典型任务均可在预算内完成：

- 写实短剧：1 task + 2 controls + 1 style + 1-2 libraries。
- 动作体育：1 task + 3 controls + 1 style（可选）+ 2 libraries。
- 图生漫剧：1 input + 1 task + 2 controls + 1 style + 2 libraries。
- 产品广告：1 task + 2 controls + 1 style + 2 libraries。
- 多模态音频：1 input + 1 task + 3 controls + 1 model + 1-2 libraries。

结果：通过。

## 7. 已知待办

- Phase 6 需要输出合同来决定最终是否展示备选版本、素材职责表和自动补全项。
- Phase 6 重写 `SKILL.md` 后，需用真实任务验证路由是否只加载必要 leaves。
- Phase 7 需检查旧 appendix、style-control、timeline 和 continuity 路径是否仍被运行期引用。
- 社区 Seedance 案例库不影响 Phase 6，可在后续单独抽样研究，不作为本轮阻塞项。

## 8. 最终结论

Phase 4 满足实施计划验收标准：

- `libraries/` 回答有哪些可选项；
- `styles/` 回答风格如何执行；
- 不用导演名替代执行变量；
- 社区案例只提炼结构；
- 索引均路由到唯一叶子真源；
- 当前可以进入 Phase 6。
