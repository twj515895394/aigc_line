import { useState } from 'react';
import type { ReverseProxyModel } from '../shared/ipc.types';
import { isImageModelId, isVideoModelId } from '../shared/reverse-proxy-models';

export interface GptGrokProxySettingsCardProps {
  gptGrokBaseUrl: string;
  onGptGrokBaseUrlChange: (value: string) => void;
  gptGrokApiKey: string;
  onGptGrokApiKeyChange: (value: string) => void;
  clearGptGrokApiKey: boolean;
  onClearGptGrokApiKeyChange: (checked: boolean) => void;
  gptGrokApiKeyConfigured: boolean;
  gptGrokEnabledImageModelIds: string[];
  onGptGrokEnabledImageModelIdsChange: (ids: string[]) => void;
  gptGrokEnabledVideoModelIds: string[];
  onGptGrokEnabledVideoModelIdsChange: (ids: string[]) => void;
  fieldClass: string;
}


function withSavedIds(fetched: ReverseProxyModel[], enabledIds: string[]): ReverseProxyModel[] {
  const catalogIds = new Set(fetched.map((model) => model.id));
  return [
    ...fetched,
    ...enabledIds.filter((id) => id && !catalogIds.has(id)).map((id) => ({ id, name: id })),
  ];
}

function toggleId(ids: string[], id: string, checked: boolean): string[] {
  if (checked) return ids.includes(id) ? ids : [...ids, id];
  return ids.filter((item) => item !== id);
}

