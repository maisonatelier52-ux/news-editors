import {
  StaticPageShell,
  PageIntro,
  PageSection,
  PageList,
  PageFooter,
  TextLink,
} from '@/components/StaticPage';
import { getContactEmails, getStaticPageMetadata } from '@/lib/static-pages';

export const metadata = getStaticPageMetadata('privacy-policy');

export default function PrivacyPolicyPage() {
  const email = getContactEmails();

  return (
    <StaticPageShell slug="privacy-policy">
      <PageIntro eyebrow="Privacy" title="Privacy Policy">
        News Editors is a read-only website with no accounts or log-ins. We aim to collect as little information about
        readers as possible, and this page explains what that means in practice.
      </PageIntro>

      <PageSection id="information-we-collect" number="01" label="What we collect" title="Information we collect" first>
        <p>
          <strong className="text-ink">Technical data.</strong> Like any website, the servers that deliver this site may
          automatically record technical details such as IP address, browser and device type, the pages requested and the
          time of the request. This is handled by our hosting provider and used to keep the site secure and working.
        </p>
        <p>
          <strong className="text-ink">Messages.</strong> If you email us, we receive your email address and whatever you
          choose to include in the message.
        </p>
        <p>
          <strong className="text-ink">Search.</strong> The search feature matches your term against the posts published on
          the site, in your own browser. The term is not sent to us, although it can appear in the page address, and so in
          your browser history, or in server logs if that address is loaded or shared directly.
        </p>
      </PageSection>

      <PageSection id="how-information-is-used" number="02" label="How we use it" title="What the information is for">
        <PageList>
          <li>Keeping the website running and secure.</li>
          <li>Finding and fixing technical problems.</li>
          <li>Reading and responding to messages, corrections and other requests.</li>
          <li>Meeting legal obligations.</li>
        </PageList>
        <p>We do not sell personal information, and we do not use it for advertising or profiling.</p>
      </PageSection>

      <PageSection id="cookies-and-analytics" number="03" label="Cookies" title="Cookies and analytics">
        <p>
          The site&apos;s own code does not set cookies, and it does not include advertising, social-media tracking or
          analytics scripts. If we add analytics or any other third-party service in future, we will describe it on this
          page before it is switched on.
        </p>
      </PageSection>

      <PageSection id="forms-and-links" number="04" label="Forms and other sites" title="Sign-up boxes and outside links">
        <p>
          The newsletter sign-up box is not currently connected to a mailing service. If that changes, this page will say
          what we collect, why, and how to unsubscribe before any address is collected.
        </p>
        <p>
          Posts link to outside websites. Those sites set their own cookies and follow their own privacy policies, which we
          do not control. See <TextLink href="/legal#third-party-links">Legal</TextLink> for how we treat external links.
        </p>
      </PageSection>

      <PageSection id="data-protection" number="05" label="Security and retention" title="Keeping information safe">
        <p>
          We take reasonable technical and organizational steps to protect the information we hold, but no method of
          transmission or storage is completely secure. We keep correspondence only for as long as it is needed to handle
          your request and for reasonable record-keeping.
        </p>
      </PageSection>

      <PageSection id="your-rights" number="06" label="Your rights" title="Your rights and choices">
        <p>
          Depending on where you live, you may have the right to ask what personal data we hold about you, to have it
          corrected or deleted, or to object to or restrict how it is used. Email{' '}
          <TextLink href={`mailto:${email.legal}`}>{email.legal}</TextLink> with your request; we may need to confirm your
          identity before acting on it.
        </p>
        <p>The site does not depend on cookies, so you are free to block them in your browser settings.</p>
      </PageSection>

      <PageSection id="children-and-changes" number="07" label="Children and changes" title="Children, and updates to this policy">
        <p>
          News Editors is written for a general audience and does not knowingly collect personal information from children.
          If you believe a child has sent us personal information, tell us and we will delete it.
        </p>
        <p>
          When this policy changes, the updated version is posted here with a new revision date. Questions can go to{' '}
          <TextLink href={`mailto:${email.editorial}`}>{email.editorial}</TextLink>.
        </p>
      </PageSection>

      <PageFooter current="privacy-policy" />
    </StaticPageShell>
  );
}
