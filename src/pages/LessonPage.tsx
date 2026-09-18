import { Link, useParams } from 'react-router-dom'
import { getLesson } from '../data/courses'
import { WorkedExample } from '../components/WorkedExample'
import { Quiz } from '../components/Quiz'
import { CourseArt } from '../components/CourseArt'
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
  const lessonIndex = module.lessons.findIndex((l) => l.id === lesson.id)
  const moduleIndex = course.modules.findIndex((m) => m.id === module.id)

  return (
    <div
      className="page lesson-page"
      style={{ '--course-color': course.color } as CSSProperties}
    >
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
        <div className="lesson-hero__art" aria-hidden>
          <CourseArt courseId={course.id} size={72} />
        </div>
        <div className="lesson-hero__copy">
          <p className="eyebrow">
            {course.code} · Module {moduleIndex + 1} · Lesson {lessonIndex + 1}
          </p>
          <h1>{lesson.title}</h1>
          <p className="lede">{lesson.summary}</p>
          <div className="lesson-hero__chips">
            <span className="pill">{module.title}</span>
            {done && <span className="pill pill--success">Completed</span>}
          </div>
        </div>
      </header>

      <div className="lesson-toc" aria-label="Lesson sections">
        <span className="lesson-toc__label">In this lesson</span>
        <ol>
          {lesson.sections.map((s) => (
            <li key={s.heading}>
              <a href={`#sec-${slug(s.heading)}`}>{s.heading}</a>
            </li>
          ))}
          <li>
            <a href="#worked-examples">Worked examples</a>
          </li>
          <li>
            <a href="#quiz">Quiz</a>
          </li>
        </ol>
      </div>

      <div className="lesson-body">
        {lesson.sections.map((s, i) => (
          <section
            key={s.heading}
            id={`sec-${slug(s.heading)}`}
            className="prose-block prose-card"
          >
            <span className="prose-block__n" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          </section>
        ))}

        <h2 id="worked-examples" className="section-title">
          Worked examples
        </h2>
        {lesson.workedExamples.map((ex) => (
          <WorkedExample key={ex.id} example={ex} />
        ))}

        <div id="quiz">
          <Quiz
            questions={lesson.quiz}
            onComplete={(score) => onComplete(lesson.id, score, course.id)}
          />
        </div>
      </div>
    </div>
  )
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
