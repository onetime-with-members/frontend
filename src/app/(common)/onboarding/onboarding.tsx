'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import NicknameFormScreen from './_screen/nickname-form-screen';
import PolicyScreen from './_screen/policy-screen';
import SleepTimeScreen from './_screen/sleep-time-screen';
import WelcomeScreen from './_screen/welcome-screen';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import { createUserApi } from '@/lib/api/actions';
import cn from '@/lib/cn';
import dayjs from '@/lib/dayjs';
import { OnboardingValueType, Session } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function OnboardingPage({
  name,
  registerToken,
}: {
  name: string;
  registerToken: string;
}) {
  const locale = useLocale();

  const [page, setPage] = useState(1);
  const [value, setValue] = useState<OnboardingValueType>({
    register_token: registerToken,
    nickname: name,
    service_policy_agreement: false,
    privacy_policy_agreement: false,
    marketing_policy_agreement: false,
    sleep_start_time: '23:00',
    sleep_end_time: '07:00',
    language: locale === 'ko' ? 'KOR' : 'ENG',
  });

  const { setFooterVisible } = useContext(FooterContext);

  const queryClient = useQueryClient();
  const router = useRouter();
  const progressRouter = useProgressRouter();

  const redirectUrl = getCookie('redirect-url');

  const { mutateAsync: createUser } = useMutation({
    mutationFn: createUserApi,
    onSuccess: async ({
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    }) => {
      setCookie(
        'session',
        JSON.stringify({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        } satisfies Session),
        {
          expires: dayjs().add(1, 'month').toDate(),
        },
      );
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setPage((prev) => prev + 1);
    },
    onError: (error) => {
      console.error(error);
      router.replace(`/login?redirect_url=${redirectUrl || '/'}`);
    },
  });

  function handleNextButtonClick(disabled: boolean) {
    if (disabled) return;
    setPage((prevPage) => prevPage + 1);
  }

  function handleBackButtonClick() {
    if (page === 1) {
      progressRouter.push(`/login?redirect_url=${redirectUrl}`);
    } else {
      setPage((prevPage) => prevPage - 1);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createUser(value);
  }

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
              hidden: page === 4,
            })}
          >
            <div className="fixed left-0 top-0 flex h-[4rem] w-full items-center bg-gray-00 p-4">
              <button className="w-6" onClick={handleBackButtonClick}>
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
                hidden: page === 4,
              })}
            >
              {Array.from({ length: 3 }, (_, i) => i + 1).map((pageNumber) => (
                <div
                  key={pageNumber}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full bg-gray-05 text-gray-20 text-sm-300',
                    {
                      'bg-primary-40 text-white': page === pageNumber,
                    },
                  )}
                >
                  {pageNumber}
                </div>
              ))}
            </div>

            {/* Screen */}
            <PolicyScreen
              isVisible={page === 1}
              page={page}
              value={value}
              setValue={setValue}
              onNextButtonClick={handleNextButtonClick}
              onBackButtonClick={handleBackButtonClick}
            />
            <NicknameFormScreen
              isVisible={page === 2}
              page={page}
              value={value}
              setValue={setValue}
              onNextButtonClick={handleNextButtonClick}
              onBackButtonClick={handleBackButtonClick}
            />
            <SleepTimeScreen
              isVisible={page === 3}
              page={page}
              value={value}
              setValue={setValue}
              onSubmit={handleSubmit}
              onBackButtonClick={handleBackButtonClick}
            />
            <WelcomeScreen isVisible={page === 4} value={value} />
          </div>
        </main>
      </div>
    </>
  );
}
