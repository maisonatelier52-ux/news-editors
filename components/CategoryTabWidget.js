'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { getPostsByCategory, getCategoryBySlug, getPostUrl } from '@/lib/data';

export default function CategoryTabWidget({
  categorySlug,
  excludeSlugs = [],
  showComments = false,
}) {
  const [page, setPage] = useState(0);
  const category = getCategoryBySlug(categorySlug);
  const pool = getPostsByCategory(categorySlug, excludeSlugs);
  const maxPage = Math.max(0, Math.ceil(pool.length / 3) - 1);
  const posts = pool.slice(page * 3, page * 3 + 3);
  if (!category || posts.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#808080]/40">
        <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3]">
          {category.name}
        </h2>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            aria-label="Previous"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40"
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5 rotate-180" filled={false} />
          </button>
          <button
            aria-label="Next"
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={page >= maxPage}
            className="w-7 h-7 flex items-center justify-center border border-gray-200 text-ink-muted hover:border-[#2c6ca3] hover:text-[#2c6ca3] transition-colors disabled:opacity-40"
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5" filled={false} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => {
          const url = getPostUrl(post);
          return (
            <article key={post.slug}>
              <Link href={url} className="group relative block w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-3">
                <Image
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
