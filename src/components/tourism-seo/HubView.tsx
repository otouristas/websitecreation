import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/seo/SchemaMarkup';
import { inlineLink, localH2, localProse } from '@/components/seo/location-styles';
import { CtaBand, KitHeading, KitSection } from '@/components/kit';
import { AccentTitle, CardGrid, FaqBlock, LinkCards, PriceTiers, ProcessGrid, ServiceHero, getServiceKit } from '@/components/service-kit';
import {
  buildTourismHubSchemas,
  HUB_TOURISM_FAQS,
  TOURISM_HUB_NAME,
  TOURISM_HUB_PATH,
  TOURISM_PROCESS,
  TOURISM_RULES,
  TOURISM_VERTICALS,
  tourismPath,
} from '@/data/tourism-seo';

const EN_ALTERNATE = '/en/solutions';

const DESTINATIONS: readonly { href: string; title: string; body: string }[] = [
  { href: '/el/seo/crete', title: 'Κρήτη', body: 'Ηράκλειο, Χανιά και Ρέθυμνο, με resorts, βίλες και εκδρομές.' },
  { href: '/el/seo/santorini', title: 'Σαντορίνη', body: 'Καλντέρα, κρουαζιέρα και σεζόν που κλείνει τον χειμώνα.' },
  { href: '/el/seo/mykonos', title: 'Μύκονος', body: 'Ξενόγλωσση ζήτηση και υψηλός ανταγωνισμός από πλατφόρμες.' },
  { href: '/el/seo/paros', title: 'Πάρος', body: 'Λιμάνι, rent a car και ενοικιαζόμενα δωμάτια.' },
  { href: '/el/seo/rhodes', title: 'Ρόδος', body: 'Πακέτα, παλιά πόλη και ανατολική ακτή.' },
  { href: '/el/seo/corfu', title: 'Κέρκυρα', body: 'Βρετανική και ιταλική αγορά, βίλες και ταβέρνες.' },
  { href: '/el/seo/athens', title: 'Αθήνα', body: 'City hotels, transfer και εκδρομές όλο τον χρόνο.' },
  { href: '/el/seo/thessaloniki', title: 'Θεσσαλονίκη', body: 'Εστίαση, ταξιδιωτικά γραφεία και city breaks.' },
  { href: '/el/seo', title: 'Όλοι οι τόποι', body: 'Μία σελίδα SEO για κάθε πόλη και νησί.' },
];

