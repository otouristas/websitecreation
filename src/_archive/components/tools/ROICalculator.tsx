'use client';

import { useState } from 'react';

export function ROICalculator() {
    const [traffic, setTraffic] = useState(1000);
    const [conversionRate, setConversionRate] = useState(2);
    const [closeRate, setCloseRate] = useState(20);
    const [customerValue, setCustomerValue] = useState(500);

    const leads = Math.floor(traffic * (conversionRate / 100));
    const newCustomers = Math.floor(leads * (closeRate / 100));
    const revenue = newCustomers * customerValue;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
                Calculate Your SEO ROI
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Monthly Traffic: <span className="font-bold text-blue-600">{traffic.toLocaleString()}</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="50000"
                            step="100"
                            value={traffic}
                            onChange={(e) => setTraffic(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website Conv. Rate: <span className="font-bold text-blue-600">{conversionRate}%</span>
                        </label>
                        <input
                            type="range"
                            min="0.1"
                            max="10"
                            step="0.1"
                            value={conversionRate}
                            onChange={(e) => setConversionRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sales Close Rate: <span className="font-bold text-blue-600">{closeRate}%</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            step="1"
                            value={closeRate}
                            onChange={(e) => setCloseRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Customer Value ($): <span className="font-bold text-blue-600">${customerValue}</span>
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="10000"
                            step="100"
                            value={customerValue}
                            onChange={(e) => setCustomerValue(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                        <div className="text-sm text-gray-500 uppercase font-semibold">Projected Monthly Revenue</div>
                        <div className="text-4xl font-black text-gray-900 mt-2">
                            ${revenue.toLocaleString()}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 w-full mb-6">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <div className="text-xl font-bold text-blue-600">{leads}</div>
                            <div className="text-xs text-gray-500">New Leads</div>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                            <div className="text-xl font-bold text-indigo-600">{newCustomers}</div>
                            <div className="text-xs text-gray-500">New Clients</div>
                        </div>
                    </div>

                    <a href="/contact" className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                        Start Growing Today
                    </a>
                </div>
            </div>
        </div>
    );
}
