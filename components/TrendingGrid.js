import TrendingStoryItem from '@/components/TrendingStoryItem';
import { getAllPosts, getAuthorBySlug, getCategoryBySlug, getPostUrl } from '@/lib/data';

/**
 * Newspaper-style trending package: left stack, center feature, right stack.
 * rightCSlug pins the image-led right-column story (e.g. Julio).
 * rightBelowSlug adds a compact third story under that image card.
 */
export default function TrendingGrid({
  excludeSlugs = [],
  rightCSlug = null,
  rightBelowSlug = null,
}) {
  const exclude = new Set(excludeSlugs);

  let rightCOverride = null;
  if (rightCSlug) {
    rightCOverride = getAllPosts().find((p) => p.slug === rightCSlug) || null;
    if (rightCOverride) exclude.add(rightCSlug);
  }

  let rightBelow = null;
  if (rightBelowSlug) {
    rightBelow = getAllPosts().find((p) => p.slug === rightBelowSlug) || null;
    if (rightBelow) exclude.add(rightBelowSlug);
  }

  const pool = getAllPosts().filter((p) => !exclude.has(p.slug));
  const minNeeded = rightCOverride ? 6 : 7;
  if (pool.length < minNeeded) return null;

  const [
    leftA, leftB, leftC,
    center, centerB,
    rightB, rightCFallback,
  ] = pool;
  const rightC = rightCOverride || rightCFallback;

  const storyProps = (post, { bullet = false } = {}) => {
    const author = getAuthorBySlug(post.author);
    const category = getCategoryBySlug(post.category);
    return {
      href: getPostUrl(post),
      kicker: `${category ? category.name : 'Blog'}.`,
      headline: post.title,
      byline: author ? author.name.toUpperCase() : '',
      comments: post.comments,
      bullets: bullet && post.subtitle
        ? [{ lead: post.subtitle, text: post.excerpt }]
        : [],
    };
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr_1fr] gap-8 lg:gap-0">

      {/* Left column */}
      <div className="order-2 lg:order-1 pt-6 border-t border-[#808080]/40 lg:pt-0 lg:border-t-0 lg:pr-8 space-y-6">
        <TrendingStoryItem {...storyProps(leftA, { bullet: true })} />
        <div className="pt-6 border-t border-[#808080]/40">
          <TrendingStoryItem {...storyProps(leftB)} />
        </div>
        <div className="pt-6 border-t border-[#808080]/40">
          <TrendingStoryItem {...storyProps(leftC, { bullet: true })} />
        </div>
      </div>

      {/* Center column */}
      <div className="order-1 lg:order-2 lg:px-8 lg:border-l lg:border-[#808080]/40">
        <TrendingStoryItem
          {...(() => {
            const author = getAuthorBySlug(center.author);
            const category = getCategoryBySlug(center.category);
            const sentences = center.excerpt.split(/(?<=[.!?])\s+/).filter(Boolean);
            const bullets = [];
            if (center.subtitle) bullets.push({ lead: center.subtitle, text: sentences[0] || center.excerpt });
            if (sentences[1]) bullets.push({ text: sentences[1] });
            return {
              href: getPostUrl(center),
              kicker: `${category ? category.name : 'Blog'}.`,
              headline: center.title,
              byline: author ? author.name.toUpperCase() : '',
              comments: center.comments,
              bullets,
              image: { src: center.image, alt: center.title },
              size: 'lg',
              imageAspect: 'aspect-[16/10]',
            };
          })()}
        />
        {centerB && (
          <div className="mt-6 pt-6 border-t border-[#808080]/40">
            <TrendingStoryItem {...storyProps(centerB, { bullet: true })} />
          </div>
        )}
      </div>

      {/* Right column — quoted + Julio (image) + optional compact below */}
      <div className="order-3 pt-6 border-t border-[#808080]/40 lg:pt-0 lg:border-t-0 lg:border-l lg:border-[#808080]/40 lg:pl-8 space-y-5">
        <TrendingStoryItem
          {...(() => {
            const author = getAuthorBySlug(rightB.author);
            return {
              href: getPostUrl(rightB),
              kicker: rightB.subtitle || rightB.title,
              kickerQuoted: true,
              headline: rightB.title,
              byline: author ? author.name.toUpperCase() : '',
              comments: rightB.comments,
            };
          })()}
        />
        <div className="pt-5 border-t border-[#808080]/40">
          {/* Compact image card so a third story can fit without stretching the page */}
          <TrendingStoryItem
            {...storyProps(rightC)}
            image={{ src: rightC.image, alt: rightC.title }}
            imageAspect="aspect-[16/10]"
          />
        </div>
        {rightBelow && (
          <div className="pt-5 border-t border-[#808080]/40">
            <TrendingStoryItem {...storyProps(rightBelow)} />
          </div>
        )}
      </div>
    </section>
  );
}
