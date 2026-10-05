'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import CategoryBadge from '@/components/CategoryBadge';
import { searchPosts, getPostUrl, formatDate } from '@/lib/data';

const MAX_SUGGESTIONS = 6;

/*
  Header search
  -------------
  Desktop (lg and up): the round search-icon button grows leftwards, in place,
  into a search bar (max 460px) with the suggestions in a floating card
  beneath it.
  The header never moves and nothing goes full screen.

  Below lg (phones / tablets, where the hamburger shows): a sheet fades and
  slides down from the top over a dimmed backdrop.

  Performance notes
  - Only the small, absolutely positioned bar animates its width (nothing
    else on the page reflows). Everything else is opacity / transform.
  - No blur, no filters, no will-change, no JS animation loops.
  - Honours prefers-reduced-motion (motion-reduce:!transition-none).

  Width of the desktop bar: up to 460px, but capped so it never runs into the
  centred logo on smaller laptops. 145px = 105px (half of the 210px logo)
  + 16px (container padding) + 24px (breathing room).
  All class strings below are written out in full so Tailwind can see them.
*/

// Two-tone "glass" magnifier: navy lens with a soft highlight, and a handle in
// the logo's blade blue. Pure inline SVG (no extra request, no image, no JS).
// `gid` just keeps the gradient id unique when the icon appears twice.
function SearchIcon({ className = 'h-5 w-5', gid }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gid} x1="14" y1="14" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#3b82ff" />
          <stop offset="1" stopColor="#0026e4" />
        </linearGradient>
      </defs>
      <circle cx="10.5" cy="10.5" r="6.6" fill="#fff" stroke="#0f3d91" strokeWidth="2.2" />
      <path
        d="M7.7 9.4a3.2 3.2 0 0 1 2.3-1.9"
        stroke="#3b82ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity=".85"
      />
      <path d="m15.6 15.6 4.9 4.9" stroke={`url(#${gid})`} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Easing used everywhere: fast start, soft landing.
//   cubic-bezier(0.22,1,0.36,1)

// The round icon button (trigger). On desktop it hides the instant the bar opens, and fades
// back in at the very end of the closing animation (300ms delay).
const TRIGGER_OPEN = 'lg:opacity-0 lg:[transition:opacity_0ms]';
const TRIGGER_CLOSED =
  'lg:opacity-100 lg:[transition:background-color_150ms,border-color_150ms,box-shadow_150ms,opacity_80ms_linear_300ms]';

// The sheet that holds the bar + suggestions.
const SHEET_BASE =
  'fixed inset-x-0 top-0 z-50 max-h-[85dvh] overflow-y-auto overscroll-contain rounded-b-2xl bg-white ' +
  'motion-reduce:!transition-none ' +
  'lg:absolute lg:inset-x-auto lg:right-0 lg:max-h-none lg:translate-y-0 lg:overflow-visible lg:rounded-none lg:bg-transparent';
const SHEET_OPEN =
  'translate-y-0 opacity-100 ' +
  '[transition:transform_300ms_cubic-bezier(0.22,1,0.36,1),opacity_200ms_ease-out] ' +
  'lg:w-[min(460px,calc(50vw_-_145px))] lg:[transition:width_420ms_cubic-bezier(0.22,1,0.36,1)]';
const SHEET_CLOSED =
  'pointer-events-none -translate-y-3 opacity-0 ' +
  '[transition:transform_200ms_ease-in,opacity_160ms_ease-in] ' +
  'lg:w-10 lg:[transition:width_380ms_cubic-bezier(0.22,1,0.36,1),opacity_80ms_linear_300ms]';

// The visible bar on desktop (a plain wrapper on mobile).
const BAR_BASE =
  'lg:h-10 lg:overflow-hidden lg:rounded-full lg:border ' +
  'lg:transition-[background-color,border-color,box-shadow] lg:duration-300 motion-reduce:lg:!transition-none';
const BAR_OPEN =
  'lg:border-gray-300 lg:bg-white lg:focus-within:border-brand lg:focus-within:ring-2 lg:focus-within:ring-brand/15';
const BAR_CLOSED = 'lg:border-gray-200 lg:bg-gray-100';

