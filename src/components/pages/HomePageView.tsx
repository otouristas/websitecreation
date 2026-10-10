import Link from 'next/link';
import { Bot, Calculator, Globe, LineChart, MapPin, Target, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { HomeFaq } from '@/components/marketing';
import { ProofRail, ScanWidget, SeoPricingBlock, TestimonialsWall, VerticalsStrip, WorkRail } from '@/components/landing';
import {
  Accent,
  AiVisibilityPreview,
  AnnouncePill,
  AppWindow,
  AuditPreview,
  BeforeAfter,
  Container,
  CtaBand,
  DecisionsPanel,
  FeatureRow,
  FollowThroughMini,
  HeroCentered,
  KitHeading,
  KitSection,
  LocalPackPreview,
  OverviewPreview,
  PlanMini,
  PropertiesMini,
  RawQueriesPanel,
  ReportPreview,
  SoftwareCtas,
  Stage,
  StepsGrid,
  TrustLine,
  ValueTrio,
  agencyTrust,
} from '@/components/kit';
import { elHome } from '@/data/translations/el-home';
import { resolvePriceTokens } from '@/data/pricing';
import { generateOrganizationSchema } from '@/lib/seo/schema';
import { BASE_URL } from '@/lib/seo/description';
import { getAppPath } from '@/lib/app-links';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';

/**
 * Homepage, in the app landing's design language on the site's own colours.
 *
 * Order: centered hero with the instant scan, the product window, client
 * logos, "reports vs decisions" before/after, the four services as
 * alternating feature rows, verticals, live work, pricing, the GSC Boost
 * do-it-yourself band, testimonials, FAQ and the two-door closing band.
 *
 * `/el` is the C1 pillar in docs/keyword-research (21 of 51 P0 keywords
 * resolve here, most of them pricing terms), so the H1 wording, the
 * answer-first paragraph and the pricing block are unchanged; only the
 * presentation moved.
 */
export function HomePageView({ locale }: { locale: SiteLocale }) {
  const isEl = locale === 'el';
  const l = locale;
  const tx = (en: string, el: string) => (isEl ? el : en);
  const lp = (path: string) => localizedPath(locale, path);
  const demoHref = `${getAppPath('/demo')}?lang=${locale}&utm_source=website&utm_content=home-window`;

  const orgSchema = generateOrganizationSchema({
    name: 'AnotherSEOGuru',
    url: `${BASE_URL}${lp('/')}`,
    logo: `${BASE_URL}/logo.png`,
    description: isEl
      ? 'AnotherSEOGuru - ελληνική εταιρεία SEO και κατασκευής ιστοσελίδων. Τεχνικό SEO, τοπικό SEO, GEO/AEO, e-shop και δική της πλατφόρμα συνδεδεμένη με το Google Search Console.'
      : 'AnotherSEOGuru - Greek SEO and web design agency. Technical SEO, local SEO, GEO/AEO, e-shops, plus a Search Console-native SEO platform.',
  });

  const line1 = isEl ? elHome.hero.h1Line1 : 'SEO services & web design';
  const line2 = isEl ? elHome.hero.h1Line2 : 'that bring in customers';
  const lead = isEl
    ? resolvePriceTokens(elHome.hero.sub, locale)
    : resolvePriceTokens(
        'AnotherSEOGuru is a Greek SEO and web design agency. We handle technical SEO, local SEO, GEO/AEO and website or e-shop builds, with transparent packages from {{ENTRY_SEO}} a month. Every engagement starts with a free SEO audit, so you see what works before you commit.',
        locale,
      );

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
        {/* ------------------------------------------------------------ hero */}
        <HeroCentered
          pill={
            <AnnouncePill
              href={lp('/services/ai-visibility')}
              kind="ai"
              tag="AI"
              text={tx('Get recommended by ChatGPT, Gemini and Google AI', 'Να σας προτείνουν ChatGPT, Gemini και Google AI')}
            />
          }
          title={
            <>
              {line1} <Accent>{line2}</Accent>
            </>
          }
          lead={lead}
          actions={
            <div className="mx-auto max-w-xl text-left">
              <ScanWidget locale={locale} />
            </div>
          }
          trust={<TrustLine items={agencyTrust(locale)} />}
        >
          <div className="mx-auto mt-14 w-full max-w-[1240px] px-3 sm:px-6">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-[4%] -top-[10%] -z-10 h-[55%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--primary)_35%,transparent),transparent)] blur-3xl"
              />
              <AppWindow
                href={demoHref}
                ctaLabel={tx('Explore the live demo', 'Δείτε τη ζωντανή επίδειξη')}
                label={tx(
                  'GSC Boost, our Search Console software, on a sample hotel: clicks, impressions, CTR and position, a clicks chart and the top fixes to ship next.',
                  'Το GSC Boost, το λογισμικό μας για το Search Console, σε ένα δείγμα ξενοδοχείου: κλικ, εμφανίσεις, CTR, θέση και οι επόμενες διορθώσεις.',
                )}
                badge={
                  <span className="rounded-full border border-hairline bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {tx('GSC Boost · sample data', 'GSC Boost · δείγμα')}
                  </span>
                }
              >
                <OverviewPreview locale={l} />
              </AppWindow>
            </div>
            <p className="mt-5 text-center text-[13px] text-muted-foreground">
              {tx(
                'That’s GSC Boost, the software we run every client on, showing a sample hotel.',
                'Αυτό είναι το GSC Boost, το λογισμικό με το οποίο δουλεύουμε κάθε πελάτη, σε ένα δείγμα ξενοδοχείου.',
              )}{' '}
              <Link href={lp('/platform')} className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:decoration-foreground">
                {tx('Use it yourself, free', 'Χρησιμοποιήστε το δωρεάν')}
              </Link>
            </p>
          </div>
        </HeroCentered>

        <div className="mt-16 sm:mt-20">
          <ProofRail locale={locale} />
        </div>

        {/* ------------------------------------------------- before / after */}
        <KitSection>
          <KitHeading
            align="center"
            eyebrow={tx('Why AnotherSEOGuru', 'Γιατί AnotherSEOGuru')}
            title={
              <>
                {tx('Most agencies send reports.', 'Οι περισσότερες εταιρείες στέλνουν αναφορές.')} {tx('We send', 'Εμείς στέλνουμε')}{' '}
                <Accent>{tx('decisions', 'αποφάσεις')}</Accent>.
              </>
            }
            description={tx(
              'Search Console holds thousands of rows, usually with your own brand name on top. We turn them into a short list of fixes, each with the extra customers it should bring, and then we ship them.',
              'Το Search Console έχει χιλιάδες γραμμές, συνήθως με το όνομά σας στην κορυφή. Τις κάνουμε μια σύντομη λίστα διορθώσεων, με τους πελάτες που θα φέρει η καθεμία, και μετά τις υλοποιούμε.',
            )}
          />
          <div className="mt-14">
            <BeforeAfter
              before={{
                tag: tx('Before', 'Πριν'),
                title: 'Google Search Console',
                text: tx('Raw rows, sorted by clicks', 'Γραμμές, ταξινομημένες κατά κλικ'),
                node: (
                  <Stage className="p-2.5 sm:p-4">
                    <RawQueriesPanel locale={l} />
                  </Stage>
                ),
              }}
              after={{
                tag: tx('After', 'Μετά'),
                title: 'AnotherSEOGuru',
                text: tx('The same data, as ranked actions', 'Τα ίδια δεδομένα, ως ενέργειες με σειρά'),
                node: (
                  <Stage className="p-2.5 sm:p-4">
                    <DecisionsPanel locale={l} />
                  </Stage>
                ),
              }}
            />
          </div>
          <ValueTrio
            className="mt-16"
            items={[
              {
                icon: Target,
                title: tx('A free audit before any contract', 'Δωρεάν έλεγχος πριν από κάθε συμφωνία'),
                text: tx('You see the problems, the fixes and the price before you pay anything.', 'Βλέπετε τα προβλήματα, τις λύσεις και την τιμή πριν πληρώσετε οτιδήποτε.'),
              },
              {
                icon: Calculator,
                title: tx('Every estimate explained', 'Κάθε εκτίμηση εξηγείται'),
                text: tx('Each fix shows the position, impressions and click-through behind it, from your own data.', 'Κάθε διόρθωση δείχνει τη θέση, τις εμφανίσεις και το CTR, από τα δικά σας δεδομένα.'),
              },
              {
                icon: LineChart,
                title: tx('Results you can check', 'Αποτελέσματα που ελέγχετε'),
                text: tx('Monthly reports straight from Search Console, with every change we shipped marked on the chart.', 'Μηνιαίες αναφορές από το Search Console, με κάθε αλλαγή μας σημειωμένη στο γράφημα.'),
              },
            ]}
          />
        </KitSection>

        {/* ------------------------------------------------------- services */}
        <section className="border-t border-hairline py-20 sm:py-28">
          <Container>
            <KitHeading
              align="center"
              eyebrow={tx('Services', 'Υπηρεσίες')}
              title={
                <>
                  {tx('One team for the whole', 'Μία ομάδα για όλη τη')} <Accent>{tx('search journey', 'διαδρομή αναζήτησης')}</Accent>
                </>
              }
              description={tx(
                'From the first Google search to the AI answer to the booking page: we make sure you show up, get chosen and get the enquiry.',
                'Από την αναζήτηση στη Google και την απάντηση της AI μέχρι τη σελίδα κράτησης: φροντίζουμε να εμφανίζεστε, να σας επιλέγουν και να σας γράφουν.',
              )}
            />
            <div className="mt-20 grid gap-24 sm:gap-28">
              <FeatureRow
                id="seo"
                eyebrow={tx('SEO services', 'Υπηρεσίες SEO')}
                eyebrowIcon={<TrendingUp />}
                title={
                  <>
                    {tx('Monthly SEO, ranked by', 'Μηνιαίο SEO, με σειρά βάσει')} <Accent>{tx('revenue', 'εσόδων')}</Accent>
                  </>
                }
                body={tx(
                  'Technical fixes, content and links, in the order that brings customers fastest. You get the plan, the work and a monthly report you can check against Search Console.',
                  'Τεχνικές διορθώσεις, περιεχόμενο και backlinks, με τη σειρά που φέρνει πελάτες πιο γρήγορα. Παίρνετε το πλάνο, τη δουλειά και μηνιαία αναφορά που ελέγχεται στο Search Console.',
                )}
                bullets={[
                  tx('Technical, on-page and local SEO in Greek and English', 'Τεχνικό, on-page και τοπικό SEO σε ελληνικά και αγγλικά'),
                  tx('Pages written to rank and to sell', 'Σελίδες γραμμένες για να κατατάσσονται και να πουλάνε'),
                  tx('A monthly report with real Search Console numbers', 'Μηνιαία αναφορά με πραγματικά νούμερα από το Search Console'),
                ]}
                links={[
                  { href: lp('/seo-services'), label: tx('SEO services', 'Υπηρεσίες SEO'), primary: true },
                  { href: `${lp('/')}#pricing`, label: tx('Prices', 'Τιμές') },
                ]}
                preview={
                  <Stage>
                    <ReportPreview locale={l} />
                  </Stage>
                }
              />
              <FeatureRow
                id="ai"
                flip
                eyebrow={tx('GEO / AEO', 'GEO / AEO')}
                eyebrowIcon={<Bot />}
                title={
                  <>
                    {tx('Be the answer AI', 'Γίνετε η απάντηση που')} <Accent>{tx('recommends', 'προτείνει η AI')}</Accent>
                  </>
                }
                body={tx(
                  'More travellers and buyers now ask ChatGPT, Gemini or Google’s AI Overviews first. We track whether they mention you, and rebuild your pages so they can cite you.',
                  'Όλο και περισσότεροι ρωτούν πρώτα το ChatGPT, το Gemini ή τα AI Overviews της Google. Μετράμε αν σας αναφέρουν και ξαναχτίζουμε τις σελίδες σας ώστε να σας χρησιμοποιούν ως πηγή.',
                )}
                bullets={[
                  tx('Mentions and citations across the major AI assistants', 'Αναφορές και παραπομπές στους μεγάλους βοηθούς AI'),
                  tx('Pages structured for answers, with schema and clear facts', 'Σελίδες δομημένες για απαντήσεις, με schema και σαφή στοιχεία'),
                  tx('Share of voice against your competitors', 'Μερίδιο φωνής έναντι των ανταγωνιστών σας'),
                ]}
                links={[
                  { href: lp('/services/ai-visibility'), label: tx('AI visibility service', 'Υπηρεσία ορατότητας σε AI'), primary: true },
                  { href: lp('/ai-visibility-check'), label: tx('Free AI check', 'Δωρεάν έλεγχος AI') },
                ]}
                preview={
                  <Stage>
                    <AiVisibilityPreview locale={l} />
                  </Stage>
                }
              />
              <FeatureRow
                id="local"
                eyebrow={tx('Local SEO', 'Τοπικό SEO')}
                eyebrowIcon={<MapPin />}
                title={
                  <>
                    {tx('First on the map,', 'Πρώτοι στον χάρτη,')} <Accent>{tx('first to be called', 'πρώτοι στο τηλέφωνο')}</Accent>
                  </>
                }
                body={tx(
                  'Your Google Business Profile, reviews and local pages, tuned so people nearby find you before they find the next business on the street.',
                  'Το προφίλ Google Business, οι κριτικές και οι τοπικές σελίδες σας, ρυθμισμένα ώστε όσοι είναι κοντά να σας βρίσκουν πριν από τον διπλανό.',
                )}
                bullets={[
                  tx('Google Business Profile set-up and weekly posts', 'Στήσιμο προφίλ Google Business και εβδομαδιαίες αναρτήσεις'),
                  tx('Review requests that actually get answered', 'Αιτήματα κριτικών που απαντώνται'),
                  tx('City pages only where you really work', 'Σελίδες πόλεων μόνο εκεί που πραγματικά δουλεύετε'),
                ]}
                links={[{ href: lp('/services/local-seo'), label: tx('Local SEO', 'Τοπικό SEO'), primary: true }]}
                preview={
                  <Stage>
                    <LocalPackPreview locale={l} />
                  </Stage>
                }
              />
              <FeatureRow
                id="websites"
                flip
                eyebrow={tx('Websites & e-shops', 'Ιστοσελίδες & e-shop')}
                eyebrowIcon={<Globe />}
                title={
                  <>
                    {tx('Websites built to', 'Ιστοσελίδες φτιαγμένες για να')} <Accent>{tx('rank and convert', 'κατατάσσονται και να πουλάνε')}</Accent>
                  </>
                }
                body={tx(
                  'Fast, bilingual sites and WooCommerce stores, with SEO, schema and Core Web Vitals handled before launch, not patched after.',
                  'Γρήγορες, δίγλωσσες ιστοσελίδες και καταστήματα WooCommerce, με SEO, schema και Core Web Vitals έτοιμα πριν την παράδοση.',
                )}
                bullets={[
                  tx('Greek and English, with correct hreflang', 'Ελληνικά και αγγλικά, με σωστό hreflang'),
                  tx('Booking engines and payments that load fast', 'Κρατήσεις και πληρωμές που φορτώνουν γρήγορα'),
                  tx('A full audit before go-live', 'Πλήρης έλεγχος πριν βγει στον αέρα'),
                ]}
                links={[
                  { href: lp('/services/website-creation'), label: tx('Website creation', 'Κατασκευή ιστοσελίδων'), primary: true },
                  { href: lp('/services/eshop-woocommerce'), label: tx('E-shops', 'E-shop') },
                ]}
                preview={
                  <Stage>
                    <AuditPreview locale={l} />
                  </Stage>
                }
              />
            </div>
          </Container>
        </section>

        <VerticalsStrip locale={locale} />
        <WorkRail locale={locale} />
        <SeoPricingBlock locale={locale} />

        {/* ------------------------------------------------------- GSC Boost */}
        <KitSection tinted id="gsc-boost">
          <KitHeading
            align="center"
            eyebrow={
              <span className="inline-flex items-center gap-2">
                <span className="rounded-full bg-signal px-1.5 py-0.5 text-[10px] font-semibold text-signal-foreground">{tx('NEW', 'ΝΕΟ')}</span>
                GSC Boost
              </span>
            }
            title={
              <>
                {tx('Prefer to do it yourself? Use', 'Προτιμάτε να το κάνετε μόνοι σας; Δοκιμάστε')} <Accent>{tx('our software', 'το λογισμικό μας')}</Accent>
              </>
            }
            description={tx(
              'GSC Boost reads your Search Console and hands you the fixes that win the most clicks, ranked and estimated. It is the same tool our team uses every day.',
              'Το GSC Boost διαβάζει το Search Console σας και σας δίνει τις διορθώσεις που φέρνουν τα περισσότερα κλικ, με σειρά και εκτίμηση. Είναι το ίδιο εργαλείο που χρησιμοποιεί καθημερινά η ομάδα μας.',
            )}
          />
          <StepsGrid
            className="mt-14"
            steps={[
              {
                title: tx('Connect Google', 'Συνδέστε τη Google'),
                text: tx('Sign in with Google and approve read-only access. Pick the site to start with.', 'Συνδεθείτε με Google και δώστε πρόσβαση μόνο για ανάγνωση. Διαλέξτε ιστοσελίδα.'),
                preview: <PropertiesMini locale={l} />,
              },
              {
                title: tx('Get your plan', 'Πάρτε το πλάνο σας'),
                text: tx('Every query and page is analysed and the fixes are ranked by the clicks they could bring.', 'Κάθε ερώτημα και σελίδα αναλύεται και οι διορθώσεις μπαίνουν σε σειρά βάσει κλικ.'),
                preview: <PlanMini locale={l} />,
              },
              {
                title: tx('Ship and measure', 'Υλοποιήστε και μετρήστε'),
                text: tx('Turn fixes into tasks, mark what you shipped and watch the result on the chart.', 'Κάντε τις διορθώσεις εργασίες, σημειώστε τι αλλάξατε και δείτε το αποτέλεσμα.'),
                preview: <FollowThroughMini locale={l} />,
              },
            ]}
          />
          <SoftwareCtas locale={locale} source="home-gsc-band" className="mt-12" />
          <p className="mt-4 text-center text-[13px] text-muted-foreground">
            <Link href={lp('/platform')} className="underline decoration-hairline underline-offset-4 hover:text-foreground">
              {tx('See everything GSC Boost does', 'Δείτε όλες τις δυνατότητες του GSC Boost')}
            </Link>
            {' · '}
            <Link href={lp('/platform/pricing')} className="underline decoration-hairline underline-offset-4 hover:text-foreground">
              {tx('Plans and prices', 'Πακέτα και τιμές')}
            </Link>
          </p>
        </KitSection>

        <TestimonialsWall locale={locale} />
        <HomeFaq locale={locale} />
        <CtaBand locale={locale} source="home-band" />

        {/* Internal-link strip: hub-and-spoke paths the keyword research calls for */}
        <section className="border-t border-hairline py-8">
          <Container>
            <nav
              aria-label={isEl ? 'Σχετικές σελίδες' : 'Related pages'}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
            >
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </Container>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
