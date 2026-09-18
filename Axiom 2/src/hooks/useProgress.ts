import { useCallback, useEffect, useState } from 'react'
import type { CourseId, ProgressState } from '../types'
import {
  loadProgress,
  markLessonComplete,
  overallMastery,
  recordDrill,
  resetProgress,
  saveProgress,
  touchStreak,
} from '../lib/progress'
import { lessonCountForCourse } from '../data/courses'

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress())

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const start = useCallback(() => {
    setProgress((p) => touchStreak({ ...p, started: true }))
  }, [])

  const completeLesson = useCallback(
    (lessonId: string, scorePct: number, courseId: CourseId) => {
      setProgress((p) =>
        markLessonComplete(
          p,
          lessonId,
          scorePct,
          courseId,
          lessonCountForCourse(courseId),
        ),
      )
    },
    [],
  )

  const completeDrill = useCallback(() => {
    setProgress((p) => recordDrill(p))
  }, [])

  const reset = useCallback(() => {
    setProgress(resetProgress())
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
    reset,
    markFlashcard,
    mastery: overallMastery(progress),
  }
}
