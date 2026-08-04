import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import { WorkDetail, getWorkProject, getWorkStaticParams } from '@/components/work/WorkDetail';
import { buildMetadata } from '@/lib/seo';
import { portfolioProjects } from '@/data/portfolio';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';

export function generateStaticParams() {
  return getWorkStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};
  const project = getWorkProject(slug);
  if (!project) return {};
  const isEl = locale === 'el';
  const caseStudyLabel = isEl ? 'Μελέτη περίπτωσης' : 'Case Study';
  const title =
    (isEl ? project.seoTitleEl : project.seoTitle) ||
    `${project.name} - ${caseStudyLabel}`;
  const description =
    (isEl ? project.seoDescriptionEl : project.seoDescription) ||
    (isEl && project.summaryEl ? project.summaryEl : project.summary);
  return buildMetadata({
    title,
    description,
    path: localizedPath(locale as SiteLocale, `/work/${slug}`),
    hreflangPath: `/work/${slug}`,
    primaryKeyword: `${project.name} ${isEl ? 'ιστοσελίδα' : 'website'}`,
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const project = getWorkProject(slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="main-below-header">
        <WorkDetail project={project} locale={locale as SiteLocale} />
      </main>
      <StickyMobileCta />
      <Footer />
    </>
  );
}

void portfolioProjects;
