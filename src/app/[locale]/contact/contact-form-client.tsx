"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { submitToFormspree } from "@/lib/formspree";
import { captureUtmParams, trackFormStart, trackLead } from "@/lib/analytics";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { elContact } from "@/data/translations/el-contact";

export function ContactFormClient({ locale = "en" }: { locale?: SiteLocale }): ReactElement {
  const isEl = locale === "el";
  const t = isEl ? elContact : null;
  const home = localizedPath(locale, "/");
  const pricing = localizedPath(locale, "/pricing");
  const getStarted = localizedPath(locale, "/get-started");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!hasTrackedStart) {
      trackFormStart("contact");
      setHasTrackedStart(true);
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const utm = captureUtmParams();
    const result = await submitToFormspree({
      _subject: `Contact form: ${formData.name}`,
      "Form Type": "Contact",
      "Full Name": formData.name,
      Email: formData.email,
      Company: formData.company || "Not provided",
      Phone: formData.phone || "Not provided",
      Service: formData.service || "Not specified",
      Message: formData.message,
      ...utm,
    });

    setIsSubmitting(false);

    if (result.ok) {
      trackLead("contact", { service: formData.service || "unspecified" });
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error ?? (isEl ? t!.error : "Something went wrong. Please try again."));
    }
  };

  if (isSubmitted) {
    return (
      <main className="main-below-header flex min-h-[80vh] items-center">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-4 text-3xl font-bold">{isEl ? t!.successTitle : "Message Sent!"}</h1>
            <p className="mb-8 text-muted-foreground">
              {isEl ? t!.successBody : "Thank you for reaching out. We'll get back to you within 24 hours."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href={home} className="btn btn-outline">
                {isEl ? t!.backHome : "Back to Home"}
              </Link>
              <Link href={pricing} className="btn btn-gradient">
                {isEl ? t!.viewPricing : "View Pricing"}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main-below-header" lang={isEl ? "el" : undefined}>
      <section className="section gradient-hero">
        <div className="container">
          <div className="max-w-2xl">
            <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={home} className="hover:text-primary">
                {isEl ? t!.breadcrumbHome : "Home"}
              </Link>
              <span>/</span>
              <span className="text-foreground">{isEl ? t!.breadcrumbContact : "Contact"}</span>
            </nav>
            <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
              {isEl ? t!.h1 : "Let's Talk About Your Project"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isEl ? t!.intro : "Have a question or ready to get started? Send us a message and we'll get back to you within 24 hours."}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="mb-6 text-2xl font-bold">{isEl ? t!.getInTouch : "Get in Touch"}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{isEl ? t!.email : "Email"}</h3>
                      <a
                        href="mailto:hello@anotherseoguru.com"
                        className="text-muted-foreground transition-smooth hover:text-primary"
                      >
                        hello@anotherseoguru.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{isEl ? t!.responseTime : "Response Time"}</h3>
                      <p className="text-muted-foreground">{isEl ? t!.responseValue : "Within 24 hours"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{isEl ? t!.serving : "Serving"}</h3>
                      <p className="text-muted-foreground">{isEl ? t!.servingValue : "Clients worldwide"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-muted/50 p-6">
                <h3 className="mb-4 font-semibold">{isEl ? t!.readyTitle : "Ready to start?"}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {isEl
                    ? t!.readyBody
                    : "Skip the form and go straight to our onboarding wizard to choose your package and get started today."}
                </p>
                <Link href={getStarted} className="btn btn-gradient w-full">
                  {isEl ? t!.readyCta : "Start Your Project"}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="card p-6 sm:p-8">
                <h2 className="mb-6 text-xl font-bold">{isEl ? t!.formTitle : "Send a Message"}</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute -left-[9999px] opacity-0"
                    aria-hidden
                  />

                  {submitError && (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {submitError}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        {isEl ? t!.name : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={isEl ? t!.namePlaceholder : "Your name"}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        {isEl ? t!.emailLabel : "Email *"}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={isEl ? t!.emailPlaceholder : "you@company.com"}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="mb-2 block text-sm font-medium">
                        {isEl ? t!.company : "Company"}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={isEl ? t!.companyPlaceholder : "Your company"}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                        {isEl ? t!.phone : "Phone"}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={isEl ? t!.phonePlaceholder : "+1 (555) 000-0000"}
                        className="w-full rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="mb-2 block text-sm font-medium">
                      {isEl ? t!.service : "What are you interested in?"}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:ring-2 focus:ring-ring"
                    >
                      <option value="">{isEl ? t!.servicePlaceholder : "Select an option"}</option>
                      <option value="website-creation">{isEl ? t!.services["website-creation"] : "New Website"}</option>
                      <option value="website-redesign">{isEl ? t!.services["website-redesign"] : "Website Redesign"}</option>
                      <option value="tourism-hotel">{isEl ? t!.services["tourism-hotel"] : "Tourism / Hotel Website"}</option>
                      <option value="rent-a-car">{isEl ? t!.services["rent-a-car"] : "Rent-a-Car Website"}</option>
                      <option value="travel-ai">{isEl ? t!.services["travel-ai"] : "Travel AI Chatbot"}</option>
                      <option value="seo">{isEl ? t!.services.seo : "SEO / GEO / AEO Services"}</option>
                      <option value="other">{isEl ? t!.services.other : "Other / Not Sure"}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      {isEl ? t!.message : "Message *"}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={isEl ? t!.messagePlaceholder : "Tell us about your project..."}
                      className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 transition-smooth focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-gradient w-full py-4 text-lg">
                    {isSubmitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {isEl ? t!.submitting : "Sending..."}
                      </>
                    ) : (
                      isEl ? t!.submit : "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
