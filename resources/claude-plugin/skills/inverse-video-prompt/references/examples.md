# Calibration Examples

These examples teach the skill how to reason about different video structures. They are not rigid templates. Preserve the reasoning pattern and adapt to the evidence.

## Example 1 — Single Continuous Shot

### Evidence

A person stands at the far end of a corridor, begins running toward camera, the camera retreats while preserving a medium framing, then arcs slightly as the person reaches and opens a door. Bright light spills through the doorway.

### Good analysis

- One continuous shot, not three shots.
- Subject motion: person runs forward toward camera.
- Camera motion: backward tracking/dolly while maintaining framing; slight arc near the door.
- Action phases: standing/anticipation → acceleration → approach → door interaction → stop/reveal.
- Lighting continuity: darker corridor, bright source beyond the door.
- Narrative rhythm: acceleration followed by a short reveal hold.

### Good compiled prompt

```text
A continuous cinematic shot in a dim corridor. Start in a medium-long view with the character at the far end. The character suddenly accelerates straight toward camera; the camera smoothly retreats at matching speed, keeping the character near a stable medium scale while corridor walls and foreground edges create increasingly strong forward parallax. As the doorway approaches, the camera makes a subtle arc toward screen-right. The character reaches the door, pushes it open, and the darker corridor is briefly cut by a strong warm spill from the room beyond. The bright source blooms slightly around the character while the movement decelerates into a short reveal hold. End with the character stopped in the doorway. Preserve the same character, clothing, corridor geometry, lighting logic and image style throughout.
```

## Example 2 — Multi-Shot Action Sequence

### Evidence

A fighter looks up. Hard cut to a low-angle shot as an opponent leaps from a platform. Hard cut to a side view of both characters colliding. Hard cut to a close-up of dust and feet sliding backward.

### Good analysis

Do not rewrite this as one giant continuous orbiting camera move.

```text
SHOT 01 — reaction/setup
SHOT 02 — leap/attack
SHOT 03 — impact
SHOT 04 — recovery/aftermath
```

### Good compiled prompt

```text
SHOT 01 — Medium close-up. Fighter A looks sharply upward; the head movement is quick, but the body remains planted. The shoulders tense and the gaze locks above frame for a brief anticipation beat.

HARD CUT.

SHOT 02 — Low-angle wide shot. Fighter B launches from the elevated platform and drives diagonally downward through frame. The descent accelerates visibly; clothing and limbs trail with the momentum while the low camera slightly follows the fall.

HARD CUT ON ACTION.

SHOT 03 — Side medium-wide shot. Fighter B collides with Fighter A near frame center. Both bodies compress at the instant of contact before the force carries them laterally. Dust reacts immediately beneath their feet.

HARD CUT.

SHOT 04 — Ground-level close-up. Their feet skid backward across the dusty surface, scattering a narrow plume of grit. The sliding speed falls off naturally until the motion settles.

Maintain identical character identities, clothing, environment, direction of force, lighting and grade across all shots.
```

## Example 3 — Procedural Montage

### Evidence

A rapid montage shows a scientist assembling a machine: components spread on a floor, hands tightening screws, cable insertion, a glowing core being seated, outer casing closing, then indicator lights activating.

### Interpretation

The important structure is a **process montage** organized by meaningful state changes.

```text
state 1: loose components
state 2: mechanical frame assembled
state 3: wiring connected
state 4: core installed
state 5: casing closed
state 6: powered state / activation
```

Sampling should favor irreversible state changes plus important hand-action peaks, not arbitrary equal intervals.

### Prompt logic

```text
Rapid procedural montage of a scientist assembling a compact experimental device. Begin with organized parts spread across the laboratory floor. Use purposeful macro and close-up cuts of hands aligning the structural frame, tightening small fasteners, snapping joints into place, routing cables, pressing connectors home, seating the glowing core and closing the outer housing. Emphasize tactile material behavior: brushed metal, insulated wiring, small mechanical clicks, slight hand pressure and component resistance. Each cut should show a believable advance in assembly state. As the final casing locks, move into the activation sequence: indicator lights illuminate in order, internal energy gradually becomes visible through seams, and the scientist's hands pull away for a longer final hold on the completed machine.
```

The same grammar can apply to cooking, repair, crafting, laboratory procedures, transformation processes, preparation rituals, makeup/costume changes, vehicle setup or device operation.

## Example 4 — Sparse Frames Only

### Evidence

Three screenshots show:

1. person standing beside a car
2. person closer to the driver's door
3. person seated inside

### Weak reconstruction

```text
The person walks exactly three steps, opens the door with the left hand, bends down and enters the car while the camera dollies forward.
```

This invents unsupported details.

### Better reconstruction

```text
The sequence appears to show the person moving from beside the car into the driver's seat. The exact walking pattern, hand used to open the door and camera motion are not established by the supplied frames. Preserve the visible progression: standing beside the vehicle → approaching/opening the driver's side → entering and settling into the seat. Keep the intermediate movement natural and conservative.
```

