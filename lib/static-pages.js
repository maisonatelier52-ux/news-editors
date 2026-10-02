import { getSite } from '@/lib/data';

// Shared setup for the small "site information" pages (contact, privacy,
// terms, legal, and the About-the-blog pages: our team, source methodology,
// right of reply): one place for the review date, the contact mailboxes and
// the SEO metadata / JSON-LD, so every one of those pages is built the same
// way. Page copy itself lives in each page's own file under /app.
//
// `group` decides which pages are offered as "related pages" at the foot of
// each page: 'info' = contact / privacy / terms / legal, 'about' = the pages
// that explain how News Editors works.

export const LAST_UPDATED = '2026-10-02';
export const LAST_UPDATED_DISPLAY = 'October 2, 2026';

function siteDomain() {
  const { siteUrl } = getSite();
  try {
    return new URL(siteUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'news-editors.com';
  }
}

// Mailboxes printed on the information pages. They are derived from the site
// domain; change them here if the real addresses differ.
export function getContactEmails() {
  const domain = siteDomain();
  return {
    editorial: `editorial@${domain}`,
    corrections: `corrections@${domain}`,
    legal: `legal@${domain}`,
  };
}

const PAGES = {
  contact: {
    group: 'info',
    path: '/contact',
    title: 'Contact',
    label: 'Contact',
    description:
      'How to reach News Editors with story ideas, corrections, permission requests and legal or privacy matters.',
    schemaType: 'ContactPage',
  },
  'privacy-policy': {
    group: 'info',
    path: '/privacy-policy',
    title: 'Privacy Policy',
    label: 'Privacy Policy',
    description:
      'What information News Editors collects, how it is used and the choices readers have.',
    schemaType: 'WebPage',
  },
  'terms-and-conditions': {
    group: 'info',
    path: '/terms-and-conditions',
    title: 'Terms & Conditions',
    label: 'Terms & Conditions',
    description: 'The ground rules for using the News Editors website.',
    schemaType: 'WebPage',
  },
  legal: {
    group: 'info',
    path: '/legal',
    title: 'Legal',
    label: 'Legal',
    description:
      'Informational-use notice, copyright and reuse, complaints, third-party links and formal legal notices for News Editors.',
    schemaType: 'WebPage',
  },
  'our-team': {
    path: '/our-team',
    group: 'about',
    title: 'Our Team',
    label: 'Our Team',
    description:
      'News Editors publishes under one shared byline. See who is behind it, what the byline means and how to reach the team.',
    schemaType: 'AboutPage',
  },
  'source-methodology': {
    path: '/source-methodology',
    group: 'about',
    title: 'Source Methodology',
    label: 'Source Methodology',
    description:
      'How to read the sources and reading notes at the end of every News Editors post, and what a source list does and does not show.',
    schemaType: 'WebPage',
  },
  'right-of-reply-policy': {
    path: '/right-of-reply-policy',
    group: 'about',
    title: 'Right of Reply',
    label: 'Right of Reply',
    description:
      'How people and organizations named in a News Editors post can ask for their response to be considered.',
    schemaType: 'WebPage',
  },
};

export function getStaticPage(slug) {
  return PAGES[slug] || null;
}

export function getStaticPages() {
  return Object.entries(PAGES).map(([slug, page]) => ({ slug, ...page }));
}

function absoluteUrl(path) {
  const base = (getSite().siteUrl || '').replace(/\/$/, '');
  return `${base}${path}`;
}

// Next.js metadata object for one of the information pages.
export function getStaticPageMetadata(slug) {
  const page = PAGES[slug];
  if (!page) return {};
  const site = getSite();
  const url = absoluteUrl(page.path);
  const title = `${page.title} – ${site.name}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title,
      description: page.description,
      url,
      siteName: site.name,
    },
    twitter: {
      card: 'summary',
      title,
      description: page.description,
    },
  };
}

export function getStaticPageJsonLd(slug) {
  const page = PAGES[slug];
  if (!page) return null;
  const site = getSite();
  return {
    '@context': 'https://schema.org',
    '@type': page.schemaType,
    name: `${page.title} – ${site.name}`,
    description: page.description,
    url: absoluteUrl(page.path),
    inLanguage: 'en',
    dateModified: LAST_UPDATED,
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.siteUrl },
    publisher: { '@type': 'Organization', name: site.name, url: site.siteUrl },
  };
}
