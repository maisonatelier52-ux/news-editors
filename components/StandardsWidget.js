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
      <h2 id="standards-widget-title" className="mt-2 font-serif text-2xl font-bold leading-tight">Curiosity, with receipts.</h2>
      <ul className="mt-5 space-y-3">
        {principles.map((principle) => (
          <li key={principle} className="flex gap-3 text-sm leading-6 text-slate-200">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300" aria-hidden="true" />
            {principle}
          </li>
        ))}
      </ul>
      <Link href="/editorial-standards" className="mt-6 inline-flex rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-[#0b2239] transition-colors hover:bg-sky-100">
        See how we write
      </Link>
    </aside>
  );
}
