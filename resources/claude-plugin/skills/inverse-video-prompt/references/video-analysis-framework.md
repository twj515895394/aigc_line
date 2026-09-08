# Video Analysis Framework

Use this reference for detailed reverse-engineering of a reference video. The goal is to reconstruct the generative logic of the clip, then describe it with enough professional visual detail to be useful for video generation.

## Analysis Hierarchy

Analyze from large structure to small detail:

1. Clip-level intent and rhythm
2. Shot / visual-event segmentation
3. Shot-level subject, action, performance, environment, composition, camera, lighting, material/style
4. Optional graphics layer when on-screen text, logo, watermark, split-screen or PIP exists
5. Description enrichment: how these elements behave and change
6. Genre overlay only if the main type is identifiable
7. Cross-shot temporal continuity
8. Global continuity card (count, character lines, duration, aspect, camera lock)
9. Recommended audio reference when useful
10. Final generation-oriented prompt compilation using the shot delivery contract

## 1. Subject

Record identity-relevant or generation-relevant attributes as a **character card**, not as identity adjectives:

- opening headcount
- person / creature / object type
- visible age range or design category when useful
- hair, silhouette, proportions
- wardrobe: garment, fabric/fit if visible, color, pattern
- accessories
- important props currently held
- body orientation and current state
- position in frame
- relationship to other subjects

One line per person in Global Continuity. Do not invent ethnicity, makeup brands, or fabric when the surface is ambiguous. Do not stop at an inventory of appearance. When useful, describe posture, tension, orientation and relation to the frame.

## 2. Action

Treat actions as temporal processes, not static labels.

Useful fields:

- opening pose/state
- anticipation
- initiation
- execution
- peak/impact
- follow-through
- recovery/end state
- screen direction
- path
- acceleration/deceleration
- force / weight
- hesitation / pause
- body participation
- interaction target
- cause-and-effect relationship
- frame entry: which edge, how they appear
- stay / cross
- frame exit: which edge, how they leave

For simple actions, use only the phases actually visible. If nobody enters or exits, omit those fields.

Prefer:

```text
She pauses, then slowly guides his arm away with her forearm and shoulder, creating a small but deliberate physical distance.
```

over:

```text
She moves his arm away.
```

when the richer behavior is visibly supported.

## 3. Performance

When a human or character performance matters, analyze more than the emotion label.

Observe:

- gaze direction and gaze shifts
- eye tension / blink behavior
- brow movement
- mouth corners and lip tension
- jaw / chin / cheek tension
- breathing or visible breath control
- head movement and stillness
- shoulder / neck posture
- hand self-regulation gestures
- restraint versus release
- emotional transition over time

Translate abstract emotion into visible performance whenever the evidence allows.

For facial close-ups, emotional progression, crying, smiling, restraint, hesitation, anger or fear, read `performance-and-microexpression.md`.

## 4. Environment

Describe spatially meaningful scene information:

- location type
- foreground / midground / background layers
- entrances/exits
- recurring anchors
- surfaces and materials
- weather and atmosphere
- time of day
- crowd/traffic/background activity
- depth and scale
- openness / enclosure
- horizon / vanishing depth
- haze / fog / heat shimmer / dust
- environmental motion

Do not merely name the place. Explain its spatial character when that contributes to the shot.

## 5. Composition

Analyze how elements are organized within the frame:

- subject scale
- left/right/top/bottom placement
- foreground / midground / background relationship
- visual weight
- negative space
- frame-within-frame
- leading lines
- central visual anchor
- overlap / occlusion
- symmetry / asymmetry
- depth layering
- narrative function of props, mirrors, windows, doors, screens, etc.

Composition description should remain evidence-based and should not force every shot into a textbook composition category.

## 6. Camera

Analyze:

- shot size
- angle
- camera height
- subject-camera distance
- camera movement
- framing behavior
- focus/depth cues
- stabilization character
- foreground parallax
- perspective change

Then describe the **visible result** of the camera behavior:

- Does the subject grow in frame?
- Is the subject held at a stable scale while the background moves?
- Does foreground parallax increase speed?
- Does the movement feel floating, rough, restrained, vehicle-mounted, handheld, or locked?
- Does the camera movement begin or settle at an emotional beat?

Separate camera motion from subject motion. Read `camera-motion-and-language.md` when uncertain.

## 7. Lighting

Identify visible lighting logic:

- primary source
- source direction
- hard / soft
- contrast
- key-to-fill relationship
- color temperature
- practical sources
- rim/back light
- volumetric effects
- exposure behavior
- highlight bloom or clipping

Then describe how light acts on the scene:

- where it lands on skin, glass, metal, fabric or environment
- how highlights behave
- how dense shadows remain
- whether light bands, reflections or practicals move through time
- whether exposure changes as the subject/camera moves

Do not invent exact fixture types when only light behavior is visible.

## 8. Material and Style

Translate vague style into visible properties:

- photorealistic / stylized / animation / illustrative
- color palette
- saturation and contrast
- skin rendering
- fabric weight / folds
- glossy / matte / satin surfaces
- wear, aging, scratches, dust, patina
- wetness / dryness
- reflection softness
- grain / noise
- bloom / diffusion
- sharpness
- lens/image character
- grading
- motion rendering character

