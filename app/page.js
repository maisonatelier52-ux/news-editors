import TrendingGrid from '@/components/TrendingGrid';
import MustReadWidget from '@/components/MustReadWidget';
import MostViewedCarousel from '@/components/MostViewedCarousel';
import StandardsWidget from '@/components/StandardsWidget';
import Newsletter, { NEWSLETTER_ENABLED } from '@/components/Newsletter';
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

  // Latest technology story: takes over the slot directly under the Julio
  // image card in the right-hand column of the top Trending grid (the
  // "starting section") that the OpenAI security story held. The OpenAI story
  // is retired from the homepage only; it stays on its article page and in the
  // Technology category and author listings, which are sorted by date.
  // To swap in a newer technology story later, update TECH_SLOT_SLUG (and move
  // the outgoing slug into TECH_SLOT_RETIRED_SLUGS).
  const TECH_SLOT_SLUG = 'microsoft-365-global-outage-outlook-teams-copilot-restored-november-2026';
  const TECH_SLOT_RETIRED_SLUGS = [OPENAI_SLUG];
  const techSlot = getPostBySlug(TECH_SLOT_SLUG);
  // Falls back to the OpenAI story if the new article is not in the data yet.
  const RIGHT_BELOW_SLUG = techSlot ? TECH_SLOT_SLUG : OPENAI_SLUG;

  // Latest technology story (Must Read): takes over the Must Read slot the
  // "Microsoft plans data-center push to triple computing capacity" story held
  // (5th card, the image card in the right-hand column). The Microsoft story is
  // retired from the homepage only; it stays on its article page and in the
  // Technology category and author listings, which are sorted by date.
  // To swap in a newer technology story for this slot later, update
  // TECH_MUST_READ_SLUG (and move the outgoing slug into
  // TECH_MUST_READ_RETIRED_SLUGS).
  const TECH_MUST_READ_SLUG = 'anthropic-record-ipo-nasdaq-debut-closes-up-17-percent-november-2026';
  const TECH_MUST_READ_INDEX = 4;
  const techMustRead = getPostBySlug(TECH_MUST_READ_SLUG);
  // Only retire the Microsoft story once the new article is in the data, so
  // the slot is never left empty.
  const TECH_MUST_READ_RETIRED_SLUGS = techMustRead
    ? ['microsoft-plans-data-center-capacity-triple']
    : [];

  const PINNED = new Set([
    JULIO_SLUG,
    TECH_SLOT_SLUG,
    ...TECH_SLOT_RETIRED_SLUGS,
    TECH_MUST_READ_SLUG,
    ...TECH_MUST_READ_RETIRED_SLUGS,
  ]);

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

  // Latest investigation (lead): takes over the lead (centre feature) slot of
  // the top Trending grid, the "starting section", that the FTC / Amazon
  // advertising story held. The FTC story is retired from the homepage only;
  // it stays on its article page and in the Investigation category and author
  // listings, which are sorted by date.
  // To swap in a newer investigation for this slot later, update INV_LEAD_SLUG
  // (and move the outgoing slug into INV_LEAD_RETIRED_SLUGS).
  const INV_LEAD_SLUG = 'commerce-doj-disclose-megaspeed-criminal-probe-began-2024';
  const invLead = getPostBySlug(INV_LEAD_SLUG);
  // Only retire the FTC story once the new article is in the data, so the slot
  // is never left empty.
  const INV_LEAD_RETIRED_SLUGS = invLead
    ? ['ftc-sues-amazon-advertising-practices']
    : [];

  // Latest investigation (Must Read): takes over the Must Read slot the "Three
  // Secret Service officials under investigation for potential misconduct"
  // story held (3rd card, the second text-only story in the left column under
  // the featured story). The Secret Service story is retired from the homepage
  // only; it stays on its article page and in the Investigation category and
  // author listings, which are sorted by date.
  // To swap in a newer investigation for this slot later, update INV_MUST_SLUG
  // (and move the outgoing slug into INV_MUST_RETIRED_SLUGS).
  const INV_MUST_SLUG = 'fbi-investigating-apparent-breach-ncic-criminal-database-second-hack-november-2026';
  const INV_MUST_INDEX = 2;
  const invMust = getPostBySlug(INV_MUST_SLUG);
  // Only retire the Secret Service story once the new article is in the data,
  // so the slot is never left empty.
  const INV_MUST_RETIRED_SLUGS = invMust
    ? ['secret-service-officials-under-investigation-misconduct']
    : [];

  // Latest business story: takes over the Must Read slot the Dick's Sporting
  // Goods story held (6th card, second text-only story in the right-hand
  // column). The Dick's story is retired from the homepage only; it stays on
  // its article page and in the Business category and author listings, which
  // are sorted by date.
  // To swap in a newer business story later, update BIZ_SLOT_SLUG (and move the
  // outgoing slug into BIZ_SLOT_RETIRED_SLUGS).
  const BIZ_SLOT_SLUG = 'costco-30-special-dividend-13-billion-buyback-november-2026';
  const BIZ_SLOT_INDEX = 5;
  const BIZ_SLOT_RETIRED_SLUGS = ['dicks-sporting-goods-foot-locker-earnings-miss'];
  const bizSlot = getPostBySlug(BIZ_SLOT_SLUG);

  // Latest politics story: takes over the slot the Army Secretary Driscoll
  // story held (third story of the left column in the top Trending grid, the
  // "starting section"). The Driscoll story is retired from the homepage only;
  // it stays on its article page and in the Politics category and author
  // listings, which are sorted by date.
  // To swap in a newer politics story later, update POL_SLOT_SLUG (and move the
  // outgoing slug into POL_SLOT_RETIRED_SLUGS).
  const POL_SLOT_SLUG = 'bessent-blames-commerce-megaspeed-blacklist-delay-lutnick-to-testify';
  const POL_SLOT_RETIRED_SLUGS = ['army-secretary-driscoll-resigns-hegseth-tensions'];
  const polSlot = getPostBySlug(POL_SLOT_SLUG);

  // Latest politics story: takes over the slot the "Judge issues new block on
  // sweeping mail-in voting restrictions" story held (top of the right-hand
  // column in the top Trending grid, the "starting section"). The judge story
  // is retired from the homepage only; it stays on its article page and in the
  // Politics category and author listings, which are sorted by date.
  // To swap in a newer politics story for this slot later, update
  // POL_TOP_SLUG (and move the outgoing slug into POL_TOP_RETIRED_SLUGS).
  const POL_TOP_SLUG = 'white-house-doj-warn-democrats-oversight-probes-could-be-criminal-garcia-blumenthal';
  const polTop = getPostBySlug(POL_TOP_SLUG);
  // Only retire the judge story once the new article is in the data, so the
  // slot is never left empty.
  const POL_TOP_RETIRED_SLUGS = polTop
    ? ['judge-blocks-trump-mail-in-voting-restrictions']
    : [];

  // Latest politics story: takes over the slot the "Newsom signs California
  // laws targeting ICE detention practices" story held (second story of the
  // left column in the top Trending grid, the "starting section"). The Newsom
  // story is retired from the homepage only; it stays on its article page and
  // in the Politics category and author listings, which are sorted by date.
  // To swap in a newer politics story for this slot later, update
  // POL_LEFT_SLUG (and move the outgoing slug into POL_LEFT_RETIRED_SLUGS).
  const POL_LEFT_SLUG = 'peltola-wins-alaska-senate-race-democrats-56-seats-sullivan-yet-to-concede';
  const polLeft = getPostBySlug(POL_LEFT_SLUG);
  // Only retire the Newsom story once the new article is in the data, so the
  // slot is never left empty.
  const POL_LEFT_RETIRED_SLUGS = polLeft
    ? ['newsom-signs-laws-targeting-ice-detention-practices']
    : [];

  // Latest finance story: takes over the slot the "Mortgage rates hold in the
  // mid-6% range as bond market stays volatile" story held (the text-led lead
  // with the large image in the homepage Finance section). The mortgage story
  // is retired from the homepage only; it stays on its article page and in the
  // Finance category and author listings, which are sorted by date. The Finance
  // section lists the newest finance stories by date, so the new story leads.
  // To swap in a newer finance story later, update FIN_SLOT_SLUG (and move the
  // outgoing slug into FIN_SLOT_RETIRED_SLUGS).
  const FIN_SLOT_SLUG = 'ai-selloff-sp-500-dow-correction-nasdaq-erases-2026-gains-november-2026';
  const finSlot = getPostBySlug(FIN_SLOT_SLUG);
  // Only retire the mortgage story once the new article is in the data, so the
  // slot is never left empty.
  const FIN_SLOT_RETIRED_SLUGS = finSlot
    ? ['mortgage-rates-treasury-yields-late-august-2026']
    : [];

  // Every story retired from the homepage. The Must Read category tabs and the
  // Politics / Technology pagers can page through whole categories, but never
  // bring these back.
  const RETIRED_SLUGS = [
    US_RETIRED_SLUG,
    ...FIN_SLOT_RETIRED_SLUGS,
    ...POL_SLOT_RETIRED_SLUGS,
    ...POL_TOP_RETIRED_SLUGS,
    ...POL_LEFT_RETIRED_SLUGS,
    ...TECH_SLOT_RETIRED_SLUGS,
    ...TECH_MUST_READ_RETIRED_SLUGS,
    ...INV_LEAD_RETIRED_SLUGS,
    ...INV_MUST_RETIRED_SLUGS,
    ...INV_SLOT_RETIRED_SLUGS,
    ...US_SLOT_RETIRED_SLUGS,
    ...BIZ_SLOT_RETIRED_SLUGS,
  ];

  const HOME_HELD = new Set([
    US_LEAD_SLUG,
    FIN_SLOT_SLUG,
    ...FIN_SLOT_RETIRED_SLUGS,
    US_RETIRED_SLUG,
    US_SLOT_SLUG,
    BIZ_SLOT_SLUG,
    POL_SLOT_SLUG,
    POL_TOP_SLUG,
    POL_LEFT_SLUG,
    TECH_SLOT_SLUG,
    TECH_MUST_READ_SLUG,
    INV_LEAD_SLUG,
    INV_MUST_SLUG,
    ...INV_LEAD_RETIRED_SLUGS,
    ...INV_MUST_RETIRED_SLUGS,
    ...POL_TOP_RETIRED_SLUGS,
    ...POL_LEFT_RETIRED_SLUGS,
    ...TECH_SLOT_RETIRED_SLUGS,
    ...TECH_MUST_READ_RETIRED_SLUGS,
    ...POL_SLOT_RETIRED_SLUGS,
    ...US_SLOT_RETIRED_SLUGS,
    ...BIZ_SLOT_RETIRED_SLUGS,
    ...INV_SLOT_RETIRED_SLUGS,
  ]);

  // ------------------------------------------------------------------
  // 1) Reserve posts for dedicated category sections FIRST.
  //    Skip Julio + OpenAI so their Trending positions stay unchanged.
  // ------------------------------------------------------------------
  // The pinned politics stories already have their own prominent slots in the
  // Trending grid, so the Politics section lists the stories that follow them.
  const politicsPosts = getPostsByCategory('politics', [])
    .filter(
      (p) =>
        !PINNED.has(p.slug) &&
        p.slug !== POL_SLOT_SLUG &&
        p.slug !== POL_TOP_SLUG &&
        p.slug !== POL_LEFT_SLUG
    )
    .slice(0, 3);

  const technologyPosts = getPostsByCategory('technology', [])
    .filter((p) => !PINNED.has(p.slug))
    .slice(0, 3);

  // The pinned investigation already has its own prominent slot, so the
  // Investigation section below lists the stories that follow it.
  const investigationPosts = getPostsByCategory('investigation', [])
    .filter(
      (p) =>
        !PINNED.has(p.slug) &&
        p.slug !== INV_SLOT_SLUG &&
        p.slug !== INV_LEAD_SLUG &&
        p.slug !== INV_MUST_SLUG
    )
    .slice(0, 4);

  // Newest finance stories by date; the retired mortgage story is skipped here
  // (homepage only), so the latest story leads the Finance section.
  let financePosts = getPostsByCategory('finance', [])
    .filter((p) => !PINNED.has(p.slug) && !FIN_SLOT_RETIRED_SLUGS.includes(p.slug))
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

  // Trending: Julio (rightC) + the latest technology story (rightBelow) pinned,
  // plus the latest investigation (center lead), the pinned investigation
  // (centerB), the pinned politics story (leftC), the latest politics story
  // (rightB) and the newest politics story (leftB). The rest of the grid fills
  // by date as before.
  const trendingExclude = Array.from(new Set([...reserved, ...HOME_HELD]));
  take(
    getAllPosts()
      .filter(
        (p) =>
          !used.has(p.slug) &&
          p.slug !== JULIO_SLUG &&
          p.slug !== RIGHT_BELOW_SLUG &&
          p.slug !== INV_SLOT_SLUG
      )
      .slice(
        0,
        (invSlot ? 5 : 6) -
          (polSlot ? 1 : 0) -
          (polTop ? 1 : 0) -
          (polLeft ? 1 : 0) -
          (invLead ? 1 : 0)
      )
      .concat(invSlot ? [invSlot] : [])
      .concat(
        getAllPosts().filter(
          (p) => p.slug === JULIO_SLUG || p.slug === RIGHT_BELOW_SLUG
        )
      )
  );

  // Must Read: the U.S. lead story, the pinned U.S., technology, business and
  // investigation slot stories, plus the next posts by date (7 slots in total,
  // as before).
  const mustReadExclude = Array.from(used).filter(
    (s) =>
      s !== US_LEAD_SLUG &&
      s !== US_SLOT_SLUG &&
      s !== BIZ_SLOT_SLUG &&
      s !== TECH_MUST_READ_SLUG &&
      s !== INV_MUST_SLUG
  );
  take(
    getAllPosts()
      .filter((p) => !used.has(p.slug))
      .slice(
        0,
        7 -
          (usLead ? 1 : 0) -
          (usSlot ? 1 : 0) -
          (bizSlot ? 1 : 0) -
          (techMustRead ? 1 : 0) -
          (invMust ? 1 : 0)
      )
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
          rightBelowSlug={RIGHT_BELOW_SLUG}
          centerSlug={invLead ? INV_LEAD_SLUG : null}
          centerBSlug={invSlot ? INV_SLOT_SLUG : null}
          leftBSlug={polLeft ? POL_LEFT_SLUG : null}
          leftCSlug={polSlot ? POL_SLOT_SLUG : null}
          rightBSlug={polTop ? POL_TOP_SLUG : null}
        />
      </div>

      <div className="max-w-container mx-auto px-4 py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-10">
          <MustReadWidget
            excludeSlugs={mustReadExclude}
            leadSlug={usLead ? US_LEAD_SLUG : null}
            retiredSlugs={RETIRED_SLUGS}
            pins={[
              ...(invMust ? [{ slug: INV_MUST_SLUG, index: INV_MUST_INDEX }] : []),
              ...(usSlot ? [{ slug: US_SLOT_SLUG, index: US_SLOT_INDEX }] : []),
              ...(techMustRead
                ? [{ slug: TECH_MUST_READ_SLUG, index: TECH_MUST_READ_INDEX }]
                : []),
              ...(bizSlot ? [{ slug: BIZ_SLOT_SLUG, index: BIZ_SLOT_INDEX }] : []),
            ]}
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
            retiredSlugs={RETIRED_SLUGS}
            showComments
          />
        </div>
        <div className="lg:pl-8 lg:border-l lg:border-[#808080]/40">
          <CategoryTabWidget
            categorySlug="technology"
            excludeSlugs={excludeAllBut(technologyPosts.map((p) => p.slug))}
            retiredSlugs={RETIRED_SLUGS}
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

      {NEWSLETTER_ENABLED && (
        <div className="max-w-container mx-auto -mb-10 px-4 pt-4 sm:-mb-8">
          <Newsletter variant="inline" />
        </div>
      )}
    </div>
  );
}
