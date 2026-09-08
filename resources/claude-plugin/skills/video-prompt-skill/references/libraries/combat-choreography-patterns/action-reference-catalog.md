# Combat Action Reference Catalog

> 状态：**Runtime-Wired Concrete Action Knowledge**  
> 来源：用户提供的 6 张《AI漫剧打斗动作提示词大全》图片，共 **17 个**可见动作模板（1–17）。  
> 目的：提供 Action Combat Stage-2 可按需读取的**单动作级 Concrete Action Reference**。本文件回答“现在适合用什么具体动作、为什么成立、会造成什么状态变化、以什么物理尺度表现”，不决定 Battle Beat、Exchange Spine、Camera 或最终胜负。

---

# 1. Runtime 使用原则

## 1.1 只在出现 Concrete Action Selection Gap 时读取

本 Catalog 不是所有 Combat 请求的默认必读大词典。

当 Stage-2 已知道当前需要的功能，但仍缺少一个**具体可执行动作**时读取，例如：

```text
Current Combat State
+ Combat Role Need
+ Incoming / Opponent Action
+ Physical Presentation Domain
→ Concrete Action Selection Gap
→ READ action-reference-catalog.md
→ filter candidates
→ select one concrete action
→ realize into Action Phrase
```

优先过滤顺序：

```text
Prerequisites 合法
→ Selected Physical Level 落在 Min / Max 区间
→ Combat Role 匹配
→ Response Compatibility 匹配
→ State Transition 能产生当前 Exchange Spine 需要的结果
→ Tempo / Risk / Initiative 与当前节奏一致
```

禁止为了“丰富”机械把 Catalog 动作塞入每个 Phrase。

## 1.2 最小知识颗粒度

最小颗粒度固定为：

> **Single Action Template / 单动作模板**

手、脚、肩胯、重心、支撑、接触点属于动作内部机制，不继续拆成独立节点。

连招不作为基础知识条目；连招由当前 State + Transition Compatibility + Runtime Exchange Spine 动态形成。

## 1.3 Visual Medium 与 Physical Level 解耦

真人写实影视、国风漫剧、2D、3D 等 Visual Medium 与动作物理尺度完全解耦。

```text
P1 Grounded
= 现实人体物理为主，允许有限电影强化

P2 Cinematic Exaggerated
= 保留明确动作因果，强化速度、爆发、位移和环境反馈

P3 Hyper-Cinematic / Supernatural
= 允许残影、超高速位移感、明显滞空、气劲、冲击波、剑气、地裂等
```

> **降低 Physical Level 可以削弱表现强度，但不能偷偷改变 Core Action Mechanic。**

## 1.4 Combat Role 固定为 8 个

```text
Entry
Pressure
Defense
Counter
Re-entry
Reversal
Signature
Finisher
```

Range / Route / Balance / Support 等变化由 `State Transition` 表达，不重复膨胀 Role 枚举。

## 1.5 轻量字段，不建立第二套状态机

`Response Compatibility` 只使用：

```text
Best Against
Poor Against
Best State
```

`State Transition` 使用稀疏 Before → After，只写真正发生变化的维度。

`Initiative Effect` 使用：

```text
Retain / Gain / Steal / Lose / Open Counter Window / Neutral
```

只有明显必要时补一句条件说明，不为每个动作拆 On Hit / On Miss / On Block / On Evade 四套状态树。

---

# 2. 单动作 Schema

无意义字段可省略，不机械填满。

```text
id
source_id
canonical_name
aliases
functional_category
applicable_range
core_action_mechanic
body_contact_relation
immediate_visible_result
physical_level_range: Min / Default / Max
combat_role
response_compatibility: Best Against / Poor Against / Best State
state_transition
initiative_effect
tempo_profile
risk_commitment: Commitment / Miss-Block Risk / Recovery Exposure / Payoff
prerequisites
transition_compatibility
environment_impact
risks_failure_modes
metadata
```

---

# 3. 突进接敌类

## A01｜爆发瞬身接敌 / Explosive Burst Entry

