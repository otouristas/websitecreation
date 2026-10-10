import { cn } from "@/lib/cn";

/** Deterministic series for previews: a base trend with a gentle weekly wave. */
export function series(n: number, start: number, end: number, wave = 0.08, seed = 1): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1);
    const base = start + (end - start) * t;
    const w = Math.sin((i + seed) * 0.9) * wave + Math.sin((i + seed * 2) * 2.3) * wave * 0.45;
    out.push(Math.max(0, base * (1 + w)));
  }
  return out;
}

function toPath(values: readonly number[], w: number, h: number, pad = 2, min?: number, max?: number) {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  return values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * (w - pad * 2) + pad;
      const y = h - pad - ((v - lo) / span) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const TONE_TEXT = {
  brand: "text-brand",
  primary: "text-primary-glow",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  signal: "text-signal",
} as const;

export function Sparkline({
  values,
  className,
  tone = "brand",
}: {
  readonly values: readonly number[];
  readonly className?: string;
  readonly tone?: "brand" | "primary" | "success" | "warning" | "destructive" | "signal";
}) {
  const w = 120;
  const h = 32;
  const d = toPath(values, w, h);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={cn("h-8 w-full", TONE_TEXT[tone], className)} aria-hidden>
      <path d={`${d} L${w - 2},${h} L2,${h} Z`} fill="currentColor" opacity="0.12" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Line chart with an optional comparison series, y gridlines, x labels and
 * vertical annotation markers. Pure SVG, no chart library.
 */
export function LineChart({
  current,
  previous,
  xLabels,
  yTicks,
  markers = [],
  height = 200,
  className,
}: {
  readonly current: readonly number[];
  readonly previous?: readonly number[];
  readonly xLabels: readonly string[];
  readonly yTicks: readonly number[];
  readonly markers?: ReadonlyArray<{ at: number; tone: "brand" | "warning" }>;
  readonly height?: number;
  readonly className?: string;
}) {
  const w = 600;
  const h = height;
  const left = 40;
  const bottom = 22;
  const top = 6;
  const plotW = w - left - 8;
  const plotH = h - bottom - top;
  const lo = Math.min(...yTicks);
  const hi = Math.max(...yTicks);
  const y = (v: number) => top + plotH - ((v - lo) / (hi - lo || 1)) * plotH;
  const x = (i: number, n: number) => left + (i / Math.max(1, n - 1)) * plotW;
  const line = (vals: readonly number[]) =>
    vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(i, vals.length).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const fmt = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K` : `${v}`);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-auto w-full", className)} aria-hidden>
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={left} x2={w - 8} y1={y(t)} y2={y(t)} stroke="var(--hairline)" strokeWidth="1" />
          <text x={left - 8} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill="var(--muted-foreground)">
            {fmt(t)}
          </text>
        </g>
      ))}
      {markers.map((m) => (
        <line
          key={m.at}
          x1={x(m.at, current.length)}
          x2={x(m.at, current.length)}
          y1={top}
          y2={top + plotH}
          stroke={m.tone === "warning" ? "var(--warning)" : "var(--brand)"}
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
      ))}
      {previous ? (
        <path d={line(previous)} fill="none" stroke="var(--muted-foreground)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 3" />
      ) : null}
      <path d={`${line(current)} L${x(current.length - 1, current.length)},${top + plotH} L${left},${top + plotH} Z`} fill="var(--primary)" opacity="0.1" />
      <path d={line(current)} fill="none" stroke="var(--primary-glow)" strokeWidth="2" strokeLinejoin="round" />
      {xLabels.map((l, i) => (
        <text
          key={l + i}
          x={left + (i / Math.max(1, xLabels.length - 1)) * plotW}
          y={h - 6}
          textAnchor={i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle"}
          fontSize="10"
          fill="var(--muted-foreground)"
        >
          {l}
        </text>
      ))}
    </svg>
  );
}

/** Ring score (site health, content score). */
export function ScoreRing({ value, size = 64, tone = "success" }: { readonly value: number; readonly size?: number; readonly tone?: "success" | "warning" }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--hairline)" strokeWidth="5" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={tone === "success" ? "var(--success)" : "var(--warning)"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * circ} ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontSize={size * 0.3} fontWeight="600" fill="var(--foreground)">
        {value}
      </text>
    </svg>
  );
}
