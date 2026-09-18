import type { ObjectiveVideo } from '../types'

/** Pedagogical enrichment keyed by objective id — merged at render time. */
export const objectiveWorld: Record<string, string> = {
  'lim-meaning':
    'Cruise-control software and sensor filters treat “approaching a setpoint” the same way: nearby readings settle even if the exact target sample is noisy or missing.',
  'lim-onesided':
    'A diode’s I–V curve and a one-way clutch both behave differently from each side — left and right limits disagree at the kink.',
  'lim-eval':
    'Canceling a common factor is what circuit simplifications and CAD geometry kernels do when a removable singularity is just an artifact of how the model was written.',
  'lim-sinx':
    'Small-angle approximations in robotics and structural vibration (sin θ ≈ θ in radians) are this limit in work boots.',
  'lim-fail':
    'A relay that snaps open, or a shock wave, is a jump: the “limit from both sides” story fails, and engineers model each side separately.',
  'deriv-def':
    'Speedometers estimate ds/dt; financial “delta” and motor torque loops all care about instantaneous rate, not just average over a long window.',
  'deriv-avg':
    'Average speed on a highway segment vs. the needle at one instant — traffic engineering and vehicle dynamics both live in that gap.',
  'deriv-eval':
    'Before CAD gives you a derivative “for free,” you still need the definition mindset to check units and sanity when a model blows up.',
  'deriv-fail':
    'A sharp corner on a cam profile or a bang-bang controller has no single tangent — design for that nonsmoothness explicitly.',
  'power-rule':
    'Beam deflection formulas, polynomial fits to calibration curves, and polynomial motor maps all differentiate with the power rule.',
  'product-rule':
    'Power P = τω, momentum p = mv, and many signal products need the product rule when both factors change in time.',
  'sanity-expand':
    'Expanding a simple case is the same habit as “check the FEA on a cantilever you already know” before trusting a bigger model.',
  'antideriv':
    'Accumulating charge from current (Q = ∫ I dt) or distance from velocity is antidifferentiation on the lab bench.',
  'indefinite':
    'The +C is “we measured a rate, not an absolute”; pressure transducers and potentiometers need a reference zero for the same reason.',
  'ftc-eval':
    'Numerical integrators in simulation and the area under a force–time curve (impulse) are FTC with a computer attached.',
  'when-const-a':
    'Elevator rides between floors, braking tests on a flat track, and many intro lab carts are designed so a is nearly constant.',
  'sign-convention':
    'Pick “up is positive” in an elevator problem the same way you pick a current direction before writing KVL — inconsistency is the #1 error.',
  'pick-equation':
    'Missing time? Reach for v² = v₀² + 2aΔx — crash reconstruction and braking-distance estimates do exactly that.',
  'solve-1d':
    '1-D kinematics is the spine of launch profiles, conveyor timing, and “will this actuator finish the stroke in 200 ms?”',
  'net-force':
    'A drone hovering is ΣF = 0; a launch sled is ΣF = ma. Net force, not “the biggest arrow on the whiteboard.”',
  'draw-fbd':
    'Every FEA boundary condition and every statics homework starts as an FBD — omit a force and the structure “lies” to you.',
  'component-eqs':
    'Robot arm torque loops and vehicle cornering both split force into chosen axes before solving.',
  'solve-body':
    'Elevator cables, towing hitches, and winch drums are single-body ΣF = ma with tension in the starring role.',
  'resolve-force':
    'Wind on a tower, guy-wire loads, and CNC cutting forces are almost never aligned with your favorite axis — resolve first.',
  'sum-components':
    'Sailboat resultant wind + current, or multi-bolt bracket loads: add vectors by components, never by “feeling.”',
  'rebuild-resultant':
    'Reporting |R| and θ is how you brief a fabricator or size a clevis — magnitude alone is not a direction.',
  'no-add-mags':
    'Two 10 kN bolts at 90° are not 20 kN of capacity in every direction — concurrent force mistakes crack brackets.',
  'why-particle':
    'A ring joint or a small clevis can often be treated as a particle: forces matter, size (moments) can wait for rigid-body statics.',
  'fbd-knot':
    'Zip-line junctions, crane hook blocks, and tent guy-line knots are particle FBDs in the wild.',
  'eq-eqs':
    'If it is not accelerating, ΣF = 0 is your friend — bridges in still air, parked vehicles, locked linkages.',
  'two-cable':
    'Hanging signs, theater flying systems, and temporary lift plans are two-cable tension problems with safety factors on top.',
  'derive-divider':
    'Phone chargers, sensor bias networks, and ADC reference taps are voltage dividers — when lightly loaded.',
  'compute-vout':
    'Setting a 3.3 V logic threshold from a 5 V rail is literally Vout = Vin · R₂/(R₁+R₂) on a schematic.',
  'ratio-vs-scale':
    'Same ratio, different absolute ohms: microamps vs. milliamps — battery life and noise immunity care about the scale.',
  'loading':
    'Hook a low-impedance load on Vout and the divider “sags” — that is why we buffer with an op-amp or use a regulator.',
  'state-laws':
    'KCL is why a house breaker trips on imbalance; KVL is why series LED strings need enough supply headroom.',
  'write-eqs':
    'SPICE and hand analysis both start from the same conservation statements — node and loop equations.',
  'solve-loop':
    'A single current loop with a battery and resistors is every flashlight and every series heater element.',
  'kvl-check':
    'After you solve, sum the drops: if they do not match the source, a sign error is hiding — same habit as checking units.',
  'pvnrt':
    'Scuba tank fill charts, HVAC refrigerant tables (idealized), and lab gas bottles all lean on PV = nRT with unit discipline.',
  'abs-temp':
    'Put °C into PV = nRT and you invent nonsense pressure — absolute temperature is non-negotiable in thermo.',
  'named-proc':
    'Bike-pump compression is closer to adiabatic than isothermal; a piston locked in place is isochoric heating.',
  'unit-r':
    'Using R = 8.314 J/(mol·K) with pressure in psi is a classic unit landmine on exams and in spreadsheets.',
  'energy-bal':
    'Boilers, batteries, and your laptop thermal design all track energy in, energy out, and what stays as ΔU.',
  'read-signs':
    'Turbine “work out” vs. compressor “work in” is a sign-convention conversation before any number is trustworthy.',
  'cycle-du':
    'Engines and refrigerators return to the same state each cycle — net ΔU = 0, so net heat and net work trade places.',
  'carnot':
    'Carnot is the scoreboard ceiling for heat engines between two temperatures — real plants compare themselves to it.',
  'stress-strain-def':
    'Tensile tests, bolt preload checks, and phone-drop FEA all speak stress and strain so geometry cancels out.',
  'hooke':
    'Within the elastic range, springs, PCB flex, and aluminum brackets are Hooke’s law with different E.',
  'poisson':
    'Stretch a rubber band and it necks; Poisson’s ratio is why pressurized pipes change diameter under hoop strain.',
  'why-normalize':
    'A thick bar and a thin wire of the same alloy need σ and ε to compare fairly — raw force lies about the material.',
  'grain-obstacle':
    'Cold-worked steel and Hall–Petch strengthening in alloys are “smaller grains → harder to push dislocations through.”',
  'hp-formula':
    'Metallurgists tune grain size in turbine disks and automotive sheet for yield strength vs. toughness tradeoffs.',
  'arrhenius':
    'Shelf life, creep, and battery aging explode with temperature because rates ride e^(−Q/RT).',
  'limits':
    'Nano-grained materials and °C-vs-K mistakes are where Hall–Petch and Arrhenius get mis-extrapolated in industry slides.',
}

