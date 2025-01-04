import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import BottomButton from '../components/event-create/BottomButton';
import InputContentBlock from '../components/event-create/InputContentBlock';
import TopActionForDesktop from '../components/event-create/TopActionForDesktop';
import TopNavBar from '../components/event-create/TopNavBar';
import { EventValue } from '../types/event.type';
import breakpoint from '../utils/breakpoint';
import { useMutation } from '@tanstack/react-query';

export default function EventCreate() {
  const [value, setValue] = useState<EventValue>({
    title: '',
    start_time: '09:00',
    end_time: '24:00',
    category: 'DATE',
    ranges: [],
  });
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  const createEvent = useMutation({
    mutationFn: () => {
      return axios.post('/events', {
        title: value.title,
        start_time: value.start_time,
        end_time: value.end_time,
        category: value.category,
        ranges: value.ranges,
      });
    },
    onSuccess: (data) => {
      navigate(`/events/${data.data.payload.event_id}`);
    },
  });

  function handleSubmit() {
    if (disabled) return;
    createEvent.mutate();
  }

  useEffect(() => {
    const startTime = dayjs(value.start_time, 'HH:mm');
    const endTime = dayjs(value.end_time, 'HH:mm');
    setDisabled(
      value.title === '' ||
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
        <title>이벤트 생성 - OneTime</title>
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
