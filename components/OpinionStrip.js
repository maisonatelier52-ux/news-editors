import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { getAuthorBySlug, getCategoryBySlug, getPostsByCategory, getPostUrl } from '@/lib/data';

/**
 * Four-column divided strip matching the reference "opinion" section:
 * col 1 — text-only lead story (kicker + serif headline + byline)
 * col 2 — a single large image (borrows the lead story's photo)
 * col 3 — two stacked smaller stories, each with a hero thumbnail
 * col 4 — one more story, image-led
 * Columns are separated by thin vertical hairlines, matching the source.
 */
export default function OpinionStrip({ categorySlug, limit = 5, excludeSlugs = [] }) {
  const category = getCategoryBySlug(categorySlug);
  const posts = getPostsByCategory(categorySlug, excludeSlugs).slice(0, limit);
  if (!category || posts.length < 4) return null;

  const [lead, imageOnly, stack1, stack2, last] = posts;
  const leadAuthor = getAuthorBySlug(lead.author);
  const leadCategory = getCategoryBySlug(lead.category);
  const leadUrl = getPostUrl(lead);
  const hasLast = Boolean(last);

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

      <div className={`grid grid-cols-1 sm:grid-cols-2 ${hasLast ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-x-8 gap-y-8`}>
        {/* Col 1 — text-only lead */}
        <div className="lg:pr-8 lg:border-r lg:border-[#808080]/40">
          <h3 className="text-[clamp(1.05rem,0.6vw+0.9rem,1.3rem)] font-serif font-bold leading-[1.2] text-ink">
            <Link href={leadUrl} className="hover:opacity-80 transition-opacity">
              <span className="text-[#2c6ca3]">{leadCategory ? `${leadCategory.name}.` : 'Blog.'}</span>
              {' '}
              {lead.title}
            </Link>
          </h3>
          <p className="mt-2 text-[11px] font-serif uppercase tracking-wide text-[#595959]">
            {leadAuthor?.name}
            {!!lead.comments && (
              <span className="inline-flex items-center gap-1 ml-2 align-middle normal-case tracking-normal">
                <Icon name="comment" className="w-3 h-3" />
                {lead.comments}
              </span>
            )}
          </p>
        </div>

        {/* Col 2 — large image for the lead story */}
        <div className="lg:pr-8 lg:border-r lg:border-[#808080]/40">
          <Link href={leadUrl} className="group relative block w-full aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={imageOnly?.image || lead.image}
              alt={lead.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
          </Link>
        </div>

        {/* Col 3 — two stacked stories with hero image thumbnails (not author avatars) */}
        <div className={`${hasLast ? 'lg:pr-8 lg:border-r lg:border-[#808080]/40' : ''} space-y-6`}>
          {[stack1, stack2].filter(Boolean).map((post) => {
            const author = getAuthorBySlug(post.author);
            const cat = getCategoryBySlug(post.category);
            const url = getPostUrl(post);
            return (
              <div key={post.slug} className="flex gap-3 items-start">
                <Link
                  href={url}
                  className="relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] overflow-hidden bg-gray-100 shrink-0"
                >
                  <Image
                    src={post.image}
                    alt={post.imageCaption || post.title}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </Link>
                <div className="min-w-0">
                  <h4 className="text-sm font-serif font-bold leading-snug text-ink">
                    <Link href={url} className="hover:opacity-80 transition-opacity">
                      <span className="block text-[#2c6ca3] text-xs">{cat ? cat.name : 'Blog'}</span>
                      {post.title}
                    </Link>
                  </h4>
                  <p className="mt-1 text-[11px] font-serif uppercase tracking-wide text-[#595959]">
                    {author?.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Col 4 — final story, image-led */}
        {hasLast && (
          <div>
            <Link href={getPostUrl(last)} className="group relative block w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-3">
              <Image
                src={last.image}
                alt={last.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </Link>
            <span className="text-xs font-serif font-bold text-[#2c6ca3]">
              {getCategoryBySlug(last.category)?.name}
            </span>
            <h4 className="mt-1 text-sm font-serif font-bold leading-snug text-ink">
              <Link href={getPostUrl(last)} className="hover:opacity-80 transition-opacity">
                {last.title}
              </Link>
            </h4>
            <p className="mt-1 text-[11px] font-serif uppercase tracking-wide text-[#595959]">
              {getAuthorBySlug(last.author)?.name}
              {!!last.comments && (
                <span className="inline-flex items-center gap-1 ml-2 align-middle normal-case tracking-normal">
                  <Icon name="comment" className="w-3 h-3" />
                  {last.comments}
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
