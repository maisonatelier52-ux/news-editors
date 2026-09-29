'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-white border border-gray-200 text-brand shadow-lg hover:bg-brand hover:text-white hover:border-brand transition-colors"
    >
      <Icon name="arrowUp" className="w-5 h-5" filled={false} />
    </button>
  );
}