// The form fades in a beat after the bar starts growing, and out quickly.
const FORM_OPEN = 'opacity-100 delay-150 duration-200';
const FORM_CLOSED = 'opacity-0 duration-100';

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const router = useRouter();

  const trimmed = query.trim();
  const suggestions = useMemo(
    () => (trimmed ? searchPosts(trimmed).slice(0, MAX_SUGGESTIONS) : []),
    [trimmed]
  );
  const showDropdown = open && trimmed.length > 0;

  // restoreFocus: hand focus back to the Search button. Used for keyboard closes
  // (Esc, or Enter/Space on the X) so focus isn't lost; skipped for mouse/touch
  // closes and when closing because the person is navigating somewhere.
  const closeSearch = useCallback((restoreFocus = false) => {
    if (restoreFocus) {
      flushSync(() => setOpen(false));
      triggerRef.current?.focus({ preventScroll: true });
    } else {
      setOpen(false);
    }
  }, []);

  // Escape closes the search and hands focus back to the Search button.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeSearch(true);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeSearch]);

  // Phones/tablets: lock page scroll behind the sheet (and keep the layout
  // from jumping when the scrollbar disappears). Desktop is left alone.
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia('(max-width: 1023.98px)').matches) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open]);

  // flushSync so the input is un-inert and focused inside the tap itself;
  // that is what makes iOS Safari bring up the keyboard straight away.
  function openSearch() {
    flushSync(() => {
      setQuery('');
      setActiveIndex(-1);
      setOpen(true);
    });
    inputRef.current?.focus({ preventScroll: true });
  }

  function handleQueryChange(e) {
    setQuery(e.target.value);
    setActiveIndex(-1);
  }

  function goToPost(post) {
    router.push(getPostUrl(post));
    closeSearch();
  }

  function goToFullResults(q) {
    router.push(`/search?q=${encodeURIComponent(q)}`);
    closeSearch();
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
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next =
      e.key === 'ArrowDown'
        ? (activeIndex + 1) % suggestions.length
        : activeIndex <= 0
          ? suggestions.length - 1
          : activeIndex - 1;
    setActiveIndex(next);
    // Keep the highlighted row visible when the list scrolls.
    document.getElementById(`search-suggestion-${next}`)?.scrollIntoView({ block: 'nearest' });
  }

  return (
    <div className="relative">
      {/* Trigger: icon only. Fixed 40px circle so the bar grows from exactly
          this footprint. The label lives in aria-label / title. */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Search"
        title="Search"
        aria-expanded={open}
        aria-controls="site-search"
        inert={open}
        onClick={openSearch}
        className={`group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-ink transition-[background-color,border-color,box-shadow] duration-200 hover:border-brand/30 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
          open ? TRIGGER_OPEN : TRIGGER_CLOSED
        }`}
      >
        <SearchIcon
          gid="search-grad-trigger"
          className="h-[22px] w-[22px] transition-transform duration-300 ease-out motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110"
        />
      </button>

      {/* Click-away layer: dimmed on phones/tablets, invisible on desktop. */}
      <div
        aria-hidden="true"
        onClick={() => closeSearch()}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 motion-reduce:!transition-none lg:bg-transparent ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        id="site-search"
        inert={!open}
        className={`${SHEET_BASE} ${open ? SHEET_OPEN : SHEET_CLOSED}`}
      >
        <div className="px-4 py-3 sm:py-4 lg:p-0">
          <div className={`${BAR_BASE} ${open ? BAR_OPEN : BAR_CLOSED}`}>
            <form
              role="search"
              onSubmit={handleSubmit}
              className={`flex items-center gap-2 transition-opacity motion-reduce:!transition-none lg:h-full lg:gap-0 lg:pl-4 lg:pr-1 ${
                open ? FORM_OPEN : FORM_CLOSED
              }`}
            >
              <div className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full bg-gray-100 px-4 lg:h-full lg:rounded-none lg:bg-transparent lg:px-0">
                <SearchIcon gid="search-grad-bar" className="h-5 w-5 shrink-0" />
                <input
                  ref={inputRef}
                  type="search"
                  name="q"
                  value={query}
                  onChange={handleQueryChange}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search articles…"
                  aria-label="Search articles"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={showDropdown && suggestions.length > 0}
                  aria-controls={showDropdown && suggestions.length > 0 ? 'search-suggestions' : undefined}
                  aria-activedescendant={activeIndex >= 0 ? `search-suggestion-${activeIndex}` : undefined}
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="search"
                  className="min-w-0 flex-1 bg-transparent font-serif text-base text-ink placeholder:text-gray-400 focus:outline-none lg:text-[15px] [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                />
              </div>
              <button
                type="button"
                aria-label="Close search"
                onClick={(e) => closeSearch(e.detail === 0)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-gray-100 lg:h-8 lg:w-8 lg:text-gray-500"
              >
                <Icon name="close" className="w-5 h-5 lg:w-4 lg:h-4" filled={false} />
              </button>
            </form>
          </div>

          {/* Live suggestions: matches drop down beneath the input as the
              person types, so they can jump straight to an article without
              submitting the full search. On desktop this is a floating card
              under the bar; on phones it sits inside the sheet. */}
          {showDropdown && (
            <div className="mt-2 animate-search-drop border-t border-gray-100 pt-2 motion-reduce:animate-none lg:absolute lg:inset-x-0 lg:top-full lg:mt-2 lg:overflow-hidden lg:rounded-2xl lg:border lg:border-gray-200 lg:bg-white lg:pt-0 lg:shadow-xl lg:shadow-black/10">
              {suggestions.length > 0 ? (
                <>
                  <div className="lg:max-h-[min(70vh,26rem)] lg:overflow-y-auto lg:p-2">
                    <ul id="search-suggestions" role="listbox" aria-label="Suggested articles" className="flex flex-col gap-1">
                      {suggestions.map((post, index) => (
                        <li key={post.slug} role="option" id={`search-suggestion-${index}`} aria-selected={index === activeIndex}>
                          <Link
                            href={getPostUrl(post)}
                            onClick={() => closeSearch()}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
                              index === activeIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-gray-100 sm:h-16 sm:w-16 lg:h-14 lg:w-14">
                              <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                            </span>
                            <span className="min-w-0">
                              <span className="block font-serif text-sm font-bold leading-snug text-ink line-clamp-2 sm:text-base lg:text-sm">
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
                  </div>
                  <button
                    type="button"
                    onClick={() => goToFullResults(trimmed)}
                    className="mt-2 text-sm font-sans font-semibold text-[#2c6ca3] transition-colors hover:opacity-80 lg:mt-0 lg:block lg:w-full lg:border-t lg:border-gray-100 lg:px-4 lg:py-3 lg:text-left lg:hover:bg-gray-50 lg:hover:opacity-100"
                  >
                    See all results for &ldquo;{trimmed}&rdquo;
                  </button>
                </>
              ) : (
                <p className="py-2 font-serif text-sm text-ink-muted lg:px-4 lg:py-4">
                  No articles found for &ldquo;{trimmed}&rdquo;.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
