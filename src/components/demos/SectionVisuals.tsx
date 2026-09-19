import type { SectionVisualId } from '../../types'
import {
  BodyRect,
  CartesianAxes,
  FigLabel,
  GroundSymbol,
  GuideLine,
  PlotPoint,
  ResistorPath,
  SectionFrame,
  SharedMarkers,
  VectorArrow,
  type DiagramIds,
} from './diagramPrimitives'

interface Props {
  id: SectionVisualId
}

/** Compact inline diagrams for instruction sections — editorial figure quality. */
export function SectionVisual({ id }: Props) {
  const label = id.replace(/-/g, ' ')
  return (
    <div className="section-visual" role="img" aria-label={`Figure: ${label}`}>
      <SectionSvg id={id} />
    </div>
  )
}

function SectionSvg({ id }: { id: SectionVisualId }) {
  return (
    <SectionFrame>
      {(ids) => {
        switch (id) {
          case 'limit-zoom':
            return <LimitZoom ids={ids} />
          case 'one-sided-graph':
            return <OneSided ids={ids} />
          case 'indeterminate':
            return <Indeterminate />
          case 'continuity':
            return <Continuity ids={ids} />
          case 'trig-limit':
            return <TrigLimit ids={ids} />
          case 'avg-rate':
            return <AvgRate ids={ids} />
          case 'difference-quotient':
            return <DiffQuotient ids={ids} />
          case 'power-slope':
            return <PowerSlope ids={ids} />
          case 'product-uv':
            return <ProductUv />
          case 'antiderivative':
          case 'ftc-eval':
            return <FtcArea ids={ids} />
          case 'kinematic-axes':
            return <Kinematic ids={ids} />
          case 'signs-motion':
            return <SignsMotion ids={ids} />
          case 'net-force':
          case 'fbd-block':
            return <FbdBlock ids={ids} />
          case 'weight-mass':
            return <WeightMass />
          case 'vector-resolve':
          case 'resultant':
            return <VectorResolve ids={ids} />
          case 'particle-knot':
            return <ParticleKnot ids={ids} />
          case 'series-resistors':
          case 'divider-formula':
            return <Divider ids={ids} />
          case 'loading':
            return <Loading />
          case 'kcl-node':
            return <KclNode ids={ids} />
          case 'kvl-loop-viz':
            return <KvlLoop />
          case 'pvt-state':
            return <PvtState />
          case 'named-process':
            return <NamedProcess />
          case 'energy-balance':
            return <EnergyBalance ids={ids} />
          case 'carnot':
            return <Carnot />
          case 'stress-def':
          case 'hooke':
            return <StressStrain ids={ids} />
          case 'poisson':
            return <Poisson />
          case 'grain-boundary':
            return <GrainBoundary />
          case 'arrhenius':
            return <Arrhenius />
          default:
            return null
        }
      }}
    </SectionFrame>
  )
}

function LimitZoom({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" labelY="y" ox={36} oy={100} x={20} y={18} x2={300} y2={115} />
      <path d="M40 95 C90 88 120 38 160 48 C200 58 240 32 290 36" className="fig-curve" fill="none" />
      <PlotPoint cx={160} cy={48} variant="hollow" r={5} />
      <rect x={132} y={28} width={56} height={48} rx={3} className="fig-callout-box" />
      <FigLabel x={20} y={16} variant="ink">
        as x → a, f(x) → L
      </FigLabel>
    </g>
  )
}

function OneSided({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" ox={160} oy={100} x={20} y={18} x2={300} y2={115} />
      <GuideLine x1={160} y1={18} x2={160} y2={100} />
      <path d="M30 88 L152 42" className="fig-curve" fill="none" />
      <path d="M168 78 L290 38" className="fig-curve fig-curve--alt" fill="none" />
      <PlotPoint cx={152} cy={42} variant="hollow" r={4} />
      <PlotPoint cx={168} cy={78} variant="hollow" r={4} className="fig-point--sample-alt" />
      <FigLabel x={24} y={28} variant="ink">
        lim⁻ ≠ lim⁺ → DNE
      </FigLabel>
    </g>
  )
}

