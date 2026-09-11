# 2026-08 保真细节增强验证

## 1. 批次信息

- 批次名称：2026-08-fidelity-detail-enhancement
- 来源：`https://x.com/nanyuan0412/status/2093512541108601334`
- 实施日期：2026-08-30
- 新增正式叶子：`references/controls/realism-quality/fidelity-detail-enhancement.md`
- 更新正式叶子：`tasks/image-editing/playbook.md`、`tasks/image-to-image/playbook.md`、`controls/realism-quality/anti-ai-realism.md`、`diagnostics/common-image-failure-patterns.md`、`inputs/single-image-reference.md`
- 更新索引：`tasks/index.md`、`controls/realism-quality/index.md`

## 2. 来源与许可检查

- [x] 来源名称和 URL 已记录
- [x] 许可证未知，已记录只能结构抽象
- [x] 未复制完整 Prompt
- [x] 未复制第三方图片
- [x] 未把模型营销描述写成通用事实
- [x] 正式 Reference 不依赖 `docs/source-staging/`

## 3. 候选知识审计

| 候选知识 | 解决的真实问题 | 读取条件 | 现有文件查重 | 归属 | 处理结果 |
|---|---|---|---|---|---|
| 保真细节增强三件事合同 | 已有成片只缺皮肤微观细节 | 用户要求补纹理 / 去磨皮 / 保真增强且其他不变 | 与 anti-ai-realism 主题相近但任务不同 | controls | 新增叶子 |
| 保真增强是局部编辑 | 避免误送到整体图生图 | 构图光影已成立，只改微观细节 | image-editing / image-to-image 边界不足 | tasks | 更新现有叶子 |
| 只写真实皮肤会失败 | 防止毛孔贴图和继续磨皮 | 塑料皮诊断或保真增强 | diagnostic 修复过粗 | diagnostics | 更新现有叶子 |
| 从零生成的 5 点皮肤拆分 | 生成阶段皮肤控制 | 无已有成片 | 更接近 anti-ai-realism | 暂不并入 | 仅审计保留 |

## 4. 路由验证

### 4.1 正常命中

- 请求：这张 Midjourney 人像构图和光影都很好，只是皮肤太光滑，帮我写一段只补真实皮肤纹理、不重新设计人物的编辑 Prompt。
- 预期 input：`single-image-reference`
- 预期 task：`image-editing`
- 预期 controls：`fidelity-detail-enhancement`
- 预期 libraries：无
- 预期 style：无
- 实际结果：规则覆盖。Playbook 将保真增强列为局部编辑类型，并指向唯一 control 真源。
- 结论：通过

### 4.2 相邻任务不应误加载

- 请求：生成一张看不出是 AI 的办公室生活抓拍。
- 不应加载：`fidelity-detail-enhancement.md`
- 实际结果：应走 `finished-image` + `anti-ai-realism`。
- 结论：通过

- 请求：保留这个人，把车内改成雨夜街道，整体换风格。
- 不应加载：`fidelity-detail-enhancement.md`
- 实际结果：应走 `image-to-image`。
- 结论：通过

- 请求：只把桌上的杯子换成玻璃水杯，其他人脸和背景不变。
- 不应加载：`fidelity-detail-enhancement.md`
- 实际结果：应走普通 `image-editing` 物体替换合同。
- 结论：通过

### 4.3 联动但不重复加载

- 请求：这张图皮肤像蜡，帮我修，但脸、构图和光线都不要动。
- 预期联动：`image-editing` + `fidelity-detail-enhancement`
- 预期唯一真源：皮肤微观细节合同只存在于 `fidelity-detail-enhancement.md`
- 实际结果：diagnostic 只提供指针，不复制完整合同；不与 `anti-ai-realism` 同时加载。
- 结论：通过

## 5. 加载预算检查

```text
input：single-image-reference
task：image-editing
controls：fidelity-detail-enhancement
libraries：0
style：0
diagnostic：0
```

- [x] 默认固定为 1 input + 1 task
- [x] controls 不超过 0–2
- [x] libraries 不超过 0–2
- [x] style 不超过 0–1
- [x] diagnostic 仅在故障诊断时加载
- [x] 未为凑额度读取 anti-ai-realism 或 identity-consistency

## 6. 结构和链接检查

- [x] 索引只写读取条件和目标路径
- [x] 新叶子满足最低结构要求
- [x] Markdown 相对链接有效
- [x] 正式 Reference 未引用 `docs/source-staging/`
- [x] 未形成第二份正文真源
- [x] 未新增空目录或空叶子
- [x] 文件名使用英文小写 kebab-case

## 7. 回归检查

- [x] 原有局部替换、文字编辑路由仍然有效
- [x] 整体图生图不再把单纯质感增强当作高保留改写
- [x] 从零生成真实照片仍优先 `anti-ai-realism`
- [x] 快速模式：保真增强请求直接输出编辑 Prompt，不追问、不展示分析
- [x] 结构化 `image-editing-template.md` 只在交互模式或用户明确要求完整文档时读取

## 8. 遗留问题

- 从零生成时的皮肤拆分（高光落点、区域毛孔密度、半哑光基底）仍留在审计层，待有独立批次再考虑并入 `anti-ai-realism.md`。
- 本批次未做真实生图模型端到端画质评测。

## 9. 验收结论

```text
状态：通过
结论：南鸢保真增强长文已按结构抽象沉淀为 image-editing 的按需 control，不破坏快速模式和默认加载预算。
后续动作：运行 python scripts/check_reference_integrity.py；提交前不把第三方 Prompt 原文带进仓库。
```
