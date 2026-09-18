import { useMemo, useState } from 'react'
import { resultant2D, round } from '../lib/labMath'

export function StaticsLab() {
  const [f1, setF1] = useState(100)
  const [a1, setA1] = useState(0)
  const [f2, setF2] = useState(100)
  const [a2, setA2] = useState(90)

  const r = useMemo(() => resultant2D(f1, a1, f2, a2), [f1, a1, f2, a2])

  const scale = 0.8
  const cx = 160
  const cy = 140

  function tip(mag: number, ang: number) {
    const rad = (ang * Math.PI) / 180
    return { x: cx + mag * scale * Math.cos(rad), y: cy - mag * scale * Math.sin(rad) }
  }

  const t1 = tip(f1, a1)
  const t2 = tip(f2, a2)
  const tr = tip(r.magnitude, r.angleDeg)

  return (
    <div className="lab">
      <div className="lab__controls">
        <h2>2D force resultant</h2>
        <p className="muted">Two concurrent forces — live Cartesian resultant.</p>
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
      </div>
      <svg className="lab__canvas" viewBox="0 0 320 280" role="img" aria-label="Force vector diagram">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="currentColor" />
          </marker>
        </defs>
        <line x1="20" y1={cy} x2="300" y2={cy} stroke="rgba(148,163,184,0.35)" />
        <line x1={cx} y1="20" x2={cx} y2="260" stroke="rgba(148,163,184,0.35)" />
        <line x1={cx} y1={cy} x2={t1.x} y2={t1.y} stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1={cx} y1={cy} x2={t2.x} y2={t2.y} stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
        <line x1={cx} y1={cy} x2={tr.x} y2={tr.y} stroke="#6ee7b7" strokeWidth="3.5" markerEnd="url(#arrow)" />
        <circle cx={cx} cy={cy} r="4" fill="#e2e8f0" />
        <text x="24" y="24" fill="#fbbf24" fontSize="12">
          F₁
        </text>
        <text x="56" y="24" fill="#38bdf8" fontSize="12">
          F₂
        </text>
        <text x="88" y="24" fill="#6ee7b7" fontSize="12">
          R
        </text>
      </svg>
    </div>
  )
}
