import Link from 'next/link';
import Image from 'next/image';
import { getPostUrl, getCategoryBySlug, formatDate } from '@/lib/data';
import { CommentIcon } from './icons';

export default function ArticleRow({ post }) {
  const url = getPostUrl(post);
  const category = getCategoryBySlug(post.category);
  const kicker = category?.name || post.category;

  return (
    <article className="py-5 border-b border-gray-200 grid grid-cols-[1fr_140px] sm:grid-cols-[1fr_180px] gap-4 sm:gap-6 items-start">
      <div>
        <h2 className="font-serif leading-snug text-[17px] sm:text-xl">
          <Link href={url} className="group">
            <span className="font-bold text-[#2E6D9C] group-hover:underline">{kicker}.</span>{' '}
            <span className="font-bold text-ink">{post.title}</span>
          </Link>
        </h2>
        {post.excerpt && (
          <p className="hidden sm:block mt-1.5 text-sm text-ink-muted font-sans line-clamp-2">
            {post.excerpt}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-sans uppercase tracking-wide text-ink-muted">
          <span className="text-[#B5651D] font-semibold normal-case">{formatDate(post.date)}</span>

        </div>
      </div>
      {post.image && (
        <Link href={url} className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-100 shrink-0">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="180px" />
        </Link>
      )}
    </article>
  );
}
