import type { SiteLocale } from '@/lib/i18n/locale';
import { Accent, CheckList, Container, DecisionsPanel, KitEyebrow, SoftwareCtas, Stage } from '@/components/kit';

/**
 * Product promotion on informational surfaces.
 *
 * Blog readers are in research mode, so here the platform is the primary CTA
 * rather than the agency quote - the reverse of the commercial pages. The kit's
 * SoftwareCtas resolve the app origin through getAppPath().
 */
export function BlogProductCta({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';

  const points = isEl
    ? [
        'Δείτε ποια queries απέχουν μία θέση από κλικ',
        'Ομαδοποίηση λέξεων-κλειδιών ανά cluster',
        'Παρακολούθηση αναφορών σε ChatGPT και AI Overviews',
      ]
    : [
        'Find the queries one position away from clicks',
        'Group keywords into clusters that move together',
        'Track citations in ChatGPT and AI Overviews',
      ];

  return (
    <section className="py-12">
      <Container>
        <div className="reveal grid gap-10 overflow-hidden rounded-3xl border border-signal/30 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--signal)_7%,var(--background)),var(--background))] p-6 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="min-w-0">
            <KitEyebrow icon={<span className="size-1.5 rounded-full bg-signal" />} className="text-signal">
              {isEl ? 'Η πλατφόρμα μας' : 'Our platform'}
            </KitEyebrow>
            <h2 className="mt-3 text-balance font-display text-[26px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[32px]">
              {isEl ? (
                <>
                  Σταματήστε να μαντεύετε. <Accent>Συνδέστε το Search Console.</Accent>
                </>
              ) : (
                <>
                  Stop guessing. <Accent>Connect your Search Console.</Accent>
                </>
              )}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {isEl
                ? 'Η AnotherSEOGuru δεν είναι μόνο agency. Φτιάχνουμε τη δική μας πλατφόρμα SEO που δείχνει ακριβώς πού χάνετε κλικ και τι αποδίδει πρώτο.'
                : 'AnotherSEOGuru is not only an agency. We build our own SEO platform that shows exactly where you are losing clicks and what to fix first.'}
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