- **Source ID / Alias**：01｜极速瞬身突袭
- **Applicable Range**：mid → close
- **Core Action Mechanic**：压低重心后爆发蹬地，以短距离高速位移迅速压缩距离；P3 可产生残影 / 瞬身观感，但动作核仍是高速接敌。
- **Immediate Visible Result**：对手必须立刻截击、封线、侧移或后撤。
- **Physical Level**：Min P2 / Default P2 / Max P3
- **Combat Role**：Entry / Re-entry / Pressure
- **Response Compatibility**：Best Against：对手后撤、Recovery、路线短暂开放；Poor Against：已建立稳定贴身控制、无前冲路线；Best State：中距离且落脚区清楚。
- **State Transition**：Range: Mid → Close；Initiative: Neutral → Gain
- **Initiative Effect**：Gain；明显扑空时 Open Counter Window
- **Tempo**：Burst
- **Risk / Commitment**：Medium；前冲惯性形成短 Recovery Exposure；Payoff 为快速夺取 Entry
- **Prerequisites**：存在可用前冲 / 斜冲路线和落脚区
- **Transition Compatibility**：适合接短打、贴身缠斗、飞踢或摔控入口
- **Environment Impact**：P2 脚步重响、衣摆 / 纸张被气流扰动；P3 可强化残影和尘土拖尾
- **Avoid**：无起点瞬移、无落脚状态

## A07｜低位滑步突入 / Low Slide Entry

- **Source ID / Alias**：07｜低空滑步突袭
- **Applicable Range**：mid → close / low line
- **Core Action Mechanic**：降低重心，以稳定支撑腿带动身体从高线攻击下方或侧下方滑入。
- **Physical Level**：Min P1 / Default P2 / Max P3
- **Combat Role**：Entry / Re-entry / Counter
- **Response Compatibility**：Best Against：高线挥击、上肢封线、正面压迫；Poor Against：地面障碍密集、支撑腿被控制；Best State：对手上身前压且低线开放。
- **State Transition**：Level: Mid/High → Low；Range: Mid → Close；Route: Frontal → Low Inside/Outside
- **Initiative Effect**：Gain / Steal
- **Tempo**：Burst / Quick Reactive
- **Risk / Commitment**：Medium；被截住时低位恢复窗口偏大
- **Prerequisites**：连续可滑入地面、起身空间可用
- **Environment Impact**：鞋底摩擦、尘土 / 水迹拖痕；P3 可增强低位气流
- **Avoid**：无支撑漂移；动作后必须有低位支撑或起身状态

## A11｜跃步突入 / Agile Jump Entry

- **Source ID / Alias**：11｜灵活跳跃突袭
- **Applicable Range**：mid → close
- **Core Action Mechanic**：短助跑或蹬地跃步改变高度 / 路线，在明确落点完成接敌。
- **Physical Level**：Min P1 / Default P2 / Max P2
- **Combat Role**：Entry / Re-entry / Signature
- **Response Compatibility**：Best Against：低线封锁、矮障碍、对手防线集中地面；Poor Against：低顶空间、无安全落点；Best State：落点明确且对手需要重新调整 Guard。
- **State Transition**：Height: Grounded → Airborne → Grounded；Position: Original Lane → New Landing Lane
- **Initiative Effect**：Gain；落点被预判时 Open Counter Window
- **Tempo**：Acceleration → Impact → Recovery
- **Risk / Commitment**：High；空中路线难改，落地存在 Recovery
- **Prerequisites**：足够起跳和落地空间
- **Environment Impact**：落地震动、衣物 / 头发惯性、轻微扬尘
- **Avoid**：无理由长时间滞空

---

# 4. 闪避走位类

## A05｜侧移离线 / Lateral Evasion Step

