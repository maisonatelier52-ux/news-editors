import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';

/**
 * A single text-led news story block, styled after a classic newspaper
 * "trending now" package: a bold blue kicker/label leading straight into
 * a bold black serif headline, a small-caps byline with an optional
 * comment count, and optional bullet-style related links underneath.
 *
 * size: 'sm' (side-column story) | 'lg' (center feature story — larger type)
 * kickerQuoted: renders the kicker as a quoted pull-line instead of a
 *   plain "Category." label (matches the reference's one quote-style item)
 */
export default function TrendingStoryItem({
  href,
  kicker,
  kickerQuoted = false,
  headline,
  byline,
  comments,
  bullets = [],
  image,
  size = 'sm',
  imageAspect = 'aspect-[3/2]',
}) {
  const headlineSize =
    size === 'lg'
      ? 'text-[clamp(1.15rem,0.9vw+0.95rem,1.5rem)]'
      : 'text-[clamp(0.98rem,0.5vw+0.85rem,1.1rem)]';

  return (
    <article>
      {image && (
        <Link
          href={href}
          className={`group relative block w-full ${imageAspect} overflow-hidden bg-gray-100 mb-3`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </Link>
      )}

      <h3 className={`${headlineSize} font-serif font-bold leading-[1.2] text-ink`}>
        <Link href={href} className="hover:opacity-80 transition-opacity">
          {kickerQuoted ? (
            <span className="text-[#2c6ca3]">&ldquo;{kicker}&rdquo;</span>
          ) : (
            <span className="text-[#2c6ca3]">{kicker}</span>
          )}
          {' '}
          {headline}
        </Link>
      </h3>

      <p className="mt-2 text-[clamp(0.68rem,0.15vw+0.63rem,0.75rem)] font-serif uppercase tracking-wide text-[#595959]">
        {byline}
        {!!comments && (
          <span className="inline-flex items-center gap-1 ml-2 align-middle normal-case tracking-normal">
            <Icon name="comment" className="w-3 h-3" />
            {comments}
          </span>
        )}
      </p>

      {bullets.length > 0 && (
        <ul className="mt-2.5 space-y-1.5">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-1.5 text-[clamp(0.82rem,0.25vw+0.75rem,0.92rem)] font-serif leading-snug text-ink"
            >
              <span aria-hidden="true">&bull;</span>
              <span>
                {b.lead && <span className="font-bold">&ldquo;{b.lead}&rdquo; </span>}
                <span className="text-[#3a3a3a]">{b.text}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
