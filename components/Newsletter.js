import Icon from '@/components/Icon';
import { getSite } from '@/lib/data';

// Short topic chips for the homepage banner (mirrors the description copy).
const INLINE_TOPICS = ['News briefs', 'Explainers', 'Investigations'];

/**
 * Newsletter / subscribe CTA for a static export.
 * Primary action is an external list (Substack) so it works without a form backend.
 * Email field is optional progressive enhancement — submit still routes to the list URL.
 */
export default function Newsletter({ variant = 'box' }) {
  const site = getSite();
  const newsletter = site.newsletter || {};
  const href = newsletter.href || 'https://substack.com/@newseditors';
  const cta = newsletter.ctaLabel || 'Subscribe';

  if (variant === 'inline') {
    return (
      <aside
        className="relative isolate overflow-hidden rounded-2xl bg-[#0b2239] px-6 py-8 text-white shadow-[0_24px_48px_-28px_rgba(11,34,57,0.75)] sm:px-10 sm:py-10 lg:px-12 lg:py-11"
        aria-labelledby="newsletter-inline-title"
      >
        {/* Decorative layers (all aria-hidden, none intercept clicks) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,#0b2239_0%,#0a2a68_58%,#0f3d91_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-28 -z-10 h-72 w-72 rounded-full bg-[#4c93ff]/30 blur-3xl sm:h-96 sm:w-96"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[length:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)]"
        />
        <span
          aria-hidden="true"
          className="absolute left-6 top-0 h-[3px] w-14 bg-gradient-to-r from-[#60a5fa] to-[#3b82ff] sm:left-10 sm:w-20 lg:left-12"
        />

        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.18em] text-sky-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" aria-hidden="true" />
              {newsletter.eyebrow || 'From the editors'}
            </p>
            <h3
              id="newsletter-inline-title"
              className="mt-3 font-serif text-[1.7rem] font-black leading-[1.12] tracking-[-0.02em] text-white sm:text-4xl"
            >
              {newsletter.title}
            </h3>
            <p className="mt-3 max-w-xl font-sans text-[15px] leading-6 text-slate-300 sm:text-base sm:leading-7">
              {newsletter.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="What you will find">
              {INLINE_TOPICS.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-sans text-xs font-bold text-sky-100/90"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-extrabold text-[#0b2239] shadow-lg shadow-black/25 transition-all duration-200 hover:bg-sky-100 hover:shadow-xl focus-visible:outline-white sm:w-auto"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
            </svg>
            {cta}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </aside>
    );
  }

  if (variant === 'article') {
    return (
      <aside
        className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-7 sm:py-7"
        aria-labelledby="newsletter-article-title"
      >
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
          {newsletter.eyebrow || 'From the editors'}
        </p>
        <h3 id="newsletter-article-title" className="mt-2 font-serif text-xl font-bold text-ink sm:text-2xl">
          {newsletter.title}
        </h3>
        <p className="mt-2 max-w-xl font-sans text-sm leading-6 text-slate-600">
          {newsletter.description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-brand-dark"
        >
          {cta}
        </a>
      </aside>
    );
  }

  // box (sidebar / card)
  return (
    <aside className="bg-brand p-6 text-center text-white" aria-labelledby="newsletter-box-title">
      <Icon name="mail" className="mx-auto h-7 w-7 text-white/80" filled={false} />
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white/80">
        {newsletter.eyebrow}
      </p>
      <h3 id="newsletter-box-title" className="mt-1 font-serif text-lg font-bold leading-snug">
        {newsletter.title}
      </h3>
      <p className="mt-1.5 text-sm text-white/80">{newsletter.description}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center bg-white px-4 py-2.5 text-sm font-bold text-brand transition-colors hover:bg-gray-100"
      >
        {cta}
      </a>
    </aside>
  );
}
