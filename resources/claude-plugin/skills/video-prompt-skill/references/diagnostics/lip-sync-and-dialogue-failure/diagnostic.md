# Lip Sync And Dialogue Failure Diagnostic

## 适用现象

- 口型与台词长度不匹配；
- 说话人混乱；
- 对白没有呼吸、停顿和身体动作；
- 情绪、音色和面部表演不同步；
- 长台词挤在短时长里。

## 优先根因

1. 台词长度超过可用时长；
2. 没有标明说话人、语言、音量和语速；
3. 一整段长句没有停顿和动作节点；
4. 镜头切换与对白节点无关；
5. 多人物同时说话但未分配轮次。

## 检查顺序

```text
目标时长
→ 说话人
→ 台词长度
→ 语速与音量
→ 句间停顿
→ 呼吸和身体动作
→ 镜头节点
→ 口型可见性
```

## 最小修复

- 缩短台词或延长镜头，不强塞内容；
- 将长句拆成短句；
- 每句前后加入吸气、视线、嘴角、手部或姿态变化；
- 明确每位角色的轮次和镜头关注对象；
- 不需要精确口型时避免持续正面大特写；
- 声音和表演使用同一情绪曲线。

## 重写骨架

```text
说话人 A 以...音量和...语速说：“...”
他说完后停顿...，视线...，呼吸...，身体...
镜头在...节点靠近/停留/转向 B。
说话人 B 随后说：“...”
全段对白在...秒内完成，最后以...表情和姿态收束。
```

## 相关真源

- `references/controls/performance-expression/control.md`
- `references/controls/audio-visual-sync/control.md`
- `references/libraries/performance-expression/library.md`
- `references/libraries/audio-sound/library.md`

## 完成标准

台词、说话人、嘴部运动、呼吸、表演和镜头节点处于同一时间结构中。