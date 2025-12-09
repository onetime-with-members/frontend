import { Metadata } from 'next';
import { Locale } from 'next-intl';

import WithdrawPage from './withdraw';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'withdraw' });

  return {
    title: t('deleteAccount'),
  };
}

export default function Page() {
  return <WithdrawPage />;
}
