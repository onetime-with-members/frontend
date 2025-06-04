import Content from './content';
import { fetchMySchedules } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('myScheduleEdit');

  return {
    title: `${t('myScheduleEdit')} | OneTime`,
  };
}

export default async function MyScheduleEdit() {
  const myScheduleData = await fetchMySchedules();

  return <Content myScheduleData={myScheduleData} />;
}
