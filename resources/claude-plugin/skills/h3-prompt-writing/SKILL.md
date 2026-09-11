---
name: h3-prompt-writing
description: Write MiniMax H3 video generation prompts for T2VA, I2VA, FL2VA, L2VA, and Ref2VA. Use when rewriting multimodal requests into H3 prompt structures, composing integrated_multimodal_description, overall_soundscape, and non_diegetic_music, aligning keyframes, or defining reference labels for images, videos, and audio.
---

# H3 Prompt Writing

## Workflow

1. Identify the input mode: T2VA, I2VA, FL2VA, L2VA, or full-reference Ref2VA.
2. For base text/keyframe modes, read `references/base-en.txt` and follow its final prompt structure.
3. For full-reference mode, read `references/ref-en.txt` and follow its six-section rewrite format.
4. Preserve the exact field names, section order, labels, and timing notation from the selected guide.

## Base Modes

- T2VA: build the full audiovisual timeline from text.
- I2VA: start from the first frame and develop forward from it.
- FL2VA: describe the continuous path between the first and last frames.
- L2VA: infer a plausible opening and converge to the supplied last frame.

Use `integrated_multimodal_description`, `overall_soundscape`, and `non_diegetic_music` in the order shown in `references/base-en.txt`.

## Full-Reference Mode

Ref2VA rewrites use `subject_definitions`, `summary`, `retention_analysis`, `detailed_description`, `overall_soundscape`, and `non_diegetic_music` in that order. Reference labels stay consistent across all sections.

Read `references/ref-en.txt` for label rules, retention analysis, and complete examples.

## Director-stage assets

Director-stage previs and keyframes are optional reference layers. Fold whatever they actually contribute into the six official English fields. Do not paste a Chinese “导演台参考约束” heading, and do not invent a seventh section. If those assets are absent, write a normal H3 prompt.

Recognize when the input makes it clear:

- Previs: `generated/director-videos/`, a read-only previs node, or the user/director pack calls it 预演 / 白模预演 / 代理动画.
- Keyframe: `generated/director-stills/`, a `capture-still` image, or 关键帧 / 构图截图.

A video-prompt “导演台参考约束” block, if present, is source material to interpret, not a required output shape. If the drama director pack already names the previs/keyframe job, use that even without the Chinese block. Ambiguous white-model footage that is not identified as director-stage stays ordinary reference.

Write living constraints, not a fixed inherit-all list. For each director-stage asset, keep only the jobs the input actually assigns. Typical jobs, mix as needed:

- camera path, framing, or viewpoint
- spatial blocking and subject placement
- macro action, timing, or end pose
- composition / facing / scale as a still anchor

Typical non-jobs, unless the user explicitly wants them:

- proxy mannequin color, material, costume, identity
- previs render style as final look
- previs soundtrack as the final mix

Ref2VA: put those jobs into the existing labels and sentences.

- `subject_definitions`: say what this `<Video N>` or `<Picture N>` is for in this shot, in one natural English line.
- `summary`: usually `[reference generation]` when previs/keyframes only guide camera or blocking. Use `video editing` / `video continuation` / `keyframe completion` only when that file really is the edit source or a first/last frame.
- `retention_analysis`: pick `fully_preserved`, `partially_preserved`, or `weak_reference` from the real job. Most previs/keyframes are `partially_preserved`. Name the kept dimensions and the dropped ones in the same line; do not dump every possible dimension.
- `detailed_description`: turn kept camera/blocking into shot action. Replace proxies with final characters/sets from other references when those exist.
- Sound fields: design from the current task. Do not copy previs audio by default. If the task forbids BGM, `non_diegetic_music: N/A`.

I2VA / FL2VA / L2VA: if a director still is actually the first or last frame, inherit only the still’s assigned job (often composition/placement) in `integrated_multimodal_description`. Final look still comes from character/scene references when those are present.

If previs and a keyframe disagree, do not average them. Prefer the pack/user assignment; otherwise previs for motion/camera, keyframe for static anchors.

## Output Rules

- Write rewrite sections in English; preserve dialogue, lyrics, and visible scene text in their original language.
- Describe each shot by composition, subjects, environment, actions, camera, sound, and the exact point where referenced content appears.
- Avoid plot summaries, unresolved reference labels, and timing that does not match the requested duration.

## Tips for Better Results

- Match the total description duration to the requested video length; this application submits 5, 10, or 15 seconds.
- Keep `<Picture N>`, `<Video N>`, and `<Audio N>` labels identical to the real ordered reference arrays in the video node.
- Prefer concrete visual and audio details over abstract words such as “cinematic” or “beautiful”.
- For I2VA, FL2VA, and L2VA, state explicitly how the first and/or last frame connects to the timeline.
