import type { ReactNode, SVGProps } from 'react'
import { useId } from 'react'

/** Editorial figure palette — muted ink + one accent (course color inherits via CSS). */
export const Fig = {
  ink: '#cbd5e1',
  muted: '#64748b',
  faint: 'rgba(148, 163, 184, 0.28)',
  grid: 'rgba(148, 163, 184, 0.12)',
  fill: 'color-mix(in srgb, currentColor 14%, transparent)',
  warn: '#f472b6',
  warm: '#fbbf24',
  cool: '#38bdf8',
  good: '#6ee7b7',
} as const

/** Global shared marker ids (rendered once via FigSprite). Prefer useDiagramIds for multi-color vectors. */
export const SharedMarkers = {
  arrow: 'axiom-fig-arrow',
  arrowWarm: 'axiom-fig-arrow-warm',
  arrowCool: 'axiom-fig-arrow-cool',
  arrowWarn: 'axiom-fig-arrow-warn',
  arrowGood: 'axiom-fig-arrow-good',
} as const

/** Hidden SVG sprite — mount once in Layout so every figure can reference markers. */

type AxisOpts = {
  x?: number
  y?: number
  x2?: number
  y2?: number
  ox?: number
  oy?: number
  labelX?: string
  labelY?: string
  ticksX?: number[]
  ticksY?: number[]
  tickLen?: number
  showGrid?: boolean
  gridStep?: number
  /** Marker id prefix from useDiagramIds() */
  ids?: DiagramIds
}

export type DiagramIds = {
  arrow: string
  arrowAccent: string
  arrowWarn: string
  arrowWarm: string
  arrowCool: string
  grid: string
}

/** Stable unique marker/pattern ids per SVG instance (avoids clashes on multi-figure pages). */
export function useDiagramIds(): DiagramIds {
  const raw = useId().replace(/:/g, '')
  return {
    arrow: `fig-arrow-${raw}`,
    arrowAccent: `fig-arrow-a-${raw}`,
    arrowWarn: `fig-arrow-w-${raw}`,
    arrowWarm: `fig-arrow-wm-${raw}`,
    arrowCool: `fig-arrow-c-${raw}`,
    grid: `fig-grid-${raw}`,
  }
}

function ArrowMarker({ id, fill }: { id: string; fill: string }) {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="9"
      refY="5"
      markerWidth="7"
      markerHeight="7"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M1 1 L9 5 L1 9 L3 5 Z" fill={fill} />
    </marker>
  )
}

/** Shared defs: arrowheads + optional fine grid pattern. */
export function DiagramDefs({ ids }: { ids: DiagramIds }) {
  return (
    <defs>
      <ArrowMarker id={ids.arrow} fill="currentColor" />
      <ArrowMarker id={ids.arrowAccent} fill="currentColor" />
      <ArrowMarker id={ids.arrowWarn} fill={Fig.warn} />
      <ArrowMarker id={ids.arrowWarm} fill={Fig.warm} />
      <ArrowMarker id={ids.arrowCool} fill={Fig.cool} />
      <pattern id={ids.grid} width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0 H0 V20" fill="none" stroke={Fig.grid} strokeWidth="0.75" />
      </pattern>
    </defs>
  )
}

/** Figure canvas wrapper — pads content, injects defs, optional grid wash. */
export function DiagramSvg({
  viewBox = '0 0 280 140',
  className = 'obj-demo__svg',
  children,
  showGrid,
  ids: idsProp,
  ...rest
}: {
  viewBox?: string
  className?: string
  children: ReactNode
  showGrid?: boolean
  ids?: DiagramIds
} & SVGProps<SVGSVGElement>) {
  const local = useDiagramIds()
  const ids = idsProp ?? local
  const vb = viewBox.split(/\s+/).map(Number)
  const w = vb[2] ?? 280
  const h = vb[3] ?? 140

  return (
    <svg viewBox={viewBox} className={className} role="presentation" {...rest}>
      <DiagramDefs ids={ids} />
      {showGrid && <rect x={0} y={0} width={w} height={h} fill={`url(#${ids.grid})`} opacity={0.85} />}
      {children}
    </svg>
  )
}

/**
 * Proper Cartesian axes: thin strokes, arrowheads, optional ticks + unit labels.
 * Matches Hibbeler / Beer & Johnston figure conventions (simplified).
 */