export function TourismHubView() {
  const kit = getServiceKit('local-seo');
  const cards = TOURISM_VERTICALS.map((vertical) => ({
    href: tourismPath(vertical.slug),
    title: `SEO για ${vertical.name}`,
    body: vertical.blurb,
  }));

  return (
    <>
      <SchemaMarkup schemas={buildTourismHubSchemas(TOURISM_VERTICALS)} />
      <Header locale="el" alternateHref={EN_ALTERNATE} />
      <main className="blueprint-grid relative z-0">
        <ServiceHero
          locale="el"
          breadcrumbs={[
            { name: 'Αρχική', url: '/el' },
            { name: TOURISM_HUB_NAME, url: TOURISM_HUB_PATH },
          ]}
          pill={{ kind: 'live', tag: 'Τουρισμός', text: 'Σε όλη την Ελλάδα', href: '/el/seo' }}
          h1="Υπηρεσίες SEO για τουριστικές επιχειρήσεις"
          h1Accent="τουριστικές επιχειρήσεις"
          lead="Υπηρεσίες SEO για ξενοδοχεία, rent a car, βίλες, εκδρομές, ταξιδιωτικά γραφεία, εστιατόρια, σκάφη και transfer σε όλη την Ελλάδα. Ο στόχος είναι ένας: ο ταξιδιώτης που ψάχνει στη Google, στον χάρτη ή σε AI βοηθό να κλείνει απευθείας με εσάς, όχι μέσω πλατφόρμας με προμήθεια."
          primaryLabel="Δωρεάν έλεγχος"
          primaryHref="/el/get-started"
          links={[
            { href: '/el/seo-services', label: 'Υπηρεσίες SEO' },
            { href: '/el/seo', label: 'SEO ανά τόπο' },
            { href: '/el/pricing', label: 'Τιμές' },
          ]}
          visual={kit.hero('el', 'Τουρισμός')}
          visualLabel={kit.heroLabel.el}
        />

        <KitSection id="verticals">
          <KitHeading
            eyebrow="Κλάδοι"
            title={<AccentTitle text="Διαλέξτε τον κλάδο σας" />}
            description="Κάθε κλάδος κερδίζει σε άλλες αναζητήσεις, με άλλες σελίδες και άλλο schema. Γι’ αυτό έχει τη δική του σελίδα."
          />
          <LinkCards className="mt-10" items={cards} />
        </KitSection>

        <KitSection tinted>
          <h2 className={localH2}>Γιατί ο τουρισμός θέλει άλλο SEO</h2>
          <div className={localProse}>
            <p>
              Μια τουριστική επιχείρηση στην Ελλάδα δεν ανταγωνίζεται μόνο τον διπλανό. Ανταγωνίζεται το Booking, το Airbnb, το
              GetYourGuide και τους aggregators για τον ίδιο επισκέπτη, και πληρώνει προμήθεια όταν χάνει. Το SEO για τουριστικές
              επιχειρήσεις δεν προσπαθεί να κερδίσει τις πλατφόρμες στη γενική φράση της χώρας. Κερδίζει εκεί όπου η επιχείρηση έχει
              πλεονέκτημα: το όνομά της, το σημείο όπου βρίσκεται, την ιδιότητα που την ξεχωρίζει και τις ερωτήσεις που μόνο εκείνη
              μπορεί να απαντήσει.
            </p>
            <p>
              Η αναζήτηση είναι εποχική και ξενόγλωσση. Οι επισκέπτες σχεδιάζουν μήνες πριν, στη γλώσσα τους, και πολλές αποφάσεις
              γίνονται στο κινητό, στον προορισμό, την ίδια μέρα. Γι’ αυτό η δουλειά συνδυάζει πολύγλωσσο SEO με hreflang, Google
              Business Profile και κριτικές, structured data για την επιχείρηση και μια διαδρομή κράτησης που δουλεύει με roaming.
            </p>
            <p>
              Όλο και περισσότεροι ταξιδιώτες ρωτούν πρώτα το ChatGPT ή βλέπουν AI Overview. Οι ίδιες σαφείς σελίδες και τα ίδια
              συνεπή στοιχεία που βοηθούν στη Google βοηθούν και εκεί. Δείτε πού εμφανίζεστε με τον{' '}
              <Link href="/el/ai-visibility-check" className={inlineLink}>
                δωρεάν έλεγχο ορατότητας σε AI
              </Link>
              , ή διαβάστε για τη{' '}
              <Link href="/el/services/ai-visibility" className={inlineLink}>
                βελτιστοποίηση για AI
              </Link>
              .
            </p>
          </div>
        </KitSection>

        <KitSection id="destinations">
          <KitHeading
            eyebrow="Προορισμοί"
            title={<AccentTitle text="SEO σε όλη την Ελλάδα" />}
            description="Οι σελίδες τόπου περιγράφουν τι αλλάζει σε κάθε πόλη και νησί. Οι σελίδες κλάδου περιγράφουν τη δουλειά."
          />
          <LinkCards className="mt-10" items={DESTINATIONS} />
        </KitSection>

        <KitSection tinted id="process">
          <KitHeading eyebrow="Διαδικασία" title={<AccentTitle text="Πώς δουλεύουμε" />} />
          <ProcessGrid className="mt-10" steps={TOURISM_PROCESS} />
        </KitSection>

        <KitSection id="rules">
          <KitHeading eyebrow="Κανόνες" title={<AccentTitle text="Τι δεν κάνουμε, ώστε να μην κινδυνεύει το site σας" />} />
          <CardGrid className="mt-10" items={TOURISM_RULES} />
        </KitSection>

        <KitSection tinted id="pricing">
          <KitHeading
            align="center"
            eyebrow="Τιμές"
            title={<AccentTitle text="Πόσο κοστίζει το SEO για τουριστικές επιχειρήσεις" />}
            description="Τα μηνιαία πακέτα είναι τα ίδια για όλους τους κλάδους. Το Foundations είναι η αφετηρία."
          />
          <PriceTiers kind="seo" locale="el" className="mt-12" />
        </KitSection>

        <FaqBlock locale="el" title={<AccentTitle text="Συχνές ερωτήσεις" />} faqs={HUB_TOURISM_FAQS} />

        <CtaBand
          locale="el"
          source="tourism-seo-hub"
          title={<AccentTitle text="Πείτε μας τον κλάδο και τον προορισμό" />}
          description="Ο έλεγχος κοιτάζει τη δική σας ιστοσελίδα και τους ανταγωνιστές του προορισμού σας. Η τιμή βγαίνει μετά."
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
