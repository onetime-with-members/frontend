'use client';

import dayjs from 'dayjs';
import { useEffect } from 'react';

import useLocalStorageClear from '@/hooks/useLocalStorageClear';
import useLocalStorageSetUp from '@/hooks/useLocalStorageSetUp';
import useShortURLRedirect from '@/hooks/useShortURLRedirect';
import { auth } from '@/lib/auth';
import { fetchPolicy } from '@/lib/data';
import { useRouter } from '@/navigation';
import 'dayjs/locale/ko';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';
import { usePathname } from 'next/navigation';

dayjs.locale('en');
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(weekday);

dayjs.updateLocale('ko', {
  relativeTime: {
    future: '%s 후',
    past: '%s 전',
    s: '1초',
    ss: '%d초',
    m: '1분',
    mm: '%d분',
    h: '1시간',
    hh: '%d시간',
    d: '1일',
    dd: '%d일',
    M: '1개월',
    MM: '%d개월',
    y: '1년',
    yy: '%d년',
  },
});

interface SetUpProviderProps {
  children: React.ReactNode;
}

export default function SetUpProvider({ children }: SetUpProviderProps) {
  useLocalStorageClear();
  useLocalStorageSetUp();
  useShortURLRedirect();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkPolicy() {
      if (pathname.startsWith('/policy') || pathname === '/withdraw') return;
      if (!(await auth())) return;
      const policy = await fetchPolicy();
      if (policy.service_policy_agreement && policy.privacy_policy_agreement)
        return;
      router.push('/policy/edit');
    }
    checkPolicy();
  }, [pathname, router]);

  return children;
}
