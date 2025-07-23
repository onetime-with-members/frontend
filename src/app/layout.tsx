import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import {
  Footer,
  KakaoShareScript,
  LandingPopUp,
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
import { getLocale, getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Script from 'next/script';
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

  const cookieStore = await cookies();
  const initialIsLandingPopUpShown =
    !!cookieStore.get('landing-pop-up') === false;

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
          <LandingPopUp initialIsShown={initialIsLandingPopUpShown} />
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
      {/* Google Analytics */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-8BKF2RFBH6"
      />
      <Script
        id="google-analytics-script"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'G-8BKF2RFBH6');`,
        }}
      />

      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager-script"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-WWCRBGGN');`,
        }}
      />

      {/* Meta Pixel */}
      <Script
        id="meta-pixel-script"
        dangerouslySetInnerHTML={{
          __html: `!function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '9521381771234481'); fbq('track', 'PageView');`,
        }}
      />

      {/* Microsoft Clarity */}
      <Script
        id="microsoft-clarity-script"
        dangerouslySetInnerHTML={{
          __html: `(function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }; t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", "ns3tssi1ea");`,
        }}
      />

      {/* Kakao */}
      <KakaoShareScript />
    </>
  );
}
