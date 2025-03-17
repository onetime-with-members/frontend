import MyScheduleEditPage from './components/MyScheduleEditPage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('myScheduleEdit');

  return {
    title: `${t('myScheduleEdit')} | OneTime`,
  };
}

export default function MyScheduleEdit() {
  return <MyScheduleEditPage />;
}
