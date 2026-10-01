import Image from 'next/image';

// Both files are 210x40 (the same canvas as the original site logo).
//   dark  -> for light backgrounds (header, mobile menu)
//   light -> reversed artwork for dark backgrounds (footer)
const SOURCES = {
  dark: '/images/logo/site-logo.svg',
  light: '/images/logo/site-logo-light.svg',
};

export default function Logo({ variant = 'dark', size = 'base', eager = false }) {
  // Heights:
  //   base -> header default (20px / 32px)
  //   lg   -> header large / mobile menu (30px / 40px)
  //   footer -> footer only, taller so it fills the space above the tagline
  // Width follows the 210:40 aspect ratio. max-w-none stops Tailwind's img { max-width: 100% }
  // from squashing the logo inside narrow flex/grid columns.
  const heightClasses =
    size === 'footer'
      ? 'h-12 sm:h-14'
      : size === 'lg'
        ? 'h-[30px] sm:h-10'
        : 'h-5 sm:h-8';

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
