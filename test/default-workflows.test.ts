import { describe, expect, it } from 'vitest'
import { FALLBACK_IMAGE_WORKFLOW_ID, FALLBACK_VIDEO_WORKFLOW_ID, pickDefaultWorkflowId } from '../src/shared/default-workflows'

const workflows = [
  { id: 'seedream-5.0-pro', kind: 'text-to-image' },
  { id: 'krea2-turbo-t2i', kind: 'text-to-image', recommended: true },
  { id: 'z-image-turbo-t2i', kind: 'text-to-image' },
  { id: 'minimax-h3-easy', kind: 'image-to-video', recommended: true },
  { id: 'seedance-2.0', kind: 'image-to-video' },
]

describe('pickDefaultWorkflowId', () => {
  it('prefers the settings default over Seedream when creating image nodes', () => {
    expect(pickDefaultWorkflowId('text-to-image', workflows)).toBe('krea2-turbo-t2i')
    expect(pickDefaultWorkflowId('text-to-image', workflows, 'krea2-turbo-t2i')).toBe('krea2-turbo-t2i')
  })

  it('uses the configured id when it exists in the live list', () => {
    expect(pickDefaultWorkflowId('text-to-image', workflows, 'z-image-turbo-t2i')).toBe('z-image-turbo-t2i')
  })

  it('ignores a configured id that is not in the live list', () => {
    expect(pickDefaultWorkflowId('text-to-image', workflows, 'missing-model')).toBe('krea2-turbo-t2i')
  })

  it('picks the recommended video workflow instead of Seedance', () => {
    expect(pickDefaultWorkflowId('image-to-video', workflows)).toBe('minimax-h3-easy')
  })

  it('falls back when the list is empty', () => {
    expect(pickDefaultWorkflowId('text-to-image', [])).toBe(FALLBACK_IMAGE_WORKFLOW_ID)
    expect(pickDefaultWorkflowId('image-to-video', [])).toBe(FALLBACK_VIDEO_WORKFLOW_ID)
  })
})
