import type { DirectorElement, DirectorProject, DirectorVec3 } from '../../shared/director.types'
import {
  patchDirectorShot,
  updateDirectorElement,
  upsertDirectorCameraKeyframe,
  validateDirectorProject,
} from './director-model'

export type DirectorReviewSeverity = 'error' | 'warning'
export type DirectorReviewFix = 'auto' | 'agent'

export interface DirectorReviewIssue {
  code: string
  severity: DirectorReviewSeverity
  message: string
  fix: DirectorReviewFix
  shotId?: string
  elementId?: string
}

const GROUND_KINDS = new Set(['floor', 'wall', 'table', 'chair', 'sofa', 'bed', 'cabinet', 'doorframe', 'stairs'])
const near = (a: DirectorVec3, b: DirectorVec3, eps = 0.08) => (
  Math.abs(a.x - b.x) < eps && Math.abs(a.y - b.y) < eps && Math.abs(a.z - b.z) < eps
)
const xzDistance = (a: DirectorVec3, b: DirectorVec3) => Math.hypot(a.x - b.x, a.z - b.z)

const centroidOf = (elements: DirectorElement[], y = 1.2): DirectorVec3 => {
  const count = elements.length
  return {
    x: elements.reduce((sum, element) => sum + element.transform.position.x, 0) / count,
    y,
    z: elements.reduce((sum, element) => sum + element.transform.position.z, 0) / count,
  }
}

export function reviewDirectorProject(project: DirectorProject): DirectorReviewIssue[] {
  const issues: DirectorReviewIssue[] = validateDirectorProject(project).map((message) => ({
    code: 'invalid-project',
    severity: 'error',
    message,
    fix: 'agent',
  }))
  if (project.elements.length === 0) {
    issues.push({ code: 'empty-scene', severity: 'error', message: '导演台没有任何场景元素，先搭景再导出', fix: 'agent' })
  }
  const actors = project.elements.filter((element) => element.kind === 'actor' || element.kind === 'crowd')
  if (project.elements.length > 0 && actors.length === 0) {
    issues.push({ code: 'no-actors', severity: 'warning', message: '场景没有演员或群众；若镜头需要人物占位，先 add-element', fix: 'agent' })
  }
  for (const element of project.elements) {
    const { x, y, z } = element.transform.scale
    if (x < 0.01 || y < 0.01 || z < 0.01) {
      issues.push({ code: 'degenerate-scale', severity: 'error', message: `${element.name} 的尺寸过小，无法作为有效白模`, fix: 'agent', elementId: element.id })
    }
    if (GROUND_KINDS.has(element.kind) && Math.abs(element.transform.position.y) > 0.02) {
      issues.push({ code: 'not-grounded', severity: 'error', message: `${element.name} 应贴地但 position.y=${element.transform.position.y}`, fix: 'auto', elementId: element.id })
    }
    if ((element.kind === 'actor' || element.kind === 'crowd') && element.transform.position.y < -0.02) {
      issues.push({ code: 'actor-sunk', severity: 'error', message: `${element.name} 沉到地面以下`, fix: 'auto', elementId: element.id })
    }
  }
  for (let index = 0; index < actors.length; index++) {
    for (let other = index + 1; other < actors.length; other++) {
      if (xzDistance(actors[index].transform.position, actors[other].transform.position) < 0.35) {
        issues.push({
          code: 'actors-overlapping',
          severity: 'warning',
          message: `${actors[index].name} 与 ${actors[other].name} 站位过近，请分开`,
          fix: 'agent',
          elementId: actors[index].id,
        })
      }
    }
  }
  const focus = actors.length > 0 ? centroidOf(actors) : null
  for (const shot of project.shots) {
    if (shot.durationSec > 60) {
      issues.push({ code: 'shot-too-long', severity: 'error', message: `${shot.name} 时长超过 60 秒，预演无法导出`, fix: 'agent', shotId: shot.id })
    }
    if (shot.cameraKeyframes.length === 0 || !shot.cameraKeyframes.some((keyframe) => keyframe.frame === 0)) {
      issues.push({ code: 'missing-frame0', severity: 'error', message: `${shot.name} 缺少第 0 帧相机关键帧`, fix: 'auto', shotId: shot.id })
    }
    if (focus && near(shot.target, { x: 0, y: 1, z: 0 }) && xzDistance(focus, { x: 0, y: 0, z: 0 }) > 3) {
      issues.push({ code: 'camera-misses-subjects', severity: 'warning', message: `${shot.name} 仍看向原点，人物不在画面中心`, fix: 'auto', shotId: shot.id })
    }
  }
  return issues
}

export function applyDirectorReviewAutoFixes(project: DirectorProject): { project: DirectorProject; fixed: string[] } {
  let next = project
  const fixed: string[] = []
  for (const element of next.elements) {
    if (GROUND_KINDS.has(element.kind) && Math.abs(element.transform.position.y) > 0.02) {
      next = updateDirectorElement(next, {
        ...element,
        transform: { ...element.transform, position: { ...element.transform.position, y: 0 } },
      })
      fixed.push(`ground:${element.id}`)
    }
    if ((element.kind === 'actor' || element.kind === 'crowd') && element.transform.position.y < -0.02) {
      next = updateDirectorElement(next, {
        ...element,
        transform: { ...element.transform, position: { ...element.transform.position, y: 0 } },
      })
      fixed.push(`actor-ground:${element.id}`)
    }
  }
  const actors = next.elements.filter((element) => element.kind === 'actor' || element.kind === 'crowd')
  const focus = actors.length > 0 ? centroidOf(actors) : null
  for (const shot of next.shots) {
    if (shot.cameraKeyframes.length === 0 || !shot.cameraKeyframes.some((keyframe) => keyframe.frame === 0)) {
      next = upsertDirectorCameraKeyframe(next, shot.id, 0, {
        position: shot.position,
        target: shot.target,
        fov: shot.fov,
      }, 'smooth')
      fixed.push(`frame0:${shot.id}`)
    }
    if (focus && near(shot.target, { x: 0, y: 1, z: 0 }) && xzDistance(focus, { x: 0, y: 0, z: 0 }) > 3) {
      next = patchDirectorShot(next, shot.id, { target: focus })
      next = upsertDirectorCameraKeyframe(next, shot.id, 0, {
        position: shot.position,
        target: focus,
        fov: shot.fov,
      }, shot.cameraKeyframes[0]?.interpolation ?? 'smooth')
      fixed.push(`retarget:${shot.id}`)
    }
  }
  return { project: next, fixed }
}

export function directorReviewPassed(issues: DirectorReviewIssue[]): boolean {
  return !issues.some((issue) => issue.severity === 'error')
}
