import { useTranslations } from 'next-intl';
import { UseFormSetValue } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import TimeDropdown from '@/components/dropdown/time-dropdown';
import SleepIcon from '@/components/icon/SleepTimeIcon';
import { OnboardingFormType } from '@/lib/validation/form-types';

export default function SleepTimeScreen({
  pageIndex,
  setPageIndex,
  onboardingValue,
  setOnboardingValue,
  onSubmit,
}: {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  onboardingValue: OnboardingFormType;
  setOnboardingValue: UseFormSetValue<OnboardingFormType>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const t = useTranslations('onboarding');

  return (
    <ScreenLayout
      pageIndex={pageIndex}
      title={t.rich('title3', {
        br: () => <br />,
      })}
      onSubmit={onSubmit}
      onBackButtonClick={() => setPageIndex((prev) => prev - 1)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xl text-gray-60">
            <SleepIcon />
          </span>
          <span className="text-gray-80 text-md-300">{t('sleepTime')}</span>
        </div>
        <div className="flex items-center gap-4">
          <TimeDropdown
            time={onboardingValue.startSleepTime}
            setTime={(time) => setOnboardingValue('startSleepTime', time)}
            className="flex-1"
          />
          <span className="text-gray-40 text-md-300">-</span>
          <TimeDropdown
            time={onboardingValue.endSleepTime}
            setTime={(time) => setOnboardingValue('endSleepTime', time)}
            className="flex-1"
          />
        </div>
        <p className="text-gray-40 text-sm-200">{t('description3')}</p>
      </div>
    </ScreenLayout>
  );
}
