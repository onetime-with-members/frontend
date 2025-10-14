import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import {
  Footer,
  KakaoShareScript,
  NetworkErrorScreen,
  ProgressBar,
  QueryProvider,
  SetUpProvider,
} from './body';
import './globals.css';
import '@/assets/styles/font.css';
import '@/assets/styles/github-markdown.css';
import Toast from '@/components/toast';
import ContextProviders from '@/contexts';
import CookieModal from '@/features/set-up/components/CookieModal';
import GoogleAnalytics from '@/features/set-up/components/GoogleAnalytics';
import GoogleTagManager from '@/features/set-up/components/GoogleTagManager';
import MSClarity from '@/features/set-up/components/MSClarity';
import MetaPixel from '@/features/set-up/components/MetaPixel';
import { getLocale, getMessages } from 'next-intl/server';
import Image from 'next/image';
import 'react-loading-skeleton/dist/skeleton.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: {
    template: '%s | OneTime',
    default: 'OneTime',
  },
  description:
    'For our perfect time, share a link just once to coordinate schedules with many people quickly and easily with OneTime',
  keywords:
    '원타임, 일정, 회의시간, 스케줄, 이벤트, 약속, 시간추천, 타임블록, OneTime, meeting, appointment, schedule, event, time recommendation, time block',
  icons: '/favicon/favicon-96x96.png',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_DOMAIN ||
      'https://www.onetime-with-members.com',
  ),
  formatDetection: { email: false },
  openGraph: {
    title: 'OneTime',
    description: '링크 공유 한번으로, 여러 사람과 쉽게 일정을 맞추세요.',
    images: '/images/opengraph/opengraph-thumbnail.png',
    siteName: 'OneTime',
  },
  twitter: {
    title: 'OneTime',
    description:
      '일정을 쉽고 빠르게. 원타임과 함께 링크 공유 한 번으로, 여러 사람과 쉽게 일정을 맞추세요.',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // const cookieStore = await cookies();
  // const initialIsLandingPopUpShown =
  //   !!cookieStore.get('landing-pop-up') === false;

  return (
    <html lang={locale}>
      <head>
        <Favicon />
      </head>
      <body cz-shortcut-listen="true" className="font-pretendard">
        <Providers>
          <ProgressBar />
          <div className="flex min-h-[110vh] flex-col">{children}</div>
          <Footer />
          {/* <LandingPopUp initialIsShown={initialIsLandingPopUpShown} /> */}
          <CookieModal />
          <div id="pop-up" />
          <div id="alert" />
          <Toast />
          <NetworkErrorScreen />
        </Providers>
        <PreloadImages />
        <NoScripts />
      </body>
      <Scripts />
    </html>
  );
}

export function Favicon() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/favicon/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/favicon/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/favicon/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/favicon/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/favicon/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/favicon/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/favicon/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/favicon/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/favicon/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/favicon/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />
    </>
  );
}

export async function Providers({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <QueryProvider>
        <ContextProviders>
          <SetUpProvider>{children}</SetUpProvider>
        </ContextProviders>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}

export function PreloadImages() {
  return (
    <div className="hidden">
      <Image
        src="/images/logo-white.svg"
        alt=""
        width={1}
        height={1}
        priority
      />
      <Image
        src="/images/network-error-clock.svg"
        alt=""
        width={1}
        height={1}
        priority
      />
      <Image
        src="/images/welcome-clock.svg"
        alt=""
        width={1}
        height={1}
        priority
      />
    </div>
  );
}

export function NoScripts() {
  return (
    <>
      {/* Google Tag Manager */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WWCRBGGN"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      {/* Meta Pixel */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=9521381771234481&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  );
}

export function Scripts() {
  return (
    <>
      <GoogleAnalytics />
      <MSClarity />
      <MetaPixel />
      <GoogleTagManager />
      <KakaoShareScript />
    </>
  );
}
