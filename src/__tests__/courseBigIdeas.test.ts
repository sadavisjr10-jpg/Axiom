import { describe, expect, it } from 'vitest'
import { courses } from '../data/courses'
import { courseBigIdeas, courseBigIdea } from '../data/courseBigIdeas'
import type { CourseId } from '../types'

const ALL: CourseId[] = [
  'calculus',
  'mechanics',
  'statics',
  'circuits',
  'thermo',
  'materials',
]

describe('course-level Big Idea', () => {
  it('covers all six courses', () => {
    expect(Object.keys(courseBigIdeas).sort()).toEqual([...ALL].sort())
    expect(courses.map((c) => c.id).sort()).toEqual([...ALL].sort())
  })

  it('every course exposes a rich bigIdea on the Course object', () => {
    for (const course of courses) {
      const pe = course.bigIdea
      expect(pe, `missing bigIdea for ${course.id}`).toBeTruthy()
      expect(pe).toEqual(courseBigIdea(course.id))
      expect(pe.solves.length).toBeGreaterThan(40)
      expect(pe.idea.length).toBeGreaterThan(120)
      expect(pe.idea.slice(0, 40)).not.toMatch(/^[Σ∫σεΔ].*=/)
      expect(pe.jargon?.length ?? 0).toBeGreaterThanOrEqual(2)
      for (const j of pe.jargon ?? []) {
        expect(j.term.length).toBeGreaterThan(1)
        expect(j.meaning.length).toBeGreaterThan(10)
      }
      expect(pe.bridge?.length ?? 0).toBeGreaterThan(20)
    }
  })
})
