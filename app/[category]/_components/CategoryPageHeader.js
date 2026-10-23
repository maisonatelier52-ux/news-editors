import Link from 'next/link';
import { ChevronRightIcon } from './icons';

/**
 * Category hub masthead.
 * childCategories = subtopics; relatedTopics = sibling / peer sections for topical navigation.
 */
export default function CategoryPageHeader({
  category,
  childCategories = [],
  relatedTopics = [],
}) {
  const chips = childCategories.length > 0 ? childCategories : relatedTopics;
  const chipLabel = childCategories.length > 0 ? 'In this section' : 'Related topics';

  return (
    <header className="pt-5 sm:pt-7">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-sans text-sm text-ink-muted">
        <Link href="/" className="transition-colors hover:text-brand">
          Home
        </Link>
        <ChevronRightIcon className="h-3.5 w-3.5" />
        <span className="font-semibold text-ink">{category.name}</span>
      </nav>

      <h1 className="mt-3 font-serif text-4xl font-black leading-[1.06] tracking-[-0.025em] text-ink sm:mt-4 sm:text-5xl lg:text-[3.25rem]">
        {category.name}
      </h1>

      {category.description && (
        <p className="mt-2.5 max-w-2xl font-serif text-lg leading-7 text-slate-600 sm:mt-3 sm:text-xl sm:leading-8">
          {category.description}
        </p>
      )}

      {chips.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
            {chipLabel}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="rounded-full border border-slate-200 px-4 py-2 font-sans text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative mt-5 border-b border-slate-200 sm:mt-7" aria-hidden="true">
        <span className="absolute left-0 top-0 h-[3px] w-14 bg-brand sm:w-20" />
      </div>
    </header>
  );
}
