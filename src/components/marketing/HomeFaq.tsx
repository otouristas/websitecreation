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
    <section className="py-20 lg:py-28 border-t border-border">
      <SchemaMarkup schemas={[schema]} />
      <div className="container max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          {isEl ? elHome.faqTitle : "Frequently asked questions"}
        </h2>
        <dl className="space-y-8">
          {items.map((f) => (
            <div key={f.question}>
              <dt className="font-semibold text-foreground mb-2">{f.question}</dt>
              <dd className="text-muted-foreground leading-relaxed">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
