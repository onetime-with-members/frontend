'use client';

import { useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import NicknameFormScreen from './NicknameFormScreen/NicknameFormScreen';
import PageIndicator from './PageIndicator/PageIndicator';
import PolicyScreen from './PolicyScreen/PolicyScreen';
import SleepTimeScreen from './SleepTimeScreen/SleepTimeScreen';
import TopAppBarForMobile from './TopAppBarForMobile/TopAppBarForMobile';
import TopNavBarForDesktop from './TopNavBarForDesktop/TopNavBarForDesktop';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';
import { FooterContext } from '@/contexts/FooterContext';
import { OnboardingValueType } from '@/types/user.type';
import axios from '@/utils/axios';
import cn from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OnboardingPage() {
  const locale = useLocale();

  const [page, setPage] = useState(1);
  const [value, setValue] = useState<OnboardingValueType>({
    register_token: '',
    nickname: '',
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
    sleep_start_time: '23:00',
    sleep_end_time: '07:00',
    language: locale === 'ko' ? 'KOR' : 'ENG',
  });

  const { setHasFooter } = useContext(FooterContext);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl =
    typeof localStorage !== 'undefined' && localStorage.getItem('redirect-url');

  const onboarding = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/users/onboarding', value);
      return res.data;
    },
    onSuccess: (data) => {
      const { access_token: accessToken, refresh_token: refreshToken } =
        data.payload;
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);
      setPage((prevPage) => prevPage + 1);
    },
    onError: () => {
      router.push(`/login?redirect_url=${redirectUrl}`);
    },
  });

  function handleNextButtonClick(disabled: boolean) {
    if (disabled) return;
    setPage((prevPage) => prevPage + 1);
  }

  function handleBackButtonClick() {
    if (page === 1) {
      router.push(`/login?redirect_url=${redirectUrl}`);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  }

  function handleSubmitButtonClick(disabled: boolean) {
    if (disabled) return;
    onboarding.mutate();
  }

  useEffect(() => {
    if (!searchParams.get('register_token') || !searchParams.get('name')) {
      return router.push('/login');
    }

    setValue((prevValue) => ({
      ...prevValue,
      nickname: searchParams.get('name') as string,
      register_token: searchParams.get('register_token') as string,
    }));

    const newSearchParams = new URLSearchParams();
    newSearchParams.delete('register_token');
    newSearchParams.delete('name');
    router.push(`/onboarding?${newSearchParams.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    setHasFooter(false);
    return () => {
      setHasFooter(true);
    };
  }, [setHasFooter]);

  return (
    <>
      <div className="flex flex-1 flex-col md:gap-4">
        <header>
          <TopAppBarForMobile
            handleBackButtonClick={handleBackButtonClick}
            className={cn({
              hidden: page === 4,
            })}
          />
          <TopNavBarForDesktop />
        </header>

        <main className="flex h-full flex-1 flex-col px-4">
          <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col">
            <PageIndicator
              pageMaxNumber={3}
              page={page}
              className={cn({
                hidden: page === 4,
              })}
            />

            <PolicyScreen
              isVisible={page === 1}
              page={page}
              value={value}
              setValue={setValue}
              handleNextButtonClick={handleNextButtonClick}
              handleBackButtonClick={handleBackButtonClick}
            />
            <NicknameFormScreen
              isVisible={page === 2}
              page={page}
              value={value}
              setValue={setValue}
              handleNextButtonClick={handleNextButtonClick}
              handleBackButtonClick={handleBackButtonClick}
            />
            <SleepTimeScreen
              isVisible={page === 3}
              page={page}
              value={value}
              setValue={setValue}
              handleSubmitButtonClick={handleSubmitButtonClick}
              handleBackButtonClick={handleBackButtonClick}
            />
            <WelcomeScreen isVisible={page === 4} value={value} />
          </div>
        </main>
      </div>
    </>
  );
}
