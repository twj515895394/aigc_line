# AGENTS.md

本文件面向在本仓库中工作的 AI Agent、Coding Agent 和自动化维护工具。

目标是保证后续新增资料能够沿着现有架构完成审计、查重、拆分、路由、验证和清理，而不是重新堆积万能文档或建立第二套真源。

## 1. 开始工作前必须读取

按以下顺序读取：

1. [SKILL.md](SKILL.md)
2. [references/index.md](references/index.md)
3. 与当前任务相关的分类索引
4. [references/SOURCES.md](references/SOURCES.md)
5. [README.md](README.md)
6. [reference-architecture-and-resource-ingestion.md](.handoff/reference-architecture-and-resource-ingestion.md)
7. [check_reference_integrity.py](scripts/check_reference_integrity.py)

如果任务涉及快速模式或交互模式，还必须读取：

- [mode-quick-output-contract.md](assets/templates/mode-quick-output-contract.md)
- [mode-interactive-output-contract.md](assets/templates/mode-interactive-output-contract.md)

如果任务涉及资料迁移，还应查看：

- [资源沉淀进度](docs/reference-resource-ingestion-progress.md)
- [最终行为回归](docs/reference-behavior-regression-final.md)
- [来源审计目录](docs/source-audits/)

## 2. 不可破坏的架构约束

### 2.1 单一正文真源

同一知识只能存在一份正式正文。

允许：

- 多个索引指向同一个叶子文件；
- 多个任务 Playbook 引用同一个 control、library 或 style；
- 审计文档描述正式叶子的形成过程。

禁止：

- 在两个目录复制相同规则；
- 为不同题材复制整套镜头、光影或 Prompt 组装知识；
- 把同一选择器同时维护在 `controls/` 和 `libraries/`；
- 在索引中摘抄叶子正文。

### 2.2 正交职责

正式 Reference 只能归入以下职责之一：

| 目录 | 判断问题 |
|---|---|
| `inputs/` | 如何理解用户输入的文字、单图或多图？ |
| `tasks/` | 当前任务要完成什么，流程和交付结构是什么？ |
| `controls/` | 如何判断、选择、协调或约束？ |
| `libraries/` | 有哪些具体选项、类型或详细资料？ |
| `styles/` | 某种视觉媒介或风格如何实现？ |
| `diagnostics/` | 多个维度同时失败时，如何定位根因？ |

不能自然归入某一职责的混合资料，必须先拆分。

### 2.3 加载预算

每次运行固定读取：

```text
1 input
1 task
```

按需读取：

```text
0–2 controls
0–2 libraries
0–1 style
0–1 diagnostic
```

索引不计入业务 Reference 数量。

新增文件时必须回答：

- 它在什么条件下被读取？
- 它会替代哪一个已有文件，还是补充真实缺口？
- 它与相邻文件的边界是什么？
- 它是否会导致典型任务突破加载预算？

### 2.4 模式合同

快速模式必须保持：

- 用户未明确要求讨论时默认进入；
- 零追问；
- 零人工确认；
- 自动补全；
- 自动裁决冲突；
- 单 Prompt 只输出最终正文；
- 不显示标题、概述、补全说明、限制项说明和方向摘要；
- 不读取结构化任务模板；
- 资产任务只输出必要 Prompt Pack。

交互模式必须保持：

- 只有用户明确要求讨论、脑暴或逐步设计时进入；
- 每次只问一个问题；
- 每个问题提供推荐答案；
- 用户要求直接出结果时立即停止追问；
- 最终可按需读取结构化任务模板。

任何改动都不得让快速模式重新退化为“少追问模式”。

## 3. 新资料沉淀标准流程

所有新资料都必须走完以下流程。

### Step 0：建立批次

为本次资料建立稳定批次名，例如：

```text
2026-08-product-packaging
2026-09-watercolor-media
user-curated-2026-10-15
```

批次名用于临时区、来源审计和验证文档。

### Step 1：临时隔离

原始资料先进入：

```text
docs/source-staging/<batch>/raw/
```

同时建立：

```text
docs/source-staging/<batch>/README.md
docs/source-staging/<batch>/ingestion-map.md
```

临时资料不得被以下文件路由：

- `SKILL.md`
- `references/index.md`
- 任意分类索引
- 任意正式 Reference

