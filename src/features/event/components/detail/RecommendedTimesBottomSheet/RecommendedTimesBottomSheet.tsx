import { AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';

import BottomButtonForMobile from './BottomButtonForMobile';
import MainBottomSheet from './MainBottomSheet';
import { breakpoint } from '@/constants';
import { useEventQuery } from '@/features/event/api/event.query';
import LoginAlert from '@/features/event/components/detail/shared/LoginAlert';
import SharePopUp from '@/features/event/components/detail/shared/SharePopUp';
import useIsEventEdited from '@/features/event/hooks/useIsEventEdited';
import { useSchedulesQuery } from '@/features/schedule/api/schedule.query';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import useClientWidth from '@/hooks/useClientWidth';
import { useAuth } from '@/lib/auth';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function RecommendedTimesBottomSheet() {
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);

  const params = useParams<{ id: string }>();
  const progressRouter = useProgressRouter();

  const { isLoggedIn } = useAuth();
  const clientWidth = useClientWidth();
  const isEventEdited = useIsEventEdited();

  const { data: event } = useEventQuery(params.id);
  const { data: schedules } = useSchedulesQuery(event);

  const shouldBottomButtonShown = !isFooterShown;
  const shouldBottomSheetShown =
    !isFooterShown && schedules?.length !== 0 && clientWidth < breakpoint.md;

  async function handleBottomButtonClick() {
    if (isLoggedIn) {
      progressRouter.push(`/events/${params.id}/schedules/new`);
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  return (
    <>
      <AnimatePresence>
        {shouldBottomSheetShown && <MainBottomSheet />}
      </AnimatePresence>
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
