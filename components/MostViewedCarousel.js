import PostCard from '@/components/PostCard';
import { getMostViewedPosts } from '@/lib/data';

export default function MostViewedCarousel({ excludeSlugs = [] }) {
  const posts = getMostViewedPosts(3, excludeSlugs);
  if (posts.length === 0) return null;

  return (
    <div>
      <h2 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3] pb-2 mb-5 border-b border-[#808080]/40">
        Editor&apos;s picks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} variant="hero" />
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2c6ca3]" />
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}
