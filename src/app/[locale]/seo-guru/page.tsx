import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeoGuruPageView, seoGuruMetadata } from '@/components/pages/SeoGuruPageView';
import { isValidLocale } from '@/lib/i18n/locale';

type PageProps = { params: Promise<{ locale: string }> };

/**
 * /en/seo-guru and /el/seo-guru. The slug is the same in both locales because
 * the query is the Latin phrase "seo guru".
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return seoGuruMetadata(locale);
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <SeoGuruPageView locale={locale} />;
}
