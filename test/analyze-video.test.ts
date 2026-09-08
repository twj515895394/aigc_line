import { afterEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  getRuntimeSettings: vi.fn(),
  analyzeVideoWithQwen: vi.fn(),
  analyzeVideoWithGemini: vi.fn(),
}))

vi.mock('../electron/main/services/settings.service', () => ({
  getRuntimeSettings: mocks.getRuntimeSettings,
}))

vi.mock('../electron/main/services/qwen-video-analysis.service', () => ({
  analyzeVideoWithQwen: mocks.analyzeVideoWithQwen,
}))

vi.mock('../electron/main/services/gemini-video-analysis.service', () => ({
  analyzeVideoWithGemini: mocks.analyzeVideoWithGemini,
}))

import { analyzeVideo } from '../electron/main/services/analyze-video.service'

describe('AnalyzeVideo provider routing', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('uses Qwen when the saved provider is qwen', async () => {
    mocks.getRuntimeSettings.mockResolvedValue({ videoAnalysisProvider: 'qwen' })
    mocks.analyzeVideoWithQwen.mockResolvedValue({
      model: 'qwen3.5-omni-plus',
      analysisText: 'qwen',
      reportPath: 'generated/analyses/a.md',
    })
    const result = await analyzeVideo('/project', 'uploads/clip.mp4', '反推镜头时间线')
    expect(result.model).toBe('qwen3.5-omni-plus')
    expect(mocks.analyzeVideoWithQwen).toHaveBeenCalledWith('/project', 'uploads/clip.mp4', '反推镜头时间线')
    expect(mocks.analyzeVideoWithGemini).not.toHaveBeenCalled()
  })

  it('uses Gemini reverse-proxy analysis model when the saved provider is gemini', async () => {
    mocks.getRuntimeSettings.mockResolvedValue({ videoAnalysisProvider: 'gemini' })
    mocks.analyzeVideoWithGemini.mockResolvedValue({
      model: 'gemini-3.7-flash-medium',
      analysisText: 'gemini',
      reportPath: 'generated/analyses/b.md',
    })
    const result = await analyzeVideo('/project', 'uploads/clip.mp4', '反推镜头时间线')
    expect(result.model).toBe('gemini-3.7-flash-medium')
    expect(mocks.analyzeVideoWithGemini).toHaveBeenCalledWith('/project', 'uploads/clip.mp4', '反推镜头时间线')
    expect(mocks.analyzeVideoWithQwen).not.toHaveBeenCalled()
  })
})
