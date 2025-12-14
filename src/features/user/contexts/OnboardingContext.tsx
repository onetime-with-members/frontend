'use client';

import { getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { createContext, useState } from 'react';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';

import { useCreateUserMutation } from '../api/user.query';
import { defaultOnboardingValue } from '../constants';
import useOnboardingForm from '../hooks/useOnboardingForm';
import { OnboardingSchema } from '../types';
import { REDIRECT_URL } from '@/features/auth/constants';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import { useRouter } from '@/i18n/navigation';

export const OnboardingContext = createContext<{
  pageIndex: number;
  moveToPrevPage: () => void;
  moveToNextPage: () => void;
  name: string;
  registerToken: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onboardingValue: OnboardingSchema;
  setOnboardingValue: UseFormSetValue<OnboardingSchema>;
}>({
  pageIndex: 0,
  moveToPrevPage: () => {},
  moveToNextPage: () => {},
  name: '',
  registerToken: '',
  handleSubmit: () => {},
  onboardingValue: defaultOnboardingValue,
  setOnboardingValue: () => {},
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

  const locale = useLocale();
  const router = useRouter();

  const homeUrl = useHomeUrl();

  const redirectUrl = getCookie(REDIRECT_URL);

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
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
