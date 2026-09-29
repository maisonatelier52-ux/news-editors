import Image from 'next/image';

// Wraps any occurrences of the given phrases in <strong>, in the order they
// appear in the text. `bold` phrases are exact substrings authored alongside
// the paragraph text in posts.json, so a straightforward split is reliable.
function renderParagraphText(text, boldPhrases = []) {
  if (!boldPhrases.length) return text;

  const escaped = boldPhrases
    .filter(Boolean)
    .sort((a, b) => b.length - a.length)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!escaped.length) return text;

  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    boldPhrases.includes(part) ? (
      <strong key={i} className="font-bold text-ink">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          id={block.id}
          className="mb-4 mt-10 scroll-mt-24 font-serif text-2xl font-black tracking-[-0.015em] text-ink sm:text-3xl"
        >
          {block.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="mb-6 font-serif text-lg leading-8 text-slate-800 sm:text-[1.16rem] sm:leading-9">
          {renderParagraphText(block.text, block.bold)}
        </p>
      );
    case 'quote':
      return (
        <blockquote className="my-8 rounded-r-xl border-l-4 border-brand bg-slate-50 py-5 pl-6 pr-5 font-serif text-xl italic leading-8 text-ink-light">
          {block.text}
        </blockquote>
      );
    case 'list':
      return (
        <ul className="mb-7 ml-1 space-y-3 rounded-xl border border-slate-200 bg-slate-50 px-7 py-5 font-sans text-base leading-7 text-slate-700 marker:text-brand">
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
            <Image src={block.src} alt={block.caption || ''} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
          </div>
          {block.caption && (
            <figcaption className="mt-2 text-sm font-sans text-ink-muted">{block.caption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

export default function ArticleBody({ post }) {
  const blocks = post.content || [];

  return (
    <div className="mt-10">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
