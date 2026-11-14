import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Layers, MessageSquare, Search, Sparkles, Workflow } from 'lucide-react';
import { PageShell } from '@/components/bespoke/PageShell';
import { SearchPreview } from '@/components/tools/SearchPreview';
import {
  AgencyCtas,
  AiVisibilityPreview,
  CheckList,
  Container,
  CtaBand,
  KitHeading,
  KitSection,
  Stage,
} from '@/components/kit';
import { ChipLinks, InfoCard, KitFaq, PageHero, accentTail } from '@/components/page-kit';
import { isValidLocale, localizedPath, type SiteLocale } from '@/lib/i18n/locale';
import { buildMetadata } from '@/lib/seo';
import {
  BASE_URL,
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/lib/seo/schema';
import { generateBreadcrumbs } from '@/lib/linking';

/**
 * The AI-visibility check: one keyword, three surfaces, live.
 *
 * The homepage argues that a query now resolves in three places - the blue
 * link, the AI Overview above it and the chat answer - and illustrates it with
 * a fixed tourism example. A visitor's first question is always "so where am
 * I?", and until now the only answer was a form. This page answers it for
 * their own keyword, and the result is the brief for the conversation that
 * follows.
 *
 * Bilingual on purpose: /tools is redirected to /en in next.config because
 * those pages are English-only deep links into the product app. This one is a
 * page of this site, in both languages, so it lives at the top level where
 * /el and /en can both exist.
 */

type PageProps = { params: Promise<{ locale: string }> };

const PATH = '/ai-visibility-check';

const COPY = {
  en: {
    eyebrow: 'Free AI visibility check',
    crumb: 'AI visibility check',
    h1: 'Does your site appear in Google and ChatGPT?',
    intro: 'Enter a phrase a customer might search for and choose their market. Add your domain to see whether your site appears in the Google results, a Google AI Overview or the sources in a ChatGPT answer.',
    note: 'No account required. Repeat searches may show results from the past 12 hours.',
    surfacesTitle: 'Where did your site appear?',
    surfacesBody: 'Your page can rank in Google and still be absent from an AI answer to the same question. Look at the pages cited alongside yours.',
    surfaces: [
      { title: 'Google results', body: 'Check the title and description of each result. If your page appears, see what a potential customer would read before deciding to click.' },
      { title: 'Google AI Overview', body: 'When Google shows a summary, look at the sources it links to. Which page supplies the answer your customer needs?' },
      { title: 'ChatGPT', body: 'Read the answer and open its sources. Check whether it mentions your business by name or links to one of your pages.' },
    ],
    howTitle: 'What the tool checks',
    how: [
      'Google results come from a desktop search in your selected market.',
      'The AI Overview appears only when Google returns one for that search.',
      'The ChatGPT check uses web search and lists the sources cited in the response.',
      'A match includes subdomains, such as a booking site on your own domain.',
      'The same check can reuse results for 12 hours. There is a limit on new checks from each connection.',
    ],
    limitsTitle: 'Reading a single result',
    limits: 'An AI answer can change between searches. Save the keyword and market if you want to repeat the check and follow which sources keep appearing.',
    ctaTitle: 'Which page could answer this search?',
    ctaBody: 'Send our team the phrase you checked and the page you want customers to find. We can review what the current results cover and suggest what to improve.',
    cta: 'Ask about my page',
    ctaSecondary: 'Explore our AI visibility service',
    relatedTitle: 'Related guides and services',
    faqs: [
      { question: 'What is an AI visibility check?', answer: 'It shows whether the sources in a Google AI Overview or a ChatGPT answer include your site for a particular search. The organic Google results give you a point of comparison.' },
      { question: 'Why is there no AI Overview for my search?', answer: 'Google only shows AI Overviews for some searches. The same phrase may also produce different results in another market.' },
      { question: 'Why do ChatGPT answers change?', answer: 'The pages returned by web search and the wording of the response can vary. Compare several checks for the same question and market to see which sources recur.' },
      { question: 'Does a citation mean someone visited my site?', answer: 'A citation shows that the answer referenced your page. It does not measure visits. Check your own analytics to see recorded traffic.' },
      { question: 'Can I guarantee a citation by changing my page?', answer: 'Google and ChatGPT choose their own sources. You can publish an accurate answer, make it accessible to crawlers and track whether it gets cited over time.' },
    ],
  },
  el: {
    eyebrow: 'Δωρεάν έλεγχος ορατότητας σε AI',
    crumb: 'Έλεγχος ορατότητας σε AI',
    h1: 'Εμφανίζεται ο ιστότοπός σας στη Google και στο ChatGPT;',
    intro: 'Γράψτε μια φράση που θα αναζητούσε ένας πελάτης και επιλέξτε χώρα. Αν προσθέσετε το domain σας, θα δείτε αν εμφανίζεται στα αποτελέσματα της Google, στο AI Overview ή στις πηγές που αναφέρει το ChatGPT.',
    note: 'Χωρίς εγγραφή. Αν έχει γίνει ο ίδιος έλεγχος τις τελευταίες 12 ώρες, μπορεί να δείτε το αποθηκευμένο αποτέλεσμα.',
    surfacesTitle: 'Πού εμφανίστηκε η σελίδα σας;',
    surfacesBody: 'Μια σελίδα μπορεί να βρίσκεται ψηλά στη Google και να λείπει από την απάντηση AI για την ίδια ερώτηση. Δείτε ποιες άλλες σελίδες αναφέρονται ως πηγές.',
    surfaces: [
      { title: 'Αποτελέσματα Google', body: 'Διαβάστε τον τίτλο και την περιγραφή κάθε αποτελέσματος. Αν εμφανίζεται η σελίδα σας, αυτά είναι τα στοιχεία που βλέπει ο πελάτης πριν αποφασίσει αν θα την ανοίξει.' },
      { title: 'Google AI Overview', body: 'Όταν η Google εμφανίζει περίληψη, δείτε ποιες πηγές αναφέρει και ποια σελίδα απαντά στην ερώτηση του πελάτη.' },
      { title: 'ChatGPT', body: 'Διαβάστε την απάντηση και ανοίξτε τις πηγές της. Αναφέρεται το όνομα της επιχείρησής σας; Υπάρχει σύνδεσμος προς κάποια δική σας σελίδα;' },
    ],
    howTitle: 'Τι περιλαμβάνει ο έλεγχος',
    how: [
      'Τα αποτελέσματα της Google αντιστοιχούν σε αναζήτηση από υπολογιστή στη χώρα που επιλέξατε.',
      'Θα δείτε AI Overview μόνο αν η Google εμφανίζει περίληψη για τη συγκεκριμένη αναζήτηση.',
      'Για την απάντηση του ChatGPT χρησιμοποιείται αναζήτηση στο διαδίκτυο. Κάτω από την απάντηση θα βρείτε τις πηγές της.',
      'Στον έλεγχο περιλαμβάνονται και τα subdomains σας, όπως αυτό που χρησιμοποιείτε για κρατήσεις.',
      'Τα αποτελέσματα του ίδιου ελέγχου αποθηκεύονται για 12 ώρες. Υπάρχει όριο νέων ελέγχων ανά σύνδεση.',
    ],
    limitsTitle: 'Πώς να διαβάσετε το αποτέλεσμα',
    limits: 'Η απάντηση AI μπορεί να αλλάξει από τη μία αναζήτηση στην άλλη. Κρατήστε τη φράση και τη χώρα που επιλέξατε, ώστε την επόμενη φορά να δείτε ποιες πηγές εμφανίζονται ξανά.',
    ctaTitle: 'Ποια σελίδα σας απαντά σε αυτή την αναζήτηση;',
    ctaBody: 'Στείλτε μας τη φράση που δοκιμάσατε και τη σελίδα που θέλετε να βρίσκουν οι πελάτες. Μπορούμε να εξετάσουμε τι καλύπτουν τα σημερινά αποτελέσματα και πού υπάρχει περιθώριο βελτίωσης.',
    cta: 'Ρωτήστε μας για τη σελίδα σας',
    ctaSecondary: 'Η υπηρεσία μας για ορατότητα σε AI',
    relatedTitle: 'Σχετικοί οδηγοί και υπηρεσίες',
    faqs: [
      { question: 'Τι δείχνει ο έλεγχος ορατότητας σε AI;', answer: 'Δείχνει αν ο ιστότοπός σας εμφανίζεται στις πηγές ενός Google AI Overview ή μιας απάντησης ChatGPT για συγκεκριμένη αναζήτηση. Μπορείτε να συγκρίνετε τις πηγές με τα οργανικά αποτελέσματα της Google.' },
      { question: 'Γιατί δεν εμφανίστηκε AI Overview;', answer: 'Η Google εμφανίζει περίληψη μόνο για ορισμένες αναζητήσεις. Ακόμη και η ίδια φράση μπορεί να δώσει διαφορετικά αποτελέσματα σε άλλη χώρα.' },
      { question: 'Γιατί αλλάζει η απάντηση του ChatGPT;', answer: 'Μπορεί να αλλάξουν τόσο οι σελίδες που βρίσκει η αναζήτηση όσο και η διατύπωση της απάντησης. Επαναλάβετε τον έλεγχο με την ίδια ερώτηση και χώρα για να δείτε ποιες πηγές επανεμφανίζονται.' },
      { question: 'Αν αναφέρεται η σελίδα μου, σημαίνει ότι την επισκέφθηκε κάποιος;', answer: 'Η αναφορά δείχνει ότι η απάντηση συμπεριέλαβε τη σελίδα σας ως πηγή. Για τις επισκέψεις χρειάζεστε τα στοιχεία επισκεψιμότητας του ιστοτόπου σας.' },
      { question: 'Μπορώ να εξασφαλίσω αναφορά αν αλλάξω τη σελίδα μου;', answer: 'Η Google και το ChatGPT επιλέγουν τις πηγές τους. Μπορείτε να δώσετε ακριβή απάντηση στη σελίδα σας, να φροντίσετε να είναι προσβάσιμη στους crawlers και να παρακολουθείτε αν εμφανίζεται στις πηγές.' },
    ],
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const isEl = locale === 'el';

  return buildMetadata({
    title: isEl
      ? 'Έλεγχος ορατότητας σε AI: Google, AI Overview, ChatGPT'
      : 'AI Visibility Check: Google, AI Overview & ChatGPT',
    description: isEl
      ? 'Δωρεάν έλεγχος: γράψτε μια λέξη-κλειδί και δείτε ταυτόχρονα τα οργανικά αποτελέσματα της Google, το AI Overview και την απάντηση του ChatGPT, με το domain σας σημειωμένο.'
      : 'Free check: type a keyword and see the Google results, the AI Overview above them and the ChatGPT answer side by side, with your own domain marked wherever it appears.',
    path: localizedPath(locale as SiteLocale, PATH),
    primaryKeyword: isEl ? 'ορατότητα σε AI' : 'ai visibility check',
    hreflangPath: PATH,
  });
}

export default async function AiVisibilityCheckPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const siteLocale = locale as SiteLocale;
  const isEl = siteLocale === 'el';
  const c = COPY[siteLocale];
  const lp = (path: string) => localizedPath(siteLocale, path);

  const breadcrumbItems = generateBreadcrumbs([{ name: c.crumb, url: PATH }], siteLocale);

  const schemas = combineSchemas(
    generateSoftwareApplicationSchema({
      name: isEl ? 'Έλεγχος ορατότητας σε AI' : 'AI visibility check',
      description: isEl
        ? 'Δωρεάν εργαλείο που δείχνει, για μία λέξη-κλειδί, τα οργανικά αποτελέσματα της Google, το AI Overview και την απάντηση του ChatGPT.'
        : 'Free tool that shows, for one keyword, the Google organic results, the AI Overview and the ChatGPT answer.',
      url: `${BASE_URL}${lp(PATH)}`,
    }),
    generateBreadcrumbSchema({ items: breadcrumbItems }),
    generateFAQSchema({ faqs: [...c.faqs] }),
  );

  const related = isEl
    ? [
        { href: lp('/services/ai-visibility'), label: 'Ορατότητα σε AI (GEO / AEO)' },
        { href: lp('/services/seo-audits'), label: 'Τεχνικός έλεγχος SEO' },
        { href: '/el/seo-tourismou/xenodoxeia', label: 'SEO για ξενοδοχεία' },
        { href: lp('/pricing'), label: 'Τιμές & πακέτα' },
      ]
    : [
        { href: lp('/services/ai-visibility'), label: 'AI visibility (GEO / AEO)' },
        { href: '/en/tourism-seo/hotels', label: 'Hotel SEO' },
        { href: lp('/resources/search-optimization-layers'), label: 'The six layers of search' },
        { href: lp('/resources/ai-search-page-anatomy'), label: 'Anatomy of a page for AI search' },
        { href: lp('/pricing'), label: 'Pricing' },
      ];

  return (
    <PageShell locale={siteLocale} signatureHue={214} schemas={schemas}>
      <PageHero
        locale={siteLocale}
        size="md"
        breadcrumbs={breadcrumbItems}
        pill={{ href: '#check', kind: 'free', tag: isEl ? 'Δωρεάν' : 'Free', text: isEl ? 'Εργαλείο GEO / AEO, χωρίς εγγραφή' : 'GEO / AEO tool, no signup' }}
        title={accentTail(c.h1, 2)}
        lead={c.intro}
        meta={<p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{c.note}</p>}
        actions={null}
        trust={null}
      >
        <div id="check" className="mx-auto mt-10 w-full max-w-[1200px] scroll-mt-28 px-5 text-left sm:px-8">
          <SearchPreview locale={siteLocale} />
        </div>
      </PageHero>

      <KitSection>
        <KitHeading
          align="center"
          eyebrow={isEl ? 'Αποτελέσματα ελέγχου' : 'Check results'}
          eyebrowIcon={<Layers />}
          title={accentTail(c.surfacesTitle, 2)}
          description={c.surfacesBody}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {c.surfaces.map((sf, i) => {
            const Icon = [Search, Sparkles, MessageSquare][i] ?? Search;
            return <InfoCard key={sf.title} as="h2" icon={<Icon />} title={sf.title} text={sf.body} />;
          })}
        </div>
      </KitSection>

      <KitSection tinted>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="min-w-0">
            <KitHeading eyebrow={isEl ? 'Μεθοδολογία' : 'Method'} eyebrowIcon={<Workflow />} title={c.howTitle} />
            <CheckList className="mt-6" items={[...c.how]} />
            <h2 className="mt-12 font-display text-[24px] font-semibold tracking-[-0.03em] text-foreground">{c.limitsTitle}</h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground">{c.limits}</p>
          </div>
          <div className="reveal min-w-0">
            <Stage>
              <AiVisibilityPreview locale={siteLocale} />
            </Stage>
            <p className="mt-3 text-center text-[12.5px] text-muted-foreground">
              {isEl
                ? 'Η μηνιαία παρακολούθηση στο AnotherSEOGuru App, σε δείγμα ξενοδοχείου.'
                : 'Month-over-month tracking in AnotherSEOGuru App, on a sample hotel.'}
            </p>
            <div className="mt-8 rounded-2xl border border-hairline bg-background/70 p-6">
              <h3 className="font-display text-[20px] font-semibold tracking-[-0.025em] text-foreground">{c.ctaTitle}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{c.ctaBody}</p>
              <AgencyCtas
                locale={siteLocale}
                align="left"
                primaryHref={lp('/get-started')}
                primaryLabel={c.cta}
                className="mt-6"
              />
              <Link
                href={lp('/services/ai-visibility')}
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-link underline-offset-4 hover:underline"
              >
                {c.ctaSecondary}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </KitSection>

      <KitFaq
        title={isEl ? 'Συχνές ερωτήσεις για ορατότητα σε AI' : 'Frequently asked questions about AI visibility'}
        items={[...c.faqs]}
      />

      <section className="border-t border-hairline py-12">
        <Container>
          <nav aria-label={c.relatedTitle} className="flex flex-col items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{c.relatedTitle}</span>
            <ChipLinks align="center" items={related} />
          </nav>
        </Container>
      </section>

      <CtaBand locale={siteLocale} source="ai-visibility-check-band" />
    </PageShell>
  );
}
