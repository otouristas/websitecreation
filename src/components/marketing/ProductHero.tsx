import Link from "next/link";
import { getAppPath } from "@/lib/app-links";

interface ProductHeroProps {
  readonly badge?: string;
  readonly title: string;
  readonly titleHighlight: string;
  readonly description: string;
}

export function ProductHero({ badge, title, titleHighlight, description }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-6 pb-16 lg:pt-8 lg:pb-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--glow),transparent)] opacity-80" />
      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        {badge ? (
          <p className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-semibold">
            {badge}
          </p>
        ) : null}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
          {title}{" "}
          <span className="gradient-text">{titleHighlight}</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={getAppPath("/signup")} className="btn btn-gradient px-8 py-4 text-base font-semibold w-full sm:w-auto" rel="noopener noreferrer">
            Start free
          </a>
          <a href={getAppPath("/login")} className="btn btn-outline px-8 py-4 text-base font-semibold w-full sm:w-auto" rel="noopener noreferrer">
            Log in
          </a>
          <Link href="/contact" className="btn btn-outline px-8 py-4 text-base font-semibold w-full sm:w-auto">
            Book agency call
          </Link>
        </div>
      </div>
    </section>
  );
}
