'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { getPostUrl } from '@/lib/data';

const AUTOPLAY_MS = 5000;

export default function BreakingNews({ breaking = [] }) {
  const count = breaking.length;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const timerRef = useRef(null);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (count < 2) return;
    timerRef.current = setInterval(() => {
      setDirection('next');
      setIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    restartTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const goNext = () => {
    setDirection('next');
    setIndex((prev) => (prev + 1) % count);
    restartTimer();
  };

  const goPrev = () => {
    setDirection('prev');
    setIndex((prev) => (prev - 1 + count) % count);
    restartTimer();
  };

  if (!count) return null;

  const current = breaking[index];

  return (
    <div className="flex items-center h-full w-full gap-3 sm:gap-4">
      {/* Sliding headline — each change slides + fades in like a modern news ticker */}
      <div className="relative flex-1 h-full min-w-0 overflow-hidden">
        <Link
          key={index}
          href={getPostUrl(current)}
          className={`
            absolute inset-0 flex items-center
            text-[13px] sm:text-[15px] font-sans font-medium text-ink
            hover:text-brand transition-colors
            ${direction === 'next' ? 'animate-ticker-in-up' : 'animate-ticker-in-down'}
          `}
        >
          <span className="truncate">{current?.title}</span>
        </Link>
      </div>

      {/* Prev/Next controls — pinned to the right end of the bar */}
      {count > 1 && (
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            type="button"
            aria-label="Previous headline"
            onClick={goPrev}
            className="
              w-7 h-7 flex items-center justify-center
              border border-gray-200 rounded-full bg-white
              text-gray-400 hover:text-brand hover:border-brand
              transition
            "
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5 rotate-180" filled={false} />
          </button>

          <button
            type="button"
            aria-label="Next headline"
            onClick={goNext}
            className="
              w-7 h-7 flex items-center justify-center
              border border-gray-200 rounded-full bg-white
              text-gray-400 hover:text-brand hover:border-brand
              transition
            "
          >
            <Icon name="chevronRight" className="w-3.5 h-3.5" filled={false} />
          </button>
        </div>
      )}
    </div>
  );
}
