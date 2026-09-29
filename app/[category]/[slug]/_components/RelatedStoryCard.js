import Link from 'next/link';
import Image from 'next/image';
import { getPostUrl, getCategoryBySlug } from '@/lib/data';

export default function RelatedStoryCard({ post }) {
  const url = getPostUrl(post);
  const category = getCategoryBySlug(post.category);

  return (
    <Link href={url} className="group block">
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="280px" />
      </div>
      <p className="mt-2.5 font-sans font-bold text-[15px] leading-snug text-ink group-hover:text-brand transition-colors">
        {post.title}
      </p>
      {category && (
        <span className="mt-2 inline-block px-2 py-0.5 bg-ink text-white text-[11px] font-sans font-extrabold uppercase tracking-wide">
          {category.name}
        </span>
      )}
    </Link>
  );
}
