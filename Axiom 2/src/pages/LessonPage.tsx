import { Link, useParams } from 'react-router-dom'
import { getLesson } from '../data/courses'
import { WorkedExample } from '../components/WorkedExample'
import { Quiz } from '../components/Quiz'
import type { CourseId, ProgressState } from '../types'
import type { CSSProperties } from 'react'

interface Props {
  progress: ProgressState
  onComplete: (lessonId: string, scorePct: number, courseId: CourseId) => void
}

export function LessonPage({ progress, onComplete }: Props) {
  const { courseId, lessonId } = useParams()
  const decoded = decodeURIComponent(lessonId ?? '')
  const found = getLesson(courseId ?? '', decoded)

  if (!found) {
    return (
      <div className="page">
        <h1>Lesson not found</h1>
        <Link to="/learn">Back to catalog</Link>
      </div>
    )
  }

  const { course, module, lesson } = found
  const done = progress.completedLessons.includes(lesson.id)

  return (
    <div className="page lesson-page">
      <nav className="crumbs">
        <Link to="/learn">Learn</Link>
        <span>/</span>
        <Link to={`/learn/${course.id}`}>{course.shortTitle}</Link>
        <span>/</span>
        <span>{lesson.title}</span>
      </nav>

      <header
        className="lesson-hero"
        style={{ '--course-color': course.color } as CSSProperties}
      >
        <p className="eyebrow">
          {course.code} · {module.title}
        </p>
        <h1>{lesson.title}</h1>
        <p className="lede">{lesson.summary}</p>
        {done && <span className="pill pill--success">Completed</span>}
      </header>

      <div className="lesson-body">
        {lesson.sections.map((s) => (
          <section key={s.heading} className="prose-block">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        <h2 className="section-title">Worked examples</h2>
        {lesson.workedExamples.map((ex) => (
          <WorkedExample key={ex.id} example={ex} />
        ))}

        <Quiz
          questions={lesson.quiz}
          onComplete={(score) => onComplete(lesson.id, score, course.id)}
        />
      </div>
    </div>
  )
}
