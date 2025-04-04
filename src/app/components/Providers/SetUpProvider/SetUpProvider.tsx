'use client';

import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import useBarBannerInit from '@/hooks/store/useBarBannerInit';
import useMyScheduleStoreInit from '@/hooks/store/useMyScheduleStoreInit';
import useSleepTimeInit from '@/hooks/store/useSleepTimeInit';
import useWeekdayInit from '@/hooks/store/useWeekdayInit';
import useLocalStorageClear from '@/hooks/useLocalStorageClear';
import useLocalStorageSetUp from '@/hooks/useLocalStorageSetUp';
import useShortURLRedirect from '@/hooks/useShortURLRedirect';
import { useRouter } from '@/navigation';
import { PolicyType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
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
  useMyScheduleStoreInit();
  useSleepTimeInit();
  useWeekdayInit();
  useBarBannerInit();

  useLocalStorageClear();
  useLocalStorageSetUp();
  useShortURLRedirect();

  const router = useRouter();
  const pathname = usePathname();

  const isLoggedIn = !!getCookie('access-token');

  const { data: policyData } = useQuery<PolicyType>({
    queryKey: ['users', 'policy'],
    queryFn: async () => {
      const res = await axios.get('/users/policy');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!policyData || !isLoggedIn) return;
    if (
      !policyData.service_policy_agreement ||
      !policyData.privacy_policy_agreement
    ) {
      if (!pathname.startsWith('/policy') && pathname !== '/withdraw') {
        router.push('/policy/edit');
      }
    }
  }, [pathname, policyData, isLoggedIn, router]);

  return children;
}
