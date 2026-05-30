const testimonials = [
    {
        quote: "AnotherSEOGuru transformed our organic traffic. We saw a 340% increase in just 6 months!",
        author: "Maria Papadopoulos",
        role: "CEO, TechStart Greece",
        rating: 5,
        avatar: "MP",
        stats: "+340% Traffic",
    },
    {
        quote: "Their AI-powered approach to SEO is next-level. We're now ranking for keywords we never thought possible.",
        author: "Nikos Andreou",
        role: "Marketing Director, EuroRetail",
        rating: 5,
        avatar: "NA",
        stats: "+180 Keywords",
    },
    {
        quote: "Professional, data-driven, and results-focused. The best SEO investment we've ever made.",
        author: "Elena Koutsou",
        role: "Founder, HealthFirst",
        rating: 5,
        avatar: "EK",
        stats: "+520% ROI",
    },
    {
        quote: "Our local visibility improved dramatically. Now we dominate the map pack for all target areas.",
        author: "Dimitris Alexiou",
        role: "Owner, Athens Properties",
        rating: 5,
        avatar: "DA",
        stats: "#1 Map Pack",
    },
    {
        quote: "The team's technical expertise fixed issues we didn't even know we had. Our site is faster than ever.",
        author: "Sofia Nikolaou",
        role: "CTO, FastCommerce",
        rating: 5,
        avatar: "SN",
        stats: "95+ PageSpeed",
    },
    {
        quote: "Transparent reporting and genuine partnership. They feel like an extension of our team.",
        author: "Yiannis Petridis",
        role: "CMO, GlobalFinance",
        rating: 5,
        avatar: "YP",
        stats: "+250% Leads",
    },
];

export default function Testimonials() {
    return (
        <section className="section" id="testimonials">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                        Client Success Stories
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Trusted by{' '}
                        <span className="gradient-text">500+ Businesses</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Don't just take our word for it. See what our clients have to say about
                        their experience working with AnotherSEOGuru.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <article
                            key={testimonial.author}
                            className="card p-6 hover-glow flex flex-col"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Stats Badge */}
                            <div className="inline-flex self-start px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                                {testimonial.stats}
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-warning"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <blockquote className="text-lg mb-6 flex-grow">
                                <p className="text-foreground/90 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center gap-4 pt-4 border-t border-border">
                                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-semibold">{testimonial.author}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Trust Logos */}
                <div className="mt-16 pt-16 border-t border-border">
                    <p className="text-center text-muted-foreground mb-8">
                        Trusted by leading brands across industries
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
                        {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'].map((partner) => (
                            <div
                                key={partner}
                                className="h-8 px-6 flex items-center justify-center text-muted-foreground font-semibold"
                            >
                                {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
