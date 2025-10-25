'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import MemberBadge from '@/components/member-badge';
import { eventQueryOptions } from '@/features/events/api/events.option';
import cn from '@/lib/cn';
import { weekdaysShortKo } from '@/lib/constants';
import dayjs from '@/lib/dayjs';
import { RecommendScheduleType } from '@/lib/types';
import { IconChevronDown, IconChevronUp, IconX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export function ParticipantsPopUp({
  onClose,
  participants,
}: {
  onClose: () => void;
  participants: string[];
}) {
  const t = useTranslations('eventDetail');

  return createPortal(
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[30rem] min-h-[131px] w-[23rem] cursor-auto overflow-y-auto rounded-2xl bg-gray-00 px-5 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-gray-80 text-lg-300">
              {t('peopleWhoAddedSchedules', {
                count: participants.length,
              })}
            </h2>
            <span className="text-primary-50 text-lg-300">
              {participants.length}
            </span>
          </div>
          <button className="cursor-pointer text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          {participants.map((participant, index) => (
            <MemberBadge key={index}>{participant}</MemberBadge>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById('pop-up') as HTMLElement,
  );
}

export function RecommendTimePopUp({
  onClose,
  recommendedTimes,
}: {
  onClose: () => void;
  recommendedTimes: RecommendScheduleType[];
}) {
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });

  const formattedRecommendTimes = recommendedTimes
    ? Array.from(
        new Set(
          recommendedTimes.map((recommendedTime) => recommendedTime.time_point),
        ),
      ).map((timePoint) => ({
        timePoint,
        schedules: recommendedTimes.filter(
          (recommendedTime) => recommendedTime.time_point === timePoint,
        ),
      }))
    : [];

  const style = {
    dateTitle: 'text-lg-300 text-gray-60',
    timeAccordionList: 'mt-3 flex flex-col gap-3',
  };

  return createPortal(
    <div
      className="fixed left-0 top-0 z-50 flex h-full w-full cursor-pointer items-center justify-center bg-gray-90 bg-opacity-50 px-4"
      onClick={onClose}
    >
      <div
        className="w-[23rem] cursor-auto rounded-2xl bg-gray-00"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-gray-80 text-lg-300">
            {t('whenAvailableTimes')}
          </h2>
          <button className="text-gray-40" onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>
        <div className="scrollbar-hidden flex max-h-[30rem] flex-col gap-8 overflow-y-auto px-5 pb-7 pt-4">
          {event &&
            formattedRecommendTimes.map((recommendSchedule) => (
              <div key={recommendSchedule.timePoint}>
                <h3 className={style.dateTitle}>
                  {event.category === 'DATE'
                    ? dayjs(recommendSchedule.timePoint, 'YYYY.MM.DD').format(
                        'YYYY.MM.DD (ddd)',
                      )
                    : dayjs()
                        .day(
                          weekdaysShortKo.findIndex(
                            (weekday) =>
                              weekday === recommendSchedule.timePoint,
                          ),
                        )
                        .format('dddd')}
                </h3>
                <ul className={style.timeAccordionList}>
                  {recommendSchedule.schedules.map((schedule, index) => (
                    <TimeAccordion
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
    </div>,
    document.getElementById('pop-up') as HTMLElement,
  );
}

export function TimeAccordion({
  startTime,
  endTime,
  members,
}: {
  startTime: string;
  endTime: string;
  members: {
    possible: string[];
    impossible: string[];
  };
}) {
  const [isOpen, setIsOpen] = useState(false);

  const t = useTranslations();

  const style = {
    title: 'text-md-300',
    badgeList: 'mt-2 flex flex-wrap gap-2',
  };

  function handleAccordionClick() {
    setIsOpen(!isOpen);
  }

  return (
    <li
      className={cn('rounded-2xl border border-gray-05 bg-gray-05', {
        'border-primary-50 bg-gray-00': isOpen,
      })}
    >
      <div
        className="flex cursor-pointer items-center gap-2 px-5 py-4"
        onClick={handleAccordionClick}
      >
        <span
          className={cn('flex-1 text-gray-50 text-lg-200', {
            'text-primary-50': isOpen,
          })}
        >
          {startTime} - {endTime}
        </span>
        <div className="rounded-full bg-primary-50 px-3 py-1 text-gray-00 text-sm-300">
          {t('common.participantCount', {
            count: members.possible.length,
          })}
        </div>
        {isOpen ? (
          <IconChevronUp size={24} className="text-primary-50" />
        ) : (
          <IconChevronDown size={24} className="text-gray-30" />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-5 px-5 pb-4">
          {members.possible.length > 0 && (
            <div>
              <div className={cn(style.title, 'text-primary-60')}>
                {t('eventDetail.available')}
              </div>
              <div className={style.badgeList}>
                {members.possible.map((member) => (
                  <MemberBadge key={member} variant="primary">
                    {member}
                  </MemberBadge>
                ))}
              </div>
            </div>
          )}
          {members.impossible.length > 0 && (
            <div>
              <div className={cn(style.title, 'text-gray-50')}>
                {t('eventDetail.unavailable')}
              </div>
              <div className={style.badgeList}>
                {members.impossible.map((member) => (
                  <MemberBadge key={member} variant="gray">
                    {member}
                  </MemberBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
