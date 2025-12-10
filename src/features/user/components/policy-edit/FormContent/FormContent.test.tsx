import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import FormContent from './FormContent';
import messages from '@/messages/ko.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

describe('정책 수정 페이지 FormContent 컴포넌트', () => {
  it('정책 동의 여부 체크 조건에 따라 버튼이 활성화 혹은 비활성화된다.', async () => {
    render(
      <NextIntlClientProvider locale="ko" messages={messages}>
        <QueryClientProvider client={new QueryClient()}>
          <FormContent />
        </QueryClientProvider>
      </NextIntlClientProvider>,
    );

    const checkboxListParent = await screen.findByTestId(
      'policy-single-checkbox-list',
    );
    const checkboxList =
      checkboxListParent.querySelectorAll('.policy-checkbox');

    checkboxList.forEach((checkbox) => {
      fireEvent.click(checkbox);
    });

    const submitButton = await screen.findByRole('button', { name: '확인' });
    expect(submitButton).not.toBeDisabled();
  });
});
