import { notFound } from 'next/navigation';

/** Unknown localized URLs inherit the shared branded 404 and locale layout. */
export default function MissingPage() {
  notFound();
}
