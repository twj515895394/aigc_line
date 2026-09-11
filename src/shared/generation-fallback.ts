export type WorkflowFallbackRole = 'default' | 'fallback-1' | 'fallback-2'

export interface WorkflowFallbackCandidate {
  id: string
  kind: string
  recommended?: boolean
  role?: WorkflowFallbackRole
}

export interface WorkflowFallbackSlot {
  id: string
  note: string
}

export function normalizeWorkflowFallbackSlots(
  defaultId: string,
  value?: Array<{ id?: string; note?: string } | null> | null,
): WorkflowFallbackSlot[] {
  const seen = new Set<string>(defaultId.trim() ? [defaultId.trim()] : [])
  const slots: WorkflowFallbackSlot[] = []
  for (const item of value ?? []) {
    const id = item?.id?.trim() ?? ''
    if (!id || seen.has(id)) continue
    seen.add(id)
    slots.push({ id, note: (item?.note ?? '').trim().slice(0, 40) })
    if (slots.length === 2) break
  }
  return slots
}

export function workflowFallbackChain(
  kind: 'text-to-image' | 'image-to-video',
  workflows: ReadonlyArray<WorkflowFallbackCandidate>,
  currentId?: string,
): string[] {
  const ofKind = workflows.filter((workflow) => workflow.kind === kind)
  const defaultId = ofKind.find((workflow) => workflow.role === 'default' || workflow.recommended)?.id
  const fallback1 = ofKind.find((workflow) => workflow.role === 'fallback-1')?.id
  const fallback2 = ofKind.find((workflow) => workflow.role === 'fallback-2')?.id
  const chain = [defaultId, fallback1, fallback2].filter((id, index, list): id is string => !!id && list.indexOf(id) === index)
  const current = currentId?.trim() ?? ''
  if (!current) return chain
  const index = chain.indexOf(current)
  if (index < 0) return [current]
  return chain.slice(index)
}

export const GENERATION_ATTEMPTS_PER_MODEL = 3

export function isHardStopGenerationError(message: string): boolean {
  return /提交结果未知|未确认的生成任务|请先输入|不允许的内容|敏感|只读构图|请从候选素材|最多放入/.test(message)
}

export function isRetryableGenerationError(message: string): boolean {
  return !isHardStopGenerationError(message)
}

export async function runGenerationFallbackChain(options: {
  chain: string[]
  run: (workflowId: string) => Promise<void>
  onSwitch?: (workflowId: string, previousError: string) => void
  onRetry?: (workflowId: string, attempt: number, previousError: string) => void
}): Promise<void> {
  let lastError = ''
  for (let index = 0; index < options.chain.length; index++) {
    const workflowId = options.chain[index]
    if (index > 0) options.onSwitch?.(workflowId, lastError)
    for (let attempt = 1; attempt <= GENERATION_ATTEMPTS_PER_MODEL; attempt++) {
      try {
        await options.run(workflowId)
        return
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error)
        if (isHardStopGenerationError(lastError)) throw new Error(lastError)
        if (attempt < GENERATION_ATTEMPTS_PER_MODEL) {
          options.onRetry?.(workflowId, attempt + 1, lastError)
          continue
        }
      }
    }
    if (index === options.chain.length - 1) throw new Error(lastError)
  }
}

export function workflowRoleLabel(name: string, role?: WorkflowFallbackRole, note?: string): string {
  if (role === 'default') return `${name}（设置默认）`
  if (role === 'fallback-1') return note ? `${name}（备用1：${note}）` : `${name}（备用1）`
  if (role === 'fallback-2') return note ? `${name}（备用2：${note}）` : `${name}（备用2）`
  return name
}
