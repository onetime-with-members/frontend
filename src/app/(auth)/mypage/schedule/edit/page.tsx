import MyScheduleEditPage from './my-schedule-edit';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('myScheduleEdit');

  return {
    title: t('myScheduleEdit'),
  };
}

export default async function MyScheduleEdit() {
  return <MyScheduleEditPage />;
}
