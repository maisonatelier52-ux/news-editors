'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({ navItems }) {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden lg:flex items-center gap-8 h-full">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center h-full text-[15px] font-sans font-bold border-b-[3px] transition-colors ${
              active
                ? 'text-brand border-brand'
                : 'text-ink border-transparent hover:text-brand'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
