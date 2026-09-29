import PostCard from '@/components/PostCard';

export default function RelatedPosts({ posts, title = 'Related Articles' }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="border-t border-gray-200 pt-8">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1.5 h-5 rounded-sm bg-brand" />
        <h2 className="text-lg sm:text-xl font-extrabold text-ink">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="hero" />
        ))}
      </div>
    </section>
  );
}
