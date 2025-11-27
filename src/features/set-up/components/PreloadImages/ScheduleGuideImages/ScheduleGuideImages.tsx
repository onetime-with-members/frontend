'use client';

import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import Image from 'next/image';

export default function ScheduleGuideImages() {
  const [shouldPreload, setShouldPreload] = useState(false);

  useEffect(() => {
    async function setShouldPreloadByCookie() {
      const hasScheduleGuideModalCookie = !!(await getCookie(
        'schedule-guide-modal',
      ));
      setShouldPreload(!hasScheduleGuideModalCookie);
    }
    setShouldPreloadByCookie();
  }, []);

  return (
    shouldPreload && (
      <>
        <Image
          src="/images/guide/schedule-modal-1.png"
          alt=""
          width={1}
          height={1}
          priority
          data-testid="preloaded-schedule-guide-modal-1"
        />
        <Image
          src="/images/guide/schedule-modal-2.png"
          alt=""
          width={1}
          height={1}
          priority
          data-testid="preloaded-schedule-guide-modal-2"
        />
      </>
    )
  );
}
