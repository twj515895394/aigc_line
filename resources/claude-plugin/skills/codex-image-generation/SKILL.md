---
name: codex-image-generation
description: 仅在用户聊天第一行显式输入 /aigc-canvas:codex-image-generation 时读取并执行。禁止因生图、出图、/image、image_gen 或其他图片任务自行选用。Codex 内置 image_gen 出图后保存到 generated/images/，需要时写入 image 节点 sourcePath。
argument-hint: "[要生成或编辑的画面]"
disable-model-invocation: true
---

# Codex 生图

用 Codex 自己的 `image_gen` 出图，落到本项目，不打画布 `generate`。

## 手动唤起

只有用户本轮第一行是 `/aigc-canvas:codex-image-generation`（可后跟任务说明）才执行。自然语言提到生图、出图、Codex 生图、`/image`、`image_gen` 都不够。未显式斜杠调用则立刻停止，不要读后续步骤、不要生图。

## 何时不用

- 当前会话不是 Codex，或没有 `image_gen` 工具；
- 短剧角色底图、场景俯视、旁白分镜（走对应生产 Skill / 画布 generate）；
- 用户点名 ComfyUI、Krea、Gemini、Seedream 或节点「生成」按钮。

没有 `image_gen` 时立刻停止并说明阻塞。禁止改打 `InvokeNodeAction(generate)`，禁止用 `OPENAI_API_KEY` CLI 回退，除非用户明确要求。

## 落盘

1. 调用内置 `image_gen`（编辑先 `view_image` 再改）。
2. 官方默认写 `$CODEX_HOME/generated_images/`。项目要用的图必须再拷进工作区，不能只留在 CODEX_HOME。
3. 目标目录：`generated/images/`（相对项目根）。不存在就创建。
4. 文件名：`codex-<YYYYMMDD-HHMMSS>-<短英文或拼音slug>.png`。已存在则加 `-2`、`-3`，禁止覆盖。
5. 用项目内相对路径核对文件确实存在且是普通图片。

## 画布（可选）

用户要在画布上看到时：

1. `CreateCanvasNodes` 建 `image` 节点，或更新用户指定的现有 image 节点；
2. 只写 `sourcePath` 为上一步相对路径（正斜杠），`preview` 只读不要写；
3. 不要调该节点的 `generate`。

只要文件、不要节点时，报告相对路径后结束。

## 交付

报告：最终相对路径、是否已挂节点及 nodeId、用的是内置 `image_gen`。不要把图以 data URL 写入画布快照。
