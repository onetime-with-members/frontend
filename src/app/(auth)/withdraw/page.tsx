import { Metadata } from 'next';

import WithdrawPage from './withdraw';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('withdraw');

  return {
    title: t('deleteAccount'),
  };
}

export default function Page() {
  return <WithdrawPage />;
}
