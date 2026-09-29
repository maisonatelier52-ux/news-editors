// Local icon set for the detail page only. Deliberately duplicated rather
// than shared with components/Icon.js or any other page's icon set, so this
// route has zero dependency on (and cannot be broken by) anything else.

export function ShareIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 4l6 5-6 5" />
      <path d="M20 9H10a6 6 0 0 0-6 6v1" />
    </svg>
  );
}

export function CommentIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4.5h16a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1H9l-4.5 4V16H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function ChevronDownIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function GoogleIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.2c0-.8-.07-1.4-.2-2H12v3.8h5.9c-.12 1-.77 2.5-2.2 3.5l-.02.14 3.2 2.5.22.02c2.04-1.9 3.4-4.6 3.4-7.96Z" />
      <path fill="#34A853" d="M12 23c2.9 0 5.3-.96 7.1-2.6l-3.4-2.6c-.9.62-2.16 1.06-3.7 1.06-2.83 0-5.23-1.9-6.1-4.5l-.13.01-3.34 2.6-.04.13C4.2 20.6 7.8 23 12 23Z" />
      <path fill="#FBBC05" d="M5.9 14.36A6.9 6.9 0 0 1 5.5 12c0-.82.14-1.62.38-2.36l-.01-.15-3.38-2.63-.11.05A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.72-2.58Z" />
      <path fill="#EA4335" d="M12 5.14c2.02 0 3.38.87 4.16 1.6l3.04-2.96C17.28 2.16 14.9 1 12 1 7.8 1 4.2 3.4 2.38 6.94l3.5 2.7c.89-2.6 3.29-4.5 6.12-4.5Z" />
    </svg>
  );
}
