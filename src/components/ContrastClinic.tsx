import { useState } from 'react'
import type { ContrastCase } from '../types'

interface Props {
  cases: ContrastCase[]
}

export function ContrastClinic({ cases }: Props) {
  const [picked, setPicked] = useState<Record<string, 0 | 1>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})

  if (!cases.length) return null

  return (
    <section className="contrast-clinic" aria-label="Common-mistake clinic">
      <header className="contrast-clinic__head">
        <h3>Mistake clinic</h3>
        <p>Contrast cases — which option is wrong, and why?</p>
      </header>
      {cases.map((c) => {
        const choice = picked[c.id]
        const open = revealed[c.id]
        const correct = choice === c.wrongIndex
        return (
          <article key={c.id} className="contrast-card">
            {c.topic && <span className="pill">{c.topic}</span>}
            <p className="contrast-card__prompt">{c.prompt}</p>
            <div className="contrast-card__options">
              {(
                [
                  [0, 'A', c.optionA],
                  [1, 'B', c.optionB],
                ] as const
              ).map(([idx, label, text]) => {
                let cls = 'contrast-option'
                if (open) {
                  if (idx === c.wrongIndex) cls += ' is-wrong-answer'
                  else cls += ' is-ok-answer'
                  if (choice === idx) cls += ' is-picked'
                } else if (choice === idx) cls += ' is-selected'
                return (
                  <button
                    key={label}
                    type="button"
                    className={cls}
                    disabled={open}
                    onClick={() => setPicked((p) => ({ ...p, [c.id]: idx }))}
                  >
                    <span className="contrast-option__tag">{label}</span>
                    <span>{text}</span>
                  </button>
                )
              })}
            </div>
            {!open ? (
              <button
                type="button"
                className="btn btn--primary"
                disabled={choice === undefined}
                onClick={() => setRevealed((r) => ({ ...r, [c.id]: true }))}
              >
                Reveal which is wrong
              </button>
            ) : (
              <div className="contrast-card__reveal" role="status">
                <p>
                  {correct ? (
                    <strong className="pcr__ok">Correct — you spotted the mistake.</strong>
                  ) : (
                    <strong className="pcr__miss">The wrong option was {c.wrongIndex === 0 ? 'A' : 'B'}.</strong>
                  )}
                </p>
                <p>{c.explanation}</p>
              </div>
            )}
          </article>
        )
      })}
    </section>
  )
}
