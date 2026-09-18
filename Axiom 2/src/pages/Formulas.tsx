import { useMemo, useState } from 'react'
import { formulas } from '../data/formulas'
import { courses } from '../data/courses'
import type { CourseId } from '../types'
import type { CSSProperties } from 'react'

export function Formulas() {
  const [q, setQ] = useState('')
  const [courseFilter, setCourseFilter] = useState<CourseId | 'all'>('all')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return formulas.filter((f) => {
      if (courseFilter !== 'all' && f.courseId !== courseFilter) return false
      if (!needle) return true
      return (
        f.name.toLowerCase().includes(needle) ||
        f.expression.toLowerCase().includes(needle) ||
        f.description.toLowerCase().includes(needle) ||
        f.tags.some((t) => t.includes(needle))
      )
    })
  }, [q, courseFilter])

  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Formulas</p>
        <h1>Formula reference</h1>
        <p className="lede">
          Searchable sheet of ~{formulas.length} core identities across the six courses.
        </p>
      </header>

      <div className="formula-toolbar">
        <label className="search-field">
          <span className="sr-only">Search formulas</span>
          <input
            type="search"
            placeholder="Search name, expression, tag…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <div className="filter-chips" role="group" aria-label="Filter by course">
          <button
            type="button"
            className={courseFilter === 'all' ? 'chip is-active' : 'chip'}
            onClick={() => setCourseFilter('all')}
          >
            All
          </button>
          {courses.map((c) => (
            <button
              key={c.id}
              type="button"
              className={courseFilter === c.id ? 'chip is-active' : 'chip'}
              style={{ '--chip-color': c.color } as CSSProperties}
              onClick={() => setCourseFilter(c.id)}
            >
              {c.shortTitle}
            </button>
          ))}
        </div>
      </div>

      <p className="muted">{filtered.length} formulas</p>

      <div className="formula-grid">
        {filtered.map((f) => {
          const course = courses.find((c) => c.id === f.courseId)
          return (
            <article
              key={f.id}
              className="formula-card"
              style={{ '--course-color': course?.color } as CSSProperties}
            >
              <div className="formula-card__top">
                <h3>{f.name}</h3>
                <span className="pill">{course?.code}</span>
              </div>
              <p className="formula-card__expr">{f.expression}</p>
              <p className="formula-card__desc">{f.description}</p>
              <div className="tag-row">
                {f.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
