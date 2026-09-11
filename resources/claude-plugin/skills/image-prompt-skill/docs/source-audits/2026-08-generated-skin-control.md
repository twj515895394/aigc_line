# 2026-08 从零生成皮肤控制来源审计

## 来源

- 来源类型：公开 X 长文 + 同作者相关短帖
- 主来源：南鸢 nuyoah（@nanyuan0412）《为什么你加了「真实皮肤」，脸还是塑料感？》
- 来源 URL：`https://x.com/nanyuan0412/status/2084451298016202976`
- 长文 URL：`https://x.com/i/article/2083987738546888704`
- 发布日期：2026-08-04
- 访问日期：2026-08-30
- 许可证：未知；公开社交媒体长文，未声明可自由再分发
- 第三方图片：有对比图；仅用于理解结构，不提交到仓库
- 完整模板：长文含三组可复制 Prompt；本次不复制原文

辅助来源，只吸收稳定规则，不作为第二份正文真源：

- `https://x.com/nanyuan0412/status/2089599509567599063`：近景与远景不应共用同一套皮肤密度；手背必须和脸同一套光
- `https://x.com/nanyuan0412/status/2085210766546997468`：真实皮肤纹理不要和胶片颗粒叠在同一层

## 使用边界

许可证不明确，因此：

- 不复制三组完整可套用 Prompt；
- 不提交对比图；
- 不把「网图训练导致磨皮」等无法独立核验的训练数据判断写成事实；
- 只做结构抽象和模型无关的控制规则。

允许采用：

- 「真实皮肤」是过大词，模型会按精修人像去补；
- 皮肤应拆成纹理、高光位置、质感基调、轻微不完美、光线五个变量；
- 毛孔只占一项，先收高光再补纹理；
- 正面描述先于负面约束；
- 微瑕疵只选 1–2 项；
- 近景细写、远景少写；
- 皮肤材质层和胶片颗粒成像层分开。

## 查重结论

| 候选知识 | 现有文件 | 重合判断 | 处理 |
|---|---|---|---|
| 去塑料皮、轻微皮肤纹理 | `anti-ai-realism.md` | 旧写法正是本长文指出的失败句 | 更新现有叶子 |
| 已有成片只补微观细节 | `fidelity-detail-enhancement.md` | 任务不同：编辑 vs 生成 | 保持正交，不合并 |
| 生活化摄影「皮肤纹理自然」 | `lifestyle-candid-photography.md` | 风格层过粗 | 近景补一句指针，不复制五变量正文 |
| 塑料皮诊断 | `common-image-failure-patterns.md` | 生成侧修复仍过粗 | 更新检查顺序指针 |

不新建皮肤资料库，不新建第三份真实感叶子。生成侧皮肤正文只保留在 `anti-ai-realism.md`。

## 正式归属

- 更新 `../../references/controls/realism-quality/anti-ai-realism.md`
- 更新 `../../references/controls/realism-quality/index.md`
- 更新 `../../references/tasks/finished-image/playbook.md`
- 更新 `../../references/diagnostics/common-image-failure-patterns.md`

## 相邻能力边界

- 从零生成 / 整体改写要真实皮肤：`anti-ai-realism.md`
- 已有成片只补微观细节：`fidelity-detail-enhancement.md`
- 瓷肌、美颜、低频美容皮：不读取本页皮肤五变量
- 产品、远景、小脸：不把五变量写满

## 临时区

单篇公开长文，许可不明，不把原文放入 `docs/source-staging/`。
