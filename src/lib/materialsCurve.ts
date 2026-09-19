/** Shared engineering stress–strain teaching curve (unitless σ). */

export const SS_E = 800
export const SS_EY = 0.08
export const SS_SY = SS_E * SS_EY // 64
/** End of Lüders-style plateau (mild-steel teaching curve). */
export const SS_PLATEAU_END = 0.14

/** Piecewise σ(ε): elastic → longer flat plateau → hardening. ε in [0, 0.22]. */
export function sigma(eps: number): number {
  const e = Math.max(0, eps)
  if (e <= SS_EY) return SS_E * e
  // Flat/very gentle plateau for Hibbeler mild-steel feel
  if (e <= SS_PLATEAU_END) return SS_SY + (e - SS_EY) * 12
  return SS_SY + (SS_PLATEAU_END - SS_EY) * 12 + (e - SS_PLATEAU_END) * 260
}

export type StressStrainMap = {
  ox: number
  oy: number
  xScale: number
  yScale: number
  mapX: (e: number) => number
  mapY: (s: number) => number
}

export function makeStressStrainMap(
  ox = 48,
  oy = 118,
  xScale = 920,
  yScale = 1.05,
): StressStrainMap {
  return {
    ox,
    oy,
    xScale,
    yScale,
    mapX: (e) => ox + e * xScale,
    mapY: (s) => oy - s * yScale,
  }
}

/** Sample polyline path from 0 → epsMax (inclusive). */
export function stressStrainPath(
  epsMax: number,
  map: StressStrainMap,
  step = 0.004,
): string {
  const pts: string[] = []
  const end = Math.max(0, epsMax)
  for (let e = 0; e <= end + 1e-9; e += step) {
    const ee = Math.min(e, end)
    pts.push(`${map.mapX(ee)} ${map.mapY(sigma(ee))}`)
  }
  if (!pts.length) return `M${map.mapX(0)} ${map.mapY(0)}`
  return `M${pts[0]} L${pts.slice(1).join(' L')}`
}

export function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n))
}

/** Position for E label: midpoint of elastic chord, offset clear of the stroke. */
export function elasticChordLabel(
  map: StressStrainMap,
  clear = 8,
): { x: number; y: number } {
  const yx = map.mapX(SS_EY)
  const yy = map.mapY(SS_SY)
  const mx = (map.ox + yx) / 2
  const my = (map.oy + yy) / 2
  const dx = yx - map.ox
  const dy = yy - map.oy
  const len = Math.hypot(dx, dy) || 1
  // Offset up-left of the rising chord (away from hardening branch)
  return { x: mx + (dy / len) * clear, y: my + (-dx / len) * clear }
}
