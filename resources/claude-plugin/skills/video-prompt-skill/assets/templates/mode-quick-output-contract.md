# 快速模式输出合同

## 适用条件

除非用户明确要求讨论、脑暴、逐步设计、先提问、比较方向或共同决策，否则默认进入快速模式。

## 执行规则

快速模式是全自动交付模式：

- 不向用户追问非必要信息；
- 不要求用户确认中间方向；
- 不输出 A / B / C 让用户自行补全设计；
- 不展示内部分析、Reference 路由、资料加载过程或自动补全依据；
- 信息缺失时根据当前请求、会话上下文、输入素材、任务 Playbook 和最小风险默认值自行补全；
- 信息冲突时按用户明确要求、必须保留项、任务目标和主参考职责自行裁决；
- 多模态输入先自动分配素材职责，禁止平均融合；
- 不因缺少非必要细节而中断交付。

### Combat Quick Mode

Action Combat 的 Quick Mode 不是简化版动作引擎：

> **Quick = Full Planning + Silent Resolution.**

内部仍完整运行：Combat Intent、Branch、Choreography Profile、Coverage、Rhythm、Character Identity、Environment Affordance、Contact Solidity、Signature Moment、Action Execution / Camera Readability Budget、Battle Beat 与 State / Continuity Validation。

这些内部状态不默认展示；最终只交付用户可直接使用的完整 Prompt。

Quick Mode 不得因为用户输入简短而自动降低 Combat Coverage、Exchange Richness、Contact Solidity 或 Signature Moment 质量标准。

---

## 默认交付原则

> 只输出用户实际需要使用的最终内容，不强制展示过程字段。

### 简单单镜头任务

默认只输出一份可直接复制的视频 Prompt。

允许使用一个代码块承载 Prompt，但代码块前后不附加无价值说明。

Prompt 内应按需合并：

- 视频目标和时长；
- 初始状态；
- 主体运动；
- 镜头状态；
- 表演与声音；
- 光影与风格；
- 收尾状态；
- 当前高风险连续性和失败限制。

Action Combat 中，Prompt 主体必须是可见的 Action Phrase、对手响应、Contact / Reaction / Consequence 与空间变化，不把内部 Range / Advantage / Condition 状态表直接输出。

### 多镜头或多片段任务

只输出必要的全局固定项和镜头级 Prompt Pack：

```text
全局固定项：...

Shot 01｜0.0-...
...

Shot 02｜...-...
...

全片连续性与声音：...
```

不额外输出一份与镜头包重复的故事梗概。

### 多模态参考任务

当素材职责是执行不可缺少的信息时，在最终 Prompt 顶部保留简洁绑定说明：

```text
参考职责：参考图 A 提供人物；参考图 B 提供场景；参考视频 A 提供动作；参考音频 A 提供节拍。
```

不展示内部完整素材审计表，除非用户明确要求。

### 视频编辑与延长

将“必须保留、必须修改、允许变化、禁止变化”或“接点状态、延长方向、新增发展、最终落点”直接写入最终可复制 Prompt，不在 Prompt 外重复解释。

---

## 模型适配

- 用户未指定模型：按 Generic 输出；
- 用户指定 Seedance 2.0：使用明确的 `@图片N / @视频N / @音频N` 职责绑定；
- 用户指定 LTX-2.3：默认输出连贯、具体、现在时的自然语言导演段落；
- 不输出本项目未正式支持模型的伪造语法或参数。

Model Adapter 可以改变序列化 / 表达方式和执行复杂度，但不能偷改已确定的 Combat Intent、Coverage、人物关系或战斗结果。

---

## Final Prompt QA / Silent Self-Repair Gate

最终 Prompt 草稿完成后，**不得立即交付**。Quick Mode 必须先执行一次最终核对，并在发现实现质量问题时静默修正。

运行顺序：

```text
Final Draft
→ Prompt QA
→ PASS：Delivery
→ FAIL：定位主失败项
→ Silent Self-Repair
→ Re-run Prompt QA
→ PASS：Delivery
```

### QA 最小检查

至少检查：

