import Link from 'next/link';
import Image from 'next/image';
import { getPostUrl } from '@/lib/data';

export default function ImageStrip({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 bg-gray-100">
      {posts.slice(0, 3).map((post) => (
        <Link
          key={post.slug}
          href={getPostUrl(post)}
          className="group relative block aspect-[4/3] overflow-hidden"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[11px] text-gray-300 mb-1">
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <h3 className="text-white font-bold text-sm leading-snug line-clamp-2">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
