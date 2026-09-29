'use client';

import { useSearchParams } from 'next/navigation';
import { searchPosts } from '@/lib/data';
import PostCard from '@/components/PostCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const results = query ? searchPosts(query) : [];

  return (
    <>
      <h1 className="font-serif text-3xl font-extrabold text-ink sm:text-4xl">
        {query ? <>Search results for &ldquo;{query}&rdquo;</> : 'Search'}
      </h1>
      <p className="mt-2 font-sans text-sm text-ink-muted">
        {query
          ? `${results.length} ${results.length === 1 ? 'result' : 'results'} found`
          : 'Use the search button in the header to find an article.'}
      </p>

      {query && results.length === 0 && (
        <p className="mt-10 font-serif text-ink-muted">No articles matched your search. Try a different term.</p>
      )}

      {results.length > 0 && (
        <div className="mt-8 flex max-w-3xl flex-col divide-y divide-gray-100">
          {results.map((post) => (
            <div key={post.slug} className="py-6 first:pt-0">
              <PostCard post={post} variant="horizontal" showReadMore />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
