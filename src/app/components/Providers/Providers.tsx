import { NextIntlClientProvider } from 'next-intl';

import QueryProvider from './QueryProvider/QueryProvider';
import SetUpProvider from './SetUpProvider/SetUpProvider';
import ContextProviders from '@/contexts/ContextProviders';
import { getMessages } from 'next-intl/server';

interface ProvidersProps {
  children: React.ReactNode;
}

export default async function Providers({ children }: ProvidersProps) {
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
