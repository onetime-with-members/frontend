import { useTranslations } from 'next-intl';
import { UseFormSetValue } from 'react-hook-form';

import ScreenLayout from './screen-layout';
import TimeDropdown from '@/components/dropdown/time-dropdown';
import SleepIcon from '@/components/icon/sleep';
import { OnboardingFormType } from '@/lib/validation/form-types';

export default function SleepTimeScreen({
  isVisible,
  page,
  setPage,
  onSubmit,
  onboardingValue,
  setOnboardingValue,
}: {
  isVisible: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onboardingValue: OnboardingFormType;
  setOnboardingValue: UseFormSetValue<OnboardingFormType>;
}) {
  const t = useTranslations('onboarding');

  return (
    <ScreenLayout
      type="submit"
      isVisible={isVisible}
      page={page}
      title={t.rich('title3', {
        br: () => <br />,
      })}
      onSubmit={onSubmit}
      onBackButtonClick={() => setPage((prev) => prev - 1)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span>
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