### Step 2：来源登记与许可审计

在 `docs/source-audits/` 创建来源审计，至少记录：

- 来源名称；
- 来源 URL 或用户提供方式；
- 接收或访问日期；
- 许可证、署名要求或未知状态；
- 是否包含第三方图片、品牌、IP、作者风格或长文本；
- 允许采用的方式；
- 禁止直接复制的内容。

外部来源必须同步规划更新 [references/SOURCES.md](references/SOURCES.md)。

许可证不明确时，只能做结构抽象和内部研究，不得大段复制正文或资源。

### Step 3：逐份精读与查重

对每份资料判断：

```text
merge-existing
split-and-merge
candidate-new-leaf
migration-source-only
reject
pending-audit
```

优先顺序：

```text
更新现有叶子
> 拆分后更新多个现有叶子
> 创建真正必要的新叶子
> 仅保留在审计层
```

不得因为文件名新颖就创建新叶子。

### Step 4：判断正式归属

使用以下判断树：

```text
描述输入如何理解？
→ inputs

描述任务目标、步骤或输出包？
→ tasks

描述怎么选、怎么判断、怎么保持一致？
→ controls

描述有哪些类型、选项、素材或详细资料？
→ libraries

描述一种媒介、渲染或风格如何实现？
→ styles

描述多个维度失败时如何诊断？
→ diagnostics
```

如果同时命中两项，必须拆分。

### Step 5：评估是否值得新建叶子

只有同时满足以下条件才创建新叶子：

1. 存在明确且稳定的读取条件；
2. 有多个不同案例支持；
3. 能抽象为模型无关的视觉规则；
4. 与现有叶子不存在高重合；
5. 有相邻任务不应命中的反例；
6. 能在默认加载预算中使用；
7. 能编写至少一条正向和一条反向回归用例。

以下情况不要新建叶子：

- 只是题材名，如“赛博朋克”“旅行”“都市”；
- 只是模糊质量词，如“高级感”“电影感”；
- 只来自一个孤立案例；
- 已能由现有 task + control + library + style 组合完成；
- 会形成万能选择器；
- 会复制已有正文。

### Step 6：编写或更新正式 Reference

正式叶子至少应包含：

```text
# 标题

## 解决什么问题
## 什么时候读取
## 核心规则或选择结构
## Prompt 结构或执行方法
## 联动关系
## 常见失败与修复
```

并确保：

- 标题明确；
- 内容模型无关；
- 不依赖临时目录；
- 不引用无法验证的精确数据；
- 不大段复制外部原文；
- 不用 IP 或作者名代替视觉规则；
- 相对路径有效。

### Step 7：更新路由

更新对应分类 `index.md`。

索引只能写：

- 什么时候读取；
- 读取哪个文件；
- 与相邻分类的边界。

索引不得复制正文规则、完整 Prompt 或大型选择表。

如果新增一级能力，还要检查：

- `references/index.md`
- `SKILL.md`
- 对应任务 Playbook
- 输出模板或模式合同

### Step 8：更新来源与迁移记录

至少更新：

- [references/SOURCES.md](references/SOURCES.md)
- 对应 source audit
- ingestion map
- progress 或批次验收文档

每个正式叶子都应能追溯到来源批次或维护决策。

### Step 9：编写验证

验证至少覆盖：

- 正常请求能够命中新叶子；
- 相邻任务不会误加载；
- 组合后不突破加载预算；
- 不会重复加载同一知识；
- 快速模式输出合同不受破坏；
- 结构化模板只在交互模式或明确请求时使用；
- 来源和许可记录完整。

推荐为每个批次创建：

```text
docs/source-audits/<batch>-validation.md
```

### Step 10：运行完整性检查

必须运行：

```bash
python scripts/check_reference_integrity.py
```

检查失败时必须先修复再交付。

GitHub Actions 也必须通过：

```text
Reference Integrity
```

不得在 CI 失败时声称可交付。

### Step 11：清理临时区

只有在以下条件全部满足时才删除临时资料：

- 每份资料已完成最终去向登记；
- 正式 Reference 已写入；
- 索引已更新；
- SOURCES 已更新；
- 验证已完成；
- CI 已通过；
- 已建立长期 final mapping。

