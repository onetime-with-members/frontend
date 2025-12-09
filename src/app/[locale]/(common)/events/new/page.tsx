import { Metadata } from 'next';
import { Locale } from 'next-intl';

import EventCreatePage from '@/features/event/pages/EventCreatePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'createEvent' });

  return {
    title: t('createEvent'),
  };
}

export default async function EventCreate() {
  return <EventCreatePage />;
}
