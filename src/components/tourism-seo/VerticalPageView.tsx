import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { RichText } from "@/components/place-seo/rich-text";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveAccent, WaveChoice, WaveClose, WaveHeading, WaveHero, WaveSection, WaveStats, WaveSteps } from "@/components/pages/platform-wave/ui";
import { ManagedFaq, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { IndustryAppPanel, accentSuffix, sampleKindForTourism, WorkCards } from "@/components/pages/industry-wave/ui";
import { ChipLinks, PriceTiers } from "@/components/service-kit";
import { getPortfolioBySlug, type PortfolioProject } from "@/data/portfolio";
import {
  buildVerticalSchemas,
  TOURISM_HUB_NAME,
  TOURISM_HUB_PATH,
  TOURISM_PROCESS,
  TOURISM_RULES,
  TOURISM_VERTICALS,
  tourismPath,
  type TourismVertical,
} from "@/data/tourism-seo";

/** Same exclusions as the place pages: projects that would name the agency's own island. */
const BLOCKED_WORK = new Set([
  "antiparos-rentacar",
  "rentacar-antiparos-gr",
  "antiparos-transfer",
  "antiparos-rooms",
  "hotels-sifnos",
  "rentacar-sifnos",
  "george-xipolitas",
]);

export function VerticalPageView({ vertical }: { readonly vertical: TourismVertical }) {
  const projects = vertical.workSlugs
    .filter((slug) => !BLOCKED_WORK.has(slug))
    .map((slug) => getPortfolioBySlug(slug))
    .filter((project): project is PortfolioProject => Boolean(project) && project?.liveStatus !== "offline");
  const siblings = TOURISM_VERTICALS.filter((other) => other.slug !== vertical.slug).map((other) => ({
    href: tourismPath(other.slug),
    label: other.name,
  }));
  const breadcrumbs = [
    { name: "Αρχική", url: "/el" },
    { name: TOURISM_HUB_NAME, url: TOURISM_HUB_PATH },
    { name: vertical.name, url: tourismPath(vertical.slug) },
  ];

  return (
    <>
      <SchemaMarkup schemas={buildVerticalSchemas(vertical)} />
      <Header locale="el" alternateHref={vertical.enAlternate} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill wrap href={TOURISM_HUB_PATH} tag={vertical.name} text="SEO για τουριστικές επιχειρήσεις" />
            </div>
          }
          title={accentSuffix(vertical.h1, vertical.h1Accent)}
          titleClassName="text-[1.7rem] min-[400px]:text-[1.95rem] sm:text-[2.45rem] lg:text-[2.9rem]"
          lead={vertical.lead}
          actions={
            <ServiceHeroActions
              locale="el"
              primaryHref="/el/get-started"
              primaryLabel="Δωρεάν έλεγχος"
              links={[
                { href: TOURISM_HUB_PATH, label: "Όλοι οι κλάδοι" },
                { href: "/el/pricing", label: "Τιμές" },
                { href: "/el/work", label: "Έργα" },
              ]}
            />
          }
          panel={<IndustryAppPanel locale="el" kind={sampleKindForTourism(vertical.slug)} />}
          panelNote="Δείγμα δεδομένων μέσα στο AnotherSEOGuru App. Δεν είναι στοιχεία πελάτη."
        />

        {vertical.sections.map((section, index) => (
          <WaveSection key={section.heading} shot={`story-${index}`} tinted={index % 2 === 1}>
            <h2 className="max-w-[820px] text-balance font-display text-[1.7rem] font-bold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[2.2rem]">
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

        <WaveSection id="includes" shot="includes">
          <WaveHeading
            eyebrow="Τι περιλαμβάνει"
            title={accentSuffix(
              `Τι περιλαμβάνουν οι υπηρεσίες SEO για ${vertical.name.toLocaleLowerCase("el-GR")}`,
              vertical.name.toLocaleLowerCase("el-GR"),
            )}
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vertical.deliverables.map((item) => (
              <li key={item.title} className="min-w-0 rounded-[22px] border border-hairline bg-surface/60 p-6">
                <h3 className="text-balance text-[18px] font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </WaveSection>

        <WaveSection id="searches" shot="searches" tinted>
          <WaveHeading
            eyebrow="Αναζητήσεις"
            title={
              <>
                Οι αναζητήσεις <WaveAccent>που στοχεύουμε</WaveAccent>
              </>
            }
            lead="Μοτίβα αναζήτησης με πρόθεση κράτησης. Η λίστα για τη δική σας επιχείρηση βγαίνει από το Search Console και τον έλεγχο."
          />
          <ChipLinks className="mt-8" items={vertical.searches.map((label) => ({ label }))} />
        </WaveSection>

        <WaveSection id="regions" shot="regions">
          <WaveHeading
            eyebrow="Σε όλη την Ελλάδα"
            title={
              <>
                Τι αλλάζει <WaveAccent>ανά προορισμό</WaveAccent>
              </>
            }
            lead="Δεν ανοίγουμε σελίδα για κάθε πόλη με το ίδιο κείμενο. Κάθε προορισμός έχει μία σελίδα SEO, και εδώ γράφουμε τι αλλάζει για αυτόν τον κλάδο."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {vertical.regions.map((region) => (
              <li key={region.href} className="min-w-0">
                <Link
                  href={region.href}
                  className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-colors hover:border-primary/40"
                >
                  <h3 className="text-[18px] font-bold text-foreground">{region.label}</h3>
                  <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{region.note}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] text-muted-foreground">
            <Link href="/el/seo" className="font-medium text-primary underline-offset-4 hover:underline">
              SEO σε όλη την Ελλάδα, ανά πόλη και νησί
            </Link>
          </p>
        </WaveSection>

        {projects.length > 0 ? (
          <WaveSection shot="proof" tinted>
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

        <WaveSection id="rules" shot="rules" tinted={projects.length === 0}>
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
                Πόσο <WaveAccent>κοστίζει</WaveAccent>
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

        <WaveChoice locale="el" source={`tourism-seo-${vertical.slug}-choice`} />
        <WaveStats locale="el" />

        <ManagedFaq
          locale="el"
          title={
            <>
              Συχνές <WaveAccent>ερωτήσεις</WaveAccent>
            </>
          }
          faqs={vertical.faqs}
          askLabel="Μιλήστε στο WhatsApp"
        />

        <WaveSection id="related" shot="related">
          <WaveHeading eyebrow="Σχετικά" title={<>Διαβάστε <WaveAccent>επίσης</WaveAccent></>} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vertical.related.map((item) => (
              <li key={item.href} className="min-w-0">
                <Link
                  href={item.href}
                  className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-colors hover:border-primary/40"
                >
                  <h3 className="text-balance text-[17px] font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-16">
            <WaveHeading
              eyebrow="Άλλοι κλάδοι"
              title={
                <>
                  SEO για άλλες <WaveAccent>τουριστικές επιχειρήσεις</WaveAccent>
                </>
              }
            />
          </div>
          <ChipLinks className="mt-8" items={siblings} />
        </WaveSection>

        <WaveClose
          locale="el"
          source={`tourism-seo-${vertical.slug}`}
          title={
            <>
              Ξεκινήστε με <WaveAccent>δωρεάν έλεγχο</WaveAccent>
            </>
          }
          lead="Στείλτε την ιστοσελίδα σας. Θα δείτε από πού χάνονται οι άμεσες κρατήσεις και τι κοστίζει η δουλειά, πριν δεσμευτείτε."
        />
      </main>
      <Footer locale="el" />
    </>
  );
}
