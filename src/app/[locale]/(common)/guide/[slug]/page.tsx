import { Metadata } from 'next';
import { Locale } from 'next-intl';

import GuideArticlePage from '@/features/guide/pages/GuideArticlePage';
import {
  getGuideArticleMeta,
  guideSlugs,
} from '@/features/guide/utils/articles';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getGuideArticleMeta(slug);

  if (!article) return {};

  return {
    title: article.title[locale],
    description: article.description[locale],
    openGraph: {
      title: `${article.title[locale]} | OneTime`,
      description: article.description[locale],
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

  if (!getGuideArticleMeta(slug)) notFound();

  return <GuideArticlePage slug={slug} />;
}
