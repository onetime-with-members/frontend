import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import NavBar from '../components/NavBar';
import FloatingBottomButton from '../components/floating-button/FloatingBottomButton';
import DateSection from '../components/section/event-create/DateSection';
import TimeSection from '../components/section/event-create/TimeSection';
import TitleSection from '../components/section/event-create/TitleSection';
import { EventType } from '../types/event.type';
import { useMutation } from '@tanstack/react-query';

export default function EventCreate() {
  const [value, setValue] = useState<EventType>({
    title: '',
    start_time: '09:00',
    end_time: '24:00',
    category: 'DATE',
    ranges: [],
  });
  const [disabled, setDisabled] = useState(false);

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

  return (
    <>
      <Helmet>
        <title>이벤트 생성 - OneTime</title>
      </Helmet>
      <div className="px-4">
        <NavBar variant="black" />
        <main className="mx-auto max-w-screen-sm pb-40 pt-8">
          <div className="flex flex-col gap-16">
            <TitleSection value={value} setValue={setValue} />
            <TimeSection value={value} setValue={setValue} />
            <DateSection value={value} setValue={setValue} />
          </div>
          <FloatingBottomButton onClick={handleSubmit} disabled={disabled}>
            일정 생성하기
          </FloatingBottomButton>
        </main>
      </div>
    </>
  );
}
