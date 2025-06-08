import dayjs from 'dayjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useContext, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import EmptyEventBanner from './empty';
import { ParticipantsPopUp, RecommendTimePopUp } from './pop-up';
import CircleArrowButton from '@/components/button/circle-arrow-button';
import MemberBadge from '@/components/member-badge';
import MemberBadgeSkeleton from '@/components/skeleton/member-badge-skeleton';
import { ParticipantContext } from '@/contexts/participant';
import useClientWidth from '@/hooks/useClientWidth';
import useScrollArrowButton from '@/hooks/useScrollArrowButton';
import cn from '@/lib/cn';
import {
  SKELETON_DARK_GRAY,
  SKELETON_GRAY,
  weekdaysShortKo,
} from '@/lib/constants';
import { EventType, ScheduleType } from '@/lib/types';
import { useRecommendedTimesQuery } from '@/queries/event.queries';
import { IconChevronRight } from '@tabler/icons-react';
import { useParams } from 'next/navigation';

export default function MobileContents({
  event,
  schedules,
  isSchedulesPending,
}: {
  event: EventType | undefined;
  schedules: ScheduleType[] | undefined;
  isSchedulesPending: boolean;
}) {
  return (
    <div className="block md:hidden">
      {schedules?.length === 0 ? (
        <EmptyEventBanner event={event} />
      ) : (
        <BannerList isPending={isSchedulesPending} event={event} />
      )}
    </div>
  );
}

function BannerList({
  isPending,
  event,
}: {
  isPending?: boolean;
  event: EventType | undefined;
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
        <RecommendTime isPending={isPending} event={event} />
        <Participants isPending={isPending} />
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

function Participants({ isPending }: { isPending?: boolean }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { participants } = useContext(ParticipantContext);
  const clientWidth = useClientWidth();
  const t = useTranslations('eventDetail');

  const shownMemberBadgesCount = clientWidth >= 440 ? 9 : 7;

  function handleDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className="flex min-w-[85%] cursor-pointer snap-start flex-col gap-2 rounded-2xl bg-gray-00 px-4 py-5"
        onClick={handleDialogOpen}
        style={{
          ...(isPending && {
            backgroundColor: SKELETON_GRAY,
          }),
        }}
      >
        <div className="ml-1 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span className="text-gray-60 text-md-300">
              {!isPending ? (
                t('participant', {
                  count: participants.length,
                })
              ) : (
                <Skeleton width={150} height={20} />
              )}
            </span>
            <strong className="text-primary-50 text-md-300">
              {!isPending ? (
                participants.length
              ) : (
                <Skeleton width={20} height={20} />
              )}
            </strong>
          </span>
          {!isPending ? (
            <IconChevronRight size={24} className="text-gray-30" />
          ) : (
            <Skeleton width={20} height={20} />
          )}
        </div>

        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {!isPending ? (
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
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <MemberBadgeSkeleton key={index} />
            ))
          )}
        </div>
      </div>

      {isDialogOpen && (
        <ParticipantsPopUp
          onClose={handleDialogClose}
          participants={participants}
        />
      )}
    </SkeletonTheme>
  );
}

function RecommendTime({
  isPending,
  event,
}: {
  isPending?: boolean;
  event: EventType | undefined;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const params = useParams<{ id: string }>();
  const t = useTranslations();

  const { data: recommendTimes } = useRecommendedTimesQuery(params.id);

  const isAllMembersAvailable =
    recommendTimes && recommendTimes.length > 0
      ? recommendTimes[0].impossible_names.length === 0 &&
        recommendTimes[0].possible_count > 1
      : false;

  function handleDialogOpen() {
    if (recommendTimes?.length === 0) return;
    setIsDialogOpen(true);
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
  }

  return (
    <SkeletonTheme baseColor={SKELETON_DARK_GRAY} borderRadius={9999}>
      <div
        className={cn(
          'flex min-w-[85%] cursor-pointer snap-start flex-col gap-2 rounded-2xl bg-gray-00 px-4 py-5',
          {
            'bg-success-50': isAllMembersAvailable,
          },
        )}
        onClick={handleDialogOpen}
        style={{
          ...(isPending && {
            backgroundColor: SKELETON_GRAY,
          }),
        }}
      >
        <div className="ml-1 flex items-center justify-between">
          <span
            className={cn('text-gray-60 text-md-300', {
              'text-gray-00': isAllMembersAvailable,
            })}
          >
            {!isPending ? (
              isAllMembersAvailable ? (
                t('eventDetail.allAvailable')
              ) : (
                t('eventDetail.mostAvailable')
              )
            ) : (
              <Skeleton width={200} height={20} />
            )}
          </span>
          {!isPending ? (
            <IconChevronRight
              size={24}
              className={cn('text-gray-30', {
                'text-success-20': isAllMembersAvailable,
              })}
            />
          ) : (
            <Skeleton width={20} height={20} circle />
          )}
        </div>

        {!isPending ? (
          <div
            className={cn(
              'overflow-hidden text-ellipsis whitespace-nowrap rounded-2xl bg-primary-00 p-4 text-primary-50 text-sm-300 xs:text-md-300 sm:text-lg-300',
              {
                'bg-gray-00 text-success-60': isAllMembersAvailable,
                'bg-gray-05 text-gray-40': recommendTimes?.length === 0,
              },
            )}
          >
            {recommendTimes &&
              event &&
              (recommendTimes.length === 0 ? (
                <>{t('common.noOneSchedule')}</>
              ) : (
                <>
                  <span>
                    {event.category === 'DATE'
                      ? dayjs(
                          recommendTimes[0].time_point,
                          'YYYY.MM.DD',
                        ).format('YYYY.MM.DD (ddd)')
                      : dayjs()
                          .day(
                            weekdaysShortKo.findIndex(
                              (weekday) =>
                                weekday === recommendTimes[0].time_point,
                            ),
                          )
                          .format('dddd')}
                  </span>
                  <span className="ml-2">
                    {recommendTimes[0].start_time} -{' '}
                    {recommendTimes[0].end_time}
                  </span>
                </>
              ))}
          </div>
        ) : (
          <Skeleton height={42} borderRadius={16} />
        )}
      </div>

      {isDialogOpen && <RecommendTimePopUp onClose={handleDialogClose} />}
    </SkeletonTheme>
  );
}
