import WithdrawPage from './withdraw';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('withdraw');

  return {
    title: `${t('deleteAccount')} | OneTime`,
  };
}

export default function Page() {
  return <WithdrawPage />;
}
