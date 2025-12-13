'use client';

import { getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import NicknameFormScreen from './_screen/nickname-form-screen';
import PolicyScreen from './_screen/policy-screen';
import SleepTimeScreen from './_screen/sleep-time-screen';
import WelcomeScreen from './_screen/welcome-screen';
import NavBar from '@/components/NavBar';
import { REDIRECT_URL } from '@/features/auth/constants';
import useHomeUrl from '@/features/home/hooks/useHomeUrl';
import { FooterContext } from '@/features/set-up/contexts/FooterContext';
import { defaultOnboardingValue } from '@/features/user/constants';
import { onboardingSchema } from '@/features/user/schemas';
import { OnboardingSchema } from '@/features/user/types';
import { useRouter } from '@/i18n/navigation';
import { createUserAction } from '@/lib/api/actions';
import { useAuth } from '@/lib/auth';
import cn from '@/lib/cn';
import { useProgressRouter } from '@/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function OnboardingPage({
  name,
  registerToken,
}: {
  name: string;
  registerToken: string;
}) {
  const [pageIndex, setPageIndex] = useState(0);

  const { setFooterVisible } = useContext(FooterContext);

  const { handleSubmit, watch, setValue } = useForm<OnboardingSchema>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { ...defaultOnboardingValue, nickname: name },
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const locale = useLocale();

  const progressRouter = useProgressRouter();
  const { signIn } = useAuth();
  const homeUrl = useHomeUrl();

  const redirectUrl = getCookie(REDIRECT_URL);

  const {
    mutateAsync: createUser,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: createUserAction,
    onSuccess: async (data) => {
      await signIn({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setPageIndex((prev) => prev + 1);
    },
    onError: (error) => {
      console.error(error);
      router.replace(`/login?redirect_url=${redirectUrl || homeUrl}`);
    },
  });

  const onSubmit: SubmitHandler<OnboardingSchema> = async (data) => {
    if (isPending || isSuccess) return;
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
          <nav
            className={cn('block h-[4rem] md:hidden', {
              hidden: pageIndex === 3,
            })}
          >
            <div className="fixed left-0 top-0 flex h-[4rem] w-full items-center bg-gray-00 p-4">
              <button
                className="w-6"
                onClick={() => {
                  if (pageIndex === 0) {
                    progressRouter.push(`/login?redirect_url=${redirectUrl}`);
                  } else {
                    setPageIndex((prevPage) => prevPage - 1);
                  }
                }}
              >
                <IconChevronLeft />
              </button>
              <div className="flex flex-1 items-center justify-center">
                <span className="text-gray-90 text-md-300"></span>
              </div>
              <div className="w-6" />
            </div>
          </nav>
          {/* Navigation Bar for Desktop */}
          <div className="hidden md:block">
            <NavBar isAuthHidden={true} />
          </div>
        </header>

        <main className="flex h-full flex-1 flex-col px-4">
          {/* Page Indicator */}
          <div className="mx-auto flex w-full max-w-screen-sm flex-1 flex-col">
            <div
              className={cn('flex items-center gap-2 py-4 md:justify-center', {
                hidden: pageIndex === 3,
              })}
            >
              {Array.from({ length: 3 }, (_, i) => i + 1).map(
                (pageNumber, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex h-6 w-6 items-center justify-center rounded-full bg-gray-05 text-gray-20 text-sm-300',
                      {
                        'bg-primary-40 text-white': pageIndex === index,
                      },
                    )}
                  >
                    {pageNumber}
                  </div>
                ),
              )}
            </div>

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
