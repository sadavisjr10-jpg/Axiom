import { courses, totalLessonCount } from '../data/courses'
import { ProgressRing } from '../components/ProgressRing'
import { lessonsDoneCount, overallMastery } from '../lib/progress'
import type { ProgressState } from '../types'

interface Props {
  progress: ProgressState
  onReset: () => void
}

export function ProgressPage({ progress, onReset }: Props) {
  const overall = overallMastery(progress)
  const done = lessonsDoneCount(progress)
  const total = totalLessonCount()

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Progress</p>
        <h1>Your trajectory</h1>
        <p className="lede">
          Streak, mastery, and lesson completion — saved in localStorage with a versioned
          schema (v1).
        </p>
      </header>

      <div className="progress-overview">
        <div className="stat-card">
          <ProgressRing value={overall} size={96} stroke={8} />
          <div>
            <h3>Overall mastery</h3>
            <p className="muted">Average across six courses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{progress.streak}</div>
          <div>
            <h3>Day streak</h3>
            <p className="muted">
              {progress.lastActiveDate
                ? `Last active ${progress.lastActiveDate}`
                : 'Not started yet'}
            </p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {done}/{total}
          </div>
          <div>
            <h3>Lessons done</h3>
            <p className="muted">Quizzes submitted count as complete</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{progress.drillsCompleted}</div>
          <div>
            <h3>Drills completed</h3>
            <p className="muted">Daily & mixed submissions</p>
          </div>
        </div>
      </div>

      <h2 className="section-title">Per-course mastery</h2>
      <div className="course-progress-list">
        {courses.map((c) => {
          const m = progress.courseMastery[c.id] ?? 0
          return (
            <div key={c.id} className="course-progress-row">
              <span className="course-progress-row__icon" style={{ color: c.color }}>
                {c.icon}
              </span>
              <div className="course-progress-row__info">
                <strong>{c.title}</strong>
                <span className="muted">{c.code}</span>
                <div className="bar" aria-hidden>
                  <div className="bar__fill" style={{ width: `${m}%`, background: c.color }} />
                </div>
              </div>
              <span className="course-progress-row__pct">{m}%</span>
            </div>
          )
        })}
      </div>

      <div className="danger-zone">
        <h3>Reset progress</h3>
        <p className="muted">Clears streak, mastery, lessons, and drills on this device.</p>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => {
            if (confirm('Reset all Axiom progress on this device?')) onReset()
          }}
        >
          Reset all progress
        </button>
      </div>
    </div>
  )
}
