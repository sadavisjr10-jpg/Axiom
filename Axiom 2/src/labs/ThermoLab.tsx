import { useMemo, useState } from 'react'
import { idealGas, round } from '../lib/labMath'

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

  return (
    <div className="lab">
      <div className="lab__controls">
        <h2>Ideal gas law</h2>
        <p className="muted">PV = nRT · R = 8.314 J/(mol·K) · leave one unknown</p>
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
      </div>
      <div className="lab__canvas lab__canvas--panel">
        <p className="thermo-viz-title">State snapshot</p>
        <div className="thermo-viz">
          <div
            className="thermo-viz__box"
            style={{
              transform: `scale(${result.ok ? Math.min(1.4, 0.6 + result.value.V * 8) : 1})`,
            }}
          >
            <span>gas</span>
          </div>
          <ul>
            <li>Higher T → higher P at fixed V</li>
            <li>Higher V → lower P at fixed T</li>
            <li>Absolute temperature in kelvin</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
