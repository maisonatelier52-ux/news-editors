import Link from 'next/link';
import {
  LAST_UPDATED,
  LAST_UPDATED_DISPLAY,
  getStaticPage,
  getStaticPages,
  getStaticPageJsonLd,
} from '@/lib/static-pages';

// Building blocks for the site-information pages (contact, privacy, terms,
// legal). The look deliberately mirrors /about and /editorial-standards:
// same width, eyebrow + serif headline, ruled two-column sections and the
// same slate / brand palette.

export function StaticPageShell({ slug, children }) {
  const jsonLd = getStaticPageJsonLd(slug);
  return (
    <div className="mx-auto max-w-[980px] px-4 py-10 sm:px-6 sm:py-16">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </div>
  );
}

export function PageIntro({ eyebrow, title, children }) {
  return (
    <>
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl font-black tracking-[-0.025em] text-ink sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-3xl font-serif text-xl leading-9 text-slate-600">{children}</p>
    </>
  );
}

// Two-column ruled section: label + heading on the left, body on the right.
export function PageSection({ id, number, label, title, first = false, children }) {
  const rule = first ? 'border-t-2 border-ink pt-7' : 'border-t border-slate-200 pt-8';
  return (
    <section id={id} className={`mt-12 grid scroll-mt-24 gap-8 md:grid-cols-[0.72fr_1.28fr] ${rule}`}>
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
          {number} · {label}
        </p>
        <h2 className="mt-2 font-serif text-3xl font-black text-ink">{title}</h2>
      </div>
      <div className="space-y-4 text-base leading-7 text-slate-700">{children}</div>
    </section>
  );
}

export function PageList({ children }) {
  return (
    <ul className="list-disc space-y-3 rounded-2xl bg-slate-50 py-6 pl-11 pr-6 marker:text-brand">
      {children}
    </ul>
  );
}

// Inline text link in the site's brand colour.
export function TextLink({ href, children }) {
  const className =
    'font-bold text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand';
  if (href.startsWith('mailto:')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function PageFooter({ current }) {
  const group = getStaticPage(current)?.group;
  const siblings = getStaticPages().filter((page) => page.slug !== current && page.group === group);
  // Pages that explain how the site works also point to Contact; every page
  // points to "How we write".
  const extras = [{ label: 'How we write', href: '/editorial-standards' }];
  if (group === 'about') extras.unshift({ label: 'Contact', href: '/contact' });
  const pillClass =
    'rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-brand hover:text-brand';

  return (
    <div className="mt-12 border-t border-slate-200 pt-6">
      <p className="text-sm text-slate-500">
        Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED_DISPLAY}</time>
      </p>
      <nav aria-label="Related pages" className="mt-4 flex flex-wrap gap-2">
        {siblings.map((page) => (
          <Link key={page.slug} href={page.path} className={pillClass}>
            {page.label}
          </Link>
        ))}
        {extras.map((item) => (
          <Link key={item.href} href={item.href} className={pillClass}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
