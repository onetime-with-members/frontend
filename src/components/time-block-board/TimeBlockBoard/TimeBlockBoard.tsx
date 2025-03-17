import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import BoardContent from './BoardContent/BoardContent';
import CircleArrowButtonForBoard from './CircleArrowButtonForBoard/CircleArrowButtonForBoard';
import LeftTimeLine from './LeftTimeLine/LeftTimeLine';
import PossibleTimeToggle from './PossibleTimeToggle/PossibleTimeToggle';
import ReloadButton from './ReloadButton/ReloadButton';
import ResetButton from './ResetButton/ResetButton';
import { useTargetOnBottomInScrollableElement } from './TimeBlockBoard.hooks';
import TimeBlockPopUp from './TimeBlockPopUp/TimeBlockPopUp';
import TopDateLabelGroup from './TopDateLabelGroup/TopDateLabelGroup';
import useScrollArrowButton from '@/hooks/useScrollArrowButton';
import { EventType } from '@/types/event.type';
import { ScheduleType, TimeBlockPopUpDataType } from '@/types/schedule.type';
import cn from '@/utils/cn';
import { timeBlockList } from '@/utils/time-block';

interface TimeBlockBoardProps {
  event: EventType;
  schedules: ScheduleType[];
  setSchedules?: React.Dispatch<React.SetStateAction<ScheduleType[]>>;
  editable?: boolean;
  backgroundColor?: 'white' | 'gray';
  isPossibleTime?: boolean;
  setIsPossibleTime?: React.Dispatch<React.SetStateAction<boolean>>;
  topContentClassName?: string;
  bottomContentClassName?: string;
  isEdited?: boolean;
  setIsEdited?: React.Dispatch<React.SetStateAction<boolean>>;
  initialSchedule?: ScheduleType[];
  isSchedulePending?: boolean;
  isNewGuest?: boolean;
}

