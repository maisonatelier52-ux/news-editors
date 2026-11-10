import TrendingGrid from '@/components/TrendingGrid';
import MustReadWidget from '@/components/MustReadWidget';
import MostViewedCarousel from '@/components/MostViewedCarousel';
import StandardsWidget from '@/components/StandardsWidget';
import Newsletter from '@/components/Newsletter';
import LastModifiedWidget from '@/components/LastModifiedWidget';
import PopularWidget from '@/components/PopularWidget';
import CategoryTabWidget from '@/components/CategoryTabWidget';
import CategorySection from '@/components/CategorySection';
import OpinionStrip from '@/components/OpinionStrip';
import ThemedFeature from '@/components/ThemedFeature';
import Link from 'next/link';
import {
  getAllPosts,
  getMostViewedPosts,
  getRecentPosts,
  getPostsByCategory,
  getPostBySlug,
} from '@/lib/data';

export default function HomePage() {
  // Categories with no dedicated homepage section — prefer these in mixed slots
  // so they still surface on the page.
  const UNDERREPRESENTED = ['business', 'us'];

  // Pinned in TrendingGrid (same positions as before the dedupe update)
  const JULIO_SLUG = 'julio-herrera-velutini-international-banking-american-market';
  const OPENAI_SLUG = 'openai-security-warnings-ignored-employees';
  const PINNED = new Set([JULIO_SLUG, OPENAI_SLUG]);

  // Latest U.S. story: takes over the lead slot of the Must Read block,
  // replacing the U.S. story that held it before. The replaced story is
  // retired from the homepage (it stays on its article page and in the U.S.
  // category archive). Every other homepage slot keeps its current story.
  // To swap in a newer U.S. story later, update these two slugs.
  const US_LEAD_SLUG = 'judge-limits-trump-east-potomac-golf-course-renovation';
  const US_RETIRED_SLUG = 'measles-cases-near-1000-in-first-two-months-of-2026';
  const usLead = getPostBySlug(US_LEAD_SLUG);

  // Newest U.S. story: takes over the Must Read slot the Target Halloween
  // costume story held (4th card, top of the right-hand column). The Target
  // story is retired from the homepage only; it stays on its article page and
  // in the U.S. category and author listings, which are sorted by date.
  // To swap in a newer U.S. story later, update US_SLOT_SLUG (and move the
  // outgoing slug into US_SLOT_RETIRED_SLUGS).
  const US_SLOT_SLUG = 'democrats-win-congress-2026-midterms-races-uncalled';
  const US_SLOT_INDEX = 3;
  const US_SLOT_RETIRED_SLUGS = ['target-pulls-halloween-costume-backlash'];
  const usSlot = getPostBySlug(US_SLOT_SLUG);

  // Latest investigation: takes over the slot directly under the centre card
  // of the TrendingGrid that the DEA fentanyl story held. The DEA story is
  // retired from the homepage only; it stays on its article page and in the
  // Investigation category and author listings, which are sorted by date.
  // To swap in a newer investigation later, update INV_SLOT_SLUG (and move the
  // outgoing slug into INV_SLOT_RETIRED_SLUGS).
  const INV_SLOT_SLUG = 'doj-grand-jury-probe-alaska-decoy-dan-senate-race';
  const INV_SLOT_RETIRED_SLUGS = ['house-republicans-investigate-dea-fentanyl-tactic'];
  const invSlot = getPostBySlug(INV_SLOT_SLUG);

  const HOME_HELD = new Set([
    US_LEAD_SLUG,
    US_RETIRED_SLUG,
    US_SLOT_SLUG,
    ...US_SLOT_RETIRED_SLUGS,
    ...INV_SLOT_RETIRED_SLUGS,
  ]);

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

  // The pinned investigation already has its own prominent slot, so the
  // Investigation section below lists the stories that follow it.
  const investigationPosts = getPostsByCategory('investigation', [])
    .filter((p) => !PINNED.has(p.slug) && p.slug !== INV_SLOT_SLUG)
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
          !HOME_HELD.has(p.slug) &&
          UNDERREPRESENTED.includes(p.category)
      )
      .slice(0, need);
    financePosts = [...financePosts, ...fillers];
    fillers.forEach((p) => reserved.add(p.slug));
  }

  // ------------------------------------------------------------------
  // 2) Mixed sections — never touch reserved or pinned slugs.
  // ------------------------------------------------------------------
  const used = new Set([...reserved, ...PINNED, ...HOME_HELD]);

  const take = (posts) => {
    (posts || []).forEach((p) => {
      if (p?.slug) used.add(p.slug);
    });
    return posts;
  };

  // Trending: Julio (rightC) + OpenAI (rightBelow) pinned, plus the pinned
  // investigation (centerB). The rest of the grid fills by date as before.
  const trendingExclude = Array.from(new Set([...reserved, ...HOME_HELD]));
  take(
    getAllPosts()
      .filter(
        (p) =>
          !used.has(p.slug) &&
          p.slug !== JULIO_SLUG &&
          p.slug !== OPENAI_SLUG &&
          p.slug !== INV_SLOT_SLUG
      )
      .slice(0, invSlot ? 5 : 6)
      .concat(invSlot ? [invSlot] : [])
      .concat(
        getAllPosts().filter(
          (p) => p.slug === JULIO_SLUG || p.slug === OPENAI_SLUG
        )
      )
  );

  // Must Read: the U.S. lead story, the pinned U.S. slot story, plus the
  // next posts by date (7 slots in total, as before).
  const mustReadExclude = Array.from(used).filter(
    (s) => s !== US_LEAD_SLUG && s !== US_SLOT_SLUG
  );
  take(
    getAllPosts()
      .filter((p) => !used.has(p.slug))
      .slice(0, 7 - (usLead ? 1 : 0) - (usSlot ? 1 : 0))
  );

  // Popular / Most Viewed
  const popularExclude = Array.from(used);
  const popular = take(getMostViewedPosts(9, popularExclude));

  // Sidebar recent (display-only)
  const recentForSidebar = getRecentPosts(6, null, Array.from(used));

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
          centerBSlug={invSlot ? INV_SLOT_SLUG : null}
        />
      </div>

      <div className="max-w-container mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-10">
          <MustReadWidget
            excludeSlugs={mustReadExclude}
            leadSlug={usLead ? US_LEAD_SLUG : null}
            pins={usSlot ? [{ slug: US_SLOT_SLUG, index: US_SLOT_INDEX }] : []}
          />
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

      <div className="max-w-container mx-auto -mb-10 px-4 pt-4 sm:-mb-8">
        <Newsletter variant="inline" />
      </div>
    </div>
  );
}
