import { getSite } from '@/lib/data';

/** Required for next.config `output: 'export'` */
export const dynamic = 'force-static';

/**
 * Next.js App Router robots.txt (static export compatible).
 */
export default function robots() {
  const site = getSite();
  const SITE_URL = (
    site?.siteUrl ||
    site?.url ||
    'https://www.news-editors.com'
  ).replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
