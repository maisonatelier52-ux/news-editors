import PostCard from '@/components/PostCard';

export default function LastModifiedWidget({ posts }) {
  if (!posts || posts.length === 0) return null;
  const [featured, ...rest] = posts;

  return (
    <div>
      <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3] mb-3 pb-2 border-b border-[#808080]/40">Recently updated</h3>
      <PostCard post={featured} variant="hero" />
      <div className="mt-4 space-y-4">
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} variant="compact" />
        ))}
      </div>
    </div>
  );
}
