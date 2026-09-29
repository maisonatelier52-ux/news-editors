export default function Logo({ variant = 'dark', size = 'base' }) {
  const isLight = variant === 'light';
  const sizeClasses = size === 'lg' ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl';

  return (
    <span
      className={`flex items-center font-display font-black ${sizeClasses} tracking-tight leading-none select-none whitespace-nowrap ${
        isLight ? 'text-white' : 'text-ink'
      }`}
    >
      <span>News</span>
      <span className="text-brand">.</span>
      <span className={`ml-1.5 font-sans text-[0.34em] font-extrabold uppercase tracking-[0.22em] ${isLight ? 'text-slate-300' : 'text-slate-500'}`}>
        Editors
      </span>
    </span>
  );
}
