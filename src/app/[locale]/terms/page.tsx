import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';
import { getLegalDictionary } from '@/lib/i18n/get-dictionary';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { notFound } from 'next/navigation';
import { Container } from '@/components/kit';
import { KitProse } from '@/components/page-kit';

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
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <Container className="hero-below-header max-w-3xl pb-24">
          <h1 className="font-display text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[48px]">
            {t.terms.title}
          </h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.12em] text-muted-foreground">{t.terms.lastUpdated}</p>
          <KitProse className="mt-10 border-t border-hairline pt-4 text-muted-foreground">
            {t.terms.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </KitProse>
        </Container>
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
