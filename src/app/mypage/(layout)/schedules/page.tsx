import MySchedulePage from './components/MySchedulePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('mypage');

  return {
    title: `${t('mySchedule')} | OneTime`,
  };
}

export default function MySchedule() {
  return <MySchedulePage />;
}
