'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';

export default function MobileMenu({ navItems }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center w-9 h-9 text-ink transition-colors"
      >
        <Icon name="menu" className="w-6 h-6" filled={false} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Logo />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 text-ink"
              >
                <Icon name="close" className="w-5 h-5" filled={false} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wide text-ink border-b border-gray-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-gray-100">
              <Link
                href="/editorial-standards"
                onClick={() => setOpen(false)}
                className="block text-center w-full py-2.5 rounded-full bg-brand text-white font-bold text-sm"
              >
                How we write
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
