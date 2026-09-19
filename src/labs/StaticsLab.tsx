import { useMemo, useState } from 'react'
import { resultant2D, round } from '../lib/labMath'
import { PredictCommitReveal } from '../components/PredictCommitReveal'
import { SharedMarkers } from '../components/demos/diagramPrimitives'

export function StaticsLab() {
  const [f1, setF1] = useState(100)
  const [a1, setA1] = useState(0)
  const [f2, setF2] = useState(100)
  const [a2, setA2] = useState(90)

  const r = useMemo(() => resultant2D(f1, a1, f2, a2), [f1, a1, f2, a2])

  const scale = 0.8
  const cx = 160
  const cy = 150

  function tip(mag: number, ang: number) {
    const rad = (ang * Math.PI) / 180
    return { x: cx + mag * scale * Math.cos(rad), y: cy - mag * scale * Math.sin(rad) }
  }

  const t1 = tip(f1, a1)
  const t2 = tip(f2, a2)
  const tr = tip(r.magnitude, r.angleDeg)

  const results = (
    <>
      <dl className="lab__results">
        <div>
          <dt>Rₓ</dt>
          <dd>{round(r.rx, 2)} N</dd>
        </div>
        <div>
          <dt>Rᵧ</dt>
          <dd>{round(r.ry, 2)} N</dd>
        </div>
        <div>
          <dt>|R|</dt>
          <dd>{round(r.magnitude, 2)} N</dd>
        </div>
        <div>
          <dt>θ</dt>
          <dd>{round(r.angleDeg, 2)}°</dd>
        </div>
      </dl>
      <svg className="lab__canvas" viewBox="0 0 320 300" role="img" aria-label="Force vector diagram">
        {/* Fine grid */}
        {Array.from({ length: 13 }, (_, i) => (
          <line
            key={`vx${i}`}
            x1={40 + i * 20}
            y1={40}
            x2={40 + i * 20}
            y2={260}
            stroke="rgba(148,163,184,0.08)"
            strokeWidth="0.75"
          />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line
            key={`hy${i}`}
            x1={40}
            y1={40 + i * 20}
            x2={280}
            y2={40 + i * 20}
            stroke="rgba(148,163,184,0.08)"
            strokeWidth="0.75"
          />
        ))}
        <line x1={40} y1={cy} x2={295} y2={cy} className="fig-axis" markerEnd={`url(#${SharedMarkers.arrow})`} />
        <line x1={cx} y1={260} x2={cx} y2={35} className="fig-axis" markerEnd={`url(#${SharedMarkers.arrow})`} />
        <text x={290} y={cy + 14} className="fig-label fig-label--axis">
          x
        </text>
        <text x={cx + 8} y={42} className="fig-label fig-label--axis">
          y
        </text>
        <line
          x1={cx}
          y1={cy}
          x2={t1.x}
          y2={t1.y}
          stroke="#fbbf24"
          strokeWidth="2.25"
          markerEnd={`url(#${SharedMarkers.arrowWarm})`}
        />
        <line
          x1={cx}
          y1={cy}
          x2={t2.x}
          y2={t2.y}
          stroke="#38bdf8"
          strokeWidth="2.25"
          markerEnd={`url(#${SharedMarkers.arrowCool})`}
        />
        <line
          x1={cx}
          y1={cy}
          x2={tr.x}
          y2={tr.y}
          stroke="#6ee7b7"
          strokeWidth="2.5"
          markerEnd={`url(#${SharedMarkers.arrowGood})`}
        />
        <circle cx={cx} cy={cy} r={3.5} fill="#e2e8f0" />
        {/* Legend */}
        <line x1={24} y1={20} x2={40} y2={20} stroke="#fbbf24" strokeWidth="2.25" strokeLinecap="round" />
        <text x={46} y={24} className="fig-label" fill="#fbbf24">
          F₁
        </text>
        <line x1={78} y1={20} x2={94} y2={20} stroke="#38bdf8" strokeWidth="2.25" strokeLinecap="round" />
        <text x={100} y={24} className="fig-label" fill="#38bdf8">
          F₂
        </text>
        <line x1={132} y1={20} x2={148} y2={20} stroke="#6ee7b7" strokeWidth="2.25" strokeLinecap="round" />
        <text x={154} y={24} className="fig-label" fill="#6ee7b7">
          R
        </text>
        <text x={24} y={288} className="fig-label">
          Concurrent forces at origin · θ from +x (CCW+)
        </text>
      </svg>
    </>
  )

  return (
    <div className="lab">
      <div className="lab__controls">
        <h2>2D force resultant</h2>
        <p className="muted">Two concurrent forces — predict |R| before revealing.</p>
        <label>
          F₁ magnitude (N)
          <input type="range" min={0} max={200} value={f1} onChange={(e) => setF1(+e.target.value)} />
          <input type="number" value={f1} onChange={(e) => setF1(+e.target.value)} />
        </label>
        <label>
          F₁ angle (°)
          <input type="range" min={-180} max={180} value={a1} onChange={(e) => setA1(+e.target.value)} />
          <input type="number" value={a1} onChange={(e) => setA1(+e.target.value)} />
        </label>
        <label>
          F₂ magnitude (N)
          <input type="range" min={0} max={200} value={f2} onChange={(e) => setF2(+e.target.value)} />
          <input type="number" value={f2} onChange={(e) => setF2(+e.target.value)} />
        </label>
        <label>
          F₂ angle (°)
          <input type="range" min={-180} max={180} value={a2} onChange={(e) => setA2(+e.target.value)} />
          <input type="number" value={a2} onChange={(e) => setA2(+e.target.value)} />
        </label>
      </div>
      <div className="lab__reveal-col">
        <PredictCommitReveal
          key={`${f1}-${a1}-${f2}-${a2}`}
          mode="estimate"
          estimateLabel="Predict |R| (N)"
          actualDisplay={`${round(r.magnitude, 2)} N`}
          spec={{
            prompt: 'Before revealing the diagram: estimate the resultant magnitude |R|.',
            choices: [],
            revealNote: 'Compare your estimate to the live Cartesian resultant.',
          }}
        >
          {results}
        </PredictCommitReveal>
      </div>
    </div>
  )
}
