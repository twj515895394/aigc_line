# Prompt Compilation

Use this reference after the video has been decomposed into shots/events, important changes have been identified, and continuity has been extracted.

## Goal

Convert reverse-engineering analysis into a professional generation prompt that explains not only **what is visible**, but also **how it behaves and changes over time**.

A strong reverse prompt should encode, when relevant:

- subject identity and state
- visible performance and micro-expression
- action process and physical quality
- spatial/compositional relationships
- camera behavior and its visible effect
- environment depth and atmosphere
- lighting behavior
- materials and image character
- temporal progression
- edit grammar
- stable continuity
- optional recommended sound reference

## Canonical Prompt Order

Use flexibly rather than as a rigid template:

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
→ Camera behavior
→ Environment
→ Lighting
→ Material & style
→ Temporal progression / edit grammar
```

The emphasis should follow the video. A facial-performance clip should spend more words on performance; a landscape shot should spend more on camera, light, atmosphere and space.

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

### Camera must be a move, not a shot size

Shot size belongs in 起始画面 / 结束画面. Camera motion must still answer: why it moves, from where, along what path, how fast, where it stops. Locked-off cameras must be explicit.

## Description Enrichment Before Compilation

Before writing the final prompt, check whether important observations are still too generic.

### Emotion

Weak:

```text
She becomes sad.
```

Better:

```text
Her smile first pauses rather than disappearing; her gaze briefly drops, the eyes lose their earlier lightness, the lips slowly tighten, and moisture begins to gather in the eyes while she tries to hold the expression together.
```

### Action

Weak:

```text
She pushes his arm away.
```

Better:

```text
After a short hesitation, she uses her forearm and shoulder to slowly guide his arm away, the movement restrained but deliberate, then subtly shifts her body farther toward the door.
```

### Camera

Weak:

```text
Slight handheld movement.
```

Better:

```text
The framing remains generally stable but carries continuous low-amplitude irregular vibration, causing subtle drift in the faces and interior lines rather than exaggerated shake.
```

### Lighting

Weak:

```text
Warm sunlight.
```

Better:

```text
Hard warm sunlight enters diagonally through the windshield, catching skin, sunglasses and beige upholstery; alternating road shadows repeatedly cut across the faces, creating moving bands of bright heat and dense shadow.
```

### Environment

Weak:

```text
A desert highway.
```

Better:

```text
A straight highway runs through an exposed, nearly empty desert with a low horizon and visible heat shimmer in the distance; pale sand and sparse roadside detail streak backward, reinforcing speed and isolation.
```

Enhancement should add observable behavior, not invented narrative.

## Single Continuous Shot

Still use the five-part contract. The temporal chain lives inside 主体动作 and 摄影机运动:

```text
起始画面 ...
主体动作: then ... → gradually ... → at the peak ...
摄影机运动: while/as the camera ... → stop on ...
结束画面 ...
镜头衔接: none, continuous take
```

Example skeleton:

```text
A continuous [shot type] centered on [subject/performance] in [environment].
起始画面：[opening state + composition].
主体动作：[visible performance/action progression].
摄影机运动：[movement + visible framing/parallax effect + where it stops].
Lighting/material/environment [important temporal behavior] belong in those four parts when they change.
结束画面：[ending state].
镜头衔接：none, continuous take.
Maintain [important continuity] once in GLOBAL CONTINUITY.
```

For a performance-heavy close-up, the performance progression may dominate 主体动作, but 起始画面 and 结束画面 must still be two different readable frames.

## Performance Compilation

When acting is central, prefer a **Performance Timeline** or continuous emotional progression.

Avoid:

```text
happy → sad → crying
```

Prefer:

```text
The smile begins natural and relaxed. It does not vanish immediately; it first holds a little too long, then becomes smaller. Her gaze briefly drops and returns, now more fixed and less playful. Moisture slowly gathers along the eyes while the lips tighten and the jaw becomes subtly tense. She continues trying to maintain a faint smile even after the eyes have become visibly emotional. Only near the end does the smile finally collapse and the face approach tears.
```

Keep the intensity faithful to the reference: restrained acting should remain restrained.

Read `performance-and-microexpression.md` when facial acting is a major part of the clip.

## Multi-Shot Sequence

Do not merge editing boundaries into fake continuous camera moves.

Recommended structure:

```text
GLOBAL CONTINUITY
...

SHOT 01 — [time/function]
...

HARD CUT / MATCH CUT / DISSOLVE / other visible transition

