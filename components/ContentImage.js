import Image from 'next/image';

/**
 * Shared image wrapper for static-export pages.
 *
 * Why this exists (Day 1 speed foundation):
 * - Static export uses `images.unoptimized: true`, so next/image still
 *   renders a plain <img>. Consistent loading / priority / decoding props
 *   matter more than the optimizer pipeline.
 * - LCP candidates must use priority + fetchPriority="high" so the browser
 *   requests them from the initial HTML without waiting for lazy discovery.
 * - Everything else gets decoding="async" so decode work does not block
 *   the main thread while the user is reading.
 *
 * Usage is the same as next/image. Pass `priority` for above-the-fold LCP
 * images only (homepage hero, article hero). Do not set priority on lists
 * or below-fold cards.
 */
export default function ContentImage({
  priority = false,
  loading,
  fetchPriority,
  decoding,
  alt = '',
  ...rest
}) {
  const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy');
  const resolvedFetchPriority = fetchPriority ?? (priority ? 'high' : undefined);
  // priority images decode soon; others may decode off the critical path
  const resolvedDecoding = decoding ?? (priority ? 'sync' : 'async');

  return (
    <Image
      alt={alt}
      priority={priority}
      loading={resolvedLoading}
      fetchPriority={resolvedFetchPriority}
      decoding={resolvedDecoding}
      {...rest}
    />
  );
}
