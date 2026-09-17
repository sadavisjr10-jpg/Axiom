interface Props {
  value: number
  size?: number
  stroke?: number
  color?: string
  label?: string
}

export function ProgressRing({
  value,
  size = 72,
  stroke = 6,
  color = 'var(--accent)',
  label,
}: Props) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  const offset = c - (pct / 100) * c

  return (
    <div className="progress-ring" style={{ width: size, height: size }} aria-label={label ?? `${pct}%`}>
      <svg width={size} height={size} role="img">
        <circle
          className="progress-ring__track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="progress-ring__value"
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          fill="none"
          stroke={color}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="progress-ring__label">{Math.round(pct)}%</span>
    </div>
  )
}
