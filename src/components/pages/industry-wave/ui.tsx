import type { ReactNode } from "react";
import Link from "next/link";
import { PortfolioThumbnail } from "@/components/landing/PortfolioThumbnail";
import { AppPanel, WaveAccent } from "@/components/pages/platform-wave/ui";
import { PORTFOLIO_CATEGORIES, type PortfolioProject } from "@/data/portfolio";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";

/**
 * Industry-specific AnotherSEOGuru App samples.
 * Every row is fictional and the chrome badge says so. No client metrics.
 */

export type SampleKind = "hotel" | "villa" | "rental" | "tours" | "agency" | "restaurant" | "boat" | "transfer" | "tourism" | "local";

const INDUSTRY_KIND: Record<string, SampleKind> = {
  hotels: "hotel",
  "villas-apartments": "villa",
  "rent-a-car": "rental",
  "tour-operators": "tours",
  "travel-agencies": "agency",
  "travel-ai-chatbots": "agency",
  restaurants: "restaurant",
};

const TOURISM_KIND: Record<string, SampleKind> = {
  xenodoxeia: "hotel",
  "rent-a-car": "rental",
  villes: "villa",
  ekdromes: "tours",
  "taxidiotika-grafeia": "agency",
  estiatoria: "restaurant",
  "enoikiasi-skafon": "boat",
  transfer: "transfer",
};

export function sampleKindForIndustry(slug: string): SampleKind {
  return INDUSTRY_KIND[slug] ?? "local";
}

export function sampleKindForTourism(slug: string): SampleKind {
  return TOURISM_KIND[slug] ?? "local";
}

type SampleRow = { readonly query: string; readonly page: string };

type SampleCopy = {
  readonly url: string;
  readonly caption: string;
  readonly property: string;
  readonly domain: string;
  readonly rows: readonly SampleRow[];
};

function tx(locale: SiteLocale, en: string, el: string): string {
  return locale === "el" ? el : en;
}

