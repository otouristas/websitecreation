// SEO Description Builder
// Generates optimized meta descriptions with smart truncation

const BASE_URL = 'https://anotherseoguru.com';
const BRAND_NAME = 'AnotherSEOGuru';
const DEFAULT_USP = 'Our expert team builds custom, high-performance websites optimized for Google to outrank competitors and convert more local visitors into paying customers';

interface DescriptionInput {
    primaryKeyword: string;
    location?: string;
    industry?: string;
    service?: string;
    usp?: string;
    ctaHint?: string;
}

/**
 * Smart truncation at word boundary
 * Trims string to maxLength, cutting at last complete word
 */
export function smartTruncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace === -1) return truncated;

    // Remove trailing punctuation if present
    let result = truncated.slice(0, lastSpace);
    result = result.replace(/[,;:\-–—]$/, '').trim();

    return result;
}

/**
 * Build meta description with optimal length (130-160 chars target)
 * Prioritizes first 120 chars for mobile SERP visibility
 */
export function buildMetaDescription(input: DescriptionInput): string {
    const { primaryKeyword, location, industry, service, usp, ctaHint } = input;

    let description = '';
    const uniqueUSP = usp || DEFAULT_USP;
    const callToAction = ctaHint || 'Get your free expert quote today.';

    // Build description based on input type
    if (service && location) {
        // Service × Location pages
        description = `Top-rated ${service.toLowerCase()} in ${location}. ${uniqueUSP}. We help ${location} businesses grow online. ${callToAction}`;
    } else if (service && industry) {
        // Industry × Service pages
        description = `Professional ${service.toLowerCase()} specialized for ${industry.toLowerCase()} companies. ${uniqueUSP}. Trust the experts in ${industry} web design. ${callToAction}`;
    } else if (industry) {
        // Industry hub pages
        description = `Complete website solutions designed specifically for ${industry.toLowerCase()} businesses. ${uniqueUSP}. Custom features for ${industry} needs. ${callToAction}`;
    } else if (service) {
        // Service hub pages
        description = `Premium ${service.toLowerCase()} services to scale your business. ${uniqueUSP}. Fast turnaround and 5-star support. ${callToAction}`;
    } else {
        // Generic/static pages
        description = `${primaryKeyword}. ${uniqueUSP}. 500+ satisfied clients. ${callToAction}`;
    }

    // Ensure first 120 chars contain core message, total under 160
    if (description.length > 160) {
        description = smartTruncate(description, 158) + '.';
    }

    return description;
}

/**
 * Get description length status for validation
 */
export function getDescriptionStatus(description: string): {
    length: number;
    status: 'too-short' | 'optimal' | 'too-long';
    message: string;
} {
    const length = description.length;

    if (length < 80) {
        return { length, status: 'too-short', message: `Too short (${length} chars, min 80)` };
    } else if (length > 180) {
        return { length, status: 'too-long', message: `Too long (${length} chars, max 180)` };
    } else {
        return { length, status: 'optimal', message: `OK (${length} chars)` };
    }
}

export { BASE_URL, BRAND_NAME, DEFAULT_USP };
