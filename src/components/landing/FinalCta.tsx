import { ArrowRight } from 'lucide-react';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Bloom, GhostButtonLink, PrimaryButtonLink } from './primitives';

/** Full-bleed closing CTA with the brand bloom behind it. */
export function FinalCta({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <section className="relative overflow-hidden">
      <Bloom className="left-1/2 top-1/4 h-[26rem] w-[64rem] -translate-x-1/2" />
      <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
        <h2 className="font-display text-4xl font-medium leading-[1.03] tracking-[-0.04em] text-foreground md:text-6xl">
          {isEl ? (
            <>
              Έτοιμοι να <span className="text-primary">ανεβείτε</span> στη Google;
            </>
          ) : (
            <>
              Ready to <span className="text-primary">climb</span> the rankings?
            </>
          )}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {isEl
            ? 'Πείτε μας τι θέλετε να πετύχετε. Θα σας στείλουμε δωρεάν αξιολόγηση και συγκεκριμένο πλάνο μέσα σε 24 ώρες.'
            : 'Tell us what you want to achieve. We send back a free assessment and a concrete plan within 24 hours.'}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButtonLink href={lp('/get-started')}>
            {isEl ? 'Δωρεάν αξιολόγηση' : 'Get your free audit'}
            <ArrowRight className="size-4" aria-hidden />
          </PrimaryButtonLink>
          <GhostButtonLink href={lp('/work')}>
            {isEl ? 'Δείτε τα έργα' : 'See our work'}
          </GhostButtonLink>
        </div>
      </div>
    </section>
  );
}
