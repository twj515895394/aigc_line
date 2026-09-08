import { getRuntimeSettings } from './settings.service'
import { analyzeVideoWithGemini } from './gemini-video-analysis.service'
import { analyzeVideoWithQwen, type AnalyzeVideoResult } from './qwen-video-analysis.service'

/** Route audiovisual analysis to the provider saved in settings. Never silent-fallback. */
export async function analyzeVideo(
  folderPath: string,
  videoInput: string,
  analysisRequest: string,
): Promise<AnalyzeVideoResult> {
  const settings = await getRuntimeSettings()
  if (settings.videoAnalysisProvider === 'gemini') {
    return analyzeVideoWithGemini(folderPath, videoInput, analysisRequest)
  }
  return analyzeVideoWithQwen(folderPath, videoInput, analysisRequest)
}
