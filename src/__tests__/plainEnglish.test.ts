import { describe, expect, it } from 'vitest'
import { allLessons } from '../data/courses'
import { plainEnglishByLesson, plainEnglishFor } from '../data/plainEnglish'
import { formulas } from '../data/formulas'

describe('plain-English teaching stretch', () => {
  it('covers every lesson across all six courses', () => {
    const lessons = allLessons()
    expect(lessons.length).toBeGreaterThanOrEqual(14)
    const courseIds = new Set(lessons.map(({ course }) => course.id))
    expect(courseIds.size).toBe(6)

    for (const { lesson } of lessons) {
      const pe = lesson.plainEnglish ?? plainEnglishFor(lesson.id)
      expect(pe, `missing plainEnglish for ${lesson.id}`).toBeTruthy()
      expect(pe!.solves.length).toBeGreaterThan(40)
      expect(pe!.idea.length).toBeGreaterThan(120)
      // Opening stretch should not lead with equation-heavy notation
      expect(pe!.idea.slice(0, 40)).not.toMatch(/^[Σ∫σεΔ].*=/)
      expect(pe!.jargon?.length ?? 0).toBeGreaterThanOrEqual(2)
      for (const j of pe!.jargon ?? []) {
        expect(j.term.length).toBeGreaterThan(1)
        expect(j.meaning.length).toBeGreaterThan(10)
      }
      expect(pe!.bridge?.length ?? 0).toBeGreaterThan(20)
    }
  })

  it('registry keys match lesson ids exactly', () => {
    const ids = new Set(allLessons().map(({ lesson }) => lesson.id))
    expect(Object.keys(plainEnglishByLesson).sort()).toEqual([...ids].sort())
  })

  it('opening instruction sections lead with words before dense notation', () => {
    for (const { lesson } of allLessons()) {
      const first = lesson.sections[0]
      expect(first).toBeTruthy()
      // First ~50 chars should be prose, not a bare equation
      const head = first.body.trim().slice(0, 50)
      expect(head).not.toMatch(/^(lim|ΣF|PV\s*=|σ\s*=|V_out\s*=|d\/dx)/)
    }
  })
})

describe('formula plain-language enrichment', () => {
  it('every formula has a plainLanguage teaching line', () => {
    expect(formulas.length).toBeGreaterThanOrEqual(40)
    for (const f of formulas) {
      expect(f.description.length).toBeGreaterThan(10)
      expect(f.plainLanguage, f.id).toBeTruthy()
      expect(f.plainLanguage!.length).toBeGreaterThan(30)
    }
  })
})