- **Source ID / Alias**：05｜侧身闪避走位
- **Applicable Range**：mid / close
- **Core Action Mechanic**：攻击将到时先转移重心，以短侧步 / 斜步让躯干离开攻击线，同时保留支撑和反击姿态。
- **Physical Level**：Min P1 / Default P1 / Max P2
- **Combat Role**：Defense / Counter / Reversal
- **Response Compatibility**：Best Against：直线拳、直线突进、正面抓抱入口；Poor Against：已建立贴身控制、大范围连续横扫；Best State：攻击路线清楚且侧向落脚点可用。
- **State Transition**：Route: Frontal → Outside/Inside Angle；Axis: Face-to-face → Offset；Initiative: Opponent Pressure → Open Counter Window
- **Initiative Effect**：Open Counter Window / Steal
- **Tempo**：Quick Reactive
- **Risk / Commitment**：Low；Recovery Exposure Low
- **Prerequisites**：侧向 / 斜向落脚空间存在
- **Environment Impact**：轻微脚步摩擦；P2 可加强衣物 / 发丝惯性
- **Avoid**：只写“侧身躲开”却没有脚步和轴线变化

## A09｜后仰让线反击 / Lean-back Evade Counter

- **Source ID / Alias**：09｜后仰规避反击
- **Applicable Range**：close / mid-close
- **Core Action Mechanic**：保持下肢支撑，骨盆与躯干后移让高线攻击掠过，随即借对手过伸或回收窗口回正反击。
- **Physical Level**：Min P1 / Default P1 / Max P2
- **Combat Role**：Defense / Counter / Reversal
- **Response Compatibility**：Best Against：高线直拳、摆拳、掌击；Poor Against：低线扫腿、持续贴身压迫；Best State：双方仍处反击距离且下肢支撑稳定。
- **State Transition**：Upper-body Line: In Path → Outside Path；Initiative: Opponent → Steal Opportunity
- **Initiative Effect**：Steal
- **Tempo**：Quick Reactive → Burst
- **Risk / Commitment**：Low-Medium；后仰过大时 Balance Risk
- **Prerequisites**：脚下支撑稳定、后方无立即碰撞障碍
- **Avoid**：P1/P2 不写成失重式 Matrix 悬停

---

# 5. 格挡防御类

## A03｜反手拨挡 / Reverse-hand Parry

- **Source ID / Alias**：03｜反手格挡防御
- **Applicable Range**：close / mid-close
- **Core Action Mechanic**：前臂 / 手掌从侧面接触来袭肢体，将攻击线拨离中心线，同时身体小幅转轴。
- **Physical Level**：Min P1 / Default P1 / Max P2
- **Combat Role**：Defense / Counter
- **Response Compatibility**：Best Against：直拳、短掌、单线武器手臂进入；Poor Against：大范围重型双向冲击、已建立抱控；Best State：来袭肢体可接触且防守者仍有稳定支撑。
- **State Transition**：Attack Line: Center → Off-line；Axis: Frontal → Slight Offset
- **Initiative Effect**：Open Counter Window
- **Tempo**：Quick Reactive
- **Risk / Commitment**：Low；Payoff 是短反击窗口而非自动夺取全局优势
- **Prerequisites**：来袭线路可读、接触手臂可达
- **Avoid**：把轻拨挡写成夸张击飞

## A08｜交叉架挡 / Cross-arm Guard

- **Source ID / Alias**：08｜双臂交叉防御
- **Applicable Range**：close / mid-close
- **Core Action Mechanic**：双臂交叉建立正面结构，用前臂和身体支撑吸收 / 分散正面重击。
- **Physical Level**：Min P1 / Default P1 / Max P2
- **Combat Role**：Defense
- **Response Compatibility**：Best Against：正面重拳、下劈、强冲击；Poor Against：侧后方攻击、持续抓抱、低线破支撑；Best State：正面对线且来袭方向明确。
- **State Transition**：Contact: Incoming → Absorbed/Blocked；Range: Usually unchanged；Initiative: Opponent Pressure → Retain/Neutral
- **Initiative Effect**：Neutral；通常对方仍可 Retain Pressure
- **Tempo**：Heavy / Absorb Pause
- **Risk / Commitment**：Medium；Payoff 为保住结构，不保证获得主动
- **Prerequisites**：双臂可形成完整 Guard、支撑脚稳定
- **Environment Impact**：P2 可带脚底滑移、衣物震动、近处小物件轻震
- **Avoid**：成功防守后无因直接写成防守者占优

