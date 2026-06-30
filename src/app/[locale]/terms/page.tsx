import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';
import { getLegalDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { notFound } from 'next/navigation';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = getLegalDictionary(locale as SiteLocale);
  return buildMetadata({
    title: t.terms.title,
    description: t.terms.metaDescription,
    path: localizedPath(locale as SiteLocale, '/terms'),
    hreflangPath: '/terms',
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const t = getLegalDictionary(locale as SiteLocale);

  return (
    <>
      <Header />
      <main className="main-below-header pb-20">
        <div className="container max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">{t.terms.title}</h1>
          <div className="prose prose-lg text-gray-700">
            <p className="mb-4">{t.terms.lastUpdated}</p>
            {t.terms.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="mb-4 mt-8 text-2xl font-bold">{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
