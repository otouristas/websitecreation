import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Briefcase, Compass, Scale, UserRound, Wallet } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Accent, AuditPreview, CheckList, Container, CtaBand, KitHeading, KitSection, Stage } from '@/components/kit';
import { CardGrid, InfoCard, PageHero, RelatedLinks, SplitRow, StatRow, accentTail } from '@/components/page-kit';
import { FaqBlock, ProofGrid } from '@/components/service-kit';
import { renderInlineLinks } from '@/components/services/topic-sections';
import { getConsultantCopy } from '@/data/consultant-page';
import { FOUNDER, FOUNDER_SCHEMA_ID, consultantPath, consultantUrl } from '@/data/founder';
import { portfolioProjects } from '@/data/portfolio';
import { resolvePriceTokens } from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildHreflangMapFromPaths } from '@/lib/locale-paths';
import { buildMetadata } from '@/lib/seo';
import {
  BASE_URL,
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePersonSchema,
} from '@/lib/seo/schema';
import { generateBreadcrumbs } from '@/lib/linking';
import { withExactTitle } from '@/app/[locale]/services/_lib/exact-title';

/**
 * Founder / SEO-consultant page, served at /el/symvoulos-seo and
 * /en/seo-consultant (different slug per locale, paired by hreflang).
 * Doubles as the author entity: the Person node here carries the same @id
 * as Organization.founder in the site-wide graph.
 */

/** Live work across the verticals the copy names (hotel, rent-a-car, tours, e-shop). */
const PROOF_SLUGS = ['onoma-hotel', 'aggelos-rentals', 'way-to-crete', 'kipos-hotel', 'cyclades-rentacar', 'opticore-store'];

export function consultantMetadata(locale: SiteLocale): Metadata {
  const t = getConsultantCopy(locale);
  const metadata = buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: consultantPath(locale),
    primaryKeyword: t.primaryKeyword,
    languages: buildHreflangMapFromPaths({ en: consultantPath('en'), el: consultantPath('el') }),
  });
  // The map's title already carries the name and stays under 60 characters,
  // so it ships verbatim instead of being capped and branded.
  return withExactTitle(metadata, t.metaTitle);
}

