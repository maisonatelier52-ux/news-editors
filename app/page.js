import TrendingGrid from '@/components/TrendingGrid';
import MustReadWidget from '@/components/MustReadWidget';
import MostViewedCarousel from '@/components/MostViewedCarousel';
import StandardsWidget from '@/components/StandardsWidget';
import LastModifiedWidget from '@/components/LastModifiedWidget';
import PopularWidget from '@/components/PopularWidget';
import CategoryTabWidget from '@/components/CategoryTabWidget';
import CategorySection from '@/components/CategorySection';
import OpinionStrip from '@/components/OpinionStrip';
import ThemedFeature from '@/components/ThemedFeature';
import CategoriesWidget from '@/components/CategoriesWidget';
import LatestArticles from '@/components/LatestArticles';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import {
  getAllPosts,
  getMostViewedPosts,
  getRecentPosts,
  getPostsByCategory,
} from '@/lib/data';

export default function HomePage() {
  // Running list of slugs already shown on the page, in render order,
  // so later sections don't repeat articles used by earlier ones.
  const used = new Set();
  const take = (posts) => {
    posts.forEach((p) => used.add(p.slug));
    return posts;
  };
  const usedSlugs = () => Array.from(used);

  // The right column's image-led slot in the top trending package
  // originally fell on "Dick's Sporting Goods shares slide after Foot
  // Locker weighs on earnings". It's swapped here for a different
  // business story so the homepage lead-in shows fresh news — the
  // original story isn't deleted, just no longer pinned to this slot,
  // so it remains free to surface in the Business tab section below.
  const REPLACED_TRENDING_SLUG = 'dicks-sporting-goods-foot-locker-earnings-miss';
  const trendingReplacementSlug = 'alibaba-sells-videogame-business-stake';

  const trendingExclude = usedSlugs();
  const trending = take(
    getAllPosts()
      .filter((p) => !used.has(p.slug) && p.slug !== REPLACED_TRENDING_SLUG)
      .slice(0, 6)
      .concat(getAllPosts().filter((p) => p.slug === trendingReplacementSlug))
  );

  const mustReadExclude = usedSlugs();
  const mustRead = take(getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 6));

  const popularExclude = usedSlugs();
  const popular = take(getMostViewedPosts(9, popularExclude));

  const recentForSidebar = getRecentPosts(6, null, usedSlugs());

  const businessExclude = usedSlugs();
  const businessTab = take(getPostsByCategory('business', businessExclude).slice(0, 4));

  const headphonesExclude = usedSlugs();
  const headphonesTab = take(getPostsByCategory('headphones', []).slice(0, 4));

  const reviewsExclude = usedSlugs();
  const reviewsSection = take(getPostsByCategory('reviews', reviewsExclude).slice(0, 4));

  const financeExclude = usedSlugs();
  const financePosts = take(getPostsByCategory('finance', financeExclude).slice(0, 2));

  const worldExclude = usedSlugs();
  const worldSection = take(getPostsByCategory('world', worldExclude).slice(0, 5));

  const latest = getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 5);

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto flex max-w-container flex-col gap-4 px-4 py-7 sm:flex-row sm:items-end sm:justify-between sm:py-9">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Independent blog · ideas, technology &amp; context</p>
            <h1 className="mt-2 font-serif text-4xl font-black tracking-[-0.025em] text-ink sm:text-5xl">Ideas worth a closer look</h1>
          </div>
          <div className="max-w-xl sm:text-right">
            <p className="font-serif text-base leading-7 text-slate-600">Well-sourced posts that slow down the story, explain the trade-offs and leave you with something useful.</p>
            <Link href="/editorial-standards" className="mt-2 inline-flex text-sm font-extrabold text-brand hover:underline">How this blog works →</Link>
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 py-6 sm:py-10">
        <TrendingGrid
          excludeSlugs={[...trendingExclude, REPLACED_TRENDING_SLUG]}
          rightCSlug={trendingReplacementSlug}
        />
      </div>

      <div className="max-w-container mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-10">
          <MustReadWidget excludeSlugs={mustReadExclude} />
          <MostViewedCarousel excludeSlugs={popularExclude} />
        </div>
        <aside className="space-y-8">
          <StandardsWidget />
          <LastModifiedWidget posts={recentForSidebar} />
        </aside>
      </div>

      <div className="max-w-container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-start">
        <div className="lg:pr-8">
          <PopularWidget posts={popular} />
        </div>
        <div className="lg:px-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="business"
            excludeSlugs={businessExclude}
            showComments
          />
        </div>
        <div className="lg:pl-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="headphones"
            excludeSlugs={[]}
          />
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <CategorySection
          categorySlug="reviews"
          limit={4}
          excludeSlugs={reviewsExclude}
        />
        <div className="space-y-8">
          <CategoriesWidget />
        </div>
      </div>

      <ThemedFeature label="Markets" posts={financePosts} />

      <div className="max-w-container mx-auto px-4 py-8">
        <OpinionStrip
          categorySlug="world"
          limit={5}
          excludeSlugs={worldExclude}
        />
      </div>

      <div className="max-w-container mx-auto px-4 py-8">
        <LatestArticles posts={latest} title="Latest posts" columns={1} />
      </div>
    </div>
  );
}
