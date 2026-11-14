import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Gem, MessageSquare, Search, TrendingUp, Zap } from "lucide-react";
import { KitBreadcrumbs } from "@/components/page-kit";
import { portfolioMarks } from "@/data/portfolio-client-marks";
import { appLink } from "@/components/gsc-boost/copy";
import {
  TrustMarks,
  WaveAccent,
  WaveChoice,
  WaveSoftwareActions,
  WaveEyebrow,
  WaveHeading,
  WaveHero,
  WaveSection,
  wavePrimaryBtn,
} from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";
import { IndustryAppPanel } from "@/components/pages/industry-wave/ui";
import { KIT_COPY } from "@/components/kit/sections";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { buildMetadata } from "@/lib/seo";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { SchemaOutput } from "@/lib/types/seo";
import { BASE_URL, generateBreadcrumbSchema } from "@/lib/seo/schema";
import { LEGAL_ENTITY_ID, LEGAL_ENTITY_NAME } from '@/data/legal-entity';
import { FOUNDER_YEARS, PROJECTS_DELIVERED } from '@/data/founder';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === 'el') {
    return buildMetadata({
      title: "Ποιοι Είμαστε - Η ομάδα πίσω από το λογισμικό SEO",
      description:
        "Η Touristas Technologies φτιάχνει το AnotherSEOGuru App, λογισμικό SEO πάνω στο Google Search Console. Δείτε ποιοι είμαστε και πώς δουλεύουμε.",
      path: localizedPath('el', '/about'),
      hreflangPath: "/about",
    });
  }

  return buildMetadata({
    title: "About - The Team Behind the SEO Software",
    description:
      "Touristas Technologies makes AnotherSEOGuru App, SEO software built on Google Search Console. Who we are and how we build it.",
    path: localizedPath('en', '/about'),
    hreflangPath: "/about",
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  
  const isEl = locale === 'el';
  const lp = (path: string) => localizedPath(locale as SiteLocale, path);

  const tx = (en: string, el: string) => isEl ? el : en;
  const t = {
    home: tx("Home", "Αρχική"),
    about: tx("About us", "Η ομάδα μας"),
    h1: tx("The people behind AnotherSEOGuru App", "Η ομάδα πίσω από το AnotherSEOGuru App"),
    sub: tx(
      "We’re the SEO and web team at Touristas Technologies. We built AnotherSEOGuru App for a question we face on client sites every week. Which page is worth working on next?",
      "Στην Touristas Technologies σχεδιάζουμε ιστοσελίδες και αναλαμβάνουμε το SEO επιχειρήσεων. Φτιάξαμε το AnotherSEOGuru App για να απαντά σε μια ερώτηση που συναντάμε κάθε εβδομάδα. Ποια σελίδα αξίζει να βελτιώσουμε πρώτα;",
    ),
    storyLabel: tx("Why we built it", "Γιατί φτιάξαμε την εφαρμογή"),
    storyTitle: tx("What comes after the traffic report?", "Τι κάνετε αφού διαβάσετε την αναφορά;"),
    storyP1: tx(
      "A hotel owner can see that fewer people clicked through from Google last month. Deciding whether to update a room page, check the booking pages or wait for the season to turn takes a closer look.",
      "Αν έχετε ξενοδοχείο, το Search Console μπορεί να σας δείξει ότι τον περασμένο μήνα ήρθαν λιγότεροι επισκέπτες από την Google. Το επόμενο ερώτημα είναι πρακτικό. Χρειάζεται αλλαγή η σελίδα ενός δωματίου ή μήπως αυτή την εποχή λιγότεροι ταξιδιώτες ψάχνουν διαμονή;",
    ),
    storyP2: tx(
      "In the app you can ask Aster AI which pages lost clicks, open the searches behind the answer and save a change as a task. Once you’ve made it, you can compare the page’s clicks before and after.",
      "Ρωτήστε τον Aster AI ποιες σελίδες έχασαν κλικ. Δείτε για ποιες αναζητήσεις συνέβη αυτό και κρατήστε την αλλαγή που επιλέξατε ως εργασία. Αφού την εφαρμόσετε, μπορείτε να συγκρίνετε τα κλικ της σελίδας πριν και μετά.",
    ),
    exampleLabel: tx("Try a question in the demo", "Μια ερώτηση για τη δοκιμαστική επίδειξη"),
    example: tx("Which page lost the most clicks this month?", "Ποια σελίδα έχασε τα περισσότερα κλικ αυτόν τον μήνα;"),
    exampleLink: tx("Ask Aster AI with sample data", "Ρωτήστε τον Aster AI με δοκιμαστικά δεδομένα"),
    founderLabel: tx("The team", "Η ομάδα"),
    founderTitle: tx("Touristas Technologies", "Touristas Technologies"),
    founderBody: tx(
      "Touristas Technologies owns the app and this website. Our client work in Greece includes hotel websites, car rental bookings and local services. You can see the sites and read what each business needed in our portfolio.",
      "Στην Touristas Technologies ανήκουν η εφαρμογή και αυτή η ιστοσελίδα. Έχουμε δουλέψει με ξενοδοχεία, γραφεία ενοικίασης αυτοκινήτων και τοπικές επιχειρήσεις στην Ελλάδα. Στα έργα μας μπορείτε να δείτε τις ιστοσελίδες και να διαβάσετε τι χρειαζόταν κάθε επιχείρηση.",
    ),
    founderFacts: [
      { value: `${FOUNDER_YEARS}+`, label: tx("years in SEO", "χρόνια στο SEO") },
      { value: `${PROJECTS_DELIVERED}+`, label: tx("projects delivered", "ολοκληρωμένα έργα") },
      { value: tx("Greece", "Ελλάδα"), label: tx("agency market", "αγορά υπηρεσιών") },
    ],
    founderRole: tx("SEO and web design", "SEO και κατασκευή ιστοσελίδων"),
    founderLink: tx("Explore client projects (in Greek)", "Δείτε έργα πελατών μας"),
    beliefsTitle: tx("What you can check for yourself", "Τι μπορείτε να ελέγξετε εσείς"),
    values: [
      { title: tx("Where the figures come from", "Από πού προκύπτουν οι αριθμοί"), description: tx("Click and impression figures come from your Google Search Console property. Open the page and query behind a suggestion to see them.", "Τα κλικ και οι εμφανίσεις προέρχονται από το δικό σας Google Search Console. Σε κάθε πρόταση μπορείτε να δείτε τη σελίδα και τις αναζητήσεις στις οποίες βασίζεται.") },
      { title: tx("What a forecast means", "Τι σημαίνει η πρόβλεψη"), description: tx("An estimate of extra clicks helps you choose between two tasks. After a change, compare what Google actually recorded.", "Η εκτίμηση για τα επιπλέον κλικ σας βοηθά να επιλέξετε ανάμεσα σε δύο εργασίες. Μετά την αλλαγή βλέπετε πόσα κλικ κατέγραψε η Google.") },
      { title: tx("What you pay for", "Ποιες ενέργειες χρεώνονται"), description: tx("Search Console analysis uses no credits. When a tool uses AI or paid data, you see the credit cost before you run it.", "Η ανάλυση του Search Console δεν καταναλώνει μονάδες. Όταν ένα εργαλείο χρησιμοποιεί AI ή δεδομένα με χρέωση, βλέπετε πόσες μονάδες χρειάζεται πριν ξεκινήσετε.") },
      { title: tx("Who approves an edit", "Ποιος εγκρίνει τις αλλαγές"), description: tx("The Google connection is read-only. You can review a suggested edit and decide whether to publish it through a connected integration.", "Η πρόσβαση στο Search Console είναι μόνο για ανάγνωση. Εσείς ελέγχετε την προτεινόμενη αλλαγή και αποφασίζετε αν θα τη δημοσιεύσετε μέσω μιας συνδεδεμένης υπηρεσίας.") },
    ],
  };

  const siteLocale = locale as SiteLocale;
  const breadcrumbs = [
    { name: t.home, url: lp("/") },
    { name: t.about, url: lp("/about") },
  ];
  const icons = [Zap, Search, Gem, TrendingUp];

  // AboutPage ties this URL to the Organization the layout already emits,
  // so AI engines read it as the company's own page.
  const aboutSchema: SchemaOutput = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE_URL}${lp("/about")}#webpage`,
    url: `${BASE_URL}${lp("/about")}`,
    name: t.about,
    inLanguage: locale,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    mainEntity: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "AnotherSEOGuru",
      parentOrganization: {
        "@type": "Organization",
        "@id": LEGAL_ENTITY_ID,
        name: LEGAL_ENTITY_NAME,
      },
    },
  };

  return (
    <>
      <SchemaMarkup schemas={[aboutSchema, generateBreadcrumbSchema({ items: breadcrumbs })]} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={<KitBreadcrumbs items={breadcrumbs} align="left" />}
          title={accentEnd(t.h1, 3)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.95rem] sm:text-[2.45rem] lg:text-[3rem]"
          lead={t.sub}
          actions={<WaveSoftwareActions locale={siteLocale} source="about-hero" />}
          trust={
            <TrustMarks
              yesLabel={tx("Yes", "Ναι")}
              items={[KIT_COPY.readOnly[siteLocale], KIT_COPY.noCard[siteLocale]]}
            />
          }
          panel={<IndustryAppPanel locale={siteLocale} kind="local" />}
          panelNote={tx(
            "A sample workspace in AnotherSEOGuru App.",
            "Παράδειγμα από το AnotherSEOGuru App με δοκιμαστικά δεδομένα.",
          )}
        />

        <section data-shot="logos" className="border-y border-hairline bg-surface/40">
          <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
            <p className="mb-7 text-center text-[13px] font-medium tracking-[0.01em] text-muted-foreground">{tx("Businesses in our web and SEO portfolio", "Επιχειρήσεις για τις οποίες έχουμε αναλάβει έργα ιστοσελίδων ή SEO")}</p>
            <div className="home-logo-rail">
              <div className="home-logo-track">
                {[false, true].map((hidden) => (
                  <ul
                    key={String(hidden)}
                    className={`home-logo-run flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-16 sm:pr-16 ${hidden ? "home-logo-copy" : ""}`}
                    aria-hidden={hidden || undefined}
                  >
                    {portfolioMarks.map((logo) => (
                      <li key={`${logo.alt}-${hidden}`} className="flex h-12 shrink-0 items-center justify-center sm:h-16">
                        <Image
                          src={logo.src}
                          alt={hidden ? "" : logo.alt}
                          width={220}
                          height={64}
                          unoptimized
                          loading={hidden ? "lazy" : "eager"}
                          className={logo.surface ? `h-10 w-auto max-w-40 rounded-md object-contain px-2 py-1 sm:h-12 ${logo.surface === "dark" ? "bg-slate-950" : "bg-white"}` : "home-logo"}
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WaveSection shot="story">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <WaveEyebrow>{t.storyLabel}</WaveEyebrow>
              <h2 className="mt-4 text-balance font-display text-[2rem] font-bold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-[2.6rem]">
                {accentEnd(t.storyTitle, 1)}
              </h2>
              <div className="mt-6 space-y-4 text-pretty text-[16.5px] leading-[1.7] text-muted-foreground">
                <p>{t.storyP1}</p>
                <p>{t.storyP2}</p>
              </div>
            </div>
            <figure className="min-w-0 rounded-[22px] border border-hairline bg-surface/70 p-7 sm:p-9">
              <MessageSquare className="size-6 text-primary" aria-hidden />
              <p className="mt-4 text-pretty font-display text-[1.35rem] font-semibold italic leading-snug text-foreground sm:text-[1.6rem]">
                {t.example}
              </p>
              <figcaption className="mt-5 font-code text-[12px] uppercase tracking-[0.1em] text-muted-foreground">{t.exampleLabel}</figcaption>
              <a href={appLink("/demo", siteLocale, "about-example")} className="mt-4 inline-block text-sm font-medium text-primary hover:underline">{t.exampleLink}</a>
            </figure>
          </div>
        </WaveSection>

        <WaveSection id="team" shot="team" tinted>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="min-w-0">
              <WaveHeading eyebrow={t.founderLabel} title={accentEnd(t.founderTitle, 1)} lead={t.founderBody} />
              <Link href={lp("/work")} className={`${wavePrimaryBtn} mt-8`}>
                {t.founderLink}
              </Link>
            </div>
            <figure className="min-w-0 rounded-[22px] border border-hairline bg-background p-7 sm:p-9">
              <figcaption>
                <span className="block text-balance font-display text-[1.7rem] font-bold tracking-[-0.03em] text-foreground sm:text-[2rem]">
                  {LEGAL_ENTITY_NAME}
                </span>
                <span className="mt-2 block text-[13px] text-muted-foreground">{t.founderRole}</span>
              </figcaption>
              <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-hairline pt-6">
                {t.founderFacts.map((fact) => (
                  <div key={fact.label} className="min-w-0">
                    <dt className="sr-only">{fact.label}</dt>
                    <dd className="font-display text-[1.6rem] font-bold tabular-nums leading-none tracking-tight text-foreground sm:text-[1.85rem]">
                      <StatFigure value={fact.value} />
                    </dd>
                    <dd className="mt-1.5 text-pretty text-[13px] text-muted-foreground">{fact.label}</dd>
                  </div>
                ))}
              </dl>
            </figure>
          </div>
        </WaveSection>

        <WaveSection shot="principles">
          <WaveHeading align="center" eyebrow={tx("Principles", "Αρχές")} title={accentEnd(t.beliefsTitle, 1)} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((value, index) => {
              const Icon = icons[index] ?? Zap;
              return (
                <li key={value.title} className="min-w-0 rounded-[22px] border border-hairline bg-surface/60 p-6">
                  <span className="grid size-11 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-balance text-[1.15rem] font-bold text-foreground">{value.title}</h3>
                  <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted-foreground">{value.description}</p>
                </li>
              );
            })}
          </ul>
        </WaveSection>

        <WaveChoice locale={siteLocale} source="about-choice" />

      </main>
      <Footer locale={siteLocale} />
    </>
  );
}

function StatFigure({ value }: { readonly value: string }) {
  if (!value.endsWith("+")) return value;
  return (
    <>
      {value.slice(0, -1)}
      <WaveAccent>+</WaveAccent>
    </>
  );
}
