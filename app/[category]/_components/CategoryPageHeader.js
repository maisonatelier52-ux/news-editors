import Link from 'next/link';
import { ChevronRightIcon } from './icons';

export default function CategoryPageHeader({ category, childCategories = [] }) {
  return (
    <div className="border-t border-gray-300 pt-4">
      {/* Minimal breadcrumb trail */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-sans text-ink-muted mb-3">
        <Link href="/" className="hover:text-brand transition-colors">
          Home
        </Link>
        <ChevronRightIcon className="w-3 h-3" />
        <span className="text-ink font-medium">{category.name}</span>
      </nav>

      <h1 className="font-sans font-extrabold uppercase tracking-tight text-2xl sm:text-[28px] text-ink">
        {category.name}
      </h1>

      {category.description && (
        <p className="mt-1.5 max-w-2xl text-sm text-ink-muted font-sans">
          {category.description}
        </p>
      )}

      {childCategories.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {childCategories.map((child) => (
            <Link
              key={child.slug}
              href={`/${child.slug}`}
              className="text-[13px] font-sans font-semibold text-[#2E6D9C] hover:underline"
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 border-b border-gray-300" />
    </div>
  );
}
