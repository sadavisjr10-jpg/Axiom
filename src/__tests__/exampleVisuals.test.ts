import { describe, expect, it } from 'vitest'
import { allLessons } from '../data/courses'
import { EXAMPLE_VISUAL_BY_ID, hasExampleVisual } from '../components/demos/ExampleVisuals'
import type { ExampleVisualKind } from '../types'

const KINDS: ExampleVisualKind[] = [
  'poly-limit',
  'removable-hole',
  'scaled-sinc',
  'signum-jump',
  'secant-at',
  'line-slope',
  'product-uv',
  'power-recip',
  'area-integral',
  'kinematics',
  'fbd-push',
  'fbd-elevator',
  'vector-sum',
  'particle-cables',
  'divider',
  'series-kvl',
  'kcl-node',
  'pvt-state',
  'energy-balance',
  'hooke-rod',
  'poisson-lateral',
  'stress-bar',
  'hall-petch',
  'arrhenius',
]

describe('worked example visuals', () => {
  it('covers every worked example with a visual', () => {
    const examples = allLessons().flatMap(({ lesson }) => lesson.workedExamples)
    expect(examples.length).toBeGreaterThanOrEqual(30)
    const missing: string[] = []
    for (const ex of examples) {
      if (!hasExampleVisual(ex.id, ex.visual)) missing.push(ex.id)
    }
    expect(missing).toEqual([])
  })

  it('registry kinds are valid', () => {
    for (const [id, spec] of Object.entries(EXAMPLE_VISUAL_BY_ID)) {
      expect(id.startsWith('we-')).toBe(true)
      expect(KINDS).toContain(spec.kind)
    }
  })

  it('registry size matches worked-example count', () => {
    const examples = allLessons().flatMap(({ lesson }) => lesson.workedExamples)
    expect(Object.keys(EXAMPLE_VISUAL_BY_ID).length).toBe(examples.length)
  })
})
