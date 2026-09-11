export interface GenerationGateNode {
  id: string
  data: {
    kind: string
    title: string
    sourcePath?: string
    generationStatus?: 'idle' | 'generating' | 'error'
    generationError?: string
  }
}

export interface GenerationGateEdge {
  source: string
  target: string
}

const UPSTREAM_MEDIA_KINDS: Record<string, true> = { image: true, video: true, audio: true }

/** Block downstream generate when a connected media node failed, is still busy, or has no output. */
export function blockedUpstreamGenerationMessage(
  targetNodeId: string,
  nodes: ReadonlyArray<GenerationGateNode>,
  edges: ReadonlyArray<GenerationGateEdge>,
): string | null {
  const byId = new Map(nodes.map((node) => [node.id, node]))
  const messages: string[] = []
  for (const edge of edges) {
    if (edge.target !== targetNodeId) continue
    const source = byId.get(edge.source)
    if (!source || !UPSTREAM_MEDIA_KINDS[source.data.kind]) continue
    const label = `上游节点「${source.data.title}」(${source.id})`
    if (source.data.generationStatus === 'error') {
      const detail = source.data.generationError?.trim()
      messages.push(detail ? `${label} 生成失败：${detail}` : `${label} 生成失败`)
      continue
    }
    if (source.data.generationStatus === 'generating') {
      messages.push(`${label} 仍在生成中，请等待完成后再继续`)
      continue
    }
    if (!source.data.sourcePath) {
      messages.push(`${label} 没有生成结果，不得继续生成本节点`)
    }
  }
  return messages.length > 0 ? `${messages.join('；')}。已停止后续生成。` : null
}
