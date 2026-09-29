import Image from 'next/image';

export default function ArticleContent({ blocks }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="article-content">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={i} id={block.id}>
                {block.text}
              </h2>
            );
          case 'paragraph':
            return <p key={i}>{block.text}</p>;
          case 'quote':
            return <blockquote key={i}>{block.text}</blockquote>;
          case 'list':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <figure key={i}>
                <div className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={block.src}
                    alt={block.alt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                  />
                </div>
                {block.alt && (
                  <figcaption className="text-xs text-ink-muted mt-2 text-center">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
