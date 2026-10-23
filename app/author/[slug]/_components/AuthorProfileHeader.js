import Link from 'next/link';
import ContentImage from '@/components/ContentImage';
import { SocialIcon, hasSocialIcon } from './icons';

/**
 * @param {object} author
 * @param {{ name: string, slug: string }[]} [topics] - categories this author has written in
 */
export default function AuthorProfileHeader({ author, topics = [] }) {
  return (
    <div className="border border-gray-200 p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4 sm:gap-5">
          {author.avatar && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 sm:h-20 sm:w-20">
              <ContentImage
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}
          <div className="min-w-0 pt-0.5">
            <h1 className="font-serif text-2xl font-bold leading-tight text-ink sm:text-[28px]">
              {author.name}
            </h1>
            {author.role && (
              <p className="mt-1 font-sans text-sm text-ink-muted">{author.role}</p>
            )}
            {author.bio && (
              <p className="mt-2 max-w-2xl font-sans text-sm leading-relaxed text-ink-light">
                {author.bio}
              </p>
            )}
            {topics.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
                  Topics covered
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {topics.map((topic) => (
                    <li key={topic.slug}>
                      <Link
                        href={`/${topic.slug}`}
                        className="inline-block rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-bold text-ink transition-colors hover:border-brand hover:text-brand"
                      >
                        {topic.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {author.socials?.length > 0 && (
          <div className="flex items-center gap-2.5 sm:pt-1">
            {author.socials
              .filter((social) => hasSocialIcon(social.icon))
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  <SocialIcon icon={social.icon} className="h-4 w-4" />
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
