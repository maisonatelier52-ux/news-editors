import categoriesData from '@/data/json/categories.json';
import authorsData from '@/data/json/authors.json';
import siteData from '@/data/json/site.json';

// Per-category article files, imported eagerly (small dataset, no build
// step needed). Keyed by category slug so lookups stay O(1). Every slug
// listed in categories.json — including "reviews" sub-categories like
// "phones" or "cameras" — has its own file here.
import us from '@/data/categories/us.json';
import world from '@/data/categories/world.json';
import business from '@/data/categories/business.json';
import finance from '@/data/categories/finance.json';
import reviews from '@/data/categories/reviews.json';
import phones from '@/data/categories/phones.json';
import headphones from '@/data/categories/headphones.json';
import cameras from '@/data/categories/cameras.json';
import laptops from '@/data/categories/laptops.json';
import tablets from '@/data/categories/tablets.json';

const CATEGORY_POSTS = {
  us: us.articles,
  world: world.articles,
  business: business.articles,
  finance: finance.articles,
  reviews: reviews.articles,
  phones: phones.articles,
  headphones: headphones.articles,
  cameras: cameras.articles,
  laptops: laptops.articles,
  tablets: tablets.articles,
};

// Every post across every category, each tagged with its category slug
// (kept on the post itself too, but this guarantees it's always present
// for posts coming out of the per-category files below).
const ALL_POSTS = Object.entries(CATEGORY_POSTS).flatMap(([categorySlug, articles]) =>
  articles.map((a) => ({ ...a, category: a.category || categorySlug }))
);

// ---------- Site ----------
export function getSite() {
  return siteData;
}

// ---------- Posts ----------
export function getAllPosts() {
  return [...ALL_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  return ALL_POSTS.find((p) => p.slug === slug) || null;
}

// Looks a post up scoped to a category first (matches the /:category/:slug
// URL structure), falling back to a flat search so callers that only have
// a slug keep working.
export function getPostByCategoryAndSlug(categorySlug, slug) {
  const articles = CATEGORY_POSTS[categorySlug];
  if (!articles) return null;
  return articles.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(categorySlug, excludeSlugs = []) {
  const exclude = new Set(excludeSlugs);
  const articles = CATEGORY_POSTS[categorySlug] || [];
  return [...articles]
    .filter((p) => !exclude.has(p.slug))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostsByAuthor(authorSlug) {
  return getAllPosts().filter((p) => p.author === authorSlug);
}

export function getFeaturedPosts(limit = 4, excludeSlugs = []) {
  const exclude = new Set(excludeSlugs);
  return getAllPosts()
    .filter((p) => p.featured && !exclude.has(p.slug))
    .slice(0, limit);
}

export function getTrendingPosts(limit = 5, excludeSlugs = []) {
  const exclude = new Set(excludeSlugs);
  return getAllPosts()
    .filter((p) => p.trending && !exclude.has(p.slug))
    .slice(0, limit);
}

export function getMostViewedPosts(limit = 5, excludeSlugs = []) {
  const exclude = new Set(excludeSlugs);
  return [...ALL_POSTS]
    .filter((p) => !exclude.has(p.slug))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function getRecentPosts(limit = 6, excludeSlug = null, excludeSlugs = []) {
  const exclude = new Set(excludeSlugs);
  return getAllPosts()
    .filter((p) => p.slug !== excludeSlug && !exclude.has(p.slug))
    .slice(0, limit);
}

export function getRelatedPosts(post, limit = 4) {
  if (!post) return [];
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, limit)
    .concat(
      getAllPosts().filter(
        (p) => p.slug !== post.slug && p.category !== post.category
      )
    )
    .slice(0, limit);
}

export function getPostsByTag(tag) {
  return getAllPosts().filter((p) => p.tags && p.tags.includes(tag));
}

export function searchPosts(query) {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
  );
}

// ---------- Categories ----------
export function getAllCategories() {
  return categoriesData;
}

export function getTopLevelCategories() {
  return categoriesData.filter((c) => !c.parent);
}

export function getCategoryBySlug(slug) {
  return categoriesData.find((c) => c.slug === slug) || null;
}

export function getChildCategories(parentSlug) {
  return categoriesData.filter((c) => c.parent === parentSlug);
}

// ---------- Authors ----------
export function getAllAuthors() {
  return authorsData;
}

export function getAuthorBySlug(slug) {
  return authorsData.find((a) => a.slug === slug) || null;
}

export function formatPostType(type) {
  const blogLabels = {
    'News report': 'Current-affairs post',
    'Business report': 'Business note',
    'Markets report': 'Markets note',
  };
  return blogLabels[type] || type || 'Post';
}

// ---------- Formatting ----------
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
