import SchemaMarkup from "@/components/seo/SchemaMarkup";
import { HOME_FAQ_ITEMS } from "@/data/home-faq-data";
import { generateFAQSchema } from "@/lib/seo/schema";

export function HomeFaq() {
  const schema = generateFAQSchema({
    faqs: HOME_FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  });
  return (
    <section className="py-20 lg:py-28 border-t border-border">
      <SchemaMarkup schemas={[schema]} />
      <div className="container max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
        <dl className="space-y-8">
          {HOME_FAQ_ITEMS.map((f) => (
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
