import { Link, useParams } from 'react-router-dom'
import { getLesson } from '../data/courses'
import { WorkedExample } from '../components/WorkedExample'
import { Quiz } from '../components/Quiz'
import { CourseArt } from '../components/CourseArt'
import { BigIdeaPanel } from '../components/BigIdeaPanel'
import { ObjectiveCards } from '../components/ObjectiveCards'
import { SectionVisual } from '../components/demos/SectionVisuals'
import { ContrastClinic } from '../components/ContrastClinic'
import { realityFor } from '../data/enrichment'
import { clinicsForLesson } from '../data/contrastClinics'
import { isModuleUnlocked, lessonPassed } from '../lib/mastery'
import type { CourseId, ProgressState } from '../types'
import type { CSSProperties } from 'react'

interface Props {
  progress: ProgressState
  onComplete: (lessonId: string, scorePct: number, courseId: CourseId, passed: boolean) => void
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
  const unlocked = isModuleUnlocked(progress, course, module.id)
  const done = lessonPassed(progress, lesson.id)
  const lessonIndex = module.lessons.findIndex((l) => l.id === lesson.id)
  const moduleIndex = course.modules.findIndex((m) => m.id === module.id)
  const clinics = clinicsForLesson(lesson.id)
  const pe = lesson.plainEnglish

  if (!unlocked) {
    return (
      <div className="page">
        <nav className="crumbs">
          <Link to="/learn">Learn</Link>
          <span>/</span>
          <Link to={`/learn/${course.id}`}>{course.shortTitle}</Link>
        </nav>
        <div className="lock-panel">
          <h1>Module locked</h1>
          <p className="lede">
            Pass the check in the previous module (mastery gate ≥ 80%) to unlock{' '}
            <strong>{module.title}</strong>.
          </p>
          <Link className="btn btn--primary" to={`/learn/${course.id}`}>
            Back to outline
          </Link>
        </div>
      </div>
    )
  }

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
            {done && <span className="pill pill--success">Mastered</span>}
          </div>
        </div>
      </header>

      <ObjectiveCards objectives={lesson.objectives} courseColor={course.color} />

      <div className="lesson-toc" aria-label="Lesson sections">
        <span className="lesson-toc__label">In this lesson</span>
        <ol>
          <li>
            <a href="#learning-objectives">Learning objectives</a>
          </li>
          {pe && (
            <li>
              <a href="#plain-english">In plain English</a>
            </li>
          )}
          {lesson.sections.map((s) => (
            <li key={s.heading}>
              <a href={`#sec-${slug(s.heading)}`}>{s.heading}</a>
            </li>
          ))}
          <li>
            <a href="#worked-examples">Worked examples</a>
          </li>
          {clinics.length > 0 && (
            <li>
              <a href="#mistake-clinic">Mistake clinic</a>
            </li>
          )}
          <li>
            <a href="#quiz">Quiz</a>
          </li>
        </ol>
      </div>

      <div className="lesson-body">
        {pe && (
          <BigIdeaPanel
            content={pe}
            id="plain-english"
            ariaLabel="In plain English"
          />
        )}

        {lesson.sections.map((s, i) => {
          const reality = s.reality ?? realityFor(lesson.id, s.heading)
          return (
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
                {reality && (
                  <aside className="reality-callout">
                    <span className="reality-callout__label">Where you’d see this</span>
                    <p>{reality}</p>
                  </aside>
                )}
                {s.visual && <SectionVisual id={s.visual} />}
              </div>
            </section>
          )
        })}

        <div className="practice-bridge" id="worked-examples">
          <p className="practice-bridge__label">Ready when you are</p>
          <h2 className="section-title">Worked examples</h2>
          <p className="practice-bridge__copy">
            You’ve seen the big idea and the formal pieces. Now watch a full solution, then
            try faded steps, then an independent “Your turn.” Skip ahead only if the story
            already feels solid.
          </p>
        </div>
        {lesson.workedExamples.map((ex) => (
          <WorkedExample key={ex.id} example={ex} />
        ))}

        {clinics.length > 0 && (
          <div id="mistake-clinic">
            <div className="practice-bridge practice-bridge--clinic">
              <p className="practice-bridge__label">Sharpen judgment</p>
              <p className="practice-bridge__copy">
                Contrast cases after the examples — spot the wrong path and name why. This is
                practice for judgment, not a surprise quiz.
              </p>
            </div>
            <ContrastClinic cases={clinics} />
          </div>
        )}

        <div id="quiz">
          <div className="practice-bridge practice-bridge--quiz">
            <p className="practice-bridge__label">Check understanding</p>
            <p className="practice-bridge__copy">
              A short check after teaching — not a cold start. Use it to confirm the ideas
              stuck; you can retry if you miss the mastery gate.
            </p>
          </div>
          <Quiz
            questions={lesson.quiz}
            onComplete={(score, passed) => onComplete(lesson.id, score, course.id, passed)}
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
