import { metricValue, type CaseResult } from '@/data/case-results';
import type { SiteLocale } from '@/lib/i18n/locale';

/** Measured Search Console results on a work page. Renders nothing for projects without published numbers. */
export function CaseResults({ result, locale }: { result: CaseResult | undefined; locale: SiteLocale }) {
  if (!result) return null;
  const el = locale === 'el';
  return (
    <section aria-labelledby="case-results-title" className="relative mx-auto max-w-[1240px] px-5 pb-6 lg:px-8">
      <div className="rounded-[22px] border border-hairline bg-surface/60 p-6 sm:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-primary">{el ? 'Μετρημένα αποτελέσματα' : 'Measured results'}</p>
        <h2 id="case-results-title" className="mt-2 text-balance font-display text-[1.5rem] font-bold tracking-tight text-foreground sm:text-[1.9rem]">
          {el ? result.summaryEl : result.summaryEn}
        </h2>
        <dl className="mt-7 grid gap-6 sm:grid-cols-3">
          {result.metrics.map((m) => (
            <div key={m.labelEn} className="min-w-0 border-t border-hairline pt-4">
              <dt className="sr-only">{el ? m.labelEl : m.labelEn}</dt>
              <dd className="font-display text-[2rem] font-bold leading-none tracking-tight tabular-nums text-foreground sm:text-[2.4rem]">{metricValue(m, el)}</dd>
              <dd className="mt-2 text-[14px] leading-snug text-muted-foreground">{el ? m.labelEl : m.labelEn}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[12px] text-muted-foreground">{el ? `Πηγή: ${result.periodEl}.` : `Source: ${result.periodEn}.`}</p>
      </div>
    </section>
  );
}
