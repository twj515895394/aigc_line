import type { ImageAspectRatio, VideoAspectRatio } from './ipc.types'

export interface MediaDimensions {
  width: number
  height: number
}

export const IMAGE_ASPECT_RATIOS: ImageAspectRatio[] = ['16:9', '9:16', '1:1', '4:3']
export const VIDEO_ASPECT_RATIOS: VideoAspectRatio[] = ['16:9', '9:16', '1:1', '4:3', '3:4']

/** Standard 2K still-image output dimensions. */
export const imageDimensionsFor = (ratio: ImageAspectRatio): MediaDimensions => {
  if (ratio === '9:16') return { width: 1152, height: 2048 }
  if (ratio === '1:1') return { width: 2048, height: 2048 }
  if (ratio === '4:3') return { width: 2048, height: 1536 }
  return { width: 2048, height: 1152 }
}

/** Seedream 5.0 Pro official 2K reference dimensions. */
export const seedreamImageDimensionsFor = (ratio: ImageAspectRatio): MediaDimensions => {
  if (ratio === '9:16') return { width: 1584, height: 2816 }
  if (ratio === '1:1') return { width: 2048, height: 2048 }
  if (ratio === '4:3') return { width: 2368, height: 1776 }
  return { width: 2816, height: 1584 }
}

/** MiniMax H3 0.98MP video dimensions; both sides are multiples of 32. */
export const videoDimensionsFor = (ratio: VideoAspectRatio): MediaDimensions => {
  if (ratio === '9:16') return { width: 768, height: 1344 }
  if (ratio === '1:1') return { width: 992, height: 992 }
  if (ratio === '4:3') return { width: 1152, height: 864 }
  if (ratio === '3:4') return { width: 864, height: 1152 }
  return { width: 1344, height: 768 }
}
