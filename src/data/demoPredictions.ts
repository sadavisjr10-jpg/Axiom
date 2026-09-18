import type { ObjectiveDemoId } from '../types'

export interface DemoPrediction {
  prompt: string
  choices: string[]
  correctIndex: number
  reveal: string
}

/** Mazur-style predict–commit prompts for key objective demos. */
export const demoPredictions: Partial<Record<ObjectiveDemoId, DemoPrediction>> = {
  'limit-approach': {
    prompt: 'As x approaches a, what happens to f(x) if the limit is L?',
    choices: [
      'f(x) must equal L at x = a',
      'f(x) gets arbitrarily close to L (even if a is a hole)',
      'f(x) oscillates forever',
      'The derivative must exist at a',
    ],
    correctIndex: 1,
    reveal: 'Limits care about nearby values — the point itself can be missing.',
  },
  'sinx-x': {
    prompt: 'Before scrubbing: limₓ→₀ sin(x)/x equals…',
    choices: ['0', '1', '∞', 'Does not exist'],
    correctIndex: 1,
    reveal: 'The classic squeeze-theorem limit is 1 (radians).',
  },
  'secant-tangent': {
    prompt: 'As the second point approaches a, the secant slope approaches…',
    choices: ['Average rate on a fixed interval', 'The tangent slope f′(a)', 'Zero always', 'Infinity always'],
    correctIndex: 1,
    reveal: 'That limiting secant slope is the definition of the derivative.',
  },
  'voltage-divider': {
    prompt: 'For equal R1 = R2 (unloaded), Vout across R2 is…',
    choices: ['Vin', 'Vin/2', '0', '2 Vin'],
    correctIndex: 1,
    reveal: 'Equal series resistors split Vin in half when unloaded.',
  },
  'kvl-loop': {
    prompt: 'Around a closed loop, the signed sum of voltage changes is…',
    choices: ['Equal to the largest drop', 'Zero (KVL)', 'Equal to total resistance', 'Undefined'],
    correctIndex: 1,
    reveal: 'KVL is energy conservation around a loop — net voltage change is zero.',
  },
  'const-accel': {
    prompt: 'With constant a and v₀ = 0, distance after time t scales as…',
    choices: ['a t', '½ a t²', 'a / t²', 'Independent of a'],
    correctIndex: 1,
    reveal: 'From rest: x = ½ a t².',
  },
  'force-components': {
    prompt: 'Two equal forces at 90°. |R| equals…',
    choices: ['2F', 'F', 'F√2', '0'],
    correctIndex: 2,
    reveal: 'Components: |R| = √(F²+F²) = F√2 — not 2F.',
  },
  'particle-eq': {
    prompt: 'A particle in equilibrium needs…',
    choices: ['ΣF = ma with a ≠ 0', 'ΣF = 0', 'Only vertical forces', 'Moments only'],
    correctIndex: 1,
    reveal: 'No acceleration ⇒ net force is zero.',
  },
  'ideal-gas': {
    prompt: 'If T doubles at fixed V and n, pressure…',
    choices: ['Halves', 'Stays the same', 'Doubles', 'Quadruples'],
    correctIndex: 2,
    reveal: 'PV = nRT ⇒ P ∝ T at fixed V, n.',
  },
  'stress-strain': {
    prompt: 'Stress is best thought of as…',
    choices: ['Raw force F', 'Force per area F/A', 'Elongation ΔL', 'Young’s modulus alone'],
    correctIndex: 1,
    reveal: 'σ = F/A normalizes out geometry so materials can be compared.',
  },
  'free-body': {
    prompt: 'Should ma appear as an arrow on the free-body diagram?',
    choices: ['Yes, opposite motion', 'Yes, along motion', 'No — only real forces belong on the FBD', 'Only in elevators'],
    correctIndex: 2,
    reveal: 'ma is the result of ΣF, not an extra force to draw.',
  },
  'first-law': {
    prompt: 'For a cycle, net change in internal energy ΔU is…',
    choices: ['Equal to net heat', 'Equal to net work', 'Zero', 'Always positive'],
    correctIndex: 2,
    reveal: 'State function: return to start ⇒ ΔU_net = 0.',
  },
}

export function predictionForDemo(id: ObjectiveDemoId): DemoPrediction | undefined {
  return demoPredictions[id]
}
