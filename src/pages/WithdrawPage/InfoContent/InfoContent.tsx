import { useTranslation } from 'react-i18next';

import GrayBox from './GrayBox/GrayBox';
import RedCheckbox from './RedCheckbox/RedCheckbox';
import withdrawClockImage from '@/assets/withdraw-clock.svg';

interface InfoContentProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InfoContent({
  isChecked,
  setIsChecked,
}: InfoContentProps) {
  const { t } = useTranslation();

  function handleCheckboxClick() {
    setIsChecked((prev) => !prev);
  }

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-8">
        <div className="h-[160px] w-[160px]">
          <img
            src={withdrawClockImage}
            alt="깨진 시계 이미지"
            className="h-full w-full"
          />
        </div>
        <h1 className="text-gray-90 title-md-300">{t('withdraw.mainTitle')}</h1>
      </div>
      <div className="flex w-full flex-col gap-4">
        <GrayBox
          title={t('withdraw.title1')}
          description={t('withdraw.description1')}
        />
        <GrayBox
          title={t('withdraw.title2')}
          description={t('withdraw.description2')}
        />
        <div
          className="flex cursor-pointer items-center gap-4 rounded-xl bg-danger-10 p-4"
          onClick={handleCheckboxClick}
        >
          <RedCheckbox isChecked={isChecked} />
          <div className="text-danger-60 text-md-200">
            {t('withdraw.agreeText')}
          </div>
        </div>
      </div>
    </div>
  );
}
