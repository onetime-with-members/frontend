import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import Footer from './components/Footer/Footer';
import NoScripts from './components/NoScripts/NoScripts';
import QueryProvider from './components/QueryProvider/QueryProvider';
import Scripts from './components/Scripts/Scripts';
import './globals.css';
import SetUpProvider from './set-up';
import '@/assets/styles/font.css';
import '@/assets/styles/github-markdown.css';
import Toast from '@/components/Toast/Toast';
import ContextProviders from '@/contexts/ContextProviders';
import { getLocale, getMessages } from 'next-intl/server';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: 'OneTime',
  description:
    'For the perfect time, share a link just once to coordinate schedules with multiple people quickly and easily with OneTime',
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
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body cz-shortcut-listen="true" className="font-pretendard">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ContextProviders>
              <SetUpProvider>
                {children}
                <Footer />
                <Toast />
              </SetUpProvider>
            </ContextProviders>
          </QueryProvider>
        </NextIntlClientProvider>

        <NoScripts />
      </body>

      <Scripts />
    </html>
  );
}
