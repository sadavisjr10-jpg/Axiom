import { useState } from 'react'
import type { QuizQuestion } from '../types'
import { MASTERY_PASS_PCT } from '../types'
import { meetsMasteryGate, passThresholdLabel } from '../lib/mastery'

interface Props {
  questions: QuizQuestion[]
  onComplete?: (scorePct: number, passed: boolean) => void
  /** When true, require mastery gate to count as passed (default true) */
  masteryGate?: boolean
}

export function Quiz({ questions, onComplete, masteryGate = true }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length
  const scorePct =
    questions.length === 0 ? 100 : Math.round((correctCount / questions.length) * 100)
  const passed = !masteryGate || meetsMasteryGate(correctCount, questions.length)
  const need = passThresholdLabel(questions.length)

  function select(qid: string, idx: number) {
    if (submitted) return
    setAnswers((a) => ({ ...a, [qid]: idx }))
  }

  function submit() {
    setSubmitted(true)
    onComplete?.(scorePct, passed)
  }

  function retry() {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section className="quiz" aria-label="Lesson quiz">
      <header className="quiz__header">
        <h3>Check understanding</h3>
        <p>
          You’ve already worked examples — this is a short confirmation, not a cold start.
          Select an answer for each question, then submit.
          {masteryGate && (
            <>
              {' '}
              Pass gate: <strong>{need}</strong> ({MASTERY_PASS_PCT}%) to unlock the next module.
            </>
          )}
        </p>
      </header>
      {questions.map((q, qi) => {
        const chosen = answers[q.id]
        return (
          <fieldset key={q.id} className="quiz__q">
            <legend>
              {qi + 1}. {q.prompt}
            </legend>
            <div className="quiz__choices" role="radiogroup">
              {q.choices.map((c, i) => {
                let cls = 'choice'
                if (submitted) {
                  if (i === q.correctIndex) cls += ' is-correct'
                  else if (chosen === i) cls += ' is-wrong'
                } else if (chosen === i) cls += ' is-selected'
                return (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={chosen === i}
                    className={cls}
                    onClick={() => select(q.id, i)}
                    disabled={submitted}
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
          Submit quiz
        </button>
      ) : (
        <div className="quiz__result">
          <p className="quiz__score" role="status">
            Score: {correctCount}/{questions.length} ({scorePct}%)
            {masteryGate && (
              <>
                {' '}
                ·{' '}
                {passed ? (
                  <span className="pcr__ok">Passed mastery gate</span>
                ) : (
                  <span className="pcr__miss">Need {need} — practice until ready</span>
                )}
              </>
            )}
          </p>
          {!passed && (
            <button type="button" className="btn btn--primary" onClick={retry}>
              Practice until ready
            </button>
          )}
        </div>
      )}
    </section>
  )
}
