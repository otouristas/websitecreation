import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HowItWorksView } from '@/components/how-it-works/HowItWorksView';
import { HOW_IT_WORKS_EN_PATH, howItWorksMeta, howLanguageAlternates } from '@/data/how-it-works';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../services/_lib/exact-title';

export const revalidate = 3600;

/** English how-it-works page. Greek visitors stay on /el/pos-leitourgei. */
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return {};
  const meta = howItWorksMeta(HOW_IT_WORKS_EN_PATH);
  const metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: HOW_IT_WORKS_EN_PATH,
    languages: howLanguageAlternates(),
  });
  return withExactTitle(metadata, meta.title);
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  return <HowItWorksView locale="en" />;
}
