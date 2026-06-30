import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import { WorkIndexClient } from '@/components/work/WorkIndexClient';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: 'Έργα & Portfolio - Τουρισμός, Ξενοδοχεία & Rent-a-Car',
      description:
        '55+ live ιστοσελίδες για ξενοδοχεία, rent-a-car, εκδρομές, βίλες και travel AI. Δείτε το portfolio μας με SEO βελτιστοποιημένα έργα σε Ελλάδα και Ευρώπη.',
      path: localizedPath('el', '/work'),
      primaryKeyword: 'τουριστικές ιστοσελίδες portfolio',
      hreflangPath: '/work',
    });
  }

  return buildMetadata({
    title: 'Portfolio - Tourism, Hotels & Rent-a-car',
    description:
      '55+ live websites for hotels, rent-a-car, tours, villas and travel AI. Browse our portfolio of SEO-optimized tourism projects across Greece, UK, US, Canada and Europe.',
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
        desc: 'Live websites we designed, built and optimized for tourism, hospitality, rent-a-car and travel AI - across Greece, UK, US, Canada and Europe.',
      };

  return (
    <>
      <Header locale={locale as SiteLocale} />
      <main className="main-below-header">
        <section className="section gradient-hero">
          <div className="container max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">{t.h1}</h1>
            <p className="text-lg text-muted-foreground">{t.desc}</p>
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
