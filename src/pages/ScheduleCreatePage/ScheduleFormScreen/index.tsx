import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BottomButtonForDesktop from './BottomButtonForDesktop';
import TimeBlockBoard from '@/components/time-block-board/TimeBlockBoard';
import { EventType } from '@/types/event.type';
import { ScheduleType } from '@/types/schedule.type';
import { GuestValueType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ScheduleFormProps {
  event: EventType;
  guestId: string;
  isNewGuest: boolean;
  guestValue: GuestValueType;
  schedules: ScheduleType[];
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  isPossibleTime: boolean;
  setIsPossibleTime: React.Dispatch<React.SetStateAction<boolean>>;
  isTopSubmitButtonClicked: boolean;
  setIsTopSubmitButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isScheduleEdited: boolean;
  setIsScheduleEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ScheduleFormScreen({
  event,
  guestId,
  isNewGuest,
  guestValue,
  schedules,
  setSchedules,
  isPossibleTime,
  setIsPossibleTime,
  isTopSubmitButtonClicked,
  setIsTopSubmitButtonClicked,
  isScheduleEdited,
  setIsScheduleEdited,
}: ScheduleFormProps) {
  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const createNewMemberSchedule = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/members/action-register`, {
        event_id: params.eventId,
        name: guestValue.name,
        pin: guestValue.pin,
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
        `/schedules/${event?.category?.toLowerCase()}`,
        {
          event_id: params.eventId,
          member_id: guestId,
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
    if (isNewGuest) {
      createNewMemberSchedule.mutate();
    } else {
      updateSchedule.mutate();
    }
  }

  useEffect(() => {
    if (isTopSubmitButtonClicked) {
      handleSubmit();
      setIsTopSubmitButtonClicked(false);
    }
  }, [isTopSubmitButtonClicked]);

  return (
    <>
      <TimeBlockBoard
        schedules={schedules}
        setSchedules={setSchedules}
        event={event}
        isPossibleTime={isPossibleTime}
        setIsPossibleTime={setIsPossibleTime}
        editable
        topContentClassName="top-[64px]"
        isEdited={isScheduleEdited}
        setIsEdited={setIsScheduleEdited}
      />
      <BottomButtonForDesktop onClick={handleSubmit} />
    </>
  );
}
