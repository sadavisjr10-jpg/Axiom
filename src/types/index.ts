export type CourseId =
  | 'calculus'
  | 'mechanics'
  | 'statics'
  | 'circuits'
  | 'thermo'
  | 'materials'

export type ObjectiveDemoId =
  | 'limit-approach'
  | 'one-sided'
  | 'sinx-x'
  | 'limit-fail'
  | 'secant-tangent'
  | 'power-rule'
  | 'product-rule'
  | 'ftc-area'
  | 'const-accel'
  | 'free-body'
  | 'force-components'
  | 'particle-eq'
  | 'voltage-divider'
  | 'kvl-loop'
  | 'ideal-gas'
  | 'first-law'
  | 'stress-strain'
  | 'hall-petch'

export type SectionVisualId =
  | 'limit-zoom'
  | 'one-sided-graph'
  | 'indeterminate'
  | 'continuity'
  | 'trig-limit'
  | 'avg-rate'
  | 'difference-quotient'
  | 'power-slope'
  | 'product-uv'
  | 'antiderivative'
  | 'ftc-eval'
  | 'kinematic-axes'
  | 'signs-motion'
  | 'net-force'
  | 'fbd-block'
  | 'weight-mass'
  | 'vector-resolve'
  | 'resultant'
  | 'particle-knot'
  | 'series-resistors'
  | 'divider-formula'
  | 'loading'
  | 'kcl-node'
  | 'kvl-loop-viz'
  | 'pvt-state'
  | 'named-process'
  | 'energy-balance'
  | 'carnot'
  | 'stress-def'
  | 'hooke'
  | 'poisson'
  | 'grain-boundary'
  | 'arrhenius'

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

export interface ObjectiveVideo {
  /** YouTube video id (privacy-enhanced embed via youtube-nocookie.com) */
  youtubeId: string
  /** One-line cue: what to watch for */
  cue: string
  title?: string
}

export interface LearningObjective {
  id: string
  title: string
  summary: string
  /** Plain-language: where this shows up in the real world */
  worldContext?: string
  /** Related instruction section heading (for deep-link / tie-back) */
  sectionHint?: string
  demo?: ObjectiveDemoId
  /** Optional single curated educational video (max one per objective) */
  video?: ObjectiveVideo
}

export interface Lesson {
  id: string
  title: string
  summary: string
  objectives: LearningObjective[]
  sections: LessonSection[]
  workedExamples: WorkedExample[]
  quiz: QuizQuestion[]
}

export interface LessonSection {
  heading: string
  body: string
  visual?: SectionVisualId
  /** Theory → reality callout (bridge, motor, charger, lab bench, …) */
  reality?: string
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
