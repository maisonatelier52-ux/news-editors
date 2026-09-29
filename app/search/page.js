import { Suspense } from 'react';
import SearchResults from './SearchResults';

export const metadata = {
  title: 'Search',
  description: 'Search News Editors posts, explainers and reviews.',
};

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-container px-4 py-8 sm:py-12">
      <Suspense fallback={<p className="font-serif text-ink-muted">Loading search…</p>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
