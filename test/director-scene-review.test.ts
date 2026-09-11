import { describe, expect, it } from 'vitest'
import { getNodeCapabilities } from '../src/shared/node-capabilities'
import { buildSystemPromptAppend } from '../electron/main/services/agent/prompts'
import {
  addDirectorElement,
  createDefaultDirectorProject,
  createDirectorElement,
} from '../src/features/director/director-model'
import {
  applyDirectorReviewAutoFixes,
  directorReviewPassed,
  reviewDirectorProject,
} from '../src/features/director/director-scene-review'
import '../src/components/canvas-capabilities'

describe('director review-scene before export', () => {
  it('blocks export on an empty Agent-built stage', () => {
    const issues = reviewDirectorProject(createDefaultDirectorProject())
    expect(issues.some((issue) => issue.code === 'empty-scene' && issue.severity === 'error')).toBe(true)
    expect(directorReviewPassed(issues)).toBe(false)
  })

  it('auto-fixes sunk actors and floating ground furniture, then passes', () => {
    let project = createDefaultDirectorProject()
    const table = createDirectorElement('table', 0)
    table.transform.position = { x: 0, y: 0.4, z: 0 }
    const actor = createDirectorElement('actor', 1)
    actor.transform.position = { x: 1, y: -0.5, z: 0 }
    project = addDirectorElement(addDirectorElement(project, table), actor)
    expect(reviewDirectorProject(project).map((issue) => issue.code)).toEqual(
      expect.arrayContaining(['not-grounded', 'actor-sunk']),
    )
    const { project: fixed, fixed: names } = applyDirectorReviewAutoFixes(project)
    expect(names.some((name) => name.startsWith('ground:'))).toBe(true)
    expect(names.some((name) => name.startsWith('actor-ground:'))).toBe(true)
    expect(fixed.elements.find((element) => element.kind === 'table')?.transform.position.y).toBe(0)
    expect(fixed.elements.find((element) => element.kind === 'actor')?.transform.position.y).toBe(0)
    expect(directorReviewPassed(reviewDirectorProject(fixed))).toBe(true)
  })

  it('keeps overlapping actors as a warning for the Agent to separate', () => {
    let project = createDefaultDirectorProject()
    const left = createDirectorElement('actor', 0)
    const right = createDirectorElement('actor', 1)
    left.transform.position = { x: 0, y: 0, z: 0 }
    right.transform.position = { x: 0.1, y: 0, z: 0 }
    project = addDirectorElement(addDirectorElement(project, left), right)
    const remaining = reviewDirectorProject(applyDirectorReviewAutoFixes(project).project)
    expect(remaining.some((issue) => issue.code === 'actors-overlapping' && issue.fix === 'agent')).toBe(true)
    expect(directorReviewPassed(remaining)).toBe(true)
  })

  it('retargets a default origin camera when actors are far from origin', () => {
    let project = createDefaultDirectorProject()
    const actor = createDirectorElement('actor', 0)
    actor.transform.position = { x: 8, y: 0, z: 6 }
    project = addDirectorElement(project, actor)
    expect(reviewDirectorProject(project).some((issue) => issue.code === 'camera-misses-subjects')).toBe(true)
    const { project: fixed } = applyDirectorReviewAutoFixes(project)
    expect(fixed.shots[0].target.x).toBeCloseTo(8)
    expect(fixed.shots[0].target.z).toBeCloseTo(6)
    expect(reviewDirectorProject(fixed).some((issue) => issue.code === 'camera-misses-subjects')).toBe(false)
  })

  it('exposes review-scene to Agent capabilities and system prompt', () => {
    const actions = getNodeCapabilities('director')!.actions.map((action) => action.id)
    expect(actions).toContain('review-scene')
    expect(actions.indexOf('review-scene')).toBeLessThan(actions.indexOf('capture-still'))
    const prompt = buildSystemPromptAppend('project')
    expect(prompt).toContain('review-scene')
    expect(prompt).toContain('禁止搭完立刻 capture-still / export-video')
  })
})
