import Link from "next/link";

export function AgencyBand() {
  return (
    <section className="py-20 lg:py-28 bg-foreground text-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-background/60 mb-3">Done-for-you SEO</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We also run campaigns as your agency</h2>
          <p className="text-lg text-background/80 mb-8 leading-relaxed">
            Need web design, local SEO, or full-service retainers? Our team builds fast sites and runs data-driven SEO
            for 500+ brands — while the platform keeps you in the loop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing" className="btn bg-background text-foreground hover:bg-background/90 px-8 py-3">
              Agency packages
            </Link>
            <Link href="/get-started" className="btn border-2 border-background/40 text-background hover:bg-background/10 px-8 py-3">
              Start a project
            </Link>
            <Link href="/services" className="btn border-2 border-background/40 text-background hover:bg-background/10 px-8 py-3">
              Browse services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
