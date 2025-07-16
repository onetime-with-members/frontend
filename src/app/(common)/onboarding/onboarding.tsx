'use client';

import { getCookie } from 'cookies-next';
import { useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import NicknameFormScreen from './_screen/nickname-form-screen';
import PolicyScreen from './_screen/policy-screen';
import SleepTimeScreen from './_screen/sleep-time-screen';
import WelcomeScreen from './_screen/welcome-screen';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import cn from '@/lib/cn';
import { defaultOnboardingValue } from '@/lib/constants';
import { OnboardingType } from '@/lib/types';
import { useProgressRouter } from '@/navigation';
import { IconChevronLeft } from '@tabler/icons-react';

export default function OnboardingPage({
  name,
  registerToken,
}: {
  name: string;
  registerToken: string;
}) {
  const locale = useLocale();

  const [pageIndex, setPageIndex] = useState(0);
  const [onboardingValue, setOnboardingValue] = useState<OnboardingType>({
    ...defaultOnboardingValue,
    nickname: name,
    registerToken,
    language: locale === 'ko' ? 'KOR' : 'ENG',
  });

  const { setFooterVisible } = useContext(FooterContext);

  const progressRouter = useProgressRouter();

  const redirectUrl = getCookie('redirect-url');

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
              {Array.from({ length: 3 }, (_, i) => i).map((pageNumber) => (
                <div
                  key={pageNumber}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full bg-gray-05 text-gray-20 text-sm-300',
                    {
                      'bg-primary-40 text-white': pageIndex === pageNumber,
                    },
                  )}
                >
                  {pageNumber}
                </div>
              ))}
            </div>

            {/* Screen */}
            {pageIndex === 0 && (
              <PolicyScreen
                page={pageIndex}
                setPage={setPageIndex}
                onboardingValue={onboardingValue}
                setOnboardingValue={setOnboardingValue}
              />
            )}
            {pageIndex === 1 && (
              <NicknameFormScreen
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                onboardingValue={onboardingValue}
                setOnboardingValue={setOnboardingValue}
              />
            )}
            {pageIndex === 2 && (
              <SleepTimeScreen
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                onboardingValue={onboardingValue}
                setOnboardingValue={setOnboardingValue}
              />
            )}
            {pageIndex === 3 && (
              <WelcomeScreen nickname={onboardingValue.nickname} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
