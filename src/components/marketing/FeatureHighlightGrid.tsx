import Link from "next/link";
import type { MarketingFeature } from "@/data/marketing-features";

interface FeatureHighlightGridProps {
  readonly heading: string;
  readonly subheading?: string;
  readonly features: readonly MarketingFeature[];
  readonly limit?: number;
}

export function FeatureHighlightGrid({ heading, subheading, features, limit = 6 }: FeatureHighlightGridProps) {
  const items = features.slice(0, limit);
  return (
    <section className="py-20 lg:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          {subheading ? <p className="text-lg text-muted-foreground">{subheading}</p> : null}
        </div>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/platform/features/${f.slug}`}
                className="block h-full rounded-2xl border border-border p-6 hover:border-primary/40 hover:bg-muted/20 transition-smooth group"
              >
                <h3 className="font-semibold text-foreground group-hover:text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{f.shortDescription}</p>
                <span className="mt-4 inline-block text-sm font-medium text-primary">Learn more →</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-10">
          <Link href="/platform/features" className="btn btn-outline px-8">
            View all capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}
