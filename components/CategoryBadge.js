import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/data';

/**
 * Newspaper-style kicker label — bold serif text in the brand blue,
 * matching TrendingStoryItem's "Category." lead-in. No color block/pill;
 * `uppercase` is accepted for API compatibility but no longer used, since
 * the reference style keeps kickers in title case.
 */
export default function CategoryBadge({ slug, size = 'sm', asLink = true }) {
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const sizeClasses = size === 'lg' ? 'text-sm' : 'text-xs';
  const className = `inline-block font-serif font-bold ${sizeClasses} text-[#2c6ca3] hover:opacity-80 transition-opacity`;

  if (!asLink) {
    return <span className={className}>{category.name}.</span>;
  }

  return (
    <Link href={`/${category.slug}`} className={className}>
      {category.name}.
    </Link>
  );
}
