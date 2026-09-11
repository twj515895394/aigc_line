# Video Prompt Skill v2 实施进度

最后更新：`2026-07-10`

实施基线：`docs/implementation-plan-v2.md`

工作分支：`refactor/reference-architecture-v2`

## 总体状态

| 阶段 | 状态 | 完成度 | 说明 |
|---|---|---:|---|
| Phase 0 范围冻结与迁移盘点 | 已完成 | 100% | 范围、模型、研究区和迁移台账已落地 |
| Phase 1 新架构骨架与总路由 | 已完成 | 100% | 分类索引、总路由和模型骨架完成 |
| Phase 2 输入层与任务层 | 已完成 | 100% | 6 类输入、8 类任务 Playbook 完成 |
| Phase 3 核心控制层 | 已完成 | 100% | 10 类控制真源完成 |
| Phase 4 资料库与风格层 | 已完成 | 100% | 7 类资料库、7 种风格完成 |
| Phase 5 模型适配层 | 已完成 | 100% | Generic、Seedance 2.0、LTX-2.3 完成 |
| Phase 6 输出合同与 SKILL.md 切换 | 已完成 | 100% | 6 份输出合同和 v2 运行入口启用 |
| Phase 7 验证与旧结构清理 | 已完成 | 100% | 10 类诊断、静态回归、旧结构删除和最终报告完成 |

## 最终架构

```text
video-prompt-skill/
├── SKILL.md
├── assets/templates/
│   ├── mode-quick-output-contract.md
│   ├── mode-interactive-output-contract.md
│   ├── single-shot-video-template.md
│   ├── multi-shot-video-template.md
│   ├── multimodal-reference-template.md
│   └── model-adapted-output-template.md
├── references/
│   ├── inputs/          # 6 类输入
│   ├── tasks/           # 8 类任务
│   ├── controls/        # 10 类控制
│   ├── libraries/       # 7 类详细资料库
│   ├── styles/          # 7 种风格实现
│   ├── models/          # Generic / Seedance / LTX
│   └── diagnostics/     # 10 类失败诊断
├── docs/
└── research/
```

## Phase 0-1：架构与路由

- 创建重构分支；
- 建立架构决策、实施计划和迁移台账；
- 建立 `research/` 原始资料区；
- 导入并登记 17 份用户资料；
- 锁定 Generic + Seedance 2.0 + LTX-2.3；
- 建立所有分类索引并重写 `references/index.md`。

## Phase 2：输入与任务

### 输入

- text-input；
- single-image-input；
- multi-image-input；
- video-input；
- audio-input；
- mixed-multimodal-input。

### 任务

- text-to-video；
- image-to-video；
- multimodal-reference-video；
- video-reference-and-video-to-video；
- video-editing；
- video-extension；
- audio-driven-and-beat-sync；
- storyboard-and-multi-shot-video。

## Phase 3：核心控制

- timeline-rhythm；
- subject-motion；
- camera-direction；
- spatial-blocking；
- continuity-consistency；
- performance-expression；
- audio-visual-sync；
- reference-binding；
- prompt-assembly；
- realism-quality。

## Phase 4：资料库与风格

### 资料库

- camera-shot；
- action-motion；
- performance-expression；
- transition-effects；
- lighting-color；
- audio-sound；
- genre-patterns。

### 风格

- cinematic-live-action；
- realistic-short-drama；
- anime-animation；
- comic-motion-drama；
- commercial-advertising；
- documentary-ugc；
- experimental-visual。

## Phase 5：模型适配

- Generic：默认模型无关输出；
- Seedance 2.0：多模态职责绑定、编辑、延长、卡点；
- LTX-2.3：自然语言导演段落、表演、对白与音画表达。

未建设其他模型空适配器。

## Phase 6：输出与入口

- 快速模式默认零追问；
- 交互模式仅在明确共创时启用；
- 简单任务默认只输出一份最终 Prompt；
- 不默认输出备选版本、自动补全项和内部分析；
- `SKILL.md` 与总索引已正式切换 v2。

## Phase 7：诊断、回归与清理

### 诊断叶子

- identity-drift；
- motion-discontinuity；
- camera-chaos；
- spatial-teleportation；
- anatomy-contact-failure；
- physics-and-weightlessness；
- lip-sync-and-dialogue-failure；
- audio-visual-mismatch；
- prompt-overload-and-conflict；
- reference-role-conflict。

### 验证

- 10 类核心场景静态回归通过；
- Generic、Seedance、LTX 路由与输出合同对照通过；
- 新入口不再依赖旧路径；
- 21 个旧运行文件已删除；
- 最终报告：`docs/validation-report.md`；
- 详细回归：`docs/phase7-regression-results.md`。

## 当前状态

- 重构分支已经完成全部实施阶段；
- 主分支未被修改；
- 原始资料仍保留在 `research/incoming/`；
- 仓库结构已达到评审或合并条件；
- 真实视频生成质量仍需在目标模型平台持续实测。