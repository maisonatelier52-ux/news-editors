'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './icons';

export default function AuthorProfileActions({ bio }) {
  const [following, setFollowing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setFollowing((f) => !f)}
        aria-pressed={following}
        className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wide border transition-colors ${
          following
            ? 'bg-brand border-brand text-white'
            : 'border-ink text-ink hover:bg-ink hover:text-white'
        }`}
      >
        {following ? 'Following' : 'Follow author'}
      </button>

      {bio && (
        <div className="mt-4">
          {expanded && (
            <p className="text-sm text-ink-light font-sans leading-relaxed max-w-2xl mb-2">
              {bio}
            </p>
          )}
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-1 text-sm font-sans font-semibold text-[#2E6D9C] hover:underline"
          >
            {expanded ? 'See less' : 'See more'}
            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
}
