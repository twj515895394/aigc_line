# Inputs Index

输入层只负责理解用户提供的信息，不负责决定最终任务输出。

三条输入路线互斥，每次只读取一份。

## 只有文字

当用户没有提供参考图时，读取：

- `text-input-expansion.md`

## 单张参考图

当用户提供一张参考图时，读取：

- `single-image-reference.md`

## 多张参考图

当用户提供两张或以上参考图时，读取：

- `multi-image-reference.md`

多图不能按多次单图分析简单叠加，必须建立参考职责和冲突优先级。
