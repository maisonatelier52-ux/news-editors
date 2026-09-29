export default function SidebarWidget({ title, children, className = '' }) {
  return (
    <div className={`bg-white ${className}`}>
      {title && (
        <h3 className="text-sm font-extrabold uppercase tracking-wide text-ink border-b-2 border-brand pb-2 mb-4 inline-block">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
