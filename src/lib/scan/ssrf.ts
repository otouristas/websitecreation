import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

/**
 * URL hygiene for the instant scan.
 *
 * The route fetches whatever a visitor types, so before any request leaves the
 * server the target must be a public web host: http(s) only, no credentials,
 * a real dotted hostname, and every resolved address outside the private,
 * loopback, link-local and reserved ranges. Redirect hops go through the same
 * gate, so a public page cannot bounce the scanner onto an internal one.
 */

export type ScanErrorCode =
  | 'invalid_url'
  | 'blocked_host'
  | 'dns'
  | 'timeout'
  | 'unreachable'
  | 'not_html'
  | 'too_many_redirects'
  | 'rate_limited';

export class ScanError extends Error {
  readonly code: ScanErrorCode;
  readonly status: number;
  constructor(code: ScanErrorCode, status = 400) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

export function normalizeUrl(input: string): URL {
  let raw = input.trim();
  if (!raw || raw.length > 2048) throw new ScanError('invalid_url');
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new ScanError('invalid_url');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new ScanError('invalid_url');
  if (url.username || url.password) throw new ScanError('invalid_url');

  const host = url.hostname.toLowerCase();
  // Bare names (localhost, intranet hosts) and pseudo-TLDs never qualify.
  if (!host.includes('.') && !isIP(host)) throw new ScanError('blocked_host');
  if (/\.(local|localhost|internal|intranet|lan|home|corp|test|example|invalid)$/.test(host)) {
    throw new ScanError('blocked_host');
  }

  url.hash = '';
  return url;
}

function ipv4ToInt(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + Number(octet), 0) >>> 0;
}

function inCidr(ip: number, base: string, bits: number): boolean {
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ip & mask) === (ipv4ToInt(base) & mask);
}

const PRIVATE_V4: readonly [string, number][] = [
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.0.0.0', 24],
  ['192.0.2.0', 24],
  ['192.168.0.0', 16],
  ['198.18.0.0', 15],
  ['198.51.100.0', 24],
  ['203.0.113.0', 24],
  ['224.0.0.0', 4],
  ['240.0.0.0', 4],
];

export function isPrivateIp(address: string): boolean {
  const version = isIP(address);
  if (version === 4) {
    const n = ipv4ToInt(address);
    return PRIVATE_V4.some(([base, bits]) => inCidr(n, base, bits));
  }
  if (version === 6) {
    const a = address.toLowerCase();
    // IPv4-mapped (::ffff:1.2.3.4) inherits the v4 verdict.
    const mapped = a.match(/^(?:0*:)*ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIp(mapped[1]);
    if (a === '::' || a === '::1') return true;
    if (/^fe[89ab]/.test(a)) return true; // link-local fe80::/10
    if (/^f[cd]/.test(a)) return true; // unique local fc00::/7
    if (/^ff/.test(a)) return true; // multicast
    if (a.startsWith('2001:db8')) return true; // documentation
    return false;
  }
  return true;
}

/**
 * Resolves the hostname and rejects it if any address is non-public. Returns
 * the addresses so callers can log them; the fetch itself resolves again,
 * which is an accepted gap for a marketing-site scanner (no undici pinning).
 */
export async function assertPublicHost(hostname: string): Promise<string[]> {
  if (isIP(hostname)) {
    if (isPrivateIp(hostname)) throw new ScanError('blocked_host');
    return [hostname];
  }
  let records: { address: string }[];
  try {
    records = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new ScanError('dns');
  }
  if (records.length === 0) throw new ScanError('dns');
  for (const r of records) {
    if (isPrivateIp(r.address)) throw new ScanError('blocked_host');
  }
  return records.map((r) => r.address);
}
