# 2026-08 保真细节增强最终映射

## 来源

- `https://x.com/nanyuan0412/status/2093512541108601334`
- `https://x.com/i/article/2093511468407050240`

## 正式去向

| 来源知识 | 正式路径 | 处理 |
|---|---|---|
| 已有成片只补皮肤微观细节，不重新抽卡 | `references/tasks/image-editing/playbook.md` | 更新任务类型和边界 |
| 允许增加 / 严格锁定 / 明确排除 | `references/controls/realism-quality/fidelity-detail-enhancement.md` | 新增唯一正文真源 |
| 高光与纹理分开、区域密度、近远景差异 | 同上 | 写入同一 control，不另建皮肤库 |
| 同一 Prompt 换模型只是强度不同 | 同上强度表 | 不把模型名写成必选参数 |
| 只写真实皮肤会失败 | `references/diagnostics/common-image-failure-patterns.md` | 更新修复指针 |
| 旧的“高保留质感优化”误路由 | `references/tasks/image-to-image/playbook.md` | 收窄到整体改写 |

## 不进入正式 Reference

- 长文完整 Prompt 原文
- 案例对比图
- 车内人像逐句场景描写
- 具体编辑模型排名
- 从零生成的 5 点皮肤拆分长文

## 清理说明

本次未创建 `docs/source-staging/`。许可不明的原文不入库，长期保留审计、验证、本映射和 `references/SOURCES.md`。
