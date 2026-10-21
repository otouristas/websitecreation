"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { describeAnswers, submitLead, type LeadService } from "@/lib/leads";
import { captureUtmParams, trackFormStart } from "@/lib/analytics";
import { localizedPath, type SiteLocale } from "@/lib/i18n/locale";
import { elContact } from "@/data/translations/el-contact";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { waveField, waveGhostBtn, wavePrimaryBtn } from "@/components/pages/platform-wave/ui";

/** Contact-form interests mapped onto the app pipeline's service field. */
const CONTACT_SERVICE: Record<string, LeadService> = {
  "website-creation": "webdesign",
  "website-redesign": "webdesign",
  "tourism-hotel": "webdesign",
  "rent-a-car": "webdesign",
  "travel-ai": "webdesign",
  seo: "seo",
  other: "both",
};

export function ContactFormClient({ locale = "en" }: { locale?: SiteLocale }): ReactElement {
  const isEl = locale === "el";
  const t = isEl ? elContact : null;
  const home = localizedPath(locale, "/");
  const pricing = localizedPath(locale, "/pricing");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    website: "",
    gotcha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!hasTrackedStart) {
      trackFormStart("contact");
      setHasTrackedStart(true);
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "name" || name === "email") setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /** Inline validation: only name and a valid email are required. */
  const validate = () => {
    const next: { name?: string; email?: string } = {};
    if (!formData.name.trim()) next.name = isEl ? "Γράψτε το όνομά σας." : "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      next.email = isEl ? "Γράψτε ένα έγκυρο email, π.χ. you@company.com." : "Please add a valid email, e.g. you@company.com.";
    setErrors(next);
    const first = next.name ? "name" : next.email ? "email" : null;
    if (first) document.getElementById(first)?.focus();
    return !first;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.gotcha) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const utm = captureUtmParams();
    const result = await submitLead(
      {
        _subject: `Contact form: ${formData.name}`,
        "Form Type": "Contact",
        "Full Name": formData.name,
        Email: formData.email,
        Company: formData.company || "Not provided",
        Website: formData.website || "Not provided",
        Phone: formData.phone || "Not provided",
        Service: formData.service || "Not specified",
        Message: formData.message || "Not provided",
        ...utm,
      },
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        website: formData.website,
        service: CONTACT_SERVICE[formData.service] ?? "both",
        message: describeAnswers({ Interest: formData.service, Message: formData.message, ...utm }),
        locale,
        source: "website-contact",
      },
    );

    setIsSubmitting(false);

    if (result.ok) {
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error ?? (isEl ? t!.error : "Something went wrong. Please try again."));
    }
  };

  const field = waveField;
  const label = "mb-1.5 block text-[14px] font-medium text-foreground";
  // Labels come with a typed " *"; required fields get a quiet marker instead.
  const plain = (text: string) => text.replace(/\s*\*$/, "");
  const req = (
    <span className="ml-1 text-brand" aria-hidden>
      *
    </span>
  );
  const optional = <span className="ml-1.5 text-[12px] font-normal text-muted-foreground">{isEl ? "(προαιρετικό)" : "(optional)"}</span>;

  if (isSubmitted) {
    return (
      <div
        className="mx-auto max-w-xl rounded-[22px] border border-hairline bg-surface/80 p-8 text-center shadow-[0_0_0_1px_color-mix(in_oklab,var(--success)_22%,transparent),0_30px_80px_-28px_color-mix(in_oklab,var(--primary)_40%,transparent)] sm:p-10"
        role="status"
      >
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
          <Check className="size-7" strokeWidth={2.5} aria-hidden />
        </span>
        <h2 className="mt-6 font-display text-[28px] font-semibold tracking-[-0.03em] text-foreground">
          {isEl ? t!.successTitle : "Message Sent!"}
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted-foreground">
          {isEl ? t!.successBody : "Thank you for reaching out. We'll get back to you within 24 hours."}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={home} className={waveGhostBtn}>
            {isEl ? t!.backHome : "Back to Home"}
          </Link>
          <Link href={pricing} className={wavePrimaryBtn}>
            {isEl ? t!.viewPricing : "View Pricing"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="message" className="scroll-mt-28 rounded-[22px] border border-hairline bg-surface/80 p-5 text-left shadow-[0_0_0_1px_color-mix(in_oklab,var(--primary)_18%,transparent),0_30px_80px_-28px_color-mix(in_oklab,var(--primary)_45%,transparent)] sm:p-8">
        <h2 className="font-display text-[22px] font-semibold tracking-[-0.025em] text-foreground">{isEl ? t!.formTitle : "Send a Message"}</h2>
        <p className="mt-1.5 text-[14px] text-muted-foreground">
          {isEl ? "Μόνο όνομα και email είναι υποχρεωτικά." : "Only your name and email are required."}
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <input
            type="text"
            name="gotcha"
            value={formData.gotcha}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] opacity-0"
            aria-hidden
          />

          {submitError && (
            <div role="alert" className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-destructive">
              {submitError}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={label}>
                {plain(isEl ? t!.name : "Full Name *")}
                {req}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                enterKeyHint="next"
                value={formData.name}
                onChange={handleChange}
                placeholder={isEl ? t!.namePlaceholder : "Your name"}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={field}
              />
              {errors.name ? (
                <p id="name-error" className="mt-1.5 text-[13px] font-medium text-destructive">
                  {errors.name}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="email" className={label}>
                {plain(isEl ? t!.emailLabel : "Email *")}
                {req}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="next"
                value={formData.email}
                onChange={handleChange}
                placeholder={isEl ? t!.emailPlaceholder : "you@company.com"}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={field}
              />
              {errors.email ? (
                <p id="email-error" className="mt-1.5 text-[13px] font-medium text-destructive">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={label}>
                {isEl ? t!.phone : "Phone"}
                {optional}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="next"
                value={formData.phone}
                onChange={handleChange}
                placeholder={isEl ? t!.phonePlaceholder : "+30 690 000 0000"}
                className={field}
              />
            </div>
            <div>
              <label htmlFor="website" className={label}>
                {isEl ? t!.websiteLabel : "Your website"}
                {optional}
              </label>
              <input
                type="text"
                id="website"
                name="website"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                spellCheck={false}
                enterKeyHint="next"
                value={formData.website}
                onChange={handleChange}
                placeholder={isEl ? t!.websitePlaceholder : "your-business.com"}
                aria-describedby="website-hint"
                className={field}
              />
            </div>
          </div>
          <p id="website-hint" className="-mt-2 text-[13px] text-muted-foreground">
            {isEl ? t!.websiteHint : "Add it and we reply with a free SEO audit of your site."}
          </p>

          <div>
            <label htmlFor="service" className={label}>
              {isEl ? t!.service : "What are you interested in?"}
              {optional}
            </label>
            <select id="service" name="service" value={formData.service} onChange={handleChange} className={field}>
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
            <label htmlFor="message" className={label}>
              {plain(isEl ? t!.message : "Message *")}
              {optional}
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={isEl ? t!.messagePlaceholder : "Tell us about your project..."}
              className={cn(field, "h-auto min-h-32 resize-y")}
            />
          </div>

          <details className="group rounded-2xl border border-hairline bg-background/50 px-4 py-3">
            <summary className="cursor-pointer list-none text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
              + {isEl ? t!.company : "Company"} {optional}
            </summary>
            <input
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
              aria-label={isEl ? t!.company : "Company"}
              value={formData.company}
              onChange={handleChange}
              placeholder={isEl ? t!.companyPlaceholder : "Your company"}
              className={cn(field, "mt-3")}
            />
          </details>

          <button type="submit" disabled={isSubmitting} className={cn(wavePrimaryBtn, "w-full min-h-14 text-[16px]")}>
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden />
                {isEl ? t!.submitting : "Sending..."}
              </>
            ) : (
              <>
                {isEl ? t!.submit : "Send Message"}
                <ArrowRight className="size-4" aria-hidden />
              </>
            )}
          </button>
        </form>
    </div>
  );
}
