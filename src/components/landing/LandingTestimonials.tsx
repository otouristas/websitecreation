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
          role: 'Ενοικίαση αυτοκινήτου, Πάρος',
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
              ? 'Αποτέλεσμα από έργα τουρισμού, ξενοδοχείων και ενοικίασης αυτοκινήτου.'
              : 'Results from tourism, hospitality and rent-a-car projects we delivered.'}
          </p>
        </div>
        <ul className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((t) => (
            <li key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-0.5 text-amber-400" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.363 1.118l1.286 3.958c.3.922-.755 1.688-1.539 1.118l-3.367-2.446a1 1 0 00-1.175 0l-3.367 2.446c-.783.57-1.838-.196-1.538-1.118l1.285-3.958a1 1 0 00-.363-1.118L2.02 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.951-.69l1.286-3.958z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <a
            href={isEl ? '/el/work' : '/en/work'}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {isEl ? 'Δείτε όλα τα έργα →' : 'See all projects →'}
          </a>
        </div>
      </div>
    </section>
  );
}
