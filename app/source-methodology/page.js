import {
  StaticPageShell,
  PageIntro,
  PageSection,
  PageList,
  PageFooter,
  TextLink,
} from '@/components/StaticPage';
import { getStaticPageMetadata } from '@/lib/static-pages';

export const metadata = getStaticPageMetadata('source-methodology');

export default function SourceMethodologyPage() {
  return (
    <StaticPageShell slug="source-methodology">
      <PageIntro eyebrow="About the blog" title="How to read our sources">
        Every post ends with a <em>Sources &amp; reading notes</em> block. This page explains what is in it, so you can
        judge a post by what it is built on.
      </PageIntro>

      <PageSection number="01" label="What you will see" title="Around every post" first>
        <p>Each post is presented with the same set of signals:</p>
        <PageList>
          <li>
            <strong className="text-ink">The byline row</strong> shows when the post was published and, if it has
            changed, when it was last updated.
          </li>
          <li>
            <strong className="text-ink">The brief</strong>, near the top, gives the key takeaways and a short note on why
            the subject matters.
          </li>
          <li>
            <strong className="text-ink">Sources &amp; reading notes</strong>, at the end, says what kind of post this is
            and lists what it draws on.
          </li>
        </PageList>
      </PageSection>

      <PageSection number="02" label="Source entries" title="Reading a source">
        <p>Each entry in the source list has three parts:</p>
        <PageList>
          <li>
            <strong className="text-ink">Publisher:</strong> the organization that produced the document, dataset or
            report.
          </li>
          <li>
            <strong className="text-ink">Label:</strong> the specific item, so you can tell a filing from a press release
            from a news report.
          </li>
          <li>
            <strong className="text-ink">Accessed:</strong> the date we last viewed it. This is not the date it was
            published, and pages can change or move afterwards.
          </li>
        </PageList>
        <p>
          Entries that point to another website open it in a new tab. An entry that points to a page on this site, such as
          our own standards, is a link within News Editors and is not an outside document.
        </p>
      </PageSection>

      <PageSection number="03" label="Reading notes" title="What the note tells you">
        <p>
          The reading note states what the post is, whether a summary of documented developments, an explainer or
          commentary, and where it stops. It is the quickest way to learn how much weight a post can carry, so it is worth
          reading before you rely on one.
        </p>
        <p>
          Where a note says details should be confirmed with primary sources, treat the post as a starting point and not
          as the record.
        </p>
      </PageSection>

      <PageSection number="04" label="Limits" title="What a source list does and does not show">
        <p>
          A source list shows what a post draws on. It does not prove that every statement in the post is correct, and the
          depth of sourcing differs between a short current-affairs note and a longer analysis.
        </p>
        <p>
          The most useful habit is to open the sources, compare their dates with the post&apos;s own, and weigh a post by
          what it cites and how it describes itself.
        </p>
      </PageSection>

      <PageSection number="05" label="If something is off" title="Where to take a concern">
        <PageList>
          <li>
            A factual mistake: see how corrections work in{' '}
            <TextLink href="/editorial-standards#corrections">How we write</TextLink>, then write to the corrections
            address on the <TextLink href="/contact">contact page</TextLink>.
          </li>
          <li>
            You are named in a post and want your response considered:{' '}
            <TextLink href="/right-of-reply-policy">Right of reply</TextLink>.
          </li>
          <li>
            A rights, privacy or legal concern: <TextLink href="/legal#complaints">Legal</TextLink>.
          </li>
        </PageList>
      </PageSection>

      <PageFooter current="source-methodology" />
    </StaticPageShell>
  );
}
