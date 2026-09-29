import Image from 'next/image';
import Link from 'next/link';
import { getCategoryBySlug } from '@/lib/data';
import AuthorProfileActions from './AuthorProfileActions';
import { SocialIcon, hasSocialIcon } from './icons';

// Builds the "#Category" topic tags shown under the author's role, from the
// distinct categories of the posts they've actually written.
function getTopicTags(posts) {
  const seen = new Map();
  for (const post of posts) {
    if (!seen.has(post.category)) {
      const category = getCategoryBySlug(post.category);
      seen.set(post.category, category?.name || post.category);
    }
  }
  return [...seen.entries()].map(([slug, name]) => ({ slug, name }));
}

export default function AuthorProfileHeader({ author, posts }) {
  const tags = getTopicTags(posts);

  return (
    <div className="border border-gray-200 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
        <div className="flex gap-4 sm:gap-5">
          {author.avatar && (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden bg-gray-100">
              <Image src={author.avatar} alt={author.name} fill className="object-cover" sizes="80px" />
            </div>
          )}
          <div className="pt-0.5">
            <h1 className="font-serif font-bold text-2xl sm:text-[28px] text-ink leading-tight">
              {author.name}
            </h1>
            {author.role && (
              <p className="text-sm text-ink-muted font-sans mt-1">{author.role}</p>
            )}
            {tags.length > 0 && (
              <p className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm font-sans">
                {tags.map((tag, i) => (
                  <Link
                    key={tag.slug}
                    href={`/${tag.slug}`}
                    className={
                      i === tags.length - 1
                        ? 'text-[#2E6D9C] font-semibold hover:underline'
                        : 'text-ink font-medium hover:text-brand'
                    }
                  >
                    #{tag.name.replace(/\s+/g, ' ')}
                  </Link>
                ))}
              </p>
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
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-ink text-ink hover:bg-ink hover:text-white transition-colors"
                >
                  <SocialIcon icon={social.icon} className="w-4 h-4" />
                </a>
              ))}
          </div>
        )}
      </div>

      <div className="mt-5">
        <AuthorProfileActions bio={author.bio} />
      </div>
    </div>
  );
}
