import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Container } from '@/components/kit';
import { buildMetadata } from '@/lib/seo';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === 'el';
  return buildMetadata({
    title: isEl ? 'Όροι προσφοράς κατασκευής (προσχέδιο)' : 'Website offer terms (draft)',
    description: isEl
      ? 'Προσχέδιο όρων για την έκπτωση κατασκευής και το SEO Launch. Χρειάζεται νομικό έλεγχο και δεν είναι από μόνο του η δεσμευτική σύμβαση.'
      : 'Draft terms for the build discount and SEO Launch. They require legal review and are not, by themselves, the binding contract.',
    path: localizedPath(locale as SiteLocale, '/offer-terms'),
    hreflangPath: '/offer-terms',
  });
}

export default async function OfferTermsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const siteLocale = locale as SiteLocale;
  const file = path.join(process.cwd(), 'docs', 'commercial', `terms-draft.${siteLocale}.md`);
  const markdown = fs.readFileSync(file, 'utf8');

  return (
    <>
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <Container className="hero-below-header max-w-3xl pb-24">
          <p className="rounded-xl border border-warning/40 bg-warning/10 px-4 py-3 text-[14px] leading-relaxed text-foreground">
            {siteLocale === 'el'
              ? 'Requires legal review. Προσχέδιο για ανάγνωση. Η δεσμευτική έκδοση είναι αυτή που συνοδεύει την αποδεκτή προσφορά.'
              : 'Requires legal review. This is a reading draft. The binding version is the one attached to the accepted quote.'}
          </p>
          <article className="prose-commercial mt-8 space-y-4 text-[15px] leading-relaxed text-muted-foreground [&_h1]:font-display [&_h1]:text-[34px] [&_h1]:font-semibold [&_h1]:leading-tight [&_h1]:text-foreground [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-semibold [&_h2]:text-foreground [&_strong]:text-foreground">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </article>
        </Container>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
