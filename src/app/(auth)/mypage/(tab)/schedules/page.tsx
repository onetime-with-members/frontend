import MySchedulePage from '@/features/my-schedule/pages/MySchedulePage';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('mypage');

  return {
    title: t('mySchedule'),
  };
}

export default async function Page() {
  return <MySchedulePage />;
}
