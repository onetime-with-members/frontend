import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import KakaoScript from './components/KakaoScript/KakaoScript';
import './globals.css';
import QueryProvider from './query-provider';
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
  description: 'Find the perfect time easily and quickly',
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
      <body cz-shortcut-listen="true">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ContextProviders>{children}</ContextProviders>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
      <KakaoScript />
    </html>
  );
}
