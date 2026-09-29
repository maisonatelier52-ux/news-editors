'use client';

import { useState } from 'react';
import StoryItem from './StoryItem';
import { ChevronRightIcon } from './icons';

const PAGE_SIZE = 5;

export default function MoreNewsSection({ category, posts = [] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (posts.length === 0) return null;

  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <div className="mt-2">
      <h2 className="font-sans font-extrabold uppercase tracking-wide text-lg text-ink pb-2 border-b-[3px] border-ink">
        More from {category.name}
      </h2>

      <div>
        {shown.map((post) => (
          <StoryItem key={post.slug} post={post} category={category} variant="horizontal" />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-brand rounded-md text-sm font-sans font-bold text-brand hover:bg-brand hover:text-white transition-colors"
          >
            Load more
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
