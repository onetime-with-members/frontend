import { useTranslation } from 'react-i18next';

import everytimeURLGuideEnImage from '@/assets/everytime-url-guide-en.png';
import everytimeURLGuideKoImage from '@/assets/everytime-url-guide-ko.png';
import Input from '@/components/Input/Input';

interface MainContentProps {
  everytimeURL: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MainContent({
  everytimeURL,
  onInputChange,
}: MainContentProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-gray-40 text-md-100">
          {t('MyScheduleEverytimeEditPage.description')}
        </p>
        <Input
          value={everytimeURL}
          onChange={onInputChange}
          placeholder={t('MyScheduleEverytimeEditPage.placeholder')}
        />
      </div>
      <div className="overflow-hidden rounded-2xl">
        <img
          src={
            i18n.language === 'ko'
              ? everytimeURLGuideKoImage
              : everytimeURLGuideEnImage
          }
          alt="The guide image shows how to get the timetable link on Everytime"
        />
      </div>
    </div>
  );
}
