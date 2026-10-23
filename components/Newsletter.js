import Icon from '@/components/Icon';
import { getSite } from '@/lib/data';

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
        className="flex flex-col items-center gap-6 bg-ink p-6 sm:flex-row sm:p-8"
        aria-labelledby="newsletter-inline-title"
      >
        <div className="flex-1 text-center sm:text-left">
          <p className="mb-1 text-xs font-bold uppercase tracking-wide text-brand">
            {newsletter.eyebrow}
          </p>
          <h3 id="newsletter-inline-title" className="text-xl font-extrabold text-white sm:text-2xl">
            {newsletter.title}
          </h3>
          <p className="mt-1 text-sm text-gray-400">{newsletter.description}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
        >
          {cta}
        </a>
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
