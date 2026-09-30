'use client';

import { useState } from 'react';
import PostCard from '@/components/PostCard';
import TrendingStoryItem from '@/components/TrendingStoryItem';
import Icon from '@/components/Icon';
import { getAllPosts, getAuthorBySlug, getCategoryBySlug, getPostUrl } from '@/lib/data';

const tabs = ['All', 'Politics', 'Investigation', 'Technology', 'U.S.'];

export default function MustReadWidget({ excludeSlugs = [] }) {
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState(0);
  const exclude = new Set(excludeSlugs);
  const all = getAllPosts().filter((p) => !exclude.has(p.slug));

  const pool =
    tab === 'All'
      ? all
      : all.filter((p) => p.category === tab.toLowerCase());
  // 7 posts: 1 featured + 2 under it on left, 4 on right — balances height
  const perPage = 7;
  const maxPage = Math.max(0, Math.ceil(pool.length / perPage) - 1);
  const posts = pool.slice(page * perPage, page * perPage + perPage);

  const changeTab = (t) => {
    setTab(t);
    setPage(0);
  };

  const [featured, second, third, ...rest] = posts;
  if (!featured) return null;

  const sideStoryProps = (post, { withImage = false } = {}) => {
    const author = getAuthorBySlug(post.author);
    const category = getCategoryBySlug(post.category);
    return {
      href: getPostUrl(post),
      kicker: `${category ? category.name : 'Blog'}.`,
      headline: post.title,
      byline: author ? author.name.toUpperCase() : '',
      comments: post.comments,
      image: withImage ? { src: post.image, alt: post.title } : undefined,
    };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 gap-3 pb-2 border-b border-[#808080]/40">
        <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3] shrink-0">Must Read</h2>
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <div className="flex items-center gap-4 text-xs font-serif uppercase tracking-wide text-[#595959] overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => changeTab(t)}
                className={`shrink-0 transition-colors ${
                  tab === t ? 'text-[#2c6ca3]' : 'hover:text-[#2c6ca3]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              aria-label="Previous"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-ink-muted"
            >
              <Icon name="chevronRight" className="w-3.5 h-3.5 rotate-180" filled={false} />
            </button>
            <button
              aria-label="Next"
              onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
              disabled={page >= maxPage}
              className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-ink-muted"
            >
              <Icon name="chevronRight" className="w-3.5 h-3.5" filled={false} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6 items-start">
        <div>
          <PostCard post={featured} variant="featureOverlay" />
          {second && (
            <div className="mt-6 pt-6 border-t border-[#808080]/40">
              <TrendingStoryItem {...sideStoryProps(second)} />
            </div>
          )}
          {third && (
            <div className="mt-6 pt-6 border-t border-[#808080]/40">
              <TrendingStoryItem {...sideStoryProps(third)} />
            </div>
          )}
        </div>
        <div className="space-y-6">
          {rest.slice(0, 4).map((post, i) => (
            <div key={post.slug} className={i > 0 ? 'pt-6 border-t border-[#808080]/40' : ''}>
              <TrendingStoryItem {...sideStoryProps(post, { withImage: i === 1 })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
