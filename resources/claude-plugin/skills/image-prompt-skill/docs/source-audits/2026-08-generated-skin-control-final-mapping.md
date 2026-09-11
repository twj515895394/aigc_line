# 2026-08 从零生成皮肤控制最终映射

## 来源

- `https://x.com/nanyuan0412/status/2084451298016202976`
- `https://x.com/i/article/2083987738546888704`
- 辅助：`https://x.com/nanyuan0412/status/2089599509567599063`
- 辅助：`https://x.com/nanyuan0412/status/2085210766546997468`

## 正式去向

| 来源知识 | 正式路径 | 处理 |
|---|---|---|
| 皮肤五变量：纹理 / 高光位置 / 质感基调 / 轻微不完美 / 光线 | `references/controls/realism-quality/anti-ai-realism.md` | 更新现有叶子 |
| 先收高光，再补光线，最后看纹理 | 同上 | 写入排查顺序 |
| 近景细写、远景少写、手脸同一套光 | 同上 | 写入景别规则 |
| 皮肤材质与胶片颗粒分层 | 同上 | 写入成像层边界 |
| 三组可复制 Prompt | 不进入正式 Reference | 改写为结构骨架 |
| 已有成片保真增强 | `fidelity-detail-enhancement.md` | 保持上一批次真源 |

## 不进入正式 Reference

- 长文完整 Prompt 原文
- 对比图
- 关于训练数据以网图磨皮为主的推测
- 独立皮肤资料库或第三份真实感叶子

## 清理说明

未创建 `docs/source-staging/`。长期保留本映射、来源审计、验证和 `references/SOURCES.md`。
