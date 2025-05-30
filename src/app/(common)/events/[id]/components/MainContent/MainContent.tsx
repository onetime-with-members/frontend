import BottomContentsForMobile from './BottomContentsForMobile/BottomContentsForMobile';
import RightContentsForDesktop from './RightContentsForDesktop/RightContentsForDesktop';
import SkeletonTimeBlockBoard from '@/components/skeleton/SkeletonTimeBlockBoard/SkeletonTimeBlockBoard';
import TimeBlockBoard from '@/components/time-block-board/TimeBlockBoard/TimeBlockBoard';
import { useScheduleQuery } from '@/queries/schedule.queries';
import useBarBannerStore from '@/stores/bar-banner';
import { EventType } from '@/types/event.type';
import cn from '@/utils/cn';

interface MainContentProps {
  event: EventType | undefined;
  isEventPending: boolean;
}

export default function MainContent({
  event,
  isEventPending,
}: MainContentProps) {
  const isBarBannerShown = useBarBannerStore((state) => state.isShown);

  const { isLoading: isScheduleLoading, data: schedules } =
    useScheduleQuery(event);

  return (
    <main className="mx-auto flex w-full max-w-[calc(768px+2rem)] flex-col gap-6 bg-gray-05 px-4 pb-16 pt-6 md:px-6">
      <div className="flex gap-6">
        <div className="w-full md:w-[55%]">
          {isEventPending || isScheduleLoading || !event || !schedules ? (
            <SkeletonTimeBlockBoard count={6} />
          ) : (
            <TimeBlockBoard
              event={event}
              schedules={schedules}
              backgroundColor="white"
              topContentClassName={cn('top-[123px] bg-gray-05 md:top-[136px]', {
                'top-[179px] md:top-[192px]': isBarBannerShown,
              })}
            />
          )}
        </div>

        <RightContentsForDesktop />
      </div>

      <BottomContentsForMobile />
    </main>
  );
}
