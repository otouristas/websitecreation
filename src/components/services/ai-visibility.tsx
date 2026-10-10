import Link from 'next/link';
import { Bot, Eye, Library, ListChecks, Sparkles, X } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { AiVisibilityPreview, AssistantPreview, CtaBand, FeatureRow, KitHeading, KitSection, Stage, ValueTrio } from '@/components/kit';
import {
  AccentTitle,
  CardGrid,
  DiyRow,
  FaqBlock,
  PriceTiers,
  ProcessGrid,
  ProofGrid,
  ServiceHero,
  getServiceKit,
  pick,
} from '@/components/service-kit';
import RelatedPages from '@/components/seo/RelatedPages';
import { cn } from '@/lib/cn';
import { getAiVisibilityPillarCopy } from '@/data/ai-visibility-pillar';
import { resolvePriceTokens, seoPackages } from '@/data/pricing';
import { SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import { portfolioProjects } from '@/data/portfolio';
import { getServiceBySlug } from '@/data/services';
import { getServiceEl } from '@/data/services-i18n';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import {
  generateBreadcrumbSchema,
  generateServiceSchema,
  generateFAQSchema,
  combineSchemas,
  BASE_URL,
} from '@/lib/seo/schema';

/**
 * /services/ai-visibility - bespoke commercial hub.
 *
 * Shape follows `/seo-services` (answer-first H1, problem, definitions,
 * includes, audience, process, public pricing, not-for-you, proof, FAQ in
 * server HTML, related, CTA). It stays on the services axis rather than
 * becoming a new pillar URL, because the slug already exists and the
 * location / industry matrices already hang off it.
 *
 * Signature: 250 (indigo, in the brand 150-290 band, distinct from local
 * SEO at 165 and website-creation at 259).
 *
 * Integrity: no client metrics, no citation promises, no aggregateRating.
 */

const SIGNATURE_HUE = 250;

const GEO_PACKAGE_IDS = new Set(['growth', 'authority']);

export function AiVisibilityPage({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const t = getAiVisibilityPillarCopy(locale);
  const lp = (path: string) => localizedPath(locale, path);
  const rp = (text: string) => resolvePriceTokens(text, locale);
  const service = getServiceBySlug('ai-visibility');
  const serviceEl = isEl ? getServiceEl('ai-visibility') : null;

  const breadcrumbs = [
    { name: isEl ? 'Αρχική' : 'Home', url: lp('/') },
    { name: isEl ? 'Υπηρεσίες' : 'Services', url: lp('/services') },
    {
      name: serviceEl?.name ?? service?.name ?? t.eyebrow,
      url: lp('/services/ai-visibility'),
    },
  ];

  const faqs = t.faqs.map((f) => ({ question: f.question, answer: rp(f.answer) }));

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generateServiceSchema({
      name: t.metaTitle,
      description: rp(t.metaDescription),
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      serviceType: 'Generative engine optimization',
      areaServed: ['GR'],
    }),
    generateFAQSchema({ faqs }),
  );

  const tagged = portfolioProjects.filter(
    (p) => !p.liveStatus && p.services?.includes('ai-visibility'),
  );
  const fallback = portfolioProjects
    .filter((p) => !p.liveStatus && p.markets.includes('GR'))
    .filter((p) => ['rent-a-car', 'hotel', 'tours'].includes(p.category));
  const seen = new Set<string>();
  const proof = [...tagged, ...fallback]
    .filter((p) => {
      if (seen.has(p.slug)) return false;
      seen.add(p.slug);
      return true;
    })
    .slice(0, 6);

  const related = [
    { path: '/seo-services', title: isEl ? 'Υπηρεσίες SEO' : 'SEO services' },
    { path: '/services/local-seo', title: isEl ? 'Τοπικό SEO' : 'Local SEO' },
    { path: '/pricing', title: isEl ? 'Τιμές και πακέτα' : 'Pricing and packages' },
    {
      path: isEl ? '/blog/geo-agency-ellada' : '/blog/ai-seo-agency-geo-aeo',
      title: isEl ? 'GEO agency Ελλάδα' : 'AI SEO agency (GEO / AEO)',
    },
    {
      path: isEl ? '/blog/geo-vs-seo-vs-aeo-el' : '/blog/geo-vs-seo-vs-aeo',
      title: isEl ? 'GEO vs SEO vs AEO' : 'GEO vs SEO vs AEO',
    },
    {
      path: isEl ? '/blog/geo-aeo-ellada' : '/blog/geo-aeo-global-seo-playbook',
      title: isEl ? 'GEO και AEO στην Ελλάδα' : 'GEO / AEO playbook',
    },
  ];

  const kit = getServiceKit('ai-visibility');
  const tx = (en: string, el: string) => (isEl ? el : en);

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      <ServiceHero
        locale={locale}
        breadcrumbs={breadcrumbs}
        pill={{ kind: kit.pill.kind, tag: pick(kit.pill.tag, locale), text: kit.pill.text[locale], href: lp(kit.pill.href) }}
        h1={t.h1}
        lead={rp(t.answer)}
        primaryLabel={t.cta.primary}
        primaryHref={lp('/get-started?service=ai-visibility')}
        links={[
          { href: lp('/pricing'), label: t.cta.secondary },
          { href: lp('/ai-visibility-check'), label: tx('Free AI visibility check', 'Δωρεάν έλεγχος ορατότητας σε AI') },
        ]}
        visual={<AiVisibilityPreview locale={locale} />}
        visualLabel={kit.heroLabel[locale]}
      />

      <KitSection className="mt-6 sm:mt-10">
        <KitHeading eyebrow={isEl ? 'Πλαίσιο' : 'Context'} eyebrowIcon={<Bot />} title={<AccentTitle text={t.problem.title} />} description={t.problem.intro} />
        <ValueTrio
          className="mt-14"
          items={t.problem.items.map((item, i) => ({ icon: [Eye, Library, Sparkles][i % 3], title: item.title, text: item.body }))}
        />
      </KitSection>

      <KitSection tinted>
        <KitHeading align="center" eyebrow={isEl ? 'Ορισμοί' : 'Definitions'} title={<AccentTitle text={t.definitions.title} />} description={t.definitions.intro} />
        <CardGrid className="mt-12" items={t.definitions.items} />
      </KitSection>

      <KitSection>
        <FeatureRow
          eyebrow={isEl ? 'Παραδοτέα' : 'Deliverables'}
          eyebrowIcon={<ListChecks />}
          title={<AccentTitle text={t.includes.title} />}
          body={t.includes.intro}
          bullets={t.includes.items.slice(0, 3).map((item) => item.title)}
          preview={
            <Stage>
              <AssistantPreview locale={locale} />
            </Stage>
          }
        />
        <CardGrid className="mt-16" items={t.includes.items} />
      </KitSection>

      <KitSection tinted>
        <KitHeading eyebrow={isEl ? 'Κοινό' : 'Audience'} title={<AccentTitle text={t.audience.title} />} description={t.audience.intro} />
        <CardGrid className="mt-12" cols={2} items={t.audience.items} />
        <div className="reveal mt-10 rounded-2xl border border-dashed border-hairline p-6 sm:p-7">
          <h3 className="font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{t.notForYou.title}</h3>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {t.notForYou.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-muted-foreground">
                <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/8 [&_svg]:size-3">
                  <X strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </KitSection>

      <KitSection id="process">
        <KitHeading eyebrow={isEl ? 'Διαδικασία' : 'Process'} title={<AccentTitle text={t.process.title} />} description={t.process.intro} />
        <ProcessGrid className="mt-12" steps={t.process.steps} />
      </KitSection>

      <KitSection tinted id="pricing">
        <KitHeading align="center" eyebrow={isEl ? 'Τιμές' : 'Pricing'} title={<AccentTitle text={t.pricing.title} />} description={t.pricing.intro} />
        <PriceTiers kind="seo" locale={locale} className="mt-12" />
        <ul className="mt-6 grid gap-3 md:grid-cols-3">
          {seoPackages.map((tier) => {
            const includesGeo = GEO_PACKAGE_IDS.has(tier.id);
            return (
              <li
                key={tier.id}
                className={cn(
                  'flex items-start gap-2 rounded-xl border px-4 py-3 text-[13px] leading-snug',
                  includesGeo ? 'border-brand/30 bg-brand/5 text-foreground/90' : 'border-hairline text-muted-foreground',
                )}
              >
                {includesGeo ? <Bot className="mt-0.5 size-3.5 shrink-0 text-brand" aria-hidden /> : <X className="mt-0.5 size-3.5 shrink-0" aria-hidden />}
                <span>
                  <b className="font-semibold text-foreground">{tier.name}:</b>{' '}
                  {includesGeo
                    ? isEl
                      ? 'Περιλαμβάνει αφιερωμένη εργασία AEO και GEO.'
                      : 'Includes dedicated AEO and GEO work.'
                    : isEl
                      ? 'Δεν περιλαμβάνει ξεχωριστό πρόγραμμα GEO.'
                      : 'Does not include a separate GEO programme.'}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[14px] text-muted-foreground">
          {t.pricing.note.replace('6', String(SEO_MIN_TERM_MONTHS))}
        </p>
        <p className="mt-4 text-center text-[14px]">
          <Link href={lp('/pricing')} className="font-medium text-link underline-offset-4 hover:underline">
            {t.pricing.cta}
          </Link>
        </p>
      </KitSection>

      <DiyRow
        locale={locale}
        source="service-ai-visibility"
        body={tx(
          'GSC Boost tracks whether ChatGPT, Gemini, Perplexity and Google’s AI mention you, next to your Search Console clicks. It is the same software our team uses for this service.',
          'Το GSC Boost μετρά αν σας αναφέρουν το ChatGPT, το Gemini, το Perplexity και η AI της Google, δίπλα στα κλικ του Search Console. Είναι το ίδιο λογισμικό που χρησιμοποιεί η ομάδα μας σε αυτή την υπηρεσία.',
        )}
        preview={<AiVisibilityPreview locale={locale} />}
      />

      {proof.length > 0 ? (
        <KitSection>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <KitHeading eyebrow={isEl ? 'Έργα' : 'Work'} title={<AccentTitle text={t.proof.title} />} description={t.proof.intro} />
          </div>
          <ProofGrid className="mt-12" projects={proof} locale={locale} />
          <p className="mx-auto mt-8 max-w-2xl text-center text-[14px] text-muted-foreground">{t.proof.caveat}</p>
        </KitSection>
      ) : null}

      <FaqBlock locale={locale} tinted title={<AccentTitle text={t.faqTitle} />} faqs={faqs} />

      <KitSection className="py-14 sm:py-16">
        <RelatedPages title={t.relatedTitle} pages={related.map((r) => ({ slug: lp(r.path), title: r.title }))} />
      </KitSection>

      <CtaBand locale={locale} source="service-ai-visibility" title={<AccentTitle text={t.cta.title} />} description={t.cta.body} />
    </PageShell>
  );
}
