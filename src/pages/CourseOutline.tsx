import { Link, useParams } from 'react-router-dom'
import { getCourse } from '../data/courses'
import { ProgressRing } from '../components/ProgressRing'
import type { ProgressState } from '../types'
import type { CSSProperties } from 'react'

interface Props {
  progress: ProgressState
}

export function CourseOutline({ progress }: Props) {
  const { courseId } = useParams()
  const course = getCourse(courseId ?? '')

  if (!course) {
    return (
      <div className="page">
        <h1>Course not found</h1>
        <Link to="/learn">Back to catalog</Link>
      </div>
    )
  }

  const mastery = progress.courseMastery[course.id] ?? 0

  return (
    <div className="page">
      <nav className="crumbs">
        <Link to="/learn">Learn</Link>
        <span>/</span>
        <span>{course.shortTitle}</span>
      </nav>
      <header
        className="course-hero"
        style={{ '--course-color': course.color } as CSSProperties}
      >
        <div>
          <p className="eyebrow">{course.code}</p>
          <h1>{course.title}</h1>
          <p className="lede">{course.description}</p>
        </div>
        <ProgressRing value={mastery} size={88} stroke={7} color={course.color} label="Course mastery" />
      </header>

      <div className="modules">
        {course.modules.map((mod, mi) => (
          <section key={mod.id} className="module-block">
            <header>
              <span className="module-index">Module {mi + 1}</span>
              <h2>{mod.title}</h2>
              <p>{mod.description}</p>
            </header>
            <ul className="lesson-list">
              {mod.lessons.map((lesson) => {
                const done = progress.completedLessons.includes(lesson.id)
                return (
                  <li key={lesson.id}>
                    <Link to={`/learn/${course.id}/${encodeURIComponent(lesson.id)}`}>
                      <span className={`status-dot ${done ? 'is-done' : ''}`} aria-hidden />
                      <div>
                        <strong>{lesson.title}</strong>
                        <span>{lesson.summary}</span>
                      </div>
                      <span className="lesson-list__go">Open →</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
