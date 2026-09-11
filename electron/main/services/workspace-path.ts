import path from 'node:path';

export function isPathInsideFolder(filePath: string, folderPath: string): boolean {
  if (!filePath.trim() || !folderPath.trim()) return false;
  const target = path.resolve(filePath.trim());
  const root = path.resolve(folderPath.trim());
  const comparable = process.platform === 'win32'
    ? { file: target.toLowerCase(), root: root.toLowerCase() }
    : { file: target, root };
  return comparable.file === comparable.root
    || comparable.file.startsWith(`${comparable.root}${path.sep}`);
}
