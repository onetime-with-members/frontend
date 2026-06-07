import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import GuideIndexPage from '@/features/guide/pages/GuideIndexPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'guide.pages.GuideIndexPage',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: `${t('title')} | OneTime`,
      description: t('description'),
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

export default function Page() {
  return <GuideIndexPage />;
}
