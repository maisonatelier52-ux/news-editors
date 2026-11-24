import MustReadTabs from '@/components/MustReadTabs';
import { getAllPosts, getPostsByCategory } from '@/lib/data';

// Categories that have their own tab in the Must Read header (slugs, in the
// same order as the tabs in MustReadTabs.js).
const TAB_CATEGORIES = ['politics', 'investigation', 'technology', 'us'];

// Only the fields the cards actually use are sent to the browser.
const toCard = (p) => ({
  slug: p.slug,
  category: p.category,
  title: p.title,
  excerpt: p.excerpt,
  image: p.image,
  date: p.date,
  author: p.author,
  comments: p.comments,
  trending: p.trending,
  rating: p.rating,
  articleType: p.articleType,
});

// Server component: picks the posts here (where the article data lives) and
// hands only the fields the cards actually use to the interactive client
// component. Keeps ~250 KB of article JSON out of the homepage's JavaScript.
export default function MustReadWidget({
  excludeSlugs = [],
  leadSlug = null,
  pins = [],
  retiredSlugs = [],
}) {
  const exclude = new Set(excludeSlugs);
  const available = getAllPosts().filter((p) => !exclude.has(p.slug));
  // A pinned lead story always opens the list (and its category tab).
  let ordered = leadSlug
    ? [
        ...available.filter((p) => p.slug === leadSlug),
        ...available.filter((p) => p.slug !== leadSlug),
      ]
    : available;

  // Stories pinned to a fixed slot (0-based position in the "All" list),
  // e.g. { slug, index: 3 } keeps that story in the 4th card. Pins are
  // dropped from their date position first, then inserted in index order.
  const pinned = pins
    .map(({ slug, index }) => ({
      post: ordered.find((p) => p.slug === slug),
      index,
    }))
    .filter((x) => x.post)
    .sort((a, b) => a.index - b.index);
  if (pinned.length) {
    const pinnedSlugs = new Set(pinned.map((x) => x.post.slug));
    ordered = ordered.filter((p) => !pinnedSlugs.has(p.slug));
    pinned.forEach(({ post, index }) => {
      ordered.splice(Math.min(index, ordered.length), 0, post);
    });
  }
  const posts = ordered.map(toCard);

  // Category tabs: each shows that category's own stories, newest first.
  // They are NOT limited to what the "All" list left over (that left some
  // categories with one story, or none). Only stories retired from the
  // homepage are left out.
  const categoryPosts = Object.fromEntries(
    TAB_CATEGORIES.map((slug) => [
      slug,
      getPostsByCategory(slug, retiredSlugs).map(toCard),
    ])
  );

  return <MustReadTabs posts={posts} categoryPosts={categoryPosts} />;
}
