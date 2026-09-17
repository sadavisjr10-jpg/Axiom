import { useState } from 'react'
import type { QuizQuestion } from '../types'

interface Props {
  questions: QuizQuestion[]
  onComplete?: (scorePct: number) => void
}

export function Quiz({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const correctCount = questions.filter((q) => answers[q.id] === q.correctIndex).length
  const scorePct =
    questions.length === 0 ? 100 : Math.round((correctCount / questions.length) * 100)

  function select(qid: string, idx: number) {
    if (submitted) return
    setAnswers((a) => ({ ...a, [qid]: idx }))
  }

  function submit() {
    setSubmitted(true)
    onComplete?.(scorePct)
  }

  return (
    <section className="quiz" aria-label="Lesson quiz">
      <header className="quiz__header">
        <h3>Check understanding</h3>
        <p>Select an answer for each question, then submit.</p>
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
            {submitted && (
              <p className="quiz__explain">{q.explanation}</p>
            )}
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
        <p className="quiz__score" role="status">
          Score: {correctCount}/{questions.length} ({scorePct}%)
        </p>
      )}
    </section>
  )
}
