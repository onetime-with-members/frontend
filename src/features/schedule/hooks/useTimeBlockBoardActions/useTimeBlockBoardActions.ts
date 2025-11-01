import { ScheduleType } from '../../types';
import { timeBlockList } from '../../utils';
import { EventType } from '@/features/event/types';

export default function useTimeBlockBoardActions({
  editable,
  setSchedules,
  event,
  setIsEdited,
  isPossibleTime,
  setIsPossibleTime,
  isEmpty,
  isFull,
  initialSchedule,
}: {
  editable: boolean;
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
  isPossibleTime: boolean;
  setIsPossibleTime: React.Dispatch<React.SetStateAction<boolean>>;
  event: EventType;
  isEmpty: boolean;
  isFull: boolean;
  initialSchedule: ScheduleType[];
}) {
  function handleAvailableToggle() {
    if (!editable || !setSchedules) return;

    const prevIsAvailable = isPossibleTime;

    if (setIsPossibleTime) {
      setIsPossibleTime((prev) => !prev);
    }

    if (prevIsAvailable && isEmpty) {
      setSchedules((prev) =>
        prev.map((schedule) => ({
          ...schedule,
          schedules: schedule.schedules.map((daySchedule) => ({
            ...daySchedule,
            times: timeBlockList(event.start_time, event.end_time),
          })),
        })),
      );
    }

    if (!prevIsAvailable && isFull) {
      setSchedules((prev) =>
        prev.map((schedule) => ({
          ...schedule,
          schedules: schedule.schedules.map((daySchedule) => ({
            ...daySchedule,
            times: [],
          })),
        })),
      );
    }
  }

  function handleClearButtonClick() {
    if (!editable || !setSchedules) return;
    setSchedules((prev) =>
      isPossibleTime
        ? prev.map((schedule) => ({
            ...schedule,
            schedules: schedule.schedules.map((daySchedule) => ({
              ...daySchedule,
              times: [],
            })),
          }))
        : prev.map((schedule) => ({
            ...schedule,
            schedules: schedule.schedules.map((daySchedule) => ({
              ...daySchedule,
              times: timeBlockList(event.start_time, event.end_time),
            })),
          })),
    );
    setIsEdited?.(true);
  }

  function handleReloadButtonClick() {
    if (!editable || !setSchedules || !initialSchedule || !setIsEdited) return;
    setSchedules(initialSchedule);
    setIsEdited(false);
  }

  function handleResetButtonClick() {
    handleReloadButtonClick();
  }

  return {
    handleAvailableToggle,
    handleClearButtonClick,
    handleReloadButtonClick,
    handleResetButtonClick,
  };
}
