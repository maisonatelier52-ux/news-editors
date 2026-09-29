import SidebarWidget from '@/components/SidebarWidget';
import FollowUsWidget from '@/components/FollowUsWidget';
import LastModifiedWidget from '@/components/LastModifiedWidget';
import PostCard from '@/components/PostCard';
import AdBox from '@/components/AdBox';
import { getMostViewedPosts, getRecentPosts } from '@/lib/data';

export default function Sidebar({ excludeSlug = null }) {
  const popular = getMostViewedPosts(5).filter((p) => p.slug !== excludeSlug);
  const popularSlugs = popular.map((p) => p.slug);
  const mostViewed = getMostViewedPosts(10, popularSlugs)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 5);
  const recent = getRecentPosts(4, excludeSlug, [...popularSlugs, ...mostViewed.map((p) => p.slug)]);

  return (
    <aside className="space-y-8">
      <FollowUsWidget />

      <AdBox size="sidebar" />

      <LastModifiedWidget posts={recent} />

      <div>
        <h3 className="text-sm font-extrabold text-ink mb-4">Popular Posts</h3>
        <div className="space-y-4">
          {popular.map((post, i) => (
            <div key={post.slug} className="flex gap-3 items-start">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <PostCard post={post} variant="minimal" />
            </div>
          ))}
        </div>
      </div>

      <SidebarWidget title="Most Viewed">
        <ul className="space-y-3">
          {mostViewed.map((post) => (
            <li key={post.slug} className="pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <PostCard post={post} variant="minimal" />
            </li>
          ))}
        </ul>
      </SidebarWidget>
    </aside>
  );
}
