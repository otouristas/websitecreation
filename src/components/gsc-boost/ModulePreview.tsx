import type { SiteLocale } from "@/lib/i18n/locale";
import {
  AiVisibilityPreview,
  AssistantPreview,
  AuditPreview,
  CompetitorsPreview,
  ContentPreview,
  KeywordsPreview,
  OpportunitiesPreview,
  PerformancePreview,
  PipelinePreview,
  PreviewFrame,
  ReportPreview,
  Stage,
} from "@/components/kit";
import type { ModuleId } from "./modules";

const LABEL: Record<ModuleId, { en: string; el: string }> = {
  opportunities: {
    en: "The Opportunities list on a sample site: ranked fixes with estimated extra clicks per month.",
    el: "Η λίστα Ευκαιριών σε δείγμα ιστότοπου: διορθώσεις με σειρά προτεραιότητας και εκτίμηση επιπλέον κλικ ανά μήνα.",
  },
  performance: {
    en: "Clicks for a sample site, with comparisons and annotations.",
    el: "Κλικ για δείγμα ιστότοπου, με συγκρίσεις και σημειώσεις.",
  },
  keywords: {
    en: "Keyword ideas with volume, difficulty and current position, plus rank tracking.",
    el: "Ιδέες λέξεων-κλειδιών με όγκο αναζητήσεων, δυσκολία και τρέχουσα θέση, μαζί με παρακολούθηση θέσεων.",
  },
  content: {
    en: "A content brief and the draft optimizer with a WordPress publish action.",
    el: "Ένα content brief και ο βελτιστοποιητής κειμένου με δυνατότητα δημοσίευσης στο WordPress.",
  },
  audit: {
    en: "Site audit results: health score, issues by severity and Core Web Vitals.",
    el: "Αποτελέσματα ελέγχου ιστότοπου: βαθμολογία υγείας, προβλήματα ανά σοβαρότητα και Core Web Vitals.",
  },
  competitors: {
    en: "Keyword gap against competitors, with gap keywords and referring domains.",
    el: "Κενό λέξεων-κλειδιών έναντι ανταγωνιστών, με τις λέξεις-κλειδιά που λείπουν και τα referring domains.",
  },
  "ai-visibility": {
    en: "AI visibility: whether ChatGPT, Gemini, Perplexity and AI Overviews mention the brand.",
    el: "Ορατότητα στην AI: αν το ChatGPT, το Gemini, το Perplexity και τα AI Overviews αναφέρουν το brand.",
  },
  assistant: {
    en: "The AI assistant explaining a traffic change with the site’s own numbers.",
    el: "Ο βοηθός AI εξηγεί μια αλλαγή στην επισκεψιμότητα με τα νούμερα του ιστότοπου.",
  },
  agency: {
    en: "An agency pipeline with client deals, and a white-label monthly report.",
    el: "Ένα pipeline agency με deals πελατών και μια white-label μηνιαία αναφορά.",
  },
};

function Body({ id, locale }: { readonly id: ModuleId; readonly locale: SiteLocale }) {
  switch (id) {
    case "opportunities":
      return <OpportunitiesPreview locale={locale} />;
    case "performance":
      return <PerformancePreview locale={locale} />;
    case "keywords":
      return <KeywordsPreview locale={locale} />;
    case "content":
      return <ContentPreview locale={locale} />;
    case "audit":
      return <AuditPreview locale={locale} />;
    case "competitors":
      return <CompetitorsPreview locale={locale} />;
    case "ai-visibility":
      return <AiVisibilityPreview locale={locale} />;
    case "assistant":
      return <AssistantPreview locale={locale} />;
    case "agency":
      return (
        <div className="grid gap-3">
          <PipelinePreview locale={locale} />
          <div className="sm:ml-[12%]">
            <ReportPreview locale={locale} />
          </div>
        </div>
      );
  }
}

/** The kit preview that matches a module, on the dotted stage. */
export function ModulePreview({
  id,
  locale,
  footnote,
  className,
}: {
  readonly id: ModuleId;
  readonly locale: SiteLocale;
  readonly footnote?: string;
  readonly className?: string;
}) {
  return (
    <div className={className}>
      <Stage>
        <PreviewFrame label={LABEL[id][locale]}>
          <Body id={id} locale={locale} />
        </PreviewFrame>
      </Stage>
      {footnote ? <p className="mt-3 text-center text-[12px] text-muted-foreground">{footnote}</p> : null}
    </div>
  );
}
