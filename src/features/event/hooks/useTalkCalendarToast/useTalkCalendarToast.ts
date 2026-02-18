import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { TALK_CALENDAR_ERROR, TALK_CALENDAR_SUCCESS } from '../../constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import useToast from '@/hooks/useToast';
import { useSearchParams } from 'next/navigation';

export default function useTalkCalendarToast() {
  const searchParams = useSearchParams();
  const t = useTranslations('toast');

  const toast = useToast();
  const { removeSearchParams } = useChangeSearchParams();

  const toastCode = searchParams.get('toast');

  useEffect(() => {
    if (toastCode) {
      if (toastCode === TALK_CALENDAR_SUCCESS) {
        toast(t('talkCalendarSuccess'));
      }
      if (toastCode === TALK_CALENDAR_ERROR) {
        toast(t('talkCalendarError'), { type: 'error' });
      }
      removeSearchParams(['toast']);
    }
  }, [toastCode]);
}