function sampleCopy(kind: SampleKind, locale: SiteLocale): SampleCopy {
  const badgeNote = tx(locale, "Fictional sample inside AnotherSEOGuru App, not a client account.", "Φανταστικό δείγμα μέσα στο AnotherSEOGuru App, όχι λογαριασμός πελάτη.");
  switch (kind) {
    case "hotel":
      return {
        url: "app.anotherseoguru.com/sample/hotel",
        caption: badgeNote,
        property: "Aegean Suites",
        domain: "aegean-suites.example",
        rows: [
          { query: tx(locale, "“aegean suites”", "«aegean suites»"), page: tx(locale, "Your homepage", "Η δική σας αρχική") },
          { query: tx(locale, "“suite with sea view”", "«σουίτα με θέα θάλασσα»"), page: tx(locale, "Room page", "Σελίδα δωματίου") },
          { query: tx(locale, "“hotel near the port”", "«ξενοδοχείο κοντά στο λιμάνι»"), page: "Google Business Profile" },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "Price and availability on the homepage", "Τιμή και διαθεσιμότητα στην αρχική") },
        ],
      };
    case "villa":
      return {
        url: "app.anotherseoguru.com/sample/villa",
        caption: badgeNote,
        property: "Villa Thalassa",
        domain: "villa-thalassa.example",
        rows: [
          { query: tx(locale, "“villa with private pool”", "«βίλα με ιδιωτική πισίνα»"), page: tx(locale, "Villa page", "Σελίδα βίλας") },
          { query: tx(locale, "“availability in August”", "«διαθεσιμότητα Αύγουστος»"), page: tx(locale, "Enquiry form", "Φόρμα διαθεσιμότητας") },
          { query: tx(locale, "Direct contact", "Απευθείας επικοινωνία"), page: tx(locale, "Message to the owner", "Μήνυμα στον ιδιοκτήτη") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "A booking path that stays on your site", "Διαδρομή κράτησης που μένει στο site σας") },
        ],
      };
    case "rental":
      return {
        url: "app.anotherseoguru.com/sample/rent-a-car",
        caption: badgeNote,
        property: "Island Cars",
        domain: "island-cars.example",
        rows: [
          { query: tx(locale, "“car rental airport”", "«ενοικίαση αυτοκινήτου αεροδρόμιο»"), page: tx(locale, "Airport page", "Σελίδα αεροδρομίου") },
          { query: tx(locale, "“suv hire”", "«ενοικίαση SUV»"), page: tx(locale, "Category page", "Σελίδα κατηγορίας") },
          { query: tx(locale, "Booking", "Κράτηση"), page: tx(locale, "Availability check", "Έλεγχος διαθεσιμότητας") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "One URL per fleet category", "Ένα URL ανά κατηγορία στόλου") },
        ],
      };
    case "tours":
      return {
        url: "app.anotherseoguru.com/sample/tours",
        caption: badgeNote,
        property: "Day Routes",
        domain: "day-routes.example",
        rows: [
          { query: tx(locale, "“day trip”", "«ημερήσια εκδρομή»"), page: tx(locale, "Tour page", "Σελίδα εκδρομής") },
          { query: tx(locale, "“private tour”", "«ιδιωτική εκδρομή»"), page: tx(locale, "Offer page", "Σελίδα προσφοράς") },
          { query: tx(locale, "Booking", "Κράτηση"), page: tx(locale, "Request on your site", "Αίτημα στο site σας") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "Meeting point and duration on the page", "Σημείο συνάντησης και διάρκεια στη σελίδα") },
        ],
      };
    case "agency":
      return {
        url: "app.anotherseoguru.com/sample/travel",
        caption: badgeNote,
        property: "Island Routes",
        domain: "island-routes.example",
        rows: [
          { query: tx(locale, "“island hopping”", "«island hopping»"), page: tx(locale, "Package page", "Σελίδα πακέτου") },
          { query: tx(locale, "“honeymoon”", "«μήνας του μέλιτος»"), page: tx(locale, "Trip page", "Σελίδα ταξιδιού") },
          { query: tx(locale, "Destinations", "Προορισμοί"), page: tx(locale, "One page per trip type", "Μία σελίδα ανά τύπο ταξιδιού") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "Quote request on the package", "Αίτημα προσφοράς στο πακέτο") },
        ],
      };
    case "restaurant":
      return {
        url: "app.anotherseoguru.com/sample/restaurant",
        caption: badgeNote,
        property: "Harbour Table",
        domain: "harbour-table.example",
        rows: [
          { query: tx(locale, "“restaurant nearby”", "«εστιατόριο κοντά μου»"), page: "Google Business Profile" },
          { query: tx(locale, "“menu”", "«μενού»"), page: tx(locale, "Menu page", "Σελίδα μενού") },
          { query: tx(locale, "Table", "Τραπέζι"), page: tx(locale, "Reservation link", "Σύνδεσμος κράτησης") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "Reply to recent reviews", "Απάντηση στις πρόσφατες κριτικές") },
        ],
      };
    case "boat":
      return {
        url: "app.anotherseoguru.com/sample/boats",
        caption: badgeNote,
        property: "Blue Charter",
        domain: "blue-charter.example",
        rows: [
          { query: tx(locale, "“boat hire”", "«ενοικίαση σκάφους»"), page: tx(locale, "Boat page", "Σελίδα σκάφους") },
          { query: tx(locale, "“private charter”", "«ιδιωτική ναύλωση»"), page: tx(locale, "Charter page", "Σελίδα ναύλωσης") },
          { query: tx(locale, "Dates", "Ημερομηνίες"), page: tx(locale, "Availability request", "Αίτημα διαθεσιμότητας") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "Departure port on the page", "Λιμάνι αναχώρησης στη σελίδα") },
        ],
      };
    case "transfer":
      return {
        url: "app.anotherseoguru.com/sample/transfer",
        caption: badgeNote,
        property: "Port Transfer",
        domain: "port-transfer.example",
        rows: [
          { query: tx(locale, "“airport transfer”", "«transfer αεροδρόμιο»"), page: tx(locale, "Route page", "Σελίδα διαδρομής") },
          { query: tx(locale, "“port pickup”", "«παραλαβή λιμάνι»"), page: tx(locale, "Meeting point", "Σημείο συνάντησης") },
          { query: tx(locale, "Price", "Τιμή"), page: tx(locale, "From-price on the page", "Τιμή «από» στη σελίδα") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "Booking request on your site", "Αίτημα κράτησης στο site σας") },
        ],
      };
    case "tourism":
      return {
        url: "app.anotherseoguru.com/sample/tourism",
        caption: badgeNote,
        property: tx(locale, "Sample tourism business", "Δείγμα τουριστικής επιχείρησης"),
        domain: "tourism.example",
        rows: [
          { query: tx(locale, "Hotels", "Ξενοδοχεία"), page: tx(locale, "Direct booking page", "Σελίδα άμεσης κράτησης") },
          { query: "Rent a car", page: tx(locale, "Airport pickup page", "Σελίδα παραλαβής στο αεροδρόμιο") },
          { query: tx(locale, "Villas", "Βίλες"), page: tx(locale, "Availability request", "Αίτημα διαθεσιμότητας") },
          { query: tx(locale, "Tours", "Εκδρομές"), page: tx(locale, "Tour page", "Σελίδα εκδρομής") },
        ],
      };
    case "local":
      return {
        url: "app.anotherseoguru.com/sample/local",
        caption: badgeNote,
        property: tx(locale, "Sample business", "Δείγμα επιχείρησης"),
        domain: "sample-business.example",
        rows: [
          { query: tx(locale, "Local search", "Τοπική αναζήτηση"), page: "Google Business Profile" },
          { query: tx(locale, "Service", "Υπηρεσία"), page: tx(locale, "Service page", "Σελίδα υπηρεσίας") },
          { query: tx(locale, "Area", "Περιοχή"), page: tx(locale, "City page", "Σελίδα πόλης") },
          { query: tx(locale, "Next fix", "Επόμενη διόρθωση"), page: tx(locale, "Taken from Search Console", "Από το Search Console") },
        ],
      };
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

