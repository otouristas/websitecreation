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
                <h2 className="mb-8 font-display text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-[36px]">{sectionTitle}</h2>
            ) : null}

            <div className="space-y-3">
                {faqs.map((faq, index) => {
                    const isExpanded = expandedIndex === index;
                    const itemId = `faq-${index}`;

                    return (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-hairline bg-surface/60 transition-colors hover:border-foreground/15"
                        >
                            <button
                                type="button"
                                onClick={() => toggleItem(index)}
                                aria-expanded={isExpanded}
                                aria-controls={`${itemId}-content`}
                                id={`${itemId}-button`}
                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors sm:px-6"
                            >
                                <span className="text-[15.5px] font-semibold tracking-[-0.01em] text-foreground">{faq.question}</span>
                                <span
                                    className="flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline text-lg leading-none text-muted-foreground transition-transform"
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
                                className="px-5 pb-5 sm:px-6"
                                hidden={!isExpanded}
                            >
                                <p className="text-[15px] leading-relaxed text-muted-foreground">
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
