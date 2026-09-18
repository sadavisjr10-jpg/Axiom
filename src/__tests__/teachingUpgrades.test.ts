import { describe, expect, it } from 'vitest'
import { examplePractice } from '../data/examplePractice'
import { contrastClinics, clinicsForLesson } from '../data/contrastClinics'
import { demoPredictions } from '../data/demoPredictions'
import { drillObjectiveMap } from '../data/drillObjectives'
import { allLessons } from '../data/courses'
import { drillBank } from '../data/drills'

describe('worked-example fading data', () => {
  it('covers every worked example with a Your-turn practice', () => {
    const ids = allLessons().flatMap(({ lesson }) => lesson.workedExamples.map((e) => e.id))
    const missing = ids.filter((id) => !examplePractice[id])
    expect(missing).toEqual([])
  })
})

describe('contrast clinics', () => {
  it('includes statics and circuits priority cases', () => {
    const statics = contrastClinics.filter((c) => c.courseId === 'statics')
    const circuits = contrastClinics.filter((c) => c.courseId === 'circuits')
    expect(statics.length).toBeGreaterThanOrEqual(4)
    expect(circuits.length).toBeGreaterThanOrEqual(4)
  })

  it('attaches clinics to lessons that have common-mistake sections', () => {
    const withMistakes = allLessons().filter(({ lesson }) =>
      lesson.sections.some((s) => s.heading === 'Common mistakes'),
    )
    expect(withMistakes.length).toBeGreaterThanOrEqual(10)
    for (const { lesson } of withMistakes) {
      expect(clinicsForLesson(lesson.id).length).toBeGreaterThanOrEqual(1)
    }
  })

  it('wrongIndex is 0 or 1', () => {
    for (const c of contrastClinics) {
      expect([0, 1]).toContain(c.wrongIndex)
    }
  })
})

describe('predict–commit demo coverage', () => {
  it('has predictions for key demos', () => {
    const keys = Object.keys(demoPredictions)
    expect(keys.length).toBeGreaterThanOrEqual(10)
    expect(demoPredictions['voltage-divider']).toBeTruthy()
    expect(demoPredictions['force-components']).toBeTruthy()
  })
})

describe('drill ↔ objective map', () => {
  it('maps every drill question', () => {
    for (const q of drillBank) {
      expect(drillObjectiveMap[q.id]).toBeTruthy()
    }
  })
})
