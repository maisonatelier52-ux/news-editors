// Pure formatting / URL helpers.
//
// Deliberately has NO imports from the article data files, so client components
// can use these without pulling every article into the browser bundle.
// lib/data.js re-exports all of them, so existing server-side imports from
// '@/lib/data' keep working unchanged.

export function formatPostType(type) {
  const typeLabels = {
    'Business report': 'Business note',
    'Markets report': 'Markets note',
  };
  return typeLabels[type] || type || 'Article';
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatFullDate(date = new Date()) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatViews(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
  return num.toLocaleString();
}

// New URL structure: /:category/:slug for detail pages, /:category for
// category pages, /author/:slug for author pages.
export function getPostUrl(post) {
  return `/${post.category}/${post.slug}`;
}

export function getCategoryUrl(category) {
  const slug = typeof category === 'string' ? category : category?.slug;
  return `/${slug}`;
}

export function getAuthorUrl(author) {
  const slug = typeof author === 'string' ? author : author?.slug;
  return `/author/${slug}`;
}
