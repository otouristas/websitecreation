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
import { ManagedFaq, ServiceHeroActions } from "@/components/pages/services-wave/ui";
import { buildHowItWorksSchemas, getHowItWorksCopy, type HowItWorksCopy } from "@/data/how-it-works";
import type { SiteLocale } from "@/lib/i18n/locale";

function ShipMarker({
  before,
  marker,
  after,
}: {
  readonly before: string;
  readonly marker: string;
  readonly after: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex justify-center">
        <span className="max-w-full rounded-full bg-primary px-2.5 py-0.5 text-center text-[11px] font-semibold text-primary-foreground">
          {marker}
        </span>
      </div>
      <div className="mx-auto mt-1 h-6 w-px bg-primary" aria-hidden />
      <div className="h-px w-full bg-foreground/25" aria-hidden />
      <div className="mt-2 flex items-start justify-between gap-3 text-[12px] leading-snug text-muted-foreground">
        <span className="min-w-0">{before}</span>
        <span className="min-w-0 text-right">{after}</span>
      </div>
    </div>
  );
}

function FlowSample({ copy }: { readonly copy: HowItWorksCopy }) {
  const rows = [
    { label: copy.sample.briefLabel, value: copy.sample.brief },
    { label: copy.sample.pageLabel, value: copy.sample.page, code: true },
    { label: copy.sample.queryLabel, value: copy.sample.query },
    { label: copy.sample.priorityLabel, value: copy.sample.priority },
  ];
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-hairline bg-background">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline px-4 py-3">
        <p className="min-w-0 text-pretty text-[13px] font-semibold text-foreground">{copy.sample.taskTitle}</p>
        <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">{copy.sample.status}</span>
      </div>
      <dl className="divide-y divide-hairline">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[minmax(5.5rem,0.38fr)_minmax(0,1fr)] gap-3 px-4 py-2.5">
            <dt className="text-[12px] font-medium text-muted-foreground">{row.label}</dt>
            <dd className={`min-w-0 text-pretty text-[14px] text-foreground ${row.code ? "break-all font-code text-[13px]" : ""}`}>{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-hairline px-4 py-4">
        <p className="text-[12px] font-medium text-muted-foreground">{copy.sample.chartLabel}</p>
        <div className="mt-3">
          <ShipMarker before={copy.sample.before} marker={copy.sample.marker} after={copy.sample.after} />
        </div>
      </div>
    </div>
  );
}

export function HowItWorksView({ locale }: { readonly locale: SiteLocale }) {
  const copy = getHowItWorksCopy(locale);
  const panel = (
    <AppPanel url="app.anotherseoguru.com/tasks" badge={copy.panelBadge} caption={copy.panelCaption}>
      <FlowSample copy={copy} />
    </AppPanel>
  );

  return (
    <>
      <SchemaMarkup schemas={buildHowItWorksSchemas(locale)} />
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
              <AnnouncePill href="#flow" tag={copy.pillTag} text={copy.pillText} wrap />
            </div>
          }
          title={
            locale === "el" ? (
              <>
                Πώς <WaveAccent>λειτουργεί</WaveAccent>
              </>
            ) : (
              <>
                How it <WaveAccent>works</WaveAccent>
              </>
            )
          }
          lead={copy.lead}
          actions={<ServiceHeroActions locale={locale} primaryHref={copy.primaryHref} primaryLabel={copy.primaryLabel} links={copy.links} />}
          panel={panel}
          panelNote={copy.panelNote}
        />

        <WaveSteps
          id="flow"
          eyebrow={copy.stepsEyebrow}
          title={
            <>
              {copy.stepsTitle} <WaveAccent>{copy.stepsAccent}</WaveAccent>
            </>
          }
          lead={copy.stepsLead}
          steps={copy.steps}
        />

        <WaveSection id="measure" shot="measure">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="min-w-0">
              <WaveHeading
                eyebrow={copy.measureEyebrow}
                title={
                  <>
                    {copy.measureTitle} <WaveAccent>{copy.measureAccent}</WaveAccent>
                  </>
                }
                lead={copy.measureLead}
              />
              <p className="mt-6 text-pretty text-[15px] leading-relaxed text-muted-foreground">{copy.measureDisclaimer}</p>
            </div>
            <div className="min-w-0">
              {panel}
              <p className="mt-4 text-pretty text-center text-[13px] leading-relaxed text-muted-foreground">{copy.chartNote}</p>
            </div>
          </div>
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
