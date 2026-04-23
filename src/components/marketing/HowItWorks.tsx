interface Step {
  readonly step: number;
  readonly title: string;
  readonly description: string;
}

interface HowItWorksProps {
  readonly heading: string;
  readonly subheading?: string;
  readonly steps: readonly Step[];
}

export function HowItWorks({ heading, subheading, steps }: HowItWorksProps) {
  return (
    <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
      <div className="container max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          {subheading ? <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheading}</p> : null}
        </div>
        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.step} className="relative rounded-2xl border border-border bg-background p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold mb-4">
                {s.step}
              </span>
              <h3 className="font-semibold text-lg text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
