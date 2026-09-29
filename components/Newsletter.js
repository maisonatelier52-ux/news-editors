'use client';

import Icon from '@/components/Icon';
import { getSite } from '@/lib/data';

export default function Newsletter({ variant = 'box' }) {
  const { newsletter } = getSite();

  if (variant === 'inline') {
    return (
      <div className="bg-ink p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-brand text-xs font-bold uppercase tracking-wide mb-1">
            {newsletter.eyebrow}
          </p>
          <h3 className="text-white text-xl sm:text-2xl font-extrabold">{newsletter.title}</h3>
          <p className="text-gray-400 text-sm mt-1">{newsletter.description}</p>
        </div>
        <form className="w-full sm:w-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your Email address"
            className="flex-1 sm:w-64 px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-brand text-white font-bold text-sm hover:bg-brand-dark transition-colors shrink-0"
          >
            Subscribe
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-brand p-6 text-white text-center">
      <Icon name="mail" className="w-7 h-7 mx-auto text-white/80" filled={false} />
      <p className="text-xs font-bold uppercase tracking-wide text-white/80 mt-3">
        {newsletter.eyebrow}
      </p>
      <h3 className="font-serif text-lg font-bold leading-snug mt-1">{newsletter.title}</h3>
      <p className="text-sm text-white/80 mt-1.5">{newsletter.description}</p>
      <form className="mt-4 flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Enter your Email address"
          className="w-full px-4 py-2.5 text-sm text-ink text-center focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className="w-full px-4 py-2.5 bg-white text-brand font-bold text-sm hover:bg-gray-100 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
