'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon } from './icons';

export default function ArticleFooterMeta({ premium, linksOfInterest = [] }) {
  const [expanded, setExpanded] = useState(false);

  if (!premium && linksOfInterest.length === 0) return null;

  return (
    <div className="mt-8">
      {premium && (
        <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-xs font-sans font-bold text-ink-light">
          Premium
        </span>
      )}

      {linksOfInterest.length > 0 && (
        <div className={premium ? 'mt-4' : ''}>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-1.5 text-sm font-sans font-extrabold text-ink"
          >
            View links of interest
            <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          {expanded && (
            <ul className="mt-3 space-y-2">
              {linksOfInterest.map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link href={link.href} className="text-sm font-sans text-[#2E6D9C] hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-6 border-b border-gray-200" />
    </div>
  );
}