Do not over-specify exact material type when the surface is ambiguous.

## 9. Graphics / On-screen (optional)

Record this layer only when something extra is drawn on the picture:

- subtitles, titles, prices, captions
- logos, watermarks, stickers
- split-screen, PIP, picture-in-picture, UI chrome

For each graphic: when it appears, where it sits, what it is responsible for, and how it leaves.

Split-screen / PIP must be paired:

```text
fullscreen now: current full-body state / current outfit / current product
PIP: next state, not blank, not the current outfit, not a four-up poster
```

If no graphic exists, omit the whole layer. Do not emit “no subtitles”.

## 10. Temporal Continuity

For each shot or event, ask:

### What stays stable?

- identity
- clothing
- object design
- scene geometry
- lighting logic
- color palette
- visual style

### What changes?

- subject pose/action
- facial performance
- object state
- camera position
- framing
- focus
- environment state
- light intensity
- reflections
- smoke / particles
- background distance

For important changes, describe the progression:

```text
initial state → beginning of change → deepening change → threshold/peak → ending state
```

Examples:

- distant pursuit lights begin as tiny colored flashes, grow larger and clearer, then dominate the mirror
- a smile first pauses, then becomes restrained, then slowly disappears
- moving sunlight alternates across the face as the vehicle passes through shadow bands

## 11. Narrative Rhythm

Record the temporal function of each beat:

- setup
- hold
- anticipation
- acceleration
- reveal
- impact
- pause
- recovery
- transition
- climax

For montage, identify whether edits are driven by:

- process state changes
- rhythmic matching
- action matching
- spatial progression
- escalation
- contrast

Rhythm should be encoded when it affects the generated motion or edit feel.

## 12. Description Enrichment Pass

After the factual decomposition, perform a second pass that asks:

- Can an abstract emotion be translated into visible acting?
- Can a generic action be described through speed, path, force, pause or inertia?
- Can the composition explain foreground/background or visual-center relationships?
- Can the camera description include its visible effect, not only a move name?
- Can lighting explain how it falls on subject/materials and changes over time?
- Can materials show age, wear, reflection, folds, moisture or texture?
- Can the environment explain air, scale and spatial depth?
- Can a “gradual” change be written as a temporal progression?
- Can the atmosphere be explained through visible causes rather than adjective stacking?

Do not force every category into every shot. Enhance only the dimensions that materially improve the reconstruction.

Read `description-enrichment.md` for detailed patterns.

## 13. Recommended Sound Reference

Sound is normally a **recommended reference layer for the video model**, not a claim that the original video definitely contains those sounds.

Based on visible evidence, optionally recommend:

1. dialogue/vocal character when clear
2. Foley/action SFX
3. environmental ambience
4. cinematic/designed SFX
5. music character
6. silence/dynamic contrast

Align recommendations with visible events and materials:

- foot contact → surface-appropriate footsteps
- vehicle motion → engine / road / wind / cabin vibration character
- metal door contact → metal impact and room reverb
- fast visual transition → optional restrained designed accent

Use “recommended / suitable / consider” language when source audio is unknown.

Read `audio-inference-and-design.md` for detailed guidance.

## Shot Record Template

Use only fields that help the actual task:

```text
SHOT ID:
TIME RANGE:
FUNCTION:

SUBJECT:
ACTION (include enter/stay/exit only if it happens):
PERFORMANCE:
ENVIRONMENT:
COMPOSITION:
CAMERA:
LIGHTING:
MATERIAL / STYLE:
GRAPHICS: (omit if none)
TEMPORAL CHANGE:
RECOMMENDED AUDIO:

OPENING FRAME:
ENDING FRAME:
PEAK EVENT:
TRANSITION OUT:
CONTINUITY NOTES:
UNCERTAINTY:
```

When compiling, map OPENING FRAME / ACTION / CAMERA / ENDING FRAME / TRANSITION OUT onto the shot delivery contract. Do not keep empty headings in the user-facing prompt.

## Cross-Shot Analysis

After individual shots, compare them for:

- subject identity
- wardrobe / hair / props
- left/right spatial relationship
- screen direction
- prop state
- location geometry
- lighting continuity
- action causality
- edit motivation
- rhythm escalation
- repeated framing patterns
- recurring visual motifs

This prevents locally correct descriptions from becoming globally incoherent.

## Confidence Discipline

Prefer evidence-backed phrasing.

High confidence:

```text
The subject crosses from screen-left to screen-right.
Her smile visibly becomes smaller over several seconds.
```

Moderate confidence:

```text
The framing change is consistent with a gentle forward camera move.
The restrained jaw tension suggests she is suppressing emotion.
```

Low confidence:

```text
The sparse frames do not establish whether the scale change comes from zoom or physical camera movement.
The eyes are obscured by sunglasses, so gaze and tear buildup cannot be reliably described.
```

Never convert low-confidence interpretation into fake exact technical parameters or invisible micro-expression details.
