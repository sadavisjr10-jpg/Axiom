import { useCallback, useEffect, useState } from 'react'
import type { CourseId, ProgressState } from '../types'
import { MASTERY_PASS_PCT } from '../types'
import {
  loadProgress,
  overallMastery,
  recordDrill,
  recordLessonAttempt,
  resetProgress,
  saveProgress,
  touchStreak,
} from '../lib/progress'
import { scheduleReview } from '../lib/spacedRetrieval'
import { syncModuleUnlocks } from '../lib/mastery'
import { courses, lessonCountForCourse } from '../data/courses'

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const loaded = loadProgress()
    return syncModuleUnlocks(loaded, courses)
  })

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const start = useCallback(() => {
    setProgress((p) => touchStreak({ ...p, started: true }))
  }, [])

  const completeLesson = useCallback(
    (lessonId: string, scorePct: number, courseId: CourseId, _passed?: boolean) => {
      setProgress((p) => {
        const next = recordLessonAttempt(
          p,
          lessonId,
          scorePct,
          courseId,
          lessonCountForCourse(courseId),
          MASTERY_PASS_PCT,
        )
        return syncModuleUnlocks(next, courses)
      })
    },
    [],
  )

  const completeDrill = useCallback(() => {
    setProgress((p) => recordDrill(p))
  }, [])

  const recordReview = useCallback((objectiveId: string, correct: boolean) => {
    setProgress((p) => scheduleReview(p, objectiveId, correct))
  }, [])

  const reset = useCallback(() => {
    setProgress(syncModuleUnlocks(resetProgress(), courses))
  }, [])

  const markFlashcard = useCallback((id: string) => {
    setProgress((p) => {
      if (p.flashcardsSeen.includes(id)) return touchStreak(p)
      return touchStreak({ ...p, flashcardsSeen: [...p.flashcardsSeen, id] })
    })
  }, [])

  return {
    progress,
    start,
    completeLesson,
    completeDrill,
    recordReview,
    reset,
    markFlashcard,
    mastery: overallMastery(progress),
  }
}
