import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { hoodChip } from "@/components/seo/location-styles";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveAccent, WaveChoice, WaveClose, WaveHeading, WaveHero, WaveSection, WaveStats, WaveSteps } from "@/components/pages/platform-wave/ui";
import { ManagedFaq, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { IndustryAppPanel, accentSuffix, WorkCards } from "@/components/pages/industry-wave/ui";
import { ChipLinks, PriceTiers } from "@/components/service-kit";
import { getPortfolioBySlug, type PortfolioProject } from "@/data/portfolio";
import { buildPlaceSchemas, PLACE_PROCESS, type PlacePageData } from "@/data/place-seo";
import { RichText } from "./rich-text";

const BLOCKED_WORK = new Set([
  "antiparos-rentacar",
  "rentacar-antiparos-gr",
  "antiparos-transfer",
  "antiparos-rooms",
  "hotels-sifnos",
  "rentacar-sifnos",
  "george-xipolitas",
]);

const EN_ALTERNATE = "/en/seo-services";

export function PlacePageView({ place }: { readonly place: PlacePageData }) {
  const projects = place.workSlugs
    .filter((slug) => !BLOCKED_WORK.has(slug))
    .map((slug) => getPortfolioBySlug(slug))
    .filter((project): project is PortfolioProject => Boolean(project) && project?.liveStatus !== "offline");
  const breadcrumbs = [
    { name: "Αρχική", url: "/el" },
    { name: "SEO σε όλη την Ελλάδα", url: "/el/seo" },
    { name: `SEO ${place.name}`, url: `/el/seo/${place.slug}` },
  ];

  return (
    <>
      <SchemaMarkup schemas={buildPlaceSchemas(place)} />
      <Header locale="el" alternateHref={EN_ALTERNATE} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill wrap href="/el/seo" tag={place.name} text={`Υπηρεσίες SEO ${place.locative}`} />
            </div>
          }
          title={accentSuffix(place.h1, place.h1Accent)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.9rem] sm:text-[2.35rem] lg:text-[2.85rem]"
          lead={place.lead}
          actions={
            <ServiceHeroActions
              locale="el"
              primaryHref="/el/get-started"
              primaryLabel="Δωρεάν έλεγχος"
              links={[
                { href: "/el/seo", label: "Όλοι οι τόποι" },
                { href: "/el/services/website-creation", label: "Κατασκευή ιστοσελίδων" },
                { href: "/el/pricing", label: "Τιμές" },
              ]}
            />
          }
          panel={<IndustryAppPanel locale="el" kind="local" />}
          panelNote={`Δείγμα δεδομένων μέσα στο AnotherSEOGuru App, για μια επιχείρηση ${place.locative}. Δεν είναι στοιχεία πελάτη.`}
        />

        {place.sections.map((section, index) => (
          <WaveSection key={section.heading} shot={`story-${index}`} tinted={index % 2 === 1}>
            <h2 className="max-w-[860px] text-balance font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[2.2rem]">
              {section.heading}
            </h2>
            <div className="mt-6 max-w-[760px] space-y-5 text-pretty text-[16.5px] leading-[1.7] text-muted-foreground">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </WaveSection>
        ))}

        <WaveSection shot="areas" tinted>
          <WaveHeading
            eyebrow="Σημεία"
            title={
              <>
                Πού κόβεται η αναζήτηση <WaveAccent>{place.locative}</WaveAccent>
              </>
            }
            lead="Οι περιοχές όπου ψάχνει ο πελάτης, όπως τις γράφει. Δεν είναι ξεχωριστές σελίδες."
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {place.areas.map((area) => (
              <li key={area} className={hoodChip}>
                {area}
              </li>
            ))}
          </ul>
        </WaveSection>

        {projects.length > 0 ? (
          <WaveSection shot="proof">
            <WaveHeading
              eyebrow="Έργα"
              title={
                <>
                  Σχετική δουλειά από <WaveAccent>τον κατάλογό μας</WaveAccent>
                </>
              }
              lead="Μόνο έργα που υπάρχουν ήδη στη σελίδα Έργα. Χωρίς πρόσθετα νούμερα."
            />
            <WorkCards projects={projects} locale="el" />
          </WaveSection>
        ) : null}

        <WaveSection id="nearby" shot="nearby" tinted={projects.length === 0}>
          <WaveHeading
            eyebrow="Δίπλα"
            title={
              <>
                Κοντινοί <WaveAccent>τόποι</WaveAccent>
              </>
            }
          />
          <ChipLinks className="mt-8" items={place.nearby} />
          <p className="mt-6 text-[15px] text-muted-foreground">
            <Link href="/el/seo" className="font-medium text-primary underline-offset-4 hover:underline">
              SEO σε όλη την Ελλάδα
            </Link>
          </p>
        </WaveSection>

        <WaveSteps
          id="process"
          shot="process"
          eyebrow="Διαδικασία"
          title={
            <>
              Πώς δουλεύουμε <WaveAccent>{place.locative}</WaveAccent>
            </>
          }
          steps={PLACE_PROCESS.map((step, index) => ({
            n: String(index + 1).padStart(2, "0"),
            title: step.title,
            body: step.body,
          }))}
        />

        <WaveSection id="pricing" shot="pricing" tinted>
          <WaveHeading
            align="center"
            eyebrow="Τιμές"
            title={
              <>
                Πόσο κοστίζει το SEO <WaveAccent>{place.locative}</WaveAccent>
              </>
            }
            lead="Τα μηνιαία πακέτα είναι τα ίδια με τη σελίδα τιμών. Το Foundations είναι η αφετηρία."
          />
          <PriceTiers kind="seo" locale="el" className="mt-12" />
          <p className="mt-10 text-center text-[14.5px]">
            <Link href="/el/pricing" className="font-medium text-primary underline-offset-4 hover:underline">
              Όλες οι τιμές και τα πακέτα
            </Link>
          </p>
        </WaveSection>

        <WaveChoice locale="el" source={`place-seo-${place.slug}-choice`} />
        <WaveStats locale="el" />

        <ManagedFaq
          locale="el"
          title={
            <>
              Συχνές ερωτήσεις για το SEO <WaveAccent>{place.locative}</WaveAccent>
            </>
          }
          faqs={place.faqs}
          askLabel="Μιλήστε στο WhatsApp"
        />

        <WaveClose
          locale="el"
          source={`place-seo-${place.slug}`}
          title={
            <>
              Ξεκινήστε το SEO {place.locative} <WaveAccent>με έλεγχο</WaveAccent>
            </>
          }
          lead={`Στείλτε την ιστοσελίδα σας. Θα δείτε τι κρατά πίσω τις αναζητήσεις ${place.locative} και τι κοστίζει η δουλειά, πριν δεσμευτείτε.`}
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
