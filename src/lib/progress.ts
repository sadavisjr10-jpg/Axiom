import type { CourseId, ProgressState, ReviewItem } from '../types'
import { PROGRESS_VERSION } from '../types'

export const STORAGE_KEY = 'axiom-progress-v1'

export const COURSE_IDS: CourseId[] = [
  'calculus',
  'mechanics',
  'statics',
  'circuits',
  'thermo',
  'materials',
]

export function emptyProgress(): ProgressState {
  const courseMastery = Object.fromEntries(
    COURSE_IDS.map((id) => [id, 0]),
  ) as Record<CourseId, number>
  return {
    version: PROGRESS_VERSION,
    streak: 0,
    lastActiveDate: null,
    completedLessons: [],
    lessonScores: {},
    courseMastery,
    drillsCompleted: 0,
    flashcardsSeen: [],
    started: false,
    reviewSchedule: {},
    unlockedModules: [],
  }
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

function daysBetween(a: string, b: string): number {
  const ms = Date.parse(b) - Date.parse(a)
  return Math.round(ms / 86_400_000)
}

function parseReviewSchedule(raw: unknown): Record<string, ReviewItem> {
  if (!raw || typeof raw !== 'object') return {}
  const out: Record<string, ReviewItem> = {}
  for (const [key, val] of Object.entries(raw as Record<string, unknown>)) {
    if (!val || typeof val !== 'object') continue
    const v = val as Partial<ReviewItem>
    if (typeof v.nextReviewISO !== 'string') continue
    out[key] = {
      objectiveId: typeof v.objectiveId === 'string' ? v.objectiveId : key,
      nextReviewISO: v.nextReviewISO,
      intervalDays: typeof v.intervalDays === 'number' ? Math.max(1, v.intervalDays) : 1,
      strength: typeof v.strength === 'number' ? Math.max(0, v.strength) : 0,
      lastResult: v.lastResult === 'ok' ? 'ok' : 'weak',
      updatedISO: typeof v.updatedISO === 'string' ? v.updatedISO : v.nextReviewISO,
    }
  }
  return out
}

/** Migrate / validate stored JSON into ProgressState (v1 → v2 safe). */
export function parseProgress(raw: unknown): ProgressState {
  const base = emptyProgress()
  if (!raw || typeof raw !== 'object') return base
  const o = raw as Record<string, unknown>

  // Accept v1 (migrate) or v2; reject unknown future/garbage versions
  const ver = o.version
  if (ver !== 1 && ver !== PROGRESS_VERSION) return base

  const courseMastery = { ...base.courseMastery }
  if (o.courseMastery && typeof o.courseMastery === 'object') {
    for (const id of COURSE_IDS) {
      const v = (o.courseMastery as Record<string, unknown>)[id]
      if (typeof v === 'number' && Number.isFinite(v)) {
        courseMastery[id] = Math.max(0, Math.min(100, v))
      }
    }
  }

  const completedLessons = Array.isArray(o.completedLessons)
    ? o.completedLessons.filter((x): x is string => typeof x === 'string')
    : []
  const flashcardsSeen = Array.isArray(o.flashcardsSeen)
    ? o.flashcardsSeen.filter((x): x is string => typeof x === 'string')
    : []
  const unlockedModules = Array.isArray(o.unlockedModules)
    ? o.unlockedModules.filter((x): x is string => typeof x === 'string')
    : []

  return {
    version: PROGRESS_VERSION,
    streak: typeof o.streak === 'number' ? Math.max(0, o.streak) : 0,
    lastActiveDate: typeof o.lastActiveDate === 'string' ? o.lastActiveDate : null,
    completedLessons,
    lessonScores:
      o.lessonScores && typeof o.lessonScores === 'object'
        ? (Object.fromEntries(
            Object.entries(o.lessonScores as Record<string, unknown>).filter(
              (entry): entry is [string, number] => typeof entry[1] === 'number',
            ),
          ) as Record<string, number>)
        : {},
    courseMastery,
    drillsCompleted:
      typeof o.drillsCompleted === 'number' ? Math.max(0, o.drillsCompleted) : 0,
    flashcardsSeen,
    started: Boolean(o.started),
    reviewSchedule: parseReviewSchedule(o.reviewSchedule),
    unlockedModules,
  }
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    return parseProgress(JSON.parse(raw))
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(state: ProgressState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function resetProgress(): ProgressState {
  const next = emptyProgress()
  saveProgress(next)
  return next
}

/** Update streak based on calendar day activity */
export function touchStreak(state: ProgressState, now = todayISO()): ProgressState {
  if (state.lastActiveDate === now) {
    return { ...state, started: true }
  }
  let streak = 1
  if (state.lastActiveDate) {
    const gap = daysBetween(state.lastActiveDate, now)
    if (gap === 1) streak = state.streak + 1
    else if (gap === 0) streak = state.streak
    else streak = 1
  }
  return {
    ...state,
    streak,
    lastActiveDate: now,
    started: true,
  }
}

export function markLessonComplete(
  state: ProgressState,
  lessonId: string,
  scorePct: number,
  courseId: CourseId,
  totalLessonsInCourse: number,
): ProgressState {
  const completed = state.completedLessons.includes(lessonId)
    ? state.completedLessons
    : [...state.completedLessons, lessonId]
  const lessonScores = {
    ...state.lessonScores,
    [lessonId]: Math.max(state.lessonScores[lessonId] ?? 0, scorePct),
  }
  const courseLessonIds = completed.filter((id) => id.startsWith(`${courseId}:`))
  const mastery =
    totalLessonsInCourse > 0
      ? Math.round((courseLessonIds.length / totalLessonsInCourse) * 100)
      : 0
  return touchStreak({
    ...state,
    completedLessons: completed,
    lessonScores,
    courseMastery: { ...state.courseMastery, [courseId]: mastery },
  })
}

/** Record a quiz attempt; only marks complete when score meets mastery gate. */
export function recordLessonAttempt(
  state: ProgressState,
  lessonId: string,
  scorePct: number,
  courseId: CourseId,
  totalLessonsInCourse: number,
  passPct: number,
): ProgressState {
  const lessonScores = {
    ...state.lessonScores,
    [lessonId]: Math.max(state.lessonScores[lessonId] ?? 0, scorePct),
  }
  let next: ProgressState = touchStreak({ ...state, lessonScores })
  if (scorePct >= passPct) {
    next = markLessonComplete(next, lessonId, scorePct, courseId, totalLessonsInCourse)
  }
  return next
}

export function recordDrill(state: ProgressState): ProgressState {
  return touchStreak({
    ...state,
    drillsCompleted: state.drillsCompleted + 1,
  })
}

export function overallMastery(state: ProgressState): number {
  const vals = COURSE_IDS.map((id) => state.courseMastery[id] ?? 0)
  if (vals.length === 0) return 0
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
}

export function lessonsDoneCount(state: ProgressState): number {
  return state.completedLessons.length
}

/** Deterministic daily seed from date string YYYY-MM-DD */
export function dailySeed(dateISO = todayISO()): number {
  let h = 2166136261
  for (let i = 0; i < dateISO.length; i++) {
    h ^= dateISO.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function seededShuffle<T>(items: T[], seed: number): T[] {
  const arr = [...items]
  let s = seed || 1
  for (let i = arr.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}