function Indeterminate() {
  return (
    <g>
      <FigLabel x={40} y={58} variant="eq">
        0/0
      </FigLabel>
      <path d="M100 52 H145" className="fig-curve" markerEnd={`url(#${SharedMarkers.arrow})`} />
      <FigLabel x={158} y={58} variant="eq">
        factor → evaluate limit
      </FigLabel>
      <FigLabel x={40} y={95}>
        Indeterminate form — algebra first, then limit.
      </FigLabel>
    </g>
  )
}

function Continuity({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" labelY="y" ox={36} oy={100} x={20} y={18} x2={300} y2={115} />
      <path d="M40 88 C90 78 120 42 160 52 C200 62 250 42 290 48" className="fig-curve" fill="none" />
      <PlotPoint cx={160} cy={52} r={4} />
      <FigLabel x={20} y={16} variant="eq">
        lim f(x) = f(a)
      </FigLabel>
    </g>
  )
}

function TrigLimit({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" labelY="y" ox={160} oy={105} x={24} y={16} x2={300} y2={118} />
      <GuideLine x1={40} y1={32} x2={280} y2={32} />
      <path d="M40 78 C80 28 120 24 160 32 C200 24 240 28 280 78" className="fig-curve" fill="none" />
      <FigLabel x={248} y={28} variant="ink">
        y = 1
      </FigLabel>
      <FigLabel x={20} y={16} variant="eq">
        sin x / x → 1
      </FigLabel>
    </g>
  )
}

function AvgRate({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" labelY="y" ox={36} oy={105} x={20} y={16} x2={300} y2={118} />
      <path d="M40 98 C100 92 140 38 230 48" className="fig-curve" fill="none" />
      <line x1={70} y1={94} x2={190} y2={52} className="fig-secant" />
      <PlotPoint cx={70} cy={94} r={3.5} variant="sample" />
      <PlotPoint cx={190} cy={52} r={3.5} variant="sample" />
      <FigLabel x={20} y={18} variant="eq">
        Δy / Δx
      </FigLabel>
    </g>
  )
}

function DiffQuotient({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" ox={36} oy={105} x={20} y={16} x2={300} y2={118} />
      <path d="M40 98 C100 88 140 40 250 55" className="fig-curve" fill="none" />
      <line x1={100} y1={72} x2={230} y2={28} className="fig-tangent" />
      <PlotPoint cx={150} cy={52} r={4} />
      <FigLabel x={20} y={18} variant="eq">
        h → 0 · secant → tangent
      </FigLabel>
    </g>
  )
}

function PowerSlope({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" labelY="y" ox={40} oy={108} x={24} y={16} x2={300} y2={120} />
      <path d="M50 105 Q160 100 250 28" className="fig-curve" fill="none" />
      <line x1={150} y1={72} x2={230} y2={28} className="fig-tangent" />
      <PlotPoint cx={170} cy={58} r={4} variant="sample" />
      <FigLabel x={20} y={22} variant="eq">
        (xⁿ)′ = n xⁿ⁻¹
      </FigLabel>
    </g>
  )
}

function ProductUv() {
  return (
    <g>
      <BodyRect x={48} y={32} w={78} h={52} rx={5} />
      <FigLabel x={87} y={62} anchor="middle" variant="ink">
        u
      </FigLabel>
      <FigLabel x={140} y={62} anchor="middle" variant="ink">
        ×
      </FigLabel>
      <BodyRect x={158} y={32} w={78} h={52} rx={5} />
      <FigLabel x={197} y={62} anchor="middle" variant="ink">
        v
      </FigLabel>
      <FigLabel x={48} y={112} variant="eq">
        (uv)′ = u′v + uv′
      </FigLabel>
    </g>
  )
}

