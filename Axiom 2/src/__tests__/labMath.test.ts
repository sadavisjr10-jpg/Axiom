import { describe, expect, it } from 'vitest'
import {
  constantAcceleration,
  idealGas,
  resultant2D,
  round,
  voltageDivider,
} from '../lib/labMath'

describe('resultant2D', () => {
  it('adds equal orthogonal forces', () => {
    const r = resultant2D(100, 0, 100, 90)
    expect(round(r.rx, 6)).toBe(100)
    expect(round(r.ry, 6)).toBe(100)
    expect(round(r.magnitude, 6)).toBe(round(100 * Math.SQRT2, 6))
    expect(round(r.angleDeg, 6)).toBe(45)
  })

  it('cancels opposite equal forces', () => {
    const r = resultant2D(50, 0, 50, 180)
    expect(round(r.magnitude, 8)).toBe(0)
  })
})

describe('constantAcceleration', () => {
  it('matches v = v0 + a t and x formula from rest', () => {
    const { x, v } = constantAcceleration(0, 0, 2, 5)
    expect(v).toBe(10)
    expect(x).toBe(25)
  })
})

describe('voltageDivider', () => {
  it('halves equal resistors', () => {
    expect(voltageDivider(12, 1000, 1000)).toBe(6)
  })

  it('returns NaN when both resistances are zero', () => {
    expect(Number.isNaN(voltageDivider(5, 0, 0))).toBe(true)
  })
})

describe('idealGas', () => {
  it('solves for P', () => {
    const { P } = idealGas({ P: null, V: 1, n: 1, T: 100, R: 8.314 })
    expect(round(P, 3)).toBe(831.4)
  })

  it('solves for T', () => {
    const { T } = idealGas({ P: 831.4, V: 1, n: 1, T: null, R: 8.314 })
    expect(round(T, 1)).toBe(100)
  })

  it('throws if not exactly one unknown', () => {
    expect(() => idealGas({ P: 1, V: 1, n: 1, T: 1 })).toThrow()
  })
})
