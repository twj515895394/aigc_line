# Phase 0 来源治理与执行基线验证

## 1. 批次信息

- 批次名称：Phase 0 来源治理与执行基线
- 实施日期：2026-07-10
- 来源：用户整理资料、`YouMind-OpenLab/awesome-gpt-image-2`
- 新增运行时 Reference：无
- 更新运行时索引：无

## 2. 产物检查

- [x] `references/SOURCES.md`
- [x] `docs/source-audits/user-curated-2026-07-10.md`
- [x] `docs/source-audits/awesome-gpt-image-2.md`
- [x] `docs/source-audits/validation-template.md`
- [x] `docs/reference-resource-ingestion-progress.md`

## 3. 来源与许可检查

### 用户整理资料

- [x] 已记录接收日期和临时位置
- [x] 已说明第三方来源仍需逐项核实
- [x] 已禁止在来源不清时搬运完整案例或高度相似原文
- [x] 已明确以结构提炼、规则改写和现有叶子增补为主

### awesome-gpt-image-2

- [x] 已记录仓库和访问日期
- [x] 已记录 CC BY 4.0
- [x] 已记录署名、许可链接和修改说明义务
- [x] 已记录作者和原始来源要求
- [x] 已禁止批量复制图片
- [x] 已禁止将营销描述和模型偶然写法沉淀为通用事实

## 4. 临时目录隔离检查

### 检查范围

- `SKILL.md`
- `references/index.md`
- 运行时读取流程与一级分类路由

### 结果

- `SKILL.md` 只路由 `references/inputs/`、`references/tasks/`、`references/controls/`、`references/libraries/`、`references/styles/` 和 `references/diagnostics/`；
- `references/index.md` 不包含 `docs/source-staging/` 路径；
- 新增来源登记和审计文档未被加入运行时路由；
- 临时资料仍仅位于 `docs/source-staging/user-curated-2026-07-10/`；
- 正式 Reference 不依赖临时摄取目录。

结论：通过。

## 5. 加载预算影响

Phase 0 未新增或修改运行时叶子，因此：

```text
input：无变化
task：无变化
controls：无变化
libraries：无变化
style：无变化
diagnostic：无变化
```

默认加载预算未受影响。

## 6. 单一真源检查

- [x] `references/SOURCES.md` 只保存来源映射，不复制正式知识正文
- [x] 来源审计只记录摄取依据，不作为运行时 Reference
- [x] 临时原文未复制进入正式目录
- [x] 未创建重复选择器或重复 Playbook

## 7. 工具限制记录

当前可用 GitHub Contents 写入接口按文件形成提交，未提供 Git Tree / Commit 批量写入能力。因此 Phase 0 由多个连续提交组成。

这不影响内容验收；后续每个批次会在验证文档中记录所属提交范围。

## 8. 验收结论

```text
状态：通过
结论：Phase 0 来源治理、许可策略、验证模板和临时区隔离基线已经建立。
后续动作：进入 Phase 1，迁移通用镜头、电影光影、电影色调和电影画面语言。
```
