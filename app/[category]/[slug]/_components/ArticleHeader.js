import Link from 'next/link';
import { formatPostType, getCategoryBySlug } from '@/lib/data';
import ShareButton from './ShareButton';

export default function ArticleHeader({ post }) {
  const category = getCategoryBySlug(post.category);

  return (
    <header>
      {category && (
        <Link
          href={`/${category.slug}`}
          className="inline-block font-sans font-extrabold uppercase tracking-wide text-xs sm:text-sm text-ink hover:text-brand"
        >
          {category.name}
        </Link>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-ink">{formatPostType(post.articleType)}</span>
        {post.readingTime && <span>{post.readingTime}</span>}
      </div>

      <h1 className="mt-4 font-serif text-4xl font-black leading-[1.06] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.6rem]">
        {post.title}
      </h1>

      {post.subtitle && (
        <p className="mt-5 max-w-[860px] font-serif text-xl leading-8 text-ink-light sm:text-2xl sm:leading-9">
          {post.subtitle}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <ShareButton title={post.title} />
        <a href="#sources" className="inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand">
          Sources &amp; notes
        </a>
      </div>
    </header>
  );
}