export function ConsultantPageView({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const rp = (text: string) => resolvePriceTokens(text, locale);
  const t = getConsultantCopy(locale);
  const self = consultantPath(locale);

  const breadcrumbs = generateBreadcrumbs([{ name: t.crumb, url: self }], locale);
  const faqs = t.faqs.map((f) => ({ question: f.question, answer: rp(f.answer) }));

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generatePersonSchema({
      id: FOUNDER_SCHEMA_ID,
      name: FOUNDER.name,
      alternateName: FOUNDER.nameEl,
      url: consultantUrl(locale),
      jobTitle: FOUNDER.jobTitle,
      description: t.personDescription,
      address: { addressLocality: FOUNDER.city, addressCountry: FOUNDER.country },
      worksFor: { name: 'AnotherSEOGuru', url: BASE_URL },
      knowsAbout: ['Search engine optimization', 'Technical SEO', 'Local SEO', 'Hotel SEO', 'E-commerce SEO', 'Generative AI search visibility'],
    }),
    generateFAQSchema({ faqs }),
  );

  const proof = PROOF_SLUGS.map((slug) => portfolioProjects.find((p) => p.slug === slug && !p.liveStatus)).filter(
    (p): p is (typeof portfolioProjects)[number] => Boolean(p),
  );

  const related = [
    { href: lp('/about'), title: isEl ? 'Ποιοι είμαστε' : 'About AnotherSEOGuru' },
    { href: lp('/seo-services'), title: isEl ? 'Υπηρεσίες SEO' : 'SEO services' },
    { href: lp('/services/seo-audits'), title: isEl ? 'SEO audit' : 'SEO audit' },
    { href: lp('/pricing'), title: isEl ? 'Τιμές και πακέτα' : 'Pricing and packages' },
    { href: lp('/work'), title: isEl ? 'Έργα' : 'Our work' },
    isEl
      ? { href: lp('/blog/pos-na-epilexete-etaireia-seo'), title: 'Πώς να επιλέξετε εταιρεία SEO' }
      : { href: lp('/blog/how-much-does-seo-cost'), title: 'How much SEO costs' },
  ];

  const modeIcons = [Compass, Scale, Briefcase];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} alternateHref={consultantPath(isEl ? 'en' : 'el')} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale}
          breadcrumbs={breadcrumbs}
          pill={{ href: `${lp('/get-started')}#free-audit`, kind: 'free', tag: t.pillTag, text: t.pill }}
          title={
            <>
              {t.h1.before} <Accent>{t.h1.accent}</Accent> {t.h1.after}
            </>
          }
          lead={t.lead}
          meta={<p className="mx-auto max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">{t.leadExtra}</p>}
        >
          <Container className="mt-14">
            <StatRow items={t.stats} />
          </Container>
        </PageHero>

        <KitSection>
          <SplitRow
            eyebrow={t.role.eyebrow}
            eyebrowIcon={<UserRound />}
            title={accentTail(t.role.title, 2)}
            body={<p>{t.role.body}</p>}
            bullets={t.role.bullets}
            preview={
              <figure>
                <Stage>
                  <AuditPreview locale={locale} />
                </Stage>
                <figcaption className="mt-3 text-center text-[13px] text-muted-foreground">{t.visualCaption}</figcaption>
              </figure>
            }
          />
        </KitSection>

        <KitSection tinted id="cooperation">
          <KitHeading eyebrow={t.modes.eyebrow} title={accentTail(t.modes.title, 2)} description={t.modes.intro} />
          <CardGrid className="mt-12">
            {t.modes.cards.map((card, i) => {
              const Icon = modeIcons[i] ?? Compass;
              return (
                <InfoCard key={card.title} icon={<Icon />} eyebrow={card.eyebrow} title={card.title} text={card.text}>
                  {card.link ? (
                    <Link
                      href={lp(card.link.href)}
                      className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-link underline-offset-4 hover:underline"
                    >
                      {card.link.label}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  ) : null}
                </InfoCard>
              );
            })}
          </CardGrid>
        </KitSection>

        <KitSection id="experience">
          <KitHeading eyebrow={t.experience.eyebrow} title={accentTail(t.experience.title, 1)} description={t.experience.intro} />
          {proof.length > 0 ? <ProofGrid className="mt-12" projects={proof} locale={locale} /> : null}
          <p className="mt-8 text-[14px]">
            <Link href={lp('/work')} className="inline-flex items-center gap-1.5 font-medium text-link underline-offset-4 hover:underline">
              {t.experience.all}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </KitSection>

        <KitSection tinted id="consultant-or-company">
          <KitHeading
            eyebrow={t.versus.eyebrow}
            title={accentTail(t.versus.title, 2)}
            description={renderInlineLinks(t.versus.body, locale)}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <InfoCard as="h3" title={t.versus.consultantTitle}>
              <CheckList items={t.versus.consultantItems} className="mt-4" />
            </InfoCard>
            <InfoCard as="h3" title={t.versus.companyTitle}>
              <CheckList items={t.versus.companyItems} className="mt-4" />
            </InfoCard>
          </div>
        </KitSection>

        <KitSection id="pricing">
          <KitHeading align="center" eyebrow={t.pricing.eyebrow} eyebrowIcon={<Wallet />} title={accentTail(t.pricing.title, 1)} description={t.pricing.intro} />
          <CardGrid className="mt-12">
            {t.pricing.cards.map((card) => (
              <InfoCard key={card.eyebrow} eyebrow={card.eyebrow} title={rp(card.title)} text={rp(card.text)} />
            ))}
          </CardGrid>
          <p className="mt-8 text-center text-[14px]">
            <Link href={lp('/pricing')} className="inline-flex items-center gap-1.5 font-medium text-link underline-offset-4 hover:underline">
              {t.pricing.all}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </KitSection>

        <FaqBlock locale={locale} tinted title={accentTail(t.faqTitle, 2)} faqs={faqs} />

        <KitSection className="py-14 sm:py-16">
          <RelatedLinks title={t.relatedTitle} items={related} />
        </KitSection>

        <CtaBand locale={locale} source="seo-consultant" title={accentTail(t.cta.title, 2)} description={t.cta.body} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