---

# 6. 重击爆发类

## A04｜蓄势重拳 / Loaded Power Punch

- **Source ID / Alias**：04｜蓄力重拳冲击
- **Applicable Range**：close / mid-close
- **Core Action Mechanic**：短蓄势后由脚—髋—躯干—肩—拳形成完整动力链，沿明确路线输出一次重击。
- **Physical Level**：Min P1 / Default P2 / Max P3
- **Combat Role**：Pressure / Signature / Finisher
- **Response Compatibility**：Best Against：对手 Guard 已被打开、失衡、被环境限制；Poor Against：对手仍有清楚侧移路线、攻击者来不及蓄势；Best State：攻击窗口明确且能承担高 Commitment。
- **State Transition**：On clean hit: Balance Stable → Disrupted；Position may shift；On miss: Initiative → Open Counter Window
- **Initiative Effect**：命中 Retain / Gain；明显落空 Open Counter Window
- **Tempo**：Build-up → Impact
- **Risk / Commitment**：High；Miss / Block Risk High；Recovery Exposure High；Payoff High
- **Prerequisites**：有完整发力空间和目标窗口
- **Environment Impact**：P2 可将对手轰退撞家具 / 墙面；P3 可扩大碎屑、墙体破坏和冲击波
- **Avoid**：只有“重拳”名词而无蓄势、动力链、接触和受力结果

## A10｜霸体强冲 / Armored Power Rush

- **Source ID / Alias**：10｜蓄力霸体冲击
- **Applicable Range**：mid → close
- **Core Action Mechanic**：角色先稳定下盘并集中身体整体惯性，以肩、躯干或前臂结构承压向前强行推进；“霸体”表示高抗打电影表现，不等于免疫一切攻击。
- **Physical Level**：Min P2 / Default P2 / Max P3
- **Combat Role**：Entry / Pressure / Signature
- **Response Compatibility**：Best Against：对手轻型阻挡、空间退路有限；Poor Against：侧切、借力偏转、低线破支撑；Best State：正面路线开放且角色有足够加速距离。
- **State Transition**：Range: Mid → Close；Position: Defender forced backward；Initiative: Neutral/Opponent → Gain
- **Initiative Effect**：Gain；被侧移 / 借力时可能 Lose / Open Counter Window
- **Tempo**：Build-up → Heavy Impact
- **Risk / Commitment**：Very High；路线难改；Payoff 高位移 / 高压迫
- **Prerequisites**：正面推进路线和落脚支撑可用
- **Environment Impact**：P2 可撞移家具、撞墙；P3 可强化碎屑、地面反馈和冲击波
- **Avoid**：把“霸体”解释成无反应无物理反馈

## A17｜落地震地重击 / Ground-impact Slam

- **Source ID / Alias**：17｜落地震地重击
- **Applicable Range**：landing / close-to-area impact
- **Core Action Mechanic**：从明确的腾空 / 下落状态把身体或攻击动作的向下动量集中到落地点，形成重落地冲击。
- **Physical Level**：Min P2 / Default P2 / Max P3
- **Combat Role**：Signature / Finisher / Pressure
- **Response Compatibility**：Best Against：对手位于落点附近、已被逼到局部区域；Poor Against：没有前序下落、地面不允许落地；Best State：前序动作已经建立下降动量和清楚落点。
- **State Transition**：Height: Airborne → Grounded；Environment: Stable → Impacted；Nearby Balance may be disrupted
- **Initiative Effect**：Gain / Retain
- **Tempo**：Acceleration → Impact → Recovery
- **Risk / Commitment**：Very High；落地后存在 Recovery；Payoff 为高视觉重拍
- **Prerequisites**：必须存在真实前序腾空 / 下落和落地点
- **Environment Impact**：P2 扬尘、附近家具震动、材质合理的小裂纹；P3 可地裂、碎石和冲击波
- **Avoid**：角色没有下落过程却突然“落地”；P2 不默认制造巨型陨石坑

