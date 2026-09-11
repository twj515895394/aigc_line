import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

type WorkflowNode = {
  class_type: string
  inputs: Record<string, unknown>
}

describe('MiniMax H3 accelerated reference workflow', () => {
  it('routes the scheduler and guider through the 8-step Ref2V Turbo LoRA', () => {
    const workflowPath = path.join(
      process.cwd(),
      'resources',
      'comfyui-workflows',
      'video_minimax_h3_r2v_turbo.json',
    )
    const workflow = JSON.parse(readFileSync(workflowPath, 'utf8')) as Record<string, WorkflowNode>

    expect(workflow['139']).toMatchObject({
      class_type: 'LoraLoaderModelOnly',
      inputs: {
        lora_name: 'minimax\\minimax_h3_ref2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors',
        strength_model: 1,
        model: ['127', 0],
      },
    })
    expect(workflow['124'].inputs).toMatchObject({ steps: 8, model: ['139', 0] })
    expect(workflow['126'].inputs.model).toEqual(['139', 0])
    expect(workflow['136'].class_type).toBe('MiniMaxH3ReferenceToVideo')
  })

  it('keeps the first-last API graph on MiniMaxH3ImageToVideo', () => {
    const workflowPath = path.join(
      process.cwd(),
      'resources',
      'comfyui-workflows',
      'video_minimax_h3_t2v.json',
    )
    const workflow = JSON.parse(readFileSync(workflowPath, 'utf8')) as Record<string, WorkflowNode>

    expect(workflow['105:104'].class_type).toBe('MiniMaxH3ImageToVideo')
    expect(workflow['105:9'].class_type).toBe('BasicScheduler')
    expect(workflow['105:16'].inputs.model).toEqual(['105:6', 0])
    expect(workflow['92'].class_type).toBe('SaveVideo')
  })

  it('keeps Easy H3 unified graph on FeiHou nodes with empty prompt and 10-step FL2V default', () => {
    const workflowPath = path.join(
      process.cwd(),
      'resources',
      'comfyui-workflows',
      'minimax easy h3 一采.json',
    )
    const workflow = JSON.parse(readFileSync(workflowPath, 'utf8')) as Record<string, WorkflowNode>

    expect(workflow['335']).toMatchObject({
      class_type: 'FeiHouEasyH3',
      inputs: {
        mode: 'image',
        prompt: '',
        seconds: 10,
        aspect_ratio: '16:9',
        width: 1344,
        height: 768,
      },
    })
    expect(workflow['265'].inputs.lora_name).toBe('minimax\\minimax_h3_fl2v_turbo_4step_v1.2_768p_comfyui_bf16.safetensors')
    expect(workflow['278'].inputs.value).toBe(10)
    expect(workflow['299'].class_type).toBe('SaveVideo')
  })

  it('keeps Easy H3 二采 graph on dual samplers without swapping first-pass LoRA', () => {
    const workflowPath = path.join(
      process.cwd(),
      'resources',
      'comfyui-workflows',
      'Minimax easy h3 二采.json',
    )
    const workflow = JSON.parse(readFileSync(workflowPath, 'utf8')) as Record<string, WorkflowNode>

    expect(workflow['335']).toMatchObject({
      class_type: 'FeiHouEasyH3',
      inputs: {
        mode: 'image',
        prompt: '',
        seconds: 10,
        aspect_ratio: '16:9',
      },
    })
    expect(workflow['265'].inputs.lora_name).toBe('minimax\\minimax_h3_fl2v_turbo_4step_v1.2_768p_comfyui_bf16.safetensors')
    expect(workflow['280'].inputs.lora_name).toBe('minimax\\minimax_h3_ref2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors')
    expect(workflow['278'].inputs.value).toBe(9)
    expect(workflow['279'].inputs.value).toBe(6)
    expect(workflow['291'].class_type).toBe('SaveVideo')
    expect(workflow['326'].class_type).toBe('FeiHouEasyH3SecondPassAdapter')
  })



  it('wires each reference video together with its embedded soundtrack', () => {
    const servicePath = path.join(process.cwd(), 'electron', 'main', 'services', 'comfyui.service.ts')
    const service = readFileSync(servicePath, 'utf8')

    expect(service).toContain("setInput('136', `ref_videos.ref_video_${index}`, [componentsNodeId, 0])")
    expect(service).toContain("setInput('136', `ref_video_audios.ref_video_audio_${index}`, [componentsNodeId, 1])")
    expect(service).toContain("setInput('136', `ref_audios.ref_audio_${index}`, [nodeId, 0])")
  })

  it('provides an explicit video-to-audio extraction workflow', () => {
    const servicePath = path.join(process.cwd(), 'electron', 'main', 'services', 'comfyui.service.ts')
    const service = readFileSync(servicePath, 'utf8')

    expect(service).toContain('export async function extractVideoAudioWithComfyUI')
    expect(service).toContain("class_type: 'GetVideoComponents'")
    expect(service).toContain("class_type: 'SaveAudio'")
    expect(service).toContain("path.join(project.folderPath, 'generated', 'audio')")
  })
})
