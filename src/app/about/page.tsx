import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
    title: 'About Our Web Design Agency',
    description: 'Meet AnotherSEOGuru — web designers and SEO specialists building fast, beautiful websites that drive real business results. 500+ sites delivered. 98% satisfaction.',
    path: '/about',
});

const values = [
    {
        title: 'Speed First',
        description: 'Every website we build is optimized for performance. Fast sites rank better and convert more visitors.',
        icon: '⚡',
    },
    {
        title: 'SEO Built-In',
        description: 'We don\'t bolt SEO on at the end. It\'s part of our process from day one - structure, content, technical.',
        icon: '🔍',
    },
    {
        title: 'Transparent Pricing',
        description: 'No hidden fees, no surprises. You know exactly what you\'re getting and what it costs upfront.',
        icon: '💎',
    },
    {
        title: 'Results Focused',
        description: 'A pretty website is useless if it doesn\'t convert. We design for business outcomes, not awards.',
        icon: '📈',
    },
];

const stats = [
    { value: '500+', label: 'Websites Delivered' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Industries Served' },
    { value: '2-4', label: 'Weeks to Launch' },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className="main-below-header">
                {/* Hero */}
                <section className="section-compact gradient-hero">
                    <div className="container">
                        <div className="max-w-3xl">
                            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                                <Link href="/" className="hover:text-primary">Home</Link>
                                <span>/</span>
                                <span className="text-foreground">About</span>
                            </nav>

                            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                                We Build Websites That Actually Work
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                AnotherSEOGuru is a web design and SEO agency focused on one thing:
                                helping businesses succeed online with fast, beautiful, search-optimized websites.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="section -mt-8">
                    <div className="container">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {stats.map((stat) => (
                                <div key={stat.label} className="card p-6 text-center">
                                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Story */}
                <section className="section">
                    <div className="container">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                                    Our Story
                                </span>
                                <h2 className="text-3xl font-bold mb-6">
                                    From Frustration to Solution
                                </h2>
                                <div className="space-y-4 text-muted-foreground">
                                    <p>
                                        We started AnotherSEOGuru because we were tired of seeing businesses
                                        get ripped off by agencies that deliver slow, outdated websites that
                                        don&apos;t rank or convert.
                                    </p>
                                    <p>
                                        Too many web designers focus on making things look pretty while
                                        completely ignoring performance and search optimization. The result?
                                        Beautiful websites that nobody can find.
                                    </p>
                                    <p>
                                        We took a different approach. Every site we build starts with speed
                                        and SEO as the foundation. Then we add great design on top. The result
                                        is websites that look amazing AND actually drive business results.
                                    </p>
                                </div>
                            </div>
                            <div className="card p-8 bg-muted/50">
                                <blockquote className="text-lg italic mb-4">
                                    &quot;A website that nobody can find is a website that doesn&apos;t exist.
                                    We build sites that get discovered.&quot;
                                </blockquote>
                                <div className="font-semibold">The AnotherSEOGuru Team</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="section bg-muted/30">
                    <div className="container">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">What We Believe</h2>
                            <p className="text-muted-foreground">Our core principles guide everything we do</p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value) => (
                                <div key={value.title} className="card p-6 text-center">
                                    <div className="text-4xl mb-4">{value.icon}</div>
                                    <h3 className="font-semibold mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted-foreground">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Process */}
                <section className="section">
                    <div className="container max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">How We Work</h2>
                            <p className="text-muted-foreground">A simple, transparent process from start to finish</p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { step: '01', title: 'Discovery', description: 'We learn about your business, goals, and target audience. You choose your package and provide content.' },
                                { step: '02', title: 'Design', description: 'We create a custom design tailored to your brand. You review and provide feedback.' },
                                { step: '03', title: 'Development', description: 'We build your site with speed and SEO baked in. Every page is optimized for performance.' },
                                { step: '04', title: 'Launch', description: 'We launch your site and make sure everything works perfectly. You start getting found online.' },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-6 items-start">
                                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section gradient-primary text-white">
                    <div className="container text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            Let&apos;s build a website that actually drives results for your business.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/pricing" className="btn bg-white text-primary hover:bg-white/90">
                                View Pricing
                            </Link>
                            <Link href="/get-started" className="btn border-2 border-white text-white hover:bg-white/10">
                                Start Your Project
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
