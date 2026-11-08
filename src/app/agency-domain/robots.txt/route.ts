import { NextResponse } from 'next/server';
import { agencyRobotsTxt } from '@/lib/agency-domain-seo';

/** anotherseoguru.gr/robots.txt (rewritten here by the middleware). */
export function GET() {
  return new NextResponse(agencyRobotsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'X-Robots-Tag': 'noindex' },
  });
}
