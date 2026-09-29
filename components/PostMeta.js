import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { getAuthorBySlug, formatDate, formatViews } from '@/lib/data';

export default function PostMeta({
  post,
  showAvatar = true,
  showViews = true,
  showComments = false,
  size = 'sm',
}) {
  const author = getAuthorBySlug(post.author);
  const textSize = size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${textSize} text-ink-muted`}>
      {author && (
        <Link
          href={`/author/${author.slug}`}
          className="flex items-center gap-2 font-semibold text-ink hover:text-brand transition-colors"
        >
          {showAvatar && (
            <span className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 bg-gray-200">
              <Image src={author.avatar} alt={author.name} fill className="object-cover" sizes="24px" />
            </span>
          )}
          {author.name}
        </Link>
      )}
      <span>{formatDate(post.date)}</span>
      {showViews && (
        <span className="flex items-center gap-1 text-brand font-semibold">
          <Icon name="bolt" className="w-3.5 h-3.5" />
          {formatViews(post.views)}
        </span>
      )}
      {showComments && (
        <span className="flex items-center gap-1">
          <Icon name="comment" className="w-3.5 h-3.5" filled={false} />
          {post.comments}
        </span>
      )}
    </div>
  );
}
