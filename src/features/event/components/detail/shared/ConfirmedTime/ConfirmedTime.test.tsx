import { HttpResponse, http } from 'msw';
import { NextIntlClientProvider } from 'next-intl';
import { Mock, expect, it, vi } from 'vitest';

import ConfirmedTime from './ConfirmedTime';
import { createConfirmedEventResponse } from './ConfirmedTime.mock';
import { SERVER_API_URL } from '@/constants';
import messages from '@/messages/ko.json';
import { server } from '@/mocks/node';
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

it('날짜 이벤트이고 시작 날짜와 종료 날짜가 같을 때, 시작 날짜와 시작 시간 및 종료 시간이 있는 형식으로 확정 시간이 표시된다.', async () => {
  server.use(
    http.get(`${SERVER_API_URL}/events/:id`, () => {
      const response = createConfirmedEventResponse({
        type: 'DATE',
        oneday: true,
      });
      return HttpResponse.json(response);
    }),
  );
  render(
    <NextIntlClientProvider locale="ko" messages={messages}>
      <QueryClientProvider client={new QueryClient()}>
        <ConfirmedTime />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );
  const timeSummaryButton = await screen.findByText(
    '02/22 (Sun) 07:00 - 23:00',
  );

  expect(timeSummaryButton).toBeInTheDocument();
});

it('날짜 이벤트이고 시작 날짜와 종료 날짜가 다를 때, 시작 날짜와 종료 날짜 모두 있는 형식으로 확정 시간이 표시된다.', async () => {
  server.use(
    http.get(`${SERVER_API_URL}/events/:id`, () => {
      const response = createConfirmedEventResponse({
        type: 'DATE',
        oneday: false,
      });
      return HttpResponse.json(response);
    }),
  );
  render(
    <NextIntlClientProvider locale="ko" messages={messages}>
      <QueryClientProvider client={new QueryClient()}>
        <ConfirmedTime />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );
  const timeSummaryButton = await screen.findByText(
    '02/22(Sun) 07:00 - 02/23(Mon) 23:00',
  );

  expect(timeSummaryButton).toBeInTheDocument();
});

it('요일 이벤트이고 시작 요일과 종료 요일이 같을 때, 시작 요일과 종료 요일이 모두 있는 형식으로 확정 시간이 표시된다.', async () => {
  server.use(
    http.get(`${SERVER_API_URL}/events/:id`, () => {
      const response = createConfirmedEventResponse({
        type: 'DAY',
        oneday: true,
      });
      return HttpResponse.json(response);
    }),
  );
  render(
    <NextIntlClientProvider locale="ko" messages={messages}>
      <QueryClientProvider client={new QueryClient()}>
        <ConfirmedTime />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );
  const timeSummaryButton = await screen.findByText('Monday 07:00 - 23:00');

  expect(timeSummaryButton).toBeInTheDocument();
});

it('요일 이벤트이고 시작 요일과 종료 요일이 다를 때, 시작 요일과 시작 시간과 종료 시간이 있는 형식으로 확정 시간이 표시된다.', async () => {
  server.use(
    http.get(`${SERVER_API_URL}/events/:id`, () => {
      const response = createConfirmedEventResponse({
        type: 'DAY',
        oneday: false,
      });
      return HttpResponse.json(response);
    }),
  );
  render(
    <NextIntlClientProvider locale="ko" messages={messages}>
      <QueryClientProvider client={new QueryClient()}>
        <ConfirmedTime />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );
  const timeSummaryButton = await screen.findByText(
    'Monday 07:00 - Friday 23:00',
  );

  expect(timeSummaryButton).toBeInTheDocument();
});
