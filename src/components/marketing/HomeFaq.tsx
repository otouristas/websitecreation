import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { HOME_FAQ_ITEMS } from "@/data/home-faq-data";
import { EL_HOME_FAQ, elHome } from "@/data/translations/el-home";
import { generateFAQSchema } from "@/lib/seo/schema";
import type { SiteLocale } from "@/lib/i18n/locale";
import { Numeral, Section, SectionHeading } from "@/components/landing/primitives";
import { resolvePriceTokens } from "@/data/pricing";

/**
 * Homepage FAQ. The visible text and the FAQPage schema come from the same
 * source, which the AEO rules in docs/keyword-research require.
 */
export function HomeFaq({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  // Resolve `{{ENTRY_WEBSITE}}`-style price tokens once, so the visible answer
  // and the FAQPage schema below carry the same live figure.
  const items = (isEl ? EL_HOME_FAQ : HOME_FAQ_ITEMS).map((f) => ({
    ...f,
    answer: resolvePriceTokens(f.answer, locale),
  }));

  const schema = generateFAQSchema({
    faqs: items.map((f) => ({ question: f.question, answer: f.answer })),
  });

  return (
    <Section id="faq">
      <SchemaMarkup schemas={[schema]} />
      <SectionHeading
        eyebrow="FAQ"
        title={isEl ? elHome.faqTitle : "Questions buyers actually ask"}
        body={
          isEl
            ? "Άμεσες απαντήσεις για κόστος, SEO, GEO/AEO και χρόνο παράδοσης."
            : "Direct answers on cost, SEO, GEO/AEO and delivery time."
        }
      />
      <div className="glass mx-auto mt-12 max-w-3xl rounded-3xl px-5 sm:px-8">
        {items.map((f, i) => (
          <details
            key={f.question}
            className={`group ${i > 0 ? "border-t border-hairline" : ""}`}
          >
            <summary className="flex cursor-pointer list-none items-start gap-5 py-5 font-display text-base font-medium tracking-[-0.01em] text-foreground transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
              <Numeral n={i + 1} className="mt-1.5 shrink-0" />
              <span className="flex-1">{f.question}</span>
              <span
                className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-hairline text-muted-foreground transition-transform duration-200 group-open:rotate-45 group-open:border-brand/50 group-open:text-brand"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="pb-6 pl-[calc(1.25rem+2ch)] text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              {f.answer}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
