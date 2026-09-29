'use client';

import { useState } from 'react';
import PostCard from '@/components/PostCard';

export default function TabbedPostsWidget({ recent, popular }) {
  const [tab, setTab] = useState('recent');

  const tabs = [
    { key: 'recent', label: 'Recent', posts: recent },
    { key: 'popular', label: 'Popular', posts: popular },
    { key: 'comments', label: 'Comments', posts: [] },
  ];

  const active = tabs.find((t) => t.key === tab);

  return (
    <div>
      <div className="flex items-center gap-5 mb-4 border-b border-gray-100">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-2.5 text-sm font-bold transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? 'text-green-700 border-green-700'
                : 'text-ink-muted border-transparent hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active.posts.length > 0 ? (
        <div className="space-y-4">
          {active.posts.map((post) => (
            <PostCard key={post.slug} post={post} variant="compact" />
          ))}
        </div>
      ) : (
        <p className="text-sm text-ink-muted py-2">No comments yet.</p>
      )}
    </div>
  );
}
