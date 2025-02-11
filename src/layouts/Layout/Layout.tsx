import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Footer from './Footer/Footer';
import ScrollToTop from './ScrollToTop/ScrollToTop';
import { FooterContext } from '@/contexts/FooterContext';
import { PolicyType } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';

export default function Layout() {
  const { isFooterVisible } = useContext(FooterContext);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('access-token') !== null;

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
  }, [location, policyData, isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>
          OneTime | 원타임으로 쉽고 빠르게 모두가 되는 시간을 찾으세요
        </title>
      </Helmet>
      <ScrollToTop />
      <div
        className={cn('flex h-full min-h-[100vh] flex-col', {
          'min-h-[110vh]': isFooterVisible,
        })}
      >
        <Outlet />
      </div>
      {isFooterVisible && <Footer />}
    </>
  );
}
