import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import LoginAlert from '../shared/LoginAlert';
import SharePopUp from '../shared/SharePopUp';
import { BadgeFloatingBottomButton } from '@/app/(common)/events/[id]/_ui/button';
import { FooterContext } from '@/contexts/footer';
import { eventQueryOptions } from '@/features/events/api/events.option';
import { scheduleDetailQueryOptions } from '@/lib/api/query-options';
import { useAuth } from '@/lib/auth/auth.client';
import cn from '@/lib/cn';
import { defaultEvent, defaultScheduleDetail } from '@/lib/constants';
import { useProgressRouter } from '@/navigation';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function BottomButtonsForDesktop() {
  const [isLoginAlertOpen, setIsLoginAlertOpen] = useState(false);
  const [isSharePopUpOpen, setIsSharePopUpOpen] = useState(false);

  const { isFooterShown } = useContext(FooterContext);

  const progressRouter = useProgressRouter();
  const params = useParams<{ id: string }>();
  const t = useTranslations('eventDetail');

  const { isLoggedIn } = useAuth();

  const { data: event } = useQuery({ ...eventQueryOptions(params.id) });
  const { data: scheduleDetailData } = useQuery({
    ...scheduleDetailQueryOptions({ event: event || defaultEvent, isLoggedIn }),
  });
  const scheduleDetail = scheduleDetailData || defaultScheduleDetail;

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
