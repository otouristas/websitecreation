'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MarketingPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if already dismissed in this session
        const dismissed = sessionStorage.getItem('popupDismissed');
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000); // Show after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(() => setIsDismissed(true), 300); // Wait for transition
        sessionStorage.setItem('popupDismissed', 'true');
    };

    if (isDismissed) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleDismiss}
                style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
            />

            {/* Popup */}
            <div
                className={`relative w-full max-w-md bg-background rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-500 border border-primary/20 ${isVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
                    }`}
                style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
            >
                <div className="absolute top-0 left-0 w-full h-1 gradient-primary rounded-t-2xl" />

                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-smooth"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <span className="text-3xl">🎉</span>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">Limited Time Offer!</h2>
                    <p className="text-muted-foreground mb-6">
                        Get <span className="text-primary font-bold">40% OFF</span> all website packages.
                        Launch your new site for as low as <span className="text-foreground font-bold">$899</span>.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/get-started"
                            onClick={handleDismiss}
                            className="btn btn-gradient w-full py-3 text-lg shadow-lg hover:shadow-primary/25"
                        >
                            Claim 40% Discount
                        </Link>
                        <button
                            onClick={handleDismiss}
                            className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                        >
                            No thanks, I don't like saving money
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
