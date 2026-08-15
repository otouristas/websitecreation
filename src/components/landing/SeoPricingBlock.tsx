import { ArrowRight } from 'lucide-react';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { Bloom, Section, SectionHeading } from './primitives';
import { seoPackages, formatPrice, currentPrice, ENTRY_SEO_NET } from '@/data/pricing';
import { PriceCard } from '@/components/pricing/PriceCard';

/**
 * C1 pricing block - the highest-value section on /el.
 *
 * `docs/keyword-research/` maps 21 of 51 P0 keywords to the homepage and most
 * are pricing terms (τιμές seo 700/mo, κόστος seo 600/mo, πόσο κοστίζει το seo,
 * πακέτα seo). The research states this intent is "under-served on the site",
 * that these terms are "low-KD with weak incumbents - winnable fast", and that
 * "pricing transparency is the differentiator most Greek agencies avoid".
 *
 * Two of its rules are load-bearing here:
 *  1. The H2 is a question, not a label like "Τιμοκατάλογος" - question
 *     headings win PAA and AI Overview slots.
 *  2. It opens with a 40-55 word answer-first paragraph naming the entity.
 *
 * Figures come from `src/data/pricing.ts`, the single source of truth, so this
 * block can never drift from /pricing.
 */

export function SeoPricingBlock({ locale = 'en' }: { locale?: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  return (
    <Section id="pricing" className="relative">
      <SectionHeading
        eyebrow={isEl ? 'Τιμές & πακέτα' : 'Pricing & packages'}
        title={isEl ? 'Πόσο κοστίζει το SEO στην Ελλάδα;' : 'How much does SEO cost?'}
        body={
          isEl
            ? `Το μηνιαίο SEO στην Ελλάδα ξεκινά από €${formatPrice(ENTRY_SEO_NET, locale)} τον μήνα συν ΦΠΑ 24% για τοπικές επιχειρήσεις και φτάνει τα €${formatPrice(currentPrice(seoPackages[2]), locale)} για e-shop και ανταγωνιστικούς κλάδους. Η AnotherSEOGuru τιμολογεί με βάση τον ανταγωνισμό, τη ζήτηση αναζήτησης και τον όγκο περιεχομένου, όχι με βάση αριθμό λέξεων-κλειδιών.`
            : `Monthly SEO starts at €${formatPrice(ENTRY_SEO_NET, locale)} a month plus 24% VAT for local businesses and reaches €${formatPrice(currentPrice(seoPackages[2]), locale)} for e-shops and competitive markets. We price on competition, search demand and content volume, not on a keyword count.`
        }
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {seoPackages.map((tier) => (
          <PriceCard key={tier.id} tier={tier} locale={locale} recurring />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {isEl ? 'Χρειάζεστε και ιστοσελίδα; ' : 'Need a website too? '}
        <a href={lp('/pricing')} className="font-medium text-primary hover:underline">
          {isEl ? 'Δείτε όλα τα πακέτα κατασκευής' : 'See all build packages'}
        </a>
      </p>
    </Section>
  );
}
