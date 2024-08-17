import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../../api/axios';
import { EventValue } from '../../../types/event.type';
import { Schedule } from '../../../types/schedule.type';
import BottomButton from '../../floating-button/schedule-create/BottomButton';
import TimeBlockBoard from '../../time-block/TimeBlockBoard';
import { useMutation } from '@tanstack/react-query';

interface ScheduleFormProps {
  memberId: string;
  eventCategory: EventValue['category'];
}

export default function ScheduleForm({
  memberId,
  eventCategory,
}: ScheduleFormProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { day: '일', time: [] },
    { day: '월', time: [] },
    { day: '화', time: [] },
    { day: '수', time: [] },
    { day: '목', time: [] },
  ]);

  const navigate = useNavigate();
  const params = useParams();

  const startTime = '09:00';
  const endTime = '23:00';

  const createSchedule = useMutation({
    mutationFn: () => {
      return axios.post(
        `/schedules/${eventCategory === 'DAY' ? 'day' : 'date'}`,
        {
          event_id: params.eventId,
          member_id: memberId,
          schedules,
        },
      );
    },
    onSuccess: () => {
      navigate(`/events/${params.eventId}`);
    },
  });

  function handleSubmit() {
    createSchedule.mutate();
  }

  return (
    <>
      <div className="mb-40">
        <TimeBlockBoard
          schedules={schedules}
          setSchedules={setSchedules}
          startTime={startTime}
          endTime={endTime}
          editable
        />
      </div>
      <BottomButton onClick={handleSubmit}>스케줄 등록</BottomButton>
    </>
  );
}
