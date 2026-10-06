import CategoryTabPager from '@/components/CategoryTabPager';
import { getPostsByCategory, getCategoryBySlug, getPostUrl } from '@/lib/data';

// Server component: picks the posts here (where the article data lives) and
// hands only the fields the cards use to the interactive pager.
export default function CategoryTabWidget({
  categorySlug,
  excludeSlugs = [],
  showComments = false,
}) {
  const category = getCategoryBySlug(categorySlug);

  // Strictly respect excludeSlugs so the homepage never repeats a story.
  // (Previously this topped up from the full category, which re-introduced duplicates.)
  const posts = getPostsByCategory(categorySlug, excludeSlugs).map((p) => ({
    slug: p.slug,
    title: p.title,
    image: p.image,
    comments: p.comments,
    url: getPostUrl(p),
  }));

  if (!category || posts.length === 0) return null;

  return (
    <CategoryTabPager
      categoryName={category.name}
      posts={posts}
      showComments={showComments}
    />
  );
}
