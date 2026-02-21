import { NextIntlClientProvider } from 'next-intl';

import QueryProvider from './QueryProvider';
import SetUpProvider from './SetUpProvider';
import ContextProviders from '@/contexts';
import { getMessages } from 'next-intl/server';

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
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
