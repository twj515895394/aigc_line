# Phase 4 资料库与风格层提炼记录

## 1. 目的

记录 `research/incoming/` 原始资料如何进入 `libraries/` 和 `styles/`，避免按原文件一对一搬迁、重复正文或把控制方法误放入资料库。

## 2. 分层原则

- `controls/`：如何判断、选择、协调和限制。
- `libraries/`：有哪些术语、结构、选项和题材模板。
- `styles/`：一种风格如何通过镜头、表演、光影、材质、节奏和声音实现。
- `tasks/`：当前任务怎样执行和交付。
- `models/`：Generic、Seedance 2.0、LTX-2.3 的能力与表达差异。

## 3. 用户资料提炼去向

| 来源 | 提炼结果 | 不进入正式层的内容 |
|---|---|---|
| 导演级运镜术语选择器 + 视角机位与景别选择器 | `libraries/camera-shot/library.md` | 重复术语、相同术语的重复定义 |
| 打击帧与动作戏结构 + 旧动作附录 | `libraries/action-motion/library.md` | 只写“很快、很燃”的抽象修饰 |
| 表情与微表情选择器 | `libraries/performance-expression/library.md` | 与静态生图相关但不影响视频表演的装饰描述 |
| 电影光影与色调选择器 | `libraries/lighting-color/library.md` | 把色调当万能滤镜的写法 |
| AI 视频风格选择器 + 影视风格选择器 | `libraries/genre-patterns/library.md` 与各 `styles/*/style.md` | 只写导演姓名、不含执行变量的标签 |
| 写实电影短剧 | `styles/realistic-short-drama/style.md` | 与任务 Playbook 重复的通用流程 |
| AI 漫剧 | `styles/comic-motion-drama/style.md` | 与角色资产 Skill 重复的静态资产正文 |
| 角色发型选择器 | 仅在动画、漫剧风格中保留发型作为动态与一致性锚点 | 完整发型枚举不迁入视频 Skill |
| 基础、文生、图生 Prompt 结构 | 已进入 tasks 与 prompt-assembly control | 不在资料库重复维护 Prompt 骨架 |

## 4. 新增但无单一原始真源的资料

以下内容由现有多模态任务、模型适配和通用影视知识抽象而来：

- `libraries/transition-effects/library.md`
- `libraries/audio-sound/library.md`
- `styles/commercial-advertising/style.md`
- `styles/documentary-ugc/style.md`
- `styles/experimental-visual/style.md`

这些页面只记录跨模型稳定的结构，不写未经核验的平台能力。

## 5. 社区案例处理规则

- 不复制社区长 Prompt、人物和剧情。
- 只提炼结构、职责绑定、时间分段、声音设计和常见失败。
- 社区案例不作为模型规格来源。
- Seedance 或 LTX 的专属能力仍以各自模型适配页为边界。

## 6. Phase 4 正式真源

### Libraries

- `camera-shot/library.md`
- `action-motion/library.md`
- `performance-expression/library.md`
- `transition-effects/library.md`
- `lighting-color/library.md`
- `audio-sound/library.md`
- `genre-patterns/library.md`

### Styles

- `cinematic-live-action/style.md`
- `realistic-short-drama/style.md`
- `anime-animation/style.md`
- `comic-motion-drama/style.md`
- `commercial-advertising/style.md`
- `documentary-ugc/style.md`
- `experimental-visual/style.md`

## 7. 真源约束

- 术语和可选项只在 library 正文出现。
- style 可以引用 library，但不得复制大型术语表。
- control 可以说明选择原则，但不得复制完整选项库。
- 原始资料继续保留在 `research/incoming/` 供追溯，不参与运行期默认加载。
