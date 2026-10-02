import Image from 'next/image';
import Link from 'next/link';
import {
  StaticPageShell,
  PageIntro,
  PageSection,
  PageFooter,
  TextLink,
} from '@/components/StaticPage';
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getTopLevelCategories,
  getCategoryUrl,
} from '@/lib/data';
import { getContactEmails, getStaticPageMetadata } from '@/lib/static-pages';

export const metadata = getStaticPageMetadata('our-team');

// The site has a single author record: the shared "News Editors" byline.
const BYLINE_SLUG = 'admin';

export default function OurTeamPage() {
  const email = getContactEmails();
  const author = getAuthorBySlug(BYLINE_SLUG);
  const postCount = author ? getPostsByAuthor(BYLINE_SLUG).length : 0;
  const categories = getTopLevelCategories();

  return (
    <StaticPageShell slug="our-team">
      <PageIntro eyebrow="About the blog" title="The team behind the byline">
        News Editors publishes under one shared byline. No post on this site is credited to an individual writer, and we
        do not publish staff profiles.
      </PageIntro>

      {author && (
        <article className="mt-12 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:p-7">
          {author.avatar && (
            <Image
              src={author.avatar}
              alt=""
              width={88}
              height={88}
              className="h-[88px] w-[88px] shrink-0 rounded-full border border-slate-200 bg-white object-cover"
            />
          )}
          <div>
            <h2 className="font-serif text-2xl font-black text-ink">{author.name}</h2>
            {author.role && (
              <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.16em] text-brand">{author.role}</p>
            )}
            <p className="mt-3 text-sm leading-6 text-slate-600">{author.bio}</p>
            <Link
              href={`/author/${author.slug}`}
              className="mt-4 inline-flex text-sm font-extrabold text-brand hover:underline"
            >
              {postCount > 0 ? `Read all ${postCount} posts →` : 'View the author page →'}
            </Link>
          </div>
        </article>
      )}

      <PageSection number="01" label="The byline" title="One name, the whole team" first>
        <p>
          Every post is published as <strong className="text-ink">News Editors</strong>: the editorial team as a whole,
          rather than one person. The byline stands for the team&apos;s responsibility for what is published, not for a
          single writer&apos;s authorship.
        </p>
        <p>
          Because no individual writers are credited, there are no individual profiles to read. Questions, corrections
          and concerns go to the team through the <TextLink href="/contact">contact page</TextLink>.
        </p>
        <p>
          For what the byline does and does not claim about reporting, and how posts are labeled, see{' '}
          <TextLink href="/editorial-standards">How we write</TextLink>.
        </p>
      </PageSection>

      <PageSection number="02" label="Coverage" title="What the team covers">
        <p>The site is organized into sections, and every one is published under the same shared byline.</p>
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={getCategoryUrl(category)}
                className="group flex flex-col gap-1 bg-white px-5 py-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="font-serif text-lg font-black text-ink group-hover:text-brand sm:w-36 sm:shrink-0">
                  {category.name}
                </span>
                <span className="text-sm leading-6 text-slate-600">{category.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection number="03" label="Reaching the team" title="Get in touch">
        <p>
          Write to <TextLink href={`mailto:${email.editorial}`}>{email.editorial}</TextLink> for story ideas and general
          questions. If you are named in a post and want to respond, see{' '}
          <TextLink href="/right-of-reply-policy">Right of reply</TextLink>.
        </p>
      </PageSection>

      <PageFooter current="our-team" />
    </StaticPageShell>
  );
}