export function CartesianAxes({
  x = 24,
  y = 20,
  x2 = 260,
  y2 = 120,
  ox,
  oy,
  labelX,
  labelY,
  ticksX,
  ticksY,
  tickLen = 4,
  showGrid,
  gridStep = 20,
  ids,
}: AxisOpts) {
  const originX = ox ?? x
  const originY = oy ?? y2 - 10
  const local = useDiagramIds()
  const m = ids ?? local

  const gridLines: ReactNode[] = []
  if (showGrid) {
    for (let gx = originX + gridStep; gx < x2 - 4; gx += gridStep) {
      gridLines.push(
        <line key={`gx${gx}`} x1={gx} y1={y} x2={gx} y2={originY} className="fig-grid-line" />,
      )
    }
    for (let gy = originY - gridStep; gy > y + 4; gy -= gridStep) {
      gridLines.push(
        <line key={`gy${gy}`} x1={originX} y1={gy} x2={x2} y2={gy} className="fig-grid-line" />,
      )
    }
  }

  return (
    <g className="fig-axes" aria-hidden>
      {gridLines}
      <line
        x1={x}
        y1={originY}
        x2={x2}
        y2={originY}
        className="fig-axis"
        markerEnd={`url(#${m.arrow})`}
      />
      <line
        x1={originX}
        y1={y2}
        x2={originX}
        y2={y}
        className="fig-axis"
        markerEnd={`url(#${m.arrow})`}
      />
      {ticksX?.map((tx) => (
        <line
          key={`tx${tx}`}
          x1={tx}
          y1={originY - tickLen}
          x2={tx}
          y2={originY + tickLen}
          className="fig-tick"
        />
      ))}
      {ticksY?.map((ty) => (
        <line
          key={`ty${ty}`}
          x1={originX - tickLen}
          y1={ty}
          x2={originX + tickLen}
          y2={ty}
          className="fig-tick"
        />
      ))}
      {labelX && (
        <text x={x2 - 4} y={originY + 14} className="fig-label fig-label--axis" textAnchor="end">
          {labelX}
        </text>
      )}
      {labelY && (
        <text x={originX + 8} y={y + 10} className="fig-label fig-label--axis">
          {labelY}
        </text>
      )}
    </g>
  )
}

type VecVariant = 'ink' | 'accent' | 'warn' | 'warm' | 'cool' | 'good'

const variantClass: Record<VecVariant, string> = {
  ink: 'fig-vector',
  accent: 'fig-vector fig-vector--accent',
  warn: 'fig-vector fig-vector--warn',
  warm: 'fig-vector fig-vector--warm',
  cool: 'fig-vector fig-vector--cool',
  good: 'fig-vector fig-vector--good',
}

const variantMarker = (ids: DiagramIds, v: VecVariant): string => {
  switch (v) {
    case 'warn':
      return ids.arrowWarn
    case 'warm':
      return ids.arrowWarm
    case 'cool':
      return ids.arrowCool
    default:
      return ids.arrow
  }
}

/** Force / velocity vector with textbook arrowhead. */
export function VectorArrow({
  x1,
  y1,
  x2,
  y2,
  variant = 'ink',
  ids,
  className = '',
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  variant?: VecVariant
  ids: DiagramIds
  className?: string
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={`${variantClass[variant]} ${className}`.trim()}
      markerEnd={`url(#${variantMarker(ids, variant)})`}
    />
  )
}

export function PlotPoint({
  cx,
  cy,
  variant = 'solid',
  r = 4,
  className = '',
}: {
  cx: number
  cy: number
  variant?: 'solid' | 'hollow' | 'ring' | 'sample' | 'sample-alt'
  r?: number
  className?: string
}) {
  const cls =
    variant === 'hollow'
      ? 'fig-point fig-point--hollow'
      : variant === 'ring'
        ? 'fig-point fig-point--ring'
        : variant === 'sample'
          ? 'fig-point fig-point--sample'
          : variant === 'sample-alt'
            ? 'fig-point fig-point--sample-alt'
            : 'fig-point'
  if (variant === 'hollow' || variant === 'ring') {
    return <circle cx={cx} cy={cy} r={r} className={`${cls} ${className}`.trim()} fill="none" />
  }
  return <circle cx={cx} cy={cy} r={r} className={`${cls} ${className}`.trim()} />
}

export function FigLabel({
  x,
  y,
  children,
  anchor = 'start',
  variant = 'muted',
  className = '',
}: {
  x: number
  y: number
  children: ReactNode
  anchor?: 'start' | 'middle' | 'end'
  variant?: 'muted' | 'ink' | 'eq'
  className?: string
}) {
  const cls =
    variant === 'eq' ? 'fig-eq' : variant === 'ink' ? 'fig-label fig-label--ink' : 'fig-label'
  return (
    <text x={x} y={y} textAnchor={anchor} className={`${cls} ${className}`.trim()}>
      {children}
    </text>
  )
}

export function GuideLine({
  x1,
  y1,
  x2,
  y2,
  className = '',
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  className?: string
}) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className={`fig-guide ${className}`.trim()} />
}

export function BodyRect({
  x,
  y,
  w,
  h,
  rx = 3,
  className = '',
}: {
  x: number
  y: number
  w: number
  h: number
  rx?: number
  className?: string
}) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} className={`fig-body ${className}`.trim()} />
}

