'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import TrendingStoryItem from '@/components/TrendingStoryItem';
import ContentImage from '@/components/ContentImage';
import CategoryBadge from '@/components/CategoryBadge';
import Icon from '@/components/Icon';
import { formatDate, getPostUrl } from '@/lib/format';
import { getAuthorBySlug, getCategoryBySlug } from '@/lib/lookup';

// Each tab maps to a real category slug (the "U.S." tab is the `us` category;
// matching on the lowercased label never worked for it).
const TABS = [
  { label: 'All', slug: null },
  { label: 'Politics', slug: 'politics' },
  { label: 'Investigation', slug: 'investigation' },
  { label: 'Technology', slug: 'technology' },
  { label: 'U.S.', slug: 'us' },
];

// A full page holds 7 stories: 1 featured + 2 under it on the left, 4 on the
// right — which balances the two columns.
const MAX_PER_PAGE = 7;

// Splits a pool into the fewest pages possible and spreads the stories evenly
// across them (e.g. 9 -> 5 + 4, never 7 + 2), so no page is ever left with a
// lone story and a half-empty block.
function paginate(pool) {
  if (pool.length === 0) return [];
  const pageCount = Math.ceil(pool.length / MAX_PER_PAGE);
  const base = Math.floor(pool.length / pageCount);
  const extra = pool.length % pageCount;
  const pages = [];
  let i = 0;
  for (let p = 0; p < pageCount; p += 1) {
    const size = base + (p < extra ? 1 : 0);
    pages.push(pool.slice(i, i + size));
    i += size;
  }
  return pages;
}

// How many text-only stories sit under the featured one on the left; the rest
// go to the right column. Chosen per page size so both columns end up about
// the same height. (1-3 stories use their own simple layouts below.)
function leftTextCount(n) {
  if (n >= 6) return 2;
  return 1; // 4 and 5 stories
}

// Client half of the Must Read widget (tabs + paging state). The article lists
// arrive as props from the server component in MustReadWidget.js, so the full
// article dataset is never shipped to the browser.
//
//  - `posts`         : the curated "All" list
//  - `categoryPosts` : { [categorySlug]: posts } — every story of that category
//                      (newest first), so each tab shows the category's own
//                      content rather than whatever the "All" list had left.
export default function MustReadTabs({ posts: all = [], categoryPosts = {} }) {
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState(0);

  // Only offer tabs that actually have stories, so a click can never land on
  // an empty section.
  const tabs = useMemo(
    () =>
      TABS.filter(
        (t) => t.slug === null || (categoryPosts[t.slug] || []).length > 0
      ),
    [categoryPosts]
  );

  const activeTab = tabs.find((t) => t.label === tab) || tabs[0];
  const activeSlug = activeTab.slug;
  const pages = useMemo(
    () => paginate(activeSlug ? categoryPosts[activeSlug] || [] : all),
    [activeSlug, categoryPosts, all]
  );
  const pageCount = pages.length;
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const posts = pages[currentPage] || [];

  const changeTab = (label) => {
    setTab(label);
    setPage(0);
  };

  const sideStoryProps = (post, { withImage = false, imageAspect } = {}) => {
    const author = getAuthorBySlug(post.author);
    const category = getCategoryBySlug(post.category);
    return {
      href: getPostUrl(post),
      kicker: `${(category ? category.name : 'News').replace(/\.$/, '')}.`,
      headline: post.title,
      byline: author ? author.name.toUpperCase() : '',
      comments: post.comments,
      image: withImage ? { src: post.image, alt: post.title } : undefined,
      ...(withImage ? { fill: true, imageAspect } : {}),
    };
  };

  const header = (
    <div className="flex items-center justify-between mb-3 gap-3 pb-2 border-b border-[#808080]/40">
      <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3] shrink-0">Must Read</h2>
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
        <div className="flex items-center gap-4 text-xs font-serif uppercase tracking-wide text-[#595959] overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => changeTab(t.label)}
              aria-pressed={activeTab.label === t.label}
              className={`shrink-0 transition-colors ${
                activeTab.label === t.label ? 'text-[#2c6ca3]' : 'hover:text-[#2c6ca3]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-ink-muted"
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5 rotate-180" filled={false} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setPage(Math.min(pageCount - 1, currentPage + 1))}
            disabled={currentPage >= pageCount - 1}
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-ink-muted"
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5" filled={false} />
          </button>
        </div>
      </div>
    </div>
  );

  const n = posts.length;
  if (n === 0) {
    // Never drop the whole widget (that also removed the tabs, leaving no way
    // back) — keep the header and say so.
    return (
      <div>
        {header}
        <p className="py-10 text-center font-serif text-sm text-[#595959]">
          No stories in this section yet.
        </p>
      </div>
    );
  }

  let body;

  if (n === 1) {
    // A single story: image on one side, headline + summary on the other, so
    // the full width is used instead of leaving half of it empty.
    const post = posts[0];
    const author = getAuthorBySlug(post.author);
    const url = getPostUrl(post);
    body = (
      <article className="group grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 items-center">
        <Link href={url} className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <ContentImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </Link>
        <div>
          <h3 className="text-[clamp(1.3rem,1vw+1rem,1.75rem)] font-serif font-bold leading-[1.2] text-ink">
            <Link href={url} className="hover:opacity-80 transition-opacity">
              <CategoryBadge slug={post.category} asLink={false} size="lg" /> {post.title}
            </Link>
          </h3>
          {post.excerpt && (
            <p className="mt-3 font-serif text-base leading-7 text-[#3a3a3a]">{post.excerpt}</p>
          )}
          <div className="mt-3 flex items-center gap-3 text-[11px] font-serif uppercase tracking-wide text-[#595959] flex-wrap">
            {author && <span>{author.name}</span>}
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </article>
    );
  } else if (n <= 3) {
    // 2-3 stories: equal feature cards across the row.
    body = (
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 ${
          n === 3 ? 'lg:grid-cols-3' : ''
        } gap-x-10 gap-y-8 items-start`}
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="featureOverlay" />
        ))}
      </div>
    );
  } else {
    // 4-7 stories: featured + text stories on the left, the rest on the right.
    // On desktop both columns are stretched to the same height and the images
    // flex to absorb any difference, so neither column ends in blank space.
    const leftCount = leftTextCount(n);
    const [featured, ...others] = posts;
    const leftTexts = others.slice(0, leftCount);
    const right = others.slice(leftCount);
    const rightImageIndex = right.length > 1 ? 1 : 0;

    body = (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 lg:items-stretch">
        <div className="flex flex-col gap-6">
          <div className="flex min-h-0 flex-1 flex-col">
            <PostCard post={featured} variant="featureOverlay" fill />
          </div>
          {leftTexts.map((post) => (
            <div key={post.slug} className="pt-6 border-t border-[#808080]/40">
              <TrendingStoryItem {...sideStoryProps(post)} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          {right.map((post, i) => {
            const withImage = i === rightImageIndex;
            return (
              <div
                key={post.slug}
                className={`${
                  i > 0
                    ? 'pt-6 border-t border-[#808080]/40'
                    : // stacked (mobile/tablet): divide it from the left column's last story
                      'max-lg:pt-6 max-lg:border-t max-lg:border-[#808080]/40'
                } ${
                  withImage ? 'flex min-h-0 flex-1 flex-col' : ''
                }`}
              >
                <TrendingStoryItem
                  {...sideStoryProps(post, {
                    withImage,
                    imageAspect:
                      'aspect-[3/2] lg:aspect-auto lg:min-h-[200px] lg:flex-1',
                  })}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {header}
      {body}
    </div>
  );
}
