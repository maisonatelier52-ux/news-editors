// Local icon set for the author page only. Deliberately duplicated rather
// than imported from components/Icon.js (shared) or the category page's
// own icon set, so this route has zero dependency on any other page.

export function XIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.9 3H21l-6.6 7.5L22 21h-6.4l-5-6.6L4.7 21H2.6l7-8-7.6-10H8.6l4.6 6.1L18.9 3Zm-2.2 16h1.9L8.4 5H6.4l10.3 14Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88ZM5.5 10h2.88v9.5H5.5V10Zm5.25 0h2.76v1.3h.04c.38-.72 1.32-1.48 2.72-1.48 2.9 0 3.44 1.9 3.44 4.38v5.3h-2.88v-4.7c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48v4.78H10.75V10Z" />
    </svg>
  );
}

export function MailIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2 8 6 8-6" />
    </svg>
  );
}

export function FacebookIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 9H15V6.5h-1.5C11.6 6.5 10.5 7.6 10.5 9v1.5H9V13h1.5v7H13v-7h1.8l.3-2.5H13V9c0-.3.2-.5.5-.5Z" />
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

export function ChevronRightIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export function CommentIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" />
    </svg>
  );
}

export function PinterestIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.05-.7-.1-1.9.02-2.7l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.86 0 1.27.64 1.27 1.42 0 .86-.55 2.15-.83 3.35-.24 1 .5 1.83 1.5 1.83 1.8 0 3.18-1.9 3.18-4.63 0-2.42-1.74-4.11-4.23-4.11-2.88 0-4.57 2.16-4.57 4.4 0 .86.34 1.79.75 2.29a.3.3 0 0 1 .07.29l-.28 1.12c-.04.19-.15.23-.34.14-1.27-.59-2.06-2.44-2.06-3.93 0-3.2 2.32-6.14 6.7-6.14 3.52 0 6.25 2.5 6.25 5.85 0 3.5-2.2 6.31-5.27 6.31-1.03 0-2-.54-2.33-1.17l-.63 2.42c-.23.88-.85 1.98-1.27 2.65A9 9 0 1 0 12 3Z" />
    </svg>
  );
}

export function FlickrIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="8.5" cy="12" r="3.5" />
      <circle cx="15.5" cy="12" r="3.5" />
    </svg>
  );
}

export function BehanceIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M3 7h5.2c2.6 0 3.9 1.1 3.9 2.9 0 1.2-.6 2-1.6 2.4 1.4.4 2.2 1.4 2.2 2.9 0 2.1-1.6 3.3-4.2 3.3H3V7Zm4.9 4.5c1.1 0 1.7-.5 1.7-1.3s-.6-1.3-1.7-1.3H5.7v2.6h2.2Zm.2 4.9c1.2 0 1.9-.5 1.9-1.5s-.7-1.5-1.9-1.5H5.7v3h2.4ZM14 8.5h5v1.3h-5V8.5Zm6.8 6.9c-.2 1.5-1.5 2.7-3.4 2.7-2.3 0-3.9-1.6-3.9-4.1 0-2.4 1.5-4.2 3.8-4.2 2.4 0 3.7 1.7 3.7 4.2v.5h-5.6c.1 1.2.8 1.9 2 1.9.8 0 1.4-.3 1.6-.9h1.8ZM15.4 12.6h3.6c-.1-1-.7-1.6-1.7-1.6-1 0-1.7.6-1.9 1.6Z" />
    </svg>
  );
}

// Maps the icon names already used in data/json/authors.json (socials[].icon)
// to the local icon components above, so we don't need the shared Icon.js.
const ICONS_BY_KEY = {
  x: XIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
  mail: MailIcon,
  email: MailIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  pinterest: PinterestIcon,
  flickr: FlickrIcon,
  behance: BehanceIcon,
};

export function hasSocialIcon(icon) {
  return Boolean(ICONS_BY_KEY[icon?.toLowerCase()]);
}

export function SocialIcon({ icon, className }) {
  const Cmp = ICONS_BY_KEY[icon?.toLowerCase()];
  if (!Cmp) return null;
  return <Cmp className={className} />;
}
