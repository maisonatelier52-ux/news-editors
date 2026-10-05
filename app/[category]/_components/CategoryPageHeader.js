import Link from 'next/link';
import { ChevronRightIcon } from './icons';

// Category page masthead. Mirrors the article and info pages: serif black
// headline with tight tracking, serif slate lede, pill links and a hairline
// rule with a short brand-blue segment as the single accent.
export default function CategoryPageHeader({ category, childCategories = [] }) {
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

      {childCategories.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {childCategories.map((child) => (
            <Link
              key={child.slug}
              href={`/${child.slug}`}
              className="rounded-full border border-slate-200 px-4 py-2 font-sans text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}

      <div className="relative mt-5 border-b border-slate-200 sm:mt-7" aria-hidden="true">
        <span className="absolute left-0 top-0 h-[3px] w-14 bg-brand sm:w-20" />
      </div>
    </header>
  );
}
