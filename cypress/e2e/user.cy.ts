describe('로그인', () => {
  it.only('로그인 완료 후 이전에 접속했던 페이지로 리다이렉트된다.', () => {
    cy.setCookie('redirect-url', '/events/new');
    cy.visit(
      `/login?is_success=true&access_token=${Cypress.env('TEST_ACCESS_TOKEN')}&refresh_token=hello_world`,
    );
    cy.wait(2000);

    cy.get('input[placeholder="어떤 이벤트인가요?"]').should('exist');
    cy.getCookie('redirect-url').should('not.exist');
  });
});

describe('탙퇴', () => {
  beforeEach(() => {
    cy.intercept(
      'POST',
      Cypress.env('SERVER_API_URL') + '/users/action-withdraw',
      {
        code: '200',
        message: '유저 서비스 탈퇴에 성공했습니다.',
        is_success: true,
      },
    );
    cy.login();
    cy.visit('/withdraw');
  });

  it('비회원일 경우, 탈퇴 페이지 접속이 차단된다.', () => {
    cy.clearCookie('session');

    cy.get('[data-testid="login-page"]').should('exist');
  });

  it('탈퇴 후에 홈페이지로 리다이렉트되며, 네비게이션 바 우상단 프로필이 사라진다.', () => {
    cy.contains('상기 내용').click();
    cy.contains('button', '탈퇴하기').click();

    cy.contains('h1', '일정을 쉽고 빠르게').should('exist');
  });
});
