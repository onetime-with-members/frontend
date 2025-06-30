import MyScheduleEverytimeEditPage from './everytime-edit';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('everytimeScheduleEdit');

  return {
    title: `${t('title')} | OneTime`,
  };
}

export default async function Page() {
  return <MyScheduleEverytimeEditPage />;
}
