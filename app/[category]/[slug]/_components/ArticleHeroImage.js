import Image from 'next/image';

export default function ArticleHeroImage({ post }) {
  if (!post.image) return null;

  return (
    <figure className="mt-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={post.image}
          alt={post.imageCaption || post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {(post.imageCaption || post.imageCredit) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 border-l-2 border-brand pl-3 font-sans text-sm text-ink-muted">
          {post.imageCaption && <span>{post.imageCaption}</span>}
          {post.imageCredit && (
            <span className="text-xs uppercase tracking-wide text-ink-light">{post.imageCredit}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
