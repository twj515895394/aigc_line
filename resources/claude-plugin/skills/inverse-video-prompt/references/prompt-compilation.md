# Prompt Compilation

Use this reference after the clip has been decomposed into shots/events, important temporal changes have been identified, and continuity has been extracted.

## Goal

Convert reverse-engineering analysis into a professional generation prompt that explains not only **what is visible**, but also **how it behaves, changes, and is presented over time**.

A strong reverse prompt can encode, when relevant:

- subject identity and state
- visible performance and micro-expression
- action process and physical quality
- spatial/compositional relationships
- spatial continuity: screen coordinates, world anchors, depth, body orientation, eyelines, occlusion and axis
- camera behavior and its visible effect
- environment depth and atmosphere
- lighting behavior
- materials and image character
- temporal progression
- edit grammar
- stable continuity
- optional recommended sound reference

## Canonical Prompt Order

Use flexibly, not as a rigid template:

```text
Overview header
→ Global continuity card (once)
→ Per-shot delivery contract
→ Optional recommended audio
→ Current-risk negatives
```

Inside each shot, keep this emphasis order when the evidence supports it:

```text
Subject / Performance / Action
→ Spatial & composition relationship
→ Camera behavior and visible frame effect
→ Environment
→ Lighting
→ Material & style
→ Temporal progression / edit grammar
```

The emphasis must follow the video. A facial-performance clip may spend most of its words on performance; an action clip may prioritize movement quality and camera response; a landscape shot may prioritize space, light, atmosphere and camera movement.

## Overview Header

Put a short header before the compiled prompt:

```text
DURATION: ...
ASPECT: ...
SHOT COUNT: 1 continuous shot | N shots
CAMERA LOCK: locked-off, no pan/tilt/dolly/zoom | moving
TYPE: drama | commercial | landscape | MV | tutorial | other
TARGET MODEL: named | unspecified
```

Do not invent fps, resolution, or codec. Aspect and duration must come from the video or the user.

## Shot Delivery Contract

Every compiled shot, including a single long take, must be expressible as five parts:

```text
SHOT NN — [time or function]
起始画面: complete visible state of the first frame
主体动作: how the subject moves from start to end; include enter / stay / exit only if it happens
摄影机运动: task + start + path + speed + stop; if locked, say no pan/tilt/dolly/zoom
结束画面: complete visible state of the last frame
镜头衔接: HARD CUT / DISSOLVE / MATCH CUT / wipe / none (continuous take)
```

This contract is the generation interface. Analysis dimensions may be sparse; empty analysis fields stay omitted. Do not pad micro-expression, composition-theory labels, or lighting recipe names into unused slots.

When multiple subjects or cross-shot geography matters, the contract also carries a spatial continuity layer. Put concrete relations inside the five sections; add a separate `空间连续性` line only when the relation cannot be read safely from those sections alone.

### Weak vs contract

Weak:

```text
Start with a woman in a kitchen. Then she walks. The camera is cinematic. End on a close-up.
```

Contract:

```text
SHOT 01 — 00:00–00:04
起始画面：中景，女人大约二十五六岁，黑发及肩，米白围裙，站在画面左侧料理台前，双手放在台沿，看向画面右外的锅。
主体动作：她右手离台，向右走两步进入画面中心；左肩始终未出画。
摄影机运动：固定机位，无推拉摇移变焦；景别因她走近而由中景变成中近景。
结束画面：中近景，她停在画面中心偏右，右手已握住锅柄，视线落在锅内。
镜头衔接：HARD CUT。
```

### Entry / stay / exit

If a subject enters or leaves the frame, the action part must say:

- which screen edge they come from or go to
- how they appear (walk-in, rise from below, revealed by a pan, already present)
- whether they remain, cross, or exit

If nobody enters or exits, do not add an entry sentence.

## Spatial Continuity and Shot Grammar

For dialogue, OTS, reverse shots, two-shots, chases, vehicle interiors or repeated locations, do not use an unqualified left/right. State the reference frame and keep these separate:

- screen-left / screen-right in the current shot;
- stable world position such as door, window, driver's seat or table side;
- foreground/midground/background and who overlaps whom;
- body orientation versus eye direction;
- camera side relative to the interaction or movement axis;
- movement direction, destination and landmark order.

Example:

```text
空间连续性：A 位于屏幕左前景、靠近镜头，世界位置在门边；B 位于屏幕右后景、靠近窗边。A 身体朝向屏幕右侧，视线锁定 B；B 身体朝向屏幕左侧，视线锁定 A。两镜保持 A–B 180° 轴线，门与窗不互换。
```

Use the professional label together with the visible relation:

