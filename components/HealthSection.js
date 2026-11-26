import Link from 'next/link';
import ContentImage from '@/components/ContentImage';
import Icon from '@/components/Icon';
import {
  formatDate,
  getAuthorBySlug,
  getCategoryBySlug,
  getPostUrl,
  getPostsByCategory,
} from '@/lib/data';

/**
 * Homepage "Health" section (sits after the World strip, before the footer).
 *
 * Layout (editorial, matches the OpinionStrip / ThemedFeature look):
 * - lg+   : one large lead story on the left (image, kicker, serif headline,
 *           excerpt) beside a 2 x 2 grid of image cards, divided by hairlines
 * - sm    : lead story full width, then a 2-column grid of image cards
 * - mobile: lead story stacked, then compact rows (thumbnail left, text right)
 *
 * Shows the newest 5 stories of the Health category; renders nothing when the
 * category has fewer than 2 stories.
 */
export default function HealthSection({ categorySlug = 'health', limit = 5, excludeSlugs = [] }) {
  const category = getCategoryBySlug(categorySlug);
  const posts = getPostsByCategory(categorySlug, excludeSlugs).slice(0, limit);
  if (!category || posts.length < 2) return null;

  const [lead, ...rest] = posts;
  const leadAuthor = getAuthorBySlug(lead.author);
  const leadUrl = getPostUrl(lead);

  return (
    <section className="border-y border-slate-200 bg-slate-50/70" aria-labelledby="home-health-heading">
      <div className="mx-auto max-w-container px-4 py-6 sm:py-8">
        {/* Section header — same pattern as the other homepage strips */}
        <div className="mb-5 flex items-center justify-between border-b border-[#808080]/40 pb-2">
          <h2
            id="home-health-heading"
            className="font-serif text-sm font-bold uppercase tracking-wide text-[#2c6ca3]"
          >
            {category.name}
          </h2>
          <Link
            href={`/${category.slug}`}
            className="flex items-center gap-1 font-serif text-xs uppercase tracking-wide text-[#595959] transition-colors hover:text-[#2c6ca3]"
          >
            View all
            <Icon name="chevronRight" className="h-3.5 w-3.5" filled={false} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Lead story */}
          <article className="lg:border-r lg:border-[#808080]/40 lg:pr-8">
            <Link
              href={leadUrl}
              className="group relative block aspect-[16/10] w-full overflow-hidden bg-gray-100 lg:aspect-[4/3]"
            >
              <ContentImage
                src={lead.image}
                alt={lead.imageCaption || lead.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Link>
            <h3 className="mt-4 font-serif text-[clamp(1.25rem,1vw+1rem,1.75rem)] font-bold leading-[1.15] text-ink">
              <Link href={leadUrl} className="transition-opacity hover:opacity-80">
                <span className="text-[#2c6ca3]">{category.name.replace(/\.$/, '')}.</span>{' '}
                {lead.title}
              </Link>
            </h3>
            {lead.excerpt && (
              <p className="mt-3 line-clamp-4 font-serif text-sm leading-6 text-[#3a3a3a] sm:text-base sm:leading-7">
                {lead.excerpt}
              </p>
            )}
            <p className="mt-3 font-serif text-[11px] uppercase tracking-wide text-[#595959]">
              {leadAuthor?.name}
              <span className="mx-2 text-[#808080]">·</span>
              <time dateTime={lead.date} className="normal-case tracking-normal">
                {formatDate(lead.date)}
              </time>
            </p>
          </article>

          {/* Remaining stories: compact rows on mobile, image cards from sm up */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 sm:gap-y-8">
            {rest.map((post, i) => {
              const url = getPostUrl(post);
              const author = getAuthorBySlug(post.author);
              return (
                <article
                  key={post.slug}
                  className={`flex items-start gap-3 sm:block ${
                    // mobile: hairline between rows; sm+: hairline only above the 2nd grid row
                    i === 0
                      ? ''
                      : i === 1
                        ? 'border-t border-[#808080]/30 pt-5 sm:border-t-0 sm:pt-0'
                        : 'border-t border-[#808080]/30 pt-5 sm:pt-6'
                  }`}
                >
                  <Link
                    href={url}
                    className="group relative block h-20 w-28 shrink-0 overflow-hidden bg-gray-100 sm:mb-3 sm:h-auto sm:w-full sm:aspect-[16/10]"
                  >
                    <ContentImage
                      src={post.image}
                      alt={post.imageCaption || post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 50vw, 28vw"
                    />
                  </Link>
                  <div className="min-w-0">
                    <h4 className="font-serif text-[15px] font-bold leading-snug text-ink sm:text-base">
                      <Link href={url} className="transition-opacity hover:opacity-80">
                        <span className="block text-xs text-[#2c6ca3]">
                          {category.name.replace(/\.$/, '')}.
                        </span>
                        <span className="line-clamp-4 sm:line-clamp-none">{post.title}</span>
                      </Link>
                    </h4>
                    <p className="mt-1.5 font-serif text-[11px] uppercase tracking-wide text-[#595959]">
                      {author?.name}
                      <span className="mx-2 text-[#808080]">·</span>
                      <time dateTime={post.date} className="normal-case tracking-normal">
                        {formatDate(post.date)}
                      </time>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
