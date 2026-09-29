import StoryItem from './StoryItem';

export default function TopStoriesSection({ category, leftList = [], feature = null, secondary = [] }) {
  const hasFeatureLayout = Boolean(feature);

  if (!hasFeatureLayout && leftList.length === 0) return null;

  // Not enough posts for the narrow-list + feature layout (needs 4+ posts).
  // Rendering the two-column grid anyway would leave the wide column as a
  // large empty box, so fall back to a full-width responsive card grid
  // that uses all of the available space instead.
  if (!hasFeatureLayout) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {leftList.map((post) => (
          <StoryItem key={post.slug} post={post} category={category} variant="thumbTop" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-x-10">
      {leftList.length > 0 && (
        <div className="space-y-5 order-2 lg:order-1">
          {leftList.map((post, i) => (
            <StoryItem
              key={post.slug}
              post={post}
              category={category}
              variant={i === 0 ? 'text' : 'thumbTop'}
            />
          ))}
        </div>
      )}

      <div className="space-y-1 order-1 lg:order-2 mb-8 lg:mb-0">
        <StoryItem post={feature} category={category} variant="feature" />
        {secondary.map((post) => (
          <StoryItem key={post.slug} post={post} category={category} variant="horizontal" />
        ))}
      </div>
    </div>
  );
}
