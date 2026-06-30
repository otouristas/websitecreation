const testimonials = [
  {
    name: 'Aggelos Rentals',
    role: 'Rent-a-car, Paros',
    text: 'Our new site handles fleet browsing and island SEO properly - bookings come directly instead of only through aggregators.',
  },
  {
    name: 'Villa Olivia Clara',
    role: 'Luxury villa, Greece',
    text: 'The design matches our brand and ranks for international villa searches. Inquiry quality improved within the first season.',
  },
  {
    name: 'Discover Cyclades',
    role: 'Travel guide',
    text: 'Content hubs and internal linking brought steady organic growth across island pages - exactly the architecture we needed.',
  },
] as const;

interface LandingTestimonialsProps {
  locale?: 'en' | 'el';
}

export function LandingTestimonials({ locale = 'en' }: LandingTestimonialsProps) {
  const isEl = locale === 'el';

  const items = isEl
    ? [
        {
          name: 'Aggelos Rentals',
          role: 'Rent-a-car, Πάρος',
          text: 'Η νέα ιστοσελίδα δείχνει τον στόλο σωστά και κατατάσσει για αναζητήσεις στο νησί - περισσότερες άμεσες κρατήσεις.',
        },
        {
          name: 'Villa Olivia Clara',
          role: 'Πολυτελής βίλα',
          text: 'Design που ταιριάζει στο brand μας και κατάταξη για διεθνείς αναζητήσεις βίλας. Καλύτερα leads από την πρώτη σεζόν.',
        },
        {
          name: 'Discover Cyclades',
          role: 'Ταξιδιωτικός οδηγός',
          text: 'Content hubs και internal linking έφεραν σταθερή οργανική ανάπτυξη στις σελίδες νησιών.',
        },
      ]
    : testimonials;

  return (
    <section className="py-[var(--marketing-section-y)] lg:py-[var(--marketing-section-y-lg)] bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isEl ? 'Τι λένε οι πελάτες μας' : 'What our clients say'}
          </h2>
          <p className="text-muted-foreground">
            {isEl
              ? 'Αποτέλεσμα από έργα τουρισμού, ξενοδοχείων και rent-a-car.'
              : 'Results from tourism, hospitality and rent-a-car projects we delivered.'}
          </p>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((t) => (
            <li key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <p className="text-foreground mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="text-sm font-semibold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
