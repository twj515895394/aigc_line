# Tasks Index

任务层负责确定当前要完成什么，以及最终输出应采用什么结构。

每次只读取一份任务 Playbook。

## 成片生图

适用于单张高完成度成片、产品图、海报、封面、写真和概念图。

读取：

- `finished-image/playbook.md`

## 整体图生图

适用于整体换风格、换场景、换服装、改变镜头与光影，且允许画面多个层面共同变化。

读取：

- `image-to-image/playbook.md`

## 局部图片编辑

适用于只修改指定对象、区域、文字、动作或局部细节，并要求其他内容保持不变。已有成片只补皮肤微观纹理、去磨皮或做保真细节增强时，也走这条路线，不走整体图生图。

读取：

- `image-editing/playbook.md`

## 参考图反推 Prompt

适用于根据参考图生成复现型、结构型或改造型 Prompt。

读取：

- `prompt-reverse-engineering/playbook.md`

## 角色资产

适用于三视图、多角度头像、表情板、换装板、手部、鞋履和角色主视觉。写实真人角色还必须叠加 `../controls/realism-quality/anti-ai-realism.md`，不要只写「真实皮肤」。

读取：

- `character-assets/playbook.md`

## 场景资产

适用于场景总览、空景、站位、动线、道具关系和镜头入口。

读取：

- `scene-assets/playbook.md`

## 分镜资产

适用于故事板总板、逐镜关键帧和动作拆解。

读取：

- `storyboard-assets/playbook.md`

## 视频参考帧

适用于图生视频的首帧、尾帧和关键过渡帧。

读取：

- `video-reference-frames/playbook.md`

## 判断提醒

- 产品图和海报是成片输出形态，不单独增加任务类型。
- 指定元素替换且其他不变，属于局部图片编辑，不属于整体图生图。
- 用户说“分析这张图并给 Prompt”时，先判断其目的是复现、提炼结构还是改造。
- 角色图、场景图、分镜图和视频参考帧不能混用同一任务 Playbook。
