import Image from 'next/image';

// Both files are 210x40 (the same canvas as the original site logo).
//   dark  -> for light backgrounds (header, mobile menu)
//   light -> reversed artwork for dark backgrounds (footer)
const SOURCES = {
  dark: '/images/logo/site-logo.svg',
  light: '/images/logo/site-logo-light.svg',
};

export default function Logo({ variant = 'dark', size = 'base', eager = false }) {
  // Heights match the slot the previous text wordmark occupied at each breakpoint,
  // so swapping the logo never changes the header/menu/footer layout.
  //   lg   -> 30px (mobile) / 40px (sm+)
  //   base -> 20px (mobile) / 32px (sm+)
  // Width follows the 210:40 aspect ratio. max-w-none stops Tailwind's img { max-width: 100% }
  // from squashing the logo inside narrow flex/grid columns.
  const heightClasses = size === 'lg' ? 'h-[30px] sm:h-10' : 'h-5 sm:h-8';

  return (
    <Image
      src={variant === 'light' ? SOURCES.light : SOURCES.dark}
      alt="News Editors"
      width={210}
      height={40}
      loading={eager ? 'eager' : undefined}
      className={`block w-auto max-w-none shrink-0 ${heightClasses}`}
    />
  );
}
