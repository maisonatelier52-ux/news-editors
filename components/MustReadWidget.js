import MustReadTabs from '@/components/MustReadTabs';
import { getAllPosts } from '@/lib/data';

// Server component: picks the posts here (where the article data lives) and
// hands only the fields the cards actually use to the interactive client
// component. Keeps ~250 KB of article JSON out of the homepage's JavaScript.
export default function MustReadWidget({ excludeSlugs = [], leadSlug = null }) {
  const exclude = new Set(excludeSlugs);
  const available = getAllPosts().filter((p) => !exclude.has(p.slug));
  // A pinned lead story always opens the list (and its category tab).
  const ordered = leadSlug
    ? [
        ...available.filter((p) => p.slug === leadSlug),
        ...available.filter((p) => p.slug !== leadSlug),
      ]
    : available;
  const posts = ordered
    .map((p) => ({
      slug: p.slug,
      category: p.category,
      title: p.title,
      image: p.image,
      date: p.date,
      author: p.author,
      comments: p.comments,
      trending: p.trending,
      rating: p.rating,
      articleType: p.articleType,
    }));

  return <MustReadTabs posts={posts} />;
}
