import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import ScreenLayout from '../ScreenLayout';
import TimeDropdown from '@/components/TimeDropdown';
import SleepIcon from '@/components/icon/SleepIcon';

interface SleepTimeScreenProps {
  isVisible: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

type TimeValueType = {
  startTime: string;
  endTime: string;
};

export default function SleepTimeScreen({
  isVisible,
  setPage,
}: SleepTimeScreenProps) {
  const [timeValue, setTimeValue] = useState<{
    startTime: string;
    endTime: string;
  }>({
    startTime: '00:00',
    endTime: '08:00',
  });
  const [disabled, setDisabled] = useState(false);

  function handleNextButtonClick() {
    setPage((prevPage) => prevPage + 1);
  }

  function handleTimeChange(key: keyof TimeValueType) {
    return function (time: string) {
      setTimeValue((prev) => ({
        ...prev,
        [key]: time,
      }));
    };
  }

  useEffect(() => {
    setDisabled(
      dayjs(timeValue.startTime, 'HH:mm').isSame(
        dayjs(timeValue.endTime, 'HH:mm'),
      ) ||
        dayjs(timeValue.startTime, 'HH:mm').isAfter(
          dayjs(timeValue.endTime, 'HH:mm'),
        ),
    );
  }, [timeValue]);

  return (
    <ScreenLayout
      isVisible={isVisible}
      title={
        <>
          시작하기 전, <br />
          수면 시간을 알려주세요
        </>
      }
      disabled={disabled}
      handleNextButtonClick={handleNextButtonClick}
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
            time={timeValue.startTime}
            setTime={handleTimeChange('startTime')}
            className="flex-1"
          />
          <span className="text-gray-40 text-md-300">-</span>
          <TimeDropdown
            time={timeValue.endTime}
            setTime={handleTimeChange('endTime')}
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
