import Link from 'next/link';

export const metadata = {
  title: 'How we write',
  description: 'How News Editors selects, researches, labels, updates and corrects its news and explainers.',
};

const evidence = [
  ['Primary records', 'Filings, public datasets, court records, policy documents, transcripts and original product documentation come first.'],
  ['Named expertise', 'We identify the organization, role and relevant expertise behind consequential claims whenever possible.'],
  ['Independent context', 'We compare official claims with data, prior records and credible technical analysis rather than repeating an announcement.'],
];

export default function EditorialStandardsPage() {
  return (
    <main className="mx-auto max-w-[980px] px-4 py-10 sm:px-6 sm:py-16">
      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand">About the site</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl font-black tracking-[-0.025em] text-ink sm:text-6xl">How we write</h1>
      <p className="mt-6 max-w-3xl font-serif text-xl leading-9 text-slate-600">
        A useful article should show its workings: what prompted the story, which evidence supports it and where reasonable uncertainty remains.
      </p>

      <section className="mt-12 border-t-2 border-ink pt-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">01 · Evidence</p>
        <h2 className="mt-2 font-serif text-3xl font-black text-ink">How we build a useful article</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {evidence.map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-sans text-base font-extrabold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 border-t border-slate-200 pt-8 md:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">02 · Labels</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-ink">Know what you are reading</h2>
        </div>
        <div className="space-y-6 text-base leading-7 text-slate-700">
          <p><strong className="text-ink">Current-affairs articles</strong> begin with a documented development, then slow down to explain context and uncertainty. They are not presented as live or breaking coverage.</p>
          <p><strong className="text-ink">Reporting scope</strong> is stated honestly. Source-based articles do not imply first-hand, on-the-ground or laboratory work; original reporting or hands-on testing is identified only when it actually occurred and the method can be described.</p>
          <p><strong className="text-ink">Explainers and essays</strong> connect evidence to a practical question or considered point of view. Interpretation is separated from established fact.</p>
          <p><strong className="text-ink">Reviews</strong> distinguish hands-on observations, controlled measurements and manufacturer-rated specifications. Archive reviews carry a clear warning that price, support and availability may have changed.</p>
          <p><strong className="text-ink">Article illustrations</strong> are original editorial artwork created for News Editors and clearly credited beneath each article image. They interpret the subject; they are not documentary photographs or evidence of an event.</p>
        </div>
      </section>

      <section id="reviews" className="mt-12 grid scroll-mt-24 gap-8 border-t border-slate-200 pt-8 md:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">03 · Reviews</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-ink">A useful verdict needs context</h2>
        </div>
        <div className="space-y-4 text-base leading-7 text-slate-700">
          <p>We evaluate products against the job they are meant to do, the closest credible alternatives and the compromises a buyer will notice after the novelty wears off.</p>
          <ul className="space-y-3 rounded-2xl bg-slate-50 p-6 marker:text-brand">
            <li>Test conditions and timeframes are stated when a claim depends on them.</li>
            <li>Battery, comfort, repair, software support and total ownership cost are part of the verdict.</li>
            <li>Review scores never replace the written reasoning.</li>
            <li>Manufacturer claims are attributed and are not presented as our measurements.</li>
          </ul>
        </div>
      </section>

      <section id="corrections" className="mt-12 grid scroll-mt-24 gap-8 border-t border-slate-200 pt-8 md:grid-cols-[0.72fr_1.28fr]">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">04 · Corrections</p>
          <h2 className="mt-2 font-serif text-3xl font-black text-ink">The record should get better</h2>
        </div>
        <div className="space-y-4 text-base leading-7 text-slate-700">
          <p>Material factual changes are corrected in the article and reflected in its visible update time. If a correction changes the central conclusion, the note should explain what was wrong and how the conclusion changed.</p>
          <p>Small spelling, style and formatting fixes that do not alter meaning may be made without a correction note. Articles about developing events distinguish a routine update from a correction.</p>
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-[#0b2239] p-7 text-white sm:p-9">
        <h2 className="font-serif text-3xl font-black">A quick reader check</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-300">Before acting on any article, check its date, follow the primary links and look for the line between a documented fact and a forecast or opinion.</p>
        <Link href="/" className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-[#0b2239] hover:bg-sky-100">Browse the latest articles</Link>
      </section>
    </main>
  );
}
