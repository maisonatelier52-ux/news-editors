// Lightweight category / author lookups for components that may end up in the
// client bundle (PostCard, CategoryBadge, ...).
//
// These read only the small categories.json / authors.json files. They return
// the same objects as getCategoryBySlug / getAuthorBySlug in lib/data.js, minus
// the derived `count` / `postCount` fields, which need every article loaded.
import categoriesData from '@/data/json/categories.json';
import authorsData from '@/data/json/authors.json';

export function getCategoryBySlug(slug) {
  return categoriesData.find((c) => c.slug === slug) || null;
}

export function getAuthorBySlug(slug) {
  return authorsData.find((a) => a.slug === slug) || null;
}
