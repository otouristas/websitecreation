import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="blueprint-grid relative z-0 flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
      <h1 className="font-display text-3xl font-medium tracking-[-0.03em] text-foreground sm:text-4xl">
        Η σελίδα δεν βρέθηκε / Page not found
      </h1>
      <p className="max-w-md text-muted-foreground">
        Η σελίδα που ψάχνετε δεν υπάρχει ή έχει μετακινηθεί. The page you are looking for does not
        exist or has moved.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/el"
          className="rounded-[8px] bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
        >
          Αρχική σελίδα
        </Link>
        <Link
          href="/en"
          className="rounded-[8px] border border-hairline px-5 py-2.5 text-sm font-bold text-foreground transition hover:bg-muted"
        >
          English homepage
        </Link>
      </div>
    </main>
  );
}
