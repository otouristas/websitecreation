'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { industries } from '@/data/industries';

const packages = [
    { id: 'starter', name: 'Starter', price: 899, originalPrice: 1499, pages: 5 },
    { id: 'professional', name: 'Professional', price: 1799, originalPrice: 2999, pages: 10 },
    { id: 'business', name: 'Business', price: 2999, originalPrice: 4999, pages: 20 },
];

const addOns = [
    { id: 'logo', name: 'Logo Design', price: 299 },
    { id: 'content', name: 'Content Writing (5 pages)', price: 399 },
    { id: 'ecommerce', name: 'E-commerce Setup', price: 499 },
    { id: 'maintenance', name: '3 Months Maintenance', price: 499 },
];

const featureOptions = [
    { id: 'contact-form', label: 'Contact Form' },
    { id: 'booking', label: 'Booking / Scheduling' },
    { id: 'ecommerce', label: 'E-commerce / Online Store' },
    { id: 'blog', label: 'Blog' },
    { id: 'gallery', label: 'Gallery / Portfolio' },
    { id: 'social', label: 'Social Media Integration' },
    { id: 'chat', label: 'Live Chat' },
    { id: 'multilang', label: 'Multi-language' },
    { id: 'members', label: 'Member Login Area' },
    { id: 'animations', label: 'Custom Animations' },
];

const existingAssets = [
    { id: 'logo', label: 'Logo / Branding' },
    { id: 'brand-guidelines', label: 'Brand Guidelines' },
    { id: 'photos', label: 'Professional Photos' },
    { id: 'content', label: 'Written Content' },
    { id: 'social', label: 'Social Media Accounts' },
    { id: 'domain', label: 'Domain Name' },
];

const FORMSPREE_URL = 'https://formspree.io/f/xdaawlwd';

