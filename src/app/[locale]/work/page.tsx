import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WorkIndexClient } from '@/components/work/WorkIndexClient';
import { buildMetadata, generateCollectionPageSchema } from '@/lib/seo';
import { BASE_URL } from '@/lib/seo/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { PROJECT_COUNT } from '@/data/company-facts';
import { portfolioProjects } from '@/data/portfolio';
import { generateBreadcrumbs } from '@/lib/linking';
import { CtaBand, KitSection } from '@/components/kit';
import { PageHero, accentTail } from '@/components/page-kit';

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

  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  // The index rendered 71 case studies and emitted nothing. Every entry is a
  // CreativeWork - one type across the whole list, which is what makes it
  // readable as a set rather than as 71 unrelated links.
  const collectionSchema = generateCollectionPageSchema({
    name: locale === 'el' ? 'Έργα & Portfolio' : 'Portfolio',
    url: `${BASE_URL}${lp('/work')}`,
    inLanguage: locale,
    items: portfolioProjects.map((project) => ({
      url: `${BASE_URL}${lp(`/work/${project.slug}`)}`,
      name: project.name,
      itemType: 'CreativeWork',
    })),
  });
  
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

  const tx = (en: string, el: string) => (isEl ? el : en);
  const breadcrumbs = generateBreadcrumbs([{ name: isEl ? 'Έργα' : 'Work', url: '/work' }], locale as SiteLocale);

  return (
    <>
      <SchemaMarkup schemas={[collectionSchema]} />
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <PageHero
          locale={locale as SiteLocale}
          breadcrumbs={breadcrumbs}
          pill={{
            href: lp('/solutions/hotels'),
            kind: 'live',
            tag: tx('Live', 'Live'),
            text: tx(`${PROJECT_COUNT} sites you can open today`, `${PROJECT_COUNT} ιστοσελίδες που ανοίγουν σήμερα`),
          }}
          title={accentTail(t.h1, isEl ? 2 : 1)}
          lead={t.desc}
        />
        <KitSection className="!pt-12">
          <WorkIndexClient locale={locale as SiteLocale} />
        </KitSection>
        <CtaBand locale={locale as SiteLocale} source="work-band" />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
