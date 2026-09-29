import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { getPostUrl, getAuthorBySlug, getCategoryBySlug, formatDate } from '@/lib/data';

export default function PopularWidget({ posts = [] }) {
  if (posts.length === 0) return null;
  const [lead, ...rest] = posts;
  const leadAuthor = getAuthorBySlug(lead.author);
  const leadCategory = getCategoryBySlug(lead.category);

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-[#808080]/40">
        <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3]">
          Reader guide
        </h2>
        <Icon name="chevronRight" className="w-3.5 h-3.5 text-[#2c6ca3]" filled={false} />
      </div>

      <article className="pb-6 mb-6 border-b border-[#808080]/40">
        <h3 className="text-[clamp(1.05rem,0.6vw+0.9rem,1.25rem)] font-serif font-bold leading-[1.2] text-ink">
          <Link href={getPostUrl(lead)} className="hover:opacity-80 transition-opacity">
            <span className="text-[#2c6ca3]">{leadCategory ? `${leadCategory.name}.` : 'Blog.'}</span>
            {' '}
            {lead.title}
          </Link>
        </h3>
        <p className="mt-2 text-[11px] font-serif uppercase tracking-wide text-[#595959]">
          {leadAuthor?.name}
        </p>
      </article>

      <div className="space-y-6">
        {rest.slice(0, 8).map((post, i) => {
          const url = getPostUrl(post);
          const category = getCategoryBySlug(post.category);
          return (
            <div key={post.slug} className="flex gap-4 items-start">
              <span className="font-serif font-bold text-base text-[#2c6ca3] shrink-0 pt-0.5 w-5">
                {i + 2}
              </span>
              <Link href={url} className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-100">
                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="96px" />
              </Link>
              <div className="min-w-0 pt-0.5">
                <span className="block text-xs font-serif font-bold text-[#2c6ca3] mb-1">
                  {category ? category.name : ''}
                </span>
                <Link href={url} className="block font-serif font-bold text-sm leading-snug text-ink hover:opacity-80 transition-opacity line-clamp-2">
                  {post.title}
                </Link>
                <span className="block text-[11px] font-serif uppercase tracking-wide text-[#595959] mt-1.5">
                  {formatDate(post.date)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
