import Link from 'next/link';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getTrustStats, MARKETS_LABEL } from '@/data/trust-stats';

/** Truthful proof band (project count, markets, languages, response time) — reused on both homepages. */
export function ResultsBand({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const stats = getTrustStats(locale);
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="relative py-[var(--marketing-section-y)]">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[hsl(142_69%_48%)] p-8 text-primary-foreground shadow-[0_30px_80px_-30px_hsl(217_91%_60%_/_0.5)] sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" aria-hidden />
          <div className="relative">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-3xl font-bold sm:text-4xl">
                {isEl ? 'Αποτελέσματα που μιλάνε μόνα τους' : 'Results that speak for themselves'}
              </h2>
              <p className="mt-3 text-primary-foreground/85">
                {isEl
                  ? 'Ολοκληρωμένα έργα σε τουρισμό, φιλοξενία και υπηρεσίες - από τα ελληνικά νησιά μέχρι διεθνείς αγορές.'
                  : 'Delivered across tourism, hospitality and services - from the Greek islands to international markets.'}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-4xl font-black tracking-tight sm:text-5xl">{s.value}</dd>
                  <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col items-start gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-primary-foreground/85">{MARKETS_LABEL[locale]}</p>
              <Link
                href={lp('/work')}
                className="inline-flex items-center gap-1 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-white/90"
              >
                {isEl ? 'Δείτε τα έργα μας →' : 'See our work →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsBand;
