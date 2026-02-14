import { useEffect } from 'react';

import { TALK_CALENDAR_SUCCESS } from '../../constants';
import useChangeSearchParams from '@/hooks/useChangeSearchParams';
import useToast from '@/hooks/useToast';
import { useSearchParams } from 'next/navigation';

export default function useTalkCalendarToast() {
  const searchParams = useSearchParams();

  const toast = useToast();
  const { removeSearchParams } = useChangeSearchParams();

  const toastCode = searchParams.get('toast');

  useEffect(() => {
    if (toastCode === TALK_CALENDAR_SUCCESS) {
      toast('톡캘린더 일정이 성공적으로 생성되었습니다.');
      removeSearchParams(['toast']);
    }
  }, [toastCode]);
}
