import { ipcMain } from 'electron'
import { IPC_CHANNELS } from '../../../src/shared/ipc.channels'
import type { ListReverseProxyModelsRequest, SaveAppSettingsRequest, TestGoogleAiConnectionRequest, TestQwenConnectionRequest, TestReverseProxyConnectionRequest, TestSeedreamConnectionRequest } from '../../../src/shared/ipc.types'
import {
  getAppSettingsView,
  saveAppSettings,
  testComfyUIConnection,
  testGoogleAiConnection,
  testQwenConnection,
  testSeedreamConnection,
} from '../services/settings.service'
import { listGeminiModels, testGeminiConnection } from '../services/gemini-proxy.service'
import { listGptGrokModels, testGptGrokConnection } from '../services/gpt-grok-proxy.service'

export function registerSettingsHandlers(): void {
  ipcMain.handle(IPC_CHANNELS.settings.get, () => getAppSettingsView())
  ipcMain.handle(
    IPC_CHANNELS.settings.save,
    (_event, request: SaveAppSettingsRequest) => saveAppSettings(request),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.testComfyUI,
    (_event, baseUrl: string) => testComfyUIConnection(baseUrl),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.testQwen,
    (_event, request: TestQwenConnectionRequest) => testQwenConnection(request),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.testGoogleAi,
    (_event, request: TestGoogleAiConnectionRequest) => testGoogleAiConnection(request),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.testSeedream,
    (_event, request: TestSeedreamConnectionRequest) => testSeedreamConnection(request),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.testGemini,
    (_event, request: TestReverseProxyConnectionRequest) => testGeminiConnection(request),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.listGeminiModels,
    (_event, request: ListReverseProxyModelsRequest) => listGeminiModels(request),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.testGptGrok,
    (_event, request: TestReverseProxyConnectionRequest) => testGptGrokConnection(request),
  )
  ipcMain.handle(
    IPC_CHANNELS.settings.listGptGrokModels,
    (_event, request: ListReverseProxyModelsRequest) => listGptGrokModels(request),
  )
}
