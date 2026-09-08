# Camera Motion and Language

Use this reference when reconstructing camera behavior or translating it into generation language.

## Core Distinction

Always separate three layers:

1. **Camera position** — where the viewer is relative to the subject.
2. **Camera orientation/framing** — where the camera points and how the subject is framed.
3. **Camera translation/rotation** — how the camera actually moves through time.

A shot can combine all three.

## Shot Size

Use standard labels when useful:

- ELS — extreme long shot
- LS — long shot
- FS — full shot
- MS — medium shot
- MCU — medium close-up
- CU — close-up
- ECU — extreme close-up

Describe framing progression when it changes:

`medium-wide → medium close-up`

This is often more useful than guessing focal length.

## Camera Angle

Common angle terms:

- Eye-level
- Low-angle
- High-angle
- Overhead/top-down
- Worm's-eye
- Dutch angle
- Over-the-shoulder
- POV
- Profile / three-quarter / frontal / rear follow

Use approximate angle wording only when it improves reproduction.

## Motion Taxonomy

### Pan

Camera rotates horizontally from a fixed or nearly fixed position.

Evidence:

- View direction changes horizontally.
- Perspective origin remains relatively stable.
- Scene sweeps across frame.

Prompt language:

`slow pan right following the subject`

### Tilt

Camera rotates vertically.

Prompt language:

`tilt upward from the character's feet to the face`

### Truck / Lateral Track

Camera translates left or right.

Evidence:

- Strong parallax among foreground, subject, and background.
- Perspective changes as the camera moves sideways.

Prompt language:

`camera tracks laterally alongside the runner`

### Dolly In / Push In

Camera translates toward the subject.

Evidence:

- Subject scale increases.
- Perspective/parallax changes.
- Foreground/background spatial relationships change.

Prompt language:

`controlled dolly-in from medium shot to close-up`

### Dolly Out / Pull Back

Camera moves away.

Prompt language:

`camera slowly pulls back, revealing the surrounding room`

### Pedestal

Camera translates vertically while preserving orientation more than a tilt would.

Prompt language:

`camera rises vertically while keeping the subject centered`

### Orbit / Arc

Camera travels around the subject.

Evidence:

- Subject viewing angle changes continuously.
- Background shifts with strong parallax.
- Subject remains the compositional anchor.

Prompt language:

`clockwise 90-degree orbit around the character`

Use approximate arc amount only when visible.

### Crane / Jib

Large vertical and/or arcing camera movement that changes elevation and spatial reveal.

Prompt language:

`camera cranes upward and backward to reveal the full battlefield`

### Tracking / Follow

A functional description: camera follows a moving subject while maintaining useful framing.

This may physically combine truck, dolly, pan, stabilization, or handheld motion.

When the exact mechanics are uncertain, `tracking shot` is often safer than inventing a precise rig movement.

### Lead / Retreating Follow

Camera moves ahead of the subject while facing back toward them.

Prompt language:

`camera retreats smoothly in front of the walking subject, maintaining a medium shot`

### Handheld

Irregular small translations/rotations consistent with operator-carried motion.

Do not call every unstable generated clip handheld. Look for intentional micro-jitter tied to movement.

### Roll

Camera rotates around the optical axis.

Prompt language:

`camera rolls clockwise while pushing toward the doorway`

### Zoom

Focal length / crop changes without equivalent physical translation.

Evidence:

- Image scale changes.
- Perspective relationships change little compared with a dolly.

When uncertain between dolly and zoom, describe the visible framing change instead of overclaiming.

### Dolly Zoom

Requires opposing physical dolly and focal-length change, producing distinctive perspective distortion while subject framing remains relatively stable.

Do not use `dolly zoom` merely because the shot feels dramatic.

### Whip Pan

Extremely fast pan with strong directional blur, often used as an edit or reveal device.

Distinguish:

- True continuous whip pan
- Whip-pan transition hiding a cut
- Hard cut between blurred frames

### Locked-Off / Static

Camera remains fixed; all visible motion comes from subjects, environment, focus, lighting, or editing.

Static shots should be explicitly identified when they are part of the reference grammar.

## Compound Moves

Describe compound moves in execution order.

Good:

`camera starts low behind the motorcycle, accelerates into a forward tracking move, then arcs to the rider's left side while rising to eye level`

Weak:

`dynamic cinematic camera movement`

Do not overload a prompt with incompatible simultaneous moves.

## Subject Motion vs Camera Motion

Use relative evidence.

### Likely subject approach

- Subject grows in frame.
- Background geometry relative to the camera changes little.
- Subject's ground contact visibly advances.

### Likely camera push-in

- Subject and nearby environmental anchors change perspective together.
- Foreground parallax increases.
- Camera passes spatial markers.

### Likely pan

- Subject position is corrected by rotating view.
- Little translation parallax.

### Likely lateral track

- Foreground and background move at different rates.
- Subject can stay nearly stable in frame.

## Focus and Depth

Describe visible focus behavior:

- Deep focus
- Shallow depth of field
- Background blur
- Foreground blur
- Rack focus from A to B
- Focus follows subject

Do not infer exact aperture values unless the task specifically needs a photographic approximation.

## Camera Prompt Formula

A useful camera phrase follows this pattern:

`[initial shot size/angle] + [camera relation] + [motion] + [direction/path] + [framing behavior] + [ending composition]`

Example:

`low-angle medium-wide behind the runner; the camera tracks forward at matching speed, then arcs to the runner's right side while closing into a medium shot, keeping the face near the upper-right third`

## Avoid

- Unsupported focal lengths
- Unsupported exact degrees
- Unsupported physical speeds
- Calling cuts camera moves
- Calling subject motion camera motion
- Stacking pan + orbit + dolly + zoom without a temporal sequence
- Using vague words such as `epic camera`, `professional movement`, or `cinematic motion` without describing what actually happens
