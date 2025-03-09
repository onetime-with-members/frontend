import { useEffect } from 'react';

import { useMyScheduleActions } from '@/stores/my-schedule';

export default function useMyScheduleStoreInit() {
  const { resetMySchedule } = useMyScheduleActions();

  useEffect(() => {
    const locationsNotToReset = [
      '/mypage/schedules/edit',
      '/mypage/schedules/everytime/edit',
    ];
    if (locationsNotToReset.includes(location.pathname)) return;
    resetMySchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetMySchedule, location.pathname]);
}
