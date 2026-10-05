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
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-2 border-l-2 border-brand pl-3 font-sans text-sm text-ink-muted max-sm:mt-4 max-sm:flex-col max-sm:flex-nowrap max-sm:items-start max-sm:gap-1.5 max-sm:py-0.5 max-sm:pl-3.5 max-sm:text-[13.5px] max-sm:leading-[1.55] max-sm:text-ink-light">
          {post.imageCaption && <span>{post.imageCaption}</span>}
          {post.imageCredit && (
            <span className="text-xs uppercase tracking-wide text-ink-light max-sm:text-xs max-sm:normal-case max-sm:tracking-normal max-sm:text-ink-muted">{post.imageCredit}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
