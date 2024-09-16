import dayjs from 'dayjs';

import { EventType } from '../../types/event.type';
import { RecommendSchedule } from '../../types/schedule.type';
import TimeAccordionItem from '../banner/recommend-time/TimeAccordionItem';
import { IconX } from '@tabler/icons-react';

interface RecommendTimeDialogProps {
  onClose: () => void;
  recommendSchedules: RecommendSchedule[];
  eventCategory: EventType['category'];
}

export default function RecommendTimePopUp({
  onClose,
  recommendSchedules,
  eventCategory,
}: RecommendTimeDialogProps) {
  const formattedRecommendSchedules = [
    ...new Set(
      recommendSchedules.map(
        (recommendSchedule) => recommendSchedule.time_point,
      ),
    ),
  ].map((timePoint) => ({
    timePoint,
    schedules: recommendSchedules.filter(
      (recommendSchedule) => recommendSchedule.time_point === timePoint,
    ),
  }));

  const style = {
    dateTitle: 'text-lg-300 text-gray-60',
    timeAccordionList: 'mt-3 flex flex-col gap-3',
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="w-[23rem] cursor-auto rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-lg-300 text-gray-80">
            가능한 시간은 언제일까요?
          </h2>
          <button className="text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="scrollbar-hidden flex max-h-[30rem] flex-col gap-8 overflow-y-auto px-5 pb-7 pt-4">
          {formattedRecommendSchedules.map((recommendSchedule) => (
            <div key={recommendSchedule.timePoint}>
              <h3 className={style.dateTitle}>
                {eventCategory === 'DATE'
                  ? dayjs(recommendSchedule.timePoint, 'YYYY.MM.DD').format(
                      'YYYY.MM.DD (dd)',
                    )
                  : `${recommendSchedule.timePoint}요일`}
              </h3>
              <ul className={style.timeAccordionList}>
                {recommendSchedule.schedules.map((schedule, index) => (
                  <TimeAccordionItem
                    key={index}
                    startTime={schedule.start_time}
                    endTime={schedule.end_time}
                    members={{
                      possible: schedule.possible_names,
                      impossible: schedule.impossible_names,
                    }}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