## Example 5 — Recommended Sound for a Visual-Only Clip

### Evidence

A muted five-second clip shows a woman running through a wet underground parking garage. At about 2.8 seconds she forcefully pushes open a heavy metal fire door. The camera follows closely and cuts to a close-up after the door slams shut.

### Good sound recommendation

```text
Recommended audio: keep a low diffuse underground-garage ambience under the whole shot, with ventilation hum and subtle wet-room reflections. Add surface-appropriate wet footsteps synchronized to the sprint, light clothing movement and restrained breathing. At the fire door, use a solid metal push/contact followed by a heavier slam and a short concrete-garage reverb tail. A very restrained low-frequency tension layer can rise through the run, then briefly thin immediately before the slam so the impact reads more clearly. Avoid adding a whoosh to every camera movement.
```

This is a **sound recommendation for the video model**, not a claim that the original soundtrack definitely contains these elements.

## Example 6 — Description Enrichment

### Basic reverse prompt

```text
A woman in a car becomes suspicious. She looks at the rear-view mirror. Police cars are approaching. Warm sunlight, handheld camera, desert road.
```

### Enriched version

```text
Inside a fast-moving older car on an exposed desert highway, the woman initially keeps her head facing forward while her attention shifts toward the central rear-view mirror. The change is restrained: her eyes move first, the mouth becomes slightly tighter, and the head follows only a little later. In the mirror, the pursuit vehicles begin as small red-blue flashes deep on the straight road and gradually grow larger and clearer through the heat shimmer. Hard warm sunlight enters diagonally through the windshield; passing roadside shadows repeatedly sweep across skin, sunglasses and the faded beige interior, creating moving bands of bright heat and dense shadow. The framing remains generally stable but carries low-amplitude vehicle vibration, so faces and interior lines drift subtly rather than shaking dramatically. The wide, nearly empty desert and low horizon make the car feel exposed while the growing mirror reflection steadily increases pressure.
```

### Why it is better

It does not add a new plot. It enriches:

- visible performance
- temporal progression
- composition and mirror function
- camera-motion effect
- lighting behavior
- material/environment atmosphere

## Example 7 — Facial Performance / Micro-expression

### Evidence

A continuous 10-second face close-up. The character begins genuinely happy, becomes emotionally affected, tries to maintain the smile, and ends on the verge of tears.

### Weak prompt

```text
Close-up of a woman. She starts happy and gradually becomes sad and cries.
```

### Better performance timeline

```text
0.0–2.0s — The smile is natural and relaxed; the eyes remain bright and engaged, with little facial tension.

2.0–4.0s — The smile holds for a fraction too long and becomes subtly less spontaneous. Her gaze drops briefly, then returns. The mouth is still smiling, but the eyes have begun to lose their earlier lightness.

4.0–6.0s — She continues trying to hold the smile while its amplitude slowly decreases. Moisture begins to catch the light along the eyes. The lips become slightly tighter and the jaw develops a small amount of tension.

6.0–8.0s — The eyes are now clearly emotional even though a trace of the smile remains. The expression becomes contradictory: she is still trying to look okay while visibly holding back tears. Breathing appears more controlled and the head becomes increasingly still.

8.0–10.0s — The smile finally loses support and fades. Her gaze becomes fixed and vulnerable; the lower lip or chin shows very slight instability, and the tear buildup reaches the threshold of release. The performance remains restrained rather than turning into exaggerated sobbing.
```

### Compiled prompt

```text
Keep the entire 10 seconds in an uninterrupted face close-up and let the emotional transition happen through extremely small, progressive changes. Begin with a genuinely relaxed smile and bright, engaged eyes. The smile should not disappear suddenly: first let it hold a little too long, then subtly reduce while the gaze drops for a moment and returns with less lightness. Through the middle, the character keeps trying to maintain the smile even as moisture begins to gather in the eyes; the lips tighten slightly and the jaw becomes more controlled. In the later seconds, let the contradiction become visible—the mouth still carries a faint trace of a smile while the eyes clearly look close to tears. Reduce unnecessary head movement so the tiny changes become readable. Only near the end should the smile fully collapse, with a fixed vulnerable gaze, very slight lower-lip or chin instability and tear buildup at the threshold of release. Keep the acting slow, delicate and restrained, with no abrupt emotion switch and no exaggerated crying expression.
```

The key lesson is: **emotion labels summarize the result; micro-expression description reconstructs the process.**

## Example 8 — Shot Delivery Contract

### Evidence

Same corridor run as Example 1.

### Weak compiled prompt

```text
Cinematic tracking shot of a man running down a hallway in 8K, 24fps, golden-spiral composition, epic lighting. Smooth camera, high quality, no noise.
```

This invents quality switches and composition theory, and has no first/last frame.

### Contract compiled prompt

