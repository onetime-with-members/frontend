import { Metadata } from 'next';
import { Locale } from 'next-intl';

import NotFoundPage from '@/features/set-up/pages/NotFoundPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'setUp.pages.NotFoundPage',
  });

  return {
    title: t('notFound'),
  };
}

export default async function NotFound() {
  return <NotFoundPage />;
}
