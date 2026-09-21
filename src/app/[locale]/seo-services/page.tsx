import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FAQSection from '@/components/seo/FAQSection';
import RelatedPages from '@/components/seo/RelatedPages';
import { PortfolioThumbnail } from '@/components/landing/PortfolioThumbnail';
import {
  Section,
  SectionHeading,
  Bloom,
  PrimaryButtonLink,
  GhostButtonLink,
  Tick,
  ghostBtnClass,
} from '@/components/landing/primitives';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { WHATSAPP_HREF } from '@/lib/contact-info';
import { cn } from '@/lib/cn';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import {
  BASE_URL,
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
} from '@/lib/seo/schema';
import { generateBreadcrumbs } from '@/lib/linking';
import { LastUpdated } from '@/components/ai-search';
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';
import { getSeoServicesPillarCopy } from '@/data/seo-services-pillar';
import { currentPrice, formatPrice, resolvePriceTokens, seoPackages } from '@/data/pricing';
import { PROJECT_COUNT, SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import { portfolioProjects } from '@/data/portfolio';

type PageProps = { params: Promise<{ locale: string }> };

function workHref(slug: string, lp: (path: string) => string): string {
  const project = portfolioProjects.find((p) => p.slug === slug && !p.liveStatus);
  return project ? lp(`/work/${project.slug}`) : lp('/work');
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

/**
 * The SEO-services commercial pillar.
 *
 * Deliberately *not* a new entry in `src/data/services.ts`: that array is the
 * axis of the service x location and industry x service matrices, so adding a
 * slug there would generate ~160 more location URLs and 62 more industry ones,
 * every Greek city among them immediately indexable through
 * `hasLocationContent`, which does not discriminate by service. A pillar with
 * no city variants has no business living on that axis.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getSeoServicesPillarCopy(locale);

  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: localizedPath(locale, '/seo-services'),
    hreflangPath: '/seo-services',
    primaryKeyword: t.primaryKeyword,
  });
}

export default async function SeoServicesPillarPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === 'el';
  const lp = (path: string) => localizedPath(siteLocale, path);
  const t = getSeoServicesPillarCopy(siteLocale);
  const rp = (text: string) => resolvePriceTokens(text, siteLocale);

  const breadcrumbItems = generateBreadcrumbs(
    [{ name: t.eyebrow, url: '/seo-services' }],
    siteLocale,
  );

  const faqs = t.faqs.map((f) => ({ question: f.question, answer: rp(f.answer) }));

  const schemas = combineSchemas(
    {
      '@context': 'https://schema.org' as const,
      '@type': 'WebPage' as const,
      '@id': `${BASE_URL}${localizedPath(siteLocale, '/seo-services')}`,
      name: t.metaTitle,
      description: rp(t.metaDescription),
      inLanguage: siteLocale,
      datePublished: GENERATED_CONTENT_PUBLISHED,
      dateModified: GENERATED_CONTENT_UPDATED,
      isPartOf: { '@id': `${BASE_URL}/#website` },
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateServiceSchema({
      name: t.metaTitle,
      description: rp(t.metaDescription),
      provider: { name: 'AnotherSEOGuru', url: BASE_URL },
      serviceType: 'Search engine optimization',
      areaServed: ['GR'],
    }),
    // FAQPage stays here: these seven questions are written for this page,
    // rendered visibly on it, and are not repeated on any other URL.
    generateFAQSchema({ faqs }),
  );

  // Greek client work, used as evidence of market rather than of outcome:
  // no metric is recorded for any project, so none is claimed.
  const proof = portfolioProjects
    .filter((p) => !p.liveStatus && p.markets.includes('GR'))
    .filter((p) => ['rent-a-car', 'hotel', 'tours'].includes(p.category))
    .slice(0, 6);

  const related = [
    { path: '/services/local-seo', title: isEl ? 'Τοπικό SEO' : 'Local SEO' },
    { path: '/services/seo-audits', title: isEl ? 'SEO audit' : 'SEO audit' },
    { path: '/services/ai-visibility', title: isEl ? 'AI Visibility (GEO/AEO)' : 'AI visibility (GEO/AEO)' },
    { path: '/services/website-creation', title: isEl ? 'Κατασκευή ιστοσελίδων' : 'Website creation' },
    { path: '/pricing', title: isEl ? 'Τιμές και πακέτα' : 'Pricing and packages' },
    {
      path: isEl ? '/blog/poso-kostizei-to-seo' : '/blog/how-much-does-seo-cost',
      title: isEl ? 'Πόσο κοστίζει το SEO' : 'How much SEO costs',
    },
  ];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 main-below-header">
        <section className="relative overflow-hidden border-b border-hairline">
          <Bloom className="left-1/2 top-[-12rem] h-[30rem] w-[56rem] -translate-x-1/2" />
          <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand">
              {t.eyebrow}
            </span>
            <h1 className="mt-3 font-display text-[2.4rem] font-medium leading-[1.05] tracking-[-0.04em] sm:text-5xl">
              {t.h1}
            </h1>
            {/* Answer-first: the whole proposition in one paragraph, directly
                under the H1, so a snippet or an answer engine can lift it. */}
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{rp(t.answer)}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t.answerExtra}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              <LastUpdated
                date={GENERATED_CONTENT_UPDATED}
                published={GENERATED_CONTENT_PUBLISHED}
                locale={siteLocale}
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButtonLink href={lp('/get-started')}>{t.cta.primary}</PrimaryButtonLink>
              <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={ghostBtnClass}
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        </section>

        <Section>
          <SectionHeading eyebrow={isEl ? 'Παραδοτέα' : 'Deliverables'} title={t.includes.title} body={t.includes.intro} />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {t.includes.items.map((item) => {
              const cardClass = cn(
                'rounded-[14px] border border-hairline bg-surface p-6',
                item.href && 'transition-colors hover:border-primary/40',
              );
              const inner = (
                <>
                  <h3 className="font-display text-lg font-medium text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </>
              );
              return item.href ? (
                <Link key={item.title} href={lp(item.href)} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <div key={item.title} className={cardClass}>
                  {inner}
                </div>
              );
            })}
          </div>
        </Section>

        <Section className="border-t border-hairline">
          <SectionHeading eyebrow={isEl ? 'Διαδικασία' : 'Process'} title={t.process.title} body={t.process.intro} />
          <ol className="mx-auto mt-10 max-w-2xl space-y-6">
            {t.process.steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-hairline font-display text-sm text-brand">
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
            eyebrow={t.tourism.eyebrow}
            title={t.tourism.title}
            body={t.tourism.intro}
          />
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {t.tourism.chips.map((chip) => (
              <li key={chip.slug}>
                <Link
                  href={workHref(chip.slug, lp)}
                  className="block h-full rounded-[14px] border border-hairline bg-surface p-6 transition-colors hover:border-primary/40"
                >
                  <span className="block font-display text-sm font-medium text-foreground">
                    {chip.label}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                    {chip.line}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            <Link href={lp('/work')} className="underline-offset-4 hover:underline">
              {PROJECT_COUNT}+ {t.tourism.portfolioLabel}
            </Link>
          </p>
        </Section>

        <Section className="border-t border-hairline">
          <SectionHeading eyebrow={isEl ? 'Τιμές' : 'Pricing'} title={t.pricing.title} body={t.pricing.intro} />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
            {seoPackages.map((tier) => (
              <Link
                key={tier.id}
                href={lp('/pricing')}
                className="rounded-[14px] border border-hairline bg-surface p-6 transition-colors hover:border-primary/40"
              >
                <div className="font-display text-sm font-medium text-brand">{tier.name}</div>
                <div className="mt-2 font-display text-2xl font-medium text-foreground">
                  €{formatPrice(currentPrice(tier), siteLocale)}
                  <span className="text-sm text-muted-foreground">{isEl ? '/μήνα' : '/mo'}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {isEl ? tier.forEl : tier.forEn}
                </p>
              </Link>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            {t.pricing.note.replace('6', String(SEO_MIN_TERM_MONTHS))}
          </p>
          <div className="mt-8 flex justify-center">
            <GhostButtonLink href={lp('/pricing')}>{t.pricing.cta}</GhostButtonLink>
          </div>
        </Section>

        <Section className="border-t border-hairline">
          <SectionHeading eyebrow={isEl ? 'Επιλογή' : 'Choosing'} title={t.choosing.title} body={t.choosing.intro} />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {t.choosing.items.map((item) => (
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

        {proof.length > 0 ? (
          <Section className="border-t border-hairline">
            <SectionHeading eyebrow={isEl ? 'Έργα' : 'Work'} title={t.proof.title} body={t.proof.intro} />
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
                      <span className="block font-display text-sm font-medium text-foreground">{project.name}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                        {isEl && project.summaryEl ? project.summaryEl : project.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">{t.proof.caveat}</p>
          </Section>
        ) : null}

        <Section className="border-t border-hairline">
          <div className="mx-auto max-w-2xl">
            <FAQSection faqs={faqs} title={t.faqTitle} locale={siteLocale} />
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
            <h2 className="font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{t.cta.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.cta.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PrimaryButtonLink href={lp('/get-started')}>{t.cta.primary}</PrimaryButtonLink>
              <GhostButtonLink href={lp('/pricing')}>{t.cta.secondary}</GhostButtonLink>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className={ghostBtnClass}
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                {t.cta.whatsapp}
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
