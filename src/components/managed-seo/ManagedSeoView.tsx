import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { KitBreadcrumbs } from "@/components/page-kit";
import {
  AnnouncePill,
  AppPanel,
  WaveAccent,
  WaveChoice,
  WaveClose,
  WaveHeading,
  WaveHero,
  WaveSection,
  WaveStats,
  WaveSteps,
} from "@/components/pages/platform-wave/ui";
import { ManagedFaq, RiskBuckets, ServiceHeroActions, type RiskTier } from "@/components/pages/services-wave/ui";
import { buildManagedSeoSchemas, getManagedSeoCopy, type ManagedSampleTask } from "@/data/managed-seo";
import type { SiteLocale } from "@/lib/i18n/locale";

function SampleTasks({
  tasks,
  tasksLabel,
  windowLabel,
}: {
  readonly tasks: readonly ManagedSampleTask[];
  readonly tasksLabel: string;
  readonly windowLabel: string;
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-hairline bg-background">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-4 py-3">
        <p className="text-[13px] font-semibold text-foreground">{tasksLabel}</p>
        <p className="text-[12px] text-muted-foreground">{windowLabel}</p>
      </div>
      <ul className="divide-y divide-hairline">
        {tasks.map((task) => (
          <li key={task.title} className="flex min-w-0 items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">{task.kind}</p>
              <p className="mt-1 text-pretty text-[14px] font-medium leading-snug text-foreground">{task.title}</p>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">{task.state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ManagedSeoView({ locale }: { readonly locale: SiteLocale }) {
  const copy = getManagedSeoCopy(locale);
  const tiers: readonly RiskTier[] = [
    {
      id: "risk-list",
      label: "",
      items: copy.risks.map((risk) => ({
        key: risk.key,
        title: risk.title,
        body: risk.body,
        href: risk.href,
      })),
    },
  ];
  const panel = (
    <AppPanel url="app.anotherseoguru.com/tasks" badge={copy.panelBadge} caption={copy.panelCaption}>
      <SampleTasks tasks={copy.sampleTasks} tasksLabel={copy.tasksLabel} windowLabel={copy.windowLabel} />
    </AppPanel>
  );

  return (
    <>
      <SchemaMarkup schemas={buildManagedSeoSchemas(locale)} />
      <Header locale={locale} alternateHref={copy.alternatePath} />
      <main className="blueprint-grid relative z-0 overflow-x-clip">
        <WaveHero
          pill={
            <div className="flex min-w-0 flex-col items-start gap-4">
              <KitBreadcrumbs
                align="left"
                items={[
                  { name: copy.homeName, url: locale === "el" ? "/el" : "/en" },
                  { name: copy.name, url: copy.path },
                ]}
              />
              <AnnouncePill href="#scope" tag={copy.pillTag} text={copy.pillText} wrap />
            </div>
          }
          title={
            locale === "el" ? (
              <>
                Η ομάδα SEO σας, <WaveAccent>μέσα στο App</WaveAccent>
              </>
            ) : (
              <>
                Your SEO team, <WaveAccent>inside the App</WaveAccent>
              </>
            )
          }
          titleClassName="text-[1.85rem] min-[400px]:text-[2.15rem] sm:text-[2.7rem] lg:text-[3.2rem]"
          lead={copy.lead}
          actions={<ServiceHeroActions locale={locale} primaryHref={copy.primaryHref} primaryLabel={copy.primaryLabel} links={copy.links} />}
          panel={panel}
          panelNote={copy.panelNote}
        />

        <WaveSection id="risks" shot="risks" tinted>
          <WaveHeading
            eyebrow={copy.risksEyebrow}
            title={
              <>
                {copy.risksTitle} <WaveAccent>{copy.risksAccent}</WaveAccent>
              </>
            }
            lead={copy.risksLead}
          />
          <RiskBuckets tiers={tiers} />
        </WaveSection>

        <WaveSteps
          id="scope"
          eyebrow={copy.stepsEyebrow}
          title={
            <>
              {copy.stepsTitle} <WaveAccent>{copy.stepsAccent}</WaveAccent>
            </>
          }
          lead={copy.stepsLead}
          steps={copy.steps}
        />

        <WaveSection id="app" shot="app">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <div className="min-w-0">
              <WaveHeading
                eyebrow={copy.appEyebrow}
                title={
                  <>
                    {copy.appTitle} <WaveAccent>{copy.appAccent}</WaveAccent>
                  </>
                }
                lead={copy.appLead}
              />
              <ul className="mt-8 space-y-3">
                {copy.appPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-pretty text-[15px] leading-relaxed text-foreground">
                    <span className="mt-1 text-primary" aria-hidden>
                      ✓
                    </span>
                    <span className="min-w-0">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-pretty text-[14.5px] leading-relaxed text-muted-foreground">{copy.appDisclaimer}</p>
            </div>
            <div className="min-w-0">{panel}</div>
          </div>
        </WaveSection>

        <WaveSection id="terms" shot="terms" tinted>
          <WaveHeading
            eyebrow={copy.termsEyebrow}
            title={
              <>
                {copy.termsTitle} <WaveAccent>{copy.termsAccent}</WaveAccent>
              </>
            }
            lead={copy.termsLead}
          />
          <ul className="mt-8 grid max-w-3xl gap-4">
            {copy.terms.map((term) => (
              <li key={term} className="rounded-[22px] border border-hairline bg-surface/70 px-5 py-4 text-pretty text-[16px] leading-relaxed text-foreground">
                {term}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px]">
            <Link href={copy.termsHref} className="font-medium text-foreground underline decoration-hairline underline-offset-4 hover:text-primary">
              {copy.termsLinkLabel}
            </Link>
          </p>
        </WaveSection>

        <WaveChoice locale={locale} source={copy.choiceSource} />
        <WaveStats locale={locale} />

        <ManagedFaq
          locale={locale}
          title={
            <>
              {copy.faqTitle} <WaveAccent>{copy.faqAccent}</WaveAccent>
            </>
          }
          faqs={copy.faqs}
          askLabel={copy.askLabel}
        />

        <WaveClose
          locale={locale}
          source={copy.source}
          title={
            <>
              {copy.closeTitle} <WaveAccent>{copy.closeAccent}</WaveAccent>
            </>
          }
          lead={copy.closeLead}
        />
      </main>
      <Footer locale={locale} />
    </>
  );
}
