'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContentImage from '@/components/ContentImage';
import Icon from '@/components/Icon';

const PER_PAGE = 3;

// Client half of the category widget (prev/next paging state). The server
// component in CategoryTabWidget.js picks the posts and passes them in, so the
// full article dataset is never shipped to the browser.
export default function CategoryTabPager({
  categoryName,
  posts: pool = [],
  showComments = false,
}) {
  const [page, setPage] = useState(0);

  const pageCount = Math.max(1, Math.ceil(pool.length / PER_PAGE));
  const current = Math.min(page, pageCount - 1);
  // The last page is the final PER_PAGE stories, so it is always full (a plain
  // slice would leave 1-2 stories and an empty gap when the pool isn't a
  // multiple of PER_PAGE).
  const start = Math.min(current * PER_PAGE, Math.max(0, pool.length - PER_PAGE));
  const posts = pool.slice(start, start + PER_PAGE);
  if (posts.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#808080]/40">
        <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3]">
          {categoryName}
        </h2>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setPage(Math.max(0, current - 1))}
            disabled={current === 0}
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-ink-muted"
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5 rotate-180" filled={false} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setPage(Math.min(pageCount - 1, current + 1))}
            disabled={current >= pageCount - 1}
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-ink-muted"
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5" filled={false} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => {
          const url = post.url;
          return (
            <article key={post.slug}>
              <Link href={url} className="group relative block w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-3">
                <ContentImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
              </Link>
              <h3 className="text-[clamp(0.95rem,0.4vw+0.85rem,1.05rem)] font-serif font-bold leading-snug text-ink">
                <Link href={url} className="hover:opacity-80 transition-opacity">
                  {post.title}
                </Link>
              </h3>
              {showComments && !!post.comments && (
                <p className="mt-1.5 text-[11px] font-serif uppercase tracking-wide text-[#595959] inline-flex items-center gap-1">
                  <Icon name="comment" className="w-3 h-3" />
                  {post.comments}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