function FtcArea({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="x" ox={40} oy={108} x={24} y={16} x2={300} y2={120} />
      <path d="M55 92 C100 36 155 30 215 58 L215 108 L55 108 Z" className="fig-fill" />
      <path d="M55 92 C100 36 155 30 215 58" className="fig-curve" fill="none" />
      <GuideLine x1={55} y1={20} x2={55} y2={108} />
      <GuideLine x1={215} y1={20} x2={215} y2={108} />
      <FigLabel x={50} y={122}>a</FigLabel>
      <FigLabel x={210} y={122}>b</FigLabel>
      <FigLabel x={90} y={24} variant="eq">
        ∫ₐᵇ f = F(b) − F(a)
      </FigLabel>
    </g>
  )
}

function Kinematic({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <line
        x1={30}
        y1={95}
        x2={295}
        y2={95}
        className="fig-axis"
        markerEnd={`url(#${ids.arrow})`}
      />
      <BodyRect x={70} y={62} w={44} h={28} />
      <VectorArrow x1={118} y1={76} x2={240} y2={76} ids={ids} variant="cool" />
      <FigLabel x={30} y={28} variant="eq">
        v² = v₀² + 2aΔx
      </FigLabel>
      <FigLabel x={230} y={68}>v</FigLabel>
      <FigLabel x={30} y={118}>+x</FigLabel>
    </g>
  )
}

function SignsMotion({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <line
        x1={36}
        y1={58}
        x2={290}
        y2={58}
        className="fig-axis"
        markerEnd={`url(#${ids.arrow})`}
      />
      <VectorArrow x1={150} y1={58} x2={230} y2={58} ids={ids} variant="good" />
      <FigLabel x={36} y={36} variant="ink">
        + direction
      </FigLabel>
      <FigLabel x={36} y={100}>
        Slowing: v and a have opposite signs
      </FigLabel>
    </g>
  )
}

function FbdBlock({ ids }: { ids: DiagramIds }) {
  const cx = 160
  const cy = 62
  return (
    <g>
      <BodyRect x={cx - 28} y={cy - 20} w={56} h={40} />
      <VectorArrow x1={cx} y1={cy - 20} x2={cx} y2={18} ids={ids} variant="ink" />
      <VectorArrow x1={cx} y1={cy + 20} x2={cx} y2={110} ids={ids} variant="ink" />
      <VectorArrow x1={cx + 28} y1={cy} x2={250} y2={cy} ids={ids} variant="warm" />
      <FigLabel x={168} y={28}>N</FigLabel>
      <FigLabel x={168} y={108}>mg</FigLabel>
      <FigLabel x={230} y={54}>F</FigLabel>
      <FigLabel x={24} y={28} variant="eq">
        ΣF = ma
      </FigLabel>
    </g>
  )
}

function WeightMass() {
  return (
    <g>
      <FigLabel x={40} y={48} variant="eq">
        W = mg
      </FigLabel>
      <FigLabel x={40} y={78}>
        mass m (kg) · weight W is a force (N)
      </FigLabel>
      <FigLabel x={40} y={104}>
        On Earth, g ≈ 9.81 m/s²
      </FigLabel>
    </g>
  )
}

function VectorResolve({ ids }: { ids: DiagramIds }) {
  const ox = 48
  const oy = 108
  const fx = 170
  const fy = 70
  return (
    <g>
      <CartesianAxes ids={ids} ox={ox} oy={oy} x={24} y={16} x2={300} y2={120} labelX="x" labelY="y" />
      <VectorArrow x1={ox} y1={oy} x2={ox + fx} y2={oy - fy} ids={ids} variant="warm" />
      <GuideLine x1={ox} y1={oy} x2={ox + fx} y2={oy} />
      <GuideLine x1={ox + fx} y1={oy} x2={ox + fx} y2={oy - fy} />
      <FigLabel x={ox + fx / 2 - 6} y={oy + 16}>Fₓ</FigLabel>
      <FigLabel x={ox + fx + 10} y={oy - fy / 2}>Fᵧ</FigLabel>
      <FigLabel x={ox + fx / 2 + 20} y={oy - fy / 2 - 8} variant="ink">
        F
      </FigLabel>
    </g>
  )
}

