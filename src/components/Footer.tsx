'use client';

import Link from 'next/link';
import { services } from '@/data/services';
import { industries } from '@/data/industries';
import { tier1Locations } from '@/data/locations';
import { useState } from 'react';

// All clients with logos from anotherseoguru.com and local assets
const clients = [
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
];

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const topCities = tier1Locations.slice(0, 6);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <footer className="bg-foreground text-background">
            {/* Top gradient line for visual separation */}
            <div className="h-1 w-full gradient-primary" />

            {/* Client Logos Slider */}
            <div className="py-8 border-b border-background/10 overflow-hidden">
                <div className="container">
                    <p className="text-xs text-background/50 uppercase tracking-wider text-center mb-6 font-medium">
                        Trusted by Leading Brands
                    </p>
                </div>
                <div className="relative">
                    <div className="flex animate-scroll gap-12 whitespace-nowrap">
                        {[...clients, ...clients].map((client, i) => (
                            <div
                                key={`${client.name}-${i}`}
                                className="flex-shrink-0 h-10 w-24 flex items-center justify-center opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
                            >
                                <img
                                    src={client.logo}
                                    alt={`${client.name} logo`}
                                    className="max-h-full max-w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <style jsx>{`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-scroll {
                        animation: scroll 60s linear infinite;
                    }
                    .animate-scroll:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>

            {/* Main Footer Content */}
            <div className="container py-16 lg:py-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-5">
                            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-white">AnotherSEOGuru</span>
                        </Link>
                        <p className="text-background/70 text-sm mb-6 leading-relaxed max-w-xs">
                            Fast, beautiful websites that drive real business results.
                            SEO-optimized from the ground up. 500+ websites delivered.
                        </p>

                        <Link href="/get-started" className="btn btn-gradient text-sm">
                            Start Your Project
                        </Link>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm">Services</h3>
                        <ul className="space-y-3">
                            {services.slice(0, 5).map((service) => (
                                <li key={service.slug}>
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="text-sm text-background/70 hover:text-white transition-smooth"
                                    >
                                        {service.shortName}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-1">
                                <Link href="/pricing" className="text-sm text-primary hover:text-primary-glow transition-smooth">
                                    View Pricing →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Industries */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm">Industries</h3>
                        <ul className="space-y-3">
                            {industries.slice(0, 5).map((industry) => (
                                <li key={industry.slug}>
                                    <Link
                                        href={`/solutions/${industry.slug}`}
                                        className="text-sm text-background/70 hover:text-white transition-smooth"
                                    >
                                        {industry.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-1">
                                <Link href="/solutions" className="text-sm text-primary hover:text-primary-glow transition-smooth">
                                    All Industries →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Locations */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm">Top Cities</h3>
                        <ul className="space-y-3">
                            {topCities.map((location) => (
                                <li key={location.slug}>
                                    <Link
                                        href={`/services/website-creation/${location.slug}`}
                                        className="text-sm text-background/70 hover:text-white transition-smooth"
                                    >
                                        {location.city}
                                    </Link>
                                </li>
                            ))}
                            <li className="pt-1">
                                <Link href="/locations" className="text-sm text-primary hover:text-primary-glow transition-smooth">
                                    All Locations →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-5 text-sm">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-background/70 hover:text-white transition-smooth">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm text-background/70 hover:text-white transition-smooth">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-background/70 hover:text-white transition-smooth">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-background/70 hover:text-white transition-smooth">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-background/70 hover:text-white transition-smooth">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 pt-10 border-t border-background/10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h4 className="text-lg font-semibold text-white mb-2">Stay Updated</h4>
                            <p className="text-background/60 text-sm">
                                Get web design tips, SEO insights, and exclusive offers delivered to your inbox.
                            </p>
                        </div>
                        <div>
                            {subscribed ? (
                                <div className="flex items-center gap-2 text-success">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Thanks for subscribing!</span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="flex-1 px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-white placeholder:text-background/50 focus:border-primary focus:ring-1 focus:ring-primary transition-smooth text-sm"
                                    />
                                    <button type="submit" className="btn btn-gradient px-6">
                                        Subscribe
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Popular Searches */}
                <div className="mt-10 pt-10 border-t border-background/10">
                    <h4 className="text-xs font-semibold text-background/50 uppercase tracking-wider mb-5">Popular Searches</h4>
                    <div className="flex flex-wrap gap-3">
                        {['new-york-ny', 'los-angeles-ca', 'chicago-il', 'miami-fl', 'austin-tx', 'seattle-wa'].map((city) => {
                            const location = tier1Locations.find(l => l.slug === city);
                            if (!location) return null;
                            return (
                                <Link
                                    key={city}
                                    href={`/services/website-creation/${city}`}
                                    className="px-4 py-2 text-xs bg-background/10 hover:bg-background/20 rounded-full transition-smooth"
                                >
                                    Web Design {location.city}
                                </Link>
                            );
                        })}
                        {industries.slice(0, 3).map((industry) => (
                            <Link
                                key={industry.slug}
                                href={`/solutions/${industry.slug}`}
                                className="px-4 py-2 text-xs bg-background/10 hover:bg-background/20 rounded-full transition-smooth"
                            >
                                {industry.name} Websites
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-background/10">
                <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-background/50">
                        © {currentYear} AnotherSEOGuru. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="mailto:hello@anotherseoguru.com"
                            className="text-sm text-background/50 hover:text-white transition-smooth"
                        >
                            hello@anotherseoguru.com
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
