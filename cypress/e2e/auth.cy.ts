import { Session } from '@/features/auth/types';

describe('로그인', () => {
  it('로그인 완료 후 이전에 접속했던 페이지로 리다이렉트된다.', () => {
    cy.setCookie('redirect-url', '/events/new');
    cy.login();
    cy.get('@accessToken').then((accessToken) => {
      cy.visit(
        `/login?is_success=true&access_token=${accessToken}&refresh_token=hello_world`,
      );
    });

    cy.get('input[placeholder="어떤 이벤트인가요?"]').should('exist');
    cy.getCookie('redirect-url').should('not.exist');
  });
});

describe('토큰 만료', () => {
  it('액세스 토큰만 만료되었을 때, 토큰을 재발급받고 로그인된 상태를 유지한다.', () => {
    cy.login();
    cy.get('@refreshToken').then((refreshTokenData) => {
      const refreshToken = `${refreshTokenData}`;
      cy.request({
        url: `${Cypress.env('apiUrl')}/test/auth/expired-token`,
        method: 'POST',
        body: {
          secret_key: Cypress.env('authSecretKey'),
        },
      }).then(
        ({
          body: {
            payload: { access_token: accessToken },
          },
        }) => {
          cy.setCookie(
            'session',
            JSON.stringify({
              accessToken,
              refreshToken,
            } satisfies Session),
          );
        },
      );
    });

    cy.visit('/ko/events/new');
    cy.contains('테').should('exist');
  });

  it('액세스 토큰은 만료되고 리프레시 토큰은 만료되었을 때(또는 잘못된 값이 들어가있을 때), 현재 페이지에서 로그아웃된 상태로 새로고침된다.', () => {
    cy.request({
      url: `${Cypress.env('apiUrl')}/test/auth/expired-token`,
      method: 'POST',
      body: {
        secret_key: Cypress.env('authSecretKey'),
      },
    }).then(
      ({
        body: {
          payload: { access_token: accessToken, refresh_token: refreshToken },
        },
      }) => {
        cy.setCookie(
          'session',
          JSON.stringify({
            accessToken,
            refreshToken,
          } satisfies Session),
        );
      },
    );

    cy.visit('/ko/events/new');
    cy.contains('a', '로그인').should('exist');
  });

  it('액세스 토큰에 잘못된 값이 들어가있을 때, 현재 페이지에서 로그아웃된 상태로 새로고침된다.', () => {
    cy.login();
    cy.get('@refreshToken').then((refreshTokenData) => {
      const refreshToken = `${refreshTokenData}`;
      cy.login();
      cy.setCookie(
        'session',
        JSON.stringify({
          accessToken: 'invalidToken',
          refreshToken,
        } satisfies Session),
      );
    });

    cy.visit('/ko/events/new');
    cy.contains('a', '로그인').should('exist');
  });

  it('액세스 토큰과 리프레시 토큰 모두 잘못된 값이 들어가있을 때, 현재 페이지에서 로그아웃된 상태로 새로고침된다.', () => {
    cy.setCookie(
      'session',
      JSON.stringify({
        accessToken: 'invalidToken',
        refreshToken: 'invalidToken',
      } satisfies Session),
    );

    cy.visit('/ko/events/new');
    cy.contains('a', '로그인').should('exist');
  });

  it('세션 쿠키에 JSON이 아닌 잘못된 형태의 값이 들어가있을 때, 현재 페이지에서 로그아웃된 상태로 새로고침된다.', () => {
    cy.setCookie('session', 'invalidValue');

    cy.visit('/ko/events/new');
    cy.contains('a', '로그인').should('exist');
  });
});
