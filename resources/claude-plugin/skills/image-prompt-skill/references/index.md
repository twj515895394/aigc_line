# Image Prompt References Index

## 用途

本索引只负责判断当前任务应继续读取哪个分类，不承载具体知识。

执行时先确定输入类型和任务类型，再按缺口读取少量控制、资料库、风格或诊断 Reference。

## 默认读取预算

固定读取：

- `1` 份 input Reference
- `1` 份 task Reference

按需读取：

- `0-2` 份 controls
- `0-2` 份 libraries
- `0-1` 份 style
- `0-1` 份 diagnostic

分类索引只用于导航，不计入业务 Reference 数量。

## 第一步：输入类型

根据用户提供的信息读取：

- 只有文字：`inputs/text-input-expansion.md`
- 单张参考图：`inputs/single-image-reference.md`
- 多张参考图：`inputs/multi-image-reference.md`

三条路线互斥，只读取一份。

## 第二步：任务类型

继续读取：

- 成片生图、产品图、海报、封面、写真、概念图：`tasks/index.md`
- 整体图生图改写：`tasks/index.md`
- 局部替换、增删、修复或文字修改：`tasks/index.md`
- 参考图反推 Prompt：`tasks/index.md`
- 角色资产：`tasks/index.md`
- 场景资产：`tasks/index.md`
- 分镜资产：`tasks/index.md`
- 视频首帧、尾帧和关键帧：`tasks/index.md`

由 `tasks/index.md` 继续路由到唯一任务 Playbook。

## 第三步：控制规则

当任务缺少判断方法、协调规则或约束方式时，读取：

- `controls/index.md`

不要为了增加细节而默认加载控制页。只有某个维度真正影响结果时才下钻。

## 第四步：详细资料库

当任务需要选择具体妆容、发型、服装、场景、镜头方案、材质或效果时，读取：

- `libraries/index.md`

资料库提供“有哪些选项”，不代替任务 Playbook 和控制规则。

## 第五步：风格实现

当用户明确指定风格，或风格决定画面实现方式时，读取：

- `styles/index.md`

不要把风格词放在主体、空间和动作之前。

## 第六步：综合诊断

只有在以下情况读取：

- 用户反馈生成效果不好
- 多个维度同时失效
- 参考图之间存在冲突
- Prompt 过载或要求互相矛盾
- 无法从单一叶子 Reference 找到根因

入口：

- `diagnostics/index.md`

## 路由规则

- 索引只说明何时读取哪个文件，不摘抄叶子正文。
- 同一叶子 Reference 可以被多个索引引用，但物理文件只保留一份。
- 同一轮命中同一文件时只读取一次。
- 一个方向已经足够解决问题时，不继续加载相邻 Reference。
- 不一次性读取整个目录。
