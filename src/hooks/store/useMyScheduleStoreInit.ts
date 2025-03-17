import { useEffect } from 'react';

import { useMyScheduleActions } from '@/stores/my-schedule';
import { usePathname } from 'next/navigation';

export default function useMyScheduleStoreInit() {
  const { resetMySchedule } = useMyScheduleActions();

  const pathname = usePathname();

  useEffect(() => {
    const locationsNotToReset = [
      '/mypage/schedules/edit',
      '/mypage/schedules/everytime/edit',
    ];
    if (locationsNotToReset.includes(pathname)) return;
    resetMySchedule();
  }, [resetMySchedule, pathname]);
}
