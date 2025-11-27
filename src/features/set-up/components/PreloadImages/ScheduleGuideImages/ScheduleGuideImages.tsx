'use client';

import { getCookie } from 'cookies-next';
import { Locale } from 'next-intl';
import { useEffect, useState } from 'react';

import { SCHEDULE_GUIDE_MODAL } from '@/features/schedule/constants';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function ScheduleGuideImages() {
  const [shouldPreload, setShouldPreload] = useState(false);

  const params = useParams<{ locale: Locale }>();

  useEffect(() => {
    async function setShouldPreloadByCookie() {
      const hasScheduleGuideModalCookie =
        !!(await getCookie(SCHEDULE_GUIDE_MODAL));
      setShouldPreload(!hasScheduleGuideModalCookie);
    }
    setShouldPreloadByCookie();
  }, []);

  return (
    shouldPreload && (
      <>
        <Image
          src={`/images/guide/schedule-modal-1-${params.locale}.png`}
          alt=""
          width={1}
          height={1}
          priority
          data-testid="schedule-guide-modal-1-preload"
        />
        <Image
          src={`/images/guide/schedule-modal-2-${params.locale}.png`}
          alt=""
          width={1}
          height={1}
          priority
          data-testid="schedule-guide-modal-2-preload"
        />
      </>
    )
  );
}
