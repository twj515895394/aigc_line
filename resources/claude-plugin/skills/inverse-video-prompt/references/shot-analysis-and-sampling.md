# Shot Analysis and Sampling

Use this reference when the agent cannot inspect every video frame directly or must decide which frames to analyze.

## Primary Rule

**Do not treat uniform frame sampling as video understanding.**

Uniform frames are useful for coverage, but they can miss:

- Short shots
- Hard cuts
- Action peaks
- Impact frames
- Fast reveals
- Transition frames
- Camera-direction reversals
- Speed ramps
- Brief expressions or prop-state changes

The goal is to sample evidence around **shot boundaries and action events**.

## Preferred Evidence Order

Use the strongest available method in this order:

1. Directly inspect the full video temporally.
2. Detect or approximate shot boundaries, then sample within each shot.
3. Use dense temporal sampling and group frames into visual shots.
4. Use sparse user-provided frames conservatively.

## Full-Video First Pass

Before detailed frame inspection, determine:

- Total duration
- Aspect ratio/orientation
- Approximate number of shots
- Obvious hard cuts and transitions
- Long takes vs rapid montage
- Major subject changes
- Major scene/location changes
- Slow-motion or accelerated sections
- The principal action or reveal

This first pass prevents local frame details from obscuring the edit structure.

## Shot Boundary Cues

Strong cut evidence includes abrupt changes in:

- Background/scene
- Camera viewpoint
- Subject scale
- Lighting/color system
- Subject pose or location with no continuous path
- Perspective/horizon
- Composition

Soft transitions may show:

- Cross-dissolve overlap
- Fade to/from black or white
- Wipe boundaries
- Flash frames
- Motion-blur transition

Do not classify a rapid continuous whip pan as a cut if intermediate frames preserve motion continuity.

## Per-Shot Sampling

For a stable or moderately moving shot, sample at least:

- **Opening frame** — soon after the shot begins
- **Middle state** — representative composition/action
- **Ending frame** — shortly before the next cut

If a subject enters or exits, also sample the frame of appearance and the frame of disappearance. If a title, logo or PIP appears, sample just before, at onset, and just after it leaves.

For action-heavy shots, add frames near:

- Anticipation
- Launch/initiation
- Maximum extension / highest point / closest approach
- Impact/contact
- Follow-through
- Recovery

For reveal or transformation shots, add frames around the state change:

- Before
- During
- Immediately after

## Sampling Density Heuristic

Increase sampling density when any of these are present:

- Fast body motion
- Fast camera motion
- Short shot duration
- Frequent edits
- Multiple interacting subjects
- Transformation or morphing
- Object assembly/disassembly
- Complex choreography
- Motion blur hiding intermediate states

Decrease density for:

- Static talking shots
- Locked-off compositions
- Long holds with minimal motion
- Repeated unchanged frames

## Why Start/Middle/End Matters

A single frame cannot reveal temporal direction.

Three states can often distinguish:

- Dolly in vs static close-up
- Pan left vs static composition
- Subject approach vs camera approach
- Object opening vs closing
- Character standing up vs sitting down
- Energy effect appearing vs disappearing

Do not infer direction from frame order if timestamps/order are unknown.

## Camera vs Subject Diagnostic Sampling

When motion is ambiguous, compare:

- Subject bounding-box size
- Background parallax
- Foreground displacement
- Vanishing-point movement
- Occlusion changes
- Horizon movement

Examples:

- Subject size stable + background shifts laterally → likely tracking/pan combination.
- Subject grows while background perspective changes strongly → likely dolly/subject approach.
- Whole image magnifies with little parallax change → likely optical/digital zoom.

These remain inferences, not guaranteed physical camera measurements.

## Sparse Frame Sequence Handling

If only a few screenshots are provided:

1. Preserve their known order and timestamps if available.
2. Identify what is directly visible in each frame.
3. Infer only the minimum transition needed to connect adjacent states.
4. List alternative explanations when they would materially change the prompt.
5. Avoid exact motion speeds or camera paths unless strongly supported.

Example:

Frames show a character small in frame, then large in frame.

Weak response:

`The camera performs a fast dolly-in at 1.2 m/s.`

Better response:

`The framing closes from medium-wide to close; likely achieved by a forward camera move, subject approach, or combined push-in. For generation, use a smooth push-in while the subject advances if faithful motion cannot be determined from the available frames.`

## Long Videos

Do not attempt one monolithic prompt for a long multi-scene video unless the user explicitly wants a summary.

Instead:

1. Segment by scene/sequence.
2. Segment each sequence into shots.
3. Reverse-engineer per-shot prompts.
4. Create a global continuity/style block.
5. Optionally create a high-level master prompt after the shot prompts.

## Contact Sheets and Storyboards

Treat a contact sheet as a sampled temporal representation, not proof of exact motion.

Infer:

- Shot order
- Composition changes
- Action progression
- Likely cuts

Do not overclaim:

- Camera speed
- Transition duration
- Precise easing
- Exact path between panels

## Quality Check

Before moving from sampling to prompt compilation, verify:

- No visible shot was skipped.
- Each short but meaningful shot has at least one representative frame.
- Important continuous shots have opening and ending evidence.
- Action peaks are represented when they affect the prompt.
- Frame order/timestamps are known or uncertainty is acknowledged.
