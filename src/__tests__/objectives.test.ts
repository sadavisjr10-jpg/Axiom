import { describe, expect, it } from 'vitest'
import { allLessons, courses } from '../data/courses'
import { enrichObjective, objectiveVideos, realityFor, sectionReality } from '../data/enrichment'
import type { ObjectiveDemoId, SectionVisualId } from '../types'

const DEMO_IDS: ObjectiveDemoId[] = [
  'limit-approach',
  'one-sided',
  'sinx-x',
  'limit-fail',
  'secant-tangent',
  'power-rule',
  'product-rule',
  'ftc-area',
  'const-accel',
  'free-body',
  'force-components',
  'particle-eq',
  'voltage-divider',
  'kvl-loop',
  'ideal-gas',
  'first-law',
  'stress-strain',
  'hall-petch',
]

describe('lesson objectives', () => {
  it('every lesson has discrete objectives (not a blob section)', () => {
    const lessons = allLessons()
    expect(lessons.length).toBeGreaterThanOrEqual(14)
    for (const { lesson } of lessons) {
      expect(lesson.objectives.length).toBeGreaterThanOrEqual(3)
      expect(lesson.sections.some((s) => s.heading === 'Learning objectives')).toBe(false)
      for (const obj of lesson.objectives) {
        expect(obj.id).toBeTruthy()
        expect(obj.title.length).toBeGreaterThan(2)
        expect(obj.summary.length).toBeGreaterThan(10)
        if (obj.demo) {
          expect(DEMO_IDS).toContain(obj.demo)
        }
      }
    }
  })

  it('core concepts have demos', () => {
    const byId = Object.fromEntries(allLessons().map(({ lesson }) => [lesson.id, lesson]))
    const needDemo = [
      'calculus:limits-continuity',
      'calculus:derivative-intro',
      'mechanics:newton2',
      'circuits:voltage-divider',
      'thermo:ideal-gas',
      'materials:stress-strain',
    ]
    for (const id of needDemo) {
      const demos = byId[id].objectives.filter((o) => o.demo)
      expect(demos.length).toBeGreaterThanOrEqual(1)
    }
  })

  it('instruction sections include supportive visuals across courses', () => {
    const withVisual = courses.flatMap((c) =>
      c.modules.flatMap((m) => m.lessons.flatMap((l) => l.sections.filter((s) => s.visual))),
    )
    expect(withVisual.length).toBeGreaterThanOrEqual(20)
    for (const s of withVisual) {
      expect(typeof s.visual).toBe('string')
      expect((s.visual as SectionVisualId).length).toBeGreaterThan(2)
    }
  })

  it('enrichment adds world context and curated videos sparingly', () => {
    const lessons = allLessons()
    let withWorld = 0
    let withVideo = 0
    for (const { lesson } of lessons) {
      for (const raw of lesson.objectives) {
        const obj = enrichObjective(raw)
        if (obj.worldContext) withWorld += 1
        if (obj.video) {
          withVideo += 1
          expect(obj.video.youtubeId.length).toBeGreaterThan(5)
          expect(obj.video.cue.length).toBeGreaterThan(10)
        }
      }
    }
    expect(withWorld).toBeGreaterThanOrEqual(40)
    // curated, not spam
    expect(withVideo).toBeGreaterThanOrEqual(5)
    expect(withVideo).toBeLessThanOrEqual(Object.keys(objectiveVideos).length)
    expect(Object.keys(objectiveVideos).length).toBeLessThanOrEqual(12)
  })

  it('theory→reality callouts cover major sections', () => {
    expect(Object.keys(sectionReality).length).toBeGreaterThanOrEqual(25)
    expect(realityFor('circuits:voltage-divider', 'Derive the formula')).toBeTruthy()
    expect(realityFor('mechanics:newton2', 'FBD discipline')).toBeTruthy()
  })
})
