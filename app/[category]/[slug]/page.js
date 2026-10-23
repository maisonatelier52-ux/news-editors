import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostByCategoryAndSlug,
  getCategoryBySlug,
  getRelatedPosts,
  getSite,
  getPostUrl,
} from '@/lib/data';
import {
  getArticleMetadata,
  getArticleJsonLd,
  getArticleFaqJsonLd,
  getBreadcrumbJsonLd,
  getArticleBreadcrumbItems,
} from '@/lib/seo';

import Breadcrumb from '@/components/Breadcrumb';
import RelatedPosts from '@/components/RelatedPosts';
import ArticleTrustFooter from '@/components/ArticleTrustFooter';
import Newsletter from '@/components/Newsletter';
import ArticleHeader from './_components/ArticleHeader';
import ArticleHeroImage from './_components/ArticleHeroImage';
import ArticleByline from './_components/ArticleByline';
import ArticleBody from './_components/ArticleBody';
import ArticleFooterMeta from './_components/ArticleFooterMeta';
import { ArticleSummary, SourceLedger } from './_components/ArticleContext';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug } = await params;
  const post = getPostByCategoryAndSlug(categorySlug, slug);
  if (!post) return {};
  return getArticleMetadata(post);
}

export default async function DetailPage({ params }) {
  const { category: categorySlug, slug } = await params;
  const post = getPostByCategoryAndSlug(categorySlug, slug);
  if (!post) notFound();

  const category = getCategoryBySlug(categorySlug);
  const related = getRelatedPosts(post, 4);
  const site = getSite();
  const shareUrl = `${(site.siteUrl || '').replace(/\/$/, '')}${getPostUrl(post)}`;

  const articleJsonLd = getArticleJsonLd(post);
  const faqJsonLd = getArticleFaqJsonLd(post);
  const breadcrumbItems = getArticleBreadcrumbItems(post, category);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(breadcrumbItems);

  return (
    <article className="mx-auto max-w-[1040px] px-4 py-8 sm:px-6 sm:py-12 lg:px-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-5 max-w-[900px]">
        <ArticleHeader post={post} shareUrl={shareUrl} />
      </div>
      <ArticleHeroImage post={post} />
      <div className="mx-auto max-w-[820px]">
        <ArticleByline post={post} />
        <ArticleSummary post={post} />
        <ArticleBody post={post} />
        <SourceLedger post={post} />
        <ArticleFooterMeta premium={post.premium} linksOfInterest={post.linksOfInterest} />
        <ArticleTrustFooter />
        <Newsletter variant="article" />
      </div>

      <RelatedPosts posts={related} categoryName={category?.name} />
    </article>
  );
}
