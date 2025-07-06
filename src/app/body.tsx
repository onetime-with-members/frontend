'use client';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useTranslations } from 'next-intl';
import nProgress from 'nprogress';
import { useContext, useEffect, useRef, useState } from 'react';

import LanguageDropdown from '@/components/dropdown/language-dropdown';
import SpeakerPhoneIcon from '@/components/icon/speak-phone';
import NavBar from '@/components/nav-bar';
import { FooterContext } from '@/contexts/footer';
import { useAuth } from '@/lib/api/auth.client';
import {
  userPolicyQueryOptions,
  userQueryOptions,
} from '@/lib/api/query-options';
import dayjs from '@/lib/dayjs';
import getQueryClient from '@/lib/query-client';
import { ProgressLink, useProgressRouter } from '@/navigation';
import { IconBrandInstagram } from '@tabler/icons-react';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Script from 'next/script';

export function SetUpProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const progressRouter = useProgressRouter();
  const pathname = usePathname();

  const { isLoggedIn } = useAuth();

  const { data: policy } = useQuery({
    ...userPolicyQueryOptions,
    enabled: isLoggedIn,
  });

  const { data: user } = useQuery({
    ...userQueryOptions,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('last-login');
    localStorage.removeItem('redirect-url');
    localStorage.removeItem('language');
    localStorage.removeItem('locale');
    localStorage.removeItem('i18nextLng');
  }, []);

  useEffect(() => {
    async function deleteOldCookies() {
      await deleteCookie('access-token');
      await deleteCookie('refresh-token');
    }
    deleteOldCookies();
  }, []);

  useEffect(() => {
    const localeCookie = getCookie('locale');
    if (!localeCookie) return;
    if (!['ko', 'en'].includes(localeCookie as string)) return;
    dayjs.locale(localeCookie as string);
  }, []);

  useEffect(() => {
    async function setUpBrowserLocale() {
      const localeCookie = getCookie('locale');
      if (localeCookie || isLoggedIn) return;
      const locale = window.navigator.language.includes('ko') ? 'ko' : 'en';
      setCookie('locale', locale, {
        expires: dayjs().add(1, 'year').toDate(),
      });
      dayjs.locale(locale);
      router.refresh();
    }
    setUpBrowserLocale();
  }, []);

  useEffect(() => {
    async function setUpUserLocaleLastLogin() {
      if (!user) return;

      const lastLoginTrigger = getCookie('last-login') !== user.social_platform;
      if (lastLoginTrigger) {
        setCookie('last-login', user.social_platform, {
          expires: dayjs().add(1, 'year').toDate(),
        });
      }

      const newLocale = user.language === 'KOR' ? 'ko' : 'en';
      const localeTrigger = getCookie('locale') !== newLocale;
      if (localeTrigger) {
        setCookie('locale', newLocale, {
          expires: dayjs().add(1, 'year').toDate(),
        });
        dayjs.locale(newLocale);
      }

      if (lastLoginTrigger || localeTrigger) router.refresh();
    }
    setUpUserLocaleLastLogin();
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/policy') || pathname === '/withdraw') return;
    if (!policy) return;
    if (policy.service_policy_agreement && policy.privacy_policy_agreement)
      return;
    progressRouter.push('/policy/edit');
  }, [pathname, policy]);

  return children;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    nProgress.configure({ minimum: 0.3, speed: 500, trickleSpeed: 50 });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      nProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}

export function Footer() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  const { setFooterRef, footerVisible } = useContext(FooterContext);

  const t = useTranslations('footer');

  useEffect(() => {
    if (footerRef && footerRef.current) {
      setFooterRef(footerRef);
    }
  }, [footerRef, setFooterRef]);

  return (
    footerVisible && (
      <footer ref={footerRef} className="bg-gray-80 px-4 pb-20 pt-8">
        <div className="mx-auto flex w-full max-w-screen-sm flex-col items-start gap-8">
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    src="/images/logo-white.svg"
                    alt="OneTime"
                    width={148}
                    height={32}
                  />
                </div>
                <a
                  href="https://www.instagram.com/one.time.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-70 p-2 duration-150 hover:bg-[#3f4352] active:bg-[#3f4352]"
                >
                  <IconBrandInstagram size={20} className="text-gray-40" />
                </a>
              </div>
              <p className="text-gray-20 text-sm-100">
                ©OneTime. ALL RIGHTS RESERVED
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfDuttkDxmZDZbHhawL5GSJOgOOelOTFFgoomRVWYHWlEP9Qg/viewform?usp=dialog"
                className="flex items-center gap-1 text-gray-00 text-sm-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <SpeakerPhoneIcon />
                </span>
                <span>{t('feedbackIssue')}</span>
              </a>
              <div className="flex items-center gap-2 text-gray-40">
                <ProgressLink href="/policy/privacy">
                  {t('privacyPolicy')}
                </ProgressLink>
                <span>|</span>
                <ProgressLink href="/policy/service">
                  {t('termsOfService')}
                </ProgressLink>
              </div>
            </div>
          </div>
          <LanguageDropdown variant="dark" menuPosition="top" />
        </div>
      </footer>
    )
  );
}

export function NetworkErrorScreen() {
  const [isOffline, setIsOffline] = useState(false);

  const t = useTranslations('networkError');

  useEffect(() => {
    function handleOffline() {
      setIsOffline(true);
      document.body.style.overflow = 'hidden';
    }

    function handleOnline() {
      setIsOffline(false);
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    isOffline && (
      <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-gray-00 px-4">
        <NavBar variant="black" disabled />
        <main className="flex -translate-y-6 flex-col items-center">
          <div>
            <Image
              src="/images/network-error-clock.svg"
              alt="The clock included exclamation mark"
              width={168}
              height={158}
              priority
            />
          </div>
          <h1 className="mt-8 text-center text-gray-80 title-sm-300">
            {t('title')}
          </h1>
          <p className="text-center text-gray-40 text-md-200">
            {t('description')}
          </p>
        </main>
      </div>
    )
  );
}

export function KakaoShareScript() {
  function onLoad() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  }

  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      onLoad={onLoad}
    />
  );
}
