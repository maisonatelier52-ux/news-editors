import {
  getAllPosts,
  getAllCategories,
  getAllAuthors,
  getSite,
} from '@/lib/data';

/** Required for next.config `output: 'export'` */
export const dynamic = 'force-static';

/**
 * Next.js App Router sitemap (static export compatible).
 * New articles in category JSON files are included on each build.
 */
export default function sitemap() {
  const site = getSite();
  const SITE_URL = (
    site?.siteUrl ||
    site?.url ||
    'https://www.news-editors.com'
  ).replace(/\/$/, '');
  const now = new Date();

  const staticPages = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/editorial-standards`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ];

  const categoryPages = getAllCategories().map((category) => ({
    url: `${SITE_URL}/${category.slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const articlePages = getAllPosts().map((post) => ({
    url: `${SITE_URL}/${post.category}/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const authorPages = getAllAuthors().map((author) => ({
    url: `${SITE_URL}/author/${author.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...articlePages, ...authorPages];
}