SHOT 02 — ...
```

Each shot **must** include the five contract parts. Optional analysis detail may fold into those parts:

- composition → 起始画面 / 结束画面
- subject performance/action → 主体动作
- camera behavior → 摄影机运动
- lighting/environment/material change → whichever part actually changes
- graphics / PIP → 起始画面 and 结束画面, or a short extra line only when visible
- transition out → 镜头衔接

Do not require every shot to contain every analysis category. Do not emit empty headings.

## Action Phase Compilation

When physical action matters, preserve visible phases:

```text
anticipation → initiation → execution → peak/impact → follow-through → recovery
```

Useful language:

- briefly shifts weight before moving
- launches forward with a sudden acceleration
- movement stays compact and controlled
- momentum carries the body laterally
- the motion decelerates into a stable end pose

Describe speed, weight, force and inertia only when visible.

## Camera Compilation

Prefer observable consequences over invented precision.

Avoid unsupported:

```text
35 mm lens, dolly speed 1.3 m/s, 22-degree yaw
```

Prefer:

```text
The camera smoothly tracks backward at matching speed, keeping the subject at a nearly constant medium scale while the road and roadside environment move rapidly through the background with strong forward parallax.
```

If the exact technical movement is uncertain, describe what the frame does.

## Composition Compilation

When composition is meaningful, express relationships rather than only coordinates.

Example:

```text
The woman carries slightly less visual weight on the left side of the frame, while the driver sits closer to camera on the right. The steering wheel and windshield create a lower/front frame, and the central rear-view mirror becomes a visual anchor between them, later carrying the pursuit information.
```

Do not turn this into a hard global constraint unless the reference truly depends on it.

## Lighting and Material Compilation

Lighting should describe visible interaction:

```text
Hard sun enters from front-left, producing warm facial highlights and dense interior shadows; passing roadside shadows move rapidly across the skin and sunglasses.
```

Material should describe surface character:

```text
The faded red paint has a sun-aged, slightly desaturated finish with uneven reflections; the beige interior shows small creases and wear consistent with an older vehicle.
```

Use qualifiers such as “appears,” “slightly,” or “leather-like” when material identity is uncertain.

## Temporal Change Compilation

Video prompts become stronger when “gradually” is unpacked.

Instead of:

```text
The pursuit cars get closer.
```

write:

```text
They begin as tiny colored flashes deep in the mirror, then slowly grow in scale; the red-blue pulses become clearer through the heat distortion until the pursuit feels visibly closer and more threatening.
```

Apply the same idea to:

- expression
- focus
- light
- smoke
- reflections
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
```

Rules:

- Count the opening people. One line per person: look, hair, clothes/fabric/fit, accessories, current state.
- State duration, aspect, shot count, and whether the camera is locked.
- If a detail is not visible, omit it. Do not invent ethnicity, makeup brands, or exact fabric.
- Avoid repeating the entire card inside every shot.
- Default fidelity remains faithful reconstruction of these identities. structural / style-only may replace people/places but must still keep the card shape.

## Recommended Audio Compilation

Audio is normally an optional **recommended reference**, especially when source audio cannot be reliably verified.

Example:

```text
RECOMMENDED AUDIO:
Continuous engine, road and wind texture inside the moving car; subtle cabin vibration and fabric movement; distant pursuit sirens can gradually become more noticeable; restrained low tension in the score; tire/sand texture grows when the car leaves the paved road.
```

Use language such as “recommended,” “suitable,” “consider,” or “can include” when appropriate.

If the target model supports native audio, integrate compact audio cues into the relevant timeline. Otherwise return them as a separate optional sound-design block.

Read `audio-inference-and-design.md` for details.

## Style Compilation

Do not rely on generic words such as:

- cinematic
- beautiful
- epic
- high quality

Translate them into visible properties:

```text
sun-baked gold and faded red palette, fine restrained film grain, realistic skin texture, subtle highlight bloom, slightly aged surfaces, dense warm daylight and controlled handheld/vehicle vibration
```

If mixing historical art direction with modern image quality, separate them conceptually:

```text
1970s production design and color character, rendered with modern photorealistic skin/material detail.
```

## Narrative Rhythm

Encode pacing when it matters:

```text
quiet observation → subtle suspicion → rising pursuit pressure → restrained interpersonal reaction → decisive final beat
```

For montage:

```text
rapid state-changing cuts, progressively tighter detail, each cut advances the process, followed by a longer final hold on the completed result
```

## Constraint Language

Use constraints only when they protect important reconstruction fidelity.

Useful:

```text
Maintain the same character identities and vehicle interior across the sequence.
Do not turn visible hard cuts into one continuous camera move.
Do not invent dialogue when none is established.
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
- Are emotions translated into visible acting when possible?
- Are actions described with useful movement quality?
- Are lighting/material/environment descriptions concrete and visual?
- Are cuts preserved?
- Is the continuity card written once, with a headcount and per-person lines?
- Are unsupported technical precision, 8K, fps, and quality-switch words removed?
- Are negatives 3–8 current risks, not a universal dump?
- Is recommended audio clearly presented as reference rather than fact?
- Is the result rich and professional without becoming rigid or over-constrained?
