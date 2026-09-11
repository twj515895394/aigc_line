# Cinematic Shot Grammar

Use this reference when the clip contains dialogue coverage, multiple subjects, deliberate staging, shot-reverse-shot editing, or recognizable cinematography grammar. The terms are labels for observable relationships; they do not replace the concrete spatial description.

## Core Rule

Always write the professional term together with its visible function:

```text
中近景 OTS（过肩）：A 的肩部和后脑在前景虚焦，A 看向画面右外的 B；B 不入画，只作为视线目标。
```

Do not assume that a model will reconstruct the whole scene from `OTS`, `POV`, or `shot-reverse-shot` alone.

## Shot Types

### Establishing Shot / 建立镜头

Introduces the location, major spatial anchors, subject count, or the geography needed to understand the following shots. It may be a wide shot, a vehicle interior, or another sufficiently readable view; it is not required to be an extreme long shot.

### Master Shot / 主镜头、场面调度镜头

Shows the main action and the relevant subjects in one continuous spatial relationship. Use it as the reference for later coverage when it establishes who is where, who faces whom, and where the camera is.

### Two-Shot / 双人镜头

Frames two subjects together. Describe their screen positions, depth order, body orientation, eyelines, overlap and the shared background anchor.

### Single / 单人镜头

Frames one subject as the editorial unit. If the other person is off-screen, preserve the off-screen eyeline and screen direction instead of making the subject face the camera by default.

### OTS / Over-the-Shoulder / 过肩镜头

The foreground shoulder, head or partial back belongs to the observing subject; the framing looks toward the target. State whose shoulder it is and where the target is located or looked at.

### Reverse Shot / 反打镜头；Shot-Reverse-Shot / 正反打

A reverse shot observes the same interaction from the opposite coverage direction. Record:

- whose reverse it is;
- whose shoulder or back is in the foreground, if any;
- the target's screen direction and eyeline;
- whether the 180-degree axis is preserved;
- whether the cut is a hard cut, match cut, or a designed axis transition.

Minimal reliable form:

```text
SHOT 01：A 的中近景过肩，A 位于前景屏幕左侧，视线看向屏幕右外的 B。
SHOT 02：B 的反向过肩，B 视线看向屏幕左外的 A；保留同一 180° 轴线，不镜像、不跳轴。
```

### POV / 主观镜头

The camera represents a subject's point of view. Name the viewing subject and the target; do not call a camera merely close to a character POV unless the visible framing and subject relation support it.

### Reaction Shot / 反应镜头

Prioritizes the response of a subject to an off-screen event or person. Preserve the reaction subject's eyeline and the screen direction established by the preceding shot.

### Insert / 插入镜头、细节插镜

Isolates a generation-relevant detail such as a hand, object state, screen, key, wound, or written mark. State the detail's spatial anchor and its before/after state so it does not become an unrelated close-up.

### Cutaway / 插入性切出镜头

Cuts away to a related object, environment detail, or secondary reaction. Describe what information it carries and how it returns to the main action; do not use `cutaway` as a substitute for a visible transition.

## Staging and Coverage

- **Blocking / 走位** — where subjects stand or move through the space, including start point, destination, distance, depth order and screen direction.
- **Staging / 场面调度** — how bodies, props, background anchors and the camera are arranged over time; include who occludes whom and who initiates movement.
- **Coverage / 覆盖镜头** — the set of master, two-shot, singles, OTS, inserts and reactions used to cover one action or dialogue exchange. Do not invent coverage that is not visible in the reference.
- **Eyeline match / 视线匹配** — a subject's look establishes a target, followed by a shot that presents that target from a compatible direction and scale.
- **Match on action / 动作匹配剪辑** — a cut preserves a continuous action phase across shots; describe the shared hand/body/object state at the cut.
- **Screen direction / 屏幕运动方向** — the subject's left-to-right or right-to-left movement as seen by the viewer. Track it across shots and landmarks.
- **Line of action / 180-degree axis / 轴线** — the interaction or movement line that organizes camera placement and eyelines. State which side the camera occupies when it matters.

## Professional Description Pattern

Use this order when the grammar matters:

```text
[shot type + shot size]
+ [whose viewpoint / foreground shoulder]
+ [screen position and depth]
+ [body orientation]
+ [eyeline target]
+ [camera side and movement]
+ [continuity rule or transition]
```

Example:

```text
中近景反向 OTS：B 的左肩位于前景右侧，B 身体朝向画面左方，视线锁定画面左外的 A；摄影机仍在 A–B 轴线的同一侧，固定机位，硬切接回 A 的过肩，不改变门和窗在背景中的相对位置。
```

## Evidence Discipline

- Do not infer a master shot, OTS, POV or reaction shot from a sparse still unless the spatial relationship is visible.
- Do not infer exact lens, focal length, camera rig, or coverage plan from a shot label.
- When the foreground shoulder is ambiguous, say `前景有部分肩背遮挡，无法确定属于 A 还是 B` rather than assigning the wrong character.
- If the camera crosses the axis, describe the visible transition or start a new spatial segment; do not silently reverse left/right.
