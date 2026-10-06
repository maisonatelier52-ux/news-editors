import Link from 'next/link';
import Image from 'next/image';
import CategoryBadge from '@/components/CategoryBadge';
import RatingBadge from '@/components/RatingBadge';
import Icon from '@/components/Icon';
import { getPostUrl, formatDate, formatPostType } from '@/lib/format';
import { getAuthorBySlug, getCategoryBySlug } from '@/lib/lookup';

/**
 * variant:
 *  - 'hero'    : big image, large title (top of homepage grid)
 *  - 'horizontal': image left, content right (list-style, used in category widgets)
 *  - 'compact' : small thumbnail + title only (sidebar lists)
 *  - 'minimal' : title + date only, no image (text-only lists)
 *  - 'featureOverlay' : big image with badge/rating/title/author/views all
 *    overlaid on a dark gradient — used by the Must Read widget's left card.
 *  - 'ratedList' : thumbnail with a colored rating bar across the bottom,
 *    date + title beside it. Accepts `barColor` (hex) to theme the bar;
 *    defaults to green. Renders a 5-star row instead of the date when
 *    rating.type === 'stars'.
 *  - 'categoryFeature' : image with badges overlaid, then title/excerpt/
 *    meta/button in a plain white block below — used by the Apps/
 *    Headphones-style category widgets. Accepts `accent` (hex) to theme
 *    the Read More button, and `showComments` to toggle the comment count.
 */
