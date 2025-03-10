import WithdrawPage from './components/WithdrawPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('withdraw');

  return {
    title: `${t('deleteAccount')} | OneTime`,
  };
}

export default function Withdraw() {
  return <WithdrawPage />;
}
