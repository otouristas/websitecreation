import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { WorkIndexClient } from '@/components/work/WorkIndexClient';
import { buildMetadata, generateCollectionPageSchema } from '@/lib/seo';
import { BASE_URL } from '@/lib/seo/schema';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { PROJECT_COUNT } from '@/data/company-facts';
import { portfolioProjects } from '@/data/portfolio';
import { CtaBand, KitSection } from '@/components/kit';


type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: 'Έργα & Portfolio - Τουρισμός, Ξενοδοχεία & Ενοικίαση Αυτοκινήτου',
      description:
        `${PROJECT_COUNT} έργα ιστοσελίδων για ξενοδοχεία, ενοικίαση αυτοκινήτου, εκδρομές, βίλες και travel AI. Δείτε το portfolio μας με SEO βελτιστοποιημένα έργα σε Ελλάδα και Ευρώπη.`,
      path: localizedPath('el', '/work'),
      primaryKeyword: 'τουριστικές ιστοσελίδες portfolio',
      hreflangPath: '/work',
    });
  }

  return buildMetadata({
    title: 'Portfolio - Tourism, Hotels & Rent-a-car',
    description:
      `${PROJECT_COUNT} website projects for hotels, rent-a-car, tours, villas and travel AI. Browse our portfolio of SEO-optimized tourism projects across Greece, the UK, the US and Europe.`,
    path: localizedPath('en', '/work'),
    primaryKeyword: 'tourism website portfolio',
    hreflangPath: '/work',
  });
}

export default async function WorkPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const lp = (path: string) => localizedPath(locale as SiteLocale, path);
  // The index emits one CreativeWork per portfolio entry, one type across the
  // whole list, which is what makes the set readable.
  const collectionSchema = generateCollectionPageSchema({
    name: locale === 'el' ? 'Έργα & Portfolio' : 'Portfolio',
    url: `${BASE_URL}${lp('/work')}`,
    inLanguage: locale,
    items: portfolioProjects.map((project) => ({
      url: `${BASE_URL}${lp(`/work/${project.slug}`)}`,
      name: project.name,
      itemType: 'CreativeWork',
    })),
  });
  
  const isEl = locale === 'el';

  return (
    <>
      <SchemaMarkup schemas={[collectionSchema]} />
      <Header locale={locale as SiteLocale} />
      <main className="blueprint-grid relative z-0">
        <section className="mx-auto max-w-[1200px] px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
          <p className="text-xs uppercase tracking-[0.2em] text-link">{isEl ? 'ΤΟ PORTFOLIO ΜΑΣ' : 'OUR PORTFOLIO'} / {portfolioProjects.length} {isEl ? 'ΕΡΓΑ' : 'PROJECTS'}</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-7xl">{isEl ? <>Διαφορετικές επιχειρήσεις.<br/><span className="text-brand">Ξεχωριστές ιστορίες.</span></> : <>Different businesses.<br/><span className="text-brand">Distinctive stories.</span></>}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{isEl ? 'Ξενοδοχεία, τοπικές επιχειρήσεις, τουριστικές πλατφόρμες και ψηφιακά προϊόντα. Γνωρίστε τα έργα, το κοινό τους και την εμπειρία πίσω από κάθε ιστοσελίδα.' : 'Hotels, local businesses, travel platforms and digital products. Meet the projects, understand their audiences and explore each website experience.'}</p>
        </section>
        <KitSection className="!pt-12">
          <WorkIndexClient locale={locale as SiteLocale} />
        </KitSection>
        <CtaBand locale={locale as SiteLocale} source="work-band" />
      </main>
      <Footer locale={locale as SiteLocale} />
    </>
  );
}
