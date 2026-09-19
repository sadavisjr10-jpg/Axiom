import { useMemo, useState } from 'react'
import { constantAcceleration, round } from '../lib/labMath'
import { PredictCommitReveal } from '../components/PredictCommitReveal'
import { SharedMarkers } from '../components/demos/diagramPrimitives'

export function MechanicsLab() {
  const [x0, setX0] = useState(0)
  const [v0, setV0] = useState(0)
  const [a, setA] = useState(2)
  const [t, setT] = useState(5)

  const { x, v } = useMemo(() => constantAcceleration(x0, v0, a, t), [x0, v0, a, t])

  const times = Array.from({ length: 21 }, (_, i) => (t * i) / 20)
  const xs = times.map((ti) => constantAcceleration(x0, v0, a, ti).x)
  const minX = Math.min(...xs, 0)
  const maxX = Math.max(...xs, 1)
  const w = 320
  const h = 200
  const padL = 44
  const padR = 24
  const padT = 28
  const padB = 36
  const points = times
    .map((_, i) => {
      const px = padL + (i / 20) * (w - padL - padR)
      const py = h - padB - ((xs[i] - minX) / (maxX - minX || 1)) * (h - padT - padB)
      return `${px},${py}`
    })
    .join(' ')

  const results = (
    <>
      <dl className="lab__results">
        <div>
          <dt>x(t)</dt>
          <dd>{round(x, 3)} m</dd>
        </div>
        <div>
          <dt>v(t)</dt>
          <dd>{round(v, 3)} m/s</dd>
        </div>
      </dl>
      <svg className="lab__canvas" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Position vs time">
        {/* Grid */}
        {Array.from({ length: 6 }, (_, i) => {
          const gy = padT + (i / 5) * (h - padT - padB)
          return (
            <line
              key={`g${i}`}
              x1={padL}
              y1={gy}
              x2={w - padR}
              y2={gy}
              stroke="rgba(148,163,184,0.1)"
              strokeWidth="0.75"
            />
          )
        })}
        <line
          x1={padL}
          y1={h - padB}
          x2={w - padR}
          y2={h - padB}
          className="fig-axis"
          markerEnd={`url(#${SharedMarkers.arrow})`}
        />
        <line
          x1={padL}
          y1={h - padB}
          x2={padL}
          y2={padT - 4}
          className="fig-axis"
          markerEnd={`url(#${SharedMarkers.arrow})`}
        />
        <text x={w - padR - 4} y={h - padB + 16} className="fig-label fig-label--axis" textAnchor="end">
          t (s)
        </text>
        <text x={padL + 8} y={padT + 4} className="fig-label fig-label--axis">
          x (m)
        </text>
        <text x={padL} y={16} className="fig-label fig-label--ink">
          Position vs time
        </text>
        <polyline fill="none" className="fig-curve" stroke="#38bdf8" strokeLinejoin="round" strokeLinecap="round" points={points} />
        <circle
          cx={padL + (w - padL - padR)}
          cy={h - padB - ((x - minX) / (maxX - minX || 1)) * (h - padT - padB)}
          r="4"
          className="fig-point fig-point--sample"
        />
        <text x={12} y={h - padB + 4} className="fig-label" textAnchor="middle">
          {round(minX, 1)}
        </text>
        <text x={12} y={padT + 4} className="fig-label" textAnchor="middle">
          {round(maxX, 1)}
        </text>
      </svg>
    </>
  )

  return (
    <div className="lab">
      <div className="lab__controls">
        <h2>Constant acceleration</h2>
        <p className="muted">v = v₀ + a t · x = x₀ + v₀ t + ½ a t² — predict x(t)</p>
        {(
          [
            ['x₀ (m)', x0, setX0, -50, 50],
            ['v₀ (m/s)', v0, setV0, -20, 40],
            ['a (m/s²)', a, setA, -10, 10],
            ['t (s)', t, setT, 0, 20],
          ] as const
        ).map(([label, val, set, min, max]) => (
          <label key={label}>
            {label}
            <input type="range" min={min} max={max} step={0.1} value={val} onChange={(e) => set(+e.target.value)} />
            <input type="number" step={0.1} value={val} onChange={(e) => set(+e.target.value)} />
          </label>
        ))}
      </div>
      <div className="lab__reveal-col">
        <PredictCommitReveal
          key={`${x0}-${v0}-${a}-${t}`}
          mode="estimate"
          estimateLabel="Predict x(t) (m)"
          actualDisplay={`${round(x, 3)} m`}
          spec={{
            prompt: 'Estimate position x(t) before revealing the curve.',
            choices: [],
            revealNote: 'Check: x = x₀ + v₀ t + ½ a t².',
          }}
        >
          {results}
        </PredictCommitReveal>
      </div>
    </div>
  )
}
