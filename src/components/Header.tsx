'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { services } from '@/data/services';
import { industries } from '@/data/industries';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (dropdown: string) => {
        setActiveDropdown(dropdown);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-smooth flex flex-col ${isScrolled
                ? 'bg-background/95 backdrop-blur-lg shadow-medium border-b border-border'
                : 'bg-background/80 backdrop-blur-md'
                }`}
        >
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-primary/90 to-blue-600 text-white py-2 text-center text-xs sm:text-sm font-bold relative z-50">
                <div className="container flex items-center justify-center gap-2">
                    <span>🎉 40% OFF All Packages! Limited Time Offer.</span>
                    <Link href="/pricing" className="underline hover:text-white/90">
                        Get Started
                    </Link>
                </div>
            </div>

            <div className="container">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold leading-tight gradient-text">AnotherSEOGuru</span>
                            <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">SEO Web Design Agency</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {/* Services Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('services')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-smooth rounded-lg hover:bg-muted/50">
                                Services
                                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {activeDropdown === 'services' && (
                                <div className="absolute top-full left-0 mt-1 w-[480px] p-4 bg-background border border-border rounded-xl shadow-xl grid grid-cols-2 gap-2">
                                    {services.map((service) => (
                                        <Link
                                            key={service.slug}
                                            href={`/services/${service.slug}`}
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth group"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-smooth">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{service.name}</div>
                                                <div className="text-xs text-muted-foreground line-clamp-1">{service.description.slice(0, 50)}...</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Industries Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => handleMouseEnter('industries')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-smooth rounded-lg hover:bg-muted/50">
                                Industries
                                <svg className={`w-4 h-4 transition-transform ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {activeDropdown === 'industries' && (
                                <div className="absolute top-full left-0 mt-1 w-[400px] p-4 bg-background border border-border rounded-xl shadow-xl grid grid-cols-2 gap-1">
                                    {industries.map((industry) => (
                                        <Link
                                            key={industry.slug}
                                            href={`/solutions/${industry.slug}`}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-smooth text-sm"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-primary" />
                                            {industry.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-smooth rounded-lg hover:bg-muted/50">
                            Pricing
                        </Link>

                        <Link href="/about" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-smooth rounded-lg hover:bg-muted/50">
                            About
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/contact" className="btn btn-gradient text-sm px-5 py-2.5">
                            Free Quote
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-foreground hover:text-primary transition-smooth"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-border bg-background pb-6">
                        <div className="py-4 space-y-1">
                            <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Services</div>
                            {services.map((service) => (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="block px-4 py-2 text-sm hover:bg-muted/50 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {service.name}
                                </Link>
                            ))}
                            <Link href="/services" className="block px-4 py-2 text-sm text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                                View all services →
                            </Link>

                            <div className="px-2 py-2 pt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Industries</div>
                            {industries.map((industry) => (
                                <Link
                                    key={industry.slug}
                                    href={`/solutions/${industry.slug}`}
                                    className="block px-4 py-2 text-sm hover:bg-muted/50 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {industry.name}
                                </Link>
                            ))}

                            <div className="pt-4 px-2">
                                <Link href="/contact" className="btn btn-gradient w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                                    Get Free Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
