# Combat Choreography Profiles Library

本库保存少量、稳定、可复用的 **Cinematic Choreography Profile / 电影动作编排风格**。

它只回答“整场动作戏通常怎么组织才形成某种观感”，不定义 Battle Beat、State Contract、角色职业、具体招式或固定动作序列。

Profile 由 `action-combat-video/choreography-playbook.md` 选择和协调。

## 使用原则

- 每场优先一个主 Profile；
- 必要时可有一个辅助 Profile；
- Profile 只提供倾向，不是模板；
- Character Identity 仍动态推导；
- Fighting / Martial / Weapon Profile 负责专业动作知识；
- Model Capability 可以影响执行复杂度，但不能改写 Profile 的核心观看目标。

---

## 1. Realistic Tactical / 写实战术型

**观看目标**：紧张、直接、有效率、真实。

- Coverage 倾向：Medium ～ High；
- Rhythm：均衡 / 短促爆发；
- Exchange Depth：中等；
- Range：频繁围绕真正有效距离变化；
- Contact：Solid 为主，Heavy 只留给真正改变状态的节点；
- Environment：用于出口、边界、遮挡、压制和脱离；
- Tactical Interaction：按角色水平使用，不追求炫技；
- Phrase：短而因果明确，可连续衔接；
- Camera：稳定 medium / medium-wide，强调威胁来源、身体关系与空间；
- Audio：真实脚步、呼吸、抓控、接触与环境反馈优先。

适合：写实动作片、制服 / 脱身 / 保护任务、受限空间近身战。

风险：过度使用 Tactical Close Combat 导致所有角色同质、抓腕 / 控制时间过长、动作观感过平。

---

## 2. Sharp Cinematic Action / 凌厉电影动作型

**观看目标**：动作利落、节奏锐利、电影感强，但仍保持身体与空间可读。

- Coverage 倾向：High；
- Rhythm：均衡到高速；
- Exchange Depth：中到高；
- Range：快速切入 / 退出，角度变化明显；
- Contact：Solid + 少量明确 Heavy Payoff；
- Environment：适度参与，优先制造角度 / 空间变化；
- Tactical Interaction：Counter、Anticipation、Pattern Break 较适合；
- Phrase：短中长度，多 Phrase 无缝连续；
- Camera：动作复杂时稳定跟随，转折 / Payoff 可功能性切镜；
- Audio：关键接触和 Phrase Payoff 有清楚落点。

适合：现代动作电影、短时高强度决斗、商业化动作场面。

风险：把“凌厉”误解成疯狂快切、Camera Shake、每一拍都满强度。

---

## 3. Expert Continuous Exchange / 高手连续攻防型

**观看目标**：观众明确感到双方都很强，连续阅读、反制、再反制。

- Coverage 倾向：High；
- Rhythm：高手高速交换 / Mixed；
- Exchange Depth：高；
- Range：同一 Phrase 内可多次微调，Beat 级 Range 转换保持清楚；
- Contact：Light / Solid / Heavy 有层级，关键在连续后果而非每一下都重；
- Environment：只在能改变线路、Range 或 Advantage 时使用；
- Tactical Interaction：较高，适合 Feint、Read、Counter-to-Counter、Pattern Break；
- Phrase：多个连续 Phrase 构成同一 Battle Beat；
- Camera：优先稳定 medium / medium-wide，减少无必要切镜；
- Audio：高动作密度下强调层级，避免每一下都单独爆音。

适合：势均力敌高手 1v1、职业级对决、需要明显“懂得互相读招”的场景。

风险：Exchange Depth 过高导致模型丢动作；应优先拆 Phrase、降低 Camera Complexity，而不是把整场变成两三次交换。

---

## 4. Heavy Hard-Hitting / 重型硬派型

**观看目标**：身体重量、冲击、控制与恢复代价明显。

- Coverage 倾向：Medium ～ High；
- Rhythm：重击型 / Mixed；
- Exchange Depth：低到中，但每次有效交换必须有后果；
- Range：更重视进入、压迫、贴身和脱离的代价；
- Contact：Solid / Heavy 比例更高，但 Light Probe 仍可存在；
- Environment：适合边界压迫、撞击、失衡和空间限制；
- Tactical Interaction：少量即可，避免把硬派角色写成过度精巧拆招；
- Phrase：允许更明显 recovery / struggle，但不能变成长时间无进展停顿；
- Camera：关键接触可稍近，仍需看见身体发力与 Reaction；
- Audio：脚下、呼吸、身体 / 环境接触、失衡脚步比夸张 Boom 更重要。

适合：力量型角色、硬派拳脚、摔控、狭窄空间冲撞。

风险：所有动作都 Heavy 导致节奏单一；用飞退 / Camera Shake 伪造重量。

---

## 5. Environment-Skilled / 环境技巧型

**观看目标**：人物真正“会用空间打”，环境参与动作设计而非装饰。

- Coverage 倾向：Medium ～ High；
- Rhythm：Mixed；
- Exchange Depth：中等；
- Range：经常因障碍 / 边界 / 高低差变化；
- Contact：根据环境材质选择，不统一强调重击；
- Environment：高，但每次环境动作必须改变路线、Range、Advantage、Target 或 Payoff；
- Tactical Interaction：适合 Forced Response、Bait、Momentum Redirection；
- Phrase：环境变化常作为 Phrase 边界或 Payoff；
- Camera：优先让人物与环境关系可读，避免特写切碎空间；
- Audio：材质、脚步、碰撞和空间反馈重要。

适合：办公室、走廊、厨房、停车场、客栈、廊柱、楼梯等空间特色明显的战斗。

风险：为了“环境丰富”随机使用多个道具；环境破坏不改变战术关系。

---

## 6. Wuxia Flow & Counter / 武侠流动拆招型

**观看目标**：拆招、身法、借力、兵器线路与空间流动形成电影武侠观感。

- Coverage 倾向：Medium ～ High；
- Rhythm：均衡 / 高速拆招 / Mixed；
- Exchange Depth：中到高；
- Range：身法与兵器距离切换明显；
- Contact：按 Blade / Weapon Clash / Body Contact 等模态处理，不使用重拳统一模板；
- Environment：适合廊柱、桌案、石阶、屋顶、高低差等；
- Tactical Interaction：Feint、Anticipation、Counter-to-Counter、Momentum Redirection 较适合；
- Phrase：拆招与身法换位连续组成；
- Camera：展示全身路径、兵器线路、高低位与关键借力节点；
- Audio：衣袂、脚步、兵器材质、落点和环境空间有层级。

适合：电影武侠空手 / 刀剑 / 长兵器动作。

风险：身法变漂浮、每个高潮都腾跃 / 慢动作、兵器线路和 Range 不连续。

---

## Profile 混合边界

可用：

```text
主 Profile
+ 一个明确功能性的辅助 Profile
```

例如：

- 高手连续攻防型 + 环境技巧型；
- 凌厉电影动作型 + 重型硬派型；
- 武侠流动拆招型 + 环境技巧型。

辅助 Profile 只强化一类明确需求，不应让每一维都同时满强度。

## 使用边界

- Profile 不等于视觉 Style；
- Profile 不等于职业 / 身份；
- Profile 不等于 Fighting / Martial / Weapon Profile；
- Profile 不定义固定 Action Phrase 数量；
- Profile 不定义固定 Signature Moment；
- 用户明确观看目标优先于默认倾向；
- 如果某种新动作观感只服务一个具体案例，不要立即新增为稳定 Profile。
