import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AppSettingsView, ComfyWorkflowInfo, VideoAnalysisProvider, WorkflowFallbackSlot } from '../shared/ipc.types';
import { normalizeWorkflowFallbackSlots } from '../shared/generation-fallback';
import { useAppStore } from '../stores/app.store';
import { clearCachedComfyWorkflows, listCachedComfyWorkflows } from '../shared/comfy-workflows';
import { registerEditFlusher } from '../shared/pending-edits';
import { GeminiProxySettingsCard } from './GeminiProxySettingsCard';
import { GptGrokProxySettingsCard } from './GptGrokProxySettingsCard';
import { workflowTypeLabel } from '../shared/reverse-proxy-workflows';

const fieldClass = 'w-full rounded-lg border border-white/[0.1] bg-[#09090e] px-3.5 py-3 text-sm text-[#e8e6df] outline-none transition placeholder:text-[#4f4c59] focus:border-[#d4af37]/60 focus:ring-2 focus:ring-[#d4af37]/10';
const DEFAULT_QWEN_BASE_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
const DEFAULT_SEEDREAM_BASE_URL = 'https://ark.cn-beijing.volces.com/api/v3';

function hasQwenSettingsSupport(settings: AppSettingsView): boolean {
  return typeof settings.qwenBaseUrl === 'string'
    && typeof settings.qwenApiKey === 'string'
    && typeof settings.qwenApiKeyConfigured === 'boolean';
}

function hasGeminiSettingsSupport(settings: AppSettingsView): boolean {
  return (settings.videoAnalysisProvider === 'qwen' || settings.videoAnalysisProvider === 'gemini')
    && typeof settings.geminiBaseUrl === 'string'
    && typeof settings.geminiApiKey === 'string'
    && typeof settings.geminiApiKeyConfigured === 'boolean'
    && typeof settings.geminiAnalysisModelId === 'string'
    && Array.isArray(settings.geminiEnabledImageModelIds);
}

function hasGptGrokSettingsSupport(settings: AppSettingsView): boolean {
  return typeof settings.gptGrokBaseUrl === 'string'
    && typeof settings.gptGrokApiKey === 'string'
    && typeof settings.gptGrokApiKeyConfigured === 'boolean'
    && Array.isArray(settings.gptGrokEnabledImageModelIds)
    && Array.isArray(settings.gptGrokEnabledVideoModelIds);
}

function hasSeedreamSettingsSupport(settings: AppSettingsView): boolean {
  return typeof settings.seedreamBaseUrl === 'string'
    && typeof settings.seedreamApiKey === 'string'
    && typeof settings.seedreamApiKeyConfigured === 'boolean';
}

function hasDefaultVideoSettingsSupport(settings: AppSettingsView): boolean {
  return typeof settings.defaultVideoWorkflowId === 'string'
}

function hasFallbackWorkflowSettingsSupport(settings: AppSettingsView): boolean {
  return Array.isArray(settings.fallbackImageWorkflows) && Array.isArray(settings.fallbackVideoWorkflows)
}

function sameIdList(left: string[], right: string[]): boolean {
  return left.join('\n') === right.join('\n');
}

