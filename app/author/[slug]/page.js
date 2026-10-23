import { notFound } from 'next/navigation';
import {
  getAllAuthors,
  getAuthorBySlug,
  getPostsByAuthor,
  getTrendingPosts,
  getCategoryBySlug,
} from '@/lib/data';
import {
  getAuthorMetadata,
  getAuthorJsonLd,
  getBreadcrumbJsonLd,
  getAuthorBreadcrumbItems,
} from '@/lib/seo';

import Breadcrumb from '@/components/Breadcrumb';
import AuthorProfileHeader from './_components/AuthorProfileHeader';
import AuthorArticleList from './_components/AuthorArticleList';
import AuthorMostReadSidebar from './_components/AuthorMostReadSidebar';

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return getAuthorMetadata(author);
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(slug);

  // Distinct categories this author has written in (topics covered).
  const topicSlugs = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const topics = topicSlugs
    .map((s) => getCategoryBySlug(s))
    .filter(Boolean)
    .map((c) => ({ slug: c.slug, name: c.name }));

  const mostRead = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
  const trending = getTrendingPosts(5, posts.map((p) => p.slug));

  const authorJsonLd = getAuthorJsonLd(author);
  const breadcrumbItems = getAuthorBreadcrumbItems(author);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbItems);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 pb-10 sm:px-6 lg:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-4">
        <AuthorProfileHeader author={author} topics={topics} />
      </div>

      <div className="mt-8 flex flex-col gap-x-10 gap-y-10 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <AuthorArticleList posts={posts} />
        </div>

        <AuthorMostReadSidebar mostRead={mostRead} trending={trending} />
      </div>
    </div>
  );
}
