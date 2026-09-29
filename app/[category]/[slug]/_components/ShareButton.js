'use client';

import { useState } from 'react';
import { ShareIcon } from './icons';

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore — nothing more we can do without a share sheet or clipboard
      }
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm font-sans font-medium text-ink hover:border-ink transition-colors"
    >
      <ShareIcon className="w-4 h-4" />
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
}
