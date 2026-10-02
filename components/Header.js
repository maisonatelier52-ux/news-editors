import Link from 'next/link';
import Icon from '@/components/Icon';
import MobileMenu from '@/components/MobileMenu';
import NavLinks from '@/components/NavLinks';
import Logo from '@/components/Logo';
import SearchButton from '@/components/SearchButton';
import { getSite, getTrendingPosts } from '@/lib/data';
import BreakingNews from '@/components/BreakingNews';

export default function Header() {
  const site = getSite();
  const breaking = getTrendingPosts(6);

  return (
    <header className="bg-white">

      {/* Masthead: blog identity left, wordmark centered, search right */}
      <div className="max-w-container mx-auto px-4 grid grid-cols-3 items-center h-14 sm:h-20">

        {/* Left: mobile hamburger + blog identity */}
        <div className="flex items-center justify-start gap-3">
          <MobileMenu navItems={site.mainNav} />

        </div>

        {/* Center: wordmark */}
        <Link href="/" className="flex items-center justify-center">
          <Logo size="lg" eager />
        </Link>

        {/* Right: search */}
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <SearchButton />
        </div>
      </div>

      {/* Nav bar: category links centered, separated by a thin rule */}
      <div className="hidden lg:block border-t border-gray-100">
        <div className="max-w-container mx-auto px-4 flex items-center justify-center h-12">
          <NavLinks navItems={site.mainNav} />
        </div>
      </div>

      {/*
        Breaking / "From the blog" bar.
        On mobile the top border is the single rule under the masthead
        (no separate border div above), so the line sits flush against
        the blue badge with no gap.
      */}
      <div className="
        flex
        items-center
        h-11
        sm:h-12
        overflow-hidden
        border-t
        border-ink
        lg:border-gray-100
        bg-gray-50
      ">

        {/* Flash Badge — angled ribbon, flush to the left edge (no rounded corners).
            Navy-to-brand gradient with a soft rising glow and a logo-blue base
            line; the look lives in .blog-badge (app/globals.css). */}
        <div
          className="
            relative
            flex
            items-center
            gap-1.5
            sm:gap-2
            shrink-0
            h-full
            blog-badge
            text-white
            pl-4
            pr-6
            sm:pl-6
            sm:pr-9
            text-[11px]
            sm:text-sm
            font-sans
            font-extrabold
            uppercase
            tracking-wide
          "
          style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)' }}
        >

          <Icon
            name="pen"
            className="
              w-3
              h-3
              sm:w-3.5
              sm:h-3.5
              shrink-0
            "
          />

          <span className="whitespace-nowrap">From the blog</span>

        </div>

        {/* Divider */}
        <span
          className="hidden sm:block w-px h-5 bg-gray-300 shrink-0 ml-3 sm:ml-4"
          aria-hidden="true"
        />

        {/* Flash Headline + prev/next controls (state lives together in BreakingNews) */}
        <div className="flex-1 h-full min-w-0 pl-3 sm:pl-4 pr-3 sm:pr-6">
          <BreakingNews breaking={breaking} />
        </div>

      </div>
    </header>
  );
}
