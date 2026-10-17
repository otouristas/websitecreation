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
    eyebrow: 'GEO / AEO · free tool',
    crumb: 'AI visibility check',
    h1: 'Check one keyword across Google, AI Overview and ChatGPT',
    intro:
      'Type a keyword and this runs it through three surfaces at once: the classic Google results, the AI Overview above them, and what ChatGPT answers when someone asks the same thing. Add your domain and each panel marks where you already appear.',
    note: 'Free, no signup. Live search data, read at the moment you press the button.',
    surfacesTitle: 'What each surface asks of a page',
    surfacesBody:
      'The three panels are not three rankings. They are three different readers of the same page, and each one rewards something different.',
    surfaces: [
      {
        title: 'The organic result',
        body: 'Still where the click happens. It wants a page that matches the query, loads fast and says in its title and snippet what the visitor gets.',
      },
      {
        title: 'The AI Overview',
        body: 'A summary Google assembles from pages it can lift an answer out of. Question-shaped headings and a direct answer in the first paragraph are what make a passage liftable.',
      },
      {
        title: 'The chat answer',
        body: 'ChatGPT searches, reads a handful of pages and names a few. It cites sources with facts it can attribute: prices, distances, terms, a named author.',
      },
    ],
    howTitle: 'How the check works',
    how: [
      'The Google panel is a live desktop SERP for the market you pick, not a cached snapshot.',
      'The AI Overview is requested asynchronously, the way Google loads it, so the panel shows one whenever the query triggers one.',
      'The ChatGPT panel sends your keyword to the model with web search on, and lists the sources it cited.',
      'Your domain matches its own subdomains too, so a booking subdomain counts as you.',
      'Results are cached for twelve hours and limited per connection, because every check costs us a live API call.',
    ],
    limitsTitle: 'What it does not do',
    limits:
      'One check is one reading. AI answers vary between users, sessions and days, and no engine guarantees a citation to anyone. Tracking a keyword month over month is the part that tells you whether the work is landing - that is the retainer, not this page.',
    ctaTitle: 'Turn the reading into a plan',
    ctaBody:
      'Send us the keyword you care about and the pages behind it. You get back what each surface currently rewards for that query and what your page is missing, within 24 working hours.',
    cta: 'Send us your keyword',
    ctaSecondary: 'How we do GEO & AEO',
    relatedTitle: 'Related',
    faqs: [
      {
        question: 'What is an AI visibility check?',
        answer:
          'It is a reading of one keyword across the three surfaces a search now resolves into: the organic results, the AI Overview Google assembles above them, and the answer a chat assistant gives. Checking only the first tells you less every year.',
      },
      {
        question: 'Why does the AI Overview panel sometimes say nothing was shown?',
        answer:
          'Google does not put an AI Overview on every query. Transactional and navigational searches often have none, and the same query can show one in one market and not in another. An absent AI Overview is a finding: for that query the classic result still owns the answer.',
      },
      {
        question: 'Why is the ChatGPT answer different every time?',
        answer:
          'A chat answer is generated per request. It depends on which pages the model retrieved in that moment, the country it searched from, and its own sampling. Treat one answer as a sample, and the pattern across repeated checks as the signal.',
      },
      {
        question: 'Does appearing in an AI Overview bring traffic?',
        answer:
          'Sometimes, and less predictably than a blue link. Being cited puts your name in the answer whether or not the click follows, which is worth the most when the query is a shortlist: someone comparing hotels, suppliers or firms before contacting any of them.',
      },
      {
        question: 'Can you guarantee a citation in ChatGPT or an AI Overview?',
        answer:
          'No, and neither can anyone else. What we can do is make your pages usable by all three surfaces - crawlable, answer-first, with facts worth attributing - and track where you appear month over month.',
      },
    ],
  },
  el: {
    eyebrow: 'GEO / AEO · δωρεάν εργαλείο',
    crumb: 'Έλεγχος ορατότητας σε AI',
    h1: 'Ελέγξτε μία λέξη-κλειδί σε Google, AI Overview και ChatGPT',
    intro:
      'Γράψτε μια λέξη-κλειδί και ο έλεγχος την τρέχει ταυτόχρονα σε τρία σημεία: στα κλασικά αποτελέσματα της Google, στο AI Overview από πάνω τους, και στην απάντηση που δίνει το ChatGPT όταν κάποιος ρωτά το ίδιο. Προσθέστε το domain σας και κάθε πλαίσιο σημειώνει πού εμφανίζεστε ήδη.',
    note: 'Δωρεάν, χωρίς εγγραφή. Ζωντανά δεδομένα αναζήτησης, τη στιγμή που πατάτε το κουμπί.',
    surfacesTitle: 'Τι ζητά κάθε σημείο από μια σελίδα',
    surfacesBody:
      'Τα τρία πλαίσια δεν είναι τρεις κατατάξεις. Είναι τρεις διαφορετικοί αναγνώστες της ίδιας σελίδας, και ο καθένας ανταμείβει κάτι άλλο.',
    surfaces: [
      {
        title: 'Το οργανικό αποτέλεσμα',
        body: 'Εκεί γίνεται ακόμη το κλικ. Θέλει σελίδα που ταιριάζει με την αναζήτηση, φορτώνει γρήγορα και λέει στον τίτλο και στην περιγραφή τι θα βρει ο επισκέπτης.',
      },
      {
        title: 'Το AI Overview',
        body: 'Περίληψη που συνθέτει η Google από σελίδες με απάντηση που μπορεί να αποσπάσει. Επικεφαλίδες σε μορφή ερώτησης και απάντηση στην πρώτη παράγραφο είναι αυτό που κάνει ένα απόσπασμα αξιοποιήσιμο.',
      },
      {
        title: 'Η απάντηση στο chat',
        body: 'Το ChatGPT ψάχνει, διαβάζει λίγες σελίδες και ονομάζει ελάχιστες. Αναφέρει πηγές με στοιχεία που μπορεί να αποδώσει: τιμές, αποστάσεις, όρους, επώνυμο συντάκτη.',
      },
    ],
    howTitle: 'Πώς δουλεύει ο έλεγχος',
    how: [
      'Το πλαίσιο της Google είναι ζωντανό αποτέλεσμα για την αγορά που επιλέγετε, όχι αποθηκευμένο στιγμιότυπο.',
      'Το AI Overview ζητείται ασύγχρονα, όπως το φορτώνει και η Google, ώστε να εμφανίζεται όποτε η αναζήτηση το ενεργοποιεί.',
      'Το πλαίσιο του ChatGPT στέλνει τη λέξη-κλειδί σας στο μοντέλο με ενεργή αναζήτηση στο web και δείχνει τις πηγές που ανέφερε.',
      'Το domain σας αντιστοιχίζεται και με τα subdomains του, οπότε ένα subdomain κρατήσεων μετρά ως εσείς.',
      'Τα αποτελέσματα αποθηκεύονται για δώδεκα ώρες και υπάρχει όριο ανά σύνδεση, γιατί κάθε έλεγχος είναι μια πραγματική κλήση API.',
    ],
    limitsTitle: 'Τι δεν κάνει',
    limits:
      'Ένας έλεγχος είναι μία μέτρηση. Οι απαντήσεις AI διαφέρουν ανά χρήστη, ανά συνεδρία και ανά ημέρα, και καμία μηχανή δεν εγγυάται αναφορά σε κανέναν. Η παρακολούθηση μιας λέξης-κλειδί κάθε μήνα είναι αυτό που δείχνει αν η δουλειά πιάνει - και αυτό γίνεται στη συνεργασία, όχι σε αυτή τη σελίδα.',
    ctaTitle: 'Από τη μέτρηση στο πλάνο',
    ctaBody:
      'Στείλτε μας τη λέξη-κλειδί που σας ενδιαφέρει και τις σελίδες πίσω από αυτήν. Παίρνετε πίσω τι ανταμείβει σήμερα κάθε σημείο για αυτή την αναζήτηση και τι λείπει από τη σελίδα σας, εντός 24 εργάσιμων ωρών.',
    cta: 'Στείλτε μας τη λέξη-κλειδί σας',
    ctaSecondary: 'Πώς κάνουμε GEO & AEO',
    relatedTitle: 'Σχετικά',
    faqs: [
      {
        question: 'Τι είναι ο έλεγχος ορατότητας σε AI;',
        answer:
          'Είναι μια μέτρηση μιας λέξης-κλειδί στα τρία σημεία όπου καταλήγει σήμερα μια αναζήτηση: στα οργανικά αποτελέσματα, στο AI Overview που συνθέτει η Google από πάνω τους, και στην απάντηση ενός chat. Ο έλεγχος μόνο του πρώτου λέει κάθε χρόνο και λιγότερα.',
      },
      {
        question: 'Γιατί μερικές φορές το AI Overview δεν εμφανίζεται;',
        answer:
          'Η Google δεν βάζει AI Overview σε κάθε αναζήτηση. Οι συναλλακτικές και οι πλοηγητικές συχνά δεν έχουν, και η ίδια αναζήτηση μπορεί να δείχνει AI Overview σε μία αγορά και όχι σε άλλη. Η απουσία του είναι κι αυτή εύρημα: εκεί την απάντηση την κρατά ακόμη το κλασικό αποτέλεσμα.',
      },
      {
        question: 'Γιατί η απάντηση του ChatGPT αλλάζει κάθε φορά;',
        answer:
          'Η απάντηση παράγεται ανά αίτημα. Εξαρτάται από τις σελίδες που ανέκτησε το μοντέλο εκείνη τη στιγμή, από τη χώρα αναζήτησης και από την ίδια τη δειγματοληψία του. Δείτε μία απάντηση ως δείγμα, και το μοτίβο σε επαναλαμβανόμενους ελέγχους ως ένδειξη.',
      },
      {
        question: 'Η εμφάνιση σε AI Overview φέρνει επισκεψιμότητα;',
        answer:
          'Κάποιες φορές, και λιγότερο προβλέψιμα από ένα οργανικό αποτέλεσμα. Η αναφορά βάζει το όνομά σας μέσα στην απάντηση είτε ακολουθήσει κλικ είτε όχι, και αξίζει περισσότερο όταν η αναζήτηση είναι λίστα επιλογών: κάποιος που συγκρίνει ξενοδοχεία, προμηθευτές ή γραφεία πριν επικοινωνήσει με οποιονδήποτε.',
      },
      {
        question: 'Μπορείτε να εγγυηθείτε αναφορά σε ChatGPT ή σε AI Overview;',
        answer:
          'Όχι, και ούτε κανείς άλλος. Αυτό που μπορούμε να κάνουμε είναι να γίνουν οι σελίδες σας αξιοποιήσιμες και από τα τρία σημεία - προσβάσιμες, με την απάντηση μπροστά, με στοιχεία που αξίζει να αποδοθούν - και να παρακολουθούμε πού εμφανίζεστε κάθε μήνα.',
      },
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
        { href: lp('/solutions/hotels'), label: 'SEO για ξενοδοχεία' },
        { href: lp('/pricing'), label: 'Τιμές & πακέτα' },
      ]
    : [
        { href: lp('/services/ai-visibility'), label: 'AI visibility (GEO / AEO)' },
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
          eyebrow={isEl ? 'Τα τρία σημεία' : 'The three surfaces'}
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
                ? 'Η μηνιαία παρακολούθηση στο GSC Boost, σε δείγμα ξενοδοχείου.'
                : 'Month-over-month tracking in GSC Boost, on a sample hotel.'}
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
