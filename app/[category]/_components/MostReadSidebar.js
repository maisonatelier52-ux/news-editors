'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { getPostUrl } from '@/lib/data';

const TABS = [
  { key: 'read', label: 'Recommended', icon: 'eye' },
  { key: 'trending', label: 'Latest', icon: 'bolt' },
];

function RankedItem({ post, rank }) {
  const url = getPostUrl(post);
  return (
    <li>
      <Link
        href={url}
        className="group flex gap-3.5 items-start rounded-xl px-2.5 py-3.5 -mx-2.5 transition-colors hover:bg-brand/[0.06]"
      >
        <span
          className="relative shrink-0 mt-0.5 w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-light
                     text-white flex items-center justify-center font-sans font-extrabold text-[13px]
                     shadow-sm shadow-brand/30 transition-transform duration-200 group-hover:scale-110"
        >
          {rank}
        </span>
        <span className="font-serif font-bold text-[13.5px] sm:text-sm leading-snug text-ink pt-1 line-clamp-3 group-hover:text-brand transition-colors">
          {post.title}
        </span>
      </Link>
    </li>
  );
}

function ExploreCategories({ categories }) {
  if (!categories || categories.length === 0) return null;
  return (
    <div className="px-4 sm:px-5 py-5 border-t border-gray-100">
      <h3 className="font-sans font-extrabold uppercase tracking-wide text-xs text-ink-muted mb-3">
        Explore
      </h3>
      <ul className="space-y-0.5">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/${cat.slug}`}
              className="group flex items-center justify-between rounded-lg -mx-2 px-2 py-2 text-sm font-sans font-semibold text-ink hover:bg-brand/[0.06] hover:text-brand transition-colors"
            >
              {cat.name}
              <Icon
                name="chevronRight"
                className="w-3.5 h-3.5 text-ink-muted group-hover:text-brand group-hover:translate-x-0.5 transition-all"
                filled={false}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MostReadSidebar({ mostRead = [], trending = [], exploreCategories = [] }) {
  const [tab, setTab] = useState('read');

  const hasRead = mostRead.length > 0;
  const hasTrending = trending.length > 0;

  if (!hasRead && !hasTrending && exploreCategories.length === 0) return null;

  const activePosts = tab === 'read' ? mostRead : trending;

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start w-full lg:w-[336px] shrink-0 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {(hasRead || hasTrending) && (
        <>
          {/* Segmented pill control — the active tab floats on a white
              chip inside a soft gray track instead of a plain underline. */}
          <div className="flex items-stretch gap-1 p-1.5 bg-gray-50">
            {TABS.map((t) => {
              const disabled = t.key === 'read' ? !hasRead : !hasTrending;
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  disabled={disabled}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm sm:text-[15px] rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'font-bold text-brand bg-white shadow-sm'
                      : 'font-medium text-ink-muted hover:text-ink disabled:opacity-40'
                  }`}
                >
                  <Icon name={t.icon} className="w-3.5 h-3.5" filled={t.key === 'trending'} />
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Balanced top/bottom padding here (py-3) is what was missing
              before — the list no longer sits flush against the tab bar
              above it or the Explore section / card edge below it. */}
          <ul className="px-4 sm:px-5 py-3">
            {activePosts.map((post, i) => (
              <RankedItem key={post.slug} post={post} rank={i + 1} />
            ))}
          </ul>
        </>
      )}

      <ExploreCategories categories={exploreCategories} />
    </aside>
  );
}
