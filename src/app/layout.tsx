import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import './globals.css';
import QueryProvider from './query-provider';
import ContextProviders from '@/contexts/ContextProviders';
import { getLocale, getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <ContextProviders>{children}</ContextProviders>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
