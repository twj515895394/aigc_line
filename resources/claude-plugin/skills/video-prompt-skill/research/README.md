# Research Staging Area

本目录用于存放尚未进入运行期 Reference 的原始资料、来源登记和提炼记录。

## 目录职责

```text
research/
├── README.md
├── source-manifest.md
├── incoming/
└── extraction-notes/
```

- `incoming/`：用户上传文档、外部资料快照或未经整理的原始内容。
- `source-manifest.md`：记录来源、用途、可信度、许可证、处理状态和目标沉淀位置。
- `extraction-notes/`：记录资料审计、去重、拆分和合并决策。

## 处理流程

```text
incoming
→ reviewing
→ extracted
→ merged / rejected / archived
```

## 硬规则

- `incoming/` 中的内容不能被 `SKILL.md` 当作运行期 Reference 直接读取。
- 正式知识必须经过提炼，进入 `references/` 中唯一的正文真源。
- 社区 Prompt 主要用于归纳结构和失败经验，不默认复制具体剧情与完整提示词。
- 模型规格、能力边界和语法必须标注来源与核验日期。
- 迁移完成后可保留原始资料用于追溯，但不得和正式 Reference 并行维护同一正文。
