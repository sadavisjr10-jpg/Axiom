import type { ProgressState, ReviewItem } from '../types'

const MS_DAY = 86_400_000

function todayISO(now = new Date()): string {
  return now.toISOString().slice(0, 10)
}

function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00.000Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function daysUntil(iso: string, nowISO: string): number {
  return Math.round((Date.parse(iso) - Date.parse(nowISO)) / MS_DAY)
}

function nextInterval(prevDays: number, correct: boolean): number {
  if (!correct) return 1
  if (prevDays <= 1) return 3
  if (prevDays <= 3) return 7
  if (prevDays <= 7) return 14
  return 30
}

/** Schedule / reschedule a review after a correct or incorrect retrieval. */
export function scheduleReview(
  state: ProgressState,
  objectiveId: string,
  correct: boolean,
  nowISO = todayISO(),
): ProgressState {
  const prev = state.reviewSchedule[objectiveId]
  const intervalDays = nextInterval(prev?.intervalDays ?? 0, correct)
  const strength = correct
    ? Math.min(5, (prev?.strength ?? 0) + 1)
    : Math.max(0, (prev?.strength ?? 0) - 1)

  const item: ReviewItem = {
    objectiveId,
    nextReviewISO: addDaysISO(nowISO, intervalDays),
    intervalDays,
    strength,
    lastResult: correct ? 'ok' : 'weak',
    updatedISO: nowISO,
  }

  return {
    ...state,
    reviewSchedule: { ...state.reviewSchedule, [objectiveId]: item },
  }
}

/** Items due today or overdue. */
export function dueReviews(state: ProgressState, nowISO = todayISO()): ReviewItem[] {
  return Object.values(state.reviewSchedule)
    .filter((item) => item.nextReviewISO <= nowISO)
    .sort((a, b) => {
      if (a.strength !== b.strength) return a.strength - b.strength
      return a.nextReviewISO.localeCompare(b.nextReviewISO)
    })
}

/** Items due within the next few days (almost forgotten surface). */
export function almostForgotten(
  state: ProgressState,
  withinDays = 1,
  nowISO = todayISO(),
): ReviewItem[] {
  return Object.values(state.reviewSchedule)
    .filter((item) => {
      const d = daysUntil(item.nextReviewISO, nowISO)
      return d >= 0 && d <= withinDays
    })
    .sort((a, b) => a.nextReviewISO.localeCompare(b.nextReviewISO))
}

export function seedWeakObjective(
  state: ProgressState,
  objectiveId: string,
  nowISO = todayISO(),
): ProgressState {
  if (state.reviewSchedule[objectiveId]) return state
  return scheduleReview(state, objectiveId, false, nowISO)
}

export { todayISO, addDaysISO }