function ParticleKnot({ ids }: { ids: DiagramIds }) {
  const kx = 160
  const ky = 58
  return (
    <g>
      <VectorArrow x1={kx} y1={ky} x2={48} y2={22} ids={ids} variant="cool" />
      <VectorArrow x1={kx} y1={ky} x2={272} y2={22} ids={ids} variant="cool" />
      <VectorArrow x1={kx} y1={ky} x2={kx} y2={105} ids={ids} variant="warm" />
      <PlotPoint cx={kx} cy={ky} r={5} />
      <BodyRect x={kx - 16} y={105} w={32} h={16} rx={2} />
      <FigLabel x={56} y={40}>T₁</FigLabel>
      <FigLabel x={248} y={40}>T₂</FigLabel>
      <FigLabel x={172} y={100}>W</FigLabel>
    </g>
  )
}

function Divider({ ids: _ids }: { ids: DiagramIds }) {
  void _ids
  return (
    <g>
      <line x1={50} y1={28} x2={50} y2={108} className="fig-wire" />
      <line x1={50} y1={28} x2={150} y2={28} className="fig-wire" />
      <line x1={150} y1={28} x2={150} y2={48} className="fig-wire" />
      <ResistorPath x={150} y={48} vertical segments={5} amp={8} pitch={7} />
      <FigLabel x={168} y={68}>R₁</FigLabel>
      <line x1={150} y1={83} x2={150} y2={92} className="fig-wire" />
      <PlotPoint cx={150} cy={92} r={3.5} variant="sample" className="fig-point--good" />
      <line x1={150} y1={92} x2={220} y2={92} className="fig-wire fig-wire--accent" />
      <FigLabel x={226} y={96} variant="ink">
        V_out
      </FigLabel>
      <ResistorPath x={150} y={96} vertical segments={4} amp={8} pitch={7} />
      <FigLabel x={168} y={118}>R₂</FigLabel>
      <line x1={150} y1={124} x2={50} y2={124} className="fig-wire" />
      <GroundSymbol x={50} y={108} />
      <FigLabel x={24} y={20} variant="eq">
        V_out = V_in · R₂/(R₁+R₂)
      </FigLabel>
    </g>
  )
}

function Loading() {
  return (
    <g>
      <FigLabel x={28} y={40} variant="ink">
        unloaded divider
      </FigLabel>
      <path d="M155 34 H195" className="fig-curve" markerEnd={`url(#${SharedMarkers.arrow})`} />
      <FigLabel x={205} y={40}>
        + R_load changes V_out
      </FigLabel>
      <FigLabel x={28} y={88} variant="eq">
        R₂ ∥ R_load
      </FigLabel>
      <FigLabel x={28} y={112}>
        Parallel path lowers effective bottom resistance.
      </FigLabel>
    </g>
  )
}

function KclNode({ ids: _ids }: { ids: DiagramIds }) {
  void _ids
  const cx = 160
  const cy = 62
  return (
    <g>
      <line x1={50} y1={cy} x2={cx - 8} y2={cy} className="fig-wire" />
      <line x1={cx + 8} y1={cy} x2={270} y2={38} className="fig-wire" />
      <line x1={cx + 8} y1={cy} x2={270} y2={88} className="fig-wire" />
      <PlotPoint cx={cx} cy={cy} r={6} />
      <FigLabel x={24} y={28} variant="eq">
        Σ i_in = Σ i_out
      </FigLabel>
      <FigLabel x={60} y={52}>i₁</FigLabel>
      <FigLabel x={248} y={34}>i₂</FigLabel>
      <FigLabel x={248} y={98}>i₃</FigLabel>
    </g>
  )
}

function KvlLoop() {
  return (
    <g>
      <rect x={70} y={28} width={180} height={64} rx={4} className="fig-loop" fill="none" />
      <circle cx={70} cy={60} r={11} className="fig-source" fill="none" />
      <FigLabel x={64} y={64} anchor="middle" variant="ink">
        V
      </FigLabel>
      <FigLabel x={130} y={22}>IR</FigLabel>
      <FigLabel x={90} y={118} variant="eq">
        Σ ΔV around loop = 0
      </FigLabel>
    </g>
  )
}

