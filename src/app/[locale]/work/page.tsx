import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WorkIndexClient } from '@/components/work/WorkIndexClient';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { PROJECT_COUNT, MARKET_COUNT } from '@/data/company-facts';
import { portfolioProjects } from '@/data/portfolio';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { StatCallout, LastUpdated } from '@/components/ai-search';
import { buildPageGraph, type AiPageContract, type OriginalDatum } from '@/lib/ai-search';
import { AUTHORS } from '@/data/authors';
import { GENERATED_CONTENT_PUBLISHED, GENERATED_CONTENT_UPDATED } from '@/lib/seo/content-dates';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: 'Έργα & Portfolio - Τουρισμός, Ξενοδοχεία & Ενοικίαση Αυτοκινήτου',
      description:
        `${PROJECT_COUNT} ζωντανές ιστοσελίδες για ξενοδοχεία, ενοικίαση αυτοκινήτου, εκδρομές, βίλες και travel AI. Δείτε το portfolio μας με SEO βελτιστοποιημένα έργα σε Ελλάδα και Ευρώπη.`,
      path: localizedPath('el', '/work'),
      primaryKeyword: 'τουριστικές ιστοσελίδες portfolio',
      hreflangPath: '/work',
    });
  }

  return buildMetadata({
    title: 'Portfolio - Tourism, Hotels & Rent-a-car',
    description:
      `${PROJECT_COUNT} live websites for hotels, rent-a-car, tours, villas and travel AI. Browse our portfolio of SEO-optimized tourism projects across Greece, the UK, the US and Europe.`,
    path: localizedPath('en', '/work'),
    primaryKeyword: 'tourism website portfolio',
    hreflangPath: '/work',
  });
}

export default async function WorkPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  
  const isEl = locale === 'el';

  const t = isEl
    ? {
        h1: 'Τα έργα μας',
        desc: 'Ιστοσελίδες που σχεδιάσαμε, αναπτύξαμε και βελτιστοποιήσαμε για τουρισμό, ξενοδοχεία, ενοικιάσεις αυτοκινήτων και travel AI - στην Ελλάδα και διεθνώς.',
      }
    : {
        h1: 'Our work',
        desc: 'Live websites we designed, built and optimized for tourism, hospitality, rent-a-car and travel AI - across Greece, the UK, the US and Europe.',
      };

  /**
   * The one figure on this site that is genuinely original and genuinely
   * checkable: it is `portfolioProjects.length`, every entry links to the live
   * site, and the method says so. The audit's most common failure sitewide was
   * "no figure a model could cite", and the answer to that is not to invent a
   * benchmark - it is to publish what the repo can already prove, with the
   * method attached, and mark it up as a Dataset.
   */
  const industryCount = new Set(portfolioProjects.map((p) => p.category)).size;
  const datum: OriginalDatum = {
    value: String(PROJECT_COUNT),
    claim: isEl
      ? `ζωντανά έργα πελατών στο portfolio, σε ${industryCount} κατηγορίες και ${MARKET_COUNT} αγορές.`
      : `live client projects in this portfolio, across ${industryCount} categories and ${MARKET_COUNT} markets.`,
    method: isEl
      ? 'Μετρημένα από τις εγγραφές έργων αυτού του site. Κάθε εγγραφή συνδέεται με τη ζωντανή ιστοσελίδα, όπου αυτή λειτουργεί.'
      : 'Counted from this site\'s own project records. Every entry links to the live site where one is still serving.',
    measuredAt: GENERATED_CONTENT_UPDATED,
  };

  const contract: AiPageContract = {
    url: `https://anotherseoguru.com${localizedPath(locale as SiteLocale, '/work')}`,
    headline: t.h1,
    description: t.desc,
    locale: locale as SiteLocale,
    datePublished: GENERATED_CONTENT_PUBLISHED,
    dateModified: GENERATED_CONTENT_UPDATED,
    author: AUTHORS['editorial-team'],
    publisher: { name: 'AnotherSEOGuru', url: 'https://anotherseoguru.com' },
    breadcrumbs: [
      { name: isEl ? 'Αρχική' : 'Home', url: localizedPath(locale as SiteLocale, '/') },
      { name: t.h1, url: localizedPath(locale as SiteLocale, '/work') },
    ],
    data: [datum],
    schemaType: 'WebPage',
  };

  return (
    <>
      <SchemaMarkup schemas={[buildPageGraph(contract, { siteUrl: 'https://anotherseoguru.com' })]} />
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0 main-below-header">
        <section className="section ">
          <div className="container max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{t.h1}</h1>
            <p className="text-lg text-muted-foreground">{t.desc}</p>
            <StatCallout datum={datum} className="mt-8" />
            <p className="mt-4 text-sm text-muted-foreground">
              <LastUpdated
                date={GENERATED_CONTENT_UPDATED}
                published={GENERATED_CONTENT_PUBLISHED}
                locale={locale as SiteLocale}
              />
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <WorkIndexClient locale={locale as SiteLocale} />
          </div>
        </section>
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
