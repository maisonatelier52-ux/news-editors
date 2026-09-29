import Link from 'next/link';
import Icon from '@/components/Icon';
import PostCard from '@/components/PostCard';
import { getPostsByCategory, getCategoryBySlug } from '@/lib/data';

export default function CategorySection({ categorySlug, limit = 4, excludeSlugs = [] }) {
  const category = getCategoryBySlug(categorySlug);
  const posts = getPostsByCategory(categorySlug, excludeSlugs).slice(0, limit);

  if (!category || posts.length === 0) return null;

  const [featured, ...others] = posts;

  return (
    <section>
      <div className="flex items-center justify-between mb-5 pb-2 border-b border-[#808080]/40">
        <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3]">
          {category.name}
        </h2>
        <Link
          href={`/${category.slug}`}
          className="flex items-center gap-1 text-xs font-serif uppercase tracking-wide text-[#595959] hover:text-[#2c6ca3] transition-colors"
        >
          View all
          <Icon name="chevronRight" className="w-3.5 h-3.5" filled={false} />
        </Link>
      </div>
      <div className={others.length > 0 ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'grid grid-cols-1'}>
        <PostCard post={featured} variant="hero" showReadMore />
        {others.length > 0 && (
          <div className="flex flex-col gap-5 justify-between">
            {others.map((post) => (
              <PostCard key={post.slug} post={post} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
