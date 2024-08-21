import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../../api/axios';
import { Event } from '../../../types/event.type';
import { MemberValue } from '../../../types/member.type';
import { Schedule } from '../../../types/schedule.type';
import { sortWeekdayList } from '../../../utils/weekday';
import FloatingBottomButton from '../../floating-button/schedule-create/FloatingBottomButton';
import TimeBlockBoard from '../../time-block/TimeBlockBoard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface ScheduleFormProps {
  memberId: string;
  isNewMember: boolean;
  memberValue: MemberValue;
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
}

export default function ScheduleForm({
  memberId,
  isNewMember,
  memberValue,
  schedules,
  setSchedules,
}: ScheduleFormProps) {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const { isPending: isEventPending, data: eventData } = useQuery({
    queryKey: ['events', params.eventId],
    queryFn: async () => {
      const res = await axios.get(`/events/${params.eventId}`);
      return res.data;
    },
  });

  let event: Event | undefined = eventData?.payload;
  if (event && event.category === 'DAY')
    event.ranges = sortWeekdayList(event.ranges);

  const { isPending: isSchedulePending, data: scheduleData } = useQuery({
    queryKey: [
      'schedules',
      event?.category.toLowerCase(),
      params.eventId,
      memberId,
    ],
    queryFn: async () => {
      const res = await axios.get(
        `/schedules/${event?.category.toLowerCase()}/${params.eventId}/${memberId}`,
      );
      return res.data;
    },
    enabled: !!event && !isNewMember,
  });

  const mySchedule: Schedule | undefined = scheduleData?.payload;

  const createNewMemberSchedule = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/members/action-register`, {
        event_id: params.eventId,
        name: memberValue.name,
        pin: memberValue.pin,
        schedules: schedules[0].schedules,
      });
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      navigate(`/events/${params.eventId}`);
    },
  });

  const updateSchedule = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `/schedules/${event?.category.toLowerCase()}`,
        {
          event_id: params.eventId,
          member_id: memberId,
          schedules: schedules[0].schedules,
        },
      );
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['schedules'] });
      navigate(`/events/${params.eventId}`);
    },
  });

  function handleSubmit() {
    if (isNewMember) {
      createNewMemberSchedule.mutate();
    } else {
      updateSchedule.mutate();
    }
  }

  useEffect(() => {
    if (!event) return;
    if (isNewMember) {
      setSchedules([
        {
          name: memberValue.name,
          schedules: event.ranges.map((timePoint) => ({
            time_point: timePoint,
            times:
              schedules[0].schedules.find((s) => s.time_point === timePoint)
                ?.times || [],
          })),
        },
      ]);
    } else if (!isSchedulePending && mySchedule) {
      setSchedules([
        {
          name: memberValue.name,
          schedules: event.ranges.map((timePoint) => ({
            time_point: timePoint,
            times:
              mySchedule.schedules.find((s) => s.time_point === timePoint)
                ?.times || [],
          })),
        },
      ]);
    }
  }, [event, isNewMember, isSchedulePending, mySchedule]);

  if (isNewMember) {
    if (isEventPending || !event || !schedules) return <></>;
  } else if (
    isEventPending ||
    isSchedulePending ||
    !event ||
    !mySchedule ||
    !schedules
  ) {
    return <></>;
  }

  return (
    <>
      <div className="mb-40">
        <TimeBlockBoard
          schedules={schedules}
          setSchedules={setSchedules}
          event={event}
          editable
        />
      </div>
      <FloatingBottomButton onClick={handleSubmit}>
        스케줄 등록
      </FloatingBottomButton>
    </>
  );
}
