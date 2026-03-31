import { NextIntlClientProvider } from 'next-intl';
import { createPortal } from 'react-dom';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import TalkCalendarSuccessModal from './TalkCalendarSuccessModal';
import messagesEn from '@/messages/en.json';
import messagesKo from '@/messages/ko.json';
import { faker } from '@faker-js/faker';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';

vi.mock(import('react-dom'));
vi.mock(import('next/navigation'));

describe('TalkCalendarSuccessModal', () => {
  let calendarEventId: string;

  beforeEach(() => {
    (createPortal as Mock).mockImplementation((children) => children);
    calendarEventId = faker.database.mongodbObjectId();
    (useSearchParams as Mock).mockImplementation(() => ({
      get: () => calendarEventId,
    }));
  });

  it('톡캘린더 일정 생성을 성공하면, 모달이 올바르게 표시된다.', () => {
    render(
      <NextIntlClientProvider locale="ko" messages={messagesKo}>
        <TalkCalendarSuccessModal onClose={() => {}} />
      </NextIntlClientProvider>,
    );
    const heading = screen.getByRole('heading', { level: 2 });
    const description = screen.getByRole('paragraph');
    const highlight = within(description).getByRole('strong');
    const linkButton = screen.getByRole('button', { name: '자세히 보기' });
    const image = screen.getByRole('img') as HTMLImageElement;

    expect(heading).toHaveTextContent('일정이 등록됐어요');
    expect(description).toHaveTextContent('확인해 보세요');
    expect(highlight).toHaveTextContent('카카오톡 > 더보기 > 캘린더');
    expect(linkButton).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'alt',
      '카카오톡 앱의 더보기 화면에서 캘린더 아이콘이 하이라이트된 이미지',
    );
  });

  it('현재 언어가 영어이고 톡캘린더 일정 생성을 성공하면, 모달이 영어로 올바르게 표시된다.', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <TalkCalendarSuccessModal onClose={() => {}} />
      </NextIntlClientProvider>,
    );
    const heading = screen.getByRole('heading', { level: 2 });
    const description = screen.getByRole('paragraph');
    const highlight = within(description).getByRole('strong');
    const linkButton = screen.getByRole('button', { name: 'View event' });
    const image = screen.getByRole('img') as HTMLImageElement;

    expect(heading).toHaveTextContent('Event added');
    expect(description).toHaveTextContent('Check it out');
    expect(highlight).toHaveTextContent('KakaoTalk > More > Calendar');
    expect(linkButton).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'alt',
      'Calendar icon highlighted in the More screen of the KakaoTalk app',
    );
  });

  it('모달 우측 상단에 있는 X 버튼을 누르면, 모달이 사라진다.', () => {
    const onCloseSpy = vi.fn();
    render(
      <NextIntlClientProvider locale="ko" messages={messagesKo}>
        <TalkCalendarSuccessModal onClose={onCloseSpy} />
      </NextIntlClientProvider>,
    );
    const closeButton = screen.getByRole('button', { name: '닫기' });

    fireEvent.click(closeButton);

    expect(onCloseSpy).toHaveBeenCalledOnce();
  });

  it('모달 하단의 버튼을 누르면, 모달이 사라지고 생성된 톡캘린더 일정의 상세 페이지가 새 창으로 열린다.', () => {
    const onCloseSpy = vi.fn();
    render(
      <NextIntlClientProvider locale="ko" messages={messagesKo}>
        <TalkCalendarSuccessModal onClose={onCloseSpy} />
      </NextIntlClientProvider>,
    );
    const linkButton = screen.getByRole('button', { name: '자세히 보기' });

    fireEvent.click(linkButton);

    expect(linkButton).toHaveAttribute(
      'href',
      `https://calendar.kakao.com/schedule/${calendarEventId}`,
    );
    expect(linkButton).toHaveAttribute('target', '_blank');
    expect(onCloseSpy).toHaveBeenCalledOnce();
  });
});
