import { useState } from 'react'
import type { WorkedExample as WE } from '../types'

interface Props {
  example: WE
}

export function WorkedExample({ example }: Props) {
  const [revealed, setRevealed] = useState(0)
  const total = example.steps.length

  return (
    <article className="worked-example">
      <header className="worked-example__header">
        <h4>{example.title}</h4>
        <span className="pill">Worked example</span>
      </header>
      <p className="worked-example__problem">
        <strong>Problem.</strong> {example.problem}
      </p>
      <ol className="worked-example__steps">
        {example.steps.map((step, i) => {
          const open = i < revealed
          return (
            <li key={step.label} className={open ? 'is-open' : 'is-closed'}>
              <button
                type="button"
                className="step-toggle"
                onClick={() => setRevealed((r) => (r === i + 1 ? i : Math.max(r, i + 1)))}
                aria-expanded={open}
              >
                <span className="step-toggle__n">{i + 1}</span>
                <span>{step.label}</span>
                <span className="step-toggle__hint">{open ? 'Hide' : 'Reveal'}</span>
              </button>
              {open && <div className="step-body">{step.content}</div>}
            </li>
          )
        })}
      </ol>
      <div className="worked-example__actions">
        {revealed < total ? (
          <button type="button" className="btn btn--primary" onClick={() => setRevealed((r) => r + 1)}>
            Reveal next step
          </button>
        ) : (
          <p className="worked-example__answer">
            <strong>Answer:</strong> {example.answer}
          </p>
        )}
        {revealed > 0 && revealed < total && (
          <button type="button" className="btn btn--ghost" onClick={() => setRevealed(total)}>
            Reveal all
          </button>
        )}
      </div>
    </article>
  )
}
