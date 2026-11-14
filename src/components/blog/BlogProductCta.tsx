import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { articleNextStep } from '@/data/blog-next-steps';
import { Accent, CheckList, Container, DecisionsPanel, KitEyebrow, SoftwareCtas, Stage } from '@/components/kit';

/**
 * Product promotion on informational surfaces.
 *
 * Blog readers are in research mode, so here the platform is the primary CTA
 * rather than the agency quote - the reverse of the commercial pages. The kit's
 * SoftwareCtas resolve the app origin through getAppPath().
 */
export function BlogProductCta({ locale = 'en', pillar }: { locale?: SiteLocale; pillar?: string }) {
  const isEl = locale === 'el';

  const step = articleNextStep(pillar, locale);
  if (step) {
    return (
      <section className="py-12" aria-labelledby="article-next-step">
        <Container>
          <div className="rounded-3xl border border-hairline bg-surface p-6 sm:p-10">
            <KitEyebrow className="text-brand">AnotherSEOGuru App</KitEyebrow>
            <h2 id="article-next-step" className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight sm:text-3xl">{step.heading}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{step.description}</p>
            <Link href={localizedPath(locale, step.path)} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline decoration-primary/40 underline-offset-4">
              {step.label}<ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const points = isEl
    ? [
        'Δείτε για ποιες αναζητήσεις εμφανίζεται ήδη μια σελίδα',
        'Εντοπίστε αναζητήσεις που αφορούν το ίδιο θέμα',
        'Ελέγξτε αν το ChatGPT ή τα AI Overviews αναφέρουν την ιστοσελίδα σας',
      ]
    : [
        'See the searches a page already appears for',
        'Group related searches before updating a page',
        'Check whether ChatGPT or AI Overviews cite your site',
      ];

  return (
    <section className="py-12">
      <Container>
        <div className="reveal grid gap-10 overflow-hidden rounded-3xl border border-signal/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_7%,var(--background)),var(--background))] p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="min-w-0">
            <KitEyebrow icon={<span className="size-1.5 rounded-full bg-signal" />} className="text-signal">
              AnotherSEOGuru App
            </KitEyebrow>
            <h2 className="mt-3 text-balance font-display text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[32px]">
              {isEl ? (
                <>
                  Ποια σελίδα σας έχει περιθώριο <Accent>για περισσότερα κλικ;</Accent>
                </>
              ) : (
                <>
                  Which of your pages could <Accent>earn more clicks?</Accent>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {isEl
                ? 'Συνδέστε το Search Console και επιλέξτε μια σελίδα που θέλετε να βελτιώσετε. Ρωτήστε τον Aster AI τι δείχνουν τα δεδομένα της και κρατήστε μια πρόταση ως εργασία.'
                : 'Pick a page from your own Search Console account. Ask Aster AI what its numbers tell you, then save a suggested change as a task.'}
            </p>
            <CheckList className="mt-6" size="sm" items={points} />
            <SoftwareCtas locale={locale} align="left" source="blog-product-cta" className="mt-8" />
          </div>
          <Stage className="min-w-0">
            <DecisionsPanel locale={locale} count={3} />
          </Stage>
        </div>
      </Container>
    </section>
  );
}
