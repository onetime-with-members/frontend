import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import LoginAlert from '../shared/LoginAlert';
import SharePopUp from '../shared/SharePopUp';
import BadgeFloatingBottomButton from './BadgeFloatingBottomButton';
import { FooterContext } from '@/contexts/footer';
import { useEventQuery } from '@/features/event/api/events.query';
import { useScheduleDetailQuery } from '@/features/schedule/api/schedule.query';
import { useAuth } from '@/lib/auth/auth.client';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import { useParams } from 'next/navigation';

export default function BottomButtonsForDesktop() {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { isLoggedIn } = useAuth();

  const { data: event } = useEventQuery(params.id);
  const { data: scheduleDetail } = useScheduleDetailQuery({
    event,
    isLoggedIn,
  });

  const hasUserSchedule = isLoggedIn
    ? scheduleDetail.schedules.length !== 0 &&
      scheduleDetail.schedules.every((schedule) => schedule.times.length !== 0)
    : false;

  async function handleBottomButtonClick() {
    if (isLoggedIn) {
      progressRouter.push(`/events/${params.id}/schedules/new`);
    } else {
      setIsLoginAlertOpen(true);
    }
  }

  function handleSendButtonClick() {
    setIsSharePopUpOpen(true);
  }

  return (
    <>
      <BadgeFloatingBottomButton
        name={hasUserSchedule ? t('editSchedule') : t('addSchedule')}
        variant="black"
        icon={hasUserSchedule ? 'edit' : 'plus'}
        onNewScheduleButtonClick={handleBottomButtonClick}
        onSendButtonClick={handleSendButtonClick}
        className={cn('hidden duration-150 md:flex', {
          'pointer-events-none opacity-0': isFooterShown,
        })}
      />
      {isLoginAlertOpen && <LoginAlert setIsOpen={setIsLoginAlertOpen} />}
      {isSharePopUpOpen && <SharePopUp setIsOpen={setIsSharePopUpOpen} />}
    </>
  );
}
