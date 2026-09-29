import Link from 'next/link';
import { getAllCategories } from '@/lib/data';

export default function CategoriesWidget() {
  const categories = getAllCategories();

  return (
    <div>
      <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3] mb-3 pb-2 border-b border-[#808080]/40">Categories</h3>
      <ul>
        {categories.map((cat, i) => (
          <li key={cat.slug} className={i > 0 ? 'border-t border-[#808080]/40' : ''}>
            <Link
              href={`/${cat.slug}`}
              className="flex items-center justify-between py-2.5 font-serif text-sm text-ink hover:text-[#2c6ca3] transition-colors"
            >
              {cat.name}
              <span className="text-[#595959] text-xs">{cat.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
