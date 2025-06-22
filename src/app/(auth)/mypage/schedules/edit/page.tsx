import FormContent from './form-content';
import { fetchMySchedule } from '@/lib/data';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('myScheduleEdit');

  return {
    title: `${t('myScheduleEdit')} | OneTime`,
  };
}

export default async function MyScheduleEdit() {
  const myScheduleData = await fetchMySchedule();

  return <FormContent myScheduleData={myScheduleData} />;
}
