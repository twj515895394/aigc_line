import { expect, it } from 'vitest';
import { syncCanvasArtifacts } from '../src/shared/canvas-artifacts';
import type { Artifact, CanvasNodeSnapshot } from '../src/shared/ipc.types';

const artifact: Artifact = { id: 'artifact-1', type: 'image', title: '图片', path: 'image.png', content: 'workspace://p/image.png?v=1', width: 640, height: 420, timestamp: 1 };
const sync = (nodes: CanvasNodeSnapshot[], items: Artifact[], dismissed = {}) => syncCanvasArtifacts(nodes, items, dismissed,
  (kind, index, position) => ({ id: `node-${index}`, type: 'storyNode', position, data: { kind, title: '' } }), () => ({ x: 10, y: 20 }));

it('keeps document artifacts out of the canvas, including re-push and historical replay', () => {
  const nodes = sync([], [artifact]);
  expect(sync(nodes, [{ ...artifact, type: 'markdown', id: 'report', content: '# 报告' }])).toBe(nodes);
  expect(sync(nodes, [{ ...artifact, type: 'html', id: 'html', content: '<h1>报告</h1>' }])).toBe(nodes);
});

it('does not loop on identical updates or resurrect deleted historical artifacts', () => {
  const nodes = sync([], [artifact]);
  expect(sync(nodes, [artifact])).toBe(nodes);
  nodes[0].data.title = '用户修改的标题';
  expect(sync(nodes, [artifact])).toBe(nodes);
  expect(nodes[0].data.title).toBe('用户修改的标题');
  expect(sync([], [artifact], { 'artifact-1': 1 })).toEqual([]);
  expect(sync([], [{ ...artifact, timestamp: 2 }], { 'artifact-1': 1 })).toHaveLength(1);
});

it('updates existing image previews and accepts historical path separators', () => {
  const image = { ...artifact, type: 'image' as const, path: 'images/a.png', content: 'workspace://p/images/a.png?v=1' };
  const nodes = sync([], [image]);
  nodes[0].data.sourcePath = 'images\\a.png';
  const result = sync(nodes, [{ ...image, id: 'new-id', timestamp: 2, content: 'workspace://p/images/a.png?v=2' }]);
  expect(result).toHaveLength(1);
  expect(result[0].data.preview).toContain('v=2');
  expect(result[0].data.document).toBeUndefined();
});
