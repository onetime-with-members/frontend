import { OnboardingValueType } from '..';

import ScreenLayout from '../ScreenLayout';
import TimeDropdown from '@/components/TimeDropdown';
import SleepIcon from '@/components/icon/SleepIcon';

interface SleepTimeScreenProps {
  isVisible: boolean;
  value: OnboardingValueType;
  setValue: React.Dispatch<React.SetStateAction<OnboardingValueType>>;
  handleSubmitButtonClick: (disabled: boolean) => void;
  page: number;
}

export default function SleepTimeScreen({
  isVisible,
  value,
  setValue,
  handleSubmitButtonClick,
  page,
}: SleepTimeScreenProps) {
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
      title={
        <>
          시작하기 전, <br />
          수면 시간을 알려주세요
        </>
      }
      handleNextButtonClick={() => handleSubmitButtonClick(false)}
      page={page}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5">
          <span>
            <SleepIcon />
          </span>
          <span className="text-gray-80 text-md-300">수면 시간</span>
        </div>
        <div className="flex items-center gap-2.5">
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
          스케줄 등록 시, 자동으로 수면 시간을 제외할 수 있어요
        </p>
      </div>
    </ScreenLayout>
  );
}
