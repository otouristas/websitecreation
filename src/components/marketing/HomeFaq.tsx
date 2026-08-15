import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { HOME_FAQ_ITEMS } from "@/data/home-faq-data";
import { EL_HOME_FAQ, elHome } from "@/data/translations/el-home";
import { generateFAQSchema } from "@/lib/seo/schema";
import type { SiteLocale } from "@/lib/i18n/locale";

interface HomeFaqProps {
  locale?: SiteLocale;
}

export function HomeFaq({ locale = "en" }: HomeFaqProps) {
  const isEl = locale === "el";
  const items = isEl ? EL_HOME_FAQ : HOME_FAQ_ITEMS;

  const schema = generateFAQSchema({
    faqs: items.map((f) => ({ question: f.question, answer: f.answer })),
  });

  return (
    <section className="border-t border-border py-20 lg:py-28">
      <SchemaMarkup schemas={[schema]} />
      <div className="container max-w-3xl">
        <h2 className="mb-3 text-center text-3xl font-bold md:text-4xl">
          {isEl ? elHome.faqTitle : "Questions buyers actually ask"}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-muted-foreground">
          {isEl
            ? "Άμεσες απαντήσεις για κόστος, SEO, GEO/AEO και χρόνο παράδοσης."
            : "Direct answers on cost, SEO, GEO/AEO, and delivery time."}
        </p>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card">
          {items.map((f) => (
            <details key={f.question} className="group px-5 py-1">
              <summary className="cursor-pointer list-none py-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {f.question}
                  <span className="mt-0.5 text-muted-foreground transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
