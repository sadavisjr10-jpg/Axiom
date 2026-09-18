import { Link, useParams } from 'react-router-dom'
import { getCourse } from '../data/courses'
import { ProgressRing } from '../components/ProgressRing'
import { CourseArt } from '../components/CourseArt'
import { isModuleUnlocked, lessonPassed } from '../lib/mastery'
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
  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0)
  const doneLessons = course.modules.reduce(
    (n, m) => n + m.lessons.filter((l) => lessonPassed(progress, l.id)).length,
    0,
  )

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
        <div className="course-hero__art" aria-hidden>
          <CourseArt courseId={course.id} size={88} />
        </div>
        <div className="course-hero__copy">
          <p className="eyebrow">{course.code}</p>
          <h1>{course.title}</h1>
          <p className="lede">{course.description}</p>
          <div className="course-hero__progress">
            <div className="bar course-hero__bar" aria-hidden>
              <div
                className="bar__fill"
                style={{ width: `${mastery}%`, background: course.color }}
              />
            </div>
            <span className="muted">
              {doneLessons}/{totalLessons} lessons mastered · {mastery}% · next module unlocks at
              80% quiz gate
            </span>
          </div>
        </div>
        <ProgressRing value={mastery} size={88} stroke={7} color={course.color} label="Course mastery" />
      </header>

      <div className="modules" style={{ '--course-color': course.color } as CSSProperties}>
        {course.modules.map((mod, mi) => {
          const unlocked = isModuleUnlocked(progress, course, mod.id)
          const modDone = mod.lessons.filter((l) => lessonPassed(progress, l.id)).length
          const modPct = Math.round((modDone / Math.max(1, mod.lessons.length)) * 100)
          return (
            <section
              key={mod.id}
              className={unlocked ? 'module-block' : 'module-block module-block--locked'}
            >
              <header className="module-block__header">
                <div>
                  <span className="module-index">
                    Module {mi + 1}
                    {!unlocked && ' · Locked'}
                  </span>
                  <h2>{mod.title}</h2>
                  <p className="module-block__desc">
                    {unlocked
                      ? mod.description
                      : 'Pass the prior module’s lesson checks (≥ 80%) to unlock.'}
                  </p>
                </div>
                <div
                  className="module-block__meta"
                  aria-label={`${modDone} of ${mod.lessons.length} lessons mastered`}
                >
                  <span className="module-block__count">
                    {modDone}/{mod.lessons.length}
                  </span>
                  <div className="bar module-block__bar" aria-hidden>
                    <div
                      className="bar__fill"
                      style={{
                        width: `${modPct}%`,
                        background: 'var(--course-color, var(--accent))',
                      }}
                    />
                  </div>
                </div>
              </header>
              <ol className="lesson-list">
                {mod.lessons.map((lesson, li) => {
                  const done = lessonPassed(progress, lesson.id)
                  if (!unlocked) {
                    return (
                      <li key={lesson.id}>
                        <div className="lesson-list__locked">
                          <span className="status-dot" aria-hidden />
                          <div>
                            <span className="lesson-list__n">Lesson {li + 1}</span>
                            <strong>{lesson.title}</strong>
                            <span>Locked until prior module is mastered</span>
                          </div>
                          <span className="lesson-list__go">Locked</span>
                        </div>
                      </li>
                    )
                  }
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/learn/${course.id}/${encodeURIComponent(lesson.id)}`}
                        className={done ? 'is-done' : undefined}
                      >
                        <span className={`status-dot ${done ? 'is-done' : ''}`} aria-hidden />
                        <div>
                          <span className="lesson-list__n">Lesson {li + 1}</span>
                          <strong>{lesson.title}</strong>
                          <span>{lesson.summary}</span>
                        </div>
                        <span className="lesson-list__go">{done ? 'Review →' : 'Open →'}</span>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </section>
          )
        })}
      </div>
    </div>
  )
}
