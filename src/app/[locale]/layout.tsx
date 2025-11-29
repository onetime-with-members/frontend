import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';

import '../globals.css';
import '@/assets/styles/font.css';
import '@/assets/styles/github-markdown.css';
import Toast from '@/components/Toast';
import CookieModal from '@/features/set-up/components/CookieModal/CookieModal';
import Favicon from '@/features/set-up/components/Favicon';
import Footer from '@/features/set-up/components/Footer';
import NetworkErrorScreen from '@/features/set-up/components/NetworkErrorScreen';
import NoScripts from '@/features/set-up/components/NoScripts';
import PreloadImages from '@/features/set-up/components/PreloadImages';
import ProgressBar from '@/features/set-up/components/ProgressBar';
import Providers from '@/features/set-up/components/Providers';
import Scripts from '@/features/set-up/components/Scripts';
import ScriptsInHead from '@/features/set-up/components/ScriptsInHead/ScriptsInHead';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // const cookieStore = await cookies();
  // const initialIsLandingPopUpShown =
  //   !!cookieStore.get('landing-pop-up') === false;

  return (
    <html lang={locale}>
      <head>
        <Favicon />
        <ScriptsInHead />
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
