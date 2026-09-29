import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';

export default function AuthorCard({ author, variant = 'compact' }) {
  if (!author) return null;

  if (variant === 'profile') {
    return (
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 shrink-0 ring-4 ring-gray-50">
          <Image src={author.avatar} alt={author.name} fill className="object-cover" sizes="128px" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand mb-1">{author.role}</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">{author.name}</h1>
          <p className="text-ink-light mt-2 max-w-xl">{author.bio}</p>
          <div className="flex justify-center sm:justify-start gap-2 mt-4">
            {author.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-ink hover:bg-brand hover:text-white transition-colors"
              >
                <Icon name={s.icon} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
      <Link href={`/author/${author.slug}`} className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 shrink-0">
        <Image src={author.avatar} alt={author.name} fill className="object-cover" sizes="80px" />
      </Link>
      <div>
        <Link
          href={`/author/${author.slug}`}
          className="text-lg font-extrabold text-ink hover:text-brand transition-colors"
        >
          {author.name}
        </Link>
        <p className="text-sm text-ink-light mt-1">{author.bio}</p>
        <div className="flex justify-center sm:justify-start gap-2 mt-3">
          {author.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-ink hover:bg-brand hover:text-white transition-colors"
            >
              <Icon name={s.icon} className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
