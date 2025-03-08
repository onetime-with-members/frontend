'use client';

import { getCookie, setCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import useMyScheduleStoreInit from '@/hooks/store/useMyScheduleStoreInit';
import useSleepTimeInit from '@/hooks/store/useSleepTimeInit';
import { PolicyType, UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

interface SetUpProviderProps {
  children: React.ReactNode;
}

export default function SetUpProvider({ children }: SetUpProviderProps) {
  useMyScheduleStoreInit();
  useSleepTimeInit();

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const isLoggedIn = !!getCookie('access-token');

  const { data: user } = useQuery<UserType>({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: isLoggedIn,
  });

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

  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem('last-login', user.social_platform);
    setCookie('locale', user.language === 'KOR' ? 'ko' : 'en');
  }, [user]);

  return <>{children}</>;
}
