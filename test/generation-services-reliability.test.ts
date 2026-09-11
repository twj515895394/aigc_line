import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
const environment = vi.hoisted(() => ({ root: '' }))
vi.mock('electron', () => ({ app: { isPackaged: false }, net: {}, session: {} }))
vi.mock('../electron/main/services/project.store', () => ({ loadProject: vi.fn(async (id: string) => ({ id, folderPath: environment.root })) }))
vi.mock('../electron/main/services/settings.service', () => ({ getRuntimeSettings: vi.fn(async () => ({
  comfyuiBaseUrl: 'http://comfy.invalid', defaultImageWorkflowId: 'krea2-turbo-t2i', defaultVideoWorkflowId: 'minimax-h3-easy', seedreamBaseUrl: 'https://ark.invalid', seedreamApiKey: 'fake-key',
})) }))
import { generateVideoWithComfyUI } from '../electron/main/services/comfyui.service'
import { generateVideoWithSeedance } from '../electron/main/services/seedance-video.service'
import { listProjectGenerationTasks } from '../electron/main/services/generation-task.service'

beforeEach(async () => { environment.root = await fs.mkdtemp(path.join(os.tmpdir(), 'aigc-service-reliability-')) })
afterEach(async () => { vi.unstubAllGlobals(); vi.restoreAllMocks(); await fs.rm(environment.root, { recursive: true, force: true }) })