- 用户明确要求、必须保留 / 必须修改 / 必须禁止项是否全部兑现；
- 是否出现前后矛盾、主体 / 场景 / 道具 / 时间 / 空间 /动作状态断裂；
- 主体动作、Camera、Audio、Style 是否存在互相抢指令或因果脱节；
- 是否把同一镜头的画面 / 动作 / 光色 / 镜头写细误判为过载；
- 指定时长是否装不下过多独立主事件；若是，应提醒用户而不是静默压缩；
- 是否把已经具体的动作、镜头或素材职责压回抽象摘要；
- Camera 是否与主体运动和空间变化相匹配，而不是随机运镜；
- Negative / Continuity 是否过长、重复或加入用户未要求的剧情限制；
- Ending 是否过早吞掉主体动作，或没有自然落点；
- Model Adapter 是否只改变实现方式，没有偷改用户目标；
- 多模态任务的素材职责与主真源是否仍然一致。

Action Combat 还必须叠加当前 Combat Task 的 Stage-2、Subject Motion、Persistent Combat Signature、Action–Camera、Execution Realizability 与 Combat Final Preflight 检查。

### Silent Self-Repair 权限边界

允许静默修复：

- 重新组织语序 / Phrase；
- 补回已经确认但在序列化中丢失的动作、镜头或素材职责；
- 删除重复解释和空泛质量词，不删除已写清的画面维度；
- 修复动作 / Camera / Continuity / Ending 的实现性问题；
- 在**不改变用户已确认创作决策**的前提下，调整局部实现。

禁止静默修改：

- 用户明确选择的 Fighting Direction / Character Technique Identity；
- Base Viewing Priority / Camera Hard Constraint；
- 人物身份、剧情关系、胜负 / 结局；
- 必须保留 / 必须禁止项；
- 素材主真源与用户明确绑定；
- 其他已经确认的高层创作决策。

Quick Mode 如果发现“只有改变用户明确决策才能消除”的真正硬冲突，不得偷偷改决策；应在最终交付中用最简方式指出冲突，并给出在现有约束下的最佳可执行结果。

### Repair Pass

默认至少执行 `1` 次 QA；发现问题时执行 `1` 次静默修复并重新核对。

如果第一次修复引入新的依赖问题，或复杂任务仍存在明显高价值 FAIL，可再执行一次修复；不进行无止境循环。

原则：

> **Quality Issue → Repair Implementation.**  
> **Confirmed Creative Decision → Preserve.**

---

## 不默认输出

除非用户明确要求或确有独立价值，不输出：

- 备选版本；
- 已自动补全项；
- 方向决策摘要；
- Combat Planning Context；
- Range / Advantage / Condition 状态表；
- Reference 加载清单；
- 模型能力科普；
- 使用教程；
- 重复的负向词清单；
- 结尾追问。

## 允许增加的内容

仅在以下情况增加结构：

- 用户要求完整设计文档；
- 多镜头必须依赖全局固定项；
- 多模态必须明确素材职责；
- 模型输出需要特定组织形式；
- 用户要求中英双版、多个时长版或明确备选方案；
- 需要指出无法同时满足的硬冲突；
- 指定时长装不下过多独立主事件，必须提醒用户取舍。

## 最小风险自动补全顺序

```text
用户当前明确要求
→ 必须保留 / 必须修改 / 必须禁止
→ 当前会话上下文
→ 输入素材可见或可听信息
→ 当前任务 Playbook
→ 已加载 controls / libraries / style
→ 当前模型能力边界
→ 最小风险默认值
```

Combat 中“最小风险”不等于“动作最少”。高信息密度动作应通过 Phrase、Camera Readability 和 Execution Budget 组织清楚。

## 禁止事项

- 禁止把简单任务输出成冗长方案书；
- 禁止默认提供多个近似版本增加选择负担；
- 禁止在 Prompt 外重复已经写入 Prompt 的限制；
- 禁止以“写得太细”为由自动压缩画面、动作、光色或镜头；
- 禁止以“信息不足”为由追问可自动补全的变量；
- 禁止用“电影感、大片感、丝滑运镜”等空泛词替代动作、镜头、光影和声音；
- 禁止暴露内部目录、迁移状态和知识真源；
- Combat 禁止把 Quick Mode 退化成低 Coverage / 少交换版本；
- Combat 禁止为了“清晰”默认削减有效攻防；
- Combat 禁止用大量内部状态标签和 Negative Boilerplate 挤占动作描述。