function PvtState() {
  return (
    <g>
      <rect x={130} y={22} width={70} height={78} rx={4} className="fig-body" fill="none" />
      <rect x={134} y={36} width={62} height={10} rx={2} className="fig-body" />
      <FigLabel x={28} y={40} variant="eq">
        PV = nRT
      </FigLabel>
      <FigLabel x={28} y={70}>
        State variables close the gas.
      </FigLabel>
      <FigLabel x={28} y={96}>
        T absolute (K)
      </FigLabel>
    </g>
  )
}

function NamedProcess() {
  return (
    <g>
      <FigLabel x={28} y={36} variant="eq">
        isothermal: PV = const
      </FigLabel>
      <FigLabel x={28} y={62} variant="eq">
        isochoric: P/T = const
      </FigLabel>
      <FigLabel x={28} y={88} variant="eq">
        isobaric: V/T = const
      </FigLabel>
      <FigLabel x={28} y={114}>
        Name the constraint before integrating.
      </FigLabel>
    </g>
  )
}

function EnergyBalance({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <BodyRect x={120} y={38} w={80} h={52} rx={6} />
      <FigLabel x={160} y={68} anchor="middle" variant="ink">
        ΔU
      </FigLabel>
      <VectorArrow x1={40} y1={64} x2={115} y2={64} ids={ids} variant="warn" />
      <VectorArrow x1={205} y1={64} x2={280} y2={64} ids={ids} variant="cool" />
      <FigLabel x={48} y={54}>Q</FigLabel>
      <FigLabel x={250} y={54}>W</FigLabel>
      <FigLabel x={100} y={118} variant="eq">
        ΔU = Q − W
      </FigLabel>
    </g>
  )
}

function Carnot() {
  return (
    <g>
      <FigLabel x={40} y={52} variant="eq">
        η_C = 1 − T_C / T_H
      </FigLabel>
      <FigLabel x={40} y={82}>
        Temperatures in kelvin only
      </FigLabel>
      <FigLabel x={40} y={108}>
        Upper bound for heat-engine efficiency
      </FigLabel>
    </g>
  )
}

function StressStrain({ ids }: { ids: DiagramIds }) {
  return (
    <g>
      <CartesianAxes ids={ids} labelX="ε" labelY="σ" ox={48} oy={108} x={28} y={16} x2={300} y2={120} />
      <path d="M48 108 L140 48 L200 42 L260 88" className="fig-curve" fill="none" />
      <line x1={48} y1={108} x2={130} y2={55} className="fig-tangent" opacity={0.55} />
      <FigLabel x={100} y={70}>E</FigLabel>
      <FigLabel x={20} y={24} variant="ink">
        stress–strain
      </FigLabel>
    </g>
  )
}

function Poisson() {
  return (
    <g>
      <BodyRect x={90} y={30} w={46} h={68} />
      <path d="M155 64 H175" className="fig-curve" markerEnd={`url(#${SharedMarkers.arrow})`} />
      <BodyRect x={185} y={42} w={70} h={44} className="fig-body--alt" />
      <FigLabel x={28} y={24} variant="ink">
        axial stretch → lateral contraction
      </FigLabel>
      <FigLabel x={90} y={118}>ε_axial</FigLabel>
      <FigLabel x={195} y={118}>ε_lateral</FigLabel>
    </g>
  )
}

function GrainBoundary() {
  return (
    <g>
      <path d="M40 28 L105 58 L40 95 Z" className="fig-grain" />
      <path d="M105 58 L185 28 L185 95 Z" className="fig-grain" />
      <path d="M185 28 L290 48 L290 95 L185 95 Z" className="fig-grain" />
      <FigLabel x={40} y={118}>
        Grain boundaries impede dislocation motion
      </FigLabel>
    </g>
  )
}

function Arrhenius() {
  return (
    <g>
      <FigLabel x={40} y={48} variant="eq">
        rate ∝ e⁻Q/(RT)
      </FigLabel>
      <FigLabel x={40} y={78}>
        Small ΔT → large rate change
      </FigLabel>
      <FigLabel x={40} y={108}>
        Activation energy Q sets sensitivity
      </FigLabel>
    </g>
  )
}
