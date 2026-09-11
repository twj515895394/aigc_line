# Image Prompt Skill Reference 路由验证报告

## 1. 验证范围

本报告验证新架构能否针对典型请求完成：

```text
SKILL.md 判断
→ 根索引
→ 1 份输入 Reference
→ 1 份任务 Playbook
→ 按需控制、资料库、风格或诊断
→ 必要时读取 1 份任务模板
```

验证方式：

- 检查 GitHub 分支中的实际文件路径
- 检查各级 `index.md` 的路由目标
- 检查任务 Playbook 中的相对路径
- 检查迁移后的旧文件是否已删除
- 检查同一知识是否仍有重复正文

当前仓库没有自动化 Markdown 链接检查器或 Skill 行为测试框架，因此以下结果属于人工路径与职责审计，不代表模型端到端生成质量的自动化测试。

## 2. 默认加载预算验证

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

根索引和分类索引只承担导航，不计入业务 Reference 数量。

验证结果：通过。

## 3. 典型路由验证

## Case 01：纯文字真人成片

示例意图：

> 一个年轻职场女性在办公室茶水间接水，像同事用手机顺手拍到。

路由：

```text
SKILL.md
→ references/index.md
→ inputs/text-input-expansion.md
→ tasks/finished-image/playbook.md
→ controls/realism-quality/anti-ai-realism.md
→ controls/composition-camera/office-candid-camera.md
→ libraries/environment/office-workplace-environment.md
→ styles/photography/lifestyle-candid-photography.md
```

预算：

- 1 input
- 1 task
- 2 controls
- 1 library
- 1 style

结果：通过。

## Case 02：单图整体改写

示例意图：

> 保留参考图人物身份，把棚拍写真改成真实职场侧拍。

路由：

```text
inputs/single-image-reference.md
→ tasks/image-to-image/playbook.md
→ controls/identity-consistency/index.md
→ controls/realism-quality/anti-ai-realism.md
→ libraries/environment/office-workplace-environment.md
→ styles/photography/lifestyle-candid-photography.md
```

结果：通过。整体改写与局部编辑边界清楚。

## Case 03：多图人物与服装组合

示例意图：

> 图 1 提供人物脸，图 2 提供服装，图 3 提供办公室场景。

路由：

```text
inputs/multi-image-reference.md
→ 当前任务 Playbook
→ controls/reference-handling/index.md
→ controls/identity-consistency/index.md
→ libraries/human/index.md 或 libraries/environment/index.md
```

关键验证：

- 人物、服装和场景可以分别绑定
- 风格图不会默认覆盖身份图
- 不使用“1 张主图负责全部”的固定规则
- 禁止平均融合

结果：通过。

## Case 04：局部物体替换

示例意图：

> 只把桌面上的水果替换成卫生纸，人物、背景、构图和光线保持不变。

路由：

```text
inputs/single-image-reference.md
→ tasks/image-editing/playbook.md
→ 必要时 controls/reference-handling/index.md
→ assets/templates/image-editing-template.md（仅完整交付时）
```

关键验证：

- 必须保留
- 必须修改
- 必须删除
- 必须增加
- 空间位置与数量
- 禁止变化

结果：通过。

## Case 05：角色资产板

示例意图：

> 为同一个女主生成三视图、多角度头像、表情板和换装板。

路由：

```text
inputs/text-input-expansion.md 或 inputs/single-image-reference.md
→ tasks/character-assets/playbook.md
→ controls/identity-consistency/index.md
→ libraries/human/female-makeup-selector.md
→ libraries/human/hairstyle-selector.md
→ assets/templates/character-assets-template.md（按需）
```

结果：通过。固定项与可变项已经分离。

## Case 06：场景站位图

示例意图：

> 生成一个工作室的俯视站位图，明确人物入口、主道具和移动路线。

路由：

```text
inputs/text-input-expansion.md
→ tasks/scene-assets/playbook.md
→ controls/spatial-blocking/index.md
→ libraries/environment/index.md
→ assets/templates/scene-assets-template.md（按需）
```

结果：通过。

## Case 07：故事板总板

示例意图：

> 生成 12 格故事板，保持人物、场景和道具连续，并标注动作阶段。

路由：

```text
inputs/text-input-expansion.md 或 inputs/multi-image-reference.md
→ tasks/storyboard-assets/playbook.md
→ controls/composition-camera/index.md
→ controls/spatial-blocking/index.md
→ controls/identity-consistency/index.md（复杂任务可突破默认上限）
→ assets/templates/storyboard-assets-template.md（按需）
```

结果：通过。单镜任务、动作阶段和跨镜承接均有明确字段。

## Case 08：视频首尾帧

示例意图：

> 为图生视频生成动作首帧和尾帧，人物与场景保持一致。

路由：

```text
inputs/text-input-expansion.md 或 inputs/single-image-reference.md
→ tasks/video-reference-frames/playbook.md
→ controls/pose-action/index.md
→ controls/identity-consistency/index.md
→ assets/templates/video-reference-frames-template.md（按需）
```

结果：通过。固定项、可运动项和禁止突变已经分离。

## Case 09：参考图反推 Prompt

示例意图：

> 分析参考图，并提炼一个可以替换人物和场景的通用 Prompt 模板。

路由：

```text
inputs/single-image-reference.md
→ tasks/prompt-reverse-engineering/playbook.md
→ 结构型路线
→ controls/prompt-assembly/index.md（按需）
→ assets/templates/prompt-reverse-engineering-template.md（按需）
```

结果：通过。复现型、结构型和改造型三条路线可以区分。

## Case 10：综合失败诊断

示例意图：

> 生成结果像网红脸、皮肤很塑料、办公室像样板间，而且构图仍然很摆拍。

路由：

```text
当前 input
→ 当前 task
→ diagnostics/common-image-failure-patterns.md
→ 根据根因返回对应 control 或 library
```

可能返回：

```text
controls/realism-quality/anti-ai-realism.md
controls/composition-camera/candid-composition-imperfections.md
libraries/environment/office-workplace-environment.md
```

结果：通过。diagnostics 不在普通生成流程中默认读取。

## 4. 旧正文去重验证

已删除：

- `references/mode-quick/quick-mode.md`
- `references/mode-interactive/interactive-mode.md`
- `references/input-text-only/text-expansion.md`
- `references/input-image-ref/image-reference-analysis.md`
- 旧 6 类任务 Playbook
- 旧 3 份 appendix
- 旧 `style-control` 三份叶子
- 旧 `portrait` 三份叶子
- 旧办公室混合叶子
- 旧 3 份模式或角色模板

结果：通过。已迁移知识不再保留第二份正文。

## 5. 相对路径审计

重点检查：

- Tasks → Controls / Libraries / Styles
- Controls → Libraries / Styles
- Libraries → Controls
- Diagnostics → Controls / Libraries
- Human selectors 之间的横向引用

人工检查未发现当前新索引指向已删除旧路径的情况。

结果：通过。

## 6. 已知限制

- 尚未配置自动化 Markdown 链接检查
- 尚未建立样例输入的自动化 Skill 输出测试
- 部分新分类目前只有索引，没有详细叶子资料，这是有意保留的扩展入口，不是缺失迁移
- 视觉生成质量仍需在实际使用中继续验证和补充 Reference

## 7. 最终结论

新 Reference 架构已满足本轮约定：

- 8 类任务可独立路由
- 纯文字、单图和多图输入可互斥选择
- 控制方法、详细资料、风格与诊断职责分开
- 旧内容迁移后完成去重
- 任务模板按任务划分
- 默认加载预算可执行
- 当前分支具备进入 PR 审阅的条件
