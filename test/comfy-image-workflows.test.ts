import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { imageDimensionsFor, videoDimensionsFor } from '../src/shared/media-dimensions'

type WorkflowNode = {
  class_type: string
  inputs: Record<string, unknown>
}

describe('Krea 2 Turbo image workflow', () => {
  it('uses the expected model, 8-step sampler, and direct 2K decoded output', () => {
    const workflowDirectory = path.join(process.cwd(), 'resources', 'comfyui-workflows')
    const workflowPath = path.join(workflowDirectory, 'krea2-turbo-text-to-image.json')
    const workflow = JSON.parse(readFileSync(workflowPath, 'utf8')) as Record<string, WorkflowNode>

    expect(workflow['30:10']).toMatchObject({
      class_type: 'UNETLoader',
      inputs: { unet_name: 'krea2\\krea2_turbo_int8_convrot.safetensors' },
    })
    expect(workflow['30:12'].inputs.vae_name).toBe('qwan\\qwen_image_vae.safetensors')
    expect(workflow['30:6']).toMatchObject({
      class_type: 'CLIPTextEncode',
      inputs: { text: '' },
    })
    expect(workflow['30:3'].inputs).toMatchObject({
      steps: 8,
      cfg: 1,
      sampler_name: 'euler',
      scheduler: 'simple',
      positive: ['30:6', 0],
    })
    expect(workflow['30:5'].inputs).toMatchObject({ width: 2048, height: 1152 })
    expect(workflow['51']).toBeUndefined()
    expect(workflow['29'].inputs.images).toEqual(['30:8', 0])

    const zImageWorkflow = JSON.parse(readFileSync(
      path.join(workflowDirectory, 'z-image-turbo-text-to-image.json'),
      'utf8',
    )) as Record<string, WorkflowNode>
    expect(zImageWorkflow['57:13'].inputs).toMatchObject({ width: 2048, height: 1152 })
    expect(zImageWorkflow['57:62']).toBeUndefined()
    expect(zImageWorkflow['9'].inputs.images).toEqual(['57:8', 0])
    expect(zImageWorkflow['57:28'].inputs.unet_name).toBe('z-image\\z_image_turbo_bf16.safetensors')
    expect(zImageWorkflow['57:30'].inputs.clip_name).toBe('z-image\\qwen_3_4b.safetensors')
    expect(zImageWorkflow['57:29'].inputs.vae_name).toBe('z-image\\ae.safetensors')
    expect(existsSync(path.join(workflowDirectory, 'flux2-klein-9b-text-to-image.json'))).toBe(false)
    expect(existsSync(path.join(workflowDirectory, 'flux2-klein-9b-image-edit.json'))).toBe(false)
  })

  it('keeps image output at standard 2K and H3 video at the 0.98MP class', () => {
    expect(imageDimensionsFor('16:9')).toEqual({ width: 2048, height: 1152 })
    expect(imageDimensionsFor('9:16')).toEqual({ width: 1152, height: 2048 })
    expect(imageDimensionsFor('4:3')).toEqual({ width: 2048, height: 1536 })
    expect(imageDimensionsFor('1:1')).toEqual({ width: 2048, height: 2048 })
    expect(videoDimensionsFor('16:9')).toEqual({ width: 1344, height: 768 })
    expect(videoDimensionsFor('9:16')).toEqual({ width: 768, height: 1344 })
    expect(videoDimensionsFor('4:3')).toEqual({ width: 1152, height: 864 })
    expect(videoDimensionsFor('3:4')).toEqual({ width: 864, height: 1152 })
    expect(videoDimensionsFor('1:1')).toEqual({ width: 992, height: 992 })
  })
})
