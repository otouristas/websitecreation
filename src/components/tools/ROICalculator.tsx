'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizedPath, siteLocaleFromPath } from '@/lib/i18n/locale';

export function ROICalculator() {
    const pathname = usePathname() ?? '/en';
    const locale = siteLocaleFromPath(pathname);
    const lp = (path: string) => localizedPath(locale, path);
    const [traffic, setTraffic] = useState(1000);
    const [conversionRate, setConversionRate] = useState(2);
    const [closeRate, setCloseRate] = useState(20);
    const [customerValue, setCustomerValue] = useState(500);

    const leads = Math.floor(traffic * (conversionRate / 100));
    const newCustomers = Math.floor(leads * (closeRate / 100));
    const revenue = newCustomers * customerValue;

    return (
        <div className="bg-surface p-8 rounded-2xl shadow-lg border border-hairline">
            <h3 className="text-2xl font-bold text-foreground mb-6">
                Calculate Your SEO ROI
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="roi-traffic" className="block text-sm font-medium text-foreground mb-2">
                            Monthly Traffic: <span className="font-bold text-primary">{traffic.toLocaleString()}</span>
                        </label>
                        <input
                            id="roi-traffic"
                            type="range"
                            min="100"
                            max="50000"
                            step="100"
                            value={traffic}
                            onChange={(e) => setTraffic(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                        />
                    </div>

                    <div>
                        <label htmlFor="roi-conversion" className="block text-sm font-medium text-foreground mb-2">
                            Website Conv. Rate: <span className="font-bold text-primary">{conversionRate}%</span>
                        </label>
                        <input
                            id="roi-conversion"
                            type="range"
                            min="0.1"
                            max="10"
                            step="0.1"
                            value={conversionRate}
                            onChange={(e) => setConversionRate(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                        />
                    </div>

                    <div>
                        <label htmlFor="roi-close" className="block text-sm font-medium text-foreground mb-2">
                            Sales Close Rate: <span className="font-bold text-primary">{closeRate}%</span>
                        </label>
                        <input
                            id="roi-close"
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={closeRate}
                            onChange={(e) => setCloseRate(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                        />
                    </div>

                    <div>
                        <label htmlFor="roi-value" className="block text-sm font-medium text-foreground mb-2">
                            Customer Value ($): <span className="font-bold text-primary">${customerValue}</span>
                        </label>
                        <input
                            id="roi-value"
                            type="range"
                            min="100"
                            max="10000"
                            step="100"
                            value={customerValue}
                            onChange={(e) => setCustomerValue(Number(e.target.value))}
                            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
                        />
                    </div>
                </div>

                <div className="bg-surface-raised rounded-xl p-6 flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                        <div className="text-sm text-muted-foreground uppercase font-semibold">Projected Monthly Revenue</div>
                        <div className="text-4xl font-black text-foreground mt-2">
                            ${revenue.toLocaleString()}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full mb-6">
                        <div className="p-3 bg-surface rounded-lg shadow-sm border border-hairline">
                            <div className="text-xl font-bold text-primary">{leads}</div>
                            <div className="text-xs text-muted-foreground">New Leads</div>
                        </div>
                        <div className="p-3 bg-surface rounded-lg shadow-sm border border-hairline">
                            <div className="text-xl font-bold text-brand">{newCustomers}</div>
                            <div className="text-xs text-muted-foreground">New Clients</div>
                        </div>
                    </div>

                    <Link href={lp('/contact')} className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                        Start Growing Today
                    </Link>
                </div>
            </div>
        </div>
    );
}
