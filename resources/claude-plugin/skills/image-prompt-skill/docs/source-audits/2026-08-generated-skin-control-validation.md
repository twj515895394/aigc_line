# 2026-08 从零生成皮肤控制验证

## 1. 批次信息

- 批次名称：2026-08-generated-skin-control
- 来源：`https://x.com/nanyuan0412/status/2084451298016202976`
- 实施日期：2026-08-30
- 新增正式叶子：无
- 更新正式叶子：`controls/realism-quality/anti-ai-realism.md`
- 更新索引与指针：`realism-quality/index.md`、`finished-image/playbook.md`、`common-image-failure-patterns.md`、`lifestyle-candid-photography.md`

## 2. 来源与许可检查

- [x] 来源名称和 URL 已记录
- [x] 许可证未知，只做结构抽象
- [x] 未复制三组完整 Prompt
- [x] 未复制第三方图片
- [x] 未形成第二份皮肤正文真源
- [x] 正式 Reference 不依赖 `docs/source-staging/`

## 3. 候选知识审计

| 候选知识 | 读取条件 | 处理结果 |
|---|---|---|
| 皮肤五变量 | 从零生成近景真实人像 | 更新 `anti-ai-realism.md` |
| 高光优先于毛孔的排查顺序 | 生成结果仍塑料 | 写入同一叶子 |
| 近远景皮肤密度 | 全身 / 近景切换 | 写入同一叶子 |
| 皮肤与胶片颗粒分层 | 近景同时写纹理和颗粒 | 写入同一叶子 |
| 保真编辑三件事合同 | 已有成片只补细节 | 不并入，仍在 `fidelity-detail-enhancement.md` |

## 4. 路由验证

### 4.1 正常命中

- 请求：生成一张窗边中近景生活人像，皮肤要真实，不要塑料感。
- 预期 input：`text-input-expansion`
- 预期 task：`finished-image`
- 预期 controls：`anti-ai-realism`
- 不应加载：`fidelity-detail-enhancement`
- 结论：通过。皮肤五变量随去 AI 感叶子一起读取，不另占 control 额度。

### 4.2 相邻任务不应误加载五变量细写

- 请求：这张 MJ 图构图光线都好，只把皮肤补真一点，别换人。
- 应加载：`image-editing` + `fidelity-detail-enhancement`
- 不应把生成五变量当成编辑合同
- 结论：通过

- 请求：白底陶瓷杯电商主图。
- 不应加载皮肤五变量细写
- 结论：通过

- 请求：办公室全景里有一个很小的人物。
- 可加载 `anti-ai-realism`，但应按远景少写皮肤，不铺满毛孔
- 结论：通过

### 4.3 联动但不重复加载

- 近景生活抓拍：`anti-ai-realism` 为皮肤正文，`lifestyle-candid-photography` 只保留近景指针
- 失败诊断只提供检查顺序指针，不复制五变量表
- 结论：通过

## 5. 加载预算检查

```text
input：1
task：finished-image
controls：anti-ai-realism（含皮肤五变量）
libraries：0–1
style：0–1 lifestyle candid（按需）
diagnostic：0
```

- [x] 未为皮肤单独新增 control 叶子，避免典型人像突破 0–2 controls
- [x] 未与 `fidelity-detail-enhancement` 同时加载

## 6. 快速模式

- [x] 用户说“皮肤真实一点”时不追问五个变量，按半哑光默认补全
- [x] 只输出最终 Prompt，不展示皮肤分析或模板名称
- [x] 结构化模板不被快速模式读取

## 7. 验收结论

```text
状态：通过
结论：从零生成的皮肤写法已并入 anti-ai-realism，与保真编辑正交，不新增叶子。
后续动作：运行完整性检查。
```
