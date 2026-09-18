import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import type { LearningObjective } from '../types'
import { ObjectiveDemo } from './demos/ObjectiveDemos'
import { enrichObjective } from '../data/enrichment'
import { predictionForDemo } from '../data/demoPredictions'
import { PredictCommitReveal } from './PredictCommitReveal'

interface Props {
  objectives: LearningObjective[]
  courseColor?: string
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function ObjectiveCards({ objectives, courseColor }: Props) {
  const [active, setActive] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const enriched = objectives.map(enrichObjective)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (active !== null) {
      if (!el.open) el.showModal()
    } else if (el.open) {
      el.close()
    }
  }, [active])

  if (!objectives.length) return null

  const current = active !== null ? enriched[active] : null

  function close() {
    setActive(null)
  }

  function prev() {
    if (active === null) return
    setActive((active + enriched.length - 1) % enriched.length)
  }

  function next() {
    if (active === null) return
    setActive((active + 1) % enriched.length)
  }

  return (
    <section id="learning-objectives" className="objectives" aria-labelledby={titleId}>
      <div className="objectives__head">
        <h2 id={titleId}>Learning objectives</h2>
        <p className="objectives__hint">
          Click a card for a mini-lesson: real-world meaning, interactive demo, optional deep-dive video.
        </p>
      </div>

      <ul className="objectives__grid">
        {enriched.map((obj, i) => (
          <li key={obj.id}>
            <button
              type="button"
              className="objective-card"
              onClick={() => setActive(i)}
              style={
                courseColor
                  ? ({ '--obj-accent': courseColor } as CSSProperties)
                  : undefined
              }
            >
              <span className="objective-card__n" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="objective-card__title">{obj.title}</span>
              <span className="objective-card__teaser">{obj.summary}</span>
              <span className="objective-card__meta">
                {obj.demo && <span className="objective-card__badge">Interactive</span>}
                {obj.video && <span className="objective-card__badge objective-card__badge--vid">Video</span>}
              </span>
              <span className="objective-card__cta">Open mini-lesson →</span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className="objective-dialog"
        onClose={close}
        onCancel={close}
        aria-labelledby="obj-dialog-title"
      >
        {current && (
          <div className="objective-dialog__inner">
            <header className="objective-dialog__head">
              <p className="eyebrow">
                Objective {(active ?? 0) + 1} of {enriched.length}
              </p>
              <h3 id="obj-dialog-title">{current.title}</h3>
              <button
                type="button"
                className="objective-dialog__close"
                onClick={close}
                aria-label="Close"
              >
                ×
              </button>
            </header>

            <p className="objective-dialog__summary">{current.summary}</p>

            {current.worldContext && (
              <aside className="objective-dialog__world">
                <strong>In the world</strong>
                <p>{current.worldContext}</p>
              </aside>
            )}

            {current.demo && (() => {
              const pred = predictionForDemo(current.demo)
              const demo = (
                <ObjectiveDemo id={current.demo} className="objective-dialog__demo" />
              )
              if (!pred) return demo
              return (
                <PredictCommitReveal
                  className="objective-dialog__pcr"
                  spec={{
                    prompt: pred.prompt,
                    choices: pred.choices,
                    correctIndex: pred.correctIndex,
                    revealNote: pred.reveal,
                  }}
                >
                  {demo}
                </PredictCommitReveal>
              )
            })()}

            {current.video && (
              <aside className="objective-dialog__video">
                <p className="objective-dialog__video-cue">
                  <strong>Watch for:</strong> {current.video.cue}
                </p>
                <div className="objective-dialog__iframe-wrap">
                  <iframe
                    title={current.video.title ?? 'Educational video'}
                    src={`https://www.youtube-nocookie.com/embed/${current.video.youtubeId}?rel=0`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                {current.video.title && (
                  <p className="objective-dialog__video-src">{current.video.title}</p>
                )}
              </aside>
            )}

            {current.sectionHint && (
              <p className="objective-dialog__tie">
                Taught in:{' '}
                <a href={`#sec-${slug(current.sectionHint)}`} onClick={close}>
                  {current.sectionHint}
                </a>
              </p>
            )}

            <footer className="objective-dialog__nav">
              <button type="button" onClick={prev}>
                ← Prev
              </button>
              <button type="button" className="btn-primary-ish" onClick={next}>
                Next →
              </button>
            </footer>
          </div>
        )}
      </dialog>
    </section>
  )
}
