import Link from 'next/link';

export default function Hero() {
    return (
        <section className="section-hero bg-pattern" id="hero">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-shimmer">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Now offering AI-powered SEO Strategies
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                        Dominate Search Results with{' '}
                        <span className="gradient-text">Data-Driven SEO</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        We transform your online presence with cutting-edge SEO strategies,
                        AI-powered insights, and proven techniques that drive organic traffic
                        and boost conversions.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="#contact" className="btn btn-gradient text-lg px-8 py-4 shadow-glow hover:shadow-xl animate-pulse-glow">
                            Start Your Free Audit
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link href="#services" className="btn btn-outline text-lg px-8 py-4">
                            Explore Services
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-border/50">
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">500+</div>
                            <div className="text-sm text-muted-foreground">Clients Served</div>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-border" />
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">10M+</div>
                            <div className="text-sm text-muted-foreground">Keywords Ranked</div>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-border" />
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">98%</div>
                            <div className="text-sm text-muted-foreground">Client Retention</div>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-border" />
                        <div className="text-center">
                            <div className="text-3xl font-bold gradient-text">5★</div>
                            <div className="text-sm text-muted-foreground">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
