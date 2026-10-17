/**
 * Slot reservation for the Website Launch Offer.
 *
 * A place is held only when a quote has been accepted and the deposit is
 * confirmed. The check is transactional at the call site: this function is
 * the pure decision, given the current reserved count and an idempotency key.
 * The same key does not consume a second place.
 */

export interface Reservation {
  readonly key: string;
  readonly packageId: string;
  readonly quoteId: string;
  readonly reservedAt: string;
  readonly expiresAt: string;
  readonly status: 'held' | 'confirmed' | 'cancelled' | 'expired';
}

export interface CapacityBook {
  readonly total: number;
  readonly reservations: readonly Reservation[];
}

export type ReserveResult =
  | { readonly ok: true; readonly book: CapacityBook; readonly duplicate: boolean }
  | { readonly ok: false; readonly reason: 'ineligible' | 'unverified' | 'sold_out' | 'not_acceptable'; readonly book: CapacityBook };

function holding(book: CapacityBook, nowMs: number): readonly Reservation[] {
  return book.reservations.filter((row) => {
    if (row.status === 'cancelled' || row.status === 'expired') return false;
    if (row.status === 'held' && Date.parse(row.expiresAt) <= nowMs) return false;
    return row.status === 'held' || row.status === 'confirmed';
  });
}

export function reservedCount(book: CapacityBook, nowMs: number): number {
  return holding(book, nowMs).length;
}

export function tryReserveSlot(input: {
  readonly book: CapacityBook;
  readonly key: string;
  readonly packageId: string;
  readonly quoteId: string;
  readonly eligible: boolean;
  readonly capacityVerified: boolean;
  readonly depositConfirmed: boolean;
  readonly quoteAccepted: boolean;
  readonly nowMs: number;
  readonly expiresAt: string;
}): ReserveResult {
  const existing = input.book.reservations.find((row) => row.key === input.key);
  if (existing && (existing.status === 'held' || existing.status === 'confirmed')) {
    return { ok: true, book: input.book, duplicate: true };
  }
  if (!input.eligible) return { ok: false, reason: 'ineligible', book: input.book };
  if (!input.capacityVerified) return { ok: false, reason: 'unverified', book: input.book };
  if (!input.quoteAccepted || !input.depositConfirmed) {
    return { ok: false, reason: 'not_acceptable', book: input.book };
  }
  const used = reservedCount(input.book, input.nowMs);
  if (used >= input.book.total) return { ok: false, reason: 'sold_out', book: input.book };
  const next: Reservation = {
    key: input.key,
    packageId: input.packageId,
    quoteId: input.quoteId,
    reservedAt: new Date(input.nowMs).toISOString(),
    expiresAt: input.expiresAt,
    status: 'confirmed',
  };
  return { ok: true, duplicate: false, book: { ...input.book, reservations: [...input.book.reservations, next] } };
}

export function cancelReservation(book: CapacityBook, key: string): CapacityBook {
  return {
    ...book,
    reservations: book.reservations.map((row) => (row.key === key ? { ...row, status: 'cancelled' } : row)),
  };
}
