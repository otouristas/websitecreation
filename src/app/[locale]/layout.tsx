import { notFound } from 'next/navigation';
import { isValidLocale, type SiteLocale } from '@/lib/i18n/locale';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'el' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <div lang={locale as SiteLocale} data-locale={locale}>
      {children}
    </div>
  );
}
