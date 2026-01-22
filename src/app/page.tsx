import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ROICalculator } from '@/components/tools';

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
          </div>

          <div className="container relative z-10 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold animate-fade-in-up">
              🚀 The #1 Data-Driven SEO Agency
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 tracking-tight text-gray-900 leading-[1.1] animate-fade-in-up delay-100">
              Turn Your Website Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Your Best Salesperson</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200">
              Stop renting your traffic. Own your rankings. We use data, not guesswork, to flood your business with high-value leads.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
              <Link href="/pricing" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30">
                See Our Packages
              </Link>
              <Link href="#calculator" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 font-bold rounded-xl text-lg hover:bg-gray-50 transition">
                Calculate ROI
              </Link>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF TICKER */}
        <section className="py-10 border-y border-gray-100 bg-gray-50/50">
          <div className="container">
            <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">Trusted by 500+ businesses scaling fast</p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Real Client Logos */}
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/aggelosrentals.png" alt="Aggelos Rentals" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/alkhotel.png" alt="ALK Hotel" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/antiparosrentacar.png" alt="Antiparos Rent a Car" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/elitehospitality.png" alt="Elite Hospitality" fill className="object-contain" />
              </div>
              <div className="relative w-36 h-14">
                <Image src="/logos/assets/theagencylogo.png" alt="The Agency" fill className="object-contain" />
              </div>
              <div className="relative w-40 h-14">
                <Image src="/logos/assets/villa-olivia-clara-logo-768x204.png" alt="Villa Olivia Clara" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* BENTO GRID SERVICES - EXPANDED */}
        <section className="py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything You Need to Dominate</h2>
              <p className="text-xl text-gray-600">
                We don't sell "packages". We sell domination. Our proprietary stack covers every angle of modern search.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Card 1: Local SEO (Large Feature) */}
              <Link href="/services/local-seo" className="md:col-span-2 group relative rounded-3xl overflow-hidden bg-gray-900 text-white p-8 lg:p-12 hover:shadow-2xl transition duration-500 min-h-[320px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90 group-hover:scale-105 transition duration-700" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Local Map Domination</h3>
                    <p className="text-gray-200 text-lg max-w-md">
                      Own the "Map Pack" in your city. Ensure your business is the first choice for "Near Me" searches.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-blue-200 group-hover:text-white transition">
                    Learn More <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>

              {/* Card 2: Programmatic SEO */}
              <Link href="/services" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition group border border-gray-100 min-h-[320px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Massive Scale pSEO</h3>
                  <p className="text-sm text-gray-500">Target thousands of long-tail keywords with automated landing pages.</p>
                </div>
                <span className="text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition inline-block">Explore Strategy →</span>
              </Link>

              {/* Card 3: SEO Web Design */}
              <Link href="/services/seo-web-design" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition group border border-gray-100 min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">SEO Web Design</h3>
                  <p className="text-sm text-gray-500">Beauty meets brains. Websites built to rank from day one.</p>
                </div>
                <span className="text-pink-600 font-semibold text-sm group-hover:translate-x-1 transition inline-block">See Designs →</span>
              </Link>

              {/* Card 4: Link Building */}
              <Link href="/services/link-building" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition group border border-gray-100 min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Authority Building</h3>
                  <p className="text-sm text-gray-500">High-DR backlinks. No spam, just power.</p>
                </div>
                <span className="text-green-600 font-semibold text-sm group-hover:translate-x-1 transition inline-block">Build Authority →</span>
              </Link>

              {/* Card 5: Speed Optimization */}
              <Link href="/services/speed-optimization" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition group border border-gray-100 min-h-[280px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">90+ Speed Score</h3>
                  <p className="text-sm text-gray-500">Pass Core Web Vitals or don't pay. We make sites fly.</p>
                </div>
                <span className="text-yellow-600 font-semibold text-sm group-hover:translate-x-1 transition inline-block">Optimize Now →</span>
              </Link>

            </div>
          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section id="calculator" className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                  Interactive Intelligence
                </span>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  How much money are you leaving on the table?
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Ranking #1 isn't vanity. It's revenue. Use our intelligence tool to see exactly what top rankings would mean for your bottom line.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">✓</div>
                    <span className="font-medium text-gray-700">Predictable Lead Flow</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">✓</div>
                    <span className="font-medium text-gray-700">Higher Close Rates</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">✓</div>
                    <span className="font-medium text-gray-700">Zero Ad Spend Wasted</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-10 rounded-full" />
                <div className="relative">
                  <ROICalculator />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="container relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Scale?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              We only work with businesses we can help. Book a free strategy session to see if we are a match.
            </p>
            <Link href="/contact" className="inline-block px-10 py-5 bg-white text-gray-900 font-bold rounded-xl text-xl hover:bg-gray-100 transition transform hover:-translate-y-1">
              Book Strategy Call
            </Link>
            <p className="mt-6 text-sm text-gray-500">No Sales Pressure. Just Strategy.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
