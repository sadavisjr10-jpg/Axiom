import { useMemo, useState } from 'react'
import { drillBank, flashcards } from '../data/drills'
import { dailySeed, seededShuffle } from '../lib/progress'
import { courses } from '../data/courses'
import type { ProgressState } from '../types'

interface Props {
  progress: ProgressState
  onDrillComplete: () => void
  onFlashcard: (id: string) => void
}

type Mode = 'daily' | 'mixed' | 'flashcards'

export function Drill({ progress, onDrillComplete, onFlashcard }: Props) {
  const [mode, setMode] = useState<Mode>('daily')
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [cardIdx, setCardIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [mixedSeed] = useState(() => Date.now() >>> 0)

  const daily = useMemo(() => {
    const shuffled = seededShuffle(drillBank, dailySeed())
    return shuffled.slice(0, 5)
  }, [])

  const mixed = useMemo(() => {
    return seededShuffle(drillBank, mixedSeed).slice(0, 8)
  }, [mixedSeed])

  const questions = mode === 'daily' ? daily : mixed
  const card = flashcards[cardIdx % flashcards.length]

  function submit() {
    setSubmitted(true)
    onDrillComplete()
  }

  function resetQuiz() {
    setAnswers({})
    setSubmitted(false)
  }

  const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Drill</p>
        <h1>Practice</h1>
        <p className="lede">
          Daily five-question set (same for everyone each calendar day), mixed quizzes,
          and flashcards — including the derivative definition.
        </p>
      </header>

      <div className="tabs" role="tablist">
        {(
          [
            ['daily', 'Daily 5'],
            ['mixed', 'Mixed quiz'],
            ['flashcards', 'Flashcards'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={mode === id}
            className={mode === id ? 'tab is-active' : 'tab'}
            onClick={() => {
              setMode(id)
              resetQuiz()
              setFlipped(false)
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {mode !== 'flashcards' && (
        <section className="drill-panel">
          <p className="muted">
            {mode === 'daily'
              ? `Today’s set · ${new Date().toISOString().slice(0, 10)} · Drills done: ${progress.drillsCompleted}`
              : 'Fresh shuffle of the question bank'}
          </p>
          {questions.map((q, i) => {
            const course = courses.find((c) => c.id === q.courseId)
            const chosen = answers[q.id]
            return (
              <fieldset key={q.id} className="quiz__q">
                <legend>
                  {i + 1}. <span className="pill">{course?.code}</span> {q.prompt}
                </legend>
                <div className="quiz__choices">
                  {q.choices.map((c, ci) => {
                    let cls = 'choice'
                    if (submitted) {
                      if (ci === q.correctIndex) cls += ' is-correct'
                      else if (chosen === ci) cls += ' is-wrong'
                    } else if (chosen === ci) cls += ' is-selected'
                    return (
                      <button
                        key={c}
                        type="button"
                        className={cls}
                        disabled={submitted}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: ci }))}
                      >
                        {c}
                      </button>
                    )
                  })}
                </div>
                {submitted && <p className="quiz__explain">{q.explanation}</p>}
              </fieldset>
            )
          })}
          {!submitted ? (
            <button
              type="button"
              className="btn btn--primary"
              disabled={Object.keys(answers).length < questions.length}
              onClick={submit}
            >
              Submit
            </button>
          ) : (
            <div className="drill-result">
              <p role="status">
                Score: {correct}/{questions.length}
              </p>
              <button type="button" className="btn btn--ghost" onClick={resetQuiz}>
                Try again
              </button>
            </div>
          )}
        </section>
      )}

      {mode === 'flashcards' && card && (
        <section className="flashcard-panel">
          <button
            type="button"
            className={`flashcard ${flipped ? 'is-flipped' : ''}`}
            onClick={() => {
              setFlipped((f) => !f)
              onFlashcard(card.id)
            }}
            aria-label="Flip flashcard"
          >
            <div className="flashcard__face flashcard__front">
              <span className="pill">{courses.find((c) => c.id === card.courseId)?.code}</span>
              <p>{card.front}</p>
              <span className="muted">Tap to flip</span>
            </div>
            <div className="flashcard__face flashcard__back">
              <p>{card.back}</p>
            </div>
          </button>
          <div className="flashcard-nav">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setCardIdx((i) => (i - 1 + flashcards.length) % flashcards.length)
                setFlipped(false)
              }}
            >
              Previous
            </button>
            <span className="muted">
              {cardIdx % flashcards.length + 1} / {flashcards.length}
            </span>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setCardIdx((i) => i + 1)
                setFlipped(false)
              }}
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
