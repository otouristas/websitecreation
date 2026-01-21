const services = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        title: 'Technical SEO',
        description: 'Comprehensive site audits, crawlability fixes, schema markup, Core Web Vitals optimization, and mobile-first indexing.',
        features: ['Site Speed Optimization', 'Mobile Responsiveness', 'Structured Data'],
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        title: 'Content Strategy',
        description: 'AI-powered content creation, keyword research, topic clustering, and content optimization for maximum engagement.',
        features: ['Keyword Research', 'Blog Writing', 'Content Optimization'],
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        ),
        title: 'Link Building',
        description: 'White-hat link acquisition, digital PR, guest posting, and authority building to boost your domain rating.',
        features: ['Guest Posting', 'Digital PR', 'Authority Building'],
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: 'Local SEO',
        description: 'Google Business Profile optimization, local citations, review management, and geo-targeted content.',
        features: ['GBP Optimization', 'Citation Building', 'Review Management'],
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        title: 'Analytics & Reporting',
        description: 'Custom dashboards, GSC integration, competitor analysis, and actionable insights for data-driven decisions.',
        features: ['Custom Dashboards', 'GSC Integration', 'ROI Tracking'],
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: 'AI SEO Innovation',
        description: 'LLM optimization, AI content detection, automated insights, and next-gen search visibility strategies.',
        features: ['LLM Optimization', 'AI Content Strategy', 'Automation'],
    },
];

export default function Services() {
    return (
        <section className="section bg-muted/30 bg-pattern" id="services">
            <div className="container">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Our Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Comprehensive SEO Solutions for{' '}
                        <span className="gradient-text">Sustainable Growth</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        From technical optimization to content strategy, we offer end-to-end SEO
                        services tailored to your business goals.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <article
                            key={service.title}
                            className="card p-6 lg:p-8 hover-glow group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-smooth">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

                            {/* Description */}
                            <p className="text-muted-foreground mb-6">{service.description}</p>

                            {/* Features */}
                            <ul className="space-y-2">
                                {service.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <a href="#contact" className="btn btn-gradient text-lg px-8 py-4">
                        Get Your Custom Strategy
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
