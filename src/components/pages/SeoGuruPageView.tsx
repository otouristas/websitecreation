import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Compass, Search, UserRound, Wallet, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { Accent, Container, CtaBand, KitHeading, KitSection } from '@/components/kit';
import { CardGrid, InfoCard, PageHero, RelatedLinks, SplitRow, StatRow, accentTail } from '@/components/page-kit';
import { FaqBlock, ProofGrid } from '@/components/service-kit';
import { getSeoGuruCopy } from '@/data/seo-guru-page';
import { FOUNDER, FOUNDER_SCHEMA_ID, consultantPath, consultantUrl } from '@/data/founder';
import { portfolioProjects } from '@/data/portfolio';
import { resolvePriceTokens } from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { getHreflangAlternates } from '@/lib/locale-paths';
import { buildMetadata } from '@/lib/seo';
import { BASE_URL, combineSchemas, generateBreadcrumbSchema, generateFAQSchema, generatePersonSchema } from '@/lib/seo/schema';
import { generateBreadcrumbs } from '@/lib/linking';
import { withExactTitle } from '@/app/[locale]/services/_lib/exact-title';

/**
 * Dedicated page for the query "seo guru".
 * English: /en/seo-guru. Greek: /el/seo-guru. Same slug, paired by hreflang.
 * Unprefixed /seo-guru is sent to the locale URL by the existing middleware.
 */

/** Live work already published on /work. Homepage screenshots, not result charts. */
const PROOF_SLUGS = ['onoma-hotel', 'aggelos-rentals', 'way-to-crete', 'kipos-hotel', 'cyclades-rentacar', 'opticore-store'];

const PAGE_PATH = '/seo-guru';

export function seoGuruPath(locale: SiteLocale): string {
  return localizedPath(locale, PAGE_PATH);
}

export function seoGuruMetadata(locale: SiteLocale): Metadata {
  const t = getSeoGuruCopy(locale);
  const metadata = buildMetadata({
    title: t.metaTitle,
    description: t.metaDescription,
    path: seoGuruPath(locale),
    primaryKeyword: t.primaryKeyword,
    languages: getHreflangAlternates(PAGE_PATH),
  });
  return withExactTitle(metadata, t.metaTitle);
}

export function SeoGuruPageView({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);
  const rp = (text: string) => resolvePriceTokens(text, locale);
  const t = getSeoGuruCopy(locale);
  const self = seoGuruPath(locale);

  const breadcrumbs = generateBreadcrumbs([{ name: t.crumb, url: self }], locale);
  const faqs = t.faqs.map((f) => ({ question: f.question, answer: rp(f.answer) }));

  const schemas = combineSchemas(
    generateBreadcrumbSchema({ items: breadcrumbs }),
    generatePersonSchema({
      id: FOUNDER_SCHEMA_ID,
      name: FOUNDER.name,
      alternateName: FOUNDER.nameEl,
      url: consultantUrl(locale),
      jobTitle: isEl ? FOUNDER.jobTitleEl : FOUNDER.jobTitle,
      description: t.personDescription,
      address: { addressLocality: FOUNDER.city, addressCountry: FOUNDER.country },
      worksFor: { name: 'AnotherSEOGuru', url: BASE_URL },
      knowsAbout: ['Search engine optimization', 'Technical SEO', 'Local SEO', 'Hotel SEO', 'E-commerce SEO'],
    }),
    generateFAQSchema({ faqs }),
  );

  const proof = PROOF_SLUGS.map((slug) => portfolioProjects.find((p) => p.slug === slug && !p.liveStatus)).filter(
    (p): p is (typeof portfolioProjects)[number] => Boolean(p),
  );

  const related = [
    { href: consultantPath(locale), title: isEl ? 'Σύμβουλος SEO' : 'SEO consultant' },
    { href: lp('/about'), title: isEl ? 'Ποιοι είμαστε' : 'About AnotherSEOGuru' },
    { href: lp('/seo-services'), title: isEl ? 'Υπηρεσίες SEO' : 'SEO services' },
    { href: lp('/pricing'), title: isEl ? 'Τιμές και πακέτα' : 'Pricing and packages' },
    { href: lp('/work'), title: isEl ? 'Έργα' : 'Our work' },
    { href: lp('/contact'), title: isEl ? 'Επικοινωνία' : 'Contact' },
  ];

  const methodIcons = [Search, Compass, Wrench];

  return (
    <>
      <SchemaMarkup schemas={schemas} />
      <Header locale={locale} alternateHref={seoGuruPath(isEl ? 'en' : 'el')} />
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
            eyebrow={t.who.eyebrow}
            eyebrowIcon={<UserRound />}
            title={accentTail(t.who.title, 2)}
            body={<p>{t.who.body}</p>}
            bullets={t.who.bullets}
            preview={
              <div className="rounded-2xl border border-dashed border-hairline bg-surface/70 p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.who.visualCaption}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{t.who.previewBody}</p>
              </div>
            }
          />
        </KitSection>

        <KitSection tinted id="method">
          <KitHeading eyebrow={t.method.eyebrow} title={accentTail(t.method.title, 2)} description={t.method.intro} />
          <CardGrid className="mt-12">
            {t.method.cards.map((card, i) => {
              const Icon = methodIcons[i] ?? Compass;
              return <InfoCard key={card.title} icon={<Icon />} eyebrow={card.eyebrow} title={card.title} text={card.text} />;
            })}
          </CardGrid>
        </KitSection>

        <KitSection id="work">
          <KitHeading eyebrow={t.results.eyebrow} title={accentTail(t.results.title, 1)} description={t.results.intro} />
          {proof.length > 0 ? <ProofGrid className="mt-12" projects={proof} locale={locale} /> : null}
          <p className="mt-8 text-[14px]">
            <Link href={lp('/work')} className="inline-flex items-center gap-1.5 font-medium text-link underline-offset-4 hover:underline">
              {t.results.all}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
          <aside
            aria-label={t.results.placeholderKicker}
            className="mt-10 rounded-2xl border border-dashed border-hairline bg-surface/50 p-6 sm:p-8"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{t.results.placeholderKicker}</p>
            <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{t.results.placeholderTitle}</h3>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{t.results.placeholderBody}</p>
            <div className="mt-6 grid aspect-[16/7] place-items-center rounded-xl border border-dashed border-hairline bg-background/60 px-6 text-center text-[14px] text-muted-foreground">
              {t.results.placeholderFrame}
            </div>
          </aside>
        </KitSection>

        <KitSection tinted id="services">
          <KitHeading eyebrow={t.services.eyebrow} title={accentTail(t.services.title, 2)} description={t.services.intro} />
          <CardGrid className="mt-12">
            {t.services.cards.map((card) => (
              <InfoCard key={card.title} eyebrow={card.eyebrow} title={card.title} text={card.text}>
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
            ))}
          </CardGrid>
        </KitSection>

        <KitSection id="pricing">
          <KitHeading
            align="center"
            eyebrow={t.pricing.eyebrow}
            eyebrowIcon={<Wallet />}
            title={accentTail(t.pricing.title, 1)}
            description={t.pricing.intro}
          />
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

        <CtaBand locale={locale} source="seo-guru" title={accentTail(t.cta.title, 2)} description={t.cta.body} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
