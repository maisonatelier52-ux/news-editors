import fs from 'node:fs';
import path from 'node:path';
import { getSite, getAuthorBySlug, getPostUrl, getCategoryUrl, getAuthorUrl } from '@/lib/data';

// Centralizes SEO output (Next.js metadata objects + JSON-LD structured
// data) so every page type builds it the same way from the same source
// fields. Article-level overrides live on each post's `seo` object in the
// per-category JSON files; everything else falls back sensibly.
//
// Day 2 (modern SEO): NewsArticle enrichment, NewsMediaOrganization with
// sameAs, FAQPage helper, robots on metadata, richer Person schema.

function absoluteUrl(path) {
  const site = getSite();
  const base = (site.siteUrl || '').replace(/\/$/, '');
  if (!path) return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

// Origin used for image URLs (og:image, twitter:image, JSON-LD images).
// Always the production domain so crawlers never fetch share images from
// a preview host (e.g. *.vercel.app).
function imageOrigin() {
  return absoluteUrl('');
}

function absoluteImage(imagePath) {
  if (!imagePath) return undefined;
  if (/^https?:\/\//.test(imagePath)) return imagePath;
  return `${imageOrigin()}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
}

// Social profile URLs for Organization / Person sameAs.
// Prefer site.sameAs from data/json/site.json; fall back to the known
// public profiles used in the Footer so schema stays complete even if
// site.json is not yet updated.
function getSiteSameAs() {
  const site = getSite();
  if (Array.isArray(site.sameAs) && site.sameAs.length) {
    return site.sameAs.filter(Boolean);
  }
  return [
    'https://x.com/news_editors',
    'https://www.instagram.com/newseditors_/',
    'https://substack.com/@newseditors',
    'https://medium.com/@editornews65',
  ];
}

// Link-preview image for an article. Prefers the 1200x630 JPEG produced by
// scripts/generate-og-images.mjs (public/og/<slug>.jpg); falls back to the
// original hero image, without claiming dimensions we can't vouch for.
function getShareImage(post) {
  const source = post.seo?.ogImage || post.image;
  if (!source) return undefined;
  if (/^https?:\/\//.test(source)) return { url: source };

  const generated = `/og/${post.slug}.jpg`;
  if (fs.existsSync(path.join(process.cwd(), 'public', generated))) {
    return { url: absoluteImage(generated), width: 1200, height: 630, type: 'image/jpeg' };
  }
  return { url: absoluteImage(source) };
}

// ---------- Site-wide Organization / WebSite (layout) ----------

/**
 * NewsMediaOrganization JSON-LD for the root layout.
 * Includes logo, sameAs social profiles, and optional contactPoint.
 */
export function getOrganizationJsonLd() {
  const site = getSite();
  const sameAs = getSiteSameAs();
  const logoUrl = absoluteImage(site.logo);

  const org = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: site.name,
    url: site.siteUrl,
    description: site.description || site.tagline,
    logo: logoUrl
      ? {
          '@type': 'ImageObject',
          url: logoUrl,
        }
      : undefined,
    sameAs: sameAs.length ? sameAs : undefined,
  };

  if (site.contactEmail) {
    org.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'editorial',
      email: site.contactEmail,
      url: absoluteUrl('/contact'),
    };
  }

  return org;
}

/**
 * WebSite JSON-LD with SearchAction (sitelinks search box signal).
 */
export function getWebsiteJsonLd() {
  const site = getSite();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.siteUrl,
    description: site.description || site.tagline,
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: site.name,
      url: site.siteUrl,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };
}

// ---------- Article (detail page) ----------

export function getArticleMetadata(post) {
  if (!post) return {};
  const site = getSite();
  const seo = post.seo || {};
  const url = getPostUrl(post);
  const title = seo.metaTitle || post.title;
  const description = seo.metaDescription || post.subtitle || post.excerpt;
  const shareImage = getShareImage(post);
  const author = getAuthorBySlug(post.author);

  return {
    title,
    description,
    keywords: seo.keywords?.length ? seo.keywords : post.tags,
    alternates: {
      canonical: absoluteUrl(url),
    },
    authors: author ? [{ name: author.name, url: absoluteUrl(getAuthorUrl(author)) }] : undefined,
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      type: 'article',
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: absoluteUrl(url),
      siteName: site.name,
      locale: 'en_US',
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: author ? [author.name] : undefined,
      section: post.category,
      tags: post.tags,
      images: shareImage
        ? [
            {
              ...shareImage,
              alt: seo.ogTitle || title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle || seo.ogTitle || title,
      description: seo.twitterDescription || seo.ogDescription || description,
      images: shareImage ? [shareImage.url] : undefined,
    },
  };
}

/**
 * NewsArticle JSON-LD for a detail page.
 * Publisher is NewsMediaOrganization; author is Person with profile URL.
 */
export function getArticleJsonLd(post) {
  if (!post) return null;
  const site = getSite();
  const seo = post.seo || {};
  const url = absoluteUrl(getPostUrl(post));
  const image = absoluteImage(seo.ogImage || post.image);
  const author = getAuthorBySlug(post.author);
  const sameAs = getSiteSameAs();

  const authorNode = author
    ? {
        '@type': 'Person',
        name: author.name,
        url: absoluteUrl(getAuthorUrl(author)),
        image: absoluteImage(author.avatar) || undefined,
        jobTitle: author.role || undefined,
      }
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: seo.metaTitle || post.title,
    description: seo.metaDescription || post.subtitle || post.excerpt,
    image: image ? [image] : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: authorNode,
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: site.name,
      url: site.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: absoluteImage(site.logo),
      },
      sameAs: sameAs.length ? sameAs : undefined,
    },
    articleSection: post.category,
    keywords: (seo.keywords?.length ? seo.keywords : post.tags)?.join(', '),
    isAccessibleForFree: true,
    inLanguage: 'en-US',
  };
}

/**
 * FAQPage JSON-LD. Pass an array of { question, answer } objects.
 * Use on static pages or articles that define post.seo.faq / post.faq.
 */
export function getFaqJsonLd(faqItems) {
  if (!Array.isArray(faqItems) || faqItems.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems
      .filter((item) => item && item.question && item.answer)
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
  };
}

/** FAQ items from a post when authors add seo.faq or faq on the article JSON. */
export function getArticleFaqJsonLd(post) {
  if (!post) return null;
  const items = post.seo?.faq || post.faq;
  return getFaqJsonLd(items);
}

// BreadcrumbList JSON-LD shared by category and detail pages.
export function getBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? absoluteUrl(item.href) : undefined,
    })),
  };
}

// Breadcrumb trail (plain data) for a detail page: Home > Category > Title.
export function getArticleBreadcrumbItems(post, category) {
  return [
    { label: 'Home', href: '/' },
    { label: category?.name || post.category, href: getCategoryUrl(post.category) },
    { label: post.title },
  ];
}

// ---------- Category page ----------

export function getCategoryMetadata(category) {
  if (!category) return {};
  const site = getSite();
  const url = getCategoryUrl(category);
  const title = category.name;
  const description = category.description;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(url),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      title: `${title} – ${site.name}`,
      description,
      url: absoluteUrl(url),
      siteName: site.name,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: `${title} – ${site.name}`,
      description,
    },
  };
}

export function getCategoryBreadcrumbItems(category) {
  const items = [{ label: 'Home', href: '/' }];
  if (category?.parent) {
    items.push({ label: capitalize(category.parent), href: `/${category.parent}` });
  }
  items.push({ label: category.name });
  return items;
}

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ---------- Author page ----------

export function getAuthorMetadata(author) {
  if (!author) return {};
  const site = getSite();
  const url = getAuthorUrl(author);
  const title = author.name;
  const description = author.bio;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(url),
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'profile',
      title: `${title} – ${site.name}`,
      description,
      url: absoluteUrl(url),
      siteName: site.name,
      images: author.avatar ? [{ url: absoluteImage(author.avatar) }] : undefined,
    },
    twitter: {
      card: 'summary',
      title: `${title} – ${site.name}`,
      description,
      images: author.avatar ? [absoluteImage(author.avatar)] : undefined,
    },
  };
}

export function getAuthorJsonLd(author) {
  if (!author) return null;
  const site = getSite();
  const sameAs = (author.socials || [])
    .map((s) => s.href)
    .filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: absoluteUrl(getAuthorUrl(author)),
    image: absoluteImage(author.avatar),
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      '@type': 'NewsMediaOrganization',
      name: site.name,
      url: site.siteUrl,
    },
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function getAuthorBreadcrumbItems(author) {
  return [{ label: 'Home', href: '/' }, { label: author.name }];
}
