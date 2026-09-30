import TrendingGrid from '@/components/TrendingGrid';
import MustReadWidget from '@/components/MustReadWidget';
import MostViewedCarousel from '@/components/MostViewedCarousel';
import StandardsWidget from '@/components/StandardsWidget';
import LastModifiedWidget from '@/components/LastModifiedWidget';
import PopularWidget from '@/components/PopularWidget';
import CategoryTabWidget from '@/components/CategoryTabWidget';
import OpinionStrip from '@/components/OpinionStrip';
import ThemedFeature from '@/components/ThemedFeature';
import LatestArticles from '@/components/LatestArticles';
import Link from 'next/link';
import {
  getAllPosts,
  getMostViewedPosts,
  getRecentPosts,
  getPostsByCategory,
} from '@/lib/data';

export default function HomePage() {
  const used = new Set();
  const take = (posts) => {
    posts.forEach((p) => used.add(p.slug));
    return posts;
  };
  const usedSlugs = () => Array.from(used);

  const JULIO_SLUG = 'julio-herrera-velutini-international-banking-american-market';
  const OPENAI_SLUG = 'openai-security-warnings-ignored-employees';

  const trendingExclude = usedSlugs();
  take(
    getAllPosts()
      .filter((p) => !used.has(p.slug) && p.slug !== JULIO_SLUG && p.slug !== OPENAI_SLUG)
      .slice(0, 7)
      .concat(getAllPosts().filter((p) => p.slug === JULIO_SLUG || p.slug === OPENAI_SLUG))
  );

  const mustReadExclude = usedSlugs();
  take(getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 7));

  const popularExclude = usedSlugs();
  const popular = take(getMostViewedPosts(9, popularExclude));

  const recentForSidebar = getRecentPosts(6, null, usedSlugs());

  // Technology column only (Politics middle removed — was often empty after dedupe)
  const technologyExclude = usedSlugs();
  take(getPostsByCategory('technology', technologyExclude).slice(0, 3));

  let financePosts = getPostsByCategory('finance', usedSlugs()).slice(0, 2);
  if (financePosts.length < 2) {
    financePosts = getPostsByCategory('finance', []).slice(0, 2);
  }
  take(financePosts);

  const worldExclude = usedSlugs();
  take(getPostsByCategory('world', worldExclude).slice(0, 5));

  const latest = getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 5);

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto flex max-w-container flex-col gap-4 px-4 py-7 sm:flex-row sm:items-end sm:justify-between sm:py-9">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">Independent news · politics, investigations &amp; technology</p>
            <h1 className="mt-2 font-serif text-4xl font-black tracking-[-0.025em] text-ink sm:text-5xl">Stories worth a closer look</h1>
          </div>
          <div className="max-w-xl sm:text-right">
            <p className="font-serif text-base leading-7 text-slate-600">Well-sourced reporting that slows down the story, explains the trade-offs and leaves you with something useful.</p>
            <Link href="/editorial-standards" className="mt-2 inline-flex text-sm font-extrabold text-brand hover:underline">How this works →</Link>
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 py-6 sm:py-10">
        <TrendingGrid
          excludeSlugs={[...trendingExclude]}
          rightCSlug={JULIO_SLUG}
          rightBelowSlug={OPENAI_SLUG}
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

      {/* Two columns: Reader guide expands full width up to Technology */}
      <div className="max-w-container mx-auto px-4 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-0 items-start">
        <div className="lg:pr-8">
          <PopularWidget posts={popular} />
        </div>
        <div className="lg:pl-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="technology"
            excludeSlugs={technologyExclude}
          />
        </div>
      </div>

      <ThemedFeature label="Finance" posts={financePosts} />

      <div className="max-w-container mx-auto px-4 pt-5 pb-6 sm:pt-6 sm:pb-8">
        <OpinionStrip
          categorySlug="world"
          limit={5}
          excludeSlugs={worldExclude}
        />
      </div>

      <div className="max-w-container mx-auto px-4 pb-8">
        <LatestArticles posts={latest} title="Latest posts" columns={1} />
      </div>
    </div>
  );
}
