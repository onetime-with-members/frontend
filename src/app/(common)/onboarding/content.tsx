'use client';

import { getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import NicknameFormScreen from './nickname-form-screen';
import PolicyScreen from './policy-screen';
import SleepTimeScreen from './sleep-time-screen';
import WelcomeScreen from './welcome-screen';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import { createUser } from '@/lib/auth';
import cn from '@/lib/cn';
import { OnboardingValueType } from '@/lib/types';
import { useRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';

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

  const { setFooterVisible } = useContext(FooterContext);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = getCookie('redirect-url');

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.set('onboardingValue', JSON.stringify(value));
    await createUser(formData);

    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    setValue((prevValue) => ({
      ...prevValue,
      nickname: searchParams.get('name') as string,
      register_token: searchParams.get('register_token') as string,
    }));
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get('register_token') || !searchParams.get('name')) {
      return router.push('/login');
    }
  }, [searchParams, router]);

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
