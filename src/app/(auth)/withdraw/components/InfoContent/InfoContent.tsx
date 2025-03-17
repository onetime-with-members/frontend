import { useTranslations } from 'next-intl';

import GrayBox from './GrayBox/GrayBox';
import RedCheckbox from './RedCheckbox/RedCheckbox';
import Image from 'next/image';

interface InfoContentProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InfoContent({
  isChecked,
  setIsChecked,
}: InfoContentProps) {
  const t = useTranslations('withdraw');

  function handleCheckboxClick() {
    setIsChecked((prev) => !prev);
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-8">
        <div className="h-[160px] w-[160px]">
          <Image
            src="/images/withdraw-clock.svg"
            alt="깨진 시계 이미지"
            width={160}
            height={160}
            className="h-full w-full"
          />
        </div>
        <h1 className="text-center text-gray-90 title-md-300">
          {t('mainTitle')}
        </h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <GrayBox title={t('title1')} description={t('description1')} />
        <GrayBox title={t('title2')} description={t('description2')} />
        <div
          className="flex cursor-pointer items-center gap-4 rounded-xl bg-danger-10 p-4"
          onClick={handleCheckboxClick}
        >
          <RedCheckbox isChecked={isChecked} />
          <div className="text-danger-60 text-md-200">{t('agreeText')}</div>
        </div>
      </div>
    </div>
  );
}
