import { useMemo, useState } from 'react'
import { idealGas, round } from '../lib/labMath'
import { PredictCommitReveal } from '../components/PredictCommitReveal'

type Unknown = 'P' | 'V' | 'n' | 'T'

export function ThermoLab() {
  const [unknown, setUnknown] = useState<Unknown>('P')
  const [P, setP] = useState(101325)
  const [V, setV] = useState(0.024)
  const [n, setN] = useState(1)
  const [T, setT] = useState(298)

  const result = useMemo(() => {
    try {
      return {
        ok: true as const,
        value: idealGas({
          P: unknown === 'P' ? null : P,
          V: unknown === 'V' ? null : V,
          n: unknown === 'n' ? null : n,
          T: unknown === 'T' ? null : T,
        }),
      }
    } catch (e) {
      return { ok: false as const, error: e instanceof Error ? e.message : 'Error' }
    }
  }, [unknown, P, V, n, T])

  const actual =
    result.ok
      ? unknown === 'P'
        ? `${round(result.value.P, 2)} Pa`
        : unknown === 'V'
          ? `${round(result.value.V, 6)} m³`
          : unknown === 'n'
            ? `${round(result.value.n, 4)} mol`
            : `${round(result.value.T, 2)} K`
      : result.error

  const vol = result.ok ? result.value.V : V
  const temp = result.ok ? result.value.T : T
  const press = result.ok ? result.value.P : P
  // Map volume to piston height (larger V → taller chamber)
  const chamberH = Math.min(110, Math.max(36, 36 + vol * 1800))
  const pistonY = 200 - chamberH
  const glow = Math.min(0.55, 0.15 + (temp - 200) / 1200)
  const molecules = [
    [148, pistonY + chamberH * 0.35],
    [162, pistonY + chamberH * 0.55],
    [138, pistonY + chamberH * 0.7],
    [170, pistonY + chamberH * 0.4],
    [155, pistonY + chamberH * 0.85],
  ]

  const results = (
    <>
      <dl className="lab__results">
        {result.ok ? (
          <>
            <div>
              <dt>P</dt>
              <dd>{round(result.value.P, 2)} Pa</dd>
            </div>
            <div>
              <dt>V</dt>
              <dd>{round(result.value.V, 6)} m³</dd>
            </div>
            <div>
              <dt>n</dt>
              <dd>{round(result.value.n, 4)} mol</dd>
            </div>
            <div>
              <dt>T</dt>
              <dd>{round(result.value.T, 2)} K</dd>
            </div>
          </>
        ) : (
          <div>
            <dt>Error</dt>
            <dd>{result.error}</dd>
          </div>
        )}
      </dl>
      <svg className="lab__canvas" viewBox="0 0 280 260" role="img" aria-label="Ideal-gas piston schematic">
        <text x="24" y="22" className="fig-label fig-label--ink">
          Closed system · PV = nRT
        </text>
        {/* Cylinder walls */}
        <line x1="110" y1="40" x2="110" y2="200" className="fig-wire" strokeWidth={1.75} />
        <line x1="200" y1="40" x2="200" y2="200" className="fig-wire" strokeWidth={1.75} />
        <line x1="110" y1="200" x2="200" y2="200" className="fig-wire" strokeWidth={1.75} />
        {/* Gas fill */}
        <rect
          x="112"
          y={pistonY + 10}
          width="86"
          height={Math.max(chamberH - 10, 8)}
          fill={`rgba(251, 113, 133, ${glow})`}
          stroke="none"
        />
        {/* Piston */}
        <rect x="108" y={pistonY} width="94" height="10" rx="2" className="fig-body" stroke="#fb7185" />
        <line x1="155" y1={pistonY} x2="155" y2={pistonY - 28} className="fig-wire" />
        <text x="162" y={pistonY - 16} className="fig-label">
          piston
        </text>
        {molecules.map(([mx, my], i) => (
          <circle key={i} cx={mx} cy={my} r={2.5} fill="#fda4af" opacity={0.9} />
        ))}
        <text x="24" y={pistonY + chamberH * 0.5} className="fig-eq" style={{ fontSize: 11 }}>
          {`P ≈ ${(press / 1000).toFixed(1)} kPa`}
        </text>
        <text x="24" y="230" className="fig-label">
          {`V = ${round(vol, 4)} m³ · T = ${round(temp, 1)} K`}
        </text>
        <text x="24" y="250" className="fig-label">
          Higher T or lower V → higher P (ideal gas)
        </text>
      </svg>
    </>
  )

  return (
    <div className="lab">
      <div className="lab__controls">
        <h2>Ideal gas law</h2>
        <p className="muted">PV = nRT · predict the unknown before reveal</p>
        <label>
          Solve for
          <select value={unknown} onChange={(e) => setUnknown(e.target.value as Unknown)}>
            <option value="P">Pressure P</option>
            <option value="V">Volume V</option>
            <option value="n">Amount n</option>
            <option value="T">Temperature T</option>
          </select>
        </label>
        {unknown !== 'P' && (
          <label>
            P (Pa)
            <input type="number" value={P} onChange={(e) => setP(+e.target.value)} />
          </label>
        )}
        {unknown !== 'V' && (
          <label>
            V (m³)
            <input type="number" step={0.001} value={V} onChange={(e) => setV(+e.target.value)} />
          </label>
        )}
        {unknown !== 'n' && (
          <label>
            n (mol)
            <input type="number" step={0.1} value={n} onChange={(e) => setN(+e.target.value)} />
          </label>
        )}
        {unknown !== 'T' && (
          <label>
            T (K)
            <input type="number" value={T} onChange={(e) => setT(+e.target.value)} />
          </label>
        )}
      </div>
      <div className="lab__reveal-col">
        <PredictCommitReveal
          key={`${unknown}-${P}-${V}-${n}-${T}`}
          mode="estimate"
          estimateLabel={`Predict ${unknown}`}
          actualDisplay={actual}
          spec={{
            prompt: `Commit a value for ${unknown} before the state panel opens.`,
            choices: [],
            revealNote: 'Remember absolute temperature (K) in PV = nRT.',
          }}
        >
          {results}
        </PredictCommitReveal>
      </div>
    </div>
  )
}
