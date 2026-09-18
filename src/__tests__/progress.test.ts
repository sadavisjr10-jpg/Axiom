import { describe, expect, it } from 'vitest'
import {
  dailySeed,
  emptyProgress,
  markLessonComplete,
  overallMastery,
  parseProgress,
  recordLessonAttempt,
  seededShuffle,
  touchStreak,
} from '../lib/progress'
import { PROGRESS_VERSION, MASTERY_PASS_PCT } from '../types'
import { scheduleReview, dueReviews, almostForgotten } from '../lib/spacedRetrieval'
import { isModuleUnlocked, meetsMasteryGate, syncModuleUnlocks } from '../lib/mastery'
import { courses } from '../data/courses'

describe('parseProgress', () => {
  it('returns empty state for garbage', () => {
    expect(parseProgress(null).version).toBe(PROGRESS_VERSION)
    expect(parseProgress({}).completedLessons).toEqual([])
  })

  it('rejects unknown version', () => {
    const p = parseProgress({ version: 999, streak: 99 })
    expect(p.streak).toBe(0)
  })

  it('migrates v1 → v2 preserving streak and lessons', () => {
    const p = parseProgress({
      version: 1,
      streak: 4,
      lastActiveDate: '2026-09-17',
      completedLessons: ['calculus:limits-continuity'],
      lessonScores: { 'calculus:limits-continuity': 100 },
      courseMastery: { calculus: 25 },
      drillsCompleted: 2,
      flashcardsSeen: ['fc-deriv-def'],
      started: true,
    })
    expect(p.version).toBe(2)
    expect(p.streak).toBe(4)
    expect(p.completedLessons).toContain('calculus:limits-continuity')
    expect(p.reviewSchedule).toEqual({})
    expect(p.unlockedModules).toEqual([])
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

describe('recordLessonAttempt / mastery gate', () => {
  it('does not complete below gate', () => {
    const p = recordLessonAttempt(
      emptyProgress(),
      'calculus:limits-continuity',
      60,
      'calculus',
      4,
      MASTERY_PASS_PCT,
    )
    expect(p.completedLessons).not.toContain('calculus:limits-continuity')
    expect(p.lessonScores['calculus:limits-continuity']).toBe(60)
  })

  it('completes at or above gate', () => {
    const p = recordLessonAttempt(
      emptyProgress(),
      'calculus:limits-continuity',
      80,
      'calculus',
      4,
      MASTERY_PASS_PCT,
    )
    expect(p.completedLessons).toContain('calculus:limits-continuity')
  })

  it('meetsMasteryGate matches 4/5', () => {
    expect(meetsMasteryGate(4, 5)).toBe(true)
    expect(meetsMasteryGate(3, 5)).toBe(false)
  })
})

describe('module unlocks', () => {
  it('first module unlocked; second locked until prior passed', () => {
    const calc = courses.find((c) => c.id === 'calculus')!
    let p = emptyProgress()
    p = syncModuleUnlocks(p, courses)
    expect(isModuleUnlocked(p, calc, 'calc-m1')).toBe(true)
    expect(isModuleUnlocked(p, calc, 'calc-m2')).toBe(false)

    // Pass both lessons in calc-m1
    for (const lesson of calc.modules[0].lessons) {
      p = recordLessonAttempt(p, lesson.id, 100, 'calculus', 4, MASTERY_PASS_PCT)
    }
    p = syncModuleUnlocks(p, courses)
    expect(isModuleUnlocked(p, calc, 'calc-m2')).toBe(true)
    expect(p.unlockedModules).toContain('calc-m2')
  })
})

describe('spaced retrieval', () => {
  it('schedules weak item for tomorrow; success stretches interval', () => {
    let p = emptyProgress()
    p = scheduleReview(p, 'lim-sinx', false, '2026-09-18')
    expect(p.reviewSchedule['lim-sinx'].nextReviewISO).toBe('2026-09-19')
    expect(p.reviewSchedule['lim-sinx'].intervalDays).toBe(1)
    expect(dueReviews(p, '2026-09-19').map((r) => r.objectiveId)).toContain('lim-sinx')

    p = scheduleReview(p, 'lim-sinx', true, '2026-09-19')
    expect(p.reviewSchedule['lim-sinx'].intervalDays).toBe(3)
    expect(p.reviewSchedule['lim-sinx'].nextReviewISO).toBe('2026-09-22')

    const soon = almostForgotten(p, 3, '2026-09-19')
    expect(soon.some((r) => r.objectiveId === 'lim-sinx')).toBe(true)
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
