import { useMemo, useState } from 'react'
import { constantAcceleration, round } from '../lib/labMath'

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
  const w = 300
  const h = 160
  const pad = 20
  const points = times
    .map((_, i) => {
      const px = pad + (i / 20) * (w - 2 * pad)
      const py = h - pad - ((xs[i] - minX) / (maxX - minX || 1)) * (h - 2 * pad)
      return `${px},${py}`
    })
    .join(' ')

  return (
    <div className="lab">
      <div className="lab__controls">
        <h2>Constant acceleration</h2>
        <p className="muted">v = v₀ + a t · x = x₀ + v₀ t + ½ a t²</p>
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
      </div>
      <svg className="lab__canvas" viewBox={`0 0 ${w} ${h + 40}`} role="img" aria-label="Position vs time">
        <text x={pad} y="16" fill="#94a3b8" fontSize="11">
          x vs t
        </text>
        <polyline fill="none" stroke="#38bdf8" strokeWidth="2.5" points={points} />
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="rgba(148,163,184,0.4)" />
      </svg>
    </div>
  )
}
