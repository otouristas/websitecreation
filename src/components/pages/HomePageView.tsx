import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { HomeFaq } from '@/components/marketing';
import {
  LandingHero,
  HomeOfferGrid,
  VerticalServices,
  Different,
  Showcase,
  SeoPricingBlock,
  LandingTestimonials,
  FinalCta,
} from '@/components/landing';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { BASE_URL } from '@/lib/seo/description';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/**
 * Homepage.
 *
 * Section order is ported from the Growth OS studio design; the content is
 * ours. `/el` is the C1 pillar in docs/keyword-research (21 of 51 P0 keywords
 * resolve here, most of them pricing terms), which is why the transparent
 * pricing block sits high on the page rather than being deferred to /pricing.
 *
 * The whole page sits on the blueprint grid.
 */
export function HomePageView({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale, path);

  const orgSchema = generateOrganizationSchema({
    name: 'AnotherSEOGuru',
    url: `${BASE_URL}${lp('/')}`,
    logo: `${BASE_URL}/logo.png`,
    description: isEl
      ? 'AnotherSEOGuru - ελληνική εταιρεία SEO και κατασκευής ιστοσελίδων. Τεχνικό SEO, τοπικό SEO, GEO/AEO, e-shop και δική της πλατφόρμα συνδεδεμένη με το Google Search Console.'
      : 'AnotherSEOGuru - Greek SEO and web design agency. Technical SEO, local SEO, GEO/AEO, e-shops, plus a Search Console-native SEO platform.',
  });

  const relatedLinks = isEl
    ? [
        { href: lp('/pricing'), label: 'Τιμές & πακέτα' },
        { href: lp('/blog/poso-kostizei-to-seo'), label: 'Πόσο κοστίζει το SEO' },
        { href: lp('/blog/poso-kostizei-mia-istoselida'), label: 'Κόστος ιστοσελίδας' },
        { href: lp('/blog/kataskevi-eshop-odigos'), label: 'Κατασκευή e-shop' },
        { href: lp('/services/ai-visibility'), label: 'GEO / AEO' },
        { href: lp('/solutions/hotels'), label: 'SEO για ξενοδοχεία' },
        { href: lp('/services/website-creation/athens-gr'), label: 'Κατασκευή ιστοσελίδων Αθήνα' },
        { href: lp('/services/local-seo/thessaloniki-gr'), label: 'SEO Θεσσαλονίκη' },
        { href: lp('/locations'), label: 'Όλες οι περιοχές' },
      ]
    : [
        { href: lp('/pricing'), label: 'Pricing' },
        { href: lp('/services/ai-visibility'), label: 'GEO / AEO' },
        { href: lp('/services/local-seo'), label: 'Local SEO' },
        { href: lp('/solutions/hotels'), label: 'Hotel SEO' },
        { href: lp('/solutions/rent-a-car'), label: 'Rent-a-car' },
        { href: lp('/work'), label: 'Case studies' },
        { href: lp('/blog'), label: 'Blog' },
        { href: lp('/locations'), label: 'Locations' },
      ];

  return (
    <>
      <SchemaMarkup schemas={[orgSchema]} />
      <Header locale={locale} />
      <main className="blueprint-grid relative z-0">
        <LandingHero locale={locale} />
        <HomeOfferGrid locale={locale} />
        <Different locale={locale} />
        <VerticalServices locale={locale} />
        <Showcase locale={locale} />
        <SeoPricingBlock locale={locale} />
        <LandingTestimonials locale={locale} />
        <HomeFaq locale={locale} />
        <FinalCta locale={locale} />

        {/* Internal-link strip: hub-and-spoke paths the keyword research calls for */}
        <section className="border-t border-hairline py-8">
          <div className="mx-auto max-w-6xl px-6">
            <nav
              aria-label={isEl ? 'Σχετικές σελίδες' : 'Related pages'}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            >
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
