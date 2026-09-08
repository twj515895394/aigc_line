# Signature Moment Patterns Index

本索引用于从当前 Combat Planning Context 路由到少量可复用 **Signature Moment Pattern / 标志性动作时刻模式**。

运行时原则：

```text
Combat Planning Context
→ 读取本轻量 Index
→ 选择 Top 1–3 Pattern Candidate
→ 只读取命中的 patterns/<id>.md
→ 重新生成当前场景独有的 Signature Moment
```

正常生成不读取 `source-cases/` 研究档案。

> **Pattern 是生产知识；Source Case 是研究证据。**  
> **Pattern 提供机制，不提供固定动作答案。**

## Seed Patterns

| pattern_id | name | short_summary | combat_context_tags | spatial_tags | environment_tags | character_relation_tags | weapon/unarmed | rhythm_fit | exchange_depth_fit | payoff_type | detail_path |
|---|---|---|---|---|---|---|---|---|---|---|---|
| constrained-space-reversal | 狭窄空间反制 | 利用空间边界把被压迫关系翻转为反击窗口 | 1v1, pressure, close-combat | corridor, wall, doorway, tight-space | wall, doorframe, furniture | even, under-pressure | both | mixed, heavy, expert | medium-high | dominance-reversal | `patterns/constrained-space-reversal.md` |
| environment-assisted-counter | 环境辅助反击 | 环境改变线路 / 支点 / 追击路径，使 Counter 获得新角度 | 1v1, 1vN, counter | room, corridor, layered-space | furniture, pillar, rail, terrain | even, adaptive | both | mixed, expert | medium | environment-payoff | `patterns/environment-assisted-counter.md` |
| rapid-counter-recounter | 高速反制再反制 | Attack → Defense → Counter → Re-counter 连续升级并形成清楚 Payoff | expert-duel, parity | open, medium-space | optional | even, skilled-vs-skilled | both | expert, sharp | high | exchange-climax | `patterns/rapid-counter-recounter.md` |
| weapon-distance-transition | 兵器距离切换 | 通过偏转 / 贴身 / 回收 / 重建距离改变兵器优势 | weapon-duel | open, corridor, layered-space | optional | range-advantage | weapon | mixed, wuxia | medium-high | range-reversal | `patterns/weapon-distance-transition.md` |
| false-opening-trap | 假破绽诱导反制 | 主动暴露可控窗口，诱导特定攻击后完成预设反制 | expert-duel, tactical | open, constrained | optional | even, reader-vs-reader | both | expert, mixed | high | tactical-reversal | `patterns/false-opening-trap.md` |
| momentum-redirection | 动量重定向 | 不与来力硬碰，通过角度 / 借力把冲势转为换位、失衡或反击 | modern, wuxia, grappling | room, corridor, elevated | wall, table, rail, terrain | size-difference, even | both | mixed, wuxia, heavy | medium | spatial-payoff | `patterns/momentum-redirection.md` |
| dominance-reversal | 主导权瞬间翻转 | 通过单个明确 Turning Event 让压制者与被压制者角色互换 | 1v1, climax | any | optional | pressure-vs-counter | both | mixed, heavy, expert | medium-high | dominance-reversal | `patterns/dominance-reversal.md` |

## 选择规则

优先匹配：

1. 当前 Combat Intent / Choreography Profile；
2. Character Relationship；
3. Range / Spatial / Environment 条件；
4. Weapon / Unarmed；
5. Rhythm / Exchange Depth；
6. 目标 Payoff 类型。

不要因为某个 Pattern “很酷”而忽略当前状态条件。

## 使用边界

- 一个约 15 秒短片通常只需要 1 个主要 Signature Moment；
- Index 命中多个 Pattern 时，可以只读取最相关的 1–3 个做候选；
- 最终 Signature Moment 必须重新结合当前人物、环境、Range、Advantage 和前后 Action Phrase 生成；
- 不复制来源作品完整动作段；
- 不把 Pattern 当作每个 Battle Beat 都要套用的固定模板；
- `source-cases/` 仅在维护、核实、用户明确指定作品 / 场景或 Pattern 需要重新审查时读取。
