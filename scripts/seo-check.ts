#!/usr/bin/env npx tsx
/**
 * SEO Check Script
 * Validates meta descriptions across all pages
 * 
 * Run with: npx tsx scripts/seo-check.ts
 */

import { services } from '../src/data/services';
import { industries } from '../src/data/industries';
import { tier1Locations } from '../src/data/locations';
import { buildMetaDescription, getDescriptionStatus } from '../src/lib/seo/description';

interface PageCheck {
    path: string;
    description: string;
    length: number;
    status: 'too-short' | 'optimal' | 'too-long' | 'missing';
}

const results: PageCheck[] = [];
const seeDescriptions = new Map<string, string[]>();

// Static pages
const staticPages: { path: string; description: string }[] = [
    { path: '/', description: 'High-performance websites that drive real business results. SEO-optimized from the ground up. Website creation, redesign, logos & content creation.' },
    { path: '/about', description: 'Learn about AnotherSEOGuru - a team of web designers and SEO specialists dedicated to building fast, beautiful websites that drive real business results.' },
    { path: '/pricing', description: 'Transparent pricing for website creation, redesign, and SEO services. Choose the package that fits your business needs and budget.' },
    { path: '/contact', description: 'Get in touch with AnotherSEOGuru. Send us a message and we\'ll get back to you within 24 hours about your project.' },
];

// Check static pages
staticPages.forEach(page => {
    const status = getDescriptionStatus(page.description);
    results.push({
        path: page.path,
        description: page.description,
        length: status.length,
        status: status.status,
    });

    // Track for duplicates
    const existing = seeDescriptions.get(page.description) || [];
    existing.push(page.path);
    seeDescriptions.set(page.description, existing);
});

// Check service hub pages
services.forEach(service => {
    const description = buildMetaDescription({
        primaryKeyword: service.name,
        service: service.name,
        ctaHint: 'View pricing and get started.',
    });
    const status = getDescriptionStatus(description);
    const path = `/services/${service.slug}`;

    results.push({
        path,
        description,
        length: status.length,
        status: status.status,
    });

    const existing = seeDescriptions.get(description) || [];
    existing.push(path);
    seeDescriptions.set(description, existing);
});

// Check industry hub pages
industries.forEach(industry => {
    const description = buildMetaDescription({
        primaryKeyword: industry.name,
        industry: industry.name,
        ctaHint: 'See packages for your industry.',
    });
    const status = getDescriptionStatus(description);
    const path = `/solutions/${industry.slug}`;

    results.push({
        path,
        description,
        length: status.length,
        status: status.status,
    });

    const existing = seeDescriptions.get(description) || [];
    existing.push(path);
    seeDescriptions.set(description, existing);
});

// Check service × location pages (sample)
const sampleLocations = tier1Locations.slice(0, 10);
services.forEach(service => {
    sampleLocations.forEach(location => {
        const description = buildMetaDescription({
            primaryKeyword: service.name,
            service: service.name,
            location: `${location.city}, ${location.stateCode}`,
            usp: `Fast, beautiful websites for ${location.city} businesses`,
            ctaHint: 'Get a free quote today.',
        });
        const status = getDescriptionStatus(description);
        const path = `/services/${service.slug}/${location.slug}`;

        results.push({
            path,
            description,
            length: status.length,
            status: status.status,
        });

        const existing = seeDescriptions.get(description) || [];
        existing.push(path);
        seeDescriptions.set(description, existing);
    });
});

// Check industry × service pages
industries.forEach(industry => {
    services.forEach(service => {
        const description = buildMetaDescription({
            primaryKeyword: service.name,
            service: service.name,
            industry: industry.name,
            usp: `Specialized ${service.name.toLowerCase()} for ${industry.name.toLowerCase()} businesses`,
            ctaHint: 'Get started today.',
        });
        const status = getDescriptionStatus(description);
        const path = `/solutions/${industry.slug}/${service.slug}`;

        results.push({
            path,
            description,
            length: status.length,
            status: status.status,
        });

        const existing = seeDescriptions.get(description) || [];
        existing.push(path);
        seeDescriptions.set(description, existing);
    });
});

// Output results
console.log('\n' + '='.repeat(80));
console.log('SEO META DESCRIPTION AUDIT');
console.log('='.repeat(80));

// Summary
const tooShort = results.filter(r => r.status === 'too-short');
const tooLong = results.filter(r => r.status === 'too-long');
const optimal = results.filter(r => r.status === 'optimal');

console.log('\n📊 SUMMARY');
console.log('-'.repeat(40));
console.log(`Total pages checked: ${results.length}`);
console.log(`✅ Optimal (80-180 chars): ${optimal.length}`);
console.log(`⚠️  Too short (<80 chars): ${tooShort.length}`);
console.log(`⚠️  Too long (>180 chars): ${tooLong.length}`);

// Duplicates
const duplicates = Array.from(seeDescriptions.entries()).filter(([, paths]) => paths.length > 1);
console.log(`🔄 Duplicate descriptions: ${duplicates.length}`);

// Issues
if (tooShort.length > 0) {
    console.log('\n⚠️  TOO SHORT DESCRIPTIONS');
    console.log('-'.repeat(40));
    tooShort.forEach(r => {
        console.log(`${r.path}`);
        console.log(`   Length: ${r.length} chars`);
        console.log(`   Description: ${r.description.slice(0, 60)}...`);
    });
}

if (tooLong.length > 0) {
    console.log('\n⚠️  TOO LONG DESCRIPTIONS');
    console.log('-'.repeat(40));
    tooLong.forEach(r => {
        console.log(`${r.path}`);
        console.log(`   Length: ${r.length} chars`);
        console.log(`   Description: ${r.description.slice(0, 80)}...`);
    });
}

if (duplicates.length > 0) {
    console.log('\n🔄 DUPLICATE DESCRIPTIONS');
    console.log('-'.repeat(40));
    duplicates.forEach(([desc, paths]) => {
        console.log(`"${desc.slice(0, 60)}..."`);
        paths.forEach(p => console.log(`   - ${p}`));
    });
}

console.log('\n' + '='.repeat(80));
console.log('AUDIT COMPLETE');
console.log('='.repeat(80) + '\n');
