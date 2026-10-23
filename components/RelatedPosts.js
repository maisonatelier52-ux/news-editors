import PostCard from '@/components/PostCard';

/**
 * Related articles grid for article detail pages.
 * Prefer a topic-aware title (e.g. "More in Politics") when categoryName is passed.
 */
export default function RelatedPosts({
  posts,
  title,
  categoryName,
}) {
  if (!posts || posts.length === 0) return null;

  const heading =
    title ||
    (categoryName ? `More in ${categoryName}` : 'Related articles');

  return (
    <section className="mt-12 border-t border-gray-200 pt-8" aria-labelledby="related-posts-heading">
      <div className="mb-5 flex items-center gap-2">
        <span className="h-5 w-1.5 shrink-0 rounded-sm bg-brand" aria-hidden="true" />
        <h2 id="related-posts-heading" className="text-lg font-extrabold text-ink sm:text-xl">
          {heading}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="hero" />
        ))}
      </div>
    </section>
  );
}
