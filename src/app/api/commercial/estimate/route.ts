import { buildEstimate, normalizeInput, type EstimateInput } from '@/lib/estimate/model';
import { amountsMatch, consumeRate, payloadHasPii } from '@/lib/commercial/ledger';
import { eurosToCents, type VatTreatment } from '@/data/commercial/money';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WINDOW_MS = 60_000;
const LIMIT = 20;
const buckets = new Map<string, { count: number; resetAt: number }>();

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  const host = req.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function treatmentOf(value: unknown): VatTreatment {
  if (value === 'eu_b2b_reverse_charge' || value === 'non_eu' || value === 'gr_standard') return value;
  return 'gr_standard';
}

export async function POST(req: Request): Promise<Response> {
  if (!sameOrigin(req)) return Response.json({ error: 'bad_origin' }, { status: 403 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const current = buckets.get(ip);
  const decision = consumeRate(current, Date.now(), LIMIT, WINDOW_MS);
  buckets.set(ip, decision.bucket);
  if (decision.limited) return Response.json({ error: 'rate_limited' }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }
  if (payloadHasPii(body)) return Response.json({ error: 'pii_rejected' }, { status: 400 });

  const input = normalizeInput(body as Partial<EstimateInput>);
  const treatment = treatmentOf(body.vatTreatment);
  const estimate = buildEstimate(input, undefined, treatment);
  const serverNetCents = eurosToCents(estimate.oneOffNet);
  if (body.claimedNetCents !== undefined && !amountsMatch(Number(body.claimedNetCents), serverNetCents)) {
    return Response.json({ error: 'amount_mismatch', serverNetCents }, { status: 409 });
  }

  return Response.json({
    serverNetCents,
    serverGrossCents: eurosToCents(estimate.oneOffGross),
    discountNetCents: eurosToCents(estimate.discountNet),
    extrasNetCents: eurosToCents(estimate.extrasNet),
    depositNetCents: eurosToCents(estimate.depositNet),
    includedSeoMonths: estimate.includedSeoMonths,
    bandFloorCents: eurosToCents(estimate.bandFloorNet),
    vatTreatment: treatment,
  });
}
