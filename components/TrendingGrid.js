import TrendingStoryItem from '@/components/TrendingStoryItem';
import { getAllPosts, getAuthorBySlug, getCategoryBySlug, getPostUrl } from '@/lib/data';

/**
 * Newspaper-style trending package: left stack, center feature, right stack.
 * rightCSlug pins the image-led right-column story (e.g. Julio).
 * rightBelowSlug adds a compact third story under that image card.
 * centerSlug pins the centre feature (lead) card at the top of the grid.
 * centerBSlug pins the story directly under the centre feature card (the
 * first slot of the left-to-right "starting section" below it).
 * leftBSlug pins the second story of the left column.
 * leftCSlug pins the third (last) story of the left column.
 * rightBSlug pins the quoted-kicker story at the top of the right column.
 */
export default function TrendingGrid({
  excludeSlugs = [],
  rightCSlug = null,
  rightBelowSlug = null,
  centerSlug = null,
  centerBSlug = null,
  leftBSlug = null,
  leftCSlug = null,
  rightBSlug = null,
}) {
  const exclude = new Set(excludeSlugs);

  let centerOverride = null;
  if (centerSlug) {
    centerOverride = getAllPosts().find((p) => p.slug === centerSlug) || null;
    if (centerOverride) exclude.add(centerSlug);
  }

  let centerBOverride = null;
  if (centerBSlug) {
    centerBOverride = getAllPosts().find((p) => p.slug === centerBSlug) || null;
    if (centerBOverride) exclude.add(centerBSlug);
  }

  let leftBOverride = null;
  if (leftBSlug) {
    leftBOverride = getAllPosts().find((p) => p.slug === leftBSlug) || null;
    if (leftBOverride) exclude.add(leftBSlug);
  }

  let leftCOverride = null;
  if (leftCSlug) {
    leftCOverride = getAllPosts().find((p) => p.slug === leftCSlug) || null;
    if (leftCOverride) exclude.add(leftCSlug);
  }

  let rightBOverride = null;
  if (rightBSlug) {
    rightBOverride = getAllPosts().find((p) => p.slug === rightBSlug) || null;
    if (rightBOverride) exclude.add(rightBSlug);
  }

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
  const minNeeded =
    (rightCOverride ? 6 : 7) -
    (centerOverride ? 1 : 0) -
    (centerBOverride ? 1 : 0) -
    (leftBOverride ? 1 : 0) -
    (leftCOverride ? 1 : 0) -
    (rightBOverride ? 1 : 0);
  if (pool.length < minNeeded) return null;

  // A pinned leftB takes the second left-column slot; otherwise it is the next
  // story by date.
  const [leftA, ...afterLeftA] = pool;
  const leftB = leftBOverride || afterLeftA.shift();
  const afterLeft = afterLeftA;
  // A pinned leftC takes the last left-column slot; otherwise it is the next
  // story by date.
  const leftC = leftCOverride || afterLeft.shift();
  // A pinned centre takes the lead slot; otherwise it is the next story by date.
  const center = centerOverride || afterLeft[0];
  const rest = centerOverride ? afterLeft : afterLeft.slice(1);
  // A pinned centerB takes that slot; otherwise it is the next story by date.
  const centerB = centerBOverride || rest.shift();
  // A pinned rightB takes the top slot of the right column; otherwise it is the
  // next story by date.
  const rightB = rightBOverride || rest.shift();
  const [rightCFallback] = rest;
  const rightC = rightCOverride || rightCFallback;

  const storyProps = (post, { bullet = false } = {}) => {
    const author = getAuthorBySlug(post.author);
    const category = getCategoryBySlug(post.category);
    return {
      href: getPostUrl(post),
      kicker: `${category ? category.name : 'News'}.`,
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
              kicker: `${category ? category.name : 'News'}.`,
              headline: center.title,
              byline: author ? author.name.toUpperCase() : '',
              comments: center.comments,
              bullets,
              image: { src: center.image, alt: center.title },
              size: 'lg',
              imageAspect: 'aspect-[16/10]',
              // First image on the page and the LCP element: load it eagerly.
              priority: true,
            };
          })()}
        />
        {centerB && (
          <div className="mt-6 pt-6 border-t border-[#808080]/40">
            <TrendingStoryItem {...storyProps(centerB, { bullet: true })} />
          </div>
        )}
      </div>

      {/* Right column — quoted + Julio (image) + optional image-led story below */}
      <div className="order-3 pt-6 border-t border-[#808080]/40 lg:pt-0 lg:border-t-0 lg:border-l lg:border-[#808080]/40 lg:pl-8 space-y-5 lg:flex lg:flex-col">
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
          <div className="pt-5 border-t border-[#808080]/40 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
            {/* On desktop the image box stretches into the column's spare height
                (this column is the shortest), so it can never make the grid taller
                or push the sticky sidebar below. Stacked layouts use a plain 16:10. */}
            <TrendingStoryItem
              {...storyProps(rightBelow)}
              image={{ src: rightBelow.image, alt: rightBelow.title }}
              imageAspect="aspect-[16/10] lg:aspect-auto lg:min-h-[80px] lg:max-h-[220px] lg:flex-1"
              fill
            />
          </div>
        )}
      </div>
    </section>
  );
}
