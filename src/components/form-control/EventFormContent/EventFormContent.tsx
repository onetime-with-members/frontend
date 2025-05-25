import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import BottomButton from './BottomButton/BottomButton';
import InputContent from './InputContent/InputContent';
import TopActionForDesktop from './TopActionForDesktop/TopActionForDesktop';
import TopNavBar from './TopNavBar/TopNavBar';
import { breakpoint } from '@/lib/constants';
import { EventValueType } from '@/types/event.type';

interface EventFormContentProps {
  originData?: EventValueType;
  onSubmit: (disabled: boolean, value: EventValueType) => void;
  isPending: boolean;
}

export default function EventFormContent({
  originData,
  onSubmit,
  isPending,
}: EventFormContentProps) {
  const [value, setValue] = useState<EventValueType>({
    title: '',
    start_time: '09:00',
    end_time: '24:00',
    category: 'DATE',
    ranges: [],
  });
  const [disabled, setDisabled] = useState(true);

  function handleSubmit() {
    onSubmit(disabled, {
      ...value,
      title: value.title.trim(),
    });
  }

  useEffect(() => {
    if (!originData) return;

    setValue(originData);
  }, [originData]);

  useEffect(() => {
    const startTime = dayjs(value.start_time, 'HH:mm');
    const endTime = dayjs(value.end_time, 'HH:mm');

    setDisabled(
      value.title.trim() === '' ||
        value.title.trim().length > 50 ||
        value.ranges.length === 0 ||
        startTime.isAfter(endTime) ||
        startTime.isSame(endTime),
    );
  }, [value]);

  useEffect(() => {
    function updateBackgroundColor() {
      if (window.innerWidth >= breakpoint.md) {
        document.body.style.backgroundColor = '#F9F9F9';
      } else {
        document.body.style.backgroundColor = '';
      }
    }

    updateBackgroundColor();

    window.addEventListener('resize', updateBackgroundColor);

    return () => {
      document.body.style.backgroundColor = '';
      window.removeEventListener('resize', updateBackgroundColor);
    };
  }, []);

  return (
    <div className="flex flex-col items-center pb-40">
      <div className="w-full md:px-4">
        <TopNavBar />
        <main className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center md:pt-6">
          <TopActionForDesktop />
          <InputContent value={value} setValue={setValue} />
        </main>
      </div>
      <BottomButton
        disabled={disabled}
        handleSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
}