export default function PostCard({
  post,
  variant = 'hero',
  showReadMore = false,
  barColor = '#2c6ca3',
  accent = '#2c6ca3',
  showComments = false,
}) {
  const url = getPostUrl(post);

  if (variant === 'ratedList') {
    const isStars = post.rating?.type === 'stars';
    return (
      <div className="flex gap-3 items-start">
        <Link href={url} className="relative w-24 h-[70px] sm:w-28 sm:h-20 shrink-0 overflow-hidden bg-gray-100">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="112px" />
          {post.rating && !isStars && (
            <span
              className="absolute bottom-0 left-0 right-0 px-2 py-0.5 text-right"
              style={{ backgroundColor: `${barColor}e6` }}
            >
              <span className="text-white text-xs font-extrabold">
                {post.rating.type === 'percent' ? `${post.rating.value}%` : post.rating.value}
              </span>
            </span>
          )}
        </Link>
        <div className="min-w-0 pt-0.5">
          {isStars ? (
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    name="star"
                    className={`w-3 h-3 ${i < post.rating.value ? 'text-[#2c6ca3]' : 'text-gray-300'}`}
                  />
                ))}
              </span>
              <span className="text-[11px] font-serif uppercase tracking-wide text-[#595959]">{formatDate(post.date)}</span>
            </div>
          ) : (
            <span className="block text-[11px] font-serif uppercase tracking-wide text-[#595959] mb-1.5">
              {formatDate(post.date)}
            </span>
          )}
          <Link href={url} className="block font-serif font-bold text-sm leading-snug text-ink hover:opacity-80 transition-opacity line-clamp-2">
            {post.title}
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'categoryFeature') {
    const author = getAuthorBySlug(post.author);
    return (
      <article className="group">
        <Link href={url} className="relative block w-full aspect-[3/2] overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          {post.trending && (
            <span className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white">
              <Icon name="bolt" className="w-4 h-4" />
            </span>
          )}
          {post.rating && (
            <span className="absolute top-3 right-3">
              <RatingBadge rating={post.rating} neutral />
            </span>
          )}
        </Link>
        <div className="pt-3">
          <h3 className="text-[clamp(1.1rem,0.7vw+0.95rem,1.4rem)] font-serif font-bold leading-[1.2] text-ink">
            <Link href={url} className="hover:opacity-80 transition-opacity">
              <CategoryBadge slug={post.category} asLink={false} size="lg" />
              {' '}
              {post.title}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-3 text-[11px] font-serif uppercase tracking-wide text-[#595959] flex-wrap">
            {author && <span>{author.name}</span>}
            <span>{formatDate(post.date)}</span>
            {showComments && (
              <span className="inline-flex items-center gap-1 normal-case tracking-normal">
                <Icon name="comment" className="w-3 h-3" filled={false} />
                {post.comments}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-serif text-[#3a3a3a] line-clamp-3">{post.excerpt}</p>
          <Link
            href={url}
            className="mt-2.5 inline-flex items-center gap-1 text-sm font-serif font-bold text-[#2c6ca3] hover:opacity-80 transition-opacity"
          >
            Read more »
          </Link>
        </div>
      </article>
    );
  }

  if (variant === 'featureOverlay') {
    const author = getAuthorBySlug(post.author);
    return (
      <article className="group">
        <Link href={url} className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {post.trending && (
            <span className="absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white">
              <Icon name="bolt" className="w-4 h-4" />
            </span>
          )}
          {post.rating && (
            <span className="absolute top-3 right-3">
              <RatingBadge rating={post.rating} />
            </span>
          )}
        </Link>
        <div className="pt-3">
          <h3 className="text-[clamp(1.15rem,0.8vw+0.95rem,1.5rem)] font-serif font-bold leading-[1.2] text-ink">
            <Link href={url} className="hover:opacity-80 transition-opacity">
              <CategoryBadge slug={post.category} asLink={false} size="lg" />
              {' '}
              {post.title}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-3 text-[11px] font-serif uppercase tracking-wide text-[#595959] flex-wrap">
            {author && <span>{author.name}</span>}
            <span>{formatDate(post.date)}</span>
            {post.articleType && <span className="normal-case tracking-normal text-[#2c6ca3] font-semibold">{formatPostType(post.articleType)}</span>}
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-3 items-start">
        <Link href={url} className="relative w-16 h-16 shrink-0 overflow-hidden bg-gray-100">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
        </Link>
        <div className="min-w-0">
          {post.rating ? (
            <Link href={url} className="inline-block mb-1">
              <RatingBadge rating={post.rating} />
            </Link>
          ) : null}
          <Link href={url} className="block font-serif font-bold text-sm leading-snug text-ink hover:opacity-80 transition-opacity line-clamp-2">
            {post.title}
          </Link>
          <span className="text-[11px] font-serif uppercase tracking-wide text-[#595959]">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-start gap-2">
        {post.rating && <RatingBadge rating={post.rating} size="sm" />}
        <div className="min-w-0">
          <Link href={url} className="block font-serif font-bold text-sm leading-snug text-ink hover:opacity-80 transition-opacity line-clamp-2">
            {post.title}
          </Link>
          <span className="text-[11px] font-serif uppercase tracking-wide text-[#595959]">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    // h-full + larger thumbnail so stacked cards in CategorySection fill the
    // height of the sibling hero column and close the empty-space gap.
    return (
      <article className="flex gap-4 group h-full items-stretch">
        <Link href={url} className="relative w-36 sm:w-48 md:w-52 shrink-0 self-stretch min-h-[5.5rem] overflow-hidden bg-gray-100">
          <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="208px" />
          {post.rating && (
            <span className="absolute top-2 right-2">
              <RatingBadge rating={post.rating} size="sm" />
            </span>
          )}
        </Link>
        <div className="min-w-0 flex flex-col flex-1 justify-center py-0.5">
          <h3 className="text-[clamp(1.05rem,0.55vw+0.95rem,1.28rem)] font-serif font-bold leading-[1.25] text-ink">
            <Link href={url} className="hover:opacity-80 transition-opacity">
              <CategoryBadge slug={post.category} asLink={false} />
              {' '}
              {post.title}
            </Link>
          </h3>
          {showReadMore && (
            <p className="mt-1.5 text-sm font-serif text-[#3a3a3a] line-clamp-2 hidden sm:block">
              {post.excerpt}
            </p>
          )}
          <p className="mt-2 text-[11px] font-serif uppercase tracking-wide text-[#595959]">
            {getAuthorBySlug(post.author)?.name}
            {getAuthorBySlug(post.author) && ' · '}
            {formatDate(post.date)}
          </p>
          {showReadMore && (
            <Link
              href={url}
              className="mt-2 inline-flex items-center gap-1 w-fit text-sm font-serif font-bold text-[#2c6ca3] hover:opacity-80 transition-opacity"
            >
              Read more »
            </Link>
          )}
        </div>
      </article>
    );
  }

  // 'hero' default
  // `h-full` + the text block below using `flex flex-col flex-1` lets this
  // card match the height of a taller sibling column (e.g. the 3 stacked
  // horizontal cards in CategorySection) without stretching the image —
  // the excerpt/meta area grows instead, closing the empty-space gap.
  return (
    <article className="group h-full flex flex-col">
      <Link href={url} className="relative block w-full aspect-[16/10] overflow-hidden bg-gray-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {post.rating && (
          <span className="absolute top-3 right-3">
            <RatingBadge rating={post.rating} />
          </span>
        )}
      </Link>
      <div className="pt-3 sm:pt-4 flex flex-col flex-1">
        <h3 className="text-[clamp(1.15rem,0.9vw+0.95rem,1.55rem)] font-serif font-bold leading-[1.25] text-ink">
          <Link href={url} className="hover:opacity-80 transition-opacity">
            <CategoryBadge slug={post.category} asLink={false} size="lg" />
            {' '}
            {post.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-[15px] sm:text-base font-serif text-[#3a3a3a] leading-relaxed line-clamp-3">{post.excerpt}</p>
        <p className="mt-auto pt-2.5 text-xs font-serif uppercase tracking-wide text-[#595959]">
          {getAuthorBySlug(post.author)?.name}
          {getAuthorBySlug(post.author) && ' · '}
          {formatDate(post.date)}
          {post.articleType && <span className="ml-2 normal-case tracking-normal text-[#2c6ca3] font-semibold">{formatPostType(post.articleType)}</span>}
        </p>
        {showReadMore && (
          <Link
            href={url}
            className="mt-2.5 inline-flex items-center gap-1 text-sm font-serif font-bold text-[#2c6ca3] hover:opacity-80 transition-opacity"
          >
            Read more »
          </Link>
        )}
      </div>
    </article>
  );
}
