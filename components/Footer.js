import Link from 'next/link';
import localFont from 'next/font/local';
import Logo from '@/components/Logo';
import { getSite } from '@/lib/data';

// Footer-only typefaces (subsetted, self-hosted, no network request at build time):
//   Outfit        -> section headings + copyright line
//   Source Serif 4 -> tagline, link rows
const sans = localFont({
  src: './fonts/Outfit-Footer.woff2',
  weight: '400 700',
  display: 'swap',
  variable: '--font-footer-sans',
});
const serif = localFont({
  src: './fonts/SourceSerif4-Footer.woff2',
  weight: '400 600',
  display: 'swap',
  variable: '--font-footer-serif',
});

const sections = [
  {
    title: 'Categories',
    links: [
      ['U.S.', '/us'],
      ['World', '/world'],
      ['Business', '/business'],
      ['Finance', '/finance'],
      ['Politics', '/politics'],
      ['Investigation', '/investigation'],
      ['Technology', '/technology'],
    ],
  },
  {
    title: 'About the site',
    links: [
      ['About News Editors', '/about'],
      ['Our Team', '/our-team'],
      ['Source Methodology', '/source-methodology'],
      ['Right of Reply', '/right-of-reply-policy'],
      ['Contact', '/contact'],
    ],
  },
];

// Small links shown in the copyright bar, beside the copyright line.
const legalLinks = [
  ['Privacy Policy', '/privacy-policy'],
  ['Terms & Conditions', '/terms-and-conditions'],
  ['Legal', '/legal'],
];

// Replace the "#" hrefs with the real profile URLs.
const socials = [
  { label: 'X', href: 'https://x.com/news_editors', icon: 'x' },
  { label: 'Instagram', href: 'https://www.instagram.com/newseditors_/', icon: 'instagram' },
  { label: 'Substack', href: 'https://substack.com/@newseditors', icon: 'substack' },
  { label: 'Medium', href: 'https://medium.com/@editornews65', icon: 'medium' },
];

function SocialIcon({ name }) {
  switch (name) {
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
          <circle cx="12" cy="12" r="4.1" />
          <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'substack':
      return (
        <svg viewBox="0 0 24 24" className="h-[17.5px] w-[17.5px]" fill="currentColor" aria-hidden="true">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      );
    default:
      // Medium: big serif "Me" whose "e" is sliced off by the circle's edge.
      // Glyphs are baked into paths (Source Serif 4, wght 600) so it needs no
      // font; fill is currentColor, so there is no background fill.
      return (
        <svg viewBox="7.5 7.5 285 285" className="h-full w-full" fill="currentColor" aria-hidden="true">
          <defs>
            <clipPath id="ft-medium-clip">
              <circle cx="150" cy="150" r="142.5" />
            </clipPath>
          </defs>
          <path
            clipPath="url(#ft-medium-clip)"
            d="M103.3 206V198.1L122 195.6H126L142.7 198.1V206ZM105.6 101.9V94H127.7L127.9 104.4H125.5ZM119 206V94H127.4L128.7 148.3V206ZM163.5 206 122.3 100.4H121.1V94H141.4L177.3 185.8H171.6L172.9 182.2L205.7 94H215V100.4H213.1L210.9 106.5L174.1 206ZM193.9 206V198.1L214.8 195.6H220.4L243.5 198.1V206ZM207 206Q207.4 197.4 207.4 188.8Q207.5 180.2 207.5 171.8Q207.5 163.3 207.5 155.4L207.9 94H229.5Q229.3 102.4 229.1 111.2Q229 120 229 128.7Q229 137.5 229 146.5V153.7Q229 162.3 229 171.2Q229 180 229.1 188.6Q229.3 197.2 229.5 206ZM218.2 104.4V94H243.1V101.9L220.4 104.4ZM281.2 208.4Q268.9 208.4 259.6 203.5Q250.4 198.6 245.2 189.2Q240.1 179.9 240.1 166.5Q240.1 153 245.5 143.3Q250.9 133.5 260.1 128.2Q269.3 122.8 280.4 122.8Q290.5 122.8 298 127.1Q305.5 131.3 309.8 138.9Q314.1 146.5 314.1 156.7Q314.1 159.6 313.9 161.9Q313.6 164.2 313.1 166H249V158.1H284.1Q290.8 158.1 292.9 155.6Q294.9 153 294.9 148.5Q294.9 142.6 293 138.7Q291.2 134.8 287.9 133Q284.6 131.1 280.4 131.1Q275.7 131.1 271.2 134.2Q266.7 137.3 263.9 144.4Q261.2 151.5 261.2 163.8Q261.2 174.1 264.5 181.1Q267.9 188.1 273.9 191.6Q279.9 195 287.6 195Q294.9 195 300.4 192.6Q305.9 190.2 310.4 185.1L315 188.8Q311.4 194.9 306.9 199.3Q302.3 203.7 296.1 206Q289.8 208.4 281.2 208.4Z"
          />
        </svg>
      );
  }
}

function Chevron() {
  return (
    <svg viewBox="0 0 8 12" className="h-3 w-[7.5px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1.5 1.4 6.3 6l-4.8 4.6" />
    </svg>
  );
}

