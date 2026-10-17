import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TermsDocument } from '@/components/legal/TermsDocument';
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
  const siteLocale = locale as SiteLocale;
  const t = getLegalDictionary(siteLocale);

  return (
    <>
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0">
        <TermsDocument locale={siteLocale} terms={t.terms} />
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
