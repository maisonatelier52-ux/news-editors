'use client';

import { useCallback, useState } from 'react';

/**
 * Real share targets for organic amplification (Day 4).
 * href="#" placeholders removed — each network gets a proper share URL.
 */
function buildShareUrls(url, title, text) {
  const u = encodeURIComponent(url || '');
  const t = encodeURIComponent(title || '');
  const d = encodeURIComponent(text || title || '');
  return {
    x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    email: `mailto:?subject=${t}&body=${d}%0A%0A${u}`,
  };
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.14 8.5h4.72V23H.14V8.5zM8.34 8.5h4.52v1.98h.06c.63-1.2 2.17-2.46 4.47-2.46 4.78 0 5.66 3.15 5.66 7.24V23h-4.72v-6.5c0-1.55-.03-3.54-2.16-3.54-2.16 0-2.49 1.69-2.49 3.43V23H8.34V8.5z" />
    </svg>
  );
}

function LinkIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" />
    </svg>
  );
}

function ShareGlyph({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51 15.42 17.49M15.41 6.51 8.59 10.49" strokeLinecap="round" />
    </svg>
  );
}

/**
 * @param {string} url - absolute canonical URL
 * @param {string} title
 * @param {string} [text] - short description for email / native share
 * @param {boolean} [compact] - icon-only buttons
 */
export default function ShareButtons({
  url,
  title,
  text,
  compact = false,
  className = '',
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl =
    url || (typeof window !== 'undefined' ? window.location.href : '');
  const urls = buildShareUrls(shareUrl, title, text);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [shareUrl]);

  const nativeShare = useCallback(async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text: text || title, url: shareUrl });
        return;
      } catch {
        // cancelled — fall through
      }
    }
    copyLink();
  }, [title, text, shareUrl, copyLink]);

  const btn =
    'inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white text-ink transition-colors hover:border-brand hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand';
  const size = compact ? 'h-9 w-9' : 'h-9 px-3.5 text-sm font-bold';

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} role="group" aria-label="Share this article">
      <button type="button" onClick={nativeShare} className={`${btn} ${size}`} aria-label="Share">
        <ShareGlyph className="h-4 w-4" />
        {!compact && <span>Share</span>}
      </button>
      <a
        href={urls.x}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} ${size}`}
        aria-label="Share on X"
      >
        <XIcon className="h-4 w-4" />
        {!compact && <span>X</span>}
      </a>
      <a
        href={urls.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} ${size}`}
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="h-4 w-4" />
        {!compact && <span>LinkedIn</span>}
      </a>
      <button type="button" onClick={copyLink} className={`${btn} ${size}`} aria-label="Copy link">
        <LinkIcon className="h-4 w-4" />
        {!compact && <span>{copied ? 'Copied' : 'Copy link'}</span>}
      </button>
    </div>
  );
}