```text
DURATION: ~6s
ASPECT: 16:9
SHOT COUNT: 1 continuous shot
CAMERA LOCK: moving
TYPE: other
TARGET MODEL: unspecified

GLOBAL CONTINUITY:
One person. Adult man, short dark hair, dark jacket, trousers, running shoes; same corridor geometry, same dim cooler interior vs warm door spill.

SHOT 01 — continuous
起始画面：中远景，人物站在走廊尽头，正面朝向镜头，双臂下垂，身体尚未启动。
主体动作：短暂停顿后直线加速跑向镜头；接近门口时伸手推门，随门开减速停住。无人出画。
摄影机运动：后退跟拍，速度匹配奔跑，把人物稳定在中景比例；近门时向画面右做很小弧线，开门后停住。
结束画面：中景，人物停在打开的门洞里，身后暖光溢进暗走廊，双手还在门扇上。
镜头衔接：无切，连续长镜。

NEGATIVES:
同一人、同一件外套，不换脸、不分身。
不要把这一镜拆成三切。
不要写成固定机位。
```

## Example 9 — Default quick output vs padded checklist

### Weak default

Eighteen headings per shot, including 微表情, 黄金螺旋, 伦勃朗光, 8K, 120fps, even when the clip is a landscape with no face.

### Quick default (what the user should see)

```text
DURATION / ASPECT / SHOT COUNT / CAMERA LOCK / TYPE / TARGET MODEL
GLOBAL CONTINUITY (short card)
SHOT 01 … 起始画面 / 主体动作 / 摄影机运动 / 结束画面 / 镜头衔接
NEGATIVES (3–8 current risks)
UNCERTAINTY (only if it changes generation)
```

Full shot tables, performance timelines and audio belong to 完整拆解, not the default.

## Example 10 — Continuity card and locked camera

### Evidence

Two people sit across a table. The camera never moves. One reverse-shot cut.

### Weak

```text
A cinematic conversation, beautiful lighting, high quality.
```

### Better

```text
DURATION: 8s
ASPECT: 16:9
SHOT COUNT: 2
CAMERA LOCK: each shot locked-off, no pan/tilt/dolly/zoom
TYPE: drama

GLOBAL CONTINUITY:
Opening cast: 2.
Woman: mid-30s, shoulder-length black hair, cream knit sweater, small pearl studs, seated left, hands around a cup.
Man: mid-30s, short hair, charcoal shirt, seated right, body angled toward her.
Same small dining room, same warm practical lamp, same table objects.

SHOT 01
起始画面：中近景过肩，女人看向画面右外的男人，杯沿停在下唇前。
主体动作：她开口前视线先锁住，杯放下约两厘米，停顿后再说话；男人只露右肩。
摄影机运动：固定机位，无推拉摇移变焦。
结束画面：同一构图，杯已落回碟上，她仍看向右外。
镜头衔接：HARD CUT 到反向过肩，不跳轴。
```

## Example 11 — Graphics layer present vs absent

### With PIP

```text
起始画面：全屏是她正在穿的米色针织裙全身；右上角小窗是下一套黑色吊带裙的正面全身，不是当前套、不是空白、不是四栏海报。
结束画面：全屏已换成黑色吊带裙站住；小窗淡出至无。
```

### Landscape with no graphics

Do not emit 字幕、Logo、小窗 headings. The graphics layer is omitted entirely.

## Example 12 — Drama overlay: eyeline, not emotion labels

### Weak

```text
SHOT 02 tense dialogue, cinematic reverse shot.
```

### Better

```text
SHOT 02 — reverse
起始画面：男人中近景过肩，视线对画面左外的女人，轴线与 SHOT 01 连续。
主体动作：他先接住她的视线，再极短地点头；没有第三个人入画。
摄影机运动：固定。
结束画面：仍看向左外，下颌略收，没有翻面到镜头。
镜头衔接：HARD CUT 回女人。
```

## Example 13 — Tutorial overlay: hands and material state

### Evidence

Overhead cooking shot. Dough is shaggy, then smoother after kneading. Two hands.

### Contract fragment

```text
起始画面：俯拍台面，面团偏左呈粗糙块状，右手在画面右缘外。
主体动作：两只手从画面上方进入，掌跟推、折叠、再推；面团由粗糙转为较光滑的圆球。全程两只手、一块面、不下第三人。
结束画面：双手离开画面上缘，圆球停在台面中央。
NEGATIVES:
只有两只手和一块面团；禁止第三只手、融合指、面团瞬变熟食。
```

## Example 14 — Current-risk negatives vs universal dump

### Weak

Paste identity / limb / face / physics / quality / camera encyclopedias, including 8K, banding, golden spiral, and fused fingers on a wide landscape.

### Better for a two-person bottle close-up

```text
NEGATIVES:
只有这两个人；禁止换脸、分身。
特写里一共两只手、一个瓶子；禁止第三只手、融合指、Logo 变形。
禁止把硬切写成连续运镜。
```

The lesson: **negatives are a short list of this clip's likely failures, not a quality encyclopedia.**

