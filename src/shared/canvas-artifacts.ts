import type { Artifact, CanvasNodeSnapshot, CanvasPoint, CanvasNodeKind } from './ipc.types';

const normalizePath = (value?: string) => value?.replace(/\\/g, '/');

/** Keep source-file identity, node placement and user connections across re-push/reload. */
export function syncCanvasArtifacts<T extends CanvasNodeSnapshot>(
  nodes: T[], artifacts: Artifact[], dismissed: Record<string, number>,
  create: (kind: CanvasNodeKind, index: number, position: CanvasPoint) => T,
  place: (nodes: T[], width: number) => CanvasPoint,
): T[] {
  let result = nodes;
  for (const artifact of artifacts) {
    if (artifact.type !== 'image' || (dismissed[artifact.id] ?? -1) >= artifact.timestamp) continue;
    const kind = 'image';
    const index = result.findIndex(node => node.data.artifactId === artifact.id || (
      !!node.data.artifactId && !!artifact.path && normalizePath(node.data.sourcePath) === normalizePath(artifact.path)
    ));
    const existing = index < 0 ? undefined : result[index];
    // Replaying history must not overwrite later user edits (such as the title).
    if (existing && (existing.data.artifactUpdatedAt ?? -1) >= artifact.timestamp) continue;
    const base = existing ?? create(kind, result.length + 1, place(result, 620));
    const next: T = { ...base, data: {
      ...base.data, kind, title: artifact.title, artifactId: artifact.id,
      artifactUpdatedAt: artifact.timestamp, sourcePath: artifact.path,
      preview: artifact.content,
    } };
    if (result === nodes) result = [...nodes];
    if (index < 0) result.push(next); else result[index] = next;
  }
  return result;
}

/** Preserve legacy document payloads in chat before removing their canvas nodes. */
export function migrateCanvasDocuments(value: unknown): { snapshot: Record<string, unknown>; artifacts: Artifact[] } | null {
  if (!value || typeof value !== 'object') return null;
  const snapshot = value as Record<string, unknown>;
  if (!Array.isArray(snapshot.nodes) || !Array.isArray(snapshot.edges)) return null;
  const documents = snapshot.nodes.filter(node => node?.data?.kind === 'document');
  if (!documents.length) return null;
  const artifacts = documents.map((node): Artifact => {
    const data = node.data;
    if (typeof node.id !== 'string' || typeof data.title !== 'string' || typeof data.document?.content !== 'string'
      || !['markdown', 'html'].includes(data.document.format)) throw new Error('旧文档产物格式不正确，已保留原画布');
    return {
      id: typeof data.artifactId === 'string' ? data.artifactId : `legacy-document-${node.id}`,
      type: data.document.format, title: data.title, content: data.document.content,
      width: 640, height: 420,
      path: typeof data.sourcePath === 'string' ? data.sourcePath : undefined,
      timestamp: typeof data.artifactUpdatedAt === 'number' && Number.isFinite(data.artifactUpdatedAt) ? data.artifactUpdatedAt : 0,
    };
  });
  const removed = new Set(documents.map(node => node.id));
  return { artifacts, snapshot: { ...snapshot,
    nodes: snapshot.nodes.filter(node => !removed.has(node?.id)),
    edges: snapshot.edges.filter(edge => !removed.has(edge?.source) && !removed.has(edge?.target)),
  } };
}
