import { Session } from '@/features/auth/types';

describe('로그인', () => {
  it('로그인 완료 후 이전에 접속했던 페이지로 리다이렉트된다.', () => {
    cy.setCookie('redirect-url', '/events/new');
    cy.visit(
      `/login?is_success=true&access_token=${Cypress.env('token')}&refresh_token=hello_world`,
    );

    cy.get('input[placeholder="어떤 이벤트인가요?"]').should('exist');
    cy.getCookie('redirect-url').should('not.exist');
  });
});

describe('토큰 만료', () => {
  it('토큰 만료 또는 잘못된 토큰일 때, 현재 페이지에서 로그아웃된 상태로 새로고침된다.', () => {
    cy.setCookie(
      'session',
      JSON.stringify({
        accessToken: Cypress.env('expiredToken'),
        refreshToken: 'refresh',
      } satisfies Session),
    );
    cy.visit('/ko/events/new');

    cy.contains('a', '로그인').should('exist');
  });
});
