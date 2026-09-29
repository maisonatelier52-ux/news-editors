import Link from 'next/link';
import Logo from '@/components/Logo';
import { getSite } from '@/lib/data';

const sections = [
  {
    title: 'Topics',
    links: [
      ['U.S.', '/us'],
      ['World', '/world'],
      ['Business', '/business'],
      ['Finance', '/finance'],
    ],
  },
  {
    title: 'Technology',
    links: [
      ['Reviews', '/reviews'],
      ['Phones', '/phones'],
      ['Laptops', '/laptops'],
      ['Cameras', '/cameras'],
      ['Headphones', '/headphones'],
    ],
  },
  {
    title: 'About the blog',
    links: [
      ['How we write', '/editorial-standards'],
      ['Updates & corrections', '/editorial-standards#corrections'],
      ['How we review', '/editorial-standards#reviews'],
      ['About News Editors', '/about'],
    ],
  },
];

export default function Footer() {
  const site = getSite();

  return (
    <footer className="mt-16 bg-[#081b2c] text-white">
      <div className="mx-auto grid max-w-container gap-10 px-4 py-12 sm:py-14 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-md">
          <Logo variant="light" size="lg" />
          <p className="mt-5 font-serif text-lg leading-8 text-slate-300">{site.tagline}</p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            Every post is labeled by format, carries a visible update record and links to the sources or review approach behind it.
          </p>
        </div>

        <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.18em] text-sky-300">{section.title}</h2>
              <ul className="mt-4 space-y-3">
                {section.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm font-semibold text-slate-200 transition-colors hover:text-white hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-container flex-col gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>{site.copyright}</span>
          <span>An independent blog about ideas, technology and the wider world.</span>
        </div>
      </div>
    </footer>
  );
}
