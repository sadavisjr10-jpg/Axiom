import { courses } from '../data/courses'
import { CourseCard } from '../components/CourseCard'
import type { ProgressState } from '../types'

interface Props {
  progress: ProgressState
}

export function Learn({ progress }: Props) {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Learn</p>
        <h1>Course catalog</h1>
        <p className="lede">
          Six courses spanning the undergraduate engineering core. Open a course for
          modules, lessons, worked examples, and quizzes.
        </p>
      </header>
      <div className="course-grid">
        {courses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            mastery={progress.courseMastery[c.id] ?? 0}
          />
        ))}
      </div>
    </div>
  )
}
