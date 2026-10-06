import categoriesData from '@/data/json/categories.json';
import authorsData from '@/data/json/authors.json';
import siteData from '@/data/json/site.json';

// Per-category article files, imported eagerly (small dataset, no build
// step needed). Keyed by category slug so lookups stay O(1).
import us from '@/data/categories/us.json';
import world from '@/data/categories/world.json';
import business from '@/data/categories/business.json';
import finance from '@/data/categories/finance.json';
import politics from '@/data/categories/politics.json';
import investigation from '@/data/categories/investigation.json';
import technology from '@/data/categories/technology.json';

const CATEGORY_POSTS = {
  us: us.articles,
  world: world.articles,
  business: business.articles,
  finance: finance.articles,
  politics: politics.articles,
  investigation: investigation.articles,
  technology: technology.articles,
};

// Every post across every category, each tagged with its category slug
// (kept on the post itself too, but this guarantees it's always present
// for posts coming out of the per-category files below).
const ALL_POSTS = Object.entries(CATEGORY_POSTS).flatMap(([categorySlug, articles]) =>
  articles.map((a) => ({ ...a, category: a.category || categorySlug }))
);

// Counts shown in the UI are derived from the article files, so they can never
// drift from the real number of articles. (`count` in categories.json and
// `postCount` in authors.json are kept in sync by hand but are not relied on.)
const CATEGORIES = categoriesData.map((c) => ({
  ...c,
  count: CATEGORY_POSTS[c.slug] ? CATEGORY_POSTS[c.slug].length : c.count,
}));
const AUTHORS = authorsData.map((a) => ({
  ...a,
  postCount: ALL_POSTS.filter((p) => p.author === a.slug).length,
}));

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

export function getMostViewedPosts(limit = 6, excludeSlugs = []) {
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
  return CATEGORIES;
}

export function getTopLevelCategories() {
  return CATEGORIES.filter((c) => !c.parent);
}

export function getCategoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug) || null;
}

export function getChildCategories(parentSlug) {
  return CATEGORIES.filter((c) => c.parent === parentSlug);
}

// ---------- Authors ----------
export function getAllAuthors() {
  return AUTHORS;
}

export function getAuthorBySlug(slug) {
  return AUTHORS.find((a) => a.slug === slug) || null;
}

// ---------- Formatting + URLs ----------
// These live in lib/format.js (no article data imported) so client components
// can use them without bundling every article. Re-exported here so existing
// imports from '@/lib/data' keep working.
export {
  formatPostType,
  formatDate,
  formatFullDate,
  formatViews,
  getPostUrl,
  getCategoryUrl,
  getAuthorUrl,
} from '@/lib/format';
