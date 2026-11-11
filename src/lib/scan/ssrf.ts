import dns from 'node:dns/promises';
import type { LookupAddress } from 'node:dns';
import { BlockList, isIP } from 'node:net';

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
  | 'access_blocked'
  | 'upstream_rate_limited'
  | 'upstream_error'
  | 'page_too_large'
  | 'rate_limited';

export class ScanError extends Error {
  readonly code: ScanErrorCode;
  readonly status: number;
  readonly upstreamStatus?: number;
  constructor(code: ScanErrorCode, status = 400, upstreamStatus?: number) {
    super(code);
    this.code = code;
    this.status = status;
    this.upstreamStatus = upstreamStatus;
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
  if (url.username || url.password || (url.port && url.port !== '80' && url.port !== '443')) throw new ScanError('invalid_url');

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  // Bare names (localhost, intranet hosts) and pseudo-TLDs never qualify.
  if (!host.includes('.') && !isIP(host)) throw new ScanError('blocked_host');
  if (/\.(local|localhost|internal|intranet|lan|home|corp|test|example|invalid)$/.test(host)) {
    throw new ScanError('blocked_host');
  }

  url.hash = '';
  return url;
}

const blocked4 = new BlockList();
const blocked6 = new BlockList();
for (const [base, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24],
  ['192.168.0.0', 16], ['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24],
  ['224.0.0.0', 4], ['240.0.0.0', 4],
] as const) blocked4.addSubnet(base, prefix, 'ipv4');
for (const [base, prefix] of [
  ['::', 128], ['::1', 128], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8],
  ['2001:db8::', 32], ['::ffff:0:0', 96], ['64:ff9b::', 96],
] as const) blocked6.addSubnet(base, prefix, 'ipv6');

/** Mapped IPv6 is rejected as a whole, including hexadecimal encodings of private IPv4. */
export function isPrivateIp(address: string): boolean {
  const family = isIP(address);
  return family === 4 ? blocked4.check(address, 'ipv4')
    : family === 6 ? blocked6.check(address, 'ipv6') : true;
}

/** Fresh DNS lookup per actual hop. The returned address is used by the socket, never resolved again. */
export async function resolvePublicAddresses(hostname: string, signal: AbortSignal = AbortSignal.timeout(6_000)): Promise<LookupAddress[]> {
  const host = hostname.replace(/^\[|\]$/g, '');
  if (signal.aborted) throw new ScanError('timeout', 504);
  const literalFamily = isIP(host);
  if (literalFamily) {
    if (isPrivateIp(host)) throw new ScanError('blocked_host');
    return [{ address: host, family: literalFamily }];
  }
  let abort: (() => void) | undefined;
  let records: LookupAddress[];
  try {
    records = await Promise.race([
      dns.lookup(host, { all: true, verbatim: true }),
      new Promise<never>((_, reject) => {
        abort = () => reject(new ScanError('timeout', 504));
        signal.addEventListener('abort', abort, { once: true });
      }),
    ]);
  } catch (error) {
    if (error instanceof ScanError) throw error;
    throw new ScanError('dns');
  } finally {
    if (abort) signal.removeEventListener('abort', abort);
  }
  if (!records.length) throw new ScanError('dns');
  if (records.some((record) => isPrivateIp(record.address))) throw new ScanError('blocked_host');
  return records;
}

/** Compatibility guard for the older audit probe; the instant scan also pins its socket. */
export async function assertPublicHost(hostname: string): Promise<string[]> {
  return (await resolvePublicAddresses(hostname)).map((record) => record.address);
}
