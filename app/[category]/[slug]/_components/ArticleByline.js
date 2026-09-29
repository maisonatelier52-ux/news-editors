import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getAuthorBySlug } from '@/lib/data';

// Formats an ISO-ish "YYYY-MM-DDTHH:MM:00" string as e.g.
// "Wednesday, August 12, 2026 - 10:49 PM", matching the reference design.
function formatUpdatedAt(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  const datePart = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${datePart} - ${timePart}`;
}

export default function ArticleByline({ post }) {
  const author = getAuthorBySlug(post.author);
  const updated = formatUpdatedAt(post.updatedAt);

  return (
    <div className="mt-6 border-b border-slate-200 pb-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {author?.avatar && (
            <Image
              src={author.avatar}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full border border-slate-200 bg-white object-cover"
            />
          )}
          <div>
            {author ? (
              <Link href={`/author/${author.slug}`} className="font-serif font-bold text-ink hover:text-brand">
                {author.name}
              </Link>
            ) : (
              <span className="font-serif font-bold text-ink">Staff writer</span>
            )}
            {author?.role && <p className="font-sans text-sm text-ink-muted">{author.role}</p>}
          </div>
        </div>

        <div className="text-left font-sans text-sm leading-6 text-ink-muted sm:text-right">
          <p><span className="font-bold text-ink">Published</span> {formatDate(post.date)}</p>
          {updated && <p><span className="font-bold text-ink">Updated</span> {updated}</p>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
        <span>Sources and methodology disclosed below</span>
        <Link href="/editorial-standards" className="text-brand hover:underline">How we verify stories</Link>
      </div>
    </div>
  );
}
