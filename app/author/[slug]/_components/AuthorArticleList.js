'use client';

import { useState } from 'react';
import ArticleRow from './ArticleRow';
import { ChevronRightIcon } from './icons';

const PAGE_SIZE = 6;

export default function AuthorArticleList({ posts = [] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);

  if (posts.length === 0) {
    return <p className="py-10 text-ink-muted">No posts published yet.</p>;
  }

  const shown = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <div>
      {shown.map((post) => (
        <ArticleRow key={post.slug} post={post} />
      ))}

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
