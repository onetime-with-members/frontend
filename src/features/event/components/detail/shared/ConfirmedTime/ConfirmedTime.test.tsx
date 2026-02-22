import { NextIntlClientProvider } from 'next-intl';
import { expect, test, vi } from 'vitest';

import ConfirmedTime from './ConfirmedTime';
import messages from '@/messages/en.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import * as nextNavigation from 'next/navigation';

vi.mock('next/navigation', { spy: true });

vi.mocked(nextNavigation.useParams).mockReturnValue({ id: '1' });

test('ConfirmedTime', async () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <QueryClientProvider client={new QueryClient()}>
        <ConfirmedTime />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );

  const heading = await screen.findByRole('heading', { level: 2 });
  const timeSummaryButton = await screen.findByText(
    '02/22(Sun) 07:00 - 02/23(Mon) 23:00',
  );

  expect(heading).toHaveTextContent('Event Info');
  expect(timeSummaryButton).toBeDefined();
});