describe('generation service integration', () => {
  it('uploads equal basenames as distinct assets and persists the resulting video', async () => {
    for (const directory of ['hero', 'scene']) await fs.mkdir(path.join(environment.root, directory))
    await fs.writeFile(path.join(environment.root, 'hero', 'reference.png'), 'hero-image')
    await fs.writeFile(path.join(environment.root, 'scene', 'reference.png'), 'scene-image')
    const uploads = new Map<string, string>()
    let workflow: Record<string, { inputs: Record<string, unknown> }> = {}
    const fetch = vi.fn(async (url: string, options?: RequestInit) => {
      if (url.endsWith('/upload/image')) {
        const form = options!.body as FormData
        const file = form.get('image') as File
        expect(form.get('overwrite')).toBe('false')
        uploads.set(file.name, await file.text())
        return Response.json({ name: file.name })
      }
      if (url.endsWith('/prompt')) { workflow = JSON.parse(String(options!.body)).prompt; return Response.json({ prompt_id: 'job-1' }) }
      if (url.includes('/history/')) return Response.json({ 'job-1': { outputs: { '92': { videos: [{ filename: 'result.mp4' }] } }, status: { completed: true } } })
      if (url.includes('/view?')) return new Response('video-result')
      throw new Error(`Unexpected URL ${url}`)
    })
    vi.stubGlobal('fetch', fetch)
    const result = await generateVideoWithComfyUI({ projectId: 'p', nodeId: 'v', workflowId: 'minimax-h3-r2v', prompt: 'test', aspectRatio: '16:9', referenceImagePaths: ['hero/reference.png', 'scene/reference.png'] })
    expect(uploads.size).toBe(2)
    const first = workflow['910001'].inputs.image as string
    const second = workflow['910002'].inputs.image as string
    expect(first).not.toBe(second)
    expect(uploads.get(first)).toBe('hero-image'); expect(uploads.get(second)).toBe('scene-image')
    expect(await fs.readFile(path.join(environment.root, result.relativePath!), 'utf8')).toBe('video-result')
    expect((await listProjectGenerationTasks('p'))[0]).toMatchObject({ status: 'succeeded', relativePath: result.relativePath, taskId: 'job-1' })
  })
  it('injects Easy H3 reference LoRA, 10 steps, 3:4 size, and media slots', async () => {
    await fs.mkdir(path.join(environment.root, 'hero'))
    await fs.writeFile(path.join(environment.root, 'hero', 'reference.png'), 'hero-image')
    let workflow: Record<string, { class_type?: string; inputs: Record<string, unknown> }> = {}
    vi.stubGlobal('fetch', vi.fn(async (url: string, options?: RequestInit) => {
      if (url.endsWith('/upload/image')) return Response.json({ name: 'uploaded.png' })
      if (url.endsWith('/prompt')) { workflow = JSON.parse(String(options!.body)).prompt; return Response.json({ prompt_id: 'easy-1' }) }
      if (url.includes('/history/')) return Response.json({ 'easy-1': { outputs: { '299': { videos: [{ filename: 'easy.mp4' }] } }, status: { completed: true } } })
      if (url.includes('/view?')) return new Response('easy-video')
      throw new Error(`Unexpected URL ${url}`)
    }))
    const result = await generateVideoWithComfyUI({
      projectId: 'p', nodeId: 'v', workflowId: 'minimax-h3-easy', prompt: 'test',
      aspectRatio: '3:4', duration: 5, referenceImagePaths: ['hero/reference.png'],
    })
    expect(workflow['335'].inputs).toMatchObject({
      mode: 'reference', prompt: 'test', seconds: 5, aspect_ratio: '3:4', width: 864, height: 1152,
      resolution: '0.98', prompt_optimizer_enabled: false,
    })
    expect(workflow['265'].inputs.lora_name).toBe('minimax\\minimax_h3_ref2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors')
    expect(workflow['278'].inputs.value).toBe(10)
    expect(workflow['335'].inputs.image_1).toEqual(['910001', 0])
    expect(result.success).toBe(true)
  })
  it('uses Easy H3 image mode and FL2V LoRA for text-to-video', async () => {
    let workflow: Record<string, { inputs: Record<string, unknown> }> = {}
    vi.stubGlobal('fetch', vi.fn(async (url: string, options?: RequestInit) => {
      if (url.endsWith('/prompt')) { workflow = JSON.parse(String(options!.body)).prompt; return Response.json({ prompt_id: 'easy-t2v' }) }
      if (url.includes('/history/')) return Response.json({ 'easy-t2v': { outputs: { '299': { videos: [{ filename: 't2v.mp4' }] } }, status: { completed: true } } })
      if (url.includes('/view?')) return new Response('t2v-video')
      throw new Error(`Unexpected URL ${url}`)
    }))
    await generateVideoWithComfyUI({ projectId: 'p', nodeId: 'v', workflowId: 'minimax-h3-easy', prompt: 'walk', aspectRatio: '16:9' })
    expect(workflow['335'].inputs.mode).toBe('image')
    expect(workflow['265'].inputs.lora_name).toBe('minimax\\minimax_h3_fl2v_turbo_4step_v1.2_768p_comfyui_bf16.safetensors')
    expect(workflow['278'].inputs.value).toBe(10)
    expect(workflow['910001']).toBeUndefined()
  })
  it('injects Easy H3 first and last frames without switching to reference LoRA', async () => {
    await fs.mkdir(path.join(environment.root, 'frames'))
    await fs.writeFile(path.join(environment.root, 'frames', 'first.png'), 'first-frame')
    await fs.writeFile(path.join(environment.root, 'frames', 'last.png'), 'last-frame')
    let workflow: Record<string, { inputs: Record<string, unknown> }> = {}
    vi.stubGlobal('fetch', vi.fn(async (url: string, options?: RequestInit) => {
      if (url.endsWith('/upload/image')) return Response.json({ name: 'uploaded-frame.png' })
      if (url.endsWith('/prompt')) { workflow = JSON.parse(String(options!.body)).prompt; return Response.json({ prompt_id: 'easy-fl' }) }
      if (url.includes('/history/')) return Response.json({ 'easy-fl': { outputs: { '299': { videos: [{ filename: 'fl.mp4' }] } }, status: { completed: true } } })
      if (url.includes('/view?')) return new Response('fl-video')
      throw new Error(`Unexpected URL ${url}`)
    }))
    await generateVideoWithComfyUI({
      projectId: 'p', nodeId: 'v', workflowId: 'minimax-h3-easy', prompt: 'turn', aspectRatio: '9:16',
      referenceImagePath: 'frames/first.png', lastFrameImagePath: 'frames/last.png',
    })
    expect(workflow['335'].inputs.mode).toBe('image')
    expect(workflow['335'].inputs.keyframe_role).toBe('first')
    expect(workflow['335'].inputs.image_1).toEqual(['900001', 0])
    expect(workflow['335'].inputs.image_2).toEqual(['900002', 0])
    expect(workflow['265'].inputs.lora_name).toBe('minimax\\minimax_h3_fl2v_turbo_4step_v1.2_768p_comfyui_bf16.safetensors')
    expect(workflow['910001']).toBeUndefined()
  })
  it('injects Easy H3 二采 without swapping first-pass LoRA and saves from node 291', async () => {
    await fs.mkdir(path.join(environment.root, 'hero'))
    await fs.writeFile(path.join(environment.root, 'hero', 'reference.png'), 'hero-image')
    let workflow: Record<string, { inputs: Record<string, unknown> }> = {}
    vi.stubGlobal('fetch', vi.fn(async (url: string, options?: RequestInit) => {
      if (url.endsWith('/upload/image')) return Response.json({ name: 'uploaded.png' })
      if (url.endsWith('/prompt')) { workflow = JSON.parse(String(options!.body)).prompt; return Response.json({ prompt_id: 'easy-2p' }) }
      if (url.includes('/history/')) return Response.json({ 'easy-2p': { outputs: { '291': { videos: [{ filename: 'easy2.mp4' }] } }, status: { completed: true } } })
      if (url.includes('/view?')) return new Response('easy2-video')
      throw new Error(`Unexpected URL ${url}`)
    }))
    await generateVideoWithComfyUI({
      projectId: 'p', nodeId: 'v', workflowId: 'minimax-h3-easy-2pass', prompt: 'look',
      aspectRatio: '3:4', duration: 5, referenceImagePaths: ['hero/reference.png'],
    })
    expect(workflow['335'].inputs).toMatchObject({
      mode: 'reference', prompt: 'look', seconds: 5, aspect_ratio: '3:4', width: 864, height: 1152,
    })
    expect(workflow['265'].inputs.lora_name).toBe('minimax\\minimax_h3_fl2v_turbo_4step_v1.2_768p_comfyui_bf16.safetensors')
    expect(workflow['280'].inputs.lora_name).toBe('minimax\\minimax_h3_ref2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors')
    expect(workflow['278'].inputs.value).toBe(9)
    expect(workflow['279'].inputs.value).toBe(6)
    expect(workflow['291'].inputs.filename_prefix).toBe('aigc-canvas/video/v')
    expect(workflow['335'].inputs.image_1).toEqual(['910001', 0])
  })


  it('retries a transient Seedance query failure without submitting a second paid task', async () => {
    let posts = 0; let queries = 0
    vi.stubGlobal('fetch', vi.fn(async (url: string, options?: RequestInit) => {
      if (options?.method === 'POST') { posts++; return Response.json({ id: 'seedance-job' }) }
      if (url.includes('/tasks/')) {
        queries++
        if (queries === 1) throw new TypeError('transient network reset')
        return Response.json({ status: 'succeeded', content: { video_url: 'https://cdn.invalid/video.mp4' } })
      }
      return new Response('seedance-video')
    }))
    const request = { projectId: 'p', nodeId: 'v', workflowId: 'seedance-2.0', prompt: 'test', aspectRatio: '16:9' as const }
    const result = await generateVideoWithSeedance(request)
    expect(posts).toBe(1); expect(queries).toBe(2)
    expect(await generateVideoWithSeedance(request)).toEqual(result)
    expect(posts).toBe(1)
  })
  it('terminates a ComfyUI task removed from both queue and history', async () => {
    let time = 1_000_000
    vi.spyOn(Date, 'now').mockImplementation(() => { time += 15_000; return time })
    let queueChecks = 0
    vi.stubGlobal('fetch', vi.fn(async (url: string) => {
      if (url.endsWith('/prompt')) return Response.json({ prompt_id: 'removed-job' })
      if (url.includes('/history/')) return Response.json({})
      if (url.endsWith('/queue')) { queueChecks++; return Response.json({ queue_running: [], queue_pending: [] }) }
      throw new Error(`Unexpected URL ${url}`)
    }))
    await expect(generateVideoWithComfyUI({ projectId: 'p', nodeId: 'removed', workflowId: 'minimax-h3-t2v-flf2v', prompt: 'test', aspectRatio: '16:9' })).rejects.toThrow('已从队列和历史中移除')
    expect(queueChecks).toBe(3)
    expect((await listProjectGenerationTasks('p'))[0]).toMatchObject({ status: 'failed', taskId: 'removed-job' })
  })
})
