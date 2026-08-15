import { strikingDistance } from '@/data/graphics-data';
import { ProductFrame } from './ProductFrame';

/** "Striking distance" keyword table - the platform's signature view. */
export function RankingsPanel({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const isEl = locale === 'el';
  return (
    <ProductFrame url="app.anotherseoguru.com/keywords">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <div>
          <p className="font-display text-sm font-medium text-foreground">
            {isEl ? 'Λέξεις-κλειδιά σε απόσταση βολής' : 'Striking distance keywords'}
          </p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">
            {isEl ? 'Θέσεις 4-20 - πιο γρήγορα κέρδη' : 'Positions 4-20 - fastest wins'}
          </p>
        </div>
        <span className="rounded-full border border-brand/35 bg-brand/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-brand">
          {isEl ? 'Ζωντανά' : 'Live'}
        </span>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-hairline">
        <table className="w-full text-left text-[12px]">
          <thead className="bg-surface-raised/70 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">{isEl ? 'Όρος' : 'Query'}</th>
              <th className="px-3 py-2 text-right font-medium">{isEl ? 'Θέση' : 'Pos'}</th>
              <th className="px-3 py-2 text-right font-medium">Δ</th>
              <th className="hidden px-3 py-2 text-right font-medium sm:table-cell">
                {isEl ? 'Εμφ.' : 'Impr'}
              </th>
            </tr>
          </thead>
          <tbody>
            {strikingDistance.map((row, i) => (
              <tr
                key={row.keyword}
                className={`border-t border-hairline ${i === 0 ? 'bg-primary/[0.06]' : ''}`}
              >
                <td className="px-3 py-2.5">
                  <span className="block truncate font-medium text-foreground">{row.keyword}</span>
                  <span className="text-[10px] text-muted-foreground">{row.cluster}</span>
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-foreground">
                  {row.position.toFixed(1)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-brand">
                  +{row.change.toFixed(1)}
                </td>
                <td className="hidden px-3 py-2.5 text-right tabular-nums text-muted-foreground sm:table-cell">
                  {row.impressions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProductFrame>
  );
}
