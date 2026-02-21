import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import ScreenLayout from '../ScreenLayout';
import TimeDropdown from '@/components/TimeDropdown';
import { SleepTimeIcon } from '@/components/icon';
import { OnboardingContext } from '@/features/user/contexts/OnboardingContext';

export default function SleepTimeScreen() {
  const { moveToPrevPage, onboardingValue, setOnboardingValue, handleSubmit } =
    useContext(OnboardingContext);

  const t = useTranslations('auth.pages.OnboardingPage');

  return (
    <ScreenLayout
      title={t.rich('title3', {
        br: () => <br />,
      })}
      onSubmit={handleSubmit}
      onBackButtonClick={moveToPrevPage}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xl text-gray-60">
            <SleepTimeIcon />
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
