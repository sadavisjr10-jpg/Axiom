import type { PlainEnglish } from '../types'

interface Props {
  content: PlainEnglish
  /** Optional override for the H2 title */
  title?: string
  /** Section id for deep links */
  id?: string
  /** Accessible name */
  ariaLabel?: string
}

/** Shared editorial “Big idea / In plain English” panel used on course outlines and lessons. */
export function BigIdeaPanel({
  content,
  title = 'Start here — no formulas yet',
  id = 'big-idea',
  ariaLabel = 'Big idea',
}: Props) {
  return (
    <section id={id} className="big-idea" aria-label={ariaLabel}>
      <div className="big-idea__eyebrow">
        <span className="big-idea__badge">Big idea</span>
        <span className="big-idea__label">In plain English</span>
      </div>
      <h2>{title}</h2>
      <div className="big-idea__solves">
        <span className="big-idea__solves-label">What problem does this solve?</span>
        <p>{content.solves}</p>
      </div>
      <p className="big-idea__idea">{content.idea}</p>
      {content.jargon && content.jargon.length > 0 && (
        <dl className="jargon-list">
          {content.jargon.map((j) => (
            <div key={j.term} className="jargon-list__item">
              <dt>{j.term}</dt>
              <dd>{j.meaning}</dd>
            </div>
          ))}
        </dl>
      )}
      {content.bridge && <p className="big-idea__bridge">{content.bridge}</p>}
    </section>
  )
}
