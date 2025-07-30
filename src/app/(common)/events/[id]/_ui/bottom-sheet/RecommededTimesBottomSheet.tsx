import { AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { Drawer } from 'vaul';

import { LoginAlert } from '../alert';
import { BottomButtonForMobile } from '../button';
import { EventSectionHeading } from '../heading';
import SharePopUp from '../pop-up';
import MobileRecommededTimeItem from './MobileRecommededTimeItem';
import ClockIcon from '@/components/icon/ClockIcon';
import { FooterContext } from '@/contexts/footer';
import useClientWidth from '@/hooks/useClientWidth';
import {
  eventQueryOptions,
  filteredRecommendedTimesQueryOptions,
  recommendedTimesQueryOptions,
  scheduleDetailQueryOptions,
  schedulesQueryOptions,
} from '@/lib/api/query-options';
import { useAuth } from '@/lib/auth/auth.client';
import cn from '@/lib/cn';
import {
  breakpoint,
  defaultEvent,
  defaultScheduleDetail,
} from '@/lib/constants';
import { useProgressRouter } from '@/navigation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const snapPoints = ['170px', '500px'];

export default function RecommededTimesBottomSheet() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();

  const { isLoggedIn } = useAuth();
  const clientWidth = useClientWidth();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: schedules } = useQuery({
    ...schedulesQueryOptions(event || defaultEvent),
  });
  const { data: scheduleDetailData } = useQuery({
    ...scheduleDetailQueryOptions({ event: event || defaultEvent, isLoggedIn }),
  });
  const scheduleDetail = scheduleDetailData || defaultScheduleDetail;
  const { data: recommendedTimesData } = useQuery({
    ...recommendedTimesQueryOptions(params.id),
  });
  const { data: filteredRecommendedTimesData } = useQuery({
    ...filteredRecommendedTimesQueryOptions(params.id),
  });
  const recommendedTimes =
    filteredRecommendedTimesData && filteredRecommendedTimesData.length > 0
      ? filteredRecommendedTimesData
      : recommendedTimesData;

  const hasUserSchedule = isLoggedIn
    ? scheduleDetail.schedules.length !== 0 &&
      scheduleDetail.schedules.every((schedule) => schedule.times.length !== 0)
    : false;

  const shouldBottomSheetShown = !isFooterShown;

  async function handleBottomButtonClick() {
    if (isLoggedIn) {
      progressRouter.push(`/events/${params.id}/schedules/new`);
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  return (
    <>
      {clientWidth < breakpoint.md && (
        <Drawer.Root
          snapPoints={snapPoints}
          activeSnapPoint={snap}
          setActiveSnapPoint={setSnap}
          open={shouldBottomSheetShown}
          handleOnly
          dismissible={false}
          modal={!shouldBottomSheetShown}
        >
          <Drawer.Portal>
            <Drawer.Content
              data-testid="content"
              className="fixed bottom-0 left-0 right-0 z-50 h-full max-h-[97%] overflow-hidden rounded-t-3xl bg-gray-00 shadow-[0_-6px_40px_0_rgba(49,51,63,0.20)]"
            >
              <div className="pointer-events-none absolute left-0 right-0 top-3 mx-auto h-1.5 w-12 rounded-full bg-gray-10" />
              <Drawer.Handle
                className="py-3"
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  opacity: 1,
                }}
              />
              <div
                className={cn('flex flex-col gap-3 px-4', {
                  'overflow-y-auto': snap === 1,
                  'overflow-hidden': snap !== 1,
                })}
              >
                <Drawer.Title>
                  <EventSectionHeading
                    icon={<ClockIcon className="mr-1" />}
                    className="px-0 py-0"
                  >
                    추천 시간
                  </EventSectionHeading>
                </Drawer.Title>
                <div className="flex flex-col gap-3">
                  {recommendedTimes?.map((recommendedTime, index) => (
                    <MobileRecommededTimeItem
                      key={index}
                      recommendedTime={recommendedTime}
                    />
                  ))}
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}

      <AnimatePresence>
        {shouldBottomSheetShown && (
          <BottomButtonForMobile
            schedules={schedules || []}
            hasUserSchedule={hasUserSchedule}
            onShareButtonClick={() => setIsSharePopUpOpen(true)}
            onEditButtonClick={handleBottomButtonClick}
          />
        )}
      </AnimatePresence>

      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isSharePopUpOpen && <SharePopUp setIsOpen={setIsSharePopUpOpen} />}
    </>
  );
}
