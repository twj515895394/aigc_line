# 常见图像失败模式与负向约束选择

## 用途

当画面同时出现模板脸、塑料皮、伪抓拍、假景深、样板间空间或人体比例失真时，快速识别主故障，并只选择最相关的负向约束。

## 使用规则

- 先识别当前最危险的 1–2 个失败模式
- 每次只补最相关的 2–4 组限制
- 正向描述必须先成立，负向约束只负责纠偏
- 单一领域问题优先回到对应控制或资料 Reference

## 模板脸与网红脸

现象：五官趋同、妆感过重、轮廓过度锐化、像滤镜截图。

修复：增加真实五官比例、自然微表情和人物辨识锚点，减少“完美、绝美、精致脸”等抽象词。

可选限制：

- no influencer face
- no same-face beauty
- no heavy filter makeup
- no exaggerated contour
- no doll face

## 塑料皮与过度磨皮

现象：皮肤像蜡，纹理消失，高光和反射不自然。

修复：

- 从零生成时，不要只堆“真实皮肤”。按高光 → 光线 → 纹理的顺序检查，并把皮肤拆成纹理、高光位置、半哑光基调、轻微不完美和光线；
- 已有成片只是被磨平，按保真细节增强处理：同时写清允许增加的微观细节、必须锁定的身份与光影、以及油光 / 贴图 / 继续磨皮等排除项。

不要只补“增加毛孔”。那会变成一边加纹理、一边继续磨皮，或给整张脸贴一层均匀颗粒。

可选限制：

- no wax skin
- no plastic texture
- no over-smoothing
- no beauty filter

## 伪抓拍与摆拍感

现象：主体明显配合镜头、构图过于端正、动作像海报定格。

修复：补动作进行中状态、拍摄者站位和合理构图不完美。

可选限制：

- no posed fashion shoot
- no studio pose
- no direct camera-facing glamour pose
- no over-composed ad framing

## 假景深与假镜头感

现象：背景不合理地完全模糊、主体边缘像抠图、小空间出现夸张镜头分离。

修复：降低景深强度，恢复背景空间层次和真实边缘过渡。

可选限制：

- no fake bokeh
- no extreme depth blur
- no cutout-like edges
- no unrealistic lens separation

## 样板间与空洞空间

现象：场景干净到没有使用痕迹、道具密度不足、像展示空间。

修复：补空间用途、真实道具和普通照明。

可选限制：

- no showroom office
- no luxury mock office
- no empty staged workspace
- no sterile environment

## 人体比例与动作失真

现象：腰臀比不合理、弯腰拉长躯干、腿长和身体曲线过度夸张。

修复：补动作阶段、支撑点、重心、肩胯方向和自然比例。

可选限制：

- no exaggerated curves
- no distorted anatomy
- no impossible waist
- no fetish proportions

## 路由建议

- 真实感问题：`../controls/realism-quality/anti-ai-realism.md`
- 已有成片只缺皮肤微观细节：`../controls/realism-quality/fidelity-detail-enhancement.md`
- 抓拍构图：`../controls/composition-camera/candid-composition-imperfections.md`
- 侧颜和体态：`../controls/pose-action/side-profile-body-line.md`
- 办公空间：`../libraries/environment/office-workplace-environment.md`

## 校验

如果负向词删除后，正向 Prompt 仍然无法明确主体、场景、镜头、动作和光线，说明问题不在负向约束数量，而在正向结构尚未成立。
