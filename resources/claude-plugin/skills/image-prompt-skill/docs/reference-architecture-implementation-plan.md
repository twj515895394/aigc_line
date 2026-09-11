# Image Prompt Skill Reference 架构实施记录

## 1. 实施状态

```text
状态：开发完成，等待 PR 审阅与合并
分支：refactor/reference-architecture-v2
PR：#1
```

本轮已完成原计划 Phase 1–6。所有旧内容均先审计、迁移和接通新路由，再删除旧正文。

## 2. 已完成架构

```text
references/
├── index.md
├── inputs/
├── tasks/
├── controls/
├── libraries/
├── styles/
└── diagnostics/
```

实现原则：

- Markdown 分级路由
- 默认三级、最多四级
- 多入口路由、单文件真源
- 索引只负责触发条件与路径
- 叶子 Reference 承载具体知识
- 不建设模型适配层
- 不使用 YAML 路由元数据

## 3. Phase 1：运行骨架与输入层——已完成

完成内容：

- 重构 `SKILL.md`
- 增加 8 类任务识别
- 保留并压缩快速模式、交互模式规则
- 增加不同任务的交互追问优先级
- 重写 `references/index.md`
- 建立纯文字、单图、多图三条互斥输入路线

输入结构：

```text
references/inputs/
├── index.md
├── text-input-expansion.md
├── single-image-reference.md
└── multi-image-reference.md
```

## 4. Phase 2：任务层——已完成

```text
references/tasks/
├── finished-image/playbook.md
├── image-to-image/playbook.md
├── image-editing/playbook.md
├── prompt-reverse-engineering/playbook.md
├── character-assets/playbook.md
├── scene-assets/playbook.md
├── storyboard-assets/playbook.md
└── video-reference-frames/playbook.md
```

已明确：

- 整体图生图与局部图片编辑的边界
- Prompt 反推的复现型、结构型、改造型路线
- 产品图、海报、封面等作为成片输出形态
- 角色、场景、分镜和视频参考帧分别使用独立 Playbook

## 5. Phase 3：控制、资料库、风格与诊断主干——已完成

### Controls

- composition-camera
- lighting-color
- pose-action
- spatial-blocking
- identity-consistency
- reference-handling
- prompt-assembly
- realism-quality

### Libraries

- human
- environment
- object-product
- animal-creature
- composition-shot
- lighting-color
- material-effect

### Styles

- photography
- cinematic
- anime
- comic-manhwa
- illustration
- concept-art
- 3d-rendering
- graphic-design

### Diagnostics

已建立常见图像失败、身份一致性、人体接触、构图可读性、风格材质冲突、参考冲突和 Prompt 过载等诊断入口。

## 6. Phase 4：旧 Reference 审计、迁移与去重——已完成

已迁移：

- 去 AI 感与照片真实感
- 抓拍构图与合理不完美
- 办公室纪实环境、机位、混合光和摄影风格
- 侧颜与自然体态
- 通勤服装与面料
- 生活化微表情
- 常见失败模式与负向约束
- 妆容、发型和表情选择器

`office-candid-photography.md` 已按职责拆分为：

```text
libraries/environment/office-workplace-environment.md
controls/composition-camera/office-candid-camera.md
controls/lighting-color/office-mixed-light.md
styles/photography/lifestyle-candid-photography.md
```

用户提供的《女主妆容选择器》已迁为：

```text
references/libraries/human/female-makeup-selector.md
```

迁移完成后，旧 `style-control`、`portrait`、`scene-office` 相关叶子以及三份 appendix 正文均已删除，避免双真源。

## 7. Phase 5：任务模板——已完成

```text
assets/templates/
├── finished-image-template.md
├── image-to-image-template.md
├── image-editing-template.md
├── prompt-reverse-engineering-template.md
├── character-assets-template.md
├── scene-assets-template.md
├── storyboard-assets-template.md
└── video-reference-frames-template.md
```

旧快速模式、交互模式和角色资产包模板已删除。

模板只保存输出结构，不重复任务知识。

## 8. Phase 6：清理与验证——已完成

已删除完成迁移的旧内容：

- 独立快速模式 Reference
- 独立交互模式 Reference
- 旧文字输入与图片输入 Reference
- 旧任务目录中的 6 份 Playbook
- 旧妆容、发型和表情附录
- 旧高频控制与人物、办公室混合叶子
- 旧快速、交互和角色资产模板

已完成以下典型路由的人工路径验证：

- 纯文字成片
- 单图整体改写
- 多图人物与服装组合
- 局部物体替换
- 角色资产
- 场景资产
- 分镜资产
- 视频首尾帧
- Prompt 反推
- 综合失败诊断

详细结果见：

```text
docs/reference-architecture-validation.md
```

## 9. 默认加载预算

```text
固定：
- 1 份 input
- 1 份 task

按需：
- 0–2 份 controls
- 0–2 份 libraries
- 0–1 份 style
- 0–1 份 diagnostic
```

分类索引不计入业务 Reference 数量。

## 10. 合并前说明

本轮验证属于 Markdown 路径与职责的人工审计，仓库当前没有自动化 Markdown 链接检查或 Skill 行为测试程序。

PR 合并前建议重点审阅：

- `SKILL.md` 的任务判断与交互优先级
- `references/index.md` 的总路由
- 多图对象绑定规则
- 局部编辑合同
- 办公室混合资料的四向拆分
- 妆容、发型和表情选择器的边界
