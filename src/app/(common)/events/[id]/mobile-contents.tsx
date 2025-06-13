'use client';

import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import EmptyEventBanner from './empty';
import { ParticipantsPopUp, RecommendTimePopUp } from './pop-up';
import CircleArrowButton from '@/components/button/circle-arrow-button';
import MemberBadge from '@/components/member-badge';
import useClientWidth from '@/hooks/useClientWidth';
import useScrollArrowButton from '@/hooks/useScrollArrowButton';
import cn from '@/lib/cn';
import { weekdaysShortKo } from '@/lib/constants';
import { EventType, RecommendScheduleType, ScheduleType } from '@/lib/types';
import { getParticipants } from '@/lib/utils';
import { IconChevronRight } from '@tabler/icons-react';

export default function MobileContents({
  event,
  schedules,
  recommendedTimes,
}: {
  event: EventType;
  schedules: ScheduleType[];
  recommendedTimes: RecommendScheduleType[];
}) {
  return (
    <div className="block md:hidden">
      {schedules?.length === 0 ? (
        <EmptyEventBanner event={event} />
      ) : (
        <BannerList
          event={event}
          schedules={schedules}
          recommendedTimes={recommendedTimes}
        />
      )}
    </div>
  );
}

function BannerList({
  event,
  schedules,
  recommendedTimes,
}: {
  event: EventType;
  schedules: ScheduleType[];
  recommendedTimes: RecommendScheduleType[];
}) {
  const [isHover, setIsHover] = useState(false);

  const topDialogListRef = useRef<HTMLDivElement>(null);

  const { arrowButtonVisible, handleScrollLeft, handleScrollRight } =
    useScrollArrowButton({ ref: topDialogListRef });

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="relative"
    >
      {/* Left Arrow Button */}
      <AnimatePresence>
        {!isMobile && arrowButtonVisible.left && isHover && (
          <CircleArrowButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            direction="left"
            className="absolute left-10 top-1/2 -translate-y-1/2 sm:left-16"
            onClick={handleScrollLeft}
          />
        )}
      </AnimatePresence>

      {/* Banner Contents */}
      <div
        ref={topDialogListRef}
        className="scrollbar-hidden mt-4 flex w-full items-stretch gap-4 overflow-x-scroll"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <RecommendTime event={event} recommendedTimes={recommendedTimes} />
        <Participants schedules={schedules} />
      </div>

      {/* Right Arrow Button */}
      <AnimatePresence>
        {!isMobile && arrowButtonVisible.right && isHover && (
          <CircleArrowButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            direction="right"
            className="absolute right-10 top-1/2 -translate-y-1/2 sm:right-16"
            onClick={handleScrollRight}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Participants({ schedules }: { schedules: ScheduleType[] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const clientWidth = useClientWidth();
  const t = useTranslations('eventDetail');

  const shownMemberBadgesCount = clientWidth >= 440 ? 9 : 7;

  const participants = getParticipants(schedules);

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <div
        className="flex min-w-[85%] cursor-pointer snap-start flex-col gap-2 rounded-2xl bg-gray-00 px-4 py-5"
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="text-gray-60 text-md-300">
              {t('participant', {
                count: participants.length,
              })}
            </span>
            <strong className="text-primary-50 text-md-300">
              {participants.length}
            </strong>
          </span>
          {<IconChevronRight size={24} className="text-gray-30" />}
        </div>

        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {
            <>
              {participants
                .slice(0, shownMemberBadgesCount)
                .map((participant, index) => (
                  <MemberBadge key={index}>{participant}</MemberBadge>
                ))}
              {participants.length > shownMemberBadgesCount && (
                <MemberBadge variant="gray">...</MemberBadge>
              )}
            </>
          }
        </div>
      </div>

      {isDialogOpen && (
        <ParticipantsPopUp
          onClose={handleDialogClose}
          participants={participants}
        />
      )}
    </>
  );
}

function RecommendTime({
  event,
  recommendedTimes,
}: {
  event: EventType;
  recommendedTimes: RecommendScheduleType[];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const t = useTranslations();

  const isAllMembersAvailable =
    recommendedTimes.length > 0
      ? recommendedTimes[0].impossible_names.length === 0 &&
        recommendedTimes[0].possible_count > 1
      : false;

  function handleDialogOpen() {
    if (recommendedTimes.length === 0) return;
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <>
      <div
        className={cn(
          'flex min-w-[85%] cursor-pointer snap-start flex-col gap-2 rounded-2xl bg-gray-00 px-4 py-5',
          {
            'bg-success-50': isAllMembersAvailable,
          },
        )}
        onClick={handleDialogOpen}
      >
        <div className="ml-1 flex items-center justify-between">
          <span
            className={cn('text-gray-60 text-md-300', {
              'text-gray-00': isAllMembersAvailable,
            })}
          >
            {isAllMembersAvailable
              ? t('eventDetail.allAvailable')
              : t('eventDetail.mostAvailable')}
          </span>
          <IconChevronRight
            size={24}
            className={cn('text-gray-30', {
              'text-success-20': isAllMembersAvailable,
            })}
          />
        </div>

        <div
          className={cn(
            'overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl bg-primary-00 p-4 text-primary-50 text-sm-300 xs:text-md-300 sm:text-lg-300',
            {
              'bg-gray-00 text-success-60': isAllMembersAvailable,
              'bg-gray-05 text-gray-40': recommendedTimes.length === 0,
            },
          )}
        >
          {recommendedTimes &&
            event &&
            (recommendedTimes.length === 0 ? (
              <>{t('common.noOneSchedule')}</>
            ) : (
              <>
                <span>
                  {event.category === 'DATE'
                    ? dayjs(
                        recommendedTimes[0].time_point,
                        'YYYY.MM.DD',
                      ).format('YYYY.MM.DD (ddd)')
                    : dayjs()
                        .day(
                          weekdaysShortKo.findIndex(
                            (weekday) =>
                              weekday === recommendedTimes[0].time_point,
                          ),
                        )
                        .format('dddd')}
                </span>
                <span className="ml-2">
                  {recommendedTimes[0].start_time} -{' '}
                  {recommendedTimes[0].end_time}
                </span>
              </>
            ))}
        </div>
      </div>

      {isDialogOpen && (
        <RecommendTimePopUp
          onClose={handleDialogClose}
          event={event}
          recommendedTimes={recommendedTimes}
        />
      )}
    </>
  );
}
