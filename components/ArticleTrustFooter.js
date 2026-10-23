import Link from 'next/link';

/**
 * EEAT trust strip for article pages.
 * Surfaces editorial policies that already exist as static routes so readers
 * and crawlers can reach Source Methodology, Editorial Standards, and Right of Reply.
 */
const LINKS = [
  { href: '/source-methodology', label: 'Source methodology' },
  { href: '/editorial-standards', label: 'Editorial standards' },
  { href: '/right-of-reply-policy', label: 'Right of reply' },
  { href: '/contact', label: 'Contact the editors' },
];

export default function ArticleTrustFooter() {
  return (
    <aside
      aria-label="Editorial policies"
      className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5 sm:px-6"
    >
      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
        About this reporting
      </p>
      <p className="mt-2 max-w-2xl font-sans text-sm leading-6 text-slate-600">
        News Editors publishes with disclosed sources, visible updates, and an open
        path for corrections and reply. These pages explain how that works.
      </p>
      <nav className="mt-4 flex flex-wrap gap-2" aria-label="Trust and policy links">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
