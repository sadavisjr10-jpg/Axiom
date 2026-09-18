import type { Course, Module, ProgressState } from '../types'
import { MASTERY_PASS_PCT } from '../types'

/** Lesson quiz passes when score meets the mastery gate (e.g. 80% ≈ 4/5). */
export function lessonPassed(state: ProgressState, lessonId: string): boolean {
  const score = state.lessonScores[lessonId]
  return typeof score === 'number' && score >= MASTERY_PASS_PCT
}

/** First module in a course is always unlocked; later modules need prior module passed. */
export function isModuleUnlocked(
  state: ProgressState,
  course: Course,
  moduleId: string,
): boolean {
  if (state.unlockedModules.includes(moduleId)) return true
  const idx = course.modules.findIndex((m) => m.id === moduleId)
  if (idx <= 0) return true
  // Unlock if every earlier module is fully passed
  for (let i = 0; i < idx; i++) {
    if (!moduleFullyPassed(state, course.modules[i])) return false
  }
  return true
}

export function moduleFullyPassed(state: ProgressState, mod: Module): boolean {
  return mod.lessons.every((l) => lessonPassed(state, l.id))
}

/** Persist unlocks for modules that are now open; returns updated state. */
export function syncModuleUnlocks(state: ProgressState, courses: Course[]): ProgressState {
  const unlocked = new Set(state.unlockedModules)
  for (const course of courses) {
    course.modules.forEach((mod, idx) => {
      if (idx === 0) {
        unlocked.add(mod.id)
        return
      }
      const priorOk = course.modules.slice(0, idx).every((m) => moduleFullyPassed(state, m))
      if (priorOk) unlocked.add(mod.id)
    })
  }
  const next = [...unlocked]
  if (
    next.length === state.unlockedModules.length &&
    next.every((id) => state.unlockedModules.includes(id))
  ) {
    return state
  }
  return { ...state, unlockedModules: next }
}

export function passThresholdLabel(questionCount: number): string {
  const need = Math.ceil((MASTERY_PASS_PCT / 100) * questionCount)
  return `${need}/${questionCount}`
}

export function meetsMasteryGate(correct: number, total: number): boolean {
  if (total <= 0) return true
  return Math.round((correct / total) * 100) >= MASTERY_PASS_PCT
}
