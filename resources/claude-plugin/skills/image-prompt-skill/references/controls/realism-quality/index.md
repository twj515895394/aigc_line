# Realism & Quality Controls

当任务需要提升真实感、自然感、生活化质感、材质可信度或降低 AI 痕迹时读取本分类。

静态图片只有在目标是自然照片、真实生活状态、可信材质或去 AI 感时，才进入本分类；商业洁净展示、商业精修和写实 CGI 仍由对应任务与风格控制理想化程度。

## 去 AI 感与真实照片控制

当用户要求“看不出是 AI”“像真实照片”“像手机或相机真实拍出来”，或需要压制塑料皮、假景深和商业精修感时，读取：

- `anti-ai-realism.md`

从文字或整体改写生成近景人像、需要把「真实皮肤」拆成纹理 / 高光位置 / 半哑光基调时，也读这一页，不要另开皮肤资料库。写实真人的角色设计图、四区板、三视图和头像同样读取这一页，不改走保真编辑。

## 保真细节增强

当已有成片的人物、构图和光影已经成立，只需要补皮肤微观纹理、去磨皮、去塑料感或提高有效分辨率，且其他内容必须保持不变时，读取：

- `fidelity-detail-enhancement.md`

## 路由边界

- 从文字或整体改写生成真实照片 → `anti-ai-realism.md`
- 已有成片只补微观细节 → `fidelity-detail-enhancement.md`
- 构图偏移、裁切和遮挡 → `../composition-camera/candid-composition-imperfections.md`
- 办公室机位 → `../composition-camera/office-candid-camera.md`
- 办公室混合光 → `../lighting-color/office-mixed-light.md`
- 多领域故障诊断 → `../../diagnostics/common-image-failure-patterns.md`

本分类保存真实感控制方法，不保存具体场景和服装资料。默认不要把上述两份真实感叶子同时加载。