/** Zigzag resistor glyph (IEEE-style simplified). */
export function ResistorPath({
  x,
  y,
  vertical = false,
  segments = 5,
  amp = 7,
  pitch = 8,
  className = '',
}: {
  x: number
  y: number
  vertical?: boolean
  segments?: number
  amp?: number
  pitch?: number
  className?: string
}) {
  const pts: string[] = []
  if (vertical) {
    pts.push(`M${x} ${y}`)
    for (let i = 0; i < segments; i++) {
      const sign = i % 2 === 0 ? 1 : -1
      pts.push(`l${sign * amp} ${pitch}`)
    }
  } else {
    pts.push(`M${x} ${y}`)
    for (let i = 0; i < segments; i++) {
      const sign = i % 2 === 0 ? 1 : -1
      pts.push(`l${pitch} ${sign * amp}`)
    }
  }
  return <path d={pts.join(' ')} className={`fig-resistor ${className}`.trim()} fill="none" />
}

export function GroundSymbol({ x, y }: { x: number; y: number }) {
  return (
    <g className="fig-ground" aria-hidden>
      <line x1={x} y1={y} x2={x} y2={y + 6} className="fig-wire" />
      <line x1={x - 12} y1={y + 6} x2={x + 12} y2={y + 6} className="fig-wire" strokeWidth={1.75} />
      <line x1={x - 8} y1={y + 10} x2={x + 8} y2={y + 10} className="fig-wire" />
      <line x1={x - 4} y1={y + 14} x2={x + 4} y2={y + 14} className="fig-wire" />
    </g>
  )
}

export function Legend({
  x,
  y,
  items,
}: {
  x: number
  y: number
  items: { color: string; label: string }[]
}) {
  return (
    <g className="fig-legend" transform={`translate(${x}, ${y})`}>
      {items.map((it, i) => (
        <g key={it.label} transform={`translate(${i * 48}, 0)`}>
          <line x1={0} y1={0} x2={14} y2={0} stroke={it.color} strokeWidth={2.25} strokeLinecap="round" />
          <text x={18} y={4} className="fig-label">
            {it.label}
          </text>
        </g>
      ))}
    </g>
  )
}

/** Compact section-figure shell (static instructional callouts). */
export function SectionFrame({
  children,
  viewBox = '0 0 320 130',
}: {
  children: (ids: DiagramIds) => ReactNode
  viewBox?: string
}) {
  const ids = useDiagramIds()
  return (
    <svg viewBox={viewBox} className="section-visual__svg" role="presentation">
      <DiagramDefs ids={ids} />
      <rect
        x="0.5"
        y="0.5"
        width="319"
        height="129"
        rx="6"
        className="fig-panel-bg"
        fill="none"
      />
      {children(ids)}
    </svg>
  )
}




/** Standard 280×140 graph frame used by objective/example demos. */
export function GraphFrame({
  labelX = 'x',
  labelY = 'y',
  showY = true,
  ox = 40,
  oy = 110,
}: {
  labelX?: string
  labelY?: string
  showY?: boolean
  ox?: number
  oy?: number
}) {
  const ids = useDiagramIds()
  return (
    <g className="fig-graph-frame" aria-hidden>
      <DiagramDefs ids={ids} />
      <line
        x1={24}
        y1={oy}
        x2={260}
        y2={oy}
        className="fig-axis"
        markerEnd={`url(#${ids.arrow})`}
      />
      {showY && (
        <line
          x1={ox}
          y1={120}
          x2={ox}
          y2={20}
          className="fig-axis"
          markerEnd={`url(#${ids.arrow})`}
        />
      )}
      {labelX && (
        <text x={256} y={oy + 14} className="fig-label fig-label--axis" textAnchor="end">
          {labelX}
        </text>
      )}
      {showY && labelY && (
        <text x={ox + 8} y={28} className="fig-label fig-label--axis">
          {labelY}
        </text>
      )}
    </g>
  )
}

/** Horizontal ground/track axis with arrow — kinematics / motion demos. */
export function TrackAxis({ y = 100, x1 = 30, x2 = 250, label = '+x' }: { y?: number; x1?: number; x2?: number; label?: string }) {
  return (
    <g aria-hidden>
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        className="fig-axis"
        markerEnd={`url(#${SharedMarkers.arrow})`}
      />
      <text x={x2 - 4} y={y + 14} className="fig-label fig-label--axis" textAnchor="end">
        {label}
      </text>
    </g>
  )
}

export function FigSprite() {
  return (
    <svg className="fig-sprite" width={0} height={0} aria-hidden focusable="false">
      <defs>
        <ArrowMarker id={SharedMarkers.arrow} fill="#94a3b8" />
        <ArrowMarker id={SharedMarkers.arrowWarm} fill={Fig.warm} />
        <ArrowMarker id={SharedMarkers.arrowCool} fill={Fig.cool} />
        <ArrowMarker id={SharedMarkers.arrowWarn} fill={Fig.warn} />
        <ArrowMarker id={SharedMarkers.arrowGood} fill={Fig.good} />
      </defs>
    </svg>
  )
}
