import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { tier1Locations } from '@/data/locations';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Fast Website Creation | SEO Web Design Agency',
  description: 'High-performance websites that drive real business results. SEO-optimized from the ground up. Website creation, redesign, logos & content creation.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center bg-pattern overflow-hidden pt-32">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="container relative z-10 py-16">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-primary">Fast. SEO-Optimized. Results-Driven.</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Websites That{' '}
                <span className="gradient-text">Load Fast</span> and{' '}
                <span className="gradient-text">Rank</span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8">
                Your business deserves a website that looks great, loads instantly,
                and gets found by customers. We build beautiful, high-performance
                websites optimized for search from day one.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/get-started" className="btn btn-gradient text-lg px-8 py-4 shadow-glow">
                  Start Your Project
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/pricing" className="btn btn-outline text-lg px-8 py-4">
                  View Pricing
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold gradient-text">500+</div>
                  <div className="text-sm text-muted-foreground">Websites Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">98%</div>
                  <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">2-4 wks</div>
                  <div className="text-sm text-muted-foreground">Average Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section bg-muted/30" id="services">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Web Design & SEO Services
              </h2>
              <p className="text-muted-foreground">
                From new websites to redesigns and SEO optimization - everything you need to succeed online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="card p-6 hover-glow group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-smooth">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/pricing" className="text-primary hover:underline font-medium">
                View all pricing →
              </Link>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="section" id="industries">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                Industry Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Built for Your Industry
              </h2>
              <p className="text-muted-foreground">
                Specialized website solutions tailored to the unique needs of different business types.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/solutions/${industry.slug}`}
                  className="card p-4 text-center hover-glow group"
                >
                  <h3 className="font-medium text-sm">{industry.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="section bg-muted/30" id="locations">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                Nationwide Service
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Web Design in Your City
              </h2>
              <p className="text-muted-foreground">
                Local expertise with global standards. Beautiful websites for businesses across the USA.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {tier1Locations.slice(0, 24).map((location) => (
                <Link
                  key={location.slug}
                  href={`/services/website-creation/${location.slug}`}
                  className="px-3 py-2 text-sm text-center rounded-lg border border-border hover:border-primary hover:text-primary bg-background transition-smooth"
                >
                  {location.city}, {location.stateCode}
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/locations" className="text-primary hover:underline text-sm font-medium">
                View all 100+ locations →
              </Link>
            </div>
          </div>
        </section>
        {/* Clients Social Proof */}
        <section className="section bg-muted/30 border-y border-border">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Trusted by Leading Brands
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Join <span className="gradient-text">500+</span> Happy Clients
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From startups to established businesses, companies trust us to build websites that drive results
              </p>
            </div>

            {/* Client logos grid */}
            {/* Client logos grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center mb-12">
              {[
                { name: "Active Sport", logo: "/logos/assets/activesport.png" },
                { name: "Aggelos Rentals", logo: "/logos/assets/aggelosrentals.png" },
                { name: "Alk Hotel", logo: "/logos/assets/alkhotel.png" },
                { name: "Allazw Diatrofi", logo: "/logos/assets/allazwdiatrofi.png" },
                { name: "Antiparos Rent a Car", logo: "/logos/assets/antiparosrentacar.png" },
                { name: "Antiparos Rooms", logo: "/logos/assets/antiparosrooms.png" },
                { name: "Antiparos Transfer", logo: "/logos/assets/antiparostransfer.png" },
                { name: "Athens Rent a Car", logo: "/logos/assets/athensrentacar.png" },
                { name: "Box2Box", logo: "/logos/assets/box2box_logo.png" },
                { name: "Cosmos Sport", logo: "/logos/assets/cosmos-sport-logo-17075792651.webp" },
                { name: "EEF EDU", logo: "/logos/assets/eefedu.png" },
                { name: "Elite Hospitality", logo: "/logos/assets/elitehospitality.png" },
                { name: "Health Assistance", logo: "/logos/assets/healthassistance.png" },
                { name: "JD Sports", logo: "/logos/assets/jd-desktop-logo.webp" },
                { name: "Villarreal", logo: "/logos/assets/logo-villarreal-web.png" },
                { name: "Meropi Rooms", logo: "/logos/assets/meropirooms.png" },
                { name: "Morpheas", logo: "/logos/assets/morpheas-logo.png" },
                { name: "Petsville", logo: "/logos/assets/petsville.png" },
                { name: "RAC SA", logo: "/logos/assets/rac sa.jpg" },
                { name: "RunDome", logo: "/logos/assets/rundome-logo-17075791815.webp" },
                { name: "Slam Dunk", logo: "/logos/assets/slam-dunk-logo-17075791644.webp" },
                { name: "Sneaker10", logo: "/logos/assets/sneaker10-logo-17075791422.webp" },
                { name: "Sports Factory", logo: "/logos/assets/sportsfactory-outlet-logo-17153332223.webp" },
                { name: "The Agency", logo: "/logos/assets/theagencylogo.png" },
                { name: "Villa Olivia Clara", logo: "/logos/assets/villa-olivia-clara-logo-768x204.png" },
              ].map((client, i) => (
                <div
                  key={i}
                  className="group w-full h-20 flex items-center justify-center p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-12 object-contain opacity-60 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 border-2 border-background" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 border-2 border-background flex items-center justify-center text-white font-bold text-xs">
                    +
                  </div>
                </div>
                <span className="text-muted-foreground">
                  <strong className="text-foreground">500+</strong> websites delivered this year
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-24 gradient-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Choose your package and launch your new website in weeks, not months.
              Transparent pricing. No surprises.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/get-started" className="btn bg-white text-primary hover:bg-white/90 text-lg px-8 py-4">
                Start Your Project
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/pricing" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
