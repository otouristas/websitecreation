const testimonials = [
  {
    name: "Alex Martinez",
    handle: "@alexseo",
    text: "If you are doing SEO and have not tried this stack yet, the AI workflows and GSC views are a step change.",
  },
  {
    name: "Sarah Chen",
    handle: "@sarahseo",
    text: "Keyword clustering and rank tracking in one place — I wish we had consolidated sooner.",
  },
  {
    name: "Marcus Rodriguez",
    handle: "@marcusrank",
    text: "Moved weekly reporting off three tools. Faster reviews with leadership and clearer next steps.",
  },
] as const;

export function LandingTestimonials() {
  return (
    <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What teams say</h2>
          <p className="text-muted-foreground">Representative feedback from marketers using the platform.</p>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <li key={t.handle} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-foreground mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="text-sm font-semibold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.handle}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