// Decorative artwork for the right-hand side of the link area: the logo's
// speed-lines and diagonal "N" stroke, drawn very faintly. Coordinates are in
// the same space as the design mock (740 x 582), scaled by the viewBox.
function FooterArtwork() {
  const lines = [
    [1656, 349, 158],
    [1672, 384, 158],
    [1688, 420, 159],
    [1704, 455, 161],
    [1720, 490, 161],
    [1733, 525, 165],
    [1747, 558, 167],
  ];
  return (
    <svg
      viewBox="1430 0 740 582"
      className="pointer-events-none absolute bottom-0 right-0 hidden w-[425px] lg:block"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ft-band1" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#7fa6d6" stopOpacity="0.11" />
          <stop offset="0.55" stopColor="#6f98cb" stopOpacity="0.06" />
          <stop offset="1" stopColor="#6f98cb" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="ft-band2" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#8fb2dc" stopOpacity="0.15" />
          <stop offset="1" stopColor="#5f87b8" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id="ft-glow" cx="2000" cy="300" r="190" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9bbbe4" stopOpacity="0.12" />
          <stop offset="1" stopColor="#9bbbe4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon points="1843,130 2010,130 2170,318 2170,524" fill="url(#ft-band1)" />
      <polygon points="1843,130 2010,130 2170,318 2170,524" fill="url(#ft-glow)" />
      <polygon points="1803,275 1891,275 2143,582 1952,582" fill="url(#ft-band2)" />
      <line x1="1803" y1="275" x2="1952" y2="582" stroke="#b9d0ee" strokeOpacity="0.16" strokeWidth="1.4" />
      {lines.map(([x, y, len]) => (
        <g key={y} strokeLinecap="round" strokeWidth="5">
          <line x1={x} y1={y} x2={x + len} y2={y} stroke="#9db4d0" strokeOpacity="0.17" />
          <line x1={x + 58} y1={y} x2={x + 118} y2={y} stroke="#c3d5ea" strokeOpacity="0.10" />
        </g>
      ))}
    </svg>
  );
}

export default function Footer() {
  const site = getSite();
  const [categories, about] = sections;

  const headingClass =
    "font-[family-name:var(--font-footer-sans)] text-sm font-semibold uppercase leading-none tracking-[0.18em] text-[#bfcadb]";
  const accentBar = <span aria-hidden="true" className="mt-3 block h-0.5 w-8 bg-[#bfcadb]" />;
  const linkBase =
    "group flex items-center justify-between font-[family-name:var(--font-footer-serif)] text-[14.2px] leading-5 text-white transition-colors hover:text-sky-200";

  return (
    <footer
      className={`${sans.variable} ${serif.variable} relative mt-16 overflow-hidden bg-[#081a2c] text-white`}
    >
      {/* Background: soft navy glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 55% 75% at 0% 0%, rgba(40,74,112,0.30), transparent 70%)',
            'radial-gradient(ellipse 32% 60% at 96% 42%, rgba(52,88,126,0.28), transparent 72%)',
            'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(34,66,102,0.30), transparent 75%)',
          ].join(','),
        }}
      />

      {/* Link area */}
      <div className="relative">
        <FooterArtwork />

        <div className="relative mx-auto max-w-container px-4 sm:px-6 lg:px-12">
          <div className="grid lg:min-h-[334.8px] lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.835fr)_minmax(0,1fr)] lg:pb-[15.8px] lg:pt-10">
            {/* Brand */}
            <div className="py-10 lg:py-0 lg:pt-[26px]">
              <Logo variant="light" size="footer" />
              <p className="mt-[10px] max-w-[420px] font-[family-name:var(--font-footer-serif)] text-[18.4px] leading-[26px] text-[#bccadb]">
                {site.tagline}
              </p>
              <ul className="mt-5 flex items-center gap-[19.7px]" aria-label="Social media">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white/60 text-white transition-colors hover:border-white hover:bg-white/10"
                    >
                      <SocialIcon name={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <nav
              aria-label="Categories"
              className="border-t border-white/[0.12] py-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-[37px] lg:pr-12 lg:pt-1"
            >
              <h2 className={headingClass}>{categories.title}</h2>
              {accentBar}
              <ul className="mt-[18.5px]">
                {categories.links.map(([label, href]) => (
                  <li key={href} className="border-b border-white/[0.14] last:border-b-0">
                    <Link href={href} className={`${linkBase} py-[5.3px]`}>
                      <span>{label}</span>
                      <span className="pr-[3px]">
                        <Chevron />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* About */}
            <nav
              aria-label="About"
              className="border-t border-white/[0.12] py-8 lg:border-l lg:border-t-0 lg:py-0 lg:pl-[38px] lg:pt-1"
            >
              <h2 className={headingClass}>{about.title}</h2>
              {accentBar}
              <ul className="mt-[18.5px]">
                {about.links.map(([label, href]) => (
                  <li key={href} className="border-b border-[#8fa1b7]/70">
                    <Link href={href} className={`${linkBase} py-[7.5px] lg:max-w-[334px]`}>
                      <span>{label}</span>
                      <span className="pr-[3px]">
                        <Chevron />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="relative border-t border-[#dfe7f1]/90">
        <div className="mx-auto max-w-container px-4 pb-[41px] pt-6 sm:px-6 lg:px-12">
          {/* Same column grid as the link area, so the legal links start in line with the Categories column. */}
          <div className="grid gap-y-3 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.835fr)_minmax(0,1fr)] lg:items-start">
            <p className="font-[family-name:var(--font-footer-sans)] text-[12.4px] leading-4 text-[#b9c5d3]">
              {site.copyright}. All rights reserved.
            </p>
            <nav aria-label="Legal" className="lg:col-span-2 lg:pl-[37px]">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 font-[family-name:var(--font-footer-sans)] text-[12.4px] leading-4 text-[#b9c5d3]">
                {legalLinks.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
