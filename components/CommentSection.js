'use client';

import Image from 'next/image';

const demoComments = [
  {
    name: 'Aldmohy',
    date: 'Dec 25, 2020',
    avatar: '/images/authors/danny-rand.jpg',
    text: 'This is the future — really well written breakdown, thanks for putting this together.',
  },
];

export default function CommentSection({ count = 1 }) {
  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-lg sm:text-xl font-extrabold text-ink mb-6">
        {count} Comment{count !== 1 ? 's' : ''}
      </h2>

      <div className="space-y-6 mb-10">
        {demoComments.map((c, i) => (
          <div key={i} className="flex gap-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 shrink-0">
              <Image src={c.avatar} alt={c.name} fill className="object-cover" sizes="44px" />
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-ink">{c.name}</span>
                <span className="text-xs text-ink-muted">says:</span>
              </div>
              <p className="text-sm text-ink-light">{c.text}</p>
              <span className="text-xs text-ink-muted mt-2 block">{c.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-bold text-base text-ink mb-1">Leave a Reply</h3>
        <p className="text-xs text-ink-muted mb-4">
          Your email address will not be published. Required fields are marked *
        </p>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <textarea
            placeholder="Comment *"
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name *"
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <input
              type="email"
              placeholder="Email *"
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <input
              type="text"
              placeholder="Website"
              className="px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-brand text-white font-bold text-sm hover:bg-brand-dark transition-colors"
          >
            Post Comment
          </button>
        </form>
      </div>
    </section>
  );
}
