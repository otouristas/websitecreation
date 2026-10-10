import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { ConsultantPageView, consultantMetadata } from '@/components/pages/ConsultantPageView';
import { consultantPath } from '@/data/founder';
import { isValidLocale } from '@/lib/i18n/locale';

type PageProps = { params: Promise<{ locale: string }> };

/**
 * The SEO-consultant page under its Greek slug. The other locale's
 * version lives at /en/seo-consultant; a request for this slug under that
 * locale is redirected there.
 */
export function generateStaticParams() {
  return [{ locale: 'el' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'el') return {};
  return consultantMetadata('el');
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  if (locale !== 'el') permanentRedirect(consultantPath(locale));
  return <ConsultantPageView locale="el" />;
}
