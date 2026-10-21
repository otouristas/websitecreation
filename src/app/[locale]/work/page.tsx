import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Briefcase, Globe2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WorkIndexClient } from "@/components/work/WorkIndexClient";
import { buildMetadata, generateCollectionPageSchema } from "@/lib/seo";
import { BASE_URL } from "@/lib/seo/schema";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { isValidLocale, localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { MARKET_COUNT, PROJECT_COUNT } from "@/data/company-facts";
import { HOME_LOGOS } from "@/data/home-content";
import { PORTFOLIO_CATEGORIES, portfolioProjects } from "@/data/portfolio";
import { homeCopy } from "@/components/pages/home/copy";
import { CtaBand, TrustLine } from "@/components/kit";
import { WaveEyebrow, WaveHero } from "@/components/pages/platform-wave/ui";
import { accentEnd } from "@/components/pages/services-wave/ui";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  if (locale === "el") {
    return buildMetadata({
      title: "Έργα & Portfolio - Τουρισμός, Ξενοδοχεία & Ενοικίαση Αυτοκινήτου",
      description:
        `${PROJECT_COUNT} έργα ιστοσελίδων για ξενοδοχεία, ενοικίαση αυτοκινήτου, εκδρομές, βίλες και travel AI. Δείτε το portfolio μας με SEO βελτιστοποιημένα έργα σε Ελλάδα και Ευρώπη.`,
      path: localizedPath("el", "/work"),
      primaryKeyword: "τουριστικές ιστοσελίδες portfolio",
      hreflangPath: "/work",
    });
  }

  return buildMetadata({
    title: "Portfolio - Tourism, Hotels & Rent-a-car",
    description:
      `${PROJECT_COUNT} website projects for hotels, rent-a-car, tours, villas and travel AI. Browse our portfolio of SEO-optimized tourism projects across Greece, the UK, the US and Europe.`,
    path: localizedPath("en", "/work"),
    primaryKeyword: "tourism website portfolio",
    hreflangPath: "/work",
  });
}

export default async function WorkPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const siteLocale = locale as SiteLocale;
  const isEl = locale === "el";
  const lp = (path: string) => localizedPath(siteLocale, path);
  const copy = homeCopy(siteLocale);
  // The index emits one CreativeWork per portfolio entry, one type across the
  // whole list, which is what makes the set readable.
  const collectionSchema = generateCollectionPageSchema({
    name: locale === "el" ? "Έργα & Portfolio" : "Portfolio",
    url: `${BASE_URL}${lp("/work")}`,
    inLanguage: locale,
    items: portfolioProjects.map((project) => ({
      url: `${BASE_URL}${lp(`/work/${project.slug}`)}`,
      name: project.name,
      itemType: "CreativeWork",
    })),
  });

  const spotlight = portfolioProjects.find((project) => project.slug === "villa-olivia-clara") ?? portfolioProjects[0];
  const spotlightCategory = PORTFOLIO_CATEGORIES[spotlight.category];
  const domain = spotlight.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <>
      <SchemaMarkup schemas={[collectionSchema]} />
      <Header locale={siteLocale} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <WaveEyebrow>
              {isEl ? "ΤΟ PORTFOLIO ΜΑΣ" : "OUR PORTFOLIO"} / {portfolioProjects.length} {isEl ? "ΕΡΓΑ" : "PROJECTS"}
            </WaveEyebrow>
          }
          title={accentEnd(isEl ? "Διαφορετικές επιχειρήσεις. Ξεχωριστές ιστορίες." : "Different businesses. Distinctive stories.", 2)}
          titleClassName="text-[1.75rem] min-[400px]:text-[2rem] sm:text-[2.6rem] lg:text-[3.15rem]"
          lead={
            isEl
              ? "Ξενοδοχεία, τοπικές επιχειρήσεις, τουριστικές πλατφόρμες και ψηφιακά προϊόντα. Γνωρίστε τα έργα, το κοινό τους και την εμπειρία πίσω από κάθε ιστοσελίδα."
              : "Hotels, local businesses, travel platforms and digital products. Meet the projects, understand their audiences and explore each website experience."
          }
          trust={
            <TrustLine
              align="left"
              items={[
                { icon: Briefcase, label: isEl ? `${portfolioProjects.length} έργα` : `${portfolioProjects.length} projects` },
                { icon: Globe2, label: isEl ? `${MARKET_COUNT} αγορές` : `${MARKET_COUNT} markets` },
              ]}
            />
          }
          panel={
            <Link
              href={lp(`/work/${spotlight.slug}`)}
              className="group block min-w-0 overflow-hidden rounded-[22px] border border-hairline bg-surface/80 shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent),0_30px_80px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)] outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="flex items-center gap-2 border-b border-hairline px-3 py-3 sm:px-4">
                <span className="size-2.5 shrink-0 rounded-full bg-muted-foreground/30" aria-hidden />
                <span className="size-2.5 shrink-0 rounded-full bg-muted-foreground/30" aria-hidden />
                <span className="size-2.5 shrink-0 rounded-full bg-muted-foreground/30" aria-hidden />
                <div className="ml-2 min-w-0 flex-1 truncate rounded-md bg-foreground/5 px-3 py-1 font-code text-[11px] text-muted-foreground">{domain}</div>
              </div>
              <div className="relative aspect-[16/10]">
                <Image
                  src={spotlight.screenshot}
                  alt={isEl ? `Η ιστοσελίδα ${spotlight.name}` : `${spotlight.name} website`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 640px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
                <span className="min-w-0">
                  <span className="block truncate font-display text-[17px] font-semibold tracking-tight text-foreground">{spotlight.name}</span>
                  <span className="mt-1 block text-[12px] text-muted-foreground">{isEl ? spotlightCategory.labelEl : spotlightCategory.label}</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-primary">
                  {isEl ? "Δείτε το έργο" : "Explore project"}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          }
        />

        <section data-shot="logos" className="border-y border-hairline bg-surface/40">
          <div className="mx-auto max-w-[1240px] px-5 py-9 lg:px-8">
            <p className="mb-7 text-center text-[13px] font-medium tracking-[0.01em] text-muted-foreground">{copy.trustIntro}</p>
            <div className="home-logo-rail">
              <div className="home-logo-track">
                {[false, true].map((hidden) => (
                  <ul
                    key={String(hidden)}
                    className={`home-logo-run flex shrink-0 items-center gap-x-10 pr-10 sm:gap-x-16 sm:pr-16 ${hidden ? "home-logo-copy" : ""}`}
                    aria-hidden={hidden || undefined}
                  >
                    {HOME_LOGOS.map((logo) => (
                      <li key={`${logo.alt}-${hidden}`} className="flex h-12 shrink-0 items-center justify-center sm:h-16">
                        <Image
                          src={logo.src}
                          alt={hidden ? "" : logo.alt}
                          width={220}
                          height={64}
                          unoptimized
                          loading={hidden ? "lazy" : "eager"}
                          className="home-logo"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section data-shot="work" className="scroll-mt-28">
          <div className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
            <WorkIndexClient locale={siteLocale} />
          </div>
        </section>

        <div data-shot="cta">
          <CtaBand locale={siteLocale} source="work-band" />
        </div>
      </main>
      <Footer locale={siteLocale} />
    </>
  );
}
