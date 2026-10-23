'use client';

import ShareButtons from '@/components/ShareButtons';

/**
 * Article share control. Prefer absoluteUrl from the server so the first
 * paint has correct share targets without waiting for window.location.
 */
export default function ShareButton({ title, url, text }) {
  return <ShareButtons url={url} title={title} text={text} />;
}
