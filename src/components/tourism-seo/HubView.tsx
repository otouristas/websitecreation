import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { inlineLink, localProse } from "@/components/seo/location-styles";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveAccent, WaveChoice, WaveClose, WaveHeading, WaveHero, WaveSection, WaveStats, WaveSteps } from "@/components/pages/platform-wave/ui";
import { ManagedFaq, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { IndustryAppPanel } from "@/components/pages/industry-wave/ui";
import { PriceTiers } from "@/components/service-kit";
import {
  buildTourismHubSchemas,
  HUB_TOURISM_FAQS,
  TOURISM_HUB_NAME,
  TOURISM_HUB_PATH,
  TOURISM_PROCESS,
  TOURISM_RULES,
  TOURISM_VERTICALS,
  tourismPath,
} from "@/data/tourism-seo";

const EN_ALTERNATE = "/en/tourism-seo";

const DESTINATIONS: readonly { href: string; title: string; body: string }[] = [
  { href: "/el/seo/crete", title: "Κρήτη", body: "Ηράκλειο, Χανιά και Ρέθυμνο, με resorts, βίλες και εκδρομές." },
  { href: "/el/seo/santorini", title: "Σαντορίνη", body: "Καλντέρα, κρουαζιέρα και σεζόν που κλείνει τον χειμώνα." },
  { href: "/el/seo/mykonos", title: "Μύκονος", body: "Ξενόγλωσση ζήτηση και υψηλός ανταγωνισμός από πλατφόρμες." },
  { href: "/el/seo/paros", title: "Πάρος", body: "Λιμάνι, rent a car και ενοικιαζόμενα δωμάτια." },
  { href: "/el/seo/rhodes", title: "Ρόδος", body: "Πακέτα, παλιά πόλη και ανατολική ακτή." },
  { href: "/el/seo/corfu", title: "Κέρκυρα", body: "Βρετανική και ιταλική αγορά, βίλες και ταβέρνες." },
  { href: "/el/seo/athens", title: "Αθήνα", body: "City hotels, transfer και εκδρομές όλο τον χρόνο." },
  { href: "/el/seo/thessaloniki", title: "Θεσσαλονίκη", body: "Εστίαση, ταξιδιωτικά γραφεία και city breaks." },
  { href: "/el/seo", title: "Όλοι οι τόποι", body: "Μία σελίδα SEO για κάθε πόλη και νησί." },
];

export function TourismHubView() {
  const breadcrumbs = [
    { name: "Αρχική", url: "/el" },
    { name: TOURISM_HUB_NAME, url: TOURISM_HUB_PATH },
  ];

  return (
    <>
      <SchemaMarkup schemas={buildTourismHubSchemas(TOURISM_VERTICALS)} />
      <Header locale="el" alternateHref={EN_ALTERNATE} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill wrap href="/el/seo" tag="Τουρισμός" text="Σε όλη την Ελλάδα" />
            </div>
          }
          title={
            <>
              Υπηρεσίες SEO για <WaveAccent>τουριστικές επιχειρήσεις</WaveAccent>
            </>
          }
          titleClassName="text-[1.85rem] min-[400px]:text-[2.05rem] sm:text-[2.6rem] lg:text-[3.05rem]"
          lead="Υπηρεσίες SEO για ξενοδοχεία, rent a car, βίλες, εκδρομές, ταξιδιωτικά γραφεία, εστιατόρια, σκάφη και transfer σε όλη την Ελλάδα. Ο στόχος είναι ένας: ο ταξιδιώτης που ψάχνει στη Google, στον χάρτη ή σε AI βοηθό να κλείνει απευθείας με εσάς, όχι μέσω πλατφόρμας με προμήθεια."
          actions={
            <ServiceHeroActions
              locale="el"
              primaryHref="/el/get-started"
              primaryLabel="Δωρεάν έλεγχος"
              links={[
                { href: "/el/seo-services", label: "Υπηρεσίες SEO" },
                { href: "/el/seo", label: "SEO ανά τόπο" },
                { href: "/el/pricing", label: "Τιμές" },
              ]}
            />
          }
          panel={<IndustryAppPanel locale="el" kind="tourism" />}
          panelNote="Δείγμα δεδομένων μέσα στο AnotherSEOGuru App. Δεν είναι στοιχεία πελάτη."
        />

        <WaveSection id="verticals" shot="verticals">
          <WaveHeading
            eyebrow="Κλάδοι"
            title={
              <>
                Διαλέξτε <WaveAccent>τον κλάδο σας</WaveAccent>
              </>
            }
            lead="Κάθε κλάδος κερδίζει σε άλλες αναζητήσεις, με άλλες σελίδες και άλλο schema. Γι’ αυτό έχει τη δική του σελίδα."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TOURISM_VERTICALS.map((vertical) => (
              <li key={vertical.slug} className="min-w-0">
                <Link
                  href={tourismPath(vertical.slug)}
                  className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-colors hover:border-primary/40"
                >
                  <h3 className="flex items-start justify-between gap-3 text-balance text-[18px] font-bold text-foreground">
                    <span className="min-w-0">SEO για {vertical.name}</span>
                    <span className="shrink-0 text-primary" aria-hidden>
                      →
                    </span>
                  </h3>
                  <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{vertical.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </WaveSection>

        <WaveSection shot="why" tinted>
          <h2 className="text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.75rem]">
            Γιατί ο τουρισμός θέλει <WaveAccent>άλλο SEO</WaveAccent>
          </h2>
          <div className={`${localProse} mt-8 max-w-none`}>
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
              συνεπή στοιχεία που βοηθούν στη Google βοηθούν και εκεί. Δείτε πού εμφανίζεστε με τον{" "}
              <Link href="/el/ai-visibility-check" className={inlineLink}>
                δωρεάν έλεγχο ορατότητας σε AI
              </Link>
              , ή διαβάστε για τη{" "}
              <Link href="/el/services/ai-visibility" className={inlineLink}>
                βελτιστοποίηση για AI
              </Link>
              .
            </p>
          </div>
        </WaveSection>

        <WaveSection id="destinations" shot="destinations">
          <WaveHeading
            eyebrow="Προορισμοί"
            title={
              <>
                SEO σε <WaveAccent>όλη την Ελλάδα</WaveAccent>
              </>
            }
            lead="Οι σελίδες τόπου περιγράφουν τι αλλάζει σε κάθε πόλη και νησί. Οι σελίδες κλάδου περιγράφουν τη δουλειά."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((destination) => (
              <li key={destination.href} className="min-w-0">
                <Link
                  href={destination.href}
                  className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-colors hover:border-primary/40"
                >
                  <h3 className="text-[18px] font-bold text-foreground">{destination.title}</h3>
                  <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{destination.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </WaveSection>

        <WaveSteps
          id="process"
          shot="process"
          eyebrow="Διαδικασία"
          title={
            <>
              Πώς <WaveAccent>δουλεύουμε</WaveAccent>
            </>
          }
          steps={TOURISM_PROCESS.map((step, index) => ({
            n: String(index + 1).padStart(2, "0"),
            title: step.title,
            body: step.body,
          }))}
        />

        <WaveSection id="rules" shot="rules">
          <WaveHeading
            eyebrow="Κανόνες"
            title={
              <>
                Τι δεν κάνουμε, ώστε να μην <WaveAccent>κινδυνεύει το site σας</WaveAccent>
              </>
            }
          />
          <ul className="mt-10 grid gap-5 lg:grid-cols-3">
            {TOURISM_RULES.map((rule) => (
              <li key={rule.title} className="min-w-0 rounded-[22px] border border-hairline bg-surface/60 p-6">
                <h3 className="text-balance text-[18px] font-bold text-foreground">{rule.title}</h3>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{rule.body}</p>
              </li>
            ))}
          </ul>
        </WaveSection>

        <WaveSection id="pricing" shot="pricing" tinted>
          <WaveHeading
            align="center"
            eyebrow="Τιμές"
            title={
              <>
                Πόσο κοστίζει το SEO για <WaveAccent>τουριστικές επιχειρήσεις</WaveAccent>
              </>
            }
            lead="Τα μηνιαία πακέτα είναι τα ίδια για όλους τους κλάδους. Το Foundations είναι η αφετηρία."
          />
          <PriceTiers kind="seo" locale="el" className="mt-12" />
        </WaveSection>

        <WaveChoice locale="el" source="tourism-seo-hub-choice" />
        <WaveStats locale="el" />

        <ManagedFaq
          locale="el"
          title={
            <>
              Συχνές <WaveAccent>ερωτήσεις</WaveAccent>
            </>
          }
          faqs={HUB_TOURISM_FAQS}
          askLabel="Μιλήστε στο WhatsApp"
        />

        <WaveClose
          locale="el"
          source="tourism-seo-hub"
          title={
            <>
              Πείτε μας τον κλάδο <WaveAccent>και τον προορισμό</WaveAccent>
            </>
          }
          lead="Ο έλεγχος κοιτάζει τη δική σας ιστοσελίδα και τους ανταγωνιστές του προορισμού σας. Η τιμή βγαίνει μετά."
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
