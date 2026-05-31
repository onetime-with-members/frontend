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
  const t = await getTranslations({ locale, namespace: 'guide' });

  return {
    title: t('index.title'),
    description: t('index.description'),
    openGraph: {
      title: `${t('index.title')} | OneTime`,
      description: t('index.description'),
      images: '/images/opengraph/opengraph-thumbnail.png',
      siteName: 'OneTime',
    },
  };
}

export default function Page() {
  return <GuideIndexPage />;
}
