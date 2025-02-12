import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import BottomButton from './BottomButton/BottomButton';
import InputContent from './InputContent/InputContent';
import TopActionForDesktop from './TopActionForDesktop/TopActionForDesktop';
import TopNavBar from './TopNavBar/TopNavBar';
import { PageModeContext } from '@/contexts/PageModeContext';
import { RootState } from '@/store';
import { EventValueType } from '@/types/event.type';
import breakpoint from '@/utils/breakpoint';

interface EventFormContentProps {
  onSubmit: (disabled: boolean, value: EventValueType) => void;
  isPending: boolean;
}

export default function EventFormContent({
  onSubmit,
  isPending,
}: EventFormContentProps) {
  const { event } = useSelector((state: RootState) => state.event);

  const [disabled, setDisabled] = useState(true);

  const { pageMode } = useContext(PageModeContext);

  function handleSubmit() {
    onSubmit(disabled, {
      ...event,
      title: event.title.trim(),
    });
  }

  useEffect(() => {
    const startTime = dayjs(event.start_time, 'HH:mm');
    const endTime = dayjs(event.end_time, 'HH:mm');

    setDisabled(
      event.title.trim() === '' ||
        event.ranges.length === 0 ||
        startTime.isAfter(endTime) ||
        startTime.isSame(endTime),
    );
  }, [event]);

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
    <>
      <Helmet>
        {pageMode === 'create' && <title>이벤트 생성 - OneTime</title>}
        {pageMode === 'edit' && <title>이벤트 수정 - OneTime</title>}
      </Helmet>
      <div className="flex flex-col items-center pb-40">
        <div className="w-full md:px-4">
          <TopNavBar />
          <main className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center md:pt-6">
            <TopActionForDesktop />
            <InputContent />
          </main>
        </div>
        <BottomButton
          disabled={disabled}
          handleSubmit={handleSubmit}
          isPending={isPending}
        />
      </div>
    </>
  );
}
