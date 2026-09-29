import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getPostUrl } from '@/lib/data';

export default function NativeAdBanner() {
  const post = getPostBySlug('wireless-charging-pads-finally-stopped-overheating');
  if (!post) return null;

  return (
    <aside className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50" aria-label="Recommended article">
      <Link href={getPostUrl(post)} className="group flex flex-col sm:flex-row sm:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">Recommended reading</p>
          <h3 className="mt-2 font-serif text-xl font-black leading-snug text-ink group-hover:text-brand">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{post.excerpt}</p>
        </div>
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-100 sm:w-64">
          <Image
            src={post.image}
            alt={post.imageCaption || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 256px"
          />
        </div>
      </Link>
    </aside>
  );
}
