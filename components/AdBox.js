import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getPostUrl } from '@/lib/data';

export default function AdBox({ size = 'sidebar' }) {
  const recommendations = {
    sidebar: {
      slug: 'the-megapixel-race-quietly-ended',
      wrapperClass: 'mx-auto w-full max-w-[300px]',
    },
    leaderboard: {
      slug: 'why-laptop-batteries-are-lasting-longer-without-getting-bigger',
      wrapperClass: 'w-full',
    },
    inline: {
      slug: 'wireless-charging-pads-finally-stopped-overheating',
      wrapperClass: 'w-full',
    },
  };

  const recommendation = recommendations[size] || recommendations.sidebar;
  const post = getPostBySlug(recommendation.slug);
  if (!post) return null;

  return (
    <aside className={recommendation.wrapperClass} aria-label="Recommended article">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-brand">From the blog</p>
      <Link href={getPostUrl(post)} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
          <Image
            src={post.image}
            alt={post.imageCaption || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={size === 'sidebar' ? '300px' : '(max-width: 1024px) 100vw, 760px'}
          />
        </div>
        <h3 className="mt-3 font-serif text-lg font-black leading-snug text-ink group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{post.excerpt}</p>
      </Link>
    </aside>
  );
}