---

# 7. 腿法攻击类

## A02｜凌空飞踢 / Jumping Flying Kick

- **Source ID / Alias**：02｜凌空飞踢
- **Applicable Range**：mid → close
- **Core Action Mechanic**：短起跳后以单腿向目标延伸，支撑腿离地时间短，命中 / 掠过后立即进入明确落地恢复。
- **Physical Level**：Min P1 / Default P2 / Max P2
- **Combat Role**：Entry / Pressure / Signature
- **Response Compatibility**：Best Against：对手后退、上身暴露、需要跨越短距离；Poor Against：低顶空间、目标已贴身、落点危险；Best State：有起跳和落地空间。
- **State Transition**：Height: Grounded → Airborne → Grounded；Range: Mid → Close
- **Initiative Effect**：Gain；被躲开时 Open Counter Window
- **Tempo**：Burst → Impact → Recovery
- **Risk / Commitment**：High；空中路线难改，落地恢复明显
- **Prerequisites**：安全起跳 / 落地区域
- **Environment Impact**：落脚声、衣物 / 发丝惯性；P2 可带明显受击位移
- **Avoid**：长时间滞空或无落地

## A13｜横扫腿击 / Horizontal Sweep Kick

- **Source ID / Alias**：13｜横扫腿击
- **Applicable Range**：close / mid-close / low line
- **Core Action Mechanic**：支撑脚稳定转动，髋部带动另一腿沿低位横向弧线扫向目标承重腿 / 支撑线。
- **Physical Level**：Min P1 / Default P1 / Max P2
- **Combat Role**：Counter / Reversal / Pressure
- **Response Compatibility**：Best Against：对手重心前压、承重脚暴露、突进刚落脚；Poor Against：对手腾空、支撑腿不可达；Best State：目标支撑关系清楚。
- **State Transition**：Support: Stable → Disrupted；Balance: Stable → Forced Step/Fall Risk；Initiative: Opponent → Steal
- **Initiative Effect**：Steal
- **Tempo**：Quick Reactive / Heavy by context
- **Risk / Commitment**：Medium；扫空后需要回收支撑
- **Prerequisites**：目标腿部 / 支撑区域可达
- **Environment Impact**：P1 脚底摩擦和补步；P2 可撞翻近处椅子 / 撞墙
- **Avoid**：抽象写“低线攻击”而不明确扫击目标和支撑后果

---

# 8. 空中动作类

## A06｜腾空旋转斩 / Aerial Spinning Slash

- **Source ID / Alias**：06｜腾空旋转斩击
- **Applicable Range**：mid / weapon reach
- **Core Action Mechanic**：持刃角色起跳后由躯干和髋部带动单次明确旋转，让武器沿可读弧线完成斩击并落地。
- **Physical Level**：Min P2 / Default P2 / Max P3
- **Combat Role**：Signature / Finisher / Pressure
- **Response Compatibility**：Best Against：目标被限制路线、需要跨越高度差；Poor Against：无刀剑、狭窄低顶、目标已贴身抱控；Best State：武器状态明确、起跳和落点清楚。
- **State Transition**：Height: Grounded → Airborne → Grounded；Attack Line: Linear → Rotational Arc
- **Initiative Effect**：Gain；挥空 / 落点被读到时 Open Counter Window
- **Tempo**：Acceleration → Impact → Recovery
- **Risk / Commitment**：Very High；空中路线难改、落地暴露明显
- **Prerequisites**：持有可斩击武器；有旋转和落地空间
- **Environment Impact**：P2 风压、衣物和尘土扰动；P3 可出现强化剑气 / 碎屑，但须沿刀路
- **Avoid**：无武器却“斩击”；旋转次数不受控

## A12｜空中滞空连击 / Suspended Aerial Combo

