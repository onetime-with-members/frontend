import { AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';
import { Drawer } from 'vaul';

import BottomButtonForMobile from './BottomButtonForMobile';
import MobileRecommendedTimeItem from './MobileRecommendedTimeItem';
import ClockIcon from '@/components/icon/ClockIcon';
import { EventParticipantFilterContext } from '@/contexts/event-participant-filter';
import { FooterContext } from '@/contexts/footer';
import { useEventQuery } from '@/features/event/api/events.query';
import LoginAlert from '@/features/event/components/detail/shared/LoginAlert';
import SectionHeading from '@/features/event/components/detail/shared/SectionHeading';
import SharePopUp from '@/features/event/components/detail/shared/SharePopUp';
import useIsEventEdited from '@/features/event/hooks/useIsEventEdited';
import { useSchedulesQuery } from '@/features/schedule/api/schedule.query';
import useClientWidth from '@/hooks/useClientWidth';
import { useAuth } from '@/lib/auth/auth.client';
import cn from '@/lib/cn';
import { breakpoint } from '@/lib/constants';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

const snapPoints = ['170px', '500px'];

export default function RecommendedTimesBottomSheet() {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);
  const { recommendedTimes } = useContext(EventParticipantFilterContext);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();
  const t = useTranslations('eventDetail');

  const { isLoggedIn } = useAuth();
  const clientWidth = useClientWidth();
  const isEventEdited = useIsEventEdited();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules } = useSchedulesQuery(event);

  const shouldBottomButtonShown = !isFooterShown;
  const shouldBottomSheetShown = !isFooterShown && schedules?.length !== 0;

  const snapIndex = snapPoints.findIndex((snapPoint) => snapPoint === snap);

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
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-40 h-full max-h-[97%] overflow-hidden rounded-t-3xl bg-gray-00 shadow-[0_-6px_40px_0_rgba(49,51,63,0.20)]">
              <div className="pointer-events-none absolute left-0 right-0 top-3 mx-auto h-1.5 w-12 rounded-full bg-gray-10" />
              <Drawer.Handle
                className="py-3"
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  opacity: 1,
                }}
              />
              <div className="flex h-[454px] flex-col">
                <Drawer.Title className="px-4 pb-3">
                  <SectionHeading
                    icon={<ClockIcon className="mr-1" />}
                    className="px-0 py-0"
                  >
                    {t('recommendedTime', { count: recommendedTimes?.length })}
                  </SectionHeading>
                </Drawer.Title>
                <div
                  className={cn('flex flex-1 flex-col gap-3 px-4 pb-12', {
                    'overflow-y-auto': snapIndex === 1,
                    'overflow-hidden': snapIndex !== 1,
                  })}
                >
                  {recommendedTimes?.map((recommendedTime, index) => (
                    <MobileRecommendedTimeItem
                      key={index}
                      recommendedTime={recommendedTime}
                    />
                  ))}
                </div>
                <div className="h-[88px]" />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      )}

      <AnimatePresence>
        {shouldBottomButtonShown && (
          <BottomButtonForMobile
            schedules={schedules || []}
            isEventEdited={isEventEdited}
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
