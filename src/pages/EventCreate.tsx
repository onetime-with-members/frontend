import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import NavBar from '../components/nav-bar/event-create/NavBar';
import DateSection from '../components/section/event-create/DateSection';
import TimeSection from '../components/section/event-create/TimeSection';
import TitleSection from '../components/section/event-create/TitleSection';
import { Event } from '../types/event.type';
import { useMutation } from '@tanstack/react-query';

export default function EventCreate() {
  const [value, setValue] = useState<Event>({
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
        <NavBar />
        <main className="mx-auto max-w-screen-sm pb-40 pt-8">
          <div className="flex flex-col gap-16">
            <TitleSection value={value} setValue={setValue} />
            <TimeSection value={value} setValue={setValue} />
            <DateSection value={value} setValue={setValue} />
          </div>
          <div className="fixed bottom-6 left-0 flex w-full justify-center px-4">
            <button
              className="title-sm-200 h-16 w-full max-w-screen-sm rounded-2xl bg-gray-90 text-gray-00 disabled:bg-gray-10 disabled:text-gray-60"
              onClick={handleSubmit}
              disabled={disabled}
            >
              이벤트 생성하기
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
