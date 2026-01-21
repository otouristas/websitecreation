'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        website: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <section className="section bg-muted/30 bg-pattern" id="contact">
                <div className="container">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We've received your request. Our SEO experts will review your information
                            and get back to you within 24 hours.
                        </p>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="btn btn-outline"
                        >
                            Submit Another Request
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section bg-muted/30 bg-pattern" id="contact">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column - Info */}
                    <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            Get Started
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                            Ready to{' '}
                            <span className="gradient-text">Dominate Search</span>?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Fill out the form and get a free, comprehensive SEO audit of your website.
                            No obligations, just actionable insights.
                        </p>

                        {/* Benefits */}
                        <ul className="space-y-4 mb-8">
                            {[
                                'Free comprehensive SEO audit',
                                'Custom strategy recommendations',
                                'Competitor analysis included',
                                'Response within 24 hours',
                            ].map((benefit) => (
                                <li key={benefit} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Trust Signal */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                            <div className="flex -space-x-2">
                                {['JD', 'AM', 'SK'].map((initials, i) => (
                                    <div
                                        key={initials}
                                        className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-semibold border-2 border-background"
                                        style={{ zIndex: 3 - i }}
                                    >
                                        {initials}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="font-semibold">Join 500+ Happy Clients</div>
                                <div className="text-sm text-muted-foreground">
                                    Average 340% traffic increase
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="card p-6 sm:p-8 lg:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name & Email */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            {/* Company & Website */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                                        placeholder="Your Company"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                                        Website URL *
                                    </label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        required
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                            </div>

                            {/* Budget */}
                            <div>
                                <label htmlFor="budget" className="block text-sm font-medium mb-2">
                                    Monthly Budget
                                </label>
                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                                >
                                    <option value="">Select a range</option>
                                    <option value="500-1000">€500 - €1,000</option>
                                    <option value="1000-2500">€1,000 - €2,500</option>
                                    <option value="2500-5000">€2,500 - €5,000</option>
                                    <option value="5000+">€5,000+</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Tell Us About Your Goals
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                                    placeholder="What are your main SEO challenges and goals?"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-gradient w-full text-lg py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        Get My Free Audit
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>

                            {/* Privacy Note */}
                            <p className="text-xs text-center text-muted-foreground">
                                By submitting this form, you agree to our{' '}
                                <a href="/privacy" className="text-primary hover:underline">
                                    Privacy Policy
                                </a>
                                . We'll never share your data with third parties.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
