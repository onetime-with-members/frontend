import { useLocale, useTranslations } from 'next-intl';

import Input from '@/components/form-control/Input/Input';
import Image from 'next/image';

interface MainContentProps {
  everytimeURL: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MainContent({
  everytimeURL,
  onInputChange,
}: MainContentProps) {
  const t = useTranslations('MyScheduleEverytimeEditPage');
  const locale = useLocale();

  return (
    <div className="mx-auto flex max-w-screen-sm flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-gray-40 text-md-100">{t('description')}</p>
        <Input
          value={everytimeURL}
          onChange={onInputChange}
          placeholder={t('placeholder')}
        />
        <p className="text-gray-40 text-sm-100">* {t('publicWarning')}</p>
      </div>
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={
            locale === 'ko'
              ? '/images/everytime-url-guide-ko.png'
              : '/images/everytime-url-guide-en.png'
          }
          alt="Setting Icon -> Copy URL"
          width={640}
          height={792}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
