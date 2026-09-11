# 2026-08 保真细节增强来源审计

## 来源

- 来源类型：公开 X 长文
- 来源主体：南鸢 nuyoah（@nanyuan0412）
- 来源 URL：`https://x.com/nanyuan0412/status/2093512541108601334`
- 长文 URL：`https://x.com/i/article/2093511468407050240`
- 长文标题：MJ 人像磨皮感太重？这段 Prompt 能把真实纹理补回来
- 发布日期：2026-08-29
- 访问日期：2026-08-30
- 许可证：未知；公开社交媒体长文，未声明可自由再分发
- 第三方图片：有对比图和案例图；仅用于理解结构，不提交到仓库
- 完整 Prompt：长文正文含测试版和通用版；本次不复制原文进入正式 Reference

## 使用边界

许可证不明确，因此：

- 不复制长文完整 Prompt；
- 不提交第三方图片；
- 不把作者测试过的具体模型排名写成通用能力事实；
- 只做结构抽象、规则重写和模型无关的控制合同提炼。

允许采用的内容：

- 已有成片“大结构成立、只缺皮肤微观细节”时，不应重新抽卡；
- 保真增强属于局部编辑，不是整体图生图；
- 必须同时写清允许增加、严格锁定和明确排除；
- 高光与纹理必须分开锁定；
- 目标是同一张照片的高像素母版，而不是另一张相似人像；
- 只写“真实皮肤”会失败。

禁止直接复制的内容：

- 长文中的完整可复制 Prompt；
- 案例图、对比图和原图；
- 针对车内人像的逐句原文；
- 把某个编辑模型写成必选参数。

## 查重结论

| 候选知识 | 现有文件 | 重合判断 | 处理 |
|---|---|---|---|
| 去塑料皮、保留轻微皮肤纹理 | `controls/realism-quality/anti-ai-realism.md` | 有主题重合，但那份叶子服务从零生成和生活抓拍，不覆盖“已有成片只补微观细节” | 保留原叶子；新增正交 control |
| 局部编辑必须保留 / 修改 / 禁止变化 | `tasks/image-editing/playbook.md` | 合同骨架可复用，但缺少保真增强这一编辑类型 | 更新 Playbook，不复制控制正文 |
| 塑料皮诊断 | `diagnostics/common-image-failure-patterns.md` | 已有现象，修复过于粗，只说“补轻微皮肤纹理” | 更新修复指针 |
| 整体图生图高保留质感优化 | `tasks/image-to-image/playbook.md` | 旧路由会把“只补皮肤”误送到整体改写 | 收窄边界 |

不采用的沉淀方式：

- 不新建写真任务根目录；
- 不新建皮肤材质资料库；
- 不把作者完整 Prompt 当作模板正文。

## 正式归属

本次属于现有 `image-editing` + `realism-quality` 能力增强。

正式正文：

- 新增 `../../references/controls/realism-quality/fidelity-detail-enhancement.md`
- 更新 `../../references/tasks/image-editing/playbook.md`
- 更新 `../../references/tasks/image-to-image/playbook.md`

索引和诊断只负责路由，不形成第二份正文真源。

## 相邻能力边界

- 从文字生成真实照片：`anti-ai-realism.md`
- 已有成片只补微观细节：`fidelity-detail-enhancement.md`
- 换场景、换构图、换光影：`image-to-image`
- 普通物体替换 / 文字修改：`image-editing`，但不读取保真细节增强叶子
- 瓷肌、美颜、低频美容皮：不读取本叶子

## 相关但不并入正文的前序帖子

以下帖子与皮肤控制相关，但不是本次正式真源。它们只作为查重和边界参考：

- `https://x.com/nanyuan0412/status/2084451298016202976`：从零生成时把皮肤拆成多个控制点，更接近 `anti-ai-realism` 的后续增强候选
- `https://x.com/nanyuan0412/status/2089599509567599063`：近景与远景不应共用同一套皮肤密度，本次只吸收为保真增强叶子中的一条约束

后续批次 `2026-08-generated-skin-control` 已将从零生成的皮肤五变量并入 `anti-ai-realism.md`，生成规则不写入保真编辑叶子。

## 直接引用情况

- 未复制第三方完整 Prompt。
- 未复制第三方图片。
- 未保留长文大段原文。
- 正式规则为本项目重新组织后的结构化描述。

## 临时区

本次是单篇公开长文，许可不明，不把原文放入 `docs/source-staging/`。完整性检查也会在 staging 残留文件时失败。来源、边界和去向由本审计、验证文档和 `references/SOURCES.md` 长期保留。
