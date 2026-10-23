import Link from 'next/link';

const principles = [
  'Primary documents before commentary',
  'Clear labels for news reports, explainers and investigations',
  'Visible updates and an open corrections process',
];

export default function StandardsWidget() {
  return (
    <aside className="rounded-2xl bg-[#0b2239] p-6 text-white" aria-labelledby="standards-widget-title">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky-300">How this site works</p>
      <h2 id="standards-widget-title" className="mt-2 font-serif text-2xl font-bold leading-tight">
        Curiosity, with receipts.
      </h2>
      <ul className="mt-5 space-y-3">
        {principles.map((principle) => (
          <li key={principle} className="flex gap-3 text-sm leading-6 text-slate-200">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" aria-hidden="true" />
            {principle}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-2">
        <Link
          href="/editorial-standards"
          className="inline-flex justify-center rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-[#0b2239] transition-colors hover:bg-sky-100"
        >
          See how we write
        </Link>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-1 text-center text-xs font-bold text-sky-200/90">
          <Link href="/source-methodology" className="hover:text-white hover:underline">
            Source methodology
          </Link>
          <Link href="/right-of-reply-policy" className="hover:text-white hover:underline">
            Right of reply
          </Link>
        </div>
      </div>
    </aside>
  );
}