export function GptGrokProxySettingsCard({
  gptGrokBaseUrl,
  onGptGrokBaseUrlChange,
  gptGrokApiKey,
  onGptGrokApiKeyChange,
  clearGptGrokApiKey,
  onClearGptGrokApiKeyChange,
  gptGrokApiKeyConfigured,
  gptGrokEnabledImageModelIds,
  onGptGrokEnabledImageModelIdsChange,
  gptGrokEnabledVideoModelIds,
  onGptGrokEnabledVideoModelIdsChange,
  fieldClass,
}: GptGrokProxySettingsCardProps) {
  const [showGptGrokApiKey, setShowGptGrokApiKey] = useState(false);
  const [models, setModels] = useState<ReverseProxyModel[]>([]);
  const [listing, setListing] = useState(false);
  const [testing, setTesting] = useState(false);
  const [listResult, setListResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const imageOptions = withSavedIds(models.filter((model) => isImageModelId(model.id)), gptGrokEnabledImageModelIds);
  const videoOptions = withSavedIds(models.filter((model) => isVideoModelId(model.id)), gptGrokEnabledVideoModelIds);
  const canUseKey = Boolean(gptGrokApiKey.trim()) || (gptGrokApiKeyConfigured && !clearGptGrokApiKey);

  const handleListModels = async () => {
    setListing(true);
    setListResult(null);
    try {
      // 获取模型只刷新本卡片内存目录，不能走保存配置。
      const result = await window.electronAPI.listGptGrokModels({
        baseUrl: gptGrokBaseUrl,
        apiKey: gptGrokApiKey.trim() || undefined,
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
      setTestResult(await window.electronAPI.testGptGrokConnection({
        baseUrl: gptGrokBaseUrl,
        apiKey: gptGrokApiKey.trim() || undefined,
      }));
    } catch (error) {
      setTestResult({ success: false, message: error instanceof Error ? error.message : '连接测试失败' });
    } finally {
      setTesting(false);
    }
  };

  return (
    <section className="flex h-full min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-[#111118] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.18)]">
      <div className="mb-5 border-b border-white/[0.07] pb-4">
        <h2 className="text-sm font-semibold tracking-[0.14em] text-[#e8e6df]">GPT / Grok 反代</h2>
        <p className="mt-2 text-xs leading-5 text-[#777482]">独立于 Gemini 的 OpenAI 兼容网关。获取模型只刷新本卡片列表，不会写入设置文件。生图勾选 ID 含 image 的模型，生视频勾选 ID 含 video 的模型。</p>
      </div>
      <div className="flex-1">
        <div className="grid gap-5">
          <div>
            <label className="text-xs tracking-wider text-[#9a97a3]">GPT / Grok 反代地址</label>
            <input
              aria-label="GPT / Grok 反代地址"
              value={gptGrokBaseUrl}
              onChange={(event) => { onGptGrokBaseUrlChange(event.target.value); setListResult(null); setTestResult(null); }}
              className={`${fieldClass} mt-2`}
              placeholder="http://127.0.0.1:8317/v1"
              spellCheck={false}
            />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs tracking-wider text-[#9a97a3]">API Key</label>
              {gptGrokApiKeyConfigured && !clearGptGrokApiKey && <span className="text-[11px] text-emerald-400">已安全配置</span>}
            </div>
            <div className="relative mt-2">
              <input
                type={showGptGrokApiKey ? 'text' : 'password'}
                aria-label="GPT / Grok API Key"
                value={gptGrokApiKey}
                onChange={(event) => { onGptGrokApiKeyChange(event.target.value); onClearGptGrokApiKeyChange(false); setListResult(null); setTestResult(null); }}
                className={`${fieldClass} pr-16`}
                placeholder="输入 GPT / Grok API Key"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" onClick={() => setShowGptGrokApiKey((value) => !value)} className="absolute inset-y-0 right-0 px-4 text-xs text-[#777482] hover:text-[#e8c766]">{showGptGrokApiKey ? '隐藏' : '显示'}</button>
            </div>
            {gptGrokApiKeyConfigured && (
              <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-[#777482]">
                <input
                  type="checkbox"
                  checked={clearGptGrokApiKey}
                  onChange={(event) => {
                    onClearGptGrokApiKeyChange(event.target.checked);
                    if (event.target.checked) onGptGrokApiKeyChange('');
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
              disabled={listing || !gptGrokBaseUrl.trim() || !canUseKey}
              className="rounded-lg border border-white/[0.12] bg-white/[0.05] px-5 py-2.5 text-sm text-[#d7d4cb] transition hover:border-[#d4af37]/40 hover:text-[#e8c766] disabled:opacity-40"
            >
              {listing ? '获取中…' : '获取模型'}
            </button>
            {listResult && <p className={`text-xs ${listResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>{listResult.message}</p>}
          </div>
          <div>
            <label className="text-xs tracking-wider text-[#9a97a3]">启用的图片模型</label>
            {imageOptions.length === 0 ? (
              <p className="mt-2 text-[11px] leading-5 text-[#5f5c68]">获取模型后，将列出 ID 含 image 的项供勾选；默认不启用任何模型。</p>
            ) : (
              <div className="mt-2 grid gap-2">
                {imageOptions.map((model) => (
                  <label key={`image-${model.id}`} className="flex cursor-pointer items-center gap-2 text-sm text-[#d7d4cb]">
                    <input
                      type="checkbox"
                      checked={gptGrokEnabledImageModelIds.includes(model.id)}
                      onChange={(event) => onGptGrokEnabledImageModelIdsChange(toggleId(gptGrokEnabledImageModelIds, model.id, event.target.checked))}
                      className="accent-[#d4af37]"
                    />
                    <span>{model.name}</span>
                    <span className="font-mono text-[11px] text-[#666371]">{model.id}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="text-xs tracking-wider text-[#9a97a3]">启用的视频模型</label>
            {videoOptions.length === 0 ? (
              <p className="mt-2 text-[11px] leading-5 text-[#5f5c68]">获取模型后，将列出 ID 含 video 的项供勾选；默认不启用任何模型。</p>
            ) : (
              <div className="mt-2 grid gap-2">
                {videoOptions.map((model) => (
                  <label key={`video-${model.id}`} className="flex cursor-pointer items-center gap-2 text-sm text-[#d7d4cb]">
                    <input
                      type="checkbox"
                      checked={gptGrokEnabledVideoModelIds.includes(model.id)}
                      onChange={(event) => onGptGrokEnabledVideoModelIdsChange(toggleId(gptGrokEnabledVideoModelIds, model.id, event.target.checked))}
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
              disabled={testing || !gptGrokBaseUrl.trim() || !canUseKey}
              className="rounded-lg border border-white/[0.12] bg-white/[0.05] px-5 py-2.5 text-sm text-[#d7d4cb] transition hover:border-[#d4af37]/40 hover:text-[#e8c766] disabled:opacity-40"
            >
              {testing ? '测试中…' : '测试连接'}
            </button>
            {testResult && <p className={`text-xs ${testResult.success ? 'text-emerald-400' : 'text-rose-400'}`}>{testResult.message}</p>}
          </div>
          <p className="text-[11px] leading-5 text-[#5f5c68]">连接测试只请求模型目录，不生成图片或视频。API Key 使用操作系统安全存储加密。</p>
        </div>
      </div>
    </section>
  );
}
