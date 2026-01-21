'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { services } from '@/data/services';
import { industries } from '@/data/industries';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const handleMouseEnter = (dropdown: string) => {
        setActiveDropdown(dropdown);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const toggleMobileAccordion = (section: string) => {
        setMobileAccordion(mobileAccordion === section ? null : section);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setMobileAccordion(null);
    };

    return (
        <>
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
                </div>
            </header>

            {/* Full Screen Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={closeMobileMenu}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    {/* Menu Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
                        <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                            <div className="relative w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold gradient-text">AnotherSEOGuru</span>
                        </Link>
                        <button
                            onClick={closeMobileMenu}
                            className="p-2 rounded-full hover:bg-muted/50 transition-colors"
                            aria-label="Close menu"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Menu Content - Scrollable */}
                    <div className="h-[calc(100%-180px)] overflow-y-auto">
                        <div className="p-4 space-y-2">
                            {/* Services Accordion */}
                            <div className="border border-border rounded-xl overflow-hidden">
                                <button
                                    onClick={() => toggleMobileAccordion('services')}
                                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold">Services</div>
                                            <div className="text-xs text-muted-foreground">{services.length} services available</div>
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${mobileAccordion === 'services' ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${mobileAccordion === 'services' ? 'max-h-[500px]' : 'max-h-0'
                                        }`}
                                >
                                    <div className="p-2 space-y-1 bg-background">
                                        {services.map((service) => (
                                            <Link
                                                key={service.slug}
                                                href={`/services/${service.slug}`}
                                                onClick={closeMobileMenu}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                                                <div>
                                                    <div className="font-medium text-sm">{service.name}</div>
                                                    <div className="text-xs text-muted-foreground line-clamp-1">{service.shortName}</div>
                                                </div>
                                            </Link>
                                        ))}
                                        <Link
                                            href="/services"
                                            onClick={closeMobileMenu}
                                            className="flex items-center gap-2 p-3 text-primary font-medium text-sm hover:bg-primary/5 rounded-lg transition-colors"
                                        >
                                            View all services
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Industries Accordion */}
                            <div className="border border-border rounded-xl overflow-hidden">
                                <button
                                    onClick={() => toggleMobileAccordion('industries')}
                                    className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-semibold">Industries</div>
                                            <div className="text-xs text-muted-foreground">{industries.length} industries served</div>
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${mobileAccordion === 'industries' ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${mobileAccordion === 'industries' ? 'max-h-[500px]' : 'max-h-0'
                                        }`}
                                >
                                    <div className="p-2 space-y-1 bg-background">
                                        {industries.map((industry) => (
                                            <Link
                                                key={industry.slug}
                                                href={`/solutions/${industry.slug}`}
                                                onClick={closeMobileMenu}
                                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-secondary group-hover:scale-125 transition-transform" />
                                                <span className="font-medium text-sm">{industry.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Direct Links */}
                            <div className="space-y-1 pt-2">
                                <Link
                                    href="/pricing"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Pricing</div>
                                        <div className="text-xs text-muted-foreground">View our packages</div>
                                    </div>
                                </Link>

                                <Link
                                    href="/about"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">About Us</div>
                                        <div className="text-xs text-muted-foreground">Learn about our agency</div>
                                    </div>
                                </Link>

                                <Link
                                    href="/contact"
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold">Contact</div>
                                        <div className="text-xs text-muted-foreground">Get in touch with us</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Menu Footer - CTA */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background/95 backdrop-blur-sm">
                        <Link
                            href="/get-started"
                            onClick={closeMobileMenu}
                            className="btn btn-gradient w-full text-center py-4 text-lg font-semibold shadow-glow"
                        >
                            Get Free Quote
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <p className="text-center text-xs text-muted-foreground mt-2">
                            Free consultation • No commitment
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
