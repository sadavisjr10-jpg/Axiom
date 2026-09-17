import { describe, expect, it } from 'vitest'
import {
  dailySeed,
  emptyProgress,
  markLessonComplete,
  overallMastery,
  parseProgress,
  seededShuffle,
  touchStreak,
} from '../lib/progress'
import { PROGRESS_VERSION } from '../types'

describe('parseProgress', () => {
  it('returns empty state for garbage', () => {
    expect(parseProgress(null).version).toBe(PROGRESS_VERSION)
    expect(parseProgress({}).completedLessons).toEqual([])
  })

  it('rejects wrong version', () => {
    const p = parseProgress({ version: 999, streak: 99 })
    expect(p.streak).toBe(0)
  })

  it('clamps mastery', () => {
    const p = parseProgress({
      version: PROGRESS_VERSION,
      courseMastery: { calculus: 150, mechanics: -10 },
    })
    expect(p.courseMastery.calculus).toBe(100)
    expect(p.courseMastery.mechanics).toBe(0)
  })
})

describe('touchStreak', () => {
  it('starts at 1', () => {
    const p = touchStreak(emptyProgress(), '2026-09-14')
    expect(p.streak).toBe(1)
    expect(p.lastActiveDate).toBe('2026-09-14')
  })

  it('increments on consecutive day', () => {
    let p = touchStreak(emptyProgress(), '2026-09-13')
    p = touchStreak(p, '2026-09-14')
    expect(p.streak).toBe(2)
  })

  it('resets after a gap', () => {
    let p = touchStreak(emptyProgress(), '2026-09-10')
    p = { ...p, streak: 5 }
    p = touchStreak(p, '2026-09-14')
    expect(p.streak).toBe(1)
  })

  it('is idempotent same day', () => {
    let p = touchStreak(emptyProgress(), '2026-09-14')
    p = touchStreak(p, '2026-09-14')
    expect(p.streak).toBe(1)
  })
})

describe('markLessonComplete', () => {
  it('records lesson and updates mastery', () => {
    const p = markLessonComplete(emptyProgress(), 'calculus:limits-continuity', 100, 'calculus', 4)
    expect(p.completedLessons).toContain('calculus:limits-continuity')
    expect(p.courseMastery.calculus).toBe(25)
  })
})

describe('overallMastery', () => {
  it('averages courses', () => {
    const base = emptyProgress()
    base.courseMastery.calculus = 100
    base.courseMastery.mechanics = 50
    expect(overallMastery(base)).toBe(Math.round(150 / 6))
  })
})

describe('dailySeed / shuffle', () => {
  it('is deterministic', () => {
    expect(dailySeed('2026-09-14')).toBe(dailySeed('2026-09-14'))
    const a = seededShuffle([1, 2, 3, 4, 5], 42)
    const b = seededShuffle([1, 2, 3, 4, 5], 42)
    expect(a).toEqual(b)
  })
})
