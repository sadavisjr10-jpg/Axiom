import { Link } from 'react-router-dom'
import { courses } from '../data/courses'
import { CourseArt, HeroGeometry } from '../components/CourseArt'
import type { ProgressState } from '../types'
import type { CSSProperties } from 'react'

interface Props {
  progress: ProgressState
  onStart: () => void
}

export function Landing({ progress, onStart }: Props) {
  const cta = progress.started ? 'Continue' : 'Begin'
  const to = '/learn'

  return (
    <div className="landing">
      <section className="hero">
        <HeroGeometry />
        <div className="hero__orb hero__orb--a" aria-hidden />
        <div className="hero__orb hero__orb--b" aria-hidden />
        <div className="hero__content">
          <div className="hero__badge">Undergraduate Core</div>
          <h1 className="hero__title">Axiom</h1>
          <p className="hero__tagline">
            Six foundational courses. Worked examples you can reveal step by step.
            Daily drills, interactive labs, and searchable formula sheets — a pocket
            academy for the first two years of engineering.
          </p>
          <div className="hero__actions">
            <Link to={to} className="btn btn--primary btn--lg" onClick={onStart}>
              {cta}
            </Link>
            <Link to="/formulas" className="btn btn--ghost btn--lg">
              Browse formulas
            </Link>
          </div>
          <div className="hero__stats">
            <div>
              <strong>6</strong>
              <span>courses</span>
            </div>
            <div>
              <strong>~48</strong>
              <span>formulas</span>
            </div>
            <div>
              <strong>4</strong>
              <span>live labs</span>
            </div>
            <div>
              <strong>5</strong>
              <span>daily drills</span>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-courses" aria-label="Course overview">
        <h2 className="section-title">The core curriculum</h2>
        <p className="lede landing-courses__lede">
          Distinct tracks from calculus through materials — each with modules, worked
          examples, and mastery tracking.
        </p>
        <div className="landing-course-grid">
          {courses.map((c) => (
            <Link
              key={c.id}
              to={`/learn/${c.id}`}
              className="landing-course"
              style={{ '--course-color': c.color } as CSSProperties}
              onClick={onStart}
            >
              <span className="landing-course__art">
                <CourseArt courseId={c.id} size={48} />
              </span>
              <div>
                <p className="landing-course__code">{c.code}</p>
                <h3>{c.shortTitle}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="landing-features">
        <article>
          <span className="landing-features__glyph" aria-hidden>
            ◇
          </span>
          <h3>Learn</h3>
          <p>Course outlines, first-principles notes, revealable worked examples, and quizzes.</p>
        </article>
        <article>
          <span className="landing-features__glyph" aria-hidden>
            ◎
          </span>
          <h3>Drill</h3>
          <p>A deterministic daily five-question set, mixed quizzes, and flashcards.</p>
        </article>
        <article>
          <span className="landing-features__glyph" aria-hidden>
            ⬡
          </span>
          <h3>Labs</h3>
          <p>Interactive calculators for statics resultants, kinematics, dividers, and ideal gas.</p>
        </article>
        <article>
          <span className="landing-features__glyph" aria-hidden>
            ◉
          </span>
          <h3>Progress</h3>
          <p>Streaks, mastery rings, and lesson completion — stored locally on your device.</p>
        </article>
      </section>
    </div>
  )
}
