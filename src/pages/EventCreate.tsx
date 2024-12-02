import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import axios from '../api/axios';
import NavBar from '../components/NavBar';
import Button from '../components/button/Button';
import DateSection from '../components/section/event-create/DateSection';
import TimeSection from '../components/section/event-create/TimeSection';
import TitleSection from '../components/section/event-create/TitleSection';
import { EventValue } from '../types/event.type';
import { IconChevronLeft } from '@tabler/icons-react';
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

  function handleBackButtonClick() {
    navigate(-1);
  }

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
    document.body.style.backgroundColor = '#F9F9F9';
  }, []);

  return (
    <>
      <Helmet>
        <title>이벤트 생성 - OneTime</title>
      </Helmet>
      <div className="px-4">
        <NavBar variant="black" />
        <main className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-center pb-40 pt-6">
          <div className="hidden w-full items-center justify-start pb-6 md:flex">
            <button
              onClick={handleBackButtonClick}
              className="flex items-center justify-center"
            >
              <IconChevronLeft size={24} />
            </button>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-10">
            <div className="flex w-full flex-col justify-center gap-16 rounded-3xl bg-gray-00 p-6 md:flex-row">
              <div className="flex flex-1 flex-col gap-16">
                <TitleSection value={value} setValue={setValue} />
                <TimeSection value={value} setValue={setValue} />
              </div>
              <div>
                <DateSection value={value} setValue={setValue} />
              </div>
            </div>
            <div className="sticky bottom-4 w-full md:static md:w-[25rem]">
              <Button
                onClick={handleSubmit}
                disabled={disabled}
                variant="black"
              >
                이벤트 생성하기
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