- **Source ID / Alias**：12｜空中滞空连击
- **Applicable Range**：airborne / close aerial exchange
- **Core Action Mechanic**：该动作的身份依赖明显超现实滞空：角色在非正常重力持续时间内保持空中控制并完成连续攻击，再结束于明确下落 / 落地。
- **Physical Level**：Min P3 / Default P3 / Max P3
- **Combat Role**：Pressure / Signature / Finisher
- **Response Compatibility**：Best Against：双方已进入超现实空中战斗或目标被击至空中；Poor Against：P1/P2 Grounded Combat、低顶空间；Best State：Physical Presentation 已明确允许 P3 滞空。
- **State Transition**：Height: Airborne → Sustained Airborne → Landing/Fall；Initiative: Retain during combo
- **Initiative Effect**：Retain / Gain
- **Tempo**：Sustained Rapid → Recovery
- **Risk / Commitment**：High；Payoff 是高视觉连续空中 Pressure
- **Prerequisites**：Selected Physical Level = P3；存在空中状态和最终落点
- **Environment Impact**：可有气流、衣物、碎屑随连续攻击方向变化
- **Avoid**：在 P1/P2 偷偷把“滞空”降级成普通跳跃；若要普通短跳连击，应选其他动作

---

# 9. 贴身缠斗 / 近身快打类

## A14｜贴身缠斗快打 / Close-range Rapid Exchange

- **Source ID / Alias**：14｜贴身缠斗快打
- **Applicable Range**：close / clinch-adjacent
- **Core Action Mechanic**：双方在持续近身压力中以短拳、肘、前臂、架挡、抓控拆解和小角度换位形成连续快速攻防；具体 Technique 必须结合 Combat System 收敛，不把“快打”本身当招式。
- **Physical Level**：Min P1 / Default P1 / Max P2
- **Combat Role**：Pressure / Defense / Counter / Re-entry
- **Response Compatibility**：Best Against：已经进入近身、双方仍有手臂和躯干交换空间；Poor Against：双方仍在远距离、已进入完整地面控制；Best State：Contact 连续且没有 Neutral Reset。
- **State Transition**：Contact: Intermittent → Sustained；Axis / Position: small continuous changes；Initiative: contested
- **Initiative Effect**：Retain / Steal by realized action
- **Tempo**：Sustained Rapid
- **Risk / Commitment**：Medium；单动作低至中 Commitment，但持续交换累积风险
- **Prerequisites**：已进入 close range；具体短打 / 控制动作必须符合角色 Combat System
- **Environment Impact**：近处墙面 / 家具可限制路线或产生局部碰撞反馈
- **Avoid**：最终 Prompt 只写“贴身缠斗快打”而不给具体动作；它必须实例化为真实短动作链

---

# 10. 武器瞬杀类

## A15｜侧身拔刀斩 / Side-draw Quick Slash

- **Source ID / Alias**：15｜侧身拔刀斩
- **Applicable Range**：weapon draw range / close-mid
- **Core Action Mechanic**：身体侧转让出刀路，一手稳定刀鞘 / 佩刀位置，另一手完成拔出并沿单一明确弧线斩击，随后控制余势和刀位。
- **Physical Level**：Min P1 / Default P2 / Max P3
- **Combat Role**：Counter / Signature / Finisher
- **Response Compatibility**：Best Against：对手直线进入、暴露明确攻击线；Poor Against：没有佩刀 / 刀已在手却描述“拔刀”、贴身抱控导致无法出鞘；Best State：武器状态 = sheathed 且拔刀路线开放。
- **State Transition**：Weapon State: Sheathed → Drawn；Attack Line: Closed → Slash Arc；Initiative: Neutral/Opponent → Steal
- **Initiative Effect**：Steal / Gain
- **Tempo**：Pause-and-Explode / Burst
- **Risk / Commitment**：Medium-High；拔刀受阻时暴露明显
- **Prerequisites**：存在可拔出的刀剑、鞘位和出鞘空间
- **Environment Impact**：P2 可有衣摆 / 尘屑沿刀路变化；P3 可强化剑气，但方向必须来自实际斩击
- **Avoid**：武器凭空出现、鞘 / 刀状态跳变

---

# 11. 气劲 / 能量外放类

