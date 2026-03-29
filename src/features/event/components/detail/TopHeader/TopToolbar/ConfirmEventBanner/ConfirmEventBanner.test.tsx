import { NextIntlClientProvider } from 'next-intl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import ConfirmEventBanner from './ConfirmEventBanner';
import messages from '@/messages/ko.json';
import * as navigation from '@/navigation';
import { faker } from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react';
import * as nextNavigation from 'next/navigation';

vi.mock(import('next/navigation'));

let eventId = vi.hoisted(() => '');
eventId = faker.string.uuid();
vi.mocked(nextNavigation.useParams).mockReturnValue({ id: eventId });

describe('ConfirmEventBanner', () => {
  const pushSpy = vi.fn();

  beforeEach(() => {
    vi.spyOn(navigation, 'useProgressRouter').mockReturnValue({
      push: pushSpy,
    } as unknown as ReturnType<typeof navigation.useProgressRouter>);
  });

  afterEach(() => {
    pushSpy.mockReset();
  });

  it('컴포넌트가 렌더링되면, 컴포넌트 안에 텍스트가 올바르게 적용되어 버튼으로 생성된다.', () => {
    render(
      <NextIntlClientProvider locale="ko" messages={messages}>
        <ConfirmEventBanner />
      </NextIntlClientProvider>,
    );
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('일정을 확정하고 공유해보세요');
  });

  it('컴포넌트를 클릭하면, 이벤트 확정을 위한 페이지로 이동한다.', () => {
    render(
      <NextIntlClientProvider locale="ko" messages={messages}>
        <ConfirmEventBanner />
      </NextIntlClientProvider>,
    );
    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(pushSpy).toHaveBeenCalledWith(`/events/${eventId}/confirm`);
  });
});
