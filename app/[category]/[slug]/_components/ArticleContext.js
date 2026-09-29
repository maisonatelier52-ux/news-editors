import Link from 'next/link';

export function ArticleSummary({ post }) {
  const takeaways = post.keyTakeaways || [];

  if (!takeaways.length && !post.whyItMatters) return null;

  return (
    <section
      aria-labelledby="article-summary-heading"
      className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
    >
      <div className="grid gap-0 md:grid-cols-[1.55fr_1fr]">
        <div className="p-6 sm:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">The brief</p>
          <h2 id="article-summary-heading" className="mt-2 font-serif text-2xl font-bold text-ink">
            What to know
          </h2>
          <ul className="mt-4 space-y-3">
            {takeaways.map((item, index) => (
              <li key={`${item}-${index}`} className="flex gap-3 font-sans text-base leading-7 text-slate-700">
                <span aria-hidden="true" className="mt-[0.68rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {post.whyItMatters && (
          <div className="border-t border-slate-200 bg-white p-6 sm:p-7 md:border-l md:border-t-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">Why it matters</p>
            <p className="mt-3 font-serif text-lg leading-8 text-ink">{post.whyItMatters}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function SourceLink({ source }) {
  const external = /^https?:\/\//.test(source.url || '');
  const className = 'group block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-brand/50 hover:bg-slate-50';
  const content = (
    <>
      <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">{source.publisher}</span>
      <span className="mt-1 block font-sans text-base font-bold leading-6 text-ink group-hover:text-brand">{source.label}</span>
      {source.accessed && <span className="mt-2 block text-xs text-slate-500">Accessed {source.accessed}</span>}
    </>
  );

  if (external) {
    return <a href={source.url} target="_blank" rel="noreferrer" className={className}>{content}</a>;
  }

  return <Link href={source.url || '/editorial-standards'} className={className}>{content}</Link>;
}

export function SourceLedger({ post }) {
  const sources = post.sources || [];
  const readingNote = post.reportingNote === 'Primary documents are linked below. Company and government statements are identified as such; breaking figures may be revised after publication.'
    ? 'Primary documents are linked below. Company and government statements are identified as claims, and details may change after publication.'
    : post.reportingNote?.replace(/^This article /, 'This post ');

  return (
    <section id="sources" aria-labelledby="sources-heading" className="mt-12 border-t-2 border-ink pt-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Transparency</p>
          <h2 id="sources-heading" className="mt-1 font-serif text-2xl font-bold text-ink">Sources &amp; reading notes</h2>
        </div>
        <Link href="/editorial-standards" className="text-sm font-bold text-brand hover:underline">How we write</Link>
      </div>

      {readingNote && <p className="mt-4 max-w-3xl font-sans text-base leading-7 text-slate-600">{readingNote}</p>}

      {sources.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {sources.map((source, index) => <SourceLink key={`${source.url}-${index}`} source={source} />)}
        </div>
      )}

      <p className="mt-5 text-sm leading-6 text-slate-500">
        Spot something that needs attention?{' '}
        <Link href="/editorial-standards#corrections" className="font-bold text-ink underline decoration-slate-300 underline-offset-4">
          Review our corrections process.
        </Link>
      </p>
    </section>
  );
}
