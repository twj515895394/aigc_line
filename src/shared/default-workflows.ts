export const FALLBACK_IMAGE_WORKFLOW_ID = 'krea2-turbo-t2i'
export const FALLBACK_VIDEO_WORKFLOW_ID = 'minimax-h3-easy'

export interface DefaultWorkflowCandidate {
  id: string
  kind: string
  recommended?: boolean
}

export function pickDefaultWorkflowId(
  kind: 'text-to-image' | 'image-to-video',
  workflows: ReadonlyArray<DefaultWorkflowCandidate>,
  configuredId?: string,
): string {
  const ofKind = workflows.filter((workflow) => workflow.kind === kind)
  if (configuredId && ofKind.some((workflow) => workflow.id === configuredId)) return configuredId
  const recommended = ofKind.find((workflow) => workflow.recommended)
  if (recommended) return recommended.id
  return kind === 'image-to-video' ? FALLBACK_VIDEO_WORKFLOW_ID : FALLBACK_IMAGE_WORKFLOW_ID
}