export function SettingsPage() {
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const [workflows, setWorkflows] = useState<ComfyWorkflowInfo[]>([]);
  const [savedSettings, setSavedSettings] = useState<AppSettingsView | null>(null);
  const [comfyuiBaseUrl, setComfyuiBaseUrl] = useState('http://127.0.0.1:8188');
  const [qwenBaseUrl, setQwenBaseUrl] = useState(DEFAULT_QWEN_BASE_URL);
  const [qwenApiKey, setQwenApiKey] = useState('');
  const [showQwenApiKey, setShowQwenApiKey] = useState(false);
  const [clearQwenApiKey, setClearQwenApiKey] = useState(false);
  const [videoAnalysisProvider, setVideoAnalysisProvider] = useState<VideoAnalysisProvider>('qwen');
  const [geminiBaseUrl, setGeminiBaseUrl] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [clearGeminiApiKey, setClearGeminiApiKey] = useState(false);
  const [geminiAnalysisModelId, setGeminiAnalysisModelId] = useState('');
  const [geminiEnabledImageModelIds, setGeminiEnabledImageModelIds] = useState<string[]>([]);
  const [gptGrokBaseUrl, setGptGrokBaseUrl] = useState('');
  const [gptGrokApiKey, setGptGrokApiKey] = useState('');
  const [clearGptGrokApiKey, setClearGptGrokApiKey] = useState(false);
  const [gptGrokEnabledImageModelIds, setGptGrokEnabledImageModelIds] = useState<string[]>([]);
  const [gptGrokEnabledVideoModelIds, setGptGrokEnabledVideoModelIds] = useState<string[]>([]);
  const [seedreamBaseUrl, setSeedreamBaseUrl] = useState(DEFAULT_SEEDREAM_BASE_URL);
  const [seedreamApiKey, setSeedreamApiKey] = useState('');
  const [showSeedreamApiKey, setShowSeedreamApiKey] = useState(false);
  const [clearSeedreamApiKey, setClearSeedreamApiKey] = useState(false);
  const [defaultImageWorkflowId, setDefaultImageWorkflowId] = useState('krea2-turbo-t2i');
  const [defaultVideoWorkflowId, setDefaultVideoWorkflowId] = useState('minimax-h3-easy');
  const [fallbackImageWorkflows, setFallbackImageWorkflows] = useState<WorkflowFallbackSlot[]>([]);
  const [fallbackVideoWorkflows, setFallbackVideoWorkflows] = useState<WorkflowFallbackSlot[]>([]);
  const [servicesOpen, setServicesOpen] = useState(true);
  const [defaultsOpen, setDefaultsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testingQwen, setTestingQwen] = useState(false);
  const [testingSeedream, setTestingSeedream] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [qwenTestResult, setQwenTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [seedreamTestResult, setSeedreamTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [notice, setNotice] = useState('');
  const [leaveOpen, setLeaveOpen] = useState(false);
  const dirty = !!savedSettings && (
    comfyuiBaseUrl !== savedSettings.comfyuiBaseUrl || qwenBaseUrl !== savedSettings.qwenBaseUrl
    || qwenApiKey !== savedSettings.qwenApiKey || seedreamBaseUrl !== savedSettings.seedreamBaseUrl
    || seedreamApiKey !== savedSettings.seedreamApiKey || defaultImageWorkflowId !== savedSettings.defaultImageWorkflowId
    || defaultVideoWorkflowId !== savedSettings.defaultVideoWorkflowId
    || JSON.stringify(fallbackImageWorkflows) !== JSON.stringify(savedSettings.fallbackImageWorkflows ?? [])
    || JSON.stringify(fallbackVideoWorkflows) !== JSON.stringify(savedSettings.fallbackVideoWorkflows ?? [])
    || videoAnalysisProvider !== savedSettings.videoAnalysisProvider
    || geminiBaseUrl !== savedSettings.geminiBaseUrl
    || geminiApiKey !== savedSettings.geminiApiKey
    || geminiAnalysisModelId !== savedSettings.geminiAnalysisModelId
    || !sameIdList(geminiEnabledImageModelIds, savedSettings.geminiEnabledImageModelIds)
    || gptGrokBaseUrl !== savedSettings.gptGrokBaseUrl
    || gptGrokApiKey !== savedSettings.gptGrokApiKey
    || !sameIdList(gptGrokEnabledImageModelIds, savedSettings.gptGrokEnabledImageModelIds)
    || !sameIdList(gptGrokEnabledVideoModelIds, savedSettings.gptGrokEnabledVideoModelIds)
    || clearQwenApiKey || clearGeminiApiKey || clearGptGrokApiKey || clearSeedreamApiKey
  );
  useEffect(() => registerEditFlusher(async () => {
    if (dirty) throw new Error('系统配置有未保存修改，请先保存配置或返回时放弃修改。');
  }, 5), [dirty]);

  useEffect(() => {
    Promise.all([window.electronAPI.getAppSettings(), listCachedComfyWorkflows(true)])
      .then(([settings, availableWorkflows]) => {
        const qwenSettingsSupported = hasQwenSettingsSupport(settings);
        const geminiSettingsSupported = hasGeminiSettingsSupport(settings);
        const gptGrokSettingsSupported = hasGptGrokSettingsSupport(settings);
        const seedreamSettingsSupported = hasSeedreamSettingsSupport(settings);
        setSavedSettings(settings);
        setComfyuiBaseUrl(settings.comfyuiBaseUrl);
        setQwenBaseUrl(qwenSettingsSupported ? settings.qwenBaseUrl : DEFAULT_QWEN_BASE_URL);
        setQwenApiKey(qwenSettingsSupported ? settings.qwenApiKey : '');
        setVideoAnalysisProvider(geminiSettingsSupported ? settings.videoAnalysisProvider : 'qwen');
        setGeminiBaseUrl(geminiSettingsSupported ? settings.geminiBaseUrl : '');
        setGeminiApiKey(geminiSettingsSupported ? settings.geminiApiKey : '');
        setGeminiAnalysisModelId(geminiSettingsSupported ? settings.geminiAnalysisModelId : '');
        setGeminiEnabledImageModelIds(geminiSettingsSupported ? settings.geminiEnabledImageModelIds : []);
        setGptGrokBaseUrl(gptGrokSettingsSupported ? settings.gptGrokBaseUrl : '');
        setGptGrokApiKey(gptGrokSettingsSupported ? settings.gptGrokApiKey : '');
        setGptGrokEnabledImageModelIds(gptGrokSettingsSupported ? settings.gptGrokEnabledImageModelIds : []);
        setGptGrokEnabledVideoModelIds(gptGrokSettingsSupported ? settings.gptGrokEnabledVideoModelIds : []);
        setSeedreamBaseUrl(seedreamSettingsSupported ? settings.seedreamBaseUrl : DEFAULT_SEEDREAM_BASE_URL);
        setSeedreamApiKey(seedreamSettingsSupported ? settings.seedreamApiKey : '');
        setDefaultImageWorkflowId(settings.defaultImageWorkflowId);
        setDefaultVideoWorkflowId(hasDefaultVideoSettingsSupport(settings) ? settings.defaultVideoWorkflowId : 'minimax-h3-easy');
        setFallbackImageWorkflows(hasFallbackWorkflowSettingsSupport(settings) ? settings.fallbackImageWorkflows : []);
        setFallbackVideoWorkflows(hasFallbackWorkflowSettingsSupport(settings) ? settings.fallbackVideoWorkflows : []);
        setWorkflows(availableWorkflows);
        if (!qwenSettingsSupported || !geminiSettingsSupported || !gptGrokSettingsSupported || !seedreamSettingsSupported || !hasDefaultVideoSettingsSupport(settings) || !hasFallbackWorkflowSettingsSupport(settings)) {
          setNotice('检测到 Electron 主进程仍是旧版本，新配置暂时无法保存。请完全退出应用后重新启动。');
        }
      })
      .catch((error) => setNotice(error instanceof Error ? error.message : '设置加载失败，请重试'))
      .finally(() => setLoading(false));
  }, []);

  const textToImageWorkflows = useMemo(
    () => workflows.filter((workflow) => workflow.kind === 'text-to-image'),
    [workflows],
  );

  const imageToVideoWorkflows = useMemo(
    () => workflows.filter((workflow) => workflow.kind === 'image-to-video'),
    [workflows],
  );

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      setTestResult(await window.electronAPI.testComfyUIConnection(comfyuiBaseUrl));
    } catch (error) {
      setTestResult({ success: false, message: error instanceof Error ? error.message : '连接测试失败' });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setNotice('');
    try {
      await window.electronAPI.saveAppSettings({
        comfyuiBaseUrl,
        qwenBaseUrl,
        defaultImageWorkflowId,
        defaultVideoWorkflowId,
        fallbackImageWorkflows,
        fallbackVideoWorkflows,
        qwenApiKey: qwenApiKey.trim() || undefined,
        clearQwenApiKey,
        seedreamBaseUrl,
        seedreamApiKey: seedreamApiKey.trim() || undefined,
        clearSeedreamApiKey,
        videoAnalysisProvider,
        geminiBaseUrl,
        geminiApiKey: geminiApiKey.trim() || undefined,
        clearGeminiApiKey,
        geminiAnalysisModelId,
        geminiEnabledImageModelIds,
        gptGrokBaseUrl,
        gptGrokApiKey: gptGrokApiKey.trim() || undefined,
        clearGptGrokApiKey,
        gptGrokEnabledImageModelIds,
        gptGrokEnabledVideoModelIds,
      });
      const next = await window.electronAPI.getAppSettings();
      if (!hasQwenSettingsSupport(next)) {
        throw new Error('Electron 主进程仍是旧版本，未接收 Qwen 配置。请完全退出应用后重新启动，再重新保存。');
      }
      if (!hasGeminiSettingsSupport(next)) {
        throw new Error('Electron 主进程仍是旧版本，未接收 Gemini 配置。请完全退出应用后重新启动，再重新保存。');
      }
      if (!hasGptGrokSettingsSupport(next)) {
        throw new Error('Electron 主进程仍是旧版本，未接收 GPT / Grok 配置。请完全退出应用后重新启动，再重新保存。');
      }
      if (!hasSeedreamSettingsSupport(next)) {
        throw new Error('Electron 主进程仍是旧版本，未接收 Seedream 配置。请完全退出应用后重新启动，再重新保存。');
      }
      if (!hasDefaultVideoSettingsSupport(next)) {
        throw new Error('Electron 主进程仍是旧版本，未接收默认视频模型配置。请完全退出应用后重新启动，再重新保存。');
      }
      if (!hasFallbackWorkflowSettingsSupport(next)) {
        throw new Error('Electron 主进程仍是旧版本，未接收备用模型配置。请完全退出应用后重新启动，再重新保存。');
      }
      if (qwenApiKey.trim() && !next.qwenApiKeyConfigured) {
        throw new Error('Qwen API Key 保存后校验失败，输入内容已保留，请重试。');
      }
      if (geminiApiKey.trim() && !next.geminiApiKeyConfigured) {
        throw new Error('Gemini API Key 保存后校验失败，输入内容已保留，请重试。');
      }
      if (gptGrokApiKey.trim() && !next.gptGrokApiKeyConfigured) {
        throw new Error('GPT / Grok API Key 保存后校验失败，输入内容已保留，请重试。');
      }
      if (seedreamApiKey.trim() && !next.seedreamApiKeyConfigured) {
        throw new Error('Seedream API Key 保存后校验失败，输入内容已保留，请重试。');
      }
      setSavedSettings(next);
      setComfyuiBaseUrl(next.comfyuiBaseUrl);
      setQwenBaseUrl(next.qwenBaseUrl);
      setDefaultImageWorkflowId(next.defaultImageWorkflowId);
      setDefaultVideoWorkflowId(next.defaultVideoWorkflowId);
      setFallbackImageWorkflows(next.fallbackImageWorkflows);
      setFallbackVideoWorkflows(next.fallbackVideoWorkflows);
      setQwenApiKey(next.qwenApiKey);
      setClearQwenApiKey(false);
      setVideoAnalysisProvider(next.videoAnalysisProvider);
      setGeminiBaseUrl(next.geminiBaseUrl);
      setGeminiApiKey(next.geminiApiKey);
      setClearGeminiApiKey(false);
      setGeminiAnalysisModelId(next.geminiAnalysisModelId);
      setGeminiEnabledImageModelIds(next.geminiEnabledImageModelIds);
      setGptGrokBaseUrl(next.gptGrokBaseUrl);
      setGptGrokApiKey(next.gptGrokApiKey);
      setClearGptGrokApiKey(false);
      setGptGrokEnabledImageModelIds(next.gptGrokEnabledImageModelIds);
      setGptGrokEnabledVideoModelIds(next.gptGrokEnabledVideoModelIds);
      setSeedreamBaseUrl(next.seedreamBaseUrl);
      setSeedreamApiKey(next.seedreamApiKey);
      setClearSeedreamApiKey(false);
      clearCachedComfyWorkflows();
      void listCachedComfyWorkflows(true);
      setNotice(next.qwenApiKeyConfigured || next.geminiApiKeyConfigured || next.gptGrokApiKeyConfigured || next.seedreamApiKeyConfigured
        ? '配置已保存，API Key 持久化校验通过'
        : '配置已保存，将在下一次生成或 Agent 对话时生效');
      return true;
    } catch (error) {
      setNotice(error instanceof Error ? error.message : '保存失败');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleQwenTest = async () => {
    setTestingQwen(true);
    setQwenTestResult(null);
    try {
      setQwenTestResult(await window.electronAPI.testQwenConnection({
        baseUrl: qwenBaseUrl,
        apiKey: qwenApiKey.trim() || undefined,
      }));
    } catch (error) {
      setQwenTestResult({ success: false, message: error instanceof Error ? error.message : '连接测试失败' });
    } finally {
      setTestingQwen(false);
    }
  };

  const handleSeedreamTest = async () => {
    setTestingSeedream(true);
    setSeedreamTestResult(null);
    try {
      setSeedreamTestResult(await window.electronAPI.testSeedreamConnection({
        baseUrl: seedreamBaseUrl,
        apiKey: seedreamApiKey.trim() || undefined,
      }));
    } catch (error) {
      setSeedreamTestResult({ success: false, message: error instanceof Error ? error.message : '连接测试失败' });
    } finally {
      setTestingSeedream(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0a0a0f]">
      <header className="relative flex items-center justify-between border-b border-white/[0.08] bg-[#0d0d14] px-8 py-4">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
        <div className="flex items-center gap-4">
          <button onClick={() => dirty ? setLeaveOpen(true) : setCurrentPage('home')} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] text-[#8a8794] transition hover:border-[#d4af37]/40 hover:text-[#e8c766]" title="返回首页">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-[0.22em] text-[#e8c766]">系统配置</h1>
            <p className="mt-1 text-xs text-[#9a97a3]">{dirty ? '有未保存修改' : '图片、视频与分析服务'}</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving || loading} className="rounded-lg border border-[#d4af37]/50 bg-gradient-to-b from-[#e8c766] to-[#b08d2a] px-6 py-2.5 text-[13px] font-semibold tracking-widest text-[#241a05] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
          {saving ? '保存中…' : '保存配置'}
        </button>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-7xl space-y-6 px-6 py-8 lg:px-8">
          {notice && <div className="rounded-lg border border-[#d4af37]/25 bg-[#d4af37]/[0.07] px-4 py-3 text-sm text-[#d9c178]">{notice}</div>}

          <SettingsSection
            title="模型与服务"
            description="ComfyUI、审查后端、云端生图/生视频网关。日常只需展开当前在用的那张卡。"
            open={servicesOpen}
            onToggle={() => setServicesOpen((value) => !value)}
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <SettingsCard title="ComfyUI 服务" description="本地图片工作流、视频生成与视频放大请求发送到此服务器。">
                <label className="text-xs tracking-wider text-[#9a97a3]">HTTP 地址</label>
                <div className="mt-2 flex gap-3">
                  <input aria-label="ComfyUI HTTP 地址" value={comfyuiBaseUrl} onChange={(event) => { setComfyuiBaseUrl(event.target.value); setTestResult(null); }} className={fieldClass} placeholder="http://127.0.0.1:8188" spellCheck={false} />
                  <button onClick={handleTest} disabled={testing || !comfyuiBaseUrl.trim()} className="shrink-0 rounded-lg border border-white/[0.12] bg-white/[0.05] px-5 text-sm text-[#d7d4cb] transition hover:border-[#d4af37]/40 hover:text-[#e8c766] disabled:opacity-40">
                    {testing ? '测试中…' : '测试连接'}
                  </button>
                </div>
                {testResult && <p className={`mt-2.5 text-xs ${testResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>{testResult.message}</p>}
              </SettingsCard>

              <SettingsCard title="Qwen 音视频审查" description="固定使用 Qwen3.5-Omni Plus 同时理解画面与音轨。API Key 保存在本机。">
                <div className="grid gap-5">
                  <div>
                    <label className="text-xs tracking-wider text-[#9a97a3]">OpenAI 兼容 API 地址</label>
                    <input aria-label="Qwen API 地址" value={qwenBaseUrl} onChange={(event) => { setQwenBaseUrl(event.target.value); setQwenTestResult(null); }} className={`${fieldClass} mt-2`} placeholder="https://dashscope.aliyuncs.com/compatible-mode/v1" spellCheck={false} />
                  </div>
                  <div>
                    <label className="text-xs tracking-wider text-[#9a97a3]">固定模型</label>
                    <div className="mt-2 rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/[0.06] px-3.5 py-3 font-mono text-sm text-[#e8c766]">qwen3.5-omni-plus</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs tracking-wider text-[#9a97a3]">DASHSCOPE_API_KEY</label>
                      {savedSettings?.qwenApiKeyConfigured && !clearQwenApiKey && <span className="text-[11px] text-emerald-400">已安全配置</span>}
                    </div>
                    <div className="relative mt-2">
                      <input type={showQwenApiKey ? 'text' : 'password'} aria-label="Qwen API Key" value={qwenApiKey} onChange={(event) => { setQwenApiKey(event.target.value); setClearQwenApiKey(false); setQwenTestResult(null); }} className={`${fieldClass} pr-16`} placeholder="输入 API Key" autoComplete="off" spellCheck={false} />
                      <button type="button" onClick={() => setShowQwenApiKey((value) => !value)} className="absolute inset-y-0 right-0 px-4 text-xs text-[#777482] hover:text-[#e8c766]">{showQwenApiKey ? '隐藏' : '显示'}</button>
                    </div>
                    {savedSettings?.qwenApiKeyConfigured && (
                      <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-[#777482]">
                        <input type="checkbox" checked={clearQwenApiKey} onChange={(event) => { setClearQwenApiKey(event.target.checked); if (event.target.checked) setQwenApiKey(''); }} className="accent-[#d4af37]" />
                        清除已保存的 API Key
                      </label>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={handleQwenTest} disabled={testingQwen || !qwenBaseUrl.trim() || (clearQwenApiKey && !qwenApiKey.trim())} className="rounded-lg border border-white/[0.12] bg-white/[0.05] px-5 py-2.5 text-sm text-[#d7d4cb] transition hover:border-[#d4af37]/40 hover:text-[#e8c766] disabled:opacity-40">
                      {testingQwen ? '测试中…' : '测试 Qwen 连接'}
                    </button>
                    {qwenTestResult && <p className={`text-xs ${qwenTestResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>{qwenTestResult.message}</p>}
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="Gemini 反代" description="独立 Base URL 与 Key。获取模型只刷新本卡片，不写入设置。">
                <GeminiProxySettingsCard
                  videoAnalysisProvider={videoAnalysisProvider}
                  onVideoAnalysisProviderChange={setVideoAnalysisProvider}
                  geminiBaseUrl={geminiBaseUrl}
                  onGeminiBaseUrlChange={setGeminiBaseUrl}
                  geminiApiKey={geminiApiKey}
                  onGeminiApiKeyChange={setGeminiApiKey}
                  clearGeminiApiKey={clearGeminiApiKey}
                  onClearGeminiApiKeyChange={setClearGeminiApiKey}
                  geminiApiKeyConfigured={!!savedSettings?.geminiApiKeyConfigured}
                  geminiAnalysisModelId={geminiAnalysisModelId}
                  onGeminiAnalysisModelIdChange={setGeminiAnalysisModelId}
                  geminiEnabledImageModelIds={geminiEnabledImageModelIds}
                  onGeminiEnabledImageModelIdsChange={setGeminiEnabledImageModelIds}
                  fieldClass={fieldClass}
                  bare
                />
              </SettingsCard>

              <SettingsCard title="方舟图片 / 视频" description="同一套 Base URL 与 Key 调用 Seedream 生图和 Seedance 生视频。">
                <div className="grid gap-5">
                  <div>
                    <label className="text-xs tracking-wider text-[#9a97a3]">方舟 API Base URL</label>
                    <input aria-label="火山方舟 API 地址" value={seedreamBaseUrl} onChange={(event) => { setSeedreamBaseUrl(event.target.value); setSeedreamTestResult(null); }} className={`${fieldClass} mt-2`} placeholder={DEFAULT_SEEDREAM_BASE_URL} spellCheck={false} />
                    <p className="mt-2 text-[11px] leading-5 text-[#5f5c68]">普通 API 填 <span className="font-mono">…/api/v3</span>，Agent Plan 填 <span className="font-mono">…/api/plan/v3</span>。</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs tracking-wider text-[#9a97a3]">ARK_API_KEY</label>
                      {savedSettings?.seedreamApiKeyConfigured && !clearSeedreamApiKey && <span className="text-[11px] text-emerald-400">已保存</span>}
                    </div>
                    <div className="relative mt-2">
                      <input type={showSeedreamApiKey ? 'text' : 'password'} aria-label="火山方舟 API Key" value={seedreamApiKey} onChange={(event) => { setSeedreamApiKey(event.target.value); setClearSeedreamApiKey(false); setSeedreamTestResult(null); }} className={`${fieldClass} pr-16`} placeholder="输入火山方舟 API Key" autoComplete="off" spellCheck={false} />
                      <button type="button" onClick={() => setShowSeedreamApiKey((value) => !value)} className="absolute inset-y-0 right-0 px-4 text-xs text-[#777482] hover:text-[#e8c766]">{showSeedreamApiKey ? '隐藏' : '显示'}</button>
                    </div>
                    {savedSettings?.seedreamApiKeyConfigured && (
                      <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-[#777482]">
                        <input type="checkbox" checked={clearSeedreamApiKey} onChange={(event) => { setClearSeedreamApiKey(event.target.checked); if (event.target.checked) setSeedreamApiKey(''); }} className="accent-[#d4af37]" />
                        清除已保存的 API Key
                      </label>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button onClick={handleSeedreamTest} disabled={testingSeedream || !seedreamBaseUrl.trim() || (clearSeedreamApiKey && !seedreamApiKey.trim())} className="rounded-lg border border-white/[0.12] bg-white/[0.05] px-5 py-2.5 text-sm text-[#d7d4cb] transition hover:border-[#d4af37]/40 hover:text-[#e8c766] disabled:opacity-40">
                      {testingSeedream ? '测试中…' : '测试方舟连接'}
                    </button>
                    {seedreamTestResult && <p className={`text-xs ${seedreamTestResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>{seedreamTestResult.message}</p>}
                  </div>
                </div>
              </SettingsCard>

              <SettingsCard title="GPT / Grok 反代" description="独立于 Gemini 的 OpenAI 兼容网关。获取模型只刷新本卡片。">
                <GptGrokProxySettingsCard
                  gptGrokBaseUrl={gptGrokBaseUrl}
                  onGptGrokBaseUrlChange={setGptGrokBaseUrl}
                  gptGrokApiKey={gptGrokApiKey}
                  onGptGrokApiKeyChange={setGptGrokApiKey}
                  clearGptGrokApiKey={clearGptGrokApiKey}
                  onClearGptGrokApiKeyChange={setClearGptGrokApiKey}
                  gptGrokApiKeyConfigured={!!savedSettings?.gptGrokApiKeyConfigured}
                  gptGrokEnabledImageModelIds={gptGrokEnabledImageModelIds}
                  onGptGrokEnabledImageModelIdsChange={setGptGrokEnabledImageModelIds}
                  gptGrokEnabledVideoModelIds={gptGrokEnabledVideoModelIds}
                  onGptGrokEnabledVideoModelIdsChange={setGptGrokEnabledVideoModelIds}
                  fieldClass={fieldClass}
                  bare
                />
              </SettingsCard>
            </div>
          </SettingsSection>

          <SettingsSection
            title="默认生成模型"
            description="新建节点写入默认项。默认因网络、额度或 503 失败时，生成会自动切备用1、备用2。"
            open={defaultsOpen}
            onToggle={() => setDefaultsOpen((value) => !value)}
          >
            <div className="grid gap-4 xl:grid-cols-2">
              <SettingsCard title="默认图片模型" description="新建图片节点、Codex 生图都走这一项；失败再走下面备用。">
                <WorkflowPicker
                  workflows={textToImageWorkflows}
                  selectedId={defaultImageWorkflowId}
                  onSelect={(id) => {
                    setDefaultImageWorkflowId(id)
                    setFallbackImageWorkflows(normalizeWorkflowFallbackSlots(id, fallbackImageWorkflows))
                  }}
                />
                <FallbackSlotList
                  workflows={textToImageWorkflows}
                  defaultId={defaultImageWorkflowId}
                  slots={fallbackImageWorkflows}
                  onChange={setFallbackImageWorkflows}
                />
              </SettingsCard>
              <SettingsCard title="默认视频模型" description="新建视频节点、Codex 生视频都走这一项；失败再走下面备用。">
                <WorkflowPicker
                  workflows={imageToVideoWorkflows}
                  selectedId={defaultVideoWorkflowId}
                  onSelect={(id) => {
                    setDefaultVideoWorkflowId(id)
                    setFallbackVideoWorkflows(normalizeWorkflowFallbackSlots(id, fallbackVideoWorkflows))
                  }}
                />
                <FallbackSlotList
                  workflows={imageToVideoWorkflows}
                  defaultId={defaultVideoWorkflowId}
                  slots={fallbackVideoWorkflows}
                  onChange={setFallbackVideoWorkflows}
                />
              </SettingsCard>
            </div>
          </SettingsSection>
        </div>
      </main>
      {leaveOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-6 app-no-drag">
        <section role="dialog" aria-modal="true" aria-label="未保存的配置" className="w-full max-w-md space-y-5 rounded-2xl border border-white/15 bg-[#17171e] p-6">
          <h2 className="text-base font-semibold">配置尚未保存</h2>
          <p className="text-sm text-white/65">保存后返回，或放弃这次修改。</p>
          <div className="flex flex-wrap justify-end gap-3 text-sm">
            <button autoFocus onClick={() => setLeaveOpen(false)} className="rounded-lg border border-white/15 px-3 py-2">继续编辑</button>
            <button disabled={saving} onClick={() => setCurrentPage('home')} className="rounded-lg border border-white/15 px-3 py-2">放弃修改</button>
            <button disabled={saving} onClick={async () => { if (await handleSave()) setCurrentPage('home'); else setLeaveOpen(false); }} className="rounded-lg bg-[#d4af37] px-3 py-2 text-black">{saving ? '保存中…' : '保存后返回'}</button>
          </div>
        </section>
      </div>}
    </div>
  );
}

function SettingsCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="flex h-full min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-[#111118] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
      <div className="mb-5 border-b border-white/[0.07] pb-4">
        <h2 className="text-sm font-semibold tracking-[0.14em] text-[#e8e6df]">{title}</h2>
        <p className="mt-2 text-xs leading-5 text-[#777482]">{description}</p>
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}

function SettingsSection({
  title,
  description,
  open,
  onToggle,
  children,
}: {
  title: string
  description: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d14]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03]"
      >
        <span>
          <span className="block text-sm font-semibold tracking-[0.16em] text-[#e8e6df]">{title}</span>
          <span className="mt-1.5 block text-xs leading-5 text-[#777482]">{description}</span>
        </span>
        <span className={`mt-1 text-[#9a97a3] transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>▾</span>
      </button>
      {open && <div className="border-t border-white/[0.06] px-5 py-5">{children}</div>}
    </section>
  )
}

function WorkflowPicker({
  workflows,
  selectedId,
  onSelect,
}: {
  workflows: ComfyWorkflowInfo[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  if (workflows.length === 0) {
    return <p className="text-xs text-[#777482]">暂无可用工作流。先在上方配置对应服务后保存。</p>
  }
  return (
    <div className="grid gap-2">
      {workflows.map((workflow) => {
        const selected = workflow.id === selectedId
        return (
          <button
            key={workflow.id}
            type="button"
            onClick={() => onSelect(workflow.id)}
            className={`rounded-xl border px-4 py-3 text-left transition ${selected ? 'border-[#d4af37]/65 bg-[#d4af37]/[0.09]' : 'border-white/[0.09] bg-white/[0.025] hover:border-white/[0.18]'}`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className={`min-w-0 text-sm font-medium ${selected ? 'text-[#e8c766]' : 'text-[#d8d6cf]'}`}>{workflow.name}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-[#9a97a3]">{workflowTypeLabel(workflow)}</span>
                <span className={`h-3.5 w-3.5 rounded-full border ${selected ? 'border-[#e8c766] bg-[#e8c766] shadow-[inset_0_0_0_3px_#18140b]' : 'border-[#5f5c68]'}`} />
              </span>
            </span>
            <span className="mt-1.5 block font-mono text-[10px] text-[#666371]">{workflow.id}</span>
          </button>
        )
      })}
    </div>
  )
}

function FallbackSlotList({
  workflows,
  defaultId,
  slots,
  onChange,
}: {
  workflows: ComfyWorkflowInfo[]
  defaultId: string
  slots: WorkflowFallbackSlot[]
  onChange: (slots: WorkflowFallbackSlot[]) => void
}) {
  const rows = [slots[0] ?? { id: '', note: '' }, slots[1] ?? { id: '', note: '' }]
  const update = (index: number, next: WorkflowFallbackSlot) => {
    const copy = [...rows]
    copy[index] = next
    onChange(normalizeWorkflowFallbackSlots(defaultId, copy))
  }
  return (
    <div className="mt-4 grid gap-3 border-t border-white/[0.06] pt-4">
      {rows.map((slot, index) => {
        const otherId = rows[1 - index]?.id
        return (
          <label key={index} className="grid gap-1.5">
            <span className="text-[11px] text-[#9a97a3]">备用{index + 1}</span>
            <select
              value={slot.id}
              onChange={(event) => update(index, { id: event.target.value, note: slot.note })}
              className={fieldClass}
            >
              <option value="">不启用</option>
              {workflows
                .filter((workflow) => workflow.id === slot.id || (workflow.id !== defaultId && workflow.id !== otherId))
                .map((workflow) => (
                  <option key={workflow.id} value={workflow.id}>{workflow.name}</option>
                ))}
            </select>
            {slot.id ? (
              <input
                value={slot.note}
                maxLength={40}
                placeholder="备注，例如额度更稳 / 本地 ComfyUI"
                onChange={(event) => update(index, { id: slot.id, note: event.target.value })}
                className={fieldClass}
              />
            ) : null}
          </label>
        )
      })}
    </div>
  )
}