export const objectiveVideos: Record<string, ObjectiveVideo> = {
  'lim-meaning': {
    youtubeId: 'kfF40MiS7zA',
    title: '3Blue1Brown — Limits',
    cue: 'Watch for the “zoom in until the hole looks like a height” intuition — that is limₓ→ₐ f(x).',
  },
  'deriv-def': {
    youtubeId: '9vKqVkMQHKk',
    title: '3Blue1Brown — Paradox of the derivative',
    cue: 'Watch how a finite secant becomes a tangent as dt shrinks — that is the definition of f′.',
  },
  'ftc-eval': {
    youtubeId: 'WUvTyaaNkzM',
    title: '3Blue1Brown — Essence of calculus',
    cue: 'Watch the area-sliver argument; FTC is why antiderivatives evaluate definite integrals.',
  },
  'product-rule': {
    youtubeId: 'YG15m2VwSjA',
    title: '3Blue1Brown — Product rule',
    cue: 'Watch the area-box picture of u·v changing — both edges contribute.',
  },
  'net-force': {
    youtubeId: 'aRhkQTQxm4w',
    title: 'Veritasium — Falling objects',
    cue: 'Watch the inertia vs. weight tradeoff — that ratio is why ΣF = ma feels “the same” for different masses in free fall.',
  },
  'derive-divider': {
    youtubeId: 't_hPrz7rs34',
    title: 'Khan Academy — Voltage divider',
    cue: 'Watch the derivation of Vout = Vin · R₂/(R₁+R₂) and the light-load assumption.',
  },
  'stress-strain-def': {
    youtubeId: 'aQf6Q8t1FQE',
    title: 'The Efficient Engineer — Stress & strain',
    cue: 'Watch the tensile-test curve form; connect σ = F/A₀ and ε = ΔL/L₀ to the plot axes.',
  },
  'hooke': {
    youtubeId: 'DLE-ieOVFjI',
    title: 'The Efficient Engineer — Young’s modulus',
    cue: 'Watch the elastic slope; that gradient is E in σ = Eε.',
  },
}

