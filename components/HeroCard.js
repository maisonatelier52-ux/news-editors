import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import CategoryBadge from '@/components/CategoryBadge';
import RatingBadge from '@/components/RatingBadge';
import { getPostUrl } from '@/lib/data';

/**
 * Overlay-style card used in the homepage hero grid: image fills the card,
 * category badge + title + date sit on top of a dark gradient, matching
 * a "featured slider" look.
 *
 * - `large`: renders bigger title text and an excerpt, but only from the
 *   `lg` breakpoint up — on mobile every hero card looks the same size.
 * - `fill`: card stretches to h-full instead of using an aspect ratio.
 *   Used for the desktop-only large card so it matches the height of the
 *   two stacked cards next to it.
 */
export default function HeroCard({ post, large = false, fill = false }) {
  const url = getPostUrl(post);

  return (
    <Link
      href={url}
      className={`group relative block w-full overflow-hidden rounded-sm bg-gray-800 ${
        fill ? 'h-full min-h-[220px] sm:min-h-[280px]' : 'aspect-[4/5] sm:aspect-[3/2] lg:aspect-[16/10]'
      }`}
    >
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes={large ? '(max-width: 1024px) 50vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
        priority={large}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <span className="absolute top-3 left-3">
        <CategoryBadge slug={post.category} asLink={false} uppercase={false} />
      </span>

      {post.rating && (
        <span className="hidden lg:inline-block absolute top-3 right-3">
          <RatingBadge rating={post.rating} />
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <div className="hidden lg:flex items-center gap-1.5 mb-1">
          {post.trending && (
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-brand text-white shrink-0">
              <Icon name="bolt" className="w-2.5 h-2.5" />
            </span>
          )}
          <p className="text-[11px] text-gray-300">
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <h3
          className={`font-extrabold text-white leading-snug line-clamp-2 ${
            large ? 'text-sm sm:text-base lg:text-2xl lg:line-clamp-none' : 'text-sm sm:text-base'
          }`}
        >
          {post.title}
        </h3>
        {large && (
          <p className="mt-2 text-sm text-gray-300 line-clamp-2 hidden lg:block">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
