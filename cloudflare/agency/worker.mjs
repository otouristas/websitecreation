import { scanResponse } from './scan-service.mjs';
import handler from 'vinext/server/fetch-handler';
import { AGENCY_DOMAIN, comPathForAgencyDomain, agencyDomainPath, isAgencyPathname } from '../../src/lib/site-split';
import { htmlToPageMarkdown } from '../../src/lib/markdown/page-markdown';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const preview = url.hostname !== AGENCY_DOMAIN && url.hostname !== `www.${AGENCY_DOMAIN}`;
    let response;
    if (preview && url.pathname === '/robots.txt') {
      response = new Response('User-agent: *\nDisallow: /\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    } else if (url.pathname === '/llms.txt' || url.pathname === '/llms-full.txt') {
      response = await env.ASSETS.fetch(new URL('/agency-domain-llms.txt', url));
    } else {
      // The HTML and Markdown twins share one render, including canonical URLs.
      const markdown = ['GET', 'HEAD'].includes(request.method) && (url.pathname.endsWith('.md') || request.headers.get('accept')?.includes('text/markdown'));
      const path = url.pathname.replace(/\.md$/, '') || '/';
      if (markdown && (comPathForAgencyDomain(path) || isAgencyPathname(path))) {
        url.pathname = isAgencyPathname(path) ? agencyDomainPath(path) : path;
        const htmlRequest = new Request(url, { headers: { accept: 'text/html' } });
        const html = await handler.fetch(htmlRequest, env, ctx);
        if (!html.ok || !html.headers.get('content-type')?.includes('text/html')) return html;
        const { body, canonical } = htmlToPageMarkdown(await html.text(), url.href);
        response = new Response(request.method === 'HEAD' ? null : body, { headers: {
          'content-type': 'text/markdown; charset=utf-8', 'x-robots-tag': 'noindex', link: `<${canonical}>; rel="canonical"`, vary: 'Accept',
        } });
      } else {
        response = await scanResponse(request, url.pathname) ?? await handler.fetch(request, env, ctx);
      }
    }
    if (!preview) return response;
    const headers = new Headers(response.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
