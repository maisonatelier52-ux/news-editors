import Link from 'next/link';

export const metadata = {
  title: 'About',
  description: 'About the News Editors blog and the ideas, explainers and practical guides we publish.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[980px] px-4 py-10 sm:px-6 sm:py-16">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">News Editors</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl font-black tracking-[-0.025em] text-ink sm:text-6xl">A blog for looking past the obvious.</h1>
      <p className="mt-6 max-w-3xl font-serif text-xl leading-9 text-slate-600">News Editors is an independent blog about technology, money and the events shaping everyday life. We publish thoughtful posts that connect the facts, explain the trade-offs and help readers form their own view.</p>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 md:grid-cols-3">
        {[
          ['The wider world', 'Notes and explainers on policy, health and global events, grounded in dated sources rather than a rush to be first.'],
          ['Business and money', 'Company decisions, markets and personal-finance questions explored without pretending that one post is personal advice.'],
          ['Everyday technology', 'Reviews, comparisons and practical guides focused on trade-offs, ownership cost and long-term usefulness.'],
        ].map(([title, text]) => (
          <section key={title} className="bg-white p-6 sm:p-7">
            <h2 className="font-serif text-2xl font-bold text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
          </section>
        ))}
      </div>

      <section className="mt-12 border-t-2 border-ink pt-7">
        <h2 className="font-serif text-3xl font-black text-ink">What readers can expect</h2>
        <div className="mt-5 grid gap-6 text-base leading-7 text-slate-700 sm:grid-cols-2">
          <p>Post formats are labeled. Sources and reading notes are visible on the page. Updates are dated. Older technology posts are marked as archive material rather than quietly presented as current advice.</p>
          <p>This is a blog, not a live newswire. Source-based current-affairs posts do not claim on-the-ground or original reporting unless a post explicitly says otherwise. They favor context, dated links and a plain account of what remains uncertain.</p>
        </div>
        <Link href="/editorial-standards" className="mt-8 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-extrabold text-white hover:bg-brand-dark">See how we write</Link>
      </section>
    </main>
  );
}