/** Theory→reality callouts keyed by `lessonId::heading`. */
export const sectionReality: Record<string, string> = {
  'calculus:limits-continuity::What a limit means':
    'On a bridge sensor feed, “approaching L” is what a filter claims when noisy samples cluster — even if one sample is dropped.',
  'calculus:limits-continuity::One-sided limits':
    'A mechanical hard stop or an electrical diode: behavior from one side is not the behavior from the other.',
  'calculus:limits-continuity::Indeterminate forms':
    '0/0 in a symbolic model often means “same factor twice,” not “physics exploded” — simplify before panicking.',
  'calculus:limits-continuity::A standard trig limit':
    'Robot small-angle control and pendulum linearization both quietly use sin θ ≈ θ (radians).',
  'calculus:derivative-intro::Average rate first':
    'Trip-computer average MPG vs. instantaneous MPG is average rate vs. derivative on a dashboard.',
  'calculus:derivative-intro::Difference quotient → derivative':
    'Encoder firmware estimates ω ≈ Δθ/Δt; smaller Δt (with filtering) is the engineering version of h → 0.',
  'calculus:power-product::Power rule':
    'Polynomial calibration curves in lab instruments are differentiated with the power rule to get sensitivities.',
  'calculus:power-product::Product rule':
    'Electrical power P = VI with both V and I changing needs the product rule in time-domain analysis.',
  'calculus:ftc-intro::Antiderivative idea':
    'Integrating current over time to get battery coulomb-count is antidifferentiation in firmware.',
  'calculus:ftc-intro::Fundamental theorem (evaluation form)':
    'Impulse = area under F(t); change in momentum is FTC with physics units.',
  'mechanics:const-accel::The three workhorses':
    'Braking-distance estimates on flat roads are classic constant-a kinematics with v² = v₀² + 2aΔx.',
  'mechanics:const-accel::Signs and “slowing down”':
    'Elevator problems: pick up-positive once, then a and v signs tell you whether you are speeding up or braking.',
  'mechanics:newton2::Net force, not “the” force':
    'A car at constant highway speed still has many forces — they cancel. Net force is what accelerates.',
  'mechanics:newton2::FBD discipline':
    'If it is not a force on your chosen body, it does not belong on the FBD (no “motion arrows”).',
  'mechanics:newton2::Weight vs mass':
    'Mass is kg on the scale of inertia; weight is the gravitational force mg — astronauts have mass without the same weight.',
  'statics:resultant-2d::Angle reference first':
    'Wind load on a facade: define 0° from your drawing’s axis before resolving — wrong reference rotates every component.',
  'statics:resultant-2d::Components and resultant':
    'Bolt patterns and sail resultant loads are component sums; rebuild |R| and θ to size the hardware.',
  'statics:particle-eq::Setup strategy':
    'A hanging sign on two cables is the textbook particle equilibrium problem — and a real facilities task.',
  'statics:particle-eq::Why equilibrium means zero net force':
    'If the knot is not accelerating, ΣF = 0 is not optional — it is the definition of equilibrium here.',
  'circuits:voltage-divider::Series intuition':
    'Two resistors in series share Vin like a proportional split — the heart of sensor scaling networks.',
  'circuits:voltage-divider::Derive the formula':
    'ADC reference dividers and LED bias networks use Vout = Vin · R₂/(R₁+R₂) when lightly loaded.',
  'circuits:voltage-divider::Loading in one line':
    'A microcontroller pin or speaker load on Vout changes the ratio — buffer or redesign when loading matters.',
  'circuits:kcl-kvl::KCL — charge conservation':
    'Kirchhoff’s current law is why currents into a solder node must balance — charge does not pile up in ideal wires.',
  'circuits:kcl-kvl::KVL — energy conservation':
    'Walk around a loop: rises and drops sum to zero — the same energy accounting as a closed hike in altitude.',
  'thermo:ideal-gas::Equation of state':
    'Lab gas bottles and pneumatic cylinders: PV = nRT (with unit-matched R) is the first sizing check.',
  'thermo:ideal-gas::Named processes':
    'Bike-pump strokes and HVAC compression paths are named processes with different locked variables.',
  'thermo:first-law::Energy balance':
    'Laptop cooling and engine cylinders both track Q, W, and ΔU — first law is the ledger.',
  'thermo:first-law::Why Carnot is a ceiling':
    'Power-plant efficiency slides always compare to Carnot between their T_H and T_C — it is the theoretical lid.',
  'materials:stress-strain::Definitions':
    'Tensile-test plots and FEA contour legends both speak σ and ε so geometry factors out.',
  'materials:stress-strain::Hooke’s law and Young’s modulus':
    'Within the elastic range, choosing aluminum vs. steel is largely choosing E (and density) for stiffness.',
  'materials:stress-strain::Poisson’s ratio':
    'Stretch a coupon and the width shrinks — Poisson couples axial and lateral strain in every structural section.',
  'materials:hall-petch::Grain boundaries as obstacles':
    'Finer grains (up to a point) raise yield strength — Hall–Petch is why processing history matters.',
  'materials:hall-petch::Arrhenius rates':
    'Bake a polymer or creep a turbine blade hotter and rates skyrocket — e^(−Q/RT) is unforgiving.',
}

export function enrichObjective<T extends { id: string; worldContext?: string; video?: ObjectiveVideo }>(
  obj: T,
): T & { worldContext?: string; video?: ObjectiveVideo } {
  return {
    ...obj,
    worldContext: obj.worldContext ?? objectiveWorld[obj.id],
    video: obj.video ?? objectiveVideos[obj.id],
  }
}

export function realityFor(lessonId: string, heading: string): string | undefined {
  return sectionReality[`${lessonId}::${heading}`]
}
