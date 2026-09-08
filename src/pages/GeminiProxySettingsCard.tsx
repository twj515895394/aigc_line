import { useState } from 'react';
import type { ReverseProxyModel, VideoAnalysisProvider } from '../shared/ipc.types';
import { isImageModelId } from '../shared/reverse-proxy-models';

export interface GeminiProxySettingsCardProps {
  videoAnalysisProvider: VideoAnalysisProvider;
  onVideoAnalysisProviderChange: (value: VideoAnalysisProvider) => void;
  geminiBaseUrl: string;
  onGeminiBaseUrlChange: (value: string) => void;
  geminiApiKey: string;
  onGeminiApiKeyChange: (value: string) => void;
  clearGeminiApiKey: boolean;
  onClearGeminiApiKeyChange: (checked: boolean) => void;
  geminiApiKeyConfigured: boolean;
  geminiAnalysisModelId: string;
  onGeminiAnalysisModelIdChange: (value: string) => void;
  geminiEnabledImageModelIds: string[];
  onGeminiEnabledImageModelIdsChange: (ids: string[]) => void;
  fieldClass: string;
}

export function GeminiProxySettingsCard({
  videoAnalysisProvider,
  onVideoAnalysisProviderChange,
  geminiBaseUrl,
  onGeminiBaseUrlChange,
  geminiApiKey,
  onGeminiApiKeyChange,
  clearGeminiApiKey,
  onClearGeminiApiKeyChange,
  geminiApiKeyConfigured,
  geminiAnalysisModelId,
  onGeminiAnalysisModelIdChange,
  geminiEnabledImageModelIds,
  onGeminiEnabledImageModelIdsChange,
  fieldClass,
}: GeminiProxySettingsCardProps) {
  const [showGeminiApiKey, setShowGeminiApiKey] = useState(false);
  const [models, setModels] = useState<ReverseProxyModel[]>([]);
  const [listing, setListing] = useState(false);
  const [testing, setTesting] = useState(false);
  const [listResult, setListResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const analysisInCatalog = models.some((model) => model.id === geminiAnalysisModelId);
  const imageModels = models.filter((model) => isImageModelId(model.id));
  const catalogImageIds = new Set(imageModels.map((model) => model.id));
  const imageOptions = [
    ...imageModels,
    ...geminiEnabledImageModelIds
      .filter((id) => !catalogImageIds.has(id))
      .map((id) => ({ id, name: id })),
  ];
  const canUseKey = Boolean(geminiApiKey.trim()) || (geminiApiKeyConfigured && !clearGeminiApiKey);

  const handleListModels = async () => {
    setListing(true);
    setListResult(null);
    try {
      // 获取模型只刷新本卡片内存目录，不能走保存配置。
      const result = await window.electronAPI.listGeminiModels({
        baseUrl: geminiBaseUrl,
        apiKey: geminiApiKey.trim() || undefined,
      });
      setListResult({ success: result.success, message: result.message });
      if (result.success) setModels(result.models);
    } catch (error) {
      setListResult({ success: false, message: error instanceof Error ? error.message : '获取模型失败' });
    } finally {
      setListing(false);
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      setTestResult(await window.electronAPI.testGeminiConnection({
        baseUrl: geminiBaseUrl,
        apiKey: geminiApiKey.trim() || undefined,
      }));
    } catch (error) {
      setTestResult({ success: false, message: error instanceof Error ? error.message : '连接测试失败' });
    } finally {
      setTesting(false);
    }
  };

  const toggleEnabledImage = (id: string, checked: boolean) => {
    if (checked) {
      if (geminiEnabledImageModelIds.includes(id)) return;
      onGeminiEnabledImageModelIdsChange([...geminiEnabledImageModelIds, id]);
      return;
    }
    onGeminiEnabledImageModelIdsChange(geminiEnabledImageModelIds.filter((item) => item !== id));
  };

  return (
    <section className="flex h-full min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-[#111118] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
      <div className="mb-5 border-b border-white/[0.07] pb-4">
        <h2 className="text-sm font-semibold tracking-[0.14em] text-[#e8e6df]">Gemini 反代</h2>
        <p className="mt-2 text-xs leading-5 text-[#777482]">填写独立 Base URL 与 API Key，从网关获取模型后选择分析模型并勾选生图。获取模型只刷新本卡片列表，不会写入设置文件。</p>
      </div>
      <div className="flex-1">
        <div className="grid gap-5">
          <div>
            <label className="text-xs tracking-wider text-[#9a97a3]">音视频分析后端</label>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#d7d4cb]">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="video-analysis-provider"
                  value="qwen"
                  checked={videoAnalysisProvider === 'qwen'}
                  onChange={() => onVideoAnalysisProviderChange('qwen')}
                  className="accent-[#d4af37]"
                />
                Qwen
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="video-analysis-provider"
                  value="gemini"
                  checked={videoAnalysisProvider === 'gemini'}
                  onChange={() => onVideoAnalysisProviderChange('gemini')}
                  className="accent-[#d4af37]"
                />
                Gemini
              </label>
            </div>
          </div>
          <div>
            <label className="text-xs tracking-wider text-[#9a97a3]">Gemini 反代地址</label>
            <input
              aria-label="Gemini 反代地址"
              value={geminiBaseUrl}
              onChange={(event) => { onGeminiBaseUrlChange(event.target.value); setListResult(null); setTestResult(null); }}
              className={`${fieldClass} mt-2`}
              placeholder="http://127.0.0.1:8045/v1"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs tracking-wider text-[#9a97a3]">API Key</label>
              {geminiApiKeyConfigured && !clearGeminiApiKey && <span className="text-[11px] text-emerald-400">已安全配置</span>}
            </div>
            <div className="relative mt-2">
              <input
                type={showGeminiApiKey ? 'text' : 'password'}
                aria-label="Gemini API Key"
                value={geminiApiKey}
                onChange={(event) => { onGeminiApiKeyChange(event.target.value); onClearGeminiApiKeyChange(false); setListResult(null); setTestResult(null); }}
                className={`${fieldClass} pr-16`}
                placeholder="输入 Gemini API Key"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" onClick={() => setShowGeminiApiKey((value) => !value)} className="absolute inset-y-0 right-0 px-4 text-xs text-[#777482] hover:text-[#e8c766]">{showGeminiApiKey ? '隐藏' : '显示'}</button>
            </div>
            {geminiApiKeyConfigured && (
              <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-[#777482]">
                <input
                  type="checkbox"
                  checked={clearGeminiApiKey}
                  onChange={(event) => {
                    onClearGeminiApiKeyChange(event.target.checked);
                    if (event.target.checked) onGeminiApiKeyChange('');
                  }}
                  className="accent-[#d4af37]"
                />
                清除已保存的 API Key
              </label>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleListModels}
              disabled={listing || !geminiBaseUrl.trim() || !canUseKey}
              className="rounded-lg border border-white/[0.12] bg-white/[0.05] px-5 py-2.5 text-sm text-[#d7d4cb] transition hover:border-[#d4af37]/40 hover:text-[#e8c766] disabled:opacity-40"
            >
              {listing ? '获取中…' : '获取模型'}
            </button>
            {listResult && <p className={`text-xs ${listResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>{listResult.message}</p>}
          </div>
          <div>
            <label className="text-xs tracking-wider text-[#9a97a3]">分析模型</label>
            {models.length > 0 && (
              <select
                aria-label="Gemini 分析模型"
                value={analysisInCatalog ? geminiAnalysisModelId : ''}
                onChange={(event) => onGeminiAnalysisModelIdChange(event.target.value)}
                className={`${fieldClass} mt-2`}
              >
                <option value="">手填模型 ID</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            )}
            {(models.length === 0 || !analysisInCatalog) && (
              <input
                aria-label="Gemini 分析模型 ID"
                value={geminiAnalysisModelId}
                onChange={(event) => onGeminiAnalysisModelIdChange(event.target.value)}
                className={`${fieldClass} mt-2`}
                placeholder="手填分析模型 ID"
                spellCheck={false}
              />
            )}
          </div>
          <div>
            <label className="text-xs tracking-wider text-[#9a97a3]">启用的图片模型</label>
            {imageOptions.length === 0 ? (
              <p className="mt-2 text-[11px] leading-5 text-[#5f5c68]">获取模型后，将列出 ID 含 image 的项供勾选；默认不启用任何模型。</p>
            ) : (
              <div className="mt-2 grid gap-2">
                {imageOptions.map((model) => (
                  <label key={model.id} className="flex cursor-pointer items-center gap-2 text-sm text-[#d7d4cb]">
                    <input
                      type="checkbox"
                      checked={geminiEnabledImageModelIds.includes(model.id)}
                      onChange={(event) => toggleEnabledImage(model.id, event.target.checked)}
                      className="accent-[#d4af37]"
                    />
                    <span>{model.name}</span>
                    <span className="font-mono text-[11px] text-[#666371]">{model.id}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleTest}
              disabled={testing || !geminiBaseUrl.trim() || !canUseKey}
              className="rounded-lg border border-white/[0.12] bg-white/[0.05] px-5 py-2.5 text-sm text-[#d7d4cb] transition hover:border-[#d4af37]/40 hover:text-[#e8c766] disabled:opacity-40"
            >
              {testing ? '测试中…' : '测试 Gemini 连接'}
            </button>
            {testResult && <p className={`text-xs ${testResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>{testResult.message}</p>}
          </div>
          <p className="text-[11px] leading-5 text-[#5f5c68]">连接测试只请求模型目录，不生成图片。API Key 使用操作系统安全存储加密。</p>
        </div>
      </div>
    </section>
  );
}
