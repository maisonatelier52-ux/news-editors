import Link from 'next/link';
import Image from 'next/image';
import { getAuthorBySlug, getCategoryBySlug, getPostUrl } from '@/lib/data';

/**
 * Full-bleed themed section on a tinted background, matching the reference
 * "SUMMER" package: an eyebrow label + full-width hairline across the top,
 * a text-only lead story on the left, one large image in the center, and
 * a small image with its own caption on the right. The rust/orange kicker
 * color is specific to this section (a themed accent, distinct from the
 * site's usual blue) — same treatment as the source.
 */
export default function ThemedFeature({ label, posts = [] }) {
  if (posts.length < 2) return null;
  const [lead, side] = posts;
  const leadAuthor = getAuthorBySlug(lead.author);
  const leadCategory = getCategoryBySlug(lead.category);
  const sideAuthor = getAuthorBySlug(side.author);
  const sideCategory = getCategoryBySlug(side.category);

  return (
    <section className="bg-[#f7ede1]">
      <div className="max-w-container mx-auto px-4 py-8">
        <div className="pb-2 mb-6 border-b border-ink/70">
          <span className="font-serif font-bold text-xs uppercase tracking-widest text-ink">
            {label}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,280px)_1fr_minmax(0,280px)] gap-8 items-start">
          {/* Left — text-only lead */}
          <div>
            <h3 className="text-[clamp(1.2rem,0.9vw+1rem,1.6rem)] font-serif font-bold leading-[1.15] text-ink">
              <Link href={getPostUrl(lead)} className="hover:opacity-80 transition-opacity">
                <span className="text-[#b5502e]">{leadCategory ? `${leadCategory.name}.` : ''}</span>
                {' '}
                {lead.title}
              </Link>
            </h3>
            {lead.excerpt && (
              <p className="mt-3 text-sm font-serif text-[#3a3a3a] line-clamp-4">
                {lead.excerpt}
              </p>
            )}
            <p className="mt-3 text-[11px] font-serif uppercase tracking-wide text-[#595959]">
              {leadAuthor?.name}
              {!!lead.comments && (
                <span className="inline-flex items-center gap-1 ml-2 align-middle normal-case tracking-normal">
                  {lead.comments}
                </span>
              )}
            </p>
          </div>

          {/* Center — large image */}
          <Link href={getPostUrl(lead)} className="group relative block w-full aspect-[16/10] overflow-hidden">
            <Image
              src={lead.image}
              alt={lead.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Link>

          {/* Right — small image + caption */}
          <div>
            <Link href={getPostUrl(side)} className="group relative block w-full aspect-[4/3] overflow-hidden mb-3">
              <Image
                src={side.image}
                alt={side.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </Link>
            <h4 className="text-sm font-serif font-bold leading-snug text-ink">
              <Link href={getPostUrl(side)} className="hover:opacity-80 transition-opacity">
                <span className="text-[#b5502e]">{sideCategory ? `${sideCategory.name}.` : ''}</span>
                {' '}
                {side.title}
              </Link>
            </h4>
            <p className="mt-2 text-[11px] font-serif uppercase tracking-wide text-[#595959]">
              {sideAuthor?.name}
              {!!side.comments && (
                <span className="ml-2">{side.comments}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
