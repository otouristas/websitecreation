import { ArrowUpRight, BarChart3, Search, Sparkles } from 'lucide-react';
import { getAppPath } from '@/lib/app-links';
import type { SiteLocale } from '@/lib/i18n/locale';
import { Bloom } from '@/components/landing/primitives';

/**
 * Product promotion on informational surfaces.
 *
 * Blog readers are in research mode, so here the platform is the primary CTA
 * rather than the agency quote - the reverse of the commercial pages. Uses
 * `getAppPath()` so the origin stays driven by NEXT_PUBLIC_APP_ORIGIN.
 */
export function BlogProductCta({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';

  const points = isEl
    ? [
        { icon: Search, text: 'Δείτε ποια queries απέχουν μία θέση από κλικ' },
        { icon: BarChart3, text: 'Ομαδοποίηση λέξεων-κλειδιών ανά cluster' },
        { icon: Sparkles, text: 'Παρακολούθηση αναφορών σε ChatGPT και AI Overviews' },
      ]
    : [
        { icon: Search, text: 'Find the queries one position away from clicks' },
        { icon: BarChart3, text: 'Group keywords into clusters that move together' },
        { icon: Sparkles, text: 'Track citations in ChatGPT and AI Overviews' },
      ];

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-10">
      <div className="relative overflow-hidden rounded-[10px] border border-hairline bg-surface p-8 md:p-10">
        <Bloom soft className="-right-20 top-0 h-64 w-96" />
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              {isEl ? 'Η πλατφόρμα μας' : 'Our platform'}
            </span>
            <h2 className="mt-4 font-display text-2xl font-medium tracking-[-0.03em] text-foreground md:text-3xl">
              {isEl
                ? 'Σταματήστε να μαντεύετε. Συνδέστε το Search Console.'
                : 'Stop guessing. Connect your Search Console.'}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {isEl
                ? 'Η AnotherSEOGuru δεν είναι μόνο agency. Φτιάχνουμε τη δική μας πλατφόρμα SEO που δείχνει ακριβώς πού χάνετε κλικ και τι αποδίδει πρώτο.'
                : 'AnotherSEOGuru is not only an agency. We build our own SEO platform that shows exactly where you are losing clicks and what to fix first.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={getAppPath('/signup')}
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-primary px-5 font-display text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {isEl ? 'Ξεκινήστε δωρεάν' : 'Start free'}
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a
                href={getAppPath('/')}
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-hairline bg-surface-raised/60 px-5 font-display text-sm font-medium text-foreground transition-colors hover:border-brand/40"
              >
                app.anotherseoguru.com
              </a>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {points.map((p) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.text}
                  className="flex items-start gap-3 rounded-[8px] border border-hairline bg-surface-raised/50 p-4"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{p.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
