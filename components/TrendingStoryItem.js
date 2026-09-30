import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';

/**
 * A single text-led news story block for the trending package.
 * When `image` is provided, a gray placeholder box is always rendered
 * so missing webps still reserve layout space until uploaded.
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
            alt={image.alt || ''}
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
              className="flex gap-1.5 text-[clamp(0.8rem,0.2vw+0.72rem,0.88rem)] font-serif leading-snug text-[#3a3a3a]"
            >
              <span className="text-[#2c6ca3] shrink-0 mt-[0.35em]">•</span>
              <span>
                {b.lead && <strong className="font-bold text-ink">{b.lead} </strong>}
                {b.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
