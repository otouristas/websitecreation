import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveAccent, WaveChoice, WaveClose, WaveHeading, WaveHero, WaveSection, WaveStats } from "@/components/pages/platform-wave/ui";
import { ManagedFaq, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { IndustryAppPanel, WorkCards } from "@/components/pages/industry-wave/ui";
import {
  buildEnglishHubSchemas,
  ENGLISH_VERTICALS,
  EN_TOURISM_HUB_NAME,
  EN_TOURISM_HUB_PATH,
  enTourismPath,
  HUB_FAQS,
  HUB_PAINS,
  hubTourismProjects,
} from "@/data/tourism-seo/en";
import { TOURISM_HUB_PATH } from "@/data/tourism-seo";

export function EnglishTourismHubView() {
  const projects = hubTourismProjects();
  const breadcrumbs = [
    { name: "Home", url: "/en" },
    { name: EN_TOURISM_HUB_NAME, url: EN_TOURISM_HUB_PATH },
  ];

  return (
    <>
      <SchemaMarkup schemas={buildEnglishHubSchemas()} />
      <Header locale="en" alternateHref={TOURISM_HUB_PATH} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill wrap href="/en/solutions" tag="Tourism" text="Hotels, tours, villas and rentals" />
            </div>
          }
          title={
            <>
              <WaveAccent>Tourism SEO</WaveAccent>
            </>
          }
          titleClassName="text-[1.85rem] min-[400px]:text-[2.15rem] sm:text-[2.7rem] lg:text-[3.2rem]"
          lead="Tourism SEO for hotels, villas, rent a car, tours, boat rental, transfers, restaurants and travel agencies. The traveller who searches on Google, on the map or in an AI answer should be able to book with you, not only through a platform that takes a commission."
          actions={
            <ServiceHeroActions
              locale="en"
              primaryHref="/en/get-started"
              primaryLabel="Free SEO audit"
              links={[
                { href: "/en/solutions", label: "Websites by industry" },
                { href: "/en/seo-services", label: "SEO services" },
                { href: "/en/work", label: "Work" },
              ]}
            />
          }
          panel={<IndustryAppPanel locale="en" kind="tourism" />}
          panelNote="Sample data inside AnotherSEOGuru App. Not a client account."
        />

        <WaveSection id="pressure" shot="pains" tinted>
          <WaveHeading
            eyebrow="The work"
            title={
              <>
                Why tourism search is a <WaveAccent>different job</WaveAccent>
              </>
            }
            lead="Three pressures show up on almost every tourism site we audit. The fix is specific to the business, which is why each vertical has its own page."
          />
          <ul className="mt-10 grid gap-5">
            {HUB_PAINS.map((item) => (
              <li key={item.problem} className="grid min-w-0 gap-6 rounded-[22px] border border-hairline bg-surface/60 p-6 sm:p-7 lg:grid-cols-2 lg:gap-10">
                <div className="min-w-0">
                  <p className="font-code text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">The pressure</p>
                  <h3 className="mt-2 text-balance text-[20px] font-bold text-foreground">{item.problem}</h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{item.problemBody}</p>
                </div>
                <div className="min-w-0 border-t border-hairline pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <p className="font-code text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">What changes</p>
                  <h3 className="mt-2 text-balance text-[20px] font-bold text-foreground">{item.solution}</h3>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-muted-foreground">{item.solutionBody}</p>
                </div>
              </li>
            ))}
          </ul>
        </WaveSection>

        <WaveSection id="verticals" shot="verticals">
          <WaveHeading
            eyebrow="Verticals"
            title={
              <>
                Choose the <WaveAccent>business you run</WaveAccent>
              </>
            }
            lead="Each one wins on different searches, with different pages and different schema. The Greek pages cover the same eight businesses."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENGLISH_VERTICALS.map((vertical) => (
              <li key={vertical.slug} className="min-w-0">
                <Link
                  href={enTourismPath(vertical.slug)}
                  className="flex h-full min-w-0 flex-col rounded-[22px] border border-hairline bg-surface/60 p-6 transition-colors hover:border-primary/40"
                >
                  <h3 className="flex items-start justify-between gap-3 text-balance text-[18px] font-bold text-foreground">
                    <span className="min-w-0">{vertical.name}</span>
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

        {projects.length > 0 ? (
          <WaveSection id="proof" shot="proof" tinted>
            <WaveHeading
              eyebrow="Work"
              title={
                <>
                  Tourism projects already <WaveAccent>in the portfolio</WaveAccent>
                </>
              }
              lead="Only work that already has a case study. No extra figures."
            />
            <WorkCards projects={projects} locale="en" />
          </WaveSection>
        ) : null}

        <WaveChoice locale="en" source="tourism-seo-en-hub-choice" />
        <WaveStats locale="en" />

        <ManagedFaq
          locale="en"
          title={
            <>
              Questions about <WaveAccent>tourism SEO</WaveAccent>
            </>
          }
          faqs={HUB_FAQS}
          askLabel="Talk on WhatsApp"
        />

        <WaveClose
          locale="en"
          source="tourism-seo-en-hub"
          title={
            <>
              Tell us the business <WaveAccent>and the destination</WaveAccent>
            </>
          }
          lead="The audit looks at your site and the searches around the place you serve. The proposal comes after that."
        />
      </main>
      <Footer locale="en" />
    </>
  );
}
