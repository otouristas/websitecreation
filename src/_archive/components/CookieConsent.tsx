'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
        setShow(false);
    };

    const decline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-4 left-4 z-50 max-w-sm bg-white p-6 rounded-xl shadow-2xl border border-gray-100 animate-fade-in-up">
            <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 mb-1">We value your privacy</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        We use cookies to improve your experience. By using our site, you agree to our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={accept} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition">
                            Accept
                        </button>
                        <button onClick={decline} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-bold rounded-lg hover:bg-gray-200 transition">
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
