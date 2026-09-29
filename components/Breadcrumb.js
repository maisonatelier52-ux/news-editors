import Link from 'next/link';
import Icon from '@/components/Icon';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-sm text-ink-muted">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <Icon name="chevronRight" className="w-3.5 h-3.5" filled={false} />}
          {item.href ? (
            <Link href={item.href} className="hover:text-brand transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink font-medium truncate max-w-[200px] sm:max-w-none">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
