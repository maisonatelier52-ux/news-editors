import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { getSite } from '@/lib/data';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/lib/seo';

export function generateMetadata() {
  const site = getSite();
  const siteUrl = site.siteUrl;
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: site.name,
      template: `%s – ${site.name}`,
    },
    description: site.description || site.tagline,
    verification: {
      google: 'j55e7_SUGzSoHpT8kqq6ikXUSmNn8c3I8Zi51cBZ2Y8',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      title: site.name,
      description: site.description || site.tagline,
      url: siteUrl,
      siteName: site.name,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: site.name,
      description: site.description || site.tagline,
    },
    other: {
      'color-scheme': 'light',
    },
  };
}

export default function RootLayout({ children }) {
  const organizationJsonLd = getOrganizationJsonLd();
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans antialiased">
        {/* Skip link: first focusable control for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-ink focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:outline focus:outline-2 focus:outline-brand"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
