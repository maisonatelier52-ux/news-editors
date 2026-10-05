// Site logo - the glossy "News. EDITORS" artwork, on a transparent background.
//
// Files live in public/images/logo/ and share one 24:5 canvas, so every size
// has identical proportions (no layout jump when the browser swaps files):
//   site-logo-{240,480,720,960}.webp        dark artwork  -> light backgrounds (header, mobile menu)
//   site-logo-light-{240,480,720,960}.webp  reversed art  -> dark backgrounds  (footer)
//   site-logo.png                           1200px master (JSON-LD / social via data/json/site.json)
//
// A srcset + sizes pair lets the browser pick the file closest to the real
// on-screen pixel size (CSS size x screen density), which keeps the edges and
// the gloss crisp instead of being scaled down from one big image.
// If you change a height class below, update its `sizes` hint to match
// (width = height x 4.8).

const BASE_PATH = {
  dark: '/images/logo/site-logo',
  light: '/images/logo/site-logo-light',
};
const WIDTHS = [240, 480, 720, 960];

const SIZES = {
  // mobile menu drawer
  base: { className: 'h-[26px] sm:h-[38px]', sizes: '(min-width: 640px) 183px, 125px' },
  // header masthead
  lg: { className: 'h-[34px] sm:h-[50px]', sizes: '(min-width: 640px) 240px, 164px' },
  // footer - negative margins trim the transparent padding around the artwork so
  // it lines up flush-left with the tagline and sits close above it
  footer: {
    className: 'h-[52px] sm:h-[62px] -ml-1.5 sm:-ml-[7px] -mb-1.5 sm:-mb-2',
    sizes: '(min-width: 640px) 298px, 250px',
  },
};

export default function Logo({ variant = 'dark', size = 'base', eager = false }) {
  const base = variant === 'light' ? BASE_PATH.light : BASE_PATH.dark;
  const { className, sizes } = SIZES[size] ?? SIZES.base;

  return (
    // Plain <img>: the site is a static export with unoptimized images, and a
    // hand-tuned srcset gives sharper results than a single scaled file.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}-480.webp`}
      srcSet={WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', ')}
      sizes={sizes}
      alt="News Editors"
      width={240}
      height={50}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      // max-w-none stops Tailwind's img { max-width: 100% } from squashing the
      // logo inside narrow flex/grid columns.
      className={`block w-auto max-w-none shrink-0 ${className}`}
    />
  );
}