```text
中近景 OTS（A 过肩看 B）
B 的反向 OTS（保持同一轴线）
双人镜头（A 屏幕左前景，B 屏幕右后景）
反应镜头（主体看向画面右外的事件目标）
```

For a reverse shot, change the observation position and foreground shoulder; do not silently mirror the room, swap background anchors, or reverse eyelines. If the camera crosses the 180-degree axis, describe the visible turn/neutral transition or declare a new spatial segment.

### Camera must be a move, not a shot size

Shot size belongs in 起始画面 / 结束画面. Camera motion must still answer: why it moves, from where, along what path, how fast, where it stops. Locked-off cameras must be explicit.

## Description Enrichment Before Compilation

## Mandatory Three-Pass Professional Refinement

Before writing the final prompt, inspect every important Shot with these three questions. This is a quality pass, not a requirement to make every sentence longer.

### Pass 1 — Emotion → Visible Performance

Ask:

> Is the description still relying on emotional labels such as “tense,” “tired,” “alert,” “sad,” “intimate,” or “restrained” without showing how they appear?

When evidence permits, translate the label into visible behavior:

- gaze direction and gaze hold
- eye / brow / mouth / jaw changes
- breath or swallowing
- head and shoulder tension
- hand behavior
- reduction or increase in movement
- restraint, conflict, release

Weak:

```text
They remain tense and restrained.
```

Better:

```text
Neither character makes a broad emotional gesture. Their mouths stay relatively still, the body posture remains controlled, and attention is held forward or toward the mirror; the tension reads through reduced movement and sustained observation rather than exaggerated reaction.
```

Keep an emotion word if useful, but let it summarize visible evidence rather than replace it.

### Pass 2 — Action Event → Action Quality

Ask:

> Is an important action represented only by a verb?

When useful, add selected movement properties:

- starting state
- hesitation / anticipation
- path
- speed / acceleration
- force / weight
- body participation
- contact mode
- physical response
- follow-through
- ending state
- interaction initiation and response

Weak:

```text
She reaches out and holds his hand.
```

Better:

```text
She slowly extends one hand into the space between them, with a brief hesitation before contact. Without taking his attention off the road, he frees his other hand to respond; their hands overlap at the center of the frame and remain in contact rather than immediately separating.
```

Do not expand a simple movement into invented choreography.

### Pass 3 — Camera Term → Visible Camera Effect

Ask:

> Is the camera description only a technical label such as “handheld,” “tracking,” “slow push-in,” “rack focus,” or “stable shot”?

When evidence permits, explain what changes inside the frame:

- subject scale
- screen position
- foreground/background motion
- parallax
- perspective
- focus / depth allocation
- stability character
- start/stop behavior
- camera-action synchronization

Weak:

```text
Stable shot with slight vibration.
```

Better:

```text
The overall composition stays locked and readable while continuous low-amplitude road vibration causes subtle vertical and lateral drift in the faces, windshield edges and interior lines; the motion feels like vehicle feedback rather than free handheld shake.
```

Weak:

```text
Rack focus from the pursuit cars to the woman.
```

Better:

```text
The distant pursuit vehicles begin as the sharper information inside the mirror while the woman’s reflection remains slightly soft; focus then migrates toward her reflected face, allowing the vehicles to blur as attention shifts from the external threat to her reaction.
```

For the full rules and combined examples, read `professional-description-pillars.md`.

---

## General Description Enrichment

After the three high-priority passes, enrich other dimensions only where they matter.

### Lighting

Weak:

```text
Warm sunlight.
```

Better:

```text
Warm low-angle sunlight enters through the windshield and side windows, catching skin, sunglasses and aged upholstery; passing shadows periodically sweep across the faces and interior, causing the bright and dark areas to change as the car moves.
```

### Environment

Weak:

```text
A desert highway.
```

Better:

```text
A straight road cuts through an exposed, sparsely vegetated desert with a low horizon and light heat shimmer in the distance; pale ground and roadside detail move steadily backward, reinforcing speed and isolation.
```

### Material

Weak:

```text
An old red car with beige interior.
```

Better:

```text
The red paint is slightly sun-faded with uneven soft reflections, while the beige interior shows small creases and aged surface wear consistent with an older vehicle.
```

Enhancement must add observable behavior or surface character, not invented narrative.

---

## Single Continuous Shot

Still use the five-part contract. Express progression as a temporal chain inside 主体动作 and 摄影机运动:

```text
起始画面 ...
主体动作: then ... → gradually ... → at the peak ...
摄影机运动: while/as the camera ... → stop on ...
结束画面 ...
镜头衔接: none, continuous take
```

Useful skeleton:

```text
A continuous [shot type] centered on [subject/performance] in [environment].
Start with [opening state + composition].
The subject [visible performance/action progression].
As this changes, the camera [movement + visible framing/parallax/focus effect].
Lighting/material/environment [important temporal behavior].
At the emotional/action peak, [threshold/reveal/impact].
End with [ending state].
Maintain [important continuity].
```

For a performance-heavy close-up, the performance progression may be the dominant part of the entire prompt.
For a performance-heavy close-up, 起始画面 and 结束画面 must still be two different readable frames.

## Performance Compilation

Avoid:

```text
happy → sad → crying
```

Prefer:

```text
The smile begins natural and relaxed. It does not disappear immediately; it first holds, then becomes smaller. Her gaze briefly drops and returns more fixed, the eyes gradually lose their earlier lightness, and moisture starts gathering along the lower eyelids. The lips tighten and the jaw becomes subtly tense as she continues trying to preserve a faint smile. Only near the end does the smile finally lose support and the face approach tears.
```

Keep restrained acting restrained. Read `performance-and-microexpression.md` when facial acting is a major part of the clip.

## Multi-Shot Sequence

Preserve real editing boundaries:

```text
GLOBAL CONTINUITY
...

SHOT 01 — [time/function]
...

HARD CUT / MATCH CUT / DISSOLVE / visible transition

SHOT 02 — ...
```

Each shot **must** include the five contract parts. Optional analysis detail may fold into those parts:

- composition → 起始画面 / 结束画面
- subject performance/action and action quality → 主体动作
- camera behavior and visible frame effect → 摄影机运动
- lighting/environment/material change → whichever part actually changes
- graphics / PIP → 起始画面 and 结束画面, or a short extra line only when visible
- temporal progression → 主体动作 / 摄影机运动 / 起始画面 / 结束画面 as appropriate
- transition out → 镜头衔接

Do not require every shot to contain every analysis category. Do not emit empty headings.

## Action Phase Compilation

When physical action matters, preserve visible phases when useful:

```text
anticipation → initiation → execution → peak/impact → follow-through → recovery
```

Useful language:

- briefly pauses before initiating the movement
- shifts weight before moving
- launches forward with sudden acceleration
- keeps the movement compact and controlled
- contact produces a visible recoil or material response
- momentum carries the body laterally
- decelerates into a stable final pose

Describe speed, weight, force and inertia only when visible.

## Camera Compilation

Prefer observable consequences over invented precision.

Avoid unsupported:

```text
35 mm lens, dolly speed 1.3 m/s, 22-degree yaw
```

Prefer:

```text
The camera smoothly retreats at roughly matching pace, holding the subject at a nearly constant medium scale while the road and roadside environment travel rapidly through the background with strong forward parallax.
```

If the exact technical movement is uncertain, describe what the frame does.

## Composition Compilation

Express meaningful relationships rather than only coordinates.

Example:

```text
The woman occupies the foreground-left with slightly greater scale, while the driver remains in the right midground. The steering wheel and windshield create an interior frame around them, and the rear-view mirror forms a compact secondary visual field that can carry information from the road behind.
```

Do not automatically turn these observations into permanent global constraints.

## Lighting and Material Compilation

Lighting should describe interaction:

```text
Warm sun enters from the side-front direction, producing narrow highlights on faces and sunglasses while much of the cabin remains in dense shadow; passing exterior shadows intermittently move across the interior.
```

Material should describe surface character:

```text
The faded red paint has a sun-aged, slightly desaturated finish with uneven reflections; the beige interior carries fine creases, small scuffs and a dry aged texture.
```

Use qualifiers such as “appears,” “slightly,” or “leather-like” when material identity is uncertain.

## Temporal Change Compilation

Unpack vague words such as “gradually.”

Instead of:

```text
The pursuit cars get closer.
```

write:

```text
They begin as tiny colored flashes deep in the mirror, then slowly increase in scale; the red-blue pulses become more recognizable through the heat distortion until their presence occupies noticeably more of the reflected road.
```

Apply the same idea to:

- expression
- focus
- light
- smoke
- reflection
- distance
- speed
- particles
- object state

## Continuity Compilation

Extract stable details once as a **generation continuity card**:

```text
GLOBAL CONTINUITY:
Duration 8s, 9:16, 3 shots, camera not locked.
Opening cast: 2 people.
Woman: mid-20s, long black hair half-tied, faded red jacket over a white tee, small gold hoop earrings, seated left, looking into the rear-view mirror.
Man: short sun-bleached hair, beige shirt, right hand on the wheel, sunglasses, seated right closer to camera.
Same vehicle interior and desert-road geography; consistent hot golden daylight, faded warm color palette, realistic skin and aged-material texture throughout.
SPACE CONTINUITY: when relevant, keep screen-left/right, world anchors, depth order, body orientation, eyelines, occlusion, camera side and 180-degree axis consistent across shots.
```

