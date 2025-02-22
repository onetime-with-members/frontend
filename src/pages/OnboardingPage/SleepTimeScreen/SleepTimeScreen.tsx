import { Trans, useTranslation } from 'react-i18next';

import ScreenLayout from '../ScreenLayout/ScreenLayout';
import TimeDropdown from '@/components/dropdown/TimeDropdown/TimeDropdown';
import SleepIcon from '@/components/icon/SleepIcon';
import { OnboardingValueType } from '@/types/user.type';

interface SleepTimeScreenProps {
  isVisible: boolean;
  page: number;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  handleSubmitButtonClick: (disabled: boolean) => void;
  handleBackButtonClick: () => void;
}

export default function SleepTimeScreen({
  isVisible,
  page,
  value,
  setValue,
  handleSubmitButtonClick,
  handleBackButtonClick,
}: SleepTimeScreenProps) {
  const { t } = useTranslation();

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
      isVisible={isVisible}
      page={page}
      title={
        <Trans i18nKey="onboarding.title3">
          시작하기 전, <br />
          수면 시간을 알려주세요
        </Trans>
      }
      handleNextButtonClick={() => handleSubmitButtonClick(false)}
      handleBackButtonClick={handleBackButtonClick}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span>
            <SleepIcon />
          </span>
          <span className="text-gray-80 text-md-300">
            {t('onboarding.sleepTime')}
          </span>
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
        <p className="text-gray-40 text-sm-200">
          {t('onboarding.description3')}
        </p>
      </div>
    </ScreenLayout>
  );
}