export default function TimeBlockBoard({
  event,
  schedules,
  setSchedules,
  editable,
  backgroundColor = 'gray',
  isPossibleTime = true,
  setIsPossibleTime,
  topContentClassName,
  bottomContentClassName,
  isEdited,
  setIsEdited,
  initialSchedule,
  isNewGuest,
}: TimeBlockBoardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<TimeBlockPopUpDataType>({
    timePoint: '',
    time: '',
    members: {
      possible: [],
      impossible: [],
    },
  });
  const [isEmpty, setIsEmpty] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isBoardContentHover, setIsBoardContentHover] = useState(false);

  const boardContentRef = useRef<HTMLDivElement>(null);
  const topLabelRef = useRef<HTMLDivElement>(null);

  const { arrowButtonVisible, handleScrollLeft, handleScrollRight } =
    useScrollArrowButton({
      ref: boardContentRef,
    });
  const { isTargetOnBottom } = useTargetOnBottomInScrollableElement({
    topRef: topLabelRef,
    scrollableElementRef: boardContentRef,
    targetHeight: 40,
    targetTopOffset: 160,
    targetBottomOffset: 160,
  });

  function changeTimeBlockStatus(
    day: string,
    time: ScheduleType['schedules'][0]['times'][0],
    newStatus: boolean,
  ) {
    if (!editable) return;
    editTimeBlock();
    changeIsEdited();

    function editTimeBlock() {
      if (!setSchedules) return;
      setSchedules((prev) => [
        {
          name: prev[0].name,
          schedules: prev[0].schedules.map((schedule) => ({
            ...schedule,
            times:
              schedule.time_point === day
                ? newStatus
                  ? Array.from(new Set([...schedule.times, time])).sort()
                  : schedule.times.filter((t) => t !== time)
                : schedule.times,
          })),
        },
      ]);
    }

    function changeIsEdited() {
      if (isEdited === undefined || !setIsEdited) return;
      setIsEdited(true);
    }
  }

  function handleDialogOpen({
    timePoint,
    time,
  }: {
    timePoint: string;
    time: string;
  }) {
    if (schedules.length === 0) return;

    let members: TimeBlockPopUpDataType['members'] = {
      possible: [],
      impossible: [],
    };

    schedules.forEach((schedule) => {
      if (
        schedule.schedules
          .find((s) => s.time_point === timePoint)
          ?.times.includes(time)
      ) {
        members.possible.push(schedule.name);
      } else {
        members.impossible.push(schedule.name);
      }
    });

    members = {
      possible: members.possible.sort(),
      impossible: members.impossible.sort(),
    };

    setDialogData({
      timePoint,
      time,
      members,
    });
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  function handleAvailableToggle() {
    if (!editable || !setSchedules) return;

    const prevIsAvailable = isPossibleTime;

    if (setIsPossibleTime) {
      setIsPossibleTime((prev) => !prev);
    }

    if (prevIsAvailable && isEmpty) {
      setSchedules(
        schedules.map((schedule) => ({
          ...schedule,
          schedules: schedule.schedules.map((daySchedule) => ({
            ...daySchedule,
            times: timeBlockList(event.start_time, event.end_time),
          })),
        })),
      );
    }

    if (!prevIsAvailable && isFull) {
      setSchedules(
        schedules.map((schedule) => ({
          ...schedule,
          schedules: schedule.schedules.map((daySchedule) => ({
            ...daySchedule,
            times: [],
          })),
        })),
      );
    }
  }

  function handleResetButtonClick() {
    if (!editable || !setSchedules) return;
    setSchedules(
      isPossibleTime
        ? schedules.map((schedule) => ({
            ...schedule,
            schedules: schedule.schedules.map((daySchedule) => ({
              ...daySchedule,
              times: [],
            })),
          }))
        : schedules.map((schedule) => ({
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

  useEffect(() => {
    if (!editable || schedules.length === 0) return;
    setIsEmpty(schedules[0].schedules.every((s) => s.times.length === 0));
    setIsFull(
      schedules[0].schedules.every(
        (s) =>
          timeBlockList(event.start_time, event.end_time).filter(
            (time) => !s.times.includes(time),
          ).length === 0,
      ),
    );
  }, [schedules, editable, event.start_time, event.end_time]);

  useEffect(() => {
    const boardContent = boardContentRef.current;
    const topLabel = topLabelRef.current;

    function handleScroll() {
      if (boardContent && topLabel) {
        topLabel.scrollLeft = boardContent.scrollLeft;
      }
    }

    if (boardContent && topLabel) {
      boardContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      boardContent?.removeEventListener('scroll', handleScroll);
    };
  }, [topLabelRef, boardContentRef]);

  return (
    <motion.div
      onHoverStart={() => setIsBoardContentHover(true)}
      onHoverEnd={() => setIsBoardContentHover(false)}
      className="relative flex flex-col"
    >
      <CircleArrowButtonForBoard
        direction="left"
        isVisible={!isMobile && arrowButtonVisible.left && isBoardContentHover}
        onClick={handleScrollLeft}
        isTargetOnBottom={isTargetOnBottom}
      />
      <CircleArrowButtonForBoard
        direction="right"
        isVisible={!isMobile && arrowButtonVisible.right && isBoardContentHover}
        onClick={handleScrollRight}
        isTargetOnBottom={isTargetOnBottom}
      />

      <div className={cn('sticky top-0 z-10 bg-gray-00', topContentClassName)}>
        {editable && (
          <div className="flex items-center justify-between pt-2">
            <PossibleTimeToggle
              isPossibleTime={isPossibleTime}
              onToggle={handleAvailableToggle}
            />
            {((isEmpty && isPossibleTime) || (isFull && !isPossibleTime)) &&
            initialSchedule &&
            initialSchedule[0].schedules.length > 0 &&
            isEdited &&
            !isNewGuest ? (
              <ReloadButton onClick={handleReloadButtonClick} />
            ) : (
              <ResetButton onClick={handleResetButtonClick} />
            )}
          </div>
        )}
        <TopDateLabelGroup
          topLabelRef={topLabelRef}
          category={event.category}
        />
      </div>

      <div
        className={cn('relative flex overflow-hidden', bottomContentClassName)}
      >
        <LeftTimeLine startTime={event.start_time} endTime={event.end_time} />
        <BoardContent
          boardContentRef={boardContentRef}
          event={event}
          schedules={schedules}
          changeTimeBlockStatus={changeTimeBlockStatus}
          handleDialogOpen={handleDialogOpen}
          editable={editable}
          isPossibleTime={isPossibleTime}
          backgroundColor={backgroundColor}
        />
      </div>
      {isDialogOpen && (
        <TimeBlockPopUp
          onClose={handleDialogClose}
          timePoint={dialogData.timePoint}
          time={dialogData.time}
          members={dialogData.members}
          category={event.category}
        />
      )}
    </motion.div>
  );
}
