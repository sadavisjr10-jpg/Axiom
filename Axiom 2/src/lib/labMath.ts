/** Convert degrees to radians */
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/** 2D force resultant from two forces (magnitude + angle from +x, degrees) */
export function resultant2D(
  f1Mag: number,
  f1AngleDeg: number,
  f2Mag: number,
  f2AngleDeg: number,
): { rx: number; ry: number; magnitude: number; angleDeg: number } {
  const r1 = degToRad(f1AngleDeg)
  const r2 = degToRad(f2AngleDeg)
  const rx = f1Mag * Math.cos(r1) + f2Mag * Math.cos(r2)
  const ry = f1Mag * Math.sin(r1) + f2Mag * Math.sin(r2)
  const magnitude = Math.hypot(rx, ry)
  const angleDeg = (Math.atan2(ry, rx) * 180) / Math.PI
  return { rx, ry, magnitude, angleDeg }
}

/** Constant-acceleration kinematics: v = v0 + a t, x = x0 + v0 t + ½ a t² */
export function constantAcceleration(
  x0: number,
  v0: number,
  a: number,
  t: number,
): { x: number; v: number } {
  const v = v0 + a * t
  const x = x0 + v0 * t + 0.5 * a * t * t
  return { x, v }
}

/** Voltage divider: Vout = Vin * R2 / (R1 + R2) */
export function voltageDivider(vin: number, r1: number, r2: number): number {
  const denom = r1 + r2
  if (denom === 0) return NaN
  return (vin * r2) / denom
}

/** Ideal gas law: PV = nRT → solve for missing variable (null = unknown) */
export function idealGas(params: {
  P?: number | null
  V?: number | null
  n?: number | null
  T?: number | null
  R?: number
}): { P: number; V: number; n: number; T: number } {
  const R = params.R ?? 8.314
  const known = {
    P: params.P ?? null,
    V: params.V ?? null,
    n: params.n ?? null,
    T: params.T ?? null,
  }
  const missing = (['P', 'V', 'n', 'T'] as const).filter((k) => known[k] == null)
  if (missing.length !== 1) {
    throw new Error('Provide exactly three of P, V, n, T')
  }
  const m = missing[0]
  let P = known.P ?? 0
  let V = known.V ?? 0
  let n = known.n ?? 0
  let T = known.T ?? 0

  if (m === 'P') {
    if (V === 0) throw new Error('V cannot be zero when solving for P')
    P = (n * R * T) / V
  } else if (m === 'V') {
    if (P === 0) throw new Error('P cannot be zero when solving for V')
    V = (n * R * T) / P
  } else if (m === 'n') {
    if (T === 0 || R === 0) throw new Error('T and R must be nonzero when solving for n')
    n = (P * V) / (R * T)
  } else {
    if (n === 0 || R === 0) throw new Error('n and R must be nonzero when solving for T')
    T = (P * V) / (n * R)
  }
  return { P, V, n, T }
}

export function round(n: number, digits = 4): number {
  if (!Number.isFinite(n)) return n
  const f = 10 ** digits
  return Math.round(n * f) / f
}
