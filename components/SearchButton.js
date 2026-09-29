'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import CategoryBadge from '@/components/CategoryBadge';
import { searchPosts, getPostUrl, formatDate } from '@/lib/data';

const MAX_SUGGESTIONS = 6;

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const router = useRouter();

  const trimmed = query.trim();
  const suggestions = useMemo(
    () => (trimmed ? searchPosts(trimmed).slice(0, MAX_SUGGESTIONS) : []),
    [trimmed]
  );
  const showDropdown = trimmed.length > 0;

  // Focus the input as soon as the overlay opens, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Reset the highlighted suggestion whenever the result set changes.
  function handleQueryChange(e) {
    setQuery(e.target.value);
    setActiveIndex(-1);
  }

  function closeOverlay() {
    setOpen(false);
    setQuery('');
  }

  function goToPost(post) {
    router.push(getPostUrl(post));
    closeOverlay();
  }

  function goToFullResults(q) {
    router.push(`/search?q=${encodeURIComponent(q)}`);
    closeOverlay();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmed) return;
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      goToPost(suggestions[activeIndex]);
    } else {
      goToFullResults(trimmed);
    }
  }

  function handleInputKeyDown(e) {
    if (!showDropdown || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    }
  }

  return (
    <>
      <button
        aria-label="Search"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full bg-gray-100 hover:bg-gray-200 text-ink px-3 py-2 sm:px-4 sm:py-2.5 transition-colors"
      >
        <Icon name="search" className="w-4 h-4 shrink-0" filled={false} />
        <span className="hidden sm:inline text-sm font-sans font-semibold">Search</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeOverlay}
          />
          <div className="absolute left-0 right-0 top-0 max-h-full overflow-y-auto bg-white shadow-xl">
            <div className="max-w-container mx-auto px-4 py-5 sm:py-8">
              <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <Icon name="search" className="w-5 h-5 shrink-0 text-gray-400" filled={false} />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search articles…"
                  aria-label="Search articles"
                  role="combobox"
                  aria-expanded={showDropdown}
                  aria-controls="search-suggestions"
                  aria-activedescendant={activeIndex >= 0 ? `search-suggestion-${activeIndex}` : undefined}
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent font-serif text-lg text-ink placeholder:text-gray-400 focus:outline-none sm:text-2xl"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={closeOverlay}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink hover:bg-gray-100"
                >
                  <Icon name="close" className="w-5 h-5" filled={false} />
                </button>
              </form>

              {/* Live suggestions: matches drop down beneath the input as the
                  person types, so they can jump straight to an article
                  without submitting the full search. */}
              {showDropdown && (
                <div id="search-suggestions" role="listbox" className="mt-4 border-t border-gray-100 pt-4">
                  {suggestions.length > 0 ? (
                    <>
                      <ul className="flex flex-col gap-1">
                        {suggestions.map((post, index) => (
                          <li key={post.slug} role="option" id={`search-suggestion-${index}`} aria-selected={index === activeIndex}>
                            <Link
                              href={getPostUrl(post)}
                              onClick={closeOverlay}
                              onMouseEnter={() => setActiveIndex(index)}
                              className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                                index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                              }`}
                            >
                              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-gray-100 sm:h-16 sm:w-16">
                                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                              </span>
                              <span className="min-w-0">
                                <span className="block font-serif text-sm font-bold leading-snug text-ink line-clamp-2 sm:text-base">
                                  {post.title}
                                </span>
                                <span className="mt-1 flex items-center gap-2 text-[11px] font-serif uppercase tracking-wide text-ink-muted">
                                  <CategoryBadge slug={post.category} asLink={false} />
                                  <span>{formatDate(post.date)}</span>
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => goToFullResults(trimmed)}
                        className="mt-3 text-sm font-sans font-semibold text-[#2c6ca3] hover:opacity-80 transition-opacity"
                      >
                        See all results for &ldquo;{trimmed}&rdquo;
                      </button>
                    </>
                  ) : (
                    <p className="py-2 font-serif text-sm text-ink-muted">
                      No articles found for &ldquo;{trimmed}&rdquo;.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
