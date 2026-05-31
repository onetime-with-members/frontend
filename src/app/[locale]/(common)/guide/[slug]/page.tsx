import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

import { getGuideArticle, guideSlugs } from '@/features/guide/utils/articles';
import GuideArticlePage from '@/features/guide/pages/GuideArticlePage';
import { GuideLocale } from '@/features/guide/types';

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getGuideArticle(slug);

  if (!article) return {};

  const loc = locale as GuideLocale;

  return {
    title: article.title[loc],
    description: article.description[loc],
    openGraph: {
      title: `${article.title[loc]} | OneTime`,
      description: article.description[loc],
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getGuideArticle(slug)) notFound();

  return <GuideArticlePage slug={slug} />;
}
