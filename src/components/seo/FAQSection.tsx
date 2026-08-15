'use client';

/**
 * FAQ Section Component
 * Expandable accordion for FAQ items with accessibility
 */

import { useState } from 'react';
import type { FAQ } from '@/lib/types/page';

interface FAQSectionProps {
    faqs: FAQ[];
    /** Pass an empty string to render the accordion with no heading of its own. */
    title?: string;
    focusKeyword?: string;
    className?: string;
    /** Needed for the fallback heading; the default was English-only. */
    locale?: 'en' | 'el';
}

/**
 * Expandable FAQ accordion component
 * Client component for interactivity
 */
export default function FAQSection({
    faqs,
    title,
    focusKeyword,
    className = '',
    locale = 'en',
}: FAQSectionProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) {
        return null;
    }

    // `title === ''` means the caller renders its own heading, so emit none.
    const isEl = locale === 'el';
    const fallbackTitle = focusKeyword
        ? isEl
            ? `Συχνές ερωτήσεις για ${focusKeyword}`
            : `Frequently asked questions about ${focusKeyword}`
        : isEl
            ? 'Συχνές ερωτήσεις'
            : 'Frequently asked questions';
    const sectionTitle = title === '' ? '' : (title ?? fallbackTitle);

    const toggleItem = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section className={`py-12 ${className}`}>
            {sectionTitle ? (
                <h2 className="mb-8 font-display text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{sectionTitle}</h2>
            ) : null}

            <div className="space-y-3">
                {faqs.map((faq, index) => {
                    const isExpanded = expandedIndex === index;
                    const itemId = `faq-${index}`;

                    return (
                        <div
                            key={index}
                            className="border border-border rounded-xl overflow-hidden bg-background"
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                aria-expanded={isExpanded}
                                aria-controls={`${itemId}-content`}
                                id={`${itemId}-button`}
                                className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-muted/50 transition-colors"
                            >
                                <span className="font-semibold text-foreground">{faq.question}</span>
                                <span
                                    className="text-2xl text-muted-foreground flex-shrink-0 transition-transform"
                                    style={{ transform: isExpanded ? 'rotate(45deg)' : 'none' }}
                                >
                                    +
                                </span>
                            </button>

                            {isExpanded && (
                                <div
                                    id={`${itemId}-content`}
                                    role="region"
                                    aria-labelledby={`${itemId}-button`}
                                    className="px-6 pb-4"
                                >
                                    <p className="text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
