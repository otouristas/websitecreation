import Link from 'next/link';
import { PageShell, ShellCrumbs } from '@/components/bespoke/PageShell';
import {
  Section,
  SectionHeading,
  Bloom,
  PrimaryButtonLink,
  GhostButtonLink,
  Tick,
} from '@/components/landing/primitives';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import FAQSection from '@/components/seo/FAQSection';
import RelatedPages from '@/components/seo/RelatedPages';
import { getAiVisibilityPillarCopy } from '@/data/ai-visibility-pillar';
import { currentPrice, formatPrice, resolvePriceTokens, seoPackages } from '@/data/pricing';
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

  return (
    <PageShell locale={locale} signatureHue={SIGNATURE_HUE} schemas={schemas}>
      <section className="relative overflow-hidden border-b border-hairline">
        <Bloom signature className="left-1/2 top-[-12rem] h-[30rem] w-[56rem] -translate-x-1/2" />
        <div className="main-below-header relative mx-auto max-w-3xl px-6 pb-16 pt-6">
          <ShellCrumbs items={breadcrumbs} />
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-signature">
            {t.eyebrow}
          </span>
          <h1 className="mt-3 font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl">
            {t.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{rp(t.answer)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButtonLink href={lp('/get-started?service=ai-visibility')}>
              {t.cta.primary}
            </PrimaryButtonLink>
            <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow={isEl ? 'Πλαίσιο' : 'Context'}
          title={t.problem.title}
          body={t.problem.intro}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {t.problem.items.map((item) => (
            <div key={item.title} className="rounded-[14px] border border-hairline bg-surface p-6">
              <h3 className="font-display text-lg font-medium text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow={isEl ? 'Ορισμοί' : 'Definitions'}
          title={t.definitions.title}
          body={t.definitions.intro}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {t.definitions.items.map((item) => (
            <div key={item.title} className="rounded-[14px] border border-hairline bg-surface p-6">
              <h3 className="font-display text-lg font-medium text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow={isEl ? 'Παραδοτέα' : 'Deliverables'}
          title={t.includes.title}
          body={t.includes.intro}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {t.includes.items.map((item) => (
            <div key={item.title} className="rounded-[14px] border border-hairline bg-surface p-6">
              <h3 className="font-display text-lg font-medium text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow={isEl ? 'Κοινό' : 'Audience'}
          title={t.audience.title}
          body={t.audience.intro}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {t.audience.items.map((item) => (
            <div key={item.title} className="rounded-[14px] border border-hairline bg-surface p-6">
              <h3 className="font-display text-lg font-medium text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-2xl rounded-[14px] border border-hairline bg-surface-raised/50 p-6">
          <h3 className="font-display text-lg font-medium text-foreground">{t.notForYou.title}</h3>
          <ul className="mt-4 space-y-3">
            {t.notForYou.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <Tick className="mt-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow={isEl ? 'Διαδικασία' : 'Process'}
          title={t.process.title}
          body={t.process.intro}
        />
        <ol className="mx-auto mt-10 max-w-2xl space-y-6">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-hairline font-display text-sm text-signature">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-hairline">
        <SectionHeading
          eyebrow={isEl ? 'Τιμές' : 'Pricing'}
          title={t.pricing.title}
          body={t.pricing.intro}
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          {seoPackages.map((tier) => {
            const includesGeo = GEO_PACKAGE_IDS.has(tier.id);
            return (
              <div key={tier.id} className="rounded-[14px] border border-hairline bg-surface p-6">
                <div className="font-display text-sm font-medium text-signature">{tier.name}</div>
                <div className="mt-2 font-display text-2xl font-medium text-foreground">
                  €{formatPrice(currentPrice(tier), locale)}
                  <span className="text-sm text-muted-foreground">{isEl ? '/μήνα' : '/mo'}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {isEl ? tier.forEl : tier.forEn}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {includesGeo
                    ? isEl
                      ? 'Περιλαμβάνει αφιερωμένη εργασία AEO και GEO.'
                      : 'Includes dedicated AEO and GEO work.'
                    : isEl
                      ? 'Δεν περιλαμβάνει ξεχωριστό πρόγραμμα GEO.'
                      : 'Does not include a separate GEO programme.'}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
          {t.pricing.note.replace('6', String(SEO_MIN_TERM_MONTHS))}
        </p>
        <div className="mt-8 flex justify-center">
          <GhostButtonLink href={lp('/pricing')}>{t.pricing.cta}</GhostButtonLink>
        </div>
      </Section>

      {proof.length > 0 ? (
        <Section className="border-t border-hairline">
          <SectionHeading
            eyebrow={isEl ? 'Έργα' : 'Work'}
            title={t.proof.title}
            body={t.proof.intro}
          />
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proof.map((project) => (
              <li key={project.slug}>
                <Link
                  href={lp(`/work/${project.slug}`)}
                  className="group block overflow-hidden rounded-[14px] border border-hairline bg-surface transition-colors hover:border-primary/40"
                >
                  <PortfolioThumbnail
                    src={project.screenshot}
                    alt={project.name}
                    className="border-b border-hairline"
                  />
                  <span className="block px-4 py-3">
                    <span className="block font-display text-sm font-medium text-foreground">
                      {project.name}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {isEl && project.summaryEl ? project.summaryEl : project.summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            {t.proof.caveat}
          </p>
        </Section>
      ) : null}

      <Section className="border-t border-hairline">
        <div className="mx-auto max-w-2xl">
          <FAQSection faqs={faqs} title={t.faqTitle} locale={locale} />
        </div>
      </Section>

      <Section className="border-t border-hairline">
        <RelatedPages
          title={t.relatedTitle}
          pages={related.map((r) => ({ slug: lp(r.path), title: r.title }))}
        />
      </Section>

      <Section className="border-t border-hairline">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            {t.cta.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t.cta.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PrimaryButtonLink href={lp('/get-started?service=ai-visibility')}>
              {t.cta.primary}
            </PrimaryButtonLink>
            <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
