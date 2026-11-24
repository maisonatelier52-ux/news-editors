import CategoryTabPager from '@/components/CategoryTabPager';
import { getPostsByCategory, getCategoryBySlug, getPostUrl } from '@/lib/data';

// Server component: picks the posts here (where the article data lives) and
// hands only the fields the cards use to the interactive pager.
//
//  - excludeSlugs : stories already shown elsewhere on the homepage. They are
//                   left out of the FIRST page so the homepage doesn't repeat a
//                   story on first view.
//  - retiredSlugs : stories retired from the homepage — never shown here.
//
// The pager's next/prev arrows then walk through the rest of the category
// (newest first), so the arrows always have something to page to.
export default function CategoryTabWidget({
  categorySlug,
  excludeSlugs = [],
  retiredSlugs = [],
  showComments = false,
}) {
  const category = getCategoryBySlug(categorySlug);

  const firstPage = getPostsByCategory(categorySlug, excludeSlugs);
  const shown = new Set(firstPage.map((p) => p.slug));
  const more = getPostsByCategory(categorySlug, retiredSlugs).filter(
    (p) => !shown.has(p.slug)
  );

  const posts = [...firstPage, ...more].map((p) => ({
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
