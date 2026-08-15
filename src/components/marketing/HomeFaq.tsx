import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { HOME_FAQ_ITEMS } from "@/data/home-faq-data";
import { EL_HOME_FAQ, elHome } from "@/data/translations/el-home";
import { generateFAQSchema } from "@/lib/seo/schema";
import type { SiteLocale } from "@/lib/i18n/locale";
import { Section, SectionHeading } from "@/components/landing/primitives";

/**
 * Homepage FAQ. The visible text and the FAQPage schema come from the same
 * source, which the AEO rules in docs/keyword-research require.
 */
export function HomeFaq({ locale = "en" }: { locale?: SiteLocale }) {
  const isEl = locale === "el";
  const items = isEl ? EL_HOME_FAQ : HOME_FAQ_ITEMS;

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
      <div className="mx-auto mt-12 max-w-2xl rounded-[14px] border border-hairline bg-surface px-5 sm:px-7">
        {items.map((f, i) => (
          <details
            key={f.question}
            className={`group ${i > 0 ? "border-t border-hairline" : ""}`}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-sm font-medium tracking-[-0.01em] text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
              {f.question}
              <span
                className="mt-0.5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45"
                aria-hidden
              >
                +
              </span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
