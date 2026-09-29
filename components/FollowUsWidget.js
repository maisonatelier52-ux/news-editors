import Icon from '@/components/Icon';
import { getSite } from '@/lib/data';

export default function FollowUsWidget() {
  const { followStats } = getSite();

  return (
    <div>
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#808080]/40">
        <h3 className="font-serif font-bold text-sm uppercase tracking-wide text-[#2c6ca3]">Follow Us</h3>
        <Icon name="thumbsUp" className="w-4 h-4 text-[#808080]" />
      </div>
      <div>
        {followStats.map((stat, i) => (
          <a
            key={stat.label + stat.icon}
            href="#"
            className={`flex items-center gap-3 py-3 group ${i > 0 ? 'border-t border-[#808080]/40' : ''}`}
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#808080]/50 text-[#2c6ca3] shrink-0 group-hover:border-[#2c6ca3] transition-colors">
              <Icon name={stat.icon} className="w-3.5 h-3.5" filled={stat.icon !== 'x'} />
            </span>
            <span className="flex items-baseline gap-1.5">
              <span className="font-serif font-bold text-ink">{stat.value}</span>
              <span className="text-xs font-serif uppercase tracking-wide text-[#595959]">{stat.label}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
