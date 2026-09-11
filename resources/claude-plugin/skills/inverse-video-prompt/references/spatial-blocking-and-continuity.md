# Spatial Blocking and Continuity

Use this reference whenever spatial relations can affect generation: multiple people, dialogue, OTS/reverse shots, people entering or leaving, vehicle interiors, chases, camera repositioning, or repeated background geography.

The goal is to describe a checkable spatial contract, not to decorate the prompt with vague phrases such as “合理站位” or “保持空间一致”.

## Coordinate Systems: Never Mix Them

Keep these relations separate:

1. **Screen coordinates** — screen-left / screen-right / center, as seen by the viewer in the current shot.
2. **World or scene coordinates** — near the window, beside the door, north side of the table, driver's seat, behind the counter, and other stable location references.
3. **Depth** — foreground/near camera, midground, background/far from camera; state distance or overlap when useful.
4. **Body orientation** — where the torso/head is facing.
5. **Eyeline** — where the eyes are looking and which subject or anchor they target.
6. **Camera relation** — camera position, viewing direction, height, and which side of the interaction axis it occupies.

Default to screen-left/screen-right. Do not write only “A sits on the left” or “A's left side” when continuity matters. Prefer:

```text
A occupies screen-left foreground, closer to camera; B is screen-right background beside the window. A's torso faces screen-right toward B, while A's eyes remain on B.
```

If a real-world side is important, state both systems:

```text
World relation: A is beside the door and B is beside the window. In this shot, A appears screen-left and B screen-right.
```

## Spatial Contract

For a multi-subject or continuity-sensitive scene, build this compact card before compiling shots:

```text
SPACE CONTINUITY:
Scene segment: [location / time / current action state]
Camera: [position, viewing direction, height, shot side, frame orientation]
Subjects: [count and stable IDs]
Screen relation: [screen-left/right/center and depth for each subject]
World anchors: [door, window, table, road sign, steering wheel, column, etc.]
Body orientation: [each subject faces where]
Eyelines: [each subject looks at whom/what]
Occlusion: [who is in front of or overlaps whom]
Distance: [near/far, approximate relation, only if visible]
Movement: [screen direction, world destination, start/end, speed state]
Axis: [A–B or movement axis; camera side; whether crossing is allowed]
Allowed transitions: [OTS, reverse, push-in, walk-in, etc.]
Forbidden drift: [mirror, left/right swap, new person, wrong eyeline, wrong landmark order]
```

This card is a continuity layer, not a finished frame and not a top-down diagram. A wider establishing shot is useful only when it actually makes the relation readable.

## Shot-Level Spatial Writing

Every relevant shot should answer, using only visible evidence:

- who is in frame and who is off-screen;
- where each subject is in screen coordinates;
- who is nearer the camera and what overlaps what;
- where each body points;
- where each gaze points;
- where the camera is relative to the scene and the axis;
- what background anchor confirms the space;
- whether the subject enters, stays, crosses, turns, or exits;
- what relation must remain unchanged at the cut.

Use IDs such as A, B, C when there are multiple subjects. Keep the same IDs across the timeline and write the natural-language identity once in Global Continuity.

## OTS and Reverse-Shot Continuity

For OTS or shot-reverse-shot:

1. The foreground shoulder/head must belong to the named observing subject.
2. The target's eyeline must point to the observing subject's screen direction.
3. The reverse shot changes the observation position and foreground shoulder, not the room's geography by default.
4. Preserve the A–B line, screen direction, background anchor order and relative world positions unless the reference visibly designs an axis transition.
5. If a new shot is tighter and the room is mostly hidden, retain enough eyeline direction or one spatial anchor to keep the relation legible.

Example:

```text
SHOT 01：A 过肩，A 的肩背在前景屏幕左侧，A 看向屏幕右外的 B；B 靠近窗边。
SHOT 02：B 反向过肩，B 的肩背在前景屏幕右侧，B 看向屏幕左外的 A；窗仍位于 B 的后侧，门与窗没有互换。
```

## Axis and Spatial Segment Rules

Define the 180-degree axis between interacting subjects or along the movement path.

- Keep coverage on the same camera side of the axis unless the reference visibly crosses it.
- A hard cut that silently flips screen-left/right, eyelines or shoulder order is a continuity error, not a new camera move.
- If the camera crosses the axis, show a readable transition such as a camera move around the subjects, a neutral frontal shot, or a deliberate new spatial segment; then rewrite the camera side and screen relations.
- Split the spatial segment when the location changes, the subject swaps screen sides, the front/back relation changes materially, a pursuit enters a new zone, or the camera crosses the axis without a shown transition.
- A tighter shot, small push-in, expression change or hand action normally reuses the same spatial contract.

## Blocking and Movement

Describe movement with both screen and world consequences:

```text
B enters from screen-right, passes behind A, and stops beside the door; the movement remains right-to-left on screen, while the door stays the destination anchor.
```

For chases, walks and vehicle movement, preserve:

- who is ahead and who follows;
- screen movement direction;
- foreground/midground/background order;
- landmark order;
- start point, destination and turning point.

If the subject turns around, write the turn as an event and update the spatial contract. Do not let a generated clip reverse direction mid-shot without a visible cause.

## Confidence and Missing Information

If a sparse frame sequence cannot establish world-left/world-right, camera side or foreground identity, mark it as uncertain. Use the strongest visible convention—usually screen coordinates—and do not invent a floor plan. A professional label is not a substitute for evidence.

## Spatial QC

Before finalizing a multi-shot prompt, check:

- subject count and IDs remain stable;
- screen-left/right is stated from the viewer's current shot;
- world anchors do not silently swap sides;
- foreground/background and occlusion are plausible;
- body orientation and eyeline are separately described;
- entry/exit edges and movement direction are consistent;
- reverse shots preserve the axis unless a transition is shown;
- camera side and shot type match the described space;
- no mirror, duplicated subject, wrong shoulder or new background geography was introduced.
