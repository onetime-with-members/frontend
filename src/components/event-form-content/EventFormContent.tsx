import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { PageModeContext } from '../../contexts/PageModeContext';
import { EventValue } from '../../types/event.type';
import breakpoint from '../../utils/breakpoint';
import BottomButton from './BottomButton';
import InputContentBlock from './InputContentBlock';
import TopActionForDesktop from './TopActionForDesktop';
import TopNavBar from './TopNavBar';

interface EventFormContentProps {
  originData?: EventValue;
  onSubmit: (disabled: boolean, value: EventValue) => void;
}

export default function EventFormContent({
  originData,
  onSubmit,
}: EventFormContentProps) {
  const [value, setValue] = useState<EventValue>({
    title: '',
    start_time: '09:00',
    end_time: '24:00',
    category: 'DATE',
    ranges: [],
  });
  const [disabled, setDisabled] = useState(true);

  const { pageMode } = useContext(PageModeContext);

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
            <InputContentBlock value={value} setValue={setValue} />
          </main>
        </div>
        <BottomButton disabled={disabled} handleSubmit={handleSubmit} />
      </div>
    </>
  );
}
