export type CourseId =
  | 'calculus'
  | 'mechanics'
  | 'statics'
  | 'circuits'
  | 'thermo'
  | 'materials'

export interface Course {
  id: CourseId
  code: string
  title: string
  shortTitle: string
  description: string
  color: string
  accent: string
  icon: string
  modules: Module[]
}

export interface Module {
  id: string
  title: string
  description: string
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  summary: string
  sections: LessonSection[]
  workedExamples: WorkedExample[]
  quiz: QuizQuestion[]
}

export interface LessonSection {
  heading: string
  body: string
}

export interface WorkedExample {
  id: string
  title: string
  problem: string
  steps: WorkedStep[]
  answer: string
}

export interface WorkedStep {
  label: string
  content: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  choices: string[]
  correctIndex: number
  explanation: string
}

export interface Formula {
  id: string
  name: string
  expression: string
  courseId: CourseId
  description: string
  tags: string[]
}

export interface Flashcard {
  id: string
  courseId: CourseId
  front: string
  back: string
  tags: string[]
}

export interface DrillQuestion {
  id: string
  courseId: CourseId
  prompt: string
  choices: string[]
  correctIndex: number
  explanation: string
}

export const PROGRESS_VERSION = 1 as const

export interface ProgressState {
  version: typeof PROGRESS_VERSION
  streak: number
  lastActiveDate: string | null
  completedLessons: string[]
  lessonScores: Record<string, number>
  courseMastery: Record<CourseId, number>
  drillsCompleted: number
  flashcardsSeen: string[]
  started: boolean
}
