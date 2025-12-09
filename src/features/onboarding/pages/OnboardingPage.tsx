'use client';

import { useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useOnboardingMutation } from '../api/onboarding.query';
import AppBar from '../components/Bar/AppBarMobile';
import PageIndicator from '../components/PageIndicator';
import NicknameFormScreen from '../components/Screen/NicknameForm';
import PolicyScreen from '../components/Screen/PolicyScreen';
import SleepTimeScreen from '../components/Screen/SleepTimeScreen';
import WelcomeScreen from '../components/Screen/WelcomeScreen';
import NavBar from '@/components/NavBar';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import { defaultOnboardingValue } from '@/features/user/constants';
import { onboardingSchema } from '@/features/user/schemas';
import { OnboardingSchema } from '@/features/user/types';
import { zodResolver } from '@hookform/resolvers/zod';

export default function OnboardingPage({
  name,
  registerToken,
}: {
  name: string;
  registerToken: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);

  const { setFooterVisible } = useContext(FooterContext);

  const { createUser } = useOnboardingMutation({ setPageIndex });

  const { handleSubmit, watch, setValue } = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { ...defaultOnboardingValue, nickname: name },
  });

  const locale = useLocale();

  // const { mutateAsync: createUser } = useMutation({
  //   mutationFn: createUserAction,
  //   onSuccess: async (data) => {
  //     await signIn({
  //       accessToken: data.access_token,
  //       refreshToken: data.refresh_token,
  //     });
  //     await queryClient.invalidateQueries({ queryKey: ['users'] });
  //     setPageIndex((prev) => prev + 1);
  //   },
  //   onError: (error) => {
  //     console.error(error);
  //     router.replace(`/login?redirect_url=${redirectUrl || homeUrl}`);
  //   },
  // });

  const onSubmit: SubmitHandler<OnboardingSchema> = async (data) => {
    await createUser({
      ...data,
      registerToken,
      language: locale === 'ko' ? 'KOR' : 'ENG',
    });
  };

  useEffect(() => {
    setFooterVisible(false);
    return () => {
      setFooterVisible(true);
    };
  }, [setFooterVisible]);

  return (
    <>
      <div className="flex flex-1 flex-col md:gap-4">
        <header>
          {/* App Bar for Mobile */}
          <AppBar pageIndex={pageIndex} setPageIndex={setPageIndex} />

          {/* Navigation Bar for Desktop */}
          <div className="hidden md:block">
            <NavBar isAuthHidden={true} />
          </div>
        </header>

        <main className="flex h-full flex-1 flex-col px-4">
          {/* Page Indicator */}
          <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col">
            <PageIndicator pageIndex={pageIndex} />

            {/* Screen */}
            {pageIndex === 0 && (
              <PolicyScreen
                page={pageIndex}
                setPage={setPageIndex}
                onboardingValue={watch()}
                setOnboardingValue={setValue}
              />
            )}
            {pageIndex === 1 && (
              <NicknameFormScreen
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                onboardingValue={watch()}
                setOnboardingValue={setValue}
              />
            )}
            {pageIndex === 2 && (
              <SleepTimeScreen
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                onboardingValue={watch()}
                setOnboardingValue={setValue}
                onSubmit={handleSubmit(onSubmit)}
              />
            )}
            {pageIndex === 3 && <WelcomeScreen nickname={watch('nickname')} />}
          </div>
        </main>
      </div>
    </>
  );
}
