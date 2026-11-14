import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlackMonthBanner } from '@/components/pricing/BlackMonthBanner';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { getCaseResult } from '@/data/case-results';
import { SEO_MIN_TERM_MONTHS } from '@/data/company-facts';
import { LEGAL_ENTITY_ID, LEGAL_ENTITY_NAME } from '@/data/legal-entity';
import { getPortfolioBySlug } from '@/data/portfolio';
import { currentDisplayPrice, currentPriceVatLabel, formatPrice, seoPackages, websitePackages, type Tier } from '@/data/pricing';
import { localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { BASE_URL } from '@/lib/seo/description';
import { generateFAQSchema, generateOrganizationSchema } from '@/lib/seo/schema';
import { WHATSAPP_HREF } from '@/lib/contact-info';

const container = 'mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12';
const heading = 'text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-4xl lg:text-5xl';
const textLink = 'inline-flex min-h-11 items-center gap-2 font-semibold text-link underline-offset-4 hover:underline';
const primary = 'asg-primary-action inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary';
const secondary = 'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-hairline bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary';

const selectedWork = [
  { slug: 'cyclades-rentacar', description: 'Κατάλογος ενοικίασης οχημάτων. Ο επισκέπτης διαλέγει νησί και όχημα και επικοινωνεί απευθείας με την τοπική επιχείρηση.' },
  { slug: 'thenutrinest', description: 'Ιστοσελίδα διαιτολογικού γραφείου. Ο επισκέπτης γνωρίζει τη διαιτολόγο, διαβάζει για τις υπηρεσίες της και ζητά ραντεβού.' },
] as const;

const faqs = [
  { question: 'Έχω ήδη ιστοσελίδα. Χρειάζεται να την αλλάξω;', answer: 'Ας δούμε πρώτα την υπάρχουσα. Στον δωρεάν έλεγχο εξετάζουμε ποιες σελίδες βρίσκει η Google και πού υπάρχουν προβλήματα. Έπειτα συζητάμε αν αρκούν μερικές διορθώσεις ή αν αξίζει ο ανασχεδιασμός.' },
  { question: 'Τι χρειάζεστε για να μου δώσετε προσφορά;', answer: 'Πείτε μας τι κάνει η επιχείρησή σας και τι θέλετε να μπορεί να κάνει ο επισκέπτης. Αν έχετε ήδη ιστοσελίδα, στείλτε μας τη διεύθυνσή της. Για νέο έργο αρκεί μια σύντομη περιγραφή.' },
  { question: 'Πόσο διαρκεί η συνεργασία SEO;', answer: `Η ελάχιστη διάρκεια είναι ${SEO_MIN_TERM_MONTHS} μήνες. Στη μηνιαία αναφορά βλέπετε τι αλλάξαμε στην ιστοσελίδα και πώς εξελίσσονται τα κλικ από την Google.` },
];

function entryPrice(tier: Tier) {
  return `€${formatPrice(currentDisplayPrice(tier), 'el')} ${currentPriceVatLabel(tier, 'el')}`;
}

export function HomePageView({ locale }: { readonly locale: SiteLocale }) {
  const lp = (path: string) => localizedPath(locale, path);
  const quote = `${lp('/get-started')}?service=website`;
  const audit = `${lp('/get-started')}?service=seo#free-audit`;
  const featured = getPortfolioBySlug('discover-cyclades');
  const result = getCaseResult('discover-cyclades');
  const services = [
    {
      name: 'Κατασκευή ιστοσελίδας',
      description: 'Για μια νέα ιστοσελίδα ή για την ανανέωση της παλιάς. Σχεδιάζουμε τις σελίδες γύρω από αυτό που θέλετε να κάνει ο πελάτης σας, από ένα τηλεφώνημα μέχρι μια αγορά.',
      price: `Από ${entryPrice(websitePackages[0])}`,
      link: quote, action: 'Ζητήστε προσφορά',
      links: [{ label: 'Νέα ιστοσελίδα', path: '/services/website-creation' }, { label: 'Ανασχεδιασμός', path: '/services/website-redesign' }, { label: 'E-shop', path: '/services/eshop-woocommerce' }],
    },
    {
      name: 'Μηνιαίο SEO',
      description: 'Για μια ιστοσελίδα που λειτουργεί ήδη. Βρίσκουμε ποιοι σας ψάχνουν στη Google, διορθώνουμε ό,τι δυσκολεύει την αναζήτηση και παρακολουθούμε ποια σελίδα φέρνει κλικ.',
      price: `Από €${formatPrice(currentDisplayPrice(seoPackages[0]), 'el')}/μήνα ${currentPriceVatLabel(seoPackages[0], 'el')}`,
      link: audit, action: 'Ζητήστε δωρεάν έλεγχο',
      links: [{ label: 'Υπηρεσίες SEO', path: '/seo-services' }, { label: 'Τοπικό SEO', path: '/services/local-seo' }, { label: 'Ορατότητα σε AI', path: '/services/ai-visibility' }],
    },
  ];
  const orgSchema = generateOrganizationSchema({
    id: `${BASE_URL}/#organization`, name: 'AnotherSEOGuru',
    parentOrganization: { id: LEGAL_ENTITY_ID, name: LEGAL_ENTITY_NAME },
    url: BASE_URL, logo: `${BASE_URL}/brand/asg-lockup-on-light@2x.png`,
    description: 'Ελληνική εταιρεία SEO και κατασκευής ιστοσελίδων για επιχειρήσεις που θέλουν να δέχονται αιτήματα, ραντεβού και κρατήσεις από το διαδίκτυο.',
  });

  return (
    <>
      <SchemaMarkup schemas={[orgSchema, generateFAQSchema({ faqs })]} />
      <Header locale={locale} />
      <main className="overflow-x-clip bg-background text-foreground">
        <section aria-labelledby="agency-heading" className="hero-below-header relative isolate">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_20%,color-mix(in_oklab,var(--signal)_9%,transparent),transparent_62%)]" />
          <div className={`${container} grid items-center gap-7 pb-10 pt-2 sm:pt-5 lg:grid-cols-[minmax(0,.88fr)_minmax(0,1.12fr)] lg:gap-12 lg:pb-16 lg:pt-8`}>
            <div className="min-w-0">
              <h1 id="agency-heading" className="max-w-[16ch] text-balance font-display text-[2.55rem] font-bold leading-[1.04] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-[clamp(3.4rem,4.5vw,4.4rem)]">
                Ιστοσελίδες και SEO για τη δική σας επιχείρηση.
              </h1>
              <p className="mt-4 max-w-[43ch] text-pretty text-[16px] leading-relaxed text-muted-foreground sm:text-lg">
                Θέλετε περισσότερα αιτήματα, ραντεβού ή κρατήσεις; Φτιάχνουμε την ιστοσελίδα σας ή βελτιώνουμε αυτή που έχετε, ώστε οι πελάτες να σας βρίσκουν και να επικοινωνούν μαζί σας.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 lg:mt-7">
                <Link className={primary} href={quote}>Προσφορά για ιστοσελίδα <ArrowRight className="size-4" aria-hidden /></Link>
                <Link className={secondary} href={audit}>Δωρεάν έλεγχος SEO</Link>
              </div>
              <Link href={lp('/ypiresies/times')} className={`${textLink} mt-1 text-sm`}>Δείτε τιμές και πακέτα <ArrowUpRight className="size-4" aria-hidden /></Link>
            </div>
            {featured && !featured.liveStatus && (
              <Link href={lp(`/work/${featured.slug}`)} className="group block min-w-0 overflow-hidden rounded-[20px] border border-hairline bg-surface shadow-[0_24px_55px_-40px_rgba(8,27,61,.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary lg:rounded-3xl">
                <div className="relative aspect-[1.95] overflow-hidden bg-surface-raised">
                  <Image src={featured.screenshot} alt="Η αρχική σελίδα του Discover Cyclades με τους ταξιδιωτικούς οδηγούς" fill preload unoptimized sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover object-top" />
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 lg:p-6">
                  <div className="min-w-0">
                    <h2 className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight sm:text-2xl">{featured.name} <ArrowUpRight className="size-4 text-link" aria-hidden /></h2>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">Ταξιδιωτική πλατφόρμα με οδηγούς για 24 νησιά και δρομολόγια πλοίων.</p>
                  </div>
                  {result && (
                    <div className="flex items-baseline gap-2 border-t border-hairline pt-2 sm:block sm:max-w-[145px] sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                      <strong className="font-display text-xl font-bold tracking-tight text-foreground sm:text-3xl">{result.headline.value}</strong>
                      <span className="text-xs leading-snug text-muted-foreground sm:block">κλικ από την Google τον Οκτώβριο 2026</span>
                    </div>
                  )}
                </div>
              </Link>
            )}
          </div>
        </section>

        <section aria-labelledby="services-heading" className="border-y border-hairline bg-surface/50">
          <div className={`${container} py-10 lg:py-16`}>
            <h2 id="services-heading" className={heading}>Τι χρειάζεστε;</h2>
            <div className="mt-5 grid gap-6 lg:mt-8 lg:grid-cols-2 lg:gap-14">
              {services.map((service) => (
                <article key={service.name} className="min-w-0 border-t border-hairline pt-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{service.name}</h3>
                    <p className="text-sm font-semibold text-link">{service.price}</p>
                  </div>
                  <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-muted-foreground">{service.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4">
                    {service.links.map((link) => <li key={link.path}><Link href={lp(link.path)} className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline decoration-hairline underline-offset-4 hover:text-link">{link.label}</Link></li>)}
                  </ul>
                  <Link href={service.link} className={`${textLink} text-sm`}>{service.action} <ArrowRight className="size-4" aria-hidden /></Link>
                </article>
              ))}
            </div>
            <Link href={lp('/services')} className={`${textLink} mt-4 text-sm`}>Όλες οι υπηρεσίες <ArrowUpRight className="size-4" aria-hidden /></Link>
          </div>
        </section>

        <section aria-labelledby="work-heading" className={`${container} py-12 lg:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <h2 id="work-heading" className={heading}>Έργα μας</h2>
            <Link href={lp('/work')} className={`${textLink} text-sm`}>Όλα τα έργα <ArrowUpRight className="size-4" aria-hidden /></Link>
          </div>
          <div className="mt-5 grid gap-7 sm:grid-cols-2 lg:mt-8 lg:gap-9">
            {selectedWork.map(({ slug, description }) => {
              const project = getPortfolioBySlug(slug);
              if (!project || project.liveStatus) return null;
              return (
                <Link key={slug} href={lp(`/work/${slug}`)} className="group block min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  <div className="relative aspect-[1.95] overflow-hidden rounded-2xl border border-hairline bg-surface">
                    <Image src={project.screenshot} alt="" fill unoptimized sizes="(min-width: 640px) 46vw, 100vw" className="object-cover object-top" />
                  </div>
                  <h3 className="mt-4 flex items-center gap-2 font-display text-xl font-bold tracking-tight group-hover:text-link">{project.name}<ArrowUpRight className="size-4" aria-hidden /></h3>
                  <p className="mt-1 max-w-[54ch] text-sm leading-relaxed text-muted-foreground">{description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <BlackMonthBanner />
        <section aria-labelledby="agency-questions" className="border-t border-hairline bg-surface/50">
          <div className={`${container} grid gap-5 py-10 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-12 lg:py-16`}>
            <div>
              <h2 id="agency-questions" className={heading}>Πριν ξεκινήσουμε</h2>
              <a href={WHATSAPP_HREF} className={`${textLink} mt-3 text-sm`} rel="noopener noreferrer">Μιλήστε μας στο WhatsApp <ArrowUpRight className="size-4" aria-hidden /></a>
            </div>
            <div className="divide-y divide-hairline border-y border-hairline">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">{faq.question}<ChevronDown className="size-4 shrink-0 text-link group-open:rotate-180" aria-hidden /></summary>
                  <p className="max-w-[62ch] pb-5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
