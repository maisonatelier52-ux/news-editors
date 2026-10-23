import Link from 'next/link';
import ContentImage from '@/components/ContentImage';
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

// Short form for phones, e.g. "Oct 2, 2026, 12:30 PM"
function formatUpdatedAtShort(isoString) {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${datePart}, ${timePart}`;
}

/** True when updatedAt is a different calendar day (or clearly later) than date. */
function isMeaningfullyUpdated(post) {
  if (!post?.updatedAt || !post?.date) return Boolean(post?.updatedAt);
  const published = new Date(post.date).getTime();
  const updated = new Date(post.updatedAt).getTime();
  if (Number.isNaN(published) || Number.isNaN(updated)) return Boolean(post.updatedAt);
  // Show Updated when at least ~1 hour after publish (avoids identical stamps).
  return updated - published >= 60 * 60 * 1000;
}

export default function ArticleByline({ post }) {
  const author = getAuthorBySlug(post.author);
  const showUpdated = isMeaningfullyUpdated(post);
  const updated = showUpdated ? formatUpdatedAt(post.updatedAt) : null;
  const updatedShort = showUpdated ? formatUpdatedAtShort(post.updatedAt) : null;

  return (
    <div className="mt-6 border-b border-slate-200 pb-5 max-sm:mt-7 max-sm:pb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {author?.avatar && (
            <Link href={`/author/${author.slug}`} className="shrink-0">
              <ContentImage
                src={author.avatar}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-slate-200 bg-white object-cover max-sm:h-11 max-sm:w-11"
              />
            </Link>
          )}
          <div className="min-w-0">
            {author ? (
              <Link
                href={`/author/${author.slug}`}
                className="font-serif font-bold text-ink hover:text-brand max-sm:text-[17px]"
              >
                {author.name}
              </Link>
            ) : (
              <span className="font-serif font-bold text-ink">Staff writer</span>
            )}
            {author?.role && (
              <p className="font-sans text-sm text-ink-muted">{author.role}</p>
            )}
          </div>
        </div>

        <div className="text-left font-sans text-sm leading-6 text-ink-muted sm:text-right max-sm:grid max-sm:w-full max-sm:grid-cols-[auto_1fr] max-sm:gap-x-7 max-sm:border-t max-sm:border-slate-200 max-sm:pt-4">
          <p className="max-sm:flex max-sm:flex-col max-sm:gap-0.5">
            <span className="font-bold text-ink max-sm:text-xs max-sm:font-medium max-sm:leading-4 max-sm:text-ink-muted">
              Published
            </span>{' '}
            <time
              dateTime={post.date}
              className="max-sm:text-[15px] max-sm:font-semibold max-sm:leading-5 max-sm:text-ink"
            >
              {formatDate(post.date)}
            </time>
          </p>
          {updated && (
            <p className="max-sm:flex max-sm:flex-col max-sm:gap-0.5">
              <span className="font-bold text-ink max-sm:text-xs max-sm:font-medium max-sm:leading-4 max-sm:text-ink-muted">
                Updated
              </span>{' '}
              <time dateTime={post.updatedAt} className="max-sm:hidden">
                {updated}
              </time>
              <time
                dateTime={post.updatedAt}
                className="sm:hidden max-sm:text-[15px] max-sm:font-semibold max-sm:leading-5 max-sm:text-ink"
              >
                {updatedShort}
              </time>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-xs font-bold uppercase tracking-[0.12em] text-slate-500 max-sm:mt-5 max-sm:grid max-sm:grid-cols-[auto_1fr] max-sm:items-start max-sm:gap-x-3 max-sm:gap-y-0.5 max-sm:rounded-xl max-sm:bg-brand/[0.06] max-sm:px-4 max-sm:py-3.5 max-sm:text-[13.5px] max-sm:font-semibold max-sm:normal-case max-sm:leading-5 max-sm:tracking-normal max-sm:text-ink-light">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-[18px] w-[18px] text-brand sm:hidden max-sm:mt-px"
          aria-hidden="true"
        >
          <path d="M12 3 5 6v5c0 4.4 2.9 8 7 10 4.1-2 7-5.6 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span>Sources and methodology disclosed below</span>
        <Link
          href="/editorial-standards"
          className="text-brand hover:underline max-sm:col-start-2 max-sm:justify-self-start max-sm:underline max-sm:decoration-brand/30 max-sm:underline-offset-4"
        >
          How we verify stories
        </Link>
      </div>
    </div>
  );
}
