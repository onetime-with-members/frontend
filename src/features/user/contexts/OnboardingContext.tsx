'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { createContext, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';

import { useCreateUserMutation } from '../api/user.query';
import { defaultOnboardingValue } from '../constants';
import useOnboardingForm from '../hooks/useOnboardingForm';
import { OnboardingSchema } from '../types';
import { REDIRECT_URL } from '@/features/auth/constants';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import { useRouter } from '@/i18n/navigation';
import { useProgressRouter } from '@/navigation';

export const OnboardingContext = createContext<{
  pageIndex: number;
  moveToPrevPage: () => void;
  moveToNextPage: () => void;
  name: string;
  registerToken: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onboardingValue: OnboardingSchema;
  setOnboardingValue: UseFormSetValue<OnboardingSchema>;
  showCompleteModal: boolean;
  setShowCompleteModal: (show: boolean) => void;
  finishOnboardingAndGoHome: () => void;
}>({
  pageIndex: 0,
  moveToPrevPage: () => {},
  moveToNextPage: () => {},
  name: '',
  registerToken: '',
  handleSubmit: () => {},
  onboardingValue: defaultOnboardingValue,
  setOnboardingValue: () => {},
  showCompleteModal: false,
  setShowCompleteModal: () => {},
  finishOnboardingAndGoHome: () => {},
});

export default function OnboardingContextProvider({
  children,
  name,
  registerToken,
}: {
  children: React.ReactNode;
  name: string;
  registerToken: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const progressRouter = useProgressRouter();
  const homeUrl = useHomeUrl();

  const redirectUrl = getCookie(REDIRECT_URL);

  const finishOnboardingAndGoHome = useCallback(() => {
    const url = getCookie(REDIRECT_URL);
    if (url) {
      deleteCookie(REDIRECT_URL);
      progressRouter.push(url as string);
    } else {
      progressRouter.push(homeUrl);
    }
  }, [homeUrl, progressRouter]);

  const { handleSubmit, watch, setValue } = useOnboardingForm({ name });

  const { createUser } = useCreateUserMutation();

  function moveToPrevPage() {
    setPageIndex((prev) => prev - 1);
  }

  function moveToNextPage() {
    setPageIndex((prev) => prev + 1);
  }

  const onSubmit: SubmitHandler<OnboardingSchema> = async (data) => {
    try {
      await createUser({
        ...data,
        registerToken,
        language: locale === 'ko' ? 'KOR' : 'ENG',
      });
      moveToNextPage();
    } catch {
      router.replace(`/login?redirect_url=${redirectUrl || homeUrl}`);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        pageIndex,
        moveToPrevPage,
        moveToNextPage,
        name,
        registerToken,
        handleSubmit: handleSubmit(onSubmit),
        onboardingValue: watch(),
        setOnboardingValue: setValue,
        showCompleteModal,
        setShowCompleteModal,
        finishOnboardingAndGoHome,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
