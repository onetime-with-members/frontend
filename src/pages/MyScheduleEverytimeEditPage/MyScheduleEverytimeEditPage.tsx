import { useTranslation } from 'react-i18next';

import TopAppBar from './TopAppBar/TopAppBar';
import everytimeLinkGuideImage from '@/assets/everytime-link-guide.png';
import Input from '@/components/Input/Input';

export default function MyScheduleEverytimeEditPage() {
  const { t } = useTranslation();

  return (
    <div>
      <TopAppBar />
      <main className="px-4 pb-20 pt-4">
        <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-gray-40 text-md-100">
              {t('MyScheduleEverytimeEditPage.description')}
            </p>
            <Input placeholder={t('MyScheduleEverytimeEditPage.placeholder')} />
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src={everytimeLinkGuideImage}
              alt="The guide image shows how to get the timetable link on Everytime"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