export function IndustryAppPanel({ locale, kind }: { readonly locale: SiteLocale; readonly kind: SampleKind }) {
  const copy = sampleCopy(kind, locale);
  return (
    <AppPanel
      url={copy.url}
      badge={tx(locale, "Sample data", "Δείγμα δεδομένων")}
      caption={copy.caption}
    >
      <div className="min-w-0 rounded-xl border border-hairline bg-background">
        <div className="flex items-center gap-2 border-b border-hairline px-3 py-3 sm:px-4">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-[12px] font-bold text-primary-foreground">A</span>
          <div className="min-w-0">
            <div className="truncate text-[13px] font-semibold text-foreground">{copy.property}</div>
            <div className="truncate font-code text-[11px] text-muted-foreground">{copy.domain}</div>
          </div>
        </div>
        <ul className="divide-y divide-hairline">
          {copy.rows.map((row) => (
            <li key={row.query} className="grid gap-1 px-3 py-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] sm:items-center sm:px-4">
              <div className="min-w-0 text-pretty text-[13.5px] font-medium text-foreground">{row.query}</div>
              <div className="min-w-0 text-pretty text-[13px] text-muted-foreground sm:text-right">{row.page}</div>
            </li>
          ))}
        </ul>
      </div>
    </AppPanel>
  );
}

export function accentSuffix(text: string, suffix: string): ReactNode {
  const index = text.lastIndexOf(suffix);
  if (index <= 0) return text;
  return (
    <>
      {text.slice(0, index)}
      <WaveAccent>{text.slice(index)}</WaveAccent>
    </>
  );
}

export function WorkCards({
  projects,
  locale,
  showResults = false,
}: {
  readonly projects: readonly PortfolioProject[];
  readonly locale: SiteLocale;
  readonly showResults?: boolean;
}) {
  const isEl = locale === "el";
  return (
    <ul className="mt-12 grid gap-6 md:grid-cols-2">
      {projects.map((project) => {
        const summary = isEl && project.summaryEl ? project.summaryEl : project.summary;
        const results = ((isEl ? project.resultsEl : project.results) ?? []).slice(0, 3);
        const category = PORTFOLIO_CATEGORIES[project.category];
        return (
          <li key={project.slug} className="min-w-0">
            <Link
              href={localizedPath(locale, `/work/${project.slug}`)}
              className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-hairline bg-surface/60 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline">
                <PortfolioThumbnail src={project.screenshot} alt={project.name} />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="font-code text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  {isEl ? category.labelEl : category.label}
                </div>
                <h3 className="mt-2 flex items-start justify-between gap-3 text-balance text-[20px] font-bold text-foreground">
                  <span className="min-w-0">{project.name}</span>
                  <span className="shrink-0 text-primary" aria-hidden>
                    →
                  </span>
                </h3>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{summary}</p>
                {showResults && results.length > 0 ? (
                  <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                    {results.map((item) => (
                      <li key={item} className="flex gap-2 text-pretty text-[13.5px] leading-5 text-foreground/90">
                        <span className="text-primary" aria-hidden>
                          ✓
                        </span>
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