## A16｜掌劲震退 / Non-contact Palm Shock

- **Source ID / Alias**：16｜抬手震气击退
- **Applicable Range**：close-mid / non-contact supernatural reach
- **Core Action Mechanic**：角色抬掌完成明确蓄力 / 发劲动作，在未直接接触目标的情况下以可见气劲 / 冲击波沿掌向把目标推退；非接触外放是该动作身份的一部分。
- **Physical Level**：Min P3 / Default P3 / Max P3
- **Combat Role**：Defense / Counter / Reversal / Finisher
- **Response Compatibility**：Best Against：正面压迫、需要强制重置距离；Poor Against：P1/P2 Grounded Combat、目标被牢固环境固定；Best State：Physical Presentation 明确允许能量外放。
- **State Transition**：Range: Close/Mid → Mid/Far；Position: Target → Forced Back；Initiative: Opponent → Steal/Gain
- **Initiative Effect**：Steal / Gain
- **Tempo**：Pause-and-Explode
- **Risk / Commitment**：Medium；Payoff 为强 Range Reset 和高视觉冲击
- **Prerequisites**：Selected Physical Level = P3
- **Environment Impact**：纸张、衣物、灰尘、小物件沿冲击方向被推动；可出现明确气浪 / 冲击波
- **Avoid**：为了适配 P1/P2 偷改成普通接触推掌；那应视为另一个动作

---

# 12. 原始来源映射（17 / 17）

```text
01 极速瞬身突袭 → A01 爆发瞬身接敌
02 凌空飞踢     → A02 凌空飞踢
03 反手格挡防御 → A03 反手拨挡
04 蓄力重拳冲击 → A04 蓄势重拳
05 侧身闪避走位 → A05 侧移离线
06 腾空旋转斩击 → A06 腾空旋转斩
07 低空滑步突袭 → A07 低位滑步突入
08 双臂交叉防御 → A08 交叉架挡
09 后仰规避反击 → A09 后仰让线反击
10 蓄力霸体冲击 → A10 霸体强冲
11 灵活跳跃突袭 → A11 跃步突入
12 空中滞空连击 → A12 空中滞空连击
13 横扫腿击     → A13 横扫腿击
14 贴身缠斗快打 → A14 贴身缠斗快打
15 侧身拔刀斩   → A15 侧身拔刀斩
16 抬手震气击退 → A16 掌劲震退
17 落地震地重击 → A17 落地震地重击
```

不存在来源动作 `18`；此前草稿中多计的“后撤蓄力重击”已删除，不进入 Runtime Knowledge。

---

# 13. 与现有知识的职责边界

```text
Combat System / Technique Backbone
→ combat-fighting-profiles / combat-martial-profiles / combat-weapon-profiles

Abstract Stage-2 Movement / Technique / Transition Pattern
→ minimum-validation-set.md

Concrete reusable single action + response/state/tempo/risk/physical realization
→ action-reference-catalog.md

Battle State / Exchange Spine / Advantage / Coverage
→ Action Combat Task Playbooks / Contracts

Environment Affordance
→ combat-environment-patterns/library.md

Visual Style
→ references/styles/*
```

Catalog 不替代 Profile，也不替代 Abstract Pattern。Runtime 可以先由 Pattern 确定“需要哪类解决方案”，再由 Catalog 选择一个匹配当前 State 的具体动作；当当前 Gap 本身已经明确到具体动作级，也可直接由 Catalog 完成 Concrete Action Resolution。

---

# 14. Final Prompt Serialization Boundary

Catalog 字段是内部选择知识，不应整表输出到最终 Prompt。

最终只外显对视频模型有帮助的内容：

```text
具体动作
+ 起始身体 / 距离状态
+ 接触 / 闪避 / 拦截关系
+ 对手即时反馈
+ 必要的 Range / Axis / Position / Balance 后果
+ 下一动作入口
+ 当前 Physical Level 下必要的环境反馈
```

不要把 `Combat Role / Best Against / Commitment / Initiative Effect` 等内部标签原样序列化到 Final Prompt。
