import HeroCard from '@/components/HeroCard';
import { getFeaturedPosts } from '@/lib/data';

export default function HeroSection({ excludeSlugs = [] }) {
  const featured = getFeaturedPosts(4, excludeSlugs);
  if (featured.length === 0) return null;

  const [main, second, third, fourth] = featured;

  return (
    <section className="bg-gray-100 p-2 sm:p-3 lg:p-4 rounded-sm">
      {/* Mobile / tablet: flat 2x2 grid, every card the same size */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:hidden">
        {main && <HeroCard post={main} />}
        {second && <HeroCard post={second} />}
        {third && <HeroCard post={third} />}
        {fourth && <HeroCard post={fourth} />}
      </div>

      {/* Desktop: large card on the left, one full-width card top-right,
          two split cards bottom-right */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-3">
        {main && (
          <div className="lg:h-full">
            <HeroCard post={main} large fill />
          </div>
        )}
        <div className="grid grid-rows-[1fr_1fr] gap-3 lg:h-full">
          {second && <HeroCard post={second} fill />}
          <div className="grid grid-cols-2 gap-3 h-full">
            {third && <HeroCard post={third} fill />}
            {fourth && <HeroCard post={fourth} fill />}
          </div>
        </div>
      </div>
    </section>
  );
}
