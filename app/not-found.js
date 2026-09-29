import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-container mx-auto px-4 py-24 text-center">
      <p className="text-brand font-extrabold text-6xl sm:text-7xl">404</p>
      <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold text-ink">
        Page not found
      </h1>
      <p className="mt-2 text-ink-muted max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 px-6 py-3 rounded-full bg-brand text-white font-bold text-sm hover:bg-brand-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
