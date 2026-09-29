import { getSite, getAuthorBySlug, getPostUrl, getCategoryUrl, getAuthorUrl } from '@/lib/data';

// Centralizes SEO output (Next.js metadata objects + JSON-LD structured
// data) so every page type builds it the same way from the same source
// fields. Article-level overrides live on each post's `seo` object in the
// per-category JSON files; everything else falls back sensibly.

function absoluteUrl(path) {
  const site = getSite();
  const base = (site.siteUrl || '').replace(/\/$/, '');
  if (!path) return base;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

function absoluteImage(imagePath) {
  if (!imagePath) return undefined;
  if (/^https?:\/\//.test(imagePath)) return imagePath;
  return absoluteUrl(imagePath);
}

// ---------- Article (detail page) ----------

export function getArticleMetadata(post) {
  if (!post) return {};
  const site = getSite();
  const seo = post.seo || {};
  const url = getPostUrl(post);
  const title = seo.metaTitle || post.title;
  const description = seo.metaDescription || post.subtitle || post.excerpt;
  const ogImage = absoluteImage(seo.ogImage || post.image);
  const author = getAuthorBySlug(post.author);

  return {
    title,
    description,
    keywords: seo.keywords?.length ? seo.keywords : post.tags,
    alternates: {
      canonical: absoluteUrl(url),
    },
    authors: author ? [{ name: author.name, url: absoluteUrl(getAuthorUrl(author)) }] : undefined,
    openGraph: {
      type: 'article',
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      url: absoluteUrl(url),
      siteName: site.name,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: author ? [author.name] : undefined,
      section: post.category,
      tags: post.tags,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 675, alt: seo.ogTitle || title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle || seo.ogTitle || title,
      description: seo.twitterDescription || seo.ogDescription || description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

// BlogPosting JSON-LD for a detail page. Returned as a plain object; the
// page component is responsible for serializing it into a <script> tag.
export function getArticleJsonLd(post) {
  if (!post) return null;
  const site = getSite();
  const seo = post.seo || {};
  const url = absoluteUrl(getPostUrl(post));
  const image = absoluteImage(seo.ogImage || post.image);
  const author = getAuthorBySlug(post.author);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    headline: seo.metaTitle || post.title,
    description: seo.metaDescription || post.subtitle || post.excerpt,
    image: image ? [image] : undefined,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: author
      ? { '@type': 'Person', name: author.name, url: absoluteUrl(getAuthorUrl(author)) }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteImage(site.logo),
      },
    },
    articleSection: post.category,
    keywords: (seo.keywords?.length ? seo.keywords : post.tags)?.join(', '),
  };
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
    openGraph: {
      type: 'website',
      title: `${title} – ${site.name}`,
      description,
      url: absoluteUrl(url),
      siteName: site.name,
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
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: absoluteUrl(getAuthorUrl(author)),
    image: absoluteImage(author.avatar),
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      '@type': 'Organization',
      name: site.name,
    },
  };
}

export function getAuthorBreadcrumbItems(author) {
  return [{ label: 'Home', href: '/' }, { label: author.name }];
}
