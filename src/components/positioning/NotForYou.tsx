import type { SiteLocale } from '@/lib/i18n/locale';
import { Section, SectionHeading } from '@/components/landing/primitives';

/**
 * Lead qualification, stated plainly.
 *
 * The point is to filter, not to insult: nothing here disparages a small
 * budget, it just says what this engagement assumes. Appears on /pricing,
 * the SEO service pages and /get-started.
 */
export function NotForYou({
  locale = 'en',
  compact = false,
}: {
  locale?: SiteLocale;
  compact?: boolean;
}) {
  const isEl = locale === 'el';

  const body = isEl
    ? {
        eyebrow: 'Ειλικρίνεια',
        title: 'Δεν ψάχνετε απλώς το φθηνότερο SEO',
        lead: 'Αν το βασικό κριτήριο επιλογής σας είναι η χαμηλότερη δυνατή τιμή ή μια λύση με μηδενικό budget, πιθανότατα δεν είμαστε ο κατάλληλος συνεργάτης.',
        para: 'Δεν πουλάμε έτοιμα πακέτα SEO χωρίς να εξετάσουμε πρώτα την επιχείρηση, την αγορά και τον ανταγωνισμό σας. Δεν υποσχόμαστε πρώτη θέση στη Google ούτε αποτελέσματα σε λίγες ημέρες. Αναλύουμε τα δεδομένα, εντοπίζουμε τις πραγματικές ευκαιρίες και δημιουργούμε στρατηγική ειδικά για το δικό σας project.',
        notTitle: 'Πιθανότατα δεν ταιριάζουμε αν:',
        not: [
          'ψάχνετε τον φθηνότερο πάροχο της αγοράς',
          'περιμένετε εγγυημένη πρώτη θέση στη Google',
          'περιμένετε αποτελέσματα SEO μέσα σε λίγες ημέρες',
          'θέλετε δεκάδες άρθρα με AI χωρίς στρατηγική',
          'δεν υπάρχει διάθεση για τεχνικές βελτιώσεις στο site',
          'το SEO αντιμετωπίζεται ως εφάπαξ ενέργεια',
        ],
        yesTitle: 'Ταιριάζουμε αν:',
        yes: [
          'βλέπετε την οργανική ανάπτυξη ως επένδυση, όχι ως έξοδο',
          'θέλετε στρατηγική βασισμένη στα δικά σας δεδομένα',
          'είστε διατεθειμένοι να υλοποιήσετε τις προτάσεις',
          'σας ενδιαφέρουν ποιοτικά leads, όχι απλώς επισκεψιμότητα',
          'θέλετε συνεργάτη που εξηγεί τι κάνει και γιατί',
        ],
      }
    : {
        eyebrow: 'Straight talk',
        title: 'We are not the cheapest option, and we are not for everyone',
        lead: 'If your main criterion is the lowest possible price, or the budget is effectively zero, we are probably not the right partner.',
        para: 'We do not sell prepackaged SEO without first examining your business, your market and your competition. We do not promise first position on Google, and we do not promise results in days. We analyse the data, find the real opportunities, and build a strategy for your specific project.',
        notTitle: 'We are probably not a fit if you:',
        not: [
          'are looking for the cheapest provider available',
          'expect guaranteed number one rankings',
          'expect SEO results within days',
          'want dozens of AI articles with no strategy behind them',
          'are not willing to make technical improvements to the site',
          'see SEO as a one-off task rather than an ongoing programme',
        ],
        yesTitle: 'We are a fit if you:',
        yes: [
          'treat organic growth as an investment rather than a cost',
          'want a strategy built on your own data',
          'are prepared to implement the recommendations',
          'care about qualified leads, not raw traffic',
          'want a partner who explains what they are doing and why',
        ],
      };

  const Inner = (
    <>
      <p className="max-w-3xl text-base leading-relaxed text-foreground md:text-lg">{body.lead}</p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {body.para}
      </p>

      <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-hairline bg-hairline md:grid-cols-2">
        <div className="bg-surface p-7">
          <h3 className="font-display text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {body.notTitle}
          </h3>
          <ul className="mt-5 space-y-3">
            {body.not.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-muted-foreground/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface p-7">
          <h3 className="font-display text-sm font-medium uppercase tracking-[0.14em] text-brand">
            {body.yesTitle}
          </h3>
          <ul className="mt-5 space-y-3">
            {body.yes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  if (compact) {
    return (
      <div className="rounded-[10px] border border-hairline bg-surface p-7 md:p-9">
        <h2 className="font-display text-2xl font-medium tracking-[-0.03em] text-foreground">
          {body.title}
        </h2>
        <div className="mt-5">{Inner}</div>
      </div>
    );
  }

  return (
    <Section id="fit">
      <SectionHeading align="left" eyebrow={body.eyebrow} title={body.title} className="mb-8" />
      {Inner}
    </Section>
  );
}
