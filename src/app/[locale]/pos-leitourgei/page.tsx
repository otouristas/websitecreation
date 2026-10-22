import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HowItWorksView } from '@/components/how-it-works/HowItWorksView';
import { HOW_IT_WORKS_EL_PATH, howItWorksMeta, howLanguageAlternates } from '@/data/how-it-works';
import { buildMetadata } from '@/lib/seo';
import { withExactTitle } from '../services/_lib/exact-title';

export const revalidate = 3600;

/** Greek how-it-works page. English visitors stay on /en/how-it-works. */
export function generateStaticParams() {
  return [{ locale: 'el' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'el') return {};
  const meta = howItWorksMeta(HOW_IT_WORKS_EL_PATH);
  const metadata = buildMetadata({
    title: meta.title,
    description: meta.description,
    path: HOW_IT_WORKS_EL_PATH,
    languages: howLanguageAlternates(),
  });
  return withExactTitle(metadata, meta.title);
}

export default async function PosLeitourgeiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'el') notFound();
  return <HowItWorksView locale="el" />;
}
