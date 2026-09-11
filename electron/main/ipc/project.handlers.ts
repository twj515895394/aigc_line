import { ipcMain, dialog, shell } from 'electron';
import fs from 'node:fs/promises';
import path from 'node:path';
import log from 'electron-log/main';
import { IPC_CHANNELS } from '../../../src/shared/ipc.channels';
import {
  createProject,
  listProjects,
  loadProject,
  deleteProject,
  setLastOpened,
  readManifest,
} from '../services/project.store';
import { importProjectMediaFiles, listProjectMediaAssets } from '../services/project-media.service';
import { isPathInsideFolder } from '../services/workspace-path';

export function registerProjectHandlers(): void {
  ipcMain.handle(
    IPC_CHANNELS.project.create,
    async (_event, name: string, folderPath: string, agent: unknown) => {
      return createProject(name, folderPath, agent);
    },
  );

  ipcMain.handle(IPC_CHANNELS.project.list, async () => {
    return listProjects();
  });

  ipcMain.handle(IPC_CHANNELS.project.load, async (_event, id: string) => {
    const project = await loadProject(id);
    if (project) {
      await setLastOpened(id);
    }
    return project;
  });

  ipcMain.handle(IPC_CHANNELS.project.delete, async (_event, id: string) => {
    await deleteProject(id);
  });

  ipcMain.handle(IPC_CHANNELS.project.importAudio, async (_event, projectId: string) => {
    try {
      const project = await loadProject(projectId);
      if (!project) return { success: false, error: '项目不存在或已被删除' };
      const result = await dialog.showOpenDialog({
        title: '选择本地音频',
        properties: ['openFile'],
        filters: [
          { name: '音频文件', extensions: ['mp3', 'wav', 'm4a', 'flac', 'ogg', 'aac'] },
        ],
      });
      if (result.canceled || !result.filePaths[0]) return { success: false, canceled: true };

      const sourcePath = path.resolve(result.filePaths[0]);
      const extension = path.extname(sourcePath).toLowerCase();
      if (!['.mp3', '.wav', '.m4a', '.flac', '.ogg', '.aac'].includes(extension)) {
        return { success: false, error: '不支持的音频格式' };
      }
      const destinationDir = path.join(project.folderPath, 'uploads', 'audio');
      await fs.mkdir(destinationDir, { recursive: true });
      const originalName = path.basename(sourcePath);
      const safeBase = path.basename(originalName, extension).replace(/[^\p{L}\p{N}._-]+/gu, '-').slice(0, 80) || 'audio';
      const destinationPath = path.join(destinationDir, `${Date.now()}-${safeBase}${extension}`);
      await fs.copyFile(sourcePath, destinationPath);
      return {
        success: true,
        name: originalName,
        relativePath: path.relative(project.folderPath, destinationPath).split(path.sep).join('/'),
      };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  });

  ipcMain.handle(IPC_CHANNELS.project.importMedia, async (_event, projectId: string) => {
    try {
      const result = await dialog.showOpenDialog({
        title: '上传图片、视频或音频到画布',
        properties: ['openFile', 'multiSelections'],
        filters: [
          { name: '媒体文件', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'avif', 'mp4', 'webm', 'mov', 'mp3', 'wav', 'm4a', 'flac', 'ogg', 'aac'] },
          { name: '图片', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'avif'] },
          { name: '视频', extensions: ['mp4', 'webm', 'mov'] },
          { name: '音频', extensions: ['mp3', 'wav', 'm4a', 'flac', 'ogg', 'aac'] },
        ],
      });
      if (result.canceled || result.filePaths.length === 0) {
        return { success: false, canceled: true, assets: [] };
      }
      return { success: true, assets: await importProjectMediaFiles(projectId, result.filePaths) };
    } catch (error) {
      return { success: false, assets: [], error: error instanceof Error ? error.message : String(error) };
    }
  });

  ipcMain.handle(IPC_CHANNELS.project.listMedia, async (_event, projectId: string) => {
    try {
      return { success: true, assets: await listProjectMediaAssets(projectId) };
    } catch (error) {
      return { success: false, assets: [], error: error instanceof Error ? error.message : String(error) };
    }
  });

  ipcMain.handle('manifest:read', async (_event, folderPath: string) => {
    return readManifest(folderPath);
  });

  ipcMain.handle('dialog:showOpenDialog', async (_event, options) => {
    const result = await dialog.showOpenDialog({
      ...options,
      properties: ['openDirectory'],
    });
    return result.filePaths;
  });

  ipcMain.handle(IPC_CHANNELS.project.showItemInFolder, async (_event, filePath: string) => {
    try {
      log.info('[reveal-in-folder] request', filePath);
      if (typeof filePath !== 'string' || !filePath.trim()) {
        log.warn('[reveal-in-folder] invalid path');
        return { success: false, error: '路径无效' };
      }
      const target = path.resolve(filePath.trim());
      const index = await listProjects();
      const allowed = index.projects.some((project) => isPathInsideFolder(target, project.folderPath));
      log.info('[reveal-in-folder] resolved', { target, allowed, projectCount: index.projects.length });
      if (!allowed) {
        log.warn('[reveal-in-folder] rejected: not in registered project');
        return { success: false, error: '只能打开已登记项目内的文件' };
      }
      try {
        await fs.access(target);
        log.info('[reveal-in-folder] showItemInFolder', target);
        shell.showItemInFolder(target);
        return { success: true };
      } catch {
        const directory = path.dirname(target);
        if (!index.projects.some((project) => isPathInsideFolder(directory, project.folderPath))) {
          log.warn('[reveal-in-folder] missing file and parent not in project', { target, directory });
          return { success: false, error: '文件不存在' };
        }
        log.info('[reveal-in-folder] file missing, openPath', directory);
        const opened = await shell.openPath(directory);
        if (opened) {
          log.warn('[reveal-in-folder] openPath failed', opened);
          return { success: false, error: opened };
        }
        return { success: true };
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      log.error('[reveal-in-folder] threw', message);
      return { success: false, error: message };
    }
  });
}
