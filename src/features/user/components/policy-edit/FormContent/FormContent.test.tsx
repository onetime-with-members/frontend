import { NextIntlClientProvider } from 'next-intl';
import { describe, it } from 'vitest';

import FormContent from './FormContent';
import messages from '@/messages/ko.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

describe('정책 수정 페이지 FormContent 컴포넌트', () => {
  it('정책 동의 여부 체크 조건에 따라 버튼이 활성화 혹은 비활성화된다.', () => {
    render(
      <NextIntlClientProvider locale="ko" messages={messages}>
        <QueryClientProvider client={new QueryClient()}>
          <FormContent />
        </QueryClientProvider>
      </NextIntlClientProvider>,
    );
  });
});
