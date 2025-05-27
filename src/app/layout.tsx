import type { Metadata } from 'next';

import Favicon from './components/Favicon/Favicon';
import Footer from './components/Footer/Footer';
import NetworkErrorScreen from './components/NetworkErrorScreen/NetworkErrorScreen';
import NoScripts from './components/NoScripts/NoScripts';
import PreloadImages from './components/PreloadImages/PreloadImages';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Providers from './components/Providers/Providers';
import Scripts from './components/Scripts/Scripts';
import './globals.css';
import '@/assets/styles/font.css';
import '@/assets/styles/github-markdown.css';
import Toast from '@/components/toast';
import { getLocale } from 'next-intl/server';
import 'react-loading-skeleton/dist/skeleton.css';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: 'OneTime',
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
