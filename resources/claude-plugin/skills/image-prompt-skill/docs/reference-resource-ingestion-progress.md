# Image Prompt Skill 资源沉淀进度台账

## 用途

本文件跟踪 `docs/reference-resource-ingestion-implementation-plan.md` 的实际执行状态。

状态统一使用：

```text
待执行 / 进行中 / 已完成 / 阻塞 / 暂不采用
```

## 总体进度

| Phase | 内容 | 状态 | 主要产物或说明 |
|---|---|---|---|
| 0 | 来源治理与执行基线 | 已完成 | SOURCES、来源审计、验证模板和隔离验证 |
| 1 | 通用镜头、电影光影、电影画面语言 | 已完成 | 4 个基础叶子和路由验证 |
| 2 | 人物选择器、Prompt、参考图能力 | 已完成 | 5 个现有叶子增补；重复候选不新建 |
| 3 | 角色、场景、分镜任务能力 | 已完成 | 身份、空间、故事板类型与 Playbook 增补 |
| 4 | 写真、女友感、综合风格拆分 | 已完成 | 更新生活化纪实摄影和迁移决策 |
| 5 | 产品营销与电商主图 | 已完成 | 5 个产品视觉叶子和验证 |
| 6 | 海报、文字和信息图 | 已完成 | 3 个图文设计叶子和验证 |
| 7 | 漫画、故事板与多格连续性 | 已完成 | 3 个漫画连续性叶子和故事板边界更新 |
| 8 | 摄影、电影、人物与场景交叉验证 | 已完成 | 新增环境人像；三条人物摄影路线边界收敛 |
| 9 | 插画、3D、游戏和长尾类别 | 已完成 | 条件启动 4 项高价值能力，其余保留审计层 |
| 10 | 自动检查、回归和临时区清理 | 已完成 | 检查脚本、GitHub Actions、28 条回归和临时区清理 |

## Phase 0–9 执行摘要

- [x] 建立来源治理、许可策略和验证基线
- [x] 完成用户整理资料 Phase 1–4 的迁移、去重与边界收敛
- [x] 完成产品营销与电商主图能力
- [x] 完成海报、文字与信息图能力
- [x] 完成漫画分格、漫画视觉语言和多格连续性能力
- [x] 完成摄影、电影、人物与场景交叉验证
- [x] 条件启动并完成游戏资产、动画主视觉、像素艺术和等距微缩能力

## Phase 10 执行记录

### 自动检查

- [x] 新增 `scripts/check_reference_integrity.py`
- [x] 检查必需入口、相对链接和 index 目标路径
- [x] 检查运行时对 source-staging 和旧目录的违规引用
- [x] 检查旧目录残留
- [x] 检查空叶子、标题缺失、明显重复文件名和 H1
- [x] 检查临时摄取目录是否仍包含文件

### GitHub Actions

- [x] 新增 `.github/workflows/reference-integrity.yml`
- [x] 支持 pull_request、push 和 workflow_dispatch
- [x] 使用 Python 3.11 和标准库执行完整性脚本
- [x] Reference Integrity CI 已通过

### 行为回归

- [x] 新增 `docs/reference-behavior-regression-final.md`
- [x] 覆盖 28 条输入、任务、产品、图文、漫画、摄影、游戏和诊断路由
- [x] 28 / 28 仓库级人工路由审计通过
- [x] 默认加载预算未突破
- [x] 相邻能力反例未发生误加载

### 临时区清理

- [x] 新增 `docs/source-audits/user-curated-2026-07-10-final-mapping.md`
- [x] 15 / 15 用户资料完成最终去向登记
- [x] 删除 raw 下 15 份原始 Markdown
- [x] 删除临时 README 和 ingestion-map
- [x] 共删除 17 份临时文件
- [x] 更新 `references/SOURCES.md`，不再依赖临时路径
- [x] 原始内容继续由 Git 历史追踪

### 最终验收

- [x] 新增 `docs/source-audits/phase-10-final-validation.md`
- [x] Phase 0–10 全部完成
- [x] 后续知识扩充改为独立批次，不再追加本计划 Phase

## 交付后文档补全

- [x] 新增根目录 `README.md`
- [x] README 覆盖项目介绍、能力范围、运行模式、Reference 架构、目录结构、使用方式、自动检查和维护原则
- [x] 新增根目录 `AGENTS.md`
- [x] AGENTS 固化新资料的隔离、来源审计、查重、职责拆分、路由、验证、CI 和临时区清理流程
- [x] 将 README 和 AGENTS 加入完整性检查必需入口
- [x] 将 README 和 AGENTS 加入 GitHub Actions 触发范围
- [x] Reference Integrity CI Run #79 通过

## 批次提交说明

当前 GitHub Contents 写入接口会按文件形成提交。各批次通过抽样、验证、进度和最终验收文档记录逻辑提交范围。

## 独立批次：从零生成皮肤控制（2026-08-30）

- 来源：`https://x.com/nanyuan0412/status/2084451298016202976`
- 状态：已完成结构抽象，并入现有叶子，不复制原文
- 更新：`references/controls/realism-quality/anti-ai-realism.md`
- 边界：生成 / 整体改写 → 皮肤五变量；已有成片只补细节 → `fidelity-detail-enhancement`
- 验证：`docs/source-audits/2026-08-generated-skin-control-validation.md`

## 独立批次：保真细节增强（2026-08-30）

- 来源：`https://x.com/nanyuan0412/status/2093512541108601334`
- 状态：已完成结构抽象，不复制原文
- 新增：`references/controls/realism-quality/fidelity-detail-enhancement.md`
- 边界：已有成片只补微观细节 → `image-editing`；从零生成真实感 → `anti-ai-realism`；换场景/构图/光影 → `image-to-image`
- 验证：`docs/source-audits/2026-08-fidelity-detail-enhancement-validation.md`

## 最近更新

- 2026-07-10：Phase 0–4 完成用户资料迁移与边界收敛。
- 2026-07-10：Phase 5–9 完成外部高价值知识分批沉淀与交叉验证。
- 2026-07-10：Phase 10 完成自动检查、28 条行为回归、最终迁移映射和临时摄取目录清理。
- 2026-07-10：快速模式调整为零追问、零解释和纯 Prompt 输出，交互模式改为显式触发。
- 2026-07-10：补齐 README 与 AGENTS，并将两者纳入完整性检查和 CI。
- 2026-08-30：独立批次沉淀保真细节增强，作为局部编辑的按需真实感控制。
- 2026-08-30：独立批次把从零生成的皮肤五变量并入 `anti-ai-realism`。
