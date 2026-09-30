import { getSite } from '@/lib/data';

/**
 * Next.js App Router robots.txt.
 * Points crawlers at the generated sitemap.
 */
export default function robots() {
  const site = getSite();
  const SITE_URL = (site?.siteUrl || 'https://www.news-editors.com').replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/search?'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
