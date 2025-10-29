import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import LoginAlert from '../shared/LoginAlert';
import SharePopUp from '../shared/SharePopUp';
import BadgeFloatingBottomButton from './BadgeFloatingBottomButton';
import { FooterContext } from '@/contexts/footer';
import useIsEventEdited from '@/features/event/hooks/useIsEventEdited';
import { useAuth } from '@/lib/auth';
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
  const isEventEdited = useIsEventEdited();

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
        name={isEventEdited ? t('editSchedule') : t('addSchedule')}
        variant="black"
        icon={isEventEdited ? 'edit' : 'plus'}
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
