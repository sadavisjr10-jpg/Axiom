import { useMemo, useState } from 'react'
import type { WorkedExample as WE } from '../types'
import { ExampleVisual } from './demos/ExampleVisuals'
import { practiceFor } from '../data/examplePractice'

interface Props {
  example: WE
}

type Phase = 'full' | 'fade' | 'practice'

/**
 * Worked-example fading: full worked → partially blank steps → independent Your turn.
 * Preserves existing visuals on the full / fade phases.
 */
export function WorkedExample({ example }: Props) {
  const practice = example.practice ?? practiceFor(example.id)
  const phases: Phase[] = practice ? ['full', 'fade', 'practice'] : ['full', 'fade']
  const [phase, setPhase] = useState<Phase>('full')
  const [revealed, setRevealed] = useState(0)
  const [fadeRevealed, setFadeRevealed] = useState<Record<number, boolean>>({})
  const [hintIdx, setHintIdx] = useState(0)
  const [showPracticeAnswer, setShowPracticeAnswer] = useState(false)

  const total = example.steps.length
  // Blank the latter half of steps in fade phase (at least one)
  const blankFrom = useMemo(() => Math.max(1, Math.floor(total / 2)), [total])

  function goPhase(next: Phase) {
    setPhase(next)
    setRevealed(0)
    setFadeRevealed({})
    setHintIdx(0)
    setShowPracticeAnswer(false)
  }

  const phaseLabel =
    phase === 'full' ? 'Full worked' : phase === 'fade' ? 'Faded steps' : 'Your turn'

  return (
    <article className="worked-example">
      <header className="worked-example__header">
        <h4>{example.title}</h4>
        <span className="pill">Worked example · {phaseLabel}</span>
      </header>

      <nav className="fade-phases" aria-label="Example fading stages">
        {phases.map((p) => (
          <button
            key={p}
            type="button"
            className={phase === p ? 'fade-phases__btn is-active' : 'fade-phases__btn'}
            onClick={() => goPhase(p)}
          >
            {p === 'full' ? '1 · Full' : p === 'fade' ? '2 · Fade' : '3 · Your turn'}
          </button>
        ))}
      </nav>

      {phase !== 'practice' && (
        <>
          <p className="worked-example__problem">
            <strong>Problem.</strong> {example.problem}
          </p>
          <ExampleVisual exampleId={example.id} visual={example.visual} />
        </>
      )}

      {phase === 'full' && (
        <>
          <ol className="worked-example__steps">
            {example.steps.map((step, i) => {
              const open = i < revealed
              return (
                <li key={step.label} className={open ? 'is-open' : 'is-closed'}>
                  <button
                    type="button"
                    className="step-toggle"
                    onClick={() =>
                      setRevealed((r) => (r === i + 1 ? i : Math.max(r, i + 1)))
                    }
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
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setRevealed((r) => r + 1)}
              >
                Reveal next step
              </button>
            ) : (
              <p className="worked-example__answer">
                <strong>Answer:</strong> {example.answer}
              </p>
            )}
            {revealed > 0 && revealed < total && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setRevealed(total)}
              >
                Reveal all
              </button>
            )}
            {revealed >= total && (
              <>
                <p className="fade-coach muted">
                  Nice — you’ve seen the full path. Next, early steps stay visible and later
                  ones go blank so you can rehearse the moves.
                </p>
                <button type="button" className="btn btn--primary" onClick={() => goPhase('fade')}>
                  Continue to faded steps →
                </button>
              </>
            )}
          </div>
        </>
      )}

      {phase === 'fade' && (
        <>
          <p className="fade-coach muted">
            Early steps stay visible; later steps are blanked — try to fill them mentally, then
            reveal.
          </p>
          <ol className="worked-example__steps">
            {example.steps.map((step, i) => {
              const blanked = i >= blankFrom
              const open = !blanked || fadeRevealed[i]
              return (
                <li key={step.label} className={open ? 'is-open' : 'is-closed'}>
                  <button
                    type="button"
                    className="step-toggle"
                    onClick={() => {
                      if (!blanked) return
                      setFadeRevealed((m) => ({ ...m, [i]: !m[i] }))
                    }}
                    aria-expanded={open}
                    disabled={!blanked}
                  >
                    <span className="step-toggle__n">{i + 1}</span>
                    <span>{step.label}</span>
                    <span className="step-toggle__hint">
                      {!blanked ? 'Given' : open ? 'Hide' : 'Blank — reveal'}
                    </span>
                  </button>
                  {open && <div className="step-body">{step.content}</div>}
                  {blanked && !open && (
                    <div className="step-body step-body--blank" aria-hidden>
                      <span>··· work this step yourself ···</span>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
          <div className="worked-example__actions">
            <p className="worked-example__answer">
              <strong>Answer:</strong> {example.answer}
            </p>
            {practice && (
              <>
                <p className="fade-coach muted">
                  When the faded steps feel familiar, try a fresh problem — same idea, new
                  numbers. Hints are there if you need them.
                </p>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => goPhase('practice')}
                >
                  When you’re ready: Your turn →
                </button>
              </>
            )}
          </div>
        </>
      )}

      {phase === 'practice' && practice && (
        <div className="your-turn">
          <p className="your-turn__lead muted">
            Independent practice — earned after the worked path, not a cold jump.
          </p>
          <p className="worked-example__problem">
            <strong>Your turn.</strong> {practice.problem}
          </p>
          <div className="your-turn__hints">
            {hintIdx === 0 ? (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setHintIdx(1)}
              >
                Need a hint?
              </button>
            ) : (
              <ul>
                {practice.hints.slice(0, hintIdx).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {hintIdx > 0 && hintIdx < practice.hints.length && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setHintIdx((h) => h + 1)}
              >
                Another hint
              </button>
            )}
          </div>
          <div className="worked-example__actions">
            {!showPracticeAnswer ? (
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setShowPracticeAnswer(true)}
              >
                Show answer
              </button>
            ) : (
              <p className="worked-example__answer">
                <strong>Answer:</strong> {practice.answer}
              </p>
            )}
            <button type="button" className="btn btn--ghost" onClick={() => goPhase('full')}>
              Back to full example
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
