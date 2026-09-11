import { describe, expect, it } from 'vitest'
import { blockedUpstreamGenerationMessage } from '../src/shared/generation-gate'

const image = (
  id: string,
  data: Partial<{ title: string; sourcePath?: string; generationStatus?: 'idle' | 'generating' | 'error'; generationError?: string }>,
) => ({
  id,
  data: { kind: 'image', title: data.title ?? id, ...data },
})

describe('blockedUpstreamGenerationMessage', () => {
  it('stops video generate when a connected image failed', () => {
    const message = blockedUpstreamGenerationMessage(
      'video-1',
      [
        image('img-1', { title: '角色底图', generationStatus: 'error', generationError: '模型不可用' }),
        { id: 'video-1', data: { kind: 'video', title: '片段1' } },
      ],
      [{ source: 'img-1', target: 'video-1' }],
    )

    expect(message).toContain('img-1')
    expect(message).toContain('角色底图')
    expect(message).toContain('模型不可用')
    expect(message).toContain('已停止后续生成')
  })

  it('stops when a connected image never produced sourcePath', () => {
    const message = blockedUpstreamGenerationMessage(
      'video-1',
      [
        image('img-1', { title: '首帧', generationStatus: 'idle' }),
        { id: 'video-1', data: { kind: 'video', title: '片段1' } },
      ],
      [{ source: 'img-1', target: 'video-1' }],
    )

    expect(message).toContain('没有生成结果')
  })

  it('allows video generate when upstream images succeeded', () => {
    expect(blockedUpstreamGenerationMessage(
      'video-1',
      [
        image('img-1', { title: '首帧', sourcePath: 'generated/images/a.png', generationStatus: 'idle' }),
        { id: 'video-1', data: { kind: 'video', title: '片段1' } },
      ],
      [{ source: 'img-1', target: 'video-1' }],
    )).toBeNull()
  })

  it('allows text-to-video when no media is connected', () => {
    expect(blockedUpstreamGenerationMessage(
      'video-1',
      [{ id: 'video-1', data: { kind: 'video', title: '文生视频' } }],
      [],
    )).toBeNull()
  })
})
