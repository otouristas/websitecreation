'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/** 46200 -> "46k" so axis labels fit the frame instead of clipping. Below 10k
 *  the raw number stays, otherwise rounding makes adjacent ticks collide. */
const compact = (n: number) => (n >= 10000 ? `${Math.round(n / 1000)}k` : `${n}`);
import { searchTrend } from '@/data/graphics-data';

/** Clicks/impressions trend for the hero dashboard mockup. Reads CSS vars so it tracks the theme. */
export function SearchChart() {
  return (
    <div className="h-[240px] w-full sm:h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={searchTrend} margin={{ top: 8, right: 4, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id="asg-clicks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="asg-impr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--hairline)" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
          />
          <YAxis
            yAxisId="clicks"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickFormatter={compact}
            width={40}
          />
          <YAxis
            yAxisId="impressions"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            tickFormatter={compact}
            width={44}
          />
          <Tooltip
            cursor={{ stroke: 'var(--hairline)' }}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--hairline)',
              borderRadius: 8,
              fontSize: 12,
              color: 'var(--foreground)',
            }}
          />
          <Area
            yAxisId="impressions"
            type="monotone"
            dataKey="impressions"
            stroke="var(--brand)"
            strokeWidth={1.5}
            fill="url(#asg-impr)"
          />
          <Area
            yAxisId="clicks"
            type="monotone"
            dataKey="clicks"
            stroke="var(--primary)"
            strokeWidth={2.5}
            fill="url(#asg-clicks)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
