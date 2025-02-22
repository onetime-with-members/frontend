import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import ButtonGroup from './ButtonGroup/ButtonGroup';
import LogoContent from './LogoContent/LogoContent';
import NavBar from '@/components/NavBar/NavBar';
import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export type SocialLoginType = 'naver' | 'kakao' | 'google';

export default function LoginPage() {
  const [lastLogin, setLastLogin] = useState<SocialLoginType | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const hasTokens =
    !!localStorage.getItem('access-token') &&
    !!localStorage.getItem('refresh-token');

  const { data, isError } = useQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await axios.get('/users/profile');
      return res.data.payload;
    },
    enabled: hasTokens,
  });

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, isError]);

  useEffect(() => {
    const registerToken = searchParams.get('register_token');
    const name = searchParams.get('name');
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const redirectUrl = searchParams.get('redirect_url');

    if (redirectUrl) {
      localStorage.setItem('redirect-url', redirectUrl);
    }

    if (registerToken || name) {
      const urlSearchParams = new URLSearchParams([
        ...(registerToken ? [['register_token', registerToken]] : []),
        ...(name ? [['name', name]] : []),
      ]);
      navigate(`/onboarding?${urlSearchParams.toString()}`);
    } else if (accessToken && refreshToken) {
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);

      const localRedirectUrl = localStorage.getItem('redirect-url');
      localStorage.removeItem('redirect-url');
      location.href = localRedirectUrl || '/';
    }

    if (lastLogin) {
      localStorage.setItem('last-login', lastLogin);
    }

    return () => {
      localStorage.removeItem('redirect-url');
    };
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>{t('login.login')} | OneTime</title>
      </Helmet>
      <div className="flex h-screen flex-col">
        <NavBar />
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="mx-auto flex w-full max-w-[22rem] -translate-y-12 flex-col gap-12">
            <LogoContent />
            <ButtonGroup setLastLogin={setLastLogin} />
          </div>
        </div>
      </div>
    </>
  );
}