function OnboardingWizard() {
    const searchParams = useSearchParams();

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const [formData, setFormData] = useState({
        // Step 1: Package
        package: '',
        addOns: [] as string[],

        // Step 2: Business Info
        businessName: '',
        industry: '',
        website: '',
        description: '',

        // Step 3: Project Details
        hasDomain: '' as '' | 'yes' | 'no' | 'need-help',
        domainName: '',
        competitors: '',
        designReferences: '',
        targetAudience: '',
        features: [] as string[],
        timeline: '' as '' | 'asap' | '2-4-weeks' | '1-2-months' | 'flexible',
        existingAssets: [] as string[],
        facebookUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        twitterUrl: '',
        additionalNotes: '',

        // Step 4: Contact Info
        fullName: '',
        email: '',
        phone: '',
    });

    // Set package from URL params
    useEffect(() => {
        const pkg = searchParams.get('package');
        if (pkg && packages.some(p => p.id === pkg)) {
            setFormData(prev => ({ ...prev, package: pkg }));
        }
    }, [searchParams]);

    const selectedPackage = packages.find(p => p.id === formData.package);
    const selectedAddOns = addOns.filter(a => formData.addOns.includes(a.id));
    const totalPrice = (selectedPackage?.price || 0) + selectedAddOns.reduce((sum, a) => sum + a.price, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddOnToggle = (addOnId: string) => {
        setFormData(prev => ({
            ...prev,
            addOns: prev.addOns.includes(addOnId)
                ? prev.addOns.filter(id => id !== addOnId)
                : [...prev.addOns, addOnId],
        }));
    };

    const handleFeatureToggle = (featureId: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(featureId)
                ? prev.features.filter(id => id !== featureId)
                : [...prev.features, featureId],
        }));
    };

    const handleAssetToggle = (assetId: string) => {
        setFormData(prev => ({
            ...prev,
            existingAssets: prev.existingAssets.includes(assetId)
                ? prev.existingAssets.filter(id => id !== assetId)
                : [...prev.existingAssets, assetId],
        }));
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return !!formData.package;
            case 2:
                return !!formData.businessName && !!formData.industry;
            case 3:
                return !!formData.hasDomain && !!formData.timeline;
            case 4:
                return !!formData.fullName && !!formData.email;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (isStepValid() && step < 4) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitError('');

        // Prepare form data for Formspree
        const submissionData = {
            // Package Info
            'Package': selectedPackage?.name || 'Not selected',
            'Package Price': selectedPackage ? `$${selectedPackage.price}` : 'N/A',
            'Add-ons': selectedAddOns.map(a => a.name).join(', ') || 'None',
            'Total Estimated Price': `$${totalPrice}`,

            // Business Info
            'Business Name': formData.businessName,
            'Industry': formData.industry,
            'Current Website': formData.website || 'None',
            'Business Description': formData.description || 'Not provided',

            // Project Details
            'Has Domain': formData.hasDomain === 'yes' ? `Yes - ${formData.domainName}` : formData.hasDomain === 'no' ? 'No, needs to register' : 'Needs help choosing',
            'Competitors': formData.competitors || 'Not provided',
            'Design Inspiration': formData.designReferences || 'Not provided',
            'Target Audience': formData.targetAudience || 'Not provided',
            'Features Needed': formData.features.map(f => featureOptions.find(o => o.id === f)?.label).filter(Boolean).join(', ') || 'None selected',
            'Timeline': formData.timeline === 'asap' ? 'ASAP' : formData.timeline === '2-4-weeks' ? '2-4 Weeks' : formData.timeline === '1-2-months' ? '1-2 Months' : 'Flexible',
            'Existing Assets': formData.existingAssets.map(a => existingAssets.find(o => o.id === a)?.label).filter(Boolean).join(', ') || 'None',
            'Facebook': formData.facebookUrl || 'Not provided',
            'Instagram': formData.instagramUrl || 'Not provided',
            'LinkedIn': formData.linkedinUrl || 'Not provided',
            'Twitter': formData.twitterUrl || 'Not provided',
            'Additional Notes': formData.additionalNotes || 'None',

            // Contact Info
            'Full Name': formData.fullName,
            'Email': formData.email,
            'Phone': formData.phone || 'Not provided',

            // Metadata
            '_subject': `New Website Project Request from ${formData.businessName}`,
        };

        try {
            const response = await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                setIsComplete(true);
            } else {
                const errorData = await response.json();
                setSubmitError(errorData.error || 'There was an error submitting your request. Please try again.');
            }
        } catch {
            setSubmitError('There was a network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isComplete) {
        return (
            <main className="main-below-header flex min-h-[80vh] items-center">
                    <div className="container">
                        <div className="max-w-xl mx-auto text-center">
                            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-8">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h1 className="text-3xl font-bold mb-4">Request Submitted!</h1>
                            <p className="text-lg text-muted-foreground mb-6">
                                Thank you, {formData.fullName.split(' ')[0]}! We&apos;ve received your project request.
                            </p>

                            <div className="card p-6 text-left mb-8">
                                <h2 className="font-semibold mb-4">What happens next?</h2>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">1</span>
                                        <span>Check your email ({formData.email}) for confirmation</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">2</span>
                                        <span>Our team will review your project details within 24 hours</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">3</span>
                                        <span>We&apos;ll send you a custom proposal based on your requirements</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0">4</span>
                                        <span>Once approved, we&apos;ll kick off your project!</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="card p-4 bg-muted/50 text-sm text-muted-foreground mb-8">
                                <strong>Estimated Budget:</strong> ${totalPrice.toLocaleString()} •
                                <strong> Package:</strong> {selectedPackage?.name} •
                                <strong> Business:</strong> {formData.businessName}
                            </div>

                            <Link href="/" className="btn btn-gradient">
                                Back to Home
                            </Link>
                        </div>
                    </div>
            </main>
        );
    }

    const stepLabels = ['Package', 'Business', 'Project', 'Contact'];

    return (
            <main className="main-below-header pb-12">
                <div className="container max-w-4xl">
                    {/* Progress */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            {stepLabels.map((label, i) => (
                                <div
                                    key={label}
                                    className={`flex items-center gap-2 ${i + 1 <= step ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${i + 1 < step ? 'gradient-primary text-white' :
                                        i + 1 === step ? 'border-2 border-primary text-primary' :
                                            'border-2 border-muted-foreground/30'
                                        }`}>
                                        {i + 1 < step ? '✓' : i + 1}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full gradient-primary transition-all duration-300"
                                style={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="card p-6 sm:p-8">
                                {/* Step 1: Package Selection */}
                                {step === 1 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Choose Your Package</h2>
                                        <p className="text-muted-foreground mb-6">Select the package that fits your needs</p>

                                        <div className="space-y-3 mb-8">
                                            {packages.map((pkg) => (
                                                <label
                                                    key={pkg.id}
                                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-smooth ${formData.package === pkg.id
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border hover:border-primary/50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <input
                                                            type="radio"
                                                            name="package"
                                                            value={pkg.id}
                                                            checked={formData.package === pkg.id}
                                                            onChange={handleInputChange}
                                                            className="w-5 h-5 text-primary"
                                                        />
                                                        <div>
                                                            <div className="font-semibold">{pkg.name}</div>
                                                            <div className="text-sm text-muted-foreground">Up to {pkg.pages} pages</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-sm text-muted-foreground line-through decoration-destructive/50 decoration-1">
                                                            ${pkg.originalPrice?.toLocaleString()}
                                                        </span>
                                                        <span className="font-bold text-lg text-primary">
                                                            ${pkg.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>

                                        <h3 className="font-semibold mb-3">Optional Add-ons</h3>
                                        <div className="space-y-2">
                                            {addOns.map((addon) => (
                                                <label
                                                    key={addon.id}
                                                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-smooth ${formData.addOns.includes(addon.id)
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border hover:border-primary/50'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.addOns.includes(addon.id)}
                                                            onChange={() => handleAddOnToggle(addon.id)}
                                                            className="w-4 h-4 text-primary rounded"
                                                        />
                                                        <span>{addon.name}</span>
                                                    </div>
                                                    <span className="font-medium">+${addon.price}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Business Info */}
                                {step === 2 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Tell Us About Your Business</h2>
                                        <p className="text-muted-foreground mb-6">Help us understand your needs</p>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Business Name *</label>
                                                <input
                                                    type="text"
                                                    name="businessName"
                                                    value={formData.businessName}
                                                    onChange={handleInputChange}
                                                    placeholder="Your Company Name"
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Industry *</label>
                                                <select
                                                    name="industry"
                                                    value={formData.industry}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                >
                                                    <option value="">Select your industry</option>
                                                    {industries.map((ind) => (
                                                        <option key={ind.slug} value={ind.slug}>{ind.name}</option>
                                                    ))}
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Current Website (if any)</label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleInputChange}
                                                    placeholder="https://..."
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Brief Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Tell us about your business and what you want to achieve with your new website..."
                                                    rows={3}
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Project Details */}
                                {step === 3 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Project Details</h2>
                                        <p className="text-muted-foreground mb-6">Help us better understand your project requirements</p>

                                        <div className="space-y-6">
                                            {/* Domain */}
                                            <div>
                                                <label className="block text-sm font-medium mb-3">Do you have a domain name? *</label>
                                                <div className="space-y-2">
                                                    {[
                                                        { value: 'yes', label: 'Yes, I have a domain' },
                                                        { value: 'no', label: 'No, I need to register one' },
                                                        { value: 'need-help', label: 'I need help choosing a domain' },
                                                    ].map((option) => (
                                                        <label
                                                            key={option.value}
                                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-smooth ${formData.hasDomain === option.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="hasDomain"
                                                                value={option.value}
                                                                checked={formData.hasDomain === option.value}
                                                                onChange={handleInputChange}
                                                                className="w-4 h-4 text-primary"
                                                            />
                                                            <span className="text-sm">{option.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                {formData.hasDomain === 'yes' && (
                                                    <input
                                                        type="text"
                                                        name="domainName"
                                                        value={formData.domainName}
                                                        onChange={handleInputChange}
                                                        placeholder="yourdomain.com"
                                                        className="w-full mt-3 px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                    />
                                                )}
                                            </div>

                                            {/* Competitors */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Competitor Websites
                                                    <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                                                </label>
                                                <textarea
                                                    name="competitors"
                                                    value={formData.competitors}
                                                    onChange={handleInputChange}
                                                    placeholder="List 1-3 competitor websites we should look at (one per line)&#10;https://competitor1.com&#10;https://competitor2.com"
                                                    rows={3}
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth resize-none"
                                                />
                                            </div>

                                            {/* Design References */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Design Inspiration
                                                    <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                                                </label>
                                                <textarea
                                                    name="designReferences"
                                                    value={formData.designReferences}
                                                    onChange={handleInputChange}
                                                    placeholder="Share websites you like the design of (one per line)&#10;https://example1.com&#10;https://example2.com"
                                                    rows={3}
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth resize-none"
                                                />
                                            </div>

                                            {/* Target Audience */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Target Audience
                                                    <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="targetAudience"
                                                    value={formData.targetAudience}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., Small business owners, ages 35-55, local area"
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                />
                                            </div>

                                            {/* Key Features */}
                                            <div>
                                                <label className="block text-sm font-medium mb-3">What features do you need?</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {featureOptions.map((feature) => (
                                                        <label
                                                            key={feature.id}
                                                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-smooth text-sm ${formData.features.includes(feature.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.features.includes(feature.id)}
                                                                onChange={() => handleFeatureToggle(feature.id)}
                                                                className="w-4 h-4 text-primary rounded"
                                                            />
                                                            <span>{feature.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Timeline */}
                                            <div>
                                                <label className="block text-sm font-medium mb-3">Project Timeline *</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {[
                                                        { value: 'asap', label: 'ASAP' },
                                                        { value: '2-4-weeks', label: '2-4 Weeks' },
                                                        { value: '1-2-months', label: '1-2 Months' },
                                                        { value: 'flexible', label: 'Flexible' },
                                                    ].map((option) => (
                                                        <label
                                                            key={option.value}
                                                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-smooth ${formData.timeline === option.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                                                        >
                                                            <input
                                                                type="radio"
                                                                name="timeline"
                                                                value={option.value}
                                                                checked={formData.timeline === option.value}
                                                                onChange={handleInputChange}
                                                                className="w-4 h-4 text-primary"
                                                            />
                                                            <span className="text-sm font-medium">{option.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Existing Assets */}
                                            <div>
                                                <label className="block text-sm font-medium mb-3">What do you already have?</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {existingAssets.map((asset) => (
                                                        <label
                                                            key={asset.id}
                                                            className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-smooth text-sm ${formData.existingAssets.includes(asset.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.existingAssets.includes(asset.id)}
                                                                onChange={() => handleAssetToggle(asset.id)}
                                                                className="w-4 h-4 text-primary rounded"
                                                            />
                                                            <span>{asset.label}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Social Media */}
                                            <div>
                                                <label className="block text-sm font-medium mb-3">
                                                    Social Media Accounts
                                                    <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                                                </label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <input
                                                        type="url"
                                                        name="facebookUrl"
                                                        value={formData.facebookUrl}
                                                        onChange={handleInputChange}
                                                        placeholder="Facebook URL"
                                                        className="px-3 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth text-sm"
                                                    />
                                                    <input
                                                        type="url"
                                                        name="instagramUrl"
                                                        value={formData.instagramUrl}
                                                        onChange={handleInputChange}
                                                        placeholder="Instagram URL"
                                                        className="px-3 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth text-sm"
                                                    />
                                                    <input
                                                        type="url"
                                                        name="linkedinUrl"
                                                        value={formData.linkedinUrl}
                                                        onChange={handleInputChange}
                                                        placeholder="LinkedIn URL"
                                                        className="px-3 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth text-sm"
                                                    />
                                                    <input
                                                        type="url"
                                                        name="twitterUrl"
                                                        value={formData.twitterUrl}
                                                        onChange={handleInputChange}
                                                        placeholder="Twitter / X URL"
                                                        className="px-3 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Additional Notes */}
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Additional Notes
                                                    <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                                                </label>
                                                <textarea
                                                    name="additionalNotes"
                                                    value={formData.additionalNotes}
                                                    onChange={handleInputChange}
                                                    placeholder="Anything else we should know about your project?"
                                                    rows={3}
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Contact Info */}
                                {step === 4 && (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Your Contact Information</h2>
                                        <p className="text-muted-foreground mb-6">We&apos;ll use this to send you a custom proposal</p>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Full Name *</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Email Address *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    placeholder="john@company.com"
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+1 (555) 000-0000"
                                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring transition-smooth"
                                                />
                                            </div>
                                        </div>

                                        {submitError && (
                                            <div className="mt-4 p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                                                {submitError}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                                    {step > 1 ? (
                                        <button onClick={handleBack} className="btn btn-outline">
                                            Back
                                        </button>
                                    ) : (
                                        <Link href="/pricing" className="btn btn-outline">Cancel</Link>
                                    )}

                                    {step < 4 ? (
                                        <button
                                            onClick={handleNext}
                                            disabled={!isStepValid()}
                                            className="btn btn-gradient disabled:opacity-50"
                                        >
                                            Continue
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting || !isStepValid()}
                                            className="btn btn-gradient disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Request
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card p-6 sticky top-24">
                                <h3 className="font-semibold mb-4">Request Summary</h3>

                                {selectedPackage ? (
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>{selectedPackage.name} Package</span>
                                            <span className="font-medium">${selectedPackage.price.toLocaleString()}</span>
                                        </div>

                                        {selectedAddOns.map((addon) => (
                                            <div key={addon.id} className="flex justify-between text-muted-foreground">
                                                <span>{addon.name}</span>
                                                <span>${addon.price}</span>
                                            </div>
                                        ))}

                                        <div className="pt-3 border-t border-border">
                                            <div className="flex justify-between text-lg font-bold">
                                                <span>Estimated Total</span>
                                                <span className="gradient-text">${totalPrice.toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">Final quote provided after review</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Select a package to see estimate</p>
                                )}

                                <div className="mt-6 pt-4 border-t border-border text-xs text-muted-foreground space-y-2">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Free consultation
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Custom proposal in 24h
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        No commitment required
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    );
}

export function GetStartedClient() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
        }>
            <OnboardingWizard />
        </Suspense>
    );
}
