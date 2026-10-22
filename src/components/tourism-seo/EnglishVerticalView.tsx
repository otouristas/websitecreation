import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { RichText } from "@/components/place-seo/rich-text";
import { KitBreadcrumbs } from "@/components/page-kit";
import { AnnouncePill, WaveAccent, WaveChoice, WaveClose, WaveHeading, WaveHero, WaveSection, WaveStats } from "@/components/pages/platform-wave/ui";
import { ManagedFaq, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { accentSuffix, IndustryAppPanel, WorkCards } from "@/components/pages/industry-wave/ui";
import { ChipLinks } from "@/components/service-kit";
import {
  buildEnglishVerticalSchemas,
  ENGLISH_VERTICALS,
  EN_TOURISM_HUB_NAME,
  EN_TOURISM_HUB_PATH,
  enTourismPath,
  liveTourismProjects,
  type EnglishTourismVertical,
} from "@/data/tourism-seo/en";
import { tourismPath } from "@/data/tourism-seo";

export function EnglishVerticalView({ vertical }: { readonly vertical: EnglishTourismVertical }) {
  const projects = liveTourismProjects(vertical.workSlugs);
  const siblings = ENGLISH_VERTICALS.filter((other) => other.slug !== vertical.slug).map((other) => ({
    href: enTourismPath(other.slug),
    label: other.name,
  }));
  const breadcrumbs = [
    { name: "Home", url: "/en" },
    { name: EN_TOURISM_HUB_NAME, url: EN_TOURISM_HUB_PATH },
    { name: vertical.name, url: enTourismPath(vertical.slug) },
  ];

  return (
    <>
      <SchemaMarkup schemas={buildEnglishVerticalSchemas(vertical)} />
      <Header locale="en" alternateHref={tourismPath(vertical.elSlug)} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex flex-col items-start gap-4">
              <KitBreadcrumbs items={breadcrumbs} align="left" />
              <AnnouncePill wrap href={EN_TOURISM_HUB_PATH} tag={vertical.name} text="Tourism SEO" />
            </div>
          }
          title={accentSuffix(vertical.h1, vertical.h1Accent)}
          titleClassName="text-[1.65rem] min-[400px]:text-[1.9rem] sm:text-[2.35rem] lg:text-[2.8rem]"
          lead={vertical.lead}
          actions={
            <ServiceHeroActions
              locale="en"
              primaryHref="/en/get-started"
              primaryLabel="Free SEO audit"
              links={[
                { href: EN_TOURISM_HUB_PATH, label: "All tourism SEO" },
                { href: "/en/work", label: "Work" },
                { href: "/en/seo-services", label: "SEO services" },
              ]}
            />
          }
          panel={<IndustryAppPanel locale="en" kind={vertical.sampleKind} />}
          panelNote="Sample data inside AnotherSEOGuru App. Not a client account."
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
            eyebrow="Included"
            title={
              <>
                What <WaveAccent>{vertical.name} SEO</WaveAccent> includes
              </>
            }
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
            eyebrow="Searches"
            title={
              <>
                The searches <WaveAccent>this work targets</WaveAccent>
              </>
            }
            lead="Patterns with a booking in them. The list for your business comes from Search Console and the audit, not from this page."
          />
          <ChipLinks className="mt-8" items={vertical.searches.map((label) => ({ label }))} />
        </WaveSection>

        <WaveSection id="places" shot="places">
          <WaveHeading
            eyebrow="Places"
            title={
              <>
                What changes <WaveAccent>by destination</WaveAccent>
              </>
            }
            lead="We do not open a page per village with the same paragraph and a new name. These notes say what is different, and link to the local SEO page for that place."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {vertical.regions.map((region) => (
              <li key={region.href + region.label} className="min-w-0">
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
        </WaveSection>

        {projects.length > 0 ? (
          <WaveSection shot="proof" tinted>
            <WaveHeading
              eyebrow="Work"
              title={
                <>
                  Related work from <WaveAccent>the portfolio</WaveAccent>
                </>
              }
              lead="Only projects that already appear on the work pages. No extra numbers."
            />
            <WorkCards projects={projects} locale="en" />
          </WaveSection>
        ) : null}

        <WaveChoice locale="en" source={`tourism-seo-en-${vertical.slug}-choice`} />
        <WaveStats locale="en" />

        <ManagedFaq
          locale="en"
          title={
            <>
              Questions about <WaveAccent>{vertical.name} SEO</WaveAccent>
            </>
          }
          faqs={vertical.faqs}
          askLabel="Talk on WhatsApp"
        />

        <WaveSection id="related" shot="related">
          <WaveHeading
            eyebrow="Related"
            title={
              <>
                Read <WaveAccent>next</WaveAccent>
              </>
            }
          />
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
              eyebrow="Other businesses"
              title={
                <>
                  Tourism SEO for <WaveAccent>other verticals</WaveAccent>
                </>
              }
            />
          </div>
          <ChipLinks className="mt-8" items={siblings} />
          <p className="mt-6 text-[15px] text-muted-foreground">
            <Link href={tourismPath(vertical.elSlug)} className="font-medium text-primary underline-offset-4 hover:underline">
              Greek page for this business
            </Link>
          </p>
        </WaveSection>

        <WaveClose
          locale="en"
          source={`tourism-seo-en-${vertical.slug}`}
          title={
            <>
              Start with a <WaveAccent>free audit</WaveAccent>
            </>
          }
          lead="Send the site. You will see where direct bookings leak before you commit to the work."
        />
      </main>
      <Footer locale="en" />
    </>
  );
}
