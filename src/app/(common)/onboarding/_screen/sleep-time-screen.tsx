import { useTranslations } from 'next-intl';

import ScreenLayout from './screen-layout';
import TimeDropdown from '@/components/dropdown/time-dropdown';
import SleepIcon from '@/components/icon/sleep';
import { OnboardingValueType } from '@/lib/types';

export default function SleepTimeScreen({
  isVisible,
  page,
  value,
  setValue,
  onSubmit,
  onBackButtonClick,
}: {
  isVisible: boolean;
  page: number;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBackButtonClick: () => void;
}) {
  const t = useTranslations('onboarding');

  function handleTimeChange(key: keyof OnboardingValueType) {
    return (time: string) => {
      setValue((prevValue) => ({
        ...prevValue,
        [key]: time,
      }));
    };
  }

  return (
    <ScreenLayout
      type="submit"
      isVisible={isVisible}
      page={page}
      title={t.rich('title3', {
        br: () => <br />,
      })}
      onNextButtonClick={() => {}}
      onSubmit={onSubmit}
      onBackButtonClick={onBackButtonClick}
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
            time={value.sleep_start_time}
            setTime={handleTimeChange('sleep_start_time')}
            className="flex-1"
          />
          <span className="text-gray-40 text-md-300">-</span>
          <TimeDropdown
            time={value.sleep_end_time}
            setTime={handleTimeChange('sleep_end_time')}
            className="flex-1"
          />
        </div>
        <p className="text-gray-40 text-sm-200">{t('description3')}</p>
      </div>
    </ScreenLayout>
  );
}
