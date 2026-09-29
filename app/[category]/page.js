import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getChildCategories,
  getTrendingPosts,
  getTopLevelCategories,
} from '@/lib/data';
import {
  getCategoryMetadata,
  getBreadcrumbJsonLd,
  getCategoryBreadcrumbItems,
} from '@/lib/seo';

import CategoryPageHeader from './_components/CategoryPageHeader';
import TopStoriesSection from './_components/TopStoriesSection';
import MoreNewsSection from './_components/MoreNewsSection';
import MostReadSidebar from './_components/MostReadSidebar';

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return getCategoryMetadata(category);
}

export default async function CategoryPage({ params }) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategory(categorySlug);
  const childCategories = getChildCategories(categorySlug);

  // Slice the category's posts into the sections the new design needs.
  // The narrow-list + feature layout only looks balanced once there's
  // enough content to fill both columns to a similar height (3 leftList
  // items + 1 feature + 2 secondary = 6 posts). With fewer posts the wide
  // column ends up visibly shorter than the narrow list — even just a
  // feature with no secondary items falls short — leaving a blank gap, so
  // TopStoriesSection's full-width grid fallback is used instead, which
  // distributes any post count evenly with no leftover empty space.
  const hasEnoughForFeatureLayout = posts.length >= 6;
  const leftList = hasEnoughForFeatureLayout ? posts.slice(0, 3) : posts;
  const feature = hasEnoughForFeatureLayout ? posts[3] : null;
  const secondary = hasEnoughForFeatureLayout ? posts.slice(4, 6) : [];
  const moreNews = hasEnoughForFeatureLayout ? posts.slice(6) : [];

  // Sidebar: "Most read" is scoped to this category; "Trending now" pulls
  // site-wide trending posts (excluding ones already shown above) so the
  // two tabs don't just repeat the same list.
  const mostRead = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
  const trending = getTrendingPosts(5, posts.map((p) => p.slug));

  // The sidebar's "Explore" panel gives it real, useful content beyond a
  // short ranked list, so its height doesn't fall far short of the main
  // column's on sparser categories. Sub-categories link to their siblings;
  // top-level categories link to the other top-level sections.
  const exploreCategories = category.parent
    ? getChildCategories(category.parent).filter((c) => c.slug !== category.slug)
    : getTopLevelCategories().filter((c) => c.slug !== category.slug);

  const breadcrumbJsonLd = getBreadcrumbJsonLd(getCategoryBreadcrumbItems(category));

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <CategoryPageHeader category={category} childCategories={childCategories} />

      {posts.length === 0 ? (
        <p className="py-10 text-ink-muted">No posts in this topic yet.</p>
      ) : (
        <div className="mt-6 flex flex-col lg:flex-row lg:items-start gap-x-10 gap-y-10">
          <div className="min-w-0 flex-1">
            <TopStoriesSection
              category={category}
              leftList={leftList}
              feature={feature}
              secondary={secondary}
            />

            <MoreNewsSection category={category} posts={moreNews} />
          </div>

          <MostReadSidebar mostRead={mostRead} trending={trending} exploreCategories={exploreCategories} />
        </div>
      )}
    </div>
  );
}
