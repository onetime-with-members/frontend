import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { TALK_CALENDAR_ERROR, TALK_CALENDAR_SUCCESS } from '../../constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import useToast from '@/hooks/useToast';
import { useSearchParams } from 'next/navigation';

export default function useTalkCalendarComplete() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const t = useTranslations('event.pages.EventDetailPage.toast');

  const toast = useToast();
  const { removeSearchParams } = useChangeSearchParams();

  const calendarStatus = searchParams.get('calendar_status');

  function handleModalClose() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (calendarStatus) {
      if (calendarStatus === TALK_CALENDAR_SUCCESS) {
        setIsModalOpen(true);
      }
      if (calendarStatus === TALK_CALENDAR_ERROR) {
        toast(t('talkCalendarError'), {
          type: 'error',
        });
      }
      removeSearchParams(['calendar_status']);
    }
  }, [calendarStatus]);

  return { isModalOpen, handleModalClose };
}
