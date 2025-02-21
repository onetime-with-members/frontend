import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

export default function OnboardingPage() {
  const [page, setPage] = useState(1);
  const [value, setValue] = useState<OnboardingValueType>({
    register_token: '',
    nickname: '',
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
    sleep_start_time: '23:00',
    sleep_end_time: '07:00',
  });

  const { setIsFooterVisible } = useContext(FooterContext);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

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
      const redirectUrl = localStorage.getItem('redirect-url');
      navigate(`/login?redirect_url=${redirectUrl}`);
    },
  });

  function handleNextButtonClick(disabled: boolean) {
    if (disabled) return;
    setPage((prevPage) => prevPage + 1);
  }

  function handleBackButtonClick() {
    if (page === 1) {
      return navigate(-1);
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
      return navigate('/login');
    }

    setValue((prevValue) => ({
      ...prevValue,
      nickname: searchParams.get('name') as string,
      register_token: searchParams.get('register_token') as string,
    }));

    const newSearchParams = new URLSearchParams();
    newSearchParams.delete('register_token');
    newSearchParams.delete('name');
    setSearchParams(newSearchParams);
  }, []);

  useEffect(() => {
    setIsFooterVisible(false);
    return () => {
      setIsFooterVisible(true);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('onboarding.onboarding')} | OneTime</title>
      </Helmet>

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
