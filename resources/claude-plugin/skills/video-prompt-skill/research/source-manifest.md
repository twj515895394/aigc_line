# Source Manifest

更新时间：2026-08-27

## 状态说明

- `incoming`：已进入临时区，尚未审计
- `reviewing`：正在核对来源、重叠和适用边界
- `extracted`：已形成提炼稿，尚未并入正式 Reference
- `merged`：已并入正式 Reference 真源
- `rejected`：不适合沉淀
- `archived`：仅保留追溯，不再参与迁移

## 用户上传资料

| ID | 临时文件 | 主要主题 | 正式沉淀位置 | 状态 |
|---|---|---|---|---|
| U01 | `incoming/user/图生视频.md` | 图生视频题材入口与流程 | inputs / tasks / controls | merged |
| U02 | `incoming/user/写实电影短剧.md` | 写实短剧题材工作流 | `styles/realistic-short-drama/` + genre library | merged |
| U03 | `incoming/user/AI漫剧.md` | 漫剧角色、分镜、动作与风格 | `styles/comic-motion-drama/` + genre library | merged |
| U04 | `incoming/user/图像风格提取流程.md` | 参考图视觉信息提取 | image inputs + reference binding | merged |
| U05 | `incoming/user/电影感Prompt拆解公式.md` | 电影感可控变量 | cinematic style + prompt assembly | merged |
| U06 | `incoming/user/基础Prompt结构.md` | 通用 Prompt 要素 | prompt assembly control | merged |
| U07 | `incoming/user/故事版分镜到视频流程.md` | 故事板到视频 | storyboard task | merged |
| U08 | `incoming/user/打击帧与动作戏结构.md` | 动作节拍与反馈 | action library + subject motion | merged |
| U09 | `incoming/user/AI视频风格选择器.md` | 设备视角与作者气质 | camera/genre libraries + styles | merged |
| U10 | `incoming/user/影视风格选择器.md` | 题材级风格模板 | genre library + styles | merged |
| U11 | `incoming/user/电影光影与色调选择器.md` | 光影与色调 | lighting-color library | merged |
| U12 | `incoming/user/导演级运镜术语选择器.md` | 运镜术语与适用情节 | camera-shot library | merged |
| U13 | `incoming/user/视角机位与景别选择器.md` | 景别、机位、焦段 | camera-shot library | merged |
| U14 | `incoming/user/表情与微表情选择器.md` | 表演与微表情 | performance library + control | merged |
| U15 | `incoming/user/角色发型选择器.md` | 角色发型与动态锚点 | anime/comic styles，仅提炼视频动态与一致性部分 | merged |
| U16 | `incoming/user/文生视频Prompt结构.md` | 文生视频时间轴结构 | text-to-video task | merged |
| U17 | `incoming/user/图生视频Prompt结构.md` | 图生视频锚点与运动结构 | image-to-video task | merged |

## 外部 GitHub 资料

| ID | 来源 | 主要用途 | 注意事项 | 状态 |
|---|---|---|---|---|
| G01 | `dexhunter/seedance2-skill/zh/SKILL.md` | Seedance 多模态引用、编辑、延长、卡点和任务分类 | 规格与限制不以社区文档作为最终官方依据；不复制完整示例 | merged |
| G02 | `YouMind-OpenLab/awesome-seedance-2-prompts` | 社区案例的任务覆盖、时间分段、音画和失败模式采样 | CC BY 4.0；案例不等于官方能力；未做全量逐条沉淀 | reviewing |
| G03 | `twj515895394/image-prompt-skill@refactor/reference-architecture-v2` | Reference 分层、路由预算、单一真源和迁移方法 | 只复用架构原则，不复制图片任务边界 | merged |

## 官方 / 产品资料

| ID | 来源 | 主要用途 | 注意事项 | 状态 |
|---|---|---|---|---|
| O01 | LTX 官方《LTX-2.3 Prompt Guide》 | LTX 叙述方式、时序、镜头、动作、音频和图生视频写法 | 版本能力只进入模型适配页；通用部分经抽象后进入 controls | merged |

## 社区成片结构

| ID | 来源 | 主要用途 | 注意事项 | 状态 |
|---|---|---|---|---|
| X01 | X @lansenai 2026-08-26 图生动作成片 Prompt 结构 | 15 秒生产密度：首帧继承、媒介锁、场内摄影机、Beat 招式可读性、液体/饰品连续 | 只提炼合同，不复制人物剧情和原文；不把 30 秒片长写成能力 | extracted / merged |

## 提炼记录

- Phase 0-3：任务、输入、控制与模型适配，见架构、迁移和进度文档。
- Phase 4：`research/extraction-notes/phase4-library-style-extraction.md`。
- 2026-08-27：`research/extraction-notes/i2v-15s-production-density.md`。

## 去重结果

1. 基础、文生、图生 Prompt 结构已经分别进入任务与 Prompt 组装控制，不在资料库重复。
2. 运镜、机位和焦段资料合并为一个 camera-shot 真源，重复术语已归一化。
3. 视频风格、影视风格、电影感和光影资料按“题材模板 / 风格实现 / 光影选项”拆分。
4. 打击帧与动作附录合并为 action-motion library，并由 subject-motion control 管理使用方法。
5. 表情资料拆成“具体表演选项”和“变化控制方法”。
6. 角色发型资料不完整复制，只保留视频动态和一致性所需部分。
7. 社区 Prompt 不原样进入运行期 Reference。
