import PostCard from '@/components/PostCard';

export default function LatestArticles({ posts, title = 'Latest posts', columns = 3 }) {
  if (!posts || posts.length === 0) return null;

  if (columns === 1) {
    return (
      <section>
        {title && (
          <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3] pb-2 mb-6 border-b border-[#808080]/40">
            {title}
          </h2>
        )}
        <div className="space-y-6 divide-y divide-[#808080]/40">
          {posts.map((post, i) => (
            <div key={post.slug} className={i > 0 ? 'pt-6' : ''}>
              <PostCard post={post} variant="horizontal" showReadMore />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const colClass =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section>
      {title && (
        <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3] pb-2 mb-5 border-b border-[#808080]/40">
          {title}
        </h2>
      )}
      <div className={`grid grid-cols-1 ${colClass} gap-6 lg:gap-8`}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="hero" />
        ))}
      </div>
    </section>
  );
}
