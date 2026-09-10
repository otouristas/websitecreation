'use client';

/**
 * FAQ accordion.
 *
 * The answers are always in the DOM and only hidden with the `hidden`
 * attribute. They used to be rendered conditionally on `expandedIndex`, which
 * initialises to `null` - so no answer text existed in the server-rendered
 * HTML at all on 99 URLs, including both /pricing pages and all 71 blog posts.
 *
 * That broke two things at once. The `FAQPage` JSON-LD emitted alongside this
 * component asserted answers that were not on the page, which Google's
 * structured-data policy prohibits. And the answers themselves - the
 * question-shaped Greek copy this site wants quoted in AI answers and People
 * Also Ask - were invisible to every crawler, because none of them click.
 *
 * An accordion that keeps its text in the DOM and hides it is fine. Removing
 * the text from the tree is not.
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
    /**
     * Index opened on first paint. Defaults to the first item so the page never
     * renders a wall of closed rows with no visible answer.
     */
    defaultExpandedIndex?: number | null;
}

export default function FAQSection({
    faqs,
    title,
    focusKeyword,
    className = '',
    locale = 'en',
    defaultExpandedIndex = 0,
}: FAQSectionProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(defaultExpandedIndex);

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
                                type="button"
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
                                    aria-hidden
                                >
                                    +
                                </span>
                            </button>

                            <div
                                id={`${itemId}-content`}
                                role="region"
                                aria-labelledby={`${itemId}-button`}
                                className="px-6 pb-4"
                                hidden={!isExpanded}
                            >
                                <p className="text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
