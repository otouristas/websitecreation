import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { LandingHero } from "@/components/landing/LandingHero";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { LandingComparisonTable } from "@/components/landing/LandingComparisonTable";
import { LandingTestimonials } from "@/components/landing/LandingTestimonials";
import { LandingPricingTeaser } from "@/components/landing/LandingPricingTeaser";
import { HowItWorks, FeatureHighlightGrid, AgencyBand, HomeFaq } from "@/components/marketing";
import { getMarketingFeatureBySlug, type MarketingFeature } from "@/data/marketing-features";
import { buildMetadata } from "@/lib/seo";
import { generateSoftwareApplicationSchema } from "@/lib/seo/schema";
import { BASE_URL } from "@/lib/seo/description";
import { getAppPath } from "@/lib/app-links";

export const metadata = buildMetadata({
  title: "Πλατφόρμα SEO, GEO & AEO — Ελλάδα",
  description:
    "Κατακτήστε την Google και την AI αναζήτηση με λογισμικό SEO από Search Console: clustering, τεχνικό SEO, GEO, AEO, κατασκευή ιστοσελίδων. Δοκιμή 7 ημερών. 500+ ομάδες.",
  path: "/gr",
  primaryKeyword: "seo ελλάδα",
});

const HOME_FEATURE_SLUGS = [
  "semantic-keyword-clustering",
  "ranking-tracker",
  "technical-seo-audits",
  "multi-llm-ai-system",
  "ai-autopilot-mode",
  "sprint-board-task-management",
] as const;

function getHomeHighlightFeatures(): MarketingFeature[] {
  return HOME_FEATURE_SLUGS.map((slug) => getMarketingFeatureBySlug(slug)).filter(
    (f): f is MarketingFeature => Boolean(f),
  );
}

export default function HomeGreek() {
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "AnotherSEOGuru SEO Platform",
    description:
      "Πλατφόρμα SEO με Search Console, GEO, AEO και AI workflows για ελληνικές και διεθνείς αγορές.",
    url: `${BASE_URL}/gr`,
  });
  const highlightFeatures = getHomeHighlightFeatures();

  return (
    <>
      <SchemaMarkup schemas={[softwareSchema]} />
      <Header />
      <main className="relative z-0 overflow-hidden" lang="el">
        <section className="border-b border-border bg-primary/5 py-3">
          <div className="container text-center text-sm text-muted-foreground">
            Ελληνική έκδοση ·{" "}
            <Link href="/" className="font-medium text-primary hover:underline">
              English homepage
            </Link>
          </div>
        </section>

        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container max-w-4xl mx-auto text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">SEO · Σχεδιασμός ιστοσελίδας · Ανάπτυξη</span>
              <br />
              <span className="text-foreground">GEO, AEO &amp; AI αναζήτηση</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Κατακτήστε την οργανική αναζήτηση στην Ελλάδα και παγκοσμίως — από το Google Search Console
              μέχρι τις απαντήσεις των ChatGPT, Perplexity και Gemini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getAppPath("/auth")}
                className="btn btn-gradient px-8 py-4 text-lg font-semibold"
                rel="noopener noreferrer"
              >
                Δοκιμή 7 ημερών
              </a>
              <Link href="/blog/geo-aeo-ellada" className="btn btn-outline px-8 py-4 text-lg">
                Οδηγός GEO &amp; AEO
              </Link>
            </div>
          </div>
        </section>

        <LandingHero />
        <ProblemSolutionSection />
        <section className="py-10 border-y border-border bg-muted/20">
          <div className="container">
            <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Εμπιστεύονται 500+ επιχειρήσεις
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/aggelosrentals.png" alt="Aggelos Rentals" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/alkhotel.png" alt="ALK Hotel" fill className="object-contain" />
              </div>
              <div className="relative w-40 h-14">
                <Image
                  src="/logos/assets/villa-olivia-clara-logo-768x204.png"
                  alt="Villa Olivia Clara"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
        <HowItWorks
          heading="Από τα δεδομένα GSC σε έργα που ολοκληρώνονται"
          subheading="Συνδέστε την ιδιοκτησία μία φορά, ομαδοποιήστε λέξεις-κλειδιά και εκτελέστε με AI."
          steps={[
            {
              step: 1,
              title: "Σύνδεση Search Console",
              description: "Εισαγωγή queries, σελίδων και χωρών σε ένα workspace για SEO.",
            },
            {
              step: 2,
              title: "Ομαδοποίηση & διάγνωση",
              description: "Εντοπισμός κανιβαλισμού και φθίνουσας απόδοσης πριν χαθούν έσοδα.",
            },
            {
              step: 3,
              title: "Παρακολούθηση & audit",
              description: "Θέσεις, τεχνικό SEO και E-E-A-T στο ίδιο backlog.",
            },
            {
              step: 4,
              title: "Εκτέλεση ή ανάθεση",
              description: "AI workflows ή η ομάδα agency για local, περιεχόμενο και ιστοσελίδες.",
            },
          ]}
        />
        <FeatureHighlightGrid
          heading="Δυνατότητες που ανοίγουν καθημερινά οι ομάδες SEO"
          subheading="Πλήρεις σελίδες για κάθε module — ευθυγραμμισμένες με την εφαρμογή."
          features={highlightFeatures}
          limit={6}
        />
        <LandingComparisonTable />
        <LandingTestimonials />
        <AgencyBand />
        <LandingPricingTeaser />
        <HomeFaq />
        <section className="py-[var(--marketing-section-y)] bg-foreground text-background text-center">
          <div className="container max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">Ξεκινήστε την οργανική σας ανάπτυξη</h2>
            <p className="text-background/80 mb-8">
              Δοκιμή 7 ημερών με κάρτα · ακύρωση ανά πάσα στιγμή · πλήρης πρόσβαση στην πλατφόρμα.
            </p>
            <a
              href={getAppPath("/auth")}
              className="btn bg-background text-foreground hover:bg-background/90 px-8 py-4 font-semibold inline-flex"
              rel="noopener noreferrer"
            >
              Ξεκινήστε τώρα
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
