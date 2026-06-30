'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadGoogleAnalytics } from '@/lib/analytics';

export default function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        loadGoogleAnalytics();
        setShow(false);
    };

    const decline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm rounded-xl border border-border bg-card p-6 shadow-2xl animate-fade-in-up">
            <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-bold text-foreground mb-1">We value your privacy</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        We use cookies for analytics to improve your experience. See our{' '}
                        <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={accept} className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 transition">
                            Accept
                        </button>
                        <button onClick={decline} className="px-4 py-2 bg-muted text-muted-foreground text-sm font-bold rounded-lg hover:bg-muted/80 transition">
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
