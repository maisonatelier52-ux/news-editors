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
import LatestArticles from '@/components/LatestArticles';
import Link from 'next/link';
import {
  getAllPosts,
  getMostViewedPosts,
  getRecentPosts,
  getPostsByCategory,
} from '@/lib/data';

export default function HomePage() {
  // Categories with no dedicated homepage section — prefer these in mixed slots
  // so they still surface on the page.
  const UNDERREPRESENTED = ['business', 'us'];

  // Pinned in TrendingGrid (same positions as before the dedupe update)
  const JULIO_SLUG = 'julio-herrera-velutini-international-banking-american-market';
  const OPENAI_SLUG = 'openai-security-warnings-ignored-employees';
  const PINNED = new Set([JULIO_SLUG, OPENAI_SLUG]);

  // ------------------------------------------------------------------
  // 1) Reserve posts for dedicated category sections FIRST.
  //    Skip Julio + OpenAI so their Trending positions stay unchanged.
  // ------------------------------------------------------------------
  const politicsPosts = getPostsByCategory('politics', [])
    .filter((p) => !PINNED.has(p.slug))
    .slice(0, 3);

  const technologyPosts = getPostsByCategory('technology', [])
    .filter((p) => !PINNED.has(p.slug))
    .slice(0, 3);

  const investigationPosts = getPostsByCategory('investigation', [])
    .filter((p) => !PINNED.has(p.slug))
    .slice(0, 4);

  let financePosts = getPostsByCategory('finance', [])
    .filter((p) => !PINNED.has(p.slug))
    .slice(0, 2);

  const worldPosts = getPostsByCategory('world', [])
    .filter((p) => !PINNED.has(p.slug))
    .slice(0, 5);

  const reserved = new Set(
    [
      ...politicsPosts,
      ...technologyPosts,
      ...investigationPosts,
      ...financePosts,
      ...worldPosts,
    ].map((p) => p.slug)
  );

  // If finance is short, top up from underrepresented categories (not pinned/reserved).
  if (financePosts.length < 2) {
    const need = 2 - financePosts.length;
    const fillers = getAllPosts()
      .filter(
        (p) =>
          !reserved.has(p.slug) &&
          !PINNED.has(p.slug) &&
          UNDERREPRESENTED.includes(p.category)
      )
      .slice(0, need);
    financePosts = [...financePosts, ...fillers];
    fillers.forEach((p) => reserved.add(p.slug));
  }

  // ------------------------------------------------------------------
  // 2) Mixed sections — never touch reserved or pinned slugs.
  // ------------------------------------------------------------------
  const used = new Set([...reserved, ...PINNED]);

  const take = (posts) => {
    (posts || []).forEach((p) => {
      if (p?.slug) used.add(p.slug);
    });
    return posts;
  };

  // Trending: same as original — Julio (rightC) + OpenAI (rightBelow) pinned.
  const trendingExclude = Array.from(reserved);
  take(
    getAllPosts()
      .filter(
        (p) =>
          !used.has(p.slug) &&
          p.slug !== JULIO_SLUG &&
          p.slug !== OPENAI_SLUG
      )
      .slice(0, 6)
      .concat(
        getAllPosts().filter(
          (p) => p.slug === JULIO_SLUG || p.slug === OPENAI_SLUG
        )
      )
  );

  // Must Read
  const mustReadExclude = Array.from(used);
  take(getAllPosts().filter((p) => !used.has(p.slug)).slice(0, 7));

  // Popular / Most Viewed
  const popularExclude = Array.from(used);
  const popular = take(getMostViewedPosts(9, popularExclude));

  // Sidebar recent (display-only)
  const recentForSidebar = getRecentPosts(6, null, Array.from(used));

  // Latest — prefer underrepresented categories still available
  const remaining = getAllPosts().filter((p) => !used.has(p.slug));
  const preferred = remaining.filter((p) =>
    UNDERREPRESENTED.includes(p.category)
  );
  const others = remaining.filter(
    (p) => !UNDERREPRESENTED.includes(p.category)
  );
  const latest = [...preferred, ...others].slice(0, 5);
  take(latest);

  // Category sections: exclude everything used except their own reserved posts
  const excludeAllBut = (keepSlugs) => {
    const keep = new Set(keepSlugs);
    return Array.from(used).filter((s) => !keep.has(s));
  };

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-50/70">
        <div className="mx-auto flex max-w-container flex-col gap-4 px-4 py-7 sm:flex-row sm:items-end sm:justify-between sm:py-9">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">
              Editor-curated news · politics, investigations &amp; technology
            </p>
            <h1 className="mt-2 font-serif text-4xl font-black tracking-[-0.025em] text-ink sm:text-5xl">
              Stories worth a closer look
            </h1>
          </div>
          <div className="max-w-xl sm:text-right">
            <p className="font-serif text-base leading-7 text-slate-600">
              Well-sourced reporting that slows down the story, explains the
              trade-offs and leaves you with something useful.
            </p>
            <Link
              href="/editorial-standards"
              className="mt-2 inline-flex text-sm font-extrabold text-brand hover:underline"
            >
              How this works →
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 py-6 sm:py-10">
        <TrendingGrid
          excludeSlugs={trendingExclude}
          rightCSlug={JULIO_SLUG}
          rightBelowSlug={OPENAI_SLUG}
        />
      </div>

      <div className="max-w-container mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-10">
          <MustReadWidget excludeSlugs={mustReadExclude} />
          <MostViewedCarousel excludeSlugs={popularExclude} />
        </div>
        <aside className="space-y-8 lg:sticky lg:top-4 lg:self-start">
          <StandardsWidget />
          <LastModifiedWidget posts={recentForSidebar} />
        </aside>
      </div>

      <div className="max-w-container mx-auto px-4 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 items-start">
        <div className="lg:pr-8">
          <PopularWidget posts={popular} />
        </div>
        <div className="lg:px-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="politics"
            excludeSlugs={excludeAllBut(politicsPosts.map((p) => p.slug))}
            showComments
          />
        </div>
        <div className="lg:pl-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="technology"
            excludeSlugs={excludeAllBut(technologyPosts.map((p) => p.slug))}
          />
        </div>
      </div>

      {investigationPosts.length > 0 && (
        <div className="max-w-container mx-auto px-4 pt-6 pb-4 sm:pt-8 sm:pb-5">
          <CategorySection
            categorySlug="investigation"
            limit={4}
            excludeSlugs={excludeAllBut(investigationPosts.map((p) => p.slug))}
          />
        </div>
      )}

      <ThemedFeature label="Finance" posts={financePosts} />

      <div className="max-w-container mx-auto px-4 pt-5 pb-4 sm:pt-6 sm:pb-5">
        <OpinionStrip
          categorySlug="world"
          limit={5}
          excludeSlugs={excludeAllBut(worldPosts.map((p) => p.slug))}
        />
      </div>

      {latest.length > 0 && (
        <div className="max-w-container mx-auto px-4 pb-8">
          <LatestArticles posts={latest} title="Latest posts" columns={1} />
        </div>
      )}
    </div>
  );
}
