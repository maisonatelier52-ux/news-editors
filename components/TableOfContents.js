export default function TableOfContents({ toc }) {
  if (!toc || toc.length === 0) return null;

  return (
    <nav className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-muted mb-3">
        In this article
      </p>
      <ol className="space-y-2">
        {toc.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-ink hover:text-brand transition-colors flex gap-2"
            >
              <span className="text-brand font-bold">{i + 1}.</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