然后删除：

```text
docs/source-staging/<batch>/raw/
docs/source-staging/<batch>/README.md
docs/source-staging/<batch>/ingestion-map.md
```

长期保留：

- source audit；
- validation；
- final mapping；
- SOURCES 登记。

## 4. 修改现有能力的流程

不是所有任务都需要建立新批次。修改现有规则时：

1. 读取当前叶子及其索引；
2. 搜索所有引用入口；
3. 判断是否属于正文修正、边界修正或路由修正；
4. 更新最小必要文件；
5. 补充对应回归用例；
6. 运行完整性检查；
7. 检查 PR 最新 CI。

不要为了一个小规则同步改写多个叶子。

## 5. 文件命名规范

- 文件名使用小写英文和连字符；
- 正式任务目录使用稳定任务 ID；
- source audit 使用批次名；
- validation 文件以 `-validation.md` 结尾；
- final mapping 使用 `-final-mapping.md`；
- 索引统一命名为 `index.md`；
- 任务正文统一使用 `playbook.md`。

不要创建：

```text
final-final.md
new-version.md
selector-v2.md
temp.md
misc.md
all-styles.md
ultimate-prompt.md
```

## 6. 内容写作规范

- 中文为主，必要行业词保留英文；
- 使用完整、可执行的视觉描述；
- 避免空泛质量词；
- 先主体、空间、动作，再写镜头、光影、材质和风格；
- 限制项只针对高风险失败模式；
- 示例应体现规则，不应成为唯一答案；
- 不暴露内部推理过程；
- 不将维护说明混入最终用户 Prompt。

## 7. 外部资料与版权边界

禁止：

- 批量复制第三方完整 Prompt；
- 提交第三方图片或受限资源；
- 大段复制文章、书籍或教程；
- 以作者名或作品名代替抽象后的视觉机制；
- 在许可不明时声称可以自由分发。

允许：

- 记录来源和许可；
- 做分类抽样；
- 提炼跨案例稳定规律；
- 用自己的语言重写规则；
- 保留少量必要术语；
- 将无法正式沉淀的方向留在审计层。

## 8. Git 与 PR 操作规范

- 在专用分支工作；
- 不直接覆盖 `main`；
- 提交信息应说明是 `feat(reference)`、`docs(reference)`、`fix(reference)` 或 `chore(reference)`；
- 同一路径不要并行更新；
- 每批次通过审计、验证和进度文档记录逻辑提交范围；
- PR 描述必须反映最新状态，不保留已失效限制；
- 交付前检查 PR 是否 `mergeable`；
- 交付前检查最新 Head 的 CI，而不是旧提交的 CI。

## 9. 交付前检查清单

### 架构

- [ ] 新内容归属正确
- [ ] 没有第二份正文真源
- [ ] 索引只负责路由
- [ ] 加载预算未突破
- [ ] 相邻能力边界明确

### 模式

- [ ] 快速模式保持零追问
- [ ] 快速模式只输出 Prompt 或 Prompt Pack
- [ ] 快速模式没有标题和解释
- [ ] 交互模式只在用户明确要求时触发
- [ ] 结构化模板不会被快速模式读取

### 来源

- [ ] 来源和日期已登记
- [ ] 许可边界已记录
- [ ] 没有复制受限内容
- [ ] 正式叶子不依赖临时目录

### 验证

- [ ] 正向路由用例通过
- [ ] 反向误加载用例通过
- [ ] 相对路径有效
- [ ] `python scripts/check_reference_integrity.py` 通过
- [ ] GitHub Actions 最新运行通过

### 清理

- [ ] 临时资料已完成 final mapping
- [ ] source-staging 已清理
- [ ] progress、SOURCES 和 PR 描述已更新

## 10. Definition of Done

一个资料沉淀或能力扩展任务只有满足以下条件才算完成：

```text
来源可追溯
+ 许可已判断
+ 已完成查重
+ 职责已拆分
+ 正式叶子已更新
+ 路由已更新
+ 正反回归已完成
+ 加载预算已验证
+ 快速模式未被破坏
+ 完整性脚本通过
+ 最新 CI 通过
+ 临时资料已清理或明确保留原因
```

未完成上述任一关键项时，不应声称该分支或批次已经可交付。