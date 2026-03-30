import { NextIntlClientProvider } from 'next-intl';
import { Mock, expect, test, vi } from 'vitest';

import ConfirmedTime from './ConfirmedTime';
import messages from '@/messages/ko.json';
import { useProgressRouter } from '@/navigation';
import { faker } from '@faker-js/faker';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

vi.mock(import('next/navigation'));
vi.mock(import('@/navigation'));

const eventId = faker.string.uuid();

(useParams as Mock).mockReturnValue({ id: eventId });
(useProgressRouter as Mock).mockReturnValue({ push: vi.fn() });

test('ConfirmedTime', async () => {
  render(
    <NextIntlClientProvider locale="ko" messages={messages}>
      <QueryClientProvider client={new QueryClient()}>
        <ConfirmedTime />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );

  const heading = await screen.findByRole('heading', { level: 2 });
  const timeSummaryButton = await screen.findByText(
    '02/22(Sun) 07:00 - 02/23(Mon) 23:00',
  );

  expect(heading).toHaveTextContent('확정된 일정');
  expect(timeSummaryButton).toBeInTheDocument();
});
