import type { ContrastCase, CourseId } from '../types'

/** Contrast-case common-mistake clinics — A/B “which is wrong and why?” */
export const contrastClinics: ContrastCase[] = [
  // —— Statics (priority) ——
  {
    id: 'cc-stat-add-mags',
    lessonId: 'statics:resultant-2d',
    courseId: 'statics',
    topic: 'Resultants',
    prompt: 'Two concurrent forces of 10 kN at 90°. Which claim is wrong?',
    optionA: '|R| = √(10²+10²) = 10√2 kN',
    optionB: '|R| = 10 + 10 = 20 kN',
    wrongIndex: 1,
    explanation:
      'Magnitudes do not add when directions differ. At 90°, components give |R| = 10√2 kN — adding 20 kN overstates capacity and cracks brackets.',
  },
  {
    id: 'cc-stat-quadrant',
    lessonId: 'statics:resultant-2d',
    courseId: 'statics',
    topic: 'Angle from components',
    prompt: 'Rx = −3 N, Ry = −4 N. Which angle report is wrong?',
    optionA: 'θ = atan(4/3) below the −x axis (third quadrant) ≈ 233° from +x',
    optionB: 'θ = atan(|Ry|/|Rx|) = 53° from +x (first quadrant)',
    wrongIndex: 1,
    explanation:
      'atan(|Ry|/|Rx|) ignores quadrant. Both components negative ⇒ third quadrant, not 53° from +x.',
  },
  {
    id: 'cc-stat-angle-ref',
    lessonId: 'statics:resultant-2d',
    courseId: 'statics',
    topic: 'Angle reference',
    prompt: 'Force “30° above the −x axis.” Which resolution is wrong?',
    optionA: 'Sketch first: Fx = −F cos 30°, Fy = +F sin 30°',
    optionB: 'Plug into Fx = F cos 30°, Fy = F sin 30° with no sketch',
    wrongIndex: 1,
    explanation:
      'Default formulas assume θ from +x. From the −x axis you must adjust signs — skipping the sketch is the #1 statics error.',
  },
  {
    id: 'cc-stat-cable-sign',
    lessonId: 'statics:particle-eq',
    courseId: 'statics',
    topic: 'Particle equilibrium',
    prompt: 'Two cables pull a ring left-up and right-up. Which FBD statement is wrong?',
    optionA: 'Horizontal components oppose; ΣFx = 0 relates the two tensions',
    optionB: 'Both cable tensions get the same +x sign because “tension is positive”',
    wrongIndex: 1,
    explanation:
      'Tension is a magnitude; direction on the FBD sets the sign. Opposite horizontal pulls need opposite x-signs.',
  },
  {
    id: 'cc-stat-one-eq',
    lessonId: 'statics:particle-eq',
    courseId: 'statics',
    topic: 'Equations vs unknowns',
    prompt: 'Two unknown cable tensions, planar particle. Which approach is wrong?',
    optionA: 'Write both ΣFx = 0 and ΣFy = 0 (two equations)',
    optionB: 'Write only ΣFy = 0 and solve for both tensions',
    wrongIndex: 1,
    explanation:
      'Two unknowns need two independent equilibrium equations. One scalar equation cannot determine two tensions.',
  },
  // —— Circuits (priority) ——
  {
    id: 'cc-circ-numerator',
    lessonId: 'circuits:voltage-divider',
    courseId: 'circuits',
    topic: 'Voltage divider',
    prompt: 'Vout across R2 (bottom). Which formula is wrong?',
    optionA: 'Vout = Vin · R2 / (R1 + R2)',
    optionB: 'Vout = Vin · R1 / (R1 + R2)',
    wrongIndex: 1,
    explanation:
      'The fraction uses the resistor you measure across in the numerator. Swapping R1 into the numerator is the classic divider mistake.',
  },
  {
    id: 'cc-circ-load',
    lessonId: 'circuits:voltage-divider',
    courseId: 'circuits',
    topic: 'Loading',
    prompt: 'Equal R1=R2 unloaded give Vin/2. A heavy load on Vout… Which claim is wrong?',
    optionA: 'Vout drops below Vin/2 because R2∥RL < R2',
    optionB: 'Vout stays exactly Vin/2 because the resistors are still equal',
    wrongIndex: 1,
    explanation:
      'Loading parallels R2; the bottom equivalent shrinks, so the divider ratio changes. Equal series resistors no longer imply half.',
  },
  {
    id: 'cc-circ-units',
    lessonId: 'circuits:voltage-divider',
    courseId: 'circuits',
    topic: 'Units',
    prompt: 'R1 = 2 kΩ, R2 = 500 Ω. Which setup is wrong?',
    optionA: 'Convert both to Ω: 2000 and 500 before dividing',
    optionB: 'Compute 2/(2+500) mixing kΩ and Ω in one expression',
    wrongIndex: 1,
    explanation:
      'Mixing kΩ and Ω mid-equation wrecks the ratio. Convert to one unit first.',
  },
  {
    id: 'cc-circ-kvl-sign',
    lessonId: 'circuits:kcl-kvl',
    courseId: 'circuits',
    topic: 'KVL signs',
    prompt: 'Walking a loop with a source and drops. Which is wrong?',
    optionA: 'Pick a walk direction and assign +/− consistently, then Σ = 0',
    optionB: 'Flip resistor signs freely until the numbers “look nice”',
    wrongIndex: 1,
    explanation:
      'Inconsistent voltage signs around a loop are the usual KVL bug. Commit to a direction before writing equations.',
  },
  {
    id: 'cc-circ-series-parallel',
    lessonId: 'circuits:kcl-kvl',
    courseId: 'circuits',
    topic: 'Series vs parallel',
    prompt: 'Which statement is wrong?',
    optionA: 'Series elements share one current; parallel elements share one voltage',
    optionB: 'Series elements share one voltage; parallel elements share one current',
    wrongIndex: 1,
    explanation:
      'Series ⇒ same current; parallel ⇒ same voltage. Swapping those is a foundational circuits error.',
  },
  // —— Calculus ——
  {
    id: 'cc-calc-00',
    lessonId: 'calculus:limits-continuity',
    courseId: 'calculus',
    topic: 'Indeterminate forms',
    prompt: 'After substituting you get 0/0. Which conclusion is wrong?',
    optionA: 'Simplify (factor/cancel) and re-evaluate the limit',
    optionB: 'Conclude the limit is 0 because the numerator is 0',
    wrongIndex: 1,
    explanation:
      '0/0 is indeterminate — nearby values may approach a finite limit. Canceling first is the next step, not “limit = 0.”',
  },

  {
    id: 'cc-calc-avg-vs-inst',
    lessonId: 'calculus:derivative-intro',
    courseId: 'calculus',
    topic: 'Average vs instantaneous',
    prompt: 'Which claim is wrong?',
    optionA: 'f′(a) is the limiting secant slope as the second point approaches a',
    optionB: 'The average rate on [a,b] is always equal to f′(a)',
    wrongIndex: 1,
    explanation:
      'Average rate on a fixed interval is not the instantaneous derivative at a single point — they meet only in special cases (or via MVT at some c, not necessarily a).',
  },

  {
    id: 'cc-calc-product',
    lessonId: 'calculus:power-product',
    courseId: 'calculus',
    topic: 'Product rule',
    prompt: 'Which derivative rule is wrong for (uv)′?',
    optionA: '(uv)′ = u′v + uv′',
    optionB: '(uv)′ = u′v′',
    wrongIndex: 1,
    explanation:
      'The product rule needs cross terms. Multiplying the derivatives alone drops essential pieces.',
  },
  {
    id: 'cc-calc-ftc-order',
    lessonId: 'calculus:ftc-intro',
    courseId: 'calculus',
    topic: 'FTC evaluation',
    prompt: 'Evaluating ∫ₐᵇ f with antiderivative F. Which is wrong?',
    optionA: 'F(b) − F(a)',
    optionB: 'F(a) − F(b)',
    wrongIndex: 1,
    explanation:
      'Order matters: upper minus lower. Reversing a and b flips the sign of the definite integral.',
  },
  // —— Mechanics ——
  {
    id: 'cc-mech-ma-on-fbd',
    lessonId: 'mechanics:newton2',
    courseId: 'mechanics',
    topic: 'Free-body diagrams',
    prompt: 'Which FBD practice is wrong?',
    optionA: 'Draw only real forces (contact, weight, …); write ΣF = ma separately',
    optionB: 'Draw ma as an arrow on the FBD next to the forces',
    wrongIndex: 1,
    explanation:
      'ma is not a force. Putting it on the FBD double-counts dynamics and confuses Newton’s second law.',
  },
  {
    id: 'cc-mech-const-a',
    lessonId: 'mechanics:const-accel',
    courseId: 'mechanics',
    topic: 'Kinematic equations',
    prompt: 'Which use of v = v₀ + a t is wrong?',
    optionA: 'Apply when acceleration is constant over the interval',
    optionB: 'Apply even when a clearly changes mid-motion',
    wrongIndex: 1,
    explanation:
      'The SUVAT equations assume constant a. Variable acceleration needs calculus or piecewise constants.',
  },
  // —— Thermo ——
  {
    id: 'cc-th-celsius',
    lessonId: 'thermo:ideal-gas',
    courseId: 'thermo',
    topic: 'Absolute temperature',
    prompt: 'Using PV = nRT. Which is wrong?',
    optionA: 'Convert 25°C → 298 K before substituting',
    optionB: 'Plug T = 25 directly because “it’s room temperature”',
    wrongIndex: 1,
    explanation:
      'Ideal-gas T must be absolute (kelvin). Celsius in PV = nRT invents nonsense pressures.',
  },
  {
    id: 'cc-th-cycle',
    lessonId: 'thermo:first-law',
    courseId: 'thermo',
    topic: 'Cycles',
    prompt: 'For a thermodynamic cycle, which claim is wrong?',
    optionA: 'Net ΔU = 0 because you return to the same state',
    optionB: 'Net ΔU equals net heat because the process is cyclic',
    wrongIndex: 1,
    explanation:
      'ΔU_net = 0 on a cycle; net heat equals net work (first law), not ΔU.',
  },
  // —— Materials ——
  {
    id: 'cc-mat-force-vs-stress',
    lessonId: 'materials:stress-strain',
    courseId: 'materials',
    topic: 'Stress vs force',
    prompt: 'Comparing two bars of different area under load. Which is wrong?',
    optionA: 'Compare stress σ = F/A so geometry cancels for material behavior',
    optionB: 'Compare raw force F alone to decide which material is “stronger”',
    wrongIndex: 1,
    explanation:
      'Raw force lies about the material — a thick bar carries more load at the same stress. Normalize with σ and ε.',
  },
  {
    id: 'cc-mat-arrhenius-c',
    lessonId: 'materials:hall-petch',
    courseId: 'materials',
    topic: 'Arrhenius temperature',
    prompt: 'In rate ∝ e^(−Q/RT), which is wrong?',
    optionA: 'Use T in kelvin',
    optionB: 'Use T in °C because activation energies are quoted per °C',
    wrongIndex: 1,
    explanation:
      'Arrhenius needs absolute temperature. °C-vs-K mistakes explode extrapolated rates.',
  },
]

export function clinicsForLesson(lessonId: string): ContrastCase[] {
  return contrastClinics.filter((c) => c.lessonId === lessonId)
}

export function clinicsForCourse(courseId: CourseId): ContrastCase[] {
  return contrastClinics.filter((c) => c.courseId === courseId)
}
