/** Map drill question ids → learning objective ids for spaced retrieval. */
export const drillObjectiveMap: Record<string, string> = {
  'd-calc-1': 'lim-sinx',
  'd-calc-2': 'power-rule',
  'd-calc-3': 'lim-eval',
  'd-calc-4': 'ftc-eval',
  'd-mech-1': 'solve-1d',
  'd-mech-2': 'net-force',
  'd-mech-3': 'solve-1d',
  'd-stat-1': 'sum-components',
  'd-stat-2': 'eq-eqs',
  'd-circ-1': 'compute-vout',
  'd-circ-2': 'write-eqs',
  'd-th-1': 'pvnrt',
  'd-th-2': 'carnot',
  'd-mat-1': 'hooke',
  'd-mat-2': 'stress-strain-def',
}

export function objectiveForDrill(drillId: string): string | undefined {
  return drillObjectiveMap[drillId]
}