Rules:

- Count the opening people. One line per person: look, hair, clothes/fabric/fit, accessories, current state.
- State duration, aspect, shot count, and whether the camera is locked.
- If a detail is not visible, omit it. Do not invent ethnicity, makeup brands, or exact fabric.
- Avoid repeating the entire card inside every shot.
- Default fidelity remains faithful reconstruction of these identities. structural / style-only may replace people/places but must still keep the card shape.

## Recommended Audio Compilation

Audio is normally an optional **recommended reference** for the target video model or later sound design.

Example:

```text
RECOMMENDED AUDIO:
Consider continuous vintage engine, road and wind texture inside the moving car; subtle cabin vibration and material creaks; restrained low tension during the mirror shot; a small metallic lighter click and ignition texture during the cigar action; near the final hand contact, reduce musical presence and let engine/road ambience carry the moment.
```

Do not imply that these sounds are accurate source reconstruction unless reliable audio evidence exists.

## Style Compilation

Avoid relying on generic words such as:

- cinematic
- beautiful
- epic
- high quality

Translate style into visible properties:

```text
sun-baked gold and faded red palette, fine restrained film grain, realistic skin texture, subtle highlight bloom, sun-aged materials, dense warm daylight and controlled vehicle vibration
```

When combining historical art direction with modern image quality, separate them conceptually:

```text
1970s production design and color character, rendered with modern photorealistic skin and material detail.
```

## Narrative Rhythm

Encode pacing when it matters:

```text
quiet observation → subtle suspicion → rising pursuit pressure → restrained interpersonal reaction → held final beat
```

For montage:

```text
rapid state-changing cuts, progressively tighter detail, each cut advances the process, followed by a longer final hold on the completed state
```

## Constraint Language

Use constraints only when they protect important reconstruction fidelity.

Useful:

```text
Maintain the same character identities and vehicle interior across the sequence.
Preserve the visible hard cuts.
Do not invent specific dialogue when none is established.
```

Avoid huge generic negative-prompt lists or over-constraining every minor screen position.

## Current-risk Negatives

After the compiled prompt, add **3–8 negatives that belong to this clip**. Internally you may think in classes (identity, limbs, face, physics, camera continuity, graphics). Do not paste class titles or encyclopedias into the output.

Write counts when hands, passing objects, or multiple people are the risk:

```text
NEGATIVES:
Only these two people; no extra face or body.
Two hands total in the bottle close-up, one product, no fused fingers, no third hand.
Logo stays the same shape; no extra text, watermark, or poster layout.
Eyelines stay on the reverse-shot axis; no flipped shoulders.
```

A landscape with no hands should not mention fused fingers. A clip with no logo should not mention logo morphing. Do not add 8K, anti-aliasing, banding, or “no golden spiral failure”.

## Output Density

Density changes what the user sees, not whether the agent analyzed the video.

### Compact / prompt-only

User asked only for a prompt: compiled shots + current-risk negatives.

### Quick (default)

- overview header
- short global continuity card
- compiled shots in delivery-contract form
- current-risk negatives
- only generation-changing uncertainties

### Full breakdown

User asked for 分析 / 分镜 / 时间线 / 完整版: quick delivery plus shot timeline, performance timeline when acting is central, recommended audio, and evidenced genre-overlay fields.

Do not default to a seven-block analysis report.

## Final Quality Check

Before returning:

- Is the prompt chronological?
- Does every shot have paired opening and ending frames?
- If someone entered or left the frame, is that path written?
- Can camera motion be split into task / start / path / speed / stop, or is it explicitly locked?
- Does it explain important changes rather than only list properties?
- Are important emotions translated into visible acting?
- Are important actions more than isolated verbs?
- Does camera language explain visible frame behavior?
- Are lighting/material/environment descriptions concrete and visual?
- Are cuts preserved?
- Is the continuity card written once, with a headcount and per-person lines?
- For spatially sensitive shots, are screen coordinates, world anchors, depth, body orientation, eyelines, occlusion, camera side and axis explicit and consistent?
- Are OTS/reverse/POV/reaction labels supported by concrete visible relations rather than used as magic constraints?
- If the axis or screen direction changes, is the transition or new spatial segment stated?
- Are unsupported technical precision, 8K, fps, and quality-switch words removed?
- Are negatives 3–8 current risks, not a universal dump?
- Is recommended audio clearly presented as reference rather than fact?
- Are stable details consistent?
- Is unsupported technical precision removed?
- Is the result rich and professional without becoming rigid or over-constrained?

If a Shot already answers the three professional questions clearly, do not keep expanding it. **Professional quality comes from precise visible process, not maximum word count.**
