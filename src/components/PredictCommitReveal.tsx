import { useState, type ReactNode } from 'react'

export interface PredictSpec {
  prompt: string
  choices: string[]
  /** Index of the best/correct prediction; used for compare feedback */
  correctIndex?: number
  /** Shown after reveal */
  revealNote?: string
}

interface Props {
  spec: PredictSpec
  /** Content hidden until the learner commits a prediction */
  children: ReactNode
  className?: string
  /** Optional numeric/text commit (labs) instead of MC */
  mode?: 'choices' | 'estimate'
  estimateLabel?: string
  /** For estimate mode: actual value to compare after commit */
  actualDisplay?: string
  onRevealed?: (committed: string | number) => void
}

/**
 * Mazur-style predict → commit → reveal/compare gate.
 * Forces a prediction before showing the demo/lab result.
 */
export function PredictCommitReveal({
  spec,
  children,
  className,
  mode = 'choices',
  estimateLabel = 'Your prediction',
  actualDisplay,
  onRevealed,
}: Props) {
  const [choice, setChoice] = useState<number | null>(null)
  const [estimate, setEstimate] = useState('')
  const [committed, setCommitted] = useState(false)

  function commit() {
    if (mode === 'choices' && choice === null) return
    if (mode === 'estimate' && estimate.trim() === '') return
    setCommitted(true)
    onRevealed?.(mode === 'choices' ? (choice as number) : estimate)
  }

  if (committed) {
    const correct =
      mode === 'choices' && spec.correctIndex !== undefined
        ? choice === spec.correctIndex
        : undefined
    return (
      <div className={`pcr pcr--revealed ${className ?? ''}`.trim()}>
        <div className="pcr__compare" role="status">
          <span className="pill">Committed</span>
          {mode === 'choices' ? (
            <p>
              You predicted: <strong>{spec.choices[choice!]}</strong>
              {correct === true && <span className="pcr__ok"> · matches</span>}
              {correct === false && <span className="pcr__miss"> · rethink below</span>}
            </p>
          ) : (
            <p>
              You predicted: <strong>{estimate}</strong>
              {actualDisplay && (
                <>
                  {' '}
                  · actual: <strong>{actualDisplay}</strong>
                </>
              )}
            </p>
          )}
          {spec.revealNote && <p className="pcr__note">{spec.revealNote}</p>}
        </div>
        {children}
        <button type="button" className="btn btn--ghost pcr__reset" onClick={() => {
          setCommitted(false)
          setChoice(null)
          setEstimate('')
        }}>
          Predict again
        </button>
      </div>
    )
  }

  return (
    <div className={`pcr pcr--locked ${className ?? ''}`.trim()}>
      <header className="pcr__head">
        <span className="pill">Predict → commit → reveal</span>
        <h4 className="pcr__prompt">{spec.prompt}</h4>
      </header>
      {mode === 'choices' ? (
        <div className="pcr__choices" role="radiogroup" aria-label="Prediction">
          {spec.choices.map((c, i) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={choice === i}
              className={choice === i ? 'choice is-selected' : 'choice'}
              onClick={() => setChoice(i)}
            >
              {c}
            </button>
          ))}
        </div>
      ) : (
        <label className="pcr__estimate">
          {estimateLabel}
          <input
            type="text"
            value={estimate}
            onChange={(e) => setEstimate(e.target.value)}
            placeholder="Commit a number or short answer"
          />
        </label>
      )}
      <button
        type="button"
        className="btn btn--primary"
        disabled={mode === 'choices' ? choice === null : estimate.trim() === ''}
        onClick={commit}
      >
        Commit prediction
      </button>
      <p className="pcr__gate-hint muted">Result stays hidden until you commit.</p>
    </div>
  )
}
