import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Footer from './Footer/Footer';
import ScrollToTop from './ScrollToTop/ScrollToTop';
import Toast from '@/components/Toast/Toast';
import { FooterContext } from '@/contexts/FooterContext';
import useMyScheduleStoreInit from '@/hooks/store/useMyScheduleStoreInit';
import useSleepTimeInit from '@/hooks/store/useSleepTimeInit';
import { PolicyType, UserType } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

export default function Layout() {
  const { isFooterVisible } = useContext(FooterContext);

  useMyScheduleStoreInit();
  useSleepTimeInit();

  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

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
      if (
        !location.pathname.startsWith('/policy') &&
        location.pathname !== '/withdraw'
      ) {
        navigate('/policy/edit');
      }
    }
  }, [location, policyData, isLoggedIn, navigate]);

  useEffect(() => {
    dayjs.locale(i18n.language);

    function handleLanguageChange(language: string) {
      dayjs.locale(language);
    }

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem('last-login', user.social_platform);
    i18n.changeLanguage(user.language === 'KOR' ? 'ko' : 'en');
  }, [user, i18n]);

  return (
    <>
      <Helmet>
        <title>OneTime</title>
      </Helmet>

      <ScrollToTop />

      <div
        className={cn('flex h-full min-h-[100vh] flex-col', {
          'min-h-[110vh]': isFooterVisible,
        })}
      >
        <Outlet />
      </div>

      <Toast />
      {isFooterVisible && <Footer />}
    </>
  );
}
