import Link from 'next/link';
import Image from 'next/image';
import { CommentIcon } from './icons';
import { getPostUrl, getAuthorBySlug, formatDate } from '@/lib/data';

// Picks a short "kicker" label the way the reference design shows one
// (e.g. "Public health.", "Office.") — falls back to the category name
// when a post doesn't have a more specific tag to show.
function getKicker(post, categoryName) {
  const tag = post.tags?.find((t) => t.toLowerCase() !== post.category.toLowerCase());
  if (tag) return tag.charAt(0).toUpperCase() + tag.slice(1);
  return categoryName;
}

function Byline({ post }) {
  const author = getAuthorBySlug(post.author);
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs font-sans uppercase tracking-wide text-ink-muted">
      {author && <span className="font-semibold text-ink-light">{author.name}</span>}
      <span className="text-[#B5651D] font-semibold normal-case">{formatDate(post.date)}</span>

    </div>
  );
}

export default function StoryItem({ post, category, variant = 'horizontal' }) {
  const url = getPostUrl(post);
  const kicker = getKicker(post, category.name);

  if (variant === 'text') {
    return (
      <article className="pb-5 border-b border-gray-200">
        <h3 className="font-serif leading-snug text-[17px] sm:text-lg">
          <Link href={url} className="group">
            <span className="font-bold text-[#2E6D9C] group-hover:underline">{kicker}.</span>{' '}
            <span className="font-bold text-ink">{post.title}</span>
          </Link>
        </h3>
        <Byline post={post} />
      </article>
    );
  }

  if (variant === 'thumbTop') {
    return (
      <article className="pb-5 border-b border-gray-200">
        <Link href={url} className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-100 mb-3">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 320px" />
        </Link>
        <h3 className="font-serif leading-snug text-[17px] sm:text-lg">
          <Link href={url} className="group">
            <span className="font-bold text-[#2E6D9C] group-hover:underline">{kicker}.</span>{' '}
            <span className="font-bold text-ink">{post.title}</span>
          </Link>
        </h3>
        <Byline post={post} />
      </article>
    );
  }

  if (variant === 'feature') {
    return (
      <article className="pb-6 border-b border-gray-200">
        <Link href={url} className="relative block w-full aspect-[16/9] overflow-hidden bg-gray-100">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
        </Link>
        {post.imageCredit && (
          <p className="mt-1.5 text-right text-[11px] font-sans text-ink-muted">{post.imageCredit}</p>
        )}
        <h2 className="mt-3 font-serif leading-snug text-2xl sm:text-[28px]">
          <Link href={url} className="group">
            <span className="font-bold text-[#2E6D9C] group-hover:underline">{kicker}.</span>{' '}
            <span className="font-bold text-ink">{post.title}</span>
          </Link>
        </h2>
        <Byline post={post} />
      </article>
    );
  }

  // 'horizontal' (default): text block left, thumbnail right — used for the
  // secondary top-stories items and the "More <Category> News" river.
  return (
    <article className="py-5 border-b border-gray-200 grid grid-cols-[1fr_140px] sm:grid-cols-[1fr_180px] gap-4 sm:gap-6 items-start">
      <div>
        <h3 className="font-serif leading-snug text-[17px] sm:text-xl">
          <Link href={url} className="group">
            <span className="font-bold text-[#2E6D9C] group-hover:underline">{kicker}.</span>{' '}
            <span className="font-bold text-ink">{post.title}</span>
          </Link>
        </h3>
        <Byline post={post} />
      </div>
      <Link href={url} className="relative block w-full aspect-[4/3] overflow-hidden bg-gray-100 shrink-0">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="180px" />
      </Link>
    </article>
  );
}
