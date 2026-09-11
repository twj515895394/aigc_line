# Phase 10 最终验收：自动检查、回归与临时区清理

## 1. 阶段信息

- Phase：10
- 实施日期：2026-07-10
- 分支：`refactor/reference-architecture-v2`
- PR：#1
- 定位：当前资源沉淀实施计划的最终收口阶段

## 2. 自动检查实现

### 检查脚本

新增：

```text
scripts/check_reference_integrity.py
```

脚本只依赖 Python 标准库，检查：

1. 必需架构入口是否存在；
2. Markdown 相对链接是否存在；
3. 运行时文档中的反引号 `.md` 路径是否有效；
4. 各级 `index.md` 已声明的目标路径是否存在；
5. 正式运行时是否引用 `source-staging`；
6. 已取消的旧目录是否仍然存在；
7. 非索引叶子是否为空或只有标题；
8. 明显重复的叶子文件名和 H1 标题；
9. 临时摄取目录是否仍包含文件。

### GitHub Actions

新增：

```text
.github/workflows/reference-integrity.yml
```

触发条件：

- PR 中修改 `SKILL.md`、`references/**`、模板、文档或检查脚本；
- push 到 `main` 或当前重构分支；
- 手动 `workflow_dispatch`。

执行命令：

```text
python scripts/check_reference_integrity.py
```

工作流同时上传 `reference-integrity-report` artifact，失败时可直接下载完整报告。

### 远端执行结果

GitHub Actions 已实际执行并通过：

```text
Workflow：Reference Integrity
Run number：54
Run id：29073563319
Head SHA：99d204ba35e1a91aff14cf6df8c5b7a9db79487d
Status：completed
Conclusion：success
```

首次执行发现并修复：

- 遗留 `references/appendix/index.md`；
- `references/libraries/human/index.md` 中微表情控制页的错误相对路径。

修复后再次执行，完整性检查通过。

## 3. 旧路径检查范围

脚本明确禁止以下旧目录重新出现：

```text
references/subjects
references/appendix
references/recipes
references/input-image-ref
references/input-text-only
references/mode-interactive
references/mode-quick
references/portrait
references/scene-office
references/style-control
references/task-*
```

运行时文档同时禁止引用：

```text
docs/source-staging/
source-staging/
references/subjects/
references/appendix/
references/recipes/
```

历史架构与迁移审计文档允许描述过去路径，但不能作为运行时导航。

## 4. 临时区清理

### 长期保留

新增长期迁移记录：

```text
docs/source-audits/user-curated-2026-07-10-final-mapping.md
```

它逐项记录 15 份原始资料的最终状态与正式归属。

### 已删除

删除：

```text
docs/source-staging/user-curated-2026-07-10/raw/ 下 15 份原始 Markdown
docs/source-staging/user-curated-2026-07-10/README.md
docs/source-staging/user-curated-2026-07-10/ingestion-map.md
```

共删除 17 份临时文件。

### 清理前提验证

- [x] 15 份资料均已进入正式 Reference、合并现有叶子或明确仅作迁移来源
- [x] Phase 1–4 验证文档长期保留
- [x] 最终映射长期保留
- [x] `references/SOURCES.md` 已改为指向最终映射
- [x] 正式运行时不依赖临时目录
- [x] 原始内容仍可通过 Git 历史追踪

结论：临时区可以安全删除，已完成。

## 5. 行为回归

新增：

```text
docs/reference-behavior-regression-final.md
```

覆盖 28 条仓库级路由用例，包括：

- 纯文字、单图和多图输入；
- finished-image、image-to-image 和 image-editing；
- Prompt 反推三条路线；
- 角色、场景、分镜和视频参考帧；
- 产品、电商、海报和信息图；
- 漫画与多格连续性；
- 生活抓拍、环境人像和电影剧照；
- 动画主视觉、像素艺术和等距游戏场景；
- diagnostics 正常命中与不应命中的反例。

结果：

```text
回归用例：28
通过：28
阻塞：0
结构性失败：0
```

该结果属于仓库级人工路由审计，不等同于模型端到端画质评测。

## 6. 加载预算验证

所有回归用例继续遵守：

```text
固定：
1 input
1 task

按需：
0–2 controls
0–2 libraries
0–1 style
0–1 diagnostic
```

- [x] 产品广告没有同时加载 photography 与 3D 两个主 style
- [x] 制作故事板没有默认加载漫画 style
- [x] 单幅插画没有加载多格连续性
- [x] 普通人物任务没有加载产品或游戏叶子
- [x] 正常任务没有默认加载 diagnostic

结论：通过。

## 7. 来源与单一真源

- [x] `references/SOURCES.md` 已登记用户资料和 awesome 来源
- [x] 用户资料已建立最终迁移映射
- [x] 外部案例未批量复制完整 Prompt 或图片
- [x] 索引只保留触发条件和目标路径
- [x] 叶子正文只有一个物理真源
- [x] 临时摄取目录已删除
- [x] 长尾未通过条件评估的方向留在审计层

结论：通过。

## 8. 验收结论

```text
Phase 10 实施状态：已完成
自动检查实现：已完成
GitHub Actions 配置：已完成
远端 Reference Integrity CI：通过
人工结构审计：通过
行为路由回归：28 / 28 通过
临时区清理：完成
当前实施计划 Phase 0–10：全部完成
```

后续不再按本实施计划新增 Phase。新的知识扩充应作为独立批次进入相同的来源治理、查重、路由和验证流程。