import MySchedulePage from './my-schedule';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('mypage');

  return {
    title: `${t('mySchedule')} | OneTime`,
  };
}

export default async function Page() {
  return <MySchedulePage />;
}
